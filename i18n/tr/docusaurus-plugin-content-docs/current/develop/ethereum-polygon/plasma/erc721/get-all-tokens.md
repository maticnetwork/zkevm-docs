---
id: get-all-tokens
title: getAllTokens
keywords:
- 'plasma client, erc721, getAllTokens, polygon, sdk'
description: 'Maticjs kullanmaya başlayın'
---

# getAllTokens {#getalltokens}

`getAllTokens` metodu belirtilen kullanıcının sahip olduğu tüm token'ları döndürür.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

ayrıca token'ları ikinci parametre içinde belirli bir limit değeri belirleyerek sınırlandırabilirsiniz.
