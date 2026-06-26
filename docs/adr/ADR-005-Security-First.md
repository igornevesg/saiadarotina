ADR-005 — Security First

Status: Aceito

Contexto

O Saia da Rotina trata dados sensíveis relacionados à vida privada de casais.

Qualquer falha de segurança compromete diretamente a confiança no produto.

⸻

Decisão

Segurança será considerada um requisito de primeira classe.

Nenhuma funcionalidade poderá entrar em produção sem revisão de:

* autenticação;
* autorização;
* LGPD;
* auditoria;
* proteção contra OWASP Top 10;
* classificação dos dados envolvidos.

⸻

Consequências

O desenvolvimento poderá ser mais lento em algumas etapas.

Entretanto, essa decisão reduz significativamente riscos de vazamento de dados, incidentes de segurança e problemas regulatórios.

A confiança do usuário é considerada um ativo estratégico do produto.