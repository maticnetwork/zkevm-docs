---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'PlasmaClientを使用すると、POSブリッジとやり取りできます。'
---

# Plasmaブリッジ {#plasma-bridge}

Plasmaブリッジ機能は、[別のリポジトリ](https://github.com/maticnetwork/maticjs-plasma)で利用できます。したがって、`plasma`ブリッジを使用するには、別のパッケージをインストールする必要があります。

## インストール {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## セットアップ {#setup}

`PlasmaClient`は、**Plasma**ブリッジとやり取りするために使用できます。

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

`plasmaClient`が開始されると、利用可能なすべてのAPIとやり取りできます。
