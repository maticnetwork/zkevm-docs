---
id: change-signer-address
title: Baguhin ang Iyong Signer Address
description: Baguhin ang signer address ng validator mo
keywords:
  - docs
  - matic
  - polygon
  - signer address
  - change
  - validator
slug: change-signer-address
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Para sa impormasyon kung ano ang [signer address](/docs/maintain/glossary.md#signer-address), tingnan ang
[Pamamahala ng Key](/docs/maintain/validator/core-components/key-management).

## Mga Prerequisite {#prerequisites}

Tiyaking ganap na naka-sync at tumatakbo ang iyong bagong validator node gamit ang bagong signer address.


## Baguhin ang signer address {#change-the-signer-address}

Ang gabay na ito ay tumutukoy sa iyong kasalukuyang validator node bilang Node 1 at iyong bagong validator node bilang Node 2.

1. Mag-log in sa [dashboard sa pag-stake](https://staking.polygon.technology/) gamit ang Node 1 address.
2. Sa profile mo, i-click ang **I-edit ang Profile**.
3. Sa field na **Address ng signer**, ilagay ang Node 2 address.
4. Sa field na **Pampublikong key ng signer**, ilagay ang pampublikong key ng Node 2.

   Para makuha ang pampublikong key, paganahin ang sumusunod na command sa validator node:

   ```sh
   heimdalld show-account
   ```

Kapag na-click ang **I-save**, mase-save ang mga bagong detalye mo para sa iyong node. Ibig sabihin nito, Node 1 ang magiging address mo na kokontrol sa stake, kung saan ipapadala ang mga reward, atbp. At Node 2 na ang magsasagawa ng mga aktibidad tulad ng pag-sign ng mga block, pag-sign ng mga checkpoint, atbp.
