# RFC-003 — Event Bus

Status: Aprovada

Versão: 1.0

Data: 25/06/2026

Autores:
- Igor Neves (Founder & Product Owner)
- CTO

---

# 1. Objetivo

Definir a arquitetura orientada a eventos (Event-Driven Architecture) do Saia da Rotina.

O Event Bus será o sistema responsável por distribuir eventos produzidos pelos diferentes domínios da plataforma para todos os módulos interessados.

O objetivo é eliminar dependências diretas entre módulos e permitir que o sistema cresça de forma desacoplada.

---

# 2. Motivação

Hoje uma ação normalmente produz apenas um resultado.

Exemplo:

Usuário responde uma experiência.

↓

Resposta salva.

↓

Fim.

No futuro, essa mesma ação deverá alimentar diversos módulos simultaneamente.

Exemplo:

Experiência concluída

↓

Timeline

↓

Knowledge Engine

↓

Relationship DNA

↓

Analytics

↓

Story Engine

↓

Dashboard

↓

Gamificação

↓

Notificações

Tudo isso deverá acontecer sem que um módulo conheça o outro.

---

# 3. Princípios

O Event Bus seguirá os seguintes princípios:

- Baixo acoplamento.
- Alta coesão.
- Escalabilidade.
- Observabilidade.
- Idempotência.
- Compatibilidade futura com filas e mensageria.

---

# 4. Tipos de Eventos

Os eventos representam acontecimentos do domínio.

Exemplos:

RelationshipCreated

ExperienceAnswered

ExperienceMatched

ExperienceCompleted

MemoryCreated

MemoryUpdated

SpecialDateCreated

MissionCompleted

ProductClicked

ProductPurchased

RelationshipDNAUpdated

StoryGenerated

BookGenerated

---

# 5. Fluxo

O fluxo padrão será:

Usuário

↓

Service

↓

Repository

↓

Persistência

↓

Publicação do Evento

↓

Event Bus

↓

Consumidores

Nenhuma tela publicará eventos diretamente.

Nenhuma tela consumirá eventos diretamente.

---

# 6. Consumidores

Inicialmente o Event Bus possuirá os seguintes consumidores:

Timeline

Knowledge Engine

Analytics

Relationship DNA

Story Engine

Recommendation Engine

Dashboard Premium

No futuro poderão existir novos consumidores sem necessidade de alterar quem publica os eventos.

---

# 7. Eventos x Analytics

Eventos de domínio NÃO são eventos de analytics.

Exemplo:

ExperienceCompleted

↓

Evento de negócio.

Analytics registrará posteriormente:

experience_completed

↓

Evento analítico.

Essa separação evita dependências entre negócio e métricas.

---

# 8. Segurança

Nenhum evento poderá transportar informações desnecessárias.

Os eventos deverão conter apenas o mínimo necessário para que os consumidores executem suas responsabilidades.

Dados sensíveis deverão ser buscados apenas quando estritamente necessários e sempre respeitando as políticas de acesso.

---

# 9. Evolução

Inicialmente o Event Bus será implementado de forma síncrona.

No futuro poderá ser migrado para:

- filas;
- workers;
- processamento assíncrono;
- webhooks;
- mensageria distribuída.

Essa mudança não deverá impactar os domínios consumidores.

---

# 10. Critérios de Aceite

O Event Bus será considerado implementado quando:

- todos os eventos de domínio forem publicados por Services;
- consumidores puderem ser adicionados sem alterar os produtores;
- Analytics consumir eventos sem acoplamento ao domínio;
- Recommendation Engine consumir eventos;
- Knowledge Engine consumir eventos.

---

# Aprovação

✅ Product Owner

✅ CTO

---

"O Event Bus representa o sistema nervoso do Saia da Rotina."