---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc721, isApprovedAll, polygon, sdk'
description: 'সবগুলো টোকেন অনুমোদিত কিনা তা যাচাই করে।'
---

সবগুলো টোকেন অনুমোদিত কিনা তা `isApprovedAll`পদ্ধতি যাচাই করে। এটি বুলিয়ান মান জানায়।

```
const erc721Token = posClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
