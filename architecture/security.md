Segurança do Saia da Rotina

Este documento define as regras obrigatórias de segurança do projeto.

Regra central

Nenhuma rota da API pode confiar em userId, coupleId ou qualquer identificador sensível enviado pelo frontend para decidir permissões.

A autorização deve sempre ser derivada da identidade autenticada do usuário no servidor.

Checklist obrigatório por sprint

Antes de avançar para a próxima sprint, validar:

* npm run build passou.
* npm run test:run passou.
* Nenhuma rota sensível ficou pública.
* Nenhuma rota usa coupleId do client como autenticação.
* Inputs são validados.
* Erros não expõem stack trace nem dados internos.
* Logs não expõem dados sensíveis.
* Rate limit aplicado em rotas sensíveis.
* Nenhum segredo foi commitado.
* .env permanece fora do Git.
* Nenhum uso de service role no client.
* Nenhum dado sensível novo foi exposto na resposta da API.

MVP

Durante o MVP, rotas protegidas devem falhar fechadas quando não houver autenticação real.

É melhor retornar 403 Forbidden do que simular autenticação insegura.

Produção

Antes do lançamento oficial, será obrigatório:

* Supabase Auth real.
* Resolver coupleId pelo usuário autenticado.
* RLS ativo em todas as tabelas sensíveis.
* Revisão de policies.
* Revisão de buckets.
* Scanner de secrets.
* Scanner de dependências.
* CI/CD com checks de segurança.
* CSP headers.
* Lockfile versionado.
* Ambientes separados para desenvolvimento, staging e produção.