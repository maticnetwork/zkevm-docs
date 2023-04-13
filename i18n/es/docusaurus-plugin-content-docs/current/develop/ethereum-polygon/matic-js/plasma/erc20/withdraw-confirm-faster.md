---
id: withdraw-confirm-faster
title: Período de reclamos sobre el retiro más corto
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'Confirma el retiro generando prueba en el modo administrador.'
---

El método `withdrawConfirmFaster` es el segundo paso del proceso de retiro de Plasma. En este paso, se envía la prueba de tu transacción de quemado (primera transacción) y se crea un token ERC-721 de un valor equivalente.

Una vez finalizado este procedimiento, se inicia el período de reclamos y, cuando termine, el usuario podrá recuperar el monto retirado en su cuenta en la cadena primaria.

El período de reclamos es de 7 días para la red principal.

Es rápido porque genera pruebas en el modo administrador. Necesitas configurar [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

**Nota**: la transacción withdrawStart debe verificada en el punto de control para hacer reclamos sobre el retiro.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Una vez finalizado el periodo de reclamos, se puede llamar a `withdrawExit` para salir del proceso de retiro y recuperar el monto retirado.
