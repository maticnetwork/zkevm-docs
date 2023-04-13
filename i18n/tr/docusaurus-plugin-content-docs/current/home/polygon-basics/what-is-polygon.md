---
id: what-is-polygon
title: Polygon nedir?
description: Polygon ölçeklendirme çözümünü öğrenin
keywords:
  - docs
  - matic
  - polygon
  - blockchain
  - ethereum scaling
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Polygon](https://polygon.technology/), zincir dışı bilgisayar hesaplaması için yan zincirler ve bir merkeziyetsiz Proof-of-Stake (PoS) doğrulayıcılar ağı kullanarak ölçek kotaran bir Katman 2 ölçekleme çözümüdür.

Polygon, merkeziyetsizlikten ödün vermeden ve mevcut geliştirici topluluğundan ve ekosisteminden yararlanarak ölçeklenebilirlik ve kullanabilirlik sorunlarını çözmek için çalışır. Bu yöntem, to ve kullanıcı işlevlerine ölçeklenebilirlik ve üstün kullanıcı deneyimi sağlayarak mevcut platformları iyileştirmeyi amaçlamaktadır.

Polygon genel blok zincirlerine yönelik bir ölçekleme çözümüdür. Polygon PoS, daha hızlı ve daha ucuz işlemlerin yanı sıra mevcut tüm Ethereum araçlarını destekler.

## Anahtar özellikler ve öne çıkanlar {#key-features-highlights}

- **Ölçeklenebilirlik**: Mainchain'de ve ilk uyumlu Katman 1 basechain olarak Ethereum'da kotarılan kesinlik (finality) ile Polygon yan zincirlerinde hızlı, düşük maliyetli ve güvenli işlemler.
- **Yüksek iş çıkarma yeteneği**: Dahili test ağında tek bir yan zincirde saniyede 10.000 işleme kadar ulaşıldı; Yatay ölçekleme için çoklu zincirler eklenecek.
- **Kullanıcı deneyimi**: Mainchain'den Polygon zincirine sorunsuz kullanıcı deneyimi ve geliştirici soyutlaması; WalletConnect desteği ile yerel mobil uygulamalar ve yazılım geliştirme kiti (SDK).
- **Güvenlik**: Polygon zinciri operatörleri bizzat PoS sisteminde stakeçilerdir.
- **Genel yan zincirler**: Polygon yan zincirleri (bireysel DApp zincirlerinin aksine) herkese açıktır, izin gerektirmez ve çoklu protokolleri destekleyebilir.

Polygon sisteminin mimarisi bilinçli olarak EVM için etkinleştirilmiş olan Polygon yan zincirlerinde gelişigüzel durum geçişlerini (arbitrary state transitions) destekleyecek şekilde kurulmuştur.

## Delege Eden ve Doğrulayıcı Rolleri {#delegator-and-validator-roles}

Polygon ağına delege eden veya doğrulayıcı olarak katılabilirsiniz. Bkz.

* [Doğrulayıcı kimdir](/docs/maintain/polygon-basics/who-is-validator)
* [Delege eden kimdir](/docs/maintain/polygon-basics/who-is-delegator)

## Mimari {#architecture}

Hedefiniz doğrulayıcı olmaksa Polygon mimarisini anlamanız esastır.

Daha fazla bilgi için bkz. [Polygon Mimarisi](/docs/maintain/validator/architecture).

### Bileşenler {#components}

Polygon mimarisini etraflıca anlamak için temel bileşenlere göz atın:

* [Heimdall](/docs/pos/heimdall/overview)
* [Bor](/docs/pos/bor/overview)
* [Sözleşmeler](/docs/pos/contracts/stakingmanager)

#### Codebase'ler {#codebases}

Temel bileşenleri etraflıca anlamak için aşağıdaki codebase'lere göz atın:

* [Heimdall](https://github.com/maticnetwork/heimdall)
* [Bor](https://github.com/maticnetwork/bor)
* [Sözleşmeler](https://github.com/maticnetwork/contracts)

## Nasıl Yapılır Bilgileri {#how-tos}

### Düğüm kurulumu {#node-setup}

Polygon Mainnet veya Mumbai Testnet üzerinde tam bir düğüm çalıştırmak istiyorsanız, aşağıdaki işlemleri takip edebilirsiniz. [Bir Validator Node](/maintain/validate/run-validator.md) rehberi çalıştırın.

### Staking işlemleri {#staking-operations}

Staking sürecinin doğrulayıcı ve delege eden profilleri için nasıl yürütüldüğüne bakın:

* [Doğrulayıcı Staking İşlemleri](docs/maintain/validate/validator-staking-operations)
* [Delege Etme](/docs/maintain/delegate/delegate)
