---
id: is-approved-all
title: सभी मंज़ूर हुए
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'देखें कि क्या सभी टोकन मंज़ूर हो गए हैं.'
---

`isApprovedAll` तरीका जाँचता है कि क्या किसी यूज़र के लिए सभी टोकन मंज़ूर हो गए हैं. यह बूलियन वैल्यू लौटाता है.

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
