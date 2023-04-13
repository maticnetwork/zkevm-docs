---
id: hardhat
title: Despliega un contrato inteligente utilizando Hardhat
sidebar_label: Using Hardhat
description: Utiliza Hardhat para desplegar un contrato inteligente en Polygon
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Descripción general {#overview}

Hardhat es un entorno de desarrollo de Ethereum que proporciona una manera fácil de desplegar contratos inteligentes, ejecutar pruebas y depurar el código de la solidez localmente.

En este tutorial, aprenderás a configurar Hardhat y a usarlo para construir, poner a prueba y desplegar un contrato inteligente simple.

### Qué vas a hacer {#what-you-will-do}

- Configurar Hardhat
- Crear un contrato inteligente
- Compilar el contrato
- Poner a prueba el contrato
- Desplegar el contrato

## Configurar el entorno de desarrollo {#setting-up-the-development-environment}

Necesitas algunos requisitos técnicos antes de empezar. Instala lo siguiente:

- [Node.js v10+ LTS y NPM](https://nodejs.org/en/) (viene con Node)
- [Git](https://git-scm.com/)

Cuando tengas todo eso instalado, tienes que crear un proyecto de NPM ingresando a una carpeta vacía, ejecutando `npm init` y siguiendo las instrucciones para instalar Hardhat. Cuando tu proyecto esté listo, ejecuta lo siguiente:

```bash
npm install --save-dev hardhat
```

Para crear el proyecto de Hardhat, ejecuta `npx hardhat` en la carpeta de tu proyecto.
Vamos a crear un proyecto de ejemplo y a seguir estos pasos para probar una tarea de ejemplo y compilar, poner a prueba y desplegar el contrato de ejemplo.

:::note

El proyecto de ejemplo que usamos aquí es de la [<ins>Guía de inicio rápido de Hardhat</ins>](https://hardhat.org/getting-started/#quick-start), al igual que las instrucciones.

:::

## Creación de un proyecto {#creating-a-project}

Para crear un proyecto de ejemplo, ejecuta `npx hardhat` en la carpeta de tu proyecto. Deberías ver el siguiente aviso:

![img](/img/hardhat/quickstart.png)

Selecciona el proyecto de JavaScript y sigue estos pasos para compilar, poner a prueba y desplegar el contrato de ejemplo.

### Revisión del contrato {#checking-the-contract}

La carpeta `contracts` contiene `Lock.sol`, que es un contrato de ejemplo que consta de una cerradura digital simple, donde los usuarios pueden retirar fondos después de un período determinado.

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### Configuración del contrato {#setting-up-the-contract}

- Dirígete a `hardhat.config.js`
- Actualiza `hardhat-config` con matic-network-credentials
- Crea el archivo `.env` en la raíz para guardar tu clave privada
- Añade la clave de la interfaz de programación de aplicaciones (API) de Polygonscan al archivo `.env` para verificar el contrato en Polygonscan. Puedes generar una clave de API [creando una cuenta](https://polygonscan.com/register)

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

Ten en cuenta que el archivo anterior requiere DOTENV para administrar las variables del entorno, y también Ethers y Etherscan. Asegúrate de instalar todos esos paquetes.

Encuentra más instrucciones sobre cómo usar DOTENV en [<ins>esta página</ins>](https://www.npmjs.com/package/dotenv).

Puedes desplegar en  si cambias  por

:::

### Compilación del contrato {#compiling-the-contract}

Para compilar el contrato, primero tienes que instalar Hardhat Toolbox:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Luego, simplemente ejecuta para compilar:

```bash
npx hardhat compile
```

### Pruebas del contrato {#testing-the-contract}

Para ejecutar pruebas con Hardhat, solo tienes que escribir lo siguiente:

```bash
npx hardhat test
```

Y esta es la respuesta prevista:

![img](/img/hardhat/test.png)

### Implementación en la red de Polygon {#deploying-on-polygon-network}

Ejecuta este comando en la raíz del directorio del proyecto:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

El contrato se desplegará en la red de pruebas Mumbai de Matic y puedes consultar el estado del despliegue aquí: https://mumbai.polygonscan.com/

**¡Felicitaciones! Lograste desplegar un contrato inteligente de Greeter. Ahora puedes interactuar con el contrato inteligente.**

:::tip Verificación rápida de contratos en Polygonscan

Ejecuta los siguientes comandos para verificar tu contrato rápidamente en Polygonscan. Eso facilita que cualquier persona pueda ver el código fuente de tu contrato desplegado. Para contratos que tengan un constructor con una lista compleja de argumentos, consulta [aquí](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html).

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
