---
id: bor-chain
title: Qu'est-ce que la BoR-Chain ?
sidebar_label: Bor Chain
description: Introduction à la chaîne Bor ou au Sidechain VM pour Polygon PoS
keywords:
  - docs
  - matic
  - polygon
  - bor chain
  - sidechain VM
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Chaîne Bor {#bor-chain}

Le nœud Bor ou l'implémentation du producteur de blocs est essentiellement l'opérateur sidechain. La chaîne latérale de VM est compatible avec EVM. Actuellement, il s'agit d'une mise en œuvre de base de Geth avec des modifications personnalisées faites à l'algorithme de consensus. Cependant, cela sera construit en partant de la base pour être léger et ciblé.

Les producteurs de bloc sont choisis dans l'ensemble de Validateurs et sont mélangés en utilisant les identifiants historiques des blocs d'Ethereum dans le même but. Cependant, nous explorons des sources de caractère aléatoire pour cette sélection.