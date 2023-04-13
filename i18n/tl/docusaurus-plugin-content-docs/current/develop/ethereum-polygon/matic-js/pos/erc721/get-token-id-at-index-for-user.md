---
id: get-token-id-at-index-for-user
title: getTokenIdAtIndexForUser
keywords:
- 'pos client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'I-retrieve ang token id sa ibinigay na index para sa user.'
---

Ibinabalik ng paraang `getTokenIdAtIndexForUser` ang token id sa ibinigay na index para sa user.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
