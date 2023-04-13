---
id: transfer
title: transfer
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Memulai dengan maticjs'
---

# Transfer {#transfer}

Metode `transfer` mentransfer token dari seorang pengguna ke pengguna lain.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
