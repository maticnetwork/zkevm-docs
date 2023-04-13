---
id: wallet-bridge-faq
title: <>Cầu Ví bằng mạng FAQ
description: Xây dựng ứng dụng blockchain tiếp theo của bạn trên Polygon.
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Tôi có thể sử dụng Ví điện thoại Polygon ở đâu? {#where-can-i-use-the-polygon-web-wallet}
Đây là URL Polygon Wallet Suite : https://ví.polygon.tech/Polygon Wallet là một bộ sưu tập các ứng dụng Web3 được cung cấp bởi Polygon. Nó bao gồm số [Polygon Wallet](https://wallet.polygon.technology/polygon/assets) (một ví đã phát triển), Cầu [Polygon](https://wallet.polygon.technology/polygon/bridge/deposit) (một cây cầu L1-L2), [Polygon Stake](https://staking.polygon.technology/) (một môi trường để xác định và phát biểu MATIC tokens) và [Cầu Polygon Safe](https://safe-bridge.polygon.technology/safe) (một cây cầu đa số).

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## Ví nào hiện đang được hỗ trợ? {#which-wallets-are-currently-supported}

Metamask, Coinbase, Wallet, Venly và WalletConnecticut là những ví được hỗ trợ hiện tại.

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## Tôi có thể làm gì với ví Polygon của mình? {#what-can-i-do-with-my-polygon-wallet}

- Gửi tiền vào bất kỳ tài khoản nào trên Polygon.
- Nạp tiền từ Ethereum vào Polygon (sử dụng cầu nối).
- Rút tiền trở lại Ethereum từ Polygon (cũng bằng cách sử dụng cầu nối).

## Ví MetaMask của tôi không kết nối với ví Polygon {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

Điều này có thể xảy ra vì nhiều lý do. Chúng tôi đề nghị bạn **nên thử một lần khác**, **sử dụng một trình duyệt khác** hoặc nếu bất kỳ ai trong số này không giúp đỡ, **[hãy liên hệ với đội hỗ trợ của chúng tôi](https://support.polygon.technology/support/home)**.

## Làm sao tôi có thể gửi quỹ từ Ethereum đến Polygon bằng cách sử dụng phòng thí nghiệm Polygon Wallet. {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
Vui lòng xem video bên dưới hoặc theo [hướng dẫn này](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>Trình duyệt của bạn không hỗ trợ yếu tố video.</p>
</video>

## Làm sao tôi có thể rút tiền từ Polygon đến Ethereum thông qua Cầu PoS bằng cách sử dụng Polygon Wallet Suite? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
Vui lòng xem video bên dưới hoặc theo [hướng dẫn này](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>Trình duyệt của bạn không hỗ trợ yếu tố video.</p>
</video>

## Làm sao tôi có thể rút tiền từ Polygon đến Ethereum thông qua Cầu Plasma bằng cách sử dụng Polygon Wallet Suite? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
Vui lòng xem video bên dưới hoặc theo [hướng dẫn này](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>Trình duyệt của bạn không hỗ trợ yếu tố video.</p>
</video>

## Cách để thêm một dấu hiệu mới hoặc tùy chọn vào danh sách Token Polygon Wallet? {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
Vui lòng theo [hướng dẫn này.](/docs/faq/adding-a-custom-token)

## Làm thế nào để tìm hợp đồng token? {#how-do-i-find-the-token-contract}

Địa chỉ hợp đồng vật dụng sẽ được yêu cầu khi bạn đang cố gắng thêm một nút mới hoặc được định sẵn. Bạn có thể tìm kiếm dấu hiệu bằng tên của nó trên hoặc Coingecko hoặc CoinMarkekep, nơi bạn sẽ có thể xem địa chỉ của nó trên chuỗi Ethereum (cho ERC20 tokens) và các chuỗi blocks khác được hỗ trợ như Polygon. Địa chỉ token trên các chuỗi khác có thể không được cập nhật nhưng bạn chắc chắn có thể sử dụng địa chỉ gốc cho mọi mục đích.

## Tôi đã gửi tiền của mình nhưng tôi không thấy nó trên Metamank. Tôi phải làm gì? {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

Bạn cần thêm địa chỉ bằng tay vào địa chỉ dấu hiệu riêng cho Metamank.

Mở Metamask và cuộn xuống để nhấp vào **Nhập token**.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

Sau đó, hãy thêm địa chỉ hợp đồng liên quan, biểu tượng, và tính toán thập phân. Địa chỉ giao dịch (PoS-WETH trong trường hợp này) có thể được tìm thấy trên liên kết này: [https://docs.polygon.tech/docs/operate/mapped-tokens./](https://docs.polygon.technology/docs/operate/mapped-tokens/). Bạn sẽ cần thêm địa chỉ token con để xem số dư trên Mạng chính Polygon. Số thập phân của độ chính xác là 18 cho WETH (đối với hầu hết tokens, số thập phân của độ chính xác là 18).

## Làm sao để thêm Polygon Mainnet trên Metamank? {#how-can-i-add-polygon-mainnet-on-metamask}

Kiểm tra [hướng dẫn này](/docs/develop/metamask/config-polygon-on-metamask).

## Token của tôi không hiển thị trong danh sách. Tôi nên liên hệ với ai? {#my-token-is-not-visible-in-the-list-who-should-i-contact}

Liên hệ với đội ngũ Polygon trên Discord hoặc Telegram để token của bạn được niêm yết. Trước đó, hãy đảm bảo token của bạn đã được lập bản đồ. Nếu nó không phải là bản đồ, vui lòng nâng một yêu cầu ở [https://mapper.polygon.tech/](https://mapper.polygon.technology/).

## Tôi có thể hủy giao dịch của mình sau khi điểm kiểm tra đến? {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
Một khi giao dịch rút được khởi động trên Polygon Mainnet, thì không may là nó không thể hủy hoặc được đảo ngược. Trong các giao dịch rút quân, các dấu hiệu được đốt từ Polygon Mainnet và được đúc trên Mainnet Ethereum. Do đó, các dấu hiệu một khi bị đốt từ chuỗi Polygon không thể được đảo ngược lại trong ví của bạn.

## Phí xăng quá cao, tôi có thể hủy giao dịch của mình không? {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

Thật không may, chúng ta không thể hủy giao dịch rút được một khi các dấu đã được đốt từ Polygon Mainnet. Nói cách khác, không thể hủy bỏ giao dịch khi nó được khởi hành. Phí gas không được kiểm soát bởi Polygon. Nó hoàn toàn phụ thuộc vào sự liên kết mạng và số lượng giao dịch trong một khối đặc biệt trên Mainnet Ethereum. Nếu bạn nghĩ bạn không thể chi trả phí xăng hiện tại, bạn có thể chờ và cố gắng thực hiện giao dịch của bạn sau khi phí xăng ở phía dưới. Bạn cũng có thể giám sát phí gas trên Ethereum Mainnet từ đây: https://etherscan.io/gatracker


## Tôi có thể gửi token của mình từ Polygon đến bất kỳ ví/sàn giao dịch nào khác không? {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

Bạn không thể gửi các dấu trực tiếp từ Polygon UI để trao đổi /walk. Trước tiên, bạn phải rút từ Polygon sang Ethereum và sau đó gửi token đến địa chỉ sàn giao dịch của bạn (trừ khi sàn giao dịch/ví của bạn đề cập rõ ràng đến việc hỗ trợ mạng).

## Tôi đã phạm sai lầm khi gửi quỹ cho một cuộc trao đổi/ví trực tiếp. Bạn có thể giúp không? {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

Rất tiếc, chúng tôi không thể hỗ trợ bạn trong những trường hợp như vậy. Vui lòng không gửi tiền trực tiếp đến các sàn giao dịch chỉ hỗ trợ Ethereum, trước tiên bạn phải rút tiền từ Polygon sang Ethereum và sau đó gửi tiền đến địa chỉ sàn giao dịch của bạn.

## Tôi đã chuyển tiền đến sai địa chỉ. Làm thế nào tôi có thể lấy lại tiền? {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

Thật không may là không thể làm gì được. Chỉ người sở hữu các khóa riêng của địa chỉ đó mới có thể di chuyển số tài sản đó. Nó luôn khuyến nghị xác thực nếu địa chỉ bạn đang gửi có nghĩa là đúng hay không.

## Giao dịch của tôi đã chờ quá lâu, tôi có thể làm gì đây? {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
Giao dịch có thể được giảm do lý do sau:

1. Thiết lập giá gas thấp trong khi gửi giao dịch.
2. Sự tăng đột ngột trong giá gas do sự ngắt điện trên Mainnet Ethereum.
3. Giao dịch bị hủy bởi bạn từ ví của bạn hoặc được thay thế bằng một giao dịch mới.

Bạn có thể tiến hành các giao dịch đã rơi theo cách sau:

1. Nếu giao dịch của bạn bị kẹt trong hơn một tiếng, một nút **Thử lần nữa** sẽ được hiển thị. Bạn có thể nhắp vào nút **Thử Lần nữa** để hoàn thành cùng một giao dịch. Bạn có thể tham khảo video này để xem thêm thông tin về cách sử dụng tính năng **Thử**.
2. Vui lòng kiểm tra ví MetaMask của bạn cũng như vì đôi khi giao dịch có thể được đưa ra do giao dịch đã xác định trong Metamank. Trong trường hợp đó, hãy xóa các giao dịch đã xác thực hoặc tái cài đặt MetaMask trong cùng một trình duyệt này.
3. Bạn có thể cài đặt MetaMask trong một trình duyệt thay thế và sau đó cố gắng hoàn thành giao dịch bằng Polygon Wallet Suite.
4. Bạn cũng có thể sử dụng đường dây này để hoàn thành giao dịch đang chờ. Dán nút giao dịch trong tùy chọn tìm kiếm, và nhấn nút **Xác thực để** hoàn thành giao dịch.

## Tôi phải làm gì nếu khoản tiền nạp được xác nhận nhưng số dư không được cập nhật? {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

Cần 22-30 phút để giao dịch gửi hoàn thành. Vui lòng chờ một thời gian và nhấn vào **Balance**.

## Tôi nên làm gì nếu điểm kiểm duyệt không xảy ra? {#what-should-i-do-if-the-checkpoint-is-not-happening}

Các điểm kiểm tra đôi khi mất hơn 45 phút đến 1 tiếng dựa trên sự cố mạng trên Ethereum, chúng tôi đề nghị chờ một thời gian trước khi nâng vé.

## Giao dịch của tôi bị treo. {#my-transaction-is-stuck}

Chúng ta đã liệt kê một số lỗi thông thường mà người dùng có thể đối mặt. Bạn có thể tìm thấy giải pháp bên dưới hình ảnh về lỗi. Trong trường hợp bạn gặp lỗi khác, vui lòng [tạo phiếu hỗ trợ](https://support.polygon.technology/support/home) để đội ngũ của chúng tôi tiến hành khắc phục sự cố.

  - ### Các Lỗi Thường gặp {#common-errors}
a. Lệnh rút tiền bị treo ở giai đoạn Khởi chạy.

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

  b. Lỗi RPC

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/operate/network#matic-mainnet) for more information.

  c.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

  Đây thường là lỗi tắt và bật được tự động giải quyết. Trong trường hợp bạn vẫn gặp phải lỗi tương tự trong khi khởi chạy lại bước này, hãy [tạo phiếu hỗ trợ](https://support.polygon.technology/) cùng tất cả thông tin liên quan để được tiếp tục khắc phục sự cố.


## Tôi gặp lỗi số dư không đủ. {#i-m-shown-an-insufficient-balance-error}

Việc nạp và rút tiền trên mạng Polygon có mức phí rất thấp. Bạn cần biết rằng lỗi số dư không đủ có thể được loại bỏ bằng cách nâng số dư ETH trên mạng chính Ethereum. Điều đó thường làm giảm được sự cố của một sự cân bằng không đủ. Nếu đây là giao dịch trên Polygon Mainnet, chúng tôi sẽ yêu cầu bạn có đủ số lượng của MATIC.

## Các giao dịch của tôi không hiển thị trên trình khám phá. Tôi nên làm gì? {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

Đây có lẽ là vấn đề về lập chỉ mục với Polygonscan. Vui lòng liên hệ với [Đội Hỗ trợ](https://support.polygon.technology/support/home) để làm rõ hơn.

## Tôi khởi chạy một lệnh nạp tiền trên Ethereum nhưng giao dịch vẫn đang chờ xử lý. Tôi nên làm gì? {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

Giá gas cung cấp của bạn có thể quá thấp. Bạn nên đợi một lúc và thực hiện lại nếu giao dịch không được khai thác. Trong trường hợp cần trợ giúp thêm, vui lòng liên hệ với [đội ngũ hỗ trợ](https://support.polygon.technology/support/home) và cung cấp địa chỉ ví của bạn, hàm băm giao dịch (nếu có) và ảnh chụp màn hình liên quan.

## Tôi không nhận được hàm băm giao dịch và khoản tiền nạp của tôi không được xử lý? Điều gì đang xảy ra? {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

Bạn có thể có các giao dịch đang chờ xử lý trước đó, vui lòng hủy hoặc tăng tốc các giao dịch này trước. Các giao dịch trên Ethereum chỉ có thể diễn ra lần lượt.

## Hệ thống cho thấy Polygon không tính bất kỳ khoản phí rút tiền nào nhưng chúng tôi phải thanh toán khoản phí đó trong quá trình giao dịch. {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

Giao dịch rút tiền với cầu nối Plasma được chia thành 3 bước, một bước diễn ra trên Mạng chính Polygon và hai bước sẽ được hoàn thành trên Mạng chính Ethereum. Trên cầu nối PoS, giao dịch rút tiền diễn ra qua hai bước: Đốt token trên mạng Polygon và gửi bằng chứng trên mạng Ethereum. Trong mọi trường hợp, việc đốt token diễn ra trên Mạng chính Polygon sẽ mất một khoản chi phí rất nhỏ. Các bước còn lại diễn ra trên Mạng chính Ethereum sẽ phải được thanh toán bằng ETH tùy thuộc vào giá gas hiện tại có thể được xác minh [tại đây](https://ethgasstation.info/).

## Tôi đã cố gắng nạp tiền nhưng giao dịch dừng lại ở bước Phê duyệt. {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

Nếu giao dịch vẫn ở bước **Phê duyệt** , điều đó có nghĩa là giao dịch vẫn chưa hoàn tất. Để hoàn tất giao dịch, bạn cần phải trả phí gas và sau đó giao dịch sẽ được xử lý.

## Ví Polygon hiển thị thông báo lỗi "Người dùng từ chối chữ ký giao dịch". {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

Lỗi này thường xảy ra do người dùng đã hủy hoặc từ chối ký giao dịch qua MetaMask. Khi được nhắc bởi ví MetaMask, tiến hành ký vào giao dịch bằng cách nhấn vào **Aptage** và không phải trên **Cancel**.

## Giao dịch là thành công nhưng nó hiển thị việc chờ. {#the-transaction-is-successful-but-it-shows-pending}

Nếu giao dịch của bạn đã hoàn thành và bạn đã nhận được quỹ của mình nhưng vẫn còn các cuộc giao dịch đang chờ trên UI, bạn có thể nâng lên vé hỗ trợ bằng cách gửi chi tiết liên quan và hình ảnh.

## Danh sách các Exchange Hỗ trợ trên Polygon là gì? {#what-is-the-list-of-supported-exchanges-on-polygon}

Đồng xu MATIC có thể được giao dịch bằng nhiều sự trao đổi. Tuy nhiên, điều quan trọng là phải thực hiện nghiên cứu của mình khi bạn đang chọn một để trao đổi. Điều không lạ là một số sự thay đổi tiếp tục tạo ra những dấu hiệu hiện tại của họ và cũng có thời gian bảo trì.

Bạn có thể thăm [Coinmarkecap]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) để có một danh sách các giao dịch nơi bạn có thể tìm thấy MATIC.

## Polygon có hỗ trợ ví cứng không? {#does-polygon-support-hardware-wallets}

Phải, chúng tôi hỗ trợ các ví phần cứng sau:
1. Trzor
2. Thư mụcName

Người dùng có thể kết nối ví phần cứng của họ trên MetaMask và tiến hành giao dịch của họ. Dưới đây là sự kết nối để kết nối ví phần cứng trên Metamask: https://metamask.zendesk.com/hc/en-us/articles/440855261275

## Tại sao dấu MATIC không được hỗ trợ trên PoS? {#why-isn-t-the-matic-token-supported-on-pos}

MATIC là token gốc của Polygon và có địa chỉ hợp đồng là 0x0000000000000000000000000000000000001010 trên chuỗi Polygon. Nó cũng được sử dụng để trả xăng. Việc lập bản đồ token MATIC trên cầu nối PoS sẽ dẫn đến việc MATIC có thêm một địa chỉ hợp đồng trên chuỗi Polygon. Điều này sẽ xung đột với địa chỉ hợp đồng hiện tại vì địa chỉ token mới này không thể được sử dụng để trả phí gas và sẽ phải giữ nguyên làm token ERC20 bình thường trên chuỗi Polygon. Vì vậy, để tránh sự nhầm lẫn, chúng tôi đã quyết định duy trì MATIC trên Plasma.

## Làm thế nào để lập bản đồ token? {#how-do-i-map-tokens}

Vui lòng tham khảo [hướng dẫn này] (/docs/develope/ethereum-polygon/submit-mapping-requis) hoặc bạn có thể đi thẳng vào [Token Maper](https://mapper.polygon.technology/).

## Tôi phải làm gì nếu giao dịch diễn ra quá lâu hoặc nếu giá gas quá cao? {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

Thời gian giao dịch và giá xăng dựa trên sự liên kết mạng và nó cũng được xác định bởi nguồn cung ứng và nhu cầu giữa người phát triển mạng lưới.

Bạn có thể làm gì:
- Kiên nhẫn đi.
- Tăng phí xăng nếu quá chậm.
- Kiểm tra phí trước khi gửi giao dịch. Dưới đây là một liên kết cho thiết bị theo dõi gas của Etherscan: https://etherscan.io/gatracker

Điều bạn không nên làm:
- Vui lòng không đặt giới hạn gas thấp hoặc giao dịch của bạn có thể thất bại.
- Đừng cố gắng hủy giao dịch. Kiểm tra phí trước khi.


## Tôi có thể thay đổi giới hạn giá gas hoặc giá gas không? {#can-i-change-the-gas-limit-or-the-gas-price}

Giới hạn gas được ước tính và thiết lập bởi ứng dụng theo yêu cầu nhất định của chức năng được gọi trong hợp đồng. Thông tin này sẽ không được chỉnh sửa. Chỉ có giá gas mới có thể được thay đổi theo thứ tự để tăng hoặc giảm số tiền giao dịch.

## Làm thế nào để tăng tốc độ giao dịch? {#how-to-speed-up-the-transactions}
Bạn có thể làm như vậy bằng cách tăng số tiền gas Dưới đây là một liên kết giải thích cách thực hiện trên Metamask: https://metamask.zendesk.com/hc/en-us/articles/360015489251-Bằng cách nào-Bằng cách nào-Cancel-a-Pandiction.

## Số hiệu MATIC là bao nhiêu để trả phí xăng? {#how-much-matic-token-is-enough-for-the-gas-fee}
Người dùng cần có mức tối thiểu là 0.01 MATIC trong máy chủ Polygon.

## Tôi có thể tạo phiếu hỗ trợ ở đâu? {#where-do-i-raise-a-support-ticket}
Nếu bạn cần sự giúp đỡ từ các chuyên gia của chúng tôi, vui lòng gửi thông điệp đến https://support.polygon.tech/support/home.

## Làm thế nào để kết nối tài sản qua các chuỗi? {#how-do-i-bridge-assets-across-chains}

Polygon cung cấp một cây cầu để chuyển tài sản từ Ethereum đến Polygon và ngược lại. Bạn có thể tìm hiểu thêm về nó trên [phần Bridges]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started)) của wiki.

Tuy nhiên, nếu bạn đang sử dụng bất kỳ dịch vụ bên ngoài nào không được sở hữu, chúng tôi khuyên bạn nên liên hệ với dịch vụ khách hàng của họ để yêu cầu hướng dẫn và hướng dẫn. Điều này cũng quan trọng là thực hiện nghiên cứu của bạn khi bạn đang sử dụng dịch vụ web3.

## Tôi gặp sự cố rút token với OpenSea hoặc bất kỳ ứng dụng nào khác sử dụng cầu nối Polygon. {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

Nếu bạn có vấn đề với giao dịch rút của bạn bị kẹt, Polygon sẽ cung cấp cây cầu rút bằng [https://firel.polygon.technology](https://withdraw.polygon.technology) để giúp bạn thoát khỏi mặt đất nếu bạn có sự cố burn của bạn. Với công cụ này, tài khoản của bạn sẽ nhanh chóng hoạt động bình thường trở lại và sự cố sẽ được giải quyết. Các câu hỏi khác liên quan đến giao dịch của bạn với OpenSea và các dApps khác sẽ phải được thực hiện bởi nhóm ứng dụng.

## Tôi đã bị lừa. Làm thế nào để tôi lấy lại token của mình? {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

Thật không may, không có quy trình nào để khôi phục số tiền đã bị mất. Chúng tôi yêu cầu điều đó trước khi bạn thực hiện giao dịch, bạn tiếp tục kiểm tra và kiểm tra gấp đôi trước khi bắt đầu và hoàn thành. Vui lòng lưu ý rằng mạng Polygon và nhân viên chính thức của chúng tôi không tham gia vào bất kỳ bài phát hoặc số phiếu gấp đôi và chúng tôi sẽ không bao giờ tiếp cận bạn bằng cách thay mặt tổ chức. Vui lòng bỏ qua tất cả những sự mời chào đó vì chúng rất có thể là lừa đảo. Tất cả thông tin liên lạc của chúng ta đều thông qua các bàn tay chính thức của chúng ta.

## Có một số giao dịch trái phép trong ví của tôi. Ví của tôi có phải bị tin tặc tấn công không? {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

Thật không may, mạng không thể hoàn nguyên các giao dịch không mong muốn.
Điều quan trọng là luôn bảo quản cẩn thận các khóa riêng tư của bạn và **không bao giờ chia sẻ các khóa này với bất kỳ ai**.
Nếu bạn vẫn còn lại ít tiền, hãy chuyển ngay sang ví mới.

## Ethereum có Goerli là mạng lưới thử nghiệm của nó. Polygon Network cũng có mạng thử nghiệm không? {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

Khi Mạng Ethereum có Goerli là mạng lưới thử nghiệm của họ, Polygon Mainnet đã có Mumbai. Tất cả các giao dịch trên mạng thử nghiệm này sẽ được lập chỉ mục trên Trình khám phá Mumbai.

## Làm sao tôi có thể đổi dấu hiệu của mình cho các tokens khác? {#how-can-i-swap-my-tokens-for-other-tokens}
Vui lòng xem video bên dưới hoặc theo [hướng dẫn này](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>Trình duyệt của bạn không hỗ trợ yếu tố video.</p>
</video>

## Đổi Token quá chậm. {#the-token-swap-is-too-slow}

Nếu bạn đang cố gắng hoán đổi token và quy trình này mất quá nhiều thời gian, bạn có thể thử cùng giao dịch đó trên một trình duyệt khác. Nếu cách này không hiệu quả và bạn đang gặp lỗi, vui lòng gửi ảnh chụp màn hình đến Đội ngũ Hỗ trợ của chúng tôi.

## Các dấu nào được tính như phí gas cho sự trao đổi vật chứng? {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
Chỉ có MATIC.

## Làm sao tôi có thể đổi dấu hiệu của mình để đổi xăng? {#how-can-i-swap-my-token-for-gas}
Vui lòng xem video bên dưới hoặc theo [hướng dẫn này](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>Trình duyệt của bạn không hỗ trợ yếu tố video.</p>
</video>

## Các dấu nào có thể được sử dụng để đổi lấy xăng? {#which-tokens-can-be-used-to-swap-for-gas}
Chỉ có các đồ chơi này mới được hỗ trợ cho ‘Swap cho Gas’: ETH, USDC, USDT, DAI, AAVE, LINK, WBTC, UNI, GHST, TEL, EMON, và COMBO.

## Cách để có được EU tokens? {#how-to-get-eth-tokens}
Để có được ETH tokens, bạn có thể đổi chúng lấy một dấu hiệu khác hoặc số tiền phát triển trên một giao dịch, mua chúng trên một nút trên - ramp (hoặc trên Metamask) hoặc thậm chí còn trao đổi các dấu hiệu khác cho Eth bằng [tính năng trao đổi dấu hiệu của Polygon](https://wallet.polygon.technology/polygon/token-swap).

## Làm thế nào để sử dụng token MATIC thanh toán phí gas? {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

Chúng tôi cung cấp dịch vụ [Hoán đổi Phí Gas](https://wallet.polygon.technology/gas-swap/) sẽ giúp bạn thực hiện điều đó. Bạn chọn một số lượng MATIC bạn cần để hoàn tất giao dịch và bạn có thể hoán đổi chúng lấy các token khác như Ether hoặc USDT. Cần lưu ý rằng đây là một **giao dịch không tốn phí gas**.

## Tôi có thể nhận token MATIC trực tiếp ở đâu? {#where-can-i-get-matic-tokens-directly}

So MATIC có thể được mua từ bất kỳ sự kiện trung tâm nào ([Binance](https://www.binance.com/en), [Coinbase](https://www.coinbase.com/), et.al) hoặc Sự xác thực ([Uniswap](https://uniswap.org/), [quickSwap](https://quickswap.exchange/#/swap)). Bạn cũng có thể nghiên cứu và thử một số trên các đường dây như [Transak](https://transak.com/), và [Ramp](https://ramp.network/). Mục đích mua đồng MATIC của bạn cũng sẽ xác định nơi bạn sẽ mua và mạng. Bạn sẽ được khuyến nghị có MATIC trên mạng chính xác Ethereum nếu ý định của bạn là giả định hoặc đại biểu. Nếu mục đích của bạn là giao dịch trên Polygon Mainnet, bạn nên giữ và giao dịch với MATIC trên Polygon Mainnet.





