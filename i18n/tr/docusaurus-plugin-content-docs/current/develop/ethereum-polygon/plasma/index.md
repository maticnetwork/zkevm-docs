---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'PlasmaClient PoS Köprüsü ile etkileşim kurmanıza izin verir.'
---

# Plasma Köprüsü {#plasma-bridge}

Plasma köprüsü işlevleri [ayrı bir bilgi deposunda](https://github.com/maticnetwork/maticjs-plasma) sunulmaktadır. Bu nedenle `plasma` köprüsünü kullanmak için ayrı bir paket kurmanız gerekir.

## Kurulum {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## Ayarlar {#setup}

`PlasmaClient`, **Plasma** Bridge ile etkileşim kurmak için kullanılabilir.

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

`plasmaClient` başlatıldıktan sonra mevcut tüm API'ler ile etkileşim kurabilirsiniz.
