---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'কোনো নির্দিষ্ট tokenId-র জন্য টোকেন অনুমোদিত হয়েছে কিনা তা যাচাই করে।'
---

কোনো নির্দিষ্ট tokenId-র জন্য টোকেন অনুমোদিত কিনা তা `isApproved`পদ্ধতি যাচাই করে। এটি বুলিয়ান মান জানায়।

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
