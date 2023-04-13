---
id: get-started
title: Magsimula
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Magsimula sa Matic.js
---

Ang `@matic.js` ay isang javascript library na tumutulong sa pakikipag-interaksyon sa iba't ibang bahagi ng Matic Network.

Dito sa tutorial na Upang Magsimula - aalamin natin ang tungkol sa kung paano tayo maaaring mag-setup at makipag-interaksyon sa POS bridge.

## Pag-install {#installation}

**I-install ang maticjs package sa pamamagitan ng npm:**

```bash
npm install @maticnetwork/maticjs
```

**I-install ang web3js plugin**

```bash
npm install @maticnetwork/maticjs-web3
```

## Pag-setup {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Sa code na nasa itaas, pinapasimulan natin ang maticjs gamit ang `web3js`, ngunit maaari mo ring pasimulan ang [ethers](/docs/develop/ethereum-polygon/matic-js/setup/ethers) sa katulad na paraan.

## POS client {#pos-client}

Tinutulungan tayo ng `POSClient` na makipag-interaksyon sa POS Bridge.

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

```

Pagkatapos pasimulan ang `POSClient`, kailangan nating pasimulan ang mga kinakailangang uri ng token tulad ng - `erc20`, `erc721` atbp.

Pasimulan natin ang `erc20` -

### erc20 {#erc20}

**gumawa ng erc20 child token**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**gumawa ng erc20 parent token**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

Kapag napasimulan na ang erc20, maaari kang mag-call ng iba't ibang paraan na magagamit, tulad ng - `getBalance`, `approve`, `deposit` , `withdraw` atbp.

Tingnan natin ang ilan sa mga halimbawa ng API -

#### get balance {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### approve {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


Tulad ng iyong nakikita, gamit ang mga simpleng API nito, sobrang pinapadali ng maticjs na makipag-interaksyon sa maticjs bridge. **Magsimula tayo sa paggawa ng isang bagay na kahanga-hanga**

### Kapaki-pakinabang na mga link {#useful-links}

- [Mga halimbawa](https://github.com/maticnetwork/matic.js/tree/master/examples)
