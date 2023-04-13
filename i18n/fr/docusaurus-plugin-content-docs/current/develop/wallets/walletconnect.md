---
id: walletconnect
title: WalletConnect
description: Un protocole ouvert qui crée une communication DApp-Portefeuille.
keywords:
  - wiki
  - polygon
  - dapp
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

**WalletConnect** est un protocole ouvert - pas un portefeuille - construit pour créer un lien de communication entre dApps et wallets. Un portefeuille et une application prenant en charge ce protocole permettront d'activer un lien sécurisé via une clé partagée entre deux pairs. La connexion est initiée par la DApp qui affiche un code QR avec une URI WalletConnect standard et la connexion est établie lorsque l'application de portefeuille approuve la demande de connexion. Les autres demandes concernant le transfert de fonds sont confirmées sur l'application du portefeuille lui-même.

## Configurez Web3 {#set-up-web3}

Pour configurer votre dApp pour vous connecter au portefeuille Polygon d'un utilisateur, vous pouvez utiliser le fournisseur WalletConnect pour vous connecter directement à Polygon. Installer ce qui suit dans votre Dapp :

```bash
npm install --save @maticnetwork/walletconnect-provider
```

Installez `matic.js`pour l'intégration Polygon:

```bash
$ npm install @maticnetwork/maticjs
```

Et ajoutez le code suivant dans votre dApp;

```js
import WalletConnectProvider from "@maticnetwork/walletconnect-provider"

import Web3 from "web3"
import Matic from "maticjs"
```

Ensuite, configurez le fournisseur Polygon et Ropsten via l'objet WalletConnect:

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

Nous avons créé les deux objets fournisseurs ci-dessus pour instancier notre objet Web3:

```js
const maticWeb3 = new Web3(maticProvider)
const ropstenWeb3 = new Web3(ropstenProvider)
```

## Instanciation de contrats {#instantiating-contracts}

Une fois que nous avons notre **objet web3**, l'instanciation des contrats implique les mêmes étapes que pour Metamask. Assurez-vous d'avoir votre **ABI contrat** et **votre adresse** déjà en place.

```js
const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)
```

## Fonctions d'appel {#calling-functions}

:::info

La clé privée restera dans le portefeuille de l'utilisateur et **l'application n'y accède en aucune façon**.

:::

Nous avons deux types de fonctions dans Ethereum, selon l'interaction avec la blockchain. Nous  `call()`quand nous lisons des données et `send()`quand nous écrivons des données.

### Fonctions `call()`d'Appel {#functions}

La lecture des données ne nécessite pas de signature, donc le code devrait être comme ceci:

```js
this.myContractInstance.methods
  .myMethod(myParams)
  .call()
  .then (
  // do stuff with returned values
  )
```

### Fonctions `send()`d'Appel {#functions-1}

Étant donné que l'écriture à la blockchain nécessite une signature, nous invitons l'utilisateur sur son portefeuille (qui prend en charge WalletConnect) à signer la transaction.

Cela implique trois étapes:
1. Construire une transaction
2. Obtenir une signature sur la transaction
3. Envoi de la transaction signée

```js
const tx = {
  from: this.account,
  to: myContractAddress,
  gas: 800000,
  data: this.myContractInstance.methods.myMethod(myParams).encodeABI(),
}
```

Le code ci-dessus crée un objet de transaction qui est ensuite envoyé au portefeuille de l'utilisateur pour signature:


```js
maticWeb3.eth.signTransaction(tx)
  .then((result) =>{
    maticWeb3.eth.sendSignedTransaction(result)
    .then((receipt) =>
    console.log (receipt)
  )
})
```

`signTransaction()`la fonction invite l'utilisateur à signer et `sendSignedTransaction()`envoie la transaction signée (retourne un reçu de transaction sur succès).
