---
id: mintable-assets
title: Mga Nami-mint na Asset ng Polygon
description: Mint at lumikha ng mga asset sa Polygon network gamit ang Fx-Portal.
keywords:
  - docs
  - polygon wiki
  - polygon
  - mintable assets
  - mint
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Maaaring ilipat ang mga asset papunta at galing sa buong Ethereum at Polygon chain gamit ang PoS bridge. Kasama sa mga asset na ito ang ERC20, ERC721, ERC1155 at maraming iba pang pamantayan ng token. Karamihan ng mga asset ay umiiral na sa Ethereum chain. Ngunit maaari ding gumawa ng mga bagong asset sa Polygon chain at ilipat pabalik sa Ethereum chain ayon sa at kapag kinakailangan. Makapag-save ito ng maraming gas at oras na ginugol sa minting ng token sa Ethereum.

Ang paggawa ng mga asset sa Polygon chain ay higit na mas madali at isang mas inirerekomendang pamamaraan. **Maaaring ilipat ang mga asset na ito sa Ethereum chain kapag kinakailangan**. Ang ganitong uri ng mga asset ay tinatawag na **mintable** asset ng Polygon.

Sa kaso ng mga Minimum na token ng Polygon, nilikha ang mga asset sa Polygon network. Kapag kailangang ilipat sa Ethereum ang isang na-mint na asset ng Polygon, kailangan munang i-burn ang asset at pagkatapos ay kailangang isumite sa Ethereum chain ang isang proof ng transaksyon ng pag-burn na ito. Ang inirerekomendang paraan para gamitin ang mga kakayahan ng Polygon Mintable token ay sa pamamagitan ng paggamit ng [fx-portal](/develop/l1-l2-communication/fx-portal.md).
