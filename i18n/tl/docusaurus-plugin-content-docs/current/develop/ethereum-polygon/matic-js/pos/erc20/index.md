---
id: index
title: POSClient
keywords:
    - pos client
    - erc20
    - contract
    - polygon
    - sdk
description: "Nagbibigay ng paraan upang makipag-interaksyon sa isang ERC20 token."
---

# ERC20 {#erc20}

Ibinibigay ng `POSClient` ang paraang `erc20` na tumutulong sa iyong makipag-interaksyon sa isang **ERC20** token.

Nagbabalik ang paraan ng isang object na may iba pang samot-saring paraan.

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

Opsyonal ang pagpasa ng mga pangalawang argument para sa `isRoot`.

## Child token {#child-token}

Maaaring pasimulan ang token sa polygon sa pamamagitan ng paggamit ng syntax na ito -

```
const childERC20Token = posClient.erc20(<child token address>);
```

## Parent token {#parent-token}

Maaaring pasimulan ang token sa ethereum sa pamamagitan ng pagbibigay sa value ng pangalawang parameter bilang `true`.

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
