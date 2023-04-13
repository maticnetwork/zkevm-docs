---
id: is-withdraw-exited-many
title: isWithdrawExitedMany
keywords:
- 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
description: 'Tingnan kung na-exit ang pag-withdraw para sa maraming token.'
---

Tinitingnan ng paraang `isWithdrawExitedMany` kung na-exit ang pag-withdraw para sa maraming token. Nagbabalik ito ng boolean value.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
