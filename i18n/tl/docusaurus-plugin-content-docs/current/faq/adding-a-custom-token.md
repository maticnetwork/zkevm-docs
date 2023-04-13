---
id: adding-a-custom-token
title: Pagdaragdag ng Custom na Token
sidebar_label: Adding a Custom Token
description: Buuin ang susunod mong blockchain app sa Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Ang feature na **Magdagdag ng Custom na Token** ay nagpapahintulot sa iyo na magdagdag ng anumang token nang tahasan at gamitin ito kasama ng Polygon Wallet Suite. Kailangan mo lang hanapin ang token ayon sa address ng kontrata nito, root man o child:

* Ang **root** ay ang kontrata ng token sa Ethereum
* Ang **child** ay ang kontrata sa Polygon

### Paano ko hahanapin ang kontrata ng token? {#how-do-i-find-the-token-contract}

Maaari mong hanapin ang token ayon sa pangalan nito sa alinman sa [Coingecko](http://coingecko.com) o [Coinmarketcap](https://coinmarketcap.com/) kung saan makikita mo ang address nito sa Ethereum chain (para sa ERC 20 token) at iba pang sinusuportahang kasunod na mga chain tulad ng Polygon. Maaaring hindi na-update ang token address sa ibang mga chain ngunit tiyak na magagamit mo ang root address para sa lahat ng layunin.

Kaya kapag pumipili ng token, makakapaghanap ka sa pamamagitan ng:
* simbolo ng token
* pangalan ng token
* kontrata

Narito kung paano ito gumagana:

1. Madaling magdagdag ng anumang token sa iyong listahan sa pamamagitan ng pagdaragdag ng address ng kontrata bilang custom na token (sinusuportahan namin

ang mga address ng kontrata sa parehong Polygon o Ethereum):

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. Sa sandaling makuha ang impormasyon ng token, makakakita ka ng screen ng kumpirmasyon kasama ang lahat ng impormasyon ng token. Pagkatapos ay maaari mo itong idagdag bilang custom na token na lokal na maiimbak sa iyong system. Iminumungkahi namin na muling i-verify mo ang mga kontrata ng token nang dalawang beses dahil maraming clone o scam token:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. Ang iyong idinagdag na token ay ipinapakita na ngayon kapag pumipili ng isang token:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

Maaari ka ring magdagdag ng isang token nang direkta mula sa token tab ng **Manage** screen:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>