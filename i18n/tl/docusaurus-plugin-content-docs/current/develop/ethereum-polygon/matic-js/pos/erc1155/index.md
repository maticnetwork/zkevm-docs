---
id: index
title: POSClient
keywords:
- 'pos client, erc1155, contract, polygon, sdk'
description: 'Makipag-interaksyon sa ERC1155 token gamit ang matic.js.'
---

# ERC1155 {#erc1155}

Ibinibigay ng `POSClient` ang paraang `erc1155` na tumutulong sa iyong makipag-interaksyon sa isang erc1155 token.

Nagbabalik ang paraan ng instance ng **ERC1155** class na naglalaman ng iba't ibang paraan.

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

Opsyonal ang pagpasa ng mga pangalawang argument para sa `isRoot`.

## Child token {#child-token}

Maaaring pasimulan ang token sa polygon sa pamamagitan ng paggamit ng syntax na ito -

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## Parent token {#parent-token}

Maaaring pasimulan ang token sa ethereum sa pamamagitan ng pagbibigay ng value ng pangalawang parameter bilang `true`.

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
