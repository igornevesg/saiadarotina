"use client";

import { useState } from "react";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";
import { ideas } from "@/lib/ideas";

type ResponseType = "topo" | "talvez" | "nao";

export default function ExplorarPage() {
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentIdea = ideas[index];

  function responder(resposta: ResponseType) {
    const respostasSalvas = JSON.parse(
      localStorage.getItem("saiadarotina_responses") || "{}"
    );

    respostasSalvas[currentIdea.id] = resposta;

    localStorage.setItem(
      "saiadarotina_responses",
      JSON.stringify(respostasSalvas)
    );

    if (index + 1 < ideas.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  }

  return (
    <MobileShell>
      <div className="pb-24">
        <p className="text-sm text-pink-300">Explorar</p>
        <h1 className="mt-2 text-3xl font-bold">Ideias para vocês</h1>
        <p className="mt-2 text-white/60">
          Responda com sinceridade. O app mostra apenas o que combinar com os dois.
        </p>

        {!finished ? (
          <div className="mt-8 rounded-3xl border border-pink-400/20 bg-pink-500/10 p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-pink-300">
                {index + 1} de {ideas.length}
              </p>
              <p className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                {currentIdea.category}
              </p>
            </div>

            <h2 className="mt-5 text-3xl font-bold">{currentIdea.title}</h2>

            <p className="mt-4 text-lg leading-relaxed text-white/65">
              {currentIdea.description}
            </p>

            <div className="mt-6">
              <p className="text-sm text-white/45">Pode combinar com:</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {currentIdea.products.map((product) => (
                  <span
                    key={product}
                    className="rounded-full bg-white/10 px-3 py-2 text-sm text-white/75"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-2">
              <button
                onClick={() => responder("topo")}
                className="rounded-2xl bg-pink-500 py-4 font-semibold text-white active:scale-[0.98]"
              >
                Topo
              </button>

              <button
                onClick={() => responder("talvez")}
                className="rounded-2xl bg-white/10 py-4 font-semibold text-white active:scale-[0.98]"
              >
                Talvez
              </button>

              <button
                onClick={() => responder("nao")}
                className="rounded-2xl bg-white/10 py-4 font-semibold text-white active:scale-[0.98]"
              >
                Não
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-pink-400/20 bg-pink-500/10 p-6 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-500/20 text-3xl">
              ❤️
            </div>

            <h2 className="text-3xl font-bold">Tudo respondido</h2>
            <p className="mt-3 text-white/65">
              Suas respostas foram salvas neste dispositivo.
            </p>

            <a
              href="/matches"
              className="mt-8 block w-full rounded-2xl bg-pink-500 px-5 py-4 font-semibold text-white"
            >
              Ver matches
            </a>
          </div>
        )}
      </div>

      <BottomNav />
    </MobileShell>
  );
}