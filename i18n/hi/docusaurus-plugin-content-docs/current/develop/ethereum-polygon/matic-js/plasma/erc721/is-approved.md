---
id: is-aproved
title: मंज़ूर हो गया
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'चेक करें कि क्या टोकन किसी विशिष्ट टोकन आईडी के लिए मंज़ूर हुआ है या नहीं.'
---

`isApproved` तरीका चेक करता है कि टोकन विशेष टोकन आईडी के लिए मंज़ूर हुआ है या नहीं. यह बूलियन वैल्यू लौटाता है.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
