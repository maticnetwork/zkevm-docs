---
title: Tellor
description: "Una guida per integrare l'oracolo di Tellor nel tuo contratto Polygon."
author: "Tellor"
lang: en
sidebar: true
tags: ["solidity", "smart contracts", "price feeds", "oracles", "Polygon", "Matic", "Tellor"]
skill: beginner
published: 2022-02-10
source: Tellor Docs
sourceUrl: https://docs.tellor.io/tellor/
---

Tellor è un oracle che fornisce dati resistenti alla censura e protetti da semplici incentivi cripto-economici. I dati possono essere forniti da chiunque e controllati da tutti. La struttura flessibile di Tellor può fornire qualsiasi dato in ogni intervallo temporale per consentire una facile sperimentazione/innovazione.

## Prerequisiti (soft) {#soft-prerequisites}

Per concentrarci su ciò che riguarda l'oracle, ipotizziamo che il tuo livello di abilità di codifica sia il seguente.

Presupposti:

- capacità di navigare in un terminale
- npm installato
- conoscenza nell'uso di npm per gestire le dipendenze

Tellor è un oracle live e open-source pronto per essere implementato. Questa guida per principianti è qui per mostrare la facilità con cui si può salire e correre con Tellor, fornendo al tuo progetto un oracolo completamente decentralizzato e resistente alla censura.

## Panoramica {#overview}

Tellor è un sistema oracle in cui le parti possono richiedere il valore di una serie di dati off-chain (ad esempio BTC/USD) e i reporter competono per aggiungere questo valore a una banca dati on-chain, accessibile da tutti gli smart contract Polygon. Gli input verso questa banca dati sono protetti da una rete di reporter con stake. Tellor utilizza meccanismi di incentivazione cripto-economica. L'invio di dati onesti da parte dei reporter viene ricompensato con l'emissione del token di Tellor. I partecipanti disonesti vengono rapidamente puniti ed eliminati dalla rete attraverso un meccanismo di contestazione.

In questo tutorial esamineremo i seguenti aspetti:

- Impostazione del kit di strumenti iniziale di cui avrai bisogno per iniziare a lavorare.
- Esamineremo un semplice esempio.
- Elenca gli indirizzi delle testnet su cui puoi testare Tellor.

## UsingTellor {#usingtellor}

La prima cosa da fare è installare gli strumenti di base necessari per utilizzare Tellor come oracle. Usa [questo pacchetto](https://github.com/tellor-io/usingtellor) per installare i contratti utente Tellor:

`npm install usingtellor`

Una volta installato, permetterà ai tuoi contratti di ereditare le funzioni dal contratto "UsingTellor".

Ottimo! Ora che gli strumenti sono pronti, facciamo un semplice esercizio per recuperare il prezzo di Bitcoin:

### Esempio di BTC/USD {#btc-usd-example}

Eredita il contratto UsingTellor, passando l'indirizzo di Tellor come argomento del costruttore:

Ecco un esempio:

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

## Indirizzi: {#addresses}

Tributi Tellor: [`0xe3322702bedaaed36cddab233360b939775ae5f1`](https://polygonscan.com/token/0xe3322702bedaaed36cddab233360b939775ae5f1#code)

Oracle: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0#code)

#### Per prima cosa, desideri fare dei test? {#looking-to-do-some-testing-first}

Polygon Mumbai Testnet: [`0xD9157453E2668B2fc45b7A803D3FEF3642430cC0`](https://mumbai.polygonscan.com/address/0xD9157453E2668B2fc45b7A803D3FEF3642430cC0/contracts#code)

Tributi di prova:[`0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE`](https://mumbai.polygonscan.com/token/0xCE4e32fE9D894f8185271Aa990D2dB425DF3E6bE#code)

Hai bisogno di un token di prova? Tweet us at ['@trbfaucet'](https://twitter.com/trbfaucet)

Per una facile utilizzo, il repo di UsingTellor viene fornito con una versione del [contratto di Tellor Playground](https://github.com/tellor-io/TellorPlayground) per una più facile integrazione. Vedi [qui](https://github.com/tellor-io/sampleUsingTellor#tellor-playground) per una lista di utili funzioni.

#### Per un'implementazione più robusta dell'oracle di Tellor, consulta l'elenco completo delle funzioni disponibili [qui.](https://github.com/tellor-io/usingtellor/blob/master/README.md)

#### Hai ancora domande? Entra alla community [qui!](https://discord.gg/tellor)
