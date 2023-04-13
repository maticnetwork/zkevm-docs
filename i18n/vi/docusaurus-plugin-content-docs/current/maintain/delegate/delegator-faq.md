---
id: delegator-faq
title: Hỏi đáp về người ủy quyền
sidebar_label: Delegator FAQ
description: FAQs liên quan đến Delegation trên mạng Polygon
keywords:
  - docs
  - polygon
  - how to delegate
  - validator
  - stake
  - faq
  - delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

### URL bảng điều khiển góp cổ phần là gì? {#what-is-the-staking-dashboard-url}

URL staking dashboard là https://staking.polygon...

### Số lượng cổ phần tối thiểu là bao nhiêu? {#what-is-the-minimum-stake-amount}

Không có số lượng cổ phần tối thiểu để ủy quyền. Tuy nhiên, bạn luôn có thể bắt đầu bằng một nút MATIC.

### Tôi sẽ nhận được bao nhiêu phần thưởng nếu tôi ủy quyền? {#how-many-rewards-will-i-get-if-i-delegate}

Vui lòng sử dụng [Trình Tính Toán Phần Thưởng STake](https://staking.polygon.technology/rewards-calculator) để xác định ước tính của bạn.

### Tại sao giao dịch của tôi mất quá lâu vậy? {#why-does-my-transaction-take-so-long}

Tất cả các giao dịch góp cổ phần của Polygon diễn ra trên Ethereum vì lý do bảo mật.

Thời gian để hoàn thành một giao dịch phụ thuộc vào phí gas mà bạn đã chấp nhận và tắc nghẽn mạng lưới chính Ethereum tại thời điểm đó. Bạn luôn có thể sử dụng tùy chọn "Speed Up" để tăng phí gas để giao dịch của bạn có thể hoàn thành sớm hơn.

### Ví nào hiện đang được hỗ trợ? {#which-wallets-are-currently-supported}

Hiện nay, chỉ phần mở rộng Metamask trên trình duyệt máy tính để bàn và Ví Coinbase được hỗ trợ. Ngoài ra, bạn có thể sử dụng WalletConnecticut và Walletlink từ các ví dụ được hỗ trợ tương tác với bảng điều khiển UI trên màn hình / laptop Chúng tôi sẽ sớm hỗ trợ bổ sung cho các ví khác.

### Ví phần cứng có được hỗ trợ không? {#are-hardware-wallets-supported}

Có, ví cứng được hỗ trợ. Bạn có thể sử dụng tùy chọn "Kết nối Ví Cứng" trên Metamask và kết nối Ví cứng của bạn và sau đó tiếp tục quy trình ủy quyền.

### Tại sao tôi không thể góp cổ phần trực tiếp từ Binance? {#why-can-t-i-stake-directly-from-binance}

Góp cổ phần thông qua Binance hiện chưa được hỗ trợ. Sẽ có một thông báo nếu và khi Binance bắt đầu hỗ trợ giao dịch này.

### Sau khi tôi đã hoàn thành ủy quyền của mình, tôi có thể kiểm tra chi tiết ở đâu? {#i-have-completed-my-delegation-where-can-i-check-details}

Khi bạn đã hoàn thành đại biểu, hãy chờ 12 khối xác thực trên Ethereum (approx. 3-5 phút), sau đó trên Dashboard, bạn có thể nhắp vào **Tài khoản Của Tôi**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Tôi có thể kiểm tra phần thưởng của tôi ở đâu? {#where-can-i-check-my-rewards}

Trên bảng Dash, bạn có thể nhắp vào tùy chọn **Tài khoản của tôi** trên bên trái.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Tôi có cần ETH để thanh toán phí gas không? {#do-i-need-eth-to-pay-for-gas-fees}

Có. Bạn nên dự phòng ~0,05-0,1 ETH để đảm bảo an toàn.

### Tôi có cần nạp token matic vào mạng lưới chính Polygon để góp cổ phần không? {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

Không. Mọi khoản tiền của bạn cần phải nằm trên Mạng chính Ethereum.

### Nút Xác nhận bị vô hiệu hoá khi tôi cố gắng thực hiện giao dịch, tại sao vậy? {#when-i-try-to-do-the-transaction-my-confirm-button-is-disabled-why-so}

Vui lòng kiểm tra xem bạn có đủ ETH cho phí gas không.

### Khi nào phần thưởng được phân phối? {#when-does-reward-get-distributed}

Phần thưởng được phân phối mỗi khi điểm kiểm duyệt được gửi đi.

Hiện tại, các dấu hiệu MATIC 20188 được phân phối tương ứng trên mỗi điểm kiểm tra thành công cho mỗi đại biểu dựa trên cổ phần của họ đối với bể bơi tổng thể của tất cả các người xác thực và đại biểu. Ngoài ra, tỷ lệ phần thưởng được phân phối cho mỗi người ủy quyền sẽ thay đổi theo từng điểm kiểm duyệt tùy thuộc vào cổ phần tương ứng của người ủy quyền, người xác thực và cổ phần tổng thể.

(Lưu ý rằng có 10% tiền thưởng người đề xuất được cộng dồn cho người xác thực gửi điểm kiểm duyệt, nhưng theo thời gian, hiệu lực thưởng thêm sẽ bị mất đi theo số điểm kiểm duyệt tăng lên từ những người xác thực khác nhau.)

Gửi điểm kiểm duyệt được thực hiện bởi một trong những người xác thực sau khoảng mỗi 34 phút. Thời gian này chỉ là ước tính và có thể thay đổi tuỳ theo đồng thuận của người xác thực về lớp Heimdall của Polygon. Thời gian này cũng có thể thay đổi tuỳ theo mạng lưới Ethereum. Tình trạng tắc nghẽn mạng càng cao có thể dẫn đến trì hoãn điểm kiểm duyệt.

Bạn có thể theo dõi các điểm kiểm tra trên hợp đồng giả mạo [ở đây](https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287)

### Tại sao phần thưởng không ngừng giảm sau mỗi điểm kiểm duyệt? {#why-does-reward-keep-getting-decreased-every-checkpoint}

Số phần thưởng thực tế thu được sẽ phụ thuộc vào tổng cung bị khoá thực tế trên mạng lưới tại mỗi điểm kiểm duyệt. Điều này dự kiến sẽ thay đổi đáng kể khi càng nhiều token MATIC bị khoá trong các hợp đồng góp cổ phần.

Ban đầu, phần thưởng sẽ cao hơn và sẽ không ngừng giảm khi % nguồn cung bị khoá tăng lên. Sự thay đổi về nguồn cung bị khoá được ghi lại tại mỗi điểm kiểm duyệt và các phần thưởng được tính toán dựa trên sự thay đổi này.

### Tôi có thể nhận phần thưởng của tôi bằng cách nào? {#how-can-i-claim-my-rewards}

Bạn có thể xác định phần thưởng của mình ngay lập tức bằng cách nhấn vào nút **Trarward**. Thao tác này sẽ chuyển phần thưởng cộng dồn vào tài khoản được ủy quyền của bạn trên Metamask.

<div>
  <img src={useBaseUrl("/img/delegator-faq/withdraw-reward.png")} />
</div>

### Kỳ hạn mở khoá là bao lâu? {#what-is-the-unbonding-period}

Kỳ hạn mở khoá trên Polygon hiện nay là khoảng 9 ngày. Trước đây là 19 ngày. Thời gian này sẽ áp dụng cho số lượng được đại biểu ban đầu và số lượng được đại biểu ban đầu - nó không áp dụng cho bất kỳ phần thưởng nào không được tái định.

### Tôi sẽ tiếp tục nhận phần thưởng sau khi tôi hủy liên kết chứ? {#will-i-keep-receiving-rewards-after-i-unbond}

Không, khi bạn không liên kết, bạn sẽ ngừng nhận được phần thưởng.

### Ủy quyền yêu cầu bao nhiêu giao dịch? {#how-many-transactions-does-the-delegation-require}

Sự hủy hoại cần 2 giao dịch, một sau kia. Một để **xác định** yêu cầu và một yêu cầu khác để **Deposit**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/delegate.png")} />
</div>

### Tái ủy quyền phần thưởng có nghĩa là gì? {#what-does-redelegate-rewards-mean}

Tái xuất phần thưởng của bạn đơn giản là bạn muốn tăng cổ phần bằng cách khôi phục phần thưởng bạn đã tích lũy được.

### Tôi có thể góp cổ phần cho bất kỳ người xác thực nào không? {#can-i-stake-to-any-validator}

Có. Tất cả những người xác thực hiện đều là nút Nền tảng Polygon.

Chúng tôi đang thực hiện triển khai cuốn chiếu mạng lưới chính Polygon. Sau đó, những người xác thực bên ngoài sẽ dần dần được kết nạp. Vui lòng xem thêm chi tiết tại địa chỉ https://blog.matic.network/mainnet-is-going-live-announcing-the-launch-sequence/.

### Trình duyệt nào tương thích với Bảng điều khiển góp cổ phần? {#which-browser-is-compatible-with-staking-dashboard}

Chrome, Firefox và Brave

### Metamask của tôi bị treo khi xác nhận sau khi đăng nhận, tôi phải làm gì? Hoặc không có phản ứng khi tôi cố đăng nhập? {#my-metamask-is-stuck-at-confirming-after-login-what-do-i-do-or-nothing-happens-when-i-try-to-login}

Kiểm tra những vấn đề sau:

- Nếu bạn đang sử dụng Brave, vui lòng tắt tùy chọn để **sử dụng Ví Crypto** trong bảng thiết lập.
- Kiểm tra xem bạn đã đăng nhập vào Metamask hay chưa
- Kiểm tra xem bạn đã đăng nhập vào Metamask bằng Trezor/Ledger hay chưa. Bạn cần bật thêm quyền để gọi các hợp đồng trên thiết bị Ledger của bạn, nếu chưa được bật.
- Kiểm tra dấu thời gian hệ thống của bạn. Nếu thời gian hệ thống không đúng, bạn cần phải chỉnh sửa cho đúng.

### Tôi gửi quỹ từ Binance hoặc các sàn giao dịch khác sang ví Polygon bằng cách nào? {#how-do-i-send-funds-from-binance-or-other-exchanges-to-polygon-wallet}

Về mặt kỹ thuật, giao diện Bộ ví Polygon/Góp cổ phần chỉ là một ứng dụng web. Hiện tại nó hỗ trợ các ví sau - Metamark, WalletConnect, và WalletLink.

Đầu tiên, bạn phải rút tiền khỏi Binance hoặc bất kỳ trao đổi nào khác cho địa chỉ Ethereum trên Metamank. Nếu bạn không biết cách sử dụng Metamask, hãy tìm hiểu một chút trên mạng. Có rất nhiều video và blog cho bạn tìm hiểu.

### Khi nào tôi có thể trở thành một trình xác thực và tôi có thể làm được bao nhiêu vật chứng? {#when-can-i-become-a-validator-and-how-many-tokens-do-i-for-that}

Một người dùng có thể trở thành người xác thực chỉ khi đáp ứng các điều kiện dưới đây:
1. Khi một trình xác thực quyết định tháo gỡ khỏi mạng hoặc
2. Chờ cơ chế đấu giá và thay thế người xác thực không hoạt động.

Cổ phần tối thiểu phụ thuộc vào quy trình đấu giá mà một người dùng trả giá cao hơn người khác.

### Nếu tôi giành được phần thưởng trong khi ủy quyền và nếu tôi thêm các quỹ bổ sung vào cùng nút xác thực thì điều gì sẽ xảy ra? {#if-i-have-earned-rewards-while-delegating-and-if-i-add-additional-funds-to-the-same-validator-node-what-happens}

Nếu bạn chưa tái uỷ quyền các phần thưởng của bạn trước khi ủy quyền các quỹ bổ sung cho cùng nút xác thực, phần thưởng của bạn sẽ được rút tự động.

Trong trường hợp bạn không muốn điều đó xảy ra, hãy tái ủy quyền phần thưởng của bạn trước khi ủy quyền các quỹ bổ sung.

### Tôi đã ủy quyền token của mình qua Metamask trên bảng điều khiển góp cổ phần. Tôi có cần phải duy trì hệ thống hoặc thiết bị của mình không? {#i-have-delegated-my-tokens-via-metamask-on-the-staking-dashboard-do-i-need-to-keep-my-system-or-device-on}

Không. Một khi giao dịch Mất xác thực, bạn có thể thấy những dấu hiệu của bạn được phản chiếu trong **Tổng số Stake** và **Sự cải cách mới**, thì bạn sẽ được thực hiện. Không cần phải duy trì hệ thống hoặc thiết bị của bạn.

### Tôi đã tháo gỡ, sẽ mất bao lâu để Unbond? {#i-have-unbonded-how-long-will-it-take-to-unbond}

Thời gian mở khoá hiện được thiết lập đến 82 điểm kiểm duyệt. Khoảng thời gian này khoảng 9 ngày. Mỗi điểm kiểm duyệt mất khoảng 34 phút. Tuy nhiên, một số điểm kiểm duyệt có thể bị hoãn đến ~1 giờ do nghẽn trên Ethereum.

### Tôi đã tháo và bây giờ tôi thấy nút Stake của Claim nhưng nó bị tắt, tại sao vậy? {#i-have-unbonded-and-i-now-see-the-claim-stake-button-but-it-is-disabled-why-is-that}

Nút Nhận cổ phần sẽ chỉ được kích hoạt khi thời hạn mở khoá của bạn đã hoàn tất. Thời hạn mở khoá hiện được thiết lập tại 82 điểm kiểm duyệt.

### Tôi có được biết khi nào nút Nhận cổ phần sẽ được kích hoạt không? {#do-i-know-when-will-the-claim-stake-button-be-enabled}

Có, bên dưới nút Nhận cổ phần bạn sẽ thấy một ghi chú về số lượng điểm kiểm duyệt đang chờ xử lý trước khi nút Nhận cổ phần sẽ được kích hoạt. Mỗi điểm kiểm duyệt mất khoảng 30 phút để xử lý. Tuy nhiên, một số điểm kiểm duyệt có thể bị hoãn đến ~1 giờ do nghẽn trên Ethereum.

<div>
  <img src={useBaseUrl("/img/delegator-faq/unbond.png")} />
</div>

### Làm cách nào để chuyển ủy quyền của tôi từ Nút nền tảng sang nút bên ngoài? {#how-do-i-switch-my-delegation-from-foundation-nodes-to-external-nodes}

Bạn có thể chuyển đổi Ủy quyền của mình bằng cách sử dụng tùy chọn **Chuyển cổ phần** trên UI góp cổ phần. Thao tác này sẽ chuyển Ủy quyền của bạn từ Nút nền tảng sang bất kỳ nút bên ngoài nào khác mà bạn lựa chọn.

<div align="center">
  <img src={useBaseUrl("/img/delegator-faq/move-stake.png")} width="500" />
</div>

Bạn sẽ xem danh sách của các trình xác thực khác:

<div>
  <img src={useBaseUrl("/img/delegator-faq/validators.png")} />
</div>

### Sẽ có kỳ hạn mở khoá khi tôi chuyển Ủy quyền từ nút Nền tảng sang nút bên ngoài? {#will-there-be-any-ubonding-period-when-i-switch-delegation-from-foundation-nodes-to-external-nodes}

Sẽ không có Kỳ hạn mở khoá khi bạn chuyển Ủy quyền từ nút nền tảng sang nút bên ngoài. Đó sẽ là một chuyển đổi trực tiếp mà không có bất kỳ chậm trễ nào. Tuy nhiên, sẽ có kỳ hạn mở khoá nếu bạn mở khoá từ Nút nền tảng hoặc Nút bên ngoài.

### Có lưu ý cụ thể nào về việc chọn một nút bên ngoài trong khi ủy quyền chuyển đổi không? {#are-they-any-specifics-to-choose-an-external-node-during-switch-delegation}

Không. Bạn có thể chọn bất kỳ nút nào mà bạn chọn.

### Điều gì sẽ xảy ra với phần thưởng tích luỹ của tôi nếu tôi chuyển ủy quyền từ Nút nền tảng sang Nút bên ngoài? {#what-happens-to-my-rewards-that-are-accumalated-if-i-switch-delegation-from-foundation-to-external-node}

Nếu bạn chưa nhận phần thưởng của mình trước khi chuyển ủy quyền, sau khi chuyển thành công ủy quyền của bạn từ Nút nền tảng sang Nút bên ngoài đối với các Phần thưởng được tích luỹ cho đến khi được chuyển lại vào tài khoản của bạn.

### Liệu ủy quyền trên các Nút bên ngoài sẽ hoạt động giống như các Nút nền tảng? {#will-delegation-on-the-external-nodes-work-the-same-as-foundation-nodes}

Phải, nó sẽ hoạt động giống như nút Foundation.

### Tôi sẽ nhận phần thưởng sau khi ủy quyền cho một Nút bên ngoài? {#will-i-still-get-rewards-after-delegating-to-an-external-node}

Đúng vậy, các phần thưởng sẽ được phân phối giống như trước đó với các Nút nền tảng. Mỗi lần gửi thành công điểm kiểm duyệt sẽ tạo ra phần thưởng. Các phần thưởng sẽ được phân phối và tính toán tại mỗi điểm kiểm duyệt theo tỷ lệ cổ phần hiện được áp dụng.

### Sẽ có kỳ hạn mở khoá nếu tôi mở khoá từ một Nút bên ngoài? {#will-there-be-any-unbonding-period-if-i-unbond-from-an-external-node}

Có, kỳ hạn mở khoá sẽ tương tự như hiện tại. 82 Điểm kiểm duyệt.

### Liệu có kỳ hạn khoá sau khi tôi chuyển Ủy quyền của mình từ Nút nền tảng sang Nút bên ngoài? {#will-there-be-any-locking-period-after-i-switch-my-delegation-from-foundation-to-external-node}

Không. Sẽ không có kỳ hạn khoá nào sau khi bạn chuyển ủy quyền của mình.

### Tôi có thể chuyển ủy quyền của mình một phần từ Nút nền tảng sang Nút bên ngoài không? {#can-i-partially-switch-my-delegation-from-foundation-to-external-nodes}

Có, bạn sẽ có tuỳ chọn để chuyển một phần cổ phần của mình từ Nút nền tảng sang nút bên ngoài. Phần cổ phần còn lại sẽ vẫn trên Nút nền tảng. Sau đó bạn có thể chuyển phần đó sang nút khác mà bạn chọn hoặc nút tương tự.

### Tôi có thể chuyển ủy quyền từ một nút bên ngoài sang nút bên ngoài khác không? {#can-i-switch-delegation-from-an-external-node-to-another-external-node}

Không, tuỳ chọn **Chuyển cổ phần** chỉ khả dụng trên các Nút nền tảng. Nếu bạn muốn chuyển ủy quyền của mình từ một nút bên ngoài sang nút bên ngoài khác, bạn trước hết phải mở khoá và sau đó ủy quyền cho nút bên ngoài khác.

### Khi nào Nút nền tảng sẽ được tắt? {#when-will-the-foundations-node-be-turned-off}

Các nút nền tảng sẽ được tắt vào cuối tháng Một, năm 2021.

### Sẽ có bất kỳ Nút nền tảng nào trong tương lai không? {#will-there-be-any-foundation-nodes-in-the-future}

Không, sẽ không có bất kỳ nút nền tảng nào trong tương lai.

### Tôi cần bao nhiêu giao dịch để thanh toán Gas khi tôi thực hiện Chuyển cổ phần? {#how-many-transactions-do-i-need-to-pay-for-gas-when-i-do-a-move-stake}

Chuyển cổ phần chỉ là một giao dịch đơn lẻ. Tất cả các giao dịch sẽ được thực hiện trên Blockchain Ethereum, vì vậy bạn cần chi một chút ETH khi thực hiện giao dịch Chuyển cổ phần.
