---
id: get-token-id-at-index-for-user
title: यूज़र के लिए इंडेक्स पर टोकन आईडी पाएँ
keywords:
- 'plasma client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# यूज़र के लिए इंडेक्स पर टोकन आईडी पाएँ {#gettokenidatindexforuser}

`getTokenIdAtIndexForUser` तरीका यूज़र के लिए दिए गए इंडेक्स पर टोकन आईडी को लौटाता है.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
