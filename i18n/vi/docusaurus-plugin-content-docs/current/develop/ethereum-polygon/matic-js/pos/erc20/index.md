---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "Cung cấp phương pháp tương tác với token ERC20."
---

# ERC20 {#erc20}

`POSClient` cung cấp phương pháp `erc20` giúp bạn tương tác với token **ERC20**.

Phương pháp này trả về đối tượng có nhiều phương pháp khác nhau.

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

Việc chuyển đối số thứ hai `isRoot` là tùy chọn.

## Token con {#child-token}

Có thể khởi tạo token trên polygon bằng cách sử dụng cú pháp này –

```
const childERC20Token = posClient.erc20(<child token address>);
```

## Token mẹ {#parent-token}

Có thể khởi tạo token trên ethereum bằng việc cung cấp giá trị tham số thứ hai như `true`.

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
