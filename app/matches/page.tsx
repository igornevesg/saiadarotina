"use client";

import { useEffect, useState } from "react";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";
import { supabase } from "@/lib/supabase";

type MatchItem = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  level: string | null;
  matchType: "full" | "partial";
};

type ResponseRow = {
  id: string;
  user_id: string;
  idea_id: string;
  response: string;
  created_at: string;
};

export default function MatchesPage() {
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarMatches();
  }, []);

  async function carregarMatches() {
    const coupleId = localStorage.getItem("saiadarotina_couple_id");

    if (!coupleId) {
      setLoading(false);
      return;
    }

    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .eq("couple_id", coupleId);

    if (usersError || !users || users.length < 2) {
      setLoading(false);
      return;
    }

    const userIds = users.map((user) => user.id);

    const { data: responses, error: responsesError } = await supabase
      .from("responses")
      .select("*")
      .in("user_id", userIds)
      .order("created_at", { ascending: false });

    if (responsesError || !responses) {
      console.error(responsesError);
      setLoading(false);
      return;
    }

    const { data: ideas, error: ideasError } = await supabase
      .from("ideas")
      .select("*")
      .order("created_at", { ascending: true });

    if (ideasError || !ideas) {
      console.error(ideasError);
      setLoading(false);
      return;
    }

    const respostasMaisRecentes: Record<string, ResponseRow> = {};

    for (const response of responses as ResponseRow[]) {
      const key = `${response.user_id}-${response.idea_id}`;

      if (!respostasMaisRecentes[key]) {
        respostasMaisRecentes[key] = response;
      }
    }

    const matchesEncontrados: MatchItem[] = [];

    for (const idea of ideas) {
      const respostasDaIdeia = userIds
        .map((userId) => respostasMaisRecentes[`${userId}-${idea.id}`])
        .filter(Boolean);

      if (respostasDaIdeia.length < 2) continue;

      const valores = respostasDaIdeia.map((item) => item.response);

      if (valores.includes("nao")) continue;

      const todosTopo = valores.every((valor) => valor === "topo");

      const algumTopoOuTalvez = valores.every(
        (valor) => valor === "topo" || valor === "talvez"
      );

      if (todosTopo || algumTopoOuTalvez) {
        matchesEncontrados.push({
          id: idea.id,
          title: idea.title,
          description: idea.description,
          category: idea.category,
          level: idea.level,
          matchType: todosTopo ? "full" : "partial",
        });
      }
    }

    setMatches(matchesEncontrados);
    setLoading(false);
  }

  if (loading) {
    return (
      <MobileShell>
        <div className="pb-24">
          <h1 className="text-3xl font-bold">Carregando matches...</h1>
        </div>
        <BottomNav />
      </MobileShell>
    );
  }

  return (
    <MobileShell>
      <div className="pb-24">
        <p className="text-sm text-pink-300">Matches</p>

        <h1 className="mt-2 text-3xl font-bold">Experiências em comum</h1>

        <p className="mt-2 text-white/60">
          Aqui aparecem apenas as experiências compatíveis entre vocês.
        </p>

        {matches.length === 0 ? (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
            <h2 className="text-2xl font-bold">Nenhum match ainda</h2>

            <p className="mt-3 text-white/60">
              Os dois precisam responder às mesmas experiências com Topo ou
              Talvez.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            {matches.map((match) => (
              <div
                key={match.id}
                className="rounded-3xl border border-pink-400/20 bg-pink-500/10 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-pink-300">
                    {match.category || "Experiência"}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      match.matchType === "full"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {match.matchType === "full"
                      ? "❤️ Match Total"
                      : "✨ Match Parcial"}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold">{match.title}</h2>

                <p className="mt-3 text-white/65">{match.description}</p>

                <a
                  href="https://dablogueirinha.com.br"
                  target="_blank"
                  className="mt-6 block w-full rounded-2xl bg-pink-500 px-5 py-4 text-center font-semibold text-white"
                >
                  Ver itens para essa experiência
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </MobileShell>
  );
}