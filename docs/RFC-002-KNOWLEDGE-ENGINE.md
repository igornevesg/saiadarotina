# RFC-002 — Knowledge Engine

Status: Aprovada  
Versão: 1.0  
Data: 25/06/2026  
Autores: Igor Neves e CTO.

## Objetivo

Criar o Knowledge Engine do Saia da Rotina.

O Knowledge Engine será responsável por transformar eventos do aplicativo em conhecimento reutilizável para recomendações, IA, Dashboard, Relationship DNA, Story Engine e futuras funcionalidades.

## Princípio central

O Knowledge Engine não é a IA.

Ele é a base de conhecimento que permitirá que a IA tome decisões melhores, mais seguras e mais explicáveis.

## Fontes de dados

- Respostas dos usuários
- Matches
- Cliques em produtos
- Experiências realizadas
- Memórias
- Avaliações
- Datas especiais
- Compras futuras
- Interações com Academia
- Jogos
- Missões

## Saídas esperadas

- Padrões de preferência
- Relações entre experiências
- Relações entre produtos
- Tendências por categoria
- Sinais para Relationship DNA
- Sinais para Recommendation Engine
- Sinais para Story Engine
- Insights comerciais

## Segurança e LGPD

Todos os dados deverão seguir Privacy by Design.

O Knowledge Engine deve trabalhar preferencialmente com dados agregados, pseudonimizados e minimizados.

Nenhuma inferência sensível deverá ser exibida ao usuário como julgamento.

## Regra de linguagem

Nunca dizer:

“Seu relacionamento piorou.”

Preferir:

“Talvez seja um bom momento para experimentar algo diferente juntos.”

## Dependências

- Relationship Core
- Analytics Events
- Recommendation Engine
- Dashboard Premium
- IA futura

## Critério de aceite

Esta RFC estará implementada quando o sistema conseguir consumir eventos, transformar em sinais e expor esses sinais para recomendações e dashboards sem acessar diretamente dados sensíveis desnecessários.