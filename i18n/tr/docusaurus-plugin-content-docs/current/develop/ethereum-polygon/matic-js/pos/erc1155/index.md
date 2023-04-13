---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'Matic.js kullanarak ERC1155 token ile etkileşim kurabilirsiniz.'
---

# ERC1155 {#erc1155}

`POSClient`, erc1155 token'ları ile etkileşim kurmanıza yardımcı olan `erc1155` metodunu sağlar.

Bu metot farklı metotlar içeren **ERC1155** sınıfı oturum döndürür.

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

`isRoot` için ikinci argümanlar geçirmek isteğe bağlıdır.

## Alt token {#child-token}

Polygon üzerindeki token bu sözdizimi kullanılarak başlatılabilir -

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## Üst token {#parent-token}

Ethereum üzerindeki token ikinci parametre değeri `true` olarak belirlenerek başlatılabilir.

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
