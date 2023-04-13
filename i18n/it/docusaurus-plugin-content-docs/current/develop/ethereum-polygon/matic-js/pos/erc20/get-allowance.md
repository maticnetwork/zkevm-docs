---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "Recupera l'importo approvato per l'utente."
---

Il metodo `getAllowance` può essere utilizzato per recuperare l'importo approvato per l'utente.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

L'indirizzo su cui viene rilasciata l'approvazione è chiamato `spenderAddress`. È un utente terzo o uno smart contract che può trasferire il token per tuo conto.

Per impostazione predefinita, il valore spenderAddress è l'indirizzo del predicato erc20.

Puoi specificare manualmente il valore di spenderAddress.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
