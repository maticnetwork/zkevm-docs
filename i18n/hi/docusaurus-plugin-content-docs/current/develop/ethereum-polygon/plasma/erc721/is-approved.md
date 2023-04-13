---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# isApproved {#isapproved}

`isApproved` तरीका जांचता है कि क्या टोकन को दिए गए टोकन आईडी के लिए मंज़ूर किया गया है. यह बूलियन वैल्यू लौटाता है.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
