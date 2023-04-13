---
id: rewards
title: Mga Gantimpala
sidebar_label: Rewards
description: Alamin ang tungkol sa mga insentibo sa pag-stake sa Polygon Network.
keywords:
  - docs
  - matic
  - polygon
  - rewards
  - staking
  - incentives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Para sa isang pagpapakilala sa Polygon at sa algoritmo ng Proof Stake, tingnan ang [Kung Ano ang Proof of Stake](/docs/home/polygon-basics/what-is-proof-of-stake)

Sa Polygon, ini-stake ng mga validator ang kanilang mga MATIC token bilang kolateral upang magtrabaho para sa seguridad ng network, at bilang kapalit ng kanilang serbisyo, nakakakuha sila ng mga gantimpala.

Para i-leverage ang ekonomiks ng Polygon, dapat kang maging validator o delegator.

Para maging [validator](/docs/maintain/glossary.md#validator), kailangan mong **magpatakbo ng full validator** node at mag-stake ng MATIC. Tingnan ang [Mag-validate](/docs/maintain/validate/validator-index).

I-check din ang Pahina ng [Responsibilidad](/docs/maintain/validate/validator-responsibilities) ng Validator.

Para maging [delegator](/docs/maintain/glossary.md#delegator), kailangan mo lang **mag-delegate ng MATIC sa isang validator**. Tingnan ang [Mag-delegate](/docs/maintain/delegate/delegate).

## Ano ang insentibo? {#what-is-the-incentive}

Naglalaan ang Polygon ng 12% ng kabuuang supply nito na 10 bilyong token upang pondohan ang mga gantimpala sa pag-stake. Ito ay upang matiyak na sapat na ring naka-seed ang network hanggang sa maging pangkaraniwan ang mga bayad sa transaksyon. Pangunahing nilalayon ng mga gantimpalang ito na pasiglahin ang network, habang sa katagalan, inaasahang masusustena ng protokol ang sarili nito sa pamamagitan ng mga bayad sa transaksyon.

**Mga Gantimpala ng Validator = Mga Gantimpala sa Pag-stake + Mga Bayad sa Transaksyon**

Inilalaan ito, sa isang paraan, upang matiyak ang unti-unting paghiwalay ng mga gantimpala sa pag-stake mula sa pagiging dominanteng bahagi ng mga gantimpala ng validator.

| Taon | Target na Stake (30% ng umiikot na supply) | Rate ng Gantimpala para sa 30% na Pag-bond | Pool ng Gantimpala |
|---|---|---|---|
| Una | 1,977,909,431 | 20% | 312,917,369 |
| Ikalawa | 2,556,580,023 | 12% | 275,625,675 |
| Ikatlo | 2,890,642,855 | 9% | 246,933,140 |
| Ikaapat | 2,951,934,048 | 7% | 204,303,976 |
| Ikalima | 2,996,518,749 | 5% | 148,615,670 + **11,604,170** |

Nasa ibaba ang halimbawa ng inaasahang taunang mga gantimpala para sa unang 5 taon na isinasaalang-alang ang naka-stake na supply na mula 5% hanggang 40% sa 5% pagitan

| % ng umiikot na supply na naka-stake | 5% | 10% | 15% | 20% | 25% | 30% | 35% | 40% |
|---|---|---|---|---|---|---|---|---|
| Taunang gantimpala para sa taon |
| Una | 120% | 60% | 40% | 30% | 24% | 20% | 17.14% | 15% |
| Ikalawa | 72% | 36% | 24% | 18% | 14.4% | 12% | 10.29% | 9% |
| Ikatlo | 54% | 27% | 18% | 13.5% | 10.8% | 9% | 7.71% | 6.75% |
| Ikaapat | 42% | 21% | 14% | 10.5% | 8.4% | 7% | 6% | 5.25% |
| Ikalima | 30% | 15% | 10% | 7.5% | 6% | 5% | 4.29% | 3.75% |

## Sino ang nakakakuha ng mga insentibo? {#who-gets-the-incentives}

Mga nag-stake na nagpapatakbo ng mga validator node at mga nag-stake na nagde-delegate ng kanilang mga token tungo sa validator na mas gusto nila.

May opsyon ang mga validator na maningil ng komisyon sa gantimpalang nakuha ng mga delegator.

Naka-lock sa kontrata na naka-deploy sa Ethereum mainnet ang mga pondong pag-aari ng lahat ng nag-stake.

Walang validator ang may hawak ng kustodiya sa mga token ng delegator.

## Mga gantimpala sa pag-stake {#staking-rewards}

Ang taunang insentibo ay absolute — nang hindi isinasaalang-alang ang pangkabuuang stake o ang target na rate ng pag-bond sa network. Ibinibigay ang halaga ng insentibo bilang gantimpala sa lahat ng signer nang pana-panahon.

Sa Polygon, may karagdagang elemento ng pag-commit ng pana-panahong [mga checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) sa Ethereum mainnet. Ito ay isang malaking bahagi ng mga responsibilidad ng validator at binibigyan sila ng- insentibo upang isagawa ang aktibidad na ito. Bahagi ito ng gastos ng validator na bukod-tangi sa isang Layer 2 na solusyon gaya ng Polygon. Sinisikap naming pagbigyan ang gastos na ito sa mekanismo ng paghahatid ng payout ng gantimpala sa pag-stake ng validator bilang bonus na babayaran sa [tagapanukala](/docs/maintain/glossary.md#proposer), na responsable sa pag-commit ng checkpoint. Ibabahagi ang mga gantimpala na binawasan ng bonus sa lahat ng nag-stake, tagapanukala at [mga signer](/docs/maintain/glossary.md#signer-address), nang pantay-pantay.

## Paghikayat sa tagapanukala na isama ang lahat ng lagda {#encouraging-the-proposer-to-include-all-signatures}

Para lubusang i-avail ang bonus, dapat isama ng [tagapanukala](/docs/maintain/glossary.md#proposer) ang lahat ng lagda sa [checkpoint](/docs/maintain/glossary.md#checkpoint-transaction). Dahil nagnanais ang protokol ng ⅔ +1 na bigat ng kabuuang stake, tinatanggap ang checkpoint maging sa 80% boto. Gayunpaman, sa kasong ito, nakakakuha lang ang tagapanukala ng 80% ng kinalkulang bonus.

## Mga bayad sa transaksyon {#transaction-fees}

Bawat block producer sa [Bor](/docs/maintain/glossary.md#bor) ay binibigyan ng tiyak na porsyento ng mga bayad sa transaksyon na nakolekta sa bawat block. Nakadepende rin sa ratio ng validator sa pangkalahatang stake ang pagpili sa mga producer para sa anumang ibinigay na nasasaklaw. Dumadaloy ang natitirang mga bayad sa transaksyon sa kaparehong funnel ng mga gantimpala na paghahatian ng lahat ng validator na nagtatrabaho sa [Heimdall](/docs/maintain/glossary.md#heimdall) layer.
