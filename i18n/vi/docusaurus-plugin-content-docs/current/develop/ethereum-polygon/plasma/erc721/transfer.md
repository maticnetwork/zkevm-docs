---
id: transfer
title: chuyển
keywords:
- 'plasma client, erc721, transfer, polygon, sdk'
description: 'Bắt đầu sử dụng maticjs'
---

# Chuyển {#transfer}

Phương pháp `transfer` chuyển token từ người dùng này sang người dùng khác.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

```
