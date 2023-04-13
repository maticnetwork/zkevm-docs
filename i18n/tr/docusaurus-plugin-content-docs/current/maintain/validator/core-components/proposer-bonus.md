---
id: proposer-bonus
title: Teklif Sahibi Bonusu
description: Bir doğrulayıcı olmanın ek teşviki
keywords:
  - docs
  - polygon
  - matic
  - validate
  - proposer
  - bonus
  - incentive
slug: proposer-bonus
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Teklif Sahibi Bonusu {#proposer-bonus}

Polygon'da ek öğe olarak, Ethereum mainnet üzerinde periyodik [denetim noktaları](/docs/maintain/glossary.md#checkpoint-transaction) işlemek vardır. Bu, doğrulayıcı sorumluluklarının ana bir parçasıdır ve doğrulayıcılar bu faaliyeti gerçekleştirmeye teşvik edilir. Bu işlem, doğrulayıcıya bir maliyet oluşturur, bu da Polygon gibi Katman 2 çözümüne özgüdür. Bu maliyeti, denetim noktasından sorumlu olan [teklif sahibine](/docs/maintain/glossary.md#proposer) ödenecek bir bonus olarak doğrulayıcı staking ödülü ödeme mekanizmasına yerleştirmeye çalışıyoruz. Bonuslar çıkarıldıktan sonra ödüller, teklif sahibi ve [imzalayanlar](/docs/maintain/glossary.md#signer-address) olmak üzere tüm stake sahipleri arasında orantılı olarak paylaşılacaktır.

Bonustan tamamen faydalanmak için teklif sahibi, tüm imzaları denetim noktasına dahil etmelidir. Protokol ⅔ +1 toplam stake payı istediğinden, denetim noktası %80 oyla bile kabul edilir. Yine de bu durumda teklif sahibi hesaplanan bonusun sadece %80'ini alır.
