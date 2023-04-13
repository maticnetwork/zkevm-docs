---
id: validator-node-system-requirements
title: Exigences du système
description: Exigences système pour exécuter un nœud validateur
keywords:
  - docs
  - matic
  - polygon
  - prerequisites
  - requirements
slug: validator-node-system-requirements
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Les exigences du système répertoriées dans cette section concernent à la fois le nœud [sentinelle](/docs/maintain/glossary.md#sentry) et le nœud de [validation](/docs/maintain/glossary.md#validator).

Les exigences **minimales** du système signifient que vous pouvez exécuter les nœuds, mais la configuration n'est pas à l'épreuve du temps.

Les exigences système **recommandées** signifient que les nœuds sont à l'épreuve du temps. Cependant, il n'y a pas de limite supérieure à la pérennisation de vos nœuds.

Vous devez toujours exécuter le nœud sentinelle et le nœud de validation sur des machines séparées.

## Configuration système recommandée {#minimum-system-requirements}

* RAM : 32 Go
* CPU : 8 noyaux
* Stockage: 2,5 To SSD

:::info

Pour Amazon Web Services (AWS), l'équivalent des instances requises minimum sont **m5d.2xlarge** ou **t3.2xlarge** avec des crédits illimités sélectionnés.

Pour le stockage, assurez-vous que le stockage SSD 2,5 To est extensible.

:::

## Configuration système recommandée {#recommended-system-requirements}

* RAM : 64 Go
* CPU : 16 noyaux
* Stockage: 5 To SSD
* Bande passante : 1 Gbit/s

:::info

Pour Amazon Web Services (AWS), l'équivalent de l'instance requise recommandée est **m5d.4xlarge**.

Pour OVH, l'équivalent de l'instance requise recommandée est **infra-3**.

Pour le réseau, attendez-vous à 3 à 5 To de données transférées par mois.

:::
