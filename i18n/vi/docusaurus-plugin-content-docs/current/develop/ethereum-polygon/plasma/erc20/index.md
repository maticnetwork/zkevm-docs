---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# ERC20 {#erc20}

`plasmaClient` cung cấp phương pháp `erc20` giúp bạn tương tác với token erc20.

## Token con {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## Token gốc {#root-token}

Có thể khởi tạo token gốc bằng cách cung cấp giá trị tham số thứ hai là `true`.

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
