---
id: get-token-id-at-index-for-user
title: यूज़र के लिए इंडेक्स पर टोकन आईडी पाएँ
keywords:
- 'pos client, erc721, getTokenIdAtIndexForUser, polygon, sdk'
description: 'यूज़र के लिए दिए गए इंडेक्स आईडी पर टोकन आईडी फिर से लेें.'
---

`getTokenIdAtIndexForUser` तरीका यूज़र के लिए दिए गए इंडेक्स पर टोकन आईडी को लौटाता है.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getTokenIdAtIndexForUser(<index>,<user address>);

```
