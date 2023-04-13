---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# isExited {#isexited}

`isExited` metodu bir fon çekme işleminden çıkılıp çıkılmadığını kontrol eder. Bir boolean değeri döndürür.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
