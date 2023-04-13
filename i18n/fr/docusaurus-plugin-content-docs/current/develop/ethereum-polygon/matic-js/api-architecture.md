---
id: api-architecture
title: Architecture de l'API
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: Lisez et Écrivez des API et des paramètres de transaction.
---

La bibliothèque suit l'architecture commune de l'API dans tout le processus, et les API sont divisées en deux types :

1. API de Lecture
2. API d'Écriture

## API de Lecture {#read-api}

Les API de lecture ne publient rien sur la blockchain, elles ne consomment donc aucun gaz. Des exemples d'API de lecture sont - `getBalance`, `isWithdrawExited` etc.

Voyons un exemple d'API de lecture -

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

Les API de lecture sont très simples et renvoient directement le résultat.

## 2. API d'Écriture {#2-write-api}

Les API d'écriture publient certaines données sur la blockchain, donc elles consomment du gaz. Des exemples d'API d'écriture sont - `approve`, `deposit` etc.

Lorsque vous appelez une API d'écriture, vous avez besoin de deux données à partir du résultat.

1. TransactionHash
2. TransactionReceipt

Voyons un exemple d'API d'écriture et récupérons l'identifiant de transaction et de reçu -

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

### Option de transaction {#transaction-option}

Certaines options configurables sont disponibles pour toutes les API. Ces configurations peuvent être transformées en paramètres.

Les configurations disponibles sont -

- de ? : chaîne de caractère | numéro - L'adresse à partir de laquelle les transactions doivent être effectuées.
- de ? : chaîne de caractère - L'adresse vers laquelle les transactions doivent être effectuées.
- valeur?: numéro | chaîne de caractères | BN - La valeur transférée pour la transaction en wei.
- gasLimit?: nombre | chaîne de caractères - Le gaz maximum fourni pour une transaction (limite de gaz).
- gasPrice?: numéro | chaîne de caractères | BN - Le prix du gaz en wei à utiliser pour les transactions.
- données?: chaîne de caractères - Le code d'octet du contrat.
- nonce?: numéro;
- chainId?: numéro;
- chaîne?: chaîne de caractères;
- hardfork?: chaîne de caractères;
- returnTransaction?: booléen - le rendre vrai renverra l'objet de transaction qui peut être utilisé pour envoyer la transaction manuellement.

Voyons un exemple en configurant le gasPrice

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
