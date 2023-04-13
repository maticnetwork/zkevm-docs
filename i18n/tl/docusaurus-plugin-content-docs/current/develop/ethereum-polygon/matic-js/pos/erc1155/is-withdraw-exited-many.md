---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
description: 'Tinitingnan kung na-exit ang pag-withdraw para sa maraming token.'
---

Tinitingnan ng paraang `isWithdrawExitedMany` kung na-exit ang pag-withdraw para sa maraming token. Nagbabalik ito ng boolean value.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
