---
id: what-is-proof-of-stake
title: Ano ang Proof of Stake?
description: Isang algoritmo ng consensus na nakadepende sa mga validator.
keywords:
  - docs
  - matic
  - polygon
  - stake
  - delegate
  - validate
  - pos
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Patunay ng Stake (PoS) {#proof-of-stake-pos}

Ang Proof of Stake (PoS) ay isang kategorya ng mga algoritmo ng consensus para sa mga pampublikong blockchain na nakadepende sa ekonomikong [stake](/docs/maintain/glossary#staking) ng isang validator sa network.

Sa mga pampublikong blockchain na nakabatay sa proof of work (PoW), ginagantimpalaan ng algoritmo ang mga kalahok na lumulutas ng mga cryptographic puzzle upang mag-validate ng mga transaksyon at gumawa ng mga bagong block. Mga halimbawa ng blockchain ng PoW: Bitcoin, mas maaga pang Ethereum.

Sa mga pampublikong blockchain na nakabatay sa PoS, isang set ng mga validator ang naghahalinhinan sa pagpapanukala at pagboto sa susunod na block. Ang bigat ng boto ng bawat validator ay nakadepende sa laki ng deposito nito—[stake](/docs/maintain/glossary#staking). Kasama sa mga makabuluhang kalamangan ng PoS ang seguridad, nabawasang panganib ng sentralisasyon, at mahusay na paggamit ng enerhiya. Mga halimbawa ng PoS blockchain: Eth2, Polygon.

Sa pangkalahatan, ganito ang hitsura ng algorithm ng PoS. Sinusubaybayan ng blockchain ang isang set ng mga validator, at sinumang naghahawak ng batayang cryptocurrency ng blockchain (sa kaso ng Ethereum, ether) ay maaaring maging validator sa pamamagitan ng pagpapadala ng isang espesyal na uri ng transaksyon na nila-lock up ang kanilang ether sa isang deposito. Ginagawa naman ang proseso ng paggawa at pagsang-ayon sa mga bagong block sa pamamagitan ng algorithm ng consensus kung saan puwedeng lumahok ang lahat ng kasalukuyang validator.

Maraming uri ng algorithm ng consensus, at maraming paraan para magtalaga ng mga gantimpala sa mga validator na nakikilahok sa algorithm ng consensus, kaya maraming "flavor" ng proof of stake. Mula sa isang algorithmic na pananaw, may dalawang pangunahing uri: PoS na nakabatay sa chain and [BFT](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance)-style PoS.

Sa **proof of stake na nakabatay sa chain**, pseudo-random na pumipili ng validator ang algorithm sa bawat time slot (hal. puwedeng isang time slot ang bawat 10 segundo), at ibinibigay sa validator na iyon ang karapatang gumawa ng isang block, at kailangang nakaugnay ang block na ito sa ilang dating block (karaniwang sa block na nasa dulo ng huling pinakamahabang chain). Sa paglipas ng panahon, nagsasama-sama ang karamihan ng mga block at nagiging isang tuloy-tulot na humahabang chain.

Sa **BFT-style na proof of stake**, **random** na itinatalaga sa mga validator ang karapatan na *magpanukala* ng mga block, pero isinasagawa ang *pagsang-ayon kung aling block ang canonical* sa pamamagitan ng isang prosesong may maramihang round kung saan nagpapadala ng "boto" ang bawat validator para sa ilang partikular na block sa bawat round, at sa pagtatapos ng proseso, permanenteng pagkakasunduan ng lahat ng (matapat at online na) validator kung bahagi ba ng chain o hindi ang anumang ibinigay na block. Tandaan na puwede pa ring *magkakasamang i-chain* ang mga block; ang pangunahing pagkakaiba nito ay puwedeng magmula sa loob ng isang block ang consensus tungkol sa isang block, at hindi ito nakadepende sa haba o laki ng chain pagkatapos nito.

Para sa higit pang detalye, sumangguni sa [https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

Tingnan din ang:

* [Delegator](/docs/maintain/glossary#delegator)
* [Validator](/docs/maintain/glossary#validator)
