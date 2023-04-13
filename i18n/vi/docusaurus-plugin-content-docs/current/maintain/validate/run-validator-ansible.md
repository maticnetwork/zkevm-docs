---
id: run-validator-ansible
title: Chạy nút kiểm tra với nút điều khiển
sidebar_label: Using Ansible
description: Sử dụng Ansible để thiết lập nút xác thực trên Polygon
keywords:
  - docs
  - matic
  - polygon
  - ansible
  - node
  - validator
  - sentry
slug: run-validator-ansible
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip

Các bước trong hướng dẫn này liên quan đến việc chờ các dịch vụ **Heimdall** và **Bor** để đồng bộ hoàn toàn.
Quy trình này mất vài ngày để hoàn tất. Hoặc bạn có thể sử dụng một ảnh chụp nhanh đã lưu giúp giảm thời gian đồng bộ xuống chỉ còn vài giờ. Đối với hướng dẫn chi tiết, xem [<ins>Hướng dẫn chụp nhanh đối với Heimdall và Bor</ins>](/docs/operate/snapshot-instructions-heimdall-bor).

Để liên kết tải về snapshot, xem [<ins>Polygon Chins Snapshot</ins>](https://snapshot.polygon.technology/).
:::

Phần này hướng dẫn bạn khởi động và chạy nút xác thực thông qua playbook Ansible.

Đối với các yêu cầu hệ thống, xem [Yêu cầu Hệ thống Nút Xác thực](validator-node-system-requirements.md).

Nếu bạn muốn khởi động và chạy nút xác thực từ nhị phân, xem [Chạy Nút Xác thực từ Nhị phân](run-validator-binaries.md).

:::caution

Có mức giới hạn cho việc chấp nhận những người xác thực mới. Các trình xác thực mới chỉ có thể tham gia vào bộ phận hoạt động khi một trình xác thực đã hoạt động được phát hành.

:::

## Điều kiện tiên quyết {#prerequisites}

* Ba cỗ máy — một cỗ máy cục bộ mà bạn sẽ chạy playbook Ansible; hai cỗ máy từ xa — một [sentry](/docs/maintain/glossary.md#sentry) và một [người xác thực](/docs/maintain/glossary.md#validator).
* Trên cỗ máy cục bộ, [Ansible](https://www.ansible.com/) được cài đặt.
* Trên cỗ máy cục bộ, [Python 3.x](https://www.python.org/downloads/) được cài đặt.
* Trên các cỗ máy từ xa, đảm bảo Go *không* được cài đặt.
* Trên các cỗ máy từ xa, khóa công khai SSH của cỗ máy cục bộ ở trên cỗ máy từ xa để Ansible kết nối với chúng.
* Chúng tôi có Bloxroute khả dụng như mạng lưới chuyển tiếp. Nếu bạn cần một cổng để được thêm vào như Peer đã tin cậy vui lòng liên hệ **với nhóm hỗ trợ (xác thực)** trong [Polygon Discord](https://discord.com/invite/0xPolygon) > VALAIDATORS | | NODE đầy đủ CUNG CẤP | PARTNERS > blox.

:::info

Vui lòng tuân theo các bước trên [<ins>hướng dẫn bloXroud</ins>](/maintain/validate/bloxroute.md) để kết nối các nút của bạn đến cổng bloXrouts.

:::

## Tổng quan {#overview}

:::caution

Bạn phải tuân theo **chuỗi xác thực của hành động**, nếu không bạn sẽ gặp các vấn đề. Ví dụ, **một nút sentry phải luôn được thiết lập trước khi nút xác thực**.

:::

Để tìm hiểu cách chạy nút xác thực, thực hiện những việc sau:

1. Chuẩn bị ba cỗ máy.
1. Thiết lập nút sentry thông qua Ansible.
1. Thiết lập nút xác thực thông qua Ansible.
1. Cấu hình nút sentry.
1. Khởi động nút sentry.
1. Cấu hình nút xác thực.
1. Đặt khóa chủ sở hữu và người ký.
1. Khởi động nút xác thực.
1. Kiểm tra tình trạng nút với cộng đồng.

## Thiết lập nút sentry {#set-up-the-sentry-node}

Trên cỗ máy cục bộ của bạn, nhân bản [kho lưu trữ nút-ansible](https://github.com/maticnetwork/node-ansible):

```sh
git clone https://github.com/maticnetwork/node-ansible
```

Chuyển thành kho lưu trữ nhân bản:

```sh
cd node-ansible
```

Thêm địa chỉ IP của các cỗ máy từ xa mà sẽ trở thành nút sentry và nút xác thực vào tệp tin`inventory.yml`.

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for sentry node
        xxx.xxx.xx.xx: # <----- Add IP for second sentry node (optional)
    validator:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for validator node
```

Ví dụ:

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        188.166.216.25:
    validator:
      hosts:
        134.209.100.175:
```

Đảm bảo rằng cỗ máy sentry từ xa có thể truy cập được. Trên cỗ máy cục bộ, chạy:

```sh
$ ansible sentry -m ping
```

Bạn sẽ nhận được kết quả từ thao tác này:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Chạy thử thiết lập nút sentry:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

Đây sẽ là kết quả:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Chạy thiết lập nút sentry với đặc quyền sudo:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

Sau khi thiết lập hoàn tất, bạn sẽ thấy một thông báo hoàn tất trên thiết bị đầu cuối.

:::note

Nếu bạn gặp vấn đề và muốn thử lại, hãy chạy:

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## Thiết lập nút xác thực {#set-up-the-validator-node}

Lúc này, bạn đã thiết lập nút sentry.

Trên cỗ máy cục bộ của bạn, bạn cũng phải thiết lập playbook Ansible để chạy thiết lập nút xác thực.

Đảm bảo rằng cỗ máy xác thực từ xa có thể truy cập được. Trên máy cục bộ, hãy chạy `ansible validator -m ping`.

Bạn sẽ nhận được kết quả từ thao tác này:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Chạy thử thiết lập nút xác thực:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

Bạn sẽ nhận được kết quả từ thao tác này:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Chạy thiết lập nút xác thực với đặc quyền sudo:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

Sau khi thiết lập hoàn tất, bạn sẽ thấy một thông báo hoàn tất trên thiết bị đầu cuối.

:::note

Nếu bạn gặp vấn đề và muốn thử lại, hãy chạy:

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## Cấu hình nút sentry {#configure-the-sentry-node}

Đăng nhập cỗ máy sentry từ xa.

### Cấu hình dịch vụ Heimdall {#configure-the-heimdall-service}

Mở `config.toml`để chỉnh sửa`vi ~/.heimdalld/config/config.toml`.

Thay đổi những điều sau:

* `moniker` — bất kỳ tên nào. Ví dụ:`moniker = "my-full-node"`.
* `seeds` — địa chỉ nút hạt giống bao gồm ID nút, địa chỉ IP và cổng.

Sử dụng các giá trị sau:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — thiết lập giá trị về `true`để kích hoạt trao đổi ngang hàng. Ví dụ:`pex = true`.
* `private_peer_ids` — ID nút của Heimdall được thiết lập trên cỗ máy xác thực.

Để lấy ID nút của Heimdall trên cỗ máy xác thực:

  1. Đăng nhập vào cỗ máy xác thực.
  1. Chạy`heimdalld tendermint show-node-id`.

  Ví dụ:`private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — thiết lập giá trị về `true`để kích hoạt các chỉ số Prometheus. Ví dụ:`prometheus = true`.
* `max_open_connections` — thiết lập giá trị về`100`. Ví dụ:`max_open_connections = 100`.

Lưu các thay đổi vào`config.toml`.

### Cấu hình dịch vụ Bor {#configure-the-bor-service}

Mở để chỉnh sửa`vi ~/node/bor/start.sh`.

Trong,`start.sh` thêm địa chỉ nút khởi động bao gồm ID nút, địa chỉ IP và một cổng bằng cách thêm dòng sau vào cuối:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Lưu các thay đổi vào`start.sh`.

Mở để chỉnh sửa`vi ~/.bor/data/bor/static-nodes.json`.

Trong,`static-nodes.json` thay đổi những điều sau:

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"` — ID nút và địa chỉ IP của Bor được thiết lập trên cỗ máy xác thực.

Để lấy ID nút của Bor trên cỗ máy xác thực:

  1. Đăng nhập vào cỗ máy xác thực.
  1. Chạy`bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

 Ví dụ:`"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`.

Lưu các thay đổi vào`static-nodes.json`.

### Cấu hình tường lửa {#configure-firewall}

Cỗ máy sentry phải có các cổng sau đây mở ra thế giới `0.0.0.0/0`:

* 26656- Dịch vụ Heimdall của bạn sẽ kết nối nút của bạn với các nút khác bằng dịch vụ Heimdall.

* 30303- Dịch vụ Bor của bạn sẽ kết nối nút của bạn với các nút khác bằng dịch vụ Bor.

* 22- Để người xác thực có thể kết nối ssh từ bất cứ đâu.

:::note

Tuy nhiên, nếu họ sử dụng kết nối VPN, họ chỉ có thể cho phép kết nối ssh đến từ địa chỉ IP VPN.

:::

## Khởi động nút sentry {#start-the-sentry-node}

Trước hết bạn sẽ khởi động dịch vụ Heimdall. Sau khi dịch vụ Heimdall đồng bộ, bạn sẽ khởi động dịch vụ Bor.

:::note

Dịch vụ Heimdall mất vài ngày để đồng bộ hoàn toàn từ đầu.

Hoặc bạn có thể sử dụng một ảnh chụp nhanh đã lưu giúp giảm thời gian đồng bộ xuống chỉ còn vài giờ. Đối với hướng dẫn chi tiết, hãy xem [<ins>Hướng dẫn chụp nhanh đối với Heimdall và Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Đối với các liên kết tải về ảnh chụp nhanh, xem [Ảnh chụp nhanh chuỗi Polygon](https://snapshot.polygon.technology/).

:::

### Khởi động dịch vụ Heimdall {#start-the-heimdall-service}

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

Những lỗi này có nghĩa là một trong những nút trên mạng lưới từ chối kết nối với nút của bạn. Bạn không cần phải làm bất kỳ điều gì với những lỗi này. Chờ nút của bạn thu thập thêm nút trên mạng lưới.

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

### Khởi động dịch vụ Bor {#start-the-bor-service}

Sau khi dịch vụ Heimdall đã được đồng bộ hoàn toàn, khởi động dịch vụ Bor.

Khởi động dịch vụ Bor:

```sh
sudo service bor start
```

Kiểm tra nhật ký dịch vụ Bor:

```sh
journalctl -u bor.service -f
```

## Cấu hình nút xác thực {#configure-the-validator-node}

:::note

Để hoàn tất phần này, bạn phải đảm bảo điểm cuối RPC của nút mạng lưới chính Ethereum sẵn sàng.

:::

### Cấu hình dịch vụ Heimdall {#configure-the-heimdall-service-1}

Đăng nhập cỗ máy xác thực từ xa.

Mở `config.toml`để chỉnh sửa`vi ~/.heimdalld/config/config.toml`.

Thay đổi những điều sau:

* `moniker` — bất kỳ tên nào. Ví dụ:`moniker = "my-validator-node"`.
* `pex` — thiết lập giá trị về `false`để tắt trao đổi ngang hàng. Ví dụ:`pex = false`.
* `private_peer_ids` — nhận xét về giá trị để tắt giá trị. Ví dụ:`# private_peer_ids = ""`.


Để lấy ID nút của Heimdall trên cỗ máy sentry:

  1. Đăng nhập cỗ máy sentry.
  1. Chạy`heimdalld tendermint show-node-id`.

 Ví dụ: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — thiết lập giá trị về `true`để kích hoạt các chỉ số Prometheus. Ví dụ:`prometheus = true`.

Lưu các thay đổi vào`config.toml`.

Mở để chỉnh sửa`vi ~/.heimdalld/config/heimdall-config.toml`.

Trong `heimdall-config.toml`, thay đổi những điều sau:

* `eth_rpc_url` — điểm cuối RPC cho nút mạng lưới chính Ethereum đồng bộ hoàn toàn, chẳng hạn: Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Ví dụ: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


Lưu các thay đổi vào`heimdall-config.toml`.

### Cấu hình dịch vụ Bor {#configure-the-bor-service-1}

Mở để chỉnh sửa`vi ~/.bor/data/bor/static-nodes.json`.

Trong,`static-nodes.json` thay đổi những điều sau:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — ID nút và địa chỉ IP của Bor được thiết lập trên cỗ máy sentry.

Để lấy ID nút của Bor trên cỗ máy sentry:

  1. Đăng nhập cỗ máy sentry.
  1. Chạy`bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

 Ví dụ:`"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Lưu các thay đổi vào`static-nodes.json`.

## Đặt khoá chủ sở hữu và người ký {#set-the-owner-and-signer-key}

Trên Polygon, bạn cần thiết lập khoá chủ sở hữu và người ký khác nhau.

* Người ký — địa chỉ ký [giao dịch điểm kiểm duyệt](../glossary#checkpoint-transaction). Nên giữ ít nhất 1 ETH trên địa chỉ người ký.
* Chủ sở hữu — địa chỉ thực hiện giao dịch góp cổ phần. Nên giữ token MATIC trên địa chỉ chủ sở hữu.

### Tạo khóa riêng tư Heimdall {#generate-a-heimdall-private-key}

Bạn phải tạo một khóa riêng tư Heimdall trên cỗ máy xác thực. **Không tạo khóa riêng tư Heimdall trên cỗ máy sentry.**

Để tạo khóa riêng tư, hãy chạy:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

ETHERUM_PRINATE_KEY - Chìa khóa riêng tư của ví Ethereum

:::

Thao tác này sẽ tạo`priv_validator_key.json`. Di chuyển tệp tin JSON đã tạo sang thư mục cấu hình Heimdall:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Tạo một tệp tin trữ khóa Bor {#generate-a-bor-keystore-file}

Bạn phải tạo một tệp tin trữ khóa Bor trên cỗ máy xác thực. **Không tạo tệp tin trữ khóa Bor trên cỗ máy sentry.**

Để tạo khóa riêng tư, hãy chạy:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — khóa riêng tư ví Ethereum của bạn.


:::

Khi được nhắc, hãy tạo mật khẩu cho tệp tin trữ khóa.

Thao tác này sẽ tạo một `UTC-<time>-<address>`tệp tin trữ khóa.

Chuyển tệp tin trữ khóa đã tạo sang thư mục cấu hình Bor:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Thêm`password.txt`

Hãy tạo tệp tin `password.txt` sau đó thêm mật khẩu tệp tin trữ khoá Bor ngay trong tệp tin`~/.bor/password.txt`.

### Thêm địa chỉ Ethereum {#add-your-ethereum-address}

Mở để chỉnh sửa`vi /etc/matic/metadata`.

Trong,`metadata` thêm địa chỉ Ethereum của bạn. Ví dụ:`VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Lưu các thay đổi vào`metadata`.

## Khởi động nút xác thực {#start-the-validator-node}

Lúc này, bạn phải đảm bảo:

* Dịch vụ Heimdall trên cỗ máy sentry đã được đồng bộ hoàn toàn và đang chạy.
* Dịch vụ Bor trên cỗ máy sentry đang chạy.
* Dịch vụ Heimdall và dịch vụ Bor trên máy xác thực đã được cấu hình.
* Khoá chủ sở hữu và người ký của bạn đã được cấu hình.

### Khởi động dịch vụ Heimdall {#start-the-heimdall-service-1}

Bây giờ bạn sẽ khởi động dịch vụ Heimdall trên cỗ máy xác thực. Sau khi dịch vụ Heimdall đồng bộ, bạn sẽ khởi động dịch vụ Bor trên cỗ máy xác thực.

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
* `false` — dịch vụ Heimdall được đồng bộ hoàn toàn.

Chờ dịch vụ Heimdall đồng bộ hoàn toàn.

### Khởi động dịch vụ Bor {#start-the-bor-service-1}

Sau khi dịch vụ Heimdall trên cỗ máy xác thực đã được đồng bộ hoàn toàn, khởi động dịch vụ Bor trên cỗ máy xác thực.

Khởi động dịch vụ Bor:

```sh
sudo service bor start
```

Kiểm tra nhật ký dịch vụ Bor:

```sh
journalctl -u bor.service -f
```

## Kiểm tra tình trạng nút với cộng đồng {#check-node-health-with-the-community}

Bây giờ các nút sentry và xác thực của bạn đã được đồng bộ và chạy, chuyển sang [Discord](https://discord.com/invite/0xPolygon) và yêu cầu cộng đồng kiểm tra tình trạng các nút của bạn.

:::note

Như người xác thực, bắt buộc phải luôn có một tấm séc của địa chỉ người ký. Nếu EU cân bằng đạt dưới 0.5 E, thì nó sẽ được khôi phục. Tránh điều này sẽ đẩy các nút ra từ các giao dịch kiểm trapoint dưới sự.

:::

## Tiến hành góp cổ phần {#proceed-to-staking}

Bây giờ các nút sentry và xác thực của bạn đã được kiểm tra tình trạng, hãy tiến hành [Góp cổ phần](/docs/maintain/validator/core-components/staking).
