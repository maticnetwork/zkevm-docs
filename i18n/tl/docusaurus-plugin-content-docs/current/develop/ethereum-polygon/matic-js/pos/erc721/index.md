---
id: index
title: POSClient
keywords:
- 'pos client, erc721, contract, polygon, sdk'
description: '`ERC721` na paraan na tumutulong sa iyong makipag-interaksyon sa isang ERC721 token.'
---

# ERC721 {#erc721}

ay `POSClient` nagbibigay `erc721` ng paraan na tumutulong sa iyong makipag-interaksyon sa isang er721 token.

Nagbabalik ang paraang ito ng isang object na may iba't ibang paraan.

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

Opsyonal ang pagpasa ng mga pangalawang argument para sa `isRoot`.

## Child token {#child-token}

Maaaring pasimulan ang token sa polygon sa pamamagitan ng paggamit ng syntax na ito -

```
const childERC20Token = posClient.erc721(<child token address>);
```

## Parent token {#parent-token}

Maaaring pasimulan ang token sa ethereum sa pamamagitan ng pagbibigay ng value ng pangalawang parameter bilang `true`.

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
