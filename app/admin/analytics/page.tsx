"use client";

import { useEffect, useState } from "react";

type AnalyticsEvent = {
  id: string;
  event_name: string;
  created_at: string;
  metadata: Record<string, any> | null;
  ideas?: {
    title: string;
  } | null;
  products?: {
    title: string;
  } | null;
};

export default function AdminAnalyticsPage() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarEventos();
  }, []);

  async function carregarEventos() {
    const res = await fetch("/api/admin/analytics", { cache: "no-store" });
    const json = await res.json();

    setEvents(json.events || []);
    setLoading(false);
  }

  function formatEventName(name: string) {
    const labels: Record<string, string> = {
      experience_response: "Resposta em experiência",
      match_created: "Match criado",
      product_click: "Clique em produto",
    };

    return labels[name] || name;
  }

  return (
    <main className="min-h-screen bg-[#160813] px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <a href="/admin" className="text-sm text-pink-300">
          ← Voltar ao painel
        </a>

        <h1 className="mt-4 text-4xl font-bold">Analytics</h1>
        <p className="mt-2 text-white/60">
          Eventos recentes registrados no app.
        </p>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Eventos recentes</h2>

          {loading ? (
            <p className="mt-5 text-white/60">Carregando...</p>
          ) : events.length === 0 ? (
            <p className="mt-5 text-white/60">
              Nenhum evento registrado ainda.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-bold">
                        {formatEventName(event.event_name)}
                      </p>

                      <p className="mt-1 text-sm text-white/45">
                        {new Date(event.created_at).toLocaleString("pt-BR")}
                      </p>
                    </div>

                    <span className="rounded-full bg-pink-500/15 px-3 py-1 text-xs text-pink-200">
                      {event.event_name}
                    </span>
                  </div>

                  {(event.ideas?.title || event.products?.title) && (
                    <div className="mt-3 text-sm text-white/60">
                      {event.ideas?.title && (
                        <p>Experiência: {event.ideas.title}</p>
                      )}

                      {event.products?.title && (
                        <p>Produto: {event.products.title}</p>
                      )}
                    </div>
                  )}

                  {event.metadata && Object.keys(event.metadata).length > 0 && (
                    <pre className="mt-3 overflow-x-auto rounded-xl bg-black/20 p-3 text-xs text-white/50">
                      {JSON.stringify(event.metadata, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}