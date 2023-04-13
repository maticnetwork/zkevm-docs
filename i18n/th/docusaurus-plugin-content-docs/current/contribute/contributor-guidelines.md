---
id: contributor-guidelines
title: วิธีการมีส่วนร่วม
sidebar_label: Contributor guidelines
description: เตรียมพร้อมสำหรับการมีส่วนร่วมที่จะเกิดขึ้นของคุณ
keywords:
  - docs
  - matic
  - polygon
  - contribute
  - contributor
  - contributing
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: orientation
---

:::tip
พร้อมที่จะ[เพิ่มปัญหาบนที่เก็บของ Polygon Wiki ของ](https://github.com/maticnetwork/matic-docs/issues)เรา
:::

## ระบุพื้นที่ที่จะมีส่วนร่วม {#identify-an-area-to-contribute-to}

มีหลายวิธีในการระบุพื้นที่ที่คุณสามารถมีส่วนร่วมใน Wiki:

- วิธีที่ง่ายที่สุดคือติดต่อ[ผู้ดูแล Wiki](/docs/contribute/community-maintainers)และบอกว่า "I want to help contribute to the Polygon Wiki" (ฉันอยากช่วยมีส่วนร่วมใน Polygon Wiki)พวกเขาจะช่วยคุณหาพื้นที่สำหรับให้คุณมีส่วนร่วม
- หากคุณมีรูปแบบการมีส่วนร่วมเฉพาะเจาะจงในใจแต่ไม่แน่ใจ ให้ยืนยันว่าการมีส่วนร่วมนั้นเหมาะสมหรือไม่ โดยติดต่อ[ผู้ดูแล Wiki](/docs/contribute/community-maintainers) โดยตรง
- หากคุณไม่ได้มีรูปแบบการมีส่วนร่วมเฉพาะเจาะจงในใจ คุณยังสามารถเรียกดูปัญหาต่างๆที่มีป้ายกำกับเป็น `help wanted` บน [พื้นที่เก็บข้อมูล Polygon GitHub](https://github.com/maticnetwork)
- ปัญหาที่มีป้ายกำกับ `good first issue` เพิ่มเติมถือว่าเหมาะสำหรับผู้ที่เข้าร่วมครั้งแรก

## เพิ่มในเอกสาร Polygon {#add-to-the-polygon-documentation}

  - หากคุณต้องการเพิ่มหรือเปลี่ยนแปลงอะไรใน Polygon Wiki โปรดส่ง PRกับสาขา `master` (กรุณาตรวจสอบตัวอย่าง PR)
  - ทีมเอกสารจะตรวจสอบ PR หรือติดต่อตามเอกสารที่ให้มา
  - พื้นที่เก็บข้อมูล: https://github.com/maticnetwork/matic-docs
  - ตัวอย่าง PR: https://github.com/maticnetwork/matic-docs/pull/360

:::tip
หากคุณต้องการเรียกใช้Wiki ของเราในเครื่องของคุณให้ตรวจสอบส่วน[ที่ทำงานบนเครื่อง Wiki ในท้องถิ่น](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally)หากคุณกำลังเพิ่มเอกสารใหม่ จึงแนะนำให้มี เพียงมีการแนะนำแบบพื้นฐาน และลิงก์ไปยัง Github หรือเอกสารของคุณสำหรับรายละเอียดเพิ่มเติม
:::

## กฎ Git {#git-rules}

เราใช้ `gitchangelog` สำหรับพื้นที่เก็บข้อมูลของเราทั้งหมดสำหรับบันทึกการเปลี่ยนแปลงในการทำเช่นนั้น เราต้องปฏิบัติตามแบบแผนสำหรับข้อความคอมมิตจะไม่มีการผสาน ถ้าคุณไม่ปฏิบัติตามแบบแผนนี้

### แบบแผนเกี่ยวกับข้อความคอมมิต {#commit-message-convention}

ต่อไปนี้คือคำแนะนำเกี่ยวกับสิ่งที่อาจเป็นประโยชน์ที่จะพิจารณาเพิ่มเข้าในข้อความคอมมิตของคุณคุณอาจต้องการแยกคอมมิตของคุณเป็นส่วนใหญ่ๆ:

- ตามจุดประสงค์ (เช่น สร้างใหม่ แก้ไข เปลี่ยนแปลง ...)
- ตามอ็อบเจ็กต์ (เช่น เอกสาร แพ็คเกจ โค้ด ...)
- ตามกลุ่มเป้าหมาย (เช่น นักพัฒนา, ผู้ทดสอบ, ผู้ใช้ ...)

นอกจากนี้ คุณอาจต้องการแท็กคอมมิตบางอย่าง:

- เป็นคอมมิต "Minor" (ไม่สำคัญ) ที่ไม่จำเป็นต้องส่งเอาต์พุตไปยังบันทึกการเปลี่ยนแปลงของคุณ (การเปลี่ยนแปลงลักษณะภายนอกการพิมพ์ผิดเล็กน้อยในคอมเมนต์...)
- เป็น "รีแฟกเตอร์" หากคุณไม่มีการเปลี่ยนแปลงคุณสมบัติที่มีนัยสำคัญใดดังนั้นจึงไม่ควรเป็นส่วนหนึ่งของบันทึกการเปลี่ยนแปลงอินสแตนซ์ที่แสดงต่อผู้ใช้งานจริง แต่อาจเป็นเรื่องที่น่าสนใจ หากคุณมีบันทึกการเปลี่ยนแปลงของนักพัฒนา
- คุณยังสามารถแท็กด้วย “api” เพื่อทำเครื่องหมายการเปลี่ยนแปลง API หรือหากเป็น API ใหม่หรือคล้ายกัน

ลองเขียนข้อความคอมมิตโดยกำหนดเป้าหมายการทำงานของผู้ใช้ให้บ่อยที่สุดเท่าที่คุณทำได้

:::note ตัวอย่าง

นี่คือบันทึก git มาตรฐาน `--oneline` เพื่อแสดงวิธีจัดเก็บข้อมูลเหล่านี้:

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

ดูข้อมูลเพิ่มเติมได้ที่[วิธีที่ดีในการจัดการบันทึกการเปลี่ยนแปลงโดยใช้ Git คืออะไร](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890)

ดูรายละเอียดเพิ่มเติมได้ที่ [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/)
