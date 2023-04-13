---
id: run-validator-ansible
title: เรียกใช้โหนดตัวตรวจสอบความถูกต้องพร้อมกับ Andle
sidebar_label: Using Ansible
description: ใช้โหนดตัวตรวจสอบความถูกต้องของคุณบน Polygon
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

ขั้นตอนในคำแนะนำนี้จะเกี่ยวข้องกับการรอให้บริการ **Heimdall** และ **Bor** ซิงค์อย่างสมบูรณ์
กระบวนการนี้จะใช้เวลาหลายวันจึงจะเสร็จสมบูรณ์ อีกวิธีหนึ่ง คุณสามารถใช้ไฟล์ Snapshot ที่ได้รับการดูแลรักษาไว้ ซึ่งจะช่วยลดเวลาการซิงค์ลงเหลือไม่กี่ชั่วโมง ดูคำแนะนำโดยละเอียดได้ที่[<ins>คำแนะนำเกี่ยวกับไฟล์ Snapshot สำหรับ Heimdall และ Bor</ins>](/docs/operate/snapshot-instructions-heimdall-bor)

สำหรับลิงการดาวน์โหลดแบบ[<ins>แนปชช็อต ดูเซปคอน เชน</ins>](https://snapshot.polygon.technology/)
:::

ส่วนนี้จะแนะนำคุณเกี่ยวกับการเริ่มต้นและเรียกใช้โหนดผู้ตรวจสอบความถูกต้องผ่าน Ansible Playbook

สำหรับข้อกำหนดของระบบ โปรดดูที่ [ข้อกำหนดสำหรับระบบโหนดผู้ตรวจสอบความถูกต้อง](validator-node-system-requirements.md)

หากคุณต้องการเริ่มและเรียกใช้โหนดผู้ตรวจสอบความถูกต้องจากไบนารี โปรดดูที่ [เรียกใช้โหนดผู้ตรวจสอบความถูกต้องจากไบนารี](run-validator-binaries.md)

:::caution

มีพื้นที่จำกัดสำหรับรับสมัครผู้ตรวจสอบใหม่ตัวตรวจสอบความถูกต้องใหม่สามารถรวมชุดที่ทำงานได้เท่านั้น เมื่อตัวตรวจสอบความถูกต้องที่ใช้งานอยู่แล้ว

:::

## ข้อกำหนดเบื้องต้น {#prerequisites}

* คอมพิวเตอร์สามเครื่อง — เครื่องที่คุณจะเรียกใช้ Ansible Playbook หนึ่งเครื่อง; เครื่องระยะไกลสองเครื่อง นั่นคือ เครื่องสำหรับ [Sentry](/docs/maintain/glossary.md#sentry) หนึ่งเครื่องและ[ผู้ตรวจสอบ](/docs/maintain/glossary.md#validator)หนึ่งเครื่อง
* บนเครื่องเฉพาะที่ ให้ติดตั้ง [Ansible](https://www.ansible.com/) ให้แล้วเสร็จ
* บนเครื่องเฉพาะที่ ให้ติดตั้ง [Python 3.x](https://www.python.org/downloads/) ให้แล้วเสร็จ
* บนเครื่องระยะไกล ให้ตรวจสอบให้แน่ใจว่า*ไม่ได้*ติดตั้ง Go ไว้
* บนเครื่องระยะไกล ให้ใส่คีย์สาธารณะ SSH ของเครื่องเฉพาะที่ไว้บนเครื่องระยะไกลเพื่อให้ Ansible สามารถเชื่อมต่อกับเครื่องเฉพาะที่เหล่านั้นได้
* เรามี Bloxroute ซึ่งเป็นเครือข่ายรีเลย์ให้บริการ หากต้องการเพิ่มเกตเวย์เพื่อเพิ่มเป็น Peer ของคุณโปรดติดต่อ**ทีมรองรับตัวตรวจสอบความ**ถูกต้องใน[ดิสก์ Polygon](https://discord.com/invite/0xPolygon) > ตัวตรวจสอบความถูกต้องหมายเลข POS ผู้ให้ AIDATORS | FULL NODE Partiner > blox rays

:::info

โปรดติดตามขั้นตอนบน[<ins>คู่มือการ bloxtray</ins>](/maintain/validate/bloxroute.md) เพื่อเชื่อมต่อโหนดของคุณกับเกตเวย์ bloxtrire

:::

## ภาพรวม {#overview}

:::caution

คุณต้องทำ**ตามลำดับการกระทำที่เรียงรายไว้อย่างแน่นอน** ไม่งั้นคุณจะวิ่งเข้าสู่ปัญหาตัวอย่างเช่น **โหนดของ Sentry จะต้องตั้งค่าก่อนโหนดตัวตรวจสอบความถูกต้องเสมอ**

:::

เมื่อต้องการเรียกใช้โหนดผู้ตรวจสอบความถูกต้อง ให้ทำดังต่อไปนี้:

1. เตรียมเครื่องทั้งสามไว้ให้พร้อม
1. ติดตั้งโหนด Sentry ผ่าน Ansible
1. ติดตั้งโหนดผู้ตรวจสอบความถูกต้องผ่าน Ansible
1. กำหนดค่าโหนด Sentry
1. เริ่มโหนด Sentry
1. กำหนดค่าโหนดผู้ตรวจสอบความถูกต้อง
1. กำหนดคีย์เจ้าของและคีย์ผู้ลงนาม
1. เริ่มต้นโหนดผู้ตรวจสอบความถูกต้อง
1. ตรวจสอบความสมบูรณ์ของโหนดกับชุมชน

## ติดตั้งโหนด Sentry {#set-up-the-sentry-node}

บนเครื่องเฉพาะที่ของคุณ ให้โคลน [node-ansible repository](https://github.com/maticnetwork/node-ansible):

```sh
git clone https://github.com/maticnetwork/node-ansible
```

เปลี่ยนให้เป็น Repository ที่ถูกโคลน:

```sh
cd node-ansible
```

เพิ่มที่อยู่ IP ของเครื่องระยะไกลที่จะกลายเป็นโหนด Sentry และโหนดผู้ตรวจสอบความถูกต้องในไฟล์ `inventory.yml`

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

ตัวอย่าง:

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

ตรวจสอบว่าสามารถเข้าถึงเครื่อง Sentry ระยะไกลได้หรือไม่ บนเครื่องเฉพาะที่ ให้เรียกใช้:

```sh
$ ansible sentry -m ping
```

คุณควรได้ผลลัพธ์ดังต่อไปนี้:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

ทำการทดสอบการทำงานหลังจากติดตั้งโหนด Sentry:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

จะได้ผลลัพธ์แบบนี้:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

เรียกใช้การติดตั้งโหนด Sentry ด้วยสิทธิ์แบบ Sudo:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

เมื่อการติดตั้งเสร็จสมบูรณ์ คุณจะเห็นข้อความแสดงการแล้วเสร็จบนเครื่องเทอร์มินัล

:::note

หากคุณประสบปัญหาและต้องการเริ่มต้นใหม่ ให้เรียกใช้:

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## ติดตั้งโหนดผู้ตรวจสอบความถูกต้อง {#set-up-the-validator-node}

เมื่อมาถึงจุดนี้ แสดงว่าคุณได้ติดตั้งโหนด Sentry แล้ว

บนเครื่องของคุณ คุณยังต้องติดตั้ง Ansible Playbook ไว้ด้วย เพื่อเรียกใช้การติดตั้งโหนดผู้ตรวจสอบความถูกต้อง

ตรวจสอบว่าเครื่องของผู้ตรวจสอบที่อยู่ระยะไกลสามารถเข้าถึงได้หรือไม่บน`ansible validator -m ping`เครื่องท้องถิ่น

คุณควรได้ผลลัพธ์ดังต่อไปนี้:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

ทำการทดสอบการทำงานหลังจากติดตั้งโหนดผู้ตรวจสอบความถูกต้อง:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

คุณควรได้รับเป็นผลลัพธ์ดังต่อไปนี้:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

เรียกใช้การติดตั้งโหนดผู้ตรวจสอบการทำธุรกรรมด้วยสิทธิ์แบบ Sudo:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

เมื่อการติดตั้งเสร็จสมบูรณ์ คุณจะเห็นข้อความแสดงการแล้วเสร็จบนเครื่องเทอร์มินัล

:::note

หากคุณประสบปัญหาและต้องการเริ่มต้นใหม่ ให้เรียกใช้:

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## กำหนดค่าโหนด Sentry {#configure-the-sentry-node}

ให้เข้าสู่ระบบเครื่อง Sentry ที่อยู่ระยะไกล

### กำหนดค่าบริการ Heimdall {#configure-the-heimdall-service}

เปิด `config.toml`·เพื่อแก้ไข `vi ~/.heimdalld/config/config.toml`

ให้เปลี่ยนสิ่งต่อไปนี้:

* `moniker` — ชื่อใด ๆ ตัวอย่าง: `moniker = "my-full-node"`
* `seeds`— ที่อยู่โหนด Seed ซึ่งประกอบด้วย ID โหนด, ที่อยู่ IP และพอร์ต

  ให้ใช้ค่าต่อไปนี้:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex`— กำหนดค่าเป็น `true` เพื่อเปิดใช้งานการแลกเปลี่ยนเพียร์ ตัวอย่าง: `pex = true`
* `private_peer_ids` - ID โหนดของ Heimdall ที่ติดตั้งบนเครื่องของผู้ตรวจสอบ

  เมื่อต้องการรับ ID โหนดของ Heimdall บนเครื่องของผู้ตรวจสอบ:

  1. ล็อกอินเข้าสู่เครื่องของผู้ตรวจสอบ
  1. เรียกใช้ `heimdalld tendermint show-node-id`

  ตัวอย่างเช่น: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`

* `prometheus`- กำหนดค่าเป็น `true`เพื่อเปิดใช้งาน Prometeus metrics ตัวอย่าง: `prometheus = true`
* `max_open_connections` — กำหนดค่าเป็น `100` ตัวอย่าง: `max_open_connections = 100`

บันทึกการเปลี่ยนแปลงใน `config.toml`

### กำหนดค่าบริการของ Bor {#configure-the-bor-service}

เปิดเพื่อแก้ไข `vi ~/node/bor/start.sh`

ใน `start.sh` ให้เพิ่มที่อยู่โหนดที่ประกอบด้วย ID โหนด, ที่อยู่ IP และพอร์ตโดยเพิ่มบรรทัดต่อไปนี้ในตอนท้าย:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

บันทึกการเปลี่ยนแปลงใน `start.sh`

เปิดเพื่อทำการแก้ไข `vi ~/.bor/data/bor/static-nodes.json`

ใน `static-nodes.json` ให้เปลี่ยนแปลงดังต่อไปนี้:

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"` — ID โหนดและที่อยู่ IP ของ Bor ที่ติดตั้งบนเครื่องของผู้ตรวจสอบ

  เมื่อต้องการรับ ID โหนดของ Bor บนเครื่องของผู้ตรวจสอบ:

  1. ล็อกอินเข้าสู่เครื่องของผู้ตรวจสอบ
  1. เรียกใช้ `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`

  ตัวอย่าง: `"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`

บันทึกการเปลี่ยนแปลงใน `static-nodes.json`

### กำหนดค่าไฟร์วอลล์ {#configure-firewall}

เครื่อง Sentry ต้องมีพอร์ตต่อไปนี้พร้อมใช้งานกับ `0.0.0.0/0`:

* 26656- บริการ Heimdall ของคุณจะเชื่อมต่อโหนดของคุณกับโหนดอื่นโดยใช้บริการ Heimdall

* 30303- บริการ Bor ของคุณจะเชื่อมต่อโหนดของคุณกับโหนดอื่นโดยใช้บริการ Bor

* 22- เพื่อให้ผู้ตรวจสอบสามารถ SSH ได้จากทุกที่ที่ตนเองอยู่

:::note

อย่างไรก็ตาม หากใช้การเชื่อมต่อ VPN พวกเขาจะสามารถอนุญาตการเชื่อมต่อ SSH ขาเข้าจากที่อยู่ IP ของ VPN เท่านั้น

:::

## เริ่มโหนด Sentry {#start-the-sentry-node}

คุณจะต้องเริ่มบริการ Heimdall ก่อน เมื่อบริการ Heimdall ซิงค์เสร็จแล้ว คุณจะต้องเริ่มบริการ Bor

:::note

บริการ Heimdall จะใช้เวลาหลายวันในการซิงค์อย่างสมบูรณ์ทั้งหมดตั้งแต่เริ่มต้น

อีกวิธีหนึ่ง คุณสามารถใช้ไฟล์ Snapshot ที่ได้รับการดูแลรักษาไว้ ซึ่งจะช่วยลดเวลาการซิงค์ลงเหลือไม่กี่ชั่วโมง ดูคำแนะนำโดยละเอียดได้ที่[<ins>คำแนะนำเกี่ยวกับไฟล์ Snapshot สำหรับ Heimdall และ Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233)

สำหรับลิงก์ดาวน์โหลดไฟล์ Snapshot โปรดดู [ไฟล์ Snapshot ของ Polygon Chain](https://snapshot.polygon.technology/)

:::

### เริ่มบริการ Heimdall {#start-the-heimdall-service}

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

เริ่มบริการ Heimdall:

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

ในบันทึก คุณอาจเห็นข้อผิดพลาดดังต่อไปนี้:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

ซึ่งหมายความว่าโหนดใดโหนดหนึ่งในเครือข่ายปฏิเสธการเชื่อมต่อกับโหนดของคุณ คุณไม่จำเป็นต้องดำเนินการใด ๆ กับข้อผิดพลาดเหล่านี้ รอให้โหนดของคุณรวบรวมข้อมูลโหนดอื่น ๆ ในเครือข่าย

:::

ตรวจสอบบันทึกของ Heimdall rest-server:

```sh
journalctl -u heimdalld-rest-server.service -f
```

ตรวจสอบสถานะการซิงค์ของ Heimdall:

```sh
curl localhost:26657/status
```

ในเอาต์พุต ค่า `catching_up` คือ:

* `true`- บริการ Heimdall อยู่ระหว่างการซิงค์
* `false` — บริการ Heimdall ได้รับการซิงค์อย่างสมบูรณ์

รอให้บริการ Heimdall ซิงค์อย่างสมบูรณ์

### เริ่มบริการ Bor {#start-the-bor-service}

เมื่อบริการ Heimdall ซิงค์อย่างสมบูรณ์แล้ว ให้เริ่มบริการ Bor

เริ่มบริการ Bor:

```sh
sudo service bor start
```

ตรวจสอบบันทึกการบริการของ Bor:

```sh
journalctl -u bor.service -f
```

## กำหนดค่าโหนดผู้ตรวจสอบความถูกต้อง {#configure-the-validator-node}

:::note

เพื่อให้ส่วนนี้สมบูรณ์ คุณต้องมีปลายทาง RPC ของโหนด Ethereum Mainnet ที่ซิงค์อย่างสมบูรณ์เตรียมพร้อมไว้

:::

### กำหนดค่าบริการ Heimdall {#configure-the-heimdall-service-1}

เข้าสู่ระบบเครื่องของผู้ตรวจสอบที่อยู่ระยะไกล

เปิด `config.toml`·เพื่อแก้ไข `vi ~/.heimdalld/config/config.toml`

ให้เปลี่ยนสิ่งต่อไปนี้:

* `moniker` — ชื่อใด ๆ ตัวอย่าง: `moniker = "my-validator-node"`
* `pex` — กำหนดค่าเป็น `false` เพื่อปิดใช้งานการแลกเปลี่ยนเพียร์ ตัวอย่าง: `pex = false`
* `private_peer_ids` - ให้ความเห็นแก่ค่าเพื่อปิดใช้งาน ตัวอย่าง: `# private_peer_ids = ""`


  เมื่อต้องการรับ ID โหนดของ Heimdall บนเครื่อง Sentry:

  1. ให้ล็อกอินเข้าสู่เครื่อง Sentry
  1. เรียกใช้ `heimdalld tendermint show-node-id`

  ตัวอย่างเช่น: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — กำหนดค่าเป็น `true` เพื่อเปิดใช้งานเมตริก Prometheus ตัวอย่าง: `prometheus = true`

บันทึกการเปลี่ยนแปลงใน `config.toml`

เปิดเพื่อทำการแก้ไข `vi ~/.heimdalld/config/heimdall-config.toml`

ใน `heimdall-config.toml` ให้เปลี่ยนแปลงดังต่อไปนี้:

* `eth_rpc_url`— ปลายทาง RPC สำหรับโหนด Ethereum Mainnet ที่ซิงค์อย่างสมบูรณ์ เช่น Infura`eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

ตัวอย่างเช่น: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


บันทึกการเปลี่ยนแปลงใน `heimdall-config.toml`

### กำหนดค่าบริการของ Bor {#configure-the-bor-service-1}

เปิดเพื่อแก้ไข `vi ~/.bor/data/bor/static-nodes.json`

ใน `static-nodes.json` ให้เปลี่ยนแปลงดังต่อไปนี้:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — ID โหนดและที่อยู่ IP ของ Bor ที่ติดตั้งบนเครื่อง Sentry

  เมื่อต้องการรับ ID โหนดของ Bor บนเครื่อง Sentry:

  1. ล็อกอินเข้าสู่เครื่อง Sentry
  1. เรียกใช้ `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`

  ตัวอย่าง: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`

บันทึกการเปลี่ยนแปลงใน `static-nodes.json`

## กำหนดคีย์ของเจ้าของและผู้ลงนาม {#set-the-owner-and-signer-key}

บน Polygon คุณควรทำให้คีย์เจ้าของและผู้ลงนามแตกต่างกัน

* ผู้ลงนาม — ที่อยู่กระเป๋าที่ลงนามใน[ธุรกรรมเช็คพอยต์](../glossary#checkpoint-transaction)ขอแนะนำให้เก็บ ETH อย่างน้อย 1 ETH ไว้ในที่อยู่กระเป๋าของผู้ลงนาม
* เจ้าของ — ที่อยู่ที่ทำธุรกรรมการ Stake ขอแนะนำให้เก็บโทเค็น MATIC ไว้ในที่อยู่กระเป๋าของเจ้าของ

### สร้างคีย์ส่วนตัว Heimdall {#generate-a-heimdall-private-key}

คุณต้องสร้างคีย์ส่วนตัว Heimdall บนเครื่องของผู้ตรวจสอบเท่านั้น **อย่าสร้างคีย์ส่วนตัว Heimdall บนเครื่อง Sentry**

เมื่อต้องการสร้างคีย์ส่วนตัว ให้เรียกใช้:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

Ethereum_Private_KEY - คีย์ของ Ethereum กระเป๋าสตางค์ ส่วนตัว

:::

การดำเนินการนั้นจะสร้าง `priv_validator_key.json` ย้ายไฟล์ JSON ที่สร้างขึ้นไปยังไดเรกทอรีการกำหนดค่า Heimdall:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### สร้างไฟล์ Keystore ของ Bor {#generate-a-bor-keystore-file}

คุณต้องสร้างไฟล์ Keystore ของ Bor บนเครื่องของผู้ตรวจสอบเท่านั้น **อย่าสร้างไฟล์ Keystore ของ Bor บนเครื่อง Sentry**

เมื่อต้องการสร้างคีย์ส่วนตัว ให้เรียกใช้:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — เป็นคีย์ส่วนตัวของวอลเล็ต Ethereum ของคุณ

:::

เมื่อได้รับแจ้ง ให้ตั้งค่ารหัสผ่านให้กับไฟล์ Keystore

การดำเนินการนี้จะสร้างไฟล์ Keystore `UTC-<time>-<address>`

ย้ายไฟล์ Keystore ที่สร้างขึ้นไปยังไดเรกทอรีการกำหนดค่า Bor:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### เพิ่มเติม`password.txt`

ตรวจสอบให้แน่ใจว่าได้สร้างไฟล์ `password.txt` แล้วเพิ่มรหัสผ่านของไฟล์ Keystore ของ Bor ในไฟล์ `~/.bor/password.txt`

### เพิ่มที่อยู่กระเป๋า Ethereum ของคุณ {#add-your-ethereum-address}

เปิดเพื่อทำการแก้ไข `vi /etc/matic/metadata`

ใน `metadata` ให้เพิ่มที่อยู่กระเป๋า Ethereum ของคุณตัวอย่าง: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`

บันทึกการเปลี่ยนแปลงใน `metadata`

## เริ่มต้นโหนดผู้ตรวจสอบความถูกต้อง {#start-the-validator-node}

ในขั้นนี้ คุณต้องมี:

* บริการ Heimdall บนเครื่อง Sentry ที่ซิงค์อย่างสมบูรณ์และกำลังทำงานอยู่
* บริการ Bor บนเครื่อง Sentry ที่กำลังทำงานอยู่
* บริการ Heimdall และบริการ Bor ในเครื่องผู้ตรวจสอบถูกปรับแต่ง
* คีย์เจ้าของและคีย์ผู้ลงนามของคุณที่มีการกำหนดค่าแล้ว

### เริ่มบริการ Heimdall {#start-the-heimdall-service-1}

ตอนนี้ คุณจะเริ่มบริการ Heimdall บนเครื่องของผู้ตรวจสอบความถูกต้องแล้ว เมื่อบริการ Heimdall ซิงค์แล้ว คุณจึงจะเริ่มบริการ Bor บนเครื่องของผู้ตรวจสอบ

เริ่มบริการ Heimdall

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
* `false` — บริการ Heimdall ได้รับการซิงค์อย่างสมบูรณ์

รอให้บริการ Heimdall ซิงค์อย่างสมบูรณ์

### เริ่มบริการ Bor {#start-the-bor-service-1}

เมื่อบริการ Heimdall บนเครื่องของผู้ตรวจสอบได้รับการซิงค์อย่างสมบูรณ์แล้ว ให้เริ่มบริการ Bor บนเครื่องของผู้ตรวจสอบ

เริ่มบริการ Bor:

```sh
sudo service bor start
```

ตรวจสอบบันทึกการบริการของ Bor:

```sh
journalctl -u bor.service -f
```

## ตรวจสอบความสมบูรณ์ของโหนดกับชุมชน {#check-node-health-with-the-community}

ตอนนี้โหนด Sentry และโหนดผู้ตรวจสอบของคุณได้รับการซิงค์และทำงานแล้ว ตรงไปที่ [Discord](https://discord.com/invite/0xPolygon) และขอให้คนในชุมชนช่วยตรวจสอบสถานะโหนดของคุณ

:::note

ในฐานะตัวตรวจสอบความถูกต้อง คือคำสั่งในการมีเช็คที่อยู่ผู้ลงนามเสมอหากยอดคงเหลือ ETH ถึงต่ำกว่า 0.5 Eth จึงควรเติมเงินการเพิกเฉยนี้จะผลักดันโหนดออกจากธุรกรรมเช็คพอยต์การส่งต่อ

:::

## ดำเนินการ Stake {#proceed-to-staking}

ตอนนี้คุณได้ตรวจสอบสถานะโหนด Sentry และโหนดผู้ตรวจสอบแล้ว ให้ดำเนินการ [การ Stake](/docs/maintain/validator/core-components/staking) ได้เลย
