---
id: approve
title: approve
keywords:
    - pos client
    - erc20
    - approve
    - polygon
    - sdk
description: "Genehmige den erforderlichen Betrag auf dem Root-Token."
---

`approve` Mit dieser Methode kann der angeforderte Betrag des root-Tokens freigegeben werden.

approve wird benötigt, um den Betrag in die Polygon-Chain einzuzahlen.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

Die Adresse, an der die Genehmigung gegeben wird, wird aufgerufen `spenderAddress`. Es ist ein Drittbenutzer oder ein Smart-Contract, der deinen Token in deinem Namen übertragen kann.

Standardmäßig ist der Wert von SpenderAddress die erc20-Prädikatadresse.

Den Wert von SpenderAddress kannst du auch manuell vorgeben.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
