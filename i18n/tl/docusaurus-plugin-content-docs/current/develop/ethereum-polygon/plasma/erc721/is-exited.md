---
id: is-exited
title: Ang isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# Ang isExited {#isexited}

`isExited` na paraan ay nagsusuri kung na-exit na ang isang pag-withdraw. Ibinabalik nito ang boolean value.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
