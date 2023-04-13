---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'Pahihintulutan ka ng PlasmaClient na makipag-interaksyon sa POS Bridge.'
---

# Plasma Bridge {#plasma-bridge}

Available ang functionality ng Plasma bridge sa [hiwalay na repository](https://github.com/maticnetwork/maticjs-plasma). Kaya upang magamit ang `plasma`bridge, kailangan mong mag-install ng hiwalay na package.

## Pag-install {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## Pag-setup {#setup}

Maaaring gamitin ang `PlasmaClient`upang makipag-interaksyon sa P**lasma **Bridge.

```
import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

Sa sandaling pinagana ang `plasmaClient`, maaari kang makipag-interaksyon sa lahat ng available na API.
