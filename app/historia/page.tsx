"use client";

import { useEffect, useState } from "react";
import MobileShell from "@/components/MobileShell";
import BottomNav from "@/components/BottomNav";
import { TimelineTexts } from "@/shared/constants/timelineTexts";
import { TimelineHeader } from "@/shared/ui/timeline/TimelineHeader";
import { TimelineEmpty } from "@/shared/ui/timeline/TimelineEmpty";
import { FadeIn } from "@/shared/ui/animations/FadeIn";
import { StoryChapter } from "@/shared/ui/story/storyChapter";

type StoryChapterType = {
  id: string;
  title: string;
  subtitle: string;
  quote: string;
  narrative: string;
  reflection: string;
  mood: string;
  date: string;
  events: {
    id: string;
    type: string;
    title: string;
    description?: string | null;
    occurredAt: string;
    icon: string;
    label: string;
  }[];
};

type RelationshipStory = {
  coupleId: string;
  chapters: StoryChapterType[];
  totalChapters: number;
  generatedAt: string;
};

export default function HistoriaPage() {
  const [story, setStory] = useState<RelationshipStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [creatingMemory, setCreatingMemory] = useState(false);

  async function carregarStory() {
    const coupleId = localStorage.getItem("saiadarotina_couple_id");

    if (!coupleId) {
      setLoading(false);
      return;
    }

    const res = await fetch(`/api/relationship/story?coupleId=${coupleId}`, {
      cache: "no-store",
    });

    const json = await res.json();

    setStory(json.story || null);
    setLoading(false);
  }

  useEffect(() => {
    carregarStory();
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

      await carregarStory();
    } finally {
      setCreatingMemory(false);
    }
  }

  const totalEvents =
    story?.chapters.reduce(
      (total, chapter) => total + chapter.events.length,
      0
    ) || 0;

  return (
    <MobileShell>
      <div className="pb-24">
        <TimelineHeader totalEvents={totalEvents} />

        <button
          onClick={criarMemoriaTeste}
          disabled={creatingMemory}
          className="mt-5 w-full rounded-2xl bg-pink-500 px-5 py-4 font-semibold text-white disabled:opacity-60"
        >
          {creatingMemory ? "Criando memória..." : "Criar memória teste"}
        </button>

        {loading ? (
          <p className="mt-8 text-white/60">{TimelineTexts.loading}</p>
        ) : !story || story.chapters.length === 0 ? (
          <TimelineEmpty />
        ) : (
          <div className="mt-8 space-y-6">
            {story.chapters.map((chapter, index) => (
              <FadeIn key={chapter.id} delay={index * 90}>
                <StoryChapter chapter={chapter} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </MobileShell>
  );
}