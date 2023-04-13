---
id: consensus-mechanism
title: กลไกฉันทามติ
description: "PoW, PoS, DPoS, PoSpace และ PoET"
keywords:
  - docs
  - matic
  - polygon
  - consensus mechanisms
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# กลไกฉันทามติ {#consensus-mechanism}

กลไกฉันทามติเป็นกลไกที่ทนทานต่อความผิดพลาด ซึ่งใช้ในระบบคอมพิวเตอร์และบล็อกเชนเพื่อบรรลุข้อตกลงที่จำเป็นเกี่ยวกับค่าของข้อมูลหนึ่ง หรือสถานะของเครือข่ายในการประมวลผลข้อมูลแบบกระจาย หรือระบบมัลติเอเจนท์ เช่น คริปโตเคอร์เรนซี

## ประเภทของกลไกฉันทามติ {#types-of-consensus-mechanism}

### หลักฐานการทำงาน {#proof-of-work}
Proof of Work เป็นระบบที่ต้องใช้กำลังความพยายามที่ไม่น้อยแต่ก็ไม่มากจนเกินไปในการยับยั้งการโจมตี DOS (การปฏิเสธการให้บริการ) และการโจมตีที่ประสงค์ร้ายอื่นๆ จึงต้องแก้ปัญหาปริศนาการคำนวณที่ท้าทายเพื่อสร้างบล็อกใหม่ใน Blockเชน

### Proof of Stake {#proof-of-stake}
กลไก Proooof of Sake จะบรรลุผลต่อฉันทามติ โดยต้องการให้ผู้ใช้เดิมพันจำนวนโทเค็นของตัวเอง เพื่อให้มีโอกาสที่จะถูกเลือกเพื่อตรวจสอบบล็อกของธุรกรรม และได้รับรางวัลสำหรับการทำเช่นนั้นลำดับความสำคัญจะมอบให้กับนักขุดที่ซื้อ Stake มากที่สุดในระบบบล็อคเชนก่อน

### Proof การลบของ Stake {#delegated-proof-of-stake}
ฉันทามติรูปแบบนี้เหมือนกับการเลือกตั้งสมาชิกในหน่วยงานปกครอง แทนที่จะเดิมพันสินทรัพย์ของตนเอง ผู้เดิมพันจึงสามารถมอบกิจกรรมนี้ให้กับบุคคลที่สาม ตัวประกันหรือตัวแทนซึ่งจะนำส่วนหนึ่งในกระบวนการทามติพยานผู้ตรวจสอบธุรกรรมโดยทั่วไปจะเสนอข้อเสนอให้ขอโหวตและได้รับเลือกจากผู้ได้เสียชีวิตผลตอบแทน ซึ่งได้รับโดยแต่ละรายการจะถูกแบ่งร่วมกับผู้เข้าร่วมของเครือข่าย

### ตัวพิสูจน์ของอวกาศ {#proof-of-space}
กลไกการทามติประเภทนี้มีประโยชน์ในการใช้งานจัดเก็บไฟล์แบบถอดรหัสเช่น ใน Storjio Filcoin และ Crust ซึ่งโหนดพิสูจน์ว่ามีความสามารถแบบถูกต้องตามกฎหมายในฮาร์ดแวร์ของตนอย่างไรก็ตาม แทนที่จะใช้การคำนวณแบบหนักในกลไก PoW จึงใช้ประโยชน์ต่อความสามารถในการจัดเก็บของแต่ละโหนดบางครั้งก็เรียกว่า PoStorage หรือ PoCapacity

### Proof of Time Elaps {#proof-of-elapsed-time}
ทางเลือกที่ดีกว่าของ PoW เนื่องจากใช้ทรัพยากรการคำนวณที่น้อยลงโหนดแต่ละตัวที่เข้าร่วมต้องรอรับจำนวนแบบสุ่มและโหนดแรกที่จะตื่นจาก Sleep จะได้รับโอกาสในการสร้างบล็อกใหม่ ซึ่งจึงมีการกระจายกระจายผ่านเครือข่ายโดยต้องใช้สิ่งแวดล้อมการประมวลผลที่เชื่อถือได้ (TEE ) เช่น Intel SGX ซึ่งเป็นส่วนหนึ่งแยกของหน่วยความจํา และสามารถเข้าถึงได้โดยใช้คู่มือบางชุดเท่านั้น

## **แหล่งข้อมูล**

- [Byzantine Fault Tolerance](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419)<br></br>
- [ประเภทกลไกการยอมรับแบบ](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms)<br></br>
- [ภาพรวมและประวัติศาสตร์การพัฒนาระบบของ Consensus](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/)<br></br>
- [การเข้าใจการแจกจ่ายข้อตกลง](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95)<br></br>
- [ปัญหาตัวสร้างของ Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)