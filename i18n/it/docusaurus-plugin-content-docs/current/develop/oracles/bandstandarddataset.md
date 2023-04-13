---
id: bandstandarddataset
title: Band Standard Dataset
sidebar_label: Standard Dataset
description: Band Stardard Dataset offre informazioni sui prezzi in tempo reale per oltre 196+ simboli che spaziano tra le crypto risorse, le valute e le commodity
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

Gli sviluppatori che si basano su Polygon possono ora sfruttare le infrastrutture oracle decentralizzate del Band Protocol. Con l'oracolo di Band Protocol, ora hanno accesso a vari dati dei prezzi di crittografia per integrare nelle loro applicazioni.

## Token supportati {#supported-tokens}

Attualmente, l'elenco dei simboli supportati è disponibile all'indirizzo [data.bandprotocol.com](http://data.bandprotcool.com). In futuro, questo elenco continuerà ad ampliarsi in base alle esigenze degli sviluppatori e al feedback della comunità.

## Coppie di prezzi {#price-pairs}

I metodi seguenti possono funzionare con qualsiasi combinazione di coppie di token base/quotazione, purché i simboli base e le quotazioni siano supportati dal dataset.

### Query sui prezzi {#querying-prices}

Attualmente ci sono due metodi per gli sviluppatori per interrogare i prezzi dall'oracolo di Band Protocol: attraverso lo `StdReference`smart contract di Band, su Polygon e la loro libreria di helper [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)JavaScript.

### Smart Contract Solidity {#solidity-smart-contract}

Per fare domande ai prezzi dell'oracolo del Band Protocol, uno smart contract dovrebbe fare riferimento al contratto di `StdReference`Band, in particolare ai metodi e ai metodi `getReferenceData`di `getReferenceDatabulk`riferimento.

`getReferenceData`prende due stringhe come gli input, la `base`e il `quote`simbolo, rispettivamente. Quindi interroga il contratto `StdReference` per rivelare gli ultimi prezzi di questi due token e restituisce una struct `ReferenceData`, mostrata di seguito.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk` prende invece due elenchi, uno dei token `base` e uno di `quotes`. Poi procede a query in modo simile il prezzo per ogni coppia di base/quote a ogni indice, e restituisce una serie di `ReferenceData`structs.

Ad esempio, se chiamiamo `getReferenceDataBulk` con `['BTC','BTC','ETH']` e `['USD','ETH','BNB']`, l'array `ReferenceData` restituito conterrà informazioni relative alle coppie:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## Indirizzi del contratto {#contract-addresses}

| Blockchain | Indirizzo del contratto |
| -------------------- | :------------------------------------------: |
| Polygon (Test) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

Anche la libreria helper del nodo Band [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) supporta una simile funzione `getReferenceData`. Questa funzione prende una discussione, una lista di token coppie per interrogare il risultato. Restituisce quindi un elenco di valori dei tassi corrispondenti.


### Esempio di utilizzo {#example-usage}

Il codice sottostante mostra un esempio di utilizzo della funzione:

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

Il risultato corrispondente sarà quindi simile a:

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

Per ogni coppia, verranno restituite le seguenti informazioni:

- `pair`: La stringa della coppia di simboli base/quotazione
- `rate`: Il tasso risultante della coppia indicata
- `updated`: Il timestamp dell'ultimo aggiornamento dei simboli di base e di quotazione su BandChain. Per `USD`, questa sarà la timestamp corrente.
- `rawRate`: Questo oggetto è composto da due parti.
  - `value` è il valore `BigInt` del tasso corrente, moltiplicato per `10^decimals`
  - `decimals` è quindi l'esponente con cui `rate` è stato moltiplicato per ottenere `rawRate`

## Esempio di utilizzo {#example-usage-1}

Questo [contratto](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db) mostra un esempio di utilizzo del contratto `StdReference` di Band e della funzione `getReferenceData`.