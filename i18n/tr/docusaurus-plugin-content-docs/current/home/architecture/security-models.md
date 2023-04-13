---
id: security-models
title: Güvenlik Modelleri
description: PoS, Plazma ve Hibrit Menkul Kıymetler
keywords:
  - docs
  - matic
  - polygon
  - security
  - implementation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Güvenlik Modelleri {#security-models}

Polygon bir geliştiricinin dApp'lerini oluşturması için üç tür güvenlik modeli sağlar:

1. [Hisse Kanıtı güvenliği](#proof-of-stake-security)
2. [Plasma güvenliği](#plasma-security)
3. [Hibrit (Plasma + PoS)](#hybrid)

Polygon tarafından sunulan bu güvenlik modellerinin ve geliştirici iş akışının her biri için sunulan ve aşağıda bir dApp ile ilgili olarak geliştirici iş akışının her birini tanımladık.

## Hisse Kanıtı güvenliği {#proof-of-stake-security}

POS'un güvenliği için Proof of Stake (PoS) güvenliği Tendermint'in üzerine inşa edilen Heimdall & Bor katmanı tarafından sağlanır. Bir denetim noktası kök zincire ancak doğrulayıcılardan ⅔'si bunu imzaladıklarında işlenir.

PoS mekanizmasını platformumuzda etkinleştirmek için, Ethereum üzerinde bir staking yönetimi sözleşmeleri seti, bunun yanı sıra Heimdall ve Bor düğümleri çalıştıran bir teşvikli doğrulayıcılar kümesi kullanırız. Bu durum aşağıdaki özellikleri uygular:

- Birinin Ethereum akıllı sözleşmesi üzerinde MATIC token'ları stake edebilmesi ve sisteme bir Doğrulayıcı olarak katılabilmesi
- Polygon üzerinde durum geçişlerini (state transitions) doğrulama karşılığında staking ödülleri kazanma

PoS mekanizması aynı zamanda verilerin kullanılamazlığı sorununu yan zincirlerimizde Plasma bakımından azaltıcı bir araç olarak da iş görür.

Yan zincir durumunu periyodik olarak denetim noktaları vasıtasıyla kesinleştiren hızlı bir kesinleştirme (finality) katmanına sahibiz. Bu hızlı kesinleştirme yeteneği yan zincir durumunu sabitlememize yardımcı olmaktadır. EVM uyumlu zincirde az sayıda doğrulayıcı vardır ve blok süresi yüksek iş çıkarma yeteneği sayesinde daha hızlıdır. Bu zincirde ölçeklenebilirlik, yüksek derecede merkeziyetsizliğe tercih edilmektedir. Heimdall bu son durum sabitlemesinin korunmasını ve büyük bir doğrulayıcı kümesinden geçmesini, dolayısıyla yüksek düzeyde merkeziyetsizliği garanti eder.

**Geliştiriciler için**

PoS güvenliği üzerine bir dApp geliştirici binası olarak, prosedür akıllı sözleşmenizi almak ve Polygon PoS ağı üzerinde dağıtmak kadar basittir. Bu, EVM uyumlu bir yan zincirin işletilmesini sağlayan hesap tabanlı mimari sayesinde mümkün olmaktadır.

## Plasma Güvenliği {#plasma-security}

Polygon çeşitli saldırı senaryolarına göre "Plazma Garantisi" sağlar. Düşünülen iki ana senaryo şunlardır:

- Zincir operatörü (veya Polygon'da Heimdall katmanı) is veya
- Kullanıcı dürüst değil

Her iki durumda da, bir kullanıcının plazma zinciri üzerindeki varlıkları tehlikeye atılmışsa, kitlesel çıkış başlatmaları gerekir. Polygon, kök zincir akıllı sözleşmesi üzerinde kaldıraç olarak kullanılabilecek yapılar sağlar. Bu inşaat ve saldırı için kullanılan vektörler ile ilgili daha fazla detay ve teknik özellikler için [buradan](https://ethresear.ch/t/account-based-plasma-morevp/5480) okuyun.

Polygon'un Plasma sözleşmeleriyle sunulan güvenlik, Ethereum'un güvenliğine bir ek olarak gelir. Kullanıcıların fonları ancak Ethereum'da bozulma olur ise risk altına girer. Basitçe söylersek, bir plasma zinciri ana zincirin konsensüs mekanizması kadar güvenlidir. Bu durum, plazma zincirinin gerçekten basit konsensüs mekanizmalarını kullanabileceği ve hala güvenli olabileceği için tahmin edilebilir.

**Geliştiriciler için**

Bir dApp geliştiricisi olarak, Polygon üzerinde Plazma güvenlik garantisi ile inşa etmek istiyorsanız, akıllı sözleşmeleriniz için özel tahminler yazmanız gerekir. Bu temelde Polygon plazma yapıları tarafından belirlenen uyuşmazlık koşullarını ele alan harici sözleşmelerin yazılması anlamına gelir.

## Hibrit {#hybrid}

Polygon'da kullanılan dApp'te bulunan saf Plazma güvenliği ve saf Plasma güvenliği dışında geliştiricilerin takip edebileceği bir Hibrit yaklaşım da var - bu da hem Plazma hem de Plasma Proof of of Stake garantisini almak anlamına geliyor.

Bu yaklaşım bir örnekle daha iyi anlaşılır.

Oyunun mantığını tanımlayan bir dizi akıllı sözleşmeye sahip bir oyun dApp'i düşünün. Diyelim ki oyun, oyuncuları ödüllendirmek için kendi erc20 token'ını kullanıyor. Şimdi, oyunun mantığını tanımlayan akıllı sözleşmeler doğrudan Polygon yan zinciri üzerinde devreye alınabilir - bu yolla sözleşmeler için Hisse Kanıtı güvenliği garanti edilirken, erc20 token transferinin güvenliği Plasma güvenceleri ve Polygon'un kök zincir sözleşmelerinde gömülü fraud proof (sahtecilik kanıtı) ile sağlanabilir.
