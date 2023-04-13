---
id: general-faq
title: FAQ Générale
description: Questions Fréquement Posées relatives au réseau de Polygon.
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Qu'est-ce que le Réseau de Polygon? {#what-is-polygon-network}

Le Réseau de Polygon est une solution de mise à l'échelle de Couche 2 qui utilise des chaînes latérales pour le calcul hors-chaîne, tout en assurant la sécurité et la décentralisation des actifs grâce à des validateurs de Preuve de Participation (PoS).

Voir aussi [Qu'est-ce que Polygon](/docs/home/polygon-basics/what-is-polygon)?

## Qu'est-ce que la Preuve de Participation (PoS)? {#what-is-proof-of-stake-pos}

La Preuve de Participation est un système dans lequel le réseau blockchain vise à obtenir un consensus distribué. Toute personne disposant d'une quantité suffisante de jetons peut verrouiller ses cryptomonnaies et l'incitation économique réside dans la valeur partagée du réseau décentralisé. Les individus en staking de leurs cryptomonnaies valident les transactions en votant sur celles-ci, alors que le consensus est atteint lorsqu'une transaction ou un ensemble de transactions dans un bloc, ou un ensemble de blocs dans un point de contrôle reçoit suffisamment de votes. Le seuil utilise le poids en ce qui concerne les stakes qui accompagne chaque vote. Par exemple, dans Polygon, le consensus est atteint pour valider des points de contrôle des blocs de Polygon sur le réseau Ethereum, lorsqu'au moins ⅔ +1 du total de la puissance de staking vote pour cela.

Voir aussi [Qu'est-ce Que La Preuve De Participation](/docs/home/polygon-basics/what-is-proof-of-stake)?

## Quel rôle joue la Preuve de Participation dans l'architecture de Polygon? {#what-role-does-proof-of-stake-play-in-the-polygon-architecture}

La couche de Preuve de Participation dans l'architecture de Polygon sert les deux objectifs suivants:

* Agir comme une couche d'incitation pour maintenir la vivacité de la chaîne Plasma en atténuant principalement l'épineux problème de l'indisponibilité des données.
* Mettre en œuvre les garanties de sécurité de la Preuve de Participation pour les transitions d'état non couvertes par Plasma.

## En quoi le système de la PoS de Polygon est-il différent des autres systèmes similaires? {#how-is-polygon-pos-different-from-other-similar-systems}

Il est différent dans le sens où on se sert d'un double objectif -  à savoir fournir des garanties de disponibilité des données pour la chaîne Plasma ,couvrant les transitions d'état via les prédicats Plasma, et assurer la validation de la preuve de participation pour les contrats intelligents génériques dans l'EVM.

L'architecture de Polygon sépare également le processus de production et de validation des blocs en 2 couches distinctes. Les validateurs, en tant que producteurs de blocs, créent des blocs, comme leur nom l'indique, sur la chaîne de Polygon pour des confirmations partielles et plus rapides (< 2 secondes), tandis que la confirmation finale est obtenue une fois que le point de contrôle est validé sur la chaîne principale avec un certain intervalle, dont la période peut varier en fonction de multiples facteurs comme la congestion de l'Ethereum ou le nombre de transactions sur Polygon. Idéalement, cet intervalle sera d'environ 15 minutes à 1 heure.

Un point de contrôle est en fait le root de Merkle de tous les blocs produits entre les intervalles. Les validateurs jouent plusieurs rôles, en créant des blocs au niveau de la couche du producteur de blocs, participant au consensus en signant tous les points de contrôle et en validant le point de contrôle lorsqu'ils agissent en tant que proposant. La probabilité qu'un validateur devienne le producteur ou le proposant de blocs est basée sur leur ratio de stake dans le pool global.

## Encourager le proposant à inclure toutes les signatures {#encouraging-the-proposer-to-include-all-signatures}

Pour profiter pleinement de la prime au proposant, ce dernier devra inclure toutes les signatures dans le point de contrôle. Étant donné que le protocole souhaite une pondération de ⅔ +1 du total des stakes, le point de contrôle sera accepté même avec 80 % de votes. Toutefois, dans ce cas, le proposant ne reçoit que 80 % de la prime calculée.

## Comment puis-je soulever un ticket d'assistance ou contribuer à la documentation de Polygon? {#how-can-i-raise-a-support-ticket-or-contribute-to-polygon-documentation}
Si vous pensez que quelque chose doit être corrigé dans notre documentation ou si vous voulez même ajouter de nouvelles informations, vous pouvez [soumettre une requête sur le référentiel Github](https://github.com/maticnetwork/matic.js/issues). Le [fichier Readme](https://github.com/maticnetwork/matic-docs/blob/master/README.md) du référentiel vous donne également quelques suggestions sur la façon de contribuer à notre documentation.

Si vous avez encore besoin d'assistance, vous pouvez toujours contacter **notre équipe de soutien**.
