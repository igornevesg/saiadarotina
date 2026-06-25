"use client";

import { useEffect, useState } from "react";

type DashboardData = {
  couples: number;
  users: number;
  responses: number;
  positiveResponses: number;
  ideas: number;
  mostAnsweredIdeas: {
    id: string;
    title: string;
    total: number;
    
  }[];
  productClicks: number;

mostClickedProducts: {

  id: string;

  title: string;

  total: number;

}[];
};

export default function AdminPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarDashboard() {
      try {
        const res = await fetch("/api/admin/dashboard", {
          cache: "no-store",
        });

        const json = await res.json();
        setData(json);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarDashboard();
  }, []);

  async function sincronizarShopify() {
  const confirmar = confirm("Deseja sincronizar os produtos da Shopify agora?");
  if (!confirmar) return;

  const res = await fetch("/api/admin/shopify/sync", {
    method: "POST",
  });

  const json = await res.json();

  if (!res.ok) {
    alert(json.error || "Erro ao sincronizar Shopify.");
    return;
  }

  alert(
    `Sincronização concluída!\nImportados: ${json.imported}\nAtualizados: ${json.updated}`
  );
}

  return (
    <main className="min-h-screen bg-[#160813] px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-pink-300">Admin</p>
        <h1 className="mt-2 text-4xl font-bold">Painel Saia da Rotina</h1>
        <p className="mt-2 text-white/60">
          Visão geral do app, casais, respostas e experiências.
        </p>

        {loading ? (
          <p className="mt-8 text-white/60">Carregando métricas...</p>
        ) : (
          <>
            <div className="mt-8 grid gap-4 md:grid-cols-5">
              <MetricCard title="Casais" value={data?.couples ?? 0} />
              <MetricCard title="Usuários" value={data?.users ?? 0} />
              <MetricCard title="Respostas" value={data?.responses ?? 0} />
              <MetricCard
                title="Interesses"
                value={data?.positiveResponses ?? 0}
              />
              <MetricCard title="Experiências" value={data?.ideas ?? 0} />
              <MetricCard title="Cliques" value={data?.productClicks ?? 0} />
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-bold">
                  Experiências mais respondidas
                </h2>

                <div className="mt-5 space-y-3">
                  {data?.mostAnsweredIdeas?.map((idea, index) => (
                    <div
                      key={idea.id}
                      className="flex items-center justify-between rounded-2xl bg-white/5 p-4"
                    >
                      <div>
                        <p className="font-semibold">
                          {index + 1}. {idea.title}
                        </p>
                        <p className="text-sm text-white/45">
                          {idea.total} respostas
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h2 className="text-2xl font-bold">Ações rápidas</h2>

                <div className="mt-5 grid gap-3">
                  <a
                    href="/admin/experiencias"
                    className="rounded-2xl bg-pink-500 px-5 py-4 text-center font-semibold"
                  >
                    Gerenciar experiências
                  </a>

                  <a
                    href="/admin/produtos"
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center font-semibold"
                  >
                    Gerenciar produtos
                  </a>

                  <a
                    href="/admin/recomendacoes"
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center font-semibold"
                  >
                    Motor de recomendações
                  </a>

                  <button
  onClick={sincronizarShopify}
  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center font-semibold"
>
  Sincronizar Shopify
</button>
                </div>
              </section>
            </div>
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
  <h2 className="text-2xl font-bold">Produtos mais clicados</h2>

  <div className="mt-5 space-y-3">
    {data?.mostClickedProducts?.length ? (
      data.mostClickedProducts.map((product, index) => (
        <div
          key={product.id}
          className="flex items-center justify-between rounded-2xl bg-white/5 p-4"
        >
          <div>
            <p className="font-semibold">
              {index + 1}. {product.title}
            </p>
            <p className="text-sm text-white/45">
              {product.total} cliques
            </p>
          </div>
        </div>
      ))
    ) : (
      <p className="text-white/60">
        Nenhum clique em produto registrado ainda.
      </p>
    )}
  </div>
</section>
          </>
        )}
      </div>
    </main>
  );
}

function MetricCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-white/50">{title}</p>
      <p className="mt-3 text-4xl font-bold">{value}</p>
    </div>
  );
}