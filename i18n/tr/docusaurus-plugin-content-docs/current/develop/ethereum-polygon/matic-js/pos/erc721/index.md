---
id: index
title: POSClient
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: 'ERC721 token''ları ile etkileşim kurmanıza yardımcı olan `ERC721` metodu.'
---

# ERC721 {#erc721}

`POSClient`, erc721 token'ları ile etkileşim kurmanıza yardımcı olan `erc721` metodunu sağlar.

Bu metot çeşitli metotlar içeren bir nesne getirir.

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

`isRoot` için ikinci argümanları geçirmek isteğe bağlıdır.

## Alt token {#child-token}

Polygon üzerindeki token bu sözdizimi kullanılarak başlatılabilir -

```
const childERC20Token = posClient.erc721(<child token address>);
```

## Üst token {#parent-token}

Ethereum üzerindeki token ikinci parametre değeri `true` olarak belirlenerek başlatılabilir.

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
