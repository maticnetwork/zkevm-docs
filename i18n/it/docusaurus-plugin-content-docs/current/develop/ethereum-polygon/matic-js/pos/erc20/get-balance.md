---
id: get-balance
title: getBalance
keywords:
    - pos client
    - erc20
    - getBalance
    - polygon
    - sdk
description: "Recupera il saldo di un utente."
---

Il metodo `getBalance` può essere utilizzato per recuperare il saldo dell'utente. È disponibile sia sul token figlio che su quello genitore.

```
const erc20Token = posClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
