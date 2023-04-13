---
id: install-gcp
title: Triển khai các nút Polygon trên Google Cloud
sidebar_label: Google Cloud Deployment
description: Sự triển khai đơn giản của các nút Polygon trên Google Cloud
keywords:
- docs
- polygon
- deploy
- nodes
- gcp
- google cloud
slug: install-gcp
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Triển khai Polygon Nodes trên Google Cloud {#deploy-polygon-nodes-on-google-cloud}

Trong tài liệu này, chúng tôi sẽ mô tả cách triển khai các nút Polygon thành một tiến trình VM trên Google Cloud.

### Yêu cầu phần cứng {#hardware-requirements}

Kiểm tra [các yêu cầu phần cứng](/docs/maintain/validate/validator-node-system-requirements) tối thiểu và được khuyến nghị trong Polygon Wiki.

### Yêu cầu phần mềm {#software-requirements}

Sử dụng bất kỳ hệ điều hành Debian hoặc Ubuntu Linux hiện đại nào có hỗ trợ lâu dài, tức là Debian 11, Ubuntu 20.04. Chúng tôi sẽ tập trung vào Ubuntu 20.04 trong hướng dẫn này

## Triển khai phiên bản (2 cách) {#deploy-instance-2-ways}

Bạn có thể sử dụng ít nhất hai cách để tạo một phiên bản trong Google Cloud:

* Dùng gcloud cli, cục bộ hoặc [Cloud Shell](https://cloud.google.com/shell)
* Công cụ điều khiển web

Chúng tôi sẽ giải thích cách đầu tiên trong hướng dẫn này. Hãy bắt đầu với việc triển khai bằng CLI:
1. Làm theo [phần "Trước khi bắt đầu"](https://cloud.google.com/compute/docs/instances/create-start-instance#before-you-begin) để cài đặt và cấu hình công cụ dòng lệnh gcloud. Chú ý đến khu vực và vùng mặc định, chọn những khu vực gần bạn hoặc khách hàng. Bạn có thể đo độ trễ bằng cách sử dụng [gcping.com](https://gcping.com) để chọn ra vị trí gần nhất.
2. Điều chỉnh các biến lệnh sau bằng cách sử dụng trình soạn thảo theo ý muốn trước khi thực thi khi cần
   * `POLYGON_NETWORK`- chọn `mainnet`hoặc `mumbai`mạng lưới mạng thử nghiệm để chạy
   * `POLYGON_NODETYPE`- chọn`archive`, `fullnode`loại nút để chạy
   * `POLYGON_BOOTSTRAP_MODE`- chọn chế độ bootstrap `snapshot`hoặc `from_scratch`
   * `POLYGON_RPC_PORT`- chọn cổng nút JSON RPC bor để lắng nghe, giá trị mặc định là giá trị được sử dụng khi tạo phiên bản VM và trong các quy tắc tường lửa
   * `EXTRA_VAR`- chọn nhánh Bor và Heimdall, sử dụng `network_version=mainnet-v1`với `mainnet`mạng lưới và `network_version=testnet-v4`với `mumbai`mạng lưới
   * `INSTANCE_NAME`- tên của phiên bản VM với Polygon mà chúng ta sẽ tạo
   * `INSTANCE_TYPE`- GCP[ loại máy](https://cloud.google.com/compute/docs/machine-types), giá trị mặc định được khuyến nghị, Bạn có thể thay đổi sau nếu cần
   * `BOR_EXT_DISK_SIZE`- kích thước đĩa bổ sung tính bằng GB với Bor, giá trị mặc định với `fullnode`được khuyến nghị, Bạn có thể mở rộng sau nếu cần. Tuy nhiên bạn sẽ cần 8192 GB+ với`archive` nút
   * `HEIMDALL_EXT_DISK_SIZE`- kích thước đĩa bổ sung tính bằng GB để sử dụng với Heimdall, giá trị mặc định được khuyến nghị
   * `DISK_TYPE`- [Kiểu đĩa](https://cloud.google.com/compute/docs/disks#disk-types) GCP, SSD được khuyến nghị rất cao. Bạn có thể cần phải tăng tổng hạn ngạch GB của SSD trong khu vực bạn đang quay nút.

3. Sử dụng lệnh sau để tạo một phiên bản với các yêu cầu phần cứng và phần mềm chính xác. Trong ví dụ bên dưới, chúng ta sẽ triển khai Polygon `mainnet`từ `snapshot`với `fullnode`nút :
```bash
   export POLYGON_NETWORK=mainnet
   export POLYGON_NODETYPE=fullnode
   export POLYGON_BOOTSTRAP_MODE=snapshot
   export POLYGON_RPC_PORT=8747
   export GCP_NETWORK_TAG=polygon
   export EXTRA_VAR=(bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=${POLYGON_NETWORK})
   gcloud compute firewall-rules create "polygon-p2p" --allow=tcp:26656,tcp:30303,udp:30303 --description="polygon p2p" --target-tags=${GCP_NETWORK_TAG}
   gcloud compute firewall-rules create "polygon-rpc" --allow=tcp:${POLYGON_RPC_PORT} --description="polygon rpc" --target-tags=${GCP_NETWORK_TAG}
   export INSTANCE_NAME=polygon-0
   export INSTANCE_TYPE=e2-standard-8
   export BOR_EXT_DISK_SIZE=1024
   export HEIMDALL_EXT_DISK_SIZE=500
   export DISK_TYPE=pd-ssd
   gcloud compute instances create ${INSTANCE_NAME} \
   --image-project=ubuntu-os-cloud \
   --image-family=ubuntu-2004-lts \
   --boot-disk-size=20 \
   --boot-disk-type=${DISK_TYPE} \
   --machine-type=${INSTANCE_TYPE} \
   --create-disk=name=${INSTANCE_NAME}-bor,size=${BOR_EXT_DISK_SIZE},type=${DISK_TYPE},auto-delete=no \
   --create-disk=name=${INSTANCE_NAME}-heimdall,size=${HEIMDALL_EXT_DISK_SIZE},type=${DISK_TYPE},auto-delete=no \
   --tags=${GCP_NETWORK_TAG} \
   --metadata=user-data='
   #cloud-config

   bootcmd:
   - screen -dmS polygon su -l -c bash -c "curl -L https://raw.githubusercontent.com/maticnetwork/node-ansible/master/install-gcp.sh | bash -s -- -n '${POLYGON_NETWORK}' -m '${POLYGON_NODETYPE}' -s '${POLYGON_BOOTSTRAP_MODE}' -p '${POLYGON_RPC_PORT}' -e \"'${EXTRA_VAR}'\"; bash"'
```
Phiên bản sẽ được tạo trong vài phút

## Đăng nhập vào phiên bản (tùy chọn) {#login-to-instance-optional}

Sẽ mất vài phút để cài đặt tất cả phần mềm cần thiết và vài giờ để tải xuống ảnh chụp nhanh khi được chọn. Bạn sẽ thấy hoạt động`bor` và `heimdalld`quy trình trình lấp đầy ổ đĩa bổ sung. Bạn có thể chạy các lệnh sau để kiểm tra.
Kết nối với dịch vụ SSH phiên bản bằng cách sử dụng`gcloud` trình bao bọc SSH :
```bash
gcloud compute ssh ${INSTANCE_NAME}
# inside the connected session
sudo su -

ps uax|egrep "bor|heimdalld"
df -l -h
```
Bạn có thể sử dụng lệnh sau để theo dõi tiến trình cài đặt, rất thuận tiện cho`snapshot` bootstrap
```bash
# inside the connected session
screen -dr
```
Sử dụng`Control+a d` tổ hợp phím để ngắt kết nối khỏi quá trình xem xét tiến trình.

Bạn có thể sử dụng các lệnh sau để xem xét nhật ký Bor và Heimdall:
```bash
# inside the connected session
journalctl -fu bor
journalctl -fu heimdalld
```
:::note
Dữ liệu blockchain lưu vào các ổ đĩa bổ sung được giữ theo mặc định khi xóa phiên bản VM. Bạn cần xóa các đĩa bổ sung theo cách thủ công nếu không cần dữ liệu này nữa.
:::

Khi kết thúc, bạn sẽ nhận được một tiến trình như được hiển thị trên sơ đồ bên dưới:<img src={useBaseUrl("img/mainnet/polygon-instance.svg")} />

Nếu bạn gặp vấn đề với hướng dẫn này - vui lòng thiết lập [vấn đề](https://github.com/maticnetwork/matic-docs/issues) hoặc [tạo PR](https://github.com/maticnetwork/matic-docs/pulls) trên [GitHub](https://github.com/maticnetwork/matic-docs).
