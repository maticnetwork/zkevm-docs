---
id: transfer
title: transfer
keywords:
  - 'plasma client, erc721, transfer, polygon, sdk'
description: 'Get started with maticjs'
---

`transfer` method transfer tokens from one user to another user.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
