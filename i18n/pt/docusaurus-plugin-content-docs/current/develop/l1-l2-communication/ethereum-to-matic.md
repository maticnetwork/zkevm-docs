---
id: ethereum-to-matic
title: Transferência de dados da Ethereum para a Polygon
description: Transferência do estado ou dados da Ethereum para a Polygon através dos Contratos
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

O mecanismo para ler dados Ethereum nativamente da chain EVM da Polygon é o da "Sincronização de Estado”. Por outras palavras, este mecanismo possibilita a transferência de dados arbitrários da chain da Ethereum para a chain da Polygon. O procedimento que torna isso possível é: Validadores na camada de Heimdall estão a ouvir um determinado evento — `StateSynced` de um contrato do Remetente e assim que o evento for selecionado, o `data` que foi passado pelo evento é escrito no contrato do Destinatário. Saiba mais [aqui](/docs/maintain/validator/core-components/state-sync-mechanism).

O contrato do Remetente e do Destinatário tem de ser mapeado na Ethereum — [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol) tem de ter conhecimento de cada remetente e destinatário. Se pretender que [o](https://mapper.polygon.technology/) mapeamento se realize, solicite um mapeamento aqui.

---

Nos próximos passos, vamos implantar um contrato de Remetente na Goerli (Testnet Ethereum) e o contrato do Destinatário na Mumbai (Testnet da Polygon) e, de seguida, enviar dados do Remetente e ler os dados no Destinatário através de calls web3 num script de nó.

### 1. Implantar o contrato do Remetente {#1-deploy-sender-contract}

O único objetivo do contrato do Remetente é poder fazer CALL da função [syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) no contrato do StateSender — que é o contrato da Sincronização de Estado da Matic - o evento StateSynced que a Heimdall está a ouvir.

Implantado em:

`0xEAa852323826C71cd7920C3b4c007184234c3945`na Goerli

`0x28e4F3a7f651294B9564800b2D01f35189A5bFbE`na Mainnet Ethereum

Para podermos fazer a CALL desta função, vamos primeiro incluir a sua interface no contrato:

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

De seguida, vamos escrever a nossa função personalizada que integra os dados que gostaríamos de passar à Polygon e faz a CALL à syncState

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

Na função acima, `stateSenderContract` é o endereço do StateSender na rede onde irá implantar `Sender`(por exemplo, vamos usar  `0xEAa852323826C71cd7920C3b4c007184234c3945`na Goerli) e `receiver` é o contrato que vai receber os dados que enviamos daqui.

Recomenda-se usar construtores para passar nas variáveis, mas para a finalidade desta demonstração, vamos simplesmente codificar estes dois endereços:

Este é o aspeto do nosso Sender.sol:

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

Estamos a usar um contador `states` simples para monitorizar o número de estados enviados através do contrato do Remetente.

Use Remix para implantar o contrato e tomar nota do endereço e da ABI.

### 2. Implantar o contrato do Destinatário {#2-deploy-receiver-contract}

O contrato do Destinatário é aquele que é invocado por um Validador quando o evento `StateSynced` é emitido. O Validador invoca a função `onStateReceive`no contrato do destinatário para enviar os dados. Para implementá-la, primeiro importamos a interface [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) e inserimos a nossa lógica personalizada - para interpretar os dados transferidos dentro do onStateReceive.

Este é o aspeto do nosso Receiver.sol:

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

A função simplesmente atribui às variáveis a última Identificação do Estado recebida e os dados. [StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) é uma referência simples exclusiva para o estado transferido (um contador simples).

Implante o seu Receiver.sol na testnet da Polygon e tome nota do endereço e da ABI

### 3. Fazer o mapeamento do seu Remetente e Destinatário {#3-getting-your-sender-and-receiver-mapped}

Tanto pode usar os endereços já implantados (mencionados acima) para o remetente destinatário, como pode implantar os seus contratos personalizados e solicitar um mapeamento aqui: [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. Enviar e receber dados {#4-sending-and-receiving-data}

Agora que temos os nossos contratos em vigor e o mapeamento realizado, vamos escrever um script de nó simples para enviar bytes hex arbitrários, recebê-los na Polygon e interpretar os dados!

**4.1 Configurar o seu script**

Primeiro vamos iniciar os nossos objetos web3 e a carteira para efetuar as transações e os contratos

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

Estamos a usar o pacote @maticnetwork/meta para os RPCs, o pacote não é um requisito para executar o script.

Os objetos `matic` e `main`objetos referem-se ao objeto web3 inicializado com o RPC da Polygon e Ropsten, respetivamente.

Os objetos `sender` e `receiver` referem-se aos objetos do contrato de Sender.sol e Receiver.sol que foram implantados nas Etapas 1 e 2.

**4.2 Enviar dados**

De seguida, vamos configurar as nossas funções para criar um bytestring dos dados e enviá-lo através do contrato do Destinatário:

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

Fazer CALL de `getData` irá converter uma string ascii (por exemplo, `Hello World !`) para um string de bytes (por exemplo, `0x48656c6c6f20576f726c642021`); enquanto a função `sendData` assume `data`(um string ascii), faz CALL de `getData` e passa o bytestring para o contrato do remetente.

**4.3 Receber dados**

De seguida, vamos verificar se há dados recebidos no Receiver.sol.

Devem ser precisos cerca de 7 a 8 minutos para a execução da sincronização do estado.

Adicione as seguintes funções para verificar (a) o número de estados enviados a partir Remetente e (b) o Último estado recebido no Destinatário.

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

A função `checkReceiver` simplesmente faz a CALL das variáveis que definimos no contrato - que seriam definidas assim que o Validador fizesse a CALL de `onStateReceive` no contrato. A função `getString` simplesmente interpreta o bytestring (converte-o de novo para ascii)

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

Finalmente, vamos escrever o método para executar as nossas funções:

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 Juntar tudo!**

Este é o aspeto do nosso script de teste:

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

**4.5 Vamos executar o script**

Uma execução bem-sucedida do script acima apresenta um resultado como este:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
