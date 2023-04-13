---
id: withdraw-confirm-faster
title: withdrawChallengeFaster (Período de reclamos sobre el retiro más corto)
keywords:
- 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
description: 'Cómo comenzar con Matic.js'
---

# withdrawConfirmFaster (Confirmación del retiro más rápida) {#withdrawconfirmfaster}

El método `withdrawConfirmFaster` es el segundo paso del proceso de retiro de Plasma. En este paso, se envía la prueba de tu transacción de quemado (primera transacción) y se crea un token ERC-721 de valor equivalente.

Después de culminado este proceso, se inicia el período de reclamos y, una vez finalizado, el usuario puede recuperar el monto retirado a su cuenta en la cadena primaria.

El período de reclamos dura 7 días para la red principal.

<div class="highlight mb-20px mt-20px">
Es rápido porque genera pruebas en el modo de administrador. Debes configurar [setProofAPI] (/docs/develop/ethereum-polygon/matic-js/set-proof-api).
</div>

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
