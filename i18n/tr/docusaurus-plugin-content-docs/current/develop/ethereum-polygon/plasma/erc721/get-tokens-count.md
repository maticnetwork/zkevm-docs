---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# getTokensCount {#gettokenscount}

`getTokensCount` metodu belirtilen kullanıcı için token sayısını döndürür.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
