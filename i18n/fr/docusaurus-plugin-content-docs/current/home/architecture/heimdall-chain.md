---
id: heimdall-chain
title: Qu'est-ce que la Chaîne Heimdall ?
sidebar_label: Heimdall Chain
description: Créez votre prochaine application de blockchain sur Polygon.
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - checkpoint
  - pos
  - verifier
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Chaîne Heimdall {#heimdall-chain}

Heimdall est la couche de Vérification de la Preuve d'Enjeu de Polygon, qui est responsable du point de contrôle d'une représentation des blocs de Plasma vers la chaîne principale dans notre architecture. Nous l'avons mis en œuvre en nous appuyant sur le moteur du consensus de Tendermint, en modifiant le schéma de signature et de diverses structures de données.

Le contrat principal Stake Manager fonctionne conjointement avec le nœud Heimdall pour agir comme mécanisme de gestion des enjeux sans confiance pour le moteur PoS, y compris la sélection de l'ensemble de validateurs, la mise à jour des validateurs, etc. Étant donné que le staking est réellement fait sur le contrat intelligent Ethereum, nous ne comptons pas seulement sur l'honnêteté du validateur et au contraire héritons de la sécurité de chaîne Ethereum pour ce partie clé.

La couche Heimdall gère l'agrégation des blocs produits par Bor dans un arbre de Merkle et publie périodiquement la racine de Merkle à la chaîne d'origine. Cette publication périodique s'appelle **"checkpoint"**. Pour chaque bloc sur Bor, un validateur (sur la couche Heimdall) :

1. Valide tous les blocs depuis le dernier point de contrôle
2. Crée un arbre de merkle des identifiants de blocs
3. Publie le root de merkle sur la chaîne principale

Les points de contrôle sont importants pour deux raisons:

1. Fournir une finalité sur la Chaîne Root
2. Fournir une preuve de brûlure lors du retrait des actifs

Une vue d'ensemble du processus peut être expliquée comme:

- Un sous-ensemble de valideurs actifs du pool est sélectionné pour agir en tant que producteurs de blocs pour une durée. La Sélection de chaque durée devra également être approuvée par au moins 2/3 des énergies. Ces producteurs de blocs sont responsables de créer des blocs et de les diffuser vers le réseau restant.
- Un point de contrôle comprend le root de tous les blocs créés pendant un intervalle donné. Tous les nœuds valident les mêmes et y attachent leurs signatures.
- Un proposant sélectionné de l'ensemble de validateurs est responsable de collecter toutes les signatures pour un point de contrôle particulier et de les engager sur la chaîne principale.
- La responsabilité de créer des blocs et aussi de proposer des points de contrôle dépend de façon variable du ratio de participation d'un validateur dans le pool global.