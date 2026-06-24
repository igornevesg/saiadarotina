"use client";

import { useState } from "react";
import AppButton from "@/components/AppButton";
import MobileShell from "@/components/MobileShell";
import { saveCouple } from "@/lib/storage";

const objetivos = [
  "❤️ Romance",
  "💬 Comunicação",
  "🎲 Diversão",
  "🔥 Intimidade",
  "✨ Novidades",
];

export default function CriarPage() {
  const [step, setStep] = useState(1);
  const [apelido, setApelido] = useState("");
  const [parceiro, setParceiro] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [codigo, setCodigo] = useState("");

  function gerarCodigo() {
  const numero = Math.floor(10000 + Math.random() * 90000);
  const novoCodigo = `SDR-${numero}`;

  saveCouple({
    apelido,
    parceiro,
    objetivo,
    codigo: novoCodigo,
    createdAt: new Date().toISOString(),
  });

  setCodigo(novoCodigo);
  setStep(4);
}

  return (
    <MobileShell>
      <div className="flex min-h-[calc(100vh-88px)] flex-col">
        <div className="mb-8">
          <p className="text-sm text-pink-300">Passo {step} de 4</p>
          <div className="mt-3 h-2 rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-pink-500 transition-all"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <section className="flex flex-1 flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold">Como podemos chamar você?</h1>
              <p className="mt-3 text-white/65">
                Use um apelido. Isso ajuda a manter tudo mais leve e privado.
              </p>

              <input
                value={apelido}
                onChange={(e) => setApelido(e.target.value)}
                className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-lg outline-none placeholder:text-white/35"
                placeholder="Seu apelido"
              />
            </div>

            <button
              onClick={() => apelido.trim() && setStep(2)}
              className="w-full rounded-2xl bg-pink-500 px-5 py-4 text-center font-semibold text-white shadow-lg shadow-pink-900/30 active:scale-[0.98]"
            >
              Continuar
            </button>
          </section>
        )}

        {step === 2 && (
          <section className="flex flex-1 flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold">E seu par?</h1>
              <p className="mt-3 text-white/65">
                Informe como você chama seu parceiro ou parceira.
              </p>

              <input
                value={parceiro}
                onChange={(e) => setParceiro(e.target.value)}
                className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-lg outline-none placeholder:text-white/35"
                placeholder="Apelido do parceiro(a)"
              />
            </div>

            <div className="space-y-3">
              <button
                onClick={() => parceiro.trim() && setStep(3)}
                className="w-full rounded-2xl bg-pink-500 px-5 py-4 text-center font-semibold text-white shadow-lg shadow-pink-900/30 active:scale-[0.98]"
              >
                Continuar
              </button>

              <button
                onClick={() => setStep(1)}
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-center font-semibold text-white"
              >
                Voltar
              </button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="flex flex-1 flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold">O que vocês querem viver mais?</h1>
              <p className="mt-3 text-white/65">
                Escolha o principal objetivo do casal neste momento.
              </p>

              <div className="mt-8 space-y-3">
                {objetivos.map((item) => (
                  <button
                    key={item}
                    onClick={() => setObjetivo(item)}
                    className={`w-full rounded-2xl border p-4 text-left text-lg font-semibold ${
                      objetivo === item
                        ? "border-pink-400 bg-pink-500/20"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => objetivo && gerarCodigo()}
                className="w-full rounded-2xl bg-pink-500 px-5 py-4 text-center font-semibold text-white shadow-lg shadow-pink-900/30 active:scale-[0.98]"
              >
                Criar espaço do casal
              </button>

              <button
                onClick={() => setStep(2)}
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-center font-semibold text-white"
              >
                Voltar
              </button>
            </div>
          </section>
        )}

        {step === 4 && (
          <section className="flex flex-1 flex-col justify-between text-center">
            <div>
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-pink-500/20 text-4xl">
                ❤️
              </div>

              <h1 className="text-4xl font-bold">Espaço criado</h1>
              <p className="mt-3 text-white/65">
                Compartilhe este código com {parceiro || "seu par"} para começar.
              </p>

              <div className="mt-10 rounded-3xl border border-pink-400/20 bg-pink-500/10 p-6">
                <p className="text-sm text-white/50">Código do casal</p>
                <p className="mt-2 text-4xl font-bold tracking-wider text-pink-300">
                  {codigo}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `Entre no Saia da Rotina com o código: ${codigo}`
                  )
                }
                className="w-full rounded-2xl bg-pink-500 px-5 py-4 text-center font-semibold text-white shadow-lg shadow-pink-900/30 active:scale-[0.98]"
              >
                Copiar código
              </button>

              <AppButton href="/explorar" variant="secondary">
                Começar agora
              </AppButton>
            </div>
          </section>
        )}
      </div>
    </MobileShell>
  );
}