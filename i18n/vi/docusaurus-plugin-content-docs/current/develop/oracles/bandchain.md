---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: Bandchain là một chuỗi Block-hiệu suất cao được xây dựng cho Data Oracle để truy cập dữ liệu từ APis truyền thống.
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Giao thức Band cho phép bạn truy vấn dữ liệu từ API web truyền thống và sử dụng trong blockchain. Nhà phát triển có thể thực hiện các queres thông qua **Bandchain, một blockchain dựa trên vũ trụ** để tạo điều kiện yêu cầu và thanh toán, và sau đó sử dụng dữ liệu trên dApp thông qua giao tiếp tương tác. Có thể thực hiện tích hợp dữ liệu oracle theo 3 bước đơn giản:

1. **Chọn tập lệnh oracle**

    Tập lệnh Oracle là một hàm băm chỉ đích danh loại dữ liệu sẽ được yêu cầu từ band-chain. Có thể tìm thấy các tập lệnh này [**tại đây**](https://guanyu-devnet.cosmoscan.io/oracle-scripts). Các tập lệnh này được sử dụng như một trong các tham số trong khi thực hiện yêu cầu oracle.

2. **Yêu cầu Dữ liệu từ BandChain**

Việc này có thể thực hiện theo hai cách:

    - **Sử dụng nhà thám hiểm BandChain**

    Bạn có thể nhắp vào script của sự lựa chọn của bạn, và sau đó từ thẻ **Execute** bạn có thể vượt qua trong các thông số và nhận được phản ứng từ BandChain. Phản hồi sẽ chứa kết quả và cả bằng chứng evm. Bằng chứng này phải được sao chép và sẽ được sử dụng trong bước cuối cùng. Tiến sĩ Bandchain cho phép sử dụng nhà thám hiểm có sẵn ở [**đây**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer).

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    Dựa trên là một ví dụ về việc tạo một yêu cầu của nhà tiên tri để lấy được các giá trị số ngẫu nhiên. Giá trị 100 được thông qua `max_range`thông số của yêu cầu của nhà tiên. Chúng ta nhận hàm băm trong phản hồi. Thao tác nhấn vào hàm băm này sẽ hiển thị toàn bộ chi tiết của phản hồi.

    - **Sử dụng Thư viện Bandchain-Devnet JS**

    Bạn có thể truy vấn Bandchain trực tiếp bằng thư viện Bandchain-Devnet. Khi được truy vấn, nó cung cấp **bằng chứng evm** trong phản hồi. Có thể sử dụng bằng chứng này cho bước cuối cùng của quá trình tích hợp BandChain. Tiến sĩ Bandchain cho việc truy cập vào thư viện Bandchain-Devnet JS có sẵn ở [**đây**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library). Tải trọng trả tiền của yêu cầu cho oracle số ngẫu nhiên sẽ trông như thế này. Hãy đảm bảo phần thân của yêu cầu được chuyển ở định dạng ứng dụng/json.

3. **Sử dụng dữ liệu trong hợp đồng thông minh**

  Bước cuối cùng là triển khai hợp đồng xác thực và lưu trữ các phản hồi từ yêu cầu oracle vào các biến trạng thái của hợp đồng xác thực. Khi đã được thiết lập, các biến trạng thái này có thể được truy cập nguyên trạng và khi được dapp yêu cầu. Ngoài ra, các biến trạng thái này có thể được cập nhật với các giá trị mới bằng cách truy vấn các tập lệnh oracle một lần nữa từ dApp. Dưới đây là một hợp đồng xác thực có lưu trữ giá trị số ngẫu nhiên bằng cách sử dụng tập lệnh oracle số ngẫu nhiên.

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

Khi triển khai, 3 thông số phải được thông qua. **Tham số đầu tiên** là `codeHash`văn lệnh của Oracle hash. **Tham số thứ hai** là tham số yêu cầu của văn bản tiên tri phản đối. Điều này phải được chuyển theo định dạng byte. BandChain cung cấp API REST để chuyển đổi đối tượng JSON tham số sang định dạng byte. Có thể tìm thấy chi tiết API [**tại đây**](https://docs.bandchain.org/references/encoding-params). 0x phải được gắn vào phản hồi nhận được từ API này. **Tham số thứ ba** là địa chỉ hợp đồng của hợp đồng Bandchain đã được triển khai trên mạng Polygon. Giao thức Band hỗ trợ Polygon TestnetV3: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf.

Một điều khác cần lưu ý là hợp đồng xác thực sẽ nhập thư viện và giao diện người giúp đỡ được gọi `BandChainLib.sol`và tương ứng`IBridge.sol`. Chúng có thể được tìm thấy trong các liên kết sau: [**Bandchails**](https://docs.bandchain.org/references/bandchainlib-library) Library và giao diện [**IBridge**](https://docs.bandchain.org/references/ibridge-interface).

 Khi hợp đồng xác thực đã được triển khai, có thể truy cập các biến trạng thái bằng truy vấn từ một dApp. Hợp đồng tương tự, có thể được tạo cho các văn bản được xây dựng tương tự. Giao diện IBridge có một phương pháp gọi `relayAndVerify()`là xác định giá trị được cập nhật mỗi lần trong hợp đồng xác thực. `update()`Phương pháp trong hợp đồng xác thực có logic để cập nhật biến số bang. Bằng chứng EVM thu được từ việc xác định được lệnh tiên tri phải được thông qua phương `update()`pháp. Mỗi lần một giá trị được cập nhật, hợp đồng Bandchain được triển khai trên Polygon xác nhận dữ liệu trước khi lưu nó trong biến thể của hợp đồng.

Bandchain cung cấp một mạng lưới phân phối của các lời tiên tri, có thể được sử dụng bởi dApps để thúc đẩy logic hợp đồng thông minh của họ. Tiến sĩ Bandchain đang triển khai hợp đồng, lưu trữ các giá trị, và cập nhật chúng có thể được tìm thấy [**ở đây**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library).