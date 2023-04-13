---
id: heimdall-chain
title: Chaîne Heimdall
description: couche de vérificateur de preuve de mise en jeu sur le réseau Polygon
keywords:
  - docs
  - polygon
  - matic
  - heimdall
  - chain
  - verifier
  - layer
  - proof of stake
slug: heimdall-chain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Heimdall est la couche de vérification de preuve de pieux, qui est responsable de [vérifier](/docs/maintain/glossary.md#checkpoint-transaction) la représentation des blocs Plasma au réseau principal Ethereum. Heimdall est basé sur [Tendermint](https://tendermint.com/).

Le contrat de staking sur le réseau principal d'Ethereum fonctionne conjointement avec le nœud Heimdall en tant que mécanisme de gestion de mise sans confiance pour le mécanisme de preuve d'enjeu, y compris la sélection de l'ensemble des [validateurs](/docs/maintain/glossary.md#validator), la mise à jour des validateurs, etc. Le staking étant effectué dans le contrat sur le réseau principal d'Ethereum, Polygon ne repose pas uniquement sur l'honnêteté des validateurs et hérite de la sécurité du réseau principal d'Ethereum.

La couche Heimdall assure l'agrégation des blocs produits par [Bor](/docs/maintain/glossary.md#bor) dans un arbre de Merkle et publie périodiquement la racine de Merkle sur le réseau principal d'Ethereum. Cette publication périodique est appelée *point de contrôle*.

Pour chaque bloc sur Bor, un validateur (sur la couche Heimdall) :

1. Valide tous les blocs depuis le dernier point de contrôle.
2. Crée un arbre de Merkle des hachages de blocs.
3. Publie la racine Merkle sur le réseau principal d'Ethereum.

Les points de contrôle sont importants pour deux raisons :

1. Apporter une finalité sur la chaîne de root.
2. Fournir une preuve de brûlure lors du retrait des actifs.

Un aperçu du processus:

* Un sous-ensemble de validateurs actifs du pool est sélectionné pour agir en tant que [producteurs de blocs](/docs/maintain/glossary.md#block-producer) pour un [span](/docs/maintain/glossary.md#span). Ces producteurs de blocs sont chargés de créer des blocs et de diffuser les blocs créés sur le réseau.
* Un point de contrôle comprend le hachage de la racine de Merkle de tous les blocs créés pendant un intervalle donné. Tous les nœuds valident l'identifiant root de Merkle et y joignent leurs signatures.
* Un [proposant](/docs/maintain/glossary.md#proposer) sélectionné parmi l'ensemble des validateurs est chargé de recueillir toutes les signatures pour un point de contrôle particulier et de valider le point de contrôle sur le réseau principal d'Ethereum.
* La responsabilité de créer des blocs et de proposer des points de contrôle dépend de façon variable du ratio de participation d'un validateur dans le pool global.

Voir aussi [Architecture de Heimdall](/docs/pos/heimdall/overview).
