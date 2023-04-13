---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "Lấy số lượng được phê duyệt cho người dùng."
---

Có thể sử dụng phương pháp `getAllowance` để lấy số lượng được phê duyệt cho người dùng.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

Địa chỉ nơi phê duyệt được gọi là `spenderAddress`. Đây là người dùng bên thứ ba hoặc hợp đồng thông minh có thể thay mặt bạn chuyển token của bạn.

Theo mặc định, giá trị spenderAddress là địa chỉ thuộc tính erc20.

Bạn có thể chỉ định giá trị địa chỉ người gửi theo cách thủ công.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
