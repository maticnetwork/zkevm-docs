---
id: custom-tokens
title: How to add custom tokens in Arkane?
sidebar_label: Custom Tokens
description: Support for custom ERC20 / ERC721 and ERC1155 tokens on Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

> Custom fungible and non fungible tokens

### Fungible
A developer can easily add support for their custom ERC20 token by creating a small pull request containing the token details toward the [Arkane Git repository](https://github.com/ArkaneNetwork/content-management/tree/master/tokens). Here is a quote snipped of the information you need to provide:
```
{"name":"SAND","symbol":"SAND","address":"0x3845badade8e6dff049820680d1f14bd3903a5d0","decimals":18,"type":"ERC20"}
```
Or you can always contact them via the in-app chat and ask to add your token.

### Non fungible
Arkane has developed its service is such a way that it will automaticlly 🤩 pick up custom created NFTs if they follow the ERC721 and ERC1155 standard. Making it to date the only wallet that is able to show all NFTs that live on the Polygon blockchains.

![The Hulk ERC1155 NFT on Polygon](img/09.png)
