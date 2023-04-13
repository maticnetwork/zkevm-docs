---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Pagsisimula sa maticjs'
---

# getAllTokens {#getalltokens}

Ibinabalik ng paraang `getAllTokens`ang lahat ng token na pag-aari ng tinukoy na user.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

Maaari mo ring limitahan ang mga token sa pamamagitan ng pagtukoy ng halaga ng limitasyon sa pangalawang parameter.
