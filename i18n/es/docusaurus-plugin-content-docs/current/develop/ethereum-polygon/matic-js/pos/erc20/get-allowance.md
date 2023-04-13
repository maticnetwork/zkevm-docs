---
id: get-allowance
title: getAllowance
keywords:
    - pos client
    - erc20
    - getAllowance
    - polygon
    - sdk
description: "Obtén la cantidad aprobada para el usuario."
---

El método `getAllowance` se puede utilizar para obtener la cantidad aprobada para el usuario.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```

## spenderAddress (Dirección de quien gasta) {#spenderaddress}

La dirección en la que se da la aprobación se llama `spenderAddress`. Es un usuario tercero o un contrato inteligente que puede transferir el token en tu nombre.

Por defecto, el valor de spenderAddress es la dirección de predicado ERC-20.

Puedes especificar manualmente el valor de la dirección de quien gasta.

```
const erc20Token = posClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>, {
    spenderAddress: <spender address value>
});
```
