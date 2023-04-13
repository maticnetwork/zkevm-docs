---
id: approve
title: aprovar
keywords:
    - pos client
    - erc20
    - approve
    - polygon
    - sdk
description: "Aprovar o valor necessário no token ROOT."
---

O método `approve` pode ser usado para aprovar o valor necessário no token ROOT.

é necessária a aprovação a fim de depositar o valor na chain da Polygon.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

## spenderAddress {#spenderaddress}

O endereço no qual a aprovação é dada é chamado `spenderAddress`. É um utilizador terceiro ou um contrato inteligente que consegue transferir o seu token em seu nome.

Por padrão, o valor do spenderAddress é ERC-20 no endereço predicado.

Você pode especificar manualmente o valor de endereço spender.

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    spenderAddress: <spender address value>
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
