---
id: getting-started
title: Ethereum↔Polygon Bridge
sidebar_label: Overview
description: Isang two-way na channel ng transaksyon sa pagitan ng Polygon at Ethereum.
keywords:
  - docs
  - polygon
  - polygon wiki
  - crosschain bridge
  - polygon
  - ethereum
  - fx portal
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Naghahatid sa iyo ang Polygon ng trustless na two-way na channel ng transaksyon sa pagitan ng Polygon at Ethereum sa pamamagitan ng pagpapakilala ng cross-chain bridge na may seguridad ng Plasma at PoS. Sa pamamagitan nito, maaaring maglipat ang mga user ng mga token sa buong Polygon nang hindi nagkakaroon ng mga third-party na panganib at mga limitasyon sa liquidity ng merkado. **Available ang Plasma at PoS Bridge sa parehong Mumbai Testnet pati na rin ang Polygon Mainnet**.

**Nagbibigay ang Polygon bridging mechanism na malapit na madali, low-cost, at medyo nababaluktot**. Gumagamit ang Polygon ng dual-consensus na arkitektura (Plasma + Proof-of-Stake (PoS) platform)
para mag-optimize para sa bilis at desentralisasyon. Sadya naming inarkitekto ang sistema upang suportahan ang mga arbitrary na transisyon ng kalagayan sa aming mga sidechain, na pinapagana ng EVM.

**Walang pagbabago sa umiikot na supply ng iyong token kapag tumatawid ito sa bridge**;

- Naka-lock ang mga Token na umalis sa network ng Ethereum at ang parehong bilang ng mga token ay are sa Polygon bilang isang pegged token (1:1).
- Para ilipat ang mga token pabalik sa ethereum network, binu-burn ang mga token sa Polygon network at ina-unlock sa ethereum network sa panahon ng proseso.

## PoS laban sa Plasma {#pos-vs-plasma}

|                                      | PoS Bridge (Inirerekomenda) | Plasma Bridge |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Maikling paglalarawan** | Naghahanap ang mga Developer ng DApp para sa kakayahang umangkop at mas mabilis na pag-withdraw sa seguridad ng system ng POS | Mga Developer ng DApp na naghahanap ng mga nadagdagang garantiya sa seguridad na may mekanismo ng paglabas sa Plasma\. |
| **Istruktura** | Lubhang flexible | Matibay, Hindi Gaanong Flexible |
| **Deposito\(Ethereum → Polygon\)** | 22-30 mins | 22-30 mins |
| **Pag-withdraw\(Polygon → Ethereum\)** | 1 checkpoint = ~ 30 mins to 6 hours | Tumawag sa proseso ng exit procedure sa kontrata ng Ethereum |
| **Seguridad** | Proof\-of\-Stake na sistema, na sine-secure ng isang matatag na set ng mga panlabas na validator\. | Ang mga kontrata sa Plasma ng Polygon ay nakikisakay sa seguridad ng Ethereum. |
| **Mga Pamantayang Suporta** | ETH, ERC20, ERC721, ERC1155 at Iba Pa | ETH, ERC20, ERC721 Lang |

:::info

Isa pang uri ng tulay ang [**FxPortal**](/develop/l1-l2-communication/fx-portal.md) na halos katulad ng PoS Bridge. Ibinabahagi nila ang parehong katangian na nabanggit para sa PoS sa mesa sa itaas. Ang tanging pagkakaiba lang ay hindi kailangang be ang mga Token sa FxPortal Bridge bago to Nangyayari ang pagmamapa sa unang transaksyon ng deposito na pinasimulan para sa isang ibinigay na token. Gayundin, maaaring gumawa ang sinuman ng paggamit ng FxPortal para magtayo ng kanilang sariling custom na lagusan / bridges sa tuktok ng Polygon bridge. Lubhang inirerekomenda na gamitin ang FxPortal para sa anumang kasong paggamit ng bridging. will ang mga bagong token ng token sa PoS at Plasma sa post-Jan 31st, 2023 upang ang proseso ng pagmamapa ay ganap na desentralisado at nababaluktot.

:::

## Mga Karagdagang Mapagkukunan {#additional-resources}

- [Panimula sa mga Bridge ng Blockchain](https://ethereum.org/en/bridges/)
- [Ano ang mga Cross-Chain Bridge](https://www.alchemy.com/overviews/cross-chain-bridges)
