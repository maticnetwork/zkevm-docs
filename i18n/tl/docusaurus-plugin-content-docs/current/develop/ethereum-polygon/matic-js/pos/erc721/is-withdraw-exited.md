---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: 'Tinitingnan kung na-exit ang isang pag-withdraw.'
---

Tinitingnan ng paraang `isWithdrawExited` kung na-exit ang isang pag-withdraw. Ibinabalik nito ang boolean value.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
