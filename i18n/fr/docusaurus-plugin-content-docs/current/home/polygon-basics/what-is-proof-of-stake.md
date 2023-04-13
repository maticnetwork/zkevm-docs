---
id: what-is-proof-of-stake
title: Qu'est-ce que la Preuve d'Enjeu?
description: Un algorithme de consensus basé sur les validateurs.
keywords:
  - docs
  - matic
  - polygon
  - stake
  - delegate
  - validate
  - pos
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Preuve de prise (PoS) {#proof-of-stake-pos}

La preuve d'enjeu (Proof of Stake, PoS) est une catégorie d'algorithmes de consensus pour les blockchains publiques qui dépendent de la [participation](/docs/maintain/glossary#staking) économique d'un validateur au réseau.

Dans les blockchains publiques basées sur la preuve de travail (PoW), l'algorithme récompense les participants qui résolvent des énigmes cryptographiques pour valider les transactions et créer de nouveaux blocs. Exemples de blockchain PoW: Bitcoin, Ethereum antérieurs.

Dans les blockchains publiques basées sur la PoS, un ensemble de validateurs proposent et votent à tour de rôle le bloc suivant. Le poids du vote de chaque validateur dépend de la taille de son dépôt – [stake](/docs/maintain/glossary#staking). Les principaux avantages de la PoS sont la sécurité, la réduction du risque de centralisation et l'efficacité énergétique. Exemples de blockchains PoS: Eth2, Polygon.

De manière générale, un algorithme de PoS se présente ainsi. La blockchain garde la trace d'un ensemble de validateurs, et toute personne qui détient la crypto-monnaie de base de la blockchain (dans le cas d'Ethereum, l'ether) peut devenir un validateur en envoyant un type spécial de transaction qui verrouille son ether dans un dépôt. Le processus de création et d'approbation de nouveaux blocs se fait ensuite par le biais d'un algorithme de consensus auquel tous les validateurs actuels peuvent participer.

Il existe de nombreux types d'algorithmes de consensus, et de nombreuses façons d'attribuer des récompenses aux validateurs qui participent à celui-ci, il existe donc de nombreuses variantes de la preuve d'enjeu. D'un point de vue algorithmique, il en existe deux grands types: la PoS basée sur la chaîne et la PoS de type [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance).

Dans la **preuve d'enjeu basée sur la chaîne**, l'algorithme sélectionne de manière pseudo-aléatoire un validateur pendant chaque intervalle de temps (par exemple, chaque période de 10 secondes pourrait être un intervalle de temps), et attribue à ce validateur le droit de créer un seul bloc, et ce bloc doit ensuite se diriger vers un bloc précédent (normalement le bloc situé à la fin de la chaîne la plus longue), et ainsi, au fil du temps, la plupart des blocs convergent vers une seule chaîne en croissance constante.

Dans une **preuve d'enjeu de type BFT**, les validateurs se voient attribuer **de manière aléatoire** le droit de *proposer* des blocs, mais *l'accord sur le bloc canonique* se fait par le biais d'un processus à plusieurs tours au cours duquel chaque validateur envoie un « vote » pour un bloc spécifique à chaque tour, et à la fin du processus, tous les validateurs (honnêtes et en ligne) s'accordent de manière permanente sur le fait qu'un bloc donné fasse ou non partie de la chaîne. Notez que les blocs peuvent toujours être *reliés entre eux*; la principale différence est que le consensus sur un bloc peut être obtenu à l'intérieur d'un seul bloc, et ne dépend pas de la longueur ou de la taille de la chaîne suivante.

Pour plus de détails, consultez [https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

Voir aussi:

* [Délégateur](/docs/maintain/glossary#delegator)
* [Validateur](/docs/maintain/glossary#validator)
