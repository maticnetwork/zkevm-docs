---
id: erc20
title: Guide de Dépôt et de Retrait de l'ERC20
sidebar_label: ERC20
description: "Fonctions disponibles pour les contrats ERC20."
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## Flux de Haut Niveau {#high-level-flow}

Dépôt de l'ERC20 -

1. **_Approuvez_** **_le contrat_**  ERC20Predicate pour dépenser les jetons qui doivent être déposés.
2. Faites **_dépôtPour_** appelez sur **_RootChainManager_** .

Retrait de l'ERC20 -

1. **_Brûlez_** des jetons sur la chaîne de Polygon.
2. Appelez la fonction **_exit_** sur **_RootChainManager_** pour envoyer la transaction de la preuve de brûlure. Cet appel peut être effectué **_après l'envoi du point de contrôle_** pour le bloc contenant la transaction de destruction.

## Détails de Configuration {#setup-details}

### Instanciation des contrats {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### Approuvez {#approve}
Approuvez **_ERC20Predicate_** pour dépenser des jetons en appelant la fonction  **_approve_** du contrat de jetons. Cette fonction prend deux arguments : dépensier et **_montant_**. **_dépensier_** est l'adresse qui est approuvée pour dépenser les jetons de l'utilisateur. Montant est le montant de jetons qui peut être dépensé. Gardez un montant égal au montant du dépôt pour une approbation unique ou passez un nombre plus grand pour éviter d'approuver plusieurs fois.
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### Déposez {#deposit}
Notez que le jeton doit être cartographié  et le montant doit être approuvé pour le dépôt avant de faire cet appel.   Appelez la `depositFor()`fonction du `RootChainManager`contrat. Cette fonction prend 3 arguments : `userAddress``rootToken`, et `depositData`. est `userAddress`l'adresse de l'utilisateur qui recevra le dépôt sur la chaîne Polygon. `rootToken`est l'adresse du jeton sur la chaîne principale. est `depositData`le montant codé ABI.
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### Brûler {#burn}
Les jetons peuvent être brûlés sur la chaîne de Polygon en appelant la fonction **_withdraw_** sur le contrat de jeton enfant. Cette fonction prend un seul argument, **_montant_** indiquant le nombre de jetons à brûler. La preuve de cette brûlure doit être présentée à l'étape de sortie. Donc, stockez l'identifiant de la transaction.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Sortez {#exit}
La fonction de sortie sur `RootChainManager`contrat doit être appelée pour déverrouiller et recevoir les jetons de retour depuis .`ERC20Predicate` Cette fonction prend un seul octet en argument qui prouve la transaction brûlée. Attendez que le point de contrôle contenant la transaction de gravure soit soumis avant d'appeler cette fonction. La preuve est générée par le codage RLP les champs suivants -

1. headerNumber - Numéro de bloc d'en-tête du point de contrôle contenant le tx de brûlure
2. blockProof - Preuve que l'en-tête du bloc (dans la chaîne enfant) est une feuille dans le root merkle envoyé
3. blockNumber - Numéro du bloc contenant le tx de brûlure sur la chaîne enfant
4. blockTime - Heure du bloc tx de brûlure
5. txRoot -  Root des transactions du bloc
6. receiptRoot - Root des reçus du bloc
7. receipt - Reçu de la transaction de destruction
8. receiptProof - Preuve Merkle du reçu de brûlure
9. branchMask - 32 bits indiquant le chemin de réception dans l'arbre de merkle patricia
10. receiptLogIndex - indice de journal à lire à  partir du reçu

La génération manuelle de preuves peut s'avérer délicate, il est donc conseillé d'utiliser Polygon Edge. Si vous voulez envoyer la transaction manuellement, vous pouvez indiquer **_encodeAbi_** comme **_vrai_** dans l'objet d'options pour obtenir des données brutes d'appel.

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

Envoyez ces données d'appel à **_RootChainManager_**.
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
