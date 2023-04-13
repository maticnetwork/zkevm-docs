---
id: erc20
title: ERC20 Ein- und Auszahlungsleitfaden
sidebar_label: ERC20
description:  "Ein- und Auszahlungen von ERC20-Token im Polygon-Netzwerk."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

Bitte lesen Sie die aktuellste [Matic.js-Dokumentation über Plasma ERC20](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/), um loszulegen und die neusten Methoden zu sehen.

### High-Level-Flow {#high-level-flow}

#### **ERC20 einzahlen (zweistufiger Prozess)**

1. Die Token müssen zuerst auf der Parent-Chain (Ethereum/Goerli) für die Polygon-Root-Chain genehmigt werden.
2. Nach der Genehmigung muss die **Einzahlungsfunktion** gestartet werden, wonach die Token bei Polygon eingezahlt und dort verwendet werden können.

#### **ERC20 übertragen**

Sobald sich Geld auf deinem Polygon-Konto befindet, können Sie es sofort an andere senden.

#### **ERC20 auszahlen (dreistufiger Prozess)**)

1. Auszahlungen werden bei Polygon in Auftrag gegeben. Es wird ein checkpoint von 30 Minuten gesetzt (für testnets warten auf etwa 10 Minuten), wo alle Blöcke auf der Polygon Blockschicht seit dem letzten Prüfpunkt validiert werden.
2. Sobald der Checkpoint dem Hauptkette ERC20-Vertrag zugestellt wurde, wird ein NFT Exit (ERC721) Token von gleichwertigem Wert erstellt.
3. Die abgezogenen Mittel können über ein process-exit auf Ihren ERC20 acccount be werden.

## Einrichtung {#setup-details}

### Polygon Edge konfigurieren {#configuring-polygon-edge}

Installiere Matic SDK (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

Maticjs-Client initiieren

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

Erstelle eine neue Datei im `process.env`Root-Verzeichnis mit dem folgenden Inhalt:

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## deposit {#deposit}

**Genehmigen**: Dies ist eine normale ERC20-Genehmigung, also `depositManagerContract`kann die Funktion `transferFrom()`aufrufen. Polygon Plasma Client legt die `erc20Token.approve()`Methode zur Durchführung dieses Anrufs offen.

**Einzahlung**: Eine Einzahlung ist durch das Aufrufen von **_DepositERC20ForUser_** im DepositManagerContract möglich.

Beachten Sie, dass das Token für den Transfer gemappt und genehmigt werden muss.

Die **_erc20Token.deposit_**-Methode für diesen Aufruf.


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

Einzahlungen von Ethereum zu Polygon passieren mit einem State Sync Mechanismus und dauern etwa 5-7 Minuten. Prüfen Sie nach Ablauf dieser Zeit den Kontostand mit der web3.js/matic.js-Bibliothek oder mit Metamask. Der Explorer zeigt den Kontostand nur an, wenn mindestens eine Asset-Übertragung auf der Child-Chain stattgefunden hat. Unter diesem [Link](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) erfahren Sie, wie Sie Einzahlungen nachverfolgen können.

:::

## übertragen {#transfer}

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

## Auszahlen {#withdraw}

### 1. Ausscheiden {#1-burn}

Benutzer können die `withdraw()`Funktion des `getERC20TokenContract`Child-Token-Vertrags aufrufen. Mit dieser Funktion sollten die Token ausgeschieden werden. Polygon Plasma Client legt die `withdrawStart()`Methode zur Durchführung dieses Anrufs offen.

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

Der Benutzer kann die **_startExitWithBurntTokens_**-Funktion des **_erc20Predicate_**-Contracts aufrufen. Der Polygon Plasma-Client zeigt **_withdrawconfirm_**-Methode für diesen Aufruf. Diese Funktion kann erst genutzt werden, nachdem der Checkpoint in die Mainchain aufgenommen wurde. Die Aufnahme des Checkpoint kann mit diesem [Leitfaden](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events) verfolgt werden.


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

### 3. Prozess beenden {#3-process-exit}

Ein Benutzer sollte die **_processExits_**-Funktion des **_withdrawManager_**-Contracts aufrufen und nachweisen, dass der Token ausgeschieden wurde. Nach dem Einreichen eines gültigen Nachweises werden Token an den Benutzer übertragen. Der Polygon Plasma-Client zeigt die **_withdrawExit_**-Methode für diesen Aufruf.

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

Ein Checkpoint, der eine Darstellung aller Transaktionen ist, die im Polygon Network in der ERC20-Chain alle ~30 Minuten stattfinden, wird regelmäßig dem Haupt-Chain ERC20-Vertrag übermittelt.

:::