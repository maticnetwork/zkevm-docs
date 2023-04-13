---
id: is-approved-all
title: isApprovedAll
keywords:
- 'pos client, erc1155, isApprovedAll, polygon, sdk'
description: 'সবগুলো টোকেন অনুমোদিত কিনা তা যাচাই করে।'
---

`isApprovedAll` পদ্ধতি কোনো ব্যবহারকারীর জন্য সবগুলো টোকেন অনুমোদিত কিনা তা যাচাই করে। এটি বুলিয়ান মান জানায়।

```
const erc1155Token = posClient.erc1155(<token address>, true);

const result = await erc1155Token.isApprovedAll(<user Address>);

```
