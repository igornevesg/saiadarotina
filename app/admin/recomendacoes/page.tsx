"use client";

import { useEffect, useState } from "react";

type Idea = {
  id: string;
  title: string;
  tags: string[] | null;
};

type Product = {
  id: string;
  title: string;
  image_url: string | null;
  product_url: string | null;
  price: number | null;
  product_type: string | null;
  tags: string[] | null;
  score: number;
};

export default function AdminRecomendacoesPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    carregarIdeias();
  }, []);

  async function carregarIdeias() {
    const res = await fetch("/api/admin/ideas");
    const json = await res.json();
    setIdeas(json.ideas || []);
  }

  async function testarRecomendacao(ideaId: string) {
    setSelectedIdea(ideaId);

    if (!ideaId) {
      setProducts([]);
      return;
    }

    const res = await fetch(`/api/admin/recommendations?ideaId=${ideaId}`);
    const json = await res.json();

    setProducts(json.recommendations || []);
  }

  return (
    <main className="min-h-screen bg-[#160813] px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <a href="/admin" className="text-sm text-pink-300">
          ← Voltar ao painel
        </a>

        <h1 className="mt-4 text-4xl font-bold">Motor de Recomendações</h1>
        <p className="mt-2 text-white/60">
          Teste quais produtos combinam com cada experiência com base nas tags.
        </p>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <label className="text-sm text-white/50">Experiência</label>

          <select
            value={selectedIdea}
            onChange={(e) => testarRecomendacao(e.target.value)}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-[#241020] p-4 outline-none"
          >
            <option value="">Selecione uma experiência</option>

            {ideas.map((idea) => (
              <option key={idea.id} value={idea.id}>
                {idea.title}
              </option>
            ))}
          </select>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Produtos recomendados</h2>

          {products.length === 0 ? (
            <p className="mt-5 text-white/60">
              Selecione uma experiência com tags compatíveis com os produtos.
            </p>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="aspect-square overflow-hidden rounded-2xl bg-white/10">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-white/30">
                        Sem imagem
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-pink-300">
                      Compatibilidade: {product.score}
                    </p>

                    <h3 className="mt-1 text-lg font-bold">{product.title}</h3>

                    <p className="mt-1 text-sm text-white/50">
                      {product.product_type || "Sem categoria"}
                    </p>

                    <p className="mt-3 font-bold">
                      {product.price
                        ? product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : "Sem preço"}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {product.tags?.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-pink-500/15 px-2 py-1 text-xs text-pink-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {product.product_url && (
                      <a
                        href={product.product_url}
                        target="_blank"
                        className="mt-4 block rounded-2xl bg-pink-500 px-4 py-3 text-center font-semibold"
                      >
                        Ver na loja
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}