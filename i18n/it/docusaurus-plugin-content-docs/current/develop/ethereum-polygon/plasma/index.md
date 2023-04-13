---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'PlasmaClient ti permette di interagire con il bridge POS.'
---

# Plasma Bridge {#plasma-bridge}

La funzionalità del Plasma bridge è disponibile in un [repository separato](https://github.com/maticnetwork/maticjs-plasma). Pertanto, per usare il bridge `plasma` devi installare un pacchetto separato.

## Installazione {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## Configurazione {#setup}

`PlasmaClient` può essere utilizzato per interagire con **Plasma** Bridge.

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

Dopo aver avviato `plasmaClient`, puoi interagire con tutte le API disponibili.
