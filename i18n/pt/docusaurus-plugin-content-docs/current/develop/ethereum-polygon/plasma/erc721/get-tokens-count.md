---
id: get-tokens-count
title: getTokensCount
keywords:
- 'plasma client, erc721, getTokensCount, polygon, sdk'
description: 'Introdução ao maticjs'
---

# getTokensCount {#gettokenscount}

O método `getTokensCount` apresenta a contagem de tokens para o utilizador especificado.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
