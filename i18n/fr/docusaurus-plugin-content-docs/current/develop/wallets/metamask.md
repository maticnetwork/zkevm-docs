---
id: metamask
title: Metamask
description: Créez votre prochaine application de blockchain sur Polygon.
keywords:
  - docs
  - matic
  - polygon
  - wallet
  - metamask
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Metamask est un complément de navigateur qui gère le portefeuille Ethereum d'un utilisateur en stockant sa clé privée dans le magasin de données de son navigateur et la phrase secrète chiffrée avec son mot de passe. Il s'agit d'un portefeuille sans garde, ce qui signifie que l'utilisateur a un accès total et la responsabilité de sa clé privée. Une fois perdu, l'utilisateur ne peut plus contrôler les économies ou restaurer l'accès au portefeuille.

**Type** : sans garde/HD<br/>
**Stockage de clé privée** : stockage du navigateur local de l'utilisateur <br/>
**Communication avec l'Ethereum Ledger** : Infura <br/>
**Codage de la clé privée** : mnémonique<br/>

### 1. Configurer web3 {#1-set-up-web3}

**Étape 1**

Installer ce qui suit dans votre Dapp :
  ```javascript
  npm install --save web3
  ```
Créez un dossier nouveau, nommez-le `web3.js`et insérez le code suivant dans celui-ci :

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

Le fichier ci-dessus exporte une fonction appelée `getWeb3()` - dont le but est de demander l'accès au compte Metamask en détectant un objet global (`ethereum` ou `web3`) injecté par Metamask.

Selon la [documentation API de Metamask](https://docs.metamask.io/guide/ethereum-provider.html#upcoming-provider-changes) :

> MetMask injecte une API globale dans les sites Web visités par ses utilisateurs sur window.ethereum (également disponible sur window.web3.currentProvider pour des raisons d'héritage). Cette API permet aux sites web de demander la connexion de l'utilisateur, de charger les données des blockchains auxquelles l'utilisateur est connecté, et de proposer à l'utilisateur de signer des messages et des transactions. Vous pouvez utiliser cette API pour détecter l'utilisateur d'un navigateur web3.

En termes simples, cela signifie que si l'extension/add-on Metamask est installée dans votre navigateur, vous aurez une variable globale définie, appelée `ethereum` (`web3` pour les anciennes versions) - en utilisant cette variable nous instancions notre objet web3.

**Étape 2**

Maintenant, dans votre code client, importez le fichier ci-dessus,
```js
  import getWeb3 from '/path/to/web3';
```
et appelez la fonction :
```js
  getWeb3()
    .then((result) => {
      this.web3 = result;// we instantiate our contract next
    });
```
### 2. Configurer le compte {#2-set-up-account}

Maintenant, pour envoyer des transactions (en particulier celles qui modifient l'état de la blockchain), nous avons besoin d'un compte pour signer ces transactions. Nous instancions notre instance de contrat à partir de l'objet web3 que nous avons créé ci-dessus :
```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```
La fonction `getAccounts()` renvoie un tableau de tous les comptes sur Metamask de l'utilisateur et `accounts[0]` est celle choisie actuellement par l'utilisateur.

### 3. Instancier vos contrats {#3-instantiate-your-contracts}

Une fois que nous avons notre objet `web3` en place, nous allons ensuite instancier nos contrats > En supposant que vous avez votre contrat ABI et votre adresse déjà en place :)
```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```
### 4. Appeler les fonctions {#4-call-functions}

Maintenant, pour toute fonction que vous souhaitez appeler à partir de votre contrat, nous interagissons directement avec notre objet contrat instancié (qui est `myContractInstance` indiqué à l'Étape 2)

Un bref rappel : - Les fonctions qui modifient l'état du contrat sont appelées les fonctions `send()` - Les fonctions qui ne modifient pas l'état du contrat sont appelées les fonctions `call()`

**Appeler les fonctions `call()`**
```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```
**Appeler les fonctions `send()`**
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
