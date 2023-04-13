---
id: erc20
title: ERC20 Ein- und Auszahlungsleitfaden
sidebar_label: ERC20
description: "Verfügbare Funktionen für ERC20-Verträge."
keywords:
  - docs
  - matic
  - erc20
  - deposit
  - withdraw
image: https://matic.network/banners/matic-network-16x9.png
---

## High-Level-Flow {#high-level-flow}

ERC20 einzahlen -

1. **_Genehmige_** den **_ERC20Predicate_**-Vertrag, um die Token, die eingezahlt werden müssen, auszugeben.
2. Starte einen **_depositFor_**-Call im **_RootChainManager_**.

ERC20 auszahlen -

1. **_Burn_** von Token auf die Polygon-Chain.
2. Rufe die **_Exit_**-Funktion im **_RootChainManager_** auf, um einen Nachweis der Burn-Transaktion zu übermitteln. Dieser Call ist möglich, **_nachdem der Checkpoint_** für den Block mit Burn-Transaktion übermittelt wurde.

## Einrichtung {#setup-details}

### Instantiiere die Verträge {#instantiate-the-contracts}

```js
const mainWeb3 = new Web3(mainProvider)
const maticWeb3 = new Web3(maticProvider)
const rootTokenContract = new mainWeb3.eth.Contract(rootTokenABI, rootTokenAddress)
const rootChainManagerContract = new mainWeb3.eth.Contract(rootChainManagerABI, rootChainManagerAddress)
const childTokenContract = new maticWeb3(childTokenABI, childTokenAddress)
```

### Genehmigen {#approve}
Genehmige das **_ERC20Predicate_**, um Token auszugeben, indem du die **_approve_**-Funktion des Tokenvertrags aufrufst. Diese Funktion benötigt zwei Argumente: **_spender_** und amount. spender ist die Adresse, die die Token des Benutzers ausgeben darf. **_amount_** ist die Tokenanzahl, die ausgegeben werden kann. Achte darauf, die Menge dem Einzahlungsbetrag entspricht, um einmal genehmigen zu können, oder übertragen Sie eine höhere Anzahl, um mehrere Genehmigungen zu vermeiden.
```js
await rootTokenContract.methods
  .approve(erc20Predicate, amount)
  .send({ from: userAddress })
```

### Einzahlen {#deposit}
Beachte, dass vor diesem Call das Token gemappt und der Betrag für die Einzahlung genehmigt werden   muss. Ruf die `depositFor()`Funktion des Vertrags `RootChainManager`auf. Diese Funktion nimmt 3 Argumente auf: `depositData``userAddress`und . ist die Adresse des `userAddress``rootToken`Benutzers, der die Einzahlung auf der Polygon Chain empfängt. `rootToken`ist die Adresse des Tokens auf der Hauptkette. ist `depositData`der ABI-codierte Betrag.
```js
const depositData = mainWeb3.eth.abi.encodeParameter('uint256', amount)
await rootChainManagerContract.methods
  .depositFor(userAddress, rootToken, depositData)
  .send({ from: userAddress })
```

### Burn {#burn}
Token können auf die Polygon-Chain gebrannt werden, indem du die **_withdraw_**-Funktion am Child-Token-Vertrag aufrufst. Diese Funktion benötigt ein Argument, **_amount_**, welches die Anzahl der zu brennenden Token angibt. Der Nachweis dieses Burns muss im Exit-Schritt übermittelt werden. Speichere also den Hash der Transaktion.
```js
const burnTx = await childTokenContract.methods
  .withdraw(amount)
  .send({ from: userAddress })
const burnTxHash = burnTx.transactionHash
```

### Exit {#exit}
Die Exit-Funktion im `RootChainManager`Vertrag muss aufgerufen werden, um die Token von der aus wieder zu entsperren und zu empfangen.`ERC20Predicate` Diese Funktion benötigt ein Bytes-Argument, das die Burn-Transaktion belegt. Warte auf den Checkpoint, der die Burn-Transaktion einreicht, bevor du diese Funktion aufrufst. Der Proof wird generiert durch RLP-Codierung der folgenden Felder -

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
