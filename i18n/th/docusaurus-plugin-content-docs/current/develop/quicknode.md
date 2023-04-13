---
id: quicknode
title: ส่งสัญญาอัจฉริยะโดยใช้โหนด Quickโหนด
sidebar_label: Using QuickNode
description:  เดอัปโหลดสัญญา Smart บน Polygon โดยใช้โหนด Brownie และ Queon
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## ภาพรวม {#overview}

Python เป็นหนึ่งในภาษาการเขียนโปรแกรมที่ใช้งานได้หลากหลายที่สุด โดยนักวิจัยจึงใช้รุ่นทดสอบเพื่อพัฒนาโดยใช้มันในสภาพแวดล้อมการผลิตหนัก จึงใช้กรณีในฟิลด์เทคนิคทุกอย่าง

ในบทเรียนนี้ คุณจะเรียนรู้วิธีใช้กรอบ [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) ในการเขียนและใช้อะบายการเชื่อมต่อเน็ตสำหรับ [Quicknode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) สำหรับ Polygon

:::tip

หากต้องการติดต่อทีม Quicknode ให้ส่งข้อความหรือแท็กบน Twitter [@QuickNode](https://twitter.com/QuickNode)

:::

## ข้อกำหนดเบื้องต้น {#prerequisites}

- ติดตั้ง Python3
- โหนด Polygon
- ตัวแก้ไขรหัส
- อินเทอร์เน็ตของคำสั่ง

## สิ่งที่คุณจะทำ {#what-you-will-do}

1. ตั้งค่า Brownie
2. เข้าถึงโหนดทดสอบ Quicknode
3. คอมไพล์และปรับใช้สัญญาอัจฉริยะ
4. ตรวจสอบข้อมูลสัญญาที่ใช้งานอยู่

## Brownie คืออะไร {#what-is-brownie}

การพัฒนาสัญญาอัจฉริยะนั้นได้รับการจัดการโดยไลบรารีที่ใช้ JavaScript เป็นหลัก เช่น [web3.js](https://web3js.readthedocs.io/), [ethers.js](https://docs.ethers.io/), [Truffle](https://www.trufflesuite.com/docs/truffle/) และ [Hardhat](https://hardhat.org/)Python คือภาษาที่ใช้งานได้สูง และยังสามารถใช้สำหรับสัญญาแบบอัจฉริยะ / การพัฒนาเว็บ3; [web3.py](https://web3py.readthedocs.io/en/stable/) เป็นไลบรารี Python ที่เติมเต็มความต้องการของ Web3สร้างกรอบ Brownie ไว้ด้านบน`web3.py`ของ

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) เป็นเฟรมเวิร์กที่ใช้ Python เพื่อพัฒนาและทดสอบสัญญาอัจฉริยะBrownie รองรับทั้งสัญญา Solidity และ Vyper และยังให้การทดสอบสัญญาผ่าน [pytest](https://github.com/pytest-dev/pytest)

เพื่อสาธิตกระบวนการเขียนและปรับใช้สัญญาอัจฉริยะกับ Brownie เราจะใช้ [Brownie-mixes](https://github.com/brownie-mix) ซึ่งเป็นโปรเจกต์เทมเพลตโดยเฉพาะอย่างยิ่ง เราจะใช้ [token mix](https://github.com/brownie-mix/token-mix) ซึ่งเป็นเทมเพลตของการนำ ERC-20 ไปใช้

## ติดตั้งตัวประกัน {#install-dependencies}

Brownie ถูกสร้างขึ้นด้านบนของ python3 ดังนั้นเราจึงต้องการติดตั้งเพื่อทำงานกับ Brownieขอเช็คก่อนนะคะว่ามีการติดตั้งไพธอน 3 บนระบบหรือไม่เพื่อทำดังนั้น พิมพ์ข้อความต่อไปนี้ในเครื่องมือบรรทัดการบัญชาการของคุณ:

```bash
python3 -V
```

การกระทำนี้ควรคืนค่าเวอร์ชันของ python3 ที่ติดตั้งหากไม่ได้ติดตั้ง ให้ดาวน์โหลดและติดตั้งจาก[เว็บไซต์ python](https://www.python.org/downloads/) อย่างเป็นทางการ

เรามาสร้างไดเร็กทอรีของโปรเจกต์ก่อนที่จะติดตั้ง Brownie และทำให้ไดเร็กทอรีของโปรเจกต์นั้นเป็นไดเร็กทอรีการทำงานปัจจุบันของเรา:

```bash
mkdir brownieDemo
cd brownieDemo
```

คุณได้ติดตั้ง python3 ในระบบของคุณแล้ว ตอนนี้เรามาติดตั้ง Brownie โดยใช้ pip ซึ่งเป็นตัวจัดการแพ็คเกจของ Pythonหน้าที่ของ Pip กับ JavaScript นั้นคล้ายคลึงกับ npmพิมพ์ต่อไปนี้ในบรรทัดคำสั่งของคุณ:

```bash
pip3 install eth-brownie
```

:::tip

หากการติดตั้งล้มเหลว คุณสามารถใช้คำสั่งต่อไปนี้แทน:`sudo pip3 install eth-brownie`

:::

เพื่อตรวจสอบว่า Brownie ถูกติดตั้งอย่างถูกต้องหรือไม่ พิมพ์`brownie`ในบรรทัดการบัญชาการของคุณหรือไม่ และควรให้เอาต์พุตต่อไปนี้:

![img](/img/quicknode/brownie-commands.png)

เพื่อให้ได้เมix, เพียงพิมพ์ต่อไปนี้ในบรรทัดการบัญชาการของคุณ:

```
brownie bake token
```

ซึ่งจะทำให้สร้างไดเรกทอรีใหม่`token/`ใน`brownieDemo`ไดเรกทอรีของเรา

### โครงสร้างไฟล์ {#file-structure}

ก่อนอื่น, นำทางไปยังไดเรกทอรี`token`:

```bash
cd token
```

ตอนนี้`token`เปิดไดเรกทอรีในเครื่องมือแก้ไขข้อความของคุณภายใต้`contracts/`โฟลเดอร์ที่คุณจะพบ `Token.sol`ซึ่งเป็นสัญญาหลักของเราคุณสามารถเขียนสัญญาหรือไฟล์การ`Token.sol`แก้ไขได้ด้วยตัวเอง

ภายใต้`scripts/`โฟลเดอร์ คุณจะพบ`token.py`สคริปต์ Pythonใช้สคริปต์นี้เพื่อปรับใช้ตามสัญญา และแก้ไขจำเป็นต้องใช้การแก้ไขตามสัญญา

![img](/img/quicknode/token-sol.png)

สัญญาคือสัญญา ERC-20คุณสามารถเรียนรู้เพิ่มเติมเกี่ยวกับมาตรฐาน ERC-20 และสัญญาในคู่มือนี้[บนโทเค็น](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token) ERC-20

## กำลังบูตโหนด Polygon ของคุณ {#booting-your-polygon-node}

QuickNode มีเครือข่ายทั่วโลกของโหนด Polygon Maainnet และ Mabiนอกจากนี้ ยังทำงาน[ร่วมกับ Polygon RPC สาธารณะฟรี](https://docs.polygon.technology/docs/operate/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) แต่ถ้าคุณได้รับอัตรา จำกัด คุณสามารถลงทะเบียนสำหรับ[โหนดการใช้งานฟรีจาก QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide)

![img](/img/quicknode/http_URL.png)

คัดลอก**ที่อยู่ URL ของ HTTP** ซึ่งจะใช้ประโยชน์ในภายหลังในบทเรียน

## ตั้งค่าเครือข่ายและบัญชีName {#network-and-account-setup}

เราจำเป็นต้องตั้งค่า QuickNode Endpoint กับ Brownieเพื่อทำดังนั้น พิมพ์ต่อไปนี้ในบรรทัดการบัญชาการของคุณ:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

แทนที่`YOUR_QUICKNODE_URL`ด้วย**ที่อยู่ URL ของ Mumbi Testnet HTTP** ที่เราเพิ่งได้รับขณะทำการบูตโหนด Polygon ของเรา

ในคำสั่งข้างต้น `Ethereum` เป็นชื่อของสภาพแวดล้อม และ `matic_mumbai` เป็นชื่อที่กำหนดเองของเครือข่าย โดยคุณสามารถตั้งชื่อให้กับเครือข่ายที่คุณกำหนดเองได้

สิ่งต่อไปที่เราจำเป็นต้องทำที่นี่คือสร้างกระเป๋าสตางค์ใหม่โดยใช้ Brownie เพื่อทำการพิมพ์ต่อไปนี้ในบรรทัดการบัญชาการของคุณ:

```
brownie accounts generate testac
```

คุณจะถูกขอให้ตั้งรหัสผ่านสำหรับบัญชีของคุณ!หลังจากเสร็จสิ้นขั้นตอนก็จะสร้างบัญชีพร้อมกับวลี mnemonic ให้บันทึกออฟไลน์ชื่อ`testac`คือชื่อสำหรับบัญชีของเรา (คุณสามารถเลือกชื่อใด ๆ ที่คุณต้องการ)

![img](/img/quicknode/new-account.png)

:::note

ใช้วลี Mnemonic เพื่อกู้คืนบัญชีหรือนำเข้าบัญชีไปยัง[<ins>วอลล์เปเปอร์ที่ไม่ใช่คัสโตต์</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode)อื่นบัญชีที่คุณเห็นในภาพด้านบนได้รับการสร้างไว้สำหรับคู่มือนี้

:::

คัดลอกที่อยู่บัญชีเพื่อให้เราสามารถรับ Matics การทดสอบ ซึ่งจำเป็นต้องปรับใช้สัญญาของเรา

## รับMATIC TTETnet {#getting-testnet-matic}

เราจะต้องต้องใช้โทเค็นการทดสอบเพื่อจ่ายค่าแก๊สเพื่อปรับใช้สัญญาอัจฉริยะของเรา

คัดลอกที่อยู่ของบัญชีของคุณที่เราสร้างในบทเรียนนี้ วางลงในฟิลด์ที่อยู่ของ [Polygon](https://faucet.polygon.technology/) และคลิกที่ **Submit**Faucet จะส่ง MATIC ทดสอบให้คุณ 0.2 MATIC

![img](/img/quicknode/faucet.png)

## กำลังอัพโหลดสัญญาอัจฉริยะของคุณ {#deploying-your-smart-contract}

ก่อนที่จะส่งสัญญา คุณต้องรวบรวมมันโดยใช้:

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

เปิด`scripts/token.py`เครื่องมือแก้ไขข้อความของคุณและทำการเปลี่ยนแปลงต่อไป:

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info การอธิบาย

โดยใช้โค้ดข้างต้น เรามี`testac`บัญชีนำเข้าที่เราสร้างขึ้นก่อนหน้านี้ และเก็บไว้ใน`acct`ตัวแปรนอกจากนี้ ในบรรทัดถัดไป เราได้แก้ไข`'from':`ส่วนหนึ่งเพื่อรับข้อมูลจาก`acct`ตัวแปร

:::

ในที่สุดเราจะปรับใช้สัญญาอัจฉริยะของเรา:

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`ชื่อเครือข่ายแบบกำหนดเองที่เราสร้างขึ้นก่อนหน้านี้การเตือนจะขอคุณสำหรับ**รหัส**ผ่านที่เราตั้งไว้ก่อนหน้านี้ในขณะที่ทำการบัญชี

หลังจากเรียกใช้คำสั่งข้างต้น คุณต้องได้รับแฮชของธุรกรรม และ Brownie จะรอให้ธุรกรรมได้รับการยืนยันเมื่อได้รับการยืนยันแล้ว ธุรกรรมจะส่งคืนที่อยู่ที่ปรับใช้สัญญาของเราบน Polygon Mumbai Testnet

![img](/img/quicknode/brownie-run.png)

คุณสามารถตรวจสอบสัญญาที่ปรับใช้โดยคัดลอกและวางที่อยู่สัญญาที่ [Polygonscan Mumbai](https://mumbai.polygonscan.com/)

![img](/img/quicknode/polygonscan.png)

## การทดสอบสัญญา {#testing-the-contract}

Brownie ยังเสนอตัวเลือกในการทดสอบฟังก์ชันสัญญาอัจฉริยะอีกด้วยใช้เฟรมเวิร์ก `pytest` เพื่อสร้างการทดสอบหน่วยการทำงานได้อย่างง่ายดายคุณสามารถหาข้อมูลเพิ่มเติมเกี่ยวกับการเขียนการทดสอบใน Bronwnie ได้[ในเอกสารประกอบ](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#)

**นี่คือวิธีปรับใช้สัญญาบน Polygon โดยใช้ Brownie และ QuickNode**

QuickNode เช่น Polygon มีวิธี[การ](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide)ศึกษาแรกเสมอเพื่อให้คู่มือผู้พัฒนา [docs](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [protorial วิดีโอ](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) และ[ชุมชนผู้พัฒนา Web3](https://discord.gg/DkdgEqE) ที่กระตือรือร้นที่จะช่วยเหลือซึ่งกันและกัน
