---
id: liquid-delegation
title: Delegação líquida
sidebar_label: Liquid Delegation
description: Como a Polygon utiliza a delegação líquida para manter a rede.
keywords:
  - docs
  - polygon
  - matic
  - delegation
  - liquid delegation
slug: liquid-delegation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Num mecanismo tradicional de Prova de Estaca, o blockchain mantém o controle de um conjunto de validadores. Qualquer pessoa pode ingressar nesta classificação ou direito de validar transações enviando um tipo especial de transação que estaca as suas moedas (no caso do Ethereum, ETH) e bloqueia um depósito. Depois, o processo de criação e concordância com novos blocos é feito através de um algoritmo de consenso por todos os validadores ativos.

Eles bloqueiam parte da sua participação por um certo período de tempo (como um depósito de segurança) e, em troca de mais, têm uma chance proporcional à referida participação para selecionar o próximo bloco.

As recompensas de classificação são distribuídas como incentivo aos participantes.

## Delegação {#delegation}

A marcação pode ser cara, aumentando a barreira à entrada, que favorece o rico ficar mais rico. Todos devem participar na segurança da rede e receber tokens de apreciação. A única opção é juntar um pool de staking semelhante a um pool de mineração, onde os validadores devem ser confiáveis. Acreditamos que a aderência ao protocolo é o melhor curso de ação para novos delegadores. Como o capital e as recompensas estão abertas e protegidas por mecanismos do protocolo

Os delegadores podem participar na validação mesmo que não hospedem nós inteiros. No entanto, ao assentar com validadores, eles podem aumentar a força da rede e ganhar recompensas pagando uma pequena taxa de comissão (que varia dependendo do validador) para o validador de sua escolha.

## Limitação do Delegador e Validador Tradicional {#limitation-of-traditional-delegator-and-validator}

O custo de bloqueio de capital tanto para validadores como para delegadores é elevado devido ao design do protocolo Proof of Stake.

Ainda podemos trazer mais mecanismo de visualização de liquidez como o validador NFT onde qualquer novo partido que queira se tornar validador pode comprar o validador NFT de um validador que queira sair do sistema por algum motivo.

No caso de delegadores, a quantidade bloqueada é presumida como sendo em pedaços menores, então queremos que seja líquida para que a participação seja mais ativa (isto é, se algum delegador achar que as oportunidades são ótimas no DeFi, mas o capital deles está bloqueado no pool de staking mesmo para retirada, eles ainda precisam esperar por 21 dias).

Além disso, o bloqueio do X ETH num depósito não é gratuito; implica um sacrifício de opcionalidade para o titular do ETH. Neste momento, se tiver 1000 ETH, pode fazer o que quiser com ele. Se o bloquear num depósito, ele está preso durante meses para evitar ataques como [**nada em jogo**](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed) e punir validadores pela má participação.

## In-protocolo vs camada de aplicativos {#in-protocol-vs-application-layer}

A liquidação de staking no nível de aplicação tem problema de confiança. A liquidação de staking de nível de protocolos é muito mais apreciada devido ao fato de que qualquer novo ator pode confiar nela (que atrai mais capital, mesmo de pequenos atores / delegadores).

## Solução da Polygon para a delegação {#polygon-s-solution-for-delegation}

Enquanto explorava a delegação, percebemos que a delegação precisa estar no protocolo para ter mais confiança dos delegadores.

Estávamos enfrentando problemas semelhantes à liquidez do capital de validadores e pensávamos em torná-lo um NFT que pode ser transferências e explorar pensamentos semelhantes, como como ele pode ser tornado mais líquido e o [design incrível](https://blog.chorus.one/delegation-vouchers/) do sikka-chorus.one veio a atenção.

Pensando em termos de fazer é partilhar o pool de validadores, é uma ótima ideia e uma vez que a staking da Polygon é implementada em contrato inteligente da Ethereum, abre-nos muito mais opções como torná-la compatível com ERC20 para que possa ser usada em protocolos defi.

A partir de agora, cada validador tem a própria VMatic (isto é, para o validador Ashish haverá token AMatic) porque cada validador tem desempenho diferente (recompensas e taxa de comissão). Os delegadores podem comprar múltiplos compartilhamentos de validadores e proteger seu risco para um desempenho ruim de validador particular.

## Vantagens {#advantages}

- Como nosso projeto segue a interface ERC20 na implementação da delegação, os aplicativos DeFi podem ser facilmente construídos em cima dele.
- Os tokens delegados podem ser utilizados em protocolos de empréstimo.
- Os delegadores podem cobrir os seus riscos através de mercados de previsão como o Auger.

Âmbito futuro:

- Atualmente, o ERC20 não é fungible com outros validadores ERC20 / Partilha de tokens mas, no futuro, pensamos que muitos novos aplicativos DeFi podem construir nele e tornar alguns mercados ou até mesmo alguns produtos melhores.
- Com a pesquisa iniciada no [chorus.one](http://chorus.one), também estamos a explorar problemas como validadores que encurtam os seus próprios tokens e outros problemas (pode ser evitado problemas de encurtamento através de coisas como validador que bloqueiam a sua própria participação durante meses de X e outras coisas como o seguro de validador (on-chain), que trará mais confiança para os delegadores.
- Direito de voto do delegador para participar nas decisões de governação.
- Embora torne a delegação líquida, também queremos garantir a segurança da rede. É por isso que, de alguma forma, o capital de slash-able está bloqueado no caso de atividade de fraude.

Dado o design acima disponível no protocolo, os validadores podem sempre implementar os seus próprios mecanismos semelhantes e fazer stake por meio de um contrato que não estará disponível na interface de staking da Polygon.

## Objetivos Futuros {#future-goals}

Coisas como interchain/cross-chain através do hub Cosmos e do design da Everett B.

## Recursos {#resources}

- [Vitalik pos design](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Introdução aos derivados staking](https://medium.com/lemniscap/an-intro-to-staking-derivatives-i-a43054efd51c)
- [Staking Pools](https://slideslive.com/38920085/ethereum-20-trustless-staking-pools)
- [Inflação em Proof of Stake](https://medium.com/figment-networks/mis-understanding-yield-and-inflation-in-proof-of-stake-networks-6fea7e7c0e41)
