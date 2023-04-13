---
id: withdraw-confirm
title: i-withdraw ang hamon
keywords:
- 'plasma client, erc20, withdrawChallenge, polygon, sdk'
description: 'Magsimula sa maticjs '
---

# withdrawConfirm  {#withdrawconfirm}

 Ang pamamaraang `withdrawConfirm` ay ang pangalawang hakbang sa proseso ng pag-withdraw ng plasma. Sa hakbang na ito - ang patunay ng iyong transaksyon sa pagsunog (unang transaksyon) ay isinusumite at ang isang erc721 token na may katumbas na halaga ay nililikha.

Matapos magtagumpay ang prosesong ito - magsisimula ang panahon ng hamon at sa pagkumpleto ng panahon ng hamon, maibabalik ng user ang na-withdraw na halaga sa kanilang account sa root chain.

Ang panahon ng hamon ay 7 araw para sa mainnet.

**Tandaan**- ang withdrawStart na transaksyon ay dapat na i-checkpoint upang hamunin ang pag-withdraw.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Kapag natapos na ang panahon ng hamon, ang `withdrawExit`ay maaaring tawagan upang lumabas sa proseso ng pag-withdraw at ibalik ang na-withdraw na halaga.
