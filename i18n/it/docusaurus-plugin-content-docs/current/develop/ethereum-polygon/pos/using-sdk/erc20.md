---
id: erc20
title: Guida al deposito e prelievo di ERC20
sidebar_label: ERC20
description: "Depositare e prelevare token ERC20 sulla rete di Polygon."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Consulta la più recente [documentazione Matic.js su ERC20](https://maticnetwork.github.io/matic.js/docs/pos/erc20/).

Questo tutorial utilizza la Polygon Testnet ( Mumbai ) che è mappata sulla rete Goerli per dimostrare il trasferimento di asset da e verso le due blockchain. Una **cosa importante da notare** mentre si segue questo tutorial è che si dovrebbe sempre usare un indirizzo proxy ogni volta che sia disponibile. Ad esempio, l'indirizzo **RootChainManagerProxy** deve essere utilizzato per l'interazione invece dell'indirizzo **RootChainManager.** Gli indirizzi dei contratti **PoS, l'ABI, gli indirizzi dei token di prova** e altri dettagli sulla distribuzione dei contratti bridge PoS sono disponibili [qui](/docs/develop/ethereum-polygon/pos/deployment).

**La mappatura degli asset** è necessaria per integrare il PoS bridge nell'applicazione. Puoi inviare una richiesta di mappatura [qui](/docs/develop/ethereum-polygon/submit-mapping-request). Ma per questo tutorial, abbiamo già distribuito i **token di Test** e li mappò sul ponte PoS. Potrebbero essere necessari per provare il tutorial. Puoi richiedere l'asset desiderato dal [faucet](https://faucet.polygon.technology/). Se i token di prova non sono disponibili sul rubinetto, raggiungici in [discordia](https://discord.com/invite/0xPolygonn).

Nel prossimo tutorial, ogni passaggio sarà spiegato in dettaglio insieme ad alcuni snippet di codice. Tuttavia, puoi sempre fare riferimento a questo [repository](https://github.com/maticnetwork/matic.js/tree/master/examples/pos) che contiene tutti gli **esempi di codice sorgente** che possono aiutare a integrare e comprendere il funzionamento del PoS bridge.

## Flusso di alto livello {#high-level-flow}

Depositare ERC20 -

1. **_Approva il contratto_** **_ERC20Predicate_** per spendere i token che devono essere depositati.
2. Effettua la chiamata **_depositFor_** su **_RootChainManager_**.

Prelevare ERC20 -

1. Brucia i token sulla catena di Polygon.
2. Chiamare la `exit()`funzione `RootChainManager`per presentare la prova della transazione di ustione. Questa chiamata può essere effettuata dopo che il checkpoint è inviato per il blocco che contiene la transazione di ustione.

## Dettagli delle fasi {#steps-details}

### Approvare {#approve}

Si tratta di una normale approvazione ERC20 in modo che **_ERC20Predicate_** possa chiamare la funzione **_transferFrom_**. Il client Polygon POS mostra il metodo **_approve_** per effettuare questa chiamata.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### deposit {#deposit}

Nota che il token deve essere mappato e approvato per il trasferimento in anticipo. Il client Polygon PoS espone il `deposit()`metodo per effettuare questa chiamata.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);

  //deposit 100 to user address
  const result = await erc20Token.deposit(100, <user address>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();

}
```

:::note
I depositi da Ethereum a Polygon si verificano utilizzando un meccanismo di **sincronizzazione dello Stato** e impiegano circa 22-30 minuti. Dopo aver aspettato questo intervallo di tempo, si consiglia di controllare il saldo utilizzando la libreria web3.js/matic.js o di utilizzare Metamask. L'explorer mostrerà il saldo solo se è avvenuto almeno un trasferimento di asset nella catena figlio. Questo [<ins>link</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos) spiega come tracciare gli eventi di deposito.
:::

### Metodo WithdrawStart per il burn {#withdrawstart-method-to-burn}

Il `withdrawStart()`metodo può essere utilizzato per avviare il processo di prelievo che brucia la quantità specificata sulla catena di Polygon.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20Token = posClient.erc20(<child token address>);

  // start withdraw process for 100 amount
  const result = await erc20Token.withdrawStart(100);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```

Memorizza l'hash della transazione per questa chiamata e utilizzalo durante la generazione della proof of burn.

### Exit {#exit}

Una volta che il checkpoint è stato presentato per il blocco che contiene la transazione di ustione, l'utente dovrebbe chiamare la `exit()`funzione del `RootChainManager`contratto e presentare la prova di ustione. Dopo aver inviato una prova valida, i token vengono trasferiti all'utente. Il client Polygon PoS espone il `withdrawExit`metodo per effettuare questa chiamata. Questa funzione può essere chiamata solo dopo che il checkpoint sia stato incluso nella catena principale. L'inclusione del checkpoint può essere tracciata seguendo [questa guida](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events).

Il metodo *withdrawExit* può essere utilizzato per uscire dal processo di prelievo usando il txHash dal metodo *withdrawStart*.

:::note
La transazione prelievo deve essere verificata per uscire dal prelievo.
:::

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>, true);
  const result = await erc20Token.withdrawExit(<burn tx hash>);
  const txHash = await result.getTransactionHash();
  const txReceipt = await result.getReceipt();
}
```
