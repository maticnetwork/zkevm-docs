---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# isApproved {#isapproved}

`isApproved` metodu token'ın belirtilen tokenId için onaylanıp onaylanmadığını kontrol eder. Bir boolean değeri döndürür.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
