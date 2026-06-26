ADR-001 — Event-Driven Architecture

Status: Aceito

Contexto

O Saia da Rotina possui diversas funcionalidades que reagem aos mesmos acontecimentos.

Exemplos:

* Timeline
* Analytics
* Relationship DNA
* Knowledge Engine
* Recomendações
* Conquistas
* Livro da História

Acoplar todas essas responsabilidades diretamente às APIs aumentaria significativamente a complexidade do sistema.

⸻

Decisão

Adotar uma arquitetura orientada a eventos.

Toda ocorrência relevante deverá gerar um Domain Event.

Exemplos:

* MatchCreated
* ExperienceCompleted
* MemoryCreated
* ProductPurchased
* SpecialDateAdded

Os consumidores desses eventos deverão permanecer desacoplados.

⸻

Consequências

Benefícios

* baixo acoplamento;
* alta extensibilidade;
* facilidade para adicionar novas funcionalidades;
* melhor testabilidade;
* integração facilitada com filas futuras.

Custos

* maior complexidade inicial;
* necessidade de rastreamento dos eventos.

⸻

Revisão

Caso o volume de eventos cresça significativamente, o Event Dispatcher poderá ser substituído por soluções distribuídas como Kafka, RabbitMQ ou Google Pub/Sub sem alterar a camada de domínio.