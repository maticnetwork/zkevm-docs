---
id: getting-started
title: Начало работы с Matic.js
sidebar_label: Instantiating Matic.js
description: "Используйте Matic.js для взаимодействия с цепочкой Polygon PoS."
keywords:
  - docs
  - matic
  - polygon
  - sdk
  - matic.js
  - pos
image: https://matic.network/banners/matic-network-16x9.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Для начала ознакомьтесь с актуальной документацией по [Matic.js](/docs/develop/ethereum-polygon/matic-js/get-started).

## Краткий обзор {#quick-summary}

matic.js SDK берет всю вычислительную мощность Polygon и дает ее в ваше распоряжение. Благодаря пользовательским функциям, которые поддерживают утверждение, депозиты и выводы, процесс выполняется без лишних сложностей. Мы спроектировали такую систему, чтобы дать вам возможность мгновенного извлечения пользы из нашей платформы.

## Установка {#installation}
Первый шаг к использованию потрясающих возможностей Polygon через наш SDK заключается в выполнении установки через NPM. Информацию можно найти [здесь](https://www.npmjs.com/package/@maticnetwork/maticjs).

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## Использование {#usage}
Для доступа к SDK его следует импортировать в приложение, используя
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

Поставщики могут быть URL-адреса RPC или провайдеры на базе web3, такие как поставщик MetaMask, HDWalletProvider и т.д.

Более подробную информацию можно найти в [документации Matic.js по PoS](https://maticnetwork.github.io/matic.js/docs/pos/).

```js
// for mumbai testnet
const getPOSClient = (network = 'testnet', version = 'mumbai') => {
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
