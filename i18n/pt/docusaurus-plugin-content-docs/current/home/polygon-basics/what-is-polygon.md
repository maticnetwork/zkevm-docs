---
id: what-is-polygon
title: O que é Polygon?
description: Saiba mais sobre a solução de escalabilidade do Polygon
keywords:
  - docs
  - matic
  - polygon
  - blockchain
  - ethereum scaling
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Polygon](https://polygon.technology/) é a solução de diomensionamento de Camada 2 que atinge escala utilizando sidechains para computação off-chain e uma rede descentralizada de validadores Proof of Stake (PoS).

A Polygon se empenha em resolver problemas de escalabilidade e usabilidade, sem comprometer a descentralização e utilizando a comunidade e o ecossistema de desenvolvedores existente. Tem como objetivo melhorar as plataformas existentes, fornecendo escalabilidade e experiência de usuário superior para dApps e funcionalidades do usuário.

É uma solução de dimensionamento ara blockchains públicas. Polygon PoS suporta todas as ferramentas existentes em Ethereum em conjunto com transações mais rápidas e baratas.

## Características-chave e destaques {#key-features-highlights}

- **Escalabilidade**: Transações rápidas, seguras e de baixo custo nas sidechains da Polygon com a finalidade adquirida na mainchain e Ethereum como a primeira basechain compatível de Camada 1.
- **Alto rendimento**: Atinge até 10,000 TPS em uma single sidechain na testnet interna; múltiplas redes a serem adicionadas para dimensionamento horizontal.
- **Experiência do usuário**: UX harmoniosa e abstração do desenvolvedor da mainchain para a chain da Polygon; apps de celular nativos e SDK com suporte WalletConnect.
- **Segurança**: Operadores da chain da Polygon são eles próprios stakers no sistema PoS.
- **Sidechains públicas**: As sidechains da Polygon são públicas por natureza (vs. redes DApp individuais), não requerem permissões e são capazes de suportar múltiplos protocolos.

O sistema Polygon foi conscientemente arquitetado para suportar transações de estado arbitrárias nas sidechains da Polygon, as quais são habilitadas para EVM.

## Posições de Delegador e Validador {#delegator-and-validator-roles}

Você pode participar na rede da Polygon como um delegador ou um validador. Veja:

* [O que é um Validador](/docs/maintain/polygon-basics/who-is-validator)
* [O que é um Delegador](/docs/maintain/polygon-basics/who-is-delegator)

## Arquitetura {#architecture}

Caso o seu objetivo seja tornar-se um validador, é essencial que você compreenda a arquitetura Polygon.

Ver [Arquitetura Polygon](/docs/maintain/validator/architecture) para mais informações.

### Componentes {#components}

Para ter uma compreensão granular da arquitetura da Polygon, verifique os componentes centrais:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Contratos](/docs/pos/contracts/stakingmanager)

#### Bases de código {#codebases}

Para ter uma compreensão granular dos componentes centrais, veja as seguintes bases de código:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Contratos](https://github.com/maticnetwork/contracts)

## Tutoriais {#how-tos}

### Configuração de nós {#node-setup}

Se pretender executar um nó completo no Polygon Mainnet ou no Teste de Mumbai, pode seguir o [Executar um guia do nó do](/maintain/validate/run-validator.md) Validador.

### Operações de staking {#staking-operations}

Verifique como o processo de staking é realizado para os perfis de validador e delegador:

* [Operações de Staking Validador](docs/maintain/validate/validator-staking-operations)
* [Delegue](/docs/maintain/delegate/delegate)
