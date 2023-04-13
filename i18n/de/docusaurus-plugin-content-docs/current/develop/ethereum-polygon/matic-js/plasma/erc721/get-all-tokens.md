---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Liefert alle Token, die ein bestimmter Benutzer besitzt.'
---

Die `getAllTokens`-Methode liefert alle Token, die ein bestimmter Benutzer besitzt.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

Sie können die Token auch limitieren, indem Sie im zweiten Parameter einen Grenzwert angeben.
