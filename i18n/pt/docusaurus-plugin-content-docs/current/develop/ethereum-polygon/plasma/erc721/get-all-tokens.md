---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Introdução ao maticjs'
---

# getAllTokens {#getalltokens}

O método `getAllTokens` retorna todos os tokens de propriedade do utilizador especificado.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

Também pode limitar os tokens especificando um valor limite no segundo parâmetro.
