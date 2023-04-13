---
id: covalent
title: Paggamit ng Covalent
sidebar_label: Covalent
description: Alamin kung paano gamitin ang unified API ng Covalent para sa data
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## Panimula {#introduction}

Naghahatid ang Polygon ng napakalaking scale sa Ethereum gamit ang isang iniakmang bersyon ng Plasma
na may mga sidechain na nakabatay sa PoS na nagbibigay ng solusyon para sa mas mabibilis at
napakamurang transaksyon na may pagkapinal sa main chain. Tinitiyak ng Polygon network ang
kasiglahan gamit ang mga PoS checkpoint na itinutulak sa Ethereum mainchain.
Nagbibigay-daan ito sa iisang Polygon sidechain na teoretikal na makamit ang `2^16` na mga transaksyon
bawat block, at posibleng milyon-milyong transaksyon sa maraming chain sa hinaharap.

### Mga dapat malaman {#quick-facts}

<TableWrap>

| Property | Value |
|---|---|
| Polygon Mainnet chainId | `137` |
| Polygon Mumbai Testnet chainId | `80001` |
| Polygon Blockchain Explorer | https://polygonscan.com/ |
| Block time | ~3 segundo |
| Data refresh latency | ~6 segundo o 2 Block |

</TableWrap>

:::tip Mabilis na pagsisimula

Tingnan ang **[<ins>panimulang video na ito</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)**
para makapagsimula.

:::

## Mga sinusuportahang endpoint {#supported-endpoints}

Sinusuportahan ang lahat ng [__Class A__](https://www.covalenthq.com/docs/api/#tag--Class-A) endpoint para sa Matic mainnet at sa Mumbai testnet. Maaari mong i-query ang alinmang network sa pamamagitan ng unified API sa pamamagitan ng pagbabago sa `chainId`.

:::info Mga endpoint

Isang buong listahan ng lahat ng kahilingan na magagawa mo sa Polygon network gamit ang Covalent
ang magagamit sa [<ins>dokumentasyon ng Covalent API</ins>](https://www.covalenthq.com/docs/api/).

:::

---

## Appendix {#appendix}

### Matic Gas token {#matic-gas-token}

Para makipag-interaksyon sa Matic network, kailangang ibayad ang mga MATIC token bilang mga gas fee. Ang mga tugon ng Covalent
ay awtomatikong nagbabalik ng mga `gas_*` field sa mga yunit ng Matic.

### Pagmamapa ng token {#token-mapping}

Nagpapanatili ang Covalent ng on-chain na real-time na pagmamapa ng mga address ng token sa pagitan ng Ethereum mainnet at ng Matic chain. Ginagamit ang mga address na ito upang i-reverse-lookup ang mga presyo sa Matic at ibalik din ang mga tamang URL ng logo ng token.

Ilang halimbawa ng mga naimapang token:

| Token | Ethereum mainnet | Matic mainnet |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### Mga presyo ng token {#token-prices}

Para sa mga token na may pagmamapa pabalik sa Ethereum mainnet, magagawang ibalik ng Covalent ang mga naimapang presyo.
