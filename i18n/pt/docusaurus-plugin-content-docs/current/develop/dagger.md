---
id: dagger
title: Dagger
sidebar_label: Dagger - Single App
description: Construa o seu próximo aplicativo de blockchain no Polygon
keywords:
  - docs
  - matic
  - polygon
  - dagger
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Dagger é a melhor forma de obter atualizações em tempo real da blockchain Ethereum.
Proporciona uma forma de as suas DApps e o seu sistema Backend obterem eventos de blockchain Ethereum, ou seja, transações, transferências de tokens, recibos e registos em tempo real através de websocket ou socket.

Mantemos a infraestrutura para eventos em tempo real fiáveis e escaláveis.  `@maticnetwork/dagger`é uma biblioteca para consumidores para o projeto Dagger escrito em NodeJS. Usa o servidor Dagger para obter atualizações em tempo real da rede Ethereum.

## Instalação {#installation}

```sh
# Using Yarn
yarn add @maticnetwork/dagger

# Using NPM
npm install @maticnetwork/dagger --save
```

## Rede {#network}

### Rede Ethereum {#ethereum-network}

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

### Rede MATIC {#matic-network}

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

## Exemplo {#example}

- Vamos primeiro criar um projeto _NPM_.

```bash
npm init -y
touch index.js
```

- Agora podemos colocar o seguinte fragmento de código em `index.js`.

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

- Execute `index.js` e irá começar a receber o número de bloco assim que um novo bloco for criado.

```bash
node index.js
```

## API {#api}

### novo Dagger(url) {#new-dagger-url}

Criar objeto dagger

- `url` é o endereço do servidor dagger. Verifique a [secção de rede](#network) para todos os valores url disponíveis.

Exemplo:

```js
const dagger = new Dagger(<url>)
```

### dagger.on(event, fn) {#dagger-on-event-fn}

Subscrever um tópico

- `event` é um tópico `String` para subscrever. Os caracteres universais `event` são suportados (`+` - para um único nível e `#` - para multinível)
- `fn` - `function (data, removed)`
fn será executado quando o evento ocorreu:
  - Dados `data` do evento
  - Sinalizador `removed` a indicar se os dados são removidos da blockchain devido a reorganização.

Exemplo:

```js
dagger.on('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.once(event, fn) {#dagger-once-event-fn}

O mesmo que [on](#daggeronevent-fn) mas será ativado apenas uma vez.

Exemplo:

```js
dagger.once('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.off(event, fn) {#dagger-off-event-fn}

Cancelar a subscrição de um tópico

- `event` é um tópico `String` para cancelar a subscrição de
- `fn` - `function (data, removed)`

Exemplo:

```js
dagger.off('latest:block.number', (res, flag) => { console.log(res, flag) })
```

### dagger.of(room) {#dagger-of-room}

Crie um espaço fora de dagger. `room` tem de ser um de dois valores
  - `latest`
  - `confirmed`

O objeto `room` tem os seguintes métodos:
  - `on` igual a dagger `on`
  - `once` igual a dagger `once`
  - `off` igual a dagger `off`

```js
const latestRoom = dagger.of('latest')
const confirmedRoom = dagger.of('confirmed')
```

### dagger.end([force]) {#}

Fechar o dagger, aceita as seguintes opções:

- `force`: passá-lo para verdadeiro irá fechar o dagger imediatamente. Este parâmetro é
opcional.

```js
dagger.end({force: true}) // immediate closing
```

### dagger.contract(web3Contract) {#dagger-contract-web3contract}

Crie um invólucro de contrato web3 para suportar o Dagger.

- Crie primeiro um objeto de contrato web3.

```javascript
// web3 contract
const web3Contract = new web3.eth.Contract(abi, address)
```

- Agora vamos criar um invólucro de contrato dagger nele.

```javascript
// dagger contract
const contract = dagger.contract(web3Contract)
```

- Tempo para filtrar eventos de contrato

```javascript
const filter = contract.events.Transfer({
  filter: { from: "0x123456..." },
  room: "latest"
})
```

- Observar eventos de contrato

```javascript
// watch
filter.watch((data, removed) => { console.log(data, removed) })

// or watch only once
filter.watchOnce((data, removed) => { console.log(data, removed) })
```

- Parar a observação de eventos

```js
// stop watching
filter.stopWatching();
```

## Eventos {#events}

Cada evento tem um espaço ∈ {`latest`, `confirmed`}.
  - `latest` : Os eventos são disparados imediatamente após o bloco incluído na chain.
  - `confirmed` : Os eventos são disparados após 12 confirmações.

Se quiser mostrar atualizações na IU na sua DApp, use eventos `latest`. Irá ajudar a tornar a IU/UX melhor e mais fácil de usar.

Use eventos `confirmed` para tarefas irreversíveis do servidor ou na IU. Como enviar e-mail, notificações ou permitir ao utilizador fazer uma tarefa subsequente na IU depois de uma transação ser confirmada.

### Eventos de rede {#network-events}

| Evento Ethereum | Quando? | Sinalizador `removed` |
| ---------------------------------------------- | ----------------------------------------------------------------------- | -------------- |
| bloco | Para cada bloco criado | Sim |
| block.number | Para cada novo número de bloco criado |                |
| block.hash | Para cada novo hash de bloco criado | Sim |
| bloco/`number` | Quando um bloco particular no futuro incluído na chain | Sim |
| addr/`address`/tx | Em cada transação nova para `address` | Sim |
| addr/`address`/tx/out | Em cada transação de saída nova para `address` | Sim |
| addr/`address`/tx/in | Em cada transação de entrada nova para `address` | Sim |
| tx/`txId` | Quando `txId` dado incluído no bloco | Sim |
| tx/`txId`/success | Quando o estado tx é sucesso (incluído no bloco) para `txId` | Sim |
| tx/`txId`/fail | Quando tx falha (incluído no bloco) para `txId` | Sim |
| tx/`txId`/receipt | Quando o recibo é gerado (incluído no bloco) para `txId` | Sim |
| addr/`contractAddress`/deployed | Quando novo `contractAddress` incluído no bloco | Sim |
| log/`contractAddress` | Quando um novo registo é criado para `contractAddress` | Sim |
| log/`contractAddress`/filter/`topic1`/`topic2` | Quando um novo registo com `topic1` e `topic2` criado para `contractAddress` | Sim |

### Eventos Dagger {#dagger-events}

| Evento Dagger | Quando? | args |
| ----------------- | ------------------------------ | -------------- |
| connection.status | Quando o estado da ligação muda | valor: booleano |


Cada evento tem de iniciar com espaço:

#### bloco {#block}

Para cada novo bloco

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

Para cada novo número de bloco

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

Para cada novo hash de bloco

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

Quando bloco particular **X** no futuro incluído na chain

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

Em cada transação nova para `address`

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

`dir` é a direção de transação ∈ {`in`, `out`}. `address` pode ser omitido para receber notificação para cada endereço.

<Tabs
defaultValue="in"
values={[
{ label: 'incoming', value: 'in', },
{ label: 'outgoing', value: 'out', },
{ label: 'wild card', value: 'all', },
]
}>
<TabItem value="in">

Em cada transação de entrada nova para `address`

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

Em cada transação de saída nova para `address`

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

Utilizar a notação de caráter universal no lugar de `address`, para ser notificado para todas as transações de entrada e saída.

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

`status` é o estado de `txId` ∈ {`success`, `fail`, `receipt`}. Também pode ser mantido vazio, ou seja, resultando em `tx/{txId}`, acionado quando `txId` for incluído no bloco.

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

Quando `txId` dado incluído no bloco

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

Quando o estado tx é sucesso (incluído no bloco) para `txId`

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

Quando tx falha (incluído no bloco) para `txId`

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

Quando o recibo é gerado (incluído no bloco) para `txId`

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

Quando registo criado para `contractAddress`

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

Quando um novo registo com `topic0`, `topic1` e `topic2` criado para `contractAddress`

```javascript
// Triggers when 1 GNT (Golem token) get transferred to Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/filter/+/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', console.log)

// Triggers when any amount of GNT (Golem token) get sent from Golem multisig wallet
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/0x7da82c7ab4771ff031b66538d2fb9b0b047f6cf9/#', ...)

// Listen for every Golem token transfer (notice `#` at the end)
dagger.on('latest:log/0xa74476443119a942de498590fe1f2454d7d4ac0d/filter/0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef/#', ...)
```

> Os nomes de eventos são sensíveis às maiúsculas e minúsculas. `address`, `txId` e `topics` devem estar em minúsculas.

> Note: Também pode usar o caráter universal para eventos. Existem dois tipos de carateres universais: `+` (para um único) e `#` (para vários). Use com cuidado, pois irá buscar mais dados do que necessita, e pode bombardear dados para a sua DApp.



## Testar servidor Dagger {#test-dagger-server}

Esta biblioteca é composta por um `woodendagger` executável que é um servidor dagger de teste na sua máquina local. Assim, pode testar com TestRPC.

Não use `woodendagger` na produção. É apenas para efeitos de desenvolvimento. Não suporta o sinalizador `removed`.

```bash
$ woodendagger --url=https://mainnet.infura.io # or http://localhost:8545 for local json-rpc

# If you want to start dagger server on different ports,
# sockport: socket port for backend connection over TCP
# wsport: websocket port for frontend connection over websocket
$ woodendagger --url=http://localhost:8545 --sockport=1883 --wsport=1884

# To connect from dagger:
const dagger = new Dagger('mqtt://localhost:1883')
```

## Suporte {#support}

Se tiver alguma dúvida, feedback ou pedidos de recursos, contacte-nos através do [Telegram](https://t.me/maticnetwork)

## Licença {#license}

MIT
