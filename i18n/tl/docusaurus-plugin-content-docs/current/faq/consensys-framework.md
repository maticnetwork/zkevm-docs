---
id: consensys-framework
title: FAQ ng Pag-scale
sidebar_label: Scaling Framework FAQ
description: Buuin ang susunod mong blockchain app sa Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Ang balangkas na ito ay nagmula sa Apat na tanong ng Consensys's [para hatulan ang anumang solusyong scaling.](https://consensys.net/?p=19015&preview=true&_thumbnail_id=19017)

## Sino ang Nagpapatakbo Nito? {#who-operates-it}
Ang mga node ng minero sa mainnet Ethereum ay pasulong na nagpapagalaw o "nagpapatakbo" sa network sa pamamagitan ng paglutas ng Proof of Work at paglikha ng mga bagong block. Ang solusyon sa L2 ay nangangailangan ng isang katulad na papel na "operator" sa network nito, na katumbas ng minero ng Ethereum mainnet na maaaring ilipat ang L2 network pasulong. Mayroong ilang mga pagkakaiba, gayunpaman. Halimbawa, kasama ng pagpoproseso at pagpapahintulot sa mga transaksyon tulad ng isang minero, maaari ring padaliin ng isang L2 operator ang pagpasok at paglabas ng mga user sa L2 layer mismo.

### - Sino o ano ang kinakailangan upang patakbuhin ang Polygon Proof of Stake network? {#who-or-what-is-required-to-operate-the-polygon-proof-of-stake-network}

Ang polygon PoS commit chain ay umaasa sa isang hanay ng mga validator upang ma-secure ang network. Ang tungkulin ng mga validator ay magpatakbo ng isang buong node; gumawa ng mga block, mag-validate at lumahok sa consensus at gumawa ng mga checkpoint sa Ethereum main-chain. Para maging validator, kailangang i-stake ng isang tao ang kanilang mga MATIC token gamit ang mga kontrata sa pamamahala ng pag-stake na matatagpuan sa Ethereum main chain.

Para sa karagdagang detalye, mangyaring mag-refer sa [Validator section](/maintain/validate/getting-started.md).

### - Paano sila nagiging mga operator sa Polygon PoS network? Anu-anong alituntunin ang kanilang sinusunod? {#how-do-they-become-operators-in-the-polygon-pos-network-what-rules-do-they-abide-by}

Para maging validator, kailangang i-stake ng isang tao ang kanilang mga MATIC token gamit ang mga kontrata sa pamamahala ng pag-stake na matatagpuan sa Ethereum mainchain.

Ang mga reward ay ibinabahagi sa lahat ng staker na proporsyonal sa kanilang stake sa bawat checkpoint na may exception na ang nagmumungkahi ay nakakakuha ng karagdagang bonus. Naa-update ang balanse ng reward ng user sa kontrata na tinutukoy habang kumukuha ng mga gantimpala.

Ang mga stake ay nasa panganib na ma-slash sakaling ang validator node ay gumawa ng malisyosong pagkilos tulad ng double signing, validator downtime na nakakaapekto rin sa naka-link na delegator sa checkpoint na iyon.

Para sa karagdagang detalye mangyaring sumangguni sa [End-to-end na daloy sa](/maintain/polygon-basics/who-is-validator.md#end-to-end-flow-for-a-polygon-validator) isang validator ng Polygon at [Responsibilidad ng isang validator](/maintain/validate/validator-responsibilities.md).


### Anong mga pagpapalagay ng tiwala ang dapat gawin ng mga gumagamit ng Polygon PoS tungkol sa operator? {#what-trust-assumptions-must-the-polygon-pos-users-make-about-the-operator}

Ang polygon PoS commit chain ay umaasa sa isang hanay ng mga validator upang ma-secure ang network. Ang tungkulin ng mga validator ay magpatakbo ng isang buong node; gumawa ng mga bloke, patunayan at lumahok sa pinagkasunduan at gumawa ng mga checkpoint sa main-chain. Upang maging validator, kailangan ng isa na i-stake ang kanilang mga MATIC token na may mga staking management contract na naninirahan sa main-chain. Hangga't ang ⅔ ng weighted stake ng mga validator ay tapat, ang chain ay uunlad nang tumpak.

### - Ano ang pananagutan ng mga operator? Anong kapangyarihan ang mayroon sila? {#what-are-the-operators-responsible-for-what-power-do-they-have}

Ang tungkulin ng mga validator ay magpatakbo ng isang buong node; gumawa ng mga bloke, patunayan at lumahok sa pinagkasunduan at gumawa ng mga checkpoint sa main-chain.

Ang mga validator ay may kapangyarihang pigilan ang pag-usad ng chain, muling isaayos ang mga bloke, atbp. kung ipagpalagay na ⅔ ng mga weighted stake validator ay hindi tapat. Wala silang kapangyarihang baguhin ang estado, mga balanse ng asset ng user, atbp.

### - Anu-ano ang motibasyon upang maging isang operator ng Polygon PoS? {#what-are-the-motivations-to-become-an-operator-of-the-polygon-pos}

Ini-stake ng mga validator ang kanilang mga MATIC token bilang kolateral upang magtrabaho para sa seguridad ng network at bilang kapalit ng kanilang serbisyo, nakakakuha sila ng mga gantimpala.

Please ang [kung ano ang insentibo](/maintain/validator/rewards.md#what-is-the-incentive) para sa karagdagang detalye.

## Kamusta ang Data? {#how-s-the-data}
Sa pamamagitan ng kahulugan, ang teknolohiya ng Layer 2 ay dapat lumikha ng mga incremental na checkpoint ng data sa isang Layer 1 (Ethereum mainnet). Ang aming alalahanin, kung gayon, ay ang interstitial time sa pagitan ng mga pana-panahong Layer 1 check-in. Sa partikular, paano nabuo, iniimbak at pinangangasiwaan ang data ng Layer 2 habang malayo sa ligtas na daungan ng Layer 1? Kami ay higit na nag-aalala tungkol dito dahil ito ay kapag ang gumagamit ay pinakamalayo mula sa walang tiwala na seguridad ng isang pampublikong mainnet.

### - Ano ang mga kondisyon ng lock-up para sa Polygon PoS? {#what-are-the-lock-up-conditions-for-polygon-pos}

Sa karamihan ng mga pattern ng disenyo ng token, ang token ay minted sa Ethereum at maaaring ipadala sa Polygon PoS. Upang ilipat ang naturang token mula sa Ethereum patungo sa Polygon PoS, kailangan ng user na i-lock ang mga pondo sa isang kontrata sa Ethereum, at pagkatapos ay i-minted ang mga kaukulang token sa Polygon PoS.

Ang mekanismo ng bridge relay na ito ay pinatatakbo ng mga validator ng Polygon PoS na kailangang ⅔ sumang-ayon sa naka-lock na kaganapan ng token sa Ethereum upang makuha ang katumbas na halaga ng token sa Polygon PoS.

Ang pag-withdraw ng mga asset pabalik sa ethereum ay isang 2 hakbang na proseso kung saan ang mga token ng asset ay kailangang i-burn muna sa Polygon PoS commit chain at pagkatapos ay ang patunay ng transaksyong ito sa paso ay kailangang isumite sa Ethereum chain.


Para sa karagdagang detalye, sumangguni sa [mga Hakbang na gamitin ang tulay ng POS](/develop/ethereum-polygon/pos/getting-started.md#steps-to-use-the-pos-bridge).

### - Gaano katagal magagamit ang mga pondong iyon sa Polygon PoS? {#how-soon-are-those-funds-available-on-the-polygon-pos}

Paligid ~ 22-30 minuto. Ginawa ito sa pamamagitan ng isang message passing mechanism na tinatawag na `state sync`. Matatagpuan [ang](/pos/state-sync/state-sync-mechamism.md) karagdagang detalye dito.

Nagbibigay ba ang Polygon PoS ng suporta para sa mga user na pumapasok nang walang L1 lock-up (hal. sa kaso ng pag-onboard ng isang user nang direkta sa Polygon, pagkatapos ay nais ng user na lumabas sa Ethereum mainnet)?

Oo, isang espesyal na mekanismo ng tulay ang ginagamit para magawa ito. Kapag ang gumagamit ay nais na lumabas sa Ethereum, sa halip na ang karaniwang paraan ng pag-unlock ng mga token mula sa isang espesyal na kontrata, ito ay minted.

Mababasa mo ang tungkol [sa](/develop/ethereum-polygon/mintable-assets.md) mga ito rito.

### - Paano idi-dispute ng isang user ang isang di-wastong transaksyon ng Polygon PoS? Patunayan ang isang wastong transaksyon ng Polygon PoS? {#how-would-a-user-dispute-an-invalid-polygon-pos-transaction-prove-a-valid-polygon-pos-transaction}

Kasalukuyang walang paraan on-chain upang i-dispute ang isang di-wastong transaksyon ng Polygon PoS. Gayunpaman, nagsumite ang mga validator ng polygon Pos chain ng peryodikong checkpoint sa Ethereum - makikita mo ang higit pang detalye [dito](/pos/heimdall/modules/checkpoint.md). Posible na i-verify ang isang transaksyon sa Polygon PoS chain sa Ethereum sa pamamagitan ng pagtatayo ng isang tree proof ng Merkle at pag-verify nito laban sa mga peryodikong checkpoint na nangyayari sa Ethereum ng transaksyon ng Polygon PoS at pagtanggap ng mga ugat ng puno ng Merkle.

### - Kapag nagnanais ng isang gumagamit ng Polygon na lumabas na, sa madaling panahon ang locked-up na Layer 1 fund (plus o minus ang anumang nakuha o pagkalugi ng L2) na magagamit pabalik sa L1? {#once-a-polygon-user-wishes-to-exit-how-soon-are-the-locked-up-layer-1-fund-plus-or-minus-any-l2-gains-or-losses-available-back-on-l1}

Humigit-kumulang ~ 1-3 oras depende sa dalas ng mga [checkpoint](/pos/heimdall/modules/checkpoint.md). Ang dalas ay pangunahing isang function ng gastos na gustong gastusin ng mga validator sa mga bayarin sa gas ng ETH para magsumite ng mga checkpoint.

### - Inaasahan mo ba na mayroong mga Liquidity Provider sa Layer 1 na handang magbigay ng agad na makukuhang L1 na pondo sa mga kasalukuyang gumagamit ng Polygon PoS? {#do-you-anticipate-there-being-liquidity-providers-on-layer-1-willing-to-provide-immediately-redeemable-l1-funds-to-existing-polygon-pos-users}

May ilang manlalaro na tulad ng [Connext](https://connext.network/) at [Biconomy](https://biconomy.io/) na o magbibigay ng serbisyong ito. Mayroong iba't ibang bilang ng iba pang mga manlalaro na malapit na ring mag-live.

## Kamusta ang Stack?? {#how-s-the-stack}
Ang paghahambing ng stack ay mahalaga upang i-highlight kung ano ang isang Layer 2 ay mayroon o hindi nagbago mula sa Ethereum mainnet.

### - Magkano ang ibinabahagi ng Polygon PoS stack sa Ethereum mainnet stack? {#how-much-does-the-polygon-pos-stack-share-with-the-ethereum-mainnet-stack}

Kung isa kang Ethereum Developer, isa ka nang developer ng Polygon PoS. Ang lahat ng mga tool na pamilyar sa iyo ay sinusuportahan sa Polygon PoS out of the box: Truffle, Remix, Web3js at marami, marami pa.

Walang malaking pagbabago sa interface ng EVM para sa Polygon PoS na may kaugnayan sa Ethereum.

### - Saan naiiba ang Polygon PoS sa Ethereum mainnet stack at anong mga panganib / gantimpala ang ipinakilala nito? {#where-does-the-polygon-pos-differ-from-ethereum-mainnet-stack-and-what-risks-rewards-does-that-introduce}

Walang malaking pagbabago.

## Paghahanda para sa Pinakamasama {#preparing-for-the-worst}
Paano naghahanda ang Polygon PoS system para sa:

### - Isang malawakang paglabas ng mga user? {#a-mass-exit-of-users}

Hangga't ⅔ sa mga validator ay tapat, ligtas ang mga pondo sa chain. Kung sakaling hindi wasto ang pagpapalagay na ito, sa ganitong sitwasyon ay maaaring huminto ang chain o maaaring mangyari ang muling pag-aayos. Kakailanganin ang social consensus para i-restart ang chain mula sa isang naunang estado - kasama ang mga snapshot ng Polygon PoS state na isinumite sa pamamagitan ng mga checkpoint na magagamit para gawin ito.

### - Mga kalahok sa Polygon na sinusubukang laruin ang pinagkasunduan ng Polygon. Halimbawa, sa pamamagitan ng pagbuo ng isang kartel? {#polygon-participants-attempting-to-game-the-polygon-consensus-for-example-by-forming-a-cartel}

Kakailanganin ang social consensus upang pagkatapos ay i-restart ang chain mula sa isang naunang estado, Ito ay sa pamamagitan ng pag-alis sa mga validator na iyon at pag-restart nito gamit ang isang bagong hanay ng mga validator - kabilang ang mga snapshot ng Polygon PoS state na isinumite sa pamamagitan ng mga checkpoint na magagamit para gawin ito.


### - Isang bug o pagsasamantalang natuklasan sa isang kritikal na bahagi ng system nito? {#a-bug-or-exploit-discovered-in-a-critical-part-of-its-system}

Ang pangangalaga ay ginawa upang muling magamit ang mga bahaging nasubok sa labanan sa pagbuo sa labas ng system. Gayunpaman, kung mayroong isang bug o pagsasamantala sa isang kritikal na bahagi ng system, ang pagpapanumbalik ng chain sa isang mas maagang estado sa pamamagitan ng social consensus ay ang pangunahing paraan ng solusyon.
