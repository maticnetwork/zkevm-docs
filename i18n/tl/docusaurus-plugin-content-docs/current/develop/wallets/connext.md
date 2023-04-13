---
id: connext
title: Paglipat ng Crosschain gamit ang Connext
description: Buuin ang susunod mong blockchain app sa Polygon.
keywords:
  - docs
  - matic
  - connext
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Ang Connext ay ang crosschain liquidity network na nagpapagana ng mabilis, ganap na noncustodial na mga swap sa pagitan ng evm-compatible chain at Ethereum L2 system.

Ang Ethereum ay magiging multichain. Sa dumaraming pag-adopt ng evm-compatible na mga chain at L2, bagong hamon ang lumitaw sa pagkakahiwa-hiwalay ng liquidity sa loob ng ecosystem. Nilulutas ng Connext ang problemang ito sa pamamagitan ng pagkonekta ng mga discrete liquidity pool sa bawat chain sa pandaigdigang network, nang hindi nagpapakilala ng bago, makabuluhang pagsasaalang-alang sa tiwala para sa mga user. Maaaring gamitin ng mga developer ang liquidity na ito para bumuo ng bagong klase ng natively chain-agnostic na dApps sa Connext.

Sa mataas na antas, hinahayaan ng Connext ang mga user na i-swap ang assetA sa chainA para sa assetB sa chainB gamit ang mga kondisyonal na paglipat. Nangyayari ito sa ilang simpleng hakbang na:

Nagpadala si Alice, user ng Connext, ng kondisyonal na paglilipat ng mga assetA kay Bob.
Si Bob, ang tagapagbigay ng liquidity (aka router), ay nagpapadala ng katumbas na halaga ng assetB kay Alice.
I-unlock ni Alice ang kanyang kondisyonal na paglilipat para tumanggap ng assetB, na siya ring nagbibigay-daan kay Bob na gawin ang pareho.
Ang mga router ang bumubuo sa backbone ng aming network, na nagbibigay ng liquidity sa iba't ibang chain at kumikita ng mga bayarin para sa paggawa nito. Maaari kang matuto nang higit pa tungkol sa kung paano ito gumagana nang walang tiwala sa aming Protocol Primer.

Para i-setup ang mga paglilipat ng crosschain mula sa Ethereum Goerli Testnet sa Polygon Mumbai Testnet sa isang browser dApp mangyaring dumaan sa [gabay](https://docs.connext.network/quickstart-polygon-matic-integration) na ito.
