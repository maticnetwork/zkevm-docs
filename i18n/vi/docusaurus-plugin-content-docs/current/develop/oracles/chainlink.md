---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: Chainlink là một mạng lưới blocle được xây dựng trên Ethereum.
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

**Chainlink** cho phép hợp đồng của bạn **truy cập bất kỳ nguồn dữ liệu bên ngoài**, thông qua mạng phóng viên đã xác thực. Dù hợp đồng của bạn yêu cầu kết quả thể thao, thời tiết mới nhất, hay bất kỳ dữ liệu công khai nào khác, Chainlink cung cấp các công cụ cần thiết cho hợp đồng của bạn để sử dụng nó.

## Dữ liệu Phi tập trung {#decentralized-data}

Một trong những tính năng mạnh nhất của Chainlink đã được phân hủy, tổng hợp và sẵn sàng được tiêu hóa trên dữ liệu chuỗi trên hầu hết các mật mã phổ biến. Những thông tin này được gọi là [**Số lượng dữ liệu Chinlink**](https://docs.chain.link/docs/using-chainlink-reference-contracts).

Dưới đây là một ví dụ hoạt động của một hợp đồng kéo giá MATIC bằng USD mới nhất trên Mạng thử nghiệm Mumbai.

Tất cả những gì bạn cần làm là trao đổi địa chỉ [với bất kỳ địa chỉ nào của một nguồn dữ liệu](https://docs.chain.link/docs/matic-addresses#config) mà bạn muốn, và bạn có thể bắt đầu phát triển thông tin giá tiêu hóa.

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

## Chu kỳ Yêu cầu và Nhận {#request-and-receive-cycle}

Chu kỳ Yêu cầu và Nhận của Chainlink cho phép các hợp đồng thông minh của bạn đưa ra yêu cầu đối với bất kỳ API bên ngoài nào và dùng phản hồi. Để triển khai, hợp đồng của bạn cần xác định hai chức năng:

1. Một để **yêu cầu dữ liệu**, và
2. Một người khác để **nhận được sự trả lời**.

Để yêu cầu dữ liệu, hợp đồng của bạn xây dựng một `request`vật thể mà nó cung cấp cho một nhà tiên tri. Khi oracle đã liên hệ với API và phân tích cú pháp phản hồi, nó sẽ cố gắng gửi dữ liệu trở lại hợp đồng của bạn bằng cách sử dụng chức năng gọi ngược được định nghĩa trong hợp đồng thông minh của bạn.

## Sử dụng {#uses}

1. **Số lượng dữ liệu Charinlink**

Đây là các điểm tham khảo dữ liệu đã được phân phối trên chain, và các quickest, dễ dàng nhất, và cách rẻ nhất để lấy dữ liệu từ thế giới thực. Hiện tại hỗ trợ một số cặp tiền mã hóa và tiền pháp định phổ biến nhất.

Để làm việc với Data Feeds, hãy sử dụng [**số lượng Polygon Data từ**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) tài liệu của Chinlink.

2. **Hàm Xiinlink Verifible Randomness**

Lấy số lượng ngẫu nhiên được cung cấp , nơi số lượng ngẫu nhiên được đảm bảo là ngẫu nhiên.

Để làm việc với Chainlink VRF, hãy sử dụng [**địa chỉ Polygon**](https://docs.chain.link/vrf/v2/subscription/supported-networks) VRF từ [tài liệu Chinlink.](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number)

3. **Số lượng truy cập Chainlink API**

Cách cấu hình hợp đồng thông minh của bạn để hoạt động với APS truyền thống, và tùy chỉnh để có bất kỳ dữ liệu, gửi bất kỳ yêu cầu nào trên internet, và nhiều hơn.

## Ví dụ mã {#code-example}

Để tương tác với các API bên ngoài, hợp đồng thông minh của bạn phải kế thừa từ [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol), là hợp đồng được thiết kế để dễ dàng xử lý các yêu cầu. Nó trình bày một cấu trúc được gọi là `Chainlink.Request`, cấu trúc mà hợp đồng của bạn phải sử dụng để tạo yêu cầu API.

Yêu cầu sẽ xác định địa chỉ của nhà tiên tri, id, công việc, phí , tham số adapter và chữ ký chức năng callback Trong ví dụ này, yêu cầu được tạo trong chức năng `requestEthereumPrice`.

`fulfill` được xác định là chức năng gọi ngược.

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

## Token LINK Polygon Mạng lưới chính {#mainnet-polygon-link-token}

Để có dấu hiệu Polygon LINK của Mainnet, bạn phải tuân theo một quy trình 2-bước.

1. Nối LINK của bạn bằng Plasma hoặc [cầu nối PoS](https://wallet.polygon.technology/bridge).
2. Hoán đổi LINK cho phiên bản ERC677 thông qua [Pegswap, do Chainlink triển khai](https://pegswap.chain.link/).

Cầu nối Polygon mang đến phiên bản ERC20 của LINK, và LINK là ERC677, vì vậy chúng ta chỉ phải cập nhật nó với sự hoán đổi này.

## Địa chỉ {#addresses}

Hiện tại chỉ có một số oracle Chainlink đang hoạt động trên Mạng thử nghiệm Polygon Mumbai. Bạn cũng luôn có thể tự chạy một oracle và niêm yết nó trên Thị trường Chainlink.

* Oracle: [`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* LINK: [`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

Để có được LINK trên Mumbai, hãy đến [Polygon Faucet](https://faucet.polygon.technology/).

## APis {#supported-apis}

Chu kỳ Yêu cầu và Nhận của Chainlink đủ linh hoạt để gọi bất kỳ API công khai nào, miễn là các tham số yêu cầu là chính xác và đã biết định dạng phản hồi. Ví dụ: nếu đối tượng phản hồi từ một URL mà chúng ta muốn lấy được định dạng như thế này: `{"USD":243.33}`, thì đường dẫn rất đơn giản: `"USD"`.

Nếu API phản ứng với một vật thể JSON phức tạp, tham số **đường dẫn** sẽ cần xác định nơi để lấy dữ liệu mong muốn, bằng cách sử dụng một chuỗi chấm để được tổ chức. Ví dụ, hãy cân nhắc phản ứng sau:

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

Phản hồi này yêu cầu đường dẫn sau: `"Prices.USD"`. Nếu có các khoảng cách trong các dây, hoặc chuỗi khá dài, chúng ta có thể sử dụng sự tổng hợp trong ví dụ trên đó, nơi chúng ta truyền chúng như một chuỗi

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## ID Công Việc Để Làm Gì? {#what-are-job-ids-for}

Bạn có thể nhận thấy [ví dụ](#code-example) của chúng ta sử dụng một `jobId`thông số khi xây dựng yêu cầu. Công việc bao gồm một chuỗi các hướng dẫn mà một oracle được định cấu hình để chạy. Trong [ví dụ mã](#code-example) trên, hợp đồng đưa ra một yêu cầu tới oracle với ID công việc: `da20aae0e4c843f6949e5cb3f7cfe8c4`. Công việc cụ thể này được định cấu hình để thực hiện:

* Đưa ra một yêu cầu GET
* Phân tích cú pháp phản hồi JSON
* Nhân giá trị với *x*
* Chuyển đổi giá trị thành `uint`
* Nộp cho chuỗi

Đây là lý do hợp đồng của chúng ta thêm trong URL, đường dẫn nơi tìm thấy dữ liệu mong muốn trong phản hồi JSON, và nhân với số lượng yêu cầu; bằng cách sử dụng các câu lệnh `request.add`. Những hướng dẫn này được hỗ trợ bởi mục được gọi là Bộ điều hợp, trong oracle.

**Mọi yêu cầu đối với một oracle phải bao gồm một ID công việc cụ thể.**

Dưới đây là danh sách các công việc mà oracle Polygon được định cấu hình để chạy.

| Tên | Kiểu trả về | ID | Bộ điều hợp |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

Có thể tìm thấy tài liệu tham khảo API Chainlink đầy đủ [tại đây](https://docs.chain.link/any-api/api-reference).
