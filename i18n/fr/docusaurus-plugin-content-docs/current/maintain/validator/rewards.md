---
id: rewards
title: Récompenses
sidebar_label: Rewards
description: Découvrez les incitations du staking sur le réseau Polygon.
keywords:
  - docs
  - matic
  - polygon
  - rewards
  - staking
  - incentives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Pour une introduction à Polygon et à l'algorithme Proof Stake (Preuve), consultez [What is Proof of](/docs/home/polygon-basics/what-is-proof-of-stake) Stake

Dans Polygon, les validateurs stakent leurs jetons MATIC comme garantie pour travailler à la sécurité du réseau, et en échange de leur service, ils obtiennent des récompenses.

Pour tirer parti de l'économie de Polygon, vous devez devenir soit un validateur, soit un délégant.

Pour être un [validateur](/docs/maintain/glossary.md#validator), vous devez **exécuter un nœud de validation complet** et staker MATIC. Voir [Valider](/docs/maintain/validate/validator-index).

Vérifiez également la page [Responsabilités du](/docs/maintain/validate/validator-responsibilities) validateur.

Pour être [délégant](/docs/maintain/glossary.md#delegator), il suffit de **déléguer MATIC à un validateur**. Voir la section [Déléguer](/docs/maintain/delegate/delegate).

## Quelle est l'incitation ? {#what-is-the-incentive}

Polygon alloue 12 % de son offre totale de 10 milliards de jetons pour financer les récompenses de staking. Cela permet de s'assurer que le réseau est suffisamment bien implanté jusqu'à ce que les frais de transaction gagnent du terrain. Ces récompenses sont principalement destinées à faire démarrer le réseau, tandis que le protocole est destiné à se maintenir à long terme sur la base des frais de transaction.

**Récompenses du validateur = Récompenses du staking + Frais de transaction**

Ce montant est alloué de manière à assurer le découplage progressif des récompenses de staking, qui ne seront plus la composante dominante des récompenses des validateurs.

| Année | Stake cible (30 % de l'approvisionnement en circulation) | Taux de récompense pour un blocage de 30 %. | Pool de récompenses |
|---|---|---|---|
| Première année | 1 977 909 431 | 20 % | 312 917 369 |
| Deuxième année | 2 556 580 023 | 12 % | 275 625 675 |
| Troisième année | 2 890 642 855 | 9 % | 246 933 140 |
| Quatrième année | 2 951 934 048 | 7 % | 204 303 976 |
| Cinquième année | 2 996 518 749 | 5 % | 148 615 670 + **11 604 170** |

Vous trouverez ci-dessous un aperçu des récompenses annuelles escomptées pour les 5 premières années en tenant compte d'une offre de 5 % à 40 % à un intervalle de 5 %.

| % de l'approvisionnement en circulation staké | 5 % | 10 % | 15 % | 20 % | 25 % | 30 % | 35 % | 40 % |
|---|---|---|---|---|---|---|---|---|
| Récompense annuelle |
| Première année | 120 % | 60 % | 40 % | 30 % | 24 % | 20 % | 17,14 % | 15 % |
| Deuxième année | 72 % | 36 % | 24 % | 18 % | 14,4 % | 12 % | 10,29 % | 9 % |
| Troisième année | 54 % | 27 % | 18 % | 13,5 % | 10,8 % | 9 % | 7,71 % | 6,75 % |
| Quatrième année | 42 % | 21 % | 14 % | 10,5 % | 8,4 % | 7 % | 6 % | 5,25 % |
| Cinquième année | 30 % | 15 % | 10 % | 7,5 % | 6 % | 5 % | 4,29 % | 3,75 % |

## Qui bénéficie des incitations ? {#who-gets-the-incentives}

Les stakers qui gèrent des nœuds de validation et les stakers qui délèguent leurs jetons vers le validateur qu'ils préfèrent.

Les validateurs ont la possibilité de prélever une commission sur la récompense obtenue par les délégants.

Les fonds appartenant à tous les stakers sont verrouillés dans un contrat déployé sur le réseau principal d'Ethereum.

Aucun validateur ne dispose du contrôle sur les jetons des délégants.

## Récompenses de staking {#staking-rewards}

L'incitation annuelle est absolue : indépendamment du stake global ou du taux de blocage cible dans le réseau, le montant de l'incitation est distribué périodiquement comme récompense à tous les signataires.

Dans Polygon, un autre facteur vient s'ajouter : l'engagement de [points de contrôle](/docs/maintain/glossary.md#checkpoint-transaction) périodiques sur le réseau principal Ethereum. Il s'agit d'une partie importante des responsabilités des validateurs, qui sont incités à effectuer cette activité. Cela constitue un coût pour le validateur qui est unique pour une solution de couche 2 telle que Polygon. Nous nous efforçons de prendre en compte ce coût dans le mécanisme de paiement de la récompense de staking du validateur, sous la forme d'une prime à verser au [proposant](/docs/maintain/glossary.md#proposer), chargé d'engager le point de contrôle. La récompense sous déduction de la prime doit être partagée entre tous les stakers, les proposants et [les signataires](/docs/maintain/glossary.md#signer-address), proportionnellement.

## Encourager le proposant à inclure toutes les signatures {#encouraging-the-proposer-to-include-all-signatures}

Pour bénéficier pleinement de la prime, le [proposant](/docs/maintain/glossary.md#proposer) doit inclure toutes les signatures dans le [point de contrôle](/docs/maintain/glossary.md#checkpoint-transaction). Le protocole souhaitant une pondération de ⅔ +1 du total du stake, le point de contrôle est accepté même avec 80 % de votes. Toutefois, dans ce cas, le proposant ne reçoit que 80 % de la prime calculée.

## Frais de transactions {#transaction-fees}

Chaque producteur de blocs à [Bor](/docs/maintain/glossary.md#bor) reçoit un certain pourcentage des frais de transaction collectés dans chaque bloc. La sélection des producteurs pour une durée donnée dépend également du ratio du validateur dans le stake global. Les frais de transaction restants transitent par le même entonnoir que les récompenses qui sont partagées entre tous les validateurs travaillant sur la couche [Heimdall](/docs/maintain/glossary.md#heimdall).
