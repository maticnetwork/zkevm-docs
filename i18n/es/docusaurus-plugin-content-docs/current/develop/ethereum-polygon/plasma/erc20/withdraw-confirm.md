---
id: withdraw-confirm
title: Reclamos sobre el retiro
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'Cómo empezar con Matic.js'
---

# withdrawConfirm (Confirmación del retiro) {#withdrawconfirm}

El método `withdrawConfirm` es el segundo paso en el proceso de retiro de Plasma. En este paso, se envía la prueba de la transacción de quemado (primera transacción) y se crea un token ERC-721 de un valor equivalente.

Una vez finalizado este procedimiento, se inicia el período de reclamos y, cuando termine, el usuario podrá recuperar el monto retirado en su cuenta en la cadena primaria.

El período de reclamos es de 7 días para la red principal.

**Nota**: la transacción de withdrawStart (Inicio de retiro) debe ser seleccionada para hacer reclamos sobre el retiro.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Una vez finalizado el periodo de reclamos, se puede llamar a `withdrawExit` para salir del proceso de retiro y recuperar el monto retirado.
