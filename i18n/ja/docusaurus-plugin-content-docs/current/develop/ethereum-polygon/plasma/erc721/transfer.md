---
id: transfer
title: 転送
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Maticjsを始めましょう'
---

# 転送 {#transfer}

`transfer`メソッドは、ユーザからユーザにトークンを転送します。

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
