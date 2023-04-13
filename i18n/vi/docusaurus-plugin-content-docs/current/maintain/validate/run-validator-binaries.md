---
id: run-validator-binaries
title: Chạy nút kiểm tra của Bin
sidebar_label: Using Binaries
description: Sử dụng các nhị phân để thiết lập nút của bạn
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
slug: run-validator-binaries
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
Các bước chân trong hướng dẫn này liên quan đến việc chờ đợi dịch vụ H**eimdall **và B**or **để đồng bộ đầy đủ. Hoặc bạn có thể sử dụng một ảnh chụp nhanh đã lưu giúp giảm thời gian đồng bộ xuống chỉ còn vài giờ. Đối với hướng dẫn chi tiết, xem [<ins>Hướng dẫn chụp nhanh đối với Heimdall và Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Để liên kết tải về snapshot, xem [<ins>Polygon Chins Snapshot</ins>](https://snapshot.polygon.technology/).

:::


Hướng dẫn này sẽ hướng dẫn bạn cách chạy một nút xác thực Polygon từ các mã nhị phân.

Đối với yêu cầu hệ thống, hãy theo dõi [nút Thông tin Hệ thống Validator](validator-node-system-requirements.md) hướng dẫn.

Nếu bạn muốn bắt đầu và chạy nút xác thực qua Antile, hãy xem [một nút xác thực với Antitle](run-validator-ansible.md).

:::caution

Có mức giới hạn cho việc chấp nhận những người xác thực mới. Các trình xác thực mới chỉ có thể tham gia vào bộ phận hoạt động khi một trình xác thực đã hoạt động được phát hành.

:::

## Điều kiện tiên quyết {#prerequisites}

* Hai máy — một [sentry](/docs/maintain/glossary.md#sentry) và một[ người xác thực](/docs/maintain/glossary.md#validator).
* `build-essential`được cài đặt trên cả sentry và các máy xác thực.

Để cài đặt:

  ```sh
  sudo apt-get install build-essential
  ```

* Go 1.18 được cài đặt trên cả sentry và các máy xác thực.

Để cài đặt:

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* Thỏ MQ đã cài đặt trên cả sentry và các máy xác thực.

Dưới đây là các lệnh để cài đặt Thỏ:

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

Kiểm tra thêm thông tin về việc tải và cài đặt ThỏMQ [<ins>ở đây.</ins>](https://www.rabbitmq.com/download.html)

:::


:::info
Vui lòng tuân theo các bước trên [<ins>hướng dẫn bloXroud</ins>](/maintain/validate/bloxroute.md) để kết nối các nút của bạn đến cổng bloXrouts.
:::

## Tổng quan {#overview}

Để tìm được một nút xác thực đang chạy, hãy tiến hành các bước sau theo **trình tự chính xác của các bước**:

:::caution

Bạn sẽ gặp sự cố cấu hình nếu các bước này được thực hiện không theo trình tự. Điều quan trọng cần lưu ý là một nút sentry phải luôn được thiết lập trước nút xác thực.

:::

1. Chuẩn bị hai máy, một cho nút sentry và một cho nút xác thực.
2.
Cài đặt nhị phân Heimdall và Bor trên sentry và máy xác thực.
3.
Thiết lập các tệp dịch vụ Heimdall và Bor trên sentry và máy xác thực.
4.
Thiết lập các dịch vụ Heimdall và Bor trên sentry và máy xác thực.
5. Cấu hình nút sentry.
6. Khởi động nút sentry.
7. Cấu hình nút xác thực.
8. Đặt khóa chủ sở hữu và người ký.
9. Khởi động nút xác thực.
10. Kiểm tra tình trạng nút với cộng đồng.

## Cài đặt nhị phân {#installing-the-binaries}


Cài đặt nhị phân cho cả sentry và máy xác thực.

### Cài đặt Heimdall {#installing-heimdall}

[Heimdall](/docs/pos/heimdall/overview) là lớp xác minh bằng chứng cổ phần chịu trách nhiệm kiểm tra sự đại diện của các khối Plasma với mạng lưới chính Ethereum.

Phiên bản mới nhất, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), chứa một số cải tiến như :
1. Giới hạn kích thước dữ liệu giao dịch đồng bộ trạng thái về:
    * **30Kb** tương đương **byte**
    * **60Kb** tương đương **string**.
2. Tăng **thời gian trễ** giữa các sự kiện hợp đồng của những người xác thực khác nhau để đảm bảo rằng mempool không bị nhanh đầy trong trường hợp bộc phát sự kiện làm cản trở tiến độ của chuỗi.

Ví dụ sau đây mô tả cách giới hạn kích thước dữ liệu:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Sao chép [kho lưu trữ Heimdall](https://github.com/maticnetwork/heimdall/):

```sh
git clone https://github.com/maticnetwork/heimdall
```

Điều hướng đến [phiên bản phát hành](https://github.com/maticnetwork/heimdall/releases) chính xác:

```sh
git checkout RELEASE_TAG
```

đâu `RELEASE_TAG`là thẻ của phiên bản phát hành mà bạn cài đặt.

Ví dụ:

```sh
git checkout v0.3.0
```

Khi bạn đang sử dụng đúng bản phát hành, hãy cài đặt Heimdall:

```sh
make install
source ~/.profile
```

Kiểm tra cài đặt Heimdall:

```sh
heimdalld version --long
```

:::note

Trước khi tiếp tục, Heimdall phải được cài đặt trên cả sentry và máy xác thực.

:::

### Cài đặt Bor {#installing-bor}

[Bor](/docs/pos/bor) là người điều hành sidechain hoạt động như một lớp sản xuất khối , đồng bộ với Heimdall để chọn các nhà sản xuất và xác thực cho mỗi [scan](/docs/maintain/glossary.md#span) và [suối](/docs/maintain/glossary.md#sprint).


Sao chép [kho lưu trữ Bor](https://github.com/maticnetwork/bor):

```sh
git clone https://github.com/maticnetwork/bor
```

Điều hướng đến [phiên bản phát hành](https://github.com/maticnetwork/bor/releases) chính xác:

```sh
git checkout RELEASE_TAG
```

đâu `RELEASE_TAG`là thẻ của phiên bản phát hành mà bạn cài đặt.

Ví dụ:

```sh
git checkout v0.3.3
```

Cài đặt Bor:

```sh
make bor-all
```


Tạo liên kết tượng trưng:

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```


Kiểm tra cài đặt Bor:

```sh
bor version
```

:::note

Trước khi tiếp tục, Bor phải được cài đặt trên cả sentry và máy xác thực.

:::

## Thiết lập tệp tin nút {#setting-up-node-files}

:::note

Các tệp tin nút cần được thiết lập trên cả máy gửi và máy xác thực.

:::

### Tìm nạp kho lưu trữ khởi chạy {#fetching-the-launch-repository}

Sao chép [kho lưu trữ khởi chạy](https://github.com/maticnetwork/launch):

```sh
git clone https://github.com/maticnetwork/launch
```

###
Thiết lập thư mục khởi chạy {#setting-up-the-launch-directory}

#### Trên máy sentry {#on-the-sentry-machine}

Tạo `node`thư mục:

```sh
mkdir -p node
```

Sao chép các tệp và tập lệnh từ`launch` thư mục vào `node`thư mục:

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### Trên máy xác thực {#on-the-validator-machine}

Tạo `node`thư mục:

```sh
mkdir -p node
```

Sao chép các tệp và tập lệnh từ`launch` thư mục vào `node`thư mục:

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### Thiết lập các thư mục mạng lưới {#setting-up-the-network-directories}

:::note

Chạy phần này cả trên sentry và máy xác thực.

:::

#### Thiết lập Heimdall {#setting-up-heimdall}

Thay đổi`node` thư mục:

```sh
cd ~/node/heimdall
```

Chạy tập lệnh thiết lập:

```sh
bash setup.sh
```

#### Thiết lập Bor {#setting-up-bor}

Thay đổi`node` thư mục:

```sh
cd ~/node/bor
```

Chạy tập lệnh thiết lập:

```sh
bash setup.sh
```

## Thiết lập dịch vụ {#setting-up-the-services}

:::note

Chạy phần này cả trên sentry và máy xác thực.

:::

Điều hướng đến`node` thư mục:

```sh
cd ~/node
```

Chạy tập lệnh thiết lập:

```sh
bash service.sh
```

Sao chép tệp tin dịch vụ vào thư mục hệ thống:

```sh
sudo cp *.service /etc/systemd/system/
```

## Định cấu hình nút Sentry {#configuring-the-sentry-node}

Bắt đầu bằng cách đăng nhập vào máy sentry từ xa.

### Định cấu hình dịch vụ Heimdall {#configuring-the-heimdall-services}

Mở tệp tin cấu hình Heimdall để chỉnh sửa:

```sh
vi ~/.heimdalld/config/config.toml
```

Trong`config.toml`, thay đổi các tham số sau:

* `moniker` — bất kỳ tên nào. Ví dụ:`moniker = "my-sentry-node"`.
* `seeds` — địa chỉ nút hạt giống bao gồm ID nút, địa chỉ IP và cổng.

Sử dụng các giá trị sau:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — thiết lập giá trị về `true`để kích hoạt trao đổi ngang hàng. Ví dụ:`pex = true`.
* `private_peer_ids` — ID nút của Heimdall được thiết lập trên cỗ máy xác thực.

Để lấy ID nút của Heimdall trên cỗ máy xác thực:

  1. Đăng nhập vào máy xác thực.
  2. Chạy:
     ```sh
     heimdalld tendermint show-node-id
     ```

 Ví dụ:`private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — thiết lập giá trị về `true`để kích hoạt các chỉ số Prometheus. Ví dụ:`prometheus = true`.
* `max_open_connections` — thiết lập giá trị về`100`. Ví dụ:`max_open_connections = 100`.

Lưu các thay đổi vào`config.toml`.

### Định cấu hình dịch vụ Bor {#configuring-the-bor-service}

Mở tệp tin cấu hình Bor để chỉnh sửa:

```sh
`vi ~/node/bor/start.sh`
```

Trong`start.sh`, thêm các địa chỉ nút khởi động bao gồm ID nút, địa chỉ IP và cổng bằng cách thêm dòng sau vào cuối tệp tin:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Lưu các thay đổi vào`start.sh`.

### Định cấu hình tường lửa {#configuring-a-firewall}

Máy sentry phải có các cổng sau đây mở ra thế giới `0.0.0.0/0`:

* `26656`- Dịch vụ Heimdall của bạn sẽ kết nối nút của bạn với các nút khác của dịch vụ Heimdall.

* `30303`- Dịch vụ Bor của bạn sẽ kết nối nút của bạn với các nút khác của dịch vụ Bor.

* `22`- Để người xác thực có thể ssh từ mọi nơi.

## Khởi động nút sentry {#starting-the-sentry-node}

Trước hết bạn sẽ khởi động dịch vụ Heimdall. Sau khi dịch vụ Heimdall đồng bộ, bạn sẽ khởi động dịch vụ Bor.

:::note

Như đã đề cập trước đó, dịch vụ Heimdall mất vài ngày để đồng bộ hóa hoàn toàn từ đầu.

Hoặc bạn có thể sử dụng một ảnh chụp nhanh đã lưu giúp giảm thời gian đồng bộ xuống chỉ còn vài giờ. Đối với hướng dẫn chi tiết, xem [<ins>Hướng dẫn chụp nhanh đối với Heimdall và Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Đối với các liên kết tải về ảnh chụp nhanh, xem [Ảnh chụp nhanh chuỗi Polygon](https://snapshot.polygon.technology/).

:::

### Khởi động dịch vụ Heimdall {#starting-the-heimdall-service}

Khởi động dịch vụ Heimdall:

```sh
sudo service heimdalld start
```

Khởi động máy chủ rest Heimdall:

```sh
sudo service heimdalld-rest-server start
```

Kiểm tra nhật ký dịch vụ Heimdall:

```sh
journalctl -u heimdalld.service -f
```

:::note

Trong các nhật ký, bạn có thể thấy các lỗi sau:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

Các bản ghi này có nghĩa là một trong các nút trên mạng lưới đã từ chối kết nối với nút của bạn. Chờ cho nút của bạn thu thập thông tin thêm các nút trên mạng lưới; bạn không cần phải làm bất cứ điều gì để giải quyết những lỗi này.

:::

Kiểm tra nhật ký máy chủ rest Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Kiểm tra trạng thái đồng bộ của Heimdall:

```sh
curl localhost:26657/status
```

Trong kết quả,`catching_up` giá trị là:

* `true`— dịch vụ Heimdall đang đồng bộ.
* `false` — dịch vụ Heimdall được đồng bộ hoàn toàn.

Chờ dịch vụ Heimdall đồng bộ hoàn toàn.

### Khởi chạy dịch vụ Bor {#starting-the-bor-service}

Khi dịch vụ Heimdall đồng bộ, hãy khởi chạy dịch vụ Bor.

Khởi động dịch vụ Bor:

```sh
sudo service bor start
```

Kiểm tra nhật ký dịch vụ Bor:

```sh
journalctl -u bor.service -f
```

##
Định cấu hình nút xác thực {#configuring-the-validator-node}

:::note

Để hoàn tất phần này, bạn phải có điểm cuối RPC của nút mạng lưới chính Ethereum đã đồng hóa hoàn toàn nút sẵn sàng.

:::

### Định cấu hình dịch vụ Heimdall {#configuring-the-heimdall-service}

Đăng nhập vào máy xác thực từ xa.

Mở để chỉnh sửa`vi ~/.heimdalld/config/config.toml`.

Trong`config.toml`, thay đổi những điều sau:

* `moniker` — bất kỳ tên nào. Ví dụ:`moniker = "my-validator-node"`.
* `pex` — thiết lập giá trị về `false`để tắt trao đổi ngang hàng. Ví dụ:`pex = false`.
* `private_peer_ids` — nhận xét về giá trị để tắt giá trị. Ví dụ:`# private_peer_ids = ""`.

Để lấy ID nút của Heimdall trên cỗ máy sentry:

  1. Đăng nhập vào máy sentry.
  1. Chạy`heimdalld tendermint show-node-id`.

Ví dụ: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — thiết lập giá trị về `true`để kích hoạt các chỉ số Prometheus. Ví dụ:`prometheus = true`.

Lưu các thay đổi vào`config.toml`.

Mở để chỉnh sửa`vi ~/.heimdalld/config/heimdall-config.toml`.

Trong`heimdall-config.toml`, thay đổi những điều sau:

* `eth_rpc_url` — điểm cuối RPC cho nút mạng lưới chính Ethereum đồng bộ hoàn toàn, tức là Infura.`eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Ví dụ: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

Lưu các thay đổi vào`heimdall-config.toml`.

### Định cấu hình dịch vụ Bor {#configuring-the-bor-service-1}

Mở để chỉnh sửa`vi ~/.bor/data/bor/static-nodes.json`.

Trong`static-nodes.json`, thay đổi những điều sau:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"`— ID nút và Địa chỉ IP của Bor thiết lập trên máy sentry.

Để lấy ID nút của Bor trên cỗ máy sentry:

  1. Đăng nhập vào máy sentry.
  2. Chạy`bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

 Ví dụ:`"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Lưu các thay đổi vào`static-nodes.json`.

## Thiết lập khóa chủ sở hữu và người ký {#setting-the-owner-and-signer-key}

Polygon khuyến nghị bạn lưu trữ các khóa chủ sở hữu và người ký.

* Người ký — địa chỉ ký [các giao dịch trạm kiểm soát](/docs/maintain/glossary.md#checkpoint-transaction).
Khuyến nghị là nên giữ ít nhất 1 ETH trên địa chỉ của người ký.
* Chủ sở hữu — địa chỉ thực hiện giao dịch góp cổ phần. Khuyến nghị là giữ MATIC token trên địa chỉ chủ sở hữu.

###
Tạo khóa riêng tư Heimdall {#generating-a-heimdall-private-key}

Bạn phải tạo một khóa riêng tư Heimdall chỉ trên máy xác thực.
Không tạo khóa riêng tư Heimdall khóa riêng tư trên máy sentry.

Để tạo khóa riêng tư, hãy chạy:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

ở đâu

* ETHEREUM_PRIVATE_KEY — khóa riêng tư ví Ethereum của bạn.


Thao tác này sẽ tạo`priv_validator_key.json`. Chuyển tệp tin JSON đã tạo sang cấu hình Heimdall thư mục:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Tạo tệp tin trữ khóa Bor {#generating-a-bor-keystore-file}

Bạn phải tạo một tệp tin trữ khóa Bor trên máy xác thực. Không tạo tệp tin trữ khóa Bor trên máy sentry.

Để tạo khóa riêng tư, hãy chạy:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

ở đâu

* ETHEREUM_PRIVATE_KEY — khóa riêng tư ví Ethereum của bạn.


Khi được nhắc, hãy tạo mật khẩu cho tệp tin trữ khóa.

Thao tác này sẽ tạo một `UTC-<time>-<address>`tệp tin trữ khóa.

Chuyển tệp tin trữ khóa đã tạo sang thư mục cấu hình Bor:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Thêm mật khẩu.txt {#add-password-txt}

Hãy tạo `password.txt`tệp tin sau đó thêm mật khẩu tệp tin trữ khoá Bor ngay trong`~/.bor/password.txt` tệp tin.

### Thêm địa chỉ Ethereum {#add-your-ethereum-address}

Mở để chỉnh sửa`vi /etc/matic/metadata`.

Trong,`metadata` thêm địa chỉ Ethereum của bạn. Ví dụ:`VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Lưu các thay đổi vào`metadata`.

## Khởi động nút xác thực {#starting-the-validator-node}

Lúc này, bạn phải đảm bảo:

* Dịch vụ Heimdall trên máy sentry đồng bộ hóa và đang chạy.
* Dịch vụ Bor trên cỗ máy sentry đang chạy.
* Dịch vụ Heimdall và dịch vụ Bor trên máy xác thực đã được cấu hình.
* Khoá chủ sở hữu và người ký của bạn đã được cấu hình.

### Khởi động dịch vụ Heimdall {#starting-the-heimdall-service-1}

Bây giờ bạn sẽ khởi động dịch vụ Heimdall trên máy xác thực. Sau khi dịch vụ Heimdall đồng bộ, bạn sẽ bắt đầu dịch vụ Bor trên máy xác thực.

Khởi động dịch vụ Heimdall:

```sh
sudo service heimdalld start
```

Khởi động máy chủ rest Heimdall:

```sh
sudo service heimdalld-rest-server start
```

Khởi động cầu nối Heimdall:

```sh
sudo service heimdalld-bridge start
```

Kiểm tra nhật ký dịch vụ Heimdall:

```sh
journalctl -u heimdalld.service -f
```

Kiểm tra nhật ký máy chủ rest Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Kiểm tra nhật ký cầu nối Heimdall:

```sh
journalctl -u heimdalld-bridge.service -f
```

Kiểm tra trạng thái đồng bộ của Heimdall:

```sh
curl localhost:26657/status
```

Trong kết quả,`catching_up` giá trị là:

* `true`— dịch vụ Heimdall đang đồng bộ.
* `false`— dịch vụ Heimdall được đồng bộ.

Chờ dịch vụ Heimdall đồng bộ hoàn toàn.

### Khởi chạy dịch vụ Bor {#starting-the-bor-service-1}

Sau khi dịch vụ Heimdall trên máy xác thực đồng bộ hóa, hãy bắt đầu dịch vụ Bor trên máy xác thực.

Khởi động dịch vụ Bor:

```sh
sudo service bor start
```

Kiểm tra nhật ký dịch vụ Bor:

```sh
journalctl -u bor.service -f
```

## Kiểm tra sức khỏe với cộng đồng {#health-checks-with-the-community}

Bây giờ các nút sentry và xác thực của bạn đã được đồng bộ hóa và đang chạy, hãy chuyển đến [Discord](https://discord.com/invite/0xPolygon) và yêu cầu cộng đồng kiểm tra sức khỏe các nút của bạn.

:::note

Như người xác thực, bắt buộc phải luôn có một tấm séc của địa chỉ người ký. Nếu EU cân bằng đạt dưới 0.5 E, thì nó sẽ được khôi phục. Tránh điều này sẽ đẩy các nút ra từ các giao dịch kiểm trapoint dưới sự.

:::

## Các bước tiếp theo: Góp cổ phần {#next-steps-staking}

Bây giờ bạn đã có các nút sentry và xác thực của mình được kiểm tra sức khỏe, tiếp tục phần hướng dẫn[ góp cổ phần ](/docs/maintain/validator/core-components/staking.md)để bắt đầu hỗ trợ mạng lưới.
