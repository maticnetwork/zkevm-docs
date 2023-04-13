---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: Chainlink è una rete oracle blockchain decentralizzata costruita su Ethereum.
keywords:
  - wiki
  - polygon
  - chainlink
  - oracle
  - decentralized
  - data
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

**Chainlink** consente ai tuoi contratti di **accedere a qualsiasi fonte di dati esterni** attraverso una rete oracle decentralizzata. Se il tuo contratto richiede i risultati sportivi, le ultime previsioni del tempo o qualsiasi altro dato disponibile pubblicamente, Chainlink fornisce gli strumenti necessari affinché il tuo contratto possa accedervi.

## Dati decentralizzati {#decentralized-data}

Una delle più potenti caratteristiche di Chainlink è già decentralizzata, aggregata e pronta per essere digerita dati on-chain sulla maggior parte delle crittografate popolari. Questi sono noti come [**Chainlink Data Feeds**](https://docs.chain.link/docs/using-chainlink-reference-contracts).

Ecco un esempio funzionante di un contratto che estrae l'ultimo prezzo di MATIC in USD sulla Mumbai Testnet.

Tutto quello che devi fare è scambiare l'indirizzo [con qualsiasi indirizzo di un feed di dati](https://docs.chain.link/docs/matic-addresses#config) che desideri e puoi iniziare a digerire le informazioni sui prezzi.

```
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mumbai Testnet
     * Aggregator: MATIC/USD
     * Address: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

## Ciclo di richiesta e ricezione {#request-and-receive-cycle}

Il ciclo di richiesta e ricezione di Chainlink permette ai tuoi smart contract di fare una richiesta a qualsiasi API esterna e di ricevere la risposta. Per implementarlo, il tuo contratto deve definire due funzioni:

1. Uno per **richiedere i dati**, e
2. Un altro per **ricevere la risposta**.

Per richiedere i dati, il contratto costruisce un `request`oggetto che fornisce a un oracle. Una volta che l'oracle abbia comunicato con l'API e analizzato la risposta, cercherà di inviare i dati al tuo contratto utilizzando la funzione di callback definita nel tuo smart contract.

## Utilizzi {#uses}

1. **Chainlink Data feed**

Questi sono punti di riferimento decentralizzati già aggregati on-chain, e il modo più veloce, facile e conveniente per ottenere dati dal mondo reale. Attualmente supporta alcune delle più popolari criptovalute e coppie di valute tradizionali.

Per lavorare con i Data Feeds, utilizza i [**Polygon Data Feeds dalla**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) documenation Chainlink.

2. **Chainlink Funzione di Randomness verificabile**

Ottieni numeri casuali provabilmente dove il numero casuale è garantito crittograficamente per essere casuale.

Per lavorare con Chainlink VRF, utilizza gli [**indirizzi Polygon VRF**](https://docs.chain.link/vrf/v2/subscription/supported-networks) della [documentazione Chainlink.](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number)

3. **Chainlink API**

Come configurare il tuo smart contract per lavorare con le API tradizionali e personalizzare per ottenere qualsiasi data, inviare qualsiasi richiesta su Internet e altro ancora.

## Esempio di codice {#code-example}

Per interagire con le API esterne, il tuo smart contract dovrebbe ereditare da [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol), che è un contratto progettato per facilitare l'elaborazione delle richieste. Espone una struttura chiamata `Chainlink.Request`, che il tuo contratto deve utilizzare per costruire la richiesta API.

La richiesta dovrebbe definire l'indirizzo oracle, the id, la fee, i parametri dell'adattatore e la firma della funzione di callback. In questo esempio, la richiesta è costruita nella funzione `requestEthereumPrice`.

`fulfill` è definito come funzione di callback.

```
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {

    uint256 public price;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    /**
     * Network: Polygon Mumbai Testnet
     * Oracle: 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9
     * Job ID: da20aae0e4c843f6949e5cb3f7cfe8c4
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     */
    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9;
        jobId = "da20aae0e4c843f6949e5cb3f7cfe8c4";
        fee = 10 ** 16; // 0.01 LINK
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target price
     * data, then multiply by 100 (to remove decimal places from price).
     */
    function requestBTCCNYPrice() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        // NOTE: If this oracle gets more than 5 requests from this job at a time, it will not return.
        request.add("get", "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=demo");

       // Set the path to find the desired data in the API response, where the response format is:
       // {
       //     "Realtime Currency Exchange Rate": {
       //       "1. From_Currency Code": "BTC",
       //       "2. From_Currency Name": "Bitcoin",
       //       "3. To_Currency Code": "CNY",
       //       "4. To_Currency Name": "Chinese Yuan",
       //       "5. Exchange Rate": "207838.88814500",
       //       "6. Last Refreshed": "2021-01-26 11:11:07",
       //       "7. Time Zone": "UTC",
       //      "8. Bid Price": "207838.82343000",
       //       "9. Ask Price": "207838.88814500"
       //     }
       //     }
        string[] memory path = new string[](2);
        path[0] = "Realtime Currency Exchange Rate";
        path[1] = "5. Exchange Rate";
        request.addStringArray("path", path);

        // Multiply the result by 10000000000 to remove decimals
        request.addInt("times", 10000000000);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        price = _price;
    }
}
```

## Mainnet Polygon LINK token {#mainnet-polygon-link-token}

Per ottenere il token di mainnet Polygon LINK dall'Ethereum Mainnet, devi seguire un processo di 2 passi.

1. Collega i tuoi LINK utilizzando il bridge Plasma o il [PoS bridge](https://wallet.polygon.technology/bridge).
2. Scambia i LINK con la versione ERC677 tramite la [funzione Pegswap, distribuita da Chainlink](https://pegswap.chain.link/).

Il bridge Polygon porta una versione ERC20 di LINK, mentre LINK è un ERC677, quindi dobbiamo solo aggiornarlo eseguendo questa swap.

## Indirizzi {#addresses}

Attualmente esistono pochi oracle di Chainlink operativi sulla Polygon Mumbai Testnet. Puoi sempre gestirne uno anche tu e inserirlo nel Marketplace di Chainlink.

* Oracle: [`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* LINK: [`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

Per ottenere LINK su Mumbai Testnet, vai al [rubinetto Polygon qui](https://faucet.polygon.technology/).

## API supportate {#supported-apis}

Il ciclo di richiesta e ricezione di Chainlink è abbastanza flessibile da poter chiamare qualsiasi API pubblica, purché i parametri della richiesta siano corretti e il formato della risposta sia noto. Ad esempio, se l'oggetto di risposta di un URL che vogliamo recuperare è formattato in questo modo: `{"USD":243.33}`, il percorso è semplice: `"USD"`.

Se un'API risponde a un oggetto JSON complesso, il parametro **del percorso** dovrebbe specificare dove recuperare i dati desiderati, utilizzando una stringa delimitata per oggetti nidificati. Ad esempio, considera la seguente risposta:

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

Questo richiede il seguente percorso: `"Prices.USD"`. Se ci sono spazi nelle stringhe o le stringhe sono abbastanza lunghe, possiamo utilizzare la sintassi indicata nell'esempio precedente, dove le passiamo tutti come una stringa array.

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## A cosa servono i Job ID? {#what-are-job-ids-for}

Potrebbe aver notato che il nostro [esempio](#code-example) utilizza un `jobId`parametro durante la costruzione della richiesta. I lavori sono costituiti da una sequenza di istruzioni che un oracle è configurato per eseguire. Nell'[esempio di codice](#code-example) in alto, il contratto fa una richiesta all'oracle con l'opzione job ID: `da20aae0e4c843f6949e5cb3f7cfe8c4`. Nello specifico, questa attività è configurata per eseguire le seguenti operazioni:

* Effettuare una richiesta GET
* Analizzare la risposta JSON
* Moltiplicare il valore per *x*
* Convertire il valore in `uint`
* Inviare alla catena

Per questo motivo il nostro contratto aggiunge l'URL, il percorso dove trovare i dati desiderati nella risposta JSON e i tempi della richiesta, utilizzando le istruzioni `request.add`. Queste istruzioni sono facilitate dai cosiddetti adattatori nell'Oracle.

**Ogni richiesta a un oracle deve includere uno specifico job ID.**

Ecco l'elenco dei lavori che Polygon oracle è configurato per eseguire.

| Nome | Tipo di rendimento | ID | Adattatori |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

Il riferimento completo all'API di Chainlink è disponibile [qui](https://docs.chain.link/any-api/api-reference).
