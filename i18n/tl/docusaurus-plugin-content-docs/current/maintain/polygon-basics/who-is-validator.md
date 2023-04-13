---
id: who-is-validator
title: Sino ang Validator
sidebar_label: Who is a Validator
description: "Isang kalahok sa network na nagpapatakbo ng mga Heimdall at Bor node."
keywords:
  - docs
  - matic
  - polygon
  - validator
  - Who is a Validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Ang validator ay isang kalahok sa network na nag-lock ng mga MATIC token sa system at nagpapatakbo ng validator ng Heimdall at mga node ng block ng Bor para makatulong sa pagpapatakbo ng network. Ini-stake ng mga validator ang kanilang mga MATIC token bilang kolateral upang magtrabaho para sa seguridad ng network at bilang kapalit ng kanilang serbisyo, nakakakuha sila ng mga gantimpala.

Ipinapamahagi ang mga gantimpala sa lahat ng nag-stake nang proporsyonal sa kanilang stake sa bawat checkpoint maliban sa proposer na nakakakuha ng karagdagang bonus. Naa-update ang balanse ng gantimpala ng user sa tinutukoy na kontrata kapag kumukuha ng mga gantimpala.

Nanganganib na mabawasan nang malaki ang mga stake sakaling gumawa ang validator node ng malisyosong pagkilos tulad ng dobleng paglagda na nakakaapekto rin sa mga naka-link na delegator sa checkpoint na iyon.

:::tip

Ang mga interesado sa pag-secure ng network ngunit hindi nagpapatakbo ng isang full node ay maaaring lumahok bilang mga [delegator](/docs/maintain/glossary.md#delegator).

:::

## Pangkalahatang-ideya {#overview}

Pinipili ang mga validator sa Polygon network sa pamamagitan ng isang on-chain na proseso ng auction na nangyayari sa mga regular na interval. Lumalahok ang mga napiling validator na ito bilang mga block producer at verifier. Kapag na-validate na ng mga kalahok ang isang [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction), gagawa ng mga update sa parent chain (ang Ethereum mainnet) na siyang magbibigay ng mga gantimpala para sa mga validator depende sa kanilang stake sa network.

Umaasa ang Polygon sa isang set ng [mga validator](/docs/maintain/glossary.md#validator) para i-secure ang network. Tungkulin ng mga validator na magpatakbo ng full node, [gumawa ng mga block](/docs/maintain/glossary.md#block-producer), mag-validate at lumahok sa consensus, at mag-commit ng [mga checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) sa Ethereum mainnet. Para maging validator, kailangang [i-stake](/docs/maintain/glossary.md#staking) ng isang tao ang kanilang mga MATIC token gamit ang mga kontrata sa pamamahala ng pag-stake na matatagpuan sa Ethereum mainnet.

## Mga pangunahing bahagi {#core-components}

Binabasa ng [Heimdall](/docs/maintain/glossary.md#heimdall) ang mga kaganapan na inilabas ng mga kontrata sa pag-stake upang piliin ang mga validator para sa kasalukuyang set gamit ang kanilang na-update na stake ratio, na ginagamit din ng [Bor](/docs/maintain/glossary.md#bor) habang gumagawa ng mga block.

Ang [pag-delegate](/docs/maintain/glossary.md#delegator) ay nakatala rin sa kontrata sa pag-stake at anumang update sa kapangyarihan ng validator o [address ng signer](/docs/maintain/glossary.md#signer-address) ng node o mga kahilingan sa pag-unbond ay nagkakabisa kapag na-commit ang susunod na checkpoint.


## End-to-end na daloy para sa isang validator ng Polygon {#end-to-end-flow-for-a-polygon-validator}

Ang mga validator ay nagse-set up ng kanilang mga node sa paglagda, nagsi-sync ng data at saka nag-i-stake ng kanilang mga token sa mga kontrata sa pag-stake sa Ethereum mainnet upang matanggap bilang validator sa kasalukuyang set. Kung bakante ang isang slot, kaagad na tatanggapin ang validator. Kung hindi, kailangang dumaan ang isang tao sa mekanismo ng pagpapalit para makakuha ng slot.

:::warning

May limitadong espasyo para sa pagtanggap ng mga bagong validator. Makakasali lang ang mga bagong validator sa aktibong set kapag nag-unbond ang isang kasalukuyang aktibong validator. Ipapakilala ang isang bagong proseso ng auction para sa pagpapalit ng validator.

:::

Pinipili ang mga block producer mula sa set ng validator kung saan responsibilidad ng mga piniling validator na gumawa ng mga block para sa isang ibinigay na [span](/docs/maintain/glossary.md#span).

Vina-validate ng mga node sa Heimdall ang mga block na ginagawa, lumalahok sa consensus, at nagko-commit ng mga checkpoint sa Ethereum mainnet sa mga tinukoy na interval.

Nakadepende ang probability na mapili ang mga validator bilang block producer o [proposer](/docs/maintain/glossary.md#proposer) ng checkpoint sa stake ratio ng isang tao, kabilang ang mga pag-delegate sa kabuuang pool.

Nakakatanggap ang mga validator ng mga gantimpala sa bawat checkpoint ayon sa kanilang stake ratio, pagkatapos ibawas ang bonus ng proposer na ibabayad sa proposer ng checkpoint.

Puwedeng mag-opt out sa system ang isang tao anumang oras at puwedeng mag-withdraw ng mga token kapag natapos na ang panahon ng pag-unbond.

## Economics {#economics}

Tingnan ang [Mga Gantimpala](/docs/maintain/validator/rewards).

## Pag-set up ng validator node {#setting-up-a-validator-node}

Tingnan ang [Mag-validate](/docs/maintain/validate/validator-index).

## Tingnan din ang {#see-also}

* [Mga responsibilidad ng Validator](/docs/maintain/validate/validator-responsibilities)
* [Mag-validate](/docs/maintain/validate/validator-index)
* [Mga Madalas Itanong tungkol sa Validator](/docs/maintain/validate/faq/validator-faq)
