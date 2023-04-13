---
id: validator-index
title: Doğrulayıcı Dizini
description: Polygon Ağı üzerinde doğrulayıcı düğümlerinin nasıl çalıştırılacağı ve çalıştırılacağı ile ilgili talimatların bir toplanması
keywords:
  - docs
  - polygon
  - validate
  - validator
  - maintain
  - architecture
  - Validator Index
slug: validator-index
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Gelişmelerden haberdar olun

Polygon ekibinden ve topluluğundan gelen en son düğüm ve doğrulayıcı güncellemelerini Polygon [bildirimlerini](https://polygon.technology/notifications/) abone ederek takip edin.

:::

Doğrulayıcılar, Polygon ağının sürdürülmesinde en önemli role sahiptir. Doğrulayıcılar bir tam düğümü çalıştırır ve
blok üretmek, PoS konsensüsünü doğrulamak ve bu konsensüse katılmak için MATIC stake ederek ağı güvence altına alırlar.

:::info

Yeni doğrulayıcıları kabul etmek için sınırlı bir yer vardır. Yeni doğrulayıcılar, yalnızca halihazırda aktif olan bir doğrulayıcı MATIC'leri staking'den çıkardığında aktif doğrulayıcı kümesine katılabilir.

Doğrulayıcı değişimi için yeni bir açık artırma süreci başlatılacaktır.

:::

## Genel Bakış {#overview}

Polygon şu üç katmandan oluşur:

* Ethereum katmanı - Ethereum mainnet üzerindeki bir dizi sözleşme.
* Heimdall katmanı — Ethereum mainnet'e paralel olarak çalışan, Ethereum mainnet'te devreye alınan bir staking sözleşmeleri kümesini izleyen ve Polygon Ağı denetim noktalarını Ethereum mainnet'e işleyen bir hisse kanıtı Heimdall düğümleri kümesi. Heimdall, Tendermint üzerinde yer alır.
* Bor katmanı — Heimdall düğümleri tarafından karılan bir blok üretici Bor düğümleri kümesi. Bor, Go Ethereum üzerinde yer alır.

Polygon Ağı üzerinde doğrulayıcı olmak için şunları çalıştırmanız gerekir:

* Sentry düğüm - bir Heimdall düğümünü ve bir Bor düğümünü çalıştıran ayrı bir makine. Bir sentry düğüm, Polygon Ağı üzerindeki tüm düğümlere açıktır.
* Doğrulayıcı düğümü - bir Heimdall düğümünü ve bir Bor düğümünü çalıştıran ayrı bir makine. Doğrulayıcı düğümü yalnızca kendi sentry düğümüne açıktır ve ağın geri kalanına kapalıdır.
* Ethereum mainnet üzerinde devreye alınan staking sözleşmelerinde MATIC token'ları stake edin.

## Bileşenler {#components}

### Heimdall {#heimdall}

Heimdall şunları yapar:

* Ethereum mainnet üzerindeki staking sözleşmelerini izler.
* Bor zinciri üzerindeki tüm durum değişikliklerini doğrular.
* Bor zincirindeki durum denetim noktalarını Ethereum mainnet'e iletir.

Heimdall, Tendermint üzerinde yer alır.

:::info Ayrıca bakınız

* GitHub deposu: [Heimdall](https://github.com/maticnetwork/heimdall)
* GitHub deposu: [Staking sözleşmeleri](https://github.com/maticnetwork/contracts/tree/master/contracts/staking)
* Blog yazısı: [Heimdall ve Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

### Bor {#bor}

Bor şunları yapar:

* Polygon Ağı üzerinde blok üretir.

Bor, Polygon Ağı için Blok üreticisi düğümü ve katmanıdır. Bu işlem Go Ethereum'a dayanmaktadır. Bor üzerinde üretilen bloklar, Heimdall düğümleri tarafından doğrulanır.

:::info Ayrıca bakınız

* GitHub deposu: [Bor](https://github.com/maticnetwork/bor)
* Blog yazısı: [Heimdall ve Bor](https://blog.polygon.technology/heimdall-and-bor/)

:::

Bu bölüm aşağıdaki konularda size rehberlik edecektir:

* [Doğrulayıcıların sorumlulukları](validator-responsibilities.md)
* Ağa bir doğrulayıcı olarak katılmak:
  * [Düğümleri Ansible ile başlatmak ve çalıştırmak](run-validator-ansible.md)
  * [Düğümleri ikili dosyalar ile başlatmak ve çalıştırmak](run-validator-binaries.md)
  * [Bir doğrulayıcı olarak stake etmek](validator-staking-operations.md)
* Doğrulayıcı düğümlerinizi sürdürmek:
  * [İmzalayan adresini değiştirmek](change-signer-address.md)
  * [Komisyonu değiştirmek](validator-commission-operations.md)

Topluluk yardımı:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
