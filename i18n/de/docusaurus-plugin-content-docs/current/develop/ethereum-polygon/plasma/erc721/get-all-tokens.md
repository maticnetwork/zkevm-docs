---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# getAllTokens {#getalltokens}

Die `getAllTokens`-Methode retourniert alle Token im Besitz eines bestimmten Benutzers.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

Sie können die Token auch limitieren, indem Sie im zweiten Parameter einen Grenzwert angeben.
