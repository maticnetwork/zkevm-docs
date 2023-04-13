---
id: validator-index
title: Indice du validateur
description: Une collection d'instructions sur la façon d'exécuter et de faire fonctionner des nœuds validateurs sur le réseau Polygon
keywords:
  - docs
  - polygon
  - validate
  - validator
  - maintain
  - architecture
  - Validator Index
slug: validator-index
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Tenez-vous au courant

Restez informés des dernières mises à jour de nœud et de validateurs de l'équipe Polygon et de la communauté en vous abonnant aux [notifications Polygon](https://polygon.technology/notifications/).

:::

Les validateurs sont les acteurs clés de la maintenance du réseau Polygon. Les validateurs exécutent un nœud complet et sécurisent le réseau en misant des MATIC pour produire des blocs, valider et participer au consensus PoS.

:::info

L'espace est limité pour accepter de nouveaux validateurs. Les nouveaux validateurs ne peuvent rejoindre l'ensemble actif que lorsqu'un validateur actuellement actif se désengage.

Un nouveau processus d'enchères pour le remplacement des validateurs est introduit.

:::

## Aperçu {#overview}

Polygon est composé des trois couches suivantes :

* Couche Ethereum — un ensemble de contrats sur le réseau principal d'Ethereum.
* Couche Heimdall — ensemble de nœuds Heimdall de preuve d'enjeu en parallèle du réseau principal d'Ethereum, surveillant l'ensemble des contrats de staking déployés sur le réseau principal d'Ethereum et engageant les points de contrôle du réseau Polygon sur le réseau principal d'Ethereum. Heimdall est basé sur Tendermint.
* La couche de Bor — un ensemble de bloc produisant des nœuds de Bor mélangés par les nœuds de Heimdall. Bor est basé sur Go Ethereum.

Pour être un validateur sur le réseau Polygon, vous devez exécuter :

* Nœud sentinelle — une machine distincte exécutant un nœud Heimdall et un nœud Bor. Un nœud sentinelle ouvert à tous les nœuds du réseau Polygon.
* Nœud de validation — une machine distincte exécutant un nœud Heimdall et un nœud Bor. Un nœud de validation est uniquement ouvert à son nœud sentinelle et fermé au reste du réseau.
* Miser les jetons MATIC dans les contrats de staking déployés sur le réseau principal d'Ethereum.

## Composants {#components}

### Heimdall {#heimdall}

Heimdall effectue les opérations suivantes :

* Surveille les contrats de staking sur le réseau principal d'Ethereum.
* Vérifie toutes les transitions d'état sur la chaîne Bor.
* Valide les points de contrôle de l'état de la chaîne Bor sur le réseau principal d'Ethereum.

Heimdall est basé sur Tendermint.

:::info Voir aussi

* Référentiel GitHub : [Heimdall](https://github.com/maticnetwork/heimdall)
* Référentiel GitHub : [contrats de staking](https://github.com/maticnetwork/contracts/tree/master/contracts/staking)
* Post de blog : [Heimdall et Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

### Bor {#bor}

Heimdall effectue les opérations suivantes :

* Produit des blocs sur les réseaux Polygon.

Bor est le nœud et la couche du producteur de blocs pour le réseau Polygon. Il est basé sur Go Ethereum. Les blocs produits sur Bor sont validés par les nœuds Heimdall.

:::info Voir aussi

* Référentiel GitHub : [Bor](https://github.com/maticnetwork/bor)
* Post de blog : [Heimdall et Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

Cette section vous guide à travers les sujets suivants :

* [Responsabilités du validateur](validator-responsibilities.md)
* Rejoindre le réseau en tant que validateur :
  * [Démarrer et exécuter les nœuds avec Ansible](run-validator-ansible.md)
  * [Démarrer et exécuter les nœuds avec des binaires](run-validator-binaries.md)
  * [Miser en tant que validateur](validator-staking-operations.md)
* Maintien de vos nœuds de validation :
  * [Modifier l'adresse du signataire](change-signer-address.md)
  * [Changer la commission](validator-commission-operations.md)

Assistance de la communauté :

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
