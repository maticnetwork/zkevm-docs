---
id: getting-started
title: Matic.js Kullanmaya Başlama
sidebar_label: Instantiating Matic.js
description: "Polygon PoS zinciri ile etkileşim kurmak için Matic.js kullanın."
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

Başlamak için en yeni [Matic.js belgelerini](/docs/develop/ethereum-polygon/matic-js/get-started) inceleyin.

## Hızlı Özet {#quick-summary}

Matic.js SDK, Polygon'un tüm işlem gücünü parmaklarınızın ucuna getirir. Onay, fon yatırma ve çekme işlemlerine imkân veren özel olarak oluşturulmuş fonksiyonlar sizi gereksiz işlerden kurtarır. Bunu tasarlamaktaki amacımız, platformumuzdan anında değer elde etmenizi sağlamaktır.

## Kurulum {#installation}
Polygon'un harika gücünden SDK'mız ile faydalanmanın ilk adımı, SDK'nın bir NPM kurulumunu yapmaktır. [Buradan](https://www.npmjs.com/package/@maticnetwork/maticjs) erişebilirsiniz.

```bash
npm install @maticnetwork/maticjs
npm install @maticnetwork/maticjs-web3
npm install @maticnetwork/maticjs-ethers
```

## Kullanım {#usage}
SDK'e erişmek için şunu kullanarak SDK'i uygulamanızda içe aktarın
```js
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin)
```

Bu sağlayıcılar RPC URL'leri veya MetaMask sağlayıcısı, URLs vb. Gibi web 3 tabanlı sağlayıcılar olabilir.

Daha fazla bilgi için [PoS Matic.js belgelerine](https://maticnetwork.github.io/matic.js/docs/pos/) göz atın.

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
