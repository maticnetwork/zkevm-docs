---
id: overview
title: Descripción general de MetaMask
sidebar_label: Overview
description: Cómo puedes empezar con Metamask en Polygon
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[MetaMask](https://metamask.io/) es una criptobilletera que se puede utilizar desde navegadores web o dispositivos móviles para interactuar con la cadena de bloques de Ethereum. Te permite ejecutar aplicaciones descentralizadas (DApp) de Ethereum desde tu navegador, sin necesidad de ejecutar un nodo completo de Ethereum.

**Tipo**: sin custodia/HD <br/>
**Almacenamiento de la clave privada**: almacenamiento del navegador local del usuario <br/>
**Comunicación con el libro mayor de Ethereum**: Infura <br/>
**Codificación de la clave privada**: mnemotécnica <br/>

:::warning
Haz una copia de seguridad de tu **Phrase de recuperación secreta.** Si tu dispositivo se rompe, se pierde, se ha robado o tiene corrupción de datos, no hay otra manera de recuperarlo. La Frase de recuperación secreta es la única manera de recuperar tus cuentas de MetaMask Consulta más **[<ins>consejos básicos de seguridad y seguridad para MetaMask</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**.
:::

## Guía para configurar  para Polygon {#guide-to-set-up-metamask-for-polygon}

* [Descarga e instalación de MetaMask](/develop/metamask/tutorial-metamask.md)
* [Configuración de Polygon en MetaMask](/develop/metamask/config-polygon-on-metamask.md)
* [Configuración de tokens personalizados](/develop/metamask/custom-tokens.md)
* [Creación e importación de cuentas](/develop/metamask/multiple-accounts.md)

### 1. Configuración de Web3 {#1-set-up-web3}

#### Paso 1 {#step-1}

Instala lo siguiente en tu DApp:

  ```javascript
  npm install --save web3
  ```

Crea un archivo nuevo, llámalo `web3.js` e insértale el siguiente código:

  ```javascript
  import Web3 from 'web3';

  const getWeb3 = () => new Promise((resolve) => {
    window.addEventListener('load', () => {
      let currentWeb3;

      if (window.ethereum) {
        currentWeb3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          window.ethereum.enable();
          // Acccounts now exposed
          resolve(currentWeb3);
        } catch (error) {
          // User denied account access...
          alert('Please allow access for the app to work');
        }
      } else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // Acccounts always exposed
        resolve(currentWeb3);
      } else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
    });
  });


  export default getWeb3;
  ```

El archivo anterior exporta una función llamada `getWeb3()`, cuyo propósito es solicitar acceso a la cuenta de MetaMask mediante la detección de un objeto global (`ethereum`o `web3`) inyectado por MetaMask.

Según [la documentación de la API de MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes):

> MetaMask inyecta una API global en sitios web visitados por sus usuarios en . Esta API permite que los sitios web soliciten cuentas de los usuarios de Ethereum, lean datos de las cadenas de bloques a las que el usuario está conectado y sugieran que el usuario firma mensajes y transacciones. La presencia del objeto proveedor indica un usuario de Ethereum.

En términos más simples, básicamente significa que tener la extensión / complemento de Metamask, instalada en tu navegador, tendrás una variable global definida, llamada `ethereum``web3`(para versiones anteriores) y mediante esta variable instamos nuestro objeto web3.

#### Paso 2 {#step-2}

Ahora, en el código de su cliente, importa el archivo anterior:

```js
  import getWeb3 from '/path/to/web3';
```

y llama a la función:

```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```

### 2. Configuración de la cuenta {#2-set-up-account}

Ahora para enviar transacciones (en concreto aquellas que alteran el estado de la cadena de bloques) necesitaremos una cuenta para firmar esas transacciones. Instanciamos nuestra instancia de contrato desde el objeto web3 que hemos creado anteriormente:

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

La función `getAccounts()` da como respuesta una matriz de todas las cuentas en el MetaMask del usuario y `accounts[0]`es la seleccionada actualmente por el usuario.

### 3. Instanciación de los contratos {#3-instantiate-your-contracts}

Una vez que tengamos nuestro `web3`objeto en su lugar, instanciaremos nuestros contratos, asumiendo que usted tiene su ABI de contrato y dirección ya en su lugar:

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. Llamado de funciones {#4-call-functions}

Ahora para cualquier función que quieras llamar desde tu contrato, interactuamos directamente con nuestro objeto de contrato instanciado (que se `myContractInstance`declara en el paso 2).

:::tip Una revisión rápida

Las funciones que alteran el estado del contrato se llaman `send()`funciones. Las funciones que no alteran el estado del contrato se denominan `call()`funciones.

:::

#### Llamado de las funciones `call()` {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### Llamado de las funciones `send()` {#functions-1}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .send({
    from: this.account,gasPrice: 0
  })
  .then (
    (receipt) => {
      // returns a transaction receipt}
    )
```
