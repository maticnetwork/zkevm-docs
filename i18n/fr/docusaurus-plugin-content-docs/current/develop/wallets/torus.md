---
id: torus
title: Torus
description: Torus est un système de gestion de clés non conservateurs pour dApps
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Torus est un système de gestion des clés convivial, sécurisé et non gardiens pour les applications décentralisées. Notre objectif est de fournir aux utilisateurs principaux une entrée vers l'écosystème décentralisé.

**Type**: Non gardien / HD<br/> **Stockage de clés privées**: stockage de navigateur local de l'utilisateur / crypté et stocké sur les serveurs Torus<br/> **Communication avec l'Ethereum Ledger** : Infura <br/>
**Encodage de clé privée**: Mnemonic / Social-Auth-login<br/>

Selon les besoins de votre application, Torus peut être intégré via le portefeuille Torus, ou en interagissant directement avec le réseau Torus via CustomAuth. Pour plus d'informations, consultez la [documentation Torus](https://docs.tor.us/).

## Intégration du portefeuille Torus {#torus-wallet-integration}

Si votre application est déjà compatible avec MetaMask ou tout autre fournisseur Web3, l'intégration du portefeuille Torus vous donnerait un fournisseur pour enveloppe la même interface Web3. Vous pouvez installer via un package npm. Pour plus de façons et d'informations approfondies, veuillez consulter la documentation officielle Torus sur [l'intégration du portefeuille](https://docs.tor.us/wallet/get-started).

### Installation {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### Exemple {#example}

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

## CustomAuth Integration {#customauth-integration}

Si vous cherchez à contrôler votre propre UX, de la connexion à chaque interaction, vous pouvez utiliser CustomAuth. Vous pouvez vous intégrer via l'un de leurs SDK selon la ou les plate-formes sur lesquelles vous construirez. Pour plus d'informations, veuillez visiter [l'intégration Torus CustomAuth](https://docs.tor.us/customauth/get-started).
