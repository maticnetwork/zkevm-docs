---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'Überprüft, ob alle Token freigegeben wurden.'
---

`isApprovedAll` Methode prüft, ob alle Token genehmigt wurden. Sie liefert den booleschen Wert.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
