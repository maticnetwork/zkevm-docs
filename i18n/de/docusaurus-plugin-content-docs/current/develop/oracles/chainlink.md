---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: Chainlink ist ein dezentrales blockchain das auf Ethereum aufbaut.
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

**Chainlink** ermöglicht Ihren Verträgen **den Zugriff auf jede externe Datenquelle** über ein dezentrales oracle Egal, ob dein Vertrag Sportergebnisse, das aktuelle Wetter oder andere öffentliche Daten benötigt, liefert Chainlink die Tools, damit sie dein Vertrag erfassen kann.

## Dezentrale Daten {#decentralized-data}

Eines der mächtigsten Features von Chainlink ist bereits dezentralisiert, aggregiert und bereit, auf Chain Daten über die meisten der beliebten Kryptowährungen verdaut zu werden. Diese werden als [**Chainlink Data Feed**](https://docs.chain.link/docs/using-chainlink-reference-contracts) bekannt.

Hier ist ein Beispiel für einen Vertrag, der die neuesten Preise von MATIC in USD im Mumbai Testnet abruft.

Du musst die Adresse [mit einer beliebigen Adresse eines](https://docs.chain.link/docs/matic-addresses#config) Datenfeeds austauschen, die du möchtest, und du kannst mit der Verdauung von Preisinformationen beginnen.

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

## Anfrage- und Empfangszyklus {#request-and-receive-cycle}

Der Anfrage- und Empfangszyklus von Chainlink ermöglicht es deinen Smart Contracts, Anfragen an externe APIs zu stellen und die Antwort zu erfassen. Um ihn zu implementieren, muss dein Vertrag zwei Funktionen definieren:

1. Ein, um **die Daten** anzufordern, und
2. Ein anderer, um **die Antwort zu erhalten**.

Um Daten anzufordern, erstellt dein Vertrag ein `request`Objekt, das er einer Orakel zur Verfügung stellt. Sobald das Oracle die API kontaktiert und die Antwort abgefragt hat, versucht es, Daten über die Callback-Funktion, die in Smart Contract definiert ist, an den Vertrag zurückzusenden.

## Awendungsfälle {#uses}

1. **Chainlink Data Feeds**

Dies sind dezentrale Datenreferenzpunkte, die bereits auf der Chain aggregiert sind, und die schnellste, einfachste und günstigste Art, um Daten aus der realen Welt zu erhalten. Unterstützt derzeit einige der beliebtesten Kryptowährungen und Fiat-Paare.

Für die Arbeit mit Data Feed verwende die [**Polygon Data Feeds aus**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) der Chainlink documenation.

2. **Chainlink Verifizierbare Randomness Funktion**

Erhalte nachweislich Zufallszahlen, bei denen die Zufallszahl kryptographisch garantiert ist, dass sie zufällig ist.

Für die Arbeit mit Chainlink VRF verwenden Sie die [**Polygon VRF Adressen**](https://docs.chain.link/vrf/v2/subscription/supported-networks) aus der [Chainlink Dokumentation.](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number)

3. **Chainlink API Anrufe**

Wie du deinen Smart Contracts konfigurierst, um mit traditionellen APIs zu arbeiten und dich anpassen, um Daten zu erhalten, irgendwelche Anfragen über das Internet zu senden und vieles mehr.

## Code-Beispiel {#code-example}

Um mit externen APIs zu interagieren, sollte dein Smart Contract von [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol) erben, einem Vertrag, der die Verarbeitung von Anfragen vereinfacht. Er zeigt eine Struktur namens, die dein Vertrag nutzen`Chainlink.Request` sollte, um die API-Anfrage zu erstellen.

Die Anfrage sollte die Oracle Adresse, die Job-ID, die Gebühr, die adapter und die Callback-Funktion Signatur definieren. In diesem Beispiel ist die Anfrage in die `requestEthereumPrice`-Funktion eingebaut.

`fulfill` ist als Callback-Funktion definiert.

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

## Mainnet Polygon LINK-Token {#mainnet-polygon-link-token}

Um Mainnet Polygon LINK Token vom Ethereum Mainnet zu erhalten, musst du einen 2-Stufen-Prozess befolgen.

1. Überbrücke deinen LINK mit der Plasma- oder  [PoS-Bridge](https://wallet.polygon.technology/bridge).
2. Ersetze den LINK durch die ERC677-Version über [Pegswap, das von Chainlink bereitgestellt wird](https://pegswap.chain.link/).

Die Polygon Bridge liefert eine ERC20-Version von LINK und LINK ist ein ERC677, weshalb wir sie mit diesem Swap aktualisieren müssen.

## Adressen {#addresses}

Es gibt derzeit nur wenige aktive Chainlink-Oracles im Polygon Mumbai Testnet. Du kannst auch selbst eines ausführen und es am Chainlink-Marktplatz listen.

* Oracle: [`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* LINK: [`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

Um LINK auf Mumbai Testnet zu erhalten, gehe zum [Polygon Wasserhahn hier](https://faucet.polygon.technology/).

## Unterstützte APIs {#supported-apis}

Der Anfrage- und Empfangszyklus von Chainlink ist flexibel genug, um jede öffentliche API aufzurufen, solange die Anfrageparameter korrekt sind und das Antwortformat bekannt ist. Wenn das Antwortobjekt einer URL, die wir abrufen möchten, zum Beispiel wie folgt formatiert ist: `{"USD":243.33}`, lautet der Pfad `"USD"`.

Wenn eine API mit einem komplexen JSON-Objekt reagiert, muss der **Pfad-Parameter** angeben, wo die gewünschten Daten abgerufen werden sollen, indem eine dot delimited String für verschachtelte Objekte verwendet wird. Bedenke zum Beispiel die folgende Antwort:

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

Das setzt den folgenden Pfad voraus: `"Prices.USD"`. Wenn es Leerzeichen in den Strings gibt oder die Strings recht lang sind, können wir die Syntax verwenden, die im obigen Beispiel angezeigt wird, wo wir sie alle als String-Array übergeben.

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## Wozu brauche ich Job-IDs? {#what-are-job-ids-for}

Vielleicht haben Sie bemerkt, dass unser [Beispiel](#code-example) einen `jobId`Parameter verwendet, wenn die Anfrage erstellt wird. Jobs bestehen aus einer Abfolge von Anweisungen, für die ein Oracle konfiguriert ist. Im oben stehenden [Codebeispiel](#code-example) stellt der Vertrag eine Anfrage an das Oracle mit der Job-ID: `da20aae0e4c843f6949e5cb3f7cfe8c4`. Dieser Job ist konfiguriert, das Folgende zu tun:

* Eine GET-Anfrage stellen
* Die JSON-Antwort parsen
* Den Wert mit *x* multiplizieren
* Den Wert in `uint` umwandeln
* An die Chain übermitteln

Deshalb fügt unser Vertrag die URL, den Pfad, wo die gewünschten Daten in der JSON-Antwort zu finden sind, und den Multiplikatorbetrag über die `request.add`-Aussagen zur Anfrage hinzu. Diese Anweisungen werden durch die sogenannten Adapter im Oracle erleichtert.

**Jede Anfrage an ein Oracle muss eine bestimmte Job-ID enthalten.**

Hier ist die Liste der Jobs, die das Polygon Oracle laut Konfiguration ausführt.

| Name | Rückgabetyp | ID | Adapter |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

Die komplette Chainlink API-Referenz findest du [hier](https://docs.chain.link/any-api/api-reference).
