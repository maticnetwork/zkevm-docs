---
id: torus
title: Torus
description: Ang Torus ay isang non-custodial key management system para sa dApps
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Ang Torus ay isang user-friendly, secure, at non-custodial key management system para sa mga desentralisadong app. Nakatuon kami sa pagbibigay ng mga pangunahing user ng gateway sa desentralisadong ecosystem.

**Uri**: Non-custodial / HD<br/> **Pribadong Key Storage**: User’s ang local browser ng user at naka-imbak sa mga server ng Torus<br/> **Komunikasyon sa Ethereum Ledger**: Infura <br/>:
**Pribadong key encoding**: Mnemonic / Social-Auth-login<br/>

Depende sa mga kailangan ng application mo, maaaring isama ang Torus sa pamamagitan ng Torus Wallet, o sa pamamagitan ng pakikipag-ugnayan nang direkta sa Torus Network sa pamamagitan ng CustomAuth. Para sa karagdagang impormasyon, bisitahin ang [dokumentasyon](https://docs.tor.us/) ng Torus.

## Integration ng Torus Wallet {#torus-wallet-integration}

Kung magkatugma na ang iyong application sa MetaMask o anumang iba pang tagabigay ng Web3, ang pagsasama ng Torus Wallet ay bibigyan ka ng isang provider na magbalot ng parehong interface ng Web3. Maaari kang mag-install sa pamamagitan ng isang npm package. Para sa mas maraming paraan at malalim na impormasyon, mangyaring bisitahin ang opisyal na dokumentasyon ng Torus sa [wallet integration](https://docs.tor.us/wallet/get-started).

### Pag-install {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### Halimbawa {#example}

```js title="torus-example.js"
import Torus from "@toruslabs/torus-embed";
import Web3 from "web3";

const torus = new Torus({
  buttonPosition: "top-left" // default: bottom-left
});

await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mumbai", // default: mainnet
    chainId: 80001, // default: 1
    networkName: "Mumbai Test Network" // default: Main Ethereum Network
  },
  showTorusButton: false // default: true
});

await torus.login(); // await torus.ethereum.enable()
const web3 = new Web3(torus.provider);
```

## CustomAuth ang CustomAuth {#customauth-integration}

Kung naghahanap ka ng kontrolin ang sarili mong UX, mula sa pag-login sa bawat pakikipag-ugnayan, puwede mo nang gamitin ang CustomAuth. Maaari mong isama ang isa sa kanilang mga SDK depende sa (mga) platform na iyong itinatayo. Para sa karagdagang impormasyon, mangyaring bisitahin [ang pagsasama ng Torus CustomAuth](https://docs.tor.us/customauth/get-started).
