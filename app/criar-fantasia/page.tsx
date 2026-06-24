"use client";

import { useState } from "react";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";

const categorias = ["Romance", "Comunicação", "Diversão", "Intimidade", "Novidades"];
const niveis = ["romantico", "picante", "ousado", "avancado"];

export default function CriarFantasiaPage() {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState("Intimidade");
  const [nivel, setNivel] = useState("picante");
  const [salvo, setSalvo] = useState(false);

  function salvarFantasia() {
    if (!titulo.trim()) return;

    const fantasias = JSON.parse(
      localStorage.getItem("saiadarotina_custom_ideas") || "[]"
    );

    fantasias.push({
      id: `custom-${Date.now()}`,
      title: titulo,
      description: descricao || "Desejo criado por uma pessoa do casal.",
      category: categoria,
      level: nivel,
      products: [],
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem("saiadarotina_custom_ideas", JSON.stringify(fantasias));

    setTitulo("");
    setDescricao("");
    setCategoria("Intimidade");
    setNivel("picante");
    setSalvo(true);
  }

  return (
    <MobileShell>
      <div className="pb-24">
        <p className="text-sm text-pink-300">Criar</p>
        <h1 className="mt-2 text-3xl font-bold">Criar desejo</h1>
        <p className="mt-2 text-white/60">
          Cadastre uma ideia própria. Ela poderá aparecer para ser respondida no app.
        </p>

        <div className="mt-8 space-y-4">
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ex: Noite temática"
            className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none placeholder:text-white/35"
          />

          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva a ideia, se quiser"
            className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none placeholder:text-white/35"
          />

          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#241020] p-4 outline-none"
          >
            {categorias.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-[#241020] p-4 outline-none"
          >
            {niveis.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <button
            onClick={salvarFantasia}
            className="w-full rounded-2xl bg-pink-500 px-5 py-4 font-semibold text-white"
          >
            Salvar desejo
          </button>

          {salvo && (
            <p className="rounded-2xl border border-pink-400/20 bg-pink-500/10 p-4 text-center text-pink-200">
              Desejo salvo com sucesso.
            </p>
          )}
        </div>
      </div>

      <BottomNav />
    </MobileShell>
  );
}