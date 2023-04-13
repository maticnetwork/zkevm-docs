---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "Obtenha o valor aprovado para o utilizador."
---

O método `getAllowance` pode ser usado para obter o valor aprovado para o utilizador.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

O endereço no qual a aprovação é dada é chamado `spenderAddress`. É um utilizador terceiro ou um contrato inteligente que consegue transferir o seu token em seu nome.

Por padrão, o valor do spenderAddress é ERC-20 no endereço predicado.

Você pode especificar manualmente o valor de endereço spender.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
