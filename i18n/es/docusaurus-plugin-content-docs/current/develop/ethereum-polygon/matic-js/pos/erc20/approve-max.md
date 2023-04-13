---
id: approve-max
title: approveMax
keywords:
    - pos client
    - erc20
    - approveMax
    - polygon
    - sdk
description: 'Aprueba la cantidad máxima en el token primario.'
---

El método `approveMax` puede utilizarse para aprobar la cantidad máxima en el token primario.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress (Dirección de quien gasta) {#spenderaddress}

La dirección en la que se da la aprobación se llama `spenderAddress`. Es un usuario tercero o un contrato inteligente que puede transferir el token en tu nombre.

Por defecto, el valor de spenderAddress es la dirección de predicado ERC-20.

Puedes especificar manualmente el valor de la dirección de quien gasta.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approveMax({
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
