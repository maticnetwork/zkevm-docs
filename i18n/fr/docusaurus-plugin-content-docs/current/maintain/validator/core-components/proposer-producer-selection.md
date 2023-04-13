---
id: proposers-producers-selection
title: Sélection des proposants et des producteurs
sidebar_label: Proposers & Producers
description: Sélection des producteurs proposant et blocs sur Polygon
keywords:
  - docs
  - polygon
  - matic
  - proposers
  - block producers
  - selection
slug: proposers-producers-selection
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Les producteurs de blocs pour la couche BOR sont un comité sélectionné à partir du pool de validateurs sur la base de leur mise qui se produit à intervalles réguliers. Ces intervalles sont décidés par la gouvernance du validateur par rapport à la dynastie et au réseau.

Le ratio de [mise](/docs/maintain/glossary.md#staking) précise la probabilité d'être sélectionné en tant que membre du comité des [producteurs de blocs](/docs/maintain/glossary.md#block-producer).

## Processus de sélection {#selection-process}

Supposons que nous ayons 3 validateurs dans le pool : Alice, Bill et Clara :

* Alice mise 100 jetons MATIC.
* Bill mise 40 jetons MATIC.
* Clara mise 40 jetons MATIC.

Les validateurs se voient attribuer des créneaux en fonction de la mise.

Comme Alice a misé 100 jetons MATIC et que le coût par créneau est de 10 jetons MATIC, comme maintenu par la gouvernance du validateur, Alice obtient 5 créneaux au total. De même, Bill et Clara obtiennent 2 créneaux au total.

Les validateurs Alice, Bill et Clara se voient attribuer les créneaux suivants :

* [A, A, A, A, A, B, B, C, C]

Polygon mélange ensuite le tableau des créneaux d'Alice, de Bill et Clara en utilisant le bloc Ethereum comme graine.

Le résultat du brassage est le tableau suivant de créneaux :

* [A, B, A, A, C, B, A, A, C]

Maintenant, en fonction du nombre total de producteurs de blocs maintenu par la gouvernance du validateur, Polygon utilise les validateurs du haut. Par exemple, pour un ensemble de 5 producteurs, le tableau de créneaux est ​​[A, B, A, A, C].​​

Le jeu du producteur pour le span suivant est défini ainsi : [A: 3, B:1, C:1].

À l'aide du jeu de validateurs résultant et de l'[algorithme de sélection des proposants](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html) de Tendermint, Polygon sélectionne un producteur pour chaque sprint sur Bor.

<img src={useBaseUrl("img/validators/producer-proposer.png")} />

**Légende:**

* Dynastie : laps de temps entre la fin de la dernière enchère et l'heure de début de la prochaine enchère.
* Sprint : intervalle de temps pour lequel le comité des producteurs de blocs est sélectionné.
* Span : nombre de blocs produits par un seul producteur.
