---
id: torus
title: Torus
description: Torus è un sistema di gestione delle chiavi non custodial per le dApps
keywords:
  - wiki
  - polygon
  - torus
  - wallet
  - guide
  - dApp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Torus è un sistema di gestione delle chiavi per le app decentralizzate, user-friendly, sicuro e non custodiale. Il nostro obiettivo è fornire agli utenti tradizionali una porta d'accesso all'ecosistema decentralizzato.

**Tipo**: Non custodial / HD<br/> **Storaggio delle chiavi private**: lo storage del browser locale dell'utente / crittografato e memorizzato su server Torus<br/> **Comunicazione con il ledger di Ethereum**: Infura <br/>
**encoding di chiavi private**: Mnemonic / Social-Auth-login<br/>

A seconda delle vostre esigenze di applicazione, Torus può essere integrato tramite il Portafoglio di Torus o interagendo direttamente con la rete Torus tramite CustomAuth. Per ulteriori informazioni, visita la [documentazione di Torus](https://docs.tor.us/).

## Integrazione del portafoglio Torus {#torus-wallet-integration}

Se la tua applicazione è già compatibile con MetaMask o con qualsiasi altro provider Web3, l'integrazione del Portafoglio Torus ti darà un provider per avvolgere la stessa interfaccia Web3. Puoi installare tramite un pacchetto npm Per ulteriori modi e informazioni approfondite, visita la documentazione ufficiale di Torus [sull'integrazione dei wallet](https://docs.tor.us/wallet/get-started).

### Installazione {#installation}

```bash
npm i --save @toruslabs/torus-embed
```

### Esempio {#example}

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

## Integrazione CustomAuth {#customauth-integration}

Se stai cercando di controllare la tua UX, dal login a ogni interazione, puoi usare CustomAuth. Puoi integrarti tramite una delle loro SDK a seconda delle piattaforme su cui stai costruendo. Per maggiori informazioni, visita [l'integrazione di Torus CustomAuth](https://docs.tor.us/customauth/get-started).
