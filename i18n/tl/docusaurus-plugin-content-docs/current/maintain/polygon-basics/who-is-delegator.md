---
id: who-is-delegator
title: Sino ang Delegator
description: May hawak ng Token na hindi nagpatakbo ng node
keywords:
  - docs
  - matic
  - polygon
  - delegator
  - Who is a Delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Ang mga delegator ay mga may-ari ng token na hindi maaari, o hindi gustong sila mismo ang magpatakbo ng [validator](/docs/maintain/glossary.md#validator) node. Sa halip, sine-secure nila ang network sa pamamagitan ng pag-delegate ng kanilang stake sa mga validator node. Mayroon silang mahalagang papel na ginagampanan sa system dahil rresponsibilidad nila ang pagpili ng mga validator. Pinapatakbo nila ang kanilang transaksyon sa pag-delegate sa kontrata sa pag-stake sa Ethereum mainnet.

Naka-bond ang mga MATIC token sa susunod na [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) na na-commit sa Ethereum mainnet. May opsyon din ang mga delegator na mag-opt out sa system kahit kailan nila gusto. Katulad ng mga validator, kailangang hintayin ng mga delegator na matapos ang panahon ng pag-unbond, na binubuo ng humigit-kumulang 9 na araw, bago i-withdraw ang kanilang stake.

## Mga Bayarin at Gantimpala {#fees-and-rewards}

Ini-stake ng mga delegator ang kanilang mga token sa pamamagitan ng pag-delegate ng mga ito sa validator, kapalit ng pagkuha ng porsyento ng kanilang mga gantimpala. Dahil kabahagi ng mga delegator ang kanilang mga validator sa mga gantimpala, kabahagi rin ang mga delegator sa mga panganib. Sakaling umasal nang masama ang isang validator, nanganganib ang bawat isa sa kanilang mga delegator na bahagyang mabawasan nang proporsyonal ang kanilang na-delegate na stake.

Itinatakda ng mga validator ng porsyento ng [komisyon](/docs/maintain/glossary.md#commission) para matukoy ang porsyento ng mga gantimpala na mapupunta sa kanila. Puwedeng tingnan ng mga delegator ang rate ng komisyon ng bawat validator para maunawaan ang distribusyon ng gantimpala ng bawat validator at ang relative rate of return ng kanilang stake.

:::caution Mga validator na may 100% na rate ng komisyon

Ito ang mga validator na kumukuha ng lahat ng mga gantimpala at hindi naghahanap ng delegasyon, dahil may sapat silang token para to sa kanilang sarili.

:::

May pagpipilian ang mga delegator na muling i-delegate ang kanilang mga token sa iba pang validator. Iniipon ang mga gantimpala sa bawat checkpoint.

:::tip Pagiging isang active na delegator

Hindi dapat tingnan ang pag-delegate bilang isang passive na aktibidad, dahil mahalaga ang papel ng mga delegator sa pagpapanatili ng
Polygon network. Responsibilidad ng bawat delegator na pangasiwaan ang sarili nilang panganib, pero sa paggawa nito,
ay dapat maghangad na maghalal ng mga validator na maayos ang pag-uugali.

:::

## Tingnan din ang {#see-also}

* [I-delegate](/docs/maintain/delegate/delegate)
* [Mga Madalas Itanong tungkol sa Validator](/docs/maintain/validate/faq/validator-faq)
