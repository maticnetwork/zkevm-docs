---
id: withdraw-confirm-faster
title: withdrawChallengeFaster
keywords:
  - 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
description: 'Get started with maticjs'
---

# withdrawConfirmFaster

`withdrawConfirmFaster` method is the second step in plasma withdraw process. In this step, proof of your burn transaction (first transaction) is submitted and an erc721 token of equivalent value is created.

After this process is successful, challenge period is started and upon completion of the the challenge period, user can get back the withdrawn amount in their account on root chain.

The challenge period is 7 days for mainnet.

<div class="highlight mb-20px mt-20px">
It is fast because it generates proof in backend. You need to configure [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).
</div>

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
