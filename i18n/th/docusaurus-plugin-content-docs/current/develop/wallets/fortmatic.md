---
id: fortmatic
title: Fortmatic
description: ใช้ SDK Formatic เพื่อรวมแอพ ของคุณกับ Polygon
keywords:
  - wiki
  - polygon
  - fortmatic
  - integrate
  - dapp
  - sdk
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

SDK แบบฟอร์ทmatic ช่วยให้คุณรวมเดปของคุณเข้ากับห่วงโซ่นุป Ethereum ได้อย่างง่ายดาย ไม่ว่าคุณจะมี dApp รวมกับ Web3 หรือเริ่มตั้งแต่เริ่มต้นตั้งแต่รอยขีดข่วนFortmatic ให้ประสบการณ์ที่ราบรื่นและมีความสุขสำหรับทั้งคุณและผู้ใช้แอพพลิเคชันที่สิ้นสุดลงของคุณ

## การติดตั้ง {#installation}

ใช้คำสั่งต่อไปนี้เพื่อติดตั้งกระเป๋าสตางค์ล่าสุดของ Fortmaic :

```bash
$ npm i --save fortmatic@latest
```

## ตัวอย่าง {#example}
นี่คือตัวอย่างของโปรแกรมที่ใช้ Fortmatic:

```js title="example.js"
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const customNodeOptions = {
    rpcUrl: 'https://rpc-mumbai.matic.today', // your own node url
    chainId: 80001 // chainId of your own node
}

// Setting network to localhost blockchain
const fm = new Fortmatic('YOUR_TEST_API_KEY', customNodeOptions);
window.web3 = new Web3(fm.getProvider());
```
