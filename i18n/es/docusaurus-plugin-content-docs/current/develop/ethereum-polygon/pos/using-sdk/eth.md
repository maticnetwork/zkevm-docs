---
id: eth
title: Guía de depósito y retiro de ETH
sidebar_label: ETH
description: "Deposita y retira tokens ETH en la red de Polygon."
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

Consulta la [documentación de Matic.js sobre ETH](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/) más reciente.

## Resumen {#quick-summary}

Esta sección de los documentos trata sobre cómo depositar y retirar tokens ERC-20 en la red de Polygon. Existen funciones comunes entre las secciones de ETH, ERC-20, ERC-721 y ERC-1155 de los documentos, con variantes en los nombres y los patrones de implementación que corresponden a los estándares. El prerrequisito más importante para usar esta sección es el mapeo de tus activos. Envía la solicitud de mapeo [aquí](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/).

## Introducción {#introduction}

En esta guía, se usa la red de pruebas de Polygon (Mumbai), que en sí misma está mapeada con la red Goerli, para ejemplificar la transferencia de activos entre las dos cadenas de bloques. Ten en cuenta que, para efectos de este tutorial, debes usar una dirección proxy siempre que sea posible. Esto se debe a que, si bien la dirección del contrato de implementación puede cambiar cuando se agregue una nueva actualización al código del contrato, el proxy nunca cambia y redirige todas las llamadas entrantes a la última implementación. En concreto, si usas la dirección proxy, no tendrás que preocuparte por los cambios que se hagan en el contrato de implementación antes de que hayas finalizado.

Por ejemplo, utiliza la `RootChainManagerProxy`dirección para interacciones en lugar de la `RootChainManager`dirección. Detalles de despliegue como las direcciones de los contratos de PoS, ABI y las direcciones de los token de prueba se pueden encontrar [aquí](/docs/develop/ethereum-polygon/pos/deployment/).

El mapeo de tus activos es un paso necesario para integrar el puente de PoS en tu aplicación, así que, si no lo hiciste, envía una solicitud de mapeo [aquí](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/). Para efectos de este tutorial, el equipo implementó tokens de prueba y los mapeó con el puente de PoS. Solicita el activo que quieras usar en el [grifo](https://faucet.polygon.technology/) y, si los tokens de prueba no están disponibles, comunícate con el equipo por medio de [Discord](https://discord.com/invite/0xPolygon). Te responderemos de inmediato.

En el próximo tutorial, cada paso se explicará en detalle junto con algunos fragmentos de código. Sin embargo, siempre puedes consultar este [repositorio](https://github.com/maticnetwork/matic.js/tree/master/examples), que contiene todo el **código fuente de ejemplo** que puede ayudarte a integrar el puente de PoS y comprender su funcionamiento.

## Flujo de alto nivel {#high-level-flow}

Depósito de ETH

1. Haz una llamada **_a_**  **_y_** **enviar **el éter requerido.

Retiro de ETH

1. **_Quema_** los tokens en la cadena de Polygon.
2. Llama a la función **_exit_** (salida) en el **_RootChainManager_** (Administrador de la cadena primaria) para enviar la prueba de la transacción de quemado. Esta llamada se puede hacer **_después de enviar el punto de control_** para el bloque que contiene la transacción de quemado.

## Pasos {#steps}

### Depósito {#deposit}

Los ETH se pueden depositar en la cadena de Polygon llamando a **depositEtherFor** en el contrato del **RootChainManager** (administrador de la cadena primaria). El cliente del PoS de Polygon expone el método **depositEther** para hacer esta llamada.

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
Los depósitos de Ethereum a Polygon se producen utilizando el mecanismo **de sincronización de estado** y esto dura alrededor de 22 a 30 minutos. Después de esperar este intervalo de tiempo, se recomienda revisar el saldo utilizando la biblioteca web3.js/matic.js o utilizando Metamask. El explorador mostrará el saldo solo si se realizó al menos una transferencia de activos en la cadena secundaria. Este [<ins>enlace</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/) explica cómo realizar un seguimiento de eventos de depósito.
:::

### Quemado {#burn}

ETH se deposita como un token ERC-20 en la cadena Polygon. La retirada sigue el mismo proceso que la retirada de tokens ERC-20.

Para grabar los tokens y participar en el proceso de retiro, llama a la función de retiro del contrato . Dado que Ether es un token ERC-20 en la cadena Polygon, debes iniciar el token **ERC-20** desde el cliente PoS de Polygon y luego llamar al `withdrawStart()`método para iniciar el proceso de quemado.

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Guarda el hash de la transacción de esta llamada y úsalo cuando generes la prueba de quemado.

### Salida {#exit}


Una vez que el **punto** de control se haya presentado para el bloque que contiene la transacción de quemado, el usuario debe llamar a la función de **salida** del `RootChainManager`contrato y presentar la prueba de quemado. Tras enviar una prueba válida, los tokens se le transfieren al usuario. El cliente de PoS de Polygon `erc20` expone el método `withdrawExit` para hacer esta llamada. Esta función solo se puede llamar después de haber incluido el punto de control en la cadena principal. La inclusión del punto de control se puede rastrear siguiendo esta [guía](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events).


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
