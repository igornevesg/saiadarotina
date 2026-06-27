import type { StoryChapter } from "@/features/relationship/story/domain/Chapter";
import type { StoryEpilogue } from "@/features/relationship/story/domain/storyEpilogue";

type BuildStoryEpilogueInput = {
  chapters: StoryChapter[];
};

function countEvents(chapters: StoryChapter[]) {
  return chapters.reduce((total, chapter) => total + chapter.events.length, 0);
}

function countByType(chapters: StoryChapter[], type: string) {
  return chapters.reduce((total, chapter) => {
    return total + chapter.events.filter((event) => event.type === type).length;
  }, 0);
}

export function buildStoryEpilogue({
  chapters,
}: BuildStoryEpilogueInput): StoryEpilogue {
  const totalEvents = countEvents(chapters);
  const totalMemories = countByType(chapters, "memory_created");
  const totalMatches = countByType(chapters, "match_created");
  const totalExperiences = countByType(chapters, "experience_completed");

  if (chapters.length === 0) {
    return {
      title: "O começo da história",
      text: "Toda história começa antes mesmo de ganhar forma. Quando os primeiros momentos forem registrados, este espaço se transformará em um resumo especial da jornada de vocês.",
      generatedAt: new Date().toISOString(),
    };
  }

  return {
    title: "O que essa história revela",
    text: `Ao longo desta jornada, vocês escreveram ${chapters.length} capítulo${
      chapters.length === 1 ? "" : "s"
    }, reunindo ${totalEvents} acontecimento${
      totalEvents === 1 ? "" : "s"
    }, ${totalMatches} interesse${
      totalMatches === 1 ? "" : "s"
    } em comum, ${totalMemories} memória${
      totalMemories === 1 ? "" : "s"
    } e ${totalExperiences} experiência${
      totalExperiences === 1 ? "" : "s"
    } vivida${totalExperiences === 1 ? "" : "s"}. Cada detalhe registrado mostra que uma relação também é feita de escolhas, descobertas e pequenos momentos que merecem permanecer.`,
    generatedAt: new Date().toISOString(),
  };
}