---
id: architecture
title: Architecture
description: Les couches Ethereum, Heimdall et Bor
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - validator
slug: architecture
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Le réseau Polygon est globalement divisé en trois couches :

* **Couche Ethereum** — un ensemble de contrats sur le réseau principal Ethereum.
* **Couche Heimdall** — un ensemble de nœuds Heimdall preuve de jeu fonctionnant en parallèle au réseau principal Ethereum, surveillant l'ensemble de contrats d'empilage déployés sur le réseau principal Ethereum et exécutant les points de contrôle Polygon Network vers le réseau principal Ethereum. Heimdall est basé sur Tendermint.
* **Couche Bor** — un ensemble de nœuds Bor producteurs de blocs shuffled par les nœuds Heimdall. Bor est basé sur Go Ethereum.

<img src={useBaseUrl("img/staking/architecture.png")} />

## Staking et contrats intelligents Plasma sur Ethereum {#staking-and-plasma-smart-contracts-on-ethereum}

Pour activer le mécanisme de [preuve d'enjeu (PoS)](/docs/home/polygon-basics/what-is-proof-of-stake) sur Polygon, le système utilise un ensemble de contrats de gestion de [staking](/docs/maintain/glossary.md#staking) sur le réseau principal d'Ethereum.

Les contrats de staking mettent en œuvre les caractéristiques suivantes :

* La possibilité pour quiconque de miser des jetons MATIC sur les contrats de staking sur le réseau principal d'Ethereum et de rejoindre le système en tant que [validateur](/docs/maintain/glossary.md#validator).
* Gagner des récompenses de staking pour valider les transitions d'état sur le Réseau de Polygon.
* Sauvegardez les [points de contrôle](/docs/maintain/glossary.md#checkpoint-transaction) sur le réseau principal d'Ethereum.

Le mécanisme PoS permet également d'atténuer le problème de l'indisponibilité des données pour les chaînes latérales de Polygon.

## Heimdall (couche de validation) {#heimdall-validation-layer}

La couche Heimdall gère l'agrégation des blocs produits par [Bor](/docs/maintain/glossary.md#bor) dans un arbre de Merkle et publie périodiquement la racine de Merkle à la chaîne d'origine. La publication périodique d'instantanés de la chaîne latérale Bor est appelée [points de contrôle](/docs/maintain/glossary.md#checkpoint-transaction).

Pour chaque groupe de blocs sur Bor, un validateur sur la couche Heimdall :

1. Valide tous les blocs depuis le dernier point de contrôle.
2. Crée un arbre de Merkle des identifiants de bloc.
3. Publie l'identifiant de root de Merkle sur le réseau principal d'Ethereum.

Les points de contrôle sont importants pour deux raisons:

1. Apporter une finalité sur la chaîne de root.
2. Fournir une preuve de brûlure lors du retrait des actifs.

Un aperçu du processus:

* Un sous-ensemble de validateurs actifs du pool est sélectionné pour agir en tant que [producteurs de blocs](/docs/maintain/glossary.md#block-producer) pour une [durée](/docs/maintain/glossary.md#span). Ces producteurs de blocs sont chargés de créer des blocs et de diffuser les blocs créés sur le réseau.
* Un point de contrôle comprend l'identifiant root de Merkle de tous les blocs créés durant un intervalle donné. Tous les nœuds valident l'identifiant root de Merkle et y joignent leurs signatures.
* Un [proposant](/docs/maintain/glossary.md#proposer) sélectionné parmi l'ensemble des validateurs est chargé de recueillir toutes les signatures pour un point de contrôle particulier et de valider le point de contrôle sur le réseau principal d'Ethereum.
* La responsabilité de créer des blocs et de proposer des points de contrôle dépend de façon variable du ratio de participation d'un validateur dans le pool global.

Voir aussi [Architecture de Heimdall](/docs/pos/heimdall/overview).

## Bor (couche de producteurs de blocs) {#bor-block-producer-layer}

Bor est le producteur de blocs de la chaîne latérale de Polygon, l'entité responsable de l'agrégation des transactions en blocs.

Les producteurs de bloc de Bor sont un sous-ensemble de validateurs et sont mélangés périodiquement par les validateurs de [Heimdall](/docs/maintain/glossary.md#heimdall).

Voir également [Architecture Bor](/docs/pos/bor/overview).
