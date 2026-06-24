"use client";

import { useEffect, useState } from "react";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";
import { clearCouple, CoupleData, getCouple } from "@/lib/storage";

export default function PerfilPage() {
  const [couple, setCouple] = useState<CoupleData | null>(null);

  useEffect(() => {
    setCouple(getCouple());
  }, []);

  function apagarDados() {
    clearCouple();
    window.location.href = "/";
  }

  return (
    <MobileShell>
      <div className="pb-24">
        <h1 className="text-3xl font-bold">Perfil</h1>
        <p className="mt-2 text-white/60">Dados salvos neste dispositivo.</p>

        {couple ? (
          <div className="mt-8 space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/45">Seu apelido</p>
              <p className="mt-1 text-xl font-semibold">{couple.apelido}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/45">Seu par</p>
              <p className="mt-1 text-xl font-semibold">{couple.parceiro}</p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm text-white/45">Objetivo</p>
              <p className="mt-1 text-xl font-semibold">{couple.objetivo}</p>
            </div>

            <div className="rounded-3xl border border-pink-400/20 bg-pink-500/10 p-5">
              <p className="text-sm text-white/45">Código do casal</p>
              <p className="mt-1 text-2xl font-bold text-pink-300">
                {couple.codigo}
              </p>
            </div>

            <button
              onClick={apagarDados}
              className="w-full rounded-2xl border border-red-400/30 bg-red-500/10 px-5 py-4 font-semibold text-red-200"
            >
              Apagar dados
            </button>
          </div>
        ) : (
          <p className="mt-8 text-white/60">
            Nenhum espaço de casal foi criado ainda.
          </p>
        )}
      </div>

      <BottomNav />
    </MobileShell>
  );
}