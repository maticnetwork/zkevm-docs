---
id: what-is-proof-of-stake
title: O que é o Proof of Stake?
description: Um algoritmo de consenso dependente dos validadores.
keywords:
  - docs
  - matic
  - polygon
  - stake
  - delegate
  - validate
  - pos
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Prova de Stake (PoS) {#proof-of-stake-pos}

O Proof of Stake (PoS) é uma categoria de algoritmos de consenso para blockchains públicas que depende do [stake](/docs/maintain/glossary#staking) económico de um validador na rede.

Nas blockchains públicas baseadas no Proof of Work (PoW), o algoritmo recompensa os participantes que resolvem quebra-cabeças criptográficos para validar transações e criar novos blocos. Exemplos de blockchain do PoW: Bitcoin, Ethereum anterior.

Nas blockchains públicas baseadas no PoS, um conjunto de validadores reveza-se a propor e votar no bloco seguinte. O peso do voto de cada validador depende do tamanho do seu depósito — [stake](/docs/maintain/glossary#staking). As vantagens significativas do PoS incluem: segurança, risco reduzido de centralização e eficiência energética. Exemplos de blockchains baseadas no PoS: Eth2, Polygon.

Regra geral, um algoritmo de PoS tem o seguinte aspeto. A blockchain monitoriza um conjunto de validadores e qualquer pessoa que detenha a criptomoeda base da blockchain (no caso da Ethereum, o Ether) pode tornar-se validador enviando um tipo especial de transação que bloqueia o seu Ether num depósito. O processo de criar e concordar com novos blocos é depois executado através de um algoritmo de consenso em que podem participar todos os validadores atuais.

Existem muitos tipos de algoritmos de consenso e muitas maneiras de atribuir recompensas aos validadores que participam no algoritmo de consenso, pelo que existem muitos "sabores" de Proof of Stake. Numa perspetiva algorítmica, existem dois tipos principais: PoS baseados na chain e PoS estilo [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance).

No **Proof of Stake baseado na chain**, o algoritmo seleciona um validador de forma pseudoaleatória durante cada intervalo de tempo (por exemplo, cada período de 10 segundos pode ser um intervalo de tempo) e atribui ao validador o direito de criar um único bloco; este bloco deve remeter para um bloco anterior (normalmente o bloco que se encontra no final da chain anteriormente mais longa) e, ao longo do tempo, a maioria dos blocos converge para uma única cadeia de crescimento constante.

No **Proof of Stake estilo BFT**, o direito de *propor* blocos é concedido **aleatoriamente** aos validadores, mas *o consenso sobre o bloco que será canónico* é alcançado através de um processo de várias rondas, em que cada validador envia um "voto" para um bloco específico durante cada ronda e, no final do processo, todos os validadores (honestos e online) concordam permanentemente se um determinado bloco faz parte da chain. Note que os blocos ainda podem ser *encadeados*; a principal diferença reside no facto de o consenso sobre um bloco poder surgir de dentro de um bloco e não depender do comprimento ou tamanho da chain subsequente.

Para mais detalhes, consulte [https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

Ver também:

* [Delegador](/docs/maintain/glossary#delegator)
* [Validador](/docs/maintain/glossary#validator)
