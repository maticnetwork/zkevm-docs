---
id: setup-bor
title: Thiết lập Bor
description: Thiết lập nút Bor
keywords:
  - docs
  - matic
  - polygon
  - setup bor
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Thiết lập Bor {#setup-bor}

Sử dụng nhánh `master`hoặc`develop`, có chứa bản phát hành ổn định mới nhất.

```bash
    $ mkdir -p $GOPATH/src/github.com/maticnetwork
    $ cd $GOPATH/src/github.com/maticnetwork
    $ git clone https://github.com/maticnetwork/bor
    $ cd bor
    $ make bor-all
```

Hiện tại, bạn đã cài đặt Bor trên hệ thống cục bộ của bạn và nhị phân có sẵn trong đường dẫn `./build/bin/bor`.

### Kết nối với bảng điều khiển (không bắt buộc) {#connecting-to-console-optional}

Đây là một bước tùy chọn. Bạn không cần kết nối với bảng điều khiển. Bạn có thể làm như vậy chỉ khi bạn quan tâm đến các chi tiết khác.

Giống như Geth, bạn có thể kết nối với console bor để thực hiện nhiều loại querta. Từ `dataDir`bạn, hãy chạy lệnh sau:

```bash
    $ cd ~/matic/tesnets
    $ git submodule init
    $ git submodule update

    $ cd ~/matic/tesnets/genesis-contracts
    $ npm install

    $ git submodule init
    $ git submodule update
    $ cd ~/matic/tesnets/genesis-contracts/matic-contracts
    $ npm install
    $ node scripts/process-templates.js --bor-chain-id 15001
    $ npm run truffle:compile
```

Khi đã xử lý các mẫu, chúng ta cần thiết lập người xác thực trong `tesnets/genesis-contracts/validators.js`tệp tin. Tệp tin này sẽ giống như sau:

```json
    const validators = [
      {
        address: "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
        stake: 10, // without 10^18
        balance: 1000 // without 10^18
      }
    ]
```

Tạo bộ người xác thực Bor bằng cách sử dụng `validators.js`tệp tin :

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-borvalidatorset.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Lệnh này sẽ tạo`genesis-contracts/contracts/BorValidatorSet.sol`.

Tạo genesis.json, khi `BorValidatorSet.sol`đã tạo :

```bash
    $ cd ~/matic/testnets/genesis-contracts
    $ node generate-genesis.js --bor-chain-id 15001 --heimdall-chain-id heimdall-P5rXwg
```

Điều này sẽ tạo ra `genesis-contracts/genesis.json`.

## Khởi chạy Bor {#start-bor}

Một khi tệp tin genesis được tạo `~/matic/tesnets/genesis-contracts/genesis.json`ra, hãy chuẩn bị nút Bor :

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash setup.sh
```

Khởi động Bor bằng lệnh sau:

```bash
    $ cd ~/matic/testnets/bor-devnet
    $ bash start.sh 1
```

Bor sẽ bắt đầu chạy ở cổng 8545.

Nếu bạn muốn xóa Bor và bắt đầu lại:

```bash
    $ bash clean.sh
    $ bash setup.sh
    $ bash start.sh 1
```

## Test Bor và Heimdall {#test-bor-and-heimdall}

Để thử nghiệm cả Bor và Heimdall, bạn cần chạy Bor và Heimdall, Heimdall, sự khởi động của máy chủ và Cầu trong song song.

### Chạy máy chủ khởi động Heimdall (tùy chọn) {#run-heimdall-rest-server-optional}

Làm theo hướng dẫn [này](https://kirillplatonov.com/2017/11/12/simple_reverse_proxy_on_mac_with_nginx/) để chạy nginx trên máy cục bộ của bạn (Mac OSX).

Thêm nội dung dưới đây vào `/usr/local/etc/nginx/nginx.conf`và khởi động lại ngin:

```conf
    worker_processes  1;

    events {
        worker_connections 1024;
    }

    http {
        server {
            listen 80;
            server_name localhost;

            location / {
              add_header 'Access-Control-Allow-Origin' * always;
              add_header 'Access-Control-Allow-Credentials' 'true';
              add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
              add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH';

              if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Allow-Origin' * always;
                add_header 'Access-Control-Allow-Credentials' 'true';
                add_header 'Access-Control-Allow-Headers' 'Authorization,Accept,Origin,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Content-Range,Range';
                add_header 'Access-Control-Allow-Methods' 'GET,POST,OPTIONS,PUT,DELETE,PATCH';
                add_header 'Access-Control-Max-Age' 1728000;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                add_header 'Content-Length' 0;
                return 204;
              }

              proxy_redirect off;
              proxy_set_header host $host;
              proxy_set_header X-real-ip $remote_addr;
              proxy_set_header X-forward-for $proxy_add_x_forwarded_for;
              proxy_pass http://127.0.0.1:1317;
            }
        }
    }
```

Tải lại nginx bằng các thay đổi cấu hình mới:

```bash
    sudo nginx -s reload
```
