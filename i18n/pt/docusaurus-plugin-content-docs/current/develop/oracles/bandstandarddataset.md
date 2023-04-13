---
id: bandstandarddataset
title: Conjunto de Dados Padrão da Band
sidebar_label: Standard Dataset
description: O dataset de Band Stardard oferece informações de preços em tempo real para mais de 196 + símbolos que abrangem ativos de criptografia, câmbio e commodities
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

Os desenvolvedores que se instalam no Polygon agora podem aproveitar a infraestrutura de oráculos descentralizados do Band Protocol. Com o oráculo do Band Protocol, eles agora têm acesso a vários dados de preços de criptomoedas para integrar nas suas aplicações.

## Tokens Suportados {#supported-tokens}

Atualmente, a lista de símbolos suportados está disponível em [data.bandprotocol.com](http://data.bandprotcool.com). Esta lista continuará a crescer com base nas necessidades do programador e no feedback da comunidade.

## Pares de preço {#price-pairs}

Os seguintes métodos podem funcionar com qualquer combinação de par de token base/cotação, desde que os símbolos da base e da cotação sejam suportados pelo conjunto de dados.

### Consultar os Preços {#querying-prices}

Atualmente, existem dois métodos para que os desenvolvedores consultem os preços do oráculo do Band Protocol: através do contrato `StdReference`inteligente da Banda no Polygon e da biblioteca de auxiliares do [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)JavaScript.

### Contrato Inteligente Solidity {#solidity-smart-contract}

Para consultar os preços do oráculo do Protocolo de Banda, um contrato inteligente deve referenciar o contrato da `StdReference`Banda, especificamente os `getReferenceData`e os `getReferenceDatabulk`métodos.

`getReferenceData`leva duas cordas como entradas, e `base``quote`símbolo, respectivamente. Em seguida, faz a consulta do contrato `StdReference` para obter as taxas mais recentes para esses dois tokens e devolve uma estrutura `ReferenceData`, apresentada em baixo.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk` em vez disso assume duas listas, uma dos tokens `base` e uma das `quotes`. Em seguida, ele procede à consulta de forma semelhante o preço de cada par de base/cotação em cada índice e retorna uma matriz de `ReferenceData`structs.

Por exemplo, se fizermos a CALL de `getReferenceDataBulk` com `['BTC','BTC','ETH']` e `['USD','ETH','BNB']`, a matriz `ReferenceData` devolvida contém informações sobre os pares:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## Endereços de contrato {#contract-addresses}

| Blockchain | Endereço de contrato |
| -------------------- | :------------------------------------------: |
| Polygon (Teste) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

A biblioteca auxiliar do nó da Band [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) também suporta uma função `getReferenceData` semelhante. Esta função leva um argumento, uma lista de pares de token para consultar o resultado. Em seguida, devolve uma lista de valores da taxa correspondentes.


### Exemplo de Utilização {#example-usage}

O código abaixo mostra um exemplo de uso da função:

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

O resultado correspondente será então semelhante a:

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

Para cada par, a informação abaixo será devolvida:

- `pair`: A string do par com o símbolo da base/cotação
- `rate`: A taxa resultante do devido par
- `updated`: O carimbo de data/hora no qual os símbolos da base e da cotação foram atualizados pela última vez na BandChain. Pois `USD`, este será o carimbo de hora atual.
- `rawRate`: O objeto é composto por duas partes.
  - `value` é o valor `BigInt` da taxa real, multiplicado por `10^decimals`
  - `decimals` é então o expoente pelo qual `rate` foi multiplicado para obter `rawRate`

## Exemplo de Utilização {#example-usage-1}

Este [contrato](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db) demonstra um exemplo de utilização do contrato `StdReference` da Band e da função `getReferenceData`.