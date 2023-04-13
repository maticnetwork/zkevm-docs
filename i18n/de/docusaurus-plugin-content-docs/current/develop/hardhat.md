---
id: hardhat
title: Bereitstellung eines Smart Contract mit Hardhat
sidebar_label: Using Hardhat
description: Verwenden Sie Hardhat, um einen Smart Contract auf Polygon bereitzustellen.
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Übersicht {#overview}

Hardhat ist eine Ethereum Entwicklungsumgebung, die eine einfache Möglichkeit bietet, intelligente Aufträge bereitzustellen, Tests auszuführen und Solidity lokal zu debuggen.

In diesem Tutorial erfährst du, wie man Hardhat einrichtet und damit einen einfachen Smart-Contract erstellt, testet und bereitstellt.

### Was werden wir hier tun: {#what-you-will-do}

- Hardhat einrichten
- Erstelle einen einfachen Smart-Contract
- Contract kompilieren
- Contract testen
- Contract bereitstellen

## Einrichtung der Entwicklungsumgebung {#setting-up-the-development-environment}

Bevor wir beginnen, gibt es einige technische Anforderungen. Bitte installiere Folgendes:

- [Node.js v10+ LTS und npm](https://nodejs.org/en/) (in Node integriert)
- [Git](https://git-scm.com/)

Sobald wir diese installiert haben, musst du ein npm-Projekt erstellen, indem du einen leeren Ordner öffnest, `npm init` ausführst und die Anweisungen zur Installation von Hardhat befolgst. Sobald dein Projekt fertig ist, solltest du Folgendes ausführen:

```bash
npm install --save-dev hardhat
```

Um dein Hardhat-Projekt zu erstellen, führe `npx hardhat` in deinem Projektordner aus.
Erstelle das Beispielprojekt und führe diese Schritte aus, um eine Beispielaufgabe auszuprobieren und den Beispielvertrag zu kompilieren, zu testen und bereitzustellen.

:::note

Das hier verwendete Beispielprojekt stammt aus der [<ins>Hardhat Schnellstart-Anleitung</ins>](https://hardhat.org/getting-started/#quick-start) sowie deren Anweisungen.

:::

## Erstellung eines Projekts {#creating-a-project}

Um ein Beispielprojekt zu erstellen, führe `npx hardhat` in deinem Projektordner aus. Du solltest die folgenden Eingabeaufforderung sehen:

![img](/img/hardhat/quickstart.png)

Wähle das JavaScript-Projekt und führe diese Schritte aus, um den Beispielvertrag zu kompilieren, zu testen und bereitzustellen.

### Überprüfung des Vertrags {#checking-the-contract}

Der `contracts`-Ordner enthält `Lock.sol`, einen Beispielvertrag mit einer einfachen digitalen Sperre, in dem Benutzer erst nach einer bestimmten Zeit Geld auszahlen konnten.

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### Einrichtung des Vertrags {#setting-up-the-contract}

- Gehe zu `hardhat.config.js`
- Aktualisiere die `hardhat-config` durch matic-network-credentials
- Erstelle die `.env`-Datei in der Root, um deinen privaten Schlüssel zu speichern
- Füge den Polygonscan API-Schlüssel zur `.env`-Datei hinzu, um den Vertrag auf Polygonscan zu verifizieren. Du kannst einen API-Schlüssel generieren, indem du [ein Konto erstellst](https://polygonscan.com/register)

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

Beachte, dass die oben stehende Datei DOTENV benötigt, um Umgebungsvariablen, Ethers und Etherscan zu verwalten. Stelle sicher, dass du alle diese Pakete installierst.

Weitere Anweisungen zur Nutzung von DOTENV findest du auf [<ins>dieser Seite</ins>](https://www.npmjs.com/package/dotenv).

Du kannst auf MATIC (Polygon mainnet) bereitstellen, wenn du polygon_mumbai durch MATIC änderst

:::

### Erstellung des Vertrags {#compiling-the-contract}

Um den Vertrag zu kompilieren, musst du zunächst die Hardhat Toolbox installieren:

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

Führe sie dann einfach aus, um Folgendes zu kompilieren:

```bash
npx hardhat compile
```

### Testen des Vertrags {#testing-the-contract}

Um Tests mit Hardhat durchzuführen, musst du nur Folgendes eingeben:

```bash
npx hardhat test
```

Dies ist eine mögliche Ausgabe:

![img](/img/hardhat/test.png)

### Bereitstellung auf Polygon Network {#deploying-on-polygon-network}

Führe diesen Befehl in der Root des Projektverzeichnisses aus:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Der Vertrag wird auf dem Matic Mumbai Testnet bereitgestellt und du kannst den Bereitstellungsstatus hier überprüfen: https://mumbai.polygonscan.com/

**Herzlichen Glückwunsch! Du hast den Greeter Smart Contract erfolgreich bereitgestellt. Du kannst jetzt mit dem Smart Contract interagieren.**

:::tip Verträge auf Polygonscan schnell verifizieren

Führe die folgenden Befehle aus, um deinen Vertrag auf Polygonscan schnell zu verifizieren. So kann jeder problemlos den Quellcode deines bereitgestellten Vertrags sehen. Verträge, die einen Konstruktor mit einer komplexen Argumentliste haben, findest du [hier](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html).

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
