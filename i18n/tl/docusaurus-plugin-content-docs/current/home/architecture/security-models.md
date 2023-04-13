---
id: security-models
title: Mga Model ng Seguridad
description: PoS, Plasma at Hybrid securities
keywords:
  - docs
  - matic
  - polygon
  - security
  - implementation
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Mga Model ng Seguridad {#security-models}

Nagbibigay ang Polygon ng tatlong uri ng mga modelo ng seguridad para sa isang developer para sa pagbuo ng kanilang dApps sa:

1. [Seguridad ng Proof of Stake](#proof-of-stake-security)
2. [Seguridad ng Plasma](#plasma-security)
3. [Hybrid (Plasma + PoS)](#hybrid)

Inilarawan namin ang bawat isa sa mga modelong security na ito na inaalok ng Polygon at ng developer na workflow para sa bawat may halimbawa na dApp sa ibaba.

## Seguridad ng Proof of Stake {#proof-of-stake-security}

Ang seguridad ng Patunay ng Stake (PoS) ay ibinigay ng Heimdall & Bor layer na itinayo sa itaas ng Tendermint. Naka-commit ang checkpoint sa root chain kung ⅔ ng mga validator ang nag-sign dito.

Para i-enable ang PoS mechanism sa aming platform, isang set ng mga kontrata sa pangangasiwa ng pag-stake ang ipinapadala sa Ethereum, pati na rin ang set ng mga validator na nabigyan ng incentive na nagpapatakbo ng mga node ng Heimdall at Bor. This nito ang mga sumusunod na tampok:

- Ang kakayahan ng sinuman na mag-stake ng mga MATIC token sa smart contract ng Ethereum at sumali sa system bilang Validator
- Kumita ng mga reward sa pag-stake para sa pag-validate ng mga transisyon ng state sa Polygon

Pinapadali rin ng POS mechanism ang paglutas sa problema ng hindi available na data sa aming mga sidechain kaugnay ng Plasma.

Mayroon kaming mabilis na finality layer na regular na nagpipinal ng kalagayan ng sidechain sa pamamagitan ng mga checkpoint. Tinutulungan kami ng mabilis na finality na patatagin ang kalagayan ng sidechain. May ilang validator at mas mabilis na block time na may mataas na throughput ang chain na compatible sa EVM. Pinipili nito ang kakayahang mai-scale kaysa sa mga antas ng desentralisasyon. Tinitiyak ng Heimdall na bulletproof ang pinal na kalagayan ng pag-commit at dumadaan sa malaking set ng validator; ibig sabihin, may mataas na desentralisasyon.

**Para sa mga developer**

Bilang pagbuo ng developer ng dApp sa seguridad ng PoS, simple ang pamamaraan ng pagkuha ng iyong smart contract at pag-deploy ito sa Polygon PoS network. Posible ito dahil sa arkitekturang nakabatay sa account na nag-e-enable ng sidechain na compatible sa EVM.

## Seguridad ng Plasma {#plasma-security}

Nagbibigay ang Polygon ng "Mga Garantiyang Plasma" na may paggalang sa iba't ibang sitwasyon ng pag-atake. May dalawang pangunahing sitwasyon na isinasaalang-alang:

- Ang chain operator (o sa Polygon, ang Heimdall layer) ay corrupt, o
- Na-corrupt ang user

Sa alinman sa kaso, kung nakompromiso ang mga asset ng isang user sa plasma chain, kailangan nilang simulan ang exiting. ng mass. Nagbibigay ang Polygon ng mga pagbubuo sa smart contract ng rootchain na puwedeng mapakinabangan. Para sa karagdagang detalye at teknikal na mga pagtutukoy tungkol sa konstruksiyon at pag-atake na mga vector na isinasaalang-alang, na babasahin [dito](https://ethresear.ch/t/account-based-plasma-morevp/5480).

Mabisa ang seguridad na ibinibigay ng mga kontrata ng Plasma ng Polygon dahil nakapatong ito sa seguridad ng Ethereum. Malalagay lang sa panganib ang mga pondo ng user kung bumagsak ang Ethereum. Sa simpleng salita, kasingligtas ng plasma chain ang mekanismo ng consensus ng main chain. Maaari itong extrapolated para sabihin na maaaring gamitin ng plasma chain ang talagang simpleng mekanismo ng consensus at maging ligtas pa rin.

**Para sa mga developer**

Bilang isang developer, kung nais mong bumuo sa Polygon na may garantiya ng seguridad ng Plasma, kinakailangan mong isulat ang mga custom na predicates para sa iyong mga smart contract. Ibig sabihin nito ang pagsulat ng mga panlabas na kontrata na humahawak sa mga kondisyon ng pagtatalo na itinakda sa lugar ng mga plasma ng Polygon.

## Hybrid {#hybrid}

Bukod sa purong seguridad ng Plasma at purong Proof of Stake na posible sa dApps na naka-deploy sa Polygon, mayroon ding isang Hybrid na diskarte na maaaring sundin ng mga developer - na nangangahulugan lamang na nagkakaroon ng parehong garantiya ang Plasma at Proof of Stake sa ilang partikular na workflow ng dApp.

Mas maintindihan ang diskarte na ito ng halimbawa.

Isaalang-alang ang isang dApp sa paglalaro na may isang set ng mga smart contract na naglalarawan sa lohika ng laro. Sabihin na nating ginagamit ng laro ang sarili nitong erc20 token para i-reward ang mga player. Ngayon, puwede nang direktang ipadala ang mga smart contract na tumutukoy sa logic ng laro sa sidechain ng Polygon - na gumagarantiya sa seguridad ng Proof of Stake sa mga kontrata habang puwedeng maging ligtas ang paglilipat ng erc20 token gamit ang mga garantiya ng Plasma na hindi madadaya at naka-embed sa mga kontrata ng root chain ng Polygon.
