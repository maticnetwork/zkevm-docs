---
id: bandstandarddataset
title: Band Standard-Datensatz
sidebar_label: Standard Dataset
description: Band Stardard Dataset bietet real-time für über 196 Symbole an, die sich über Krypto-Assets, Devisen und Rohstoffe erstrecken.
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - standard dataset
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Entwickler, die auf Polygon aufbauen, können nun die dezentrale Oracle-Infrastruktur von Band Protocol nutzen. Mit der Oracle von Band Protocol haben sie nun Zugriff auf verschiedene Preisdaten, die in ihre Anwendungen integriert werden können.

## Unterstützte Token {#supported-tokens}

Derzeit findest du die Liste der unterstützten Symbole unter [data.bandprotocol.com](http://data.bandprotcool.com). Diese Liste wird fortlaufend basierend auf den Bedürfnissen von Entwicklern und Community-Feedback erweitert.

## Preispaare {#price-pairs}

Die folgenden Methoden funktionieren mit jeder Kombination aus einem Basis-/Quote-Tokenpaar, solange die Basis- und Quote-Symbole vom Datensatz unterstützt werden.

### Abfrage von Preisen {#querying-prices}

Derzeit gibt es zwei Methoden für Entwickler, um Preise aus dem Oracle von Band Protocol abzufragen: durch Band's `StdReference`Smart Contract auf Polygon und durch ihre [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)oracle:

### Solidity Smart Contract {#solidity-smart-contract}

Um Preise von Band Protocol abzufragen, sollte ein Smart Contract auf den Vertrag von Band `StdReference`beziehen, insbesondere auf die `getReferenceData`und die `getReferenceDatabulk`Methoden.

`getReferenceData`nimmt zwei Strings als Eingaben `base`bzw. das `quote`Symbol ein. Danach fragt es die neuesten Preise für diese beiden Token vom `StdReference`-Vertrag ab und liefert das unten stehende -`ReferenceData`Struct.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk` nimmt stattdessen zwei Listen, eines der `base`-Token und ein `quotes`. Es geht dann um die gleiche Abfrage des Preises für jedes base/quote an jedem Index, und gibt ein Array von Strukturen `ReferenceData`zurück.

Wenn wir zum Beispiel `getReferenceDataBulk` mit `['BTC','BTC','ETH']` und `['USD','ETH','BNB']` aufrufen, enthält das zurückgegebene -`ReferenceData`-Array Informationen über die Paare:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## Vertragsadressen {#contract-addresses}

| Blockchain | Vertragsadresse |
| -------------------- | :------------------------------------------: |
| Polygon (Test) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

Die Hilfsbibliothek des Band-Knoten [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) unterstützt auch eine ähnliche `getReferenceData`-Funktion. Diese Funktion nimmt ein Argument, eine Liste der argument, um das Ergebnis abzufragen. Danach liefert sie eine Liste der entsprechenden Preise.


### Beispielnutzung {#example-usage}

Der Code unten zeigt eine Beispielnutzung der Funktion:

```javascript
const { Client } = require('@bandprotocol/bandchain.js');

// BandChain's REST Endpoint
const endpoint = 'https://rpc.bandchain.org';
const client = new Client(endpoint);

// This example demonstrates how to query price data from
// Band's standard dataset
async function exampleGetReferenceData() {
  const rate = await client.getReferenceData(['BTC/ETH','BAND/EUR']);
  return rate;
}

(async () => {
  console.log(await exampleGetReferenceData());
})();

```

Das entsprechende Ergebnis wird dann ähnlich sein:

```bash
$ node index.js
[
    {
        pair: 'BTC/ETH',
        rate: 30.998744363906173,
        updatedAt: { base: 1615866954, quote: 1615866954 },
        requestID: { base: 2206590, quote: 2206590 }
    },
    {
        pair: 'BAND/EUR',
        rate: 10.566138918332376,
        updatedAt: { base: 1615866845, quote: 1615866911 },
        requestID: { base: 2206539, quote: 2206572 }
    }
]
```

Für jedes Paar werden die folgenden Informationen zurückgegeben:

- `pair`: Der Paarstring des Basis-/Quote-Symbols
- `rate`: Der resultierende Preis des gegebenen Paares
- `updated`: Der Zeitpunkt, zu dem die Basis- und Quote-Symbole auf BandChain aktualisiert wurden. `USD`Denn dies ist der aktuelle Zeitstempel.
- `rawRate`: Dieses Objekt besteht aus zwei Teilen.
  - `value`ist der `BigInt`-Wert des tatsächlichen Preises multipliziert mit`10^decimals`
  - `decimals` ist dann der Exponent, mit dem `rate` multipliziert wurde, um `rawRate` zu erhalten

## Beispielnutzung {#example-usage-1}

Dieser [-Vertrag](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db) zeigt ein Beispiel für die Nutzung des Band-`StdReference`-Vertrags und die `getReferenceData`Funktion.