DATA CLASSIFICATION

Projeto: Saia da Rotina
Versão: 1.0
Status: Oficial

⸻

Objetivo

Este documento define a classificação oficial de todos os dados tratados pelo Saia da Rotina.

A classificação determina:

* requisitos de armazenamento;
* regras de acesso;
* requisitos de criptografia;
* política de retenção;
* requisitos de auditoria;
* necessidade de consentimento;
* requisitos para exportação e exclusão de dados.

Toda nova entidade criada no sistema deverá ser adicionada a este documento.

⸻

Níveis de Classificação

Público

Informações que podem ser divulgadas sem impacto para usuários ou empresa.

Exemplos:

* artigos públicos;
* páginas institucionais;
* FAQ;
* conteúdo de marketing.

⸻

Interno

Informações utilizadas pela plataforma que não devem ser expostas publicamente.

Exemplos:

* IDs internos;
* Feature Flags;
* configuração de categorias;
* métricas agregadas.

⸻

Pessoal

Dados que identificam ou podem identificar uma pessoa.

Exemplos:

* nome;
* e-mail;
* avatar;
* cidade;
* data de nascimento.

Esses dados seguem integralmente a LGPD.

⸻

Sensível

Dados relacionados ao relacionamento do casal ou ao comportamento dentro do aplicativo.

Exemplos:

* matches;
* experiências favoritas;
* histórico de respostas;
* timeline;
* datas especiais;
* preferências de presentes;
* comentários privados.

Esses dados possuem acesso restrito exclusivamente ao casal.

⸻

Crítico

Dados cuja exposição pode gerar danos relevantes à privacidade do casal.

Exemplos:

* Relationship DNA;
* perfis comportamentais;
* recomendações personalizadas;
* preferências íntimas;
* inferências geradas pela IA.

Esses dados exigem proteção máxima.

⸻

Classificação das Entidades

Entidade	Classificação
Users	Pessoal
Couples	Pessoal
Ideas	Interno
Responses	Sensível
Timeline	Sensível
Matches	Sensível
Relationship DNA	Crítico
Knowledge Engine	Crítico
Product Recommendations	Sensível
Analytics Agregado	Interno
Analytics Individual	Sensível
Audit Logs	Interno
Payment History	Sensível

⸻

Regras de Acesso

Público

Pode ser acessado sem autenticação.

⸻

Interno

Apenas serviços autorizados.

⸻

Pessoal

Somente o próprio usuário.

⸻

Sensível

Somente os membros do casal.

Nenhum administrador poderá visualizar esses dados diretamente.

Caso suporte técnico seja necessário, deverá existir autorização explícita do usuário.

⸻

Crítico

Nunca poderá ser utilizado para decisões automatizadas sem supervisão das regras de negócio.

Esses dados:

* não poderão aparecer em logs;
* não poderão ser utilizados em treinamento de IA sem consentimento;
* não poderão ser compartilhados com terceiros.

⸻

Criptografia

Todos os dados classificados como Sensíveis ou Críticos deverão utilizar:

* criptografia em trânsito;
* criptografia em repouso;
* conexões HTTPS;
* armazenamento protegido pelo provedor.

Quando houver necessidade de armazenamento adicional, deverão ser utilizados mecanismos modernos de criptografia.

⸻

Retenção

Os dados deverão permanecer armazenados apenas pelo tempo necessário para cumprir sua finalidade.

Quando o usuário solicitar exclusão:

* dados pessoais deverão ser removidos;
* dados sensíveis deverão ser apagados ou anonimizados quando permitido por lei;
* eventos de auditoria poderão ser preservados quando houver obrigação legal.

⸻

Exportação

Todo usuário poderá solicitar a exportação de seus dados.

O formato deverá ser estruturado e legível.

⸻

Exclusão

O Saia da Rotina deverá oferecer mecanismos para:

* exclusão da conta;
* exclusão do casal;
* exclusão de experiências;
* exclusão de memórias;
* revogação de consentimentos.

⸻

Responsabilidade

Todo desenvolvedor que criar uma nova tabela, evento ou entidade deverá definir sua classificação antes da implementação.

Nenhum dado poderá ser armazenado sem classificação oficial.

A classificação faz parte da definição de pronto (Definition of Done) do projeto.