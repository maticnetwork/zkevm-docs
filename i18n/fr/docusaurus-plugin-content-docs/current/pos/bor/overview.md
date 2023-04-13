---
id: overview
title: Aperçu
description: Le nœud Bor est fondamentalement l'opérateur sidechain
keywords:
  - docs
  - matic
  - polygon
  - bor
  - geth
image: https://matic.network/banners/matic-network-16x9.png
---

# Bor {#bor}

Le nœud Bor ou la mise en œuvre du producteur de blocs est essentiellement l'opérateur de la chaîne latérale. La chaîne latérale de VM est compatible avec EVM. Actuellement, il s'agit d'une mise en œuvre de base de Geth avec des modifications personnalisées faites à l'algorithme de consensus. Cependant, cela sera construit en partant de la base pour être léger et ciblé.

Les producteurs de bloc sont choisis dans l'ensemble de Validateurs et sont mélangés en utilisant les identifiants historiques des blocs d'Ethereum dans le même but. Cependant, nous explorons des sources de caractère aléatoire pour cette sélection.