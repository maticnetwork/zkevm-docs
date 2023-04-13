---
id: move-stake
title: Paglipat ng Stake
description: Paglilipat ng iyong stake sa network ng polygon
keywords:
  - docs
  - polygon
  - matic
  - stake
  - move stake
  - validator
  - delegator
slug: move-stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Paglilipat ng Stake mula sa mga Foundation node papunta sa External Node {#moving-stake-from-foundation-nodes-to-external-nodes}

<video loop autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/staking/MoveStakeDemo.mp4"></source>
  <source type="video/quicktime" src="/img/staking/MoveStakeDemo.mov"></source>
  <p>Hindi sinusuportahan ng browser mo ang video element.</p>
</video>

Binibigyan na ngayon ng opsyon ang mga delegator na ilipat ang kanilang stake mula sa mga Foundation node papunta sa anumang External node na kanilang pinili sa pamamagitan ng paggamit ng Move Stake functionality sa Staking UI

Isang transaksyon lang ang paglilipat ng Stake mula sa foundation node papunta sa external node. Kaya walang delay o unbonding period habang nasa event na ito.

Pakitandaan na pinapayagan lang ang Paglilipat ng Stake mula sa Foundation node papunta sa External node. Kung gusto mong ilipat ang stake mo mula sa isang External node papunta sa isa pang External node, kailangan mo munang I-unbond at pagkatapos ay I-delegate ito sa bagong external na node.

Isa ring pansamantalang function ang Paglipat ng Stake na binuo ng Polygon team para matiyak ang maayos na paglilipat ng mga pondo mula sa mga Foundation node papunta sa External. At mananatili lang itong active hanggang sa i-off ang mga foundation node.

## Paano Maglipat ng Stake {#how-to-move-stake}

Para Ilipat ang stake, kakailanganin mo munang mag-login sa [Staking UI](https://wallet.polygon.technology/staking) gamit ang iyong Delegator Address.

**Address** ng delegator : Ang address na ginamit mo na para sa Staking sa Foundation Nodes.

Kapag nag-log in, makikita mo ang isang listahan ng mga Validator.

<img src={useBaseUrl("img/staking/validator-list.png")} />

Pumunta ngayon sa Profile ng Delegator mo sa pamamagitan ng pag-click sa pindutan ng **Detalye** ng Ipakita Delegator o sa **mga Detalye ng Aking Delegator** sa kaliwa.

<img src={useBaseUrl("img/staking/show-delegator-details.png")} />

Dito makikita ang isang bagong button na tinatawag na **Move Stake**.

<img src={useBaseUrl("img/staking/move-stake-button.png")} />

Sa pag-click sa button na iyon, ina-navigate ka sa isang page na may listahan ng mga validator kung kanino ka puwedeng Mag-deligate. Puwede kang mag-delegate sa kahit sinong Validator na nasa listahang ito.

<img src={useBaseUrl("img/staking/move-stake-validator.png")} />

Ngayon pagkatapos ng pagpili ng iyong validator na gusto mong i-delegate sa, i-click ang **delegate Dito** button. Ang pag-click sa pindutan na iyon ay magbubukas ng isang popup popup.

<img src={useBaseUrl("img/staking/stake-funds.png")} />

Dito makikita ang **isang field** ng Halaga na awtomatikong papulahin nang buong halaga para sa Delegasyon. Puwede ka ring gumamit ng bahagyang halaga para i-deligate sa isang validator.

Halimbawa, kung nag-delegate ka ng 100 Matic token sa Foundation Node 1 at gusto mo na ngayong ilipat ang stake mo mula sa foundation node papunta sa isang external node, puwede kang mag-delegate ng bahagyang halaga sa external node na pinili mo, gaya ng 50 Matic token. Mananatili sa Foundation node 1 ang matitira sa 50 Matic token. Pagkatapos ay puwede mong piliing i-delegate ang natitira sa 50 token sa isa pang external node o sa parehong external node.

Kapag nakapasok ka na sa halaga ay maaari mo nang i-click ang pindutan ng **Stake Funds**. Hihingi ito ng kumpirmasyon sa Metamask mo para lagdaan ang address.

Kapag nalagdaan mo na ang transaksyon, matagumpay na maililipat ang stake mo mula sa Foundation node papunta sa External node. Pero kakailanganin mong maghintay ng 12 pagkumpirma ng block para lumabas ito sa Staking UI. Kung hindi lumabas ang mga inilapat mong pondo pagkatapos ng 12 pagkumpirma ng block, subukang i-refresh ang page nang isang beses para makita ang mga na-update na stake.

Kung mayroon kang anumang tanong o isyu, magsumite ng ticket [dito](https://support.polygon.technology/support/home).
