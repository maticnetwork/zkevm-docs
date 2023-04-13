---
id: checkpoint-mechanism
title: Mekanismo ng Checkpoint
sidebar_label: Checkpoints
description: I-checkpoint ang estado ng system sa Ethereum mainnet
keywords:
  - docs
  - matic
  - polygon
  - checkpoint
  - ethereum
  - mainnet
slug: checkpoint-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::info Ang Polygon ay hindi isang Layer 1 na platform.

Nakadepende ang Polygon sa Ethereum Mainnet bilang Layer 1 Settlement Layer nito. Lahat ng mechanics ng pag-stake ay kailangang naka-sync sa mga kontrata sa Ethereum mainnet.

:::

Ang mga [proposer](/docs/maintain/glossary.md#proposer) para sa isang checkpoint ay unang pinili sa pamamagitan [ng weighted round-robin algorithm ng Tendermint](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html). Isang karagdagang custom na pagsusuri ang ipinapatupad batay sa tagumpay ng pagsusumite ng checkpoint. Pinapayagan nito ang Polygon na humiwalay sa pagpili ng tagapanukala ng Tendermint at binibigyan ang Polygon ng mga kakayahan tulad ng pagpili ng tagapanukala kapag lang nagtagumpay ang transaksyon ng checkpoint sa Ethereum mainnet o pagsusumite ng transaksyon ng checkpoint para sa mga block na kabilang sa mga nakaraang nabigong checkpoint.

Ang matagumpay na pagsusumite ng checkpoint sa Tendermint ay isang 2-phase na proseso ng pag-commit:

* Ang isang tagapanukala, na pinili sa pamamagitan ng round-robin algorithm, ay nagpapadala ng checkpoint gamit ang address ng tagapanukala at ang Merkle hash sa patlang ng tagapanukala.
* Vina-validate ng lahat ng iba pang tagapanukala ang data sa field ng tagapanukala bago idagdag ang Merkle hash sa state ng mga ito.

Magpapadala naman ang susunod na tagapanukala ng transaksyon ng pagkilala para patunayan na nagtagumpay sa Ethereum mainnet ang nakaraang [transaksyon ng checkpoint](/docs/maintain/glossary.md#checkpoint-transaction). Nire-relay ang bawat pagbabago sa set ng validator sa mga validator node sa [Heimdall](/docs/maintain/glossary.md#heimdall) na naka-embed sa validator node. Binibigyang-daan nito ang Heimdall na manatiling naka-sync sa state ng kontrata sa Polygon sa Ethereum mainnet sa lahat ng oras.

Itinuturing na pinakapinagmumulan ng katotohanan ang naka-deploy na Polygon contract sa Ethereum mainnet, at dahil dito, isinasagawa ang lahat ng validation sa pamamagitan ng pagtatanong sa Ethereum mainnet contract.
