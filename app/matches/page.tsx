"use client";

import { useEffect, useState } from "react";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";
import { ideas, Idea } from "@/lib/ideas";

export default function MatchesPage() {
  const [matches, setMatches] = useState<Idea[]>([]);

  useEffect(() => {
    const respostas = JSON.parse(
      localStorage.getItem("saiadarotina_responses") || "{}"
    );

    const ideiasComMatch = ideas.filter(
      (idea) => respostas[idea.id] === "topo" || respostas[idea.id] === "talvez"
    );

    setMatches(ideiasComMatch);
  }, []);

  return (
    <MobileShell>
      <div className="pb-24">
        <p className="text-sm text-pink-300">Matches</p>
        <h1 className="mt-2 text-3xl font-bold">Experiências em comum</h1>
        <p className="mt-2 text-white/60">
          Aqui aparecem as ideias que podem fazer sentido para vocês.
        </p>

        {matches.length > 0 ? (
          <div className="mt-8 space-y-4">
            {matches.map((match) => (
              <div
                key={match.id}
                className="rounded-3xl border border-pink-400/20 bg-pink-500/10 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-pink-300">{match.category}</p>
                  <p className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                    {match.level}
                  </p>
                </div>

                <h2 className="mt-4 text-2xl font-bold">{match.title}</h2>

                <p className="mt-3 text-white/65">{match.description}</p>

                <div className="mt-5">
                  <p className="text-sm text-white/45">
                    Itens que podem combinar:
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {match.products.map((product) => (
                      <span
                        key={product}
                        className="rounded-full bg-white/10 px-3 py-2 text-sm text-white/75"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="https://dablogueirinha.com.br/"
                  target="_blank"
                  className="mt-6 block w-full rounded-2xl bg-pink-500 px-5 py-4 text-center font-semibold text-white"
                >
                  Ver itens para essa experiência
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
            <h2 className="text-2xl font-bold">Nenhum match ainda</h2>
            <p className="mt-3 text-white/60">
              Responda algumas ideias na aba Explorar para começar.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </MobileShell>
  );
}