---
id: solidity
title: Solidity nedir?
sidebar_label: Solidity
description: "Akıllı sözleşmelerin gerçekleştirilmesi (implement) için nesneye yönelik bir dildir."
keywords:
  - docs
  - matic
  - polygon
  - solidity
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Solidity nedir {#what-is-solidity}

Solidity akıllı sözleşmeleri uygulamak için nesne yönelimli, üst düzey bir programlama dilidir. Bu program, blok zinciri ağı içindeki hesapların davranışlarını yöneten programlar yazmasına izin verir. Statik olarak yazılmıştır, sözleşme kalıtımını (contract inheritance) destekler ve çok sayıda yerleşik Sözleşme Kütüphanesi vardır. Solidity, C++, Python ve JavaScript gibi programlama dillerine benzer.

Bu oluşmaktadır :
- değişkenler
- operatörler
- döngüler (loop)
- koşulluluklar (conditionals)
- değiştiriciler (modifier)
- fonksiyonlar
- nesneler ve tipler
- olaylar
- arayüzler
- ve parasal işlemleri ele alır.

Solidity ile hemen kodlamaya geçmeden önce blok zincirinin zihinsel modellerine aşina olmak önemlidir - bir blok zinciri uygulaması mimarisi ile ortak bir web uygulaması mimarisi arasındaki birbirine zıt farklılık nedeniyle bu modeller esastır.
Varmak istediğimiz yer Web 3.0'dır; burada sunucular ve veri tabanları istemciler kadar merkeziyetsizdir. Diğer bir ifadeyle, istemciler de sunucu veya veri tabanı olarak ya da her ikisi olarak iş görebilirler (bunun diğer adı "eşler arası"dır). İstasyonun her seviyesindeki çok-çok ilişkiyle birlikte, kontrol konsantrasyonu ve tek bir başarısızlık noktası yoktur. Ağ azami düzeyde dağıtıktır.

Esasen aşağıdaki noktaların her zaman akılda tutulması gerekir:

- Bellek sınırlıdır - her bellek ögesi blok zincirindeki tüm düğümlerin o ögeyi onaylayıp depolamasını gerektirir
- Hesaplama karmaşıklığı sınırlıdır
- Verilerin okunması ücretsizdir
- Her yazma işleminin ilişkili bir maliyeti vardır - bu maliyeti ether ile ödersiniz. Maliyet gaz ile ölçülür.

### Solidity ile Çalışma Araçları {#tools-for-working-with-solidity}
- [Hardhat](https://hardhat.org): dApp geliştirme çerçevesi
- [Truffle](https://trufflesuite.com/): dApp geliştirme çerçevesi
- [Alchemy SDK](https://docs.alchemy.com/reference/alchemy-sdk-quickstart): Akıllı sözleşmeleri dağıtmak / okumak için Web3 SDK
- [Remix](https://remix-project.org/): Solidity için Web IDE
- [Metamask](https://metamask.io/): En popüler kripto cüzdanı

### Kaynaklar {#resources}

- [Solidity Docs](https://solidity.readthedocs.io/): Resmi Solidity Dokümanları
- [Solidity By Example](https://solidity-by-example.org/): Solidity yazmayı öğrenmek için kısa snippet kullanın.
- [Web3 Üniversitesi](https://web3.university): Akıllı sözleşme gelişimi için topluluk odaklı merkez
- [Alchemy Üniversitesi](https://university.alchemy.com/): Web3 / Akıllı Sözleşme devi üzerinden 10 haftalık kurslar.

