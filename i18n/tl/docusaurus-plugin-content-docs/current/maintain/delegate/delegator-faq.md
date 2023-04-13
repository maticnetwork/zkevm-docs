---
id: delegator-faq
title: Madalas Itanong tungkol sa Delegator
sidebar_label: Delegator FAQ
description: Mga FAQs na may kaugnayan sa Delegasyon sa Polygon network
keywords:
  - docs
  - polygon
  - how to delegate
  - validator
  - stake
  - faq
  - delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

### Ano ang URL ng Dashboard ng Pag-stake? {#what-is-the-staking-dashboard-url}

Ang staking dashboard URL ay https://staking.polygon.technology/.

### Ano ang Minimum na halaga ng stake? {#what-is-the-minimum-stake-amount}

Walang minimum na halaga ng stake para mag-delegate. Gayunpaman, maaari kang laging magsimula sa 1 MATIC token.

### Ilang reward ang makukuha ko kung magde-delegate ako? {#how-many-rewards-will-i-get-if-i-delegate}

Pakiusap gamitin ang [Staking Rewards Calculator](https://staking.polygon.technology/rewards-calculator) para matukoy ang iyong mga estima.

### Bakit napakatagal ng transaksyon ko? {#why-does-my-transaction-take-so-long}

Ginagawa ang lahat ng transaksyon sa pag-stake ng Polygon sa Ethereum para sa mga dahilang panseguridad.

Nakadepende sa mga gas fee na pinahintulutan mo ang tagal ng pagkumpleto ng isang transaksyon, pati na rin sa pagsisikip sa network ng Ethereum mainnet sa oras na iyon. Maaari mong laging gamitin ang opsyon na “Speed Up” para madagdagan ang mga bayad sa gas para sa ganito ay makumpleto ang iyong transaksyon.

### Alin-aling wallet ang kasalukuyang sinusuportahan? {#which-wallets-are-currently-supported}

Sa ngayon, Metamask extension lang sa browser ng desktop at Coinbase Wallet ang sinusuportahan. Bukod pa rito, maaari mong gamitin ang WalletConnect at Walletlink mula sa mga suportadong mobile wallet para makipag-ugnayan sa Staking UI dashboard sa desktop / laptop. Unti-unti kaming susuporta sa iba pang wallet sa lalong madaling panahon.

### Sinusuportahan ba ang mga hardware wallet? {#are-hardware-wallets-supported}

Oo, suportado ang mga hardware wallet. Maaari mong gamitin ang opsyong "Ikonekta ang Hardware Wallet" sa Metamask at ikonekta ang iyong Hardware wallet at pagkatapos ay ipagpatuloy ang proseso ng delegation.

### Bakit hindi ako makataya nang direkta mula sa Binance? {#why-can-t-i-stake-directly-from-binance}

Hindi pa sinusuportahan ang pagtaya sa pamamagitan ng Binance. Iaanunsyo kung susuportahan ito ng Binance at kung kailan.

### Nakumpleto ko na ang pag-delegate ko, saan ko puwedeng tingnan ang mga detalye? {#i-have-completed-my-delegation-where-can-i-check-details}

Kapag natapos mo ang iyong delegasyon, maghintay ka ng 12 block confirmation sa Ethereum (approx. 3-5 minuto), pagkatapos ay sa Dashboard, maaari mong i-click ang **Aking Account**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Saan ko puwedeng tingnan ang mga gantimpala ko? {#where-can-i-check-my-rewards}

Sa Dashboard, maaari mong i-click ang opsyon ng **Aking Account** sa kaliwang bahagi ng

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Kailangan ko ba ng ETH para bayaran ang mga Gas fee? {#do-i-need-eth-to-pay-for-gas-fees}

Oo. Dapat kang maglaan nang ~0.05-0.1 ETH para makasiguro.

### Kailangan ko bang magdeposito ng mga Matic token sa Polygon Mainnet network para sa pag-stake? {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

Hindi. Kailangang nasa Main Ethereum Network ang lahat ng iyong mga pondo.

### Bakit naka-disable ang button ko na Kumpirmhin nang sinubukan kong gawin ang transaksyon? {#when-i-try-to-do-the-transaction-my-confirm-button-is-disabled-why-so}

Pakitingnan kung may sapat kang ETH para sa mga gas fee.

### Kailan ipinapamahagi ang gantimpala? {#when-does-reward-get-distributed}

Ang mga reward ay ipinamamahagi sa tuwing may isinumite na checkpoint.

Sa kasalukuyan, ipinamamahagi ang 20188 MATIC token nang proporsyonado ang bawat matagumpay na pagsusumite ng checkpoint sa bawat delegator batay sa kanilang stake na kamag-anak sa pangkalahatang staking pool ng lahat ng validator at delegator. Gayundin, ang porsyento para sa reward na ibinahagi sa bawat delegator ay mag-iiba-iba sa bawat checkpoint depende sa relatibong stake ng delegator, validator at ng kabuuang stake.

(Tandaan na mayroong 10% na bonus ng nagmumungkahi na naiipon sa validator na nagsusumite ng checkpoint, ngunit sa paglipas ng panahon, ang epekto ng dagdag na bonus ay napapawalang-bisa sa maraming checkpoint ng iba't ibang validator.)

Isa sa mga validator ang nagsusumite ng checkpoint tuwing tinatayang 34 na minuto. Tinataya ang oras na ito at posibleng mag-iba-iba depende sa consensus ng validator sa Heimdall layer ng Polygon. Posible ring mag-iba-iba ito depende sa Ethereum Network. Ang mas mataas na pagsisikip sa network ay maaaring magresulta sa pagkaantala ng mga checkpoint.

Maaari mong subaybayan ang mga checkpoint sa staking contract [dito](https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287)

### Bakit patuloy na nababawasan ang gantimpala sa bawat checkpoint? {#why-does-reward-keep-getting-decreased-every-checkpoint}

Nakadepende ang mga aktwal na gantimpalang makukuha sa aktwal na kabuuang na-lock na supply sa network kada checkpoint. Inaasahang magiging malaki ang pagkakaiba-iba nito habang mas maraming MATIC token ang nala-lock sa mga kontrata ng pag-stake.

Tataas pa ang mga gantimpala sa simula, at patuloy na bababa habang tumataas ang % ng naka-lock na supply. Natutukoy sa bawat checkpoint ang pagbabagong ito sa naka-lock na supply, at kinakalkula ang mga gantimpala batay rito.

### Paano ko maki-claim ang mga gantimpala ko? {#how-can-i-claim-my-rewards}

Maaari mong i-claim ang iyong mga gantimpala agad sa pamamagitan ng pag-click sa **pindutan** ng Gantimpala ng Gantimpala. Ililipat nito ang mga gantimpalang naipon sa itinalaga mong account sa Metamask.

<div>
  <img src={useBaseUrl("/img/delegator-faq/withdraw-reward.png")} />
</div>

### Ano ang Unbonding period? {#what-is-the-unbonding-period}

Tinatayang 9 na araw na ngayon ang unbonding period sa Polygon. Ito ay dating 19 na araw. Nalalapat ang panahong ito sa orihinal na itinakda na halaga at muling itinakda na halaga - hindi ito nalalapat sa anumang gantimpala na hindi muling na-delegate.

### Patuloy ba akong makakatanggap ng mga reward pagkatapos kong mag-unbond? {#will-i-keep-receiving-rewards-after-i-unbond}

Hindi. Kapag nag-unbond, itigil mo ang pagtanggap ng mga gantimpala.

### Ilang transaksyon ang kailangan ng delegation? {#how-many-transactions-does-the-delegation-require}

Nangangailangan ang delegasyon ng 2 transaksyon, isa-isa pagkatapos ng isa. Isa para **i-approve** ang kahilingan at ang isa pa sa **mag-deposito**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/delegate.png")} />
</div>

### Ano ang ibig sabihin ng Mag-redelegate ng Mga Gantimpala? {#what-does-redelegate-rewards-mean}

Nangangahulugan lamang ang Redelegating ng iyong mga gantimpala na gusto mong dagdagan ang iyong stake sa pamamagitan ng pag-restake ng mga gantimpala na naipon mo.

### Puwede ba akong mag-stake sa kahit sinong validator? {#can-i-stake-to-any-validator}

Oo. Mga Polygon Foundation node sa ngayon ang lahat ng validator.

Gumagawa kami ng isang phased rollout ng Polygon mainnet. Sa ibang pagkakataon, unti-unti nang io-onboard ang mga external validator. Pakitingnan ang https://blog.matic.network/mainnet-is-going-live-announcing-the-launch-sequence/ para sa higit pang detalye.

### Anong browser ang compatible sa Dashboard ng Pag-stake? {#which-browser-is-compatible-with-staking-dashboard}

Chrome, Firefox, at Brave

### Na-stuck ang Metamask Ko sa pagkumpirma pagkatapos ng pag-login, ano ang gagawin ko? O walang nangyayari kapag sinusubukan kong mag-login? {#my-metamask-is-stuck-at-confirming-after-login-what-do-i-do-or-nothing-happens-when-i-try-to-login}

I-check ang mga sumusunod:

- Kung gumagamit ka ng Brave, i-off ang opsyon para sa Paggamit ng **Crypto Wallets** sa settings panel.
- Tingnan kung naka-log in ka sa Metamask
- Tingnan kung naka-log in ka sa Metamask gamit ang Trezor/Ledger. Kailangan mo ring paganahin ang pahintulot na tumawag sa mga kontrata sa iyong Ledger device, kung hindi pa naka-enable.
- I-check ang iyong system timestamp. Kung ang oras ng system ay hindi wasto, kakailanganin mong itama ito.

### Paano ako magpapadala ng mga pondo mula sa Binance o iba pang exchange sa Polygon wallet? {#how-do-i-send-funds-from-binance-or-other-exchanges-to-polygon-wallet}

Sa paraang teknikal. isa lang web application ang Suite/Staking interface ng Polygon Wallet. Kasalukuyan itong sumusuporta sa mga sumusunod na wallet - Metamask, WalletConnect, at WalletLink.

Una, dapat mong i-withdraw ang iyong mga pondo mula sa Binance o anumang iba pang palitan sa iyong Ethereum address sa Metamask Kung hindi mo alam kung paano gamitin ang Metamask, i-google muna ito. Maraming video at blog para makapagsimula rito.

### Kailan ako magiging validator at kung ilang token ang gagawin ko para doon? {#when-can-i-become-a-validator-and-how-many-tokens-do-i-for-that}

Puwede lang magkaroon ng validator spot ang isang user kapag natugunan na ang mga kondisyon sa ibaba:
1. Kapag nagpasiya ang isang validator na mag-unstake mula sa network, o
2. Maghintay para sa mekanismo ng auction at palitan ang hindi active na validator.

Nakadepende ang minumum na stake sa proseso ng auction kung saan mas mataas ang bid ng isang user kaysa sa isa pang user.

### Ano ang mangyayari kung nakakuha ako ng mga gantimpala habang nagde-delegate, at kung nagdagdag ako ng mga karagdagang pondo sa parehong validator node? {#if-i-have-earned-rewards-while-delegating-and-if-i-add-additional-funds-to-the-same-validator-node-what-happens}

Kung hindi ka muna nag-redelegate ng mga gantimpala mo bago mag-delegate ng mga karagdagang pondo sa parehong validator node, awtomatikong mawi-withdraw ang mga gantimpala mo.

Kung ayaw mo itong mangyari, mag-redelegate muna ng mga gantimpala mo bago mag-delegate ng mga karagdagang pondo.

### Na-delegate ko na ang mga token ko sa dashboard ng Pag-stake gamit ang Metamask. Kailangan ko bang panatilihing naka-on ang system o device ko? {#i-have-delegated-my-tokens-via-metamask-on-the-staking-dashboard-do-i-need-to-keep-my-system-or-device-on}

Hindi. Kapag nakumpirma ang iyong mga transaksyon sa Delegasyon, at makikita mo ang iyong mga token na makikita sa mga seksyon ng **Total Stake** at **Bagong** Gantimpala, tapos na kayo. Hindi na kailangang panatilihing naka-on ang system o device mo.

### Nag-unbond, hanggang kailan ito dadalhin sa Unbond? {#i-have-unbonded-how-long-will-it-take-to-unbond}

Kasalukuyang nakatakda sa 82 checkpoint ang unbonding period. Ito ay humigit-kumulang 9 na araw. Tumatagal nang humigit-kumulang 34 na minuto ang bawat checkpoint. Pero puwedeng maantala ang ilang checkpoint nang hanggang ~1 oras dahil sa pagsisikip sa Ethereum.

### Nag-unbond, at nakikita ko ngayon ang Claim Stake button, pero pinagana, bakit ganyan? {#i-have-unbonded-and-i-now-see-the-claim-stake-button-but-it-is-disabled-why-is-that}

Mae-enable lang ang Claim stake button kapag nakumpleto na ang unbonding period. Kasalukuyang nakatakda sa 82 checkpoint ang unbonding period.

### Malalaman ko ba kung kailan mae-enable ang Claim Stake button? {#do-i-know-when-will-the-claim-stake-button-be-enabled}

Oo, makikita mo sa ilalim ng Claim Stake button ang isang tala kung gaano karaming checkpoint ang nakabinbin bago ma-enable ang Claim Stake button. Tumatagal nang humigit-kumulang 30 minuto ang bawat checkpoint. Pero puwedeng maantala ang ilang checkpoint nang hanggang ~1 oras dahil sa pagsisikip sa Ethereum.

<div>
  <img src={useBaseUrl("/img/delegator-faq/unbond.png")} />
</div>

### Paano ko ililipat ang delegation ko mula sa mga Foundation Node papunta sa mga External node? {#how-do-i-switch-my-delegation-from-foundation-nodes-to-external-nodes}

Puwede mong ilipat ang Delegation mo gamit ang opsyon na **Move Stake** sa Staking UI. Ililipat nito ang Delegation mo mula sa Foundation node papunta sa anupamang external node na gusto mo.

<div align="center">
  <img src={useBaseUrl("/img/delegator-faq/move-stake.png")} width="500" />
</div>

Makikita mo ang isang listahan ng iba pang validator:

<div>
  <img src={useBaseUrl("/img/delegator-faq/validators.png")} />
</div>

### Magkakaroon ba ng anumang unbonding period kapag inilipat ko ang Delegation mula sa mga Foundation node papunta sa mga external node? {#will-there-be-any-ubonding-period-when-i-switch-delegation-from-foundation-nodes-to-external-nodes}

Hindi magkakaroon ng Unbonding period kapag inilipat mo ang Delegation mula sa mga foundation node papunta sa mga external node. Magiging isa itong direktang paglipat nang walang anumang pagkaantala. Pero kung nag-a-unbond ka mula sa isang Foundation Node o isang External node, magkakaroon ng Unbonding period para doon.

### Mayroon bang anumang kinakailangan sa pagpili ng external node habang naglilipat ng delegation? {#are-they-any-specifics-to-choose-an-external-node-during-switch-delegation}

Wala. Puwede kang pumili ng anumang node na gusto mo.

### Ano ang mangyayari sa mga naipon kong gantimpala kapag inilipat ko ang delegation mula sa Foundation papunta sa External node? {#what-happens-to-my-rewards-that-are-accumalated-if-i-switch-delegation-from-foundation-to-external-node}

Kung hindi mo pa na-claim ang mga gantimpala mo bago inilipat ang delegation, ililipat pabalik sa account mo ang mga Gantimpalang naipon mo hanggang sa matagumpay na mailipat ang delegation mo mula sa Foundation papunta sa External node.

### Gumagana ba ang delegation sa mga External Node na katulad ng sa mga Foundation Node? {#will-delegation-on-the-external-nodes-work-the-same-as-foundation-nodes}

Oo, gagana ito ng katulad ng Foundation node.

### Makakakuha pa ba ako ng mga gantimpala pagkatapos mag-delegate sa isang External Node? {#will-i-still-get-rewards-after-delegating-to-an-external-node}

Oo, ipapamahagi ang mga gantimpala gaya ng naunang tinalakay sa mga Foundation node. Magdudulot ng mga gantimpala ang bawat matagumpay na pagsusumite ng isang checkpoint. Ipapamahagi at kakalkulahin ang mga gantimpala sa bawat checkpoint batay sa stake ratio, gaya ng kasalukuyang ipinapatupad.

### Magkakaroon ba ng anumang unbonding period kapag nag-unbond ako mula sa isang External Node? {#will-there-be-any-unbonding-period-if-i-unbond-from-an-external-node}

Oo, mananatiling katulad ng kasalukuyang ipinapatupad ang unbonding period. 82 Checkpoint.

### Magkakaroon ba ng anumang locking period pagkatapos kong ilipat ang Delegation ko mula sa Foundation papunta sa External node? {#will-there-be-any-locking-period-after-i-switch-my-delegation-from-foundation-to-external-node}

Hindi. Hindi magkakaroon ng anumang locking period pagkatapos mong ilipat ang delegation mo.

### Puwede ko bang bahagyang ilipat ang delegation ko mula sa Foundation papunta sa mga External node? {#can-i-partially-switch-my-delegation-from-foundation-to-external-nodes}

Oo, magkakaroon ka ng opsyon na bahagyang ilipat ang stake mo mula sa Foundation node papunta sa isang External node. Mananatili sa Foundation node ang natitirang bahagyang stake. Puwede mo iyong ilipat sa isa pang node na pinili o sa parehong node.

### Puwede ko bang ilipat ang delegation mula sa isang external node papunta sa isa pang external node? {#can-i-switch-delegation-from-an-external-node-to-another-external-node}

Hindi, available lang ang opsyon na **Ilipat ang Stake** sa mga Foundation Node. Kung gusto mong ilipat ang delegation mo mula sa isang external node papunta sa isa pang external node, kakailanganin mo munang mag-unbond at pagkatapos ay mag-delegate sa isa pang external node.

### Kailan io-off ang mga Foundation node? {#when-will-the-foundations-node-be-turned-off}

Babalikan ang mga foundation node sa katapusan ng Enero, 2021.

### Magkakaroon ba ng anumang Foundation node sa hinaharap? {#will-there-be-any-foundation-nodes-in-the-future}

Hindi, hindi magkakaroon ng anumang foundation node sa hinaharap.

### Ilang transaksyon ang kailangan kong magbayad ng Gas kapag nagsasagawa ng Paglilipat ng Stake? {#how-many-transactions-do-i-need-to-pay-for-gas-when-i-do-a-move-stake}

Isang transaksyon lang ang Paglilipat ng Stake. Isasagawa ang lahat ng transaksyon sa Ethereum Blockchain kaya kakailanganin mo lang gumastos ng ilang ETH habang isinasagawa ang transaksyon sa Paglilipat ng Stake.
