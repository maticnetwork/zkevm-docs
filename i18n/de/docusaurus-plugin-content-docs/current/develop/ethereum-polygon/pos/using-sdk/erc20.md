---
id: erc20
title: ERC20 Ein- und Auszahlungsleitfaden
sidebar_label: ERC20
description: "Ein- und Auszahlungen von ERC20-Token im Polygon-Netzwerk."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

Lies die aktuelle [Matic.js-Dokumentation auf ERC20](https://maticnetwork.github.io/matic.js/docs/pos/erc20/).

In diesem Leitfaden wird das Polygon Testnet (Mumbai) verwendet, das mit dem Goerli-Netzwerk gemappt ist, um die Übertragung der Assets auf und von den beiden Blockchains zu zeigen. **Beachte bitte**, dass du beim Befolgen dieses Tutorials immer eine Proxy-Adresse verwenden solltest, sofern diese zur Verfügung steht. Die **RootChainManagerProxy**-Adresse muss zum Beispiel für die Interaktion anstelle der **RootChainManager-Adresse** verwendet werden. Die **PoS-Vertragsadressen, ABI, Test-Token-Adressen** und andere Bereitstellungsdaten der PoS-Bridge findest [du hier](/docs/develop/ethereum-polygon/pos/deployment).

**Das Mapping deiner Assets** ist notwendig, um die PoS-Bridge in deine App zu integrieren. [Hier](/docs/develop/ethereum-polygon/submit-mapping-request) kannst du eine Mapping-Anfrage einreichen. Aber für die Zwecke dieses Tutorials haben wir die **Test-Token** bereits bereitgestellt und auf der PoS-Bridge zugeordnet. Du musst den Leitfaden wahrscheinlich selbst ausprobieren. Das gewünschte Asset kannst du aus dem [Faucet](https://faucet.polygon.technology/) anfordern. Wenn die Test-Token auf dem Wasserhahn nicht verfügbar sind, erreichen Sie uns auf [Discord](https://discord.com/invite/0xPolygonn).

In diesem Leitfaden wird jeder Schritt erklärt und mit einigen Code-Snippets illustriert. Du kannst immer auf dieses [Repository](https://github.com/maticnetwork/matic.js/tree/master/examples/pos) zugreifen, das den gesamten **Beispielsquellcode** enthält, der dir dabei hilft, die PoS-Bridge zu integrieren und zu verstehen.

## High-Level-Flow {#high-level-flow}

ERC20 einzahlen -

1. **_Genehmige_** den **_ERC20Predicate_**-Vertrag, um die Token, die eingezahlt werden müssen, auszugeben.
2. Starte einen **_depositFor_**-Call im **_RootChainManager_**.

ERC20 auszahlen -

1. Blende Token auf der Polygon Chain an.
2. Ruf die `exit()`Funktion auf, `RootChainManager`um den Nachweis der Burn-Transaktion zu übermitteln. Dieser Aufruf kann gemacht werden, nachdem der Checkpoint für den Block eingereicht wurde, der die Burn-Transaktion enthält.

## Schritte Details {#steps-details}

### Genehmigen {#approve}

Das ist eine normale ERC20-Genehmigung, damit **_ERC20Predicate_** die **_transferFrom_**-Funktion aufrufen kann. Der Polygon POS-Client zeigt die **_approve_**-Methode für diesen Aufruf an.

```jsx
const execute = async () => {
  const client = await getPOSClient();
  const erc20RootToken = posClient.erc20(<root token address>,true);
  const approveResult = await erc20Token.approve(100);
  const txHash = await approveResult.getTransactionHash();
  const txReceipt = await approveResult.getReceipt();
}
```

### Einzahlung {#deposit}

Beachten Sie, dass der Token für die Übertragung vorher kartiert und genehmigt werden muss. Polygon PoS Client stellt die `deposit()`Methode zur Durchführung dieses Anrufs offen.

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
Einzahlungen von Ethereum zu Polygon passieren mit einem S**tate Sync **Mechanismus und dauern etwa 22-30 Minuten. Nachdem du auf dieses Zeitintervall gewartet hast, wird empfohlen, den Saldo mit der web3.js/matic.js Bibliothek oder mit check überprüfen. Der Explorer zeigt den Kontostand nur an, wenn mindestens eine Asset-Übertragung auf der Child-Chain stattgefunden hat. Dieser [<ins>Link</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos) erklärt, wie du Einzahlungsereignisse verfolgt kannst.
:::

### WithdrawStart-Methode für Burn {#withdrawstart-method-to-burn}

Die `withdrawStart()`Methode kann verwendet werden, um den Auszahlungsprozess zu initiieren, der den angegebenen Betrag auf der Polygon-Chain verbrennt.

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

Speichere den Transaktions-Hash für diesen Aufruf und verwende ihn, während du einen Burn-Proof generierst.

### Exit {#exit}

Sobald der Checkpoint für den Block eingereicht wurde, der die Burn-Transaktion enthält, sollte der Benutzer die `exit()`Funktion des `RootChainManager`Vertrags aufrufen und den Burn-Nachweis übermitteln. Nach dem Einreichen eines gültigen Nachweises werden Token an den Benutzer übertragen. Polygon PoS Client stellt die `withdrawExit`Methode zur Durchführung dieses Anrufs offen. Diese Funktion kann erst genutzt werden, nachdem der Checkpoint in die Mainchain aufgenommen wurde. Die checkpoint kann nachverfolgt werden, indem [du diesem Leitfaden](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events) folgt.

Die *withdrawExit*-Methode kann verwendet werden, um den Auszahlungsvorgang mit txHash aus der *withdrawStart*-Methode zu beenden.

:::note
Die Transaktion withdrawStart muss überprüft werden, um den Rückzug zu beenden.
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
