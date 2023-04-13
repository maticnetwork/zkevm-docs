---
id: stakingmanager
title: Staking Yöneticisi
description: Staking Manager Polygon ağı üzerinde doğrulayıcı ile ilgili faaliyetleri ele almak için ana sözleşmedir.
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon'un Güvenlik Kanıtı tabanlı konsensüs için tüm 3/2 kanıtı doğrulaması ve staking işleminin yapılması için ödüller Ethereum akıllı sözleşmesi üzerinden yürütülür. Tüm tasarım, Mainnet sözleşmesi üzerinde daha az şey yapma felsefesini takip eder. Bilgi doğrulaması yapar ve tüm computation-heavy işlemleri L2'ye itir ([Heimdall](https://wiki.polygon.technology/docs/pos/heimdall/overview) hakkında okuyun).

**Stakers** **doğrulayıcılara**, **delege** ve **gözlemcilere** (dolandırıcılık raporlaması için) bölünür.

[**StakeManager**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol) `checkPoint`imza doğrulama, ödül dağıtımı ve hisse yönetimi gibi doğrulayıcı ile ilgili faaliyetleri ele almak için ana sözleşmedir. Sözleşme **NFT kimliğini** bir mülkiyet kaynağı olarak kullandığından, mülkiyet değişikliği ve imzalayıcı sistemdeki hiçbir şeyi etkilemez.

:::tip

Bir Ethereum adresinden, bir **Staker yalnızca bir doğrulayıcı veya delege olabilir** (bu sadece bir tasarım seçeneğidir, zor bir neden yoktur).

:::

## Doğrulayıcı Kabul / Değiştirme {#validator-admissions-replacement}

### Kabul {#admissions}
Şu anda, Polygon PoS üzerinde mevcut olan açık doğrulayıcı yuvası yoktur. Bir de doğrulayıcı olmak için bir bekleme listesi var. Gelecekte, slotlar kullanılabilir hale gelirse, doğrulayıcılar bekleme listesinden çıkarılacak ve dikkate alınmak için başvurabilirler.


### Değiştirme {#replacement}
PIP4, topluluk görünürlüğü için doğrulayıcı performansını sergileme konseptini tanıttı. Bir doğrulayıcı PIP4'te belirtilen uzun bir süre için sağlıksız bir durumda ise, bu durum ağ üzerinden kurulur. Bu durumda doğrulayıcı yuvası bekleme listesinden çıkanlar için kullanılabilir hale getirilir.

:::info

Şu anda [<ins>PIP4 içindeki C PART 2 Faz</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24) uygulanmaktadır. Bu noktada topluluğun doğrulayıcı için potansiyel değerlendirme kriterlerine karar verdiği yer yer Bu alıştırma zaman içinde bir uygulama ve kabul süreci üretecektir.

:::

## Yöntemler ve Değişkenler {#methods-and-variables}

:::caution Slashing Uygulaması

`jail`, ve `unJail``slash`işlevler şu anda kesilen uygulamanın bir parçası olarak kullanılmamaktadır.

:::

### validatorThreshold {#validatorthreshold}

Sistem tarafından kabul edilen en fazla doğrulayıcı sayısını ve slotlar olarak da adlandırılan slotu depolar.

### AccountStateRoot {#accountstateroot}

- Doğrulayıcılar ve delege için Heimdall üzerinde yapılan çeşitli muhasebe için hesap kökü gönderilerek hesap kökü `checkpoint`gönderilir.
- accRoot ve `claimRewards`sırasında kullanılır.`unStakeClaim`

### ste / ste {#stake-stakefor}

```solidity title="StakeManager.sol"
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- Bu durumda daha az varsa (MATIC (in daha `minDeposit``currentValidatorSetSize`büyük miktarda bulunan herkese izin verir.`validatorThreshold`
- Bu `amount+heimdallFee`durumda doğrulayıcıyı açık artırma için açık artırma süresine koymalı (daha fazlası Müzayede bölümünde açıklık).
- `updateTimeLine`Etkin doğrulayıcıları ve verilen epo / kontrol noktası sayısı için aktif bir ste ve aktif ste izini tutan özel zaman çizelgesi veri yapısını günceller.
- Her yeni `stake`veya çağrıda bir benzersiz `NFT``stakeFor`basılır, bu işlem herkese aktarılabilir ancak 1:1 Ethereum adresine sahip olabilir.
- `acceptDelegation`Doğrulayıcı için bir karar verilebilirse doğruya doğruya göre doğruya doğru, doğrulayıcı için `ValidatorShare`sözleşme konuşlandırılır.

### Stake'i Kaldırma {#unstake}

- Bir sonraki dönemde belirlenen doğrulayıcıyı doğrulayıcıdan kaldırın (yalnızca şu anki kontrol noktası için geçerli olan bir kez çağrıldıktan sonra `unstake`geçerlidir)
- Doğrulayıcının stake'ini takvim veri yapısından kaldırır, doğrulayıcının çıkış dönemi için sayıyı günceller.
- Eğer doğrulayıcı bir delegasyon varsa, tüm ödülleri toplayın ve yeni delegasyon için kilit heyeti sözleşmesini ekleyin.

### unstakeClaim {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- Daha `unstaking`sonra, doğrulayıcılar geri çekme süresine konulur, böylece geçmiş sahtekarlıklar için bir sahtekarlık `unstaking`bulunduğunda kesilebilir.
- `WITHDRAWAL_DELAY`Dönem sunulduktan sonra doğrulayıcılar bu işlevi çağırabilir ve bu işlevle ödeme yapabilir (varsa ödül alın, staked token'ları geri `stakeManager`alın, NFT'yi yakın vb.).

### Yeniden Stake Etme {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- Doğrulayıcıların yeni miktar veya ödüller ya da her ikisini birden koyarak stake'lerini artırmalarına olanak tanır.
- Aktif bir hisse için zaman çizelgesini (miktar) güncellenmesi gerekir.

### withdrawRewards {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

Bu yöntem, doğrulayıcıların birikmiş ödülleri çekmesine izin verir, doğrulayıcı delege kabul ederse delegasyon sözleşmesinden ödül almayı düşünmelidir.

### updateSigner {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

Bu yöntem, doğrulayıcıların imzalayıcı adresini güncellemesine izin verir (Polygon blok zincirinde blokları doğrulamak ve kontrol noktası imzalarını doğrulamak için `stakeManager`kullanılır).

### topUpForFee {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

Bu yöntemi kullanarak doğrulayıcılar Heimdall ücreti için bakiyelerini toplayabilirler.

### claimFee {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

Bu yöntem Heimdall'dan ücret çekmek için kullanılır. Her kontrol noktasında `accountStateRoot`güncellenir, böylece doğrulayıcılar Heimdall üzerindeki hesap için bu kökü içerme kanıtı sağlayabilir ve ücret çekebilirler.

Birden fazla kontrol noktasında çıkışları önlemek için (eski kök için ve muhasebe için kaydedilmiş `stakeManager``accumSlashedAmount`olan) yeniden `accountStateRoot`yazıldığını unutmayın. Şu anda kullanılmaz ve gerekirse Heimdall üzerinde kesilmesi için kullanılacaktır.

### StakingNFT {#stakingnft}

Standart ERC721 sözleşmesi, kullanıcı başına bir token gibi birkaç kısıtlama ile ve sıralı bir şekilde basılmıştır.

### startAuction {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

Zaten açık artırma üzerinde bir teklif başlatmak veya daha yüksek teklif vermek için bu işlev kullanılır. Müzayede süresi döngüleri şeklinde çalışır, bu `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`nedenle **doğru açık artırma süresini kontrol etmelidir.**

`perceivedStakeFactor`kesin factor*old ste (şu anda fonksiyonu seçmek için varsayılan olarak 1 WIP olduğunu unutmayın). **Hala devam eden bir açık artırma döneminden kalma açık artırma için kontrol edilmelidir** (bir sonraki açık artırmada sermayelerini almak için `confirmAuction`aramamayı tercih edebilirsiniz). Normalde sürekli İngilizce açık artırma bir içinde devam `auctionPeriod`ediyor.

### confirmAuctionBid {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **Bunun bir açık artırma süresi olmadığını kontrol etmelisiniz.**
- Eğer son teklif sahibi `validatorId`ise, davranış yeniden yapılanma ile benzer olmalıdır.
- İkinci durumda `validatorId` unStake edilir ve yeni kullanıcı davranışının stake/stakeFor'a benzer olması gerektiği için yeni denetim noktasından itibaren doğrulayıcı olarak yeni kullanıcı eklenir.

### checkSignatures {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- Denetim noktaları gönderirken yazmalar yalnızca RootChain sözleşmesine yöneliktir
- Tüm doğrulayıcıların imzaladığı `voteHash` (BFT ⅔+1 anlaşması)
- Bu işlev yalnızca benzersiz imzaları doğrular ve denetim noktası kökü üzerinde ⅔+1 yetkili imza bulunup bulunmadığını denetler (tüm veriler için RootChain sözleşmesinde `voteHash` doğrulamasına katılım). `currentValidatorSetTotalStake`, mevcut aktif stake'i sağlar.
- Ödüller doğrulayıcı için orantılı olarak dağıtılır. [Ödül dağıtımında](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2) ödüller hakkında daha fazla bilgi.

### isValidator {#isvalidator}

Verilen bir doğrulayıcının mevcut dönem için aktif doğrulayıcı olup olmadığını kontrol eder.

## Takvim veri yapısı {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## StakingInfo {#stakinginfo}

Hem doğrulayıcı hem de delegasyon olaylarında merkezi olarak günlüğe kaydetme sözleşmesi ile okunan çok az işlevin bulunduğu okunur. [StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) sözleşmesinin kaynak kodunu GitHub'da kontrol edebilirsiniz.

## ValidatorShareFactory {#validatorsharefactory}

Bu sözleşme, delege için kabul eden her bir doğrulayıcı için `ValidatorShare`sözleşme hazırlama amacıyla yapılan bir fabrika sözleşmesi. GitHub'daki [ValidatorShareFactory.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) sözleşmesinin kaynak kodunu kontrol edebilirsiniz.
