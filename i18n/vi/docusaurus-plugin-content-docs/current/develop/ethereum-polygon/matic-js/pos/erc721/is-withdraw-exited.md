---
id: is-withdraw-exited
title: isWithdrawExited
keywords:
- 'pos client, erc721, isWithdrawExited, polygon, sdk'
description: 'Kiểm tra xem chức năng rút tiền đã thoát hay chưa.'
---

Phương pháp `isWithdrawExited` kiểm tra xem chức năng rút tiền đã thoát hay chưa. Phương pháp này trả về giá trị boolean.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
