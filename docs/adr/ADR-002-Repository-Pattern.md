ADR-002 — Repository Pattern

Status: Aceito

Contexto

O acesso direto ao Supabase espalhado pelo projeto dificulta manutenção, testes e futuras migrações.

⸻

Decisão

Todo acesso a dados deverá ocorrer através de Repositories.

Nenhuma camada de negócio poderá acessar diretamente o banco.

Fluxo oficial:

Controller

↓

Service

↓

Repository

↓

Database

⸻

Benefícios

* isolamento do banco;
* facilidade para testes;
* menor acoplamento;
* possibilidade de trocar o provedor de banco no futuro.

⸻

Consequências

Pequeno aumento na quantidade de código em troca de maior previsibilidade e organização.