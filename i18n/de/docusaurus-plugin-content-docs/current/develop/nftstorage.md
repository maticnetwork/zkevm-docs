---
id: nftstorage
title: NFTs prägen
description: Mit NFT.storage und Polygon prägen.
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

In diesem Leitfaden erfährst du, wie du einen NFT mit der Polygon Blockchain und IPFS/Filecoin über NFT.Storage prägst. Polygon, eine Layer-2-Skalierungslösung für Ethereum, wird häufig von Entwicklern aufgrund ihrer Geschwindigkeit und niedrigeren Transaktionskosten gewählt, da sie gleichzeitig voll mit der EVM von Ethereum kompatibel ist. Dieser Leitfaden beschreibt die Erstellung und Bereitstellung eines standardisierten Smart Contracts, die Speicherung von Metadaten und Assets bei IPFS und Filecoin über die NFT.Storage API und das Prägen der NFT auf deine eigene Wallet bei Polygon.

## Einführung {#introduction}

Das Ziel dieses Leitfadens ist es, mit der Prägung drei Eigenschaften zu erreichen:

1. *Skalierbarkeit* des Prägevorgangs, was Kosten und Durchsatz betrifft. Wenn der Anwendungsfall darauf abzielt, schnell NFTs zu erstellen, muss die zugrunde liegende Technologie alle Minting-Anfragen verarbeiten können und das Prägen sollte billig sein.
2. *Haltbarkeit* der NFT, da die Assets langlebig sein können und daher lebenslang nutzbar bleiben müssen.
3. *Unveränderlichkeit* des NFT und des Assets, das es repräsentiert, um zu verhindern, dass unerwünschte Änderungen vorgenommen werden und betrügerischen Akteure das digitale Asset verändern, welches das NFT repräsentiert.

[Polygon](https://polygon.technology) stellt die *Skalierbarkeit* mit seinem Protokoll und Framework sicher. Sie sind außerdem mit Ethereum und seiner virtuellen Maschine kompatibel, was es Entwicklern ermöglicht, ihren Code frei zwischen den beiden Blockchains zu bewegen. Ebenso garantiert [NFT.Storage](https://nft.storage) die *Haltbarkeit* mit dem zugrundeliegenden [Filecoin](https://filecoin.io)-Netzwerk und die *Unveränderlichkeit* mit der [Inhaltsadressierung](https://nftschool.dev/concepts/content-addressing/) von IPFS.

In diesem Leitfaden findest du einen Überblick über das NFT-Minting und erfährst, wie man ein digitales Asset mit NFT.Storage speichert und dieses digitale Asset verwendet, um dein NFT auf Polygon zu prägen.

## Voraussetzungen {#prerequisites}

Allgemeines Wissen über NFTs liefert Hintergrundwissen und Kontext. [Die NFT-Schule beschreibt NFT-Grundlagen](https://nftschool.dev/concepts/non-fungible-tokens/), erklärt fortgeschrittene Themen und enthält weitere Leitfäden.

Um den Code in diesem Leitfaden zu testen und auszuführen, benötigst du eine funktionierende [Node.js-Installation.](https://nodejs.org/en/download/package-manager/)

Du benötigst auch eine Polygon-Wallet am Mumbai-Testnet mit einer geringen Menge des MATIC-Tokens. Befolge die nachfolgende Anleitung, um loszulegen:

1. **Lade [Metamask](https://metamask.io/) herunter und installiere es**. Metamask ist eine Krypto-Wallet und ein Gateway zu Blockchain-Apps. Sie ist sehr einfach zu verwenden und vereinfacht viele Schritte, z. B. die Einrichtung einer Polygon-Wallet.
2. **Verbinde Metamask mit Polygons [Mumbai-Testnet](https://docs.polygon.technology/docs/develop/metamask/overview)** und wähle es im Auswahlmenü. Wir verwenden Polygons Testnet, um unsere NFT zu prägen, da es kostenlos ist.
3. **Empfange MATIC-Token** in deiner Wallet, indem du den [Faucet](https://faucet.polygon.technology/) nutzt. Wähle das Mumbai-Testnet und füge deine Wallet-Adresse aus Metamask in das Formular ein. Um ein NFT zu prägen, müssen wir einen geringen MATIC-Betrag bezahlen, welcher von Minern als Gebühr für das Hinzufügen von neuen Transaktionen zur Blockchain erhoben wird, z. B. das Prägen eines NFT oder das Erstellen eines neuen Smart Contracts.
4. **Kopiere deinen privaten Schlüssel** aus Metamask, indem du auf die drei Punkte in der oberen rechten Ecke klickst und „Kontodaten“ auswählst. Unten findest du Button, um deinen privaten Schlüssel zu exportieren. Klick darauf und gib dein Passwort ein, wenn du dazu aufgefordert wirst. Du kannst den privaten Schlüssel in der Zwischenzeit in eine Textdatei kopieren. Wir werden ihn später verwenden, wenn wir mit der Blockchain interagieren.

Schließlich benötigst du einen Text- oder Code-Editor. Wähle am besten einen Editor mit Sprachunterstützung für JavaScript und Solidity. Eine gute Wahl ist [Visual Studio Code](https://code.visualstudio.com) mit aktivierter [Solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity)-Erweiterung.

## Vorbereitung {#preparation}

### Einen API-Schlüssel für NFT.storage erhalten {#get-an-api-key-for-nft-storage}

Um NFT.Storage zu nutzen, benötigst du einen API-Schlüssel. [Gehe zuerst auf NFT.Storage und logge dich dort mit deiner E-Mail-Adresse ein](https://nft.storage/login/). Du erhältst eine E-Mail mit einem magischen Link, über den du dich anmeldest – es ist kein Passwort nötig. Nach der Anmeldung, öffne die API-Schlüssel über die Navigationsleiste. Dort findest du eine Schaltfläche zur Erstellung eines **neuen Schlüssels**. Wenn du nach einem Namen für den API-Schlüssel gefragt wird, wähle einen beliebigen Namen oder verwende „Polygon + NFT.Storage“. Du kannst den Inhalt der Schlüsselspalte jetzt kopieren oder später wieder zu NFT.Storage zurück kommen.

### Richte deinen Arbeitsbereich ein {#set-up-your-workspace}

Erstelle einen neuen, leeren Ordner, den wir als Arbeitsbereich für diesen Leitfaden verwenden können. Wähle jeden beliebigen Namen und Speicherort in deinem Dateisystem. Öffne ein Terminal und navigiere zum neu erstellten Ordner.

Danach installieren wir die folgenden Node.js-Abhängigkeiten:

- **Hardhat und Hardhat-Ethers**, eine Entwicklungsumgebung für Ethereum (und mit Ethereum kompatible Blockchains wie Polygon).
- **OpenZeppelin**, eine Sammlung von Smart-Verträgen mit standardisierten NFT-Basisverträgen.
- NFT.**Storage**, eine Bibliothek, um sich mit der NFT.Storage API zu verbinden.
- **Dotenv**, eine Bibliothek zur Verwaltung von Umgebungsdateien für die Konfiguration (z. B. Integration von privaten Schlüsseln in das Script).

Verwende den folgenden Befehl, um alle Abhängigkeiten gleichzeitig zu installieren:

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Hardhat muss im aktuellen Ordner initialisiert werden. Um die Initialisierung zu starten, führe Folgendes aus:

```bash
npx hardhat
```

Wenn du aufgefordert bist, wähle **Erstelle eine leere hardhat.config.js**. Deine Konsolenausgabe sollte wie folgt aussehen:

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

Wir werden einige Änderungen an der Hardhat-Konfigurationsdatei vornehmen, um das Polygon Mumbai-Testnetzwerk `hardhat.config.js`zu unterstützen. Öffne die `hardhat.config.js`, die im Schritt erstellt wurde. Bitte beachte, dass wir den privaten Schlüssel deiner Polygon-Wallet aus einer Umgebungsdatei laden und diese Datei sicher aufbewahrt werden muss. Du kannst nach Bedarf sogar einen anderen rpc-[Link](https://docs.polygon.technology/docs/develop/network-details/network) verwenden.

```js
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
    PolygonMumbai : {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

Erstelle eine neue Datei, `.env`die deinen API-Key für NFT.Storage und deinen Polygon Wallet Private Key enthält. Der Inhalt der `.env`Datei sollte etwas aussehen, wie:

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

Ersetze die Platzhalter durch den API-Schlüssel, den du bei der Vorbereitung erstellt hast, und den privaten Schlüssel deiner Polygon-Wallet.

Damit unser Projekt gut organisiert bleibt, erstellen wir drei neue Ordner:

1. `contracts` für die Polygon-Vertrage in Solidity.
2. `assets`, mit den digitalen Assets, die wir als NFT prägen werden.
3. `scripts`, als Helfer für die Vorbereitung und das Minting.

Führe den folgenden Befehl aus:

```bash
mkdir contracts assets scripts
```

Schließlich fügen wir ein Bild zum `assets`-Ordner hinzu. Dieses Bild wird unsere Grafik sein, die wir auf NFT.Storage hochladen und auf Polygon prägen. Wir werden es vorübergehend `MyExampleNFT.png` nennen. Falls du kein schönes Bild hast, kannst du [ein einfaches Muster herunterladen](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu).

## Dein NFT prägen {#minting-your-nft}

### Speichern von Assetdaten mit NFT.Storage {#storing-asset-data-with-nft-storage}

Wir verwenden NFT.Storage, um unser digitales Asset und seine Metadaten zu speichern. NFT.Storage garantiert Unveränderlichkeit und Haltbarkeit, indem dein Asset automatisch auf Filecoin und IPFS hochgeladen wird. IPFS und Filecoin arbeiten mit Inhaltskennzeichnern (CID) für die unveränderliche Referenzierung. IPFS ermöglicht schnelles Abrufen mit georepliziertem Caching und Filecoin garantiert Haltbarkeit mit anreizbasierten Speicheranbietern.

Erstelle ein Skript namens `store-asset.mjs` unter dem `scripts`-Verzeichnis. Die Inhalte sind unten angeführt:

```js
import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env

async function storeAsset() {
   const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
   const metadata = await client.store({
       name: 'ExampleNFT',
       description: 'My ExampleNFT is an awesome artwork!',
       image: new File(
           [await fs.promises.readFile('assets/MyExampleNFT.png')],
           'MyExampleNFT.png',
           { type: 'image/png' }
       ),
   })
   console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

Der Hauptteil des Skripts ist die Funktion `storeAsset`. Sie erstellt einen neuen Client, der sich mit dem zuvor erstellten API-Schlüssel mit NFT.Storage verbindet. Als Nächstes präsentieren wir die Metadaten, die aus Namen, Beschreibung und Bild bestehen. Beachte, dass wir das NFT-Asset direkt aus dem Dateisystem aus dem `assets`-Verzeichnis lesen. Am Ende der Funktion drucken wir die Metadaten-URL, die wir später verwenden, wenn wir das NFT bei Polygon erstellen.

Nach der Einrichtung des Skripts kannst du ihn auf folgende Weise ausführst:

```bash
node scripts/store-asset.mjs
```

Deine Ausgabe sollte wie die folgende Liste aussehen, wobei `HASH` die CID für die soeben gespeicherte Grafik ist.

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### Erstellung deines NFT auf Polygon {#creating-your-nft-on-polygon}

#### Erstelle den Smart Contract für das Minting {#create-the-smart-contract-for-minting}

Zunächst erstellen wir einen Smart Contract, der verwendet wird, um das NFT zu prägen. Da Polygon mit Ethereum kompatibel ist, schreiben wir den Smart Contract in [Solidity](https://soliditylang.org). Erstelle eine neue Datei für unseren NFT-Smart-Contract namens `ExampleNFT.sol`im `contracts`-Verzeichnis. Du kannst den Code der unten stehenden Liste kopieren:

```solidity
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleNFT is ERC721URIStorage, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("NFT", "ENFT") {}

   function mintNFT(address recipient, string memory tokenURI)
       public onlyOwner
       returns (uint256)
   {
       _tokenIds.increment();

       uint256 newItemId = _tokenIds.current();
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);

       return newItemId;
   }
}
```

Um ein gültiges NFT zu sein, muss der Smart- Contract alle Methoden des [ERC-721 Standards](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/) implementieren. Wir nutzen die Implementierung der [OpenZeppelin](https://openzeppelin.com)-Bibliothek, die bereits eine Reihe von grundlegenden Funktionen bietet und den Standard einhält.

Am Anfang des Smart Contracts importieren wir drei OpenZeppelin Smart-Contract-Klassen:

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol` enthält die Implementierung der grundlegenden Methoden des ERC-721-Standards, die unser NFT-Smart-Contract erben wird. Wir verwenden `ERC721URIStorage,`, eine Erweiterung um nicht nur die Assets sondern auch Metadaten außerhalb der Chain als JSON-Datei zu speichern. Wie der Vertrag muss diese JSON-Datei ERC-721 einhalten.

2. `\@openzeppelin/contracts/utils/Counters.sol` liefert Zähler, die nur um eins erhöht oder verringert werden können. Unser Smart Contract verwendet einen Zähler, um die Gesamtanzahl der geprägten NFTs zu erfassen und und die einzigartige ID auf unserem neuen NFT festzulegen.

3. `\@openzeppelin/contracts/access/Ownable.sol` richtet die Zugriffskontrolle unseres Smart Contracts ein, damit nur der Besitzer des Smart Contracts (du) NFTs prägen kann.

Nach unseren Importanweisungen erhalten wir unseren benutzerdefinierten NFT-Smart-Contract, der einen Zähler, einen Konstruktor und eine Methode zum Prägen der NFT enthält. Den Großteil der Arbeit erledigt der Basisvertrag, der von OpenZeppelin geerbt wurde, das die meisten Methoden implementiert, die wir benötigen, um einen NFT zu erstellen, der den ERC-721-Standard einhält.

Der Zähler verfolgt die Gesamtanzahl der geprägten NFTs, die bei der Minting-Methode als eindeutige Kennung für das NFT verwendet wird.

Im Konstruktor geben wir zwei String-Argumente für den Namen des Smart-Contracts und das Symbol (in Wallets dargestellt) weiter. Du kannst sie nach Belieben ändern.

Schließlich haben wir unsere Methode `mintNFT`, die es uns ermöglicht, das NFT tatsächlich zu prägen. Die Methode ist auf `onlyOwner` eingestellt, damit sie nur vom Eigentümer des Smart Contracts ausgeführt werden kann.

`address recipient`gibt die Adresse an, die zuerst die NFT empfängt.

`string memory tokenURI` ist eine URL, die sich mit einem JSON-Dokument lösen sollte, das die Metadaten des NFT beschreibt. In unserem Fall ist sie bereits in NFT.Storage gespeichert. Wir können den an die Metadaten-JSON-Datei zurückgegebenen IPFS-Link beim Ausführen der Methode verwenden.

Im Rahmen der Methode erhöhen wir den Zähler, um eine neue eindeutige Kennung für unser NFT zu erhalten. Danach rufen wir die Methoden, die vom Basisvertrag bereitgestellt werden, über OpenZeppelin auf, um das NFT auf den Empfänger mit der neu erstellten Kennung und Einstellung der URI der Metadaten zu prägen. Die Methode gibt die eindeutige Kennung nach der Ausführung zurück.

#### Stelle den Smart Contract bei Polygon bereit {#deploy-the-smart-contract-to-polygon}

Jetzt kann unser Smart Contract auf Polygon bereitgestellt werden. Erstelle eine Datei namens `deploy-contract.mjs` im `scripts`-Verzeichnis. Kopiere die Inhalte der unten stehende Liste in diese Datei und speichere sie.

```js
async function deployContract() {
 const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
 const exampleNFT = await ExampleNFT.deploy()
 await exampleNFT.deployed()
 // This solves the bug in Mumbai network where the contract address is not the real one
 const txHash = exampleNFT.deployTransaction.hash
 const txReceipt = await ethers.provider.waitForTransaction(txHash)
 const contractAddress = txReceipt.contractAddress
 console.log("Contract deployed to address:", contractAddress)
}

deployContract()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });
```

Die Bereitstellung des Vertrags erfolgt mit den Helfer-Funktionen, die von der Hardhat-Bibliothek bereitgestellt werden. Erstens erhalten wir den Smart Contract, den wir im vorherigen Schritt erstellt haben, mit dem bereitgestellten Factory. Danach stellen wir ihn bereit, indem wir die jeweilige Methode aufrufen und warten, bis die Bereitstellung abgeschlossen ist. Unter dem beschriebenen Code findest du ein paar Zeilen, um die richtige Adresse in der Testnet-Umgebung zu erhalten. Speichere die `mjs`Datei.

Führe das Skript mit dem folgenden Befehl aus:

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

Wenn alles richtig ist, siehst du die folgende Ausgabe:

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

Beachte, dass du die gedruckte Vertragsadresse im Minting-Schritt benötigst. Du kannst sie in eine separate Textdatei kopieren und sie für später speichern. Das ist notwendig, damit das Minting-Skript die Minting-Methode dieses speziellen Vertrags aufrufen kann.

#### Prägen des NFT auf Polygon {#minting-the-nft-on-polygon}

Das Prägen des NFT ist jetzt das Aufrufen des Vertrags, den wir auf Polygon bereitgestellt haben. Erstelle eine neue Datei namens `mint-nft.mjs` im `scripts`-Verzeichnis und kopiere diesen Code aus der unten stehenden Liste:

```bash
const CONTRACT_ADDRESS = "0x00"
const META_DATA_URL = "ipfs://XX"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

Bearbeite die ersten beiden Zeilen, um deine **Vertragsadresse** aus der früheren Bereitstellung und die **Metadaten-URL**, die beim Speichern des Assets mit NFT.Storage zurückgegeben wurde, einzufügen. Der Rest des Skripts richtet das Aufrufen deines Smart Contracts mit dir als Besitzer des NFT und dem Zeiger auf die bei IPFS gespeicherten Metadaten, ein.

Führe danach das Skript aus:

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

Du kannst die folgende Ausgabe erwarten:

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

Suchst du nach dem Beispielcode dieses Tutorials? Du findest ihn im polygon-nft.storage-demo [Link](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo) Github-Repo.

## Schlussfolgerung {#conclusion}

In diesem Leitfaden haben wir gelernt, wie man ein NFT mit Polygon und NFT.Storage prägt. Diese Technologiekombination führt zu einer richtigen Dezentralisierung und garantiert *Skalierbarkeit*, *Haltbarkeit* und *Unveränderlichkeit*.

Wir haben einen benutzerdefinierten Smart Contract bereitgestellt, um unser NFT entsprechend unserer Bedürfnisse zu prägen. In diesem Leitfaden nutzten wir ein einfaches Beispiel, das auf dem ERC-721-Standard basiert. Du kannst jedoch auch komplexe Logik definieren, die den Lebenszyklus deines NFT regelt. Für komplexere Anwendungsfälle ist der Nachfolgestandard [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/) ein guter Ausgangspunkt. OpenZeppelin, die Bibliothek, die wir in unserem Leitfaden verwenden, bietet einen [Vertragsassistenten](https://docs.openzeppelin.com/contracts/4.x/wizard) an, der dich bei der Erstellung von NFT-Verträgen unterstützt.

Erfolgreiches Minting ist der Beginn der wertvollen Phase des NFT. Das NFT kann dann verwendet werden, um das Eigentum zu beweisen und kann an andere Benutzer übertragen werden. Gründe für die Übertragung eines NFT könnten der erfolgreiche Verkauf auf einem NFT-Marktplatz wie [OpenSea](https://opensea.io) sein, oder eine andere Art von Event wie der Erwerb eines Elements in einem NFT-basierten Spiel. Die Erkundung der umfassenden Möglichkeiten für NFTs ist definitiv ein aufregender nächster Schritt.

Wenn du beim Aufbau deines NFT-Projekts mit NFT.Storage helfen möchtest, empfehlen wir dir, dich dem `#nft-storage`Channel auf D[iscord ](https://discord.gg/Z4H6tdECb9)und [Slack](https://filecoinproject.slack.com/archives/C021JJRH26B) beizutreten.
