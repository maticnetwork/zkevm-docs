---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'Magsimula sa maticjs '
---

# getAllowance  {#getallowance}

Ang paraaang `getAllowance` ay maaaring gamitin upang makuha ang naaprubahang halaga para sa user.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
