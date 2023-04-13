---
id: alchemy
title: Bereitstellung eines Smart Contract mit Alchemy
sidebar_label: Using Alchemy
description: Leitfaden zur Bereitstellung von Smart Contracts mit Alchemy
keywords:
  - docs
  - matic
  - polygon
  - alchemy
  - create smart contract
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Übersicht {#overview}

Dieses Tutorial ist für Entwickler bestimmt, die sich entweder in die Ethereum-Blockchain-Entwicklung einarbeiten oder die Grundlagen des Einsatzes und des Umgangs mit den Smart-Contracts verstehen möchten. Es führt durch die Erstellung und den Einsatz eines Smart-Contracts auf dem Polygon Mumbai Testnetzwerk unter Verwendung einer virtuellen [GeldbörseMetamask](https://metamask.io)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) und [Alchemy](https://alchemy.com/?a=polygon-docs).

:::tip

Wenn du Fragen oder Bedenken hast, kontaktiere das Alchemy über ihren [<ins>offiziellen</ins>](https://discord.gg/gWuC7zB) Discord-Server.

:::

## Das wirst du hier lernen {#what-you-will-learn}

Zur Erstellung eines Smart-Contracts in diesem Tutorial erfährst du, wie du die Alchemy-Plattform nutzen kannst, um:
- Erstelle eine Smart Contract-Anwendung
- Überprüfe das Guthaben einer Wallets
- Überprüfe contract in einem blockchain

## Was werden wir hier tun: {#what-you-will-do}

Im Tutorial werden wir
1. Mit der Erstellung einer App auf Alchemy beginnen
2. Einen Wallet mit Metamask erstellen
3. Füge den Guthaben zur Wallet hinzu (mit Test-Token)
4. Mit Hardhat und Ethers.js das Projekt kompilieren und einsetzen
5. Überprüfe den Vertragsstatus auf der Alchemy's

## Erstelle und bereitstellung deinen Smart Contract {#create-and-deploy-your-smart-contract}

### Verbinde dich mit dem Polygon Netzwerk {#connect-to-the-polygon-network}

Es gibt mehrere Möglichkeiten, um Anfragen an die Polygon PoS zu richten. Anstatt deine eigenen Knoten zu betreiben, wirst du ein kostenloses Konto auf der Alchemy-Entwicklerplattform verwenden. So kommunizierst du über Alchemy Polygon PoS API, mit der Polygon-PoS-Chain. Die Plattform besteht aus einer vollständigen Suite von Entwickler-Tools - dies beinhaltet die Möglichkeit, Anfragen zu überwachen, Datenanalysen, die zeigen, was unter der Haube passiert, während der requests, verbesserte APIs (Transact, NFTs usw.) und ein ethers.js SDK bereitstellt.

Wenn du noch kein Alchemy hast, melde dich [hier](https://www.alchemy.com/polygon/?a=polygon-docs) für ein kostenloses Konto an. Sobald dein Konto angelegt ist, kannst du deine erste App sofort erstellen, bevor sie das Dashboard erreichen.

![img](/img/alchemy/alchemy-dashboard.png)

### Erstelle deine App (und deinen API-Key) {#create-your-app-and-api-key}


Wenn du mit Testnets nicht vertraut bist, schaue im [Testnet Guide](https://docs.alchemyapi.io/guides/choosing-a-network) nach.

Um einen neuen API-Key zu generieren, navigiere auf der Alchemy dashboard zum Reiter **Apps** und wähle die tab **erstellen.**

![img](/img/alchemy/create-app.png)

Benenne deine neue App **Hello World**, biete eine kurze Beschreibung an, wähle **Polygon** für die Chain aus und wähle **Polygon Mumbai** für dein Netzwerk.

Klicken Sie schließlich auf **App** erstellen. Deine neue App sollte in der folgenden Tabelle erscheinen.

### Erstelle eine Wallet-Adresse {#create-a-wallet-address}

Polygon PoS ist eine Layer 2 Skalierungslösung für Ethereum. Wir benötigen daher eine Ethereum Wallet und fügen eine benutzerdefinierte Polygon URL hinzu, um Transaktionen auf dem Polygon Mumbai Testnet zu senden und zu empfangen. Für dieses Tutorial verwenden wir MetaMask, eine browser-kompatible MetaMask, mit der du deine Wallet-Adresse verwaltest. Wenn du mehr darüber erfahren möchtest, wie Transaktionen auf Ethereum funktionieren, lies den [Leitfaden für Transaktionen](https://ethereum.org/en/developers/docs/transactions/) von der Ethereum Foundation.

Um deine benutzerdefinierte Polygon RPC URL von Alchemy zu erhalten, gehe in deiner **Hello World** App in deinem Alchemy-Dashboard und klicke auf **Key** anzeigen, in der oberen rechten Ecke. Kopiere anschließend deinen Alchemy HTTP API Key.

![img](/img/alchemy/view-key.png)

Ein Metamask-Konto kostenlos herunterladen und erstellen kannst du [hier](https://metamask.io/download.html). Sobald du ein Konto erstellt hast, führe diese Schritte aus, um das Polygon PoS Netzwerk auf deiner Wallet einzurichten.

1. Wählen Sie **Einstellungen** aus dem Dropdown-Menü in der oberen rechten Ecke deines MetaMask Wallets aus.
2. Wählen **Sie Netzwerke** aus dem Menü auf der linken Seite.
3. Verbinde deine Wallet mit dem Mumbai Testnet mit den folgenden Parametern:

**Network Name:** Polygon Mumbai Testnet

**Neue** RPC-URL: https://polygon-mumbai.g.alchemy.com/v2/your-api-key

**ChainID:** 80001

**Symbol:** MATIC

**Block Explorer URL:** https://mumbai.polygonscan.com/


### Füge Polygon Mumbai Test MATIC hinzu. {#add-polygon-mumbai-test-matic}

Du brauchst ein paar testnet Token, um deinen Smart Contracts auf dem Mumbai testnet bereitzustellen. Um testnet Token zu erhalten, gehe zum [Polygon Mumbai Faucet](https://faucet.polygon.technology/), wähle **Mumbai** aus, wähle **MATIC Token** und gib deine Polygon Wallet-Adresse ein und klicke dann auf **Übermittel**. Aufgrund des Netzwerk-Traffics kann es einige Zeit dauern, um deine Testnet-Token zu erhalten.

Du kannst auch den [kostenlosen Mumbai Wasserhahn](https://mumbaifaucet.com/?a=polygon-docs) nutzen.

![img](/img/alchemy/faucet.png)

Die Testnet-Token werden in Ihrem MetaMask-Konto angezeigt.

### Überprüfe deinen Wallet Balance {#check-your-wallet-balance}

Zur Überprüfung unseres Guthabens rufen wir [eth\_getBalance](https://docs.alchemy.com/reference/eth-getbalance-polygon) mithilfe des A[lchemy-Composer-Tools ](https://composer.alchemyapi.io/)ab. Wählen Sie **Polygon** als Chain aus, **Polygon Mumbai** als Netzwerk, `eth_getBalance`als Methode und geben Sie Ihre Adresse ein. Dadurch wird die MATIC-Summe an unsere Wallet zurückgegeben. In diesem  [Video](https://youtu.be/r6sjRxBZJuU) wird gezeigt, wie das Composer-Tool verwendet wird.

![img](/img/alchemy/get-balance.png)

Nachdem du deine MetaMaske Kontoadresse eingegeben hast und auf **Anfrage senden**, solltest du eine Antwort sehen, die wie folgt aussieht:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

:::info

Dieses Ergebnis ist in Wei, nicht in ETH. Wei ist die kleinste Bezeichnung von Ether. Wei wird zu Ether wie folgt umgerechnet: 1 Ether = 10^18 Wei. Bei Umrechnung „0xde0b6b3a7640000„ in Dezimalform ergibt sich also 1\*10^18, was 1 ETH entspricht. Kategorie-basiert kann das auf 1 MATIC abgebildet werden.

:::

### Initialisiere dein Projekt {#initialize-your-project}

Zuerst müssen wir einen Ordner fürs Projekt erstellen. Gehe zur [Befehlszeile](https://www.computerhope.com/jargon/c/commandi.htm) und gebe sie wie folgt ein:

```bash
mkdir hello-world
cd hello-world
```

Jetzt sind wir in unserem Projekt-Ordner drin. Mit `npm init` können wir das Projekt initialisieren. Falls du npm noch nicht installiert hast, befolge [diese Anleitung](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (Node.js bitte auch herunterladen, das werden wir auch brauchen!).

```bash
npm init # (or npm init --yes)
```

Wie du die Fragen zur Installation beantwortest, ist hier nicht so wichtig. Hier ist einfach ein Muster:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{   
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Genehmige die package.json - dann sind wir bereit!

### [Hardhat](https://hardhat.org/getting-started/#overview) herunterladen

Hardhat ist eine Entwicklungsumgebung für die Erstellung und Anwendung sowie zum Testen und Debuggen Ihres Ethereums. Es hilft den Entwicklern beim lokalen Aufbau von Smart-Contracts und dApps, bevor diese in Live Chains eingesetzt sind.

In unserem Projekt `hello-world`führe aus:

```bash
npm install --save-dev hardhat
```

Auf dieser Seite findest du weitere Informationen zur [Installationsanleitung](https://hardhat.org/getting-started/#overview).

### Hardhat Projekt erstellen {#create-hardhat-project}

In unserem Projekt-Ordner `hello-world` führst du folgende Schritte aus:

```bash
npx hardhat
```

Du solltest eine Willkommensmeldung und eine Option sehen, um auszuwählen, was du tun möchtest. Wählen Sie **eine leere hardhat.config.js erstellen**:

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Dies generiert eine `hardhat.config.js`Datei für uns, die ist, wo wir den gesamten Setup für unser Projekt angeben.

### Füge Projektordner hinzu. {#add-project-folders}

Um unser Projekt organisiert zu halten, erstellen wir zwei neue Ordner. Gehe zum Hauptverzeichnis deines Projekts `hello-world` in deiner Befehlszeile und gib sie wie folgt ein:

```bash
mkdir contracts
mkdir scripts
```

* In `contracts/` werden wir unsere Datei mit dem „Hello World„ Smart-Contract-Code aufbewahren.
* In `scripts/` bewahren wir die Skripte zur Anwendung und zum Umgang mit unserem Contract auf

### Schreiben Sie den Vertrag {#write-the-contract}

Öffne das **hello-world** Projekt in deinem favorite wie z.B. [VSCode](https://code.visualstudio.com). Smart Contracts werden in einer Sprache geschrieben, die Solidität ist, die verwendet wird, um unseren `HelloWorld.sol`Smart Contracts zu write

1. Navigiere zum `contracts`Ordner und erstelle eine neue Datei namens`HelloWorld.sol`
2. Nachfolgend ist ein Muster für einen Hello World Smart-Contract von der .[Ethereum Foundation](https://ethereum.org/en/), das wir in diesem Tutorial verwenden werden. Kopiere und füge den unten stehenden Inhalt in deine Datei `HelloWorld.sol` ein. Beachte dabei unbedingt die Kommentare, um zu verstehen, was dieser Contract bewirkt:

```solidity
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

Dies ist das einfachste Smart-Contract. Bei dessen Erstellung speichert er eine Nachricht. Durch Aufrufen der Funktion  `update` kann er aktualisiert werden.

### Verbinde dich mit MetaMask & Alchemy {#connect-with-metamask-alchemy}

Wir haben eine Metamask-Wallet und ein Alchemy-Konto erstellt sowie unseren Smart-Contract aufgeschrieben. Jetzt müssen wir diese drei miteinander verbinden.

Jeder Vorgang, der von deiner virtuellen Wallet gesendet wird erfordert eine Signatur mit deinem einmaligen Privatschlüssel. Dazu braucht unser Programm eine entsprechende Berechtigung von uns. Zu diesem Zweck können wir einen Privatschlüssel (und den Alchemy API-Key) in einer Umgebungsdatei sicher aufbewahren.

Zuerst installierst du das dotenv-Paket in deinem Projekt-Verzeichnis :

```bash
npm install dotenv --save
```

Erstelle anschließend eine `.env` -Datei im Hauptverzeichnis unseres Projekts. Dazu fügst du deinen Metamask-Privatschlüssel und die HTTP Alchemy API URL hinzu.

:::warning Warnung

Deine Umgebungsdatei muss benannt werden `.env`oder sie wird nicht als Umgebungsdatei erkannt. Benenne diese also nicht `process.env` oder `.env-custom` oder anders.

Wenn du ein Versionskontrollsystem wie git verwendest, um dein Projekt zu verwalten, verfolge bitte **die** Datei `.env`NICHT. `.env`Füge deiner `.gitignore`Datei hinzu, um die Veröffentlichung von geheimen Daten zu vermeiden.

:::

* Befolge [diese Anleitung](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key), um deinen Privatschlüssel zu exportieren
* Um deinen Alchemy HTTP API-Key (RPC-URL) zu erhalten, navigiere zu deiner **Hello** HTTP im Dashboard deines Accounts, und klicke in der oberen rechten Ecke **auf Key** anzeigen.

Ihre `.env` muss so aussehen:

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Um diese tatsächlich mit unserem Code zu verbinden, werden wir diese Variablen in unserer `hardhat.config.js`Datei später in diesem Tutorial referenzieren.

### Installiere Ethers.js {#install-ethers-js}

Ethers.js ist eine Bibliothek zum Erleichtern der Interaktion und Anfragen an Ethereum. Dabei werden die [ JSON-RPC-Standardmethoden](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) in andere Methoden „eingepackt„, die  benutzerfreundlicher sind.

Hardhat vereinfacht die Integration von [Plugins](https://hardhat.org/plugins/) für zusätzliche Tools und erweiterte Funktionen. Für den Contract-Einsatz werden wir die Vorteile des [Ethers Plugins](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) nutzen. [Ethers.js](https://github.com/ethers-io/ethers.js/) verfügt über nützliche Methoden zum Contract-Einsatz.

Geben Sie in Ihrem Projektverzeichnis ein:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Außerdem benötigen wir Ethers in unserem `hardhat.config.js` im nächsten Schritt.

### Update hardhat.config.js {#update-hardhat-config-js}

Wir haben mehrere Abhängigkeiten und Plugins hinzugefügt. Jetzt müssen wir aktualisieren, `hardhat.config.js`damit unser Projekt diese Abhängigkeiten erkennt.

Aktualisiere dein `hardhat.config.js`. Es wird dann wie folgt aussehen:

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### Erstelle unseren Smart Contract {#compile-our-smart-contract}

Um sicherzustellen, dass alles gut funktioniert, kompilieren wir unseren Contract. Die Aufgabe `compile` ist eine der eingebauten Hardhat-Tasks.

Aus der Befehlszeile aus:

```bash
npx hardhat compile
```

Du erhältst vielleicht eine `SPDX license identifier not provided in source file`Warnung, aber die Anwendung funktioniert möglicherweise immer noch gut. Falls nicht, kannst du immer [Alchemy discord](https://discord.gg/u72VCg3) anschreiben.

### Schreibe unser deploy {#write-our-deploy-script}

Der Contract ist nun geschrieben und unsere Konfigurationsdatei ist fertig. Jetzt muss unser Contract-Einsatzskript geschrieben werden.

Gehe zum Ordner `scripts/` und erstelle eine neue Datei namens `deploy.js`. Füge folgenden Inhalt hinzu:

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");   
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Was jede dieser Codezeilen bewirkt, steht im [Contracts Tutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) des Hardhat-Teams. Diese Erläuterungen haben wir hier übernommen.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Ein `ContractFactory` in ethers.js ist eine Abstraktion zur Anwendung neuer Smart-Contracts, also ist `HelloWorld` hier ein [ Factory](https://en.wikipedia.org/wiki/Factory\_\(object-oriented\_programming\)) für die Instanzen unseres Hello World-Contracts. Bei Verwendung des `hardhat-ethers` Plugins `ContractFactory` und `Contract` werden Instanzen standardmäßig mit dem ersten Unterzeichner (Inhaber) verbunden.

```javascript
const hello_world = await HelloWorld.deploy();
```

Beim Abrufen von `deploy()` auf  `ContractFactory` wird die Anwendung gestartet. Es wird ein `Promise` zur Auflösung in ein `Contract` Objekt zurückgegeben. Dieses Objekt enthält eine Methode für jede unserer Smart-Contract-Funktionen.

### Bereitstellung unseres Smart Contract {#deploy-our-smart-contract}

Gehen zur Befehlszeile und führe folgende Prozedur aus:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Du solltest so etwas sehen:

```bash
Contract deployed to address: 0x3d94af870ED272Cd5370e4135F9B2Bd0e311d65D
```

Wenn wir zum [Polygon Mumbai Explorer](https://mumbai.polygonscan.com/) gehen und nach unserer Vertragsadresse suchen, sollten wir in der Lage sein, zu sehen, dass sie erfolgreich bereitgestellt wurde.

Die `From`Adresse sollte deine MetaMaske Kontoadresse übereinstimmen und die `To`Adresse wird **Contract Creation** sagen. Wenn wir aber auf die Transaktion klicken, sehen wir unsere Vertragsadresse im `To`Feld.

![img](/img/alchemy/polygon-scan.png)

### Überprüfung des Vertrags {#verify-the-contract}

Alchemy stellt einen [Explorer](https://dashboard.alchemyapi.io/explorer) zur Verfügung, bei dem du Informationen über die Methoden finden kannst, die zusammen mit dem Smart Contract eingesetzt werden, wie z.B. Reaktionszeit, HTTP-Status, Fehlercodes unter anderem. In dieser günstigen Umgebung kannst du dein Contract bequem überprüfen und sehen, ob die Transaktionen gelaufen sind.

![img](/img/alchemy/calls.png)

**Herzlichen Glückwunsch! Du hast gerade einen Smart Contracts auf das Polygon Mumbai Netzwerk bereitgestellt.**

## Zusätzliche Ressourcen {#additional-resources}

- [Wie du einen NFT Smart Contract entwickelst](https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy) – Alchemy hat ein schriftliches Tutorial mit einem Youtube-Video zu diesem Thema. Dies ist Woche 1 seiner kostenlosen 10 Wochen **Road to Web3** dev Serie
- [Polygon API Quickstart](https://docs.alchemy.com/reference/polygon-api-quickstart) – Alchemys Entwickler docs Leitfaden zum Aufstehen und Laufen mit Polygon
