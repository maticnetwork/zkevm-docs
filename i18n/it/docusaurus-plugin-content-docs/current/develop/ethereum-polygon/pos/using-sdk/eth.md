---
id: eth
title: Guida al deposito e prelievo di ETH
sidebar_label: ETH
description: "Depositare e prelevare token ETH sulla rete di Polygon."
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

Consultare la più recente [documentazione Matic.js su ETH](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/).

## Riepilogo rapido {#quick-summary}

Questa sezione dei documenti spiega come depositare e prelevare i token ERC20 sulla rete di Polygon. Esistono funzioni comuni tra le sezioni ETH, ERC20, ERC721 ed ERC1155 dei documenti, con differenze nella denominazione e nei modelli di implementazione, come consono per gli standard. Il prerequisito più importante per l'utilizzo di questa sezione dei documenti è la mappatura degli asset, quindi invia la tua richiesta di mappatura [qui](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/).

## Introduzione {#introduction}

Questa guida utilizza la Polygon Testnet (Mumbai), che di per sé è mappata sulla rete Goerli, per dimostrare il trasferimento di asset tra le due blockchain. È importante notare che, ai fini di questa esercitazione, è necessario utilizzare un indirizzo proxy ogni volta che sia possibile. Questo perché mentre l'indirizzo del contratto di implementazione può cambiare quando viene aggiunto un nuovo aggiornamento al codice del contratto, il proxy non cambia mai e reindirizza tutte le chiamate in entrata all'ultima implementazione. In sostanza, se si utilizza l'indirizzo proxy, non ci si dovrà preoccupare di eventuali modifiche al contratto di implementazione prima di essere pronti.

Ad esempio, usa `RootChainManagerProxy`l'indirizzo per le interazioni invece `RootChainManager`dell'indirizzo. I dettagli della distribuzione come gli indirizzi del contratto PoS, gli indirizzi di ABI e gli indirizzi Token di prova sono disponibili [qui](/docs/develop/ethereum-polygon/pos/deployment/).

La mappatura degli asset è un passo necessario per integrare il PoS bridge nell'applicazione; se non lo hai ancora fatto, invia una richiesta di mappatura [qui](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/). Ai fini di questa esercitazione, il team ha distribuito i token di prova e li ha mappati sul PoS bridge. Richiedi l'asset che desideri usare sul [faucet](https://faucet.polygon.technology/) e se i token di prova non sono disponibili, contatta il team su [Discord](https://discord.com/invite/0xPolygon). Faremo in modo di risponderti subito.

Nel prossimo tutorial, ogni passaggio sarà spiegato in dettaglio insieme ad alcuni snippet di codice. Tuttavia, puoi sempre fare riferimento a questo [repository](https://github.com/maticnetwork/matic.js/tree/master/examples) che contiene tutti gli **esempi di codice sorgente** che possono aiutare a integrare e comprendere il funzionamento del PoS bridge.

## Flusso di alto livello {#high-level-flow}

Depositare ETH -

1. Effettua la chiamata **_depositEtherFor_** su **_RootChainManager_** e **invia **l'ether richiesto.

Prelevare ETH -

1. **_Burn dei token_** sulla catena di Polygon.
2. Chiama la funzione **_exit_** su **_RootChainManager_** per inviare la transazione proof-of-burn. Questa chiamata può essere effettuata **_dopo l'invio del checkpoint_** per il blocco che contiene la transazione burn.

## Passaggi {#steps}

### Depositare {#deposit}

ETH può essere depositato sulla catena di Polygon chiamando **depositEtherFor** sul contratto **RootChainManager**. Il client Polygon PoS mostra il metodo **depositEther** per effettuare questa chiamata.

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
I depositi da Ethereum a Polygon si verificano utilizzando il Meccanismo **di Sincronizzazione di Stato** e questo richiede circa 22-30 minuti. Dopo aver aspettato questo intervallo di tempo, si consiglia di controllare il saldo utilizzando la libreria web3.js/matic.js o di utilizzare Metamask. L'explorer mostrerà il saldo solo se è avvenuto almeno un trasferimento di asset nella catena figlio. Questo [<ins>link</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/) spiega come tracciare gli eventi di deposito.
:::

### Burn {#burn}

ETH è depositato come token ERC20 sulla catena di Polygon. Il prelievo segue lo stesso processo di ritiro dei token ERC20.

Per bruciare i token e avviare il processo di recesso, chiamare la funzione di ritiro del contratto MaticWETH. Poiché Ether è un token **ERC20** sulla catena di Polygon, è necessario avviare il token ERC20 dal client Polygon PoS e quindi chiamare il `withdrawStart()`metodo per avviare il processo di masterizzazione.

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Memorizza l'hash della transazione per questa chiamata e utilizzalo durante la generazione della proof of burn.

### Exit {#exit}


Una volta che il **checkpoint** è stato presentato per il blocco che contiene la transazione di ustione, l'utente dovrebbe chiamare la funzione di **uscita** del `RootChainManager`contratto e presentare la prova di ustione. Al momento dell'invio, i token di prova validi vengono trasferiti all'utente. Il client Polygon POS `erc20` mostra il metodo `withdrawExit` per effettuare questa chiamata. Questa funzione può essere chiamata solo dopo che il checkpoint sia stato incluso nella catena principale. L'inclusione del checkpoint può essere tracciata seguendo questa [guida](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events).


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
