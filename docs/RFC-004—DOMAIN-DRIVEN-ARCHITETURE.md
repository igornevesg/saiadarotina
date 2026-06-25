# RFC-004 — Domain Driven Architecture

Status: Aprovada

Versão: 1.0

Data: 25/06/2026

Autores:
- Igor Neves (Founder & Product Owner)
- CTO

---

# 1. Objetivo

Definir a arquitetura baseada em domínios (Domain Driven Architecture) do Saia da Rotina.

O sistema deverá crescer representando o negócio e não a interface gráfica.

---

# 2. Motivação

Projetos pequenos normalmente organizam arquivos por páginas.

À medida que crescem, essa estrutura torna-se difícil de manter.

O Saia da Rotina será organizado por domínios de negócio.

---

# 3. Domínios Oficiais

Relationship

Responsável por:

- Timeline
- Memories
- Story Engine
- Special Dates
- Relationship DNA
- Livro da História do Casal

---

Experiences

Responsável por:

- Experiências
- Tags
- Matches
- Categorias
- Favoritos

---

Commerce

Responsável por:

- Produtos
- Shopify
- Campanhas
- Attribution Engine

---

Intelligence

Responsável por:

- Knowledge Engine
- Recommendation Engine
- Story Engine
- Relationship DNA
- Insight Engine
- Weather Engine

---

Platform

Responsável por:

- Segurança
- Analytics
- Feature Flags
- Logs
- Auditoria
- Notificações
- Autenticação

---

# 4. Estrutura Física

Cada domínio deverá possuir estrutura semelhante.

Exemplo:

relationship/

api/

repositories/

services/

types/

hooks/

events/

validators/

utils/

---

# 5. Regras

As páginas nunca acessam o banco diretamente.

Sempre:

Page

↓

Service

↓

Repository

↓

Banco

---

Domínios nunca dependem diretamente uns dos outros.

A comunicação deverá ocorrer por:

- eventos;
- contratos;
- serviços compartilhados.

---

Nenhuma regra de negócio poderá ficar em componentes React.

---

Toda lógica deverá existir dentro do domínio correspondente.

---

# 6. Camadas

Cada domínio poderá conter:

Application

Domain

Infrastructure

Presentation

Essa divisão poderá ser adotada gradualmente.

---

# 7. Benefícios

Baixo acoplamento.

Alta coesão.

Facilidade de testes.

Escalabilidade.

Manutenção.

Evolução independente dos domínios.

---

# 8. Segurança

Toda comunicação entre domínios deverá respeitar:

- autenticação;
- autorização;
- LGPD;
- princípio do menor privilégio.

---

# 9. Evolução

Novos domínios poderão ser adicionados.

Exemplos futuros:

Community

Marketplace

AI Platform

White Label

---

# 10. Critérios de Aceite

A arquitetura será considerada adotada quando:

- nenhum domínio acessar diretamente outro domínio;
- todas as páginas utilizarem Services;
- todas as consultas ao banco forem realizadas por Repositories;
- novos módulos puderem ser adicionados sem alterar domínios existentes.

---

# Aprovação

✅ Product Owner

✅ CTO

---

"O código deve refletir o negócio e não as telas."