---
id: erc20
title: Guía de depósito y retiro de ERC-20
sidebar_label: ERC20
description: "Funciones disponibles para contratos de ERC-20."
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## Flujo de alto nivel {#high-level-flow}

Depósito de ERC-20

1. **_Aprobar_** el contrato **_de_**  para gastar los tokens que se deben depositar.
2. Llama a **_depositFor_** en el **_RootChainManager_** (Administrador de la cadena primaria).

Retiro de ERC-20

1. **_Quema_** los tokens en la cadena de Polygon.
2. Llama a la función **_exit_** (salida) en el **_RootChainManager_** (Administrador de la cadena primaria) para enviar la prueba de la transacción de quemado. Esa llamada se puede hacer **_después de enviar el punto de control_** para el bloque que contiene la transacción de quemado.

## Detalles de configuración {#setup-details}

### Instanciación de los contratos {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### Aprobación {#approve}
Aprobar  **_para_** gastar tokens llamando a la función **_de aprobación_** del contrato de tokens. Esaa función toma dos argumentos: **_spender_** y amount. spender es la dirección que se está aprobando para gastar los tokens del usuario. **_amount_** es el monto de los tokens que se puede gastar. Asegúrate de que el monto sea igual al monto del depósito para aprobarlo de una sola vez o pasa un número mayor para evitar tener que aprobar varias veces.
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### Depósito {#deposit}
Ten en cuenta que, antes de hacer esta llamada, el token tiene que estar mapeado y el monto aprobado para el depósito.  
Llama a la `depositFor()`función del `RootChainManager`contrato. Esta función toma 3 argumentos: `userAddress``rootToken`, y `depositData`. `userAddress`es la dirección del usuario que recibirá el depósito en la cadena Polygon. `rootToken`es la dirección del token en la `depositData`cadena principal.
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### Quemado {#burn}
Los tokens se pueden quemar en la cadena de Polygon llamando a la función **_withdraw_** (retirar) en el contrato del token secundario. Esa función toma un solo argumento: **_amount_**, que indica el número de tokens que se quemará. Tienes que enviar la prueba de este quemado en el paso de salida, así que guarda el hash de la transacción.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Salida {#exit}
La función de salida en el `RootChainManager`contrato debe ser llamada para desbloquear y recibir los tokens de .`ERC20Predicate` Esa función toma un solo argumento en bytes, que prueba la transacción de quemado. Espera a que el punto de control que contenga la transacción de quemado se envíe antes de llamar a esta función. La prueba se genera por la codificación RLP de los siguientes campos

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
