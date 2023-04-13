---
id: metamask
title: MetaMask
description: Desarrolla tu próxima aplicación de cadena de bloques en Polygon.
keywords:
  - docs
  - matic
  - polygon
  - wallet
  - metamask
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

MetaMask es un complemento del navegador que administra la billetera de Ethereum del usuario al guardar su clave privada en el almacenamiento de datos del navegador y la frase semilla encriptada con su contraseña. Es una billetera sin custodia, lo que significa que el usuario tiene total acceso a su clave privada y responsabilidad por ella. Si la pierde, el usuario no podrá controlar los ahorros ni recuperar el acceso a la billetera.

**Tipo**: sin custodia/HD <br/>
**Almacenamiento de la clave privada**: almacenamiento del navegador local del usuario <br/>
**Comunicación con el libro mayor de Ethereum**: Infura <br/>
**Codificación de la clave privada**: mnemotécnica <br/>

### 1. Configuración de Web3 {#1-set-up-web3}

**Paso 1**

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

> MetaMask inyecta una interfaz de programación de aplicaciones (API) global en los sitios web visitados por sus usuarios en window.ethereum (también disponible en window.web3.currentProvider por herencia). Esta API les permite a los sitios web que soliciten el inicio de sesión del usuario, que carguen datos de las cadenas de bloques con las que el usuario se conecta y que le sugieran al usuario que firme mensajes y transacciones. Puedes usar esta API para detectar al usuario de un navegador de Web3.

En otras palabras, eso significa que, si tienes la extensión o el complemento de MetaMask instalado en tu navegador, tendrás una variable global definida, llamada `ethereum`(`web3`en versiones anteriores). Con esa variable, instanciamos nuestro objeto Web3.

**Paso 2**

Ahora, en tu código de cliente, importa el archivo anterior
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

Para enviar transacciones (específicamente aquellas que alteren el estado de la cadena de bloques), necesitaremos una cuenta desde donde firmarlas. Instanciamos la instancia del contrato desde el objeto de Web3 que acabamos de crear:
```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```
La función `getAccounts()` da como respuesta una matriz de todas las cuentas en el MetaMask del usuario y `accounts[0]`es la seleccionada actualmente por el usuario.

### 3. Instanciación de los contratos {#3-instantiate-your-contracts}

Cuando tengamos el objeto `web3` incorporado, instanciaremos los contratos, asumiendo que ya incluiste la interfaz binaria de la aplicación (ABI) y la dirección del contrato :)
```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```
### 4. Llamado de funciones {#4-call-functions}

En este momento, para cualquier función que quieras llamar desde el contrato, interactuamos directamente con el objeto del contrato instanciado (que es el `myContractInstance` que se indica en el paso 2).

Una revisión rápida: las funciones que alteran el estado del contrato se llaman `send()` y las que no alteran el estado del contrato se llaman `call()`.

**Llamado de funciones `call()`**
```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```
**Llamado de funciones `send()`**
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
