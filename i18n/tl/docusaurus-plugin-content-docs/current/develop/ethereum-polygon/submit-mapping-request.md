---
id: submit-mapping-request
title: Mapping ng mga Token
description:  Isang gabay kung paano magmapa ang mga token sa pagitan ng Ethereum at Polygon Chains gamit ang PoS Bridge
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Kailangan ang Mapping para ilipat ang iyong mga ari-arian sa at mula sa Ethereum at Polygon PoS. Nag-aalok kami ng dalawang bridge upang gawin ang pareho. Higit pang mga detalye sa tulay ang maaaring intindihin [dito](/develop/ethereum-polygon/getting-started.md).

:::tip

Available ang tulay ng Polygon PoS para sa parehong Polygon Mainnet pati na rin ang Mumbai Testnet.

:::

## Mga hakbang upang magsumite ng kahilingan sa pagmamapa {#steps-to-submit-a-mapping-request}

Para mapa ang mga token sa pagitan ng Ethereum at Polygon PoS, maaari mong gamitin ang [Polygon Token Mapper](https://mapper.polygon.technology/). Buksan ang link at i-click ang pindutan ng Bagong **Token** ng Mapa sa kanang tuktok para to ng bagong kahilingan sa pagmamapa.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**Hakbang 1 →** Piliin ang network kung saan gusto mong mapa ang iyong token. Maaari kang pumili ng **Goerli-Mumbai** para sa Testnet, at **Ethereum-Polygon PoS** para sa Mainnet.

**Hakbang 2 →** Piliin ang uri ng token na iyong ginagapang - **ERC20**, **ERC721**, o **ERC1155**.

**Hakbang 3 →** Ipasok ang iyong Ethereum **/ Goerli** token address sa field ng **Ethereum Token Address** . Siguraduhing napatunayan ang iyong contract code ng token sa mga **Ethereum / Goerli** blockchain explorers.

**Hakbang 4 →** Matapos idagdag ang **Ethereum Token Address**, ang mga kaukulang field viz. Pangalan ng **Token, Token, Simbol, at Token Decimal** ay awtomatikong populated sa mga detalye ng kontrata.

**Hakbang 5 →** Ngayon, i-click ang pindutan ng **Mapping** ng Simulan para simulan ang proseso ng mapping Dahil kinasasangkutan nito ang isang transaksyon ng Ethereum, kakailanganin mong i-connect ang iyong wallet para magpatuloy.

**Hakbang 6 →** Ipapakita ka ng modal ng pagsusuri sa impormasyon ng token at ang tinatayang bayad ng gas para makumpleto ang to I-verify ang mga detalye at simulan ang transaksyon ng mapping sa pamamagitan ng pagpili ng pindutan ng **Pay Gas Fee To Map**

Matapos na kumpirmahin ang transaksyon mula sa iyong wallet, kailangan mong hintayin ang transaksyon para makumpleto ang Ethereum. Kapag natapos ang transaksyon, ipapakita mo ang success modal gamit ang token address ng iyong anak sa Polygon PoS network. Maaari mong patuloy na i-verify ang mapping sa pamamagitan ng pag-check sa nabuong child token address sa [Polygonscan](https://polygonscan.com/).

Para sa isang matagumpay na Mainnet mapping, maaari mong ibigay ang iyong mga detalye ng token [dito](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) na idadagdag sa [**Polygon Token List**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json).

:::tip

Sa kaso ng isang custom na [<ins>token mapping</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-), maaari mong bisitahin ang aming dokumentasyon ng [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) at gamitin ang impormasyong ibinigay para itayo ang iyong custom na pagpapatupad ng FX sa mga mapa token.

:::

## Gabay sa video {#video-guide}

Narito ang isang mabilis na tutorial ng video kung paano magmapa ang mga token sa pagitan ng **Ethereum Goerli ↔ Polygon Mumbai Testnet**:

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>Hindi sinusuportahan ng browser mo ang video element.</p>
</video>
