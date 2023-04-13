---
id: withdraw-confirm-faster
title: bawiin ang hamon nang mas mabilis
keywords:
- 'pos client, erc20, withdrawConfirmFaster, polygon, sdk'
description: 'Magsimula sa maticjs'
---

# withdrawConfirmFaster {#withdrawconfirmfaster}

Ang pamamaraang `withdrawConfirmFaster`ay ang pangalawang hakbang sa proseso ng pag-withdraw ng plasma. Sa hakbang na ito, ang patunay ng iyong transaksyon sa pagsunog (unang transaksyon) ay isinusumite at ang isang erc721 token na may katumbas na halaga ay nililikha.

Matapos ang prosesong ito ay matagumpay, magsisimula ang panahon ng hamon at sa pagtatapos ng panahon ng hamon, maibabalik ng user ang na-withdraw na halaga sa kanilang account sa root chain.

Ang panahon ng hamon ay 7 araw para sa mainnet.

<div class="highlight mb-20px mt-20px">Ito ay mabilis dahil ito ay bumubuo ng patunay sa backend. Kailangan mong i-configure ang [setProofAPI](/docs/develop/ethereum-polygon/matic-js/set-proof-api).</div>

**Tandaan**- ang withdrawStart na transaksyon ay dapat na i-checkpoint upang hamunin ang pag-withdraw.

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");

const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Kapag natapos na ang panahon ng hamon, ang `withdrawExit`ay maaaring tawagan upang lumabas sa proseso ng pag-withdraw at ibalik ang na-withdraw na halaga.
