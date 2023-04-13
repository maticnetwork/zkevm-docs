---
id: walletconnect
title: WalletConnect
description: Protocolo abierto que crea comunicación entre DApp y billeteras
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**WalletConnect** es un protocolo abierto, no una billetera - creado para crear un vínculo de comunicación entre las aplicaciones y las billeteras. Una billetera y una aplicación que apoya este protocolo habilitarán un enlace seguro a través de una clave compartida entre dos pares. La aplicación descentralizada inicia la conexión mostrando un código QR con un identificador uniforme de recursos (URI) estándar de Wallet Connect y esta conexión se establece cuando la aplicación de la billetera aprueba la solicitud de conexión. Otras solicitudes relacionadas con la transferencia de fondos se confirman en la aplicación misma de la billetera.

## Configurar Web3 {#set-up-web3}

Para configurar tu aplicación para conectarte con la billetera Polygon de un usuario, puedes utilizar el proveedor de WalletConnect para conectarte directamente a Polygon. Instala lo siguiente en tu DApp:

```bash
npm install --save @maticnetwork/walletconnect-provider
```

Instala `matic.js`para la integración de Polygon:

```bash
$ npm install @maticnetwork/maticjs
```

Y añade el siguiente código en tu App;

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

A continuación, configura  y proveedor de Ropsten a través del objeto de WalletConnect:

```javascript
const maticProvider = new WalletConnectProvider(
  {
    host: `https://rpc-mumbai.matic.today`,
    callbacks: {
      onConnect: console.log('connected'),
      onDisconnect: console.log('disconnected!')
    }
  }
)

const ropstenProvider = new WalletConnectProvider({
  host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
  callbacks: {
    onConnect: console.log('connected'),
    onDisconnect: console.log('disconnected')
  }
})
```

Creaste los dos objetos de proveedor anteriores para ejemplificar el objeto Web3 con:

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## Contratos de instanciación {#instantiating-contracts}

Una vez que tenemos nuestro **objeto web3**, la instanciación de contratos implica los mismos pasos que para Metamask. Asegúrate de tener tu **ABI de contrato** y **de dirección** ya en su lugar.

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## Funciones de llamadas {#calling-functions}

:::info

La clave privada permanecerá en la billetera del usuario y la **aplicación no accede a ella de ninguna manera**.

:::

Tenemos dos tipos de funciones en Ethereum, dependiendo de la interacción con la cadena de bloques. `call()` para cuando leemos datos y `send()` para cuando escribimos datos.

### Llamado de las funciones `call()` {#functions}

La lectura de datos no requiere una firma, por lo tanto, el código debe ser así:

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### Llamado de las funciones `send()` {#functions-1}

Dado que escribir a la cadena de bloques requiere una firma, pedimos al usuario en su billetera (que soporta WalletConnect) que firme la transacción.

Esto implica tres pasos:
1. Construir una transacción
2. Firmar la transacción
3. Enviar la transacción firmada

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

El código anterior crea un objeto de transacción que luego se envía a la billetera del usuario para que lo firme:


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`la función invita al usuario a su firma y `sendSignedTransaction()`envía la transacción firmada (devuelve un recibo de transacción en el momento de éxito).
