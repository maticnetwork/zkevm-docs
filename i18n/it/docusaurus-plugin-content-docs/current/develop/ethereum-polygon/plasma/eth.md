---
id: eth
title: Guida al deposito e prelievo di ETH
sidebar_label: ETH
description: "Depositare e prelevare token ETH sulla rete di Polygon."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - eth
image: https://matic.network/banners/matic-network-16x9.png
---

### Flusso di alto livello {#high-level-flow}

#### **Depositare ETH (processo a una fase)**

La funzione **deposit** è da invocare dove i token vengono depositati nel contratto Polygon e sono disponibili per l'uso nella rete di Polygon.

#### **Trasferire ETH**

Quando hai fondi su Polygon, puoi usarli per inviarli istantaneamente ad altri utenti.

#### **Prelevare ETH (processo a 3 fasi)**

1. Il prelievo dei fondi è avviato da Polygon. Un intervallo di controllo di 30 minuti (per le testnet, aspettare circa 10 minuti) è impostato, dove tutti i blocchi dello strato di blocco di Polygon vengono convalidati dall'ultimo checkpoint.
2. Una volta che il checkpoint è stato presentato al contratto ERC20 della catena principale, un token NFT Exit (ERC721) è creato con valore equivalente.
3. I fondi ritirati possono essere rivendicati al tuo accordo ERC20 dal contratto principale di catena utilizzando una procedura di uscita di processo.

## Dettagli di configurazione {#setup-details}

### Configurazione di Matic SDK {#configuring-matic-sdk}

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

**deposito**: il deposito può essere fatto chiamando `depositEther()`il `depositManagerContract`contratto.

Nota che il token deve essere mappato e approvato per il trasferimento in anticipo.

```js
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const result = await client.depositEther(100, from);

  const txHash = await result.getTransactionHash();
  const receipt = await result.getReceipt();

};

execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})
```

:::note

I depositi da Ethereum a Polygon si verificano utilizzando un meccanismo di sincronizzazione dello stato e impiegano circa 22-30 minuti. Trascorso questo intervallo di tempo, si consiglia di controllare il saldo usando la libreria web3.js/matic.js o Metamask. L'explorer mostrerà il saldo solo se è avvenuto almeno un trasferimento di asset nella catena figlio. In questo [link](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) è spiegato come tracciare gli eventi di deposito.

:::

## transfer {#transfer}

ETH sulla rete di Polygon è un WETH (ERC20 Token).

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

Gli utenti possono chiamare la `withdraw`funzione del contratto di token `getERC20TokenContract`figlio. Questa funzione dovrebbe effettuare il burn dei token. Polygon Il client Plasma mostra il `withdrawStart`metodo per effettuare questa chiamata.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)

  const txHash = await result.getTransactionHash()
  const receipt = await result.getReceipt()

}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

Gli utenti possono chiamare la `startExitWithBurntTokens()`funzione del `erc20Predicate`contratto. Il client di Plasma Polygon espone il `withdrawConfirm()`metodo per effettuare questa chiamata. Questa funzione può essere chiamata solo dopo che il checkpoint sia stato incluso nella catena principale. L'inclusione del checkpoint può essere tracciata seguendo questa [guida](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma.md#checkpoint-events).


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. Process Exit {#3-process-exit}

Un utente dovrebbe chiamare la `processExits()`funzione del `withdrawManager`contratto e presentare la prova di ustione. Dopo aver inviato una prova valida, i token vengono trasferiti all'utente. Polygon Il client Plasma mostra il `withdrawExit()`metodo per effettuare questa chiamata.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true);
  const result = await erc20Token.withdrawExit();

  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

Un checkpoint, che rappresenta tutte le transazioni che avviene su Polygon alla catena di Ethereum ogni ~ 5 minuti, viene regolarmente sottoposto al contratto Ethereum della catena principale.

:::