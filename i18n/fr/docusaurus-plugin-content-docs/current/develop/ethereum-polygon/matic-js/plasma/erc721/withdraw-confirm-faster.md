---
id: withdraw-confirm-faster
title: withdrawChallengeFaster
keywords:
- 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
description: 'Confirmez le retrait en générant une preuve en arrière-plan.'
---

`withdrawConfirmFaster`méthode est la deuxième étape du processus de retrait du plasma. Dans cette étape, la preuve de votre transaction de brûlage (première transaction) est envoyée et un jeton erc721 de valeur équivalente est crée.

Une fois que ce processus est réussi, la période de défi a commencé, et à l'issue de cette période, l'utilisateur peut récupérer le montant retiré sur son compte dans la chaîne root.

La période de défi est de 7 jours pour le réseau principal.

C'est rapide, car cela génère la preuve en arrière-plan. Vous devez configurer [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
