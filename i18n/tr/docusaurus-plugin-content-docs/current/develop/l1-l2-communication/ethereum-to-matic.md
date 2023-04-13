---
id: ethereum-to-matic
title: Ethereum'dan Polygon'a veri aktarın
description: Ethereum'dan Polygon'a Sözleşmeler üzerinden durum veya veri aktarın
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Ethereum verisini Polygon EVM zincirinden yerel olarak okuyan mekanizma, "State Sync" (durum senkronizasyon) olarak tanımlanır. Başka bir deyişle, bu mekanizma Ethereum zincirinden Polygon zincirine gelişigüzel (arbitrary) veri transferini sağlar. Bunu mümkün kılan prosedür şu şekildedir: Heimdall katmanındaki doğrulayıcılar belirli bir olay için dinleme yapar: Olay seçilir seçilmez, bir Sender (gönderici) sözleşmesinden `StateSynced` özelliği kazanır, olay içinde geçirilen `data` Receiver (alıcı) sözleşmesi üzerine yazılır. Daha fazlasını [burada](/docs/maintain/validator/core-components/state-sync-mechanism) okuyun.

Gönderici ve Alıcı sözleşmesi Ethereum üzerinde eşlenmiş olmalıdır. [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol) her gönderici ve alıcıdan haberdar olmalıdır. Eşleme işlemini tamamlamak isterseniz lütfen [buradan](https://mapper.polygon.technology/) bir eşleme isteği gönderin.

---

Aşağıdaki kılavuzda, Goerli (Ethereum test ağı) üzerinde bir Gönderici sözleşmesi ve Mumbai (Polygon test ağı) üzerinde bir Alıcı sözleşmesi devreye alacağız. Daha sonra bir düğüm betiği içindeki web3 çağrıları ile Göndericiden veri gönderip Alıcı üzerinde veri okuyacağız.

### 1. Gönderici Sözleşmesini devreye alma {#1-deploy-sender-contract}

Gönderici sözleşmesinin tek amacı, Matic'in durum senkronizasyon sözleşmesi olan StateSender sözleşmesinin ve Heimdall'ın dinlemede olduğu StateSynced olayının [syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) fonksiyonunu çağırmaktır.

Devreye alma yeri:

Goerli üzerinde `0xEAa852323826C71cd7920C3b4c007184234c3945`

Ethereum Mainnet üzerinde `0x28e4F3a7f651294B9564800b2D01f35189A5bFbE`

Bu fonksiyonu çağırmak için önce bunun arayüzünü sözleşmemize dâhil edelim:

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

Daha sonra, Polygon üzerine geçirmek istediğimiz veriyi alan ve syncState çağrısı yapan özel fonksiyonumuzu yazalım

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

Yukarıdaki fonksiyonda `stateSenderContract`, `Sender`'ı devreye alacağınız ağın üzerindeki StateSender adresidir. (ör. Goerli için `0xEAa852323826C71cd7920C3b4c007184234c3945` kullanacağız) ve `receiver`, buradan göndereceğimiz veriyi alacağımız sözleşmedir.

Değişkenleri geçirmek için oluşturucuların (constructor) kullanılması önerilir; bu gösterim özelinde iki adresi kodla yazacağız:

Sender.sol aşağıdaki gibi görünecektir:

```jsx
// sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

contract sender {
  address public stateSenderContract = 0xEAa852323826C71cd7920C3b4c007184234c3945;
  address public receiver = 0x83bB46B64b311c89bEF813A534291e155459579e;

  uint public states = 0;

  function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
  }

}
```

Gönderici sözleşmesi üzerinden gönderilen durum sayısını takip etmek için basit bir `states` sayacı kullanıyoruz.

Sözleşmeyi devreye almak için Remix kullanın ve adres ile ABI değerini bir yere not edin.

### 2. Alıcı sözleşmeyi devreye alma {#2-deploy-receiver-contract}

Alıcı sözleşmesi, `StateSynced` olayı yayınlandığında bir Doğrulayıcı tarafından tetiklenen bir sözleşmedir. Doğrulayıcı veriyi göndermek için alıcı sözleşme üzerindeki `onStateReceive` fonksiyonunu çağırır. Bunu uygulamak için önce [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) arayüzünü içe aktarıyoruz ve onStateReceive içinde aktarılan veriyi yorumlamak için özel mantığımızı yazıyoruz.

Receiver.sol aşağıdaki gibi görünmektedir:

```jsx
// receiver.sol

pragma solidity ^0.5.11;

// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}

contract receiver {

  uint public lastStateId;
  bytes public lastChildData;

  function onStateReceive(uint256 stateId, bytes calldata data) external {
    lastStateId = stateId;
    lastChildData = data;
	}

}
```

Bu fonksiyon en son alınan State Id ve verisinin değişkenlere atamasını yapar. [StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36), aktarılan duruma yapılan basit benzersiz bir referanstır (basit bir sayaç).

Receiver.sol dosyanızı Polygon'un test ağında devreye alın, adresi ve ABI'ı not edin

### 3. Göndericinizi ve Alıcınızı eşleme {#3-getting-your-sender-and-receiver-mapped}

Gönderici ve alıcı için halihazırda devreye alınmış (yukarıda belirtilen) adresleri kullanabilir veya kendi özel sözleşmelerinizi devreye alıp şu adresten bir eşleme isteği yapabilirsiniz: [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. Veri Göndermek ve Almak {#4-sending-and-receiving-data}

Artık sözleşmelerimizi doğru şekilde devreye aldığımıza ve eşlemeleri yaptığımıza göre, gelişigüzel (arbitrary) hex baytlarını göndermek için basit bir düğüm betiği yazabilir, Polygon üzerinde alabilir ve veriyi yorumlayabiliriz!

**4.1 Betiğinizi yapılandırmak**

Önce web3 nesnelerimizi ve cüzdanımızı işlemleri ve sözleşmeleri yapmak için başlatacağız

```jsx
// test.js

const Web3 = require('web3')
const Network = require("@maticnetwork/meta/network")

const network = new Network ('testnet', 'mumbai')

const main = new Web3(network.Main.RPC)
const matic = new Web3 (network.Matic.RPC)

let privateKey = `0x...` // add or import your private key

matic.eth.accounts.wallet.add(privateKey)
main.eth.accounts.wallet.add(privateKey)

let receiverAddress = `<RECEIVER_CONTRACT_ADDRESS>`
let receiverABI = `` // insert or import ABI
let senderAddress = `<SENDER_CONTRACT_ADDRESS>`
let senderABI = `` // insert of import the ABI

let sender = new main.eth.Contract(JSON.parse(senderABI), senderAddress)
let receiver = new matic.eth.Contract(JSON.parse(receiverABI), receiverAddress)

```

RPC'ler için @maticnetwork/meta paketi kullanıyoruz, bu paket komut dizisini çalıştırmak için zorunlu değildir.

`matic` ve `main` nesneleri Polygon ve Ropsten'in RPC'leri tarafından sırasıyla başlatılan web3 nesnesine karşılık gelir.

`sender` ve `receiver` nesneleri, 1. ve 2. Adımda devreye aldığımız Sender.sol ve Receiver.sol sözleşme nesnelerine karşılık gelir.

**4.2 Veri göndermek**

Daha sonra, verinin bayt dizisini oluşturmak ve Gönderici sözleşmesi üzerinden göndermek için fonksiyonlarımızı yapılandıralım:

```jsx
// data to sync
function getData(string) {
  let data = matic.utils.asciiToHex(string);
  return data
}

// send data via sender
async function sendData (data) {
  let r = await sender.methods
    .sendState (getData(data))
    .send({
      from: main.eth.accounts.wallet[0].address,
      gas: 8000000
    })
  console.log('sent data from root, ', r.transactionHash)
}
```

`getData` fonksiyonunu çağırmak, bir ascii dizesini (ör. `Hello World !`) bir bayt dizesine (ör. `0x48656c6c6f20576f726c642021`) çevirirken; `sendData` fonksiyonu da `data` dizesini (ascii dizesi) içe alacak ve `getData` fonksiyonunu çağırarak bayt dizesini gönderici sözleşmesine geçirecektir

**4.3 Veriyi almak**

Daha sonra, Receiver.sol üzerinde alınan veriyi kontrol edeceğiz.

Durum senkronizasyonunun yürütülmesi yaklaşık 7-8 dakika sürecektir.

(a) Gönderici tarafından gönderilen durumların sayısını ve (b) Alıcı tarafından alınan en son durumu kontrol etmek için aşağıdaki fonksiyonları ekleyin.

```jsx
// check `states` variable on sender
async function checkSender () {
  let r = await sender.methods
    .states()
    .call()
  console.log('number of states sent from sender: ', r)
}

// check last received data on receiver
async function checkReceiver () {
  let r = await receiver.methods
    .lastStateId()
    .call()
  let s = await receiver.methods
    .lastChildData()
    .call()
  console.log('last state id: ', r, 'and last data: ', s)
  console.log('interpreted data: ', getString(s))
}
```

`checkReceiver` fonksiyonu sözleşmede tanımladığımız ve Doğrulayıcı sözleşme üzerinde `onStateReceive` çağrısını yaptığı anda belirlenecek olan değişkenleri çağırır. `getString` fonksiyonu bayt dizesini yorumlar (ascii biçimine geri döndürür)

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

Son olarak, fonksiyonlarımızı yürütmek için bir metot yazacağız:

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 Hepsini bir araya getirmek!**

Test betiğimiz şu şekilde görünmektedir:

```jsx
// test.js

const Web3 = require('web3')
const Network = require("@maticnetwork/meta/network")

const network = new Network ('testnet', 'mumbai')

const main = new Web3(network.Main.RPC)
const matic = new Web3 (network.Matic.RPC)

let privateKey = `0x...`
matic.eth.accounts.wallet.add(privateKey)
main.eth.accounts.wallet.add(privateKey)

let receiverAddress = `<RECEIVER_CONTRACT_ADDRESS>`
let receiverABI = ``
let senderAddress = `<SENDER_CONTRACT_ADDRESS>`
let senderABI = ``

let sender = new main.eth.Contract(JSON.parse(senderABI), senderAddress)
let receiver = new matic.eth.Contract(JSON.parse(receiverABI), receiverAddress)

// data to sync
function getData(string) {
  let data = matic.utils.asciiToHex(string);
  return data
}

function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}

// console.log(getData('Sending a state sync! :) '))

async function sendData (data) {
  let r = await sender.methods
    .sendState (getData(data))
    .send({
      from: main.eth.accounts.wallet[0].address,
      gas: 8000000
    })
  console.log('sent data from root, ', r.transactionHash)
}

async function checkSender () {
  let r = await sender.methods
    .states()
    .call()
  console.log('number of states sent from sender: ', r)
}

async function checkReceiver () {
  let r = await receiver.methods
    .lastStateId()
    .call()
  let s = await receiver.methods
    .lastChildData()
    .call()
  console.log('last state id: ', r, 'and last data: ', s)
  console.log('interpreted data: ', getString(s))
}

async function test() {
	await sendData ('Hello World !')
	await checkSender ()
	// add a timeout here to allow time gap for the state to sync
	await checkReceiver ()
}

test()
```

**4.5 Betiği çalıştıralım**

Yukarıdaki betiği başarıyla yürütmek, aşağıdaki gibi bir çıktı sağlar:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
