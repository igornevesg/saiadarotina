import { adventureNarratives } from "@/features/relationship/story/application/providers/romantic/adventureNarratives";
import { celebrationNarratives } from "@/features/relationship/story/application/providers/romantic/celebrationNarratives";
import { connectionNarratives } from "@/features/relationship/story/application/providers/romantic/connectionNarratives";
import { discoveryNarratives } from "@/features/relationship/story/application/providers/romantic/discoveryNarratives";
import { routineNarratives } from "@/features/relationship/story/application/providers/romantic/routineNarratives";
import { romanticQuotes } from "@/features/relationship/story/application/quotes/romanticQuotes";
import { selectQuote } from "@/features/relationship/story/application/selectors/quoteSelector";
import { selectNarrativeVariant } from "@/features/relationship/story/application/selectors/narrativeVariantSelector";
import type { NarrativeVariant } from "@/features/relationship/story/domain/NarrativeVariant";
import type { StoryContext } from "@/features/relationship/story/domain/storyContext";
import { romanticReflections } from "@/features/relationship/story/application/reflections/romanticReflections";
import { selectReflection } from "@/features/relationship/story/application/selectors/reflectionSelector";
import { romanticTitles } from "@/features/relationship/story/application/titles/romanticTitles";
import { selectTitle } from "@/features/relationship/story/application/selectors/titleSelector";

const romanticNarratives: NarrativeVariant[] = [
  ...discoveryNarratives,
  ...connectionNarratives,
  ...routineNarratives,
  ...adventureNarratives,
  ...celebrationNarratives,
];

export function getRomanticNarrative(
  context: StoryContext,
  seed = "default"
) {
  const selectedPackage = selectNarrativeVariant(
    romanticNarratives,
    context,
    seed
  );

  return {
  ...selectedPackage,
  title: selectTitle(romanticTitles, seed),
  quote: selectQuote(romanticQuotes, seed),
  reflection: selectReflection(romanticReflections, seed),
};
}