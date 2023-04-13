---
id: glossary
title: Lexique
description: Termes clés Polygon
keywords:
  - docs
  - matic
  - polygon
  - glossary
  - jargons
slug: glossary
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Producteur de blocs {#block-producer}

Un producteur de blocs est un [validateur](#validator) actif sélectionné pour agir en tant que producteur de blocs pour un [span](#span).

Un producteur de blocs est responsable de la création des blocs et de la diffusion des blocs créés sur le réseau.

## Bor {#bor}

Un nœud Bor est un nœud produisant des blocs sur le réseau Polygon.

Bor est basé sur [Go Ethereum](https://geth.ethereum.org/).

## Transaction de point de contrôle {#checkpoint-transaction}

Une transaction de point de contrôle est une transaction contenant la racine Merkle des blocs de la couche [Bor](#bor) entre les intervalles de point de contrôle.

La transaction est engagée pour les contrats de staking Polygon sur le réseau principal d'Ethereum par un nœud [Heimdall](#heimdall).

Voir aussi :

* [Architecture Heimdall : point de contrôle](/docs/pos/heimdall/checkpoint)
* [Mécanisme des points de contrôle](/docs/maintain/validator/core-components/checkpoint-mechanism)

## Commission {#commission}

Une commission est le pourcentage des récompenses perçues par les [validateurs](#validator) auprès des [délégants](#delegator) qui misent avec les validateurs.

Voir aussi [Opérations liées aux commissions de validateur](/docs/maintain/validate/validator-commission-operations).

## Délégant {#delegator}

Le rôle de délégant met en jeu les jetons MATIC pour sécuriser le réseau Polygon avec des [validateurs](#validator) existants sans exécuter les nœuds eux-mêmes.

Voir aussi [Qu'est-ce qu'un Délégant](/docs/maintain/polygon-basics/who-is-delegator).

## Nœud complet {#full-node}

Un nœud complet est un [nœud sentinelle](#sentry) entièrement synchronisé exécutant à la fois [Heimdall](#heimdall) et [Bor](#bor).

Voir aussi [Déploiement de nœud complet](/docs/develop/network-details/full-node-deployment).

## Heimdall {#heimdall}

Un nœud Heimdall est un nœud s'exécutant en parallèle au réseau principal d'Ethereum, surveillant l'ensemble des contrats déployés sur le réseau principal d'Ethereum et engageant les [points de contrôle](#checkpoint-transaction) du réseau Polygon sur le réseau principal d'Ethereum.

Heimdall est basé sur [Tendermint](https://tendermint.com/).

## Adresse propriétaire {#owner-address}

Une adresse propriétaire est l'adresse utilisée pour implanter, réinitialiser et modifier l'adresse du signataire, retirer des récompenses et gérer les paramètres liés à la délégation sur le réseau principal d'Ethereum.

Si la [clé du signataire](#signer-address) est conservée sur le nœud et est considérée comme un portefeuille **de stockage à chaud**, la clé du propriétaire doit être conservée de manière très sécurisée, elle doit être peu utilisée et elle est considérée comme un portefeuille **de stockage à froid**.

Voir aussi [Gestion des clés](validator/core-components/key-management.md).

## Proposant {#proposer}

Un proposant est le [validateur](#validator) sélectionné par l'algorithme pour proposer un nouveau bloc.

Un proposant est également responsable de la collecte de toutes les signatures pour un [point de contrôle](#checkpoint-transaction) particulier et de l'engagement du point de contrôle sur le réseau principal d'Ethereum.

## Sentinelle {#sentry}

Un nœud sentinelle est un nœud exécutant à la fois le nœud [Heimdall](#heimdall) et le nœud [Bor](#bor) pour télécharger les données à partir d'autres nœuds sur le réseau et pour propager les données [du validateur](#validator) sur le réseau.

Un nœud sentinelle est ouvert à tous les autres nœuds de sentinelle du réseau.

## Span {#span}

Un ensemble de blocs logiquement définis pour lequel un ensemble de validateurs est choisi parmi tous les [validateurs](#validator) disponibles.

La sélection de chaque span est décidée par au moins deux ou trois des validateurs en termes de puissance de staking.

Voir aussi [Consensus Bor : Span](/docs/pos/bor/consensus.md#span).

## Staking {#staking}

Le staking est le processus de verrouillage des jetons dans un dépôt pour gagner le droit de valider et de produire des blocs sur une blockchain. Généralement, le staking se fait dans le jeton native pour le réseau — pour le jeton MATIC est verrouillé par des validateurs / des stakers dans le réseau Polygon. D'autres exemples incluent ETH dans Ethereum (post-fusion), ATOM dans Cosmos, etc.

Voir aussi [Qu'est-ce Que La Preuve De Participation](polygon-basics/what-is-proof-of-stake.md)?

## Adresse du signataire {#signer-address}

Une adresse de signataire est l'adresse d'un compte Ethereum du nœud de validation [Heimdall](#heimdall). L'adresse du signataire signe et soumet les [transactions aux points de contrôle](#checkpoint-transaction).

Si la clé du signataire est conservée sur le nœud et est considérée comme un portefeuille **de stockage à **chaud, la [clé du propriétaire](#owner-address) doit être conservée de manière très sécurisée, elle doit être peu utilisée et elle est considérée comme un portefeuille **de stockage à froid**.

Voir aussi [Gestion des clés](validator/core-components/key-management.md).

## Validateur {#validator}

Les validateurs mettent en [valeur leurs jetons MATIC](/docs/maintain/validate/validator-staking-operations) via des contrats d'empilage déployés sur le réseau principal Ethereum et exécutent à la fois le nœud [Heimdall](#heimdall) et le nœud [Bor](#bor) pour valider les points de contrôle réseau sur le réseau principal Ethereum et pour produire des blocs sur le réseau.

Un nœud de validation est uniquement ouvert à son nœud [sentinelle](#sentry) et fermé au reste du réseau.

Voir aussi [Qu'est-ce qu'un validateur ?](polygon-basics/who-is-validator.md).
