---
id: index
title: PlasmaClient (Cliente de Plasma)
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'PlasmaClient te permite interactuar con el puente de prueba de participación (POS).'
---

# Puente de Plasma {#plasma-bridge}

La funcionalidad del puente de Plasma está disponible en un [repositorio independiente](https://github.com/maticnetwork/maticjs-plasma). Así que, para utilizar el puente `plasma`, tienes que instalar un paquete independiente.

## Instalación {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## Configuración {#setup}

`PlasmaClient` se puede utilizar para interactuar con el puente de **Plasma**.

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

Una vez que se inicie `plasmaClient`, podrás interactuar con todas las interfaces de programación de aplicaciones (API) disponibles.
