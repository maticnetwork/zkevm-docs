---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# ERC721 {#erc721}

`plasmaClient`, erc721 token'ları ile etkileşim kurmanıza yardımcı olan `erc721` metodunu sağlar.

Bu metot çeşitli metotlara sahip bir nesneyi döndürür.

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## Alt token {#child-token}

Polygon üzerindeki token bu sözdizimi kullanılarak başlatılabilir -

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## Üst token {#parent-token}

Ethereum üzerindeki token ikinci parametre değeri `true` olarak belirlenerek başlatılabilir.

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
