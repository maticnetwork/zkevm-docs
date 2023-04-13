---
id: checkpoint-mechanism
title: Mécanisme de point de contrôle
sidebar_label: Checkpoints
description: Vérifier l'état du système vers le réseau principal Ethereum
keywords:
  - docs
  - matic
  - polygon
  - checkpoint
  - ethereum
  - mainnet
slug: checkpoint-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::info Polygon n'est pas une plate-forme de couche 1

Polygon dépend du réseau principal Ethereum comme sa couche de règlement de couche 1. Tous les mécanismes de staking doivent être synchronisés avec les contrats du réseau principal d'Ethereum.

:::

[Les candidats](/docs/maintain/glossary.md#proposer) pour un point de contrôle sont initialement sélectionnés via [l'algorithme round-robin pondéré de Tendermint](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html). Un autre contrôle personnalisé est effectué en fonction du succès de l'ajout du point de contrôle. Cela permet au système Polygon de se découpler de la sélection des proposants de Tendermint et offre à Polygon la possibilité de sélectionner un proposant en cas de réussite de la transaction de point de contrôle sur le réseau principal d'Ethereum uniquement, ou de proposer une transaction de point de contrôle pour les blocs appartenant aux points de contrôle précédents qui ont échoué.

La réussite de la soumission d'un point de contrôle sur Tendermint est un processus de validation en deux phases :

* Un proposant, sélectionné par l'algorithme round-robin, envoie un point de contrôle avec l'adresse du proposant et le hachage de Merkle dans le champ de celui-ci.
* Tous les autres proposants valident les données dans le champ du proposant avant d'ajouter le hachage de Merkle dans leur état.

Le proposant suivant envoie alors une transaction d'accusé de réception pour confirmer que la [transaction de point de contrôle](/docs/maintain/glossary.md#checkpoint-transaction) précédente a réussi sur le réseau principal d'Ethereum. Chaque changement d'ensemble de validateurs est relayé par les nœuds de validation sur [Heimdall](/docs/maintain/glossary.md#heimdall), qui s'intègre au nœud de validation. Cela permet à Heimdall de rester à tout moment en phase avec l'état du contrat Polygon sur le réseau principal d'Ethereum.

Le contrat Polygon déployé sur le réseau principal d'Ethereum est considéré comme la source ultime de vérité et, par conséquent, toute validation est effectuée en interrogeant le contrat du réseau principal d'Ethereum.
