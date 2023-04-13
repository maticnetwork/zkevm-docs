---
id: is-exited-many
title: Ang isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# Ang isExitedMany {#isexitedmany}

`isExitedMany` na paraan ay nagsusuri kung na-exit ang isang pag-withdraw. Ibinabalik nito ang boolean value.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
