---
id: security-models
title: Modelos de Segurança
description: Valores de PoS, Plasma e Valores Híbridos
keywords:
  - docs
  - matic
  - polygon
  - security
  - implementation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Modelos de Segurança {#security-models}

O Polygon fornece três tipos de modelos de segurança para um desenvolvedor construir o seu dApps:

1. [Segurança Proof of Stake](#proof-of-stake-security)
2. [Segurança Plasma](#plasma-security)
3. [Híbrido (Plasma + PoS)](#hybrid)

described cada um destes modelos de segurança oferecidos pelo Polygon e o fluxo de trabalho do desenvolvedor para cada um com um exemplo dApp abaixo.

## Segurança Proof of Stake {#proof-of-stake-security}

A segurança da Prova de Stake (PoS) é fornecida pela camada Heimdall & Bor que é construída em cima do Tendermint. Um Check Point está comprometido com a root chain somente quando ⅔ dos validadores assinaram nela.

Para ativar o mecanismo PoS em nossa plataforma, empregamos um conjunto de contratos de administração de staking em Ethereum, assim como um conjunto de validadores incentivados executando nós Heimdall e Bor. Isto implementa os seguintes recursos:

- A capacidade para qualquer indivíduo fazer staking de tokens MATIC no contrato inteligente de Ethereum e participar do sistema como um Validador
- Ganhe recompensas de staking por validar transições de estado na Polygon

O mecanismo PoS também age como uma mitigação para o problema de indisponibilidade de dados para nossas sidechains, em termos de Plasma.

Temos uma camada de finalidade rápida que finaliza o estado da sidechain periodicamente por meio de Check Points. A finalidade rápida nos auxilia a cimentar o estado da sidechain. A chain compatível com EVM tem poucos validadores e tempo de bloco mais rápido, com maior produtividade. Ela opta por escalabilidade em detrimento de altos graus de descentralização. Heimdall garante que o comprometimento do estado final seja à prova de balas e passe por meio de um amplo conjunto de validadores e seja, portanto, de alta descentralização.

**Para desenvolvedores**

Como desenvolvedor do dApp na segurança do PoS, o procedimento é tão simples quanto aceitar o seu contrato inteligente e implantá-lo na rede Polygon PoS. Isso é possível devido à arquitetura baseada em conta, permitindo uma sidechain compatível com EVM.

## Segurança Plasma {#plasma-security}

O Polygon fornece "Garantias de Plasma" com relação a vários cenários de ataque. Os dois principais casos considerados são:

- O operador de chain (ou no Polygon, a camada Heimdall) está corrompido, ou
- O utilizador está corrompido

Em ambos os casos, se os ativos de um usuário na cadeia de plasma tiverem sido comprometidos, eles precisam iniciar a saída de massa. A Polygon fornece construções no contrato inteligente da rootchain, que podem ser aproveitadas. Para mais detalhes e especificações técnicas sobre estes vetores de construção e ataque considerados, leia [aqui](https://ethresear.ch/t/account-based-plasma-morevp/5480).

Efetivamente, a segurança oferecida pelos contratos Plasma da Polygon se sobrepõe na segurança de Ethereum. Os fundos do usuário somente estarão algum momento em risco caso a Ethereum falhe. Simplificando, a chain Plasma é tão segura quanto o mecanismo de consenso da chain principal. Isso pode ser extrapolado para dizer que a chain do plasma pode usar mecanismos de consenso realmente simples e ainda estar segura.

**Para desenvolvedores**

Como desenvolvedor do dApp, se quiser construir o Polygon com garantia de segurança do Plasma, é necessário escrever predicates personalizados para seus contratos inteligentes. Isso significa basicamente escrever contratos externos que lidam com as condições de disputa estabelecidas pelos construtos do Polygon

## Híbrido {#hybrid}

Além da segurança do Plasma pura e da segurança da Prova de Staque, possível no dApps implantados no Polygon, há também uma abordagem Híbrida que os desenvolvedores podem seguir - o que significa simplesmente ter garantias do Plasma e da Prova de Staques em alguns fluxos de trabalho específicos do dApp.

Esta abordagem é melhor compreendida com um exemplo.

Considere um dApp de jogos com um conjunto de contratos inteligentes que descrevem a lógica do jogo. Digamos que o jogo utiliza seu próprio token erc20 para recompensar os jogadores. Agora, os contratos inteligentes que definem a lógica do jogo podem ser implementados diretamente na sidechain da Polygon - garantindo a segurança Proof-of-Stake para os contratos, enquanto a transferência do token erc20 pode ser assegurada com garantias Plasma e à prova de fraude incorporadas nos contratos root chain da Polygon.
