---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: Costruire la tua prossima app blockchain su Polygon
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dagger è il modo migliore per ricevere aggiornamenti in tempo reale dalla blockchain di Ethereum.
Consente alle tue dApp e al tuo sistema di back-end di recuperare gli eventi della blockchain di Ethereum, ad esempio transazioni, trasferimenti di token, ricevute e registri in tempo reale su websocket o socket.

Gestiamo l'infrastruttura per garantire eventi in tempo reale affidabili e scalabili. `@maticnetwork/dagger` è una libreria consumer per il progetto Dagger scritta in NodeJS. Utilizza il server Dagger per ricevere aggiornamenti in tempo reale dalla rete di Ethereum.

## Installazione {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## Rete {#network}

### Rete di Ethereum {#ethereum-network}

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

### Rete di Matic {#matic-network}

#### Mainnet {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Testnet Mumbai {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## Esempio {#example}

- Innanzitutto crea un progetto _npm_.

```bash
npm init -y
touch index.js
```

- Ora puoi inserire il seguente snippet di codice in `index.js`.

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

- Esegui `index.js` per iniziare a ricevere il numero di blocco non appena ne viene creato uno nuovo.

```bash
node index.js
```

## API {#api}

### new Dagger(url) {#new-dagger-url}

Crea un oggetto dagger

- `url`è l'indirizzo del server dagger. Consulta la [sezione Rete](#network) per tutti i valori di URL disponibili.

Esempio:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

Crea la sottoscrizione a un argomento

- `event` è un argomento `String` per il quale creare una sottoscrizione. Sono supportati i caratteri jolly di `event` (`+` per un solo livello e `#` per più livelli)
- `fn` - `function (data, removed)`
fn verrà eseguito quando si verifica l'evento:
  - `data` dati dall'evento
  - `removed` flag che segnala se i dati sono stati rimossi dalla blockchain in seguito alla riorganizzazione.

Esempio:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

Come [on](#daggeronevent-fn) ma verrà attivato solo una volta.

Esempio:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

Annulla la sottoscrizione a un argomento

- `event` è un argomento `String` da cui annullare la sottoscrizione
- `fn` - `function (data, removed)`

Esempio:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

Crea un oggetto room nel dagger. L'oggetto `room` deve essere uno dei due valori seguenti:
  - `latest`
  - `confirmed`

L'oggetto `room` possiede i seguenti metodi:
  - `on` uguale a `on` di dagger
  - `once` uguale a `once` di dagger
  - `off` uguale a `off` di dagger

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

Per chiudere il dagger sono disponibili le seguenti opzioni:

- `force`: se è impostato su true, il dagger si chiude immediatamente Questo parametro è
facoltativo.

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

Crea un wrapper web3 contract per supportare Dagger.

- Innanzitutto crea un oggetto web3 contract.

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- Ora crea un wrapper per il contratto dagger su di esso.

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- È ora di filtrare gli eventi contratto

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- Per monitorare gli eventi contratto

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- Interrompere il monitoraggio degli eventi

```js
// stop watching
filter.stopWatching();
```

## Eventi {#events}

Ogni evento ha un oggetto room ∈ {`latest`, `confirmed`}.
  - `latest` : gli eventi vengono attivati immediatamente dopo il blocco incluso nella catena.
  - `confirmed` : gli eventi vengono attivati dopo 12 conferme.

Se vuoi mostrare gli aggiornamenti nell'interfaccia utente della tua dApp, usa eventi `latest`. L'interfaccia utente sarà più facile da utilizzare e l'esperienza utente sarà migliore.

Usa eventi `confirmed` per azioni irreversibili dal server o sull'interfaccia utente, come inviare e-mail, notifiche o consentire all'utente di eseguire azioni successive sull'interfaccia utente dopo che una transazione è stata confermata.

### Eventi di rete {#network-events}

| Eventi Ethereum | Quando? | Flag `removed` |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| blocco | Per ogni nuovo blocco creato | Sì |
| block.number | Per ogni nuovo numero di blocco creato |                |
| block.hash | Per ogni nuovo hash di blocco creato | Sì |
| block/`number` | Quando un determinato blocco verrà incluso nella catena | Sì |
| addr/`address`/tx | A ogni nuova transazione per `address` | Sì |
| addr/`address`/tx/out | A ogni nuova transazione in uscita per `address` | Sì |
| addr/`address`/tx/in | A ogni nuova transazione in entrata per `address` | Sì |
| tx/`txId` | Quando un determinato `txId` è incluso nel blocco | Sì |
| tx/`txId`/success | Quando lo stato tx è riuscito (incluso nel blocco) per `txId` | Sì |
| tx/`txId`/fail | Quando tx fallisce (incluso nel blocco) per `txId` | Sì |
| tx/`txId`/receipt | Quando viene generata la ricevuta (inclusa nel blocco) per `txId` | Sì |
| addr/`contractAddress`/deployed | Quando un nuovo `contractAddress` è incluso nel blocco | Sì |
| log/`contractAddress` | Quando viene generato un nuovo log per `contractAddress` | Sì |
| log/`contractAddress`/filter/`topic1`/`topic2` | Quando viene generato un nuovo log con `topic1` e `topic2` per `contractAddress` | Sì |

### Eventi Dagger {#dagger-events}

| Evento Dagger | Quando? | argomenti |
| ----------------- | ------------------------------ | -------------- |
| connection.status | Quando cambia lo stato della connessione | valore: booleano |


Ogni evento deve iniziare con un oggetto room:

#### blocco {#block}

Per ogni nuovo blocco

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

Per ogni nuovo numero di blocco

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

Per ogni nuovo hash di blocco

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

Quando verrà incluso nella catena un determinato blocco **X**

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

A ogni nuova transazione per `address`

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

`dir` è la direzione della transazione ∈ {`in`, `out`}. `address` può essere omesso per ricevere la notifica per qualsiasi indirizzo.

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

A ogni nuova transazione in entrata per `address`

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

A ogni nuova transazione in uscita per `address`

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

Usa la notazione con caratteri jolly al posto di `address` per ricevere una notifica per tutte le transazioni in entrata e in uscita.

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

`status` è lo stato di `txId` ∈ {`success`, `fail`, `receipt`}. Può anche essere lasciato vuoto, e si ottiene `tx/{txId}`, attivato quando `txId` viene incluso nel blocco.

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

Quando un determinato `txId` è incluso nel blocco

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

Quando lo stato tx è riuscito (incluso nel blocco) per `txId`

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

Quando tx fallisce (incluso nel blocco) per `txId`

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

Quando viene generata la ricevuta (inclusa nel blocco) per `txId`

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

Quando viene generato il log per `contractAddress`

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

Quando viene generato un nuovo log con `topic0`, `topic1` e `topic2` per `contractAddress`

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> I nomi degli eventi fanno distinzione tra maiuscole e minuscole. `address`, `txId` e `topics` devono essere in minuscolo.

> Nota: puoi utilizzare il carattere jolly anche per gli eventi. Esistono due tipi di caratteri jolly: `+` (per un evento singolo) e `#` (per più eventi). Usali con cautela in quanto recuperano più dati di quelli di cui hai bisogno e possono sovraccaricare di dati la tua dApp.



## Server dagger di test {#test-dagger-server}

Questa libreria è composta dall'eseguibile `woodendagger` che è un server di test di dagger sulla tua macchina locale. Quindi puoi eseguire il test con TestRPC.

Non utilizzare `woodendagger` nell'ambiente di produzione. È solo a scopo di sviluppo. Non supporta il flag `removed`.

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## Assistenza {#support}

In caso di domande, commenti o richieste di funzionalità, non esitare a contattarci su [Telegram](https://t.me/maticnetwork)

## Licenza {#license}

MIT
