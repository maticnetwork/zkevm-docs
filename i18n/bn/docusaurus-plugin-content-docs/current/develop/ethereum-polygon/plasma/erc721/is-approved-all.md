---
id: is-approved
title: isApprovedAll
keywords:
- 'plasma client, erc721, isApprovedAll, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# isApprovedAll {#isapprovedall}

সবগুলো টোকেন অনুমোদিত কিনা তা `isApprovedAll`পদ্ধতি যাচাই করে। এটি বুলিয়ান মান জানায়।

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApprovedAll(<user Address>);

```
