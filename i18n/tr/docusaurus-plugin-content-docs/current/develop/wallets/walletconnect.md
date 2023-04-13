---
id: walletconnect
title: WalletConnect
description: DApp-Cüzdan iletişimi oluşturan açık bir protokol.
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**WalletConnect** açık bir protokoldür - cüzdan değil- dApps ve cüzdanlar arasında bir iletişim bağlantısı oluşturmak için inşa edilmiştir. Bu protokolü destekleyen bir cüzdan ve uygulama, herhangi bir eş arasında paylaşılan bir anahtar üzerinden güvenli bir bağlantı sağlar. Standart bir WalletConnect URI içeren QR kodunu gösteren DApp tarafından bir bağlantı başlatılır ve cüzdan uygulaması bağlantı isteğini kabul ettiğinde bağlantı kurulur. Fonlar aktarmayla ilgili daha ileri istekler cüzdan uygulaması üzerinde onaylanır.

## Web3 Ayarlayın {#set-up-web3}

Bir kullanıcının Polygon Cüzdanına bağlanmak için dApp'inizi kurmak için, Polygon'a doğrudan bağlanmak için WalletConnect’s sağlayıcısını kullanabilirsiniz. DApp'inize aşağıdakini kurun:

```bash
npm install --save @maticnetwork/walletconnect-provider
```

Polygon entegrasyonu için `matic.js`yükleyin:

```bash
$ npm install @maticnetwork/maticjs
```

Ve dApp'inize aşağıdaki kodu ekleyin;

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

Ardından, WalletConnect’s nesnesi üzerinden Polygon ve Ropsten sağlayıcı ayarlayın:

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

Yukarıdaki iki sağlayıcı nesnesini oluşturarak Web3 nesnemizi şunlarla somutlaştırıyoruz:

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## İçgüdü Sözleşmeleri {#instantiating-contracts}

**Web3** nesnemizi aldıktan sonra, sözleşmelerin devreye alınması, for aynı adımları içerir. **Sözleşmenizin ABI** ve **adresinizin** halihazırda yerinde olduğundan emin olun.

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## Fonksiyonları Çağırma {#calling-functions}

:::info

Özel anahtar kullanıcının cüzdanında kalır ve **uygulama bu cüzdana hiçbir şekilde erişemez**.

:::

Ethereum'da blok zinciri ile etkileşime bağlı olarak iki tür fonksiyon vardır. Veriyi okurken `call()`, veriyi yazarken `send()` kullanıyoruz.

### `call()` İşlevlerini Çağırma {#functions}

Verilerin okunması bir imza gerektirmez, bu nedenle kod şu şekilde olmalıdır:

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### `send()` İşlevlerini Çağırma {#functions-1}

Blok zincirine yazmak bir imza gerektirdiğinden, kullanıcıyı cüzdanlarında (that destekleyen cüzdan) ile işlemi imzalamasını talep ediyoruz.

Bu üç adım içerir:
1. Bir işlem inşa etme
2. İşlem üzerinde bir imza alma
3. İmzalanmış işlemi gönderme

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

Yukarıdaki kod bir işlem nesnesi oluşturur ve bu nesne daha sonra imza için kullanıcının cüzdanına gönderilir:


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`fonksiyon kullanıcıya imzası için gönderir ve imzalanan işlemi `sendSignedTransaction()`gönderir (başarı üzerine bir işlem makbuzunu döndürür).
