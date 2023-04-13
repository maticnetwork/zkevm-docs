---
id: is-exited
title: isExited
keywords:
- 'plasma client, erc721, isExited, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# isExited {#isexited}

Phương pháp `isExited` kiểm tra xem đã thoát chức năng rút tiền hay chưa. Phương pháp này trả về giá trị boolean.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
