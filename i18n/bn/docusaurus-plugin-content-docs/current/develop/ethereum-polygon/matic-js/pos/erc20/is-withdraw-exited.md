---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: 'উইথড্র থেকে বেরিয়ে আসা হয়েছে কিনা তা যাচাই করে।'
---

উইথড্র থেকে বেরিয়ে আসা হয়েছে কিনা তা জানতে `isWithdrawExited`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
