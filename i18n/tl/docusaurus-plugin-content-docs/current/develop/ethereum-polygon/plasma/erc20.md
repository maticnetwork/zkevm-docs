---
id: erc20
title: Gabay sa Pagdeposito at Pag-withdraw ng ERC20
sidebar_label: ERC20
description:  "Magdeposito at mag-withdraw ng mga token ng ERC20 sa network ng Polygon."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

Pakisuri ang pinakabagong [dokumentasyon ng Matic.js sa Plasma ERC20](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/) upang makapagsimula at tingnan ang up-to-date na mga pamamaraan.

### Daloy ng Mataas na Antas  {#high-level-flow}

#### **Magdeposito ng ERC20 (2 hakbang na proseso)**

1. Ang mga token ay kailangang maaprubahan muna sa kontrata ng Polygon rootchain sa Parent Chain (Ethereum/Goerli).
2. Sa sandaling maaprubahan, ang function ng **deposito** ay hihingin kung saan nadeposito ang mga token sa kontrata ng Polygon, at magagamit para sa Polygon.

#### **Pag-transfer ng ERC20**

Kapag mayroon ka nang mga pondo sa Polygon, maaari mong gamitin ang mga pondong iyon upang maipadala kaagad sa iba.

#### **i-withdraw ang erc20 (3 proseso ng hakbang)**

1. Ang pag-withdraw ng pondo ay magagawa sa Polygon. Nakatakda ang isang checkpoint interval ng 30 mins (para sa mga testnets na naghihintay sa mga 10 minuto) kung saan napatunayan ang lahat ng block layer ng Polygon dahil sa huling checkpoint.
2. Kapag isinumite ang checkpoint sa pangunahing kontrata ng ERC20, ang isang NFT Exit (ERC721) token ay nilikha ng katumbas na halaga.
3. Maaaring i-claim ang mga withdraw na pondo pabalik sa iyong ERC20 acccount mula sa pangunahing chain contract gamit ang isang proseso ng exit procedure.

## Mga Detalye ng Setup {#setup-details}

### Pag-configure ng Polygon Edge {#configuring-polygon-edge}

I-install ang Matic SDK (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

Pinagagana ang Maticjs kliyente

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

Gumawa ng bagong file sa root directory na pinangalanang `process.env`, gamit ang sumusunod na nilalaman:

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## deposit {#deposit}

**Approve**: Ito ay isang normal na aprubahan ng ERC20, kaya `depositManagerContract`maaaring tumawag sa `transferFrom()`function. Inilantad ng kliyente ng Polygon Plasma ang `erc20Token.approve()`paraan para gawin ang tawag na ito.

**deposito**: Puwedeng magdeposito sa pamamagitan ng pagtawag sa **_depositoERC20ForUser_** sa kontrata ng depositManagerContract.

Tandaan na ang token ay kailangan munang ma-map at maaprubahan para sa pag-transfer.

**_erc20Token.deposit_** na paraan upang gawin ang tawag na ito.


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

Ethereum ang mga deposito mula sa Ethereum hanggang sa Polygon gamit ang isang state sync mechanism at tumagal ng mga 5-7 minuto. Pagkatapos hintayin ang agwat ng oras na ito, inirerekomendang itsek ang balanse gamit ang web3.js/matic.js library o gamit ang Metamask.  Ipapakita ng explorer ang balanse kung may kahit  paglipat ng asset ang nangyari sa child chain. Ipinaliwanag ng [link](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) na ito kung paano subaybayan ang mga deposito.

:::

## paglipat {#transfer}

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

## Withdraw {#withdraw}

### 1. Burn {#1-burn}

Maaaring tawagin ng mga user ang `withdraw()`function ng `getERC20TokenContract`bata token contract. Dapat masunog ng na tungkulin ito ang mga token.  Inilantad ng kliyente ng Polygon Plasma ang `withdrawStart()`paraan para gawin ang tawag na ito.

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

Maaaring gamitin ng user **_startExitWithBurntTokens_** function ng **_erc20Predicate_** contract.
Inilalantad ng Polygon Plasma client ang **_withdrawConfirm_** method para gawin ang call na ito. Maaari lang gamitin ang function na ito matapos isama sa main chain ang checkpoint. Maaaring masubaybayan ang pagsasama ng checkpoint sa pamamagitan ng pagsunod sa [gabay](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events) na ito.


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

### 3. Process Exit {#3-process-exit}

Dapat gamitin ng user ang **_processExits_** function ng **_withdrawManager_** contract at isumite ang proof of burn. Sa pagsusumite ng wastong patunay, inililipat ang mga token sa user. Inilalantad ng Polygon Plasma client ang **_withdrawExit_** method para gawin ang call na ito.

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

Ang isang checkpoint, na isang representasyon ng lahat ng transaksyon na nangyayari sa Polygon Network sa chain ng ERC20 bawat ~ 30 minuto, ay regular na isinusumite sa pangunahing kontrata ng ERC20.

:::