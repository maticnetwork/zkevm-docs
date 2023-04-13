---
id: get-started
title: Cómo comenzar
keywords:
  - maticjs
  - introduction
  - contract
  - polygon
  - sdk
description: Empieza con Matic.js
---

`@matic.js`es una biblioteca javascript que ayuda a interactuar con los diversos componentes de la Red Matic.

En este tutorial de inicio, aprenderemos cómo podemos configurar el puente de PoS e interactuar con él.

## Instalación {#installation}

**Instala el paquete maticjs a través de npm:**

```bash
npm install @maticnetwork/maticjs
```

**Instala el complemento de web3js**

```bash
npm install @maticnetwork/maticjs-web3
```

## Configuración {#setup}

```javascript
import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
```

En el código anterior estamos iniciando maticjs con `web3js` pero también se puede iniciar de forma similar con [ethers](/docs/develop/ethereum-polygon/matic-js/setup/ethers).

## Cliente de PoS {#pos-client}

`POSClient` nos ayuda a interactuar con el Puente de PoS (prueba de participación)

```
import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, mainRPC),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, childRPC),
      defaultConfig: {
        from : fromAddress
      }
    }
});

```

Después de iniciar el `POSClient`, necesitamos iniciar los tipos de token necesarios como - `erc20`, `erc721`etc.

Empecemos `erc20`

### ERC-20 {#erc20}

**Creación de token secundario ERC-20**

```
const erc20ChildToken = posClient.erc20(<token address>);
```

**Creación de un token principal ERC-20**

```
const erc20ParentToken = posClient.erc20(<token address>, true);

```

Cuando ERC-20 se inicia, puedes llamar a varios métodos que están disponibles, como - `getBalance`, `approve`, `deposit` , `withdraw` etc.

Veamos algunos de los ejemplos de la API:

#### obtener saldo {#get-balance}

```
const balance = await erc20ChildToken.getBalance(<userAddress>)
console.log('balance', balance)
```

#### aprobar {#approve}

```
// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
```


Como puedes ver, con sus sencillas API, maticjs hace muy fácil la interacción con el puente maticjs. **Empecemos creando algo impresionante**

### Algunos enlaces importantes {#some-important-links}

- [Ejemplos](https://github.com/maticnetwork/matic.js/tree/master/examples)
