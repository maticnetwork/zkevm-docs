---
id: get-all-tokens
title: getAllTokens
keywords:
- 'pos client, erc721, getAllTokens, polygon, sdk'
description: 'I-retrieve ang lahat ng token na pag-aari ng tinukoy na user.'
---

Ibinabalik ng paraang `getAllTokens` ang lahat ng token na pag-aari ng tinukoy na user.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

Maaari mo ring limitahan ang mga token sa pamamagitan ng pagtukoy sa value ng limitasyon sa pangalawang parameter.
