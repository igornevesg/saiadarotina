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

type Product = {
  id: string;
  title: string;
  description: string | null;
  product_url: string | null;
  image_url: string | null;
  price: number | null;
  available: boolean | null;
  product_type: string | null;
  vendor: string | null;
  tagRelations?: TagRelation[];
};

const emptyForm = {
  title: "",
  description: "",
  product_url: "",
  image_url: "",
  price: "",
  product_type: "",
  vendor: "Sex Shop da Blogueirinha",
  available: true,
  tagIds: [] as string[],
};

export default function AdminProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setLoading(true);

    const [productsRes, tagsRes] = await Promise.all([
      fetch("/api/admin/products", { cache: "no-store" }),
      fetch("/api/admin/tags", { cache: "no-store" }),
    ]);

    const productsJson = await productsRes.json();
    const tagsJson = await tagsRes.json();

    setProducts(productsJson.products || []);
    setTags(tagsJson.tags || []);
    setLoading(false);
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

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

  async function salvarProduto() {
    if (!form.title.trim()) return;

    setSaving(true);

    const url = editingId
      ? `/api/admin/products/${editingId}`
      : "/api/admin/products";

    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      body: JSON.stringify({
        title: form.title,
        description: form.description,
        product_url: form.product_url,
        image_url: form.image_url,
        price: form.price ? Number(form.price) : null,
        product_type: form.product_type,
        vendor: form.vendor,
        available: form.available,
        tagIds: form.tagIds,
      }),
    });

    if (!res.ok) {
      alert("Erro ao salvar produto.");
      setSaving(false);
      return;
    }

    setForm(emptyForm);
    setEditingId(null);
    setSaving(false);
    carregarDados();
  }

  function editar(product: Product) {
    setEditingId(product.id);

    setForm({
      title: product.title || "",
      description: product.description || "",
      product_url: product.product_url || "",
      image_url: product.image_url || "",
      price: product.price ? String(product.price) : "",
      product_type: product.product_type || "",
      vendor: product.vendor || "Sex Shop da Blogueirinha",
      available: product.available ?? true,
      tagIds:
        product.tagRelations?.map((relation) => relation.tag_id) || [],
    });
  }

  async function excluir(id: string) {
    if (!confirm("Deseja excluir este produto?")) return;

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Erro ao excluir produto.");
      return;
    }

    carregarDados();
  }

  async function alternarDisponibilidade(product: Product) {
    const tagIds =
      product.tagRelations?.map((relation) => relation.tag_id) || [];

    const res = await fetch(`/api/admin/products/${product.id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...product,
        available: !product.available,
        tagIds,
      }),
    });

    if (!res.ok) {
      alert("Erro ao alterar disponibilidade.");
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

        <h1 className="mt-4 text-4xl font-bold">Produtos</h1>
        <p className="mt-2 text-white/60">
          Cadastre, edite e classifique produtos com tags padronizadas.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[430px_1fr]">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">
              {editingId ? "Editar produto" : "Novo produto"}
            </h2>

            <div className="mt-5 space-y-4">
              <input
                value={form.title}
                onChange={(e) => updateForm("title", e.target.value)}
                placeholder="Nome do produto"
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
              />

              <textarea
                value={form.description}
                onChange={(e) => updateForm("description", e.target.value)}
                placeholder="Descrição"
                className="min-h-24 w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
              />

              <input
                value={form.product_url}
                onChange={(e) => updateForm("product_url", e.target.value)}
                placeholder="Link do produto"
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
              />

              <input
                value={form.image_url}
                onChange={(e) => updateForm("image_url", e.target.value)}
                placeholder="URL da imagem"
                className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  value={form.price}
                  onChange={(e) => updateForm("price", e.target.value)}
                  placeholder="Preço"
                  type="number"
                  step="0.01"
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
                />

                <input
                  value={form.product_type}
                  onChange={(e) => updateForm("product_type", e.target.value)}
                  placeholder="Categoria"
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 outline-none"
                />
              </div>

              <input
                value={form.vendor}
                onChange={(e) => updateForm("vendor", e.target.value)}
                placeholder="Fornecedor"
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
                  checked={form.available}
                  onChange={(e) => updateForm("available", e.target.checked)}
                />
                Produto disponível
              </label>

              <button
                onClick={salvarProduto}
                disabled={saving}
                className="w-full rounded-2xl bg-pink-500 px-5 py-4 font-semibold disabled:opacity-60"
              >
                {saving
                  ? "Salvando..."
                  : editingId
                    ? "Salvar alterações"
                    : "Criar produto"}
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
              <h2 className="text-2xl font-bold">Produtos cadastrados</h2>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar produto"
                className="rounded-2xl border border-white/10 bg-white/5 p-3 outline-none"
              />
            </div>

            {loading ? (
              <p className="mt-5 text-white/60">Carregando...</p>
            ) : (
              <div className="mt-5 space-y-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 md:grid-cols-[88px_1fr_auto]"
                  >
                    <div className="h-22 w-22 overflow-hidden rounded-2xl bg-white/10">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-white/30">
                          Sem imagem
                        </div>
                      )}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold">{product.title}</h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            product.available
                              ? "bg-green-500/15 text-green-300"
                              : "bg-red-500/15 text-red-300"
                          }`}
                        >
                          {product.available ? "Disponível" : "Indisponível"}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-white/50">
                        {product.product_type || "Sem categoria"} •{" "}
                        {product.vendor || "Sem fornecedor"}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {product.tagRelations?.slice(0, 6).map((relation) => (
                          <span
                            key={relation.tag_id}
                            className="rounded-full bg-pink-500/15 px-2 py-1 text-xs text-pink-200"
                          >
                            {relation.tags.name}
                          </span>
                        ))}
                      </div>

                      {product.product_url && (
                        <a
                          href={product.product_url}
                          target="_blank"
                          className="mt-3 inline-block text-sm text-pink-300"
                        >
                          Ver na loja
                        </a>
                      )}
                    </div>

                    <div className="flex flex-col items-end justify-between gap-3">
                      <p className="font-bold">
                        {product.price
                          ? product.price.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : "Sem preço"}
                      </p>

                      <div className="flex flex-wrap justify-end gap-2">
                        <button
                          onClick={() => editar(product)}
                          className="rounded-xl bg-white/10 px-3 py-2 text-sm"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => alternarDisponibilidade(product)}
                          className="rounded-xl bg-white/10 px-3 py-2 text-sm"
                        >
                          {product.available ? "Indisponibilizar" : "Disponibilizar"}
                        </button>

                        <button
                          onClick={() => excluir(product.id)}
                          className="rounded-xl bg-red-500/20 px-3 py-2 text-sm text-red-200"
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}