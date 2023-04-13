---
id: exit-util
title: ExitUtil
keywords:
- 'exit util, api type, read, write, polygon'
description: 'ExitUtil क्लास के साथ सबूत तैयार करें.'
---

`matic.js`सबूत बनाने के `ExitUtil`लिए आंतरिक रूप से का इस्तेमाल करें. यह एक क्लास है जिसमें exit utilities के साथ मदद करने के लिए अलग तरीके हैं.

## एक्ज़िट के लिए पेलोड निर्मित करें {#buildpayloadforexit}

यह `buildPayloadForExit`तरीका उजागर करता है जिसका इस्तेमाल सबूत बनाने के लिए इस्तेमाल किया जा सकता है.

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

### ब्रिज क्लाइंट का इस्तेमाल करके सबूत बनाना {#generating-proof-using-bridge-client}

**POSClient**, **PlasmaClient** सहित ब्रिज क्लाइंट, प्रॉपर्ट`exitUtil`ी को उजागर करता है.

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
