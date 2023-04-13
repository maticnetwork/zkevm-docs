---
id: polygon-architecture
title: Architecture de la PoS de Polygon
description: Polygon PoS Architecture incluant les chaînes Heimdall et Bor
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - pos
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Architecture de la PoS de Polygon {#polygon-pos-architecture}

Le réseau Polygon est une plate-forme d'application blockchain qui fournit des chaînes latérales hybrides de type preuve de participation et Plasma.

Architecturalement, la beauté de Polygon est son design élégant, qui dispose d'une couche de validation générique séparée des environnements d'exécution variables, comme les versions latérales EVM pleine soufflée et d'autres approches de couche 2 telles que les déploiements zéro connaissance.

Pour activer le mécanisme de PoS sur notre plate-forme, ensemble de contrats de gestion de **staking** est déployé sur Ethereum, de même qu'un ensemble de validateurs incités exécutant des nœuds **heimdall** et **bor**. Ethereum est la première chaîne de base prise en charge par Polygon sur la base des suggestions et du consensus de la communauté, afin de permettre une plate-forme blockchain décentralisée interopérable de couche 2. Toutefois, Polygon a l'intention de prendre en charge d'autres chaînes de base.

La PoS de polygon repose sur une architecture à trois couches :

1. Staking de contrats intelligents sur Ethereum
2. Heimdall (couche de preuve de participation)
3. Bor (couche de production de blocs)

<img src={useBaseUrl("img/matic/Architecture.png")} />

### Contrats intelligent Polygon (sur Ethereum) {#polygon-smart-contracts-on-ethereum}

Polygon conserve un ensemble de contrats intelligents sur Ethereum, qui gèrent les éléments suivants :

- Gestion du staking pour la couche de preuve de participation
- Gestion de la délégation, y compris les parts des validateurs
- Points de contrôle/instantanés de l'état de la chaîne latérale

### Heimdall (couche validateur de la preuve de participation) {#heimdall-proof-of-stake-validator-layer}

**Heimdall** est le nœud validateur de la PoS qui fonctionne en conjonction avec les contrats de staking sur Ethereum pour activer le mécanisme de la PoS sur Polygon. Nous l'avons mis en œuvre en nous appuyant sur le moteur de consensus de Tendermint, en modifiant le schéma de signature et diverses structures de données. Il est responsable de la validation des blocs, de la sélection des comités de producteurs de blocs, du point de contrôle d'une représentation des blocs de la chaîne latérale vers Ethereum dans notre architecture et de diverses autres responsabilités.

La couche Heimdall gère l'agrégation des blocs produits par Bor dans un arbre de Merkle et publie périodiquement la racine de Merkle à la chaîne d'origine. Ces publications périodiques sont appelées `checkpoints`. Pour chaque bloc sur Bor, un validateur (sur la couche Heimdall) :

1. Valide tous les blocs depuis le dernier point de contrôle
2. Crée un arbre de merkle des identifiants de blocs
3. Publie le root de merkle sur la chaîne principale

Les points de contrôle sont importants pour deux raisons:

1. Fournir une finalité sur la Chaîne Root
2. Fournir une preuve de brûlure lors du retrait des actifs

Une vue d'ensemble du processus peut être expliquée comme:

- Un sous-ensemble de valideurs actifs du pool est sélectionné pour agir en tant que producteurs de blocs pour une durée. La Sélection de chaque durée devra également être approuvée par au moins 2/3 des énergies. Ces producteurs de blocs sont responsables de créer des blocs et de les diffuser au réseau restant.
- Un point de contrôle comprend le root de tous les blocs créés pendant un intervalle donné. Tous les nœuds valident de la même façon et y attachent leur signature.
- Un proposant sélectionné de l'ensemble de validateurs est responsable de collecter toutes les signatures pour un point de contrôle particulier et de les engager sur la chaîne principale.
- La responsabilité de créer des blocs et aussi de proposer des points de contrôle dépend de façon variable du ratio de participation d'un validateur dans le pool global.

### Bor (couche des producteurs de blocs) {#bor-block-producer-layer}

Bor est la couche des producteurs de blocs de Polygon, l'entité responsable de l'agrégation des transactions en blocs.

Les producteurs de blocs sont périodiquement mélangés via un comité de sélection sur Heimdall pendant des durées appelées `span` dans Polygon. Les blocs sont produits au niveau du nœud **Bor** et la machine virtuelle de la chaîne latérale est compatible avec EVM. Les blocs produits sur Bor sont également validés périodiquement par les nœuds Heimdall, et un point de contrôle constitué du hachage de l'arbre de Merkle d'un ensemble de blocs sur Bor est transmis périodiquement à Ethereum.

### Ressources {#resources}

- [Architecture de Bor](https://forum.polygon.technology/t/matic-system-overview-bor/9123)
- [Architecture de Heimdall](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
- [Mécanisme de point de contrôle](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
