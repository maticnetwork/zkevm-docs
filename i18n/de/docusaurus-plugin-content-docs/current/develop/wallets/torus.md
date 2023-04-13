---
id: torus
title: Torus
description: Torus ist ein nicht verwahrtes non-custodial für dApps
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Torus ist ein benutzerfreundliches, sicheres und nicht verwahrtes non-custodial für dezentrale Apps. Unser Ziel ist es, regulären Kunden ein Gateway zum dezentralen Ökosystem anzubieten.

**Typ**: Nicht custodial / HD<br/> **Private Key Storage**: lokale browser des Benutzers / Verschlüsselt und auf User’s gespeichert<br/> **Kommunikation mit Ethereum Ledger**: Infura <br/>
**Private Key Encoding**: Mnemonic / Social-Auth-login<br/>

Je nach Ihren Anwendungsbedürfnissen kann Torus über das Torus Wallet integriert werden oder durch direkte Interaktion mit dem Torus Network über CustomAuth. Für weitere Informationen besuchen Sie die [Torus-Dokumentation](https://docs.tor.us/).

## Torus Wallet Integration {#torus-wallet-integration}

Wenn deine Anwendung bereits mit MetaMask oder anderen Web3-Anbietern kompatibel ist, würde dir die Integration der Torus Wallet einen Anbieter geben, um die gleiche Web3-Schnittstelle zu wickeln. Du kannst über ein npm Paket installieren. Für weitere Wege und ausführliche Informationen besuchen Sie bitte die offizielle Torus-Dokumentation zur [Wallet-Integration](https://docs.tor.us/wallet/get-started).

### Installation {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### Beispiel {#example}

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

Wenn du deine eigene UX kontrollieren möchtest, von der Anmeldung zu jeder Interaktion, dann kannst du use Du kannst über einen ihrer SDKs integrieren, abhängig von der Plattform, auf der du dich aufbaust. Für weitere Informationen besuchen Sie bitte [die Torus CustomAuth](https://docs.tor.us/customauth/get-started)
