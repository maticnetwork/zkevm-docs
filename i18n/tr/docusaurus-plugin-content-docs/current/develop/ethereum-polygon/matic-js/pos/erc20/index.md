---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "Bir ERC20 token'ıyla etkileşimde bulunmak için bir metot sağlar."
---

# ERC20 {#erc20}

`POSClient`, bir **ERC20** token ile etkileşim kurmanıza yardımcı olan `erc20` metodunu sağlar.

Bu metot başka çeşitli metotlar içeren bir nesne döndürür.

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

`isRoot` için ikinci argümanları geçirmek isteğe bağlıdır.

## Alt token {#child-token}

Polygon üzerindeki token bu sözdizimi kullanılarak başlatılabilir -

```
const childERC20Token = posClient.erc20(<child token address>);
```

## Üst token {#parent-token}

Token ethereum'da ikinci parametre değeri `true` olarak belirlenerek başlatılabilir.

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
