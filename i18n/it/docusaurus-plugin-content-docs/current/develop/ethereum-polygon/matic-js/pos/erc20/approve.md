---
id: approve
title: approve
keywords:
    - pos client
    - erc20
    - approve
    - polygon
    - sdk
description: "Approva l'importo richiesto sul token root."
---

Il metodo `approve` può essere utilizzato per approvare l'importo richiesto sul token root.

approve è necessario per depositare l'importo sulla catena di polygon.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

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
const approveResult = await erc20Token.approve(100, {
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
