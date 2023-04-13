---
id: general-faq
title: Genel SSS
description: Polygon ağı hakkında sıkça sorulan sorular.
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Polygon Ağı nedir? {#what-is-polygon-network}

Polygon Ağı bir yandan zincir dışı hesaplama için yan zincirler kullanarak ölçek kotaran, diğer yanda da Hisse Kanıtı (Proof-of-Stake (PoS)) sağlayan doğrulayıcılar vasıtasıyla varlık güvenliği ve merkeziyetsizlik sağlayan bir Katman 2 ölçekleme çözümüdür.

Ayrıca bkz. [Polygon Nedir?](/docs/home/polygon-basics/what-is-polygon)

## Hisse Kanıtı (PoS) nedir? {#what-is-proof-of-stake-pos}

Hisse Kanıtı, blok zinciri ağının dağıtık konsensüse ulaşmayı hedeflediği bir sistemdir. Yeterli miktarda token'ı olan herkes kripto paralar stake edebilir; ekonomik teşvik, merkeziyetsiz ağın paylaşılan değerinde yatar. Kripto paralar stake eden kişiler oy kullanarak işlemleri doğrular, bu arada bir bloktaki bir işlem veya bir bloklar kümesindeki bir işlemler kümesi bir denetim noktasında yeterli oy aldığında konsensüse ulaşılır. Eşik için, her oyla birlikte gelen stake bakımından ağırlık kullanılır. Örneğin, Polygon'da, Polygon bloklarının denetim noktalarının Ethereum ağına işlenmesi için konsensüse, toplam staking gücünün en az 3'te 2'si bunun için oy kullandığında ulaşılır.

Ayrıca bkz. [Hisse Kanıtı Nedir?](/docs/home/polygon-basics/what-is-proof-of-stake)

## Polygon mimarisinde Hisse Kanıtının rolü nedir? {#what-role-does-proof-of-stake-play-in-the-polygon-architecture}

Polygon mimarisindeki Hisse Kanıtı katmanı aşağıdaki 2 amaca hizmet eder:

* Plasma zincirinin canlılığını korumak için bir teşvik katmanı olarak iş görür, en başta dikenli veri kullanılamazlığı sorununu azaltır.
* Plasma'nın ele almadığı durum geçişleri için Hisse Kanıtı güvenlik garantilerini uygular.

## Polygon PoS'un diğer benzer sistemlerden farkı nedir? {#how-is-polygon-pos-different-from-other-similar-systems}

İkili bir amaca hizmet etmesi bakımından farklıdır - Plasma Koşulları vasıtasıyla durum geçişlerini ele alarak Plasma zinciri için veri kullanılabilirliği garantileri, bunun yanı sıra EVM'deki jenerik akıllı sözleşmeler için Hisse Kanıtı doğrulaması sağlar.

Polygon mimarisi ayrıca blok üretimi ve doğrulama sürecini 2 farklı katmana ayırır. Blok üreticileri olarak doğrulayıcılar daha hızlı (< 2 saniye) kısmi konfirmasyonlar için Polygon zincirinde bloklar oluştururken, nihai onay, denetim noktası belli bir aralıkta ana zincire işlendiğinde elde edilir; bu aralığın süresi Ethereum'daki yoğunluk veya Polygon işlemlerinin sayısı gibi birden fazla faktöre bağlı olarak değişebilir. İdeal koşullarda 15 dakika ile 1 saat arasında olacaktır.

Bir denetim noktası, temelde, aralıklar arasında üretilen tüm blokların Merkle köküdür. Doğrulayıcılar birden fazla rol oynarlar: blok üreticisi katmanında bloklar oluşturlar, tüm denetim noktalarını imzalayarak konsensüse katılırlar ve teklifçi olarak hareket ederken denetim noktasını işlerler. Bir doğrulayıcının blok üreticisi veya teklifçi olma olasılığı onun toplam havuzdaki stake oranına bağlıdır.

## Teklifçinin tüm imzaları dâhil etmeye teşvik edilmesi {#encouraging-the-proposer-to-include-all-signatures}

Teklifçinin, teklifçi bonusunun tamamını elde etmek için, tüm imzaları denetim noktasına dâhil etmesi gerekecektir. Protokol toplam stake'in 2/3+1 ağırlığını talep ettiğinden, denetim noktası %80 oyla bile kabul edilecektir. Ama bu durumda teklifçi hesaplanan bonusun %80'ini alır.

## Bir destek bileti nasıl oluşturabilirim veya Polygon belgelerine nasıl katkı yapabilirim? {#how-can-i-raise-a-support-ticket-or-contribute-to-polygon-documentation}
Belgelerimizde bir şeylerin düzeltilmesi gerektiğini düşünüyorsanız veya buraya yeni bilgiler eklemek istiyorsanız, [Github deposunda bir konu gündeme getirebilirsiniz](https://github.com/maticnetwork/matic.js/issues). Depodaki [Readme dosyasında](https://github.com/maticnetwork/matic-docs/blob/master/README.md) belgelerimize nasıl katkı yapabileceğinize dair birkaç öneri bulabilirsiniz.

Hâlâ yardıma ihtiyacınız olursa **destek ekibimizle** her zaman iletişime geçebilirsiniz.
