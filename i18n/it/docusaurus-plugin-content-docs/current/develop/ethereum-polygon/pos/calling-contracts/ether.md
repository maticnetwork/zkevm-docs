---
id: ether
title: Guida al deposito e prelievo di Ether
sidebar_label: Ether
description:  "Funzioni disponibili per i contratti Ether."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## Flusso di alto livello {#high-level-flow}

Depositare Ether -

- Effettua la chiamata depositEtherFor su **RootChainManager** e invia l'asset ether.

Prelevare Ether -

1. **_Effettua il burn dei token_** sulla catena di Polygon.
2. Chiama la funzione **_exit_** su **_RootChainManager_** per inviare la transazione proof-of-burn. Questa chiamata può essere effettuata **_dopo l'invio del checkpoint_** per il blocco che contiene la transazione burn.

## Dettagli del passaggio {#step-details}

### Istanziare i contratti {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### deposit {#deposit}
Chiamare la `depositEtherFor`funzione del `RootChainManager`contratto. Questa funzione prende 1 argomento `userAddress`- che è l'indirizzo dell'utente che riceverà il deposito sulla catena di Polygon. La quantità di etere da depositare deve essere inviata come valore della transazione.

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### Burn {#burn}
Poiché Ether è un token ERC20 sulla catena di Polygon, il suo processo di ritiro è lo stesso di ERC20 ritiro. I Token possono essere bruciati chiamando la `withdraw`funzione sul contratto di token bambino. Questa funzione prende una singola discussione, `amount`indicando il numero di token da bruciare. La prova di questo burn deve essere inviata nella fase di uscita. Memorizza ora l'hash della transazione.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Exit {#exit}
La funzione di uscita sul `RootChainManager`contratto deve essere chiamata a sbloccare e ricevere i token da .`EtherPredicate` Questa funzione comprende un singolo argomento in byte che dimostra la transazione di burn. Aspettare che il checkpoint contenente la transazione di ustione sia presentato prima di chiamare questa funzione. La Proof è generata dalla RLP che codifica i seguenti campi:

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
