---
id: eth
title: Guía de depósito y retiro de ETH
sidebar_label: ETH
description: "Deposita y retira tokens ETH en la red de Polygon."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - eth
image: https://matic.network/banners/matic-network-16x9.png
---

### Flujo de alto nivel {#high-level-flow}

#### **Depósito de ETH (proceso de 1 paso)**

Se debe llamar a la función **deposit** (depositar) para que los tokens se depositen en el contrato de Polygon y estén disponibles para usarlos en la red de Polygon.

#### **Transferencia de ETH**

Cuando tengas los fondos en Polygon, puedes enviárselos a otros al instante.

#### **Retiro de ETH (proceso de 3 pasos)**

1. El retiro de fondos se inicia desde Polygon. Se establece un intervalo de 30 minutos (para las redes de prueba, espera alrededor de 10 minutos), donde todos los bloques de la capa de bloque Polygon se validan desde el último punto de control.
2. Una vez que el punto de control se presenta al contrato ERC-20 de la cadena principal, se crea un token de salida (ERC-721) de valor equivalente.
3. Los fondos retirados se pueden reclamar de nuevo a su cuenta de  del contrato de la cadena principal utilizando un procedimiento de salida del proceso.

## Detalles de configuración {#setup-details}

### Configuración del SDK de Matic {#configuring-matic-sdk}

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

**depósito**: se puede hacer el depósito llamando `depositEther()`a un `depositManagerContract`contrato.

Observa que el token debe ser mapeado y aprobado para su transferencia de antemano.

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

Los depósitos de Ethereum a Polygon se producen utilizando un mecanismo de sincronización de estado y toman alrededor de 22 a 30 minutos. Transcurrido ese plazo, se recomienda comprobar el saldo mediante la biblioteca web3.js/matic.js o MetaMask. El explorador mostrará el saldo solo si se realizó al menos una transferencia de activos en la cadena secundaria. Este [enlace](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) explica cómo hacerle seguimiento de los eventos de depósito.

:::

## transfer (Transferencia) {#transfer}

Los ETH son WETH (token ERC-20) en la red de Polygon.

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

## Retiro {#withdraw}

### 1. Quemado {#1-burn}

Los usuarios pueden llamar a la `withdraw`función del contrato de token `getERC20TokenContract`infantil. Esta función debería quemar los tokens. El cliente de Polygon Plasma expone el `withdrawStart`método para hacer esta llamada.

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

Los usuarios pueden llamar a la `startExitWithBurntTokens()`función del `erc20Predicate`contrato. El cliente de Polygon Plasma expone el `withdrawConfirm()`método para hacer esta llamada. Esa función solo se puede llamar después de haber incluido el punto de control en la cadena principal. La inclusión del punto de control se puede rastrear siguiendo esta [guía](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma.md#checkpoint-events).


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

### 3. Salida del proceso {#3-process-exit}

Un usuario debe llamar a la `processExits()`función del `withdrawManager`contrato y presentar la prueba de quema. Una vez presentado una prueba válida, los tokens se transfieren al usuario. El cliente de Polygon Plasma expone el `withdrawExit()`método para hacer esta llamada.

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

Un punto de control, que es una representación de todas las transacciones que ocurren en Polygon a la cadena de Ethereum cada ~5 minutos, se somete regularmente al contrato de la cadena principal.

:::