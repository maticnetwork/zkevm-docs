---
id: what-is-proof-of-stake
title: Hisse Kanıtı nedir?
description: Doğrulayıcılara bel bağlayan bir konsensüs algoritmasıdır.
keywords:
  - docs
  - matic
  - polygon
  - stake
  - delegate
  - validate
  - pos
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Stake Kanıtı (PoS) {#proof-of-stake-pos}

Hisse Kanıtı (PoS), bir doğrulayıcının ağdaki ekonomik [stake](/docs/maintain/glossary#staking)'ine bağlı olan, genel blok zincirleri için bir konsensüs algoritmaları kategorisidir.

İş kanıtı (PoW) tabanlı genel blok zincirlerinde algoritma, işlemleri doğrulamak ve yeni bloklar oluşturmak için kriptografik bulmacaları çözen katılımcıları ödüllendirir. PoW blok zinciri örnekleri: Bitcoin, daha önce Ethereum.

PoS tabanlı genel blok zincirlerinde, bir doğrulayıcılar kümesi sırayla bir sonraki blok için teklifte bulunur ve oy verir. Her doğrulayıcının oylarının ağırlığı o doğrulayıcının mevduatının, yani [stake](/docs/maintain/glossary#staking)'inin büyüklüğüne bağlıdır. PoS'nin önemli avantajları arasında güvenlik, azalmış merkezileşme riski ve enerji verimliliği yer alır. PoS blok zinciri örnekleri: Eth2, Polygon.

Genel olarak, PoS algoritması aşağıdaki gibi görünür. Blok zinciri bir doğrulayıcılar kümesinin sicilini tutar ve blok zincirinin yerel kripto parasına (örneğin Ethereum'da ether) sahip olan biri elindeki ether'leri yatırarak kilitleyen özel bir işlem türü göndererek bir doğrulayıcı olabilir. Yeni bloklar oluşturma ve kabul etme süreci, daha sonra mevcut tüm doğrulayıcıların katılabileceği bir konsensüs algoritması aracılığıyla yapılır.

Konsensüs algoritmalarının pek çok türü vardır ve konsensüs algoritmasına katılan doğrulayıcılara ödüller vermenin birçok yolu vardır, bu yüzden hisse kanıtı sisteminin birçok "çeşidi" vardır. Algoritma açısından bakıldığında, iki büyük tür vardır: zincir tabanlı PoS ve [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance) tarzı PoS.

**Zincir tabanlı hisse kanıtında**, algoritma her bir zaman yarığı (time slot) sırasında (ör. her 10 saniyelik periyot bir zaman yarığı olabilir) yarı rastgele olarak bir doğrulayıcı seçer ve bu doğrulayıcıya tek bir blok oluşturma hakkını atar; bu blok daha önceki bir bloğu (normalde daha önceki en uzun zincirin sonundaki blok) işaret eder ve böylece çoğu blok zaman içinde birbiriyle kesişerek sürekli büyüyen tek bir zincire dönüşür.

**BFT tarzı hisse kanıtında** ise, doğrulayıcılara bloklar *teklif etme* hakkı **rastgele** atanır, fakat *hangi bloğun kabul edilebilir (canonical) olduğu üzerinde mutabakat*, her doğrulayıcının her bir turda belli bir blok için bir "oy" gönderdiği çok turlu bir işlemle yapılır ve işlemin sonunda tüm (dürüst ve çevrimiçi) doğrulayıcılar belli bir bloğun zincirin bir parçası olup olmadığı üzerinde kalıcı olarak mutabakata varırlar. Blokların yine de *birbirine zincirlenmiş* olabileceğini aklınızda bulundurun; anahtar fark, bir blok üzerindeki konsensüsün bir blok dahilinde gerçekleşebilmesi ve kendisinden sonra gelen zincirin uzunluğuna veya boyutuna bağlı olmamasıdır.

Daha fazla ayrıntı için lütfen bkz. [https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

Ayrıca bakınız:

* [Delege eden](/docs/maintain/glossary#delegator)
* [Doğrulayıcı](/docs/maintain/glossary#validator)
