---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: Créez votre prochaine application blockchain sur Polygon
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dagger est le meilleur moyen d'obtenir des mises à jour en temps réel de la Blockchain d'Ethereum. Il fournit un moyen pour votre système DApps et Backend d'obtenir des événements de la Blockchain d'Ethereum, c'est-à-dire des transactions, des transferts de jetons, des reçus et des journaux en temps réel via Websocket ou socket.

Nous maintenons une infrastructure pour des événements en temps réel fiables et évolutifs. `@maticnetwork/dagger` est une bibliothèque grand public pour le projet Dagger écrite dans NodeJS. Il utilise le serveur Dagger pour obtenir des mises à jour en temps réel du Réseau Ethereum.

## Installation {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## Réseau {#network}

### Réseau Ethereum {#ethereum-network}

#### Réseau principal {#mainnet}

```sh
Websocket: wss://mainnet.dagger.matic.network
Socket: mqtts://mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Kovan {#kovan}

```sh
Websocket: wss://kovan.dagger.matic.network
Socket: mqtts://kovan.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Ropsten {#ropsten}

```sh
Websocket: wss://ropsten.dagger.matic.network
Socket: mqtts://ropsten.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Goerli {#goerli}

```sh
Websocket: wss://goerli.dagger.matic.network
Socket: mqtts://goerli.dagger.matic.network (You can also use `ssl://` protocol)
```

### Réseau Matic {#matic-network}

#### Réseau principal {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Mumbai Testnet {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## Exemple {#example}

- Commençons par créer un projet _npm_ .

```bash
npm init -y
touch index.js
```

- Nous pouvons maintenant mettre l'extrait du code suivant dans `index.js`.

```javascript
const Dagger = require('@maticnetwork/dagger')

// connect to correct dagger server, for receiving network specific events
//
// you can also use socket based connection
const dagger = new Dagger("wss://mainnet.dagger.matic.network")

// get new block as soon as it gets created
dagger.on('latest:block.number', result => {
  console.log(`New block created: ${result}`)
})
```

- Exécutez `index.js` et vous commencerez à recevoir le numéro de bloc dès qu'un nouveau bloc sera créé.

```bash
node index.js
```

## API {#api}

### nouveau Dagger (url) {#new-dagger-url}

Créer un objet Dagger

- `url`  est l'adresse du serveur dagger. Vérifier la [section réseau](#network) pour toutes les valeurs d'url disponibles.

Exemple:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

Abonnez-vous à un sujet

- `event`  est un `String` sujet  auquel s'abonner. `event`les caractères génériques  sont pris en charge (`+` - pour un seul niveau et `#` - pour plusieurs niveaux)
- `fn` - `function (data, removed)`
fn sera exécuté lorsque l'événement se produira:
  - `data` les données de l'événement
  - `removed` le drapeau indiquant si les données sont supprimées de la blockchain en raison d'une réorganisation.

Exemple:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

Identique à [sur](#daggeronevent-fn) mais ne sera tiré qu'une seule fois.

Exemple:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

Désabonnez-vous d'un sujet

- `event` est un `String` sujet dont il faut se désabonner
- `fn` - `function (data, removed)`

Exemple:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

Créez de la place avec dagger. `room` doit être une valeur sur deux
  - `latest`
  - `confirmed`

`room` l'objet dispose des méthodes suivantes:
  - `on` identique à dagger `on`
  - `once` identique à dagger `once`
  - `off` identique à dagger `off`

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

Fermer le dagger, accepte les options suivantes:

- `force`: le passer sur « vrai » fermera immédiatement Dagger. Ce paramètre est facultatif.

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

Crée un papier de contrat Web3 pour prendre en charge Dagger.

- Créez d'abord un objet de contrat web3.

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- Nous allons maintenant créer un papier de contrat Dagger dessus.

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- Il est temps de filtrer les événements du contract

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- Regarder les événements du contract

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- Arrêter de surveiller les événements

```js
// stop watching
filter.stopWatching();
```

## Événements {#events}

Chaque événement a une salle ∈ {`latest`, `confirmed`}.
  - `latest` : Les événements sont déclenchés immédiatement après le bloc inclus dans la chaîne.
  - `confirmed` : Les événements sont déclenchés après 12 confirmations.

Si vous souhaitez afficher des mises à jour sur l'interface utilisateur dans votre DApp, utilisez les événements `latest` . Cela contribuera à améliorer l'interface utilisateur et l'expérience utilisateur et à la rendre plus conviviale.

Utilisez `confirmed` les événements pour les tâches irréversibles à partir du serveur ou de l'interface utilisateur. Comme envoyer des e-mails, des notifications ou autoriser l'utilisateur à effectuer une tâche ultérieure sur l'interface utilisateur après la confirmation d'une transaction.

### Événements du Réseau {#network-events}

| Événement Ethereum | Quand? | `removed`drapeau |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| bloc | Pour chaque nouveau bloc créé | Oui |
| block.number | Pour chaque nouveau numéro de bloc créé |                |
| block.hash | Pour chaque nouveau identifiant de bloc créé | Oui |
| bloc/`number` | Lorsqu'un bloc particulier sera inclus à l'avenir dans la chaîne | Oui |
| addr/`address`/tx | À chaque nouvelle transaction pour `address` | Oui |
| addr/`address`/tx/out | À chaque nouvelle transaction sortante pour `address` | Oui |
| addr/`address`/tx/in | À chaque nouvelle transaction entrante pour `address` | Oui |
| tx/`txId` | Une fois que `txId` est inclus dans le bloc | Oui |
| tx/`txId`/succès | Lorsque le statut tx est un succès (inclus dans le bloc) pour `txId` | Oui |
| tx/`txId`/échec | Lorsque tx échoue (inclus dans le bloc) pour `txId` | Oui |
| tx/`txId`/reçu | Lorsque le reçu est généré (inclus dans le bloc) pour `txId` | Oui |
| addr/`contractAddress`/déployé | Lorsqu'un nouveau `contractAddress` est inclus dans le bloc | Oui |
| log/`contractAddress` | Lorsqu'un nouveau dossier est généré pour `contractAddress` | Oui |
| journal/`contractAddress`/filtre/`topic1`/`topic2` | Lorsqu'un nouveau journal avec `topic1` et `topic2` est généré pour `contractAddress` | Oui |

### Événements Dagger {#dagger-events}

| Événement Dagger | Quand? | args |
| ----------------- | ------------------------------ | -------------- |
| connection.status | Lorsque l'état de la connexion change | valeur : Booléen |


Chaque événement doit commencer avec un espace:

#### bloc {#block}

Pour chaque nouveau bloc

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block", result => {
  console.log("Current block : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block", result => {
  console.log("Confirmed block : ", result)
})
```

</TabItem>
</Tabs>


#### block.number {#block-number}

Pour chaque nouveau numéro de bloc

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block.number", result => {
  console.log("Current block number : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block.number", result => {
  console.log("Confirmed block number : ", result)
})
```

</TabItem>
</Tabs>

#### block.hash {#block-hash}

Pour chaque nouveau identifiant du bloc

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block.hash", result => {
  console.log("Current block hash : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block.hash", result => {
  console.log("Confirmed block hash : ", result)
})
```

</TabItem>
</Tabs>

#### bloc/{number} {#block-number-1}

Lorsqu'un bloc particulier **X**, à l'avenir est inclus dans la chaîne

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:block/X", result => {
  console.log("Included in chain : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:block/X", result => {
  console.log("Included in chain : ", result)
})
```

</TabItem>
</Tabs>

#### addr/{address}/tx {#addr-address-tx}

À chaque nouvelle transaction pour `address`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/{address}/tx", result => {
  console.log("New Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/{address}/tx", result => {
  console.log("New Transaction : ", result)
})
```

</TabItem>
</Tabs>

#### addr/{address}/tx/{dir} {#addr-address-tx-dir}

`dir` est le sens de transaction ∈ {`in`, `out`}. `address` peut être omis pour recevoir une notification pour n'importe quelle adresse.

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

À chaque nouvelle transaction entrante pour `address`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/{address}/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/{address}/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="out">

À chaque nouvelle transaction sortante pour `address`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/{address}/tx/out", result => {
  console.log("New Outgoing Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/{address}/tx/out", result => {
  console.log("New Outgoing Transaction : ", result)
})
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="all">

En utilisant la notation générique à la place de `address`, pour être averti de toutes les transactions entrantes et sortantes.

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:addr/+/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:addr/+/tx/in", result => {
  console.log("New Incoming Transaction : ", result)
})
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

#### tx/{txId}/{status} {#tx-txid-status}

`status` est `txId`le statut de  ∈ {`success`, `fail`, `receipt`}. Il peut également être laissé vide, c'est-à-dire aboutissant au `tx/{txId}`, déclenché lorsque `txId` est inclus dans le bloc.

<Tabs
defaultValue="any"
values={[
{ label: 'any', value: 'any', },
{ label: 'success', value: 'success', },
{ label: 'fail', value: 'fail', },
{ label: 'receipt', value: 'receipt', },
]
}>
<TabItem value="any">

Une fois que `txId` est inclus dans le bloc

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="success">

Lorsque le statut tx est un succès (inclus dans le bloc) pour `txId`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}/success", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}/success", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="fail">

Lorsque tx échoue (inclus dans le bloc) pour `txId`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}/fail", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}/fail", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="receipt">

Lorsque le reçu est généré (inclus dans le bloc) pour `txId`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:tx/{txId}/receipt", result => { console.log(result) })
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:tx/{txId}/receipt", result => { console.log(result) })
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

#### log/{contractAddress} {#log-contractaddress}

Lorsque le journal est généré pour `contractAddress`

<Tabs
defaultValue="latest"
values={[
{ label: 'latest', value: 'latest', },
{ label: 'confirmed', value: 'confirmed', },
]
}>
<TabItem value="latest">

```javascript
dagger.on("latest:log/{contractAddress}", result => {
  console.log("New Log : ", result)
})
```

</TabItem>
<TabItem value="confirmed">

```javascript
dagger.on("confirmed:log/{contractAddress}", result => {
  console.log("New Log : ", result)
})
```

</TabItem>
</Tabs>

#### log/{contractAddress}/filter/{topic0}/{topic1}/{topic2} {#log-contractaddress-filter-topic0-topic1-topic2}

Lorsqu'un nouveau journal avec `topic0`, `topic1` & `topic2` est généré pour `contractAddress`

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> Les noms d'événements sont sensibles à la casse. `address`, `txId` et `topics` doivent être en minuscules.

> Remarque: Vous pouvez également utiliser des caractères génériques pour les événements. Il existe deux types de caractères génériques: `+` (pour les simples) et `#` (pour les multiples). Utiliser-le avec prudence, car il récupérera plus de données que nécessaires et peut bombarder de données à votre DApp.



## Tester le Serveur Dagger {#test-dagger-server}

Cette bibliothèque consiste en un `woodendagger` exécutable qui est le serveur dagger de test sur votre machine locale. Vous pouvez donc effectuer le test avec TestRPC.

Veuillez ne pas utiliser `woodendagger` en production. C'est uniquement à des fins de développement. Il ne prend pas en charge `removed` le drapeau.

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## Prise En Charge {#support}

Si vous avez des questions, des commentaires ou des requêtes de fonctionnalités, n'hésitez pas à nous contacter sur [Telegram](https://t.me/maticnetwork)

## Licence {#license}

MIT
