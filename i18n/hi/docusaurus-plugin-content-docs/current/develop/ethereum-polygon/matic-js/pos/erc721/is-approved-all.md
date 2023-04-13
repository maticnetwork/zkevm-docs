---
id: is-approved-all
title: सभी मंज़ूर हुए
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'जांच करता है कि क्या सभी टोकन स्वीकृत हैं.'
---

`isApprovedAll` तरीका जांचता है कि क्या सभी टोकन मंज़ूर किए गए हैं. यह बूलियन वैल्यू लौटाता है.

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
