---
id: withdraw-confirm-faster
title: withdrawChallengeFaster
keywords:
- 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

Ang paraang `withdrawConfirmFaster` ay ang pangalawang hakbang sa proseso ng pag-withdraw sa plasma. Sa hakbang na ito, isinusumite ang proof ng iyong transaksyon ng pag-burn (unang transaksyon) at ginagawa ang isang erc721 token na may katumbas na value.

Pagkatapos maging matagumpay ang prosesong ito, sinisimulan ang panahon ng hamon at sa oras na makumpleto ang panahon ng hamon, maaaring mabawi ng user ang na-withdraw na halaga sa kanilang account sa root chain.

Ang panahon ng hamon ay 7 araw para sa mainnet.

<div class="highlight mb-20px mt-20px">Ito ay mabilis dahil ito ay bumubuo ng patunay sa backend. Kailangan mong i-configure ang [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).</div>

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
