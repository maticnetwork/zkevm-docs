---
id: erc20
title: Guida al deposito e prelievo di ERC20
sidebar_label: ERC20
description:  "Depositare e prelevare token ERC20 sulla rete di Polygon."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

Consultare la più recente [documentazione Matic.js su Plasma ERC20](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/) per muovere i primi passi e scoprire i metodi più aggiornati.

### Flusso di alto livello {#high-level-flow}

#### **Depositare ERC20 (processo a 2 fasi)**

1. I token devono essere prima approvati nel contratto della root chain di Polygon sulla parent chain (Ethereum/Goerli).
2. Dopo l'approvazione, è necessario sollecitare la funzione **deposit** dove i token vengono depositati nel contratto Polygon e sono disponibili per l'uso sulla rete di Polygon.

#### **Trasferire ERC20**

Quando disponi di fondi su Polygon, puoi usarli per inviarli istantaneamente ad altri utenti.

#### **Prelevare ERC20 (processo a 3 fasi)**

1. Il prelievo dei fondi è avviato da Polygon. Un intervallo di controllo di 30 minuti (per le testnet aspettano circa 10 minuti) è impostato, dove tutti i blocchi dello strato di blocco di Polygon vengono convalidati dall'ultimo checkpoint.
2. Una volta che il checkpoint è stato presentato al contratto ERC20 della catena principale, un token NFT Exit (ERC721) è creato con valore equivalente.
3. I fondi ritirati possono essere rivendicati al tuo accordo ERC20 dal contratto principale di catena utilizzando una procedura di uscita di processo.

## Dettagli di configurazione {#setup-details}

### Configurare Polygon Edge {#configuring-polygon-edge}

Installare Matic SDK (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

Avviare il client Maticjs

```js
// const use = require('@maticnetwork/maticjs').use
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')
const { PlasmaClient } = require('@maticnetwork/maticjs-plasma')
const { use } = require('@maticnetwork/maticjs')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')

// install web3 plugin
use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const from = config.user1.address

async function getPlasmaClient (network = 'testnet', version = 'mumbai') {
  try {
    const plasmaClient = new PlasmaClient()
    return plasmaClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from
        }
      },
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from
        }
      }
    })
  } catch (error) {
    console.error('error unable to initiate plasmaClient', error)
  }
}
```

### process.env {#process-env}

Crea un nuovo file nella directory root che viene chiamato `process.env`, con i seguenti contenuti:

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## deposit {#deposit}

**Approvazione**: Questa è una normale approvazione ERC20, quindi `depositManagerContract`può chiamare la `transferFrom()`funzione. Il client di Plasma Polygon espone il `erc20Token.approve()`metodo per effettuare questa chiamata.

**deposit**: il deposito può essere effettuato chiamando **_depositERC20ForUser_** sul contratto depositManagerContract.

Ricorda che il token deve essere preventivamente mappato e approvato per il trasferimento.

Metodo **_erc20Token.deposit_** per effettuare questa chiamata.


```js
const { getPlasmaClient, plasma, from } = require('../utils')

const amount = '1000000000000000000' // amount in wei
const token = plasma.parent.erc20

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token, true)
  const result = await erc20Token.deposit(amount, from)
  const receipt = await result.getReceipt()
  console.log(receipt)
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

:::note

I depositi da Ethereum a Polygon si verificano utilizzando un meccanismo di sincronizzazione dello stato e impiegano circa 5-7 minuti. Trascorso questo intervallo di tempo, si consiglia di controllare il saldo usando la libreria web3.js/matic.js o Metamask. L'explorer mostrerà il saldo solo se è avvenuto almeno un trasferimento di asset nella catena figlio. In questo [link](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) è spiegato come tracciare gli eventi di deposito.

:::

## transfer {#transfer}

```js

const { getPlasmaClient, from, plasma, to } = require('../utils')

const amount = '1000000000' // amount in wei
const token = plasma.child.erc20

async function execute () {
  try {
    const plasmaClient = await getPlasmaClient()
    const erc20Token = plasmaClient.erc20(token)
    const result = await erc20Token.transfer(amount, to, { gasPrice: 1000000000 })
    const txHash = await result.getTransactionHash()
    const receipt = await result.getReceipt()
  } catch (error) {
    console.log(error)
  }
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

## Prelevare {#withdraw}

### 1. Burn {#1-burn}

Gli utenti possono chiamare la `withdraw()`funzione del contratto di token `getERC20TokenContract`figlio. Questa funzione dovrebbe effettuare il burn dei token. Il client di Plasma Polygon espone il `withdrawStart()`metodo per effettuare questa chiamata.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)
  console.log(await result.getReceipt())
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)

```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

L'utente può chiamare la funzione **_startExitWithBurntTokens_** del contratto **_erc20Predicate_**. Il client Polygon Plasma mostra il metodo **_withdrawConfirm_** per effettuare questa chiamata. Questa funzione può essere chiamata solo dopo che il checkpoint sia stato incluso nella catena principale. L'inclusione del checkpoint può essere tracciata seguendo questa [guida](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events).


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. Process Exit {#3-process-exit}

Un utente deve chiamare la funzione **_processExits_** del contratto **_withdrawManager_** e inviare la proof-of-burn. Dopo aver inviato una prova valida, i token vengono trasferiti all'utente. Il client Polygon Plasma mostra il metodo **_withdrawExit_** per effettuare questa chiamata.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawExit()
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

Un checkpoint, che rappresenta tutte le transazioni che avviene sulla Polygon Network alla catena ERC20 ogni ~ 30 minuti, viene regolarmente sottoposto al contratto ERC20 principale.

:::