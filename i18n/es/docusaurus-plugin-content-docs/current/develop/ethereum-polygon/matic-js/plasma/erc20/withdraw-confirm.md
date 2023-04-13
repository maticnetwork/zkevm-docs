---
id: withdraw-confirm
title: Reclamos sobre el retiro
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'Confirma el retiro.'
---

El método `withdrawConfirm` es el segundo paso del proceso de retiro de Plasma. En este paso, se envía la prueba de tu transacción de quemado (primera transacción) y se crea un token ERC-20 de valor equivalente.

Después de culminar ese proceso, se inicia el período de reclamos y, una vez finalizado, el usuario puede recuperar el monto retirado a su cuenta en la cadena primaria.

El período de reclamos es de 7 días para la red principal.

**Nota**: la transacción de withdrawStart (Inicio de retiro) debe ser seleccionada para hacer reclamos sobre el retiro.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Una vez finalizado el periodo de reclamos, se puede llamar a `withdrawExit` para salir del proceso de retiro y recuperar el monto retirado.
