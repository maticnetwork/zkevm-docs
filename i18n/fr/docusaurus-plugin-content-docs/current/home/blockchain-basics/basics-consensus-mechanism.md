---
id: consensus-mechanism
title: Mécanisme de consensus
description: "PoW, PoS, DPoS, PoSpace et PoET."
keywords:
  - docs
  - matic
  - polygon
  - consensus mechanisms
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Mécanisme de consensus {#consensus-mechanism}

Un mécanisme de consensus est un mécanisme tolérant aux pannes qui est utilisé dans les systèmes informatiques et les blockchains pour parvenir à l'accord nécessaire sur une seule valeur de données ou un seul état du réseau parmi les processus distribués ou les systèmes multi-agents, comme avec les cryptomonnaies.

## Types de mécanisme de consensus {#types-of-consensus-mechanism}

### Preuve de travail {#proof-of-work}
La preuve de travail décrit un système qui nécessite une quantité d'effort non négligeable, mais réalisable afin d'empêcher les attaques par déni de service et autres attaques malveillantes. Il nécessite de résoudre un puzzle informatique difficile pour créer de nouveaux blocs dans Blockchain.

### Preuve d'Enjeu {#proof-of-stake}
Le mécanisme de preuve de prise obtient un consensus en exigeant des utilisateurs qu'ils mettent en jeu une quantité de leurs jetons afin d'avoir une chance d'être sélectionnés pour valider des blocs de transactions, et d'être récompensés pour le faire. La priorité est donnée aux mineurs qui ont staké le plus dans le système de la blockchain.

### Preuve de prise déléguée {#delegated-proof-of-stake}
Cette forme de consensus reflète l'élection des membres au sein des instances dirigeantes. Au lieu de stocker leurs actifs eux-mêmes, les intervenants peuvent déléguer cette activité à des tiers, au témoin ou aux délégués qui participeront au processus de consensus. Les témoins, ceux qui valident les transactions, présentent généralement une proposition, demandent des votes et sont élus par les parties prenantes. Les récompenses gagnées par ces entités sont généralement partagées avec les participants du réseau.

### Preuve de l'espace {#proof-of-space}
Ce genre de mécanisme de consensus est utile dans les applications de stockage de fichiers décentralisées comme dans Storj.io, Filecoin et Crust, où les nœuds prouvent qu'ils ont une capacité légitime dans leur matériel. Cependant, au lieu d'utiliser un calcul lourd comme dans le mécanisme PoW, il tire parti de la capacité de stockage de chaque nœud. On parle aussi parfois de PoStorage ou de PoCapacity.

### Preuve de temps écoulé {#proof-of-elapsed-time}
Une meilleure alternative à la PoW, consommant moins de ressources informatiques. Chaque nœud participant doit attendre un certain temps aléatoire, et le tout premier nœud à se réveiller de sommeil obtient une chance de créer un nouveau bloc, qui est ensuite propagé via le réseau. Il nécessite des environnements d'exécution fiables (TEE ) comme Intel SGX, qui sont une partie isolée de la mémoire et ne peuvent être accessibles que en utilisant un certain ensemble d'instructions.

## **Ressources**

- [Tolérance aux défaillances Byzantines](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419)<br></br>
- [Type de mécanismes de consensus](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms)<br></br>
- [Aperçu et historique du développement du système consensus](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/)<br></br>
- [Comprendre le consensus distribué](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95)<br></br>
- [Problèmes généraux Byzantins](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)