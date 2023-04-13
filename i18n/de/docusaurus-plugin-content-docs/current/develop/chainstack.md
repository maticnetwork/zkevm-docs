---
id: chainstack
title: Bereitstellung eines Smart Contract mit Chainstack und Foundry
sidebar_label: Using Chainstack
description:  Benutze Chainstack und Foundry, um einen Smart Contract auf Polygon zu entwickeln.
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Übersicht {#overview}

Dieser Abschnitt führt dich durch die Bereitstellung eines Hello World mit [Chainstack](https://chainstack.com/build-better-with-polygon/) und [Foundry](https://github.com/gakonst/foundry/) auf dem Polygon Mumbai testnet.

Chainstack bietet Infrastruktur für Ethereum-basierte Anwendungen und andere Blockchains. Sie pflegen Knoten und garantieren deren Verbindung zum Netzwerk und bieten auch eine Schnittstelle zur Interaktion mit Mainnet und Testnets.

Foundry ist ein schnelles Toolkit für die in Rust geschriebene Entwicklung von Ethereum-Anwendungen. Es bietet Testen, Interaktion mit EVM Smart Contracts, Senden von Transaktionen und blockchain

:::tip

Wenn du Fragen hast, kontaktiere den [<ins>Chainstack Discord</ins>](https://discord.com/invite/Cymtg2f7pX) Server.

:::

## Das wirst du hier lernen {#what-you-will-learn}

Einen Hello World-Contract mithilfe von Chainstack erstellen, um einen Polygon-Knoten und Foundry für die Verwendung des Contract einzusetzen.

## Was werden wir hier tun: {#what-you-will-do}

1. Einen Polygon-Knoten mit Chainstack einsetzen
2. Foundry einrichten
3. Den Smart-Contract erstellen
4. Den Smart-Contract einsetzen.

## Einen Polygon-Mumbai-Knoten einsetzen {#deploy-a-polygon-mumbai-node}

Du benötigst einen Knoten, um einen Smart Contracts auf dem Blockchain-Netzwerk bereitzustellen. Führe die folgenden Schritte aus, um deinen Knoten aufzurufen und auszuführen:

**Schritt 1 →** Registriere dich mit [Chainstack](https://console.chainstack.com/user/account/create)

![img](/img/chainstack/sign-up.png)

**Schritt 2 →** Befolge die Anweisungen, wie du [einen Mumbai Knoten](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network) bereitstellst.

![img](/img/chainstack/join-network.png)

**Schritt 3 →** Hole den [HTTPS-Endpunkt des bereitgestellten Knotens](https://docs.chainstack.com/platform/view-node-access-and-credentials)

## Foundry installieren {#install-foundry}

Foundry ist ein Entwicklungstool, um mit Smart-Contracts zu arbeiten. Dazu musst du zuerst die Rust-Coding-Sprache installieren.

1. [ Rust installieren](https://www.rust-lang.org/tools/install).
1. [Foundry installieren](https://github.com/gakonst/foundry/).

## Initialisieren mit Foundry {#initialize-with-foundry}

Um einen Textbaustein zu erstellen, gehst du deinem Arbeitsverzeichnis und führst die folgenden Schritte aus:

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## Fund-Konto aufladen {#fund-your-account}

Um den Smart-Contract einzusetzen, benötigst du ein Wallet-Konto. Du kannst [Metamask](https://metamask.io/) dafür verwenden. Du musst im Netzwerk auch Gas bezahlen, um den Contract einzusetzen. Kopiere einfach deine Wallet-Adresse und hol Mumbai MATIC Token [über den Wasserhahn](https://faucet.polygon.technology/).

## Hello World-Contract erstellen {#create-the-hello-world-contract}

Im initialisierten Foundry-Projekt innerhalb `src/` erstellst du:`HelloWorld.sol`

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## Contract einsetzen {#deploy-the-contract}

Nun bist du bereit, deinen Contract einzusetzen

* Du hast einen eigenen Knoten im Polygon Mumbai-Netzwerk, über den du den Contract einsetzen werden.
* Du hast Foundry, mit der du den Contract einsetzen werden.
* Du hast ein aufgeladenes Konto, das den Contract einsetzen wird.

Um den Contract einzusetzen, führst du folgende Schritte aus:

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

Hier,

* CONTRACT_PATH — Pfad zu deiner `HelloWorld.sol`-Datei.
* PRIVATE_KEY — der Privatschlüssel von deinem Konto.
* HTTPS_ENDPOINT — [Endpunkt deines Knotens](https://docs.chainstack.com/platform/view-node-access-and-credentials).

Beispiel:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

Du kannst die Contract-Anwendung auf M[<ins>umbai Polygonscan </ins>](https://mumbai.polygonscan.com/)mithilfe vom neugenerierten Hash aus dem letzten Schritt immer überprüfen.

:::

## Contract testen {#test-the-contract}

Falls du prüfen möchtest, ob der Contract gut funktioniert, gibt es dazu einen `forge test`Befehl. Foundry bietet viele [Optionen ](https://book.getfoundry.sh/reference/forge/forge-test)(Merker) für weitere spezielle Tests. Erfahren mehr über das Schreiben von Tests sowie über erweiterte Tests und andere Funktionen in der [Foundry-Dokumentation](https://book.getfoundry.sh/forge/tests).

**Herzlichen Glückwunsch! Du hast deinen Hello World Smart Contract auf Polygon bereitgestellt.**

Siehe auch die Chainstack-Unterlagen für weitere Polygon-relevante [<ins>Tutorials</ins>](https://docs.chainstack.com/tutorials/polygon/) und [<ins>Tools</ins>](https://docs.chainstack.com/operations/polygon/tools).
