---
id: get-started
title: Başlangıç
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Matic.js kullanmaya başlayın
---

`@matic.js`, Matic Ağı'nın çeşitli bileşenleri ile etkileşim kurmaya yardımcı olan bir javascript kütüphanesidir.

Bu Başlangıç eğitiminde - POS köprüsü ayarlarını yapmayı ve onunla etkileşim kurmayı öğreneceğiz.

## Kurulum {#installation}

**Npm üzerinden maticjs paketini kurun:**

```bash
npm install @maticnetwork/maticjs
```

**Web3js eklentisini kurun**

```bash
npm install @maticnetwork/maticjs-web3
```

## Ayarlar {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

Yukarıdaki kodda maticjs'yi `web3js` ile başlatıyoruz ama [ethers](/docs/develop/ethereum-polygon/matic-js/setup/ethers) ile de benzer şekilde başlatabilirsiniz.

## POS istemcisi {#pos-client}

`POSClient`, POS Köprüsü ile etkileşim kurmamıza yardımcı olur.

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

`POSClient` başlatıldıktan sonra - `erc20`, `erc721`, vb. gibi gerekli token türlerini başlatmamız gerekir.

Gelin, `erc20` başlatalım -

### erc20 {#erc20}

**erc20 alt token oluştur**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**erc20 üst token oluştur**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

Erc20 başlatıldıktan sonra - `getBalance`, `approve`, `deposit` , `withdraw`, vb. gibi mevcut olan çeşitli metotları çağırabilirsiniz.

Birkaç API örneği görelim -

#### bakiye al {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### onayla {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


Gördüğünüz gibi, maticjs basit API'leri sayesinde maticjs köprüsü ile etkileşim kurmayı oldukça kolaylaştırıyor. **Haydi muhteşem bir şeyler yaratmaya başlayalım**

### Faydalı bağlantılar {#useful-links}

- [Örnekler](https://github.com/maticnetwork/matic.js/tree/master/examples)
