---
id: delegation
title: Validator Payları üzerinden Delegasyon
sidebar_label: Delegation
description: Validator Payları üzerinden Delegasyon
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon, doğrulayıcı payları üzerinden delegasyonu destekler. Bu tasarımı kullanarak, Ethereum mainnet sözleşmeleri üzerinde fazlaca bir hesaplama yapmadan ödül dağıtmak ve orantılı olarak kesinti yapmak daha kolaydır.

Delege edenler, doğrulayıcılardan sınırlı bir havuzun paylarını satın alarak delege ederler. Her doğrulayıcı, kendi doğrulayıcı payının token'ına sahip olacaktır. Bu değiştirilebilir token'lara `A` doğrulayıcısı için `VATIC` adıyla hitap edelim. Bir kullanıcı `A` doğrulayıcısına delegasyon tanımladığında, o kullanıcıya `MATIC/VATIC` çiftinin çevrim kuruna göre bir miktar `VATIC` verilecektir. Kullanıcılar değer biriktirdikçe, çevrim kuru her `VATIC` için daha fazla `MATIC` çekebileceğini belirtir ve kullanıcılar, kendilerinden kesinti yapıldığında, ellerindeki `VATIC` için daha az `MATIC` çekerler.

`MATIC` token'ının bir staking token'ı olduğuna dikkat edin. Delege edenin delegasyona katılmak için `MATIC` token'ına sahip olması gerekir.

Başlangıçta, delege eden `D`, `1 MATIC per 1 VATIC` olduğunda doğrulayıcı `A` özel havuzundan token satın alır.

Bir doğrulayıcı daha fazla `MATIC` token ile ödüllendirildiğinde, havuza yeni token'lar eklenir. Mevcut `100 MATIC`jeton havuzunda `10 MATIC`ödüllerin havuza ekleneceğini varsayalım. Ama `VATIC`token'ların toplam arzı ödüller nedeniyle değişmediği için çevrim kuru `1 MATIC per 0.9 VATIC` olarak belirlenir. Şimdi de delege aynı hisse `MATIC`için daha fazlasını elde `D`ediyor.

`VATIC`: Doğrulayıcıya özel mint edilmiş doğrulayıcı hisse token'ları (ERC20 token'ı)

## Teknik özellikler {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

Çevrim kuru aşağıdaki gibi hesaplanır:

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## Yöntemler ve Değişkenler {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- `_amount` miktarını stakeManager'a aktarın ve aktif hisse için takvim veri yapısını güncelleyin.
- Takvim veri yapısını güncellemek için `updateValidatorState` kullanılır.
- `_amount` için güncel `exchangeRate` kurunu kullanarak delegasyonu `Mint` edin.
- Likit ödülleri hesaplamak için her delege edenin aktif stake'lerini takip etmekte `amountStaked` kullanılır.

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- Toplam tutarı hesaplamak için mevcut `exchangeRate`ve hisse sayısını ve sayısını (aktif stake + ödülleri) kullanmak
- `unBond`from aktif olarak alınan ve varsa bu ödülleri delege için transfer eden bir stake ve transfer.
- stakeManager içinde `updateValidatorState` kullanarak aktif stake takvimden silinmelidir.
- `delegators` eşlemesi, fon çekme dönemi içinde stake'i takip etmek için kullanılır.

### withdrawRewards {#withdrawrewards}

```js
function withdrawRewards() public;
```

- Bir delege için ödülleri ve transferleri hesaplayın ve hisselerin `exchangeRate`yanık sayısına bağlı olarak.
- Örnek: Bir delege 100 hisse sahibi ve döviz kuru 200 ise bu yüzden ödüller 100 token ise, 100 token ile delege aktarın. Kalan hisse 100 olduğundan, döviz kuru 200 kullanıldığında, şimdi 50 hisse değerine sahip. Bu yüzden 50 hisse senedi yak. Delege şu anda 100 token değerinde 50 hisse sahibidir (başlangıçta staked / delege ettiği hisse).

### Yeniden Stake Etme {#restake}

Restake iki şekilde çalışabilir: delege daha fazla hisse satın alabilir `buyVoucher`veya yeniden Stake ödüllerini satın alabilir.

```js
function reStake() public;
```

Yukarıdaki fonksiyon ödülleri için Stake için kullanılır. Pay sayısı etkilenmez, çünkü `exchangeRate` aynı kalır; yani hem doğrulayıcı pay sözleşmesi hem de stakeManager takvimi için yalnızca ödüller aktif stake içine taşınır.

`getLiquidRewards`birikmiş ödülleri hesaplamak için kullanılır, yani delege 100 hisse sahibi ve döviz kuru 200 olarak belirlenmiştir, bu nedenle ödüller 100 token. 100 token'ı aktif bir hisse haline getirin, çünkü döviz kuru hala aynı miktarda hisse oranı aynı kalacaktır. Tek fark, şimdi 200 token'ın aktif bir hisse olarak değerlendirilmesi ve derhal be ödüllerinin bir parçası değil).

Bu nedenle de bu konuda daha fazla ödül kazanacak olan ve bu kazanımın ardından bu konuda daha fazla ödül kazanacaktır.

### unStakeClaimTokens {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

Para çekme süresi bittiğinde, hisselerini satan delege edenler, MATIC tokenlarını talep edebilirler. Token'ları kullanıcıya aktarmak gerekir.

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- Doğrulayıcı için komisyon %'sini günceller.

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

Bir doğrulayıcı kontrol noktasını gönderen için ödül aldığında, bu işlev doğrulayıcı ve delege arasında verilen ödüllerin ödenmesi için çağrılır.
