---
id: ether
title: Guía de depósito y retiro de Ether
sidebar_label: Ether
description:  "Funciones disponibles para contratos de Ether."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## Flujo de alto nivel {#high-level-flow}

Depósito de Ether

- Llama a depositEtherFor en el **RootChainManager** (Administrador de la cadena primaria) y envía el activo de Ether.

Retiro de Ether

1. **_Quema_** los tokens en la cadena de Polygon.
2. Llama a la función **_exit_** (salida) en el **_RootChainManager_** (Administrador de la cadena primaria) para enviar la prueba de la transacción de quemado. Esa llamada se puede hacer **_después de enviar el punto de control_** para el bloque que contiene la transacción de quemado.

## Paso por paso {#step-details}

### Instanciación de los contratos {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### deposit (Depósito) {#deposit}
Llama a la `depositEtherFor`función del `RootChainManager`contrato. Esta función toma 1 `userAddress`argumento, que es la dirección del usuario que recibirá el depósito en la cadena . La cantidad de éter a depositar debe ser enviada como el valor de la transacción.

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### Quemado {#burn}
Dado que Ether es un token ERC-20 en la cadena Polygon, su proceso de retiro es el mismo que la retirada de ERC-20. Los tokens se pueden quemar llamando a la `withdraw`función en el contrato de token infantil. Esta función toma un solo argumento, `amount`indicando el número de tokens a quemar. Tienes que enviar la prueba de este quemado en el paso de salida. así que guarda el hash de la transacción.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Salida {#exit}
La función de salida en el `RootChainManager`contrato debe ser llamada para desbloquear y recibir los tokens de .`EtherPredicate` Esa función toma un solo argumento en bytes, que prueba la transacción de quemado. Espera a que el punto de control que contenga la transacción de quemado se envíe antes de llamar a esta función. La prueba se genera por la codificación RLP de los siguientes campos:

1. headerNumber: número del bloque del encabezado del punto de control que contiene la transacción de quemado
2. blockProof: prueba de que el encabezado del bloque (en la cadena secundaria) es una hoja en la raíz de Merkle enviada
3. blockNumber: número del bloque que contiene la transacción de quemado en la cadena secundaria
4. blockTime: hora del bloque de la transacción de quemado
5. txRoot: raíz de las transacciones del bloque
6. receiptRoot: raíz de recibos del bloque
7. receipt: recibo de la transacción de quemado
8. receiptProof: prueba de Merkle del recibo de quemado
9. branchMask: 32 bits que denotan la ruta del recibo en el árbol de Merkle Patricia
10. receiptLogIndex: índice del registro para leer desde el recibo

Generar la prueba de forma manual puede ser complicado, por lo que se recomienda usar Polygon Edge. Si prefieres enviar la transacción manualmente, puedes pasar **_encodeAbi_** como **_verdadero_** en el objeto de opciones para obtener los datos sin procesar de la llamada.

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

Envía los datos de la llamada al **_RootChainManager_** (Adminsitrador de la cadena primaria).
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
