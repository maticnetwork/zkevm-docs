---
id: accounts
title: Hesaplar nelerdir?
sidebar_label: Accounts
description: "Harici Olarak Sahip Olunan Hesaplar (EOA) ve Sözleşme Hesapları."
keywords:
  - docs
  - matic
  - polygon
  - accounts
  - EOAs
  - contract accounts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Hesaplar nelerdir? {#what-are-accounts}

Ethereum'un global durumu, bir message-passing (mesaj geçirme) çerçevesi yoluyla birbirleriyle etkileşime giren hesaplardan oluşur. En temel etkileşim, MATIC tokenları, Polygon'un yerel token veya Ethereum blok zincirinin ana tokeni olan $ETH gibi bir değer göndermesidir.

Her hesap bir adres olarak adlandırılan 20 baytlık bir altıgen tanımlayıcısı ile tanımlanır - bu hesap hesabın genel anahtarından oluşturulur.

İki tür hesap vardır: **Dış Mekan Sahibi Hesap** ve **Sözleşme Sahibi Hesaplar**.

## Harici Olarak Sahip Olunan Hesaplar {#externally-owned-accounts}

EOA özel bir anahtar tarafından kontrol edilen hesaplardır ve token ve mesaj gönderme yeteneği vardır.

1. İşlemleri gönderebilir (eter transferi veya sözleşme kodunu tetikleyebilir),
2. özel anahtarlar tarafından kontrol edilir,
3. ve ilişkili bir kod bulunmaz.

## Sözleşme Hesapları {#contract-owned-accounts}
Sözleşme Sahibi Hesap, bununla ilişkili bir akıllı sözleşme koduna sahip olan hesaplardır ve özel anahtarı kimseye ait değildir.

1. Bu kodları ilişkilendirmişlerdir.
2. onların kod yürütme işlemi diğer sözleşmelerden alınan işlemler veya mesajlar (çağrı) tarafından tetiklenir.
3. ve bu kod yürütüldüğünde - keyfi karmaşıklığın (Turing eksikliği) işlemlerini gerçekleştirir - kendi kalıcı depolama alanını manipüle eder ve diğer sözleşmeleri çağırabilir.

### Kaynaklar {#resources}

- [Hesaplar hakkında daha fazla bilgi edinin](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
