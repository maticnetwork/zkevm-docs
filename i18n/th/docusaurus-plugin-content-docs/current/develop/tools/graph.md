---
id: graph
title: การตั้งค่าโปรเจกต์ที่โฮสต์ด้วย The Graph และ Polygon
description: เรียนรู้วิธีตั้งค่าโปรเจกต์ที่โฮสต์ด้วย The Graph และ Polygon
keywords:
  - graph
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

The Graph ซึ่งเป็นโปรโตคอลแบบไร้ตัวกลางในการจัดทำดัชนีและการค้นหาข้อมูลเชน รองรับเชน Polygonค้นหาและสำรวจข้อมูลที่กำหนดผ่านกราฟย่อยได้โดยง่ายสร้างกราฟย่อยในเครื่องได้ หรือใช้ Explorer ที่โฮสต์ฟรีสำหรับการจัดทำดัชนีและการแสดงข้อมูล

> หมายเหตุ: ดูรายละเอียดเพิ่มเติม การติดตั้งในเครื่อง และอื่นๆ ได้ที่ https://thegraph.com/docs/quick-startเอกสารมีตัวอย่างเพื่อศึกษาว่ากราฟย่อยทำงานอย่างไร และวิดีโอนี้ให้การแนะนำที่ดี

## ขั้นตอน {#steps}

1. ไปที่ Graph Explorer (https://thegraph.com/explorer/) และตั้งค่าบัญชีคุณจะต้องใช้บัญชี GitHub เพื่อรับรองความถูกต้อง

2. ไปที่แดชบอร์ดของคุณ และคลิก Add Subgraphกำหนดชื่อ บัญชี และชื่อย่อยของกราฟย่อย และอัปเดตรูปภาพและข้อมูลอื่นๆ (คุณสามารถอัปเดตได้ในภายหลัง) หากต้องการ

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. ติดตั้ง Graph CLI บนเครื่องของคุณ (โดยใช้ npm หรือ yarn อย่างใดอย่างหนึ่ง)

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. คำสั่งต่อไปนี้สร้างกราฟย่อยที่จัดทำดัชนีสำหรับอีเวนต์ทั้งหมดของสัญญาที่มีอยู่โดยจะพยายามเรียก ABI สัญญาจาก BlockScout และย้อนกลับไปเพื่อร้องขอพาธของไฟล์ในเครื่องหากไม่มีอาร์กิวเมนต์แบบระบุหรือไม่ก็ได้ ก็จะนำคุณผ่านแบบฟอร์มโต้ตอบ

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Polygon” for Matic mainnet and “Mumbai” for Polygon Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on Polygon: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> หมายเหตุ: ดูรายละเอียดเพิ่มเติมได้ที่นี่: https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. รับรองความถูกต้องด้วยบริการที่มีการโฮสต์

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
คุณสามารถค้นหาโทเค็นการเข้าถึงได้โดยไปที่แดชบอร์ดของคุณบนเว็บไซต์ The Graph

6. เปลี่ยนไปยังไดเรกทอรีที่คุณสร้างขึ้น และเริ่มต้นกำหนดกราฟย่อยข้อมูลเกี่ยวกับการสร้างกราฟย่อยมีอยู่ในเอกสาร The Graph ที่นี่ https://thegraph.com/docs/define-a-subgraph

7. เมื่อคุณพร้อมแล้ว ให้ปรับใช้กราฟย่อยคุณสามารถทดสอบและปรับใช้ซ้ำตามความต้องการได้เสมอ

> หากกราฟย่อยที่ปรับใช้ก่อนหน้านี้ยังคงอยู่ในสถานะ Syncing หรือกำลังซิงค์ ก็จะได้รับการแทนที่ด้วยเวอร์ชันที่เพิ่งปรับใช้ในทันทีหากกราฟย่อยที่ปรับใช้ก่อนหน้านี้มีการซิงค์โดยสมบูรณ์แล้ว Graph Node ก็จะระบุเวอร์ชันที่เพิ่งปรับใช้ว่าเป็น Pending Version หรือเวอร์ชันที่รอดำเนินการ ทำการซิงค์ในพื้นหลัง และแทนที่เวอร์ชันที่ปรับใช้อยู่ในขณะนี้ด้วยเวอร์ชันใหม่ ก็ต่อเมื่อซิงค์เวอร์ชันใหม่เสร็จเรียบร้อยแล้วซึ่งทำให้คุณมีกราฟย่อยในการทำงาน ในขณะที่เวอร์ชันใหม่กำลังซิงค์

```bash
yarn deploy
```

กราฟย่อยของคุณจะได้รับการปรับใช้ และสามารถเข้าถึงได้จากแดชบอร์ดของคุณ

คุณสามารถศึกษาการค้นหากราฟย่อยได้ที่นี่: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

หากคุณต้องการทำให้กราฟย่อยของคุณเป็นกราฟย่อยสาธารณะ คุณสามารถทำได้โดยการเข้าถึงกราฟย่อยทางแดชบอร์ดของคุณ แล้วคลิกที่ปุ่มแก้ไขคุณจะเห็นแถบเลื่อนที่ด้านล่างของหน้าแก้ไข
