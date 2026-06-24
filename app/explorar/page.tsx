"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/lib/supabase";

type Idea = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  level: string | null;
};

type ResponseType = "topo" | "talvez" | "nao";

type MatchModal = {
  title: string;
  description: string | null;
  matchType: "full" | "partial";
};

export default function ExplorarPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [finished, setFinished] = useState(false);
  const [matchModal, setMatchModal] = useState<MatchModal | null>(null);

  const currentIdea = ideas[index];

  useEffect(() => {
    async function carregarIdeias() {
      const { data, error } = await supabase
        .from("ideas")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error(error);
        alert("Erro ao carregar ideias.");
        setLoading(false);
        return;
      }

      setIdeas(data || []);
      setLoading(false);
    }

    carregarIdeias();
  }, []);

  async function verificarMatchInstantaneo(
  idea: Idea,
  respostaAtual: ResponseType
) {
  if (respostaAtual === "nao") return false;

  const coupleId = localStorage.getItem("saiadarotina_couple_id");
  const userId = localStorage.getItem("saiadarotina_user_id");

  if (!coupleId || !userId) return false;

  const { data: users } = await supabase
    .from("users")
    .select("id")
    .eq("couple_id", coupleId);

  if (!users || users.length < 2) return false;

  const outrosUsuarios = users.filter((user) => user.id !== userId);

  const { data: partnerResponses } = await supabase
    .from("responses")
    .select("*")
    .eq("idea_id", idea.id)
    .in(
      "user_id",
      outrosUsuarios.map((user) => user.id)
    )
    .order("created_at", { ascending: false });

  if (!partnerResponses || partnerResponses.length === 0) return false;

  const respostaParceiro = partnerResponses.find(
    (item) => item.response === "topo" || item.response === "talvez"
  );

  if (!respostaParceiro) return false;

  const respostaDoParceiro = respostaParceiro.response as ResponseType;

  const fullMatch =
    respostaAtual === "topo" && respostaDoParceiro === "topo";

  const partialMatch =
    (respostaAtual === "topo" && respostaDoParceiro === "talvez") ||
    (respostaAtual === "talvez" && respostaDoParceiro === "topo") ||
    (respostaAtual === "talvez" && respostaDoParceiro === "talvez");

  if (fullMatch || partialMatch) {
    setMatchModal({
      title: idea.title,
      description: idea.description,
      matchType: fullMatch ? "full" : "partial",
    });

    return true;
  }

  return false;
}

  function avancar() {
    if (index + 1 < ideas.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  }

  async function responder(resposta: ResponseType) {
    if (!currentIdea || saving) return;

    const userId = localStorage.getItem("saiadarotina_user_id");

    if (!userId) {
      alert("Usuário não encontrado. Entre novamente no espaço do casal.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("responses").insert({
      user_id: userId,
      idea_id: currentIdea.id,
      response: resposta,
    });

    if (error) {
      console.error(error);
      alert("Erro ao salvar resposta.");
      setSaving(false);
      return;
    }

    await verificarMatchInstantaneo(currentIdea, resposta);

    setSaving(false);

    if (!matchModal) {
  avancar();
}
const teveMatch = await verificarMatchInstantaneo(currentIdea, resposta);

setSaving(false);

if (!teveMatch) {
  avancar();
}
  }

  function continuarExplorando() {
    setMatchModal(null);
    avancar();
  }

  if (loading) {
    return (
      <MobileShell>
        <div className="pb-24">
          <p className="text-sm text-pink-300">Explorar</p>
          <h1 className="mt-2 text-3xl font-bold">Carregando ideias...</h1>
        </div>
        <BottomNav />
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <div className="pb-24">
        <p className="text-sm text-pink-300">Explorar</p>
        <h1 className="mt-2 text-3xl font-bold">Ideias para vocês</h1>
        <p className="mt-2 text-white/60">
          Responda com sinceridade. O app mostra apenas o que combinar com os dois.
        </p>

        {!finished && currentIdea ? (
          <div className="mt-8 rounded-3xl border border-pink-400/20 bg-pink-500/10 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-pink-300">
                {index + 1} de {ideas.length}
              </p>

              <p className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                {currentIdea.category || "Experiência"}
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-bold">{currentIdea.title}</h2>

            <p className="mt-4 text-lg leading-relaxed text-white/65">
              {currentIdea.description}
            </p>

            <p className="mt-5 inline-flex rounded-full bg-white/10 px-3 py-2 text-xs text-white/70">
              Nível: {currentIdea.level || "romântico"}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-2">
              <button
                onClick={() => responder("topo")}
                disabled={saving}
                className="rounded-2xl bg-pink-500 py-4 font-semibold text-white disabled:opacity-60 active:scale-[0.98]"
              >
                Topo
              </button>

              <button
                onClick={() => responder("talvez")}
                disabled={saving}
                className="rounded-2xl bg-white/10 py-4 font-semibold text-white disabled:opacity-60 active:scale-[0.98]"
              >
                Talvez
              </button>

              <button
                onClick={() => responder("nao")}
                disabled={saving}
                className="rounded-2xl bg-white/10 py-4 font-semibold text-white disabled:opacity-60 active:scale-[0.98]"
              >
                Não
              </button>
            </div>

            {saving && (
              <p className="mt-4 text-center text-sm text-white/50">
                Salvando resposta...
              </p>
            )}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-pink-400/20 bg-pink-500/10 p-6 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-500/20 text-3xl">
              ❤️
            </div>

            <h2 className="text-3xl font-bold">Tudo respondido</h2>
            <p className="mt-3 text-white/65">
              Suas respostas foram salvas com segurança.
            </p>

            <Link
              href="/matches"
              className="mt-8 block w-full rounded-2xl bg-pink-500 px-5 py-4 font-semibold text-white"
            >
              Ver matches
            </Link>
          </div>
        )}
      </div>

      {matchModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[32px] border border-pink-400/30 bg-[#241020] p-6 text-center shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-500/20 text-4xl">
              ❤️
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-300">
              {matchModal.matchType === "full"
                ? "Match encontrado"
                : "Match parcial"}
            </p>

            <h2 className="mt-3 text-3xl font-bold">{matchModal.title}</h2>

            <p className="mt-3 text-white/65">
              {matchModal.matchType === "full"
                ? "Vocês dois demonstraram interesse nessa experiência."
                : "Essa experiência pode fazer sentido para vocês. Um de vocês marcou como talvez."}
            </p>

            {matchModal.description && (
              <p className="mt-4 rounded-2xl bg-white/5 p-4 text-sm text-white/60">
                {matchModal.description}
              </p>
            )}

            <div className="mt-6 space-y-3">
              <Link
                href="/matches"
                className="block w-full rounded-2xl bg-pink-500 px-5 py-4 font-semibold text-white"
              >
                Ver match
              </Link>

              <button
                onClick={continuarExplorando}
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 font-semibold text-white"
              >
                Continuar explorando
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </MobileShell>
  );
}