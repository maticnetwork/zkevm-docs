---
id: key-management
title: Anahtar Yönetimi
description: İmzacı ve sahibi anahtarları yönetimi
keywords:
  - docs
  - polygon
  - matic
  - key
  - key management
  - signer
  - owner
slug: key-management
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Her doğrulayıcı Polygon'da doğrulayıcı faaliyetleri yönetmek için iki anahtar kullanır:

* İmzacı anahtarı
* Sahip anahtarı

## İmzacı anahtarı {#signer-key}

İmzacı anahtar Heimdall bloklarını, denetim noktalarını ve diğer imza gerektiren faaliyetleri imzalamak için kullanılan adrestir.

İmzacı adresin özel anahtarı, doğrulayıcı düğümünü imzalama amaçları için çalıştıran makinede bulunmalıdır.

İmzacı anahtar staking'i, ödülleri veya delegasyonları yönetemez.

Doğrulayıcı [denetim noktaları](/docs/maintain/glossary.md#checkpoint-transaction) göndermek için Ethereum mainnet'teki imzacı adreste ETH bulundurmalıdır.

## Sahip anahtarı {#owner-key}

Sahip anahtarı, Ethereum mainnet'te stake etmek, yeniden stake etmek, imzacı anahtarı değiştirmek, ödüller çekmek ve delegasyonla ilgili parametreleri yönetmek için kullanılan adrestir. Sahip anahtarının özel anahtarı her ne pahasına olursa olsun güvenli saklanmalıdır.

Sahip anahtarıyla yapılan tüm işlemler Ethereum mainnet'te yapılır.

İmzacı anahtar düğümde tutulur ve genelde **sıcak** cüzdan olarak kabul edilir, oysa sahip anahtarı çok güvenli bir şekilde saklanmalıdır, seyrek olarak kullanılır ve genelde **soğuk** cüzdan olarak kabul edilir. Stake edilmiş fonlar sahip anahtarıyla kontrol edilir.

Sorumlulukların imzacı anahtar ile sahip anahtarı arasında bu şekilde ayrıştırılması güvenlikten ödün vermeden kullanım kolaylığı sağlanması amacına yöneliktir.

Her iki anahtar da Ethereum uyumlu adreslerdir ve tamamen aynı biçimde çalışır.

## İmzacı değişikliği {#signer-change}

Bakınız: [İmzacı Adresinizi Değiştirme](/docs/maintain/validate/change-signer-address).
