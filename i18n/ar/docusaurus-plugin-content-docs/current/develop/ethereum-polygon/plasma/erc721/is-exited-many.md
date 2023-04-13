---
id: is-exited-many
title: isExitedMany
keywords:
  - 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Get started with maticjs'
---

# isExitedMany

`isExitedMany` method check if a withdraw has been exited. It returns boolean value.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
