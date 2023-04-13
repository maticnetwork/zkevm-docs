---
id: proposer-bonus
title: Bonus du proposant
description: Incitation supplémentaire d'être un validateur
keywords:
  - docs
  - polygon
  - matic
  - validate
  - proposer
  - bonus
  - incentive
slug: proposer-bonus
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bonus du proposant {#proposer-bonus}

Dans Polygon, un autre facteur vient s'ajouter : l'engagement de [points de contrôle](/docs/maintain/glossary.md#checkpoint-transaction) périodiques sur le réseau principal Ethereum. Il s'agit d'une partie importante des responsabilités des validateurs, qui sont incités à effectuer cette activité. Cela constitue un coût pour le validateur qui est unique pour une solution de couche 2 telle que Polygon. Nous nous efforçons de prendre en compte ce coût dans le mécanisme de paiement de la récompense de staking du validateur, sous la forme d'un bonus à verser au [proposant](/docs/maintain/glossary.md#proposer) chargé de valider le point de contrôle. La récompense après déduction du bonus doit être partagée entre tous les acteurs, les proposants et [les signataires](/docs/maintain/glossary.md#signer-address), de manière proportionnelle.

Pour bénéficier pleinement du bonus, le proposant doit inclure toutes les signatures dans le point de contrôle. Le protocole souhaitant une pondération de ⅔ +1 du total du stake, le point de contrôle est accepté même avec 80 % de votes. Toutefois, dans ce cas, le proposant ne reçoit que 80 % du bonus calculé.
