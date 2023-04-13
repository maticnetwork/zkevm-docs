---
id: who-is-delegator
title: Qui est délégant
description: Les titulaires de jetons qui n'exécutent pas de nœud
keywords:
  - docs
  - matic
  - polygon
  - delegator
  - Who is a Delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Les délégants sont des détenteurs de jetons qui ne peuvent ou ne veulent pas gérer eux-mêmes un nœud de [validation](/docs/maintain/glossary.md#validator). Au contraire, ils sécurisent le réseau en déléguant leur stake aux nœuds de validation et jouent un rôle critique dans le système, en raison de leur responsabilité dans le choix des validateurs. Ils exécutent leur transaction de délégation à partir du contrat de staking sur le réseau principal Ethereum.

Les jetons MATIC sont bloqués au prochain [point de contrôle](/docs/maintain/glossary.md#checkpoint-transaction) commis sur le réseau principal Ethereum. Les délégants ont également la possibilité de se retirer du système quand ils le souhaitent. Tout comme les validateurs, les délégants doivent attendre la fin de la période de verrouillage, qui est d'environ 9 jours, avant de retirer leur stake.

## Frais et récompenses {#fees-and-rewards}

Les délégants stakent leurs jetons en les déléguant à un validateur, obtenant en échange un pourcentage de leurs récompenses. Étant donné que les délégants partagent les récompenses avec leurs validateurs, les délégants partagent également les risques. Si un validateur se comporte de manière incorrecte, chacun de ses délégants risque d'être partiellement réduit en proportion de son stake délégué.

Les validateurs définissent un pourcentage de [commission](/docs/maintain/glossary.md#commission) pour déterminer le pourcentage de récompenses qui leur reviendra. Les délégants sont en mesure de visualiser le taux de commission de chaque validateur afin de comprendre la répartition des récompenses de chacun et le taux de rendement relatif à leur stake.

:::caution Validateurs avec un taux de commission de 100 %

Ce sont des validateurs qui prennent toutes les récompenses et ne recherchent pas de délégation, car ils ont suffisamment de jetons pour s'engager seul.

:::

Les délégations ont la possibilité de déléguer à nouveau leurs jetons à d'autres validateurs. Des récompenses s'accumulent à chaque point de contrôle.

:::tip Être un délégant actif

La délégation ne doit pas être considérée comme une activité passive, car les délégants font partie intégrante du maintien
du réseau Polygon. Chaque délégant est responsable de la gestion de son propre risque, mais en procédant ainsi, les délégants
doivent s'efforcer d'élire des validateurs qui font preuve d'un comportement correct.

:::

## Voir aussi {#see-also}

* [Déléguer](/docs/maintain/delegate/delegate)
* [FAQ du validateur](/docs/maintain/validate/faq/validator-faq)
