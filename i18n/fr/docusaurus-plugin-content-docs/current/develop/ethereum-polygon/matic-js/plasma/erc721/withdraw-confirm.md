---
id: withdraw-confirm
title: withdrawChallenge
keywords:
- 'plasma client, erc721, withdrawChallenge, polygon, sdk'
description: 'Confirmez le retrait.'
---

`withdrawConfirm`méthode est la deuxième étape du processus de retrait du plasma. Dans cette étape, la preuve de votre transaction de brûlage (première transaction) est envoyée et un jeton erc721 de valeur équivalente est crée.

Une fois que ce processus est réussi, la période de défi a commencé, et à l'issue de cette période, l'utilisateur peut récupérer le montant retiré sur son compte dans la chaîne root.

La période de défi est de 7 jours pour le réseau principal.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
