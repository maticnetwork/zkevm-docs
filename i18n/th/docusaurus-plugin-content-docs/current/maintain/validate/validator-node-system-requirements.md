---
id: validator-node-system-requirements
title: ข้อกำหนดของระบบ
description: ข้อกำหนดระบบเพื่อเรียกใช้โหนดตัวตรวจสอบความถูกต้อง
keywords:
  - docs
  - matic
  - polygon
  - prerequisites
  - requirements
slug: validator-node-system-requirements
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

ข้อกำหนดของระบบที่ระบุไว้ในส่วนนี้มีทั้งสำหรับโหนด [Sentry](/docs/maintain/glossary.md#sentry) และโหนด[ผู้ตรวจสอบ](/docs/maintain/glossary.md#validator)

ข้อกำหนด**ขั้นต่ำ**ของระบบหมายความว่าคุณสามารถเรียกใช้โหนดได้ แต่ไม่สามารถรองรับการติดตั้งแอปพลิเคชันต่าง ๆ ได้ในอนาคต

ข้อกำหนดของระบบ**ที่แนะนำ**หมายความว่าโหนดนั้นรองรับการติดตั้งแอปพลิเคชันต่าง ๆ ในอนาคตได้อย่างไรก็ตาม ไม่มีขีดจำกัดสูงสุดในการที่จะให้โหนดของคุณรองรับการใช้งานในอนาคต

คุณต้องเรียกใช้โหนด Sentry และโหนดผู้ตรวจสอบความถูกต้องบนเครื่องที่แยกจากกันเสมอ

## ข้อกำหนดขั้นต่ำของระบบ {#minimum-system-requirements}

* RAM: 32 GB
* CPU: 8-core
* จัดเก็บ: 2.5 TB

:::info

สำหรับ Amazon Web Services (AWS) อินสแตนซ์ที่เทียบเท่ากับข้อกำหนดขั้นต่ำคือ **m5d.2xlarge** หรือ **t3.2xlarge** โดยเลือกเครดิตได้ไม่จำกัด

สำหรับการจัดเก็บ ตรวจสอบให้แน่ใจว่าการจัดเก็บ ข้อมูล แบบ SSD จะขยายได้ 2.5 TB

:::

## ข้อกำหนดของระบบที่แนะนำ {#recommended-system-requirements}

* RAM: 64GB
* CPU: 16-core
* จัดเก็บ: 5 TB
* แบนด์วิดท์: 1 Gbit/s

:::info

สำหรับ Amazon Web Services (AWS) อินสแตนซ์ที่เทียบเท่ากับข้อกำหนดที่แนะนำคือ **m5d.4xlarge**

สำหรับ OVH อินสแตนซ์ที่เทียบเท่ากับข้อกำหนดที่แนะนำคือ **infra-3**

สำหรับเครือข่าย คาดว่าจะมีการถ่ายโอนข้อมูล 3-5 TB ต่อเดือน

:::
