---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: Bir sonraki blok zinciri uygulamanızı Polygon üzerinde oluşturun
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dagger, Ethereum Blok Zinciri'nden gerçek zamanlı güncellemeler almanın en iyi yoludur.
DApp'lerinizin ve Arka uç sisteminizin Ethereum blok zinciri olaylarını, yani işlemler, token aktarımları, alındılar ve günlükleri websocket veya socket üzerinden gerçek zamanlı olarak alması için bir yol sağlar.

Güvenilir ve ölçeklenebilir gerçek zamanlı olaylar için altyapı sağlıyoruz. `@maticnetwork/dagger`, NodeJS'de yazılan Dagger projesi için tüketici kütüphanesidir. Ethereum Ağı'ndan gerçek zamanlı güncellemeler almak için Dagger sunucusu kullanır.

## Kurulum {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## Ağ {#network}

### Ethereum Ağı {#ethereum-network}

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

### Matic Ağı {#matic-network}

#### Mainnet {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Mumbai Test Ağı {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## Örnek {#example}

- İlk olarak bir _npm_ projesi oluşturalım.

```bash
npm init -y
touch index.js
```

- Şimdi `index.js`'ye aşağıdaki kod parçacığını koyabiliriz.

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

- `index.js`'yi çalıştırdığınız zaman, yeni blok oluşturulur oluşturulmaz blok numarası almaya başlayacaksınız.

```bash
node index.js
```

## API {#api}

### yeni Dagger(url) {#new-dagger-url}

Dagger nesnesi oluşturur

- `url`, dagger sunucusunun adresidir. Kullanılabilir tüm url değerleri için [ağ bölümüne](#network) göz atın.

Örnek:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

Bir konuya abone olun

- `event`, abone olunacak bir `String` konusudur. `event` joker karakterleri desteklenir (`+` - tekil seviye için ve `#` - çoklu seviye için)
- `fn` - `function (data, removed)`
olay gerçekleştiği zaman fn yürütülecektir:
  - Olaydan gelen `data` verileri
  - `removed` bayrağı, verilerin yeniden düzenleme nedeniyle blok zincirinden kaldırılıp kaldırılmadığını söyler.

Örnek:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

[on](#daggeronevent-fn) ile aynı ama sadece bir kez tetiklenir.

Örnek:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

Bir konuya aboneliği kaldırın

- `event`, aboneliğinden çıkılacak olan bir `String` konusudur
- `fn` - `function (data, removed)`

Örnek:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

Dagger'dan room oluşturur. `room` aşağıdaki iki değerden biri olmalıdır
  - `latest`
  - `confirmed`

`room` nesnesinde aşağıdaki metotlar bulunur:
  - `on`, dagger `on` ile aynı
  - `once`, dagger `once` ile aynı
  - `off`, dagger `off` ile aynı

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

Dagger'ı kapatır, aşağıdaki seçenekleri kabul eder:

- `force`: Bunu true yapmak dagger'ı hemen kapatacaktır. Bu parametre
opsiyoneldir.

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

Dagger'ı desteklemek için web3 sözleşmesi paketleyici oluşturur.

- İlk olarak bir web3 sözleşme nesnesi oluşturun.

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- Şimdi, onun üzerine bir dagger sözleşmesi paketleyici oluşturacağız.

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- Sözleşme olaylarını filtreleme zamanı

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- Sözleşme olaylarını izleme

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- Olay izlemeyi durdurma

```js
// stop watching
filter.stopWatching();
```

## Olaylar {#events}

Her olayda bir room ∈ {`latest`, `confirmed`} bulunur.
  - `latest` : Olaylar, zincire blok eklendikten hemen sonra tetiklenir.
  - `confirmed` : Olaylar, 12 onaydan sonra tetiklenir.

DApp'inizde UI güncellemelerini göstermek isterseniz, `latest` olaylarını kullanın. UI/UX'i iyileştirmeye yardımcı olur ve kullanıcı dostudur.

Sunucudan gelen veya UI'daki geri alınamaz görevler için `confirmed` olaylarını kullanın. E-posta, bildirimler veya bir işlem onaylandıktan sonra kullanıcının sıradaki görevi UI üzerinde yapmasına izin vermek gibi.

### Ağ Olayları {#network-events}

| Ethereum olayı | Ne zaman? | `removed` bayrağı |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| block | Oluşturulan her yeni blok için | Evet |
| block.number | Oluşturulan her yeni blok numarası için |                |
| block.hash | Oluşturulan her yeni blok hash'i için | Evet |
| block/`number` | Gelecekte belirli bir blok zincire eklendiğinde | Evet |
| addr/`address`/tx | `address` için her yeni işlemde | Evet |
| addr/`address`/tx/out | `address` için her yeni giden işlemde | Evet |
| addr/`address`/tx/in | `address` için her yeni gelen işlemde | Evet |
| tx/`txId` | Belirli `txId` bloka eklendiğinde | Evet |
| tx/`txId`/success | `txId` için tx durumu başarılı olduğunda (blokta yer alır) | Evet |
| tx/`txId`/fail | `txId` için tx başarısız olduğunda (blokta yer alır) | Evet |
| tx/`txId`/receipt | `txId` için alındı oluşturulduğunda (blokta yer alır) | Evet |
| addr/`contractAddress`/deployed | Bloka yeni `contractAddress` eklendiğinde | Evet |
| log/`contractAddress` | `contractAddress` için yeni günlük oluşturulduğunda | Evet |
| log/`contractAddress`/filter/`topic1`/`topic2` | `contractAddress` için `topic1` ve `topic2` ile yeni günlük oluşturulduğunda | Evet |

### Dagger Olayları {#dagger-events}

| Dagger Olayı | Ne zaman? | argümanlar |
| ----------------- | ------------------------------ | -------------- |
| connection.status | Bağlantı durumu değiştiğinde | değer: Boolean |


Her olay bir room ile başlamalıdır:

#### block {#block}

Her yeni blok için

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

Her yeni blok numarası için

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

Her yeni blok hash'i için

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

Gelecekte belirli bir blok **X** zincire eklendiğinde

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

`address` için her yeni işlemde

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

`dir`, işlem yönüdür ∈ {`in`, `out`}. `address` herhangi bir adres için bildirim almak amacıyla dâhil edilmeyebilir.

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

`address` için her yeni gelen işlemde

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

`address` için her yeni giden işlemde

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

Gelen ve giden tüm işlemler için bildirim almak amacıyla `address` yerine joker karakterle gösterim kullanma.

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

`status`, `txId`'nin durumudur ∈ {`success`, `fail`, `receipt`}. Boş da tutulabilir; yani, `tx/{txId}` ortaya çıkar ve `txId`'nin bloka eklenmesiyle tetiklenir.

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

Belirli `txId` bloka eklendiğinde

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

`txId` için tx durumu başarılı olduğunda (blokta yer alır)

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

`txId` için tx başarısız olduğunda (blokta yer alır)

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

`txId` için alındı oluşturulduğunda (blokta yer alır)

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

`contractAddress` için günlük oluşturulduğunda

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

`contractAddress` için `topic0`, `topic1` ve `topic2` ile yeni günlük oluşturulduğunda

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> Olay isimleri büyük küçük harfe duyarlıdır. `address`, `txId` ve `topics` küçük harfli olmalıdır.

> Not: Olaylar için de joker karakter kullanabilirsiniz. İki tür joker karakter vardır: `+` (tekil için) ve `#` (çoklu için). İhtiyacınız olandan daha fazla veri getirebileceği ve DApp'inizi veri bombardımanına tutabileceği için dikkatli kullanın.



## Test Dagger Sunucusu {#test-dagger-server}

Bu kütüphane, yerel makinenizdeki test dagger sunucusu olan yürütülebilir `woodendagger` içerir. Dolayısıyla TestRPC ile test yapabilirsiniz.

Lütfen `woodendagger`'ı üretimde kullanmayın. Sadece geliştirme amaçlıdır. `removed` bayrağını desteklemez.

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## Destek {#support}

Sorunuz, geri bildiriminiz veya özellik talepleriniz varsa [Telegram](https://t.me/maticnetwork) üzerinden bize ulaşmaktan çekinmeyin.

## Lisans {#license}

MIT
