---
id: state-sync-mechanism
title: Durum Senkronizasyon Mekanizması
description: Ethereum verilerini doğal olarak okumak için State Sync mekanizması
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Heimdall](/docs/maintain/glossary.md#heimdall) katmanındaki doğrulayıcılar [StateSynced](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) (durum senkronizasyonu gerçekleşmiş) olayı alır ve bu olayı [Bor](/docs/maintain/glossary.md#bor) katmanına geçirir. Ayrıca bakınız [Polygon Mimarisi](/docs/pos/polygon-architecture).

**Alıcı sözleşmesi** [IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol)'ı devralır ve özel mantık [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5) fonksiyonu içinde bulunur.

En son sürüm olan [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) aşağıdaki gibi birkaç geliştirmeyi içerir:
1. Durum senkronizasyon işlemlerinde veri boyutunu aşağıdakilerle kısıtlama:
    * **Bayt** cinsinden ifade edildiğinde **30 Kb**
    * **Dize** cinsinden ifade edildiğinde **60 Kb**.
2. Zincirin ilerlemesini engelleyebilecek bir olaylar patlaması olduğunda mempool'un çok hızlı dolmaması için farklı doğrulayıcıların sözleşme olayları arasındaki **gecikme süresinin** artırılması.

Aşağıdaki örnekte veri boyutunun nasıl kısıtlandığı gösterilmektedir:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## Kullanıcılar için gereksinimler {#requirements-for-the-users}

Dapp'lerin/kullanıcıların state-sync ile çalışması için gerekenler şunlardır:

1. [syncState](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33) fonksiyonunu çağırmak.
2. `syncState` fonksiyonu `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);` şeklinde ifade edilen bir olay yayınlar
3. Heimdall zincirindeki tüm doğrulayıcılar `StateSynced` (durum senkronizasyonu gerçekleşti) olayını alır. Durum senkronizasyonu için işlem ücreti almak isteyen bir doğrulayıcı işlemi Heimdall'a gönderir.
4. `state-sync` işlemi Heimdall'da bir bloka dahil edildiğinde, bu işlem bekleyen state-sync listesine eklenir.
5. Bor'daki her sprint sonrasında Bor düğümü bekleyen state-sync olaylarını Heimdall'dan bir API çağrısıyla getirir.
6. Alıcı sözleşmesi `IStateReceiver` arabirimini devralır; veri baytlarını deşifre eden ve bir eylemi ifa eden özel mantık [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol) fonksiyonu içinde bulunur.
