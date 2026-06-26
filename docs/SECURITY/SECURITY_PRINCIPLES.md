SECURITY PRINCIPLES

Projeto: Saia da Rotina
Versão: 1.0
Status: Oficial

⸻

Introdução

O Saia da Rotina é uma plataforma dedicada ao fortalecimento de relacionamentos.

Diferentemente de um e-commerce tradicional, este sistema armazena informações que podem revelar aspectos íntimos da vida de um casal, como interesses, experiências, preferências, datas especiais, histórico de atividades e, futuramente, perfis comportamentais derivados do Relationship DNA.

Por esse motivo, segurança não é uma funcionalidade.

Segurança é um requisito fundamental do produto.

Toda decisão técnica deverá respeitar os princípios descritos neste documento.

⸻

Missão

Proteger os dados dos casais com o mesmo nível de cuidado esperado em sistemas financeiros.

Toda decisão deverá considerar:

* Confidencialidade
* Integridade
* Disponibilidade
* Privacidade
* Auditabilidade

⸻

Zero Trust

O Saia da Rotina adota oficialmente a filosofia Zero Trust.

Nenhuma informação recebida pelo servidor será considerada confiável por padrão.

Todo acesso deverá ser autenticado, autorizado e validado.

⸻

Privacy by Design

Privacidade será considerada desde a concepção de qualquer funcionalidade.

Toda feature deverá responder às seguintes perguntas:

* Qual dado será coletado?
* Esse dado é realmente necessário?
* Existe uma alternativa menos invasiva?
* Quem poderá acessar esse dado?
* Por quanto tempo esse dado será armazenado?
* Como esse dado será removido quando solicitado?

Caso alguma resposta seja indefinida, a funcionalidade não deverá ser implementada.

⸻

Data Minimization

O sistema deverá armazenar apenas os dados estritamente necessários para cumprir sua finalidade.

Nenhum dado será coletado “para uso futuro”.

Todo dado armazenado deverá possuir uma justificativa funcional.

⸻

Least Privilege

Cada usuário, serviço ou processo deverá possuir apenas as permissões mínimas necessárias para executar sua função.

Permissões excessivas são consideradas falhas de segurança.

⸻

Defense in Depth

Nenhuma camada isolada será considerada suficiente.

Toda funcionalidade deverá possuir múltiplas camadas independentes de proteção.

Exemplo:

* Autenticação
* Autorização
* Row Level Security
* Validação de entrada
* Auditoria
* Logs estruturados

⸻

Server First

Regras de negócio nunca deverão depender exclusivamente do Front-end.

Toda validação crítica deverá ocorrer no servidor.

O cliente existe apenas para oferecer uma boa experiência ao usuário.

⸻

Secrets

Nenhuma credencial poderá existir em:

* Front-end
* Repositório Git
* Logs
* Prints
* Arquivos públicos

Todos os segredos deverão permanecer exclusivamente no ambiente do servidor.

⸻

LGPD

Todo tratamento de dados deverá respeitar os princípios da Lei Geral de Proteção de Dados.

Especial atenção será dada aos seguintes princípios:

* Finalidade
* Necessidade
* Adequação
* Transparência
* Segurança
* Prevenção
* Responsabilização

⸻

Logs

Logs nunca deverão registrar:

* Senhas
* Tokens
* Preferências íntimas
* Relationship DNA completo
* Dados pessoais sensíveis
* Informações financeiras

Logs deverão conter apenas informações necessárias para auditoria e investigação.

⸻

Auditoria

Toda operação sensível deverá ser auditável.

Exemplos:

* Login
* Exclusão de dados
* Alteração de Relationship DNA
* Alteração de permissões
* Exportação de dados
* Geração de Livro da História
* Compras
* Integrações externas

⸻

Secure by Default

Toda funcionalidade deverá nascer segura.

Não será aceito o argumento:

“Implementamos primeiro e protegemos depois.”

⸻

Revisão Obrigatória

Nenhuma Pull Request será aprovada sem responder às seguintes perguntas:

* Existe risco de vazamento de dados?
* Existe risco de acesso entre casais?
* Existe risco de enumeração?
* Existe risco de exposição de segredos?
* Existe risco de XSS?
* Existe risco de CSRF?
* Existe risco de SQL Injection?
* Existe risco de IDOR?
* Existe risco de Replay Attack?
* Existe risco de Privilege Escalation?

Caso qualquer resposta seja positiva, a implementação deverá ser revisada antes do merge.

⸻

Filosofia

O casal deposita no Saia da Rotina informações que talvez nunca compartilhe com outras pessoas.

Essa confiança deverá ser preservada em todas as decisões técnicas.

Nenhuma funcionalidade, ganho de performance ou facilidade de implementação poderá justificar a redução do nível de segurança da plataforma.

Segurança é parte da experiência do usuário.

Confiança é o principal ativo do Saia da Rotina.