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
};

export default function AdminPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
  async function carregarDashboard() {
    try {
      const res = await fetch("/api/admin/dashboard", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Erro ao buscar dashboard");
      }

      const json = await res.json();

      console.log("Dashboard:", json);

      setData(json);
    } catch (err) {
      console.error(err);
    }
  }

  carregarDashboard();
}, []);

  return (
    <main className="min-h-screen bg-[#160813] px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm text-pink-300">Admin</p>
        <h1 className="mt-2 text-4xl font-bold">Painel Saia da Rotina</h1>
        <p className="mt-2 text-white/60">
          Visão geral do app, casais, respostas e experiências.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-5">
          <MetricCard title="Casais" value={data?.couples ?? 0} />
          <MetricCard title="Usuários" value={data?.users ?? 0} />
          <MetricCard title="Respostas" value={data?.responses ?? 0} />
          <MetricCard title="Interesses" value={data?.positiveResponses ?? 0} />
          <MetricCard title="Experiências" value={data?.ideas ?? 0} />
        </div>
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