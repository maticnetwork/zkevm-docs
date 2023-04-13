---
id: getting-started
title: Plasma-Bridge
sidebar_label: Introduction
description: Datenaustausch mit der Plasma-Bridge und dem Polygon-Netzwerk.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Bitte lesen Sie die neueste [Matic.js-Dokumentation über Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/), um loszulegen.

Eine Bridge besteht aus einer Reihe von Contracts und ermöglicht es Ihnen, Assets von der Root-Chain zur Child-Chain zu verschieben. Es gibt zwei Haupt-Bridges, um Assets zwischen Ethereum und Polygon zu verschieben. Die erste ist die Plasma-Bridge, die zweite wird **PoS Bridge** oder **Proof of Stake Bridge** genannt. **Plasma-Bridge** bietet erhöhte Sicherheitsgarantien aufgrund des Plasma

Allerdings gibt es bestimmte Einschränkungen für das Child-Token und eine 7-tägige Einspruchsfrist für alle Exits/Auszahlungen von Polygon zu Ethereum über die Plasma-Bridge. Die [PoS-Bridge](/docs/develop/ethereum-polygon/pos/getting-started) ist flexibler und ermöglicht schnellere Auszahlungen.

Dieses Tutorial wird als Schritt-für-Schritt-Anleitung fungieren, um Plasma-Bridge mit [Matic JS](https://github.com/maticnetwork/matic.js) zu verstehen und zu verwenden, was der einfachste Weg ist, mit der Plasma-Bridge auf Polygon Network zu interagieren.

## Asset-Fluss in der Plasma-Bridge {#assets-flow-in-plasma-bridge}

Wir beschreiben in dieser Anleitung den Fluss von Asset-Übertragungen bei Polygon und wie dies mit Matic.js möglich ist:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. Der Benutzer legt Krypto-Assets in Polygon Vertrag auf der Hauptkette ein.
2. Sobald eingezahlte Token auf der Hauptkette bestätigt werden, werden die entsprechenden Token auf der Polygon-Kette reflektiert
   - Der Benutzer kann jetzt sofort Token an beliebige Personen übertragen, wofür sehr geringe Gebühren anfallen. Die Polygon-Chain verfügt über schneller Blöcke (ca. 1 Sekunde). So wird die Übertragung fast sofort durchgeführt.
3. Sobald ein Benutzer bereit ist, können er verbleibende Token von der Hauptkette abheben. Auszahlungen werden über die Plasma-Sidechain gestartet. Es wird ein Checkpoint-Intervall von Minuten festgelegt, in dem alle Blöcke auf der Polygon Block-Layer seit dem letzten Checkpoint validiert werden.
4. Sobald der Checkpoint an den main übermittelt wird, wird ein Exit NFT (ERC721) Token von gleichwertigem Wert erstellt.
5. Die abgezogenen Fonds können über ein process-exit auf deinen Ethereum acccount be werden.
   - Der Benutzer kann auch einen schnellen Exit über 0x oder Dharma nutzen (in Kürze verfügbar!)

### Voraussetzungen: {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Görli Faucet {#görli-faucet}

Um Transaktionen durchzuführen, benötigen Sie Ether in den Testkonten, die Sie beim Befolgen des Leitfadens verwenden. Falls du keine ETH auf Görli hast, kannst du die hier angegebenen faucet verwenden: https://goerli-faucet.slock.it/.

### Polygon Faucet {#polygon-faucet}

In diesem Leitfaden verwenden wir als Beispiel das ERC20-Token `TEST`im Görli-Netzwerk. Das ist ein TEST-Token. In Ihrer DApp können Sie es durch jeden ERC20-Token ersetzen. Um einige Test-`TEST`Token im Polygon-Netzwerk zu erhalten, können Sie auf den [Polygon Faucet](https://faucet.polygon.technology/) zugreifen.

:::note

Um deine eigenen Token für Ein- und Auszahlungen zu verwenden, musst du den Token 'mapped' erhalten, was im Wesentlichen bedeutet, die Verträge auf der Hauptkette und Sidechain 'Aware' deines benutzerdefinierten Tokens zu machen.

:::

### Grundlegende Einrichtung der Metamask-Wallet (optional) {#basic-setup-for-the-metamask-wallet-optional}

1. [Erstelle eine Wallet](/docs/develop/metamask/hello): Wenn du neu bei Wallets bist, richte ein MetaMask ein.
2. [Konfiguriere den Polygon testnet](/docs/develop/metamask/config-polygon-on-metamask): Um den flow auf Polygon leicht zu visualisieren, ist es lehrreich, wenn du den Polygon testnet auf Metamask. konfigurierst. Bitte beachten Sie, dass wir Metamask hier ausschließlich zur Veranschaulichung verwenden. Sie müssen Metamask nicht verwenden, um Polygon nutzen zu können.
3. [Mehrere Konten eröffnen](/docs/develop/metamask/multiple-accounts): Bevor Sie mit dem Leitfaden beginnen, müssen Sie 3 Ethereum-Testkonten haben.
4. [Token bei Polygon](/docs/develop/metamask/custom-tokens) konfigurieren: Um den Fluss der Geldmittel bei Polygon mit Matic.js darzustellen, können Sie Token bei Metamask konfigurieren. Der Token, der als Beispiel für dieses Tutorial genommen wird, kann in MetaMask konfiguriert `TEST`werden, um Kontostände leicht anzuzeigen. Nochmals beachte, dass dies **optional** ist. Du kannst die token und andere Variablen mit [web3.js](https://web3js.readthedocs.io/en/1.0/) abfragen.
