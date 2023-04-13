---
id: eth
title: ETH Ein- und Auszahlungsleitfaden
sidebar_label: ETH
description: "Ein- und Auszahlungen von ETH-Token im Polygon-Netzwerk."
keywords:
  - docs
  - matic
  - ether
  - withdraw
  - deposit
image: https://matic.network/banners/matic-network-16x9.png
---

Lies die aktuelle [Matic.js-Dokumentation über ETH](https://maticnetwork.github.io/matic.js/docs/pos/deposit-ether/).

## Zusammenfassung {#quick-summary}

In diesem Abschnitt der Dokumente geht es darum, wie du ERC20-Token im Polygon-Netzwerk ein- und auszahlst. Die Abschnitte ETH, ERC20, ERC721 und ERC1155 der Dokumente enthalten ähnliche Funktionen mit unterschiedlichen Namens- und Implementierungsmustern, die den Standards entsprechen. Die wichtigste Voraussetzung für die Nutzung dieses Teils der Dokumente ist das Mapping deiner Assets. Bitte sende deine Mapping-Anfrage [hier](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/).

## Einführung {#introduction}

In diesem Leitfaden wird das Polygon Testnet (Mumbai) verwendet, das mit dem Goerli-Netzwerk gemappt ist, um die Asset-Übertragung zwischen den beiden Blockchains zu zeigen. Beachte bitte, dass du bei der Befolgung dieses Leitfadens nach Möglichkeit eine Proxy-Adresse verwenden solltest. Das liegt daran, dass sich die Vertragsadresse der Implementierung verändern kann, wenn dem Vertragscode ein neues Update hinzugefügt wird. Der Proxy verändert sich nie und leitet alle eingehenden Aufrufe auf die neueste Implementierung weiter. Wenn du die Proxy-Adresse verwendest, musst du dir keine Sorgen über Änderungen des Implementierungsvertrags machen, bevor du fertig bist.

Bitte verwende die `RootChainManagerProxy`Adresse für Interaktionen anstelle der `RootChainManager`Adresse. Details zur Bereitstellung wie die PoS-Vertragsadressen, ABI und Test Token Adressen findest du [hier](/docs/develop/ethereum-polygon/pos/deployment/).

Das Mapping deiner Assets ist ein notwendiger Schritt, um die PoS-Bridge in deine App zu integrieren. Falls du das nicht getan hast, sende [hier](https://docs.polygon.technology/docs/develop/ethereum-polygon/submit-mapping-request/) eine Mapping-Anfrage. Für diesen Leitfaden hat das Team Test-Token bereitgestellt und auf die PoS-Bridge gemappt. Fordere das Asset an, das du im [Faucet](https://faucet.polygon.technology/) verwenden möchtest. Falls die Test-Token nicht verfügbar sind, wende dich bitte an das Team auf [Discord](https://discord.com/invite/0xPolygon). Wir werden dir sofort antworten.

In diesem Leitfaden wird jeder Schritt erklärt und mit einigen Code-Snippets illustriert. Du kannst immer auf dieses [Repository](https://github.com/maticnetwork/matic.js/tree/master/examples) zugreifen, das den gesamten **Beispielsquellcode** enthält, der dir dabei hilft, die PoS-Bridge zu integrieren und zu verstehen.

## High-Level-Flow {#high-level-flow}

ETH einzahlen -

1. Starte den **_depositEtherFor_**-Aufruf im **_RootChainManager_** und **sende **den erforderlichen Ether.

ETH auszahlen -

1. **_Burn_** von Token auf die Polygon-Chain.
2. Rufe die **_Exit_**-Funktion im **_RootChainManager_** auf, um einen Nachweis der Burn-Transaktion zu übermitteln. Dieser Call ist möglich, **_nachdem der Checkpoint_** für den Block mit Burn-Transaktion übermittelt wurde.

## Schritte {#steps}

### Einzahlen {#deposit}

ETH kann in die Polygon-Chain eingezahlt werden, indem du **depositEtherFor** im **RootChainManager**-Vertrag aufrufst. Der Polygon PoS-Client zeigt die **depositEther**-Methode für diesen Aufruf an.

```jsx
const result = await posClient.depositEther(<amount>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```

:::note
Einzahlungen von Ethereum zu Polygon passieren mit dem S**tate Sync **Mechanism, und dies dauert etwa 22-30 Minuten. Nachdem du auf dieses Zeitintervall gewartet hast, wird empfohlen, den Saldo mit der web3.js/matic.js Bibliothek oder mit check überprüfen. Der Explorer zeigt den Kontostand nur an, wenn mindestens eine Asset-Übertragung auf der Child-Chain stattgefunden hat. Dieser [<ins>Link</ins>](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos/) erklärt, wie du Einzahlungsereignisse verfolgt kannst.
:::

### Burn {#burn}

ETH wird als ERC20-Token auf der Polygon Chain hinterlegt. Das Zurückziehen folgt dem gleichen Vorgang wie das Zurückziehen von ERC20-Token.

Um die Token zu brennen und den Auszahlungsprozess zu durchführen, rufen Sie die withdrawal des MaticWETH-Vertrags auf. Da Ether ein ERC20-Token auf der Polygon Chain ist, musst du den **ERC20-Token** vom Polygon PoS Client initiieren und dann die `withdrawStart()`Methode aufrufen, um den ERC20 zu starten.

```jsx
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Speichere den Transaktions-Hash für diesen Aufruf und verwende ihn, während du einen Burn-Proof generierst.

### Exit {#exit}


Sobald der **Checkpoint** für den Block eingereicht wurde, der die Burn-Transaktion enthält, sollte der Benutzer die **Exit-Funktion** des `RootChainManager`Vertrags aufrufen und den Burn-Nachweis übermitteln. Nach der Übermittlung eines gültigen Nachweises werden die Token an den Benutzer übertragen. Der Polygon POS-Client `erc20` zeigt die exposes `withdrawExit`-Methode für diesen Aufruf an. Diese Funktion kann erst genutzt werden, nachdem der Checkpoint in die Mainchain aufgenommen wurde. Die Aufnahme des Checkpoint kann mit diesem [Leitfaden](/docs/develop/ethereum-polygon/pos/deposit-withdraw-event-pos.md#checkpoint-events) verfolgt werden.


```jsx
// token address can be null for native tokens like ethereum or matic
const erc20RootToken = posClient.erc20(<token address>, true);

const result = await erc20Token.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
