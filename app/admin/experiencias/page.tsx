"use client";

import { useEffect, useMemo, useState } from "react";

type Tag = {
  id: string;
  name: string;
  slug: string;
};

type TagRelation = {
  tag_id: string;
  tags: Tag;
};

type Idea = {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  level: string | null;
  active: boolean | null;
  estimated_time: string | null;
  environment: string | null;
  objective: string | null;
  instructions: string | null;
  image_url: string | null;
  tagRelations?: TagRelation[];
};

const emptyForm = {
  title: "",
  description: "",
  category: "Romance",
  level: "romantico",
  active: true,
  estimated_time: "",
  environment: "",
  objective: "",
  instructions: "",
  image_url: "",
  tagIds: [] as string[],
};

export default function AdminExperienciasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setLoading(true);

    const [ideasRes, tagsRes] = await Promise.all([
      fetch("/api/admin/ideas", { cache: "no-store" }),
      fetch("/api/admin/tags", { cache: "no-store" }),
    ]);

    const ideasJson = await ideasRes.json();
    const tagsJson = await tagsRes.json();

    setIdeas(ideasJson.ideas || []);
    setTags(tagsJson.tags || []);
    setLoading(false);
  }

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) =>
      idea.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [ideas, search]);

  function updateForm(field: string, value: string | boolean | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleTag(tagId: string) {
    const selected = form.tagIds.includes(tagId);

    updateForm(
      "tagIds",
      selected
        ? form.tagIds.filter((id) => id !== tagId)
        : [...form.tagIds, tagId]
    );
  }

  async function salvarExperiencia() {
    if (!form.title.trim()) return;

    setSaving(true);

    const url = editingId ? `/api/admin/ideas/${editingId}` : "/api/admin/ideas";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      alert("Erro ao salvar experiência.");
      setSaving(false);
      return;
    }

    setForm(emptyForm);
    setEditingId(null);
    setSaving(false);
    carregarDados();
  }

  function editar(idea: Idea) {
    setEditingId(idea.id);

    setForm({
      title: idea.title || "",
      description: idea.description || "",
      category: idea.category || "Romance",
      level: idea.level || "romantico",
      active: idea.active ?? true,
      estimated_time: idea.estimated_time || "",
      environment: idea.environment || "",
      objective: idea.objective || "",
      instructions: idea.instructions || "",
      image_url: idea.image_url || "",
      tagIds: idea.tagRelations?.map((relation) => relation.tag_id) || [],
    });
  }

  async function excluir(id: string) {
    if (!confirm("Deseja excluir esta experiência?")) return;

    const res = await fetch(`/api/admin/ideas/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Erro ao excluir experiência.");
      return;
    }

    carregarDados();
  }

  async function alternarStatus(idea: Idea) {
    const tagIds = idea.tagRelations?.map((relation) => relation.tag_id) || [];

    const res = await fetch(`/api/admin/ideas/${idea.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...idea,
        active: !idea.active,
        tagIds,
      }),
    });

    if (!res.ok) {
      alert("Erro ao alterar status.");
      return;
    }

    carregarDados();
  }

  async function duplicar(idea: Idea) {
    const tagIds = idea.tagRelations?.map((relation) => relation.tag_id) || [];

    const res = await fetch("/api/admin/ideas", {
      method: "POST",
      body: JSON.stringify({
        title: `${idea.title} (cópia)`,
        description: idea.description,
        category: idea.category,
        level: idea.level,
        active: true,
        estimated_time: idea.estimated_time,
        environment: idea.environment,
        objective: idea.objective,
        instructions: idea.instructions,
        image_url: idea.image_url,
        tagIds,
      }),
    });

    if (!res.ok) {
      alert("Erro ao duplicar experiência.");
      return;
    }

    carregarDados();
  }

  function cancelarEdicao() {
    setEditingId(null);
    setForm(emptyForm);
  }

  return (
    <main className="min-h-screen bg-[#160813] px-5 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <a href="/admin" className="text-sm text-pink-300">
          ← Voltar ao painel
        </a>

        <h1 className="mt-4 text-4xl font-bold">Experiências</h1>
        <p className="mt-2 text-white/60">
          Crie, edite e gerencie experiências com tags padronizadas.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[430px_1fr]">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">
              {editingId ? "Editar experiência" : "Nova experiência"}
            </h2>

            <div className="mt-5 space-y-4">
              <input
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                placeholder="Título"
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
              />

              <textarea
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                placeholder="Descrição"
                className="min-h-24 w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
              />

              <input
                value={form.objective}
                onChange={(e) => updateForm("objective", e.target.value)}
                placeholder="Objetivo"
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
              />

              <textarea
                value={form.instructions}
                onChange={(e) => updateForm("instructions", e.target.value)}
                placeholder="Instruções"
                className="min-h-24 w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <select
                  value={form.category}
                  onChange={(e) => updateForm("category", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-[#241020] p-4 outline-none"
                >
                  <option>Romance</option>
                  <option>Comunicação</option>
                  <option>Diversão</option>
                  <option>Intimidade</option>
                  <option>Novidades</option>
                </select>

                <select
                  value={form.level}
                  onChange={(e) => updateForm("level", e.target.value)}
                  className="rounded-2xl border border-white/10 bg-[#241020] p-4 outline-none"
                >
                  <option value="romantico">Romântico</option>
                  <option value="picante">Picante</option>
                  <option value="ousado">Ousado</option>
                  <option value="avancado">Avançado</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  value={form.estimated_time}
                  onChange={(e) => updateForm("estimated_time", e.target.value)}
                  placeholder="Tempo"
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
                />

                <input
                  value={form.environment}
                  onChange={(e) => updateForm("environment", e.target.value)}
                  placeholder="Ambiente"
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
                />
              </div>

              <input
                value={form.image_url}
                onChange={(e) => updateForm("image_url", e.target.value)}
                placeholder="URL da imagem"
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
              />

              <div>
                <p className="mb-3 text-sm text-white/50">Tags</p>

                <div className="flex max-h-48 flex-wrap gap-2 overflow-y-auto rounded-2xl border border-white/10 bg-white/5 p-3">
                  {tags.map((tag) => {
                    const selected = form.tagIds.includes(tag.id);

                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className={`rounded-full px-3 py-2 text-sm ${
                          selected
                            ? "bg-pink-500 text-white"
                            : "bg-white/10 text-white/70"
                        }`}
                      >
                        {selected ? "✓ " : ""}
                        {tag.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="flex items-center gap-3 text-white/70">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => updateForm("active", e.target.checked)}
                />
                Experiência ativa
              </label>

              <button
                onClick={salvarExperiencia}
                disabled={saving}
                className="w-full rounded-2xl bg-pink-500 px-5 py-4 font-semibold disabled:opacity-60"
              >
                {saving
                  ? "Salvando..."
                  : editingId
                    ? "Salvar alterações"
                    : "Criar experiência"}
              </button>

              {editingId && (
                <button
                  onClick={cancelarEdicao}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-semibold"
                >
                  Cancelar edição
                </button>
              )}
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-bold">Experiências cadastradas</h2>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar experiência"
                className="rounded-2xl border border-white/10 bg-white/5 p-3 outline-none"
              />
            </div>

            {loading ? (
              <p className="mt-5 text-white/60">Carregando...</p>
            ) : (
              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[900px] border-separate border-spacing-y-3">
                  <thead>
                    <tr className="text-left text-sm text-white/45">
                      <th className="px-4">Experiência</th>
                      <th className="px-4">Categoria</th>
                      <th className="px-4">Nível</th>
                      <th className="px-4">Tags</th>
                      <th className="px-4">Status</th>
                      <th className="px-4 text-right">Ações</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredIdeas.map((idea) => (
                      <tr key={idea.id} className="bg-white/5">
                        <td className="rounded-l-2xl px-4 py-4">
                          <p className="font-bold">{idea.title}</p>
                          <p className="mt-1 max-w-md text-sm text-white/50">
                            {idea.description}
                          </p>
                        </td>

                        <td className="px-4 py-4 text-white/70">
                          {idea.category}
                        </td>

                        <td className="px-4 py-4 text-white/70">
                          {idea.level}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex max-w-xs flex-wrap gap-1">
                            {idea.tagRelations?.map((relation) => (
                              <span
                                key={relation.tag_id}
                                className="rounded-full bg-pink-500/15 px-2 py-1 text-xs text-pink-200"
                              >
                                {relation.tags.name}
                              </span>
                            ))}
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs ${
                              idea.active
                                ? "bg-green-500/15 text-green-300"
                                : "bg-red-500/15 text-red-300"
                            }`}
                          >
                            {idea.active ? "Ativa" : "Inativa"}
                          </span>
                        </td>

                        <td className="rounded-r-2xl px-4 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => editar(idea)}
                              className="rounded-xl bg-white/10 px-3 py-2 text-sm"
                            >
                              Editar
                            </button>

                            <button
                              onClick={() => duplicar(idea)}
                              className="rounded-xl bg-white/10 px-3 py-2 text-sm"
                            >
                              Duplicar
                            </button>

                            <button
                              onClick={() => alternarStatus(idea)}
                              className="rounded-xl bg-white/10 px-3 py-2 text-sm"
                            >
                              {idea.active ? "Desativar" : "Ativar"}
                            </button>

                            <button
                              onClick={() => excluir(idea.id)}
                              className="rounded-xl bg-red-500/20 px-3 py-2 text-sm text-red-200"
                            >
                              Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}