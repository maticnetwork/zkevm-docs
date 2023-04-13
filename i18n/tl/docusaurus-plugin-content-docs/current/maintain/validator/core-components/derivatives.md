---
id: derivatives
title: Mga Derivative
description: Ibinahagi ng delegasyon sa pamamagitan ng validator
keywords:
  - docs
  - polygon
  - matic
  - derivatives
  - delegation
  - shares
slug: derivatives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Sinusuportahan ng Polygon ang [pag-delegate](/docs/maintain/glossary#delegator) sa pamamagitan ng mga validator share. Sa paggamit ng disenyong ito, mas madaling ipamahagi ang mga reward at mag-slash nang naka-scale sa mga kontrata ng Ethereum mainnet nang walang masyadong pagkalkula.

Nagde-delegate ang mga delegator sa pamamagitan ng pagbili ng mga share ng finite pool mula sa mga validator. May kanyang sariling validator share token ang bawat validator.

Tawagan nating VATIC ang mga fungible validator share token para sa Validator A. Kapag nag-delegate ang isang user sa Validator A, bibigyan ng VATIC ang user batay sa exchange rate ng MATIC-VATIC pair. Habang nakakaipon ng value ang mga user, ipinapahiwatig ng exchange rate na puwedeng mag-withdraw ang user nang mas maraming MATIC para sa bawat VATIC. Kapag na-slash ang mga validator, mas kaunting MATIC ang nawi-withdraw ng mga user para sa kanilang VATIC.

Tandaan na MATIC ang token sa pag-stake. Kailangan ng isang delegator na magkaroon ng mga MATIC token para lumahok sa pag-delegate.

Sa simula, bumibili ng mga token ang Delegator D mula sa partikular na pool ng Validator A kapag ang exchange rate ay 1 MATIC kada 1 VATIC.

Kapag nabigyan ang isang validator ng mas maraming MATIC token, idaragdag sa pool ang mga bagong token.

Ipagpalagay na sa kasalukuyang pool ng 100 MATIC token,  10 MATIC na gantimpala ang idinagdag sa pool. Dahil hindi nagbago ang kabuuang supply ng VATIC token dahil sa mga gantimpala, nagiging 1 MATIC per 0.9 VATIC. Ngayon, nakakakuha ang Delegator D ng mas MATIC para sa parehong halaga kung nagbabahagi.

## Ang flow sa kontrata {#the-flow-in-the-contract}

`buyVoucher`: Nauugnay ang function na ito sa pagsasagawa ng proseso ng pag-delegate papunta sa isang validator. Unang inililipat sa `stakeManager` ang pag-delegate ng `_amount`, na kapag nakumpirma na ay bumubuo ng mga delegation share sa pamamagitan ng `Mint` gamit ang kasalukuyang `exchangeRate`.

Kinakalkula ang exchange rate batay sa formula na:

`ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares`

`sellVoucher`: Ito ang kinakailangang function kapag nag-a-unbind ang isang delegator mula sa isang validator. Pinasisimulan ng function na ito ang proseso ng pagbebenta ng mga voucher habang nagde-delegate. May isinasaalang-alang na panahon ng pag-withdraw bago `claim` ng mga delegator ang kanilang mga token.

`withdrawRewards`: Bilang isang delegator, puwede mong i-claim ang mga gantimpala mo kapag ginamit mo ang `withdrawRewards` na function.

`reStake`: Puwedeng magsagawa ng pag-restake sa dalawang paraan: a) puwedeng bumili ng mas maraming share ang delegator gamit ang mga gantimpalang `buyVoucher` o `reStake`. Puwede kang mag-restake sa pamamagitan ng pag-stake ng mas maraming token papunta sa isang validator o puwede mong i-restake ang mga naipon mong gantimpala bilang isang delegator. Layunin ng `reStaking` na makakuha ng mas maraming gantimpala mula sa mas maraming active na stake ng validator ng delegator, na magdudulot para makakuha rin ng mas maraming gantimpala ang delegator.

`unStakeClaimTokens`: Kapag tapos na ang panahon ng pag-withdraw, puwede nang i-claim ng mga delegator na nagbenta ng kanilang mga share ang kanilang mga MATIC token.

`updateCommissionRate`: Ina-update ang % ng komisyon para sa validator. Tingnan din ang [Validator Commission Operations](/docs/maintain/validate/validator-commission-operations).

`updateRewards`: Kapag nakakuha ng mga gantimpala ang isang validator para sa pagsusumite ng isang [checkpoint](/docs/maintain/glossary#checkpoint-transaction), kinakailangan ang function na ito para sa mga pagbabayad ng mga gantimpala sa pagitan ng validator at mga delegator.
