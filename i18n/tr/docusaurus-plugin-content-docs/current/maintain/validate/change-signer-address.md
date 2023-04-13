---
id: change-signer-address
title: İmzalayan Adresinizi Değiştirme
description: Doğrulayıcınızın imzalayıcı adresini değiştirin
keywords:
  - docs
  - matic
  - polygon
  - signer address
  - change
  - validator
slug: change-signer-address
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

[İmzalayan adresinin](/docs/maintain/glossary.md#signer-address) ne olduğu hakkında bilgi edinmek için şuraya bakın:
[Anahtar Yönetimi](/docs/maintain/validator/core-components/key-management).

## Ön Koşullar {#prerequisites}

Yeni doğrulayıcı düğümünüzün tamamen eşitlenmiş olduğundan ve yeni imzalayan adresi ile çalıştırıldığından emin olun.

## İmzalayan adresinizi değiştirme {#change-the-signer-address}

Bu kılavuzda mevcut doğrulayıcı düğümünüz Düğüm 1 ve yeni doğrulayıcı düğümünüz ise Düğüm 2 olarak anılmaktadır.

1. Düğüm 1 adresiyle [staking panosuna](https://staking.polygon.technology/) giriş yapın.
2. Profilinizde, **Edit Profile** (Profili Düzenle) seçeneğine tıklayın.
3. **Signer's address** (İmzalayanın adresi) alanına Düğüm 2 adresini girin.
4. **Signer's public key** (İmzalayanın genel anahtarı) alanına Düğüm 2 genel anahtarını girin.

   Genel anahtarı almak için doğrulayıcı düğümünde aşağıdaki komutu çalıştırın:

   ```sh
   heimdalld show-account
   ```

**Save** (Kaydet) düğmesine tıkladığınızda düğümünüz için yeni bilgiler kaydedilecektir. Bu da esasen Düğüm 1'in stake'i, ödüllerin nereye gönderileceğini vb. kontrol eden adres olacağı ve Düğüm 2'nin de blokları imzalama, denetim noktalarını imzalama vb. gibi etkinlikleri gerçekleştireceği anlamına gelir.
