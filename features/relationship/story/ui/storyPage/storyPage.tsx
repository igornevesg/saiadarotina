import Link from "next/link";

import type { RelationshipStory } from "@/features/relationship/story/public";
import { presentStory } from "@/features/relationship/story/presentation/presenters/storyPresenter";

import { Card, PageContainer, Section, Stack } from "@/shared/ui/components";
import { typography } from "@/shared/design";

type Props = {
  story: RelationshipStory;
};

export function StoryPage({ story }: Props) {
  const presentation = presentStory(story);

  return (
    <PageContainer>
      <Stack size="lg">
        <div>
          <p className={typography.eyebrow}>{presentation.hero.eyebrow}</p>

          <h1 className={typography.pageTitle}>{presentation.hero.title}</h1>

          <p className={["mt-4", typography.body].join(" ")}>
            {presentation.hero.narrative}
          </p>
        </div>

        <Card className="border-pink-300/20 bg-pink-500/10">
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className={typography.eyebrow}>Capítulos</p>
              <p className={["mt-2", typography.cardTitle].join(" ")}>
                {presentation.stats.chaptersLabel}
              </p>
            </div>

            <div>
              <p className={typography.eyebrow}>Experiências</p>
              <p className={["mt-2", typography.cardTitle].join(" ")}>
                {presentation.stats.experiencesLabel}
              </p>
            </div>

            <div>
              <p className={typography.eyebrow}>Última lembrança</p>
              <p className={["mt-2", typography.cardTitle].join(" ")}>
                {presentation.stats.lastMemoryLabel}
              </p>
            </div>
          </div>
        </Card>

        {presentation.chapters.map((chapter) => (
          <Card key={chapter.id}>
            <Stack size="md">
              <div>
                <p className={typography.eyebrow}>
                  {chapter.chapterLabel} · {chapter.dateLabel}
                </p>

                <h2 className={["mt-2", typography.sectionTitle].join(" ")}>
                  {chapter.headline}
                </h2>

                <p className={["mt-3", typography.cardTitle].join(" ")}>
                  {chapter.title}
                </p>

                <div className="mt-3 inline-flex rounded-full border border-pink-300/30 bg-pink-500/10 px-4 py-2 text-sm font-semibold text-white/85">
                  {chapter.moodLabel}
                </div>
              </div>

              <blockquote className="border-l-2 border-pink-300/40 pl-4 italic text-white/80">
                {chapter.quote}
              </blockquote>

              <p className={typography.body}>{chapter.narrative}</p>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className={typography.eyebrow}>Reflexão</p>

                <p className={["mt-2", typography.body].join(" ")}>
                  {chapter.reflection}
                </p>
              </div>

              {chapter.events.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className={typography.eyebrow}>
                    Momentos deste capítulo
                  </p>

                  <div className="mt-3 space-y-4">
                    {chapter.events.map((event) => (
                      <div key={event.id}>
                        <p className={typography.body}>
                          {event.icon} {event.title}
                        </p>

                        <p className={typography.small}>{event.label}</p>

                        {event.description && (
                          <p className={["mt-2", typography.small].join(" ")}>
                            {event.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Stack>
          </Card>
        ))}

        {presentation.epilogue && (
          <Section title="Epílogo">
            <Card>
              <Stack size="md">
                <h2 className={typography.sectionTitle}>
                  {presentation.epilogue.title}
                </h2>

                <p className={typography.body}>{presentation.epilogue.text}</p>
              </Stack>
            </Card>
          </Section>
        )}

        <Section title="Continue a jornada">
          <Card className="border-pink-300/20 bg-pink-500/10">
            <Stack size="md">
              <div>
                <p className={typography.eyebrow}>Próximo passo</p>

                <h2 className={typography.sectionTitle}>
                  Qual será o próximo capítulo?
                </h2>

                <p className={["mt-3", typography.body].join(" ")}>
                  A nossa história continua. Podemos viver uma nova experiência
                  e transformar mais um momento em lembrança.
                </p>
              </div>

              <Link
                href="/dashboard"
                className="inline-flex w-fit rounded-full bg-pink-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-pink-400"
              >
                ✨ Descobrir um novo momento
              </Link>
            </Stack>
          </Card>
        </Section>
      </Stack>
    </PageContainer>
  );
}