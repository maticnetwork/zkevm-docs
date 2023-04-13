---
id: ether
title: Ether Ein- und Auszahlungsleitfaden
sidebar_label: Ether
description:  "Verfügbare Funktionen für Ether-Verträge."
keywords:
  - docs
  - matic
  - deposit
  - withdraw
  - ether
image: https://matic.network/banners/matic-network-16x9.png
---

## High-Level-Flow {#high-level-flow}

Ether einzahlen -

- Starte den depositEtherFor-Call am **RootChainManager** und sende das Ether-Asset.

Ether auszahlen -

1. **_Burn_** von Token auf die Polygon-Chain.
2. Rufe die **_Exit_**-Funktion im **_RootChainManager_** auf, um einen Nachweis der Burn-Transaktion zu übermitteln. Dieser Call ist möglich, **_nachdem der Checkpoint_** für den Block mit Burn-Transaktion übermittelt wurde.

## Details des Schritts {#step-details}

### Instantiiere die Verträge {#instantiate-the-contracts}
```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### Einzahlung {#deposit}
Ruf die `depositEtherFor`Funktion des Vertrags `RootChainManager`auf. Diese Funktion nimmt 1 Argument - , das ist die Adresse des `userAddress`Benutzers, der die Hinterlegung auf der Polygon Chain erhält. Die Menge des zu hinterlegenden Ethers muss als Wert der Transaktion gesendet werden.

```js
await rootChainManagerContract.methods
  .depositEtherFor(userAddress)
  .send({ from: userAddress, value: amount })
```

### Burn {#burn}
Da Ether ein ERC20-Token auf der Polygon Chain ist, ist sein Auszahlungsprozess der gleiche wie der ERC20-Auszahlung. Token können verbrannt werden, indem du die `withdraw`Funktion auf dem Child-Token-Vertrag aufrufst. Diese Funktion nimmt ein einziges Argument und gibt die Anzahl der zu be Token `amount`an. Der Nachweis dieses Burns muss im Exit-Schritt übermittelt werden. Speichere also den Hash der Transaktion.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Exit {#exit}
Die Exit-Funktion im `RootChainManager`Vertrag muss aufgerufen werden, um die Token von der aus wieder zu entsperren und zu empfangen.`EtherPredicate` Diese Funktion benötigt ein Bytes-Argument, das die Burn-Transaktion belegt. Warte auf den Checkpoint, der die Burn-Transaktion einreicht, bevor du diese Funktion aufrufst. Der Proof wird durch RLP-Codierung der folgenden Felder generiert:

1. headerNumber - Header-Block-Nummer des Checkpoints, die die burn tx enthält
2. blockProof - Nachweis, dass der Block-Header (in der Child-Chain) ein Blatt in der eingereichten Merkle-Root ist
3. blockNumber - Block-Nummer, die die burn tx auf der Child-Chain enthält
4. blockTime - Block-Zeit der burn tx
5. txRoot - Transactions-Root des Blocks
6. receiptRoot - Receipts-Root des Blocks
7. receipt - Beleg der Burn-Transaktion
8. receiptProof - Merkle-Proof des Burn-Belegs
9. branchMask - 32 Bit, die den Pfad des Belegt im Merkle-Patricia-Tree beschreiben
10. receiptLogIndex - Protokollindex, der dem Beleg entnommen wird

Die manuelle Generierung des Belegs kann schwierig sein, weshalb es empfehlenswert ist, Polygon Edge zu verwenden. Falls du die Transaktion manuell senden willst, kannst du **_encodeAbi_** im Optionsobjekt als **_true_** weitergeben, um rohe calldata zu erhalten.

```js
const exitCalldata = await maticPOSClient
  .exitERC20(burnTxHash, { from, encodeAbi: true })
```

Sende diese calldata an den **_RootChainManager_**.
```js
await mainWeb3.eth.sendTransaction({
  from: userAddress,
  to: rootChainManagerAddress,
  data: exitCalldata.data
})
```
