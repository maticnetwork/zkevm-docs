---
id: erc20
title: Guía de depósito y retiro de ERC-20
sidebar_label: ERC20
description:  "Deposita y retira tokens ERC-20 en la red de Polygon."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

Consulta la última [documentación de Matic.js sobre ERC-20 de Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/) para empezar y ver los métodos actualizados.

### Flujo de alto nivel {#high-level-flow}

#### **Depositar ERC-20 (proceso de 2 pasos)**

1. Primero, los tokens deben ser aprobados para el contrato de la cadena primaria de Polygon en la cadena principal (Ethereum o Goerli).
2. Una vez aprobados, se debe llamar a la función **deposit** (depositar) para que los tokens se depositen en el contrato de Polygon y estén disponibles para usarlos en Polygon.

#### **Transferir ERC-20**

Cuando tengas los fondos en Polygon, puedes enviárselos a otros al instante.

#### **Retiro de ERC-20 (proceso de 3 pasos)**

1. El retiro de fondos se inicia desde Polygon. Se establece un intervalo de 30 minutos (para que las redes de pruebas esperan alrededor de 10 minutos), donde todos los bloques de la capa de bloque Polygon se validan desde el último punto de control.
2. Una vez que el punto de control se presenta al contrato ERC-20 de la cadena principal, se crea un token de salida (ERC-721) de valor equivalente.
3. Los fondos retirados se pueden reclamar de nuevo a su cuenta de  del contrato de la cadena principal utilizando un procedimiento de salida del proceso.

## Detalles de configuración {#setup-details}

### Configuración de Polygon Edge {#configuring-polygon-edge}

Instala el SDK (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

Inicio del cliente de Matic.js

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

Crea un nuevo archivo en el directorio raíz llamado `process.env`, con el siguiente contenido:

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## deposit (Depositar) {#deposit}

**Aprueba**: esta es una aprobación ERC-20 normal, así que `depositManagerContract`puede llamar a la `transferFrom()`función. El cliente de Polygon Plasma expone el `erc20Token.approve()`método para hacer esta llamada.

deposit (**depositar**): el depósito se lleva a cabo llamando a **_depositERC-20ForUser_** en el contrato depositManagerContract.

Ten en cuenta que el token tiene que estar mapeado y aprobado de antemano para la transferencia.

**_ERC-20Token.deposit_**: método para hacer esta llamada.


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

Los depósitos de Ethereum a Polygon se producen utilizando un mecanismo de sincronización de estado y tardan alrededor de 5-7 minutos. Transcurrido ese plazo, se recomienda comprobar el saldo mediante la biblioteca web3.js/matic.js o MetaMask. El explorador mostrará el saldo solo si se realizó al menos una transferencia de activos en la cadena secundaria. Este [enlace](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) explica cómo hacerle seguimiento de los eventos de depósito.

:::

## transfer (Transferencia) {#transfer}

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

## Retiro {#withdraw}

### 1. Quemado {#1-burn}

Los usuarios pueden llamar a la `withdraw()`función del contrato de token `getERC20TokenContract`infantil. Esta función debería quemar los tokens. El cliente de Polygon Plasma expone el `withdrawStart()`método para hacer esta llamada.

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

El usuario puede llamar a la función **_startExitWithBurntTokens_** del contrato **_ERC-20Predicate_**. El cliente de Plasma de Polygon expone el método **_withdrawConfirm_** para hacer esta llamada. Esa función solo se puede llamar después de haber incluido el punto de control en la cadena principal. La inclusión del punto de control se puede rastrear siguiendo esta [guía](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events).


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

### 3. Salida del proceso {#3-process-exit}

El usuario debe llamar a la función **_processExits_** del contrato **_withdrawManager_** y enviar la prueba de quemado. Una vez presentado una prueba válida, los tokens se transfieren al usuario. El cliente de Plasma de Polygon expone el método **_withdrawExit_** para hacer esta llamada.

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

Un punto de control, que es una representación de todas las transacciones que ocurren en la Red Polygon a la cadena ERC-20 cada ~30 minutos, se somete regularmente al contrato de la cadena principal.

:::