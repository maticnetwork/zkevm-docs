---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: Crea tu próxima aplicación de cadena de bloques en Polygon
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dagger es la mejor forma de obtener actualizaciones en tiempo real de la cadena de bloques de Ethereum.
Ofrece una forma para que tus aplicaciones descentralizadas y el sistema backend reciban los eventos de la cadena de bloques de Ethereum, es decir, transacciones, transferencias de tokens, recibos y registros en tiempo real a través de websocket o socket.

Mantenemos la infraestructura para eventos fiables y escalables en tiempo real. `@maticnetwork/dagger` es una biblioteca de consumo para el proyecto Dagger escrita en NodeJS. Esta utiliza el servidor Dagger para conseguir actualizaciones en tiempo real de la red Ethereum.

## Instalación {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## Red {#network}

### Red de Ethereum {#ethereum-network}

#### Red principal {#mainnet}

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

### Red MATIC {#matic-network}

#### Red principal {#mainnet-1}

```sh
Websocket: wss://matic-mainnet.dagger.matic.network
Socket: mqtts://matic-mainnet.dagger.matic.network (You can also use `ssl://` protocol)
```

#### Red de pruebas de Mumbai {#mumbai-testnet}

```sh
Websocket: wss://mumbai-dagger.matic.today
Socket: mqtts://mumbai-dagger.matic.today (You can also use `ssl://` protocol)
```

## Ejemplo {#example}

- Primero vamos a crear un proyecto _npm_.

```bash
npm init -y
touch index.js
```

- Ahora podemos poner el siguiente fragmento de código en `index.js`.

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

- Ejecuta `index.js` y comenzarás a recibir el número de bloque tan pronto como se cree un nuevo bloque.

```bash
node index.js
```

## API {#api}

### nueva Dagger(url) {#new-dagger-url}

Crear objeto dagger

- `url` es la dirección del servidor de dagger. Revisar si la [sección de la red](#network) tiene todos los valores de URL disponibles.

Ejemplo:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

Suscribirse a un tema

- `event` es un tema `String` al cual suscribirse. Se admiten caracteres `event` (`+` - para un único nivel y `#` - para varios niveles)
- `fn` - `function (data, removed)`
fn se ejecutará cuando se produzca el evento:
  - Datos `data` del evento
  - La señal `removed` que dice si los datos se eliminan de la cadena de bloques debido a una reorganización.

Ejemplo:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

Igual que [encendido](#daggeronevent-fn) pero se activará solo una vez.

Ejemplo:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

Cancelar la suscripción a un tema

- `event`es un tema `String` para cancelar la suscripción
- `fn` - `function (data, removed)`

Ejemplo:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

Crea espacio a partir de dagger. `room`tiene que ser uno de los dos valores
  - `latest`
  - `confirmed`

El objeto `room`tiene los siguientes métodos:
  - `on`igual que dagger`on`
  - `once`igual que dagger`once`
  - `off`igual que dagger`off`

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

Cerrar el dagger, acepta las siguientes opciones:

- `force`: pasarlo a true cerrará dagger inmediatamente. Este parámetro es
opcional.

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

Crea la envoltura del contrato web3 para que sea compatible con Dagger.

- Primero crea el objeto del contrato web3.

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- Ahora crearemos una envoltura para el contrato de Dagger en este.

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- Hora de filtrar los eventos de los contratos

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- Observación de los eventos de los contratos

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- Detener la observación de eventos

```js
// stop watching
filter.stopWatching();
```

## Eventos {#events}

Cada evento tiene una sala ∈ {`latest`, `confirmed`}.
  - `latest` : Los eventos se activan inmediatamente después de la inclusión del bloque en la cadena.
  - `confirmed` : Los eventos se activan después de 12 confirmaciones.

Si quieres mostrar las actualizaciones de la IU en tu DApp, utiliza eventos `latest`. Eso ayudará a que la interfaz (IU) y la experiencia del usuario (UX) sean mejores y más fáciles de usar.

Utiliza eventos `confirmed` para tareas irreversibles desde el servidor o en la IU. Como, por ejemplo, el envío de correos electrónicos, notificaciones o la posibilidad de que el usuario realice otras tareas en la interfaz de usuario después de confirmar una transacción.

### Eventos de la red {#network-events}

| Evento de Ethereum | ¿Cuándo? | Señal de `removed` |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| bloque | Para cada nuevo bloque creado | Sí |
| block.number | Por cada nuevo número de bloque creado |                |
| block.hash | Por cada nuevo hash de bloque creado | Sí |
| block/`number` | Cuando un bloque específico se incluya en el futuro en la cadena | Sí |
| addr/`address`/tx | En cada nueva transacción para `address` | Sí |
| addr/`address`/tx/out | En cada nueva transacción de salida para `address` | Sí |
| addr/`address`/tx/in | En cada nueva transacción entrante para `address` | Sí |
| tx/`txId` | Cuando `txId` dado se incluye en el bloque | Sí |
| tx/1`txId`/success | Cuando el estado de la transacción es culminada (incluida en el bloque) para `txId` | Sí |
| tx/`txId`/fail | Cuando la transacción falla (incluida en el bloque) para `txId` | Sí |
| tx/`txId`/receipt | Cuando se genera el recibo (incluido en el bloque) para `txId` | Sí |
| addr/1`contractAddress`/implementado | Cuando el nuevo `contractAddress` se incluye en el bloque | Sí |
| log/`contractAddress` | Cuando se genera un nuevo registro para`contractAddress` | Sí |
| log/`contractAddress`/filter/`topic1`/`topic2` | Cuando se genera un nuevo registro con `topic1` y `topic2` para `contractAddress` | Sí |

### Eventos de Dagger {#dagger-events}

| Evento de Dagger | ¿Cuándo? | args |
| ----------------- | ------------------------------ | -------------- |
| connection.status | Cuando el estado de la conexión cambia | valor: Booleano |


Todo evento debe comenzar con espacio:

#### bloque {#block}

Para cada bloque nuevo

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

Para el número de cada nuevo bloque

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

Para el hash de cada nuevo bloque

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

Cuando un bloque **X** específico se incluya en la cadena en el futuro

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

En cada nueva transacción para `address`

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

`dir`es la dirección de la transacción ∈ { `in`, `out`}. `address` puede omitirse para recibir la notificación para cualquier dirección.

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

En cada nueva transacción entrante para `address`

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

En cada nueva transacción de salida para `address`

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

Usar la notación de comodín en lugar de `address`, para recibir notificaciones de todas las transacciones entrantes y salientes.

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

`status`es el estado de `txId`∈ {`success`, `fail`, `receipt`}. También se puede mantener vacío, es decir, que dé como resultado `tx/{txId}` y se active cuando `txId`se incluya en el bloque.

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

Cuando `txId` dado se incluye en el bloque

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

Cuando el estado de la transacción es culminada (incluida en el bloque) para `txId`

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

Cuando la transacción falla (incluida en el bloque) para `txId`

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

Cuando se genera el recibo (incluido en el bloque) para `txId`

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

Cuando se genera el registro para `contractAddress`

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

Cuando se genera un nuevo registro con `topic0`, `topic1`y `topic2`para `contractAddress`

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> Los nombres de los eventos distinguen entre mayúsculas y minúsculas. `address`, `txId`y `topics`deben estar en minúsculas.

> Nota: También puede utilizar comodines para los eventos. Hay dos tipos de comodines: `#`(para uno) y `+`(para varios). Utilízalo con precaución, ya que traerá más datos de los que necesitas y puede bombardear con datos a tu DApp.



## Pon a prueba el servidor de Dagger {#test-dagger-server}

Esta biblioteca consta de `woodendagger`ejecutable que es el servidor de Dagger de prueba en tu máquina local. Así que puedes probar con TestRPC.

Por favor, no uses `woodendagger`en la producción. Es solo para objetivos de desarrollo. No admite la indicación `removed`.

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## Soporte {#support}

Si tienes alguna duda, comentario o solicitud de funciones, no dudes en contactarnos en[Telegram](https://t.me/maticnetwork)

## Licencia {#license}

MIT
