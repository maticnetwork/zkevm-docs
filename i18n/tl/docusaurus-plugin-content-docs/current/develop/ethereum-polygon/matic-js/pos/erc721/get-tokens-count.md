---
id: get-tokens-count
title: getTokensCount
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: 'Kunin ang bilang ng mga token para sa tinukoy na user.'
---

Ibinabalik ng paraang `getTokensCount` ang bilang ng mga token para sa tinukoy na user.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
