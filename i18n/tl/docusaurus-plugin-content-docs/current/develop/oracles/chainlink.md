---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: Ang Chainlink ay isang desentralisadong block oracle network na binuo sa Ethereum.
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

Pinapayagan ng **Chainlink** ang iyong mga kontrata na i-access ang **anumang panlabas** na pinagmulan ng data, sa pamamagitan ng desentralisadong oracle network. Nangangailangan man ang iyong kontrata ng mga resulta sa sports, ang pinakabagong lagay ng panahon, o anumang iba pang data na available sa publiko, ibinibigay ng Chainlink ang mga tool na kinakailangan para sa iyong kontrata para magamit ito.

## Desentralisado Data {#decentralized-data}

Ang isa sa mga pinaka-malakas na tampok ng Chainlink ay desentralisado na, pinagsama-sama, at handa na ring i-digest ang on-chain data sa karamihan ng mga popular na cryptocurrency. Kilala ang mga ito sa mga [**Chainlink Data Feeds**](https://docs.chain.link/docs/using-chainlink-reference-contracts).

Narito ang isang gumaganang halimbawa ng isang kontrata na kumukuha ng pinakabagong presyo ng MATIC sa USD sa Mumbai Testnet.

Ang kailangan mo lang gawin ay i-swap ang [address sa anumang address ng isang data feed](https://docs.chain.link/docs/matic-addresses#config) na gusto mo, at maaari mong simulan ang pag-digest ng impormasyon ng presyo.

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

## Kahilingan at Tumanggap ng Ikot {#request-and-receive-cycle}

Nagbibigay-daan ang cycle ng Kahilingan at Pagtanggap ng Chainlink sa iyong mga smart na kontrata na gumawa ng kahilingan sa anumang panlabas na API at tanggapin ang tugon. Para ipatupad ito, kailangang tukuyin ng iyong kontrata ang dalawang function:

1. Isa na **humiling ng data**, at
2. Isa pang dapat **tanggapin ang tugon**.

Para humiling ng data, nagbubuo ang iyong kontrata ng isang `request`bagay na ibinibigay nito sa isang orakulo. Kapag naabot na ng oracle ang API at na-parse ang tugon, susubukan nitong ipadala ang data pabalik sa iyong kontrata gamit ang callback function na tinukoy sa iyong matalinong kontrata.

## Mga Paggamit {#uses}

1. **Mga Feed ng Data ng Chainlink**

Ang mga desentralisadong data reference point na pinagsama-sama na ng on-chain, at ang quickest, pinakamadali, at cheapest na paraan para makakuha ng data mula sa totoong mundo. Kasalukuyang sumusuporta sa ilan sa mga pinakasikat na pares ng cryptocurrency at fiat.

Para sa pakikipagtulungan sa mga Data Feed, gamitin ang [**Polygon Data Feeds mula sa**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) Chainlink documenation.

2. **Chainlink Verifiable Randomness Function**

Kumuha ng provably random numbers, kung saan ang random number ay cryptographically garantisadong maging random.

Para sa pakikipagtulungan sa [Chainlink](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number) VRF, gamitin ang mga Pol[**ygon VRF ad**](https://docs.chain.link/vrf/v2/subscription/supported-networks)dress mula sa dokumentasyon ng Chainlink.

3. **Chainlink API Calls**

Paano i-configure ang iyong smart contract para magtrabaho sa mga tradisyonal na API, at i-customize na makakuha ng anumang data, magpadala ng anumang kahilingan sa internet, at higit pa.

## Halimbawa ng Code {#code-example}

Para makipag-interaksyon sa mga panlabas na API, dapat magmana ang iyong smart na kontrata mula sa [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol), na kontratang dinisenyo para gawing madali ang pagpo-proseso ng mga kahilingan. Inilalantad nito ang isang struct na tinatawag na `Chainlink.Request`dapat gamitin ng iyong kontrata para buuin ang kahilingan sa API.

Dapat tukuyin ng kahilingan ang oracle address, job id, fee, adapter parameter, at lagda ng function ng callback. Sa halimbawang ito, binuo ang kahilingan sa. `requestEthereumPrice` na function.

`fulfill` ay tinukoy bilang function ng callback.

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

Para makakuha ng mainnet Polygon LINK token mula sa Ethereum Mainnet, dapat mong sundin ang isang 2-step na proseso.

1. I-bridge ang iyong LINK gamit ang Plasma o [PoS bridge](https://wallet.polygon.technology/bridge).
2. I-swap ang LINK para sa bersyon ng ERC677 sa pamamagitan ng [ng Pegswap, na na-deploy ng Chainlink](https://pegswap.chain.link/).

Nagdadala ang Polygon bridge ng ERC20 na bersyon ng LINK. Ang LINK ay ERC677, kaya kailangan lang natin itong i-update gamit ang swap na ito.

## Mga Address {#addresses}

Kasalukuyang kakaunti lang ang operational na Chainlink oracle sa Polygon Mumbai Testnet. Maaari ring ikaw mismo ang magpatakbo ng isa, at ilista ito sa Chainlink Marketplace.

* Oracle: [`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* LINK :[`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

Para makakuha ng LINK sa Mumbai Testnet, magtungo sa gripo ng [Polygon dito](https://faucet.polygon.technology/).

## Mga Suportadong API {#supported-apis}

Ang ikot ng Kahilingan at Pagtanggap ng Chainlink ay sapat na kakayahang umangkop upang tumawag sa anumang pampublikong API, hangga't tama ang mga parameter ng kahilingan at alam ang format ng pagtugon. `{"USD":243.33}``"USD"`Halimbawa, kung ang object ng tugon mula sa isang URL na gusto naming kunin ay naka-format tulad nito:simple ang path:.

Kung ang isang API ay tumugon sa isang kumplikadong JSON object, kailangang tukuyin ng parameter ng **landas** kung saan i-retrieve ang nais na data, gamit ang isang dot na delimited string para sa mga nested bagay. Halimbawa, isaalang-alang ang sumusunod na tugon:

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

`"Prices.USD"`Kailangan nito ang sumusunod na landas: Kung may mga puwang sa mga string, o medyo matagal ang mga string, magagamit namin ang syntax na ipinapakita sa halimbawa sa itaas, kung saan pinapasa namin ang mga ito lahat bilang string array.

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## Para saan ang mga Job ID? {#what-are-job-ids-for}

Maaaring napansin mo na gumagamit ang [aming halimbawa](#code-example) ng isang `jobId`parameter kapag nagtayo ng kahilingan. Binubuo ang mga trabaho ng isang pagkakasunud-sunod ng mga tagubilin na na-configure upang patakbuhin ang isang orakulo. Sa [halimbawang code](#code-example) sa itaas, gumagawa ang kontrata ng kahilingan sa oracle sa pamamagitan ng job ID na: `da20aae0e4c843f6949e5cb3f7cfe8c4`. Naka-configure ang partikular na trabahong ito upang magawa ang mga sumusunod:

* Gumawa ng kahilingan sa GET
* I-parse ang tugon ng JSON
* Paramihin ang value sa pamamagitan ng *x*
* I-convert ang value sa `uint`
* Isumite sa chain

Ito ang dahilan kung bakit nagdaragdag ang aming kontrata sa URL, ang path kung saan mahahanap ang nais na data sa tugon ng JSON, at ang mga oras na katumbas ng kahilingan; gamit ang mga `request.add` na pahayag. Ang mga tagubiling ito ay pinadali ng tinatawag na Adapters, sa oracle.

**Ang bawat kahilingan sa oracle ay dapat may kasamang partikular na ID ng trabaho.**

Narito ang listahan ng mga trabaho na naka-configure ang Polygon oracle na patakbuhin.

| Pangalan | Uri ng Pagbabalik | ID | Mga Adapter |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

Ang kumpletong sanggunian ng Chainlink API ay matatagpuan [dito](https://docs.chain.link/any-api/api-reference).
