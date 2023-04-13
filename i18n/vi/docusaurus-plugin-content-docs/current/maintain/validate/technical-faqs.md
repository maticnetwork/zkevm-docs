---
id: technical-faqs
title: Câu hỏi Thường Gặp về Kỹ thuật
description: Thường xuyên đặt câu hỏi liên quan đến việc chạy một Validator trên mạng Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - faqs
  - technical
slug: technical-faqs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### 1. Các khóa riêng tư có giống kho khoá Heimdal và Bor không? {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}

Có, khóa riêng tư dùng để tạo khoá xác thực và Kho khoá Bor giống nhau. Khóa riêng tư dùng trong ví dụ này là địa chỉ ETH ví của bạn nơi mà Polygon của bạn token mạng thử nghiệm được lưu trữ.

### 2. Danh sách các lệnh thường thấy {#2-list-of-common-commands}

Hiện chúng tôi có một danh sách dễ dàng sử dụng cho bạn đối với các gói Linux. Chúng tôi sẽ cập nhật danh sách này thường xuyên để tiện lợi hơn.

**Đối với các gói Linux**

#### A. Nơi để tìm tệp gốc heimdall {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### B. Nơi để tìm heimdall-config.toml {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. Nơi để tìm config.toml {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. Nơi để tìm heimdall-seeds.txt {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. Khởi động Heimdall {#e-start-heimdall}

`$ sudo service heimdalld start`

#### F. Khởi động máy chủ rest Heimdall {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### G. Khởi động máy chủ cầu nối Heimdall {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. Nhật ký Heimdall {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. Nơi để tìm tệp gốc Bor {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### J. Khởi động Bor {#j-start-bor}

`sudo service bor start`

#### K. Kiểm tra nhật ký heimdall {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. Kiểm tra máy chủ rest Heimdall {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. Kiểm tra nhật ký cầu nối Heimdall {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. Kiểm tra nhật ký bor {#n-check-bor-logs}

`tail -f bor.log`

#### O. Tắt quy trình Bor {#o-kill-bor-process}

**Đối với linux**:

1. `ps -aux | grep bor`. Lấy PID cho Bor và chạy lệnh sau.
2. `sudo kill -9 PID`

**Đối với Nhị phân**:

Đi đến `CS-2003/bor` và sau đó chạy, `bash stop.sh`

### 3. Lỗi: Failed to unlock account (0x...) No key for given address or file {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

Lỗi này xảy ra do đường dẫn cho tệp password.txt không chính xác. Bạn có thể làm theo các bước dưới đây để khắc phục lỗi này:

Lỗi này xảy ra do đường dẫn cho tệp password.txt và Kho khóa không chính xác. Bạn có thể làm theo các bước dưới đây để khắc phục lỗi này:

1. Sao chép tệp kho khóa bor vào

    /etc/bor/dataDir/keystore

2. Và password.txt vào

    /etc/bor/dataDir/

3. Đảm bảo rằng bạn đã thêm địa chỉ chính xác vào `/etc/bor/metadata`

Đối với Nhị phân:

1. Chép tệp tin trữ khóa Bor vào:

`/var/lib/bor/keystore/`

2. Và password.txt vào

`/var/lib/bor/password.txt`


### 4. Lỗi: Wrong Block.Header.AppHash. Dự kiến xxxx {#4-error-wrong-block-header-apphash-expected-xxxx}

Điều này thường xảy ra do cài đặt không đúng heimdall. Bạn có thể làm theo các bước bên dưới để chỉnh sửa lỗi này:

chạy

    ```heimdalld unsafe-reset-all```

và khởi động lại dịch vụ Heimdall. Bạn có thể tham khảo hướng dẫn này - https://docs.polygon.tech/docs/validate/quidate/run-validate/validator

### 5. Tôi tạo khóa API từ đâu? {#5-from-where-do-i-create-the-api-key}

Bạn có thể truy cập liên kết này: [https://infura.io/register](https://infura.io/register) . Đảm bảo rằng sau khi đã thiết lập tài khoản và dự án, bạn sao chép khóa API cho Ropsten chứ không phải Mạng chính.

Mạng chính được chọn theo mặc định.

### 6. Heimdall không hoạt động. Tôi đang gặp lỗi Panic {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**Lỗi Thực tế**: Heimdall của tôi không hoạt động. Dòng đầu tiên trong nhật ký là:
panic: Unknown db_backend leveldb, expected either goleveldb or memdb or fsdb

Thay đổi cấu hình thành `goleveldb`trong`config.toml`.


### 7. Làm thế nào để xóa những gì còn sót lại của Heimdall và Bor? {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

Nếu bạn muốn xóa những gì còn sót lại của Heimdall và Bor thì bạn có thể chạy các lệnh sau
Bor:

Đối với gói Linux:

```$ sudo dpkg -i matic-bor```

Và xoá Thư mục Bor:

```$ sudo rm -rf /etc/bor```

Đối với Nhị phân:

```$ sudo rm -rf /etc/bor```

Và

```$ sudo rm /etc/heimdall```


### 8. Có bao nhiêu người xác thực có thể hoạt động đồng thời? {#8-how-many-validators-can-be-active-concurrently}

Sẽ có tối đa 100 người xác thực hoạt động cùng một lúc. Chúng tôi cũng sẽ bổ sung thêm người tham gia nếu đạt được giới hạn tối đa này ở giai đoạn giữa sự kiện. Lưu ý rằng người xác thực đang hoạt động chủ yếu là những người có thời gian hoạt động cao. Những người tham gia có thời gian ngừng hoạt động cao sẽ bị loại.

### 9. Tôi nên góp cổ phần bao nhiêu? {#9-how-much-should-i-stake}

"khoản-góp-cổ-phần" và "khoản-phí-heimdall" - nên là bao nhiêu?

Yêu cầu tối thiểu 10 token Matic đối với khoản góp cổ phần trong khi phí heimdall phải lớn hơn 10. Ví dụ: khoản góp cổ phần của bạn là 400 thì phí heimdall phải là 20. Chúng tôi khuyến nghị duy trì phí Heimdall ở mức 20.

Tuy nhiên, vui lòng lưu ý rằng các giá trị được nhập vào khoản góp cổ phần và khoản phí heimdall phải là 18 số thập phân

Ví dụ:

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. Tôi được chọn để trở thành người xác thực nhưng địa chỉ ETH của tôi không chính xác. Tôi phải làm gì? {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

Nếu bạn có quyền truy cập vào địa chỉ ETH mà bạn đã gửi trước đó thì bạn có thể chuyển token Thử nghiệm từ tài khoản đó sang tài khoản hiện tại. Và sau đó bạn có thể bắt đầu quy trình thiết lập các nút của mình.

Nếu bạn không có quyền truy cập vào địa chỉ ETH đó, chúng tôi sẽ không chuyển riêng token cho bạn. Bạn có thể đăng ký lại vào biểu mẫu bằng địa chỉ ETH chính xác.

### 11. Tôi gặp lỗi khởi động cầu nối {#11-i-m-getting-an-error-starting-the-bridge}

**Lỗi**: Object "start" is unknown, try "bridge help". Bỏ qua lỗi này có ổn không?

Kiểm tra xem đó là "cầu nối nào" - nếu đó là `/usr/sbin/bridge` thì bạn chưa chạy đúng chương trình "cầu nối".

Hãy thử `~/go/bin/bridge` thay cho `(or $GOBIN/bridge)`


### 12. Tôi gặp lỗi dpkg {#12-i-m-getting-dpkg-error}

**Lỗi**: "dpkg: error processing archive matic-heimdall_1.0.0_amd64.deb (--install): trying to overwrite '/heimdalld-rest-server.service', which is also in package matic-node 1.0.0"

Lỗi này xảy ra chủ yếu do đã cài đặt polygon trước đó lên cỗ máy của bạn. Để xử lý, bạn có thể chạy:

`sudo dpkg -r matic-node`


### 13. Tôi không rõ nên thêm Khóa Riêng tư nào khi tạo khóa người xác thực {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

Khóa riêng tư được sử dụng là địa chỉ ETH của Ví nơi các Token mạng thử nghiệm Polygon của bạn được lưu trữ. Bạn có thể hoàn tất thiết lập với một cặp khóa công khai-riêng tư được liên kết với địa chỉ đã gửi trên biểu mẫu.


### 14. Có cách nào để biết liệu Heimdall đã được đồng bộ không? {#14-is-there-a-way-to-know-if-heimdall-is-synced}

Bạn có thể chạy lệnh sau để kiểm tra:

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

Kiểm tra giá trị của catching_up. Nếu giá trị là false thì toàn bộ nút đã được đồng bộ.


### 15. Điều gì sẽ xảy ra nếu ai đó trở thành người góp cổ phần lọt Top 10, sau cùng người đó sẽ nhận được phần thưởng MATIC của mình như thế nào? {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

Phần thưởng giai đoạn 1 không dựa trên cổ phần. Vui lòng tham khảo https://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/ để biết chi tiết về phần thưởng. Những người tham gia với cổ phần cao không nghiễm nhiên đủ điều kiện được nhận phần thưởng trong giai đoạn này.


### 16. Tôi nên sử dụng phiên bản heimdall nào? {#16-what-should-be-my-heimdall-version}

Để kiểm tra phiên bản Heimdall, bạn chỉ cần chạy:

```heimdalld version```

Phiên bản chính xác của Heimdall cho giai đoạn 1 sẽ là `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`


### 17. Tôi nên thêm giá trị bao nhiêu vào khoản góp cổ phần và khoản phí? {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

Yêu cầu tối thiểu 10 token Matic đối với khoản góp cổ phần trong khi phí heimdall phải lớn hơn 10. Ví dụ: khoản góp cổ phần của bạn là 400 thì phí heimdall phải là 20. Chúng tôi khuyến nghị duy trì phí Heimdall ở mức 20.

Tuy nhiên, vui lòng lưu ý rằng các giá trị được nhập vào khoản góp cổ phần và khoản phí heimdall phải là 18 số thập phân

Ví dụ:

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. Đâu là sự khác biệt giữa `/var/lib/heimdall` và `/etc/heimdall?`?

`/var/lib/heimdall` là heimdall dir khi bạn sử dụng phương pháp cài đặt nhị phân. `/etc/heimdall` là dành cho phương pháp cài đặt gói Linux.


### 19. Khi tôi thực hiện giao dịch góp cổ phần, tôi gặp lỗi "Vượt quá Gas" {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

Lỗi này có thể xảy ra do định dạng khoản góp cổ phần hoặc phí. Các giá trị được nhập trong lệnh góp cổ phần cần có 18 số thập phân.

Tuy nhiên, vui lòng lưu ý rằng các giá trị được nhập vào khoản góp cổ phần và khoản phí heimdall phải là 18 số thập phân

Ví dụ:

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. Khi nào tôi có cơ hội trở thành Người xác thực? {#20-when-will-i-get-a-chance-to-become-a-validator}

Chúng tôi đang dần bổ sung thêm người xác thực trong suốt quá trình của sự kiện Giai đoạn 1. Chúng tôi sẽ dần phát hành danh sách những người xác thực bên ngoài mới. Danh sách này sẽ được công bố trên kênh Discord.


### 21. Tôi có thể tìm vị trí thông tin tài khoản Heimdall ở đâu? {#21-where-can-i-find-heimdall-account-info-location}

Đối với nhị phân:

    /var/lib/heimdall/config folder

Đối với gói Linux:

    /etc/heimdall/config


### 22. Tôi thêm khóa API vào tệp nào? {#22-which-file-do-i-add-the-api-key-in}

Sau khi tạo khóa API, bạn cần thêm khóa API vào tệp `heimdall-config.toml`.


### 23. Tôi thêm persistent_peers vào tệp nào? {#23-which-file-do-i-add-the-persistent_peers}

Bạn có thêm những mạng ngang hàng liên tục vào tệp tin sau đây:

    /var/lib/heimdall/config/config.toml


### 24. "Bạn đã đặt lại Tendermint mà không đặt lại dữ liệu ứng dụng của mình?" {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

Trong trường hợp này, bạn có thể đặt lại dữ liệu cấu hình heimdall và thử chạy lại cài đặt.

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. Lỗi: Unable to unmarshall config Error 1 error(s) decoding {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

Lỗi: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

Lỗi này xảy ra chủ yếu là do có lỗi chính tả hoặc một số phần bị thiếu hoặc tệp cấu hình cũ vẫn còn sót lại. Bạn cần phải xóa tất cả những gì còn sót lại và sau đó thử thiết lập lại.

### 26. Để dừng các dịch vụ Heimdall và Bor {#26-to-stop-heimdall-and-bor-services}

**Đối với gói Linux**:

Dừng Heimdall: `sudo service heimdalld stop`

Dừng Bor: `sudo service bor stop`hoặc

1. `ps -aux | grep bor`. Lấy PID cho Bor và chạy lệnh sau.
2. `sudo kill -9 PID`

**Đối với nhị phân**:

Dừng Heimdall: `pkill heimdalld`

Dừng cầu nối: `pkill heimdalld-bridge`

Dừng Bor: Đi đến CS-2001/bor và sau đó chạy, `bash stop.sh`

### 27. Để xóa các thư mục Heimdall và Bor {#27-to-remove-heimdall-and-bor-directories}

**Đối với gói Linux**:
Xóa Heimdall: `sudo rm -rf /etc/heimdall/*`

Xoá Bor: `sudo rm -rf /etc/bor/*`

**Đối với nhị phân**:

Xoá Heimdall: `sudo rm -rf /var/lib/heimdall/`

Xóa Bor: `sudo rm -rf /var/lib/bor`

### 28. Phải làm gì khi gặp lỗi "Wrong Block.Header.AppHash." {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

Lỗi này thường xảy ra do các yêu cầu Infura bị cạn kiệt. Khi bạn thiết lập một nút trên Polygon, bạn thêm một Khóa Infura vào tệp Cấu hình (Heimdall). Theo mặc định, bạn được phép tạo 100k Yêu cầu mỗi ngày, nếu giới hạn này bị vượt quá, bạn sẽ gặp các vấn đề như vậy. Để giải vấn đề này, bạn có thể tạo một khóa API mới và thêm nó vào tệp tin`config.toml`.

:::tip Luôn nắm rõ

Cập nhật nút và người xác thực mới nhất từ Polygon nhóm và cộng đồng Polygon bằng cách đăng ký vào [nhóm thông báo Polygon](https://polygon.technology/notifications/).

:::
