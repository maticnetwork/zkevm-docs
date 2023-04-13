---
id: faq
title: Câu hỏi Thường Gặp
description: FAQs liên quan đến Polygon
keywords:
  - docs
  - matic
  - polygon
  - faq
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Thường xuyên được hỏi {#frequently-asked-questions}

## Polygon là gì? {#what-is-polygon}

Polygon là một giải pháp nối với sự phong tỏa của khối công cộng, đặc biệt là Ethereum. Polygon cung cấp khả năng vận hành trong khi đảm bảo một trải nghiệm người dùng cấp trên trong một cách an ninh và kiểm soát. Nó có một triển khai công dụng cho Ethereum trên Kovan Testnet. Polygon dự định hỗ trợ các khối khác trong tương lai sẽ giúp chúng ta cung cấp các tính năng tương tác cùng với khả năng cung cấp sự cân bằng với các mạng blockchain công khai hiện tại.

## Polygon có gì khác so với các phương pháp triển khai Plasma khác? {#how-is-polygon-different-from-other-implementations-of-plasma}

Việc thực hiện Polygon được xây dựng trên các side-li-gen-in đã được xây dựng trên EVM, trong khi các triển khai khác của Plasma chủ yếu sử dụng UTXO để xác định chi tiết. Có các sidelies dựa trên tình trạng cho phép Polygon cung cấp khả năng vận hành cho các hợp đồng thông minh chung cũng vậy.

Thứ hai, Polygon sử dụng một lớp kiểm tra công cộng mà pubtres các điểm kiểm tra sau khi tương tác kỳ hạn (không giống các điểm kiểm tra sau mỗi khối trong Plasma) cho phép các sides hoạt động ở tốc độ cao trong khi xuất các điểm kiểm tra trong các vải. Các kiểm tra này cùng với các chứng cứ gian lận đảm bảo rằng sidelies của Polygon hoạt động theo cách an toàn.

## Dự án của bạn cung cấp khả năng mở rộng cho Ethereum bằng cách sử dụng chuỗi plasma, vậy bản thân nó là một giao thức hay một blockchain gốc? {#your-project-provides-scalability-for-ethereum-using-plasma-chains-is-it-a-protocol-or-a-native-blockchain-in-itself}

Mạng Polygon là một giải pháp **"sidechain"** nơi Ethereum có tài sản chuỗi chính, tức là tất cả các dApps / Biểu thức của chuỗi chính có thể được chuyển / di chuyển đến Polygon sidechain(s) và khi cần, một người có thể rút tài sản trở lại chuỗi chính.

## Lợi thế cạnh tranh của Polygon trên các đối thủ cạnh tranh là gì? {#what-are-the-competitive-advantages-of-polygon-over-its-competitors}

### Các giải pháp mở rộng L2 {#l2-scaling-solutions}

Polygon cam kết đạt được quy mô với sự phi tập trung hóa. Polygon sử dụng các điểm kiểm duyệt định kỳ và bằng chứng gian lận. Khi người dùng muốn rút tài sản của họ, họ sử dụng các điểm kiểm tra để chứng minh tài sản của họ trên sidecha, trong khi các chứng cứ gian lận cần thiết để thách thức gian lận hoặc bất kỳ hành vi xấu nào và những người đóng băng

Các dự án khác cũng cung cấp giải pháp scations L2 nhưng có hai phần tử then chốt mà chúng ta có thể khác nhau:

1. Đầu tiên, Polygon đang tập trung vào không chỉ vào giao dịch tài chính mà còn là trò chơi và các ứng dụng tiện ích khác. Chúng tôi cũng có kế hoạch cho các dịch vụ tài chính đầy đủ như cho vay / trao đổi dApps (trao đổi hoán đổi, giao dịch margin và nhiều hơn).

2. Thứ hai, trong khi Polygon sử dụng các điểm kiểm tra cho khối số 1-2 (với lớp PoS), nhiều giải pháp khác có thể có khối số lần lớn hơn khối Ethereum khi bạn cần đẩy mọi khối của struớc vào chuỗi chính.

### Các giải pháp mở rộng L1 {#l1-scaling-solutions}

Ngoài ra, trong số các dự án định dạng khác, Polygon đứng ngoài việc có khả năng đạt được quy mô trong khi duy trì một mức độ thoái hóa lớn

Quan trọng hơn, các dự án khả năng này có một vấn đề "tái tạo bánh". Chúng đang tạo ra blockchains mới nơi cộng đồng phát triển, hệ sinh thái sản phẩm, tài liệu kỹ thuật, và các doanh nghiệp cần được xây dựng từ **"gước."** Polygon, mặt khác, là một chuỗi có khả năng EVM và có tất cả các dApps / tài sản được xây dựng trên dây chuyền chính Ethereum với khả năng vận hành có thể có mặt tại sự nhắp của một nút.

### Thanh toán {#payments}

Chúng tôi tin rằng Polygon có một lợi thế trong điều kiện sử dụng bởi vì, trong các giải pháp khác, cả người gửi và người nhận đều phải tạo các kênh thanh toán của họ. Điều này rất rườm rà cho người dùng. Trong khi công nghệ cơ bản của Polygon thì không yêu cầu về kênh thanh toán đối với người dùng và họ chỉ cần có địa chỉ Ethereum hợp lệ để nhận token. Điều này cũng phù hợp với tầm nhìn dài hạn của chúng tôi về việc cải thiện trải nghiệm người dùng cho các ứng dụng phi tập trung.

### Giao dịch và Tài chính {#trading-and-finance}

Polygon dự định sẽ kích hoạt các giao thức tài chính của DEX (ví dụ), hồ sơ Liquidity (ví dụ) và các giao thức tài chính khác như Giao thức Luring Protototocolate (Dharma Protocolate) trên nền tảng của nó, sẽ cho phép người dùng Polygon truy cập vào các ứng dụng hàng loạt tài chính như DEX, cho vay Apps, LPs và nhiều người khác.

## Polygon so sánh bằng cách nào với các giải pháp sidechain khác? {#how-does-polygon-compare-with-other-sidechain-solutions}

Trên Polygon, tất cả các giao dịch phụ đều được bảo mật bởi nhiều cơ chế trên sidechain cũng như chuỗi chính. Trên sidechain, bất kỳ giao dịch nào được thực hiện bởi lớp sản xuất Block đã được xác thực và kiểm tra vào chuỗi chính bởi một lớp kiểm tra đã phát triển cao.

Nếu bất kỳ giao dịch gian lận nào xảy ra trên sidechain, nó có thể được phát hiện và xử lý bởi tầng checktrin. Ngay cả trong tình huống cực kỳ không chắc chắn trong đó lớp sản xuất khối cũng như lớp kiểm tra cả hai va chạm, thậm chí sau đó chuỗi chính có chứng minh gian lận trên mà bất kỳ ai từ công chúng có thể đến và thách thức bất kỳ giao dịch nào mà họ xác định được gian lận ở bên.

Nếu thử thách thành công, sẽ có sự bất chấp kinh tế và hình phạt tài chính lớn đối với các bên liên kết khi sự cố của chúng đã được cắt. Ngoài ra, người thách thức công chúng được thưởng bằng những khoản tiền cá nhân bị cắt giảm của các diễn viên side-tulate.

Điều này khiến Polygon trở thành mạng lưới sidechain được ưu đãi kinh tế mà có mức độ phân phối cao và an ninh của các giao dịch sidechain

Ngoài ra khả năng và TPS của Polygon sideliches còn cao hơn nhiều so với các giải pháp khác. Đặc biệt khi Polygon có thể có hàng ngàn giao dịch trong khi những giao dịch khác là một phụ số có giới hạn cao hơn của vài ngàn giao dịch.

## Nguyên tắc nào sẽ được bổ sung? Liệu có yêu cầu đặc biệt nào cho các phụ thuộc địa phương của công ty tư nhân không? {#via-what-principles-will-new-sidechains-be-added-will-there-be-any-special-requirements-for-private-companies-local-sidechains}

Liên quan đến các kênh trạng thái, Plasma đại diện một giải pháp thay thế vượt trội cho các bộ khung mở rộng, chủ yếu là nhờ các bảo đảm bảo mật được cung cấp bởi bộ khung - về cơ bản khẳng định rằng người dùng sẽ không bao giờ mất tiền trong bất kỳ trường hợp nào. Chắc chắn, có thể có sự chậm trễ trong việc nhận lại tiền, nhưng một người vận hành Plasma Byzantine không thể tự tạo ra tiền hoặc chi tiêu gấp đôi cho một giao dịch.

Polygon sẽ nỗ lực trở thành một cơ sở hạ tầng blockchain hoàn toàn mở và công khai trong tương lai, nơi mà việc thưởng/phạt về mặt kinh tế sẽ là yếu tố chủ yếu thúc đẩy sự an toàn và ổn định của hệ thống. Vì vậy, bất kỳ ai cũng có thể gia nhập hệ thống và tham gia vào sự đồng thuận. Tuy nhiên, trong giai đoạn seeding mạng ban đầu Polygon sẽ phải đóng một vai trò lớn hơn để hiệu quả sidecannel.

Ngoài ra, sidelich Polygon sẽ chủ yếu là sidekich sidekich cộng cộng đồng có sẵn cho bất kỳ ai sử dụng giống như chuỗi blocker công cộng khác. Tuy nhiên, chuỗi Polygon Enterprise sẽ có ý định cung cấp các loại phụ dành cho các tổ chức đặc biệt. Sự bảo mật và sự kiểm soát của các chuỗi như vậy sẽ vẫn được giữ nguyên nguyên bằng cách sử dụng lớp checktrink và chứng minh gian lận trên chuỗi chính.

## Liệu các sidechains cũng sẽ được đồng bộ với chuỗi chính (Ethereum)? {#will-sidechains-also-be-synced-with-the-main-chain-ethereum}

Chắc chắn rồi. Lớp kiểm tra công khai sẽ xác thực tất cả các giao dịch đang diễn ra trên các sidechain và công bố các chứng cứ cho chuỗi chính. Để đảm bảo an ninh sự ngu ngốc của các giao dịch sidechain, hợp đồng Plasma chính chứa nhiều loại chứng khoán mạo hiểm nơi bất kỳ giao dịch sidechain nào có thể bị thách thức cho bất kỳ hoạt động giả mạo. Nếu một người thách thức thành công, sự cố của các diễn viên sidechain liên quan đến sự gian lận đã được cắt giảm và được chuyển cho người thách thức. Điều này tương đương với một khoản thưởng của lỗi đã bao giờ chạy được. Một sơ đồ tốt cho sự hiểu biết như dưới đây.

![Screenshot](/img/matic/Architecture.png)

## Ở cuối Sách Trắng, có một danh sách "Các Trường hợp Sử dụng Tiềm năng" - tất cả các trường hợp đó sẽ được triển khai chứ? Theo thứ tự như thế nào? {#at-the-end-of-the-white-paper-there-is-a-list-of-potential-use-cases-will-all-of-that-be-implemented-in-what-order}

logic cơ bản là: nếu có một Giao thức dApp / Giao thức đang hoạt động trên Ethereum, nhưng được giới hạn bởi giao dịch thấp, thông qua giao dịch và phí giao dịch cao - thì chúng ta sẽ có thể thêm sự hỗ trợ cho các Giao thức dApps / Giao thức này trên mạng Polygon.

## Tại sao phương pháp triển khai plasma của Polygon lại khó nhân rộng? {#why-will-it-be-difficult-to-replicate-polygon-s-plasma-implementation}

Mặc dù nó còn nhiều hơn về hiệu ứng mạng theo điều kiện mạng mà mạng có thể có quy mô / phát triển hệ sinh thái tốt hơn so với người khác, các giải pháp blockchain phải được mở bởi vì chúng liên quan đến các tài sản thực tế được sử dụng.

Đây là trường hợp với tất cả các dự án nguồn mở. Yêu cầu này được áp dụng đồng đều cho chúng tôi cũng như các triển khai đối thủ khác vì chúng tôi sắp được cấp giấy phép GPL bắt buộc bất kỳ ai sử dụng triển khai của chúng tôi đều phải chuyển mã nguồn của họ thành mã nguồn mở. Nhưng một lần nữa, điểm là việc sao chép mã sẽ có thể áp dụng ngay cả với Bitcoin, Ethereum và bất kỳ dự án nào khác, nó sẽ trở nên nhiều hơn về hiệu ứng mạng mà một dự án có thể đạt được.

## Phương pháp triển khai Plasma của Mạng Polygon có gì đặc biệt? {#what-s-special-about-polygon-network-s-plasma-implementation}

Polygon Plasma sử dụng một hệ thống mô hình dựa trên tài khoản thay vì hệ thống UTXO. Điều này cung cấp cho chúng ta một lợi thế lớn khi sử dụng EVM trên chuỗi Polygon giúp chúng ta sử dụng toàn bộ hệ sinh thái Ethereum, công cụ phát triển, thư viện tích hợp, v.v. cho mạng Polygon.

Mạng Polygon có thể được sử dụng bởi dApps mà không cần bất kỳ thay đổi nào cho ERC20 của họ. Hơn nữa, lớp checktraink của chúng ta cho phép chúng ta được lệnh của magitude nhanh hơn các triển khai Plasma khác bởi vì chúng ta đã tạo ra các bằng chứng của các khối trong các khối trong các trạm checkpoint, trong khi các công cụ Plasma khác phải gửi bằng chứng cho chuỗi chính.

## Bạn sẽ giải quyết các vấn đề về sự tập trung hóa thế nào? {#how-are-you-going-to-solve-the-issues-with-centralization}

Dưới đây là sơ đồ để cung cấp cho bạn thêm ngữ cảnh:

![Screenshot](/img/matic/Merkle.png)

Vì vậy, trước tiên, các nút PoA sẽ là Delegates (bằng chứng của Solvency i. họ phải gửi một lượng tiền cọc cao) và KYC cơ bản được chọn bởi lớp PoS giống như một dạng EOS đã xác định bằng chứng minh bằng chứng về Stake (PoS) hoặc Byzantine Faudistance (Bđno).

Thứ hai, hãy giả sử tất cả các Delegates (hoặc 2/3 trong số đó) sẽ biến các diễn viên xấu và tạo ra khối bị lỗi, sau đó bạn có lớp PoS sẽ xác thực tất cả các khối và nếu bất kỳ sự gian lận nào đã thực hiện, số lượng lớn của Delegates sẽ được thực hiện, số lượng kiểm tra sẽ được ngăn chặn cho các hành động chính đáng.

Thứ ba, hãy cho biết ngay cả lớp PoS Staker (sẽ là một số lượng lớn nút) cũng thay đổi xấu và va chạm để tạo ra các điểm kiểm tra sai lầm. e rằng tất cả PoA đều bị thối nát và PoS đều bị hỏng. Ngay cả khi đó, sau triết lý Plasma, chúng ta đang viết một trong những sự tham lam của sự cân bằng sọc vỏ, **bằng chứng gian lận** được xem bởi nhiều dự án lớn (người canh gác có thể được xem là người giám sát trên GitHub). Cơ chế chứng minh gian lận này giúp bất kỳ ai công khai thách thức bất kỳ giao dịch nào trên chuỗi chính, Ethereum.

## Tại sao cần có Token Matic? {#why-is-matic-token-required}

Các lý do sau đây củng cố nhu cầu của việc có MATIC để thực hiện:

### Polygon dự định là một giải pháp về mục đích chung cho các khối công cộng {#polygon-intends-to-be-a-general-purpose-scaling-solution-for-public-blockchains}

Chúng ta đang bắt đầu từ Ethereum như là baschain đầu tiên, nhưng trong tương lai Polygon có thể được triển khai trên nhiều cối. Sẽ sớm có các chuỗi cơ sở khác được thêm vào. Vì vậy, sẽ không hợp lý nếu chỉ có một loại tiền tệ (ether) được sử dụng để thanh toán phí trên các chuỗi bên. Nếu có mối quan tâm hiện hữu trên bất kỳ tương lai nào về các căn cứ, có đồng tiền của căn cứ đó như là tài sản bản xứ cho Polygon sẽ làm tê liệt mạng lưới đang quay. Do đó, điều quan trọng là phải xây dựng hệ sinh thái Người góp cổ phần trên token mạng riêng của Polygon.

### Mô hình bảo mật Appcoin {#appcoin-security-model}

Polygon dự định cho phép các Dapp thanh toán phí Polygon bằng đồng tiền của Dapp đó, bằng cách trừu tượng hóa cơ chế hoán đổi token bằng cách sử dụng nhóm thanh khoản như Kyber. Người dùng đơn giản sử dụng dApp-coins của mình để trả chi phí, trong lý lịch thì dApp-coin được trao đổi cho MATIC Tokens. Do đó, các nhà phát triển DApp muốn cung cấp trải nghiệm người dùng liền mạch sẽ giúp duy trì nhóm thanh khoản Polygon.

### Thiết lập mạng trong các giai đoạn mũi {#seeding-the-network-in-nascent-stages}

Thực tế là không thể gieo mầm hệ thống khi có quá ít hoặc không có txn trong mạng vào lúc bắt đầu, vì chúng tôi không thể phân phối Eth cho lớp Người xác thực phi tập trung cao và các nhà sản xuất khối. Trong khi với token Matic, chúng tôi đã cung cấp một tỷ lệ lớn các token được phân phối cho nhà sản xuất khối gieo mầm, cổ phần người tạo điểm kiểm duyệt và sau đó đưa ra phần thưởng khối. Việc cung cấp này đảm bảo rằng những người góp vốn sẽ nhận được phần thưởng ngay cả khi mạng mất một thời gian để có được hiệu ứng mạng. Đây cũng giống như lý do tại sao phần thưởng Khai thác Khối được giữ cho Bitcoin, người góp cổ phần và nhà sản xuất khối có thể được trao thưởng theo cách này để giữ an toàn cho mạng.

Nếu quan ngại của bạn là về các nhà phát triển, thì một trong những trụ cột trong chiến lược của chúng tôi là đặt rào cản gia nhập đối với các nhà phát triển ở mức rất thấp. Chúng tôi đã đảm bảo rằng tất cả các công cụ dành cho nhà phát triển Ethereum đều hoạt động tốt trên Polygon. Về các dấu hiệu cần thiết cho phí trả trên tnet, nó không khác biệt cho một nhà phát triển trên Ethereum. dev được nhận các dấu hiệu miễn phí cho testnet từ một Polygon faucet, giống như nó trên Ethereum. Bạn cần có dấu MATIC chỉ khi bạn muốn triển khai trên Polygon Mainnet, nơi chi phí gas thấp hơn nhiều so với Ethereum, khoảng 1/100% của phí giao dịch bạn sẽ trả trên Ethereum.

## Điều gì thúc đẩy việc sử dụng và nhu cầu đối với token Matic? {#what-drives-the-use-and-demand-for-matic-tokens}

Có hai cách sử dụng chính đối với token này:

1. Vật chứng được sử dụng để trả phí giao dịch trong mạng lưới.
2. Vật chứng được sử dụng để tham gia vào cơ chế đồng thuận Chứng khoán dành cho việc kiểm tra lớp và khối sản xuất.

### Một số lý do thứ hai cho nhu cầu vật dụng {#some-of-the-secondary-reasons-for-token-demand}

* Mạng Polygon dự định cho phép các Dapp thanh toán phí Polygon bằng đồng tiền của Dapp đó, bằng cách trừu tượng hóa cơ chế hoán đổi token bằng cách sử dụng nhóm thanh khoản như Kyber. Người dùng đơn giản sử dụng dApp-coins của mình để trả chi phí, trong lý lịch thì dApp-coin được trao đổi cho MATIC Tokens. Do đó, các nhà phát triển DApp muốn cung cấp trải nghiệm người dùng liền mạch sẽ giúp duy trì nhóm thanh khoản Polygon.

* Để kích hoạt các lối thoát nhanh hơn chúng ta đang thực hiện một cơ chế cho vay bằng giao thức Dharma trong đó một người ngầm / cho vay có thể nhận được sự ra và hủy số lượng thoát ra với một khoản phí nhỏ như lãi suất. Người cho vay sau đó sẽ nhận các token sau một tuần bằng cách sử dụng token thoát. Do đó, người dùng gần như có thể rút tiền ngay lập tức trong khi người cho vay có thể kiếm được lãi suất cho dịch vụ mà họ cung cấp.

### Giao thức mức đốt token {#protocol-level-burning-of-tokens}

Chúng tôi dự định đốt một phần trăm số phí giao dịch trong mỗi khối. Điều này làm cho các dấu hiệu biến đổi theo tự nhiên và cung cấp nó với sự hỗ trợ liên tục trong điều kiện giá trị của nó ở cấp giao thức.

### Rào cản gia nhập thấp (và do đó cơ hội được tiếp nhận nhanh chóng cao hơn) {#low-entry-barrier-and-hence-higher-chances-of-quick-adoption}

Chúng tôi sẽ chủ yếu phụ thuộc vào DApp để được người dùng cuối tiếp nhận. Một trong những tính năng then chốt là chúng ta duy trì một kiến trúc hoàn toàn tương thích với hệ sinh thái phát triển Ethereum i.e tất cả các hợp đồng thông minh, ví dụ, công cụ IDEs, etc Devops được tương thích trực tiếp với Polygon.

Bất kỳ Dapp Ethereum nào cũng có thể được chuyển sang Polygon mà hầu như không có thay đổi đáng kể nào. Vì vậy các rào cản nhập cho nhà phát triển Ethereum đã có được chuyển sang Polygon là điều đáng kể mà có thể bắt đầu nhận nuôi dApp virus. Điều này có khả năng mang lại rất nhiều nhu cầu hữu cơ do các hiệu quả mạng xây dựng trên mạng Polygon.

## Token có phải loại ERC20 không? {#is-token-type-erc20}

Có. Và cùng một dấu hiệu sẽ được sử dụng cho Polygon Chain quá khứ, không cần chuyển đến một dấu hiệu bản xứ trong tương lai.

## TPS dự kiến mà bạn sẽ có thể mang lại cho mạng Ethereum là gì? Bạn hiện đang chạy gì trên mạng thử nghiệm? {#what-is-the-expected-tps-you-ll-be-able-to-bring-to-the-ethereum-network-what-are-you-running-at-now-on-testnet}

Một sidechain đơn lẻ có công suất 7000+ giao dịch trên giây. Polygon có khả năng thêm nhiều sidecannel, nhưng hiện tại, sự chú ý của chúng ta sẽ ổn định mạng với một side.
