---
id: liquid-delegation
title: Likit Delegasyon
sidebar_label: Liquid Delegation
description: Polygon ağı idame ettirmek için likit delegasyonu nasıl kullanır?
keywords:
  - docs
  - polygon
  - matic
  - delegation
  - liquid delegation
slug: liquid-delegation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Geleneksel bir Proof of Stake mekanizmasında blok zinciri bir dizi doğrulayıcıyı takip eder. Herkes bu sırayı alabilir veya paralarını (Ethereum durumunda, ETH) ve bir depozito içine kilitlenen özel bir işlem türü göndererek işlemleri doğrulama hakkına katılabilir. Daha sonra yeni bloklar oluşturma ve kabul etme süreci, tüm aktif doğrulayıcılar tarafından bir konsensüs algoritması ile yapılır.

Bu durumda belli bir süre için (bir güvenlik depozitosu gibi) hisselerinin bir kısmını kilitlerler ve karşılığında bir sonraki blok için bu stake ile orantılı bir şans elde ederler.

Staking ödülleri katılımcılara bir teşvik olarak dağıtılır.

## Delegasyon {#delegation}

Staking pahalı olabilir, giriş için bariyer yükseltir ve bu da zenginlerin daha zengin olmasını tercih eder. Herkes ağ güvenliğine katılmalı ve takdir token'ları almalıdır. Diğer bir seçenek ise doğrulayıcıların güvenilmesi gereken bir madencilik havuzuna benzer bir staking havuzuna katılmaktır. Protokol ile uyumanın yeni delege için en iyi eylem şekli olduğuna inanıyoruz. Sermaye ve ödüllerin protokol içi mekanizmalar tarafından açık ve korunduğu için.

Delege edenler, tüm düğümleri don't rağmen doğrulamaya katılabilirler. Bununla birlikte, doğrulayıcılarla staking ederek, ağın gücünü artırabilir ve seçtikleri doğrulayıcıya (doğrulayıcıya bağlı olarak değişir) küçük bir komisyon ücreti ödeyerek ödül kazanabilirler.

## Geleneksel Delege ve Validator için sınırlama {#limitation-of-traditional-delegator-and-validator}

Sermaye kilitleme maliyeti Hisse Kanıtı protokolünün tasarımı nedeniyle hem doğrulayıcılar hem de delegatörler için yüksektir.

Yine de doğrulayıcı NFT gibi daha fazla likidite görünümü mekanizması getirebiliriz, burada doğrulayıcı olmak isteyen herhangi bir yeni tarafın bir nedenden dolayı sistemden çıkmak isteyen bir doğrulayıcı NFT tarafından doğrulayıcı satın alabileceği bir doğrulayıcı satın alınabilir.

Delege durumunda kilitli tutarın daha küçük parçalara olduğu varsayılır, bu nedenle katılımın daha aktif olması için sıvı olmasını istiyoruz (yani, bazı delege üyeleri şu anda DeFi'de fırsatların büyük olduğunu düşünüyorsa ancak sermayeleri çekme için bile staking havuzunda kilitli tutuluyorsa, yine de 21 gün beklemeleri gerekiyor).

Ayrıca, X ETH depozito içinde kilitlemek ücretsiz değildir; ETH sahibi için isteğe bağlı bir fedakarlık gerektirir. Şu anda 1000 ETH'niz varsa onunla ne isterseniz yapabilirsiniz. Bir depozitoda kilitlerseniz, [**söz konusu**](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed) hiçbir şey gibi saldırıları önlemek ve doğrulayıcıları kötü katılımlarından dolayı cezalandırmak için aylarca orada sıkışır.

## Protokol içi ve Uygulama Katmanı {#in-protocol-vs-application-layer}

Uygulama düzeyinde staking likiditasyonu güven problemine sahiptir. Protocol-level staking likidasyonu, herhangi bir yeni aktörün ona güvenebileceği (küçük aktörlerden / delegasyondan bile daha fazla sermaye çeken bu durum) nedeniyle çok daha fazla takdir edilmektedir.

## Polygon'un Delegasyon için Çözümü {#polygon-s-solution-for-delegation}

Delegasyonu keşfederken, delege daha fazla güvenmek için delegasyonun protokol içinde olması gerektiğini fark ettik.

Validatörler sermaye likiditesine benzer bir sorunla karşı karşıyayız ve bunu aktarım yapılabilecek ve daha sıvı hale getirebilecekleri gibi benzer düşünceleri keşfedebilen bir NFT haline getirmeyi ve sikka-chorus.one [harika tasarımı](https://blog.chorus.one/delegation-vouchers/) dikkat çekti.

Doğrulayıcı havuzundan bir pay haline getirmek şeklindeki düşünce harika bir fikir olarak ortaya çıktı ve Polygon'un staking işlemleri ethereum akıllı sözleşmesi üzerinde uygulandığı için bizim bunu defi protokollerinde kullanmak üzere ERC20 uyumlu hale getirmek gibi çok daha fazla seçeneği ortaya çıkardı.

Şu andan itibaren her doğrulayıcının kendi their (yani doğrulayıcı Ashish için AMatic token bulunacaktır) vardır çünkü her doğrulayıcı farklı performansa (ödüller ve komisyon oranı) sahiptir. Delege edenler birden fazla doğrulayıcı payı satın alabilir ve belirli bir doğrulayıcının kötü performansına karşı risklerini koruyabilir.

## Avantajlar {#advantages}

- Tasarımımız delegasyon uygulamalarında ERC20 benzeri bir arayüz ile ilgili olarak DeFi uygulamaları üzerine kolayca inşa edilebilir.
- Delege edilmiş tokenler ödünç verme protokollerinde kullanılabilir.
- Delege edenler, Auger gibi tahmin piyasaları üzerinden risklerini hedge edebilirler.

Gelecekteki kapsam:

- Şu anda ERC20 diğer doğrulayıcılar ERC20 / Paylaş tokenları ile birlikte kullanılamaz ancak gelecekte birçok yeni DeFi uygulamasının bunun üzerine inşa edebileceğini ve bunun için bazı pazarlar veya hatta daha iyi ürünler üretebileceğini düşünüyoruz.
- [chorus.one](http://chorus.one) ile başlatılmış araştırma ile doğrulayıcılar ve diğer sorunları kısaltma gibi sorunları da araştırıyoruz (doğrulayıcı gibi sorunlardan kaçınılabilir, X aylarına kendi hisselerini kilitleme ve doğrulayıcı sigortası (zincir üzerinde) gibi diğer şeyler ile ilgili sorunlardan kaçınılabilir).
- Yönetim kararlarına katılmak için Delege oy hakkı
- Delegasyon sıvısı yaparken, ağ güvenliğini de sağlamak istiyoruz. Bu nedenle, bir şekilde dolandırıcılık faaliyeti durumunda kesilebilir sermaye kilitlenir.

Yukarıdaki tasarımın protokol içi olarak kullanılabilir olduğu göz önünde bulundurularak, doğrulayıcılar kendi benzer mekanizmalarını uygulayabilir ve Polygon staking kullanıcı arayüzünde bulunmayan bir sözleşme üzerinden stake edebilirler.

## Gelecekteki Hedefler {#future-goals}

Cosmos merkezi ve Everett B-harvest tasarımı üzerinden zincir arası / çapraz zincir gibi şeyler.

## Kaynaklar {#resources}

- [Vitalik'in pos tasarımı](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Staking Türev Araçlarına Giriş](https://medium.com/lemniscap/an-intro-to-staking-derivatives-i-a43054efd51c)
- [Staking Havuzları](https://slideslive.com/38920085/ethereum-20-trustless-staking-pools)
- [Proof of Stake Mekanizmasında Enflasyon](https://medium.com/figment-networks/mis-understanding-yield-and-inflation-in-proof-of-stake-networks-6fea7e7c0e41)
