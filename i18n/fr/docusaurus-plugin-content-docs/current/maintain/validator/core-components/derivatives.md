---
id: derivatives
title: Dérivés
description: Délégation par les actions validateurs
keywords:
  - docs
  - polygon
  - matic
  - derivatives
  - delegation
  - shares
slug: derivatives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon prend en charge la [délégation](/docs/maintain/glossary#delegator) à partir des actions du validateur. En utilisant cette conception, il est plus simple de distribuer des récompenses et de couper à l'échelle sur les contrats du réseau principal d'Ethereum sans beaucoup de calcul.

Les délégants délèguent en achetant des actions d'un pool fini auprès des validateurs. Chaque validateur a son propre jeton de partage de validateur.

Nous appellerons les jetons fongibles d'actions du validateur VATIC pour le validateur A. Lorsqu'un utilisateur délègue au validateur A, l'utilisateur reçoit des VATIC basés sur le taux de change de la paire MATIC-VATIC. Au fur et à mesure que les utilisateurs gagnent de la valeur, le taux de change indique que l'utilisateur peut retirer plus de MATIC pour chaque VATIC. Lorsque les validateurs sont coupés, les utilisateurs retirent moins de MATIC pour leur VATIC.

Notez que MATIC est le jeton de staking. Un délégant doit avoir des jetons MATIC pour participer à la délégation.

Initialement, le délégant D achète des jetons au pool spécifique du validateur A lorsque le taux de change est de 1 MATIC pour 1 VATIC.

Lorsqu'un validateur reçoit plus de jetons MATIC, les nouveaux jetons sont ajoutés au pool.

Imaginons qu'avec le pool actuel de 100 jetons MATIC, 10 récompenses MATIC soient ajoutées au pool. Étant donné que la fourniture totale de jetons VATIC n'a pas changé en raison des récompenses, le taux de change devient 1 MATIC par 0,9 VATIC. Maintenant, le délégateur D obtient plus de MATIC pour le même montant si les actions sont nécessaires.

## Le flux dans le contrat {#the-flow-in-the-contract}

`buyVoucher`: cette fonction est attribuée lors de l'exécution d'un processus de délégation vers un validateur. La délégation `_amount`est d'abord transférée à `stakeManager`, qui, lors de la confirmation, mine les parts de délégation via `Mint`en utilisant le `exchangeRate`actuel.

Le taux de change est calculé selon la formule :

`ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares`

`sellVoucher`: cette fonction est utilisée lorsqu'un délégant effectue un unbonding d'un validateur. Cette fonction initie essentiellement le processus de vente des bons achetés lors de la délégation. Un délai de rétractation est pris en considération avant que les délégants puissent `claim`leurs jetons.

`withdrawRewards`: en tant que délégant, vous pouvez demander vos récompenses en invoquant la fonction `withdrawRewards`.

`reStake`: le restaking peut fonctionner de deux manières : a) le délégant peut acheter plus d'actions en utilisant des récompenses `buyVoucher`ou `reStake`. Vous pouvez remiser en misant plus de jetons vers un validateur ou vous pouvez remiser vos récompenses accumulées en tant que délégant. Le but de `reStaking`est de permettre au validateur, qui a maintenant une participation plus active, de gagner plus de récompenses à ce titre, tout comme le délégant.

`unStakeClaimTokens`: une fois le délai de rétractation écoulé, les délégants qui ont vendu leurs actions peuvent réclamer leurs jetons MATIC.

`updateCommissionRate`: met à jour le % de commission pour le validateur. Voir aussi [Opérations liées aux commissions du validateur](/docs/maintain/validate/validator-commission-operations).

`updateRewards`: lorsqu'un validateur reçoit des récompenses pour l'ajout d'un [point de contrôle](/docs/maintain/glossary#checkpoint-transaction), cette fonction est appelée pour les déboursements de récompenses entre le validateur et les délégants.
