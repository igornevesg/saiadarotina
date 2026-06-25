"use client";

import { useEffect, useState } from "react";

type Tag = {
  id: string;
  name: string;
  slug: string;
};

export default function AdminTagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    carregarTags();
  }, []);

  async function carregarTags() {
    const res = await fetch("/api/admin/tags", { cache: "no-store" });
    const json = await res.json();

    setTags(json.tags || []);
    setLoading(false);
  }

  async function criarTag() {
    if (!name.trim()) return;

    setSaving(true);

    const res = await fetch("/api/admin/tags", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      alert("Erro ao criar tag. Ela pode já existir.");
      setSaving(false);
      return;
    }

    setName("");
    setSaving(false);
    carregarTags();
  }

  return (
    <main className="min-h-screen bg-[#160813] px-5 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <a href="/admin" className="text-sm text-pink-300">
          ← Voltar ao painel
        </a>

        <h1 className="mt-4 text-4xl font-bold">Tags</h1>
        <p className="mt-2 text-white/60">
          Padronize as tags usadas em experiências, produtos e recomendações.
        </p>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Nova tag</h2>

          <div className="mt-5 flex gap-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Massagem"
              className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
            />

            <button
              onClick={criarTag}
              disabled={saving}
              className="rounded-2xl bg-pink-500 px-6 font-semibold disabled:opacity-60"
            >
              {saving ? "Salvando..." : "Criar"}
            </button>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Tags cadastradas</h2>

          {loading ? (
            <p className="mt-5 text-white/60">Carregando...</p>
          ) : (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="rounded-full bg-pink-500/15 px-4 py-2 text-sm text-pink-100"
                  title={tag.slug}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}