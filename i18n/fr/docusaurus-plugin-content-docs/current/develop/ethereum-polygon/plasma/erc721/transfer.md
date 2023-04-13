---
id: transfer
title: transférer
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

# Transférer {#transfer}

`transfer` méthode de transfert des jetons d'un utilisateur à un autre.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
