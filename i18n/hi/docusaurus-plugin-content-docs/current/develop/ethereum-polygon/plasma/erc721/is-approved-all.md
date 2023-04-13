---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'maticjs के साथ शुरूआत करें'
---

# सभी मंज़ूर हुए {#isapprovedall}

`isApprovedAll` तरीका जाँचता है कि क्या सभी टोकन मंज़ूर किए गए हैं. यह बूलियन वैल्यू लौटाता है.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
