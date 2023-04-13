---
id: eth
title: ETH Yatırma ve Çekme Kılavuzu
sidebar_label: ETH
description: "Polygon ağı üzerinde ETH token'larını yatırın ve çekin."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - eth
image: https://matic.network/banners/matic-network-16x9.png
---

### Yüksek Seviye Akış {#high-level-flow}

#### **ETH Yatırma (1 adımlı işlem)**

Token'ların Polygon sözleşmesi içinde yatırıldığı ve Polygon ağı üzerinde kullanılabildiği noktada **deposit** fonksiyonu çağrılmalıdır.

#### **ETH Transferi**

Polygon üzerinde fonlarınız mevcut olduğunda, o fonları başkalarına anında gönderim için kullanabilirsiniz.

#### **ETH Çekme (3 adımlı işlem)**

1. Fon çekme Polygon üzerinden başlatılır. 30 dakika mins için yaklaşık 10 dakika bekleyin) bir kontrol noktası aralığı ayarlanır ve Polygon blok katmanı üzerindeki tüm blokların son kontrol noktasından bu yana doğrulanması sağlanır.
2. Kontrol noktası ERC20 sözleşmesi ana zincir için sunulduğunda, bir NFT Çıkış (ERC721) tokeni eşdeğer değerden oluşturulur.
3. Çekilen fonlar, bir işlem-çıkış prosedürü kullanılarak ana zincir sözleşmesinden ERC20 acccount hesabınıza geri talep edilebilir.

## Kurulum Detayları {#setup-details}

### Matic SDK'yı Yapılandırma {#configuring-matic-sdk}

Matic SDK yükleyin (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

Maticjs istemcisini başlatma

```js
// const use = require('@maticnetwork/maticjs').use
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')
const { PlasmaClient } = require('@maticnetwork/maticjs-plasma')
const { use } = require('@maticnetwork/maticjs')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')

// install web3 plugin
use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const from = config.user1.address

async function getPlasmaClient (network = 'testnet', version = 'mumbai') {
  try {
    const plasmaClient = new PlasmaClient()
    return plasmaClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from
        }
      },
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from
        }
      }
    })
  } catch (error) {
    console.error('error unable to initiate plasmaClient', error)
  }
}
```

### process.env {#process-env}

Bu dosya için `process.env`aşağıdaki içeriğe sahip olan kök dizininde yeni bir dosya oluşturun:

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## deposit {#deposit}

**mevduat **: Mevduat sözleşmeyi `depositEther()`çağırarak `depositManagerContract`yapılabilir.

Bu tokenin önceden eşlenmesi ve transfer için onaylanması gerektiğini unutmayın.

```js
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const result = await client.depositEther(100, from);

  const txHash = await result.getTransactionHash();
  const receipt = await result.getReceipt();

};

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
```

:::note

Ethereum'dan Polygon için depozito bir devlet senkronizasyon mekanizması kullanılarak gerçekleşir ve yaklaşık 22-30 dakika sürer. Bu zaman aralığını bekledikten sonra, web3.js/matic.js kütüphanesi veya Metamask kullanarak bakiyenin kontrol edilmesi önerilir. Gezgin (explorer) yalnızca alt zincirde en az bir varlık transferi gerçekleştiğinde bakiyeyi gösterir. Fon yatırma olaylarının nasıl takip edileceği bu [bağlantıda](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) açıklanmaktadır.

:::

## transfer {#transfer}

Polygon ağı üzerinde ETH, WETH(ERC20 Token) olarak yer alır.

```js
const { getPlasmaClient, from, plasma, to } = require('../utils')

const amount = '1000000000' // amount in wei
const token = plasma.child.erc20

async function execute () {
  try {
    const plasmaClient = await getPlasmaClient()
    const erc20Token = plasmaClient.erc20(token)
    const result = await erc20Token.transfer(amount, to, { gasPrice: 1000000000 })
    const txHash = await result.getTransactionHash()
  } catch (error) {
    console.log(error)
  }
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

## Fon çekme {#withdraw}

### 1. Yakma {#1-burn}

Kullanıcılar `getERC20TokenContract`çocuk token sözleşmesinin `withdraw`işlevini çağırabilirler. Bu fonksiyon token'ları yakacaktır. Polygon Plazma istemcisi bu çağrıyı yapmak için `withdrawStart`metotu ortaya çıkarır.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)

  const txHash = await result.getTransactionHash()
  const receipt = await result.getReceipt()

}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

Kullanıcılar sözleşmenin `startExitWithBurntTokens()`işlevini `erc20Predicate`çağırabilirler. Polygon Plazma istemcisi bu çağrıyı yapma `withdrawConfirm()`yöntemini ortaya çıkarır. Bu fonksiyon ancak denetim noktası ana zincirde dâhil edildiğinde çağrılabilir. Denetim noktasının dâhil edilmesi bu [kılavuz](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma.md#checkpoint-events) izlenerek takip edilebilir.


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. İşlemden Çıkış {#3-process-exit}

Bir kullanıcı `withdrawManager`sözleşmenin `processExits()`işlevini çağırmalı ve yanma kanıtını sunmalıdır. Geçerli bir kanıt gönderdikten sonra, tokenler kullanıcıya aktarılır. Polygon Plazma istemcisi bu çağrıyı yapmak için `withdrawExit()`metotu ortaya çıkarır.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);
  const result = await erc20Token.withdrawExit();

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

Polygon üzerinden her ~ 5 dakikada bir Ethereum zincirine yapılan işlemlerin bir temsili olan bir kontrol noktası, Ethereum sözleşmesi ana zincir için düzenli olarak gönderilir.

:::