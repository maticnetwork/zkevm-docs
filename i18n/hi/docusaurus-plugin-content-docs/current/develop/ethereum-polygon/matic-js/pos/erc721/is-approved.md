---
id: is-approved
title: मंज़ूर हो गया
keywords:
- 'pos client, erc721, isApproved, polygon, sdk'
description: 'जाँचें कि क्या टोकन को किसी खास टोकन आईडी के लिए मंज़ूर किया गया है.'
---

`isApproved` तरीका जाँचता है कि क्या टोकन को दिए गए टोकन आईडी के लिए मंज़ूर किया गया है. यह बूलियन वैल्यू लौटाता है.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
