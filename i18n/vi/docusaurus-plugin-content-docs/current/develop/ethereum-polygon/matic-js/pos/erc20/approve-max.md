---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Phê duyệt số lượng tối đa trên token gốc.'
---

Có thể sử dụng phương pháp `approveMax` để phê duyệt số lượng tối đa cho token gốc.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

Địa chỉ nơi phê duyệt được gọi là `spenderAddress`. Đây là người dùng bên thứ ba hoặc hợp đồng thông minh có thể thay mặt bạn chuyển token của bạn.

Theo mặc định, giá trị spenderAddress là địa chỉ thuộc tính erc20.

Bạn có thể chỉ định giá trị địa chỉ người gửi theo cách thủ công.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
