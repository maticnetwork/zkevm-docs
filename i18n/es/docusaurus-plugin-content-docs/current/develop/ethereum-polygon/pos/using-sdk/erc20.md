---
id: erc20
title: Guía de depósito y retiro de ERC-20
sidebar_label: ERC20
description: "Depositar y retirar tokens ERC-20 en la red de Polygon."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Consulta la última [documentación de Matic.js sobre ERC-20](https://maticnetwork.github.io/matic.js/docs/pos/erc20/).

En este tutorial, se usa la red de pruebas de Polygon (Mumbai), que está mapeada a la red de Goerli, para mostrar la transferencia de activos entre ambas cadenas de bloques. **Ten en cuenta** que, mientras sigas este tutorial, debes usar una dirección proxy siempre que sea posible. Por ejemplo, la dirección  **debe** utilizarse para la interacción en lugar de la dirección  **.** Las **direcciones del contrato de prueba de participación (PoS), la interfaz binaria de aplicación (ABI), las direcciones del token de prueba** y otros detalles de la implementación de los contratos del puente de PoS se encuentran [aquí](/docs/develop/ethereum-polygon/pos/deployment).

El **mapeo de tus activos** es necesario para integrar el puente de PoS en tu aplicación. Puedes enviar una solicitud de mapeo [aquí](/docs/develop/ethereum-polygon/submit-mapping-request). Pero para el propósito de este tutorial, ya hemos desplegado los tokens de **la prueba** y los hemos mapeado en el puente . Es posible que lo necesites para probar el tutorial por tu cuenta. Puedes solicitar el activo deseado en el [grifo](https://faucet.polygon.technology/). Si los tokens de la prueba no están disponibles en el grifo, comunícate con nosotros en la [discord](https://discord.com/invite/0xPolygonn).

En el próximo tutorial, se explicará cada paso en detalle junto con algunos fragmentos de código. Sin embargo, siempre puedes consultar este [repositorio](https://github.com/maticnetwork/matic.js/tree/master/examples/pos), que contiene todo el **código fuente de ejemplo** que puede ayudarte a integrar el puente de PoS y comprender su funcionamiento.

## Flujo de alto nivel {#high-level-flow}

Depósito de ERC-20

1. **_Aprobar_** el contrato **_de_**  para gastar los tokens que se deben depositar.
2. Llama a **_depositFor_** en el **_RootChainManager_** (Adminsitrador de la cadena primaria).

Retiro de ERC-20

1. Grabar tokens en la cadena Polygon.
2. Llama a la `exit()`función `RootChainManager`para presentar una prueba de la transacción de quemado. Esta llamada se puede hacer después de que el punto de control se envíe para el bloque que contiene la transacción de quemado.

## Detalles de pasos {#steps-details}

### Aprobación {#approve}

Esta es una aprobación normal de modo que **_ERC-20Predicate_** pueda llamar **_a_** la función . El cliente de PoS de Polygon expone el método **_approve_** (aprobar) para hacer esta llamada.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### deposit (Depósito) {#deposit}

Observa que el token debe ser mapeado y aprobado para su transferencia de antemano. El cliente PoS de Polygon expone el `deposit()`método para hacer esta llamada.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

:::note
Los depósitos de Ethereum a Polygon se producen utilizando un mecanismo **de sincronización estatal** y toman alrededor de 22 a 30 minutos. Después de esperar este intervalo de tiempo, se recomienda revisar el saldo utilizando la biblioteca web3.js/matic.js o utilizando Metamask. El explorador mostrará el saldo solo si se realizó al menos una transferencia de activos en la cadena secundaria. Este [<ins>enlace</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos) explica cómo realizar un seguimiento de eventos de depósito.
:::

### Método WithdrawStart para quemado {#withdrawstart-method-to-burn}

El `withdrawStart()`método se puede utilizar para iniciar el proceso de retiro que quemará la cantidad especificada en la cadena .

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

Guarda el hash de la transacción de esta llamada y úsalo cuando generes la prueba de quemado.

### Salida {#exit}

Una vez que el punto de control se haya presentado para el bloque que contiene la transacción de quemado, el usuario debe llamar a la `exit()`función del `RootChainManager`contrato y presentar la prueba de quemado. Una vez presentado una prueba válida, los tokens se transfieren al usuario. El cliente PoS de Polygon expone el `withdrawExit`método para hacer esta llamada. Esa función solo se puede llamar después de haber incluido el punto de control en la cadena principal. La inclusión del punto de control se puede hacer un seguimiento siguiendo [esta guía](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events).

El método *withdrawExit* se puede utilizar para salir del proceso de retiro usando el hash de la transacción del método *withdrawStart*.

:::note
La transacción  debe estar señalada para salir del retiro.
:::

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
