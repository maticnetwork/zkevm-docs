---
id: chainstack
title: Implementa un contrato inteligente utilizando la pila de la cadena y la fundición
sidebar_label: Using Chainstack
description:  Utiliza la pileta y la fundición para desarrollar un contrato inteligente en Polygon
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Descripción general {#overview}

Esta sección te guía a través de la implementación de un contrato de Hello World utilizando [la pila](https://chainstack.com/build-better-with-polygon/) de cadena y [la fundición](https://github.com/gakonst/foundry/) en la red de pruebas de Polygon Mumbai.

Chainstack proporciona infraestructura para aplicaciones basadas en Ethereum y otras cadenas de bloques. Mantienen los nodos y garantizan su conexión a la red y también ofrecen una interfaz para interactuar con redes de red y redes de prueba.

Foundry es un kit de herramientas rápido para el desarrollo de aplicaciones de Ethereum escritas en Rust. Proporciona pruebas, interacción con contratos inteligentes de EVM, envío de transacciones y recuperación de datos de la cadena de bloques.

:::tip

Si tienes alguna pregunta, comunica con el servidor [<ins>de Discord de</ins>](https://discord.com/invite/Cymtg2f7pX) Chainstack.

:::

## Qué vas a aprender {#what-you-will-learn}

A crear un contrato "Hola Mundo", usando Chainstack para desplegar un nodo de Polygon y Foundry para desplegar el contrato.

## Qué vas a hacer {#what-you-will-do}

1. Desplegar un nodo de Polygon utilizando Chainstack
2. Configurar Foundry
3. Crear el contrato inteligente
4. Desplegar el contrato inteligente

## Desplegar un nodo de Polygon Mumbai {#deploy-a-polygon-mumbai-node}

Necesitas un nodo para desplegar un contrato inteligente a la red de la cadena de bloques. Sigue los pasos a continuación para poner tu nodo en funcionamiento:

**Paso 1 →** Regístrate con [Chainstack](https://console.chainstack.com/user/account/create)

![img](/img/chainstack/sign-up.png)

Paso **2 →** Sigue las instrucciones sobre cómo [desplegar un nodo de Mumbai](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network)

![img](/img/chainstack/join-network.png)

**Paso 3 →** Obtén el [extremo HTTPS del nodo desplegado](https://docs.chainstack.com/platform/view-node-access-and-credentials)

## Instalar Foundry {#install-foundry}

Foundry es un kit de herramientas de desarrollo para trabajar con contratos inteligentes. Para empezar a trabajar con él, es necesario instalar primero el lenguaje de codificación Rust.

1. [Instalar Rust](https://www.rust-lang.org/tools/install).
1. [Instalar Foundry](https://github.com/gakonst/foundry/).

## Inicializar con Foundry {#initialize-with-foundry}

Para crear un proyecto con una plantilla, dirígete a tu directorio de trabajo y ejecuta:

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## Agrégale fondos a tu cuenta {#fund-your-account}

Necesitarás una cuenta de billetera para desplegar el contrato inteligente. Puedes utilizar  [para](https://metamask.io/) eso. También hay que pagar el gas en la red para desplegar el contrato. Solo copia tu dirección de la billetera y consigue el token Mumbai MATIC [a través del grifo](https://faucet.polygon.technology/).

## Crea el contrato "Hola Mundo" {#create-the-hello-world-contract}

En el proyecto de Foundry inicializado en `src/`, crea `HelloWorld.sol`:

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## Despliega el contrato {#deploy-the-contract}

En este punto, ya estás listo para desplegar tu contrato:

* Tienes tu propio nodo en la red Polygon Mumbai mediante el cual vas a desplegar el contrato.
* Tienes Foundry que vas a usar para desplegar el contrato.
* Tienes una cuenta con fondos que va a desplegar el contrato.

Para desplegar el contrato, ejecuta:

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

Aquí,

* CONTRACT_PATH — ruta a tu archivo `HelloWorld.sol`.
* PRIVATE_KEY — clave privada de tu cuenta.
* HTTPS_ENDPOINT — [el extremo de tu nodo](https://docs.chainstack.com/platform/view-node-access-and-credentials).

Ejemplo:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

Siempre puedes revisar el despliegue del contrato en [<ins>Mumbai Polygonscan</ins>](https://mumbai.polygonscan.com/) usando el hash recién generado en el último paso.

:::

## Pon a prueba el contrato {#test-the-contract}

Hay un comando `forge test` en caso de que necesites revisar si el contrato está funcionando bien. Foundry ofrece muchas [opciones](https://book.getfoundry.sh/reference/forge/forge-test) (señales) para pruebas más específicas. En [la documentación de Foundry](https://book.getfoundry.sh/forge/tests) encontrarás más información sobre la escritura de las pruebas, las pruebas avanzadas y otras características.

**¡Felicitaciones! Has desplegado tu contrato inteligente de Hello World en Polygon.**

Consulta también los documentos de Chainstack para ver más [<ins>tutoriales</ins>](https://docs.chainstack.com/tutorials/polygon/) y [<ins>herramientas</ins>](https://docs.chainstack.com/operations/polygon/tools) relacionados con Polygon.
