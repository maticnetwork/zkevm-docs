---
id: truffle
title: Bereitstellung eines Smart Contract mit Truffle
sidebar_label: Using Truffle
description:  Verwenden Sie Truffle, um einen Smart Contract auf Polygon bereitzustellen.
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Übersicht {#overview}

[Truffle](https://trufflesuite.com/) ist eine Blockchain-Entwicklungsumgebung, die du verwenden kannst, um Smart Contracts zu erstellen und zu testen, indem du die Ethereum Virtual Machine nutzt. Dieser Leitfaden zielt darauf ab, zu unterrichten, wie man einen Smart Contracts mit Truffle erstellt und auf dem EVM-kompatiblen Polygon Network bereitstellt.

:::note

Dieses Tutorial ist eine angepasste Version des [<ins>Truffle quickstart Guide</ins>](https://www.trufflesuite.com/docs/truffle/quickstart) Artikels.

:::

## Was werden wir hier tun: {#what-you-will-do}

- Truffle installieren und einrichten
- Verträge auf Polygon Network bereitstellen
- Überprüfe den Bereitstellungsstatus auf Polygonscan

## Voraussetzungen {#prerequisites}

Bevor wir beginnen, gibt es einige technische Anforderungen. Bitte installiere Folgendes:

- [Node.js v8+ LTS und npm](https://nodejs.org/en/) (verpackt mit Node)
- [Git](https://git-scm.com/)

Sobald diese installiert sind, benötigen wir nur einen Befehl, um Truffle zu installieren:

```
npm install -g truffle
```

Um zu überprüfen, dass Truffle richtig installiert ist, gib `truffle version`auf einem Terminal ein. Wenn du einen Fehler siehst, vergewissere dich, dass die npm Module deinem Pfad hinzugefügt werden.

## Erstellung eines Projekts {#creating-a-project}

### MetaCoin-Projekt {#metacoin-project}

Wir verwenden eine Boilerplate von Truffle, die du auf seiner Seite [Truffle Boxes](https://trufflesuite.com/boxes/) findest. [Die MetaCoin-Box](https://trufflesuite.com/boxes/metacoin/) erstellt ein Token, das zwischen Konten übertragen werden kann.

1. Erstelle zuerst ein neues Verzeichnis für dieses Truffle-Projekt:

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. Lade die MetaCoin-Box herunter:

  ```bash
  truffle unbox metacoin
  ```

Mit diesem letzten Schritt hast du ein Truffle-Projekt erstellt, das Ordner mit Verträgen, Bereitstellung, Test und Konfigurationsdateien zusammenfasst.

Das sind die Smart Contract-Daten aus der `metacoin.sol`-Datei:

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

Beachte, dass ConvertLib unmittelbar nach der `pragma`-Anweisung importiert wird. In diesem Projekt gibt es zwei Smart Contracts, die am Ende bereitgestellt werden: Metacoin, die die Versand- und Kontostand-Logik enthält, und ConvertLib, eine Bibliothek, mit der Werte konvertiert werden.

:::

### Testen des Vertrags {#testing-the-contract}

Du kannst Solidität und Javascript Tests durchführen.

1. Führe in einem Terminal den Solidity-Test aus:

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

Du solltest die folgende Ausgabe sehen:

![img](/img/truffle/test1.png)

2. Führe den JavaScript-Test aus:

  ```bash
  truffle test ./test/metacoin.js
  ```

Du solltest die folgende Ausgabe sehen:

![img](/img/truffle/test2.png)

### Erstellung des Vertrags {#compiling-the-contract}

Kompiliere den Smart Contracts mit dem folgenden Befehl:

```bash
truffle compile
```

Du siehst die folgende Ausgabe:

![img](/img/truffle/compile.png)

### Konfiguration des Smart Contracts {#configuring-the-smart-contract}

Bevor du den Vertrag bereitstellst, musst du die `truffle-config.js`-Datei einrichten, indem du Netzwerk- und Compiler-Daten einfügst.

Wechsele zur Datei `truffle-config.js`mit Polygon Mumbai Netzwerkdaten zu aktualisieren.

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

Beachten Sie, dass es erfordert, dass mnemonic für weitergegeben `maticProvider`wird. Dies ist der Seed-Phrase (oder der Private Key) für das Konto, von dem du bereitstellen möchtest. Erstelle eine neue `.secret`-Datei im Root-Verzeichnis und gib deine aus 12 Wörtern bestehende Mnemonic-Seed-Phrase ein, um loszulegen. Um die Seed-Wörter aus MetaMask zu erhalten, kannst du zu MetaMaske Einstellungen gehen, und dann aus dem Menü aus Sicherheit **und Datenschutz** auswählen, wo du eine Schaltfläche siehst, die deine **Seed-Wörter enthüllt**.

### Bereitstellung auf Polygon Network {#deploying-on-polygon-network}

Füge MATIC deiner Wallet mit [Polygon Faucet](https://faucet.polygon.technology/) hinzu. Führe diesen Befehl als nächstes im Root-Ordner des Projektverzeichnisses aus:

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

Denk `address``transaction_hash`daran, dass deine Angaben abweichen. Das oben stehende Beispiel zeigt nur die Struktur.

:::

**Herzlichen Glückwunsch!  Du hast einen Smart Contract mit Truffle bereitgestellt.** Du kannst nun mit dem Vertrag interagieren und auch seinen Bereitstellungsstatus auf [Polygonscan](https://mumbai.polygonscan.com/) überprüfen.
