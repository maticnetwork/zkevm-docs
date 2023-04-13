---
id: hello
title: วิธีสร้างวอลเล็ต MetaMask
sidebar_label: Hello Metamask
description: เรียนรู้วิธีสร้างวอลเล็ต Metamask
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

หากคุณกำลังสงสัยถึงวิธีการสร้างวอลเล็ตสำหรับสกุลเงินดิจิทัลใหม่ ให้ลองสร้างดู โดยติดตั้งส่วนขยาย MetaMask

MetaMask คือส่วนขยายเบราว์เซอร์แบบไม่มีค่าใช้จ่ายและปลอดภัยที่ช่วยให้เว็บแอปพลิเคชันสามารถอ่านและโต้ตอบกับบล็อกเชน Ethereum ได้

## ขั้นตอนที่ 1 ติดตั้ง MetaMask บนเบราว์เซอร์ของคุณ {#step-1-install-metamask-on-your-browser}

ในการสร้างวอลเล็ตใหม่ด้วย MetaMask คุณต้องติดตั้งส่วนขยายก่อนคุณสามารถติดตั้ง Metamask สำหรับเบราว์เซอร์ [Chrome](https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/), Brave และ [Opera](https://addons.opera.com/en/extensions/details/metamask/)

1. เปิด [https://metamask.io](https://metamask.io/) หรือค้นหา "Metamask extension" โดยใช้โปรแกรมค้นหาที่คุณชื่นชอบ

:::note
ในบทเรียนนี้เราจะใช้ตัวอย่าง Google Chrome เป็นตัวอย่าง แต่เวิร์กโฟลว์ก็เหมือนกันสำหรับเบราว์เซอร์ทั้งหมด
:::

<img src={useBaseUrl("img/metamask/develop/metamask-home.png")} />

2. **คลิกดาวน์โหลด**เพื่อติดตั้ง MetaMask เป็นส่วนขยาย Google Chrome

3. คลิก **Add to Chrome**

<img src={useBaseUrl("img/metamask/develop/add-chrome.png")} />

4. คลิก **Add Extension**

<div align="center">
<img src={useBaseUrl("img/metamask/develop/add-extension.png")} />
</div>

เท่านี้เองคุณติดตั้งส่วนขยาย MetaMask สำเร็จแล้ว

## ขั้นตอนที่ 2 สร้างบัญชี {#step-2-create-an-account}

ขั้นตอนต่อไปคือการสร้างบัญชี

1. เมื่อการดาวน์โหลดเสร็จแล้ว คุณจะสามารถ**เรียกคืนกระเป๋าสตางค์**ด้วยวลีของ Secret Recovery หรือ**สร้างบัญชีใหม่** โดยสร้างกระเป๋าสตางค์ใหม่และสร้างPhrase ใหม่ Secret Recovery

<div align="center">
<img src={useBaseUrl("img/metamask/develop/new-metamask.png")} />
</div>

2. จะมีการขอให้คุณสร้างรหัสผ่านใหม่สร้างรหัสผ่านที่คาดเดาได้ยากแล้วคลิก **Create**

<div align="center" >
<img width="500" src={useBaseUrl("img/metamask/develop/create-password.png")} />
</div>

3. จากนั้นเมตาMask จะมอบข้อมูลเกี่ยวกับวลีการกู้คืนลับ และบนหน้าถัดไปคุณจะเห็นวลีของคุณ

<div align="center" >
<img  src={useBaseUrl("img/metamask/develop/reveal-phrase.png")} />
</div>


4. เขียนวลี 12 คำลงบนชิ้นส่วนกระดาษบนคำสั่งเดียวกันที่นำเสนอไว้

:::caution
อ่านคู่มือการเมตาสกอร์อย่างระมัดระวังเขียนวลีนี้บนชิ้นส่วนกระดาษและจัดเก็บในตำแหน่งที่ปลอดภัยหากคุณต้องการความปลอดภัยมากขึ้น เขียนลงบนกระดาษและจัดเก็บแต่ละชิ้นใน 2-3 สถานที่ที่ต่างกันคุณยังสามารถจำวลีนี้ได้
:::

5. ตรวจสอบวลีลับของคุณโดยเลือกวลีที่สร้างไว้ก่อนหน้านี้เมื่อเสร็จแล้ว ให้คลิก **Confirm**

<img src={useBaseUrl("img/metamask/develop/phrase.gif")} />

โดย “การแก้ปริศนานี้” คุณกำลังยืนยันว่าคุณรู้จักวลีลับของคุณ

**ยินดีด้วย!** คุณสร้างบัญชี MetaMask ของคุณสำเร็จแล้วโดยจะสร้างที่อยู่วอลเล็ต Ethereum ใหม่ขึ้นโดยอัตโนมัติให้กับคุณ