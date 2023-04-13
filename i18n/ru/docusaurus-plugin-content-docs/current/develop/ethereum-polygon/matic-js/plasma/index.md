---
id: index
title: PlasmaClient
keywords:
- 'maticjs, plasma client, contract, polygon, sdk'
description: 'PlasmaClient позволяет взаимодействовать с мостом POS.'
---

# Мост Plasma {#plasma-bridge}

Функция моста Plasma доступна в [отдельном хранилище](https://github.com/maticnetwork/maticjs-plasma). Поэтому для использования моста `plasma` необходимо установить отдельный пакет.

## Установка {#installation}

```
npm i @maticnetwork/maticjs-plasma
```

## Настройка {#setup}

`PlasmaClient` можно использовать для взаимодействия с мостом **Plasma**.

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

После инициирования `plasmaClient` вы сможете взаимодействовать со всеми доступными API.
