---
id: account_based_plasma
title: Plasma dựa trên tài khoản
description: Việc thực thi dựa trên tài khoản của plasma
keywords:
  - docs
  - matic
  - Account Based Plasma
  - polygon
  - implementation
image: https://matic.network/banners/matic-network-16x9.png
---

# Plasma dựa trên tài khoản {#account-based-plasma}

Polygon Plasma tuân theo một mô hình tương tự như [Plasma MoreVP](https://ethresear.ch/t/more-viable-plasma/2160), nhưng là một phương **pháp thực hiện dựa trên tài khoản** so với các phương pháp thực hiện dựa trên UTXO khác. Chuỗi bên tương thích với EVM. Sử dụng cấu trúc MoreVP, chúng ta cũng loại bỏ được như cầu phải có chữ ký xác nhận.

## Lớp POS và các Điểm kiểm duyệt {#pos-layer-and-checkpoints}

Mạng Polygon sử dụng chiến lược kép của Bằng chứng Cổ phần ở lớp điểm kiểm duyệt và Nhà sản xuất Khối ở lớp nhà sản xuất khối để đạt được blocktime nhanh hơn và đạt được tính cuối cùng trên chuỗi chính bằng cách sử dụng các điểm kiểm duyệt và bằng chứng gian lận.

Trên lớp điểm kiểm duyệt của Mạng Polygon, đối với mỗi vài khối trên lớp khối của Mạng Polygon, một người xác thực (đủ liên kết) sẽ tạo một điểm kiểm duyệt trên chuỗi chính sau khi xác thực tất cả các khối trên lớp khối và tạo cây Merkle của khối băm kể từ điểm kiểm duyệt cuối cùng.

Ngoài việc cung cấp tính cuối cùng trên chuỗi chính, các điểm kiểm duyệt đóng một vai trò trong sự rút token vì chúng chứa bằng chứng đốt (rút) token trong sự kiện người dùng rút token. Nó cho phép người dùng chứng minh các token còn lại của họ trên hợp đồng gốc bằng cách sử dụng bằng chứng Patricia Merkle và bằng chứng khối tiêu đề. Lưu ý rằng để chứng minh các token còn lại, khối tiêu đề phải được cam kết lên Chuỗi Gốc thông qua PoS (Những người nắm giữ cổ phần). Quy trình rút sẽ phát sinh phí gas Ethereum như thường lệ. Chúng ta tận dụng rất nhiều các điểm kiểm duyệt cho các trò chơi thoát.

## Nhật ký sự kiện giống UTXO {#utxo-like-event-logs}

Đối với việc chuyển nhượng ERC20/ERC721, điều này đạt được bằng cách sử dụng cấu trúc dữ liệu nhật ký sự kiện giống UTXO. Bên dưới là một sự kiện `LogTransfer`để tham khảo.

```jsx
event LogTransfer(
    address indexed token,
    address indexed from,
    address indexed to,
    uint256 amountOrTokenId,
    uint256 input1, // previous account balance of the sender
    uint256 input2, // previous account balance of the receiver
    uint256 output1, // new account balance of the sender
    uint256 output2 // new account balance of the receiver
);
```

Vậy, về cơ bản mỗi lần chuyển nhượng ERC20/ERC721 phát hành sự kiện này và các số dư trước đó của người gửi và người nhận (`input1` và `input2`) trở thành đầu vào (giống UTXO) cho giao dịch và các số dư mới trở thành đầu ra (`output1` và `output2`). Việc chuyển nhượng được theo dõi bằng cách đối chiếu tất cả các sự kiện `LogTransfer`liên quan.

## Trò chơi thoát {#exit-games}

Vì các khối được sản xuất bởi một nhà sản xuất khối đơn lẻ (hoặc rất ít), nó cho thấy một mặt để gian lận. Chúng ta sẽ thảo luận ngắn gọn về các tình huống tấn công và sau đó nói về cách plasma đảm bảo an toàn cho người dùng.

## Vec-tơ tấn công {#attack-vectors}

### Tổng đài độc hại {#malicious-operator}
Phần sau thảo luận về các tình huống mà trình vận hành có thể trở nên độc hại và cố gắng gian lận.

1. Token không có nguồn gốc / chi tiêu gấp đôi / biên nhận không đúng định dạng làm tăng (đối với tài khoản do trình vận hành kiểm soát) / giảm (đối với người dùng) số dư token một cách gian lận.
2. Thiếu dữ liệu Sau khi người dùng gửi giao dịch, giả sử trình vận hành đã đưa giao dịch vào khối plasma nhưng khiến dữ liệu chuỗi bị thiếu cho người dùng. Trong trường hợp đó, nếu người dùng bắt đầu thoát từ một giao dịch cũ hơn, thì họ có thể bị thách thức trên chuỗi bằng cách trình bày giao dịch gần nhất của họ. Nó trở nên dễ khiến người dùng đau lòng.
3. Điểm kiểm duyệt xấu Trong trường hợp xấu nhất, trình vận hành có thể thực hiện A.1 và (hoặc) A.2 và thông đồng với người xác thực để thực hiện các chuyển đổi trạng thái không hợp lệ đó tới chuỗi gốc.
4. Dừng chuỗi bên Trình vận hành ngừng sản xuất các khối và chuỗi sẽ dừng lại. Nếu một điểm kiểm duyệt chưa được gửi trong một khoảng thời gian cụ thể, có thể đánh dấu chuỗi bên là đã dừng trên chuỗi gốc. Sau đó không thể gửi thêm điểm kiểm duyệt nữa.

Vì những lý do được liệt kê ở trên hoặc lý do khác, nếu chuỗi plasma đã trở nên không ổn định, người dùng cần bắt đầu thoát hàng loạt và chúng tôi mong muốn cung cấp các cấu trúc thoát trên chuỗi gốc mà người dùng có thể tận dụng, nếu và khi thời điểm đến.

### Người dùng độc hại {#malicious-user}

1. Người dùng bắt đầu thoát khỏi giao dịch đã cam kết nhưng tiếp tục chi tiêu token trên chuỗi bên. Tương tự với chi tiêu gấp đôi nhưng trên 2 chuỗi.

Chúng tôi xây dựng trên ý tưởng của [MoreVp7](https://ethresear.ch/t/more-viable-plasma/2160). Tóm lại, MoreVP giới thiệu một cách mới để tính mức độ ưu tiên thoát, được gọi là mức độ ưu tiên “đầu vào trẻ nhất”. Thay vì đặt lệnh thoát theo tuổi của đầu ra, các lệnh moreVP thoát theo tuổi của đầu vào trẻ nhất. Điều này có tác dụng là việc thoát các đầu ra – ngay cả khi chúng được đưa vào các khối bị giữ lại sau các giao dịch "không có nguồn gốc" – sẽ được xử lý chính xác miễn là chúng chỉ xuất phát từ các đầu vào hợp lệ. Chúng tôi xác định`getAge`, chỉ định tuổi cho một giao dịch được bao gồm. Điều này được xác định trong [plasma khả thi tối thiểu 1](https://ethresear.ch/t/minimal-viable-plasma/426).

```jsx
function getAge(receipt) {
  const { headerNumber, plasmaBlockNum, txindex, oindex } = receipt
  return f(headerNumber, plasmaBlockNum, txindex, oindex) // multiplied with their respective weights
}
```

## Các tình huống thoát {#exit-scenarios}

Hãy giới thiệu một số loại terminology trước khi chúng ta tiếp tục thảo luận về tình huống thoát ra:

- **Người rút**: Người dùng muốn thoát chuỗi plasma.
- **Giao dịch đã cam kết**: Giao dịch đã được bao gồm trong một khối chuỗi Polygon và đã được gửi điểm kiểm duyệt trên chuỗi gốc.
- **Giao dịch chi tiêu**: Giao dịch thay đổi số dư token của người dùng để phản hồi lại hành động do người dùng ký (không bao gồm giao dịch chuyển nhượng token đến). Đây có thể là giao dịch chuyển nhượng, giao dịch đốt, v.v. do người dùng bắt đầu
- **Giao dịch tham chiếu**: Giao dịch chỉ trước giao dịch thoát cho người dùng và token cụ thể đó. Như được định nghĩa trong lược đồ UTXO dựa trên số dư tài khoản của chúng ta, đầu ra cho giao dịch tham chiếu trở thành đầu vào cho giao dịch được thoát khỏi đó.
- **Ưu tiên thoát MoreVP**: Tuổi của đầu vào trẻ nhất (trong số các giao dịch tham chiếu) cho một giao dịch cụ thể. Nó sẽ thường được sử dụng để tính mức độ ưu tiên thoát.

### Số lưu trữ {#burn-tokens}

Để thoát chuỗi bên, người dùng sẽ khởi chạy giao dịch *rút tiền hay còn gọi là đốt token* trên chuỗi plasma. Giao dịch này sẽ phát hành sự kiện`Withdraw`.

```jsx
event Withdraw(
    address indexed token,
    address indexed from,
    uint256 amountOrTokenId,
    uint256 input1,
    uint256 output1
);
```

Ở đây `input1`biểu thị số dư trước đó của người dùng cho token được đề cập và `output1`biểu thị số lượng token còn lại trên chuỗi bên. Cấu trúc này nhất quán với lược đồ *UTXO* dựa trên tài khoản của chúng ta. Người dùng sẽ xuất trình biên nhận của giao dịch rút này để rút các token trên chuỗi chính. Trong khi tham chiếu biên nhận này, người dùng cũng phải cung cấp các bằng chứng sau:

1. Bằng chứng Merkle về việc bao gồm biên nhận trong một khối chuỗi bên (`receiptsRoot`)
2. Bằng chứng Merkle về việc bao gồm giao dịch trong một khối chuỗi bên (`transactionsRoot`)
3. Bằng chứng về việc bao gồm tiêu đề khối chuỗi bên trong điểm kiểm duyệt trên chuỗi gốc

```jsx
startExit(withdrawTx, proofOfInclusion /* of the withdrawTx in the checkpoint */) {
  Verify inclusion of withdrawTx in checkpoint using proofOfInclusion
  Verify msg.sender == ecrecover(withdrawTx)

  uint age = getAge(withdrawTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}
```

Bất cứ khi nào người dùng muốn thoát chuỗi plasma, họ (hoặc được tách ra bởi ứng dụng máy khách của họ, tức là ví) nên đốt các token trên chuỗi bên, đợi nó được gửi điểm kiểm duyệt và sau đó bắt đầu thoát khỏi giao dịch rút đã được gửi điểm kiểm duyệt.

### Thoát khỏi sự chuyển tiếp ERC20/721 cuối cùng (MoreVP) {#exit-from-the-last-erc20-721-transfers-morevp}

Hãy xem xét tình huống, người dùng đã thực hiện chuyển nhượng ERC20 trên chuỗi bên. Trình vận hành đã thêm một giao dịch không có nguồn gốc ngay trước giao dịch chuyển nhượng của người dùng và thông đồng với người xác thực để gửi điểm kiểm duyệt khối này. Trong trường hợp này và nói chung, trong các vec-tơ tấn công từ A1 đến A3 được thảo luận ở trên, người dùng có thể không có cơ hội đốt token của họ trước khi một giao dịch độc hại được đưa vào và do đó sẽ cần bắt đầu thoát khỏi giao dịch được gửi điểm kiểm duyệt cuối cùng trên chuỗi gốc – vì lý do này, ngoài lệnh thoát đốt, chúng ta cần hỗ trợ các lệnh thoát từ nhiều giao dịch như chuyển nhượng ERC20/721 trong số các giao dịch khác. Xây dựng dựa trên vec-tơ tấn công này và chia nhỏ 2 tình huống:

**Chuyển nhượng đi:** Tôi đã chuyển nhượng một số token cho một người dùng, tuy nhiên tôi nhận thấy rằng trình vận hành đã bao gồm một giao dịch độc hại trong khối/điểm kiểm duyệt trước khi bao gồm giao dịch chuyển nhượng của tôi. Tôi cần bắt đầu thoát chuỗi. Tôi sẽ bắt đầu thoát khỏi giao dịch chuyển nhượng. Như được định nghĩa trong MoreVP, tôi sẽ cần cung cấp giao dịch tham chiếu (*UTXO đầu vào*) sẽ xác định mức độ ưu tiên của lệnh thoát. Vì vậy, tôi sẽ tham chiếu một giao dịch đã cập nhật số dư token của tôi và chỉ đi trước giao dịch chuyển nhượng đi.

```jsx
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the user after the input tx was executed >= tokens being transferred in the exitTx
  Verify msg.sender == ecrecover(exitTx)

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

**Chuyển nhượng đến:** Tôi nhận thấy rằng trình vận hành đã bao gồm giao dịch độc hại trong khối/điểm kiểm duyệt trước khi bao gồm giao dịch chuyển nhượng đến của tôi. Tôi sẽ bắt đầu thoát khỏi giao dịch chuyển nhượng đến trong khi tham chiếu số dư của bên đối tác – bởi vì ở đây *UTXO đầu vào* là số dư token của bên đối tác.

```
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the counterparty after the input tx was executed >= tokens being transferred in the exitTx
  Verify input.sender == ecrecover(exitTx) && input.receiver == msg.sender

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

### Thoát từ giao dịch trong chuyến bay (MoreVP) {#exit-from-an-in-flight-transaction-morevp}

Trường hợp này là để chống lại trường hợp thiếu dữ liệu. Giả sử tôi đã thực hiện một giao dịch nhưng tôi không biết liệu giao dịch đó đã được đưa vào hay chưa do thiếu dữ liệu. Tôi có thể bắt đầu thoát khỏi giao dịch đang xử lý này bằng cách tham chiếu giao dịch được gửi điểm kiểm duyệt cuối cùng. Người dùng nên cẩn thận không thực hiện bất kỳ giao dịch nào bất kỳ khi nào họ bắt đầu thoát kiểu MoreVP, nếu không họ sẽ bị thử thách.

**Ghi chú:** Khi thoát khỏi một cấu trúc kiểu MoreVP, người dùng có thể bắt đầu thoát bằng cách cung cấp giao dịch tham chiếu, giao dịch thoát và đặt một `exit bond`nhỏ. Đối với bất kỳ lệnh thoát nào, nếu bị thử thách thành công, lệnh thoát sẽ bị hủy và trái phiếu thoát sẽ bị thu giữ.

## Hạn chế {#limitations}

1. Kích thước bằng chứng lớn: Bằng chứng merkle về việc bao gồm giao dịch và bằng chứng merkle về việc bao gồm khối (chứa giao dịch đó) trong điểm kiểm duyệt.
2. Thoát hàng loạt: Nếu trình vận hành trở thành độc hại, người dùng cần bắt đầu thoát hàng loạt.

Thông số kỹ thuật đang ở giai đoạn sơ khai và chúng tôi sẽ cảm kích bất kỳ phản hồi nào giúp chúng tôi cải thiện nó hoặc thiết kế lại hoàn toàn nếu cấu trúc này bị hỏng một cách vô vọng. Việc thực thi là một công việc trong sự phát triển trong kho [lưu trữ hợp đồng](https://github.com/maticnetwork/contracts) của chúng ta.