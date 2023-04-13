---
id: erc20
title: Guida al deposito e prelievo di ERC20
sidebar_label: ERC20
description: "Funzioni disponibili per i contratti ERC20."
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## Flusso di alto livello {#high-level-flow}

Depositare ERC20 -

1. **_Approva il contratto_** **_ERC20Predicate_** per spendere i token che devono essere depositati.
2. Effettua la chiamata **_depositFor_** su **_RootChainManager_**.

Prelevare ERC20 -

1. **_Effettua il burn dei token_** sulla catena di Polygon.
2. Chiama la funzione **_exit_** su **_RootChainManager_** per inviare la transazione proof-of-burn. Questa chiamata può essere effettuata **_dopo l'invio del checkpoint_** per il blocco che contiene la transazione burn.

## Dettagli di configurazione {#setup-details}

### Istanziare i contratti {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### Approvare {#approve}
Approva **_ERC20Predicate_** per spendere i token chiamando la funzione **_approve_** del contratto del token. Questa funzione prende due argomenti, spender e amount. **_spender_** è l'indirizzo che viene approvato per spendere i token dell'utente. **_amount_** è la quantità di token che possono essere spesi. Mantieni l'importo pari al valore del deposito per un'unica approvazione o passa a un numero maggiore per evitare un'approvazione multipla.
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### Depositare {#deposit}
Ricorda che il token deve essere mappato e l'importo deve essere approvato per il deposito prima di effettuare questa chiamata.  
Chiamare la `depositFor()`funzione del `RootChainManager`contratto. Questa funzione prende 3 argomenti: `userAddress``rootToken`, e `depositData`. `userAddress`è l'indirizzo dell'utente che riceverà il deposito sulla catena di Polygon. `rootToken`è l'indirizzo del token sulla catena principale. è `depositData`l'importo codificato con ABI.
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### Burn {#burn}
I token possono essere bruciati sulla Polygon Chain chiamando la funzione **_withdraw_** sul contratto token figlio. Questa funzione prende un singolo argomento, **_amount_**, che indica il numero di token da bruciare. La prova di questo burn deve essere inviata nella fase di uscita. Memorizza ora l'hash della transazione.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Exit {#exit}
La funzione di uscita sul `RootChainManager`contratto deve essere chiamata a sbloccare e ricevere i token da .`ERC20Predicate` Questa funzione comprende un singolo argomento in byte che dimostra la transazione di burn. Aspettare che il checkpoint contenente la transazione di ustione sia presentato prima di chiamare questa funzione. La prova è generata da RLP che codifica i seguenti campi -

1. headerNumber - Numero del blocco di intestazione del checkpoint contenente la burn tx
2. blockProof - Prova che l'intestazione del blocco (nella catena figlio) è una foglia nella merkle root inviata
3. blockNumber - Numero del blocco contenente la burn tx sulla catena figlio
4. blockTime - Orario del blocco burn tx
5. txRoot - Root delle transazioni del blocco
6. receiptRoot - Root delle ricevute del blocco
7. receipt - Ricevuta della transazione burn
8. receiptProof - Prova merkle della ricevuta di burn
9. branchMask - 32 bit che denotano il percorso di ricezione nell'albero merkle patricia
10. receiptLogIndex - Indice del registro da leggere dalla ricevuta

Generare una prova manualmente può essere complicato, quindi è consigliabile utilizzare Polygon Edge. Se desideri inviare la transazione manualmente, puoi passare **_encodeAbi_** come **_true_** nell'oggetto options per ottenere i dati di chiamata grezzi.

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

Invia questi dati di chiamata a **_RootChainManager_**.
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
