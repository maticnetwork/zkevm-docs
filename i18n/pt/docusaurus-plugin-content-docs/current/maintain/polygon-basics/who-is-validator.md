---
id: who-is-validator
title: O que é um Validador
sidebar_label: Who is a Validator
description: "Um participante na rede que executa nós Heimdall e BOR."
keywords:
  - docs
  - matic
  - polygon
  - validator
  - Who is a Validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

O Validador é um participante da rede que bloqueia tokens MATIC no sistema e executa os nós do produtor de blocos do Heimdall e do Bor para ajudar a executar a rede. Os validadores fazem stake dos seus tokens MATIC como garantia para trabalhar para a segurança da rede e, em troca do seu serviço, ganham recompensas.

As recompensas são distribuídas a todos os stakers proporcionalmente à sua stake em cada checkpoint, com a exceção de o proponente receber um bónus adicional. O saldo de recompensa do utilizador é atualizado no contrato que é mencionado ao reivindicar recompensas.

Stakes correm o risco de serem cortadas no caso de o nó de validador cometer um ato malicioso como assinatura dupla, que também afeta os delegadores vinculados naquele checkpoint.

:::tip

Aqueles que estão interessados em proteger a rede, mas não estão executando um nó completo podem participar como [delegadores](/docs/maintain/glossary.md#delegator).

:::

## Visão geral {#overview}

Os validadores da rede da Polygon são selecionados através de um processo de leilão dentro da chain que tem lugar em intervalos regulares. Estes validadores selecionados participam como produtores e verificadores de blocos. Quando um [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) é validado pelos participantes, são feitas atualizações na chain principal (a mainnet Ethereum) que libera recompensas para os validadores, dependendo da sua stake na rede.

A Polygon depende de um conjunto de [validadores](/docs/maintain/glossary.md#validator) para proteger a rede. O papel dos validadores é executar um nó completo, [produzir blocos](/docs/maintain/glossary.md#block-producer), validar, participar no consenso e vincular [checkpoints](/docs/maintain/glossary.md#checkpoint-transaction) na mainnet Ethereum. Para se tornar um validador, é necessário fazer [stake](/docs/maintain/glossary.md#staking) dos seus tokens MATIC com contratos de gestão staking a residir na mainnet Ethereum.

## Componentes do núcleo {#core-components}

[Heimdall](/docs/maintain/glossary.md#heimdall) lê os eventos emitidos pelos contratos staking para escolher os validadores para o conjunto atual com a sua taxa stake atualizada, que é também usada por [BOR](/docs/maintain/glossary.md#bor) enquanto produz blocos.

[Delegação](/docs/maintain/glossary.md#delegator)também é registada nos contratos staking e qualquer atualização na competência do validador ou nó do [endereço do signatário](/docs/maintain/glossary.md#signer-address) ou pedidos de desvinculação entra em vigor quando o próximo checkpoint é vinculado.


## Fluxo de ponta a ponta para um validador Polygon {#end-to-end-flow-for-a-polygon-validator}

Os validadores configuram os seus nós de assinatura, sincronizam os dados e depois fazem stake dos seus tokens nos contratos de staking mainnet Ethereum para serem aceites como um validador no conjunto atual. Se uma posição estiver aberta, o validador é aceite imediatamente. Caso contrário, é necessário passar pelo mecanismo de substituição para ter uma abertura.

:::warning

Há um limite para a aceitação de novos validadores. Novos validadores só podem participar do conjunto ativo quando um validador ativo se desvincula. Será lançado um novo processo de leilão para a substituição de validadores.

:::

Os produtores de bloco são escolhidos a partir do conjunto de validadores onde é da responsabilidade dos validadores selecionados produzir blocos para um determinado [span](/docs/maintain/glossary.md#span).

Os nós Heimdall validam os blocos que estão a ser produzidos, participam no consenso e vinculam checkpoints na mainnet Ethereum em intervalos definidos.

A probabilidade de validadores serem selecionados como produtor de bloco ou [proponente](/docs/maintain/glossary.md#proposer) checkpoint, depende da taxa de stake de cada um, incluindo delegações no pool geral.

Os validadores recebem recompensas em cada checkpoint de acordo com a sua taxa de stake, após a dedução do bónus do proponente que é desembolsado ao proponente checkpoint.

Pode-se optar por sair do sistema a qualquer momento e retirar tokens assim que o período de desvinculação terminar.

## Economia {#economics}

Ver [Recompensas](/docs/maintain/validator/rewards).

## Configurar um nó de validador {#setting-up-a-validator-node}

Ver [Validar](/docs/maintain/validate/validator-index).

## Ver também {#see-also}

* [Responsabilidades de validador](/docs/maintain/validate/validator-responsibilities)
* [Validar](/docs/maintain/validate/validator-index)
* [Validador Perguntas Frequentes](/docs/maintain/validate/faq/validator-faq)
