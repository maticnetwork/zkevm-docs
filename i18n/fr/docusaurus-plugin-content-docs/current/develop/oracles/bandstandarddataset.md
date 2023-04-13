---
id: bandstandarddataset
title: Bande  de Jeu de données Standard
sidebar_label: Standard Dataset
description: Band Stardard Dataset offre des informations sur les prix en temps réel pour plus de 196 symboles s'étendant sur les actifs cryptographiques, les devises et les matières premières
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

Les développeurs construisant sur Polygon peuvent désormais exploiter l'infrastructure oracle décentralisée du Band Protocol. Avec l'oracle du protocole de bande, ils ont désormais accès à diverses données de prix crypto-monnaie pour s'intégrer à leurs applications.

## Jetons Supportés {#supported-tokens}

Actuellement, la liste des symboles pris en charge se trouve à l'adresse suivante[ : ata.bandprotocol.com](http://data.bandprotcool.com) À l'avenir, cette liste continuera à s'étandre en fonction des besoins des développeurs et des réactions de la communauté.

## Prix des Paires {#price-pairs}

Les méthodes suivantes peuvent fonctionner avec n'importe quelle combinaison de paires de jetons base/citation, autant que les symboles de base et de citation soient pris en charge par l'ensemble de données.

### Demande de Prix {#querying-prices}

Actuellement, il existe deux méthodes pour les développeurs pour interroger les prix à partir de l'oracle du Band Protocol: grâce au contrat `StdReference`intelligent de Band sur Polygon et à leur bibliothèque d'aide [`bandchain.js`](https://www.npmjs.com/package/%40bandprotocol%2Fbandchain.js)JavaScript.

### Contrat Intelligent Solidity {#solidity-smart-contract}

Pour rechercher les prix à partir de l'oracle du protocole de bande, un contrat intelligent devrait référencer le contrat de `StdReference`bande, en particulier les méthodes et les définitions `getReferenceData``getReferenceDatabulk`nécessaires.

`getReferenceData`prend deux chaînes comme les entrées, le `base`et le `quote`symbole, respectivement. Il interroge ensuite le `StdReference`contrat pour connaître les derniers taux pour ces deux jetons, et renvoie une `ReferenceData`structure , illustrée ci-dessous.

```
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

`getReferenceDataBulk`prend plutôt deux listes, l'une des `base` jetons, et l'autre  des `quotes`. Il procède ensuite à effectuer une requête similaire le prix de chaque paire base/devis à chaque index, et renvoie un tableau de `ReferenceData`structions.

Par exemple, si nous appelons `getReferenceDataBulk`avec `['BTC','BTC','ETH']` et `['USD','ETH','BNB']`, le tableau  retourné `ReferenceData`contiendra des informations concernant les paires:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BNB`

## Les Adresses du Contrat {#contract-addresses}

| Blockchain | Adresse du Contrat  |
| -------------------- | :------------------------------------------: |
| Polygon (Test) | `0x56e2898e0ceff0d1222827759b56b28ad812f92f` |

## BandChain.JS {#bandchain-js}

La bibliothèque d'aide aux nœuds de Band prend [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) également en charge une `getReferenceData`fonction similaire. Cette fonction prend un argument, une liste de paires de jetons pour interroger le résultat. Il renvoie ensuite une liste de valeurs de taux correspondantes.


### Exemple d'Utilisation {#example-usage}

Le code ci-dessous affiche un exemple d'utilisation de la fonction:

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

Le résultat correspondant sera alors similaire à :

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

Pour chaque paire, les informations suivantes seront retournées:

- `pair`: La chaîne de caractères de la paire de symboles de la base/citation
- `rate`: Le taux résultant de la paire donnée
- `updated`: L'horodateur auquel les symboles de base et de cotation ont été mis à jour pour la dernière fois sur BandChain. `USD`Car ce sera le timestamp. actuel.
- `rawRate`: Cet objet est composé de deux parties.
  - `value` est la `BigInt`valeur du taux réel, multipliée par`10^decimals`
  - `decimals`est alors l'exposant par lequel `rate` a été multiplié pour obtenir `rawRate`

## Exemple d'Utilisation {#example-usage-1}

Ce [contrat](https://gist.github.com/tansawit/a66d460d4e896aa94a0790df299251db) démontre un exemple d'utilisation du `StdReference`contrat de Band et de la `getReferenceData`fonction.