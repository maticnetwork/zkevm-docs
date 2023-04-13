---
id: index
title: plasmaClient
keywords:
- 'plasma client, erc721, contract, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# Ang ERC721 {#erc721}

ay `plasmaClient` nagbibigay `erc721` ng paraan na tumutulong sa iyong makipag-interaksyon sa isang er721 token.

Ibinabalik ng paraang ito ang isang object na may iba't ibang paraan.

```
const erc721token = plasmaClient.erc721(<token address>,<isRoot>);
```

## Child token {#child-token}

Maaaring pasimulan ang token sa polygon sa pamamagitan ng paggamit ng syntax na ito -

```
const childERC20Token = plasmaClient.erc721(<child token address>);
```

## Parent token {#parent-token}

Maaaring pasimulan ang token sa ethereum sa pamamagitan ng pagbibigay ng value ng pangalawang parameter bilang `true`.

```
const parentERC20Token = plasmaClient.erc721(<parent token address>, true);
```
