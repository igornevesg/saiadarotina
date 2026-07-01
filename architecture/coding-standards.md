Padrões de Código

Nomes de arquivos

Arquivos devem usar camelCase com primeira letra minúscula.

Exemplos corretos:

* storyContext.ts
* relationshipDashboard.ts
* insightMetrics.ts

Nomes de tipos

Types e interfaces devem usar PascalCase.

Exemplos:

* RelationshipDashboard
* InsightMetrics
* StoryContext

Imports

Sempre usar alias @.

Correto:
import type { StoryEvent } from "@/features/relationship/story/public";

Evitar imports relativos como:
import type { StoryEvent } from "../../../story/domain/Chapter";

APIs públicas

Outros módulos devem importar apenas de public.

Correto:
import { buildRelationshipStory } from "@/features/relationship/story/public";

Evitar:
import { buildStoryFromTimeline } from "@/features/relationship/story/infrastructure/builders/storyBuilder";

Segurança

Nenhuma rota deve confiar em userId, coupleId ou identificadores sensíveis enviados pelo frontend para decidir autorização.