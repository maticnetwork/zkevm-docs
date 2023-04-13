---
id: is-aproved
title: isApproved
keywords:
- 'plasma client, erc721, isApproved, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# isApproved {#isapproved}

কোনো নির্দিষ্ট টোকেন আইডির জন্য টোকেন অনুমোদিত কিনা তা `isApproved`পদ্ধতি যাচাই করে। এটি বুলিয়ান মান জানায়।

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
