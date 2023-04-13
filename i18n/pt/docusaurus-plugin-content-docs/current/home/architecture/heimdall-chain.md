---
id: heimdall-chain
title: O que é a Heimdall Chain?
sidebar_label: Heimdall Chain
description: Construa a sua próxima aplicação blockchain na Polygon.
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - checkpoint
  - pos
  - verifier
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Heimdall chain {#heimdall-chain}

A Heimdall é uma camada de verificação de Proof of Stake da Polygon, responsável pelo checkpoint de uma representação dos blocos Plasma na chain principal da nossa arquitetura. Foi implementada através da construção sobre o mecanismo de consenso Tendermint com alterações no esquema de assinatura e diversas estruturas de dados.

O contrato do Gestor de Estacas da cadeia principal trabalha em conjunto com o nó Heimdall para atuar como mecanismo de gerenciamento de estacas sem confiança do motor PoS, incluindo selecionar o conjunto de validadores, atualizar validadores, etc. Como o staking é realmente feito no contrato inteligente Ethereum, não dependemos apenas da honestidade do validador e, em vez disso, herdamos a segurança da cadeia do Ethereum desta parte chave.

A camada Heimdall lida com a agregação de blocos produzidos por BOR para uma árvore Merkle e a publicação periódica da raiz Merkle na chain ROOT. Esta publicação periódica é chamada de **"checkpoint"**. Por cada pequeno conjunto de blocos em BOR, um validador (na camada Heimdall):

1. Valida todos os blocos desde o último checkpoint
2. Cria uma árvore Merkle dos hashes dos blocos
3. Publica a ROOT Merkle na chain principal

Os checkpoints são importantes por duas razões:

1. Garantem o caráter definitivo na chain ROOT
2. Garantem o Proof of Burn no saque de ativos

Numa visão panorâmica, o processo pode ser explicado da seguinte forma:

- Um subconjunto de validadores ativos da pool é selecionado para atuar como produtores de blocos para um período. A Seleção de cada período também será consentida por pelo menos 2/3 de ativos. Estes produtores de blocos são responsáveis pela criação de blocos e transmissão deles para a rede restante.
- Um checkpoint inclui a ROOT de todos os blocos criados durante um determinado intervalo. Todos os nós validam o mesmo e anexam as assinaturas a ele.
- Um proponente selecionado do conjunto de validadores é responsável por coletar todas as assinaturas para um determinado ponto de verificação e cometer o mesmo na chain principal.
- A responsabilidade de criar blocos e também de propor checkpoints é variavelmente dependente da taxa de participação de um validador na pool geral.