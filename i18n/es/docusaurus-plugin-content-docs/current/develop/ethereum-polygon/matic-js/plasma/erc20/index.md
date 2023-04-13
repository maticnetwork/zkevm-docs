---
id: index
title: PlasmaClient (Cliente de Plasma)
keywords:
- 'plasma client, erc20, contract, polygon, sdk'
description: 'Proporciona un método para interactuar con un token ERC-20.'
---

`plasmaClient` ofrece el método `erc20`que te ayuda a interactuar con un token ERC-20.

## Token secundario {#child-token}

```
const childERC20Token = plasmaClient.erc20(<child token address>);
```

## Token primario {#root-token}

El token primario se puede iniciar ingresando `true` como el valor del segundo parámetro.

```
const parentERC20Token = plasmaClient.erc20(<root token address>, true);
```
