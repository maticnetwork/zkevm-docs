---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "Den genehmigten Betrag für den Benutzer erhalten."
---

`getAllowance` Methode kann verwendet werden, um den genehmigten Betrag für den Benutzer zu erhalten.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress {#spenderaddress}

Die Adresse, an der die Genehmigung gegeben wird, wird aufgerufen `spenderAddress`. Es ist ein Drittbenutzer oder ein Smart-Contract, der deinen Token in deinem Namen übertragen kann.

Standardmäßig ist der Wert von SpenderAddress die erc20-Prädikatadresse.

Den Wert von SpenderAddress kannst du auch manuell vorgeben.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
