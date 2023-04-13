---
id: what-is-proof-of-stake
title: O que é o Proof of Stake?
description: Saiba o que é mecanismo de consenso da Prova de Estaca
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

# O que é o Proof of Stake? {#what-is-proof-of-stake}

O Proof of Stake (PoS) é uma categoria de algoritmos de consenso para blockchains públicas que depende do [stake](/docs/maintain/glossary.md#staking) económico de um validador na rede.

Nas blockchains públicas baseadas no Proof of Work (PoW), o algoritmo recompensa os participantes que resolvem quebra-cabeças criptográficos para validar transações e criar novos blocos. Exemplos de blockchain de PoW: Bitcoin, Ethereum (antes de mesclar).

Nas blockchains públicas baseadas no PoS, um conjunto de validadores reveza-se a propor e votar no bloco seguinte. O peso do voto de cada validador depende do tamanho do seu depósito — [stake](/docs/maintain/glossary.md#staking). As vantagens significativas do PoS incluem: segurança, risco reduzido de centralização e eficiência energética. Exemplos de blockchain de PoS: Ethereum 2.0, Polygon.

Regra geral, um algoritmo de PoS tem o seguinte aspeto. O blockchain mantém o controle de um conjunto de validadores e qualquer um que detenha a criptomoeda base da blockchain (no caso do Ethereum, ETH) pode se tornar um validador enviando um tipo especial de transação que bloqueia seu ETH em um depósito. O processo de criar e concordar com novos blocos é depois executado através de um algoritmo de consenso em que podem participar todos os validadores atuais.

Existem muitos tipos de algoritmos de consenso e muitas maneiras de atribuir recompensas aos validadores que participam no algoritmo de consenso, pelo que existem muitos "sabores" de Proof of Stake. Numa perspectiva algorítmica, existem dois tipos principais: PoS baseados em chain e PoS [de estilo BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance).

No **Proof of Stake baseado na chain**, o algoritmo seleciona um validador de forma pseudoaleatória durante cada intervalo de tempo (por exemplo, cada período de 10 segundos pode ser um intervalo de tempo) e atribui ao validador o direito de criar um único bloco; este bloco deve remeter para um bloco anterior (normalmente o bloco que se encontra no final da chain anteriormente mais longa) e, ao longo do tempo, a maioria dos blocos converge para uma única cadeia de crescimento constante.

Na **Prova de Participação de BFT** do estilo, os validadores são atribuídos **aleatoriamente** o direito de **propor** blocos. O acordo no qual bloco é **canônico** é feito através de um processo multi-round onde cada validador envia uma **Votação** para algum bloco específico durante cada round, e no final do processo, todos os validadores (honestos e online) concordam permanentemente se um bloco determinado faz parte da chain. Observe que os blocos ainda podem ser **encadeados juntos**. A diferença de chave é que o consenso em um bloco pode ser inserido num bloco e não depende do comprimento ou tamanho da chain depois dele.

Para mais detalhes, consulte [https://github.com/ethereum/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

## Ver também {#see-also}

* [Delegador](/docs/maintain/glossary.md#delegator)
* [Validador](/docs/maintain/glossary.md#validator)
