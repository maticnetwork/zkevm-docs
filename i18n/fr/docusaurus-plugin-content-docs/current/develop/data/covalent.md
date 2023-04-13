---
id: covalent
title: Utilisation de Covalent
sidebar_label: Covalent
description: Apprendre à utiliser l'API unifiée de Covalent pour les données
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## Introduction {#introduction}

Polygone apporte une échelle massive à Ethereum en utilisant une version adaptée de Plasma avec des chaînes latérales basées sur PoS qui fournissent une solution pour un accès plus rapide et des transactions à très faible coût avec finalité sur la chaîne principale. Le réseau Polygon assure de la vivacité à l'aide de points de contrôle PoS qui sont poussés vers la chaîne principale Ethereum. Cela permet à une seule chaîne latérale Polygon de réaliser théoriquement des `2^16` transactions
par bloc, et peut-être des millions de transactions sur plusieurs chaînes à l'avenir.

### Faits rapides {#quick-facts}

<TableWrap>

| Propriété | Valeur |
|---|---|
| ChainId du Réseau Principal de Polygone | `137` |
| ChainId du Testnet de Polygone Mumbai | `80001` |
| Explorateur de la Blockchain de Polygone | https://polygonscan.com/ |
| Temps du blocage | ~3 secondes |
| Latence d'actualisation des données | ~6 secondes ou 2 blocs |

</TableWrap>

:::tip Démarrage rapide

Regardez **[<ins>cette vidéo de présentation</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)** pour commencer.

:::

## Points de terminaison pris en charge {#supported-endpoints}

Tous les points de terminaison de [__Classe A__](https://www.covalenthq.com/docs/api/#tag--Class-A) sont pris en charge pour le réseau principal Matic et le testnet Mumbai. Vous pouvez interroger l'un ou l'autre réseau via l'API unifiée en modifiant le fichier `chainId`.

:::info Points de terminaison

Une liste complète de toutes les requêtes que vous pouvez effectuer sur le réseau de Polygone en utilisant Covalent sont disponible sur la [<ins>documentation de l'API Covalent</ins>](https://www.covalenthq.com/docs/api/).

:::

---

## Annexe {#appendix}

### Jeton de Gaz Matic {#matic-gas-token}

Pour interagir avec le réseau Matic, les jetons MATIC doivent être payés comme frais de gaz. Les réponses de Covalent renvoient automatiquement `gas_*` des champs dans les unités MATIC.

### Cartographie de jetons {#token-mapping}

Covalent maintient une cartographie en temps réel sur chaîne des adresses de jeton entre le réseau principal Ethereum et la chaîne Matic. Ces adresses sont utilisées pour inverser les prix sur Matic et également pour renvoyer les bonnes URL de logo de jeton.

Quelques exemples de jetons cartographiés:

| Jeton | Réseau principal Ethereum | Réseau principal Matic |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### Prix des jetons {#token-prices}

Pour les jetons qui ont une cartographie vers le réseau principal Ethereum, Covalent est en mesure de renvoyer les prix cartographiés.
