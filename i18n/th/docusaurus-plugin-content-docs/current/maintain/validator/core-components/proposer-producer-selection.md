---
id: proposers-producers-selection
title: การคัดเลือกผู้เสนอและผู้ผลิตบล็อก
sidebar_label: Proposers & Producers
description: การเลือกผู้สร้างโพรพอสและบล็อกบน Polygon
keywords:
  - docs
  - polygon
  - matic
  - proposers
  - block producers
  - selection
slug: proposers-producers-selection
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

ผู้ผลิตบล็อกสำหรับเลเยอร์ BOR คือคณะกรรมการที่ได้รับการคัดเลือกจากกลุ่มผู้ตรวจสอบโดยพิจารณาจากการ Stake ที่เกิดขึ้นเป็นช่วง ช่วงเวลาเหล่านี้จะมีการกำหนดโดยการกำกับดูแลของผู้ตรวจสอบ โดยพิจารณาตามการสืบต่อและเครือข่าย

อัตราส่วนของ [Stake](/docs/maintain/glossary.md#staking) จะเป็นตัวกำหนดความน่าจะเป็นที่จะได้รับคัดเลือกให้เป็นสมาชิกในคณะกรรมการ[ผู้ผลิตบล็อก](/docs/maintain/glossary.md#block-producer)

## กระบวนการคัดเลือก {#selection-process}

สมมติว่าเรามีผู้ตรวจสอบ 3 คนอยู่ในกลุ่ม คือ Alice, Bill และ Clara:

* Alice ทำการ Stake ด้วย MATIC จำนวน 100 โทเค็น
* Bill ทำการ Stake ด้วย MATIC จำนวน 40 โทเค็น
* Clara ทำการ Stake ด้วย MATIC จำนวน 40 โทเค็น

ผู้ตรวจสอบจะได้รับสล็อตตามจำนวนเงินที่ Stake

เนื่องจาก Alice ได้ทำการ Stake เป็นเงิน MATIC 100 โทเค็น และค่าใช้จ่ายต่อสล็อตเท่ากับ MATIC 10 โทเค็นในขณะที่อยู่ในการกำกับดูแลของผู้ตรวจสอบ อลิซจึงได้รับทั้งหมด 5 สล็อตในทำนองเดียวกัน Bill และ Clara จะได้รับทั้งหมด 2 สล็อต

ผู้ตรวจสอบ Alice, Bill และ Clara จะได้รับสล็อตดังต่อไปนี้:

* [A, A, A, A, A, B, B, C, C]

จากนั้น Polygon จะสุ่มสลับอาร์เรย์ของสล็อต Alice, Bill และ Clara โดยใช้แฮชของบล็อก Ethereum เป็นต้นกำเนิด

ผลลัพธ์ของการสุ่มสลับจะได้อาร์เรย์ของสล็อตดังต่อไปนี้:

* [A, B, A, A, C, B, A, A, C]

ตอนนี้ก็ขึ้นอยู่กับจำนวนผู้ผลิตบล็อกทั้งหมดที่อยู่ในการดูแลของผู้ตรวจสอบ โดย Polygon จะใช้ผู้ตรวจสอบจากด้านบน — ตัวอย่างเช่น สำหรับชุดผู้ผลิตบล็อก 5 ราย อาร์เรย์ของสล็อตก็คือ [A, B, A, A, C]

ผู้ผลิตบล็อกที่ตั้งไว้สำหรับ Span ถัดไปจะถูกกำหนดเป็น [A:3, B:1, C:1]

Polygon จะเลือกผู้ผลิตบล็อกสำหรับทุก Sprint บน Bor โดยการใช้ชุดผู้ตรวจสอบที่เป็นผลลัพธ์นี้ และ[อัลกอริทึมการเลือกผู้เสนอบล็อก](https://docs.tendermint.com/master/spec/consensus/proposer-selection.html)ของ Tendermint

<img src={useBaseUrl("img/validators/producer-proposer.png")} />

**ตำนาน:**

* Dynasty: เวลาระหว่างจุดสิ้นสุดการประมูลครั้งล่าสุดและเวลาเริ่มต้นของการประมูลครั้งต่อไป
* Sprint: ช่วงเวลาที่คณะกรรมการผู้ผลิตบล็อกถูกคัดเลือก
* Span: จำนวนบล็อกที่สร้างโดยผู้ผลิตรายเดียว
