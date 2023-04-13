---
id: state-transfer
title: Chuyển Trạng Thái
description: Vận chuyển tình trạng hoặc dữ liệu dễ dàng từ Ethereum sang Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Các trình xác thực Polygon liên tục theo dõi một hợp đồng trên chuỗi Ethereum được gọi `StateSender`. Mỗi khi một hợp đồng đã đăng ký trên chuỗi Ethereum gọi hợp đồng này, việc này sẽ phát hành một sự kiện. Sử dụng sự kiện này, trình xác thực Polygon chuyển tiếp dữ liệu đến một hợp đồng khác trên chuỗi Polygon. Cơ chế **Đồng bộ State** này được sử dụng để gửi dữ liệu từ Ethereum đến Polygon.

Ngoài ra, trình xác thực Polygon sẽ gửi một hash Ethereum của mỗi giao dịch trên chuỗi Polygon trên một cơ sở bình thường. Bạn có thể sử dụng **điểm kiểm tra** này để xác thực mọi giao dịch đã diễn ra trên Polygon. Một khi giao dịch đã được xác thực hiện trên chuỗi Polygon, Ethereum có thể được sử dụng để thực hiện hành động thích hợp.

Hai cơ chế này có thể được sử dụng cùng nhau để kích hoạt dữ liệu hai chiều (trạng thái) chuyển giao giữa Ethereum và Polygon. Để trừu tượng tất cả các giao dịch này, bạn có thể thừa hưởng trực tiếp của chúng ta (`FxBaseRootTunnel`trên Ethereum) và `FxBaseChildTunnel`(trên Polygon).

## Hợp đồng Đường hầm Gốc {#root-tunnel-contract}

Sử dụng hợp đồng `FxBaseRootTunnel` từ [đây](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol). Hợp đồng này cho phép truy cập vào các hàm sau:

- `function _processMessageFromChild(bytes memory data)`: Đây là một hàm ảo cần được thực hiện trong hợp đồng mà thừa kế nó để xử lý dữ liệu được gửi từ `ChildTunnel`.
- `_sendMessageToChild(bytes memory message)`: Có thể gọi chức năng này trong nội bộ bằng bất kỳ dữ liệu byte nào dưới dạng thông báo. Dữ liệu này sẽ được gửi nguyên trạng đến đường hầm con.
- `receiveMessage(bytes memory inputData)`: Chức năng này cần được gọi để nhận thông điệp được phát ra bởi `ChildTunnel`. Cần cung cấp bằng chứng giao dịch dưới dạng dữ liệu gọi. Một văn lệnh ví dụ để tạo bằng chứng bằng cách sử dụng **matic.js** được bao gồm dưới đây.

## Hợp đồng Đường hầm Con {#child-tunnel-contract}

Sử dụng hợp đồng `FxBaseChildTunnel` từ [đây](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Hợp đồng này cho phép truy cập các chức năng sau:

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: Đây là một hàm ảo cần thực hiện logic để xử lý thông điệp được gửi từ `RootTunnel`.
- `function _sendMessageToRoot(bytes memory message)`: Có thể gọi chức năng này trong nội bộ để gửi bất kỳ thông báo byte nào đến đường hầm gốc.

## Điều kiện tiên quyết {#prerequisites}

- Bạn cần thừa kế `FxBaseRootTunnel`hợp đồng trong hợp đồng gốc của bạn trên Ethereum. Ví dụ, bạn có thể làm theo [hợp đồng](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol) này. Tương tự, thừa hưởng `FxBaseChildTunnel`hợp đồng trong con bạn trên Polygon. Làm theo [hợp đồng](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol) này như một ví dụ.
- Trong khi triển khai hợp đồng gốc của bạn trên
  - **Goerli Tesnet**, hãy thông qua địa chỉ của `_checkpointManager`số 0**x2890bA17E978480615e330ecB65333b80928e** và `_fxRoot`như **0x3d1d34f7f6245E640E615E5015e300ebbb65010ebb50bbb50bbb50bbb550bbFFAFFF.E5501b5.**

  - **Ethereum Mainnet**, `_checkpointManager`là 0**x86e4dc95c7fbbf52e33d563bb000823894c287** và `_fxRoot`là **0xfe5e5e5D361b2ad62c541bb87C45003838a.**
- Để triển khai hợp đồng trẻ em trên **thử nghiệm Mumbai**, hãy chuyển **0xCf73231F28B7331BB3124B907840A94851f911** như `_fxChild`trong công trình xây dựng. Đối với **Polygon mainnet,** `_fxChild`sẽ là 0**x8397259c983751DAf4000790063935a1afa28a.**
- Gọi `setFxChildTunnel`trên đường hầm được triển khai với địa chỉ đường hầm trẻ em. Ví dụ: [0x79cd30ace561a226258918b56ce098a08ce0c7070cbba81197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- Gọi `setFxRootTunnel`về đường hầm trẻ em được triển khai với địa chỉ đường hầm gốc. Ví dụ: [0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc2ffc4b864b2b45a8b8bb88bb8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## Ví dụ về hợp đồng cầu nối chuyển trạng thái {#example-contracts-of-state-transfer-bridge}

- **Tương phản**: [Lưu trữ Tài liệu Fx- Portal Github](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli:** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai:** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## Truyền thông bang từ Polygon Ethereum {#polygon}

- Bạn cần gọi thông báo `_sendMessageToChild()`nội bộ trong hợp đồng gốc của bạn và thông qua dữ liệu như một cuộc đối số cần được gửi đến Polygon. Ví dụ: [0x28705fcae757a0c88694bd167cb94a2696a0bc9a0bc9a645eb4e20cff96053764c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- Trong hợp đồng con của bạn, hãy triển khai chức năng ảo `_processMessageFromRoot()` trong `FxBaseChildTunnel` để truy xuất dữ liệu từ Ethereum. Dữ liệu sẽ được nhận tự động từ người nhận trạng thái khi trạng thái được đồng bộ.

## Truyền thông bang từ Polygon → Ethereum {#ethereum}

1. Gọi `_sendMessageToRoot()` nội bộ trong hợp đồng con của bạn bằng dữ liệu dưới dạng một tham số cần gửi cho Ethereum. Ví dụ: [0x3c9f7e675b4f6af87e9947bf24c38cbfa0b933d8c98164a2f2b50e6a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

Ghi chú sự huyên thuyên khi nó sẽ được sử dụng để tạo bằng chứng sau khi nó được bao gồm như một điểm kiểm soát.

2. **Bằng chứng generation để hoàn thành sự ra trên chuỗi route**: Tạo ra bằng chứng bằng cách sử dụng **tx hash**, và **thông điệp_SENT_EVENT_SIG**. Để tạo chứng cứ, bạn có thể sử dụng API hoặc sử dụng API bằng chứng được tổ chức bởi Polygon hoặc bạn cũng có thể xoay xở cho hệ thống API của riêng mình bằng cách tuân theo các hướng dẫn [ở đây](https://github.com/maticnetwork/proof-generation-api).

Điểm cuối bằng chứng được tổ chức bởi Polygon có sẵn ở [đây.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Ví dụ API thế hệ thông minh cho Mainnet và Testnet như sau:

→ [Mumbai, Testnet Proof generation](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Polygon Mainnet Production](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. Thực hiện `_processMessageFromChild()` trong hợp đồng gốc của bạn.

4. Sử dụng bằng chứng đã tạo làm đầu vào cho `receiveMessage()` để truy xuất dữ liệu được gửi từ đường hầm con vào hợp đồng của bạn. Ví dụ: [0x436dcd500659bea715a09257295dc21290769daea7f0b66ee6166ee75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515) )
