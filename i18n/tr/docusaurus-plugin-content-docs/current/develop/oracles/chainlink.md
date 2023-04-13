---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: Chainlink Ethereum üzerine inşa edilmiş merkezi olmayan bir blok zinciri oracle ağı.
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

**Chainlink** sözleşmelerinizin merkezi olmayan bir oracle ağı üzerinden herhangi bir **harici veri kaynağına** erişmesini sağlar. Sözleşmeniz ister spor sonuçlarına, ister güncel hava durumuna veya herhangi başka bir genele açık veriye ihtiyaç duysun, Chainlik sözleşmenizin bu veriyi kullanabilmesi için gerekli araçları sağlar.

## Merkezi Olmayan Veri {#decentralized-data}

Chainlink'in en güçlü özelliklerinden biri zaten merkezi olmayan, toplanmış ve popüler kripto para birimlerinin çoğunda zincir üstü veri sindirilmeye hazır. Bunlar [**Chainlink Veri Beslemeleri**](https://docs.chain.link/docs/using-chainlink-reference-contracts) olarak bilinir.

Mumbai Test Ağı'ndaki en güncel MATIC fiyatını USD cinsinden çeken bir sözleşmenin çalışma örneğini burada bulabilirsiniz.

Yapmanız gereken tek şey, adresi istediğiniz [bir veri yeminin adresiyle](https://docs.chain.link/docs/matic-addresses#config) değiştirmektir ve fiyat bilgilerini sindirmeye başlayabilirsiniz.

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

## Talep ve Alma Döngüsü {#request-and-receive-cycle}

Chainlink'in Talep ve Alma döngüsü, akıllı sözleşmelerinizin harici bir API'ye talep göndermesine ve yanıtı kullanmasına olanak tanır. Bunu uygulamak için sözleşmenizin iki işlevi tanımlaması gerekir:

1. Bunlardan biri **de veri talep** etmesi, ve
2. Bir diğeri **de cevabı almak** için.

Veri istemek için sözleşmeniz, bir oracle için sağladığı bir `request`nesne oluşturur. Oracle, API'ye ulaştıktan ve yanıtı ayrıştırdıktan sonra, akıllı sözleşmenizde tanımlanan geri çağırma işlevini kullanarak veriyi sözleşmenize geri göndermeye çalışacaktır.

## Kullanımlar {#uses}

1. **Chainlink Veri Beslemeleri**

Bunlar zaten zincirde toplanmış olan merkezi olmayan veri referans noktalarıdır ve gerçek dünyadan veri elde etmenin en hızlı, en kolay ve en ucuz yoludur. Şu anda en popüler kripto para birimlerinden ve fiat çiftlerinden bazılarını desteklemektedir.

Veri Beslemeleri ile çalışmak için Chainlink belgelenmesinden [**alınan Polygon Veri**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) Beslemelerini kullanın.

2. **Chainlink doğrulanabilir Randomness Fonksiyonu**

Rastgele sayının rastgele olarak garanti edildiği kanıtlanabilir şekilde rastgele sayılar alın.

Chainlink VRF ile çalışmak için [Chainlink](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number) from Pol[**ygon VRF ad**](https://docs.chain.link/vrf/v2/subscription/supported-networks)reslerini kullanın.

3. **Chainlink API Çağrıları**

Akıllı sözleşmenizi geleneksel API'lerle çalışacak şekilde nasıl yapılandırılır ve herhangi bir veri elde etmek, internet üzerinden herhangi bir istekte bulunmayı ve daha fazlasını özelleştirmek için özelleştirebilirsiniz.

## Kod Örneği {#code-example}

Harici API'lerle etkileşim kurmak için akıllı sözleşmenizin talepleri kolayca işlemek için tasarlanmış olan [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol) sözleşmesini devralması gerekir. Bu işlem, API talebini oluşturmak için sözleşmenizin kullanması gereken `Chainlink.Request` adlı bir struct'ı açığa çıkarır.

İstek oracle adresi, iş kimliği, ücret, adaptör parametreleri ve geri alma fonksiyonu imzasını tanımlamalıdır. Bu örnekte talep `requestEthereumPrice` işlevi içinde yerleşiktir.

`fulfill` geri çağırma işlevi olarak tanımlanır.

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

Ethereum Mainnet'ten ana ağ Polygon LINK token'ı almak için 2 adımlı bir işlemi izlemeniz gerekir.

1. Plasma veya [PoS köprüsü](https://wallet.polygon.technology/bridge) kullanarak LINK köprünüzü oluşturun.
2. [Chainlink tarafından devreye alınan Pegswap](https://pegswap.chain.link/) üzerinden ERC677 sürümü için LINK'i değiştirin.

Polygon köprüsü LINK'in bir ERC20 sürümünü getirir; LINK bir ERC677 olduğu için bunu bu değiştirmeyle güncellememiz gerekir.

## Adresler {#addresses}

Şu anda Polygon Mumbai Test Ağı üzerinde sadece birkaç faal Chainlink oracle bulunmaktadır. Kendiniz de bir tane çalıştırabilir ve Chainlink Marketplace üzerinde listeleyebilirsiniz.

* Oracle: [`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* LINK: [`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

Mumbai Testnet'te LINK almak için [Polygon musluğuna](https://faucet.polygon.technology/) gidin.

## Desteklenen API'ler {#supported-apis}

Chainlink'in Talep ve Alma döngüsü, talep parametreleri doğru olduğu ve yanıt biçimi bilindiği sürece, herhangi bir genel API'yi çağıracak kadar esnektir. Örneğin, bir URL'den getirmek istediğimiz yanıt nesnesi `{"USD":243.33}` şeklinde formatlanmışsa, yol basittir: `"USD"`.

Bir API, karmaşık bir JSON nesnesine karşılık verirse, **yol** parametresinin istenen veriyi nereden alacağını belirtmesi gerekir; iç içe geçmiş nesneler için dot ile sınırlandırılmış bir dize kullanılarak Örneğin, aşağıdaki cevabı düşünün:

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

Bu aşağıdaki yolu gerektirecektir: `"Prices.USD"`. İplerde boşluk varsa veya dizeler oldukça uzunsa, yukarıdaki örnekte gösterilen sözdizimi kullanabiliriz; burada hepsini bir dizge dizisi olarak geçiriyoruz.

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## Job ID'ler Ne İşe Yarar? {#what-are-job-ids-for}

Örneğimizin isteği oluştururken [bir](#code-example) `jobId`parametre kullandığını fark etmiş olabilirsiniz. Jobs (işler), bir oracle'ın çalıştırılmak üzere yapılandırıldığı bir talimatlar diziliminden oluşur. Yukarıdaki [kod örneğinde](#code-example), sözleşme oracle'a job ID'si `da20aae0e4c843f6949e5cb3f7cfe8c4` olan bir talep gönderir. Bu job aşağıdakileri işleri yapmak için yapılandırılmıştır:

* Bir GET talebinde bulunmak
* JSON yanıtını ayrıştırmak
* Değeri *x* ile çarpmak
* Değeri `uint`'e dönüştürmek
* Zincire göndermek

Sözleşmemizin URL'de `request.add` ifadelerini kullanarak istenen verilerin JSON yanıtında bulunacağı yerin yolunu ve süreleri talebe eklemesinin nedeni budur. Bu talimatlara oracle'daki Adaptör olarak bilinen şeyler aracılık eder.

**Oracle'a gönderilen her talepte spesifik bir job ID yer almalıdır.**

Polygon oracle'ın çalıştırılmak üzere yapılandırıldığı işlerin bir listesi burada.

| Ad | Döndürme Türü | ID | Adaptörler |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

Eksiksiz Chainlink API referansını [burada](https://docs.chain.link/any-api/api-reference) bulabilirsiniz.
