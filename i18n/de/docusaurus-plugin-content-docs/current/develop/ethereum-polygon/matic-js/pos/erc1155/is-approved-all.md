---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'Überprüfe, ob alle Token genehmigt sind.'
---

`isApprovedAll` Methode überprüft, ob alle Token für einen Benutzer genehmigt sind. Sie liefert den booleschen Wert.

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
