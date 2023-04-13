---
id: delegation
title: delegasyon sa pamamagitan ng Pagbabahagi ng Validator
sidebar_label: Delegation
description: delegasyon sa pamamagitan ng Pagbabahagi ng Validator
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Sinusuportahan ng Polygon ang pag-delegate sa pamamagitan ng mga validator share. Sa paggamit ng disenyong ito, mas madaling ipamahagi ang mga reward at mag-slash nang naka-scale (libo-libong delegator) sa mga kontrata ng Ethereum nang walang masyadong pagkalkula.

Nagde-delegate ang mga delegator sa pamamagitan ng pagbili ng mga share ng isang finite pool mula sa mga validator. Bawat validator ay magkakaroon ng sarili nilang validator share na token. Tawagin natin ang mga fungible token na ito na `VATIC` para sa isang validator `A`. Sa sandaling mag-delegate ang isang user sa isang validator `A`, iisyuhan sila ng `VATIC` batay sa halaga ng palitan ng `MATIC/VATIC` na pair. Habang nakakaipon ng value ang mga user, ipinapahiwatig ng halaga ng palitan na maaari na silang mag-withdraw ng mas maraming `MATIC` para sa bawat `VATIC` at kapag nai-slash ang mga user, nagwi-withdraw ang mga user ng mas kaunting `MATIC` para sa kanilang `VATIC`.

Tandaan na ang `MATIC` ay isang token sa pag-stake. Ang isang delegator ay kailangang magkaroon ng mga `MATIC` token upang lumahok sa pag-delegate.

Sa una, bumibili ang isang delegator `D` ng mga token mula sa espesipikong pool ng validator `A` kapag `1 MATIC per 1 VATIC`.

Kapag nabibigyan ng reward ang isang validator ng mas maraming `MATIC` token, nagdadagdag ng mga bagong token sa pool. Sabihin nating sa kasalukuyang pool ng mga `100 MATIC`token, idinadagdag ang mga `10 MATIC`gantimpala sa pool. Ngunit dahil ang kabuuang supply ng mga `VATIC` token ay hindi nagbago dahil sa mga gantimpala, ang halaga ng palitan ay magiging `1 MATIC per 0.9 VATIC`. Ngayon, `D`nakakakuha ang delegator para `MATIC`sa parehong shares.

`VATIC`: Mga na-mint na validator share token (mga ERC20 token) na partikular sa validator

## Teknikal na espesipikasyon {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

Kinakalkula ang halaga ng palitan tulad ng nasa ibaba:

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## Mga Paraan at Variable {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- Ilipat ang `_amount` sa stakeManager at i-update ang timeline data structure para sa aktibong stake.
- Ginagamit ang `updateValidatorState` para i-update ang timeline DS.
- Mag-`Mint` ng mga delegation share gamit ang kasalukuyang `exchangeRate` para sa `_amount`.
- Ginagamit ang `amountStaked` para subaybayan ang aktibong stake ng bawat delegator upang makalkula ang mga liquid na reward.

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- Gamit ang kasalukuyang `exchangeRate`at bilang ng mga shares para to ang kabuuang halaga (active stake + gantimpala).
- `unBond`aktibong stake mula sa validator at maglipat ng mga gantimpala sa delegator, kung meron man.
- Dapat alisin ang aktibong stake mula sa timeline gamit ang `updateValidatorState` sa stakeManger.
- Ginagamit ang pagmamapa ng `delegators` upang subaybayan ang stake sa panahon ng pag-withdraw.

### withdrawRewards {#withdrawrewards}

```js
function withdrawRewards() public;
```

- Para sa isang delegator, kalkulahin ang mga gantimpala at paglipat, at depende sa pagbilang ng `exchangeRate`mga shares.
- Halimbawa: kung ang isang delegator ay nagmamay-ari ng 100 shares at exchange rate ay 200 kaya ang mga gantimpala ay 100 tokens, maglipat ng 100 token sa delegator. Ang natitira na stake ay 100 kaya gamit ang exchange rate 200, ngayon ay nagkakahalaga ng 50 shares. Kaya mag-burn ng 50 shares. May 50 shares ngayon ang delegator na nagkakahalaga ng 100 token (na una niyang nilalagyan / delegado).

### Mag-restake {#restake}

Maaaring magtrabaho ang pag-restake sa dalawang paraan: makabibili ang delegator ng mas maraming shares gamit o mag-reStake `buyVoucher`ng mga gantimpala.

```js
function reStake() public;
```

Ginagamit ang function sa itaas para i-reStake ang mga gantimpala. Hindi naaapektuhan ang bilang ng mga share dahil ang `exchangeRate` ay pareho; ang mga gantimpala lang ang inililipat sa aktibong stake para sa parehong kontrata ng validator share at stakeManager timeline.

`getLiquidRewards`ay ginagamit para sa pagkalkula ng mga naipon na gantimpala ibig sabihin, nagmamay-ari ang delegator ng 100 share at ang exchange rate ay 200, kaya ang mga gantimpala ay 100 tokens. Ilipat ang 100 token sa aktibong stake, dahil ang exchange rate ay mananatili ring parehas ang share Ang pagkakaiba lamang ay ang 200 token na ngayon ay itinuturing na aktibong stake at hindi agad mai-withdraw (hindi isang bahagi ng mga gantimpala ng likido).

Layunin ng pag-restake ay na dahil may mas aktibong stake ngayon ang validator ng delegator at kumikita sila ng mas maraming gantimpala para sa ganoon ay magiging delegator.

### unStakeClaimTokens {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

Kapag sobra ang tagal ng pag-withdraw, maaaring i-claim ng mga delegator ang kanilang mga shares ng MATIC. Dapat ilipat ang mga token sa user.

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- Ina-update ang % ng komisyon para sa validator.

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

Kapag nakakakuha ang isang validator ng mga gantimpala para sa pagsusumite ng checkpoint, tinatawag ang function na ito para sa mga disbursement ng mga gantimpala sa pagitan ng validator at ng mga delegator.
