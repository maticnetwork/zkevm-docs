---
id: ethereum-to-matic
title: Trasferire dati da Ethereum a Polygon
description: Trasferimento di stato o dati da Ethereum a Polygon tramite Contratti
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Il meccanismo per leggere in modo nativo i dati di Ethereum dalla EVM della catena di Polygon è quello dello "State Sync". Il meccanismo per leggere in modo nativo i dati di Ethereum dalla catena Polygon EVM è quello dello "State Sync". La procedura che lo rende possibile è la seguente: i validatori sul livello Heimdall sono in ascolto di un particolare evento - `StateSynced`da un contratto Sender, non appena l'evento viene raccolto, il `data` che è stato passato nell'evento viene scritto sul contratto Receiver. Ulteriori informazioni sono disponibili [qui](/docs/maintain/validator/core-components/state-sync-mechanism).

I contratti Sender e Receiver devono essere mappati su Ethereum - [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol) deve essere a conoscenza di ogni mittente e destinatario. Se desideri ottenere la mappatura, puoi richiederla [qui](https://mapper.polygon.technology/).

---

Nella seguente guida, implementeremo un contratto Sender su Goerli (testnet di Ethereum) e un contratto Receiver su Mumbai (testnet di Polygon) e poi invieremo dati da Sender e leggeremo dati su Receiver tramite chiamate web3 in uno script nodo.

### 1. Implementare il contratto Sender {#1-deploy-sender-contract}

L'unico scopo del contratto Sender è quello di poter chiamare la funzione [syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) sul contratto StateSender, che è il contratto di sincronizzazione dello stato di Matic, l'evento StateSynced di cui Heimdall è in ascolto.

Distribuito alle:

`0xEAa852323826C71cd7920C3b4c007184234c3945` su Goerli

`0x28e4F3a7f651294B9564800b2D01f35189A5bFbE` sulla Ethereum Mainnet

Per poter chiamare questa funzione, dobbiamo prima includere la sua interfaccia nel nostro contratto:

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

Quindi, scriviamo la nostra funzione personalizzata che riceve i dati che vogliamo passare a Polygon e chiama syncState

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

Nella funzione precedente, `stateSenderContract` è l'indirizzo dello StateSender sulla rete in cui verrà distribuito `Sender` (ad esempio, useremo `0xEAa852323826C71cd7920C3b4c007184234c3945` per Goerli) e `receiver` è il contratto che riceverà i dati da qui.

Si consiglia di utilizzare i costruttori per inserire le variabili, ma per lo scopo di questa demo ci limiteremo a codificare questi due indirizzi:

Ecco come appare il nostro Sender.sol:

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

Utilizziamo un semplice contatore `states` che permette di tenere traccia del numero di stati inviati tramite il contratto Mittente.

Usa Remix per distribuire il contratto e prendi nota dell'indirizzo e dell'ABI.

### 2. Distribuire il contratto Receiver {#2-deploy-receiver-contract}

Il contratto Receiver è quello che viene invocato da un Validatore quando viene emesso l'evento `StateSynced`. Il Validatore invoca la funzione `onStateReceive` nel contratto Receiver per inviare i dati. Per implementarlo, dobbiamo prima importare l'interfaccia di [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) e scrivere la nostra logica personalizzata, per interpretare i dati trasferiti all'interno di onStateReceive.

Ecco come appare il nostro Receiver.sol:

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

La funzione assegna semplicemente l'ultimo ID di Stato ricevuto e i dati alle variabili. [StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) è un semplice riferimento univoco allo stato trasferito (un semplice contatore).

Distribuisci il tuo Receiver.sol sulla testnet di Polygon e prendi nota dell'indirizzo e dell'ABI

### 3. Come mappare il mittente e il ricevitore {#3-getting-your-sender-and-receiver-mapped}

Puoi utilizzare gli indirizzi già distribuiti (menzionati sopra) per il mittente e il destinatario, oppure distribuire i tuoi contratti personalizzati e richiedere una mappatura qui: [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. Invio e ricezione di dati {#4-sending-and-receiving-data}

Ora che abbiamo i nostri contratti e la mappatura, scriveremo un semplice script per inviare byte esadecimali arbitrari, riceverli su Polygon e interpretare i dati!

**4.1 Configurare lo script**

Per prima cosa inizializzeremo i nostri oggetti web3, i wallet per realizzare le transazioni e i contratti

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

Stiamo utilizzando il pacchetto @maticnetwork/meta per gli RPC, ma il pacchetto non è un requisito per eseguire lo script.

Gli oggetti `matic` e `main` si riferiscono all'oggetto web3 inizializzato con l'RPC di Polygon e Ropsten rispettivamente.

Gli oggetti `sender` e `receiver` si riferiscono agli oggetti contratto di Sender.sol e Receiver.sol che sono stati distribuiti nei passaggi 1 e 2.

**4.2 Inviare dati**

Quindi, configuriamo le nostre funzioni per creare i bytestring dei dati e inviarli tramite il contratto Sender:

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

Chiamando `getData` si converte una stringa ascii (ad esempio, `Hello World !`) in una stringa di byte (ad esempio, `0x48656c6c6f20576f726c642021`); mentre la funzione `sendData` prende `data` (una stringa ascii), chiama `getData` e passa la bytestring al contratto Sender

**4.3 Ricezione di dati**

Successivamente, controlleremo i dati ricevuti su Receiver.sol.

L'esecuzione della sincronizzazione dello stato dovrebbe richiedere circa 7-8 minuti.

Aggiungi le seguenti funzioni per verificare (a) il numero di stati inviati dal mittente e (b) l'ultimo stato ricevuto dal destinatario.

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

la funzione `checkReceiver` richiama semplicemente le variabili definite nel contratto, che saranno impostate non appena il Validatore chiamerà `onStateReceive` sul contratto. La funzione `getString` interpreta semplicemente il bytestring (lo converte in ascii)

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

Infine, scriveremo un metodo per eseguire le nostre funzioni:

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 Mettiamo tutto insieme!**

Ecco come si presenta il nostro script di prova:

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

**4.5 Eseguiamo lo script**

L'esecuzione corretta dello script precedente fornisce un output di questo tipo:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
