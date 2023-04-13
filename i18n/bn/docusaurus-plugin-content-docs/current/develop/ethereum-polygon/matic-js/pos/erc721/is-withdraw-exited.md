---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: ' কোনো উইথড্র থেকে বেরিয়ে আসা হয়েছে কিনা তা যাচাই করে।'
---

কোনো উইথড্র থেকে বেরিয়ে আসা গিয়েছে কিনা তা `isWithdrawExited`পদ্ধতি যাচাই করে। এটি বুলিয়ান মান জানায়।

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
