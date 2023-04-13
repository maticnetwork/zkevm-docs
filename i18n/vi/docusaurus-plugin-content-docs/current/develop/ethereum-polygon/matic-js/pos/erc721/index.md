---
id: index
title: POSClient
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: 'Phương pháp "ERC721" giúp bạn tương tác với token ERC721.'
---

# ERC721 {#erc721}

`POSClient` cung cấp phương pháp `erc721` giúp bạn tương tác với token erc721.

Phương pháp này trả về một đối tượng có nhiều phương pháp khác nhau.

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

Việc chuyển đối số thứ hai `isRoot` là tùy chọn.

## Token con {#child-token}

Có thể khởi tạo token trên polygon bằng cách sử dụng cú pháp này –

```
const childERC20Token = posClient.erc721(<child token address>);
```

## Token mẹ {#parent-token}

Có thể khởi tạo token trên ethereum bằng cách cung cấp giá trị tham số thứ hai là `true`.

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
