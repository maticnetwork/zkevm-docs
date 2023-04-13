---
id: walletconnect
title: WalletConnect
description: Isang bukas na protocol na lumilikha ng komunikasyon sa DApp-Wallet.
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Ang **WalletConnect** ay isang bukas na protocol - hindi isang wallet - binuo upang lumikha ng isang link ng komunikasyon sa pagitan ng mga dApps at wallet. Isang wallet at isang application na sumusuporta sa protocol na ito ang magbibigay-daan sa isang secure na link sa pamamagitan ng isang shared key sa pagitan ng anumang dalawang peer. Ang isang koneksyon ay pinasimulan ng DApp na nagpapakita ng QR code na may karaniwang WalletConnect URI at ang koneksyon ay naitatag kapag inaprubahan ng application ng wallet ang kahilingan sa koneksyon. Ang mga karagdagang kahilingan tungkol sa paglilipat ng pondo ay nakumpirma sa mismong aplikasyon ng wallet.

## I-set Up ang Web3 {#set-up-web3}

Para i-set up ang iyong dApp para kumonekta sa Polygon Wallet ng isang user, puwede mong gamitin ang provider ng WalletConnect para direktang kumonekta sa Polygon. I-install ang mga sumusunod sa DApp mo:

```bash
npm install --save @maticnetwork/walletconnect-provider
```

I-install ang para sa integration `matic.js`ng Polygon:

```bash
$ npm install @maticnetwork/maticjs
```

At idagdag ang sumusunod na code sa iyong dApp;

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

Susunod, i-set up ang provider ng Polygon at Ropsten sa pamamagitan ng bagay ng WalletConnect:

```javascript
const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mumbai.matic.today`,
    callbacks: {
      onConnect: console.log('connected'),
      onDisconnect: console.log('disconnected!')
    }
  }
)

const ropstenProvider = new WalletConnectProvider({
  host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
  callbacks: {
    onConnect: console.log('connected'),
    onDisconnect: console.log('disconnected')
  }
})
```

Nilikha namin ang dalawang bagay sa itaas ng provider upang i-instantiate ang aming Web3 object gamit ang:

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## Pag-instantiate ng mga Kontrata {#instantiating-contracts}

Kapag mayroon kaming aming **web3 object**, kinasasangkutan ng instantiating of contract ang parehong hakbang para sa Metamas. Siguraduhin na mayroon kang **kontrata na ABI** mo at i-**address** na sa lugar.

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## Pagtawag sa mga function {#calling-functions}

:::info

Mananatili ang pribadong key sa wallet ng gumagamit at **hindi ito na-access ng app sa anumang paraan**.

:::

May dalawang uri kaming function sa Ethereum, depende sa pakikipag-ugnayan sa blockchain. Kami `call()`kapag data na babasahin namin ang data at `send()`kapag nagsusulat kami ng data.

### Tumatawag `call()`Ginagawa  {#functions}

Hindi nangangailangan ng lagda ang data ng pagbabasa, samakatuwid dapat ganito ang code:

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### Tumatawag `send()`Ginagawa  {#functions-1}

Dahil ang pagsusulat sa blockchain ay nangangailangan ng lagda, we namin ang user sa kanilang wallet (na sumusuporta sa WalletConnect) na mag-sign ng transaksyon.

Kasama nito ang tatlong hakbang:
1. Pag-construct transaksyon
2. Pagkuha ng lagda sa transaksyon
3. Nagpapadala ng nilagdaang transaksyon

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

Ang code sa itaas ay lumilikha ng object ng transaksyon na pagkatapos ay ipapadala sa wallet ng user para sa lagda:


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`Ipinadala ng function ang gumagamit para sa kanilang lagda at `sendSignedTransaction()`pinapadala ang nilagdaang transaksyon (nagbabalik ang isang transaksyon resibo sa tagumpay).
