---
id: polygon-architecture
title: Polygon’un mimarisi
description: Polygon’un mimarisi
keywords:
  - architecture
  - layers
  - polygon
  - matic
  - docs
  - research
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Polygon’un mimarisi {#the-architecture-of-polygon}

**Polygon**, hibrit Proof of -Stake ve Plazma özellikli yan zincir için kullanılan bir blok zinciri uygulama platformu.

Mimari açıdan Polygon’un güzelliği; Plasma için etkinleştirilmiş zincirler, tam gelişmiş EVM yan zincirleri ve gelecekte Optimistic Rollup’lar benzeri Katman 2 yaklaşımları gibi değişken yürütme ortamlarından ayrılmış bir jenerik doğrulama katmanını ön plana çıkaran zarif tasarımıdır.

Polygon PoS Ağı, üç katmanlı bir mimariye sahiptir:

* **Ethereum katmanı** — Ethereum mainnet'te bir dizi sözleşme
* **Heimdall katmanı** - Ethereum mainnet'e paralel olarak çalışan bir dizi hisse kanıtı Heimdall düğümü, Ethereum mainnet'te kullanılan staking sözleşmelerinin setini izleyerek ve Polygon Ağı kontrol noktalarını Ethereum ana ağına işlemek. Heimdall, Tendermint üzerinde yer alır.
* **Bor katmanı** - Heimdall düğümleri tarafından karıştırılan blok üreten Bor düğümleri kümesi. Bor, Go Ethereum üzerinde yer alır.

<img src={useBaseUrl("img/staking/architecture.png")} />

Geliştiriciler şu anda **Plasma**’yı
ERC20, ERC721, varlık takasları ya da diğer özel koşullar gibi Plasma koşullarının yazıldığı belirli durum geçişleri için kullanabilirler. Gelişigüzel durum geçişleri için
PoS’u kullanabilirler. Ya da her ikisini birden kullanabilirler! Bu, Polygon’un hibrit mimarisi sayesinde mümkündür.

Platformumuzda PoS mekanizmasına olanak vermek için Ethereum üzerinde bir **staking** yönetim sözleşmeleri kümesi
devreye alınmaktadır ve **Heimdall** ve **Bor** düğümlerini çalıştıran bir teşvikli doğrulayıcılar kümesi vardır. Ethereum,
Polygon’un desteklediği ilk basechain’dir. Fakat Polygon, topluluğun önerilerine ve uzlaşmaya bağlı olarak ilave basechain’leri destekleyerek müşterek çalışabilir bir merkeziyetsiz Katman 2 blok zinciri platformunu devreye almayı planlamaktadır.

<img src={useBaseUrl("img/matic/Architecture.png")} />

## Staking Sözleşmeleri {#staking-contracts}

Polygon’da [Hisse Kanıtı (PoS)](docs/home/polygon-basics/what-is-proof-of-stake) mekanizmasına olanak vermek için
sistem Ethereum mainnet üzerinde bir [staking](/docs/maintain/glossary#staking) yönetim sözleşmeleri kümesinden faydalanır.

Staking sözleşmeleri aşağıdaki özellikleri uygular:

* Herkes Ethereum mainnet üzerindeki staking sözleşmelerinde MATIC token stake edebilir ve sisteme [doğrulayıcı](/docs/maintain/glossary#validator) olarak katılabilir.
* Polygon ağı üzerinde durum geçişlerini doğrulayarak staking ödülleri kazanma.
* Ethereum mainnet üzerinde [denetim noktalarını](/docs/maintain/glossary#checkpoint-transaction) kaydetme.

Pos mekanizması, Polygon yan zincirleri için veri kullanılabilirliği sorunu için de bir hafifletme aracı olarak işlev görür.

## Heimdall {#heimdall}

Heimdall, hisse kanıtı doğrulama katmanıdır ve bu katman
[Bor](/docs/maintain/glossary#bor) tarafından üretilen blokları bir Merkle ağacında toplar ve Merkle kökünü düzenli olarak
kök zincire yayımlar. Bor yan zincirinin anlık görüntülerinin periyodik olarak yayımlanmasına [denetim noktaları](/docs/maintain/glossary#checkpoint-transaction) adı verilir.

1. Son denetim noktasından itibaren tüm blokları doğrular.
2. Blok hash'lerinin bir Merkle ağacını oluşturur.
3. Merkle kök hash'ini Ethereum mainnet'e yayınlar.

Denetim noktaları iki nedenden dolayı önemlidir:

1. Kök zincirde kesinliğin (finality) sağlanması.
2. Varlıklar çekildiğinde yakma kanıtının sağlanması.

Sürece genel bakış:

* Bir aktif doğrulayıcılar alt kümesi havuzdan seçilerek bir [span](/docs/maintain/glossary#span) boyunca [blok üreticileri](/docs/maintain/glossary#block-producer) olarak çalışır. Bu blok üreticileri blokların oluşturulmasından ve blokların ağa yayınlanmasından sorumludurlar.
* Bir denetim noktası, belli bir zaman aralığı boyunca oluşturulan tüm blokların Merkle kökü hash'ini içerir. Tüm düğümler Merkle kök hash'ini doğrular ve imzalarını buna iliştirir.
* Doğrulayıcı kümesinden seçilen bir [teklifçi](/docs/maintain/glossary#proposer) (proposer) belli bir denetim noktası için tüm imzaları toplamaktan ve denetim noktasını Ethereum mainnet'e işlemekten sorumludur.
* Blok oluşturma ve denetim noktaları teklif etme sorumluluğu, bir doğrulayıcının genel havuzdaki stake oranına değişken bir şekilde bağlıdır.

Heimdall ile ilgili daha fazla bilgiyi [Heimdall mimarisi](/docs/pos/heimdall/overview) kılavuzunda bulabilirsiniz.

## Bor {#bor}

Bor Polygon'un yan zincir blok üreticisi katmanıdır - işlemleri bloklara ayırmaktan sorumlu olan varlık. Şu anda bu, konsensüs algoritmasında yapılan özel değişiklikleri içeren temel bir Geth uygulamasıdır.

Blok üreticileri doğrulayıcıların bir alt ağıdır ve [Heimdall](/docs/maintain/glossary#heimdall) üzerindeki komite seçimi ile periyodik olarak karıştırılır Polygon'da `span` olarak adlandırılır. Bloklar **Bor** düğümünde üretilir; yan zincir VM ise EVM ile uyumludur.
Bor üzerinde üretilen bloklar ayrıca Heimdall düğümleri tarafından periyodik olarak doğrulanır ve
Bor üzerindeki blok kümesinin Merkle ağacı hash'inden oluşan denetim noktası periyodik olarak Ethereum’a iletilir.

Daha fazla bilgiyi [Bor mimarisi](/docs/pos/bor/overview) kılavuzunda bulabilirsiniz.

## Kaynaklar {#resources}

* [Bor Mimarisi](https://wiki.polygon.technology/docs/pos/bor)
* [Heimdall Mimarisi](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
* [Denetim Noktası Mekanizması](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
