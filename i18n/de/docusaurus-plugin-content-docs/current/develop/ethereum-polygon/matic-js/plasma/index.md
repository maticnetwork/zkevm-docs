---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'PlasmaClient ermöglicht den Datenaustausch mit POS-Bridge.'
---

# Plasma-Bridge {#plasma-bridge}

Die Plasma-Bridge steht im [separaten Repository](https://github.com/maticnetwork/maticjs-plasma) zur Verfügung. Um die `plasma`-Bridge nutzen zu können, müssen Sie ein separates Paket installieren.

## Installation {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## Einrichtung {#setup}

`PlasmaClient`kann zum Datenaustausch mit **Plasma**-Bridge eingesetzt werden.

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

Sobald `plasmaClient` gestartet wurde, können Sie sich mit allen verfügbaren APIS austauschen.
