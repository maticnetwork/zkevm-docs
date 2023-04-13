---
id: erc20
title: ERC20 Yatırma ve Çekme Kılavuzu
sidebar_label: ERC20
description:  "Polygon ağı üzerinde ERC20 token'ları yatırın ve çekin."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

Kullanmaya başlamak ve güncel metotları görüntülemek için [Plasma ERC20 ile ilgili en güncel Matic.js belgelerini](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/) inceleyin.

### Yüksek Seviye Akış {#high-level-flow}

#### **ERC20 Yatırma (2 adımlı işlem)**

1. Token'ların ilk olarak Üst Zincir (Ethereum/Goerli) üzerindeki Polygon kök sözleşme için onaylanması gerekir.
2. Onaylandıktan sonra, token'ların Polygon sözleşmesi içinde yatırıldığı ve Polygon üzerinde kullanılabildiği noktada **deposit** fonksiyonu çağrılmalıdır.

#### **ERC 20 Transferi**

Polygon üzerinde fonlarınız mevcut olduğunda, o fonları başkalarına anında gönderim için kullanabilirsiniz.

#### **ERC20 Çekme (3 adımlı işlem)**

1. Fon çekme Polygon üzerinden başlatılır. 30 dakika mins için yaklaşık 10 dakika bekletilir) bir kontrol noktası aralığı ayarlanır ve Polygon blok katmanı üzerindeki tüm blokların son kontrol noktasından bu yana doğrulanması sağlanır.
2. Kontrol noktası ERC20 sözleşmesi ana zincir için sunulduğunda, bir NFT Çıkış (ERC721) tokeni eşdeğer değerden oluşturulur.
3. Çekilen fonlar, bir işlem-çıkış prosedürü kullanılarak ana zincir sözleşmesinden ERC20 acccount hesabınıza geri talep edilebilir.

## Kurulum Detayları {#setup-details}

### Polygon Edge Yapılandırma {#configuring-polygon-edge}

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

**Yaklaşım**: Bu normal bir ERC20 onayıdır, bu nedenle fonksiyonu `depositManagerContract``transferFrom()`çağırabilirsiniz. Polygon Plazma istemcisi bu çağrıyı yapma `erc20Token.approve()`yöntemini ortaya çıkarır.

**deposit**: Fon yatırma depositManagerContract sözleşmesi üzerinde **_depositERC20ForUser_** çağırılarak yapılabilir.

Token'ın transferden önce eşlenmiş ve onaylanmış olması gerektiğini aklınızda bulundurun.

Bu çağrı için **_erc20Token.deposit_** metodunu kullanın.


```js
const { getPlasmaClient, plasma, from } = require('../utils')

const amount = '1000000000000000000' // amount in wei
const token = plasma.parent.erc20

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token, true)
  const result = await erc20Token.deposit(amount, from)
  const receipt = await result.getReceipt()
  console.log(receipt)
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

:::note

Ethereum'dan Polygon için depozito bir devlet senkronizasyon mekanizması kullanılarak gerçekleşir ve yaklaşık 5-7 dakika sürer. Bu zaman aralığını bekledikten sonra, web3.js/matic.js kütüphanesi veya Metamask kullanarak bakiyenin kontrol edilmesi önerilir. Gezgin (explorer) yalnızca alt zincirde en az bir varlık transferi gerçekleştiğinde bakiyeyi gösterir. Fon yatırma olaylarının nasıl takip edileceği bu [bağlantıda](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) açıklanmaktadır.

:::

## transfer {#transfer}

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
    const receipt = await result.getReceipt()
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

Kullanıcılar `getERC20TokenContract`çocuk token sözleşmesinin `withdraw()`işlevini çağırabilirler. Bu fonksiyon token'ları yakacaktır. Polygon Plazma istemcisi bu çağrıyı yapma `withdrawStart()`yöntemini ortaya çıkarır.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)
  console.log(await result.getReceipt())
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)

```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

Kullanıcı **_erc20Predicate_** sözleşmesinin **_startExitWithBurntTokens_** fonksiyonunu çağırabilir. Polygon Plasma istemcisi bu çağrıyı yapmak için **_withdrawConfirm_** metodunu açar. Bu fonksiyon ancak denetim noktası ana zincirde dâhil edildiğinde çağrılabilir. Denetim noktasının dâhil edilmesi bu [kılavuz](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events) izlenerek takip edilebilir.


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. İşlemden Çıkış {#3-process-exit}

Kullanıcı **_withdrawManager_** sözleşmesinin **_processExits_** fonksiyonunu çağırmalı ve yakma kanıtını göndermelidir. Geçerli bir kanıt gönderdikten sonra, tokenler kullanıcıya aktarılır. Polygon Plasma istemcisi bu çağrıyı yapmak için **_withdrawExit_** metodunu açar.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawExit()
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

Polygon Ağı'nda meydana gelen tüm işlemlerin her ~ 30 dakikada bir ERC20 zincirine temsili olan bir kontrol noktası düzenli olarak ERC20 sözleşmesi ana zinciri için gönderilir.

:::