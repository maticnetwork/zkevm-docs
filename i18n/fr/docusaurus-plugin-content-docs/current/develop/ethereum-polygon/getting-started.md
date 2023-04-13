---
id: getting-started
title: Ethereum↔Pont de Polygone
sidebar_label: Overview
description: Un canal de transaction de deux directions entre Polygon et Ethereum.
keywords:
  - docs
  - polygon
  - polygon wiki
  - crosschain bridge
  - polygon
  - ethereum
  - fx portal
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon vous offre un canal de transaction de deux directions sans confiance entre Polygone et Ethereum en introduisant le pont inter-chaînes avec la sécurité Plasma et PoS. Grâce à cela, les utilisateurs peuvent transférer des jetons sur Polygon sans encourir de risques tiers ni de limitations de liquidité du marché. **Le Plasma et le pont PoS sont disponibles sur Mumbai Testnet ainsi que sur Polygon Mainnet**.

**Le pont Polygon fournit un mécanisme de pontage qui est presque instantané, à faible coût et assez flexible**. Polygon utilise une architecture à double consensus (plateforme Plasma + Preuve-de-Participation (PoS)) pour optimiser la vitesse et la décentralisation. Nous avons consciemment conçu le système pour prendre en charge les transitions d'état arbitraires sur nos chaînes latérales, qui sont compatibles avec EVM.

**Il n'y a aucun changement dans l'approvisionnement en circulation de votre jeton lorsqu'il traverse le pont**;

- Les jetons qui quittent le réseau Ethereum sont verrouillés et le même nombre de jetons sont frappés sur Polygon qu'un jeton pegged (1:1).
- Pour déplacer les jetons vers le réseau Ethereum, les jetons sont brûlés sur le réseau Polygon et déverrouillés sur le réseau Ethereum pendant le processus.

## PoS vs Plasma {#pos-vs-plasma}

|                                      | Pont PoS (Recommandé) | Pont Plasmique |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Brève description** | Les développeurs DApp recherchent la flexibilité et les retraits plus rapides avec la sécurité du système POS. | Développeurs DApp à la recherche de garanties de sécurité accrues avec le mécanisme de sortie Plasma\. |
| **Structure** | Très flexible | Rigide, Moins Flexible |
| **Dépôt\(Ethereum → Polygon\)** | 22-30 minutes | 22-30 minutes |
| **Retrait\(Polygon → Ethereum\)** | 1 point de contrôle = ~ 30 minutes à 6 heures | Appelez à la procédure de processus-sortie sur le contrat Ethereum |
| **Securité** | Système de Preuve\-de\-Participation, sécurisé par un ensemble robuste de validateurs externes\. | Les contrats Plasma de Polygon s'appuie sur la sécurité d'Ethereum. |
| **Normes de Prise en Charge** | ETH, ERC20, ERC721, ERC1155 et Autres | Uniquement ETH, ERC20, ERC721 |

:::info

Le [**FxPortal**](/develop/l1-l2-communication/fx-portal.md) est un autre type de pont qui est très similaire au pont PoS. Ils partagent les mêmes caractéristiques que celles mentionnées pour PoS dans le tableau ci-dessus. La seule différence est que les jetons n'ont pas besoin d'être cartographiés sur le pont FxPortal avant de be La cartographie se produit pendant la première transaction de dépôt qui est initiée pour un jeton donné. Aussi, tout le monde peut utiliser le FxPortal pour construire ses propres tunnels/ponts personnalisés sur le dessus du pont Polygon. Il est fortement recommandé d'utiliser le FxPortal pour n'importe quel cas d'utilisation de pont. Les nouvelles mappages jetons sur PoS et Plasma seront découragés après le 31 janvier 2023 pour que le processus de mapping soit entièrement décentralisé et flexible.

:::

## Ressources Supplémentaires {#additional-resources}

- [Introduction aux ponts Blockchain](https://ethereum.org/en/bridges/)
- [Qu'est-ce que les passerelles Cross-Chain](https://www.alchemy.com/overviews/cross-chain-bridges)
