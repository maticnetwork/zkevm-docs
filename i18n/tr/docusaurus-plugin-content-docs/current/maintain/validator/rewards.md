---
id: rewards
title: Ödüller
sidebar_label: Rewards
description: Polygon Ağı staking teşvikleri hakkında bilgi edinin.
keywords:
  - docs
  - matic
  - polygon
  - rewards
  - staking
  - incentives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon ve Stake Kanıtı algoritmasına giriş için bkz. [Stake Kanıtı](/docs/home/polygon-basics/what-is-proof-of-stake) Nedir?

Polygon'da doğrulayıcılar ağın güvenliği için çalışmak üzere teminat olarak MATIC token'ları stake ederler ve hizmetleri karşılığında ödüller kazanırlar.

Polygon ekonomisinden yararlanmak için bir doğrulayıcı veya delege eden olmalısınız.

[Doğrulayıcı](/docs/maintain/glossary.md#validator) olmak için **tam bir doğrulayıcı** düğümü çalıştırmalı ve MATIC stake etmelisiniz. Bakınız [Doğrulama](/docs/maintain/validate/validator-index).

[Ayrıca Validator Sorumlulukları](/docs/maintain/validate/validator-responsibilities) sayfasını kontrol edin.

[Delegatör](/docs/maintain/glossary.md#delegator) olmak için sadece **bir doğrulayıcıya MATIC delege etmeniz** gerekir. Bakınız [Delege](/docs/maintain/delegate/delegate).

## Teşvik nedir? {#what-is-the-incentive}

Polygon 10 milyar token olan toplam arzının %12'sini staking ödülleri için ayırır. Bu işlem ücretlerini çekene kadar ağın yeterince beslenmesini sağlamak içindir. Bu ödüller ağın başlamasını sağlamak içindir, protokolün uzun vadede işlem ücretleri ile kendisini sürdürmesi amaçlanır.

**Doğrulayıcı Ödülleri = Staking Ödülleri + İşlem Ücretleri**

Bu işlem, doğrulayıcı ödüllerinin staking ödüllerinden kademeli olarak ayrılmasını sağlamak için yapılır.

| Yıl | Hedeflenen Stake (Dolaşımdaki arzın %30'u) | %30 Bonding için Ödül Oranı | Ödül Havuzu |
|---|---|---|---|
| İlk | 1.977.909.431 | %20 | 312.917.369 |
| İkinci | 2.556.580.023 | %12 | 275.625.675 |
| Üçüncü | 2.890.642.855 | %9 | 246.933.140 |
| Dördüncü | 2.951.934.048 | %7 | 204.303.976 |
| Beşinci | 2.996.518.749 | %5 | 148.615.670 + **11.604.170** |

Aşağıda arzın %5'lik dilimlerle %5 ile %40 arasında stake edildiği varsayıldığında ilk 5 yıl için beklenen yıllık ödüllerin örnek anlık görüntü bulunmaktadır

| Dolaşımdaki arzın stake edilme %'si | %5 | %10 | %15 | %20 | %25 | %30 | %35 | %40 |
|---|---|---|---|---|---|---|---|---|
| Yıllık ödül |
| İlk | %120 | %60 | %40 | %30 | %24 | %20 | %17,14 | %15 |
| İkinci | %72 | %36 | %24 | %18 | %14,4 | %12 | %10,29 | %9 |
| Üçüncü | %54 | %27 | %18 | %13,5 | %10,8 | %9 | %7,71 | %6,75 |
| Dördüncü | %42 | %21 | %14 | %10,5 | %8,4 | %7 | %6 | %5,25 |
| Beşinci | %30 | %15 | %10 | %7,5 | %6 | %5 | %4,29 | %3,75 |

## Kim teşvikleri alır? {#who-gets-the-incentives}

Doğrulayıcı düğümleri çalıştıran stake edenler ve token'larını tercih ettikleri bir doğrulayıcıya delege eden stake edenler.

Doğrulayıcılar, delege edenler tarafından kazanılan ödül için komisyon talep etme seçeneğine sahiptir.

Tüm stake sahiplerine ait fonlar Ethereum mainnet üzerinde devreye alınan sözleşme içinde kilitlenir.

Hiç bir doğrulayıcı, delege eden token'ları üzerinde velayet sahibi değildir.

## Staking ödülleri {#staking-rewards}

Yıllık teşvik kesindir - Ağ içerisinde stake veya hedeflenen bağ oranı ne olursa olsun, tüm imzacılara periyodik olarak ödül şeklinde teşvik miktarı verilir.

Polygon'da ek öğe olarak, Ethereum mainnet üzerinde periyodik [denetim noktaları](/docs/maintain/glossary.md#checkpoint-transaction) işlemek vardır. Bu, doğrulayıcı sorumluluklarının ana bir parçasıdır ve doğrulayıcılar bu faaliyeti gerçekleştirmeye teşvik edilir. Bu işlem, doğrulayıcıya bir maliyet oluşturur, bu da Polygon gibi Katman 2 çözümüne özgüdür. Bu maliyeti, denetim noktasından sorumlu olan [teklif sahibine](/docs/maintain/glossary.md#proposer) ödenecek bir bonus olarak doğrulayıcı staking ödülü ödeme mekanizmasına yerleştirmeye çalışıyoruz. Bonuslar çıkarıldıktan sonra ödüller, teklif sahibi ve [imzalayanlar](/docs/maintain/glossary.md#signer-address) olmak üzere tüm stake sahipleri arasında orantılı olarak paylaşılacaktır.

## Teklif sahiplerini tüm imzaları dahil etmeye teşvik etme {#encouraging-the-proposer-to-include-all-signatures}

Bonustan tamamen faydalanmak için [teklif sahibi](/docs/maintain/glossary.md#proposer), tüm [imzaları](/docs/maintain/glossary.md#checkpoint-transaction) denetim noktasına dahil etmelidir. Protokol ⅔ +1 toplam stake payı istediğinden, denetim noktası %80 oyla bile kabul edilir. Yine de bu durumda teklif sahibi hesaplanan bonusun sadece %80'ini alır.

## İşlem ücretleri {#transaction-fees}

[Bor](/docs/maintain/glossary.md#bor) içerisindeki her blok üreticisi için her blokta toplanan işlem ücretlerinden belirli bir yüzde verilir. Söz konusu herhangi bir zaman aralığı için üreticilerin seçimi, doğrulayıcının toplam stake içindeki oranına bağlıdır. Geri kalan işlem ücretleri, [Heimdall](/docs/maintain/glossary.md#heimdall) katmanında çalışan tüm doğrulayıcılar arasında paylaştırılan ödüllerle aynı huniden geçer.
