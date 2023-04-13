---
id: responsibilities
title: Mga Responsibilidad
description: Ang mga responsibilidad ng pagiging validator sa Polygon Network
keywords:
  - docs
  - matic
  - polygon
  - validate
  - validator
  - responsibilities
slug: responsibilities
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Manatiling may alam

Keep ang pinakabagong update ng node at validator mula sa koponan ng Polygon at sa komunidad sa pamamagitan ng pag-subscribe sa mga [notification group](https://polygon.technology/notifications/) ng Polygon.

:::

Ang isang blockchain validator ay isang taong responsable para sa pagpapatunay ng mga transaksyon sa loob ng isang blockchain. Sa Polygon Network, maaaring maging qualified ang sinumang kalahok na maging validator ng Polygon sa pamamagitan ng pagpapatakbo ng **Validator Node (Sentry + Validator)** para kumita ng mga gantimpala at mangolekta ng mga bayad sa transaksyon. Para matiyak ang magandang partisipasyon ng mga validator, i-la-lock nila ang hindi bababa sa 1 MATIC token bilang stake sa ecosystem.

:::info

Sa kasalukuyan, may limitasyon ang 100 aktibong validators sa isang pagkakataon. Para sa isang detalyadong paglalarawan sa kung ano ang isang validator, tingnan ang [Validator](/maintain/validator/architecture).

Gayundin, pagkatapos ipatupad ang [<ins>panukala</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956) ng pamamahala ng PIP4 sa kontrata, dadagdagan ang minimum na halaga ng pag-stake sa 10,000 MATIC.

:::

Ang sinumang [validator](/maintain/glossary.md#validator) sa Polygon Network ay may mga sumusunod na responsibilidad:

* Mga operasyon ng technical node (awtomatikong ginagawa ng mga node)
* Mga Operasyon
  * Magpanatili ng mataas na uptime
  * I-check ang mga serbisyo at proseso ng node na may kaugnayan sa araw-araw
  * I-run ang pagsubaybay sa node
  * Panatilihin ang balanse ng ETH (sa pagitan ng 0.5 hanggang 1) sa signer address
* Pag-delegate
  * Maging bukas sa delegasyon
  * Ipaalam ang mga rate ng komisyon
* Komunikasyon
  * Ipaalam ang mga isyu
  * Magbigay ng feedback at mga mungkahi
* Kumita ng mga gantimpala sa pag-stake para mag-validate ng mga block sa blockchain

## Mga teknikal na operasyon ng node {#technical-node-operations}

**Awtomatikong ginagawa** ang mga sumusunod na technical node ng node:

* Pagpili ng block producer:
  * Pumili ng subset ng mga validator para sa block producer set para sa bawat [span](/docs/maintain/glossary.md#span)
  * Para sa bawat span, piliing muli ang block producer set sa [Heimdall](/maintain/glossary.md#heimdall) at regular na i-transmit ang impormasyon ng pagpili sa [Bor](/maintain/glossary.md#bor).
* Pag-validate ng mga block sa Bor:
  * Para sa isang set ng mga Bor sidechain block, malayang binabasa ng bawat validator ang data ng block para sa mga block na ito at vina-validate ang data sa Heimdall.
* Pagsusumite ng checkpoint:
  * Pipili ng isang [tagapanukala](/maintain/glossary.md#proposer) mula sa mga validator sa bawat Heimdall block. Ginagawa ng tagapanukala ng [checkpoint](/maintain/glossary.md#checkpoint-transaction) ang checkpoint ng data ng Bor block, vina-validate, at bino-broadcast ang nilagdaang transaksyon para payagan ng iba pang validator.
  * Kung higit sa 2/3 ng mga aktibong validator ang nagkaroon ng consensus sa checkpoint, isusumite ang checkpoint sa Ethereum mainnet.
* I-sync ang mga pagbabago sa mga kontrata sa pag-stake sa Polygon sa Ethereum:
  * Kasunod ng hakbang sa pagsusumite ng checkpoint, dahil isa itong external network call, posibleng nakumpirma o hindi ang transaksyon sa checkpoint sa Ethereum, o maaaring nakabinbin dahil sa mga isyu ng congestion sa Ethereum.
  * Sa kasong ito, may `ack/no-ack` na proseso na sinusunod para matiyak na naglalaman din ng snapshot ng mga nakaraang Bor block ang susunod na checkpoint. Halimbawa, kung ang checkpoint 1 ay para sa Bor blocks 1-256, at nabigo ito sa ilang dahilan, ang susunod na checkpoint 2 ay magiging para sa Bor blocks 1-512. Tingnan din ang [Arkitektura ng Heimdall: Checkpoint](/pos/heimdall/checkpoint).
* Pag-sync ng state mula sa Ethereum mainnet papunta sa Bor sidechain:
  * Puwedeng magpalipat-lipat ang state ng kontrata sa pagitan ng Ethereum at Polygon, partikular na sa pamamagitan ng [Bor](/maintain/glossary.md#bor):
  * Magko-call ng function ang isang DApp contract sa Ethereum sa isang espesyal na Polygon contract sa Ethereum.
  * Nire-relay ang kaukulang kaganapan sa Heimdall at pagkatapos ay sa Bor.
  * Isang transaksyon ng pag-sync ng state ang mako-call sa isang smart contract ng Polygon at makukuha ng DApp ang value sa Bor sa pamamagitan ng isang function call sa mismong Bor.
  * May ipinapatupad na kaparehong mekanismo para sa pagpapadala ng state mula sa Polygon papuntang Ethereum. Tingnan din ang [Mekanismo ng Pag-sync sa State](/docs/pos/state-sync/state-sync).

## Mga Operasyon {#operations}

### Panatilihin ang mataas na uptime {#maintain-high-uptime}

Ang uptime ng node sa Polygon Network ay batay sa bilang ng [mga transaksyon sa checkpoint](/docs/maintain/glossary.md#checkpoint-transaction) na nilagdaan ng validator node.

Tinatayang sa bawat 34 na minuto, nagsusumite ang isang tagapanukala ng isang transaksyon sa checkpoint sa Ethereum mainnet. Kailangang nilagdaan ang transaksyon ng checkpoint ng bawat [validator](/maintain/glossary.md#validator) sa Polygon Network. **Pagkabigong mag-sign ng isang transction ng checkpoint sa pagbaba ng pagganap ng validator node mo**.

Awtomatiko ang proseso ng paglagda ng mga transaksyon sa checkpoint. Para matiyak na nilalagdaan ng validator node mo ang lahat ng transaksyon sa checkpoint, dapat mong panatilihin at subaybayan ang kalusugan ng node mo.

### Tingnan ang mga serbisyo at proseso ng node araw-araw {#check-node-services-and-processes-daily}

Dapat mong suriin araw-araw ang mga serbisyo at proseso na nauugnay sa [Heimdall](/maintain/glossary.md#heimdall) at [Bor](/maintain/glossary.md#bor). Gayundin, dapat gawin nang regular ang pruning ng mga node para mabawasan ang paggamit ng disk.

### I-run ang pagsubaybay sa node {#run-node-monitoring}

Dapat mong i-run ang alinman sa:

* Mga Grafana Dashboard na ibinigay ng Polygon. Tingnan ang imbakan ng GitHub: [setup](https://github.com/vitwit/matic-jagar) ng Matic-Jagar
* O, gamitin ang sarili mong tool sa pagsubaybay para sa [validator](/maintain/glossary.md#validator) at [sentry](/maintain/glossary.md#sentry) node
* Dapat na sinusubaybayan ang endpoint ng Ethereum sa mga node para matiyak na nasa loob ng mga limitasyon ng request

### Panatilihin ang balance ng ETH {#keep-an-eth-balance}

Dapat mong mapanatili ang sapat na halaga ng ETH (dapat laging nasa paligid ng value ng threshold ibig sabihin, 0.5 hanggang 1) sa iyong validator [signer address](/maintain/glossary.md#signer-address) sa Ethereum Mainnet.

Kailangan mo ng ETH para:

* Lagdaan ang mga ipinanukalang [transaksyon sa checkpoint](/maintain/glossary.md#checkpoint-transaction) sa Ethereum mainnet.
* Magpanukala at magpadala ng mga transaksyon sa checkpoint sa Ethereum mainnet.

Ang hindi pagpapanatili ng sapat na halaga ng ETH sa signer address ay magreresulta sa:

* Mga pagkaantala sa pagsusumite ng checkpoint. Tandaan na puwedeng magpabago at tumaas ang mga presyo ng gas ng transaksyon sa Ethereum network.
* Mga pagkaantala sa finality ng mga transaksyon na kasama sa mga checkpoint.
* Mga pagkaantala sa mga susunod na transaksyon sa checkpoint.

## Pag-delegate {#delegation}

### Maging bukas para sa pag-delegate {#be-open-for-delegation}

Kailangang buksan ang lahat ng validator para sa delegasyon mula sa komunidad. May kakayahan ang bawat validator na itakda ang sarili nilang rate ng komisyon. Walang upper limit ang rate ng komisyon.

### Ipaalam ang mga rate ng komisyon {#communicate-commission-rates}

Ito ang moral na tungkulin ng mga validator na ipahayag ang mga rate ng komisyon at ang mga pagbabago ng rate ng komisyon sa komunidad. Ang mga pinipiling platform para ipaalam ang mga rate ng komisyon ay:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)

## Komunikasyon {#communication}

### Ipaalam ang mga isyu {#communicate-issues}

Nagsisiguro ang Communicating ng mga isyu nang maaga hangga't maaari ay can ang komunidad at ang koponan ng Polygon sa lalong madaling panahon. Ang mga pinipiling platform para ipaalam ang mga rate ng komisyon ay:

* [Discord](https://discord.com/invite/0xPolygon)
* [Forum](https://forum.polygon.technology/)
* [GitHub](https://github.com/maticnetwork)

### Magbigay ng feedback at mga mungkahi {#provide-feedback-and-suggestions}

Sa Polygon, binibigyang-halaga namin ang iyong feedback at mga mungkahi sa anumang aspeto ng validator ecosystem. [Forum](https://forum.polygon.technology/) ang piniling platform para magbigay ng mga feedback at mungkahi.
