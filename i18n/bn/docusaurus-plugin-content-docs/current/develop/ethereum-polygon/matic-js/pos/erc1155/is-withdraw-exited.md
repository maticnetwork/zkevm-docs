---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: 'কোনো উইথড্র থেকে বেরিয়ে আসা হয়েছে কিনা তা যাচাই করে।'
---

কোনো উইথড্র থেকে বেরিয়ে আসা হয়েছে কিনা তা `isWithdrawExited`পদ্ধতি যাচাই করে। এটি বুলিয়ান মান জানায়।

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
