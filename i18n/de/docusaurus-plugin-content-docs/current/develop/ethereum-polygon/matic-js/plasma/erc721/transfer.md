---
id: transfer
title: übertragen
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Token von einem Benutzer zu einem anderen übertragen.'
---

`transfer`-Methode überträgt Token von einem Benutzer zu einem anderen Benutzer.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
