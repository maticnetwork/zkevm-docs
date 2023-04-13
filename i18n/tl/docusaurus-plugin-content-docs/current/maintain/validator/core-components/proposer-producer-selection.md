---
id: proposers-producers-selection
title: Pagpili sa mga Proposer at Producer
sidebar_label: Proposers & Producers
description: Proposer & block producer pagpili sa Polygon
keywords:
  - docs
  - polygon
  - matic
  - proposers
  - block producers
  - selection
slug: proposers-producers-selection
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Ang mga Block Producer para sa BOR layer, ay isang lupon na pinili mula sa pool ng mga Validator batay sa kanilang stake na nangyayari sa regular na interval. Pinagpapasyahan ang mga interval na ito ng pamamahala ng Validator ayon sa dynasty at network.

Tinutukoy ng ratio ng [stake](/docs/maintain/glossary.md#staking) ang probability na mapili bilang miyembro ng lupon ng [mga block producer](/docs/maintain/glossary.md#block-producer).

## Proseso ng pagpili {#selection-process}

Halimbawa ay mayroon tayong 3 validator sa pool—sina Alice, Bill, at Clara:

* Magse-stake si Alice ng 100 MATIC token.
* Magse-stake si Bill ng 40 MATIC token.
* Magse-stake si Clara ng 40 MATIC token.

Binibigyan ng mga slot ang mga validator batay sa stake.

Dahil nag-stake si Alice ng 100 MATIC token, at 20 MATIC token ang halaga ng bawar slot gaya ng pinapanatili ng pamamahala ng validator, 5 slot ang makukuha ni Alice sa kabuuan. Gayundin, makakakuha sina Bill at Clara ng tig-2 slot sa kabuuan.

Bibigyan ang mga validator na sina Alice, Bill, at Clara ng mga sumusunod na slot:

* [A, A, A, A, A, B, B, C, C]

Pagkatapos, isa-shuffle ng Polygon ang hanay ng mga slot nina Alice, Bill, at Clara gamit ang mga hash ng Ethereum block bilang panimula.

Ipinapakita sa sumusunod na hanay ng mga slot ang resulta ng pag-shuffle:

* [A, B, A, A, C, B, A, A, C]

Ngayon, depende sa kabuuang bilang ng block producer na pinapanatili ng pamamahala ng validator, ginagamit ng Polygon ang mga validator mula sa itaas—halimbawa, para sa set ng 5 producer, ang hanay ng mga slot ay [A, B, A, A, C].

Ang set ng producer para sa susunod na span ay tutukuyin bilang [A: 3, B:1, C:1].

Gamit ang resultang set ng validator at ang [proposer selection algorithm](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html) ng Tendermint, pipili ang Polygon ng producer para sa bawat sprint sa Bor.

<img src={useBaseUrl("img/validators/producer-proposer.png")} />

**Legend:**

* Dynasty: Oras sa pagitan ng pagtatapos ng huling auction at oras ng pagsisimula ng susunod na auction.
* Sprint: Interval ng oras kung kailan pinipili ang lupon ng mga block producer.
* Span: Bilang ng mga nagawang block ng isang producer.
