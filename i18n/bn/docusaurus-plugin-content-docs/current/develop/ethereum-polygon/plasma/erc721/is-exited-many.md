---
id: is-exited-many
title: isExitedMany
keywords:
- 'plasma client, erc721, isExitedMany, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# isExitedMany {#isexitedmany}

কোনো উইথড্র থেকে বেরিয়ে আসা হয়েছে কিনা তা `isExitedMany`পদ্ধতি যাচাই করে। এটি বুলিয়ান মান জানায়।

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
