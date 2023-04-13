---
id: getting-started
title: Introduzione a Polygon PoS
sidebar_label: Quick Start
description: Costruisci la tua prossima blockchain app su Polygon.
keywords:
  - docs
  - matic
  - polygon
  - build on polygon
  - blockchain
  - introduction
  - how to launch dapp
  - dapps
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::caution Aggiornamento dei documenti per gli sviluppatori

I documenti vengono aggiornati, migliorati e perfezionati. Sono soggetti a modifiche. Non esitare a sollevare un problema o una richiesta di pull se hai domande o suggerimenti.

:::

Ti diamo il benvenuto in **Polygon (in precedenza, Matic Network)**! La piattaforma più innovativa ed entusiasmante per sviluppare la tua applicazione blockchain. La tecnologia blockchain è pronta a rivoluzionare il modo in cui il mondo digitale gestisce i dati e conduce gli affari. Puoi unirti a questa rivoluzione iniziando a sviluppare applicazioni decentralizzate (dApp) di Polygon.

Questa guida ti introdurrà all'ecosistema Polygon. Troverai link a preziose risorse e siti web che ti permetteranno di mantenerti aggiornato sullo sviluppo di Polygon, ma non solo, anche sull'evoluzione generale delle applicazioni blockchain.

:::tip Rimani informato

Resta al passo con gli ultimi aggiornamenti sul costruttore, grazie al lavoro del Polygon team e della community di Polygon iscrivendoti ai
[<ins>Gruppi di notifica Polygon</ins>](https://polygon.technology/notifications/).

:::

## Caratteristiche principali di Polygon {#key-features-of-polygon}

- **Velocità**: La Polygon Network utilizza una blockchain di alta portata con il consenso fornito da un gruppo di Block Producers selezionati dalle parti interessate in ogni checkpoint. Un layer Proof of Stake viene utilizzato per convalidare i blocchi e pubblicare periodicamente le prove dei produttori di blocchi sulla mainnet di Ethereum. In questo modo è possibile ottenere una velocità di conferma dei blocchi pari a circa 2 secondi, preservando al contempo un'elevata decentralizzazione, con il risultato di un eccellente throughput per la rete.
- **Scalabilità**: Polygon Network raggiunge una velocità di transazione ipotetica inferiore a 2 secondi su una singola sidechain. L'utilizzo di più sidechain aiuta la rete a gestire milioni di transazioni al secondo. Questo meccanismo (già dimostrato nella prima sidechain Matic) permette alla rete di Polygon la massima scalabilità.
- **Sicurezza**: gli smart contract di Polygons si basano sulla sicurezza di Ethereum. Per salvaguardare la rete, impiega tre modelli di sicurezza fondamentali. Utilizza i **contratti di staking di Ethereum** e un gruppo di validatori incentivati che eseguono nodi **Heimdall** e **Bor**. Gli sviluppatori possono anche implementare entrambi i modelli (Hybrid) nella loro dApp.

## Creare su Polygon {#building-on-polygon}

Se sei uno sviluppatore Ethereum, sei già uno sviluppatore Polygon. Basta passare all'[RPC Polygon](https://polygon-rpc.com/) e iniziare. Tutti gli strumenti che conosci sulla blockchain di Ethereum sono supportati di default su Polygon, come Truffle, Remix e Web3js.

Puoi distribuire le applicazioni decentralizzate sia su Polygon Mumbai Testnet che su Mainnet. La Testnet di Polygon Mumbai si collega alla Testnet di Ethereum Goërli, che funge da ParentChain. Puoi trovare tutti i dettagli relativi alla rete nella [documentazione di rete](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/network-details/network.md).

### Wallet {#wallets}

Per interagire con la rete di Polygon, devi possedere un wallet basato su Ethereum perché Polygon funziona sulla Ethereum Virtual Machine (EVM). Puoi scegliere di configurare un wallet [Metamask](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md) o [Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md). Maggiori informazioni sulle informazioni relative al wallet e perché ne hai bisogno sono disponibili nella nostra [documentazione del wallet](https://docs.polygon.technology/docs/develop/wallets/getting-started).

### Smart Contract {#smart-contracts}

Polygon supporta molti servizi che puoi utilizzare per testare, compilare, eseguire il debug e distribuire applicazioni decentralizzate sulla rete di Polygon. Questi includono l'utilizzo di [Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md), [Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md), [QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md), [Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md), [Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md), [Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md) e [Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md).

### Connessione a Polygon {#connecting-to-polygon}

Puoi aggiungere Polygon a Metamask o utilizzare direttamente Arkane, che ti permette di connetterti a Polygon utilizzando [RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/).

Per connettersi con la rete Polygon per leggere le informazioni della blockchain, consigliamo di utilizzare l'SDK di Alchemy.

```js
// Javascript
// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: "demo", // Can replace with your API Key from https://www.alchemy.com
  network: Network.MATIC_MAINNET, // Can replace with MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
```

### Vuoi creare una nuova dApp su Polygon? {#building-a-new-dapp-on-polygon}

Le applicazioni decentralizzate (dApp) fungono da ponte tra gli utenti e la privacy dei loro dati sulla blockchain. Il numero crescente di dApp certifica la loro utilità all'interno dell'ecosistema blockchain, utilizzando smart contract per risolvere problematiche come l'esecuzione di transazioni tra due partecipanti senza la necessità di un'autorità centrale.

Supponiamo che tu non abbia alcuna esperienza precedente nella creazione di applicazioni decentralizzate (dApp). In questo caso, le risorse di seguito ti daranno un vantaggio sugli strumenti necessari per costruire, eseguire il debug e distribuire le dApp sulla rete Polygon.

- [Full Stack dApp: serie di tutorial](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffle](https://docs.polygon.technology/docs/develop/truffle)
- [Metamask](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [Sviluppare una dApp utilizzando Fauna, Polygon e React](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### Hai già una dApp? {#already-have-a-dapp}

Se hai già un'applicazione decentralizzata (dApp) e stai cercando una piattaforma che ti aiuti a ottenere una scalabilità efficiente, allora sei nel posto giusto perché Polygon ti permette di:

1. **Migrare facilmente dalla catena basata sulla Ethereum Virtual Machine (EVM)**: Polygon è orgogliosa di essere la soluzione Layer-2 definitiva per la scalabilità di Ethereum. Non devi preoccuparti dell'architettura sottostante quando sposti o distribuisci le tue dApp sulla rete di Polygon, purché sia compatibile con l'EVM.
2. **Usare Polygon come layer di transazione più veloce**: distribuire la tua dApp su Polygon Mainnet ti permette di sfruttare Polygon come livello di transazione più veloce per la tua dApp. Inoltre, puoi ottenere i tuoi token mappati da noi. Puoi unirti al nostro [gruppo di discussione tecnica](http://bit.ly/matic-technical-group) su Telegram per scoprirne di più.

## Nota {#side-note}

Un bel po' di cose, vero? Puoi passare direttamente all'azione. Ecco alcune note prima di iniziare a immergerti nelle risorse, nei repository e nei documenti:

1. **Attenzione al costo di essere all'avanguardia**: come la tipica programmazione di nicchia, lo sviluppo di dApp e blockchain si muove molto rapidamente. Durante la ricerca, potresti trovare repository di codice complessi, 404 su un sito di documentazione o addirittura nessuna documentazione. Approfitta di questa opportunità per contattarci tramite qualsiasi canale di social media.
2. **La curva di apprendimento può essere scoraggiante, ma troverai grande supporto**: la comunità è molto aperta e accogliente! I progetti accolgono le richieste di pull da parte di esterni e risolvono attivamente qualsiasi intoppo. Stiamo lavorando per creare un mondo migliore e qualsiasi forma di contributo è apprezzata. Saremo grati di poterti coinvolgere in questo fantastico ecosistema Web3.

:::info Resta aggiornato

Lo sviluppo di applicazioni decentralizzate incoraggia la decentralizzazione della rete. Segui i nostri social media per ulteriori approfondimenti e aggiornamenti sull'ecosistema Polygon. Puoi trovare i link a tutte le comunità Polygon [qui](https://polygon.technology/community/).

:::
