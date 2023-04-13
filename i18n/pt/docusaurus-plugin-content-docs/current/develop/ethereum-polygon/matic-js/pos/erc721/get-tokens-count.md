---
id: get-tokens-count
title: getTokensCount
keywords:
- 'pos client, erc721, getTokensCount, polygon, sdk'
description: 'Obter a contagem de tokens para o utilizador específico.'
---

O método `getTokensCount` retorna a contagem de tokens para o utilizador especificado.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokensCount(<user address>);

```
