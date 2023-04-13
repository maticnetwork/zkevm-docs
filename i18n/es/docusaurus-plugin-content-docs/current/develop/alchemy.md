---
id: alchemy
title: Despliega un contrato inteligente utilizando Alchemy
sidebar_label: Using Alchemy
description: Guía para desplegar contratos inteligentes utilizando Alchemy
keywords:
  - docs
  - matic
  - polygon
  - alchemy
  - create smart contract
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Descripción general {#overview}

Este tutorial es para los desarrolladores que son nuevos en el desarrollo de la cadena de bloques de Ethereum o quieren conocer los fundamentos de la implementación e interacción con los contratos inteligentes. Te guiará a través de la creación y despliegue de un contrato inteligente en la red de pruebas de Polygon Mumbai utilizando una billetera de criptomonedas ([Metamask](https://metamask.io)), [Solidez](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org), y [Alchemy](https://alchemy.com/?a=polygon-docs).

:::tip

Si tienes preguntas o inquietudes, comunícate con el equipo de Alchemy a través de su servidor [<ins>oficial de</ins>](https://discord.gg/gWuC7zB) Discord.

:::

## Qué vas a aprender {#what-you-will-learn}

Para crear un contrato inteligente en este tutorial, aprenderás a utilizar la plataforma de Alchemy para:
- Crea una aplicación inteligente de contrato
- Comprueba el saldo de una billetera
- Verifica las llamadas de un explorador de la cadena de bloques

## Qué vas a hacer {#what-you-will-do}

Siguiendo el tutorial podrás:
1. Comenzar a crear una aplicación en Alchemy
2. Crear una dirección de billetera con MetaMask
3. Añade el saldo a la billetera (utilizando tokens de prueba)
4. Utilizar Hardhat y Ethers.js para compilar e implementar el proyecto
5. Comprueba el estado del contrato en la plataforma de Alchemy

## Crea y despliega tu contrato inteligente {#create-and-deploy-your-smart-contract}

### Conecta a la red Polygon {#connect-to-the-polygon-network}

Hay varias formas de hacerle solicitudes a la cadena PoS de Polygon. En lugar de ejecutar tu propio nodo, utilizarás una cuenta gratuita en la plataforma para desarrolladores de Alchemy e interactuarás con la API de PoS de Polygon y Alchemy para establecer comunicación con la cadena de PoS de Polygon. La plataforma consiste en un conjunto completo de herramientas para desarrolladores: esto incluye la capacidad de monitorear las solicitudes, análisis de datos que demuestra lo que sucede bajo la capucha durante el despliegue de contratos inteligentes, API mejoradas (Transact, NFT, etc) y un SDK de ethers.

Si aún no tienes una cuenta de Alchemy, comienza por registrarte [para](https://www.alchemy.com/polygon/?a=polygon-docs) una cuenta gratuita aquí. Después de crear tu cuenta, tendrás la opción de crear inmediatamente tu primera app antes de acceder al panel de control.

![img](/img/alchemy/alchemy-dashboard.png)

### Crea tu App (y la clave API) {#create-your-app-and-api-key}

Después de crear una cuenta de Alchemy, tendrás que generar una clave de la API mediante la creación de una aplicación. Esto autentica las solicitudes realizadas en la red de pruebas de Polygon Mumbai. Si no estás familiarizado con las redes de pruebas, consulta [esta guía](https://docs.alchemyapi.io/guides/choosing-a-network).

Para generar una nueva clave de API, navega hasta la pestaña **Apps** en la barra de navegación del panel de Alchemy y selecciona la subpestaña **Crear** aplicación.

![img](/img/alchemy/create-app.png)

Nombra tu nueva aplicación **Hello World**, ofrece una breve descripción, selecciona **Polygon** para la cadena y elige **Polygon Mumbai** para tu red.

Finalmente, haz clic en **Crear aplicación**. Tu nueva aplicación debería aparecer en la siguiente tabla.

### Crea una dirección de la billetera {#create-a-wallet-address}

Polygon PoS es una solución de escala de capa 2 para Ethereum. Por lo tanto, necesitamos una billetera Ethereum y añadir una URL personalizada de Polygon para enviar y recibir transacciones en la red de  . Para este tutorial, utilizaremos MetaMask, una billetera de criptomonedas compatible con el navegador utilizada para administrar su dirección de la billetera. Si quieres saber más sobre el funcionamiento de las transacciones en Ethereum, consulta [esta guía de transacciones](https://ethereum.org/en/developers/docs/transactions/) de la Fundación Ethereum.

Para obtener tu URL personalizada de  de Alchemy, ve a tu aplicación de **Hello World** en tu tablero de mando de Alchemy y haz clic en **Ver Clave** en la esquina superior derecha. A continuación, copia tu clave de la API HTTP de Alchemy.

![img](/img/alchemy/view-key.png)

Aquí puedes descargar y crear una cuenta de MetaMask [gratis](https://metamask.io/download.html). Una vez que hayas creado una cuenta, sigue estos pasos para configurar la red PoS de Polygon en tu billetera.

1. Selecciona **Configuración** en el menú desplegable en la esquina superior derecha de tu billetera MetaMask
2. Selecciona **Redes** desde el menú a la izquierda.
3. Conecta tu billetera a la red de pruebas de Mumbai con los siguientes parámetros:

**Nombre de la red:**

**Nueva URL de RPC:** https://polygon-mumbai.g.alchemy.com/v2/your-api-key



**Símbolo:**

**URL de Explorador de bloque:** https://mumbai.polygonscan.com/


### Añadir   {#add-polygon-mumbai-test-matic}

Necesitarás unos cuantos tokens de  para desplegar tu contrato inteligente a la red de pruebas de Mumbai. Para obtener tokens de la red , ve a la [grifo de Mumbai de Polygon](https://faucet.polygon.technology/), selecciona **Mumbai**, selecciona **Token de MATIC** e introduce tu dirección de billetera de Polygon y, a continuación, haz clic en **Enviar**. Debido al tráfico de la red, puede tomar algún tiempo recibir sus tokens de  .

También puedes utilizar el [grifo Mumbai gratuito](https://mumbaifaucet.com/?a=polygon-docs) de Alchemy.

![img](/img/alchemy/faucet.png)

Poco después verás los tokens de la red de pruebas en tu cuenta de MetaMask.

### Revisa tu saldo de la billetera {#check-your-wallet-balance}

Para verificar que nuestro saldo está ahí, hagamos una solicitud [eth_getBalance](https://docs.alchemy.com/reference/eth-getbalance-polygon) usando [la herramienta de composición de Alchemy](https://composer.alchemyapi.io/). Selecciona  **como** la cadena,  **como** la red, `eth_getBalance`como el método, e ingresa tu dirección. Esto nos mostrará la cantidad de MATIC que hay en nuestra billetera. Consulta [este video](https://youtu.be/r6sjRxBZJuU) para ver las instrucciones de uso de la herramienta de composición.

![img](/img/alchemy/get-balance.png)

Después de introducir la dirección de su cuenta de MetaMask y hacer clic en **Enviar solicitud**, deberías ver una respuesta que se vea así:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

:::info

Este resultado está en Wei, no en ETH. Wei es la denominación más pequeña de Ether. La conversión de Wei a Ether es 1 Ether = 10^18 Wei. Por lo tanto, si convertimos "0xde0b6b3a7640000" a decimales, obtenemos 1\*10^18, lo que equivale a 1 ETH. Esto se puede mapear a 1 MATIC en función de la denominación.

:::

### Inicializa tu proyecto {#initialize-your-project}

Primero, necesitaremos crear una carpeta para nuestro proyecto. Navega a tu [línea de comandos](https://www.computerhope.com/jargon/c/commandi.htm) y escribe:

```bash
mkdir hello-world
cd hello-world
```

Ahora que estamos dentro de la carpeta de nuestro proyecto, usaremos el `npm init`para inicializar el proyecto. Si aún no tienes npm instalado, sigue [estas instrucciones](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (también necesitaremos Node.js, así que descárgalo también).

```bash
npm init # (or npm init --yes)
```

Realmente no importa cómo respondas a las preguntas de la instalación. A continuación te explicamos cómo lo hicimos nosotros para que te sirva de referencia:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{   
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

¡Aprueba el package.json y estamos listos para continuar!

### Descargar [Hardhat](https://hardhat.org/getting-started/#overview)

Hardhat es un entorno de desarrollo para compilar, implementar, probar y depurar tu software de Ethereum. Eso les ayuda a los desarrolladores a la hora de construir contratos inteligentes y dApps localmente antes de implementarlos en la cadena real.

Dentro de nuestro proyecto, `hello-world`ejecuta:

```bash
npm install --save-dev hardhat
```

Consulta esta página para obtener más información sobre las [instrucciones de instalación](https://hardhat.org/getting-started/#overview).

### Crea un proyecto {#create-hardhat-project}

Dentro de la carpeta de nuestro proyecto`hello-world`, ejecuta

```bash
npx hardhat
```

Deberías ver un mensaje de bienvenida y una opción para seleccionar lo que quieres hacer. Selecciona **crear un  vacío**:

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Esto generará un `hardhat.config.js`archivo para nosotros, que es donde especificaremos toda la configuración para nuestro proyecto.

### Añadir carpetas de proyecto {#add-project-folders}

Para mantener nuestro proyecto organizado vamos a crear dos nuevas carpetas. Navega hasta el directorio raíz de tu proyecto `hello-world`en tu línea de comandos y escribe

```bash
mkdir contracts
mkdir scripts
```

* `contracts/` es donde guardaremos nuestro archivo de código del contrato inteligente "Hello World"
* `scripts/` es donde guardaremos las secuencias de comandos para implementar e interactuar con nuestro contrato

### Escribe el contrato {#write-the-contract}

Abra el proyecto **hello-world** en su editor favorito, como [VSCode](https://code.visualstudio.com). Los contratos inteligentes se escriben en un idioma llamado Solidez que es lo que vamos a utilizar para escribir nuestro contrato `HelloWorld.sol`inteligente.

1. Navega a la `contracts`carpeta y crea un nuevo archivo llamado`HelloWorld.sol`
2. A continuación se muestra un ejemplo de contrato inteligente "Hello World" procedente de la [Fundación Ethereum](https://ethereum.org/en/) que utilizaremos para este tutorial. Copia y pega el contenido que aparece a continuación en tu archivo `HelloWorld.sol`y asegúrate de leer los comentarios para entender lo que hace este contrato:

```solidity
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

Se trata de un contrato inteligente supersencillo que almacena un mensaje al crearlo y que se puede actualizar llamando la función `update`.

### Conecta con MetaMask y Alchemy {#connect-with-metamask-alchemy}

Hemos creado una billetera MetaMask, una cuenta de Alchemy y redactado nuestro contrato inteligente. Ahora es momento de conectar las tres cosas.

Cada transacción enviada desde tu billetera virtual requiere una firma utilizando tu clave privada única. Si queremos darle ese permiso a nuestro programa, podemos guardar de forma segura nuestra clave privada (y la clave de la API de Alchemy) en un archivo del entorno.

En primer lugar, instala el paquete dotenv en el directorio de tu proyecto:

```bash
npm install dotenv --save
```

Luego, crea un `.env`archivo en el directorio raíz de nuestro proyecto y añade tu clave privada de MetaMask y la URL de la API de Alchemy HTTP.

:::warning Advertencia

Tu archivo de entorno debe ser nombrado `.env`o no será reconocido como un archivo de entorno. No le pongas el nombre `process.env`ni `.env-custom`ni ningún otro.

Además, si estás utilizando un sistema de control de versiones como git para administrar tu proyecto, **por** favor, NO rastrear el `.env`archivo. Añade `.env`a tu `.gitignore`archivo para evitar publicar datos secretos.

:::

* Sigue [estas instrucciones](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar tu clave privada
* Para obtener tu clave de la API HTTP (URL RPC), navega a tu aplicación de **Hello World** en el panel de control de tu cuenta y haz clic en **Ver Clave** en la esquina superior derecha.

Tu `.env`debe tener este aspecto:

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Para conectarlas a nuestro código, vamos a hacer referencia a estas variables en nuestro `hardhat.config.js`archivo más adelante en este tutorial.

### Instalar Ethers.js {#install-ethers-js}

Ethers.js es una biblioteca que facilita la interacción y las solicitudes a Ethereum dotando a los [métodos JSON-RPC estándar](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) con métodos más fáciles de usar.

Hardhat facilita la integración de [complementos](https://hardhat.org/plugins/) para tener más herramientas y más funcionalidades. Usaremos el [complemento Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) para la implementación de contratos. [Ethers.js](https://github.com/ethers-io/ethers.js/) tiene métodos útiles para la implementación de contratos.

En el directorio de tu proyecto, escribe:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

También necesitaremos Ethers en nuestro `hardhat.config.js`en el siguiente paso.

### Actualizar  {#update-hardhat-config-js}

Hasta el momento hemos añadido varias dependencias y plugins. Ahora tenemos que actualizar `hardhat.config.js`para que nuestro proyecto reconozca esas dependencias.

Actualiza tu `hardhat.config.js` para que se vea así:

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### Compile nuestro contrato inteligente {#compile-our-smart-contract}

Para asegurarnos de que todo está funcionando hasta este momento, vamos a compilar nuestro contrato. La tarea `compile` es una de las tareas integradas en Hardhat.

Desde la línea de comandos: ejecuta

```bash
npx hardhat compile
```

Tal vez recibas una advertencia sobre `SPDX license identifier not provided in source file`, pero la aplicación aún estará funcionando bien. Si no, siempre puedes enviar un mensaje en [Discord de Alchemy](https://discord.gg/u72VCg3).

### Escribe nuestro script de despliegue {#write-our-deploy-script}

Ahora que nuestro contrato está escrito y que nuestro archivo de configuraciones está listo, es el momento de escribir nuestra secuencia de comandos para la implementación del contrato.

Dirígete a la carpeta de `scripts/` y crea un nuevo archivo llamado `deploy.js`, añadiéndole el siguiente contenido:

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");   
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Aquí adoptamos las expresiones del equipo de Hardhat sobre lo que hace cada una de estas líneas del código que aparecen en su [tutorial de contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests).

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Un `ContractFactory` en ethers.js es una abstracción usada para implementar los nuevos contratos inteligentes, por lo que `HelloWorld`aquí es una [fábrica](https://en.wikipedia.org/wiki/Factory\_\(object-oriented\_programming\)) para las instancias de nuestro contrato "Hello World". Cuando se utiliza el complemento  `hardhat-ethers` `ContractFactory` y `Contract`, las instancias se conectan con el primer signatario (propietario) por defecto.

```javascript
const hello_world = await HelloWorld.deploy();
```

Llamar `deploy()`en un `ContractFactory`iniciará la implementación y arrojará una `Promise`que resuelve a un objeto `Contract`. Este es el objeto que tiene un método para cada una de las funciones de nuestro contrato inteligente.

### Despliega nuestro contrato inteligente {#deploy-our-smart-contract}

Dirígete a la línea de comandos y ejecuta

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Deberías ver algo como esto:

```bash
Contract deployed to address: 0x3d94af870ED272Cd5370e4135F9B2Bd0e311d65D
```

Si vamos al [explorador de Polygon Mumbai](https://mumbai.polygonscan.com/) y buscamos nuestra dirección del contrato, deberíamos poder ver que se ha desplegado correctamente.

La `From`dirección debe coincidir con la dirección de tu cuenta de MetaMask y la `To`dirección dirá **la creación** de contrato. Pero si hacemos clic en la transacción, veremos nuestra dirección del contrato en el `To`campo.

![img](/img/alchemy/polygon-scan.png)

### Verificar el contrato {#verify-the-contract}

Alchemy proporciona un [explorador](https://dashboard.alchemyapi.io/explorer) donde puedes encontrar información sobre los métodos desplegados junto con el contrato inteligente, como tiempo de respuesta, estado HTTP, códigos de error entre otros. Este es un buen entorno para verificar tu contrato y comprobar si se realizaron las transacciones.

![img](/img/alchemy/calls.png)

**¡Felicitaciones! Acabas de desplegar un contrato inteligente a la red Polygon Mumbai.**

## Recursos adicionales {#additional-resources}

- [Cómo desarrollar un contrato inteligente NFT](https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy) – Alchemy tiene un tutorial escrito con un vídeo de Youtube sobre este tema. Esta es la primera semana de su serie gratuita de 10 semanas **de ruta a Web3**
-   [–](https://docs.alchemy.com/reference/polygon-api-quickstart) guía de desarrolladores de Alchemy para levantarse y ejecutar con Polygon
