---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: Baue deine nächste Blockchain-App auf Polygon
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dagger ist der beste Weg, die Echtzeit-Updates aus Ethereum-Blockchain zu erhalten. Dadurch kannst du für deine DApps und das Backend-System die Ethereum-Blockchain-Ereignisse - d.h. Transaktionen, Token-Transfers, Belege und Protokolle über Websocket oder Socket in Echtzeit erwerben.

Wir unterhalten die Infrastruktur für zuverlässige und skalierbare Echtzeit-Ereignisse. `@maticnetwork/dagger` ist eine Verbraucherbibliothek für das in NodeJS geschriebene Dagger-Projekt. Sie verwendet den Dagger-Server, um die Echtzeit-Updates aus dem Ethereum-Netzwerk zu erhalten.

## Installation {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## Netzwerk {#network}

### Ethereum-Netzwerk {#ethereum-network}

#### Mainnet {#mainnet}

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

### Matic-Netzwerk {#matic-network}

#### Mainnet {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Mumbai Testnet {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## Beispiel {#example}

- Erstellen wir zuerst ein _npm_ Projekt.

```bash
npm init -y
touch index.js
```

- Nun können wir folgenden Code-Snippet in `index.js`eingeben.

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

- Führe sie `index.js` aus. Du bekommst die Blocknummer, sobald der neue Block erstellt wird.

```bash
node index.js
```

## API {#api}

### neuer Dagger(url) {#new-dagger-url}

Dagger-Objekt erstellen

- `url` ist Dagger-Serveradresse. Überprüfe den [Netzwerksabschnitt](#network) für alle verfügbaren URLs.

Beispiel:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

Ein Thema abonnieren

- `event` ist ein `String` Thema zum Abonnieren. `event` Platzhalterzeichen werden unterstützt (`+` für die einzelne Ebene und `#` für mehrere Ebenen)
- `fn` - `function (data, removed)`
fn wird ausgeführt, wenn das Event aufgetreten ist:
  - `data` Daten aus dem Ereignis
  - `removed` Merker zeigt, ob Daten aus der Blockchain aufgrund der Neuorganisation entfernt sind.

Beispiel:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

Ähnlich wie [auf](#daggeronevent-fn), wird aber nur einmal ausgelöst.

Beispiel:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

Abonnement für das Thema abbestellen

- `event` ist ein `String` Thema, das nicht mehr abonniert werden soll
- `fn` - `function (data, removed)`

Beispiel:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

Raum außerhalb des Daggers erstellen.  `room` muss einer der zwei Werte sein
  - `latest`
  - `confirmed`

`room` Objekt hat folgende Methoden:
  - `on` gleich wie Dagger `on`
  - `once` gleich wie Dagger `once`
  - `off` gleich wie Dagger `off`

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

Schließen des Daggers, akzeptiert folgende Optionen:

- `force`: Weitergabe an True schließt den Dagger sofort. Dieser Parameter ist optional.

```js
dagger.end({force: true}) // immediate closing
```

### dagger.Contract(web3Contract) {#dagger-contract-web3contract}

Erstellt Web3-Contract-Wrapper, um Dagger zu unterstützen.

- Erstellen Sie zuerst ein web3-Contract-Objekt.

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- Nun werden wir einen Dagger-Contract-Wrapper darauf erstellen.

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- Zeit zum Filtern der Contract-Ereignisse

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- Contract-Ereignisse ansehen

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- Ereignis nicht mehr ansehen

```js
// stop watching
filter.stopWatching();
```

## Ereignisse {#events}

Jedes Ereignis hat einen Raum ∈ {`latest`, `confirmed`}.
  - `latest` : Ereignisse werden gleich nach dem in die Chain eingeschlossenen Block ausgelöst.
  - `confirmed` : Ereignisse werden nach 12 Bestätigungen ausgelöst.

Möchtest du Updates für UI in deiner Dapp anzeigen, verwende `latest`Ereignisse. Dadurch lässt sich UI/UX besser und benutzerfreundlicher gestalten.

Verwende `confirmed` Ereignisse für unumkehrbare Aufgaben vom Server oder auf UI. Wie beim Senden von E-Mail oder bei Benachrichtigungen erlaubst du dem Benutzer, die darauffolgende Aufgabe auf UI auszuführen, nachdem eine Transaktion bestätigt wurde.

### Netzwerk-Ereignisse {#network-events}

| Ethereum-Ereignis | Wann? | `removed` Merker |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| Block | Für jeden neu erstellten Block | Ja |
| block.number | Für jede neu erstellte Block-Nummer |                |
| block.hash | Für jeden neu erstellten Block-Hash | Ja |
| block/`number` | Wenn ein bestimmter Block später in der Chain enthalten wird | Ja |
| `address`addr/tx | Auf jeder neuen Transaktion für `address` | Ja |
| addr/`address`/tx/out | Auf jeder neuen ausgehenden Transaktion für `address` | Ja |
| addr/`address`/tx/in | Auf jeder neuen eingehenden Transaktion für `address` | Ja |
| tx/`txId` | Wenn gegebene `txId` im Block enthalten ist | Ja |
| tx/`txId`/success | Wenn der tx-Status Erfolg ist (im Block enthalten) für `txId` | Ja |
| tx/`txId`/fail | Wenn tx fehlschlägt (im Block enthalten) für `txId` | Ja |
| tx/`txId`/receipt | Wenn ein Beleg erstellt ist (im Block enthalten) für `txId` | Ja |
| addr/`contractAddress`/deployed | Wenn neue  `contractAddress` im Block enthalten ist | Ja |
| log/`contractAddress` | Wenn ein neues Protokoll für `contractAddress` erzeugt ist | Ja |
| log/`contractAddress`/filter/`topic1`/`topic2` | Wenn ein neues Protokoll mit `topic1` und `topic2` für  `contractAddress` erzeugt ist | Ja |

### Dagger-Ereignisse {#dagger-events}

| Dagger-Ereignis | Wann? | args |
| ----------------- | ------------------------------ | -------------- |
| connection.status | Wenn sich der Verbindungsstatus ändert | Wert: Boolean |


Jedes Ereignis muss mit dem Raum beginnen:

#### Block {#block}

Für jeden neuen Block

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

Für jede neue Block-Nummer

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

Für jeden neuen Block-Hash

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

#### block/{number} {#block-number-1}

Wenn ein bestimmter Block **X**, später in der Chain enthalten

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

Auf jeder neuen Transaktion für `address`

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

`dir` ist die Transaktionsrichtung ∈ {`in`, `out`}. `address` kann für den Empfang der Benachrichtigung für jede Adresse weggelassen werden.

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

Auf jeder neuen eingehenden Transaktion für `address`

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

Auf jeder neuen ausgehenden Transaktion für `address`

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

Verwenden einer Platzhalter-Benachrichtigung anstatt `address`, um über alle ein- und ausgehenden Transaktionen benachrichtigt zu werden.

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

`status` ist `txId`-Status ∈ {`success`, `fail`, `receipt`}. Es kann auch leer gelassen werden, d.h. es wird `tx/{txId}`, ausgelöst wenn `txId` in den Block eingeschlossen wird.

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

Wenn gegebene `txId` im Block enthalten ist

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

Wenn der tx-Status Erfolg ist (im Block enthalten) für `txId`

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

Wenn tx fehlschlägt (im Block enthalten) für `txId`

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

Wenn ein Beleg erstellt ist (im Block enthalten) für `txId`

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

Wenn ein Protokoll für `contractAddress` erstellt ist

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

Wenn ein neues Protokoll mit `topic0`, `topic1` & `topic2` für `contractAddress`erstellt wird

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> Für die Ereignisnamen ist Groß-/Kleinschreiben wichtig. `address`, `txId` und `topics` müssen kleingeschrieben werden.

> Hinweis: Du kannst Platzhalter für Ereignisse verwenden. Dazu gibt es zwei Platzhalterarten: `+` (einzeln) und `#` (mehrfach). Verwende diese mit Vorsicht, weil dadurch mehr Daten abgerufen werden als du benötigst. Das kann deine DApp



## Dagger-Server testen {#test-dagger-server}

Diese Bibliothek besteht aus dem  `woodendagger`, ausführbar als Test-Dagger-Server auf Ihrem lokalen Rechner. So kannst du mit TestRPC testen.

Bitte verwende `woodendagger` nicht in der Produktion. Das ist nur für Entwicklungszwecke gedacht. Das unterstützt den `removed` Merker nicht.

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## Unterstützung {#support}

Für Fragen, Feedbacks oder Feature-Anfragen kannst du uns gerne über [Telegram](https://t.me/maticnetwork) kontaktieren.

## Lizenz {#license}

MIT
