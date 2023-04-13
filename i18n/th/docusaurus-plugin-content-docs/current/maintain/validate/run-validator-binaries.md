---
id: run-validator-binaries
title: เรียกใช้โหนดตัวตรวจสอบความถูกต้องจากไบนารี
sidebar_label: Using Binaries
description: ใช้ไบนารีเพื่อตั้งค่าโหนดตัวตรวจสอบความถูกต้องของคุณ
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
ขั้นตอนในคู่มือนี้เกี่ยวกับการรอรับบริการ H**eimdall **และ B**or **เพื่อซิงค์อย่างสมบูรณ์อีกวิธีหนึ่ง คุณสามารถใช้ไฟล์ Snapshot ที่ได้รับการดูแลรักษาไว้ ซึ่งจะช่วยลดเวลาการซิงค์ลงเหลือไม่กี่ชั่วโมง
สำหรับคำสั่งโดยละเอียด โปรดดูที่ [<ins>คำแนะนำเกี่ยวกับ Snapshot สำหรับ Heimdall และ Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233)

สำหรับลิงการดาวน์โหลดแบบ[<ins>แนปชช็อต ดูเซปคอน เชน</ins>](https://snapshot.polygon.technology/)

:::

คำแนะนำนี้จะช่วยคุณดำเนินการเรียกใช้โหนดผู้ตรวจสอบความถูกต้องของ Polygon จากไบนารี

สำหรับข้อกำหนดของระบบ ติดตามคู่มือ[การใช้งานระบบตัวตรวจสอบความถูกต้อง](validator-node-system-requirements.md)

หากคุณต้องการเริ่มและเรียกใช้โหนดตัวตรวจสอบความถูกต้องผ่าน Ansible [ดูโหนดตัวตรวจสอบความถูกต้องด้วย](run-validator-ansible.md) Ansible

:::caution

มีพื้นที่จำกัดสำหรับรับสมัครผู้ตรวจสอบใหม่ตัวตรวจสอบความถูกต้องใหม่สามารถรวมชุดที่ทำงานได้เท่านั้น เมื่อตัวตรวจสอบความถูกต้องที่ใช้งานอยู่แล้ว

:::

## ข้อกำหนดเบื้องต้น {#prerequisites}

* คุณต้องมีอุปกรณ์สองเครื่อง เครื่องหนึ่งใช้เป็น [Sentry](/docs/maintain/glossary.md#sentry) และอีกเครื่องหนึ่งใช้เป็น [ผูู้ตรวจสอบ](/docs/maintain/glossary.md#validator)
* ให้ติดตั้ง `build-essential` ทั้งในเครื่อง Sentry และเครื่องผู้ตรวจสอบ

  วิธีการติดตั้ง:

  ```sh
  sudo apt-get install build-essential
  ```

* ให้ติดตั้ง Go 1.18  ทั้งในเครื่อง Sentry และเครื่องผู้ตรวจสอบ

  วิธีการติดตั้ง:

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* RabbitMQ ติดตั้งบนทั้งเครื่องส่งและเครื่องตัวตรวจสอบความถูกต้อง

นี่คือคำสั่งในการติดตั้ง RabbitMQ:

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

ตรวจสอบข้อมูลเพิ่มเติมเกี่ยวกับการดาวน์โหลดและติดตั้ง RabbitMQ [<ins>ที่นี่</ins>](https://www.rabbitmq.com/download.html)

:::


:::info
โปรดติดตามขั้นตอนบน[<ins>คู่มือการ bloxtray</ins>](/maintain/validate/bloxroute.md) เพื่อเชื่อมต่อโหนดของคุณกับเกตเวย์ bloxtrire
:::

## ภาพรวม {#overview}

เพื่อเข้าถึงโหนดผู้ตรวจสอบความถูกต้องซึ่งกำลังทำงานอยู่ ให้ดำเนินการตาม **ลำดับขั้นตอน** นี้

:::caution

คุณจะประสบปัญหาเกี่ยวกับการกำหนดค่า หากคุณไม่ทำตามลำดับขั้นตอน
สิ่งสำคัญดังที่ต้องพึงระวังคือ ต้องตั้งค่าโหนด Sentry ก่อนโหนดผู้ตรวจสอบความถูกต้องเสมอ

:::

1. เตรียมอุปกรณ์สองเครื่อง เครื่องหนึ่งจะใช้กับโหนด Sentry และอีกเครื่องหนึ่งจะใช้กับโหนดผู้ตรวจสอบความถูกต้อง
2. โปรดติดตั้งไบนารีของ Heimdall และ Bor ในอุปกรณ์ทั้งสองซึ่งใช้กับ Sentry และผู้ตรวจสอบ
3. ตั้งค่าไฟล์บริการ Heimdall และ Bor ในอุปกรณ์ทั้งสองซึ่งใช้กับ Sentry และผู้ตรวจสอบ
4. ตั้งค่าบริการ Heimdall และ Bor ทั้งในอุปกรณ์ซึ่งใช้กับ Sentry และผู้ตรวจสอบ
5. กำหนดค่าโหนด Sentry
6. เริ่มโหนด Sentry
7. กำหนดค่าโหนดผู้ตรวจสอบความถูกต้อง
8. กำหนดคีย์เจ้าของและคีย์ผู้ลงนาม
9. เริ่มต้นโหนดผู้ตรวจสอบความถูกต้อง
10. ตรวจสอบความสมบูรณ์ของโหนดกับชุมชน

## การติดตั้งไบนารี {#installing-the-binaries}

ติดตั้งไบนารีในอุปกรณ์ทั้งสองซึ่งใช้กับ Sentry และผู้ตรวจสอบ

### การติดตั้ง Heimdall {#installing-heimdall}

[Heimdall](/docs/pos/heimdall/overview) เป็นเลเยอร์ผู้ตรวจสอบ Proof-of-Stake
ซึ่งทำหน้าที่รับผิดชอบในการทำเช็คพอยต์เพื่อนำเสนอบล็อก Plasma ไปที่ Ethereum Mainnet

เวอร์ชั่นล่าสุด [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) มีการปรับปรุงสองสามอย่าง เช่น :
1. การจำกัดขนาดข้อมูลในธุรกรรมการซิงค์สถานะไว้ที่:
    * **30Kb** เมื่อแสดงในรูปแบบ**ไบต์**
    * **60Kb** เมื่อแสดงในรูปแบบ**สตริง**
2. เพิ่ม**เวลาหน่วง**ระหว่างอีเวนต์สัญญาของผู้ตรวจสอบที่แตกต่างกัน เพื่อให้แน่ใจว่าพูลหน่วยความจำจะไม่ถูกเติมเต็มอย่างรวดเร็วในกรณีที่เกิดอีเวนต์จำนวนมากซึ่งอาจขัดขวางความคืบหน้าของ Chain ได้

ตัวอย่างต่อไปนี้แสดงให้เห็นว่าขนาดข้อมูลถูกจำกัดอย่างไร:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

โคลน[พื้นที่เก็บของ Heimdall](https://github.com/maticnetwork/heimdall/):

```sh
git clone https://github.com/maticnetwork/heimdall
```

ไปยัง[เวอร์ชันที่นำออกใช้](https://github.com/maticnetwork/heimdall/releases)ที่ถูกต้อง:

```sh
git checkout RELEASE_TAG
```

โดยที่ `RELEASE_TAG` เป็นแท็กเวอร์ชันที่นำออกใช้ซึ่งคุณได้ติดตั้งไว้

ตัวอย่างเช่น:

```sh
git checkout v0.3.0
```

เมื่อคุณเข้าสู่เวอร์ชันที่นำออกใช้ถูกต้องแล้ว โปรดติดตั้ง Heimdall:

```sh
make install
source ~/.profile
```

ตรวจสอบการติดตั้ง Heimdall:

```sh
heimdalld version --long
```

:::note

ก่อนที่จะดำเนินการต่อไป ต้องติดตั้ง Heimdall ทั้งในอุปกรณ์ซึ่งใช้กับ Sentry และอุปกรณ์ซึ่งใช้กับผู้ตรวจสอบ

:::

### การติดตั้ง Bor {#installing-bor}

[Bor](/docs/pos/bor) คือตัวดำเนินการsidechain ที่ทำหน้าที่เป็นชั้นการผลิตบล็อกซึ่งซิงค์กับ Heimdall เพื่อเลือกผู้สร้างบล็อกและเวอร์ชั่นสำหรับแต่ละ [Span](/docs/maintain/glossary.md#span) และ [Sprint](/docs/maintain/glossary.md#sprint)

โคลน [พื้นที่เก็บของ Bor](https://github.com/maticnetwork/bor):

```sh
git clone https://github.com/maticnetwork/bor
```

ไปยัง[เวอร์ชันที่นำออกใช้](https://github.com/maticnetwork/bor/releases)ที่ถูกต้อง:

```sh
git checkout RELEASE_TAG
```

โดยที่ `RELEASE_TAG` เป็นแท็กเวอร์ชันที่นำออกใช้ซึ่งคุณได้ติดตั้งไว้

ตัวอย่างเช่น:

```sh
git checkout v0.3.3
```

ติดตั้ง Bor:

```sh
make bor-all
```

สร้างลิงก์สัญลักษณ์:

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

ตรวจสอบการติดตั้ง Bor:

```sh
bor version
```

:::note

ก่อนที่จะดำเนินการต่อไป ต้องติดตั้ง Bor ทั้งในอุปกรณ์ซึ่งใช้กับ Sentry และอุปกรณ์ซึ่งใช้กับผู้ตรวจสอบ

:::

## การตั้งค่าไฟล์โหนด {#setting-up-node-files}

:::note

ให้ตั้งค่าไฟล์โหนดทั้งในอุปกรณ์ซึ่งใช้กับ Sentry และอุปกรณ์ซึ่งใช้กับผู้ตรวจสอบ

:::

### การได้มาซึ่งพื้นที่เก็บเริ่มต้น {#fetching-the-launch-repository}

โคลน[พื้นที่เก็บเริ่มต้น](https://github.com/maticnetwork/launch):

```sh
git clone https://github.com/maticnetwork/launch
```

### การตั้งค่าไดเรกทอรีเริ่มต้น {#setting-up-the-launch-directory}

#### ในอุปกรณ์ Sentry {#on-the-sentry-machine}

ให้สร้างไดเรกทอรี `node`:

```sh
mkdir -p node
```

คัดลอกไฟล์และสคริปต์ต่างๆ จากไดเรกทอรี `launch` ไปยังไดเรกทอรี `node`:

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### ในอุปกรณ์ผู้ตรวจสอบ {#on-the-validator-machine}

ให้สร้างไดเรกทอรี `node`:

```sh
mkdir -p node
```

คัดลอกไฟล์และสคริปต์จากไดเรกทอรี `launch` ไปยังไดเรกทอรี `node`:

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### การตั้งค่าไดเรกทอรีของเครือข่าย {#setting-up-the-network-directories}

:::note

เรียกใช้ส่วนนี้ทั้งในอุปกรณ์ Sentry และอุปกรณ์ผู้ตรวจสอบ

:::

#### การตั้งค่า Heimdall {#setting-up-heimdall}

เปลี่ยนเป็นไดเรกทอรี `node`:

```sh
cd ~/node/heimdall
```

เรียกใช้สคริปต์ตั้งค่า:

```sh
bash setup.sh
```

#### การกำหนดค่า Bor {#setting-up-bor}

เปลี่ยนเป็นไดเรกทอรี `node`:

```sh
cd ~/node/bor
```

เรียกใช้สคริปต์ตั้งค่า:

```sh
bash setup.sh
```

## การตั้งค่าบริการ {#setting-up-the-services}

:::note

เรียกใช้ส่วนนี้ทั้งในอุปกรณ์ Sentry และอุปกรณ์ผู้ตรวจสอบ

:::

ไปยังไดเรกทอรี `node`:

```sh
cd ~/node
```

เรียกใช้สคริปต์ตั้งค่า:

```sh
bash service.sh
```

คัดลอกไฟล์บริการไปยังไดเรกทอรีของระบบ:

```sh
sudo cp *.service /etc/systemd/system/
```

## การกำหนดค่าโหนด Sentry {#configuring-the-sentry-node}

เริ่มต้นด้วยการล็อกอินเข้าไปยังเครื่องรีโมท Sentry

### การกำหนดค่าบริการ Heimdall {#configuring-the-heimdall-services}

ให้เปิดไฟล์การกำหนดค่าของ Heimdall เพื่อดำเนินการแก้ไข:

```sh
vi ~/.heimdalld/config/config.toml
```

ใน `config.toml` ให้เปลี่ยนพารามิเตอร์ดังต่อไปนี้:

* `moniker` — ชื่อใดก็ได้ ตัวอย่าง: `moniker = "my-sentry-node"`
* `seeds`— ที่อยู่โหนด Seed ซึ่งประกอบด้วย ID โหนด, ที่อยู่ IP และพอร์ต

  ให้ใช้ค่าต่อไปนี้:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex`— กำหนดค่าเป็น `true` เพื่อเปิดใช้งานการแลกเปลี่ยนเพียร์ ตัวอย่าง: `pex = true`
* `private_peer_ids` - ID โหนดของ Heimdall ที่ติดตั้งบนเครื่องของผู้ตรวจสอบ

  เมื่อต้องการรับ ID โหนดของ Heimdall บนเครื่องของผู้ตรวจสอบ:

  1. ล็อกอินเข้าไปยังเครื่องผู้ตรวจสอบ
  2. เรียกใช้
     ```sh
     heimdalld tendermint show-node-id
     ```

  ตัวอย่าง: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`

* `prometheus`- กำหนดค่าเป็น `true`เพื่อเปิดใช้งาน Prometeus metrics ตัวอย่าง: `prometheus = true`
* `max_open_connections` — กำหนดค่าเป็น `100` ตัวอย่าง: `max_open_connections = 100`

บันทึกการเปลี่ยนแปลงใน `config.toml`

### กำหนดค่าบริการ Bor {#configuring-the-bor-service}

เปิดไฟล์กำหนดค่าของ Bor เพื่อดำเนินการแก้ไข:

```sh
`vi ~/node/bor/start.sh`
```

ใน `start.sh` ให้เพิ่มที่อยู่ของ Boot node ซึ่งประกอบด้วย ID โหนด ที่อยู่ไอพีและพอร์ต
โดยให้เพิ่มบรรทัดดังต่อไปนี้ในปลายทางของไฟล์:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

บันทึกการเปลี่ยนแปลงใน `start.sh`

### การกำหนดค่าไฟร์วอลล์ {#configuring-a-firewall}

เครื่อง Sentry ต้องมีพอร์ตดังต่อไปนี้เปิดใช้งาน `0.0.0.0/0`

* `26656`- บริการ Heimdall ของคุณจะเชื่อมต่อโหนดของคุณกับโหนดอื่น ๆ ในบริการ Heimdall

* `30303`- บริการ Bor ของคุณจะเชื่อมต่อโหนดของคุณกับโหนดอื่น ๆ ในบริการ Bor

* `22` เพื่อให้ผู้ตรวจสอบสามารถ SSH ได้จากทุกที่ที่เขาอยู่

## การเริ่มโหนด Sentry {#starting-the-sentry-node}

คุณจะต้องเริ่มบริการ Heimdall ก่อน เมื่อมีการซิงค์บริการ Heimdall แล้ว คุณจึงจะเริ่มบริการ Bor

:::note

ตามที่กล่าวไว้ก่อนหน้านี้ บริการ Heimdall จะใช้เวลาหลายวันในการซิงค์ข้อมูลตั้งแต่ต้นจนครบถ้วน

อีกวิธีหนึ่ง คุณสามารถใช้ไฟล์ Snapshot ที่ได้รับการดูแลรักษาไว้ ซึ่งจะช่วยลดเวลาการซิงค์ลงเหลือไม่กี่ชั่วโมง
สำหรับคำสั่งโดยละเอียด โปรดดูที่ [<ins>คำแนะนำเกี่ยวกับ Snapshot สำหรับ Heimdall และ Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233)

หากต้องการดาวน์โหลดลิงก์ Snapshot โปรดดูที่ [Polygon Chains Snapshots1](https://snapshot.polygon.technology/)

:::

### การเริ่มบริการ Heimdall {#starting-the-heimdall-service}

เริ่มบริการ Heimdall

```sh
sudo service heimdalld start
```

เริ่ม Heimdall rest-server:

```sh
sudo service heimdalld-rest-server start
```

ตรวจสอบบันทึกการบริการ Heimdall:

```sh
journalctl -u heimdalld.service -f
```

:::note

ในบันทึกนั้นคุณจะเห็นข้อผิดพลาดดังต่อไปนี้:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

บันทึกเหล่านี้หมายความว่าโหนดใดโหนดหนึ่งในเครือข่ายปฏิเสธการเชื่อมต่อกับโหนดของคุณ
รอให้โหนดของคุณดึงโหนดอื่น ๆ ในเครือข่าย คุณไม่ต้องทำอะไร
เพื่อแก้ไขข้อผิดพลาดดังกล่าว

:::

ตรวจสอบบันทึก Rest-Server ของ Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

ตรวจสอบสถานะการซิงค์ของ Heimdall:

```sh
curl localhost:26657/status
```

ในเอาต์พุต ค่า `catching_up` คือ:

* `true`- บริการ Heimdall อยู่ระหว่างการซิงค์
* `false`- ซิงค์บริการ Heimdall ครบถ้วนแล้ว

รอให้บริการ Heimdall ซิงค์จนครบถ้วน

### การเริ่มบริการ Bor {#starting-the-bor-service}

เมื่อซิงค์บริการ Heimdall แล้ว ให้เริ่มบริการ Bor

เริ่มบริการ Bor:

```sh
sudo service bor start
```

ตรวจสอบบันทึกของบริการ Bor:

```sh
journalctl -u bor.service -f
```

## การกำหนดค่าโหนดผู้ตรวจสอบความถูกต้อง {#configuring-the-validator-node}

:::note

เพื่อทำให้ส่วนนี้สมบูรณ์ คุณต้องมีปลายทาง RPC ของโหนด Ethereum Mainnet ที่ซิงค์
อย่างครบถ้วนแล้ว

:::

### การกำหนดค่าบริการ Heimdall {#configuring-the-heimdall-service}

ล็อกอินเข้าเครื่องผู้ตรวจสอบระยะไกล

เปิดเพื่อทำการแก้ไข `vi ~/.heimdalld/config/config.toml`

ใน `config.toml` ให้เปลี่ยนรายการต่อไปนี้:

* `moniker` — ชื่อใดก็ได้ ตัวอย่าง: `moniker = "my-validator-node"`
* `pex` — กำหนดค่าเป็น `false` เพื่อปิดใช้งานการแลกเปลี่ยนเพียร์ ตัวอย่าง: `pex = false`
* `private_peer_ids` - ให้ความเห็นแก่ค่าเพื่อปิดใช้งาน ตัวอย่าง: `# private_peer_ids = ""`

  เพื่อได้มาซึ่ง ID โหนดของ Heimdall ในเครื่อง Sentry:

  1. เข้าสู่ระบบในเครื่อง Sentry
  1. เรียกใช้ `heimdalld tendermint show-node-id`

ตัวอย่าง: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus`- กำหนดค่าเป็น `true`เพื่อเปิดใช้งาน Prometeus metrics ตัวอย่าง: `prometheus = true`

บันทึกการเปลี่ยนแปลงใน `config.toml`

เปิดเพื่อทำการแก้ไข `vi ~/.heimdalld/config/heimdall-config.toml`

ใน `heimdall-config.toml` ให้เปลี่ยนรายการต่อไปนี้:

* `eth_rpc_url` - ปลายทาง RPC สำหรับโหนด Ethereum Mainnet ที่ซิงค์อย่างสมบูรณ์
เช่น Infura `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

ตัวอย่าง: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

บันทึกการเปลี่ยนแปลงใน `heimdall-config.toml`

### กำหนดค่าบริการ Bor {#configuring-the-bor-service-1}

เปิดเพื่อทำการแก้ไข `vi ~/.bor/data/bor/static-nodes.json`

ใน `static-nodes.json` ให้เปลี่ยนรายการต่อไปนี้:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — ID โหนดและ
ที่อยู่ไอพีของ Bor ซึ่งกำหนดไว้ในเครื่อง Sentry

    เมื่อต้องการรับ ID โหนดของ Bor บนเครื่อง Sentry:

  1. เข้าสู่ระบบในเครื่อง Sentry
  2. เรียกใช้ `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`

  ตัวอย่าง: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`

บันทึกการเปลี่ยนแปลงใน `static-nodes.json`

## การตั้งค่าคีย์ของเจ้าของและผู้ลงนาม {#setting-the-owner-and-signer-key}

ในส่วน Polygon เราแนะนำให้คุณเก็บคีย์ของเจ้าของและผู้ลงนามไว้ในสถานที่แยกต่างหาก

* ผู้ลงนาม - เป็นที่อยู่ซึ่งใช้ในการลงนามใน
[ธุรกรรมเช็คพอยต์](/docs/maintain/glossary.md#checkpoint-transaction) เราแนะนำให้คุณ
เก็บ ETH อย่างน้อย 1 อันไว้ในที่อยู่ของผู้ลงนาม
* เจ้าของ - เป็นที่อยู่ที่ใช้ในการดำเนินธุรกรรมการ Stake คำแนะนำคือ ให้เก็บโทเค็น MATIC
ในที่อยู่ของเจ้าของ

### การสร้างคีย์ส่วนตัวของ Heimdall {#generating-a-heimdall-private-key}

คุณต้องสร้างคีย์ส่วนตัวของ Heimdall ในเครื่องผู้ตรวจสอบเท่านั้น อย่าสร้างคีย์ส่วนตัว
ของ Heimdall ในเครื่อง Sentry

เมื่อต้องการสร้างคีย์ส่วนตัว ให้เรียกใช้:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

โดยที่

* ETHEREUM_PRIVATE_KEY — เป็นคีย์ส่วนตัวของวอลเล็ต Ethereum ของคุณ

การดำเนินการนั้นจะสร้าง `priv_validator_key.json` ให้ย้ายไฟล์ JSON ที่คุณสร้างไปยังการกำหนดค่าของ Heimdall
ไดเรกทอรี:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### การสร้างไฟล์ Keystore ของ Bor {#generating-a-bor-keystore-file}

คุณต้องสร้างไฟล์ Keystore ของ Bor บนเครื่องของผู้ตรวจสอบเท่านั้น อย่าสร้างไฟล์ Keystore ของ Bor
ในเครื่อง Sentry

เมื่อต้องการสร้างคีย์ส่วนตัว ให้เรียกใช้:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

โดยที่

* ETHEREUM_PRIVATE_KEY — เป็นคีย์ส่วนตัวของวอลเล็ต Ethereum ของคุณ

เมื่อได้รับแจ้ง ให้ตั้งค่ารหัสผ่านให้กับไฟล์ Keystore

การดำเนินการนี้จะสร้างไฟล์ Keystore `UTC-<time>-<address>`

ย้ายไฟล์ Keystore ที่สร้างขึ้นไปยังไดเรกทอรีการกำหนดค่า Bor:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### เพิ่ม password.txt {#add-password-txt}

ตรวจสอบให้แน่ใจว่าได้สร้างไฟล์ `password.txt` แล้วเพิ่มรหัสผ่านของไฟล์ Keystore ของ Bor ในไฟล์·`~/.bor/password.txt`


### เพิ่มที่อยู่ Ethereum ของคุณ {#add-your-ethereum-address}

เปิดเพื่อทำการแก้ไข `vi /etc/matic/metadata`

ใน `metadata` ให้เพิ่มที่อยู่กระเป๋า Ethereum ของคุณตัวอย่าง: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`

บันทึกการเปลี่ยนแปลงใน `metadata`

## การเริ่มโหนดผู้ตรวจสอบความถูกต้อง {#starting-the-validator-node}

ในขั้นนี้ คุณต้องมี:

* บริการ Heimdall ในเครื่อง Sentry ซึ่งซิงค์และกำลังใช้งานอยู่
* บริการ Bor ในเครื่อง Sentry กำลังใช้งานอยู่
* บริการ Heimdall และบริการ Bor ในเครื่องผู้ตรวจสอบถูกปรับแต่ง
* คีย์เจ้าของและคีย์ผู้ลงนามของคุณถูกปรับแต่ง

### การเริ่มบริการ Heimdall {#starting-the-heimdall-service-1}

ตอนนี้คุณจะเริ่มบริการ Heimdall ในเครื่องผู้ตรวจสอบ เมื่อมีการซิงค์บริการ Heimdall แล้ว คุณ
จะเริ่มบริการ Bor ในเครื่องผู้ตรวจสอบ

เริ่มบริการ Heimdall:

```sh
sudo service heimdalld start
```

เริ่ม Heimdall rest-server:

```sh
sudo service heimdalld-rest-server start
```

เริ่มบริดจ์ของ Heimdall:

```sh
sudo service heimdalld-bridge start
```

ตรวจสอบบันทึกการบริการ Heimdall:

```sh
journalctl -u heimdalld.service -f
```

ตรวจสอบบันทึก Rest-Server ของ Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

ตรวจสอบบันทึกการบริดจ์ของ Heimdall:

```sh
journalctl -u heimdalld-bridge.service -f
```

ตรวจสอบสถานะการซิงค์ของ Heimdall:

```sh
curl localhost:26657/status
```

ในเอาต์พุต ค่า `catching_up` คือ:

* `true`- บริการ Heimdall อยู่ระหว่างการซิงค์
* `false`- ซิงค์บริการ Heimdall แล้ว

รอให้บริการ Heimdall ซิงค์อย่างสมบูรณ์

### การเริ่มบริการ Bor {#starting-the-bor-service-1}

เมื่อมีการซิงค์บริการ Heimdall ในเครื่องผู้ตรวจสอบ ให้เริ่มบริการ Bor ใน
เครื่องผู้ตรวจสอบ

เริ่มบริการ Bor:

```sh
sudo service bor start
```

ตรวจสอบบันทึกของบริการ Bor:

```sh
journalctl -u bor.service -f
```

## การตรวจสอบสุขภาพกับชุมชน {#health-checks-with-the-community}

ตอนนี้ เมื่อโหนดของ Sentry และโหนดผู้ตรวจสอบของคุณกำลังซิงค์และกำลังใช้งานอยู่ ให้ไปที่
[Discord](https://discord.com/invite/0xPolygon) และขอให้ชุมชนตรวจสอบสุขภาพโหนดของคุณ

:::note

ในฐานะตัวตรวจสอบความถูกต้อง คือคำสั่งในการมีเช็คที่อยู่ผู้ลงนามเสมอหากยอดคงเหลือ ETH ถึงต่ำกว่า 0.5 Eth จึงควรเติมเงินการเพิกเฉยนี้จะผลักดันโหนดออกจากธุรกรรมเช็คพอยต์การส่งต่อ

:::

## ขั้นตอนถัดไป: การ Stake {#next-steps-staking}

ตอนนี้ เมื่อคุณได้ตรวจสุขภาพโหนด Sentry และโหนดผู้ตรวจสอบของคุณเรียบร้อย ให้ไปที่
คำแนะนำว่าด้วย [การ Stake](/docs/maintain/validator/core-components/staking.md) เพื่อเริ่มการสนับสนุนเครือข่าย
