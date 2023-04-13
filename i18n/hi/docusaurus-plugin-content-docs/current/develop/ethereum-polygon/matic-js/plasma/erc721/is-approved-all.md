---
id: is-approved
title: सभी मंज़ूर हुए
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'चेक करें कि सभी टोकन मंज़ूर हैं या नहीं.'
---

`isApprovedAll` तरीका चेक करता है कि सभी टोकन मंज़ूर हैं या नहीं. यह बूलियन वैल्यू लौटाता है.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
