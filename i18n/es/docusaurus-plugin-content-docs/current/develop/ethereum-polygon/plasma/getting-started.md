---
id: getting-started
title: Puente de Plasma
sidebar_label: Introduction
description: Interactúa con el puente de Plasma y la red de Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Para empezar, revisa la última [documentación de Matic.js sobre Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/).

Básicamente, un puente es un conjunto de contratos que ayuda a mover activos desde la cadena primaria a la secundaria. Hay dos puentes principales para mover activos entre Ethereum y Polygon. El primero es el puente de Plasma y el segundo, el **puente de PoS** o **puente de prueba de participación**. **El puente de plasma** proporciona mayores garantías de seguridad gracias al mecanismo de salida de Plasma.

No obstante, hay ciertas restricciones en el token secundario y un período de retiro de 7 días asociado a todas las salidas o retiros de Polygon a Ethereum en el puente de Plasma. El [puente de PoS](/docs/develop/ethereum-polygon/pos/getting-started) es más flexible y ofrece retiros más rápidos.

Este tutorial actuará como una guía paso a paso para entender y utilizar el puente de plasma utilizando [Matic JS](https://github.com/maticnetwork/matic.js), que es la manera más fácil de interactuar con el puente de plasma en la red .

## Flujo de activos en el puente de Plasma {#assets-flow-in-plasma-bridge}

En este tutorial, te mostraremos el flujo de las transferencias de activos en Polygon y cómo puedes hacer lo mismo usando Matic.js:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. El usuario deposita activos de cripto en el contrato de Polygon en la cadena principal
2. Una vez que los tokens depositados se confirmen en la cadena principal, los tokens correspondientes se reflejarán en la cadena Polygon
   - El usuario ahora puede transferir los tokens a quien quieran al instante con tarifas mínimas. La cadena de Polygon tiene bloques más rápidos (aproximadamente de 1 segundo). De ese modo, la transferencia se hace casi instantáneamente.
3. Una vez que un usuario esté listo, puede retirar los tokens restantes de la cadena principal. El retiro de fondos se inicia desde la cadena lateral de Plasma. Se establece un intervalo de 5 minutos para el punto de control, donde se validan todos los bloques en la capa de bloques de Polygon desde el punto de control anterior.
4. Una vez que el punto de control se presenta al contrato de la cadena principal de Ethereum, se crea un token NFT de salida (ERC-721) de valor equivalente.
5. Los fondos retirados se pueden reclamar de vuelta a su cuenta de  del contrato de la cadena principal utilizando un procedimiento de salida del proceso.
   - El usuario también puede obtener una salida rápida a través de 0x o Dharma (próximamente)

### Prerrequisitos: {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Grifo de Görli {#görli-faucet}

Para poder hacer transacciones, también tendrás que tener Ether en las cuentas de prueba que usarás mientras pongas en práctica el tutorial. En caso de que no tengas ningún ETH en Görli, puedes utilizar los enlaces de grifo que se ofrecen aquí —

### Grifo de Polygon {#polygon-faucet}

A lo largo de este tutorial, utilizaremos el token ERC-20 `TEST`en la red Görli como ejemplo. Ese es un token de prueba. En tu DApp, puedes reemplazarlo por cualquier token ERC-20. Para obtener algunos `TEST`tokens  de prueba de la red de Polygon, puedes acceder al [grifo de Polygon](https://faucet.polygon.technology/).

:::note

Para utilizar tus propios tokens para depósitos y retiros, deberás obtener el token 'mapped', que básicamente significa hacer los contratos en la cadena principal y  'consciente' de tu token personalizado.

:::

### Configuración básica de la billetera de MetaMask (opcional) {#basic-setup-for-the-metamask-wallet-optional}

1. [Crea una billetera](/docs/develop/metamask/hello): si eres nuevo en las billeteras, a continuación, configura una cuenta de MetaMask
2. [Configura la red de pruebas de Polygon](/docs/develop/metamask/config-polygon-on-metamask): para visualizar fácilmente el flujo de fondos en Polygon, es instructivo si configuras la red de pruebas de Polygon en Metamask. Ten en cuenta que aquí estamos usando MetaMask solo con fines de visualización. No es en absoluto necesario que uses MetaMask para usar Polygon.
3. [Crea varias cuentas](/docs/develop/metamask/multiple-accounts): antes de comenzar con el tutorial, debes tener 3 cuentas de prueba de Ethereum listas.
4. [Configura el token en Polygon](/docs/develop/metamask/custom-tokens): para poder ver el flujo de fondos fácilmente en Polygon usando Matic.js, puedes configurar los tokens en MetaMask.
El `TEST`token, tomado como ejemplo de este tutorial, se puede configurar en MetaMask para visualizar fácilmente los saldos de la cuenta. Una vez más, esto es **opcional**. Puedes consultar fácilmente los saldos de los token y otras variables utilizando [web3.js](https://web3js.readthedocs.io/en/1.0/)
