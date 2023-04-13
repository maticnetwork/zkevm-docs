---
id: portis
title: Portis
description: Billetera web creada teniendo en mente la fácil incorporación de los usuarios
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portis es una billetera web que se creó teniendo en mente la fácil incorporación de los usuarios. Viene con un kit de desarrollo de software (SDK) de javascript que se integra a las aplicaciones descentralizadas (DApp) y crea una experiencia  sin billetera local para el usuario. Además, se encarga de configurar la billetera, transacciones y tarifas de gas.

Al igual que MetaMask, es sin custodia: los usuarios controlan sus claves y Portis solo las almacena de forma segura. Sin embargo, a diferencia de MetaMask, se integra a la aplicación y no al navegador. Los usuarios asocian sus claves con la ID de inicio de sesión y las contraseñas.

**Tipo**: sin custodia/HD <br/>
**Almacenamiento de claves privada**: cifrado y almacenado en servidores de Portis<br/> **Comunicación a Ethereum Ledger**: Definida por el desarrollador<br/> **Codificación de la clave privada**: mnemotécnica<br/>

## Configurar Web3 {#set-up-web3}

Instala  en tu dApp:

```js
npm install --save @portis/web3
```

Ahora, registra tu dApp con Portis para obtener una ID de dApp utilizando el [panel de control de Portis](https://dashboard.portis.io/).

Importación `portis`y `web3`objetos:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

El constructor de Portis toma el primer argumento como la ID de la aplicación y el segundo argumento como la red con la que te gustaría conectar. Esto puede ser una cadena o un objeto.

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## Configuración de la cuenta {#set-up-account}

Si la instalación y la instanciación de Web3 fueron correctas, deberías obtener la siguiente respuesta de la cuenta conectada:

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## Contratos de instanciación {#instantiating-contracts}

Así es como deberíamos instanciar los contratos:

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## Funciones de llamadas {#calling-functions}

### `call()`Función de llamada {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### `send()`Función de llamada {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
