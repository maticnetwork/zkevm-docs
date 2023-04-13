---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'PlasmaClient vous permet d''interagir avec le Pont PoS.'
---

# Pont Plasmique {#plasma-bridge}

La fonctionnalité du pont plasmique est disponible dans un [répertoire séparé](https://github.com/maticnetwork/maticjs-plasma). Ainsi, pour utiliser`plasma` le pont, vous devez installer un paquet séparé.

## Installation {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## Configuration {#setup}

`PlasmaClient`peut être utilisé pour interagir avec **le Pont **Plasmique.

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

Une fois `plasmaClient` lancé, vous pouvez interagir avec tous les APIS disponibles.
