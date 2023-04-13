---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# getTokensCount {#gettokenscount}

Ibinabalik ng paraang `getTokensCount` ang bilang ng mga token para sa tinukoy na user.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
