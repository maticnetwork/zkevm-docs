---
id: exit-util
title: ExitUtil
keywords:
- 'exit util, api type, read, write, polygon'
description: 'ExitUtil 클래스를 사용해 증명을 생성합니다.'
---

증명 생성을 위해 `matic.js`는 내부적으로 `ExitUtil`을 사용합니다. 이는 종료 유틸리티를 지원하기 위한 다양한 메서드가 있는 클래스입니다.

## buildPayloadForExit {#buildpayloadforexit}

증명 생성을 위해 사용될 수 있는 `buildPayloadForExit` 메서드를 제공합니다.

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

### 브리지 클라이언트를 사용해 증명 생성하기 {#generating-proof-using-bridge-client}

**POSClient**, **PlasmaClient**를 포함한 모든 브리지 클라이언트는 `exitUtil` 속성을 제공합니다.

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
