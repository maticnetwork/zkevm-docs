---
id: truffle
title: Implementa un contrato inteligente utilizando la trufa
sidebar_label: Using Truffle
description:  Utiliza Truffle para desplegar un contrato inteligente en Polygon
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Descripción general {#overview}

[Truffle](https://trufflesuite.com/) es un entorno de desarrollo de la cadena de bloques, que puedes utilizar para crear y probar contratos inteligentes mediante el aprovechamiento de la máquina virtual de Ethereum. Esta guía tiene como objetivo enseñar cómo crear un contrato inteligente utilizando Truffle y desplegarlo en la red Polygon compatible con EVM.

:::note

Este tutorial es una versión adaptada del artículo de [<ins>la guía de inicio rápido de</ins>](https://www.trufflesuite.com/docs/truffle/quickstart) Truffle.

:::

## Qué vas a hacer {#what-you-will-do}

- Instalar y configurar Truffle
- Implementar un contrato en la red Polygon
- Comprueba el estado de despliegue en Polygonscan

## Prerrequisitos {#prerequisites}

Necesitas algunos requisitos técnicos antes de empezar. Instala lo siguiente:

- [Node.js v8+ LTS y npm](https://nodejs.org/en/) (empaquetado con Nodo)
- [Git](https://git-scm.com/)

Cuando los tengas instalados, solo necesitarás un comando para instalar Truffle:

```
npm install -g truffle
```

Para verificar que Truffle se instala correctamente, escribe `truffle version`en un terminal. Si ves un error, asegúrate de que los módulos npm se añadan a tu ruta.

## Creación de un proyecto {#creating-a-project}

### Proyecto de MetaCoin {#metacoin-project}

Usaremos una de las plantillas de Truffle, que encontrarás en su página [Truffle Boxes](https://trufflesuite.com/boxes/). La [caja MetaCoin](https://trufflesuite.com/boxes/metacoin/) crea un token que se puede transferir entre cuentas.

1. Empieza creando un directorio nuevo para este proyecto de Truffle:

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. Descarga la caja MetaCoin:

  ```bash
  truffle unbox metacoin
  ```

Con ese último paso, has creado un proyecto de Truffle que step, carpetas con contratos, despliegue, pruebas y archivos de configuración.

Estos son los datos del contrato inteligente del archivo `metacoin.sol`:

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

Observa que ConvertLib está importado después de la sentencia `pragma`. En este proyecto, hay dos contratos inteligentes que se desplegarán al final: uno es MetaCoin, que contiene toda la lógica de envío y saldo y el otro es ConvertLib, una biblioteca utilizada para convertir valores.

:::

### Pruebas del contrato {#testing-the-contract}

Puedes ejecutar pruebas de Solidez y Javascript.

1. En un terminal, ejecuta la prueba de Solidity:

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

Deberías ver la siguiente salida:

![img](/img/truffle/test1.png)

2. Ejecuta la prueba de JavaScript:

  ```bash
  truffle test ./test/metacoin.js
  ```

Deberías ver la siguiente salida:

![img](/img/truffle/test2.png)

### Compilación del contrato {#compiling-the-contract}

Compile el contrato inteligente utilizando el siguiente comando:

```bash
truffle compile
```

Verás la siguiente salida:

![img](/img/truffle/compile.png)

### Configuración del contrato inteligente {#configuring-the-smart-contract}

Antes de desplegar efectivamente el contrato, tienes que configurar el archivo `truffle-config.js` ingresando los datos de la red y los compiladores.

Vaya a `truffle-config.js`y actualiza el archivo con los detalles de la red de Polygon Mumbai.

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

Observa que requiere que  se pase por `maticProvider`. Esta es la frase inicial (o clave privada) de la cuenta desde la que te gustaría desplegar. Crea un archivo `.secret` nuevo en el directorio primario e ingresa la frase semilla mnemónica de 12 palabras para empezar. Para obtener las palabras de la semilla de la billetera de MetaMask puedes ir a la configuración de MetaMask y, a continuación, en el menú, selecciona **Seguridad y** Privacidad, donde verás un botón que dice **revelar las palabras de la semilla**.

### Implementación en la red de Polygon {#deploying-on-polygon-network}

Añade  a tu billetera con [Polygon Faucet](https://faucet.polygon.technology/). A continuación, ejecuta este comando en la carpeta raíz del directorio del proyecto:

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

Recuerda que `address`tus , `transaction_hash`y otros detalles proporcionados variarían. Lo anterior es solo un ejemplo para darte una idea de la estructura.

:::

**¡Felicitaciones!  Has desplegado correctamente un contrato inteligente utilizando Truffle.** Ahora puedes interactuar con el contrato y también revisar su estado de despliegue en [Polygonscan](https://mumbai.polygonscan.com/).
