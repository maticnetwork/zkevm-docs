---
id: portis
title: Portis
description: Un portefeuille en ligne conçu pour faciliter l'accueil des utilisateurs.
keywords:
  - wiki
  - polygon
  - wallet
  - portis
  - integrate
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Portis est un porte-monnaie en ligne conçu pour faciliter l'accueil des utilisateurs. Il est fournie avec un SDK javascript qui s'intègre dans la DApp et crée une expérience locale sans portefeuille pour l'utilisateur. De plus, il gère la configuration du portefeuille, des transactions et des frais de gaz.

 Comme Métamasque, il n'y a pas de garde - les utilisateurs contrôlent leurs clés, Portis se contente de les stocker en toute sécurité. Mais, contrairement à Métamasque , il est intégré à l'application et non au navigateur. Les utilisateurs ont leurs clés associées à leurs identifiants et mots de passe

**Type** : Non gardien/HD <br/>**Stockage de clés privées**: cryptés et stockés sur les serveurs Portis<br/> **Communication à Ethereum Ledger**: défini par le développeur<br/> **Codage de la clé privée** : Mnémonique<br/>

## Configurez Web3 {#set-up-web3}

Installez Portis dans votre dApp:

```js
npm install --save @portis/web3
```

Maintenant, enregistrez votre dApp avec Portis pour obtenir un ID dApp à l'aide du Tableau de [bord Portis](https://dashboard.portis.io/).

Importation `portis`et `web3`objets:

```js
import Portis from '@portis/web3';
import Web3 from 'web3';
```

Le constructeur Portis prend le premier argument comme identifiant dApp et le deuxième argument comme le réseau avec lequel vous souhaitez vous connecter. Cela peut être soit une chaîne de caractères soit un objet.

```js
const portis = new Portis('YOUR_DAPP_ID', 'maticTestnet');
const web3 = new Web3(portis.provider);
```

## Configurez un compte {#set-up-account}

Si l'installation et l'instanciation de web3 se sont déroulées avec succès, la commande suivante devrait renvoyer le compte connecté:

```js
this.web3.eth.getAccounts()
.then((accounts) => {
  this.account = accounts[0];
})
```

## Instanciation de contrats {#instantiating-contracts}

C'est ainsi que nous devrions instancier les contrats :

```js
const myContractInstance = new this.web3.eth.Contract(myContractAbi, myContractAddress)
```

## Fonctions d'appel {#calling-functions}

### `call()`Fonction d'appel {#function}

```js
this.myContractInstance.methods.myMethod(myParams)
.call()
.then (
  // do stuff with returned values
)
```

### `send()`Fonction d'appel {#function-1}
```js
this.myContractInstance.methods.myMethod(myParams)
.send({
  from: this.account,gasPrice: 0
})
.then ((receipt) => {
  // returns a transaction receipt
})
```
