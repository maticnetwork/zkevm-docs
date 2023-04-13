---
title: Tellor
description: "Ein Leitfaden zur Integration des Tellor Orales in deinen Polygon-Vertrag."
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor ist ein Oracle, das zensurresistente Daten liefert, die durch einfache krypto-ökonomische Anreize gesichert werden. Daten können von jedem bereitgestellt und von jedem überprüft werden. Die flexible Struktur von Tellor kann jederzeit Daten bereitstellen, um Experimente und Innovationen zu ermöglichen.

## (Soft) Voraussetzungen {#soft-prerequisites}

Wir nehmen die folgenden Codierungs-Kenntnisse an, um uns auf den Oracle-Aspekt konzentrieren zu können.

Annahmen:

- du findest dich in einem Terminal zurecht
- du hast npm installiert
- du weißt, wie du npm zur Verwaltung von Abhängigkeiten nutzen kannst

Tellor ist ein Live- und Open-Source-Oracle, das sofort implementiert werden kann. Dieser Leitfaden für Anfänger ist hier, um die Leichtigkeit zu zeigen, mit der man mit Tellor aufstehen und laufen kann, und dein Projekt mit einem vollständig dezentralen und censorship-resistant Orakel versorgt.

## Übersicht {#overview}

Tellor ist ein Oracle-System, mit dem Parteien den Wert eines Off-Chain-Datenpunktes (z. B. BTC/USD) anfordern können und Reporter versuchen, diesen Wert einer On-Chain-Datenbank hinzuzufügen, auf die alle Polygon Smart Contracts zugreifen können. Die Eingaben in diese Datenbank werden durch ein Netzwerk von zirkulierenden Reportern gesichert. Tellor nutzt krypto-ökonomische Anreizsysteme. Ehrliche Dateneingaben von Reportern werden durch Token von Tellor belohnt. Unseriöse Akteure werden schnell bestraft und mit einem Einspruchsmechanismus aus dem Netzwerk entfernt.

In diesem Leitfaden erfährst du:

- Einrichtung des ersten Toolkits, das du für den Start benötigst.
- Ein einfaches Beispiel.
- Liste von Tesnet-Adressen von Netzwerken, auf denen du Tellor derzeit testen kannst.

## UsingTellor {#usingtellor}

Installiere zuerst die Tools, die für die Verwendung von Tellor als Oracle benötigt werden. Verwende [dieses Paket](https://github.com/tellor-io/usingtellor), um die Benutzerverträge von Tellor zu installieren:

`npm install usingtellor`

Sobald diese installiert wurden, können deine Verträge die Funktionen aus dem Vertrag „UsingTellor“ erben.

Großartig! Jetzt sind alle Tools bereit. Sehen wir uns jetzt ein Beispiel dafür an, wie wir den Bitcoin-Preis abrufen können:

### BTC/USD Beispiel {#btc-usd-example}

Erbe den UsingTellor-Vertrag und gib die Tellor-Adresse als Konstruktorargument weiter:

Hier ist ein Beispiel:

```solidity
import "usingtellor/contracts/UsingTellor.sol";

contract PriceContract is UsingTellor {

  uint256 public btcPrice;

  //This Contract now has access to all functions in UsingTellor

  constructor(address payable _tellorAddress) UsingTellor(_tellorAddress) public {}

  function setBtcPrice() public {

    bytes memory _b = abi.encode("SpotPrice",abi.encode("btc","usd"));
    bytes32 _queryID = keccak256(_b);

    uint256 _timestamp;
    bytes _value;

    (_value, _timestamp) = getDataBefore(_queryId, block.timestamp - 15 minutes);

    btcPrice = abi.decode(_value,(uint256));
  }
}
```

## Adressen: {#addresses}

Tellor-Tribute: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

Oracle: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### Möchtest du zuerst Tests durchführen?: {#looking-to-do-some-testing-first}

Polygon Mumbai Testnet: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

Test[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

Brauchen Sie einige Test-Token? Tweet uns an ['@trbfaucet'](https://twitter.com/trbfaucet)

Zur einfachen Nutzung kommt der UsingTellor Repo mit einer Version des [Tellor](https://github.com/tellor-io/TellorPlayground) Playground zur einfacheren Integration. Hier findest du [eine](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) Liste der hilfreichen Funktionen.

#### Für eine robustere Implementierung des Tellor-Oracles findest du [hier](https://github.com/tellor-io/usingtellor/blob/master/README.md) die Liste der verfügbaren Funktionen.

#### Hast du noch Fragen? Melde dich der Community [hier!](https://discord.gg/tellor)
