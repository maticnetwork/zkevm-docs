---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'PlasmaClient memungkinkan Anda berinteraksi dengan Jembatan POS.'
---

# Jembatan Plasma {#plasma-bridge}

Fungsi jembatan plasma tersedia dalam [repositori terpisah](https://github.com/maticnetwork/maticjs-plasma). Jadi, untuk menggunakan jembatan `plasma`, Anda harus menginstal paket terpisah.

## Instalasi {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## Pengaturan {#setup}

`PlasmaClient` dapat digunakan untuk berinteraksi dengan Jembatan **Plasma**.

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

Setelah `plasmaClient` dimulai, Anda dapat berinteraksi dengan semua API yang tersedia.
