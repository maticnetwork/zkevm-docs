---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Approva l''importo massimo sul token root.'
---

Il metodo `approveMax` può essere utilizzato per approvare l'importo massimo sul token root.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

L'indirizzo su cui viene rilasciata l'approvazione è chiamato `spenderAddress`. È un utente terzo o uno smart contract che può trasferire il token per tuo conto.

Per impostazione predefinita, il valore spenderAddress è l'indirizzo del predicato erc20.

Puoi specificare manualmente il valore di spenderAddress.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
