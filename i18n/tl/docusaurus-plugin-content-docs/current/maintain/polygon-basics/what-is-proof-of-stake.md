---
id: what-is-proof-of-stake
title: Ano ang Proof of Stake?
description: Alamin kung ano ang mekanismo ng pinagkasunduan ng Proof of Stake
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

# Ano ang Proof of Stake? {#what-is-proof-of-stake}

Ang Proof of Stake (PoS) ay isang kategorya ng mga algoritmo ng consensus para sa mga pampublikong blockchain na nakadepende sa ekonomikong [stake](/docs/maintain/glossary.md#staking) ng isang validator sa network.

Sa mga pampublikong blockchain na nakabatay sa proof of work (PoW), ginagantimpalaan ng algoritmo ang mga kalahok na lumulutas ng mga cryptographic puzzle upang mag-validate ng mga transaksyon at gumawa ng mga bagong block. Mga halimbawa ng blockchain ng PoW: Bitcoin, Ethereum (bago mag-merge).

Sa mga pampublikong blockchain na nakabatay sa PoS, isang set ng mga validator ang naghahalinhinan sa pagpapanukala at pagboto sa susunod na block. Ang bigat ng boto ng bawat validator ay nakadepende sa laki ng deposito nito—[stake](/docs/maintain/glossary.md#staking). Kasama sa mga makabuluhang kalamangan ng PoS ang seguridad, nabawasang panganib ng sentralisasyon, at pagka-episyente sa enerhiya. Mga halimbawa ng blockchain ng PoS: Ethereum 2.0, Polygon.

Sa pangkalahatan, ganito ang hitsura ng algoritmo ng PoS. Sinusubaybayan ng blockchain ang isang set ng mga validator, at sinumang humahawak ng base cryptocurrency ng blockchain (sa kaso ng Ethereum, ang ET) ay maaaring maging validator sa pamamagitan ng pagpapadala ng isang espesyal na uri ng transaksyon na nag-lock sa kanilang ETH sa isang deposito. Ang proseso ng paggawa at pagsang-ayon sa mga bagong block ay ginagawa naman sa pamamagitan ng algoritmo ng consensus na maaaring lahukan ng lahat ng kasalukuyang validator.

Maraming uri ng algorithm ng consensus, at maraming paraan para magtalaga ng mga gantimpala sa mga validator na nakikilahok sa algorithm ng consensus, kaya maraming "flavor" ng proof of stake. Mula sa isang algorithmic perspective, may dalawang pangunahing uri: chain-based PoS at [BFT-style PoS](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance).

Sa **proof of stake na nakabatay sa chain**, pseudo-random na pumipili ang algoritmo ng validator sa panahon ng bawat slot ng oras (hal. bawat tagal na 10 segundo ay maaaring isang slot ng oras), at nagtatalaga sa validator na iyon ng karapatan na gumawa ng iisang block, at dapat tumuro ang block na ito sa ilang nakaraang block (karaniwan ang block sa dulo ng dating pinakamahabang chain), at kaya sa paglipas ng panahon, karamihan ng mga block ay nagtatagpo sa iisang patuloy na lumalaking chain.

Sa **BFT-style Proof of Stake**, **sapalarang** itinalaga ng mga validator ang karapatang **magpanukala** ng mga block. Kasunduan kung saan ginagawa ang block sa pamamagitan ng isang multi-round na proseso kung saan nagpapadala ang bawat validator ng **Bumoto** para sa ilang partikular na block sa bawat round, at sa dulo ng proseso, ang lahat (honest at online) validator na permanenteng sumasang-ayon sa kung o hindi ang anumang ibinigay na block ay bahagi **ng** chain. Tandaan na maaaring **be** pa ang mga bloke. Ang mahalagang pagkakaiba ay ang pinagkasunduan sa isang block ay maaaring magkaron ng isang block, at hindi nakasalalay sa haba o laki ng chain pagkatapos nito.

Para sa karagdagang detalye, sumangguni sa [https://github.com/ethereum/wiki/Proof-of-Stake-FAQ](https://github.com/ethereum/wiki/wiki/Proof-of-Stake-FAQ).

## Tingnan din ang {#see-also}

* [Delegator](/docs/maintain/glossary.md#delegator)
* [Validator](/docs/maintain/glossary.md#validator)
