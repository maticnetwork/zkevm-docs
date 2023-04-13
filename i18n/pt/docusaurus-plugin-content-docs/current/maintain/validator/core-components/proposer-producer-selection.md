---
id: proposers-producers-selection
title: Seleção de Proponentes e Produtores
sidebar_label: Proposers & Producers
description: Seleção de produtores de propositores e blocos no Polygon
keywords:
  - docs
  - polygon
  - matic
  - proposers
  - block producers
  - selection
slug: proposers-producers-selection
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Os Produtores de Blocos para a camada BOR são um comité selecionado do pool de Validadores com base no seu stake que acontece em intervalos regulares. Esses intervalos são decididos pela governação do Validador em relação à dinastia e à rede.

A taxa de [stake](/docs/maintain/glossary.md#staking) especifica a probabilidade de se ser selecionado como um membro do comité de [produtores de blocos](/docs/maintain/glossary.md#block-producer).

## Processo de seleção {#selection-process}

Vamos supor que temos 3 validadores no pool, Alice, Bill e Clara:

* Alice está a fazer staking de 100 tokens MATIC.
* Bill está a fazer staking de 40 tokens MATIC.
* Clara está a fazer staking de 40 tokens MATIC.

Os validadores recebem slots de acordo com o stake.

Uma vez que a Alice tem 100 tokens MATIC de stake e o custo por slot é 10 tokens MATIC conforme mantido pela governação de validador, a Alice recebe 5 slots no total. Da mesma forma, o Bill e a Clara obtêm 2 slots no total.

Os validadores de Alice, Bill e Clara recebem os seguintes slots:

* [A, A, A, A, A, B, B, C, C]

A Polygon então reorganiza o grupo dos slots de Alice, Bill e Clara usando os hashes do bloco Ethereum como semente.

O resultado deste processo é o seguinte grupo de slots:

* [A, B, A, A, C, B, A, A, C]

Agora, dependendo da contagem total do produtor de blocos conforme mantida pela governação de validador, a Polygon usa os validadores do topo. Por exemplo, para um conjunto de 5 produtores, o grupo de slots é [A, B, A, A, C].

O produtor configurado para o próximo span é definido como [A: 3, B:1, C:1].

Usando o conjunto resultante de validadores e o [algoritmo de seleção de proponente](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html) de Tendermint, a Polygon seleciona um produtor para cada sprint no BOR.

<img src={useBaseUrl("img/validators/producer-proposer.png")} />

**Legenda:**

* Dinastia: intervalo de tempo entre o final do último leilão e o início do próximo.
* Sprint: Intervalo de tempo durante o qual o comité de produtores de blocos é selecionado.
* Span: Número de blocos produzidos por um único produtor.
