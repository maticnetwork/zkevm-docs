---
id: overview
title: Aperçu de Métamasque
sidebar_label: Overview
description: Comment vous pouvez commencer avec Métamasque sur Polygone
keywords:
  - wiki
  - polygon
  - wallet
  - metamask
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Métamasque](https://metamask.io/) est un portefeuille de crypto qui peut être utilisé dans un navigateur web et sur des appareils mobiles pour interagir avec la blockchain Ethereum. Il vous permet d'exécuter des Dapps Ethereum (Applications Décentralisées) directement dans votre navigateur sans avoir à exécuter un nœud Ethereum complet.

**Type** : Non gardien/HD <br/>**Stockage de clé privée** : stockage du navigateur local de l'utilisateur <br/>
**Communication avec l'Ethereum Ledger** : Infura <br/>
**Codage de la clé privée** : mnémonique<br/>

:::warning
Veuillez sauvegarder votre **phase de récupération secrète.** Si votre appareil se casse, est perdu, volé ou a la corruption des données, il n'y a pas d'autre moyen de le récupérer. La Phrase de récupération Secret est le seul moyen de récupérer vos comptes MetaMask. Vérifiez plus de **[<ins>Conseils de sécurité et de sécurité fondamentaux pour MetaMask</ins>](https://metamask.zendesk.com/hc/en-us/articles/360015489591-Basic-Safety-and-Security-Tips-for-MetaMask)**.
:::

## Guide pour configurer MetaMask pour Polygon {#guide-to-set-up-metamask-for-polygon}

* [Téléchargez et Installez MétaMasque](/develop/metamask/tutorial-metamask.md)
* [Configurez Polygone sur MétaMasque](/develop/metamask/config-polygon-on-metamask.md)
* [Configuration des Jetons Personnalisés](/develop/metamask/custom-tokens.md)
* [Créez et Importez des Comptes](/develop/metamask/multiple-accounts.md)

### 1. Configurer web3 {#1-set-up-web3}

#### Étape 1 {#step-1}

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

> MetaMask injecte une API globale dans les sites Web visités par ses utilisateurs sur window.ethereum. Cette API permet aux sites Web de demander des comptes Ethereum des utilisateurs, de lire les données des chaînes de blocs auxquelles l'utilisateur est connecté et de suggérer que l'utilisateur signe des messages et des transactions. La présence de l'objet fournisseur indique un utilisateur Ethereum.

En termes simples, cela signifie fondamentalement que si l'extension / add-on de Metamask’s est installée dans votre navigateur, vous auriez une variable globale définie, appelée `ethereum`( pour `web3`les versions plus anciennes), et en utilisant cette variable, nous instancions notre objet web3.

#### Étape 2 {#step-2}

Maintenant, dans votre code client, importez le fichier ci-dessus:

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

Maintenant, pour envoyer des transactions (en particulier celles qui modifient l'état de la blockchain), nous aurons besoin d'un compte pour signer ces transactions. Nous instancions notre instance de contrat à partir de l'objet web3 que nous avons créé ci-dessus:

```js
  this.web3.eth.getAccounts()
  .then((accounts) => {
    this.account = accounts[0];
  })
```

La fonction `getAccounts()` renvoie un tableau de tous les comptes sur Metamask de l'utilisateur et `accounts[0]` est celle choisie actuellement par l'utilisateur.

### 3. Instancier vos contrats {#3-instantiate-your-contracts}

Une fois que nous aurons notre `web3`objet en place, nous allons prochainement établir nos contrats, en supposant que vous avez votre contrat ABI et votre adresse déjà en place:

```js
  const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

### 4. Appeler les fonctions {#4-call-functions}

Maintenant, pour n'importe quelle fonction que vous souhaitez appeler depuis votre contrat, nous interagissons directement avec notre objet contrat instancié (qui est `myContractInstance`déclaré à l'étape 2).

:::tip Un avis rapide

Les fonctions qui modifient l'état du contrat sont appelées `send()`fonctions. Les fonctions qui ne modifient pas l'état du contrat sont appelées `call()`fonctions.

:::

#### Fonctions `call()`d'Appel {#functions}

```js
  this.myContractInstance.methods.myMethod(myParams)
  .call()
  .then (
    // do stuff with returned values
  )
```

#### Fonctions `send()`d'Appel {#functions-1}

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
