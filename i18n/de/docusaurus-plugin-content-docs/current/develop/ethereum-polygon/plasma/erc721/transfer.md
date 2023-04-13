---
id: transfer
title: Transfer
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Erste Schritte mit Maticjs'
---

# Transfer {#transfer}

Die `transfer`-Methode überträgt Token von einem Benutzer zu einem anderen Benutzer.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
