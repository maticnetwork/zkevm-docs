---
id: ethereum-to-matic
title: Transfert de données d'Ethereum vers Polygone
description: Transférer l'état ou les données d'Ethereum à Polygone via des Contrats
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Le mécanisme permettant de lire nativement les données Ethereum de la chaîne EVM du Polygone est celui de la "Synchronisation d'État". En d'autres termes, ce mécanisme permet de transférer des données arbitraires de la chaîne Ethereum à la chaîne Polygone. La procédure qui rend cela possible est la suivante: Les validateurs de la couche Heimdall sont à l'écoute d'un événement particulier - `StateSynced` provenant d'un contrat Émetteur, dès que l'événement est capté, le `data` qui a été transmis dans l'événement est écrit sur le contrat du destinataire. Lire la suite [ici](/docs/maintain/validator/core-components/state-sync-mechanism).

Le contrat du Destinateur et du Destinataire doit être cartographié sur Ethereum - [StateSender.sol](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/root/stateSyncer/StateSender.sol)  doit être conscient de chaque destinateur  et destinataire. Si vous souhaitez que la cartographie soit effectuée, veuillez demander une cartographie [ici](https://mapper.polygon.technology/).

---

Dans les étapes suivantes, nous allons déployer un contrat Émetteur sur Goerli (Ethereum testnet) et un contrat Destinataire sur Mumbai (testnet de Polygon), puis nous allons envoyer des données depuis l'Émetteur et lire des données sur le Destinataire via des appels web3 dans un nœud de scénario.

### 1. Déployer le contrat de l'Expéditeur {#1-deploy-sender-contract}

Le seul but du contrat de l'Expéditeur est de pouvoir appeler la fonction [Étatsynchronisé](https://github.com/maticnetwork/contracts/blob/e999579e9dc898ab6e66ddcb49ee84c2543a9658/contracts/root/stateSyncer/StateSender.sol#L33) sur le contrat Expéditeurd'État - qui est le contrat de synchronisation d'état de Matic - l'événement d'ÉtatSynchonisé dont Heimdall est à l'écoute.

Déployé à:

`0xEAa852323826C71cd7920C3b4c007184234c3945`sur Goerli

`0x28e4F3a7f651294B9564800b2D01f35189A5bFbE`sur le Réseau Principal d'Ethereum

Pour pouvoir appeler cette fonction, nous devons d'abord inclure son interface dans notre contrat:

```jsx
// Sender.sol

pragma solidity ^0.5.11;

contract IStateSender {
  function syncState(address receiver, bytes calldata data) external;
  function register(address sender, address receiver) public;
}

...
```

Ensuite, écrivons notre fonction personnalisée qui reçoit les données que nous souhaitons transmettre à Polygone et appelle l'ÉtatdeSynchronisation.

```jsx
function sendState(bytes calldata data) external {
    states = states + 1 ;
    IStateSender(stateSenderContract).syncState(receiver, data);
}
```

Dans la fonction ci-dessus, `stateSenderContract`est l'adresse du l'Expéditeurd'État sur le réseau que vous allez déployer `Sender` (par exemple, nous utiliserons `0xEAa852323826C71cd7920C3b4c007184234c3945`pour Goerli), et `receiver`est le contrat qui recevra les données que nous envoyons d'ici.

Il est recommandé d'utiliser les constructeurs pour transmettre des variables, mais pour les besoins de cette démo, nous allons simplement coder solidement ces deux adresses:

Voici à quoi ressemble notre Sender.sol:

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

Nous utilisons un simple `states`compteur pour suivre le nombre d'états envoyés par le contrat de l'Expéditeur.

Utilisez Remix pour déployer le contrat et notez l'adresse et l'ABI.

### 2. Déployer le contrat du Destinataire  {#2-deploy-receiver-contract}

Le contrat du Destinataire est celui qui est invoqué par un Validateur lorsque l'`StateSynced`événement est émis. Le Validateur invoque la fonction `onStateReceive`sur le contrat du récepteur pour soumettre les données. Pour mettre en oeuvre, nous importons d'abord l'interface [StateReceiver](https://github.com/maticnetwork/contracts/blob/release-betaV2/contracts/child/bor/StateReceiver.sol) et écrivons notre logique personnalisée - pour interpréter les données transférées dans onStateReceive.

Voici à quoi ressemble notre Receiver.sol:

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

La fonction affecte simplement le dernier Identifiant de l'État et les données reçues à des variables. [Identifiant de l'État](https://github.com/maticnetwork/contracts/blob/239a91045622ddcf9ebec2cec81fdc6daa3a33e3/contracts/root/stateSyncer/StateSender.sol#L36) est une simple référence unique à l'état transféré (un simple compteur).

Déployez votre Receiver.sol sur le testnet de Polygon et notez l'adresse et l'ABI

### 3. Obtenir la cartographie de votre Expéditeur et du Destinataire {#3-getting-your-sender-and-receiver-mapped}

Vous pouvez soit utiliser les adresses déjà déployées (mentionnées ci-dessus) pour l'expéditeur et le destinataire, soit déployer vos contrats personnalisés et demander une cartographie effectuée ici: [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

### 4. Envoyer et Recevoir des données {#4-sending-and-receiving-data}

Maintenant que nos contrats sont en place et que la cartographie est terminée, nous allons écrire un simple scénario du nœud pour envoyer des octets hexadécimaux arbitraires, les recevoir sur Polygone et interpréter les données!

**4.1 Configurez votre scénario**

Nous allons d'abord initialiser nos objets web3, portemonnaie pour faire les transactions et les contrats

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

Nous utilisons le paquet @maticnetwork/meta pour les RPCs, le paquet n'est pas nécessaire pour exécuter le scénario.

`matic` et `main`les objets font référence à l'objet web3 initialisé avec le RPC de Polygone et de Ropsten respectivement.

`sender` et `receiver` les objets font référence aux objets du contrat de Sender.sol et Receiver.sol que nous avons déployés à l'Étape 1 et 2.

**4.2 Envoyer les données**

Ensuite, configurons nos fonctions pour créer un bytestring des données et l'envoyer via le contrat de l'expéditeur:

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

L'appel à la fonction  `getData`convertit une chaîne ascii (par exemple, `Hello World !`) en une chaîne d'octets (par exemple, `0x48656c6c6f20576f726c642021`), tandis que la fonction `sendData`reçoit `data` (une chaîne ascii), appelle `getData`et transmet la chaîne d'octets à l'expéditeur.

**4.3 Recevoir les données**

Ensuite, nous allons vérifier les données reçues sur Receiver.sol.

L'exécution de la synchronisation d'état devrait prendre environ 7 à 8 minutes.

Ajoutez les fonctions suivantes pour vérifier (a) le nombre d'états envoyés par l'Expéditeur et (b) le Dernier état reçu par le Destinataire.

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

la fonction `checkReceiver` appelle simplement les variables que nous avons définies dans le contrat - qui seraient définies dès que le Validateur appelle `onStateReceive`sur le contrat. La `getString`fonction interprète simplement le bytestring (le convertit en ascii).

```jsx
function getString(data) {
  let string = matic.utils.hexToAscii(data);
  return string
}
```

Enfin, nous allons rédiger une méthode pour exécuter nos fonctions:

```jsx
async function test() {
	await sendData ('Sending a state sync! :) ')
	await checkSender ()
	await checkReceiver ()
}
```

**4.4 Mettre tout ensemble!**

Voici à quoi ressemble notre scénario test:

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

**4.5 Exécutons le scénario**

Une exécution réussie du scénario ci-dessus fournit une sortie comme:

```bash
$ node test
> sent data from root 0x4f64ae4ab4d2b2d2dc82cdd9ddae73af026e5a9c46c086b13bd75e38009e5204
number of states sent from sender: 1
last state id: 453 and last data: 0x48656c6c6f20576f726c642021
interpreted data: Hello World !
```
