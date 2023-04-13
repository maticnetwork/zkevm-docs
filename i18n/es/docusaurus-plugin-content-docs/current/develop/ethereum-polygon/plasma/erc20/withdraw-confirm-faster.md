---
id: withdraw-confirm-faster
title: Período de reclamos sobre el retiro más corta
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'Cómo comenzar con Matic.js'
---

# withdrawConfirmFaster (Confirmación más rápida del retiro) {#withdrawconfirmfaster}

El método `withdrawConfirmFaster` es el segundo paso del proceso de retiro de Plasma. En este paso, se envía la prueba de tu transacción de quemado (primera transacción) y se crea un token ERC-721 de un valor equivalente.

Una vez finalizado este procedimiento, se inicia el período de reclamos y, cuando termine, el usuario podrá recuperar el monto retirado en su cuenta en la cadena primaria.

El período de reclamos dura 7 días para la red principal.

<div class="highlight mb-20px mt-20px">
Es rápido porque genera pruebas en el modo de administrador. Debes configurar [setProofAPI] (/docs/develop/ethereum-polygon/matic-js/set-proof-api).
</div>

**Nota**: La transacción withdrawStart (Comienzo del retiro) debe ser verificada en el punto de control a fin de hacer reclamos sobre el retiro.

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
