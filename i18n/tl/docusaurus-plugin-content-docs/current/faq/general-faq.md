---
id: general-faq
title: Pangkalahatang FAQ
description: Mga karaniwang tanong sa Polygon network.
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Ano ang Polygon Network? {#what-is-polygon-network}

Ang Polygon Network ay isang Layer 2 na solusyon sa pag-scale na nakakamit ang scale sa pamamagitan ng paggamit ng mga sidechain para sa pagkukuwenta sa labas ng chain, habang tinitiyak ang seguridad ng asset at desentralisasyon sa pamamagitan ng mga Proof-of-Stake (POS) validator.

Tingnan din ang [Ano ang Polygon](/docs/home/polygon-basics/what-is-polygon).

## Ano ang Proof of Stake (PoS)? {#what-is-proof-of-stake-pos}

Ang Proof-of-Stake ay isang sistema kung saan ang blockchain network ay naglalayong makamit ang distributed consensus. Maaaring i-lock ng sinumang may sapat na halaga ng mga token ang kanilang mga cryptocurrencies at ang pang-ekonomiyang insentibo ay nakasalalay sa nakabahaging halaga ng desentralisadong network. Ang mga indibidwal na itinataya ang kanilang mga cryptocurrencies ay nagpapatunay ng mga transaksyon sa pamamagitan ng pagboto sa pareho habang ang consensus ay nakakamit kapag ang isang transaksyon o isang hanay ng mga transaksyon sa isang bloke o isang hanay ng mga bloke sa isang checkpoint ay nakatanggap ng sapat na mga boto. Ginagamit ng threshold ang timbang sa mga tuntunin ng stake na kasama ng bawat boto. Halimbawa, sa Polygon, ang pinagkasunduan ay nakakamit para sa paggawa ng mga checkpoint ng mga bloke ng Polygon sa Ethereum network, kapag hindi bababa sa ⅔ +1 ng kabuuang staking power ang bumoto para rito.

Tingnan din ang [Ano ang Proof of Stake](/docs/home/polygon-basics/what-is-proof-of-stake).

## Anong papel ang ginagampanan ng Proof-of-Stake sa arkitektura ng Polygon? {#what-role-does-proof-of-stake-play-in-the-polygon-architecture}

Ang Proof-of-Stake layer sa arkitektura ng Polygon ay nagsisilbi sa sumusunod na 2 layunin:

* Gumaganap bilang isang layer ng incentivization para sa pagpapanatili ng kasiglahan ng Plasma chain, higit sa lahat ay nagpapagaan sa mahirap na isyu ng pagkawala ng data.
* Ipinatutupad ang Proof-of-Stake na mga garantiya sa seguridad para sa mga transition ng estado na hindi sakop ng Plasma.

## Paano naiiba ang Polygon PoS sa iba pang katulad na mga sistema? {#how-is-polygon-pos-different-from-other-similar-systems}

Naiiba ito sa kahulugan na ito ay nagsisilbi ng dalawahang layunin — pagbibigay ng mga garantiya sa availability ng data para sa Plasma chain na sumasaklaw sa mga transition ng estado sa pamamagitan ng Plasma Predicates, pati na rin ang Proof-of-Stake validation para sa mga generic na smart contract sa EVM.

Pinaghihiwalay rin ng arkitektura ng Polygon ang proseso ng paggawa at pag-validate ng block sa 2 natatanging layer. Ang mga validator, habang ang mga block producer ay gumagawa ng mga block bilang pangalan, ay nagmumungkahi sa Polygon chain para sa mas mabilis na (< 2 secs) na bahagyang pagkumpirma habang ang panghuling kumpirmasyon ay makakamit kapag ang checkpoint ay ginawa sa pangunahing chain na may isang tiyak na agwat, na maaaring mag-iba ang panahon depende sa maraming salik tulad ng pagsisikip ng Ethereum o bilang ng mga transaksyon sa Polygon. Sa mainam na mga kondisyon, ito ay dapat na humigit-kumulang 15 min hanggang 1 oras.

Ang checkpoint ay karaniwang ang ugat ng Merkle ng lahat ng mga bloke na ginawa sa pagitan ng mga pagitan. Ang mga validator ay gumaganap ng maraming tungkulin, lumilikha ng mga bloke sa layer ng block producer, nakikilahok sa pinagkasunduan sa pamamagitan ng pagpirma sa lahat ng mga checkpoint at paggawa ng checkpoint kapag kumikilos bilang nagmumungkahi. Ang probabilidad ng isang validator na maging block producer o tagapanukala ay batay sa kanilang stake ratio sa pangkabuuang pool.

## Paghikayat sa tagapanukala na isama ang lahat ng lagda {#encouraging-the-proposer-to-include-all-signatures}

Upang lubos na mapakinabangan ang bonus ng nagmumungkahi, kailangang isama ng nagmumungkahi ang lahat ng mga lagda sa checkpoint. Dahil nagnanais ang protokol ng 2/3+1 na bigat ng kabuuang stake, tatanggapin ang checkpoint maging sa 80% na mga boto. Gayunpaman, sa kasong ito, ang tagapanukala ay nakakakuha lang ng 80% ng kinalkulang bonus.

## Paano ako makakapagtaas ng ticket ng suporta o makakapag-ambag sa dokumentasyon ng Polygon? {#how-can-i-raise-a-support-ticket-or-contribute-to-polygon-documentation}
Kung sa tingin mo ay may kailangang ayusin sa iyong dokumentasyon o gusto mo pang magdagdag ng bagong impormasyon dito, maaari kang [maghain ng isyu sa repository ng Github](https://github.com/maticnetwork/matic.js/issues). Ang [Readme file](https://github.com/maticnetwork/matic-docs/blob/master/README.md) sa repository ay nagbibigay rin sa iyo ng ilang mungkahi sa kung paano mag-ambag sa aming dokumentasyon.

Kung kailangan mo pa rin ng tulong, maaari ka palaging makipag-ugnayan **sa aming team ng suporta**.
