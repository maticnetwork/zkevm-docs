---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: 'Tinitingnan kung na-exit ang isang pag-withdraw.'
---

Tinitingnan ng paraang `isWithdrawExited` kung na-exit ang isang pag-withdraw. Ibinabalik nito ang boolean value.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
