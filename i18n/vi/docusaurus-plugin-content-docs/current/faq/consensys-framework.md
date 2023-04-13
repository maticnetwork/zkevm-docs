---
id: consensys-framework
title: Phóng đại công việc Framework FAQ
sidebar_label: Scaling Framework FAQ
description: Xây dựng ứng dụng blockchain tiếp theo của bạn trên Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Khung này có nguồn gốc từ [câu hỏi Bốn câu hỏi của Consensys để phán xét bất kỳ giải pháp nào](https://consensys.net/?p=19015&preview=true&_thumbnail_id=19017)

## Ai là Người vận hành Khung này? {#who-operates-it}
Các nút thợ đào trên mạng chính Ethereum di chuyển hoặc "vận hành" mạng về phía trước bằng cách giải Bằng chứng công việc và tạo ra các khối mới. Giải pháp L2 đòi hỏi một vai trò "người vận hành" tương tự trên mạng của nó, tương đương với thợ đào trên mạng chính Ethereum, những người có thể di chuyển mạng L2 về phía trước. Tuy nhiên, có một số khác biệt. Ví dụ: cùng với việc xử lý và ủy quyền các giao dịch như một thợ đào, người vận hành L2 cũng có thể tạo điều kiện cho người dùng vào và ra khỏi chính lớp L2.

### - Ai hoặc yêu cầu để vận hành mạng Bằng chứng cổ phần Polygon là gì? {#who-or-what-is-required-to-operate-the-polygon-proof-of-stake-network}

Chuỗi cam kết Polygon PoS dựa trên một tập hợp người xác thực để bảo mật mạng. Vai trò của người xác thực là chạy một nút đầy đủ; sản xuất khối, xác thực và tham gia đồng thuận và cam kết các điểm kiểm duyệt trên chuỗi chính Ethereum. Để trở thành người xác thực, một người cần góp cổ phần token MATIC của họ với các hợp đồng quản lý góp cổ phần nằm trên chuỗi chính Ethereum.

Để biết thêm chi tiết, vui lòng tham khảo phần [của người xác thực](/maintain/validate/getting-started.md).

### - Làm thế nào để họ trở thành người vận hành trong mạng Polygon PoS? Họ tuân thủ những quy tắc nào? {#how-do-they-become-operators-in-the-polygon-pos-network-what-rules-do-they-abide-by}

Để trở thành người xác thực, một người cần góp cổ phần token MATIC của họ với các
hợp đồng quản lý góp cổ phần nằm trên chuỗi chính Ethereum.

Phần thưởng được phân phối cho tất cả những người góp cổ phần tỷ lệ với số cổ phần của họ tại mọi điểm kiểm duyệt với ngoại lệ là người đề xuất nhận được thêm tiền thưởng. Số dư phần thưởng của người dùng được cập nhật trong hợp đồng được đề cập đến trong khi
nhận phần thưởng.

Cổ phần có nguy cơ bị cắt giảm trong trường hợp nút người xác thực thực hiện một
hành động độc hại như ký hai lần, thời gian ngừng hoạt động của người xác thực cũng ảnh hưởng đến
những người ủy quyền được liên kết tại điểm kiểm duyệt đó.

Để biết thêm chi tiết vui lòng tham khảo thêm [Dòng chảy End-đến một Polygon xác thực](/maintain/polygon-basics/who-is-validator.md#end-to-end-flow-for-a-polygon-validator) và [Trách nhiệm của một người xác thực](/maintain/validate/validator-responsibilities.md).


### - Người dùng Polygon PoS phải đưa ra những giả định tin cậy nào về người vận hành? {#what-trust-assumptions-must-the-polygon-pos-users-make-about-the-operator}

Chuỗi cam kết Polygon PoS dựa trên một tập hợp người xác thực để bảo mật mạng. Vai trò của người xác thực là chạy một nút đầy đủ; sản xuất khối, xác thực và tham gia đồng thuận và cam kết các điểm kiểm duyệt trên chuỗi chính. Để trở thành người xác thực, một người cần góp cổ phần token MATIC của họ với các hợp đồng quản lý góp cổ phần nằm trên chuỗi chính.
Miễn là ⅔ cổ phần có trọng số của những người xác thực là trung thực, chuỗi sẽ tiến triển một cách chính xác.

### - Người vận hành có trách nhiệm gì? Họ có những quyền gì? {#what-are-the-operators-responsible-for-what-power-do-they-have}

Vai trò của người xác thực là chạy một nút đầy đủ; sản xuất khối, xác thực và tham gia đồng thuận và cam kết các điểm kiểm duyệt trên chuỗi chính.

Người xác thực có quyền dừng tiến trình của chuỗi, sắp xếp lại các khối, v.v. giả sử ⅔ người xác thực cổ phần có trọng số không trung thực. Họ không có quyền thay đổi trạng thái, số dư tài sản của người dùng, v.v.

### - Động lực để trở thành người vận hành của Polygon PoS là gì? {#what-are-the-motivations-to-become-an-operator-of-the-polygon-pos}

Người xác thực góp cổ phần token MATIC của họ làm tài sản thế chấp để hoạt động nhằm duy trì bảo mật mạng và kiếm được phần thưởng đổi lấy dịch vụ họ cung cấp.

Vui lòng tham khảo ý kiến [là gì để](/maintain/validator/rewards.md#what-is-the-incentive) biết thêm chi tiết.

## Dữ liệu thì như thế nào? {#how-s-the-data}
Theo định nghĩa, công nghệ Lớp 2 phải tạo các điểm kiểm duyệt dữ liệu gia tăng trên Lớp 1 (mạng chính Ethereum). Do đó, mối quan tâm của chúng tôi là thời gian xen kẽ giữa các lần đăng ký Lớp 1 định kỳ đó. Cụ thể, dữ liệu Lớp 2 được tạo, lưu trữ và quản lý như thế nào khi không nhận được sự bảo mật của Lớp 1? Chúng tôi lo ngại nhất về điều này vì đó là khi người dùng đang không nhận được sự bảo mật không cần tin cậy của một mạng chính công khai ở mức cao nhất.

### - Điều kiện khóa cho Polygon PoS là gì? {#what-are-the-lock-up-conditions-for-polygon-pos}

Trong hầu hết các mẫu thiết kế token, token được đúc trên Ethereum và có thể được gửi đến Polygon PoS. Để di chuyển một token như vậy từ Ethereum sang Polygon PoS, người dùng cần khóa tiền trong một hợp đồng trên Ethereum và các token tương ứng sau đó được đúc trên Polygon PoS.

Cơ chế chuyển tiếp cầu nối này được chạy bởi những người xác thực Polygon PoS, những người cần có số lượng đồng ý ⅔ về sự kiện token bị khóa trên Ethereum để đúc số lượng token tương ứng trên Polygon PoS.

Rút tài sản trở lại Ethereum là quy trình gồm 2 bước, trong đó token tài sản trước tiên phải được đốt trên chuỗi cam kết Polygon PoS và sau đó bằng chứng về giao dịch đốt này phải được gửi trên chuỗi Ethereum.


Để biết thêm chi tiết, tham khảo ý kiến [về Steps để sử dụng cây cầu PoS](/develop/ethereum-polygon/pos/getting-started.md#steps-to-use-the-pos-bridge).

### - Bao lâu thì những khoản tiền này xuất hiện trên Polygon PoS? {#how-soon-are-those-funds-available-on-the-polygon-pos}

Khoảng ~22-30 phút. Điều này được thực hiện thông qua một cơ chế thông điệp được gọi là `state sync`. Có thể tìm thấy thêm chi tiết [ở đây](/pos/state-sync/state-sync-mechamism.md).

Polygon PoS có cung cấp sự hỗ trợ cho người dùng vào mà không có khóa L1 (tức là trong trường hợp đưa người dùng trực tiếp vào Polygon, sau đó người dùng muốn thoát sang mạng chính Ethereum)?

Có một cơ chế cầu nối đặc biệt được sử dụng để thực hiện điều này. Khi người dùng muốn thoát sang Ethereum, thay vì phương pháp thông thường để mở khóa token từ một hợp đồng đặc biệt, token sẽ được đúc.

Bạn có thể đọc về chúng [ở đây](/develop/ethereum-polygon/mintable-assets.md).

### - Người dùng sẽ tranh chấp giao dịch Polygon PoS không hợp lệ như thế nào? Chứng minh giao dịch Polygon PoS hợp lệ? {#how-would-a-user-dispute-an-invalid-polygon-pos-transaction-prove-a-valid-polygon-pos-transaction}

Hiện tại không có cách nào trên chuỗi để tranh chấp giao dịch Polygon PoS không hợp lệ. Tuy nhiên, các trình xác thực của chuỗi Polygon PoS sẽ gửi các điểm kiểm tra định kỳ cho Ethereum - bạn có thể xem thêm chi tiết [ở đây](/pos/heimdall/modules/checkpoint.md). Có thể xác thực một giao dịch trên chuỗi Polygon PoS trên Ethereum bằng cách xây dựng một bằng chứng chứng gốc Merkle và xác thực nó với các kiểm tra định kỳ xảy ra trên Ethereum của giao dịch Polygon PoS và nhận gốc cây Merkle.

### - Một khi người dùng Polygon mong muốn được ra ngoài, quỹ lớp 1 sẽ sớm được khóa (cộng hoặc trừ bất kỳ lợi nhuận nào hoặc mất mát nào trên L1) có thể được trả lại trên L1? {#once-a-polygon-user-wishes-to-exit-how-soon-are-the-locked-up-layer-1-fund-plus-or-minus-any-l2-gains-or-losses-available-back-on-l1}

Khoảng ~1-3 tiếng đồng hồ phụ thuộc vào tần số của các [điểm kiểm soát](/pos/heimdall/modules/checkpoint.md). Tần suất chủ yếu là một hàm của chi phí mà người xác thực sẵn sàng chi cho phí gas ETH để gửi các điểm kiểm duyệt.

### - Bạn có dự đoán rằng sẽ có các Nhà cung cấp Thanh khoản trên Lớp 1 sẵn sàng cung cấp ngay lập tức các khoản quỹ L1 có thể quy đổi cho người dùng Polygon PoS hiện có không? {#do-you-anticipate-there-being-liquidity-providers-on-layer-1-willing-to-provide-immediately-redeemable-l1-funds-to-existing-polygon-pos-users}

Có một số người chơi như [Conkế và](https://connext.network/) [Bicomoney](https://biconomy.io/) là hoặc sẽ cung cấp dịch vụ này. Có rất nhiều bên tham gia khác cũng sẽ sớm đưa dịch vụ đi vào hoạt động.

## Ngăn xếp thì thế nào? {#how-s-the-stack}
Việc so sánh ngăn xếp rất quan trọng trong việc làm nổi bật những gì Lớp 2 có hoặc không thay đổi so với mạng chính Ethereum.

### - Ngăn xếp Polygon PoS chia sẻ bao nhiêu với ngăn xếp mạng chính Ethereum? {#how-much-does-the-polygon-pos-stack-share-with-the-ethereum-mainnet-stack}

Nếu bạn là Nhà phát triển Ethereum, bạn cũng đã là Nhà phát triển Polygon PoS. Tất cả các công cụ bạn quen thuộc đều được hỗ trợ sẵn trên Polygon PoS: Truffle, Remix, Web3js và rất nhiều công cụ khác.

So với Ethereum, không có thay đổi lớn nào trong giao diện EVM cho Polygon PoS.

### -  Polygon PoS khác với ngăn xếp mạng chính Ethereum ở điểm nào và điều đó mang lại những rủi ro / phần thưởng nào? {#where-does-the-polygon-pos-differ-from-ethereum-mainnet-stack-and-what-risks-rewards-does-that-introduce}

Không có thay đổi gì lớn.

## Chuẩn bị cho Điều tồi tệ nhất {#preparing-for-the-worst}
Hệ thống Polygon PoS chuẩn bị như thế nào cho:

### -  Tình trạng người dùng thoát hàng loạt? {#a-mass-exit-of-users}

Miễn là ⅔ người xác thực trung thực, tiền trên chuỗi sẽ được an toàn. Trong trường hợp giả định này không hợp lệ, trong tình huống như vậy, chuỗi có thể dừng hoặc việc sắp xếp lại có thể xảy ra. Cần có sự đồng thuận xã hội để khởi động lại chuỗi từ trạng thái trước đó - bao gồm ảnh chụp nhanh trạng thái Polygon PoS được gửi qua các điểm kiểm duyệt có thể được sử dụng để thực hiện điều này.

### - Những người tham gia Polygon tìm cách đánh lừa cơ chế đồng thuận Polygon. Bằng cách hình thành một nhóm câu kết chẳng hạn? {#polygon-participants-attempting-to-game-the-polygon-consensus-for-example-by-forming-a-cartel}

Cần có sự đồng thuận xã hội để khởi động lại chuỗi từ trạng thái trước đó bằng cách loại bỏ những người xác thực đó và khởi động lại với một tập hợp người xác thực mới - bao gồm ảnh chụp nhanh trạng thái Polygon PoS được gửi qua các điểm kiểm duyệt có thể được sử dụng để thực hiện điều này.


### - Một lỗi hoặc khai thác lỗ hổng được phát hiện trong một phần quan trọng của hệ thống? {#a-bug-or-exploit-discovered-in-a-critical-part-of-its-system}

Chúng tôi đã thận trọng sử dụng lại các thành phần đã được thử nghiệm thực địa trong bản dựng hệ thống. Tuy nhiên, nếu có lỗi hoặc khai thác lỗ hổng trong một phần quan trọng của hệ thống, giải pháp chính sẽ là khôi phục chuỗi về trạng thái trước đó thông qua đồng thuận xã hội.
