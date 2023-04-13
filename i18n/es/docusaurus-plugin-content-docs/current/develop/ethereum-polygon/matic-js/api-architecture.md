---
id: api-architecture
title: Arquitectura de la API
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: API de lectura y escritura y configuración de las transacciones.
---

La biblioteca tiene una arquitectura común de API en todo momento y las API se dividen en dos tipos -

1. API de lectura
2. API de escritura

## API de lectura {#read-api}

Las API de lectura no publican nada en la cadena de bloques, por lo que no consumen gas. Ejemplos de API de lectura son `getBalance`,  `isWithdrawExited`etc.

Veamos un ejemplo de API de lectura.

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

Las API de lectura son muy simples y muestran el resultado directamente.

## 2. API de escritura {#2-write-api}

Las API de escritura publican algunos datos en la cadena de bloques, por lo que consumen gas. Ejemplos de API de escritura son `approve`,  `deposit`etc.

Cuando se llama a una API de escritura, se necesitan dos datos del resultado.

1. TransactionHash (Hash de la transacción)
2. TransactionReceipt (Recibo de la transacción)

Veamos un ejemplo de API de escritura y obtengamos el hash y el recibo de la transacción:

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

### Opción de transacción {#transaction-option}

Hay algunas opciones configurables que están disponibles para todas las API. Esas configuraciones se pueden pasar en parámetros.

Las configuraciones disponibles son:

- from?: cadena | número: la dirección desde donde deben hacerse las transacciones.
- to?: cadena: la dirección a la que deben hacerse las transacciones.
- value?: número | cadena | BN: el valor transferido por la transacción en wei.
- gasLimit?: número | cadena - el gas máximo proporcionado para una transacción (límite de gas).
- gasPrice?: número | cadena | BN: el precio del gas en wei que se utilizará para las transacciones.
- data?: cadena: el código de bytes del contrato.
- nonce?: número;
- ChainId?: número;
- chain?: cadena;
- hardfork?: cadena;
- returnTransaction?: booleano: si se hace verdadero mostrará el objeto de la transacción que se puede usar para enviar la transacción manualmente.

Veamos un ejemplo configurando el gasPrice (precio de gas)

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
