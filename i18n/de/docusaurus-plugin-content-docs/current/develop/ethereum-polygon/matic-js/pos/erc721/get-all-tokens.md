---
id: get-all-tokens
title: getAllTokens
keywords:
- 'pos client, erc721, getAllTokens, polygon, sdk'
description: 'Alle Token abrufen, die ein bestimmter Benutzer besitzt.'
---

Die `getAllTokens`-Methode liefert alle Token, die ein bestimmter Benutzer besitzt.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

Du kannst die Token auch limitieren, indem du im zweiten Parameter einen Grenzwert angibst.
