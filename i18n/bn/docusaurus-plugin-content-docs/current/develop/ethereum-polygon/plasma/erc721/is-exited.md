---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# isExited {#isexited}

কোনো উইথড্র থেকে বেরিয়ে আসা হয়েছে কিনা তা `isExited`পদ্ধতি যাচাই করে। এটি বুলিয়ান মান জানায়।

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
