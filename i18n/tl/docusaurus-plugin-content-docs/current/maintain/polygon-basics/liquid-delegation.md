---
id: liquid-delegation
title: Liquid na Pag-delegate
sidebar_label: Liquid Delegation
description: Paano ginagamit ng Polygon ang liquid na pag-delegate para mapanatili ang network.
keywords:
  - docs
  - polygon
  - matic
  - delegation
  - liquid delegation
slug: liquid-delegation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Sa isang tradisyunal na Proof of Stake mechanism, sinusubaybayan ng blockchain ang isang set ng mga validator. Maaaring sumali ang sinumang ito sa ranggo o karapatan na mag-validate ng mga transaksyon sa pamamagitan ng pagpapadala ng isang espesyal na uri ng transaksyon na nag-stake ng kanilang mga barya (sa kaso ng Ethereum, ETH) at nag-lock sa isang deposito. Pagkatapos nito, ginagawa ang proseso ng paglikha at pagsang-ayon sa mga bagong block sa pamamagitan ng consensus algorithm ng lahat ng aktibong validator.

I-lock nila ang bahagi ng kanilang stake para sa isang tiyak na dami ng oras (tulad ng security deposit), at sa pagbabalik ay nakakakuha sila ng pagkakataon na proporsyonal sa stake na iyon para piliin ang susunod na block.

Ipinamamahagi ang mga gantimpala ng staking bilang insentibo sa mga kalahok.

## Pag-delegate {#delegation}

Maaaring mahalal ang staking na expensive, ang hadlang para magpasok, na pinapaboran ang mayaman na nakakakuha ng richer. Dapat makibahagi ang bawat tao sa seguridad ng network at tumanggap ng mga token ng pagpapahalaga. Ang tanging iba pang pagpipilian ay ang sumali sa isang staking pool na katulad ng isang mining pool, kung saan dapat na pinagkakatiwalaan ang mga validator. Naniniwala kami na ang pagdidikit sa protocol ay ang pinakamahusay na kurso ng pagkilos para sa mga bagong delegator. Dahil bukas ang kapital at mga gantimpala at protektado ng mga in-protocol mechanism.

Maaaring makibahagi ang mga delegator sa validation kahit hindi sila nag-host ng buong node. Gayunpaman, sa pag-stake sa mga validator, maaari nilang dagdagan ang lakas ng network at makakuha ng mga gantimpala sa pamamagitan ng pagbabayad ng maliit na singil sa komisyon (na nag-iiba depende sa validator) sa validator ng kanilang pagpipilian.

## Limitasyon ng Tradisyunal na Delegator at Validator {#limitation-of-traditional-delegator-and-validator}

Ang gastos sa pag-lockup ng kapital para sa kapwa mga validator at mga delegator ay mataas dahil sa disenyo ng protokol na Katibayan ng Pag-stake.

Pa rin na maaari kaming magdala ng mas liquidity view mechanism tulad ng validator NFT kung saan ang sinumang bagong party na gustong maging validator ay makabili ng validator na NFT mula sa isang validator na gustong lumabas mula sa system para sa ilang kadahilanan.

Kung sakaling mag-deliver ang halaga na naka-lock ay ipinapalagay na nasa mas maliit na chunks kaya gusto namin na maging likido para mas maging aktibo ang partisipasyon (ibig sabihin, kung iniisip ng ilang delegator na sa ngayon ang mga pagkakataon ay malaki sa DeFi ngunit naka-lock ang kanilang kabisera sa stake pool kahit para sa withdrawal, kailangan pa rin nilang maghintay ng 21 araw).

Gayundin, ang pag-lock up ng X ETH sa isang deposito, hindi libre ang deposito; nagsasangkot ito ng isang sakripisyo ng optionality para sa may hawak ng ETH. Sa ngayon, kung mayroon kang 1000 ETH, magagawa mo ang anumang gusto mo dito. Kung i-lock mo ito sa isang deposito, natigil ito doon para sa mga buwan para maiwasan ang mga pag-atake na parang [**wala sa stake**](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed) at parusahan ang mga validator para sa kanilang masamang partisipasyon.

## In-Protocol vs Application Layer {#in-protocol-vs-application-layer}

May trust problem ang liquidation na pag-stake ng Application. Mas pinahahalagahan ang pagpuksa ng pag-stake ng protocol-level na nag-stake dahil sa katotohanang makapagtitiwala ang sinumang bagong aktor dito (na umaakit ng mas maraming kapital, kahit na mula sa mas maliit na aktor / delegator).

## Ang Solusyon ng Polygon para sa Pag-delegate {#polygon-s-solution-for-delegation}

Habang nag-explore ng delegasyon, napag-alaman namin na kailangang maging in-protocol ang delegation para magkaroon ng mas maraming tiwala mula sa mga delegator.

Nakaharap kami sa katulad na isyu sa mga validator na capital liquidity at inisip na gawin itong isang NFT na maaaring magpalipat at mag-explore sa mga katulad na pag-iisip tulad ng kung paano ito magagawa ng mas maraming likido at sikka-chorus.one ang [isang kahanga-hangang disenyo](https://blog.chorus.one/delegation-vouchers/) ng isang

Kung iisipin, ang paggawa ng share ng validator pool ay napakagandang ideya at dahil ipinapatupad ang pag-stake ng Polygon sa matalinong kontrata ng ethereum, nagbubukas ito ng mas marami pang opsyon para sa atin tulad ng gawin itong compatible sa ERC20 upang magamit ito sa mga protokol ng defi.

Tulad ng ngayon ay may sariling VMatic ang bawat validator (ibig sabihin, para sa validator na si Ashish ay magkakaroon ng Amatic token) dahil may iba't ibang pagganap ang bawat validator (mga gantimpala at commission rate). Maaaring bumili ang mga delegator ng maramihang validator share at hedge ang kanilang panganib patungo sa mahinang pagganap ng partikular na validator.

## Mga Kalamangan {#advantages}

- Dahil sumusunod ang aming disenyo sa ERC20 tulad ng interface sa pagpapatupad ng delegasyon, madaling binuo ang mga application ng DeFi sa ibabaw nito.
- Ang mga na-delegate na token ay maaaring magamit sa mga protokol sa pagpapautang.
- Puwedeng i-hedge ng mga delegator ang kanilang panganib sa pamamagitan ng mga prediction market tulad ng Auger.

Saklaw sa hinaharap:

- Sa kasalukuyan ay hindi fungible ang ERC20 sa iba pang validator ERC20 / Ibahagi ang mga token ngunit sa hinaharap ay sa tingin namin ay maraming bagong application ng DeFi ang maaaring magtayo dito at gumawa ng ilang mga merkado para dito o kahit na ilang mas mahusay na mga produkto.
- Sa [chorus.one](http://chorus.one) na sinimulan ang pananaliksik, nag-explore din kami ng mga problema tulad ng mga validator na nag-short ng sarili nilang token at iba pang problema (maiiwasan ang (shorting ng mga problema sa pamamagitan ng mga bagay tulad ng validator na nag-lock ng sariling stake para sa X months at iba pang bagay na tulad ng validator insurance (on-chain) na magdudulot ng mas maraming tiwala para sa mga delegator).
- Mga karapatan sa pagboto ng delegator para lumahok sa mga desisyon ng pamamahala.
- Habang gumagawa ng liquid ng delegasyon, gusto rin naming tiyakin ang seguridad ng network. Iyan ang dahilan kung bakit sa ilang form, naka-lock ang kabisera ng slash-able sa kaso ng aktibidad ng pandaraya.

Dahil magagamit nang in-protocol ang disenyo sa itaas, ang mga validator ay palaging maipapatupad ang kanilang sariling mga katulad na mekanismo at makakapag-stake sa pamamagitan ng isang kontrata na hindi magagamit sa UI sa pag-stake ng Polygon.

## Mga Layunin sa Hinaharap {#future-goals}

Mga bagay tulad ng interchain / cross-chain sa pamamagitan ng Cosmos hub at disenyo ng Everett B-harvest

## Mga Resources {#resources}

- [Disenyo ng pos ni Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Panimula sa mga Derivative sa Pag-stake](https://medium.com/lemniscap/an-intro-to-staking-derivatives-i-a43054efd51c)
- [Mga Pool sa Pag-stake](https://slideslive.com/38920085/ethereum-20-trustless-staking-pools)
- [Inflation sa Proof of Stake](https://medium.com/figment-networks/mis-understanding-yield-and-inflation-in-proof-of-stake-networks-6fea7e7c0e41)
