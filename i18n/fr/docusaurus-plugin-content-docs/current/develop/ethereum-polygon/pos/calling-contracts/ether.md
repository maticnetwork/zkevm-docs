---
id: ether
title: Guide des dépôts et des retraits d'Ether
sidebar_label: Ether
description:  "Fonctions disponibles pour les contrats Ether."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## Flux de haut niveau {#high-level-flow}

Dépôt d'Ether -

- Effectuez l'appel depositEtherFor sur le **RootChainManager** et envoyez l'actif ether.

Retrait d'Ether -

1. **_Brûlez_** des jetons sur la chaîne Polygon.
2. Appelez la fonction **_exit_** sur **_RootChainManager_** pour envoyer la transaction de la preuve de brûlure. Cet appel peut être effectué **_après l'envoi du point de contrôle_** pour le bloc contenant la transaction de destruction.

## Détails des étapes {#step-details}

### Instanciation des contrats {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### déposer {#deposit}
Appelez la `depositEtherFor`fonction du `RootChainManager`contrat. Cette fonction prend 1 argument `userAddress`- , qui est l'adresse de l'utilisateur qui recevra le dépôt sur la chaîne Polygon. Le montant d'éther à déposer doit être envoyé comme valeur de la transaction.

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### Brûler {#burn}
Étant donné Ether est un jeton ERC20 sur la chaîne Polygon, son processus de retrait est le même que le retrait ERC20. Les jetons peuvent être brûlés en appelant la `withdraw`fonction sur le contrat de jetons enfants. Cette fonction prend un seul argument, `amount`indiquant le nombre de jetons à brûler. La preuve de cette destruction doit être présentée à l'étape de sortie. Donc, stockez l'identifiant de la transaction.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Sortez {#exit}
La fonction de sortie sur `RootChainManager`contrat doit être appelée pour déverrouiller et recevoir les jetons de retour depuis .`EtherPredicate` Cette fonction prend un seul octet en argument qui prouve la transaction brûlée. Attendez que le point de contrôle contenant la transaction de gravure soit soumis avant d'appeler cette fonction. Le Preuve est généré par le codage RLP les champs suivants:

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
