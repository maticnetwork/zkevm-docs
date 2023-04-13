---
id: new-to-polygon
title: Bienvenue sur Polygon
description: Créez votre prochaine application blockchain sur Polygon
keywords:
  - docs
  - matic
  - polygon
  - new to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bienvenue sur Polygon {#welcome-to-polygon}

Polygon est une solution de mise à l'échelle pour des blockchains publiques. La PoS de Polygon prend en charge tous les outils Ethereum existants et permet des transactions plus rapides et moins chères.

## Types d'interaction sur Polygon {#types-of-interaction-on-polygon}

* [Chaîne de la PoS de Polygon](/docs/develop/getting-started)
* [Ethereum + Polygon avec pont PoS](https://docs.polygon.technology/docs/develop/ethereum-polygon/pos/getting-started)
* [Ethereum + Polygon avec pont plasmique](https://docs.polygon.technology/docs/develop/ethereum-polygon/plasma/getting-started)

## Interroger la blockchain {#query-the-blockchain}

La plupart des interactions blockchain impliquent de lire son état.

Alchemy propose un guide de référence sur la façon de faire des requêtes de base vers la blockchain. Consultez leur guide sur [la façon de requérir Polygon](https://docs.alchemy.com/reference/polygon-sdk-examples).

## Déployer des contrats intelligents {#deploy-smart-contracts}

* Déployez vos contrats sur Polygon
    - [Utiliser Alchemy](/docs/develop/alchemy)
    - [Utiliser Chainstack](/docs/develop/chainstack)
    - [Utiliser QuickNode](/docs/develop/quicknode)
    - [Utiliser Remix](/docs/develop/remix)
    - [Utiliser Truffle](/docs/develop/truffle)
    - [Utiliser Hardhat](/docs/develop/hardhat)

:::note

Configurez le Web3 RPC-URL pour "https://rpc-mumbai.matic.today", tout le reste reste le même.

:::

## Qu'est-ce qu'une blockchain ? {#what-is-a-blockchain}

Pour faire simple, une blockchain est un grand registre partagé et immuable permettant d'enregistrer les transactions, de suivre les actifs et d'instaurer la confiance. Pour en savoir plus, consultez l'article [Les bases des blockchains](blockchain-basics/basics-blockchain.md).

## Qu'est-ce qu'une chaîne latérale ? {#what-is-a-sidechain}

Considérez une chaîne latérale comme un clone d'une blockchain mère, qui prend en charge le transfert d'actifs vers et depuis la chaîne principale. Il s'agit simplement d'une alternative à la chaîne mère qui crée une nouvelle blockchain avec son propre mécanisme de création de blocs (mécanisme de consensus). La connexion d'une chaîne latérale à une chaîne mère implique la mise en place d'une méthode de déplacement des actifs entre les chaînes.

## Rôles de validateur et de délégant {#validator-and-delegator-roles}

Sur le réseau Polygon, vous pouvez être un validateur ou un délégant. Voir :

* [Qui est validateur](/docs/maintain/polygon-basics/who-is-validator)
* [Qui est délégant](/docs/maintain/polygon-basics/who-is-delegator)

## Architecture {#architecture}

Si votre objectif est de devenir un validateur, il est essentiel que vous compreniez l'architecture Polygon.

Voir [l'architecture Polygon](/docs/maintain/validator/architecture).

### Composants {#components}

Pour avoir une compréhension approfondie de l'architecture Polygon, reportez-vous aux composants de base :

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Contrats](/docs/pos/contracts/stakingmanager)

#### Codes bases {#codebases}

Pour avoir une compréhension approfondie des composants de base, consultez les codes bases :

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Contrats](https://github.com/maticnetwork/contracts)

## Guide d'utilisation {#how-tos}

### Configuration des nœuds {#node-setup}

Si vous souhaitez exécuter un nœud complet sur le Polygon Mainnet ou Mumbai Testnet, vous pouvez suivre le [Exécutez un guide de nœud](/maintain/validate/run-validator.md) validateur.

### Opérations de staking {#staking-operations}

* [Opérations de staking du validateur](/docs/maintain/validate/validator-staking-operations)
* [Déléguer](/docs/maintain/delegate/delegate)

### Ressources Externes {#external-resources}
- [Votre premier dApp](https://www.youtube.com/watch?v=rzvk2kdjr2I)
- [Sidechains et Childchains](https://hackernoon.com/what-are-sidechains-and-childchains-7202cc9e5994)