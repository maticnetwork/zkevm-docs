---
id: bandstandarddataset
title: Conjunto de datos estándar de Band
sidebar_label: Standard Dataset
description: El conjunto de datos de la banda Stardard ofrece información de precios en tiempo real para más de 196 + símbolos que se abarcan en activos criptográficos, divisas y materias primas
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

Los desarrolladores que se basan en Polygon ahora pueden aprovechar la infraestructura de oráculos descentralizada de Band Protocol. Con el oráculo de Band Protocol, ahora tienen acceso a varios datos de precios de criptomonedas para integrarse en sus aplicaciones.

## Tokens admitidos {#supported-tokens}

La lista de los símbolos admitidos actualmente se puede consultar en [data.bandprotocol.com](http://data.bandprotcool.com). En el futuro, seguiremos ampliando esa lista en función de las necesidades de los desarrolladores y los comentarios de la comunidad.

## Pares de precios {#price-pairs}

Los siguientes métodos pueden funcionar con cualquier combinación de tokens de base o cotización, siempre que los símbolos de la base y la cotización sean admitidos por el conjunto de datos.

### Consulta de precios {#querying-prices}

Actualmente, hay dos métodos para que los desarrolladores consulten precios desde el oráculo de Band Protocol: a través del contrato `StdReference`inteligente de la banda en Polygon y a través de su biblioteca de ayuda [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)JavaScript.

### Contratos inteligentes en Solidity {#solidity-smart-contract}

Para consultar precios desde el oráculo de Band Protocol, un contrato inteligente debe hacer referencia al `StdReference`contrato de la Band, específicamente a los `getReferenceData`y `getReferenceDatabulk`métodos.

`getReferenceData`toma dos cadenas como las entradas, el `base`y `quote`símbolo, respectivamente. Luego, le consulta al contrato `StdReference` las tarifas más recientes de esos dos tokens y muestra una estructura `ReferenceData`, que se muestra adelante.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk`, en cambio, toma dos listas: una de los tokens `base` y otra de las `quotes`. A continuación, continúa a consultar de manera similar el precio de cada par de base o cotización en cada índice, y devuelve una serie de `ReferenceData`estructuras.

Por ejemplo, si llamamos a `getReferenceDataBulk` con `['BTC','BTC','ETH']` y `['USD','ETH','BNB']` , la matriz de `ReferenceData` mostrada contendrá información sobre los pares:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## Direcciones de contratos {#contract-addresses}

| Cadena de bloques | Dirección del contrato |
| -------------------- | :------------------------------------------: |
| Polygon (prueba) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

La biblioteca de ayuda de nodos de Band [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) también admite una función `getReferenceData` similar. Esta función toma un argumento, una lista de token parejas para consultar el resultado. Luego, muestra una lista de los valores de precio correspondientes.


### Ejemplo de uso {#example-usage}

El siguiente código muestra un ejemplo de uso de la función:

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

El resultado correspondiente será similar a lo siguiente:

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

Para cada par, se mostrará la siguiente información:

- `pair`: la cadena del par de símbolos de base o cotización
- `rate`: el precio resultante del par dado
- `updated`: la fecha y hora de la última actualización de los símbolos de base y cotización en BandChain. Para `USD`, esta será la marca de tiempo actual.
- `rawRate`: este objeto consta de dos partes.
  - `value` es el valor `BigInt` del precio real, multiplicado por `10^decimals`
  - `decimals` es el exponente por el que se multiplicó `rate` para obtener `rawRate`

## Ejemplo de uso {#example-usage-1}

Este [contrato](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db) muestra un ejemplo de uso del contrato `StdReference` de Band y la función `getReferenceData`.