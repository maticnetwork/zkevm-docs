---
id: replit
title: Bereitstellung eines Smart Contract mit Replit
sidebar_label: Using Replit
description: Smarte Contracts mit ReplitIDE auf Polygon bereitstellen.
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Übersicht {#overview}

[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) ist eine Codierungsplattform, die es dir ermöglicht, Code zu schreiben und Apps zu hosten. Replit unterstützt die [Solidity-Programmiersprache](https://replit.com/@replit/Solidity-starter-beta?v=1), damit sie alle Funktionen für Web3-Entwickler bereitstellt, um Smart Contracts zu erstellen und bereitzustellen.

Dieser Artikel führt dich zum Erstellen und Bereitstellen eines solidity Contracts auf Polygon mit der [Replit IDE](https://replit.com/signup) und [der Replit Solidity Development Template (Solidity starter beta)](https://replit.com/@replit/Solidity-starter-beta?v=1).

## Was werden wir hier tun: {#what-you-will-do}

- Erstellung eines Replit-Kontos
- Erstellung einer Repl-Umgebung
- Bereitstellen eines Beispielprojekts im Polygon Mumbai Netzwerk
- Überprüfung des Vertrags
- Veröffentliche dein Projekt in einem persönlichen Replit-Profil.

:::tip

Für weitere Beispiele zu Solidität mit Replit kannst du den Artikel lesen. <ins>**[Starte mit Replit](https://blog.replit.com/solidity)**</ins> oder überprüfe <ins>**[die Replit Solidity und das Escrow contract](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins>
:::

## Voraussetzungen {#prerequisites}

Du brauchst keine lokale environment um deinen solidity auf Polygon mit Replit bereitzustellen.

Du benötigst eine browser-basierte Web3-Wallet, um mit dem Polygon Mumbai Testnet und bereitgestellten Verträgen zu interagieren. Wenn du Metamask bereits verwendest, solltest du ein neues Konto für Tests mit Replit erstellen. Das ist über das Kontomenü möglich, welches erscheint, wenn du auf das Konto-Avatar in der oberen rechten Ecke der MetaMask-Schnittstelle klickst.

Du musst die folgenden Voraussetzungen einrichten, um deinen Solidity Smart Contract bei Polygon bereitzustellen:

1. [Erstellung eines Replit-Kontos](https://replit.com/signup)
2. [MetaMask Wallet herunterladen](/docs/develop/metamask/hello)
3. [Polygon bei Metamask konfigurieren](/docs/develop/metamask/config-polygon-on-metamask)
4. [Tesnet-Token abrufen](https://faucet.polygon.technology)

## Mit einem Repl arbeiten {#working-with-a-repl}

Jedes Repl, das du erstellst, ist eine voll funktionsfähige Entwicklungs- und Produktionsumgebung. Befolgen die Schritte, um ein Solidity Starter Replit zu erstellen:

1. [Logge dich ein](https://replit.com/login) oder [eröffne ein Konto](https://replit.com/signup). Nach der Erstellung Ihres [Replit Kontos](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) wird dein Startbildschirm ein Dashboard enthalten, in dem du dir ansehen, Projekte erstellen und dein Konto verwalten kannst.

![img](/img/replit/dashboard.png)

2. Sobald du eingeloggt bist, erstelle eine Solidity wähle **+ Create Repl** aus dem linken Panel oder **+** in der oberen rechten Ecke des Bildschirms.

![img](/img/replit/solidity.png)

3. Wählen Sie die [**Solidity Starter (Beta)**](https://replit.com/@replit/Solidity-starter-beta?v=1) Vorlage aus und geben Sie Ihrem Projekt einen Titel.

4. Klicke auf **+ Create Repl** um dein Projekt zu erstellen.

:::note

Die Solidity Starter Repl kommt mit einer browser-friendly Oberfläche, die mit der <ins>**[Web3 Ethereum JavaScript API](https://web3js.readthedocs.io/en/v1.5.2/)**</ins> erstellt wurde, die du zur Bereitstellung und Interaktion mit unseren Verträgen verwenden kannst. Wir werden auf Replit’s testnet bereitstellen, einer benutzerdefinierten Version der Ethereum Blockchain, die von Replit verwaltet und für den Test optimiert wird.

:::

## Bereitstellung bei Polygon {#deploy-on-polygon}

Vergewissere dich, dass du der Liste der **Voraussetzungen** oben gefolgt hast, damit du bereit bist, deinen Smart Contracts einzusetzen und mit dir zu interagieren.

1. Klicke auf **Run** (am Top), um alle relevanten Pakete zu installieren und die Vertragsbereitstellung zu starten.

2. Verbinde deine MetaMask Wallet mit der Weboberfläche und wechsele auf das [Mumbai Testnet](docs/develop/metamask/config-polygon-on-metamask).

![img](/img/replit/connect.png)

3. Klicke auf **die** **Connect** wähle dein Konto aus und wähle Verbinden.

![img](/img/replit/deploy-list.png)

4. In der Dropdown-Liste wählen Sie den Vertrag aus, den Sie bereitstellen möchten. Klicke auf **Bereitstellen**.

5. Du erhältst ein MetaMask Popup-Fenster, das um deine Bestätigung fragt. Genehmigen Sie die Transaktion von Ihrer Wallet aus für die Bereitstellung Ihres Vertrags.

## Überprüfung und Testen deines Vertrags {#verifying-and-testing-your-contract}

Wenn der Vertrag bereitgestellt wird, [navigiere zu Polyganscan](https://mumbai.polygonscan.com/), um nach deinem Konto zu suchen, deinen bereitgestellten Vertrag zu sehen und deine Kontoadresse zu kopieren.

Sobald dein Vertrag bereitgestellt wurde, wird er als erweiterbare Felder unter dem Dropdown-Feld angezeigt. Erweitere es und sieh dir alle verfügbaren Funktionen an. Du kannst jetzt mit der angegebenen Benutzerschnittstelle oder über eine freigebbare URL, die auf der Schnittstelle angezeigt wird, mit deinem Vertrag interagieren.

## Auf Replit​ veröffentlichen {#publish-to-replit}

Replit ermöglicht es dir, deine Produkte in einem persönlichen Profil zu veröffentlichen. Nach der Veröffentlichung tauchen die Projekte auf deiner Spotlight-Seite auf, damit sie andere erkunden, damit interagieren, sie klonen und zusammenarbeiten können.

Führe die folgenden Schritte aus, um deine Projekte auf publish veröffentlichen:

1. Wähle den Projekttitel im oberen Bereich des Bildschirms.
2. Vervollständigen Sie Ihren Projektnamen und Ihre Beschreibung und klicken Sie auf **Veröffentlich**.
