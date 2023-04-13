---
id: did-implementation
title: Umsetzung von Polygon DID
sidebar_label: Identity
description: Erfahre mehr über die DID-Umsetzung auf Polygon
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

Dies ist ein Einführungsleitfaden für die Benutzer, die die vom Polygon-Team veröffentlichten Umsetzungspakete verwenden sowie im Polygon-Buch einen Polygon-DID erzeugen und veröffentlichen möchten.

Die Polygon-DID-Umsetzung umfasst drei Pakete – den polygon-did-registrar, polygon-did-resolver und polygon-did-registry-Contract. Der nachfolgende Leitfaden ist für die Anwender bestimmt, die die Funktionen möchten, um einen DID auf oder aus dem Polygon-Netzwerk zu registrieren bzw. lesen.

Ein DID ist im Wesentlichen ein eindeutiger Identifikator, der ohne  eine zentrale Behörde erstellt wurde. DID wird im Rahmen von Verifiable Credentials verwendet, um Dokumente zu unterzeichnen. Dadurch kann der Benutzer sein Eigentum am Dokument bei Bedarf einfacher nachweisen.

## Polygon DID-Methode {#polygon-did-method}

Die Polygon DID-Methode entspricht den DID-Core-Spezifikationen und -Standards. Ein DID URI besteht aus drei durch Doppelpunkte getrennten Komponenten – dem Schema, Methodennamen und einem methodenspezifischen Identifikator. Für Polygon sieht die URI aus:

```
did:polygon:<Ethereum address>
```

Hier ist das Schema `did`, der Methodenname ist `polygon`und der methodenspezifische Identifier ist eine ethereum-Adresse.

## Umsetzung von Polygon DID {#polygon-did-implementation}

Polygon DID kann mithilfe von zwei Paketen umgesetzt werden. Der Benutzer kann die entsprechenden npm-Bibliotheken importieren und sie nutzen, um die Polygon DID-Methoden in ihre entsprechenden Anwendungen zu integrieren. Detaillierte Infos zur Umsetzung siehe den nächsten Abschnitt.

Zuerst muss man einen DID erstellen. Im Falle von Polygon DID beinhaltet dies zwei Schritten. Zuerst muss der Benutzer einen DID URI für sich generieren und ihn dann ins Polygon-Buch eintragen.

### DID erstellen {#create-did}

In deinem Projekt zur Erstellung einer Polygon DID URI muss man zuerst installieren:

```
npm i @ayanworks/polygon-did-registrar --save
```

Sobald die Installation abgeschlossen ist, kann der Benutzer sie wie folgt verwenden:

```
import { createDID } from "polygon-did-registrar";
```

Die `createdDID`Funktion hilft dem Benutzer, einen DID URI. zu generieren. Bei Erstellung eines DID kann es zwei Szenarien geben.

  1. Der Benutzer besitzt bereits eine Wallet und möchte einen DID für die gleiche Wallet erstellen.

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. Wenn der Benutzer keine vorhandene Wallet besitzt und eine generieren möchte, kann der Benutzer Folgendes verwenden:

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

Der Netzwerkparameter bezieht sich in beiden Fällen darauf, ob der Benutzer die DID auf Polygon Mumbai Testnet oder Polygon Mainnet erstellen will.

Sample Input:

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

Nach der Erstellung von DID wirst du eine DID URI generiert.

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### Registrieren DID {#register-did}

Um die DID URI und das entsprechende DID Dokument auf ledger zu registrieren, muss der Benutzer zuerst `polygon-did-registrar`wie folgt verwenden:

```js
import { registerDID } from "polygon-did-registrar";
```

Als Voraussetzung für die Registrierung von DID muss der Benutzer sicherstellen, dass die DID, an den DID über die notwendige tokens verfügt. Sobald der Benutzer ein Token-Guthaben in der Wallet hat, kann ein Anruf an die registerDID gemacht werden, wie unten gezeigt:

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

Parameter `did`und `privateKey`sind obligatorisch, während es optional ist, die `url`und die einzugeben.`contractAddress` Wenn der Benutzer die letzten beiden Parameter nicht freigibt, holt die Bibliothek die Standardkonfigurationen des Netzwerks aus dem DID URI.

Wenn alle Parameter den Spezifikationen entsprechen und alles in der richtigen Reihenfolge angegeben wird, gibt die `registerDID`Funktion eine transaction zurück, ein entsprechender Fehler wird anderweitig zurückgegeben.

Und damit hast du deine Aufgabe erfolgreich erfüllt, eine DID im Polygon Network zu registrieren.

## DID lösen {#resolve-did}

Um zu starten, installieren Sie die folgenden Bibliotheken:

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

Um ein im Buch registriertes DID-Dokument zu lesen, kann jeder Benutzer mit einer DID-Polyglon URI zuerst in seinem Projekt importieren

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

Nach dem Import der Pakete kann das DID-Dokument abgerufen werden, indem mit:

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

wo das `didResolutionResult`Objekt wie folgt ist:

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

Es ist zu beachten, dass der Benutzer keine Gaskosten einbringt, während er versucht, einen DID zu lösen.

## DID-Dokument aktualisieren {#update-did-document}

Um das Projekt mit der Fähigkeit zu verkapseln, das DID-Dokument zu aktualisieren, muss der Benutzer zuerst `polygon-did-registrar`wie folgt verwenden:

```js
import { updateDidDoc } from "polygon-did-registrar";
```

Als nächstes rufen Sie die Funktion auf:

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

Es ist zu beachten, dass nur der Besitzer von DID die Anfrage senden kann, um das DID Dokument zu aktualisieren. Der Privatschlüssel muss hier auch einige entsprechende Matic-Token enthalten.

Wenn der Benutzer die Konfiguration nicht mit `url` und `contractAddress` bereitstellt, holt die Bibliothek die Standardkonfigurationen des Netzwerks aus dem DID URI.

## DID-Dokument löschen {#delete-did-document}

Mit der Polygon DID Implementierung kann der Benutzer sein DID Dokument aus dem Ledger widerrufen. Der Benutzer muss zuerst `polygon-did-registrar`wie folgt verwenden:

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

Danach Verwendung von

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

Bei den Parametern ist es beachtenswert, dass `url` und `contractAddress` optionale Parameter sind. Wenn sie vom Benutzer nicht angegeben sind, übernimmt die DID-URI-basierte Funktion eine Standard-Konfiguration.

Es ist wichtig, dass der Privatschlüssel die notwendigen Matic-Token gemäß der DID-Netzwerkkonfiguration behält. Sonst schlägt die Transaktion fehl.

## Zur Ablage hinzufügen {#contributing-to-the-repository}

Verwende den Standard-Fork/Branch und ziehe den Anfrage-Workflow durch, um Änderungen an den Ablageorten vorzuschlagen. Bitte mache Branchennamen informativ mit, indem du beispielsweise die Issue oder die Bug-Nummer einbeziehst.

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
