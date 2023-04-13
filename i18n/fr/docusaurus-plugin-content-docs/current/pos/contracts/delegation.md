---
id: delegation
title: Délégation via les actions de validateur
sidebar_label: Delegation
description: Délégation via les actions de validateur
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon prend en charge la délégation à partir des actions du validateur. En utilisant cette conception, il est plus simple de distribuer des récompenses et de supprimer avec l'échelle (des milliers de délégués) sur les contrats d'Ethereum sans beaucoup de calcul.

Les délégants délèguent en achetant des actions d'un pool limité auprès des validateurs. Chaque validateur aura son propre jeton d'action de validateur. Appelons ces jetons fongibles `VATIC` pour un validateur `A`. Dès qu'un utilisateur délègue à un validateur `A`, il recevra `VATIC` selon la base du taux de change de la paire `MATIC/VATIC`. Au fur et à mesure que les utilisateurs accumulent de la valeur, le taux de change indique qu'ils peuvent désormais retirer plus de `MATIC` pour chaque, `VATIC` et lorsque les utilisateurs sont supprimés, ils retirent moins de `MATIC` pour leur `VATIC`.

Veuillez noter que `MATIC` est un jeton de staking. Un délégant doit disposer de `MATIC` jetons pour participer à la délégation.

Initialement, un délégant `D` achète des jetons de la part d'une `A` réserve spécifique de validateur  lorsque `1 MATIC per 1 VATIC`.

Lorsqu'un validateur est récompensé par davantage de `MATIC` jetons , de nouveaux jetons sont ajoutés à la réserve. Supprimons que avec le pool actuel de `100 MATIC`jetons, des `10 MATIC`récompenses sont ajoutées à la piscine. Cependant, puisque l'approvisionnement total de `VATIC` jetons n'a pas changé en raison des récompenses, le taux de change devient `1 MATIC per 0.9 VATIC`. Maintenant, le délégateur `D`obtient plus `MATIC`pour les mêmes actions.

`VATIC`: Les jetons d'actions spécifique de validateur frappés d'un validateur (jetons ERC20)

## Spécification technique {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

Le taux de change est calculé comme ci-dessous:

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## Méthodes et variables {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- Transférer le `_amount` vers le stakeManager et mettez à jour la structure de données de la ligne de temps pour le stake actif.
- `updateValidatorState` est utilisé pour mettre à jour la ligne de temps DS.
- `Mint` la délégation partage en utilisant le `exchangeRate` actuel pour `_amount`.
- `amountStaked` est utilisé pour retracer le stake actif de chaque délégant afin de calculer les récompenses liquides.

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- Utiliser le nombre actuel `exchangeRate`et d'actions pour calculer le montant total (mise active + récompenses).
- `unBond`le jeu actif du validateur et transférer des récompenses au délégateur, le cas échéant.
- Doit retirer le stake actif de la ligne de temps en utilisant `updateValidatorState` dans stakeManger.
- `delegators`La cartographie est utilisée pour retracer le stake dans la période de retrait.

### withdrawRewards {#withdrawrewards}

```js
function withdrawRewards() public;
```

- Pour un delegator, calculez les récompenses et le transfert, et selon le nombre de `exchangeRate`brûlures des actions.
- Exemple : si un délégateur possède 100 actions et que le taux de change est de 200 alors les récompenses sont 100 jetons, transférez 100 jetons vers le délégateur. Le reste du jeu est de 100 donc en utilisant le taux de change 200, maintenant il vaut 50 actions. Alors, brûlez 50 actions. Le délégué a maintenant 50 actions d'une valeur de 100 jetons (qu'il a initialement staké / délégué).

### Restaker {#restake}

La reprise peut fonctionner de deux façons: le délégateur peut acheter plus de parts en utilisant `buyVoucher`ou reStake récompenses.

```js
function reStake() public;
```

La fonction ci-dessus est utilisée pour reStake récompenses. Le nombre d'actions n'est pas affecté parce que `exchangeRate` est le même; donc seules les récompenses sont déplacées vers le stake actif pour le contrat d'action de validateur et la ligne de temps du stakeManager.

`getLiquidRewards`est utilisé pour calculer les récompenses accumulées c'est-à-dire que le délégateur possède 100 parts et le taux de change est de 200, donc les récompenses sont 100 jetons. Move 100 jetons dans des parties actives, puisque le taux de change est toujours le même nombre de parts restera également identiques. Seule la différence est que 200 jetons sont considérés comme étant actifs et ne peuvent pas être retirés immédiatement (pas une partie des récompenses liquides).

Le but de reprendre est que puisque le validateur du délégateur a maintenant un enjeu plus actif et qu'ils gagneront plus de récompenses pour cela le fera aussi.

### unStakeClaimTokens {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

Une fois la période de retrait terminée, les délégués qui ont vendu leurs actions peuvent réclamer leurs jetons MATIC. Doit transférer les jetons à l'utilisateur.

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- Met à jour le % de commission pour le validateur.

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

Lorsqu'un validateur reçoit des récompenses pour soumettre un point de contrôle, cette fonction est requise pour des décaissements de récompenses entre validateur et les délégateurs.
