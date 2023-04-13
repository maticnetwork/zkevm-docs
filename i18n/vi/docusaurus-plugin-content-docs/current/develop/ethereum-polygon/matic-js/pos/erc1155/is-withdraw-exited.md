---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc1155, isWithdrawExited, polygon, sdk'
description: 'Kiểm tra xem đã thoát chức năng rút tiền hay chưa.'
---

Phương pháp `isWithdrawExited` kiểm tra xem đã thoát chức năng rút tiền hay chưa. Phương pháp này trả về giá trị boolean.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
