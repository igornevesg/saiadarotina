"use client";

import { useEffect, useMemo, useState } from "react";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";
import { TimelineTexts } from "@/shared/constants/timelineTexts";
import { FadeIn } from "@/shared/ui/animations/FadeIn";
import { TimelineHeader } from "@/shared/ui/timeline/TimelineHeader";
import { TimelineStats } from "@/shared/ui/timeline/TimelineStats";
import { TimelineEmpty } from "@/shared/ui/timeline/TimelineEmpty";
import { TimelineCard } from "@/shared/ui/timeline/TimelineCard";

type TimelineItem = {
  id: string;
  event_type: string;
  title: string;
  description: string | null;
  created_at: string;
  metadata: Record<string, any> | null;
};

function getEventIcon(type: string) {
  const icons: Record<string, string> = {
    match_created: "❤️",
    experience_completed: "✨",
    memory_created: "📖",
    special_date_added: "📅",
    milestone_unlocked: "🏆",
    product_clicked: "🛍️",
    product_purchased: "🎁",
    story_generated: "📝",
  };

  return icons[type] || "💫";
}

function getEventLabel(type: string) {
  return (
    TimelineTexts.events[type as keyof typeof TimelineTexts.events] ||
    TimelineTexts.events.default
  );
}

function formatRelativeDate(date: string) {
  const now = new Date();
  const eventDate = new Date(date);
  const diffMs = now.getTime() - eventDate.getTime();
  const diffMinutes = Math.floor(diffMs / 1000 / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "Agora mesmo";
  if (diffMinutes < 60) return `Há ${diffMinutes} min`;
  if (diffHours < 24) return `Há ${diffHours}h`;
  if (diffDays === 1) return "Ontem";
  if (diffDays < 7) return `Há ${diffDays} dias`;

  return eventDate.toLocaleDateString("pt-BR");
}

export default function HistoriaPage() {
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [creatingMemory, setCreatingMemory] = useState(false);

  async function carregarTimeline() {
    const coupleId = localStorage.getItem("saiadarotina_couple_id");

    if (!coupleId) {
      setLoading(false);
      return;
    }

    const res = await fetch(`/api/relationship/timeline?coupleId=${coupleId}`, {
      cache: "no-store",
    });

    const json = await res.json();

    setTimeline(json.timeline || []);
    setLoading(false);
  }

  useEffect(() => {
    carregarTimeline();
  }, []);

  async function criarMemoriaTeste() {
    try {
      setCreatingMemory(true);

      const coupleId = localStorage.getItem("saiadarotina_couple_id");
      const userId = localStorage.getItem("saiadarotina_user_id");

      if (!coupleId) {
        alert("Casal não encontrado.");
        return;
      }

      const res = await fetch("/api/relationship/memories", {
        method: "POST",
        body: JSON.stringify({
          coupleId,
          userId,
          title: "Nossa primeira memória",
          content:
            "Este é o primeiro registro manual da história de vocês no Saia da Rotina.",
          mood: "especial",
          rating: 5,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        alert(json.error || "Erro ao criar memória.");
        return;
      }

      await carregarTimeline();
    } finally {
      setCreatingMemory(false);
    }
  }

  const stats = useMemo(() => {
    return {
      totalEvents: timeline.length,
      totalMatches: timeline.filter((item) => item.event_type === "match_created")
        .length,
      totalMemories: timeline.filter((item) => item.event_type === "memory_created")
        .length,
      totalExperiences: timeline.filter(
        (item) => item.event_type === "experience_completed"
      ).length,
    };
  }, [timeline]);

  return (
    <MobileShell>
      <div className="pb-24">
        <TimelineHeader totalEvents={stats.totalEvents} />

        <TimelineStats
          totalEvents={stats.totalEvents}
          totalMatches={stats.totalMatches}
          totalMemories={stats.totalMemories}
          totalExperiences={stats.totalExperiences}
        />

        <button
          onClick={criarMemoriaTeste}
          disabled={creatingMemory}
          className="mt-5 w-full rounded-2xl bg-pink-500 px-5 py-4 font-semibold text-white disabled:opacity-60"
        >
          {creatingMemory ? "Criando memória..." : "Criar memória teste"}
        </button>

        {loading ? (
          <p className="mt-8 text-white/60">{TimelineTexts.loading}</p>
        ) : timeline.length === 0 ? (
          <TimelineEmpty />
        ) : (
          <div className="relative mt-8 space-y-5">
            <div className="absolute left-6 top-4 bottom-4 w-px bg-pink-300/20" />

            {timeline.map((item, index) => (
              <FadeIn key={item.id} delay={index * 80}>
                <TimelineCard
                  item={item}
                  icon={getEventIcon(item.event_type)}
                  label={getEventLabel(item.event_type)}
                  formattedDate={formatRelativeDate(item.created_at)}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </MobileShell>
  );
}