---
id: ethereum-to-matic
title: Transferencia de datos de Ethereum a Polygon
description: Transfiere estados o datos de Ethereum a Polygon por medio de contratos
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

La sincronización de estado es el mecanismo para leer de forma nativa datos de Ethereum desde la cadena de la EVM de Polygon. En otras palabras, este permite transferir datos arbitrarios de la cadena de Ethereum a la cadena de Polygon. El procedimiento que lo hace posible es el siguiente: los validadores de la capa de Heimdall están esperando un evento determinado, `StateSynced`, de un contrato remitente; cuando se registra el evento, el `data` que se pasó en el evento se escribe en el contrato receptor. Lee más [aquí](/docs/maintain/validator/core-components/state-sync-mechanism).

Los contratos remitente y receptor deben estar mapeados en Ethereum: [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol) debe estar enterado de cada remitente y receptor. Si quieres que hagamos el mapeo, solicítalo [aquí](https://mapper.polygon.technology/).

---

En la siguiente explicación, vamos a implementar un contrato remitente en Goerli (la red de pruebas de Ethereum) y un contrato receptor en Mumbai (la red de pruebas de Polygon). Luego enviaremos datos del remitente y los leeremos en el receptor mediante llamadas de web3 en una secuencia de comandos de nodo.

### 1. Implementación del contrato remitente {#1-deploy-sender-contract}

El único propósito del contrato remitente es poder llamar a la función [syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) en el contrato StateSender, que es el contrato sincronizador de estado de MATIC, cuyo evento StateSynced está esperando Heimdall.

Implementado en:

`0xEAa852323826C71cd7920C3b4c007184234c3945` en Goerli

`0x28e4F3a7f651294B9564800b2D01f35189A5bFbE` en la red principal de Ethereum

Para poder llamar a esta función, primero, hay que incluir su interfaz en el contrato:

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

A continuación, hay que escribir una función personalizada que incluya los datos que queremos pasar a Polygon y llamarla "syncState"

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

En la función anterior, `stateSenderContract` es la dirección del StateSender en la red en la que implementarás `Sender` (p. ej., aquí usaremos `0xEAa852323826C71cd7920C3b4c007184234c3945` para Goerli), y `receiver` es el contrato que recibirá los datos que envíes desde allí.

Se recomienda usar constructores para pasar las variables, pero, para esta demostración, tan solo introduciremos directamente estas dos direcciones:

Así se verá Sender.sol:

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

Estamos usando un contador simple de `states` para hacerle seguimiento al número de estados enviados por medio del contrato remitente.

Usa Remix para implementar el contrato y anota la dirección y la interfaz binaria de la aplicación (ABI).

### 2. Implementación del contrato receptor {#2-deploy-receiver-contract}

El contrato receptor es el invocado por el validador cuando se emite el evento `StateSynced`. El validador llama a la función `onStateReceive` del contrato receptor para enviar los datos. Para implementarlo, primero, importa la interfaz [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) y anota nuestra lógica personalizada: interpretar los datos que hay dentro de onStateReceive.

Así se ve Receiver.sol:

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

La función simplemente le asigna la última ID de estado recibida y los datos a las variables. [StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) es una referencia única y simple al estado transferido (un contador simple).

Implementa Receiver.sol en la red de pruebas de Polygon y anota la dirección y la ABI.

### 3. Mapeo del remitente y el receptor {#3-getting-your-sender-and-receiver-mapped}

Puedes usar las direcciones ya implementadas (mencionadas anteriormente) para el remitente y el receptor o implementar tus contratos personalizados y solicitar el mapeo aquí: [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. Envío y recepción de datos {#4-sending-and-receiving-data}

Ahora que tenemos los contratos implementados y el mapeo listo, vamos a escribir una secuencia de comandos de nodo simple para enviar bytes hexadecimales arbitrarios, recibirlos en Polygon e interpretar los datos.

**4.1 Configuración de la secuencia de comandos**

Primero, tienes que inicializar los objetos web3 y la billetera para hacer las transacciones y los contratos

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

Nosotros estamos usando el paquete @maticnetwork/meta para las RPC. Este paquete no es obligatorio para ejecutar la secuencia de comandos.

Los objetos `matic` y `main` hacen referencia al objeto web3 inicializado con la RPC de Polygon y Ropsten, respectivamente.

Los objetos `sender` y `receiver` hacen referencia a los objetos de contrato de Sender.sol y Receiver.sol que implementaste en el paso 1 y 2.

**4.2 Envío de datos**

Luego, tienes que configurar las funciones para crear la bytestring (cadena de bytes) de los datos y enviarla a través del contrato remitente:

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

Llamar a `getData` convierte una cadena ASCII (p. ej., `Hello World !`) en una cadena de bytes (p. ej., `0x48656c6c6f20576f726c642021`); mientras que la función `sendData` toma `data` (una cadena ASCII), llama a `getData` y pasa la cadena de bytes al contrato remitente

**4.3 Recepción de datos**

A continuación, revisaremos los datos recibidos en Receiver.sol.

La sincronización del estado debería tardar unos 7 a 8 minutos en ejecutarse.

Agrega las siguientes funciones para revisar (a) el número de estados enviados desde el remitente y (b) el último estado recibido en el receptor.

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

La función `checkReceiver` llama a las variables que definiste en el contrato, que se establecen apenas el validador llama a `onStateReceive` en el contrato. La función `getString` interpreta la cadena de bytes (la convierte a ASCII)

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

Por último, escribe un método para ejecutar las funciones:

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 Combinación de todos los pasos**

Así se ve nuestra secuencia de comandos de prueba:

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

**4.5 Ejecución de la secuencia de comandos**

La ejecución exitosa de la secuencia de comandos anterior arroja una salida como la siguiente:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
