---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Den genehmigten Betrag für den Benutzer erhalten.'
---

Mit dieser `getAllowance`-Methode kann der genehmigte Betrag für den Benutzer erhalten werden.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
