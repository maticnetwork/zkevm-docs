---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# isExitedMany {#isexitedmany}

`isExitedMany` metodu bir fon çekme işleminden çıkış yapılıp yapılmadığını kontrol eder. Bir boolean değeri döndürür.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
