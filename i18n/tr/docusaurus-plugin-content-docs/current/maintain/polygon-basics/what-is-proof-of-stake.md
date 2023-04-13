---
id: what-is-proof-of-stake
title: Hisse Kanıtı nedir?
description: Stake Kanıtı konsensüs mekanizması nedir öğrenin
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

# Hisse Kanıtı nedir? {#what-is-proof-of-stake}

Hisse Kanıtı (PoS), bir doğrulayıcının ağdaki ekonomik [stake](/docs/maintain/glossary.md#staking)'ine bağlı olan, genel blok zincirleri için bir konsensüs algoritmaları kategorisidir.

İş kanıtı (PoW) tabanlı genel blok zincirlerinde algoritma, işlemleri doğrulamak ve yeni bloklar oluşturmak için kriptografik bulmacaları çözen katılımcıları ödüllendirir. PoW blok zinciri örnekleri: Bitcoin, Ethereum (birleşmeden önce).

PoS tabanlı genel blok zincirlerinde, bir doğrulayıcılar kümesi sırayla bir sonraki blok için teklifte bulunur ve oy verir. Her doğrulayıcının oylarının ağırlığı o doğrulayıcının mevduatının, yani [stake](/docs/maintain/glossary.md#staking)'inin büyüklüğüne bağlıdır. PoS'nin önemli avantajları arasında güvenlik, azalmış merkezileşme riski ve enerji verimliliği yer alır. PoS blok zinciri örnekleri: Ethereum 2.0, Polygon.

Genel olarak, PoS algoritması aşağıdaki gibi görünür. Blok zinciri bir dizi doğrulayıcıyı takip eder ve blok zincirinin temel kripto para birimini (Ethereum durumunda, ETH) tutan herkes blockchain's bir depozito içine kilitleyen özel bir işlem türü göndererek doğrulayıcı olabilir. Yeni bloklar oluşturma ve kabul etme süreci, daha sonra mevcut tüm doğrulayıcıların katılabileceği bir konsensüs algoritması aracılığıyla yapılır.

Konsensüs algoritmalarının pek çok türü vardır ve konsensüs algoritmasına katılan doğrulayıcılara ödüller vermenin birçok yolu vardır, bu yüzden hisse kanıtı sisteminin birçok "çeşidi" vardır. Algoritmik bir bakış açısıyla iki ana tip vardır: zincir bazlı PoS ve [BFT tarzı PoS](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance).

**Zincir tabanlı hisse kanıtında**, algoritma her bir zaman yarığı (time slot) sırasında (ör. her 10 saniyelik periyot bir zaman yarığı olabilir) yarı rastgele olarak bir doğrulayıcı seçer ve bu doğrulayıcıya tek bir blok oluşturma hakkını atar; bu blok daha önceki bir bloğu (normalde daha önceki en uzun zincirin sonundaki blok) işaret eder ve böylece çoğu blok zaman içinde birbiriyle kesişerek sürekli büyüyen tek bir zincire dönüşür.

**BFT tarzı Pat Kanıtı** 'de doğrulayıcılar, blok **önerme** hakkını **rastgele** olarak atanır. Bu işlemin sonunda her bir doğrulayıcının belirli bir blok için **bir Oy** gönderdiği **çok** yönlü bir işlem ile anlaşılması ve bu sürecin sonunda (dürüst ve çevrimiçi) doğrulayıcılar herhangi bir bloğun zincirin bir parçası olup olmadığı konusunda sürekli olarak anlaşırlar. Bu blokların **hala birbirine** may unutmayın. Anahtar fark, bir blok üzerinde konsensüs olmasının tek bir blok içinde gelebilmesidir, ve ondan sonra zincirin uzunluğuna veya boyutuna bağlı değildir.

Daha fazla ayrıntı için [https://github.com/ethereum/wiki/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ) adresine bakın.

## Ayrıca bakınız {#see-also}

* [Delege eden](/docs/maintain/glossary.md#delegator)
* [Doğrulayıcı](/docs/maintain/glossary.md#validator)
