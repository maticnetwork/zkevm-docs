---
id: what-is-polygon
title: Qu'est-ce que Polygon ?
description: Apprenez-en plus sur la solution de mise à l'échelle Polygon
keywords:
  - docs
  - matic
  - polygon
  - blockchain
  - ethereum scaling
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Polygon](https://polygon.technology/) est une solution de mise à l'échelle de couche 2 qui atteint cette échelle en utilisant des chaînes latérales pour le calcul hors chaîne et un réseau décentralisé de validateurs de preuve de participation (PoS).

Polygon s'efforce de résoudre les problèmes d'évolutivité et de convivialité sans compromettre la décentralisation, tout en tirant parti de la communauté et de l'écosystème de développeurs existants. Il vise à améliorer les plateformes existantes en fournissant une évolutivité et une expérience utilisateur supérieure aux dApps et aux fonctionnalités d.

Cette solution permet de mettre à l'échelle les blockchains publiques. Polygon PoS prend en charge tous les outils Ethereum existants et permet des transactions plus rapides et moins chères.

## Caractéristiques clés et points saillants {#key-features-highlights}

- **Évolutivité** : Transactions rapides, peu coûteuses et sécurisées sur les chaînes latérales de Polygon avec finalité sur la chaîne principale et Ethereum comme première chaîne de base de couche 1 compatible.
- **Débit élevé** : Jusqu'à 10 000 TPS sur une seule chaîne latérale dans un réseau de test interne, plusieurs chaînes peuvent être ajoutées pour une mise à l'échelle horizontale.
- **Expérience utilisateur** : Une interface utilisateur fluide et une abstraction pour les développeurs de la chaîne principale à la chaîne Polygon ainsi que des applications mobiles natives et un kit de développement logiciel avec prise en charge de WalletConnect.
- **Sécurité** : Les opérateurs de chaînes Polygon sont eux-mêmes des acteurs du système de preuve de participation.
- **Chaînes latérales publiques** : Les chaînes latérales de Polygon sont publiques par nature (contrairement aux chaînes de DApp individuelles), sans permission et capables de prendre en charge plusieurs protocoles.

Le système Polygon a été délibérément conçu pour prendre en charge des transitions d'état arbitraires sur les chaînes latérales de Polygon, qui sont compatibles avec l'EVM.

## Rôles de délégateur et de validateur {#delegator-and-validator-roles}

Vous pouvez participer au réseau Polygon en tant que délégateur ou en tant que validateur. Voir :

* [Qui est validateur](/docs/maintain/polygon-basics/who-is-validator)
* [Qui est délégant](/docs/maintain/polygon-basics/who-is-delegator)

## Architecture {#architecture}

Si votre objectif est de devenir un validateur, il est essentiel que vous compreniez l'architecture Polygon.

Pour plus d'informations, voir [Architecture de Polygon](/docs/maintain/validator/architecture).

### Composants {#components}

Pour avoir une compréhension approfondie de l'architecture de Polygon, consultez les composants de base :

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Contrats](/docs/pos/contracts/stakingmanager)

#### Codes bases {#codebases}

Pour avoir une compréhension approfondie des composants de base, consultez les codes bases suivants :

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Contrats](https://github.com/maticnetwork/contracts)

## Guide d'utilisation {#how-tos}

### Configuration des nœuds {#node-setup}

Si vous souhaitez exécuter un nœud complet sur le Polygon Mainnet ou Mumbai Testnet, vous pouvez suivre le [Exécutez un guide de nœud](/maintain/validate/run-validator.md) validateur.

### Opérations de staking {#staking-operations}

Vérifiez comment se déroule le processus de staking pour les profils de validateur et de délégant :

* [Opérations de staking du validateur](docs/maintain/validate/validator-staking-operations)
* [Déléguer](/docs/maintain/delegate/delegate)
