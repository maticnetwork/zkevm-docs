---
id: api-architecture
title: Architettura delle API
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: API di lettura e scrittura e impostazioni della transazione.
---

La libreria segue l'architettura delle API comunemente utilizzata e le API sono divise in due tipi:

1. 1. API di lettura
2. API di scrittura

## 1. API di lettura {#read-api}

Le API di lettura non pubblicano sulla blockchain, pertanto non consumano gas. Esempi di API di lettura sono `getBalance`, `isWithdrawExited` ecc.

Vediamo un esempio di API di lettura:

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

le API di lettura sono molto semplici e restituiscono direttamente il risultato.

## 2. API di scrittura {#2-write-api}

Le API di scrittura pubblicano alcuni dati sulla blockchain, quindi consumano gas. Esempi di API di scrittura sono - `approve`, `deposit`, ecc.

Quando chiami un'API di scrittura, hai bisogno di due dati dal risultato.

1. Hash transazione
2. Ricevuta transazione

Vediamo un esempio di API di scrittura per ottenere l'hash della transazione e la ricevuta:

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

### Opzioni delle transazioni {#transaction-option}

Alcune opzioni configurabili sono disponibili per tutte le API. Queste configurazioni possono essere specificate nei parametri.

Le configurazioni disponibili sono:

- from?: stringa | numero - L'indirizzo da cui devono essere effettuate le transazioni.
- to?: stringa - L'indirizzo a cui devono essere inviate le transazioni.
- value?: numero | stringa | numero binario - Il valore trasferito per la transazione in wei.
- gasLimit?: numero | stringa - Il limite di gas massimo previsto per una transazione.
- gasPrice?: numero | stringa | numero binario - Il gas price in wei da utilizzare per le transazioni.
- data?: stringa - Il codice byte del contratto.
- nonce?: numero;
- chainId?: numero;
- chain?: stringa;
- hardfork?: stringa;
- returnTransaction?: booleano - Se è impostato su true, restituisce l'oggetto transazione che può essere utilizzato per inviare la transazione manualmente.

Vediamo un esempio configurando il gasPrice

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
