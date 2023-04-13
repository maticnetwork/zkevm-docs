---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Genehmige den maximalen Betrag auf dem Root-Token.'
---

`approveMax`Mit dieser Methode kann der Maximalbetrag des Root-Tokens freigegeben werden.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

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
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
