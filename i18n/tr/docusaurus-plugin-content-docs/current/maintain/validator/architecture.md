---
id: architecture
title: Mimari
description: Ethereum, Heimdall ve Bor katmanları
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - validator
slug: architecture
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon ağı kabaca üç katmana ayrılmıştır:

* **Ethereum katmanı** — Ethereum mainnet'te bir dizi sözleşme
* **Heimdall katmanı** - Ethereum mainnet'e paralel olarak çalışan bir dizi hisse kanıtı Heimdall düğümü, Ethereum mainnet'te kullanılan staking sözleşmelerinin setini izleyerek ve Polygon Ağı kontrol noktalarını Ethereum ana ağına işlemek. Heimdall, Tendermint üzerinde yer alır.
* **Bor katmanı** - Heimdall düğümleri tarafından karıştırılan blok üreten Bor düğümleri kümesi. Bor, Go Ethereum üzerinde yer alır.

<img src={useBaseUrl("img/staking/architecture.png")} />

## Ethereum üzerinde Staking ve Plasma akıllı sözleşmeleri {#staking-and-plasma-smart-contracts-on-ethereum}

Polygon'da [Proof of Stake (PoS)](/docs/home/polygon-basics/what-is-proof-of-stake) (hisse kanıtı) mekanizmasını etkinleştirmek için sistem Ethereum mainnet'te bir [staking](/docs/maintain/glossary.md#staking) yönetimi sözleşmeleri kümesini kullanır.

Staking sözleşmeleri aşağıdaki özellikleri gerçekleştirir:

* Herkesin Ethereum mainnet'te staking sözleşmelerine MATIC token'lar stake etmesi ve sisteme bir [doğrulayıcı](/docs/maintain/glossary.md#validator) olarak katılması imkânı.
* Polygon ağı üzerinde durum geçişlerini doğrulayarak staking ödülleri kazanma.
* Ethereum mainnet üzerinde [denetim noktalarını](/docs/maintain/glossary.md#checkpoint-transaction) kaydetme.

PoS mekanizması aynı zamanda Polygon yan zincirleri için veri kullanılabilirliği sorununu azaltıcı bir fonksiyon da icra eder.

## Heimdall (doğrulayıcı katmanı) {#heimdall-validation-layer}

Heimdall katmanı [Bor](/docs/maintain/glossary.md#bor) tarafından üretilen blokların bir Merkle ağacına toplanmasını ve Merkle kökünün periyodik olarak kök zincir yayınlamasını yönetir. Bor yan zincirinin anlık görüntülerinin periyodik olarak yayınlanmasına [denetim noktaları](/docs/maintain/glossary.md#checkpoint-transaction) adı verilir.

Bor'da birkaç blok geçildikçe Heimdall katmanında bulunan bir doğrulayıcı:

1. Son denetim noktasından itibaren tüm blokları doğrular.
2. Blok hash'lerinin bir Merkle ağacını oluşturur.
3. Merkle kök hash'ini Ethereum mainnet'e yayınlar.

Denetim noktaları iki nedenden dolayı önemlidir:

1. Kök zincirde kesinliğin (finality) sağlanması.
2. Varlıklar çekildiğinde yakma kanıtının sağlanması.

Sürece genel bakış:

* Bir aktif doğrulayıcılar alt kümesi havuzdan seçilerek bir [span](/docs/maintain/glossary.md#span) boyunca [blok üreticileri](/docs/maintain/glossary.md#block-producer) olarak çalışır. Bu blok üreticileri blokların oluşturulmasından ve blokların ağa yayınlanmasından sorumludurlar.
* Bir denetim noktası, belli bir zaman aralığı boyunca oluşturulan tüm blokların Merkle kökü hash'ini içerir. Tüm düğümler Merkle kök hash'ini doğrular ve imzalarını buna iliştirir.
* Doğrulayıcı kümesinden seçilen bir [teklifçi](/docs/maintain/glossary.md#proposer) (proposer) belli bir denetim noktası için tüm imzaları toplamaktan ve denetim noktasını Ethereum mainnet'e işlemekten sorumludur.
* Bloklar oluşturma ve denetim noktaları teklif etme sorumluluğu bir doğrulayıcının toplam havuzdaki stake oranına bağlıdır.

Ayrıca bakınız [Heimdall mimarisi](/docs/pos/heimdall/overview).

## Bor (blok üreticisi katmanı) {#bor-block-producer-layer}

Bor, Polygon'un yan zincir blok üreticisidir — işlemleri bloklar halinde toplamaktan sorumludur.

Bor blok üreticileri doğrulayıcıların bir alt kümesidir ve [Heimdall](/docs/maintain/glossary.md#heimdall) doğrulayıcıları tarafından periyodik olarak karılır.

Ayrıca bakınız [Bor mimarisi](/docs/pos/bor/overview).
