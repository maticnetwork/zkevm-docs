---
id: custom-tokens
title: I-configure ang mga Custom Token
description: I-configure ang mga custom na token sa Metamask.
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Ipinapakita ng pahinang ito ang proseso ng pag-configure / pagdaragdag ng mga custom na token sa Metamask

Maaari mong gamitin ang parehong proseso para magdagdag ng anumang custom na token sa anumang network sa Metamask. Maaari mong i-refer ang [mesa na ito](#tokens-and-contract-adresses) para i-visualize ang ilang halimbawa ng mga test token gamit ang kani-kanilang contract dress.

## Pagdaragdag ng isang custom na token sa iyong MetaMask account {#adding-a-custom-token-to-your-metamask-account}

Una, piliin ang naaangkop na network para sa bagong token sa home screen ng iyong Metamask Pagkatapos ay i-click ang "Import Tokens".

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

I-navigate ka nito sa isang bagong screen. Sa screen ng Import Tokens, i-copy-paste ang isang address sa field ng Token Address

:::info
Para mailarawan ang prosesong ito, gumagamit kami ng **isang** token ng ERC20-TESV4 sa G**oerli network.** Maghanap ng iba pang test token mula sa ibang network [<ins>dito</ins>](#tokens-and-contract-adresses).
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

Awtomatikong mapo-populate ang ibang mga field. I-click ang Idagdag ang mga Custom Token at pagkatapos ay i-click ang mga I-import ang mga Tokens. Ang `TEST`token ay dapat na ngayong ipakita sa iyong account sa Metamask.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**Pagdaragdag ng pagsubok na ERC1155 token sa iyong Metamask account**

Habang sinusuportahan ng Polygon network ang ERC1155, [hindi pa sinusuportahan ng Metamask ang pamantayan](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-). Inaasahan ang update na ito sa ikaapat na quarter ng 2021.

### Mga Token at Adress ng Kontrata {#tokens-and-contract-adresses}

| token | Network | Address Kontrata  |
|---------------|---------|----------------------------------------------|
| ERC20-TESV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TESV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TESV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |