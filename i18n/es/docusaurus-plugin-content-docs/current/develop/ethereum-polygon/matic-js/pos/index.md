---
id: index
title: 'POSClient (Cliente de pruebas de participación [PoS])'
keywords:
- 'maticjs, pos client, contract, polygon, sdk'
description: 'El cliente de PoS te permite interactuar con el puente de PoS.'
---

`maticjs` proporciona `POSClient` para interactuar con el puente de **PoS**.

```
import { POSClient,use } from "@maticnetwork/maticjs"

const posClient = new POSClient();

await posClient.init({
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

Cuando se inicia `POSClient`, puedes interactuar con todas las API disponibles.
