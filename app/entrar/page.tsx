"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileShell from "@/components/MobileShell";
import { supabase } from "@/lib/supabase";

export default function EntrarPage() {
  const router = useRouter();

  const [codigo, setCodigo] = useState("");
  const [apelido, setApelido] = useState("");
  const [loading, setLoading] = useState(false);

  async function entrarNoCasal() {
    if (!codigo.trim() || !apelido.trim()) return;

    setLoading(true);

    const { data: couple, error: coupleError } = await supabase
      .from("couples")
      .select("*")
      .eq("code", codigo.trim().toUpperCase())
      .single();

    if (coupleError || !couple) {
      alert("Código não encontrado.");
      setLoading(false);
      return;
    }

    const { data: user, error: userError } = await supabase
      .from("users")
      .insert({
        couple_id: couple.id,
        nickname: apelido.trim(),
        role: "partner",
      })
      .select()
      .single();

    if (userError) {
      alert("Erro ao entrar no espaço.");
      console.error(userError);
      setLoading(false);
      return;
    }

    localStorage.setItem("saiadarotina_couple_id", couple.id);
    localStorage.setItem("saiadarotina_user_id", user.id);
    localStorage.setItem("saiadarotina_code", couple.code);

    setLoading(false);
    router.push("/explorar");
  }

  return (
    <MobileShell>
      <div className="flex min-h-[calc(100vh-88px)] flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold">Entrar com código</h1>

          <p className="mt-3 text-white/65">
            Digite o código compartilhado pelo seu parceiro.
          </p>

          <div className="mt-8 space-y-4">
            <input
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="SDR-12345"
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 uppercase outline-none placeholder:text-white/35"
            />

            <input
              value={apelido}
              onChange={(e) => setApelido(e.target.value)}
              placeholder="Seu apelido"
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none placeholder:text-white/35"
            />
          </div>
        </div>

        <button
          onClick={entrarNoCasal}
          disabled={loading}
          className="w-full rounded-2xl bg-pink-500 px-5 py-4 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar no espaço"}
        </button>
      </div>
    </MobileShell>
  );
}