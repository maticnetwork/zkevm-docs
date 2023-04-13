---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# ERC721 {#erc721}

`plasmaClient` cung cấp phương pháp `erc721` giúp bạn tương tác với token erc721.

Phương pháp này trả về một đối tượng có nhiều phương pháp khác nhau.

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## Token con {#child-token}

Có thể khởi tạo token trên polygon bằng cách sử dụng cú pháp này –

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## Token mẹ {#parent-token}

Có thể khởi tạo token trên ethereum bằng cách cung cấp giá trị tham số thứ hai là `true`.

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
