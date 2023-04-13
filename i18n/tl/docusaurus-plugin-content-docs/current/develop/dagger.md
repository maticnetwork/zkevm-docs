---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: Itayo ang iyong susunod na blockchain app sa Polygon
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ang Dagger ay ang pinakamahusay na paraan upang makakuha ng mga realtime na update mula sa Ethereum Blockchain.
Nagbibigay ito ng paraan para sa iyong mga DApp at Backend na sistema upang makakuha ng mga event ng Ethereum blockchain, ibig sabihin mga transaksyon, mga paglipat ng token, resibo at log nang realtime sa websocket o socket.

Nagpapanatili kami ng imprastraktura para sa mga maaasahan at nai-scale na realtime na event. Ang `@maticnetwork/dagger` ay ang consumer library para sa proyekto ng Dagger na isinulat sa NodeJS. Ginagamit nito ang server ng Dagger para makakuha ng mga realtime na update mula sa Ethereum Network.

## Pag-install {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## Network {#network}

### Ethereum Network {#ethereum-network}

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

### Matic Network {#matic-network}

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

## Halimbawa {#example}

- Gumawa muna tayo ng proyekto ng _npm_.

```bash
npm init -y
touch index.js
```

- Ngayon, maaari nating ilagay ang sumusunod na code snippet sa `index.js`.

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

- Patakbuhin ang `index.js` at magsisimula kang makatanggap ng numero ng block sa sandaling may magawang bagong block.

```bash
node index.js
```

## API {#api}

### bagong Dagger(url) {#new-dagger-url}

Gumawa ng object ng dagger

- Ang `url` ay ang address ng server ng dagger. Tingnan ang [seksyon ng network](#network) para sa lahat ng magagamit na value ng url.

Halimbawa:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

Mag-subscribe sa isang topic

- Ang `event` ay isang `String` topic na isu-subscribe. Ang mga `event` wildcard character ay sinusuportahan (`+` - para sa iisang level at `#` - para sa maraming level)
- `fn` - ang `function (data, removed)`
fn ay isasagawa kapag nangyari ang event:
  - `data` data mula sa event
  - `removed` flag na nagsasabi kung inalis ang data mula sa blockchain dahil sa muling pagsasaayos.

Halimbawa:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

Katulad ng [on](#daggeronevent-fn) ngunit ifa-fire lang nang isang beses.

Halimbawa:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

Mag-unsubscribe mula sa isang topic

- Ang `event` ay isang `String` topic na ia-unsubscribe
- `fn` - `function (data, removed)`

Halimbawa:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

Gumawa ng room mula sa dagger. Ang `room` ay dapat na isa sa dalawang value
  - `latest`
  - `confirmed`

Ang `room` object ay may mga sumusunod na paraan:
  - `on` katulad ng dagger `on`
  - `once` katulad ng dagger `once`
  - `off` katulad ng dagger `off`

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

Isara ang dagger, tinatanggap ang mga sumusunod na opsyon:

- `force`: ang pagpasa nito sa true ay kaagad na isasara ang dagger. Ang parameter na ito ay
opsyonal.

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

Gumagawa ng web3 contract wrapper upang suportahan ang Dagger.

- Gumawa muna ng web3 contract object.

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- Ngayon, gagawa tayo ng dagger contract wrapper sa loob nito.

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- Oras nang i-filter out ang mga event ng kontrata

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- Pagbabantay sa mga event ng kontrata

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- Pagtigil sa pagbabantay sa event

```js
// stop watching
filter.stopWatching();
```

## Mga event {#events}

Bawat event ay may room ∈ {`latest`, `confirmed`}.
  - `latest` : Pina-fire kaagad ang mga event pagkatapos maisama ang block sa chain.
  - `confirmed` : Pina-fire ang mga event pagkatapos ng 12 kumpirmasyon.

Kung gusto mong magpakita ng mga update sa UI sa iyong DApp, gumamit ng mga `latest` event. Makakatulong ito na gawing mas mahusay at user friendly ang UI/UX.

Gumagamit ng mga `confirmed` event para sa mga irreversible na gawain mula sa server o sa UI. Tulad pagpapadala ng email, mga notipikasyon o payagan ang user na gumawa ng kasunod na gawain sa UI pagkatapos makumpirma ang isang transaksyon.

### Mga Event sa Network {#network-events}

| Event sa Ethereum | Kailan? | `removed` flag |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| block | Para sa bawat bagong block na nagawa | Oo |
| block.number | Para sa bawat bagong numero ng block na nagawa |                |
| block.hash | Para sa bawat bagong hash ng block na nagawa | Oo |
| block/`number` | Kapag isinama sa chain ang partikular na block sa hinaharap | Oo |
| addr/`address`/tx | Sa bawat bagong transaksyon para sa `address` | Oo |
| addr/`address`/tx/out | Sa bawat bagong papalabas na transaksyon para sa `address` | Oo |
| addr/`address`/tx/in | Sa bawat bagong papasok na transaksyon para sa `address` | Oo |
| tx/`txId` | Kapag isinama sa block ang ibinigay na `txId` | Oo |
| tx/`txId`/success | Kapag tagumpay ang tx status (isinama sa block) para sa `txId` | Oo |
| tx/`txId`/fail | Kapag nabigo ang tx (isinama sa block) para sa `txId` | Oo |
| tx/`txId`/receipt | Kapag na-generate ang resibo (isinama sa block) para sa `txId` | Oo |
| addr/`contractAddress`/deployed | Kapag isinama sa block ang bagong `contractAddress` | Oo |
| log/`contractAddress` | Kapag na-generate ang bagong log para sa `contractAddress` | Oo |
| log/`contractAddress`/filter/`topic1`/`topic2` | Kapag na-generate ang bagong log na may `topic1` at `topic2` para sa `contractAddress` | Oo |

### Mga Event ng Dagger {#dagger-events}

| Event ng Dagger | Kailan? | args |
| ----------------- | ------------------------------ | -------------- |
| connection.status | Kapag nagbabago ang status ng koneksyon | value: Boolean |


Bawat event ay kailangang magsimula sa room:

#### block {#block}

Para sa bawat bagong block

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

Para sa bawat bagong numero ng block

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

Para sa bawat bagong hash ng block

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

Kapag isinama sa chain ang partikular na block **X**, sa hinaharap

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

Sa bawat bagong transaksyon para sa `address`

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

Ang `dir` ay direksyon ng transaksyon ∈ {`in`, `out`}. Maaaring huwag isama ang `address` para makatanggap ng notipikasyon para sa anumang address.

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

Sa bawat bagong papasok na transaksyon para sa `address`

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

Sa bawat bagong papalabas na transaksyon para sa `address`

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

Ang paggamit ng wildcard notation kapalit ng `address`, upang maabisuhan para sa lahat ng papasok at papalabas na transaksyon.

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

Ang `status` ay ang status ng `txId` ∈ {`success`, `fail`, `receipt`}. Maaari din itong panatilihing walang laman, ibig sabihin magreresulta sa `tx/{txId}`, na na-trigger kapag naisama sa block ang `txId`.

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

Kapag isinama sa block ang ibinigay na `txId`

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

Kapag tagumpay ang tx status (isinama sa block) para sa `txId`

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

Kapag nabigo ang tx (isinama sa block) para sa `txId`

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

Kapag na-generate ang resibo (isinama sa block) para sa `txId`

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

Kapag na-generate ang log para sa `contractAddress`

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

Kapag na-generate ang log na may `topic0`, `topic1` at `topic2` para sa `contractAddress`

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> Case-sensitive ang mga pangalan ng event. Ang `address`, `txId` at `topics` dapat na nasa maliit na titik.

> Tandaan: Maaari ka ring gumamit ng wildcard para sa mga event. May dalawang uri ng mga wildcard: `+` (para sa iisa) at `#` (para sa marami). Gamitin nang may pag-iingat dahil magfe-fetch ito ng mas maraming data kaysa sa kailangan mo, at maaaring mag-bombard ng data sa iyong DApp.



## Test Dagger Server {#test-dagger-server}

Binubuo ang library na ito ng `woodendagger` executable na test dagger server sa iyong lokal na machine. Upang makapag-test ka gamit ang TestRPC.

Mangyaring huwag gamitin ang `woodendagger` sa produksyon. Para lang ito sa layunin ng pagpapaunlad. Hindi nito sinusuportahan ang `removed` flag.

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## Suporta {#support}

Kung mayroon kang anumang mga query, feedback o mga kahilingan sa feature, huwag mag-atubiling makipag-ugnayan sa amin sa [Telegram](https://t.me/maticnetwork)

## Lisensya {#license}

MIT
