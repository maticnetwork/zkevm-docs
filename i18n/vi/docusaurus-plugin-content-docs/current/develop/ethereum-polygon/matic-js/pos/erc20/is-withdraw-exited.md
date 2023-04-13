---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc20, isWithdrawExited, polygon, sdk'
description: 'Kiểm tra xem đã thoát tính năng rút tiền hay chưa.'
---

Có thể sử dụng phương pháp `isWithdrawExited` để biết liệu đã thoát tính năng rút tiền hay chưa.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

const isExited = await erc20Token.isWithdrawExited(<burn tx hash>);
```
