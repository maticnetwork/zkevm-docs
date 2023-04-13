---
id: polygon-architecture
title: Polygon PoS Mimarisi
description: Heimdall ve Bor zincirleri dahil Polygon PoS Mimarisi
keywords:
  - docs
  - matic
  - polygon
  - architecture
  - pos
  - blockchain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Polygon PoS Mimarisi {#polygon-pos-architecture}

Polygon Ağı, hibrit Proof-of-Stake (Hisse Kanıtı) ve Plasma için etkinleştirilmiş yan zincirler sağlayan bir blok zinciri uygulama platformudur.

Mimari olarak Polygon'un güzelliği, tam gelişmiş EVM yan zincirleri ve sıfır bilgi için kullanılan diğer katman 2 yaklaşımları gibi farklı yürütme ortamlarından ayrılmış bir jenerik doğrulama katmanı içeren zarif tasarımıdır.

Platformumuzda PoS mekanizmasını etkinleştirmek için, **Heimdall** ve **Bor** düğümlerini çalıştıran bir teşvikli doğrulayıcılar kümesinin yanı sıra, bir **staking** yönetimi sözleşmeleri kümesi Ethereum üzerinde devreye alınır. Ethereum, Polygon'un desteklediği ilk basechain'dir, fakat Polygon, topluluğun önerilerine ve uzlaşmaya bağlı olarak, ilave basechain'leri destekleyerek müşterek çalışabilir bir merkeziyetsiz Katman 2 blok zinciri platformunu devreye almayı planlamaktadır.

Polygon PoS üç katmanlı mimariye sahiptir:

1. Ethereum üzerinde akıllı sözleşmeler stake etme
2. Heimdall (Hisse Kanıtı katmanı)
3. Bor (Blok üreticisi katmanı)

<img src={useBaseUrl("img/matic/Architecture.png")} />

### Polygon akıllı sözleşmeleri (Ethereum üzerinde) {#polygon-smart-contracts-on-ethereum}

Polygon Ethereum üzerinde aşağıdakileri yürüten bir akıllı sözleşmeler kümesi sürdürmektedir:

- Hisse Kanıtı katmanı için staking yönetimi
- Doğrulayıcı payları içeren delegasyon yönetimi
- Yan zincir durumunun denetim noktaları/anlık görüntüleri

### Heimdall (Hisse Kanıtı doğrulayıcı katmanı) {#heimdall-proof-of-stake-validator-layer}

**Heimdall**, Ethereum üzerinde Staking sözleşmeleriyle uyumlu olarak çalışarak PoS mekanizmasını Polygon üzerinde etkinleştiren PoS doğrulayıcı düğümüdür. Bunu, Tendermint konsensüs motorunun üzerinde geliştirerek, imza şemasında ve çeşitli veri yapılarında değişiklikler yaparak uyguladık. Heimdall blok doğrulamadan, blok üreticisi komitesinin seçiminden, mimarimizde yan zincir bloklarının bir temsilinin denetim noktasının Ethereum'a atanmasından ve diğer çeşitli sorumluluklardan sorumludur.

Heimdall katmanı Bor tarafından üretilen blokların bir Merkle ağacına toplanmasını ve Merkle kökünün periyodik olarak kök zincir yayınlamasını yönetir. Bu periyodik yayınlar `checkpoints`denir. Bor'da birkaç blok ilerlendikten sonra Heimdall katmanında bulunan bir doğrulayıcı:

1. Son denetim noktasından itibaren tüm blokları doğrular
2. Blok hash'lerinin bir merkle ağacını oluşturur
3. Merkle kökünü ana zincire yayınlar

Denetim noktaları iki nedenden dolayı önemlidir:

1. Kök Zincir üzerinde kesinliğin (finality) sağlanması
2. Varlık çekişlerinde yakma kanıtının sağlanması

Sürecin kuşbakışı bir resmi şu şekilde açıklanabilir:

- Havuzdan gelen bir aktif doğrulayıcılar alt kümesi bir zaman aralığı için blok üreticileri olarak hareket etmek üzere seçilir. Her bir zaman aralığının Seçimine en az 2/3 çoğunluk tarafından olur verilecektir. Bu blok üreticileri blok oluşturmaktan ve onu kalan ağa yayınlamadan sorumludur.
- Bir denetim noktası belli bir aralık sırasında oluşturulan tüm blokların kökünü içerir. Tüm düğümler bunu doğrular ve imzalarını iliştirirler.
- Doğrulayıcı kümesinden seçilen bir teklif belirli bir kontrol noktası için tüm imzaları toplamaktan ve aynı şeyi ana zincir üzerinde işlemekten sorumludur.
- Bloklar oluşturmanın ve aynı zamanda denetim noktaları teklif etmenin sorumluluğu bir doğrulayıcının toplam havuzdaki stake oranına değişken bir şekilde bağlıdır.

### Bor (Blok Üreticisi Katmanı) {#bor-block-producer-layer}

Bor, Polygon blok üreticisi katmanıdır - işlemleri bloklar halinde toplamaktan sorumlu birimdir.

Blok üreticileri Polygon'da bir `span` (zaman aralığı) olarak adlandırılan sürelerde Heimdall üzerinde komite seçimi yoluyla periyodik olarak karıştırılırlar. Bloklar **Bor** düğümünde üretilir ve yan zincir sanal makinesi EVM ile uyumludur. Bor üzerinde üretilen bloklar ayrıca Heimdall düğümleri tarafından periyodik olarak doğrulanırlar ve Bor üzerindeki bir bloklar kümesinin Merkle ağacı hash'inden oluşan bir denetim noktası periyodik olarak Ethereum'a işlenir.

### Daha Fazla Okuma {#further-reading}

- [Polygon Düğüm Sağlayıcısı ile Bina](https://www.alchemy.com/overviews/polygon-node)
- [Polygon Mimarisine Derin Dalış](https://101blockchains.com/polygon-architecture/)

### Kaynaklar {#resources}

- [Bor Mimarisi](https://forum.polygon.technology/t/matic-system-overview-bor/9123)
- [Heimdall Mimarisi](https://forum.polygon.technology/t/matic-system-overview-heimdall/8323)
- [Denetim Noktası Mekanizması](https://forum.polygon.technology/t/checkpoint-mechanism-on-heimdall/7160)
