---
id: polygon-architecture
title: L'architecture de Polygon
description: L'architecture de Polygon
keywords:
  - architecture
  - layers
  - polygon
  - matic
  - docs
  - research
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# L'architecture de Polygon {#the-architecture-of-polygon}

**Polygon** est une plateforme d'application blockchain qui fournit des versions hybrides de preuve de prise et des versions latérales compatibles avec Plasma.

Sur le plan architectural, la beauté de Polygon réside dans sa conception élégante, qui comporte une couche de validation générique séparée de divers environnements d'exécution, comme les chaînes de Plasma authorisées, les chaînes latérales EVM complètement développées et, à l'avenir, d'autres approches de Couche 2 telles que les Éxécuteurs Optimistes de transaction.

Le Réseau des Preuves de Participation de Polygon a une architecture de trois couches:

* **Couche Ethereum** — un ensemble de contrats sur le réseau principal Ethereum.
* **Couche Heimdall** — un ensemble de nœuds Heimdall preuve de jeu s'exécutant parallèlement au réseau principal Ethereum, surveillant l'ensemble de contrats d'empilage déployés sur le réseau principal Ethereum et exécutant les points de contrôle Polygon Network vers le réseau principal Ethereum. Heimdall est basé sur Tendermint.
* **Couche Bor** — un ensemble de nœuds Bor producteurs de blocs shuffled par les nœuds Heimdall. Bor est basé sur Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

Actuellement, les développeurs peuvent utiliser **Plasma** pour des transitions d'état spécifiques pour lesquelles les prédicats de Plasma ont été écrits, tels que ERC20, ERC721, les échanges d'actifs, ou d'autres prédicats personnalisés. Pour les transitions d'état arbitraires, ils peuvent utiliser la Preuve de Participation. Ou les deux! Cela est rendu possible par la construction hybride de Polygon.

Pour activer le mécanisme de la Preuve de Participation sur notre plateforme, un ensemble des contrats de gestion de **staking** sont déployés sur Ethereum, et un ensemble de validateurs incités fonctionnant sur **Heimdall** et ** les noeuds** de Bor. Ethereum est la première chaîne de base que Polygon supporte, mais Polygon a pour projet d'offrir du support pour les chaînes de bases additionelles pour activer une plate-forme de blockchain de Couche 2 décentralisé et interopérable qui est basée sur des suggestions et des consensus communautaires.

<img src={useBaseUrl("img/matic/Architecture.png")} />

## Les Contrats de Staking {#staking-contracts}

Pour activer le mécanisme [de Preuve d'Enjeu (Preuve de Participation)](docs/home/polygon-basics/what-is-proof-of-stake) sur Polygon, le système utilise un ensemble [d'enjeu](/docs/maintain/glossary#staking) des contrats de gestion sur le réseau principal d'Ethereum.

Les contrats d'enjeu mettent en œuvre les caractéristiques suivantes:

* Tout individu peut faire du stake des jetons MATIC sur les contrats d'enjeu sur le réseau principal de Ethereum et joindre le système en tant qu'un [validateur](/docs/maintain/glossary#validator).
* Gagner des récompenses de staking pour valider les transitions d'état sur le Réseau de Polygon.
* Sauvegardez les [points de contrôle](/docs/maintain/glossary#checkpoint-transaction) sur le réseau principal d'Ethereum.

Le mécanisme de la Preuve de Participation (PoS) permet également d'atténuer le problème de l'indisponibilité des données pour les chaînes latérales de Polygon.

## Heimdall {#heimdall}

Heimdall est la couche de validation de la preuve d'enjeu qui gère l'agrégation des blocs produits par [Bor](/docs/maintain/glossary#bor) dans un arbre de Merkle et qui publie périodiquement la root de Merkle sur la chaîne de root. La publication périodique des photographies de la chaîne latérale de Bor est appelée [points de contrôle](/docs/maintain/glossary#checkpoint-transaction).

1. Valide tous les blocs depuis le dernier point de contrôle.
2. Crée un arbre de Merkle des identifiants de bloc.
3. Publie l'identifiant de root de Merkle sur le réseau principal d'Ethereum.

Les points de contrôle sont importants pour deux raisons:

1. Apporter une finalité sur la chaîne de root.
2. Fournir une preuve de brûlure lors du retrait des actifs.

Un aperçu du processus:

* Un sous-ensemble de validateurs actifs du pool est sélectionné pour agir en tant que [producteurs de blocs](/docs/maintain/glossary#block-producer) pour une [durée](/docs/maintain/glossary#span). Ces producteurs de blocs sont chargés de créer des blocs et de diffuser les blocs créés sur le réseau.
* Un point de contrôle comprend l'identifiant root de Merkle de tous les blocs créés durant un intervalle donné. Tous les nœuds valident l'identifiant root de Merkle et y joignent leurs signatures.
* Un [proposant](/docs/maintain/glossary#proposer) sélectionné parmi l'ensemble des validateurs est chargé de recueillir toutes les signatures pour un point de contrôle particulier et de valider le point de contrôle sur le réseau principal d'Ethereum.
* La responsabilité de créer des blocs et de proposer des points de contrôle est variablement dépendant du ratio d'enjeu d'un validateur dans le pool global.

Plus de détails sur Heimdall sont disponibles sur le guide [d'architecture de Heimdall](/docs/pos/heimdall/overview).

## Bor {#bor}

Bor est la couche de producteurs de blocs sidechain de Polygon, l'entité responsable d'agréger les transactions en blocs. Actuellement, il s'agit d'une mise en œuvre de base de Geth avec des modifications personnalisées faites à l'algorithme de consensus.

Les producteurs de blocs sont un sous-réseau des validateurs et sont périodiquement déplacés via la sélection de comités sur [Heimdall](/docs/maintain/glossary#heimdall) dans des durées appelées en tant que `span` dans Polygon. Les blocs sont produits au nœud de **Bor**, et la chaîne latérale VM est compatible avec EVM. Les blocs produits sur Bor sont également validés périodiquement par des nœuds de Heimdall, et un point de contrôle constitué de l'identifiant de l'arbre de Merkle d'un ensemble de blocs sur Bor est engagé sur Ethereum périodiquement.

Plus de détails sont disponibles sur le guide [d'architecture de Bor](/docs/pos/bor/overview).

## Ressources {#resources}

* [Architecture de Bor](https://wiki.polygon.technology/docs/pos/bor)
* [Architecture de Heimdall](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
* [Mécanisme de point de contrôle](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
