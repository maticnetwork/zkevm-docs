---
id: matic-to-ethereum
title: Chuyển dữ liệu từ Polygon sang Ethereum
description: Chuyển trạng thái hoặc dữ liệu từ Polygon sang Ethereum qua Hợp đồng
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Cơ chế để chuyển dữ liệu từ Polygon sang Ethereum hơi khác so với khi làm điều tương tự từ Ethereum sang Polygon. Các giao dịch **trạm kiểm soát** do Trình xác thực tạo trên chuỗi Ethereum được sử dụng để đạt được điều này. Về cơ bản, ban đầu một giao dịch được tạo trên Polygon. Trong khi tạo giao dịch này, phải đảm bảo rằng một **sự kiện được phát hành** và **nhật ký sự kiện chứa dữ liệu chúng ta muốn chuyển** từ Polygon sang Ethereum.

Trong một thời gian (khoảng 10-30 min), giao dịch này được kiểm tra trên chuỗi Ethereum bởi các trình xác thực. Khi đã kiểm soát xong, hàm băm của giao dịch được tạo trên chuỗi Polygon có thể được nộp làm bằng chứng trên hợp đồng **RootChainManager** trên chuỗi Ethereum. Hợp đồng này xác thực giao dịch, xác minh rằng giao dịch này được đưa vào trạm kiểm soát và cuối cùng giải mã nhật ký sự kiện từ giao dịch này.

Sau khi giai đoạn này kết thúc, chúng ta có thể sử dụng **dữ liệu nhật ký sự kiện đã giải mã để thực hiện bất kỳ thay đổi nào** đối với hợp đồng gốc được triển khai trên chuỗi Ethereum. Để làm điều này, chúng ta cũng cần đảm bảo rằng, chỉ thực hiện việc thay đổi trạng thái trên Ethereum một cách an toàn. Vì vậy, chúng ta sẽ sử dụng một hợp đồng **Thuộc tính**, đây là một loại hợp đồng đặc biệt chỉ có thể được hợp đồng **RootChainManager** kích hoạt. Kiến trúc này đảm bảo rằng các thay đổi trạng thái trên Ethereum chỉ xảy ra khi giao dịch trên Polygon được hợp đồng **RootChainManager** kiểm soát và xác minh trên chuỗi Ethereum.

# Tổng quan {#overview}

- Một giao dịch được thực thi trên hợp đồng con đã triển khai trên chuỗi Polygon.
- Một sự kiện cũng được phát hành trong giao dịch này. Các tham số của **sự kiện này chứa dữ liệu phải được chuyển** từ Polygon sang Ethereum.
- Các trình xác thực trên mạng lưới Polygon nhận giao dịch này trong một khoảng thời gian cụ thể (có thể là 10-30 phút), xác thực và **thêm chúng vào trạm kiểm soát** trên Ethereum.
- Một giao dịch trạm kiểm soát được tạo trên hợp đồng **RootChain** và có thể kiểm tra việc đưa vào trạm kiểm soát bằng [tập lệnh](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js) này
- Sau khi việc bổ sung trạm kiểm soát được hoàn tất, có thể sử dụng thư viện **matic.js** để gọi chức năng **thoát** của hợp đồng **RootChainManager**. Có thể gọi chức năng **thoát** bằng thư viện matic.js như minh họa trong [ví dụ](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js) này.

- Việc chạy tập lệnh này xác minh việc đưa vào của hàm băm giao dịch Polygon trên chuỗi Ethereum và sau đó lại gọi chức năng **exitToken** của hợp đồng [Thuộc tính](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol).
- Việc này đảm bảo rằng **sự thay đổi trạng thái trên hợp đồng chuỗi gốc** luôn được thực hiện theo cách **bảo mật** và **chỉ thông qua hợp đồng thuộc tính**.
- Điều quan trọng cần lưu ý là **việc xác minh hàm băm giao dịch** từ Polygon và **kích hoạt hợp đồng thuộc tính** xảy ra trong một **giao dịch đơn lẻ** và do đó đảm bảo tính bảo mật cho bất kỳ thay đổi trạng thái nào trên hợp đồng gốc.

# Quá trình triển khai {#implementation}

Đây là minh họa giải thích đơn giản về cách dữ liệu có thể được chuyển từ Polygon sang Ethereum. Hướng dẫn này trình bày một ví dụ về việc chuyển giá trị uint256 trên chuỗi. Nhưng bạn có thể chuyển loại dữ liệu. Nhưng cần mã hóa dữ liệu theo byte và sau đó phát hành dữ liệu từ hợp đồng con. Cuối cùng nó có thể được giải mã tại hợp đồng gốc.

1. Trước tiên hãy tạo hợp đồng chuỗi gốc và chuỗi con. Đảm bảo rằng chức năng thực hiện việc thay đổi trạng thái cũng phát hành một sự kiện. Sự kiện này phải chứa dữ liệu cần chuyển dưới dạng một trong các tham số của nó. Dưới đây là một định dạng mẫu về cách hợp đồng Con và Gốc phải tuân theo. Đây là một hợp đồng rất đơn giản, có một biến dữ liệu với giá trị được thiết lập bằng chức năng setData. Việc gọi chức năng setData sẽ phát hành sự kiện Dữ liệu. Phần còn lại của những điều trong hợp đồng sẽ được giải thích trong các phần sắp tới của hướng dẫn này.

A. Hợp đồng con

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. Hợp đồng gốc

Chuyển `0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f` này dưới dạng giá trị dành cho `_predicate` trong trình khởi tạo hợp đồng gốc.

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. Sau khi hợp đồng con được triển khai trên Polygon và hợp đồng gốc được triển khai tương ứng trên Ethereum, các hợp đồng này phải được hoán đổi bằng cầu nối PoS. Việc hoán đổi này đảm bảo rằng một kết nối được duy trì giữa hai hợp đồng này trên các chuỗi. Để thực hiện việc hoán đổi này, bạn có thể liên hệ với đội ngũ Polygon trên [discord](https://discord.com/invite/0xPolygon).

3. Một điều quan trọng cần lưu ý là, trong hợp đồng gốc, có một bộ điều chỉnh onlyPredicate. Lúc nào cũng nên sử dụng bộ điều chỉnh này vì nó đảm bảo rằng chỉ có hợp đồng thuộc tính mới tạo ra sự thay đổi trạng thái trên hợp đồng gốc. Hợp đồng thuộc tính là một hợp đồng đặc biệt, chỉ kích hoạt hợp đồng gốc khi giao dịch xảy ra trên chuỗi Polygon được RootChainManager xác minh trên chuỗi Ethereum. Việc này đảm bảo sự thay đổi trạng thái bảo mật trên hợp đồng gốc.

Để thử nghiệm quá trình triển khai nêu trên, chúng ta có thể tạo giao dịch trên chuỗi Polygon bằng cách gọi chức năng **setData** của hợp đồng con. Tại thời điểm này, chúng ta cần chờ để hoàn tất trạm kiểm soát. Có thể kiểm tra việc đưa vào trạm kiểm soát bằng [tập lệnh](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js) này. Sau khi trạm kiểm soát đã hoàn tất, hãy gọi chức năng thoát của RootChainManager bằng SDK matic.js.

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

Như được minh họa trong ảnh chụp màn hình ở trên, **txHash** là hàm băm giao dịch của giao dịch đã xảy ra trên hợp đồng con được triển khai trên chuỗi Polygon.

**logEventSignature** là hàm băm keccack-256 của sự kiện Dữ liệu. Đây chính là hàm băm mà chúng tôi đã đưa vào hợp đồng Thuộc tính. Có thể tìm thấy tất cả mã hợp đồng được sử dụng cho hướng dẫn này và tập lệnh thoát [tại đây](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)

Khi tập lệnh thoát đã hoàn tất, hợp đồng gốc trên chuỗi Ethereum có thể được truy vấn để xác minh xem giá trị của **dữ liệu** biến được đặt trong hợp đồng con cũng đã được phản ánh trong biến **dữ liệu** của hợp đồng gốc hay chưa.
