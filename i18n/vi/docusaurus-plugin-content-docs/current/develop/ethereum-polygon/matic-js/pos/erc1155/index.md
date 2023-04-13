---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'Tương tác với token ERC1155 bằng matic.js.'
---

# ERC1155 {#erc1155}

`POSClient` cung cấp phương pháp `erc1155` giúp bạn tương tác với token erc1155.

Phương pháp trả về ví dụ lớp **ERC1155** có chứa các phương pháp khác nhau.

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

Việc chuyển đối số thứ hai `isRoot` là tùy chọn.

## Token con {#child-token}

Có thể khởi tạo token trên polygon bằng cách sử dụng cú pháp này –

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## Token mẹ {#parent-token}

Có thể khởi tạo token trên ethereum bằng cách cung cấp giá trị tham số thứ hai là `true`.

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
