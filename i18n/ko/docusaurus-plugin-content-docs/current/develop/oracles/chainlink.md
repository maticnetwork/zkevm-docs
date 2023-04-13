---
id: chainlink
title: 체인링크
sidebar_label: Chainlink
description: Chainlink는 이더리움에 내장된 분산 블록체인 오라클네트워크입니다.
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

**Chainlink는** 분산형 오라클 네트워크를 통해 계약을 통해 **외부 데이터 소스에 액세스할** 수 있습니다. 계약이 스포츠 결과, 최신 날씨 또는 기타 공개적으로 사용 가능한 데이터를 필요로 하는지와 관계없이 체인링크는 계약이 이를 소비하는 데 필요한 도구를 제공합니다.

## 분산형 데이터 {#decentralized-data}

체인링크의 가장 강력한 특징 중 하나는 이미 분산되고 응집되어 있으며, 대부분의 인기 암호 화폐에서 온체인 데이터를 소화할 준비가 되어 있습니다. 이들은 [**체인링크 데이터 피드로**](https://docs.chain.link/docs/using-chainlink-reference-contracts) 알려져 있습니다.

다음은 뭄바이 테스트넷에서 미국 달러로 매틱의 최신 가격을 끌어내는 계약의 실행 예입니다.

원하는 [데이터 피드의 주소를 사용하여](https://docs.chain.link/docs/matic-addresses#config) 주소를 교환하고 가격 정보를 디지털화할 수 있습니다.

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

## 요청 및 수신 주기 {#request-and-receive-cycle}

스마트 계약은 체인링크의 요청 및 수신 주기를 통해 외부 API에 요청하고 응답을 소비할 수 있습니다. 이를 구현하기 위해서는 계약에서 두 가지 기능을 정의해야 합니다.

1. 하나는 **데이터를** 요청하고,
2. 응답을 **받기** 위한 또 다른

데이터를 요청하려면 계약이 오라클에 제공하는 `request`객체를 생성합니다. 오라클이 API에 도달하고 응답을 구문 분석하면, 스마트 계약에서 정의된 콜백 함수를 사용하여 데이터를 다시 계약으로 보내려고 시도합니다.

## 사용 {#uses}

1. **체인링크 데이터 피드**

이것들은 이미 온체인에 집계된 분산 데이터 참조 포인트이며, 실제 세계에서 데이터를 얻기 위해 가장 빠르고 쉽고 저렴한 방법입니다. 현재 가장 인기 있는 암호화폐와 법정화폐 쌍 중 일부를 지원합니다.

데이터 피드로 작업하려면 Chain링크 이제 Polygon [**데이터 피드를**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) 사용하십시오.

2. **체인링크 Verifable 랜덤네스 Function**

난수가 cryptography에서 보장되는 Random number 를 가져옵니다.

Chain링크 VRF와 함께 일하려면 [Chain링크 문서의](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number) Polygon [**VRF를**](https://docs.chain.link/vrf/v2/subscription/supported-networks) 사용하여 보십시오.

3. **체인링크 API 호출**

전통적인 API와 함께 작업하는 스마트 계약을 구성하고 모든 데이터를 사용자 정의 할 수 있는 방법, 인터넷에서 요청을 보내십시오.

## 코드 예 {#code-example}

외부 API와 상호 작용하기 위해서는 요청을 쉽게 처리할 수 있도록 설계된 계약인 [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol)을 스마트 계약이 상속해야 합니다. API 요청을 작성하기 위해 계약이 사용해야 하는 `Chainlink.Request`라는 구조체를 드러냅니다.

요청은 오라클 주소, 작업 ID, 수수료, 어댑터 파라미터 및 콜백 함수 서명을 정의합니다. 이 예에서 요청은 `requestEthereumPrice` 함수로 작성되었습니다.

`fulfill`은 콜백 함수로 정의됩니다.

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

## 메인넷 Polygon 링크 토큰 {#mainnet-polygon-link-token}

이더리움 메인넷에서 메인넷 Polygon 링크를 입력하려면 2단계 프로세스를 따라야 합니다.

1. 플라즈마 또는 [스테이크 증명 브리지](https://wallet.polygon.technology/bridge)를 사용하여 링크를 브리지하십시오.
2. [체인링크에서 배포한 Pegswap](https://pegswap.chain.link/)을 통해 링크를 ERC677 버전으로 스왑합니다.

Polygon 브리지는 링크의 ERC20 버전을 가져오지만, 링크는 ERC677이기 때문에 이 스왑을 통해 링크를 업데이트해야 합니다.

## 주소 {#addresses}

현재 Polygon 뭄바이 테스트넷에 운영되고 있는 체인링크 오라클은 몇 개 되지 않습니다. 언제든지 직접 실행할 수 있으며, 체인링크 마켓플레이스에 등록할 수 있습니다.

* 오라클: [`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* 링크: [`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

Mumbai 테스트넷에서 링크를 얻으려면 Polygon [faucet을](https://faucet.polygon.technology/) 참조하십시오.

## 지원 API {#supported-apis}

체인링크의 요청 및 수신 주기는 요청 파라미터가 정확하고 응답 형식이 알려져 있는 한 모든 공개 API를 호출할 수 있을 만큼 충분히 유연합니다. 예를 들어, 가져오려는 URL의 응답 객체가 `{"USD":243.33}`과 같은 형식이라면 경로는 간단합니다(`"USD"`).

API가 복잡한 JSON 객체가 응답하면 **경로** 파라미터는 원하는 데이터를 검색할 위치를 지정할 수 있습니다. 예를 들어, 다음 응답을 고려하십시오.

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

여기에는 `"Prices.USD"`와 같은 경로가 필요합니다. 스트링이 꽤 길다면, 위의 예시에서 표시된 구문을 사용할 수 있습니다.

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## 작업 ID는 왜 필요합니까? {#what-are-job-ids-for}

요청을 작성할 때 우리의 [예시가](#code-example) `jobId`파라미터를 사용한다는 것을 알아차렸을 수 있습니다. 작업은 오라클에서 실행하도록 구성된 일련의 지침으로 구성됩니다. 위의 [코드 예시](#code-example)에서 계약은 `da20aae0e4c843f6949e5cb3f7cfe8c4`와 같은 작업 ID로 오라클에 요청합니다. 이 특정 작업은 다음을 수행하도록 구성됩니다.

* GET 요청
* JSON 응답 구문 분석
* 값에 *x* 곱하기
* 값을 `uint`로 변환
* 체인에 제출

계약이 `request.add` 문을 사용하여 JSON 응답에서 원하는 데이터를 찾을 수 있는 경로 및 해당 요청에 소요되는 시간을 URL에 추가하는 이유가 바로 이 때문입니다. 이러한 지침은 오라클에서 어댑터라고 하는 것에 의해 용이하게 수행됩니다.

**오라클에 대한 모든 요청에는 특정 작업 ID가 포함되어야 합니다.**

다음은 Polygon 오라클에서 실행하도록 구성된 작업 목록입니다.

| 이름 | 반환 유형 | ID | 어댑터 |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

전체 체인링크 API 참조는 [여기](https://docs.chain.link/any-api/api-reference)에서 확인할 수 있습니다.
