Arquitetura do Saia da Rotina

O Saia da Rotina é organizado por domínios de negócio, usando uma arquitetura modular por features.

Módulos principais

* story: responsável pelo Livro da História.
* insights: responsável pela inteligência da relação.
* dashboard: responsável por orquestrar Story Engine e Relationship Engine.
* security: responsável por autenticação, autorização, auditoria, validação e rate limit.

Regra principal

A UI não deve importar diretamente arquivos internos de application, infrastructure, builders, rules, providers ou selectors.

A UI deve consumir apenas APIs públicas expostas em:

* features/relationship/story/public
* features/relationship/insights/public
* features/relationship/dashboard/public

Fluxo geral

UI
↓
Dashboard Public API
↓
Dashboard Engine
↓
Story Engine + Relationship Engine
↓
Domain