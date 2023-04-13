---
id: withdraw-confirm-faster
title: retirer le défi plus rapidement
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'Commencer à utiliser maticjs'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

La méthode `withdrawConfirmFaster` est la deuxième étape dans le processus de retrait de plasma. Dans cette étape, la preuve de votre transaction de brûlage (première transaction) est envoyée et un jeton erc721 de valeur équivalente est crée.

Une fois que ce processus est réussi, la période de défi est lancée et, à l'issue de cette période, l'utilisateur peut récupérer le montant retiré sur son compte dans la chaîne root.

La période de défi est de 7 jours pour le réseau principal.

<div class="highlight mb-20px mt-20px">
C'est rapide car cela génère la preuve en arrière-plan. Vous devez configurer [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).
</div>

**Remarque**- la transaction withdrawStart doit être contrôlée afin de contester le retrait.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Une fois que la période de défi est terminée, `withdrawExit` peut être appelé pour mettre fin au processus de retrait et récupérer le montant retiré.
