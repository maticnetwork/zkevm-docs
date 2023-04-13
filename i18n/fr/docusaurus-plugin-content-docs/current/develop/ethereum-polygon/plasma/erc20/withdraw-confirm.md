---
id: withdraw-confirm
title: retirez le défi
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'Commencez à utiliser maticjs'
---

# withdrawConfirm {#withdrawconfirm}

`withdrawConfirm`méthode est la deuxième étape dans le processus de retrait du plasma. Dans cette étape - la preuve de votre transaction de brûlage (première transaction) est soumise et un jeton erc721 de valeur équivalente est crée.

Une fois que ce processus est réussi - la période de défi est commencée, et à l'issue de cette période, l'utilisateur peut récupérer le montant retiré sur son compte dans la chaîne root.

La période de défi est de 7 jours pour le réseau principal.

**Remarque**- la transaction withdrawStart doit être contrôlée afin de contester le retrait.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Une fois que la période de défi est terminée, `withdrawExit` peut être appelé pour mettre fin au processus de retrait et récupérer le montant retiré.
