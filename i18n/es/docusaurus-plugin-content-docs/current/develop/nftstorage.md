---
id: nftstorage
title: Acuñación de NFT
description: Acuña con NFT.storage y Polygon.
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Este tutorial te enseñará a acuñar un NFT utilizando la cadena de bloques de Polygon y el almacenamiento de IPFS/Filecoin por medio de NFT.Storage. Con frecuencia, los desarrolladores eligen Polygon, una solución de escalado de capa 2 para Ethereum, por su velocidad, sus bajos costos de transacción y por ser completamente compatible con la máquina virtual de Ethereum (EVM). El tutorial te explicará la creación y la implementación de un contrato inteligente estandarizado, almacenando metadatos y activos en IPFS y Filecoin mediante la interfaz de programación de aplicaciones (API) de NFT.Storage, y acuñando el NFT en tu propia billetera de Polygon.

## Introducción {#introduction}

En este tutorial, intentaremos cumplir tres características con nuestro proceso de acuñación:

1. *Escalabilidad* del proceso de acuñación en términos de costo y rendimiento. Si el caso de uso apunta a crear NFT rápidamente, la tecnología usada debe poder manejar todas las solicitudes de acuñación y la acuñación debe ser de bajo costo.
2. *Durabilidad* del NFT, ya que los activos pueden ser de larga duración y el NFT debe poder usarse durante toda la vida útil de aquellos.
3. *Inmutabilidad* del NFT y del activo al que representa para evitar que cambios indeseados y actores malintencionados modifiquen el activo digital que el NFT representa.

[Polygon](https://polygon.technology) soluciona la *escalabilidad* con su protocolo y marco de trabajo. Estos también son compatibles con Ethereum y su máquina virtual, lo que les permite a los desarrolladores mover sus códigos libremente entre ambas cadenas de bloques. Asimismo, [NFT.Storage](https://nft.storage) garantiza la *durabilidad* gracias a la potencia de la red subyacente de [Filecoin](https://filecoin.io) y la *inmutabilidad* gracias al [direccionamiento de contenido](https://nftschool.dev/concepts/content-addressing/) de IPFS.

En este tutorial, obtendrás una descripción general del proceso de acuñación de NFT, aprenderás a almacenar un activo digital con NFT.Storage y usarás ese activo digital para acuñar tu NFT en Polygon.

## Prerrequisitos {#prerequisites}

Tener conocimiento general sobre los NFT te dará contexto. [NFT School trata los aspectos básicos y avanzados de los NFT](https://nftschool.dev/concepts/non-fungible-tokens/), y ofrece más tutoriales.

Para poner a prueba y ejecutar el código que incluye este tutorial, necesitarás una [instalación de Node.js](https://nodejs.org/en/download/package-manager/) activa.

También necesitarás una billetera de Polygon en la red de pruebas Mumbai con una pequeña cantidad de tokens MATIC. Sigue estas instrucciones para comenzar:

1. **Descarga e instala [MetaMask](https://metamask.io/)**. MetaMask es una billetera de criptomonedas y una puerta de entrada a las aplicaciones de cadena de bloques. Es muy fácil de usar y simplifica muchos pasos, como configurar una billetera de Polygon.
2. **Conecta MetaMask con la [red de pruebas Mumbai](https://docs.polygon.technology/docs/develop/metamask/overview)**de Polygon y selecciónala en el menú desplegable. Usaremos la red de pruebas de Polygon para acuñar nuestro NFT, ya que es gratuita.
3. **Obtén tokens MATIC** en tu billetera usando el [grifo](https://faucet.polygon.technology/). Selecciona la red de pruebas Mumbai y pega la dirección de tu billetera de MetaMask en el formulario. Para acuñar un NFT, tienes que pagar un pequeño monto de MATIC, que es la comisión que cobran los mineros por las operaciones para añadir transacciones nuevas a la cadena de bloques, por ejemplo, acuñar un NFT o crear un nuevo contrato inteligente.
4. **Copia tu clave privada** de MetaMask haciendo clic en los tres puntos que se encuentran en la esquina superior derecha y seleccionando "Account details" (Información de la cuenta). En la parte inferior puedes encontrar un botón para exportar tu clave privada. Haz clic en ese botón y escribe tu contraseña cuando se te solicite. Puedes copiar y pegar la clave privada en un archivo de texto por ahora. Lo usaremos más adelante en el tutorial, cuando interactuemos con la cadena de bloques.

Por último, necesitarás un editor de texto o de código. Te conviene elegir un editor con soporte de lenguaje para JavaScript y Solidity. Una buena opción es [Visual Studio Code](https://code.visualstudio.com) con la extensión de [Solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) habilitada.

## Preparación {#preparation}

### Obtén una clave para la API de NFT.storage {#get-an-api-key-for-nft-storage}

Necesitas una clave para la API para usar NFT.Storage. Primero, [dirígete a NFT.Storage e inicia sesión con tu dirección de correo electrónico](https://nft.storage/login/). Recibirás un correo electrónico con un enlace mágico con el que podrás ingresar sin contraseña. Después de iniciar sesión, dirígete a las claves de la API mediante la barra de navegación. Encontrarás un botón para crear una **nueva clave**. Cuando se te pida el nombre de la clave de la API, puedes elegir uno o usar “polygon + NFT.Storage”. Puedes copiar el contenido de la columna de la clave ahora o volver a NFT.Storage más adelante en el tutorial.

### Configura tu espacio de trabajo {#set-up-your-workspace}

Crea una nueva carpeta vacía que puedas utilizar como espacio de trabajo para este tutorial. Escoge cualquier nombre y ubicación en tu sistema de archivos. Abre un terminal y busca la carpeta recién creada.

A continuación, instalaremos las siguientes dependencias de Node.js:

- **Hardhat y Hardhat-Ethers**, un entorno de desarrollo para Ethereum (y las cadenas de bloques compatibles con Ethereum, como Polygon).
- **OpenZeppelin**, una colección de contratos inteligentes que ofrece contratos estandarizados para NFT.
- **NFT.Storage**, una biblioteca para conectarse con la API de NFT.Storage.
- **Dotenv**, una biblioteca para administrar archivos de entorno para la configuración (por ejemplo, inyectar claves privadas en la secuencia de comandos).

Usa el siguiente comando para instalar todas las dependencias a la vez:

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Hardhat tiene que inicializarse en la carpeta actual. Para activar la inicialización, ejecuta:

```bash
npx hardhat
```

Cuando se te lo solicite, selecciona **Crear un  vacío**. La salida de tu consola debería verse así:

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

Haremos algunas modificaciones en el archivo de configuración de Hardhat `hardhat.config.js` para admitir la red de pruebas Mumbai de Polygon. Abre el `hardhat.config.js` que se creó en el paso anterior. Ten en cuenta que estamos cargando la clave privada de tu billetera de Polygon desde un archivo de entorno y ese archivo de entorno debe mantenerse en un sitio seguro. También puedes usar otro [enlace](https://docs.polygon.technology/docs/develop/network-details/network) de llamada a procedimiento remoto (RPC), según los requisitos.

```js
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
    PolygonMumbai : {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

Crea un nuevo archivo llamado `.env`que mantendrá tu clave API para NFT.Storage y tu clave privada de billetera Polygon. El contenido del `.env`archivo debe verse algo como:

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

Reemplaza los marcadores de posición con la clave de la API que creaste durante la preparación y la clave privada de tu billetera de Polygon.

Para organizar nuestro proyecto, crearemos tres carpetas nuevas:

1. `contracts`, para los contratos de Polygon escritos en Solidity.
2. `assets`, que contiene el activo digital que acuñaremos como NFT.
3. `scripts`, como ayudantes para dirigir el proceso de preparación y acuñación.

Ejecuta el siguiente comando:

```bash
mkdir contracts assets scripts
```

Por último, añadiremos una imagen a la carpeta `assets`. Esta será la ilustración que cargaremos en NFT.Storage y acuñaremos en Polygon. La llamaremos `MyExampleNFT.png` por ahora. Si no tienes una ilustración bonita preparada, puedes [descargar un patrón sencillo](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu).

## Acuñación de NFT {#minting-your-nft}

### Almacenamiento de datos de activos con NFT.Storage {#storing-asset-data-with-nft-storage}

Usaremos NFT.Storage para almacenar nuestro activo digital y sus metadatos. NFT.Storage garantiza la inmutabilidad y la durabilidad cargando tu activo digital en Filecoin e IPFS automáticamente. IPFS y Filecoin trabajan con identificadores de contenido (CID) para ofrecer referencias inmutables. IPFS proporcionará una rápida recuperación con su almacenamiento en caché con replicación geográfica y Filecoin garantiza la durabilidad con proveedores de almacenamiento incentivados.

Crea una secuencia de comandos con el nombre  `store-asset.mjs`debajo del directorio `scripts`. El contenido se enuncia a continuación:

```js
import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env

async function storeAsset() {
   const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
   const metadata = await client.store({
       name: 'ExampleNFT',
       description: 'My ExampleNFT is an awesome artwork!',
       image: new File(
           [await fs.promises.readFile('assets/MyExampleNFT.png')],
           'MyExampleNFT.png',
           { type: 'image/png' }
       ),
   })
   console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

La parte principal de la secuencia de comandos es la función `storeAsset`. Esta crea un nuevo cliente que se conecta a NFT.Storage con la clave de la API que creaste anteriormente. Luego, introducimos los metadatos, que son el nombre, la descripción y la imagen. Ten en cuenta que estamos leyendo el activo del NFT directamente desde el sistema de archivos del directorio `assets`. Al final de la función, imprimiremos el URL de los metadatos, ya que lo usaremos más adelante, cuando creemos el NFT en Polygon.

Después de configurar la secuencia de comandos, puedes ejecutarla mediante:

```bash
node scripts/store-asset.mjs
```

La salida debería verse como el siguiente listado, donde `HASH` es el CID de la ilustración que acabas de almacenar.

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### Creación de un NFT en Polygon {#creating-your-nft-on-polygon}

#### Crea un contrato inteligente para la acuñación {#create-the-smart-contract-for-minting}

Primero, crearemos un contrato inteligente que se utilizará para acuñar el NFT. Dado que Polygon es compatible con Ethereum, escribiremos el contrato inteligente en [Solidity](https://soliditylang.org). Crea un archivo nuevo para el contrato inteligente de NFT con el nombre `ExampleNFT.sol` dentro del directorio `contracts`. Puedes copiar el código del listado a continuación:

```solidity
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleNFT is ERC721URIStorage, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("NFT", "ENFT") {}

   function mintNFT(address recipient, string memory tokenURI)
       public onlyOwner
       returns (uint256)
   {
       _tokenIds.increment();

       uint256 newItemId = _tokenIds.current();
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);

       return newItemId;
   }
}
```

Para que sea un NFT válido, el contrato inteligente debe implementar todos los métodos del [estándar ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/). Nosotros usamos la implementación de la biblioteca [OpenZeppelin](https://openzeppelin.com), que ofrece un conjunto de funcionalidades básicas y cumple con el estándar.

En la parte superior del contrato inteligente, importamos tres clases de contrato inteligente de OpenZeppelin:

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol` contiene la implementación de los métodos básicos del estándar ERC-721, que heredará nuestro contrato inteligente de NFT. Usamos `ERC721URIStorage,`, que es una extensión para almacenar no solo los activos, sino también metadatos como archivo JSON fuera de la cadena. Al igual que el contrato, el archivo JSON tiene que cumplir con la ERC-721.

2. `\@openzeppelin/contracts/utils/Counters.sol` proporciona contadores que solo pueden incrementarse o disminuirse de a una unidad. El contrato inteligente emplea un contador para llevar un registro de la cantidad total de NFT acuñados y establecer el identificador único del nuevo NFT.

3. `\@openzeppelin/contracts/access/Ownable.sol` configura el control de acceso del contrato inteligente, para que solo el titular del contrato (tú) pueda acuñar NFT.

Después de las sentencias de importación, tendremos el contrato inteligente de NFT personalizado, que contiene un contador, un constructor y un método para acuñar el NFT. La mayor parte del trabajo difícil lo hace el contrato de base heredado de OpenZeppelin, que implementa la mayoría de los métodos que necesitamos para crear un NFT que cumpla con el estándar ERC-721.

El contador lleva el registro de la cantidad total de NFT acuñados, que se utiliza en el método de acuñación como identificador único del NFT.

En el constructor, pasamos dos argumentos de cadena para el nombre del contrato inteligente y el símbolo (representado en las billeteras). Puedes cambiarlos por los que quieras.

Por último, tenemos el método `mintNFT`, que nos permite acuñar efectivamente el NFT. El método se configura en `onlyOwner` para garantizar que solo pueda ejecutarlo el titular del contrato inteligente.

`address recipient`especifica la dirección que recibirá el NFT al principio.

`string memory tokenURI` es un URL que debería resolverse en un documento JSON que describa los metadatos del NFT. En nuestro caso, ya se almacenó en NFT.Storage. Podemos utilizar el enlace de IPFS que se le devolvió al archivo JSON de metadatos durante la ejecución del método.

En el método, incrementamos el contador para recibir un nuevo identificador único para el NFT. Luego, llamamos a los métodos proporcionados por el contrato de base de OpenZeppelin para acuñar el NFT para el receptor con el identificador recién creado y configurar el identificador uniforme de recursos (URI) de los metadatos. El método devuelve el identificador único después de la ejecución.

#### Implementación del contrato inteligente en Polygon {#deploy-the-smart-contract-to-polygon}

Ahora, es momento de implementar el contrato inteligente en Polygon. Crea un archivo nuevo con el nombre `deploy-contract.mjs` dentro del directorio `scripts`. Copia el contenido del siguiente listado en ese archivo y guárdalo.

```js
async function deployContract() {
 const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
 const exampleNFT = await ExampleNFT.deploy()
 await exampleNFT.deployed()
 // This solves the bug in Mumbai network where the contract address is not the real one
 const txHash = exampleNFT.deployTransaction.hash
 const txReceipt = await ethers.provider.waitForTransaction(txHash)
 const contractAddress = txReceipt.contractAddress
 console.log("Contract deployed to address:", contractAddress)
}

deployContract()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });
```

La implementación del contrato se realiza con las funciones de ayuda proporcionadas por la biblioteca de Hardhat. Primero, obtenemos el contrato inteligente que creamos en el paso anterior con la fábrica proporcionada. Después, lo implementamos llamando al método respectivo y esperamos que se complete la implementación. Hay otras líneas debajo del código descrito para obtener la dirección correcta en el entorno de la red de pruebas. Guarda el `mjs`archivo.

Ejecuta el script con el siguiente comando:

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

Si todo es correcto, verás el siguiente resultado:

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

Ten en cuenta que necesitarás tener impresa la dirección del contrato en el paso de acuñación. Puedes pegarla en un archivo de texto aparte y guardarlo para más tarde. Eso es necesario para que la secuencia de comandos de acuñación pueda llamar al método de acuñación de ese contrato específico.

#### Acuñación del NFT en Polygon {#minting-the-nft-on-polygon}

Para acuñar el NFT, ahora solo tenemos que llamar al contrato que acabamos de implementar en Polygon. Crea un archivo nuevo con el nombre `mint-nft.mjs` dentro del directorio `scripts` y copia este código de la siguiente lista:

```bash
const CONTRACT_ADDRESS = "0x00"
const META_DATA_URL = "ipfs://XX"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

Edita las dos primeras líneas para insertar la **dirección del contrato** de la implementación anterior y el **URL de los metadatos** devuelta al almacenar el activo con NFT.Storage. El resto de la secuencia de comandos configura la llamada al contrato inteligente poniéndote a ti como futuro propietario del NFT y el apuntador hacia los metadatos almacenados en IPFS.

A continuación, ejecuta la secuencia de comandos:

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

Deberías ver la siguiente salida:

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

¿Estás buscando el código de ejemplo de este tutorial? Puedes encontrarlo en el repositorio de Github en polygon-nft.storage-demo ([enlace](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo)).

## Conclusión {#conclusion}

En este tutorial, aprendimos a acuñar un NFT de principio a fin con Polygon y NFT.Storage. Esta combinación de tecnologías da lugar a una descentralización adecuada y garantiza la *escalabilidad*, la *durabilidad* y *la inmutabilidad*.

Implementamos un contrato inteligente personalizado para acuñar un NFT de acuerdo con nuestras necesidades. Para este tutorial, usamos un ejemplo sencillo basado en el estándar ERC-721. Sin embargo, también puedes definir la lógica compleja que rige el ciclo de vida del NFT. Para casos de uso más complejos, te recomendamos empezar con el estándar sucesor, [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/). OpenZeppelin, la biblioteca que utilizamos en el tutorial, ofrece un [asistente de contratos](https://docs.openzeppelin.com/contracts/4.x/wizard) que ayuda a crear contratos de NFT.

La acuñación exitosa se puede considerar el inicio de la fase con valor del NFT. Después de eso, el NFT se puede utilizar para probar la titularidad y se les puede transferir a otros usuarios. Los motivos para transferir un NFT podrían ser la venta en uno de los mercados de NFT, como [OpenSea](https://opensea.io) u otro tipo de evento, como la adquisición de un artículo en un juego basado en NFT. Definitivamente, explorar las variadas posibilidades de los NFT debe ser tu próximo paso.

Si quieres ayudar a construir tu proyecto NFT con NFT.storage, te animamos a que te unes al `#nft-storage`canal en D[iscord ](https://discord.gg/Z4H6tdECb9)y S[lack.](https://filecoinproject.slack.com/archives/C021JJRH26B)
