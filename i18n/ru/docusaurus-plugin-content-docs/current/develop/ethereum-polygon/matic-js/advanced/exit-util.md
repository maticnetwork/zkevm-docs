---
id: exit-util
title: ExitUtil
keywords:
- 'exit util, api type, read, write, polygon'
description: 'Генерировать доказательство с помощью класса ExitUtil.'
---

`matic.js` на внутреннем уровне использует `ExitUtil` для генерации доказательства. Это класс, в котором имеются различные методы для оказания помощи в работе с утилитами выхода.

## buildPayloadForExit {#buildpayloadforexit}

Выявляет метод `buildPayloadForExit`, который можно использовать для генерации доказательства.

```
import { ExitUtil, RootChain, use, Web3SideChainClient } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { from, privateKey, RPC } from "./config";
use(Web3ClientPlugin);


const client = new Web3SideChainClient<any>();
// initiate client
await client.init({
    // log: true,
    network: 'testnet',
    version: 'mumbai',
    parent: {
        provider: new HDWalletProvider(privateKey, RPC.parent),
        defaultConfig: {
            from
        }
    },
    child: {
        provider: new HDWalletProvider(privateKey, RPC.child),
        defaultConfig: {
            from
        }
    }
});

// create root chain instance
const rootChain = new RootChain(client, <root chain address>);

// create exitUtil Instance
const exitUtil = new ExitUtil(client, rootChain);

// generate proof
const proof = await exitUtil.buildPayloadForExit(
    <burn tx hash>,
    <log event signature>,
    <isFast>
)

```

### Генерация доказательства с помощью мостового клиента {#generating-proof-using-bridge-client}

Каждый мостовой клиент, включая **POSClient**, **PlasmaClient**, выявляет свойство `exitUtil`.

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, mainRPC),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, childRPC),
      defaultConfig: {
        from : fromAddress
      }
    }
});

const proof = await posClient.exitUtil.buildPayloadForExit(
    <burn tx hash>,
    <log event signature>,
    <isFast>
)
```