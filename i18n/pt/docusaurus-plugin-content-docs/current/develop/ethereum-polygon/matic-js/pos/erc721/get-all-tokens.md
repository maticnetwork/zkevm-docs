---
id: get-all-tokens
title: getAllTokens
keywords:
- 'pos client, erc721, getAllTokens, polygon, sdk'
description: 'Recuperar todos os tokens pertecentes a um utilizador específico.'
---

O método `getAllTokens` retorna todos os tokens pertencentes a um utilizador específico.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

você também pode limitar os tokens ao especificar um valor limite no segundo parâmetro.
