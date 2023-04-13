---
id: withdraw-confirm
title: withdrawChallenge (Período de reclamos sobre el retiro)
keywords:
- 'plasma client, erc721, withdrawChallenge, polygon, sdk'
description: 'Cómo comenzar con Matic.js'
---

# withdrawConfirm (Confirmación del retiro) {#withdrawconfirm}

El método `withdrawConfirm` es el segundo paso del proceso de retiro de Plasma. En este paso, se envía la prueba de tu transacción de quemado (primera transacción) y se crea un token ERC-721 de valor equivalente.

Después de culminado este proceso, se inicia el período de reclamos y, una vez finalizado, el usuario puede recuperar el monto retirado a su cuenta en la cadena primaria.

El período de reclamos es de 7 días para la red principal.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
