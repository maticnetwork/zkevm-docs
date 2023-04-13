---
id: erc20
title: Guide des dépôts et des retraits d’ERC20
sidebar_label: ERC20
description:  "Déposez et retirez des jetons ERC20 sur le réseau Polygon."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - transfer
  - erc20
image: https://matic.network/banners/matic-network-16x9.png
---

Veuillez consulter la dernière [documentation de Matic.js sur Plasma ERC20](https://maticnetwork.github.io/matic.js/docs/plasma/erc20/) pour commencer et voir les méthodes mises à jour.

### Flux de haut niveau {#high-level-flow}

#### **Déposer des ERC20 (processus en 2 étapes)**

1. Les jetons doivent d'abord être approuvés pour le contrat de la chaîne root de Polygon sur la Chaîne parent (Ethereum/Goerli).
2. Une fois approuvée, la fonction **déposer** doit être invoquée pour que les jetons soient déposés sur le contrat Polygon et puissent être utilisés dans Polygon.

#### **Transférer des ERC20**

Une fois que vous avez des fonds sur Polygon, vous pouvez utiliser ces fonds pour les envoyer à d'autres personnes instantanément.

#### **Retirer des ERC20 (processus en 3 étapes)**

1. Le retrait des fonds est initié sur Polygone. Un intervalle de point de contrôle de 30 minutes (pour les testnets attendez pour environ 10 minutes) est défini, où tous les blocs de la couche de blocs Polygon sont validés depuis le dernier point de contrôle.
2. Une fois que le point de contrôle est soumis au contrat ERC20 de la chaîne principale, un jeton NFT Exit (ERC721) est créé de valeur équivalente.
3. Les fonds retirés peuvent être réclamés à votre compte ERC20 du contrat principal de chaîne en utilisant une procédure de processus-sortie.

## Détails de Configuration {#setup-details}

### Configuration de Polygon Edge {#configuring-polygon-edge}

Installez le SDK matic (**_3.0.0_**)

```bash
npm i @maticnetwork/maticjs-plasma
```

### util.js {#util-js}

Lancement du client Maticjs

```js
// const use = require('@maticnetwork/maticjs').use
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')
const { PlasmaClient } = require('@maticnetwork/maticjs-plasma')
const { use } = require('@maticnetwork/maticjs')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')

// install web3 plugin
use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const from = config.user1.address

async function getPlasmaClient (network = 'testnet', version = 'mumbai') {
  try {
    const plasmaClient = new PlasmaClient()
    return plasmaClient.init({
      network: network,
      version: version,
      parent: {
        provider: new HDWalletProvider(privateKey, config.parent.rpc),
        defaultConfig: {
          from
        }
      },
      child: {
        provider: new HDWalletProvider(privateKey, config.child.rpc),
        defaultConfig: {
          from
        }
      }
    })
  } catch (error) {
    console.error('error unable to initiate plasmaClient', error)
  }
}
```

### process.env {#process-env}

Créez un nouveau fichier dans le répertoire root nommé `process.env`, avec le contenu suivant:

```bash
USER1_FROM =
USER1_PRIVATE_KEY =
USER2_ADDRESS =
ROOT_RPC =
MATIC_RPC =
```

## depôt {#deposit}

**Approbation**: il s'agit d'une approbation ERC20 normale, donc `depositManagerContract`peut appeler la `transferFrom()`fonction. Le client Polygon Plasma expose la `erc20Token.approve()`méthode pour passer cet appel.

**dépôt** : le dépôt peut être effectué en appelant **_depositERC20ForUser_** sur le contrat depositManagerContract.

Notez que le jeton doit être cartographié et approuvé pour le transférer au préalable.

**_méthode erc20Token.deposit_** pour effectuer cet appel.


```js
const { getPlasmaClient, plasma, from } = require('../utils')

const amount = '1000000000000000000' // amount in wei
const token = plasma.parent.erc20

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token, true)
  const result = await erc20Token.deposit(amount, from)
  const receipt = await result.getReceipt()
  console.log(receipt)
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

:::note

Les dépôts d'Ethereum vers Polygon se produisent à l'aide d'un mécanisme de synchronisation d'état et prennent environ 5 à 7 minutes. Après avoir attendu cet intervalle de temps, il est recommandé de vérifier le solde en utilisant la bibliothèque web3.js/matic.js ou en utilisant Metamask. L'explorateur affichera le solde seulement si au moins un transfert d'actifs a eu lieu sur la chaîne enfant. Ce [lien](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma) explique comment suivre les événements de dépôt.

:::

## transférez {#transfer}

```js

const { getPlasmaClient, from, plasma, to } = require('../utils')

const amount = '1000000000' // amount in wei
const token = plasma.child.erc20

async function execute () {
  try {
    const plasmaClient = await getPlasmaClient()
    const erc20Token = plasmaClient.erc20(token)
    const result = await erc20Token.transfer(amount, to, { gasPrice: 1000000000 })
    const txHash = await result.getTransactionHash()
    const receipt = await result.getReceipt()
  } catch (error) {
    console.log(error)
  }
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)
})
```

## Retirer {#withdraw}

### 1. Brûler {#1-burn}

Les utilisateurs peuvent appeler la `withdraw()`fonction du contrat de jeton `getERC20TokenContract`enfant. Cette fonction devrait brûler les jetons. Le client Polygon Plasma expose la `withdrawStart()`méthode pour passer cet appel.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

const amount = '1000000000000000' // amount in wei
const token = plasma.child.erc20
async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(token)
  const result = await erc20Token.withdrawStart(amount)
  console.log(await result.getReceipt())
}

execute().then(() => {
}).catch(err => {
  console.error('err', err)
}).finally(_ => {
  process.exit(0)

```

### 2. confirm-withdraw.js {#2-confirm-withdraw-js}

L'utilisateur peut appeler la fonction **_startExitWithBurntTokens_** du contrat **_erc20Predicate_**. Le client Polygon Plasma expose la méthode **_retraitConfirmer_** pour effectuer cet appel. Cette fonction ne peut être appelée qu'après l'inclusion du point de contrôle dans la mainchain. L'inclusion du point de contrôle peut être suivie en suivant ce [guide](/docs/develop/ethereum-polygon/plasma/deposit-withdraw-event-plasma#checkpoint-events).


```js
//Wait for ~10 mins for Mumbai testnet or ~30mins for Ethereum Mainnet till the checkpoint is submitted for burned transaction, then run the confirm withdraw
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawConfirm(<burn tx hash>)
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

### 3. Sortie du processus {#3-process-exit}

Un utilisateur doit appeler la fonction **_processExits_** du contrat **_withdrawManager_** et envoyer la preuve de destruction. Lors de la présentation de preuves valides, les jetons sont transférés à l'utilisateur. Le client Polygon Plasma expose la méthode **_withdrawExit_** pour effectuer cet appel.

```js
const { getPlasmaClient, from, plasma } = require('../utils')

async function execute () {
  const plasmaClient = await getPlasmaClient()
  const erc20Token = plasmaClient.erc20(plasma.parent.erc20, true)
  const result = await erc20Token.withdrawExit()
  const txHash = await result.getTransactionHash()
  const txReceipt = await result.getReceipt()
  console.log(txReceipt)
}

execute().then(_ => {
  process.exit(0)
})
```

:::note

Un point de contrôle, qui est une représentation de toutes les transactions effectuées sur le réseau Polygon à la chaîne ERC20 toutes les ~30 minutes, est régulièrement soumis au contrat ERC20 de la chaîne principale.

:::