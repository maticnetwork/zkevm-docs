---
id: getting-started
title: Einführung in Polygon PoS
sidebar_label: Quick Start
description: Erstelle deine nächste Blockchain-App auf Polygon.
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

:::caution Aktualisierung der Entwicklungsdokumente

Die Dokumente werden aktualisiert, erweitert und verbessert. Änderungen sind möglich.
Bitte kontaktiere uns, falls du Fragen oder Anregungen hast.

:::

Herzlich willkommen bei **Polygon (früher Matic Network)**! Die innovativste und spannendste Plattform zur Entwicklung deiner Blockchain-App. Das Ziel der Blockchain-Technologie ist es, die Datenverwaltung und Geschäftstätigkeit in der digitalen Welt zu revolutionieren. Du kannst dich an dieser Revolution beteiligen, indem du als einer der Ersten die dezentrale App-Entwicklung (dApp) von Polygon nutzt.

Dieser Leitfaden beschreibt das Polygon-Ökosystem. Hier findest du Links zu wertvollen Ressourcen und Webseiten über die App-Erstellung bei Polygon und die allgemeine Entwicklung von Blockchain-Apps.

:::tip Immer auf dem Laufenden

Informiere dich über die neuesten Builder-Updates des Polygon
Teams und der Community, indem du die
[<ins>Polygon Benachrichtigungsgruppen</ins>](https://polygon.technology/notifications/).

:::

Polygon's Test Network which is called **Mumbai** connects with **Ethereum's Goërli Testnet.** All the network related details can be found in [network docs](/docs/operate/network).

## Die wichtigsten Funktionen von Polygon {#key-features-of-polygon}

- **Geschwindigkeit**: Das Polygon Network verwendet eine high-throughput mit Konsens, die von einer Gruppe von Block Producers bereitgestellt wird, die von den Stakeholdern an jedem Checkpoint ausgewählt wird. Eine Stake-Nachweis wird genutzt, um Blöcke zu validieren und regelmäßig die Nachweise von Blockproduzenten auf das Ethereum-Mainnet zu posten. Dies ermöglicht eine schnelle Blockbestätigung innerhalb von etwa 2 Sekunden, während starke Dezentralisierung und ein ausgezeichneter Durchsatz im Netzwerk erhalten bleiben.
- **Skalierbarkeit**: Polygon Network erreicht eine hypothetische Transaktionsgeschwindigkeit von weniger als 2 Sekunden auf einer einzigen Sidechain. Die Nutzung mehrerer Sidechains hilft dem Netzwerk, Millionen von Transaktionen pro Sekunde zu verarbeiten. Dieser Mechanismus (bereits in der ersten Matic-Sidechain zu finden) ermöglicht es, das Polygon-Netzwerk leicht zu skalieren.
- **Security**: Die Smart Contracts von Polygon verlassen sich auf die Sicherheit von Ethereum. Um das Netzwerk zu schützen, werden drei kritische Sicherheitsmodelle angewandt. Es nutzt die **Verträge zur Staking-Verwaltung** von Ethereum und anreizbasierte Validatoren auf **Heimdall**- und **Bor**-Knoten. Außerdem können die Entwickler beide Modelle (Hybrid) in ihre dApp integrieren.

## Entwicklung bei Polygon {#building-on-polygon}

Falls du ein Ethereum-Entwickler bist, bist du bereits ein Polygon-Entwickler. Wechsle einfach zum [Polygon RPC](https://polygon-rpc.com/) und lege los. Alle Tools, die du von der Ethereum-Blockchain kennst, werden standardmäßig auf Polygon unterstützt, wie Truffle, Remix und Web3js.

Sie können dezentrale Apps für das Polygon Mumbai Testnet oder Mainnet bereitstellen. Das Polygon Mumbai Testnet verbindet sich mit dem Ethereum Goërli Testnet, das als ParentChain fungiert. Alle Informationen über das Netzwerk findest du in der [Netzwerkdokumentation](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/network-details/network.md).

### Wallets {#wallets}

Um mit dem Polygon-Netzwerk zu interagieren, musst du eine Ethereum-basierte Wallet haben, da Polygon auf der Ethereum Virtual Machine (EVM) läuft. Du kannst eine [Metamask](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md)- oder eine [Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md)-Wallet einrichten. Mehr zu wallet-related Informationen und warum du [brauchst,](https://docs.polygon.technology/docs/develop/wallets/getting-started) findest du in unserer Wallet-Dokumentation.

### Smart Contracts {#smart-contracts}

Polygon unterstützt viele Dienste, die du zum Testen, Kompilieren, Debuggen und für die Bereitstellung dezentraler Apps im Polygon-Netzwerk nutzen kannst. Dazu gehört die Bereitstellung mit [Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md), [Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md), [QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md), [Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md), [Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md), [Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md) und [Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md).

### Verbindung mit Polygon {#connecting-to-polygon}

Du kannst Polygon zu Metamask hinzufügen oder Arkane direkt nutzen, um dich über [RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/) mit Polygon zu verbinden.

Um sich mit dem Polygon Netzwerk zu verbinden, um blockchain zu lesen, empfehlen wir die Verwendung des Alchemy SDK.

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

### Erstellst du eine neue dApp auf Polygon? {#building-a-new-dapp-on-polygon}

Dezentrale Apps (dApps) fungieren als Brücke zwischen Benutzern und ihrem Datenschutz auf der Blockchain. Die steigende Anzahl von dApps bestätigt ihre Nützlichkeit im Blockchain-Ökosystem und löst Herausforderungen wie Transaktionen zwischen zwei Teilnehmern ohne zentrale Behörde über smarte Verträge.

Nehmen wir an, dass du keine Erfahrung mit dem Erstellen von dezentralen Apps (dApps) hast. Die unten genannten Ressourcen geben dir einen Überblick über die Tools, die du zum Erstellen, Debuggen und für die Bereitstellung von dApps im Polygon-Netzwerk benötigt werden.

- [Full Stack dApp: Tutorial-Serie](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffle](https://docs.polygon.technology/docs/develop/truffle)
- [Metamask](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [Entwickle eine dApp mit Fauna, Polygon und React](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### Hast du bereits eine dApp? {#already-have-a-dapp}

Wenn du bereits eine dezentrale App (dApp) hast und eine Plattform suchst, um effizient zu skalieren, bist du hier richtig. Polygon ermöglicht dir:

1. **Einfache Migration von einer Chain auf Basis der Ethereum Virtual Machine (EVM)**: Polygon ist stolz darauf, die ultimative Layer-2-Skalierungslösung für Ethereum zu sein. Du musst dir keine Sorgen über die zugrunde liegende Architektur machen, während deine dApps in das Polygon-Netzwerk verschoben oder dort bereitgestellt werden, sofern sie EVM-kompatibel sind.
2. **Nutze Polygon als schnellere Transaktionsschicht**: Die Bereitstellung deiner dApp auf dem Polygon Mainnet ermöglicht es dir, Polygon als schnellere Transaktionsschicht für deine dApp zu nutzen. Außerdem kannst du Token nutzen, die von uns gemappt wurden. In unserer [technischen Diskussionsgruppe](http://bit.ly/matic-technical-group) auf Telegram erfährst du mehr.

## Randbemerkung {#side-note}

Falls du überwältigt bist, ist das kein Problem! Leg einfach direkt los und erlebe die Action. Hier sind einige Hinweise, bevor du Ressourcen, Respositorys und Dokumente studierst:

1. Beachte **die Nachteile einer hochmodernen Technologie**: Wie alle typischen Nischen-Programme sind dApps und die Blockchain sehr schnelllebig. Während der Recherche findest du möglicherweise komplexe Code-Repositorys, 404s auf einer Dokumentationsseite oder fehlende Dokumentation. Nutze diese Gelegenheit, um uns über unsere Social-Media-Kanäle zu erreichen.
2. **Die zu lernenden Inhalte können unüberwindbar erscheinen, aber die Eintrittsbarriere ist niedrig**: die Community ist sehr offen und einladend! Projekte begrüßen Pull-Anfragen von Außenstehenden und gehen aktiv mit Blockern um. Wir arbeiten daran, eine bessere Welt zu erschaffen. Dein Betrag wird sehr geschätzt. Wir würden uns freuen, dich in diesem großartigen Web3-Ökosystem begrüßen zu dürfen.

:::info Bleib auf dem aktuellen Stand

Die dezentrale App-Entwicklung fördert die Dezentralisierung von Netzwerken. Folge uns in den sozialen Medien für weitere Informationen und Updates über das Polygon-Ökosystem. Die Links zu allen Polygon-Communitys findest du [hier](https://polygon.technology/community/).

:::
