---
id: ethereum-to-matic
title: Daten Ethereum zu Polygon übertragen
description: Übertragen Sie Status oder Daten über Verträge von Ethereum zu Polygon
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Der Mechanismus, um Ethereum-Daten aus der Polygon EVM-Chain nativ zu lesen, ist „State Sync“. Anders ausgedrückt, ermöglicht dir dieser Mechanismus die Übertragung beliebiger Daten von der Ethereum-Chain zur Polygon-Chain. So funktioniert dieses Verfahren: Validatoren auf der Heimdall-Layer registrieren ein bestimmtes Ereignis – `StateSynced` von einem Absendervertrag. Sobald das Ereignis ausgewählt wird, wird die `data` des Ereignisses auf den Empfängervertrag geschrieben. Mehr erfährst du [hier](/docs/maintain/validator/core-components/state-sync-mechanism).

Die Absender- und Empfängerverträge sind erforderlich, um auf Ethereum gemappt zu werden – [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol) muss jeden Absender und Empfänger erkennen. Falls du mappen möchtest, fordere bitte hier ein [Mapping](https://mapper.polygon.technology/) an.

---

Beim folgenden Rundgang stellen wir einen Absendervertrag auf Goerli (Ethereum-Testnet) und einen Empfängervertrag auf Mumbai (Polygon-Testnet) bereit und senden dann Daten vom Absender und lesen Daten des Empfängers über Web3-Aufrufe in einem Knoten-Script.

### 1. Bereitstellen des Absender-Vertrags {#1-deploy-sender-contract}

Der einzige Zweck des Absendervertrags ist es, die [syncState](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33)-Funktion auf dem StateSender-Vertrag aufrufen zu können –  nämlich den State Syncer-Vertrag von Matic, das StateSynced-Ereignis, das Heimdall registriert.

Bereitgestellt unter:

`0xEAa852323826C71cd7920C3b4c007184234c3945` auf Goerli

`0x28e4F3a7f651294B9564800b2D01f35189A5bFbE` am Ethereum-Mainnet

Um diese Funktion aufrufen zu können, fügen wir die Schnittstelle zuerst in unseren Vertrag ein:

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

Als Nächstes schreiben wir unsere benutzerdefinierte Funktion, die die Daten erfasst, die wir an Polygon weiterleiten möchten, und den syncState aufruft

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

In der oben genannten Funktion ist `stateSenderContract` die Adresse des StateSenders im Netzwerk, in dem Sie `Sender` bereitstellen werden. (Zum Beispiel verwenden wir `0xEAa852323826C71cd7920C3b4c007184234c3945` für Goerli) und `receiver` ist der Vertrag, der die Daten empfängt, die wir von dort aus senden.

Es wird empfohlen, Konstruktoren zu verwenden, um Variablen zu übergeben. Für diese Demo werden wir einfach diese beiden Adressen fest programmieren:

Unser Sender.sol sieht so aus:

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

Wir verwenden einen einfachen -`states`Zähler, um die Anzahl der Status zu verfolgen, die über den Sender gesendet werden.

Nutzen Sie Remix, um den Vertrag bereitzustellen und notieren Sie sich Adresse und ABI.

### 2. Empfängervertrag bereitstellen {#2-deploy-receiver-contract}

Der Empfängervertrag wird von einem Validator aufgerufen, wenn das `StateSynced`-Ereignis gesendet wird. Der Validator ruft die Funktion `onStateReceive` des Empfängervertrags auf, um die Daten zu übermitteln. Um sie zu implementieren, importieren wir zuerst die [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol)-Benutzeroberfläche und schreiben unsere benutzerdefinierte Logik auf – um die übertragenen Daten in onStateReceive zu interpretieren.

So sieht unter Receiver.sol aus:

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

Die Funktion nimmt die letzte empfangene Status-Id und die letzten empfangenen Daten und weist sie Variablen zu. [StateId](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) ist eine einfache eindeutige Bezugnahme auf den übertragenen Status (ein einfacher Zähler).

Stellen Sie Ihr Receiver.sol im Polygon-Testnet bereit und schreiben Sie sich Adresse und ABI auf

### 3. Mapping Ihres Absenders und Empfängers {#3-getting-your-sender-and-receiver-mapped}

Sie können die bereits bereitgestellten Adressen (sieh oben) für Absender und Empfänger verwenden oder benutzerdefinierte Verträge bereitstellen und hier ein Mapping anfordern: [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. Daten senden und empfangen {#4-sending-and-receiving-data}

Nachdem wir unsere Verträge erstellt und das Mapping abgeschlossen haben, schreiben wir ein einfaches Knoten-Skript, um beliebige hex-Bytes zu senden, sie auf Polygon zu empfangen und die Daten zu interpretieren!

**4.1 Skript einrichten**

Wir initialisieren unsere web3-Objekte und -Wallet für Transaktionen und Verträge

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

Wir verwenden das @maticnetwork/meta-Paket für die RPCs. Das Paket ist keine Voraussetzung, um das Skript auszuführen.

Die `matic`- und `main`-Objekte beziehen sich auf das web3-Objekt, das mit dem RPC von Polygon und Ropsten initialisiert wurde.

Die `sender`- und `receiver`-Objekte beziehen sich auf die Vertragsobjekte von Sender.sol und Receiver.sol, die wir in Schritt 1 und 2 bereitgestellt haben.

**4.2 Daten senden**

Als Nächstes richten wir unsere Funktionen ein, um Bytestring der Daten zu erstellen und sie über den Absendervertrag zu senden:

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

Das Aufrufen von `getData` wandelt einen ascii-String (z.B. `Hello World !`) in eine Bytestring (z.B. `0x48656c6c6f20576f726c642021`) um. Die Funktion `sendData` nimmt `data` auf (einen ascii-String), ruft `getData` auf und leitet den Bytestring an den Absendervertrag weiter

**4.3 Daten empfangen**

Als Nächstes prüfen wir, ob Receiver.sol Daten empfangen Daten hat.

Es sollte ~7-8 Minuten dauern, bis die Statussynchronisierung abgeschlossen ist.

Fügen Sie die folgenden Funktionen hinzu, um (a) die Anzahl der gesendeten Status vom Absender und (b) den letzten empfangenen Status des Empfängers zu überprüfen.

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

die Funktion `checkReceiver` ruft die Variablen auf, die wir im Vertrag definiert haben – die festgelegt werden, sobald der Validator `onStateReceive` im Vertrag aufruft. Die `getString`-Funktion interpretiert den Bytestring (wandelt ihn wieder in ascii um)

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

Schließlich erstellen wir eine Methode, um unsere Funktionen auszuführen:

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 Führen wir alles zusammen!**

So sieht unser Testskript aus:

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

**4.5 Führen wir das Skript aus**

Die erfolgreiche Ausführung des oben genannten Skripts liefert die folgende Ausgabe:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
