---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'O PlasmaClient permite interagir com a PoS Bridge.'
---

# Plasma Bridge {#plasma-bridge}

A funcionalidade Plasma Bridge está disponível num [repositório separado](https://github.com/maticnetwork/maticjs-plasma). Então, para usar a bridge `plasma`, tem que instalar um pacote separado.

## Instalação {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## Configuração {#setup}

`PlasmaClient` pode ser usado par interagir com a **Plasma** Bridge.

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

Assim que `plasmaClient` for iniciado, você pode interagir com todas as APIS disponíveis.
