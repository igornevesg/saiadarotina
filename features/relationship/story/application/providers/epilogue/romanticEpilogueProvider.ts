import { romanticEpilogues } from "@/features/relationship/story/application/providers/epilogue/romanticEpilogues";
import { selectEpilogueVariant } from "@/features/relationship/story/application/selectors/epilogueVariantSelector";
import type { StoryEpilogue } from "@/features/relationship/story/domain/storyEpilogue";
import type { StorySummaryContext } from "@/features/relationship/story/domain/storySummaryContext";

export function getRomanticEpilogue(
  context: StorySummaryContext
): StoryEpilogue {
  const epilogue = selectEpilogueVariant(romanticEpilogues, context);

  return {
    title: epilogue.title,
    text: epilogue.text,
    generatedAt: new Date().toISOString(),
  };
}