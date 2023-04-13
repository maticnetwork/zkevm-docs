---
id: heimdall-chain
title: Heimdall Zinciri
description: Polygon Ağı üzerindeki hisse kanıtı doğrulayıcı katmanı
keywords:
  - docs
  - polygon
  - matic
  - heimdall
  - chain
  - verifier
  - layer
  - proof of stake
slug: heimdall-chain
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Heimdall Plasma bloklarının temsilini Ethereum ana ağına [kontrol](/docs/maintain/glossary.md#checkpoint-transaction) etmekten sorumlu olan hisse kanıtı doğrulayıcı katmanıdır. Heimdall, [Tendermint](https://tendermint.com/) üzerinde yer alır.

Ethereum mainnet'teki staking sözleşmesi Heimdall ile birlikte çalışarak, [doğrulayıcı](/docs/maintain/glossary.md#validator) kümesinin seçilmesi, doğrulayıcıların güncellenmesi vs. dahil olmak üzere PoS makinesi için güvenli stake yönetimi mekanizması olarak iş görür.

Heimdall katmanı [Bor](/docs/maintain/glossary.md#bor) tarafından üretilen blokların bir Merkle ağacı halinde toplanmasını ve Merkle kökünün periyodik olarak Ethereum mainnet'e yayınlamasını yönetir. Bu periyodik yayınlama *denetim noktası* ataması olarak adlandırılır.

Bor'da birkaç blok ilerlendikten sonra Heimdall katmanında bulunan bir doğrulayıcı:

1. Son denetim noktasından itibaren tüm blokları doğrular.
2. Blok hash'lerinin bir Merkle ağacını oluşturur.
3. Merkle kökünü Ethereum mainnet'e yayınlar.

Denetim noktaları iki nedenden dolayı önemlidir:

1. Kök zincirde kesinliğin (finality) sağlanması.
2. Varlıklar çekildiğinde yakma kanıtının sağlanması.

Sürece genel bakış:

* Bir aktif doğrulayıcılar alt kümesi havuzdan seçilerek bir [span](/docs/maintain/glossary.md#span) boyunca [blok üreticileri](/docs/maintain/glossary.md#block-producer) olarak çalışır. Bu blok üreticileri blok oluşturmaktan ve oluşturulan blokları ağda yayınlamaktan sorumludur.
* Bir denetim noktası belli bir aralık boyunca oluşturulan tüm blokların Merkle kök hash'ini içerir. Tüm düğümler Merkle kök hash'ini doğrular ve imzalarını buna iliştirir.
* Doğrulayıcı kümesinden seçilen bir [teklifçi](/docs/maintain/glossary.md#proposer) (proposer) belli bir denetim noktası için tüm imzaları toplamaktan ve denetim noktasını Ethereum mainnet'e işlemekten sorumludur.
* Bloklar oluşturma ve denetim noktaları teklif etme sorumluluğu bir doğrulayıcının toplam havuzdaki stake oranına bağlıdır.

Ayrıca bakınız [Heimdall mimarisi](/docs/pos/heimdall/overview).
