---
id: staking
title: Pag-stake sa Polygon
description: Pag-stake sa Polygon
keywords:
  - docs
  - polygon
  - matic
  - staking
  - unstake
  - restake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Pag-stake sa Polygon {#staking-on-polygon}

Para sa Polygon Network, maaaring maging qualified ang sinumang kalahok na maging validator ng network sa pamamagitan ng pagpapatakbo ng isang full node. Ang pangunahing insentibo para sa pagpapatakbo ng isang buong node para sa mga validator ay ang kumita ng mga Gantimpala at mga bayad sa Transaksyon. Nakakatanggap ng incentive ang validator na lumalahok sa consensus para sa Polygon dahil nakakatanggap sila ng mga block reward at bayad sa transaksyon.

Dahil limitado ang mga validator slot para sa network, ang proseso na mapili bilang validator ay ang lumahok sa isang on-chain auction na nangyayari sa mga regular na pagitan tulad ng tinukoy [dito](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#a55fbd158b7d4aa89648a4e3b68ac716).

## Mag-stake {#stake}

Kung bukas ang slot, magsisimula ang auction sa mga interesadong validator:

- Kung saan sila magbi-bid nang mas malaki kaysa sa huling bid na ginawa para sa slot.
- Inilista rito ang Proseso ng Paglahok sa Auction:
    - Awtomatikong magsisimula ang auction kapag nagbukas na ang slot.
    - Para magsimulang lumahok sa auction, Tumawag sa `startAuction()`
    - Ilalagay nito ang mga asset mo sa Stack Manager.
    - Kung ang isa pang potensyal na validator ay nag-stake ng higit pa sa iyong stake, babalik sa iyo ang mga naka-lock na token.
    - Muli, mag-stake nang mas marami para manalo sa auction.
- Sa pagtatapos ng panahon ng auction, nanalo ang pinakamataas na bidder at nagiging Validator sa Polygon network.

:::note

Please ang iyong buong node na tumatakbo kung ikaw ay lumahok sa auction.

:::

Ang proseso ng pagiging validator pagkatapos na manalo ng pinakamataas na bidder ang slot ay nakabalangkas sa ibaba:

- Tumawag sa `confirmAuction()`para kumpirmahin ang paglahok mo.
- Nakikinig ang Bridge sa Heimdall sa event na ito at nag-broadcast sa Heimdall.
- Pagkatapos ng pinagkasunduan, idinagdag ang validator sa Heimdall ngunit hindi activate.
- Nagsisimula ang validator na validating lamang pagkatapos `startEpoch`(tinukoy [dito)](https://www.notion.so/maticnetwork/State-of-Staking-03e983ed9cc6470a9e8aee47d51f0d14#c1c3456813dd4b5caade4ed550f81187).
- Sa sandaling umabot `startEpoch`ito, idinagdag ang validator `validator-set`at nagsisimula ang pakikilahok sa consensus mechanism.

:::info Inirerekomendang

Para matiyak ang seguridad ng stake ng mga validator, inirerekomenda namin sa mga validator na magbigay ng iba't ibang `signer`address kung saan isasagawa ang pag-verify ngs`checkPoint` sigs. Ito ay upang panatilihin ang paglagda ng key na hiwalay sa wallet key ng validator upang protektado ang mga pondo kung sakaling magkaroon ng node hack.

:::

### Mag-unstake {#unstake}

Pinapayagan ng pag-unstake ang validator na maging mula sa aktibong pool ng mga validator. Para matiyak ang **Magandang Kalahok**, naka-lock ang kanilang stake para sa susunod na 21 araw.

Kapag gustong lumabas ang mga validator mula sa network at itigil ang pag-validate ng mga block at pagsusumite ng mga checkpoint, maaari silang `unstake`. Agaran ang pagkilos na ito sa ngayon. Pagkatapos ng aksyong ito, itinuturing na validator mula sa aktibong set ng mga validator.

### Mag-restake {#restake}

Maaari ring magdagdag ang mga validator ng mas maraming stake sa kanilang halaga para kumita ng mas maraming gantimpala at maging competitive para sa kanilang validator spot at mapanatili ang kanilang posisyon.
