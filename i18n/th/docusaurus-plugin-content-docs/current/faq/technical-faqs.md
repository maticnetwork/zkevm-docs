---
id: technical-faqs
title: FAQ ทางเทคนิค
description: สร้างแอปบล็อกเชนถัดไปบน Polygon
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip ข้อควรทราบ

ติดตามการอัปเดตโหนดและตัวตรวจสอบความถูกต้องล่าสุดจากทีม Polygon และชุมชนด้วยการสมัครรับ[<ins>การแจ้งเตือน</ins>](https://polygon.technology/notifications/) Polygon

:::

### 1. คีย์ส่วนตัวสำหรับ Keystore ของ Heimdall และ Bor เหมือนกันหรือไม่ {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}
ใช่ คีย์ส่วนตัวที่ใช้สำหรับสร้างคีย์ Validator และ Bor Keystore จะเหมือนกันกุญแจส่วนตัว ซึ่ง ถูกใช้ ใน ตัวอย่าง นี้ เป็น ที่อยู่ ของ ว็อลเลต ETH ของคุณ ซึ่ง เป็น พื้นที่เก็บ เทสเน็ตโทเค็น Polygon ของคุณ

### 2. รายการคำสั่งทั่วไป {#2-list-of-common-commands}

ขณะนี้เรามีรายการแพ็คเกจ Linux ที่ง่ายต่อการเริ่มต้นสำหรับคุณ เราจะอัปเดตรายการนี้เป็นประจำเพื่อความสะดวกยิ่งขึ้น

**สำหรับแพ็คเกจ Linux**

#### A. จะหาไฟล์ heimdall genesis ได้ที่ไหน {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### B. จะหา heimdall-config.toml ได้ที่ไหน {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. จะหา config.toml ได้ที่ไหน {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. จะหา heimdall-seeds.txt ได้ที่ไหน {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. เริ่ม Heimdall {#e-start-heimdall}

`$ sudo service heimdalld start`

#### F. เริ่มตรวจสอบ Heimdall rest {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### G. เริ่มตรวจสอบเซิร์ฟเวอร์ Heimdall bridge {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. บันทึกของ Heimdall {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. จะหาไฟล์ Bor genesis ได้ที่ไหน {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### J. เริ่ม Bor {#j-start-bor}

`sudo service bor start`

#### K ตรวจสอบบันทึก Heimdall {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. ตรวจสอบเซิร์ฟเวอร์ Heimdall Rest {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. ตรวจสอบบันทึกการบริดจ์ Heimdall {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. ตรวจสอบ Log ของ Bor {#n-check-bor-logs}

`tail -f bor.log`

#### O. ยุติการประมวลผล Bor {#o-kill-bor-process}

**สำหรับ linux**:

1. `ps -aux | grep bor` รับ PID สำหรับ Bor และหลังจากนั้นเรียกใช้คำสั่งดังต่อไปนี้
2. `sudo kill -9 PID`

**สำหรับไบนารี**:

ไปที่ `CS-2003/bor` แล้วเรียกใช้ `bash stop.sh`

### 3. ข้อผิดพลาด: ไม่สามารถปลดล็อกบัญชี (0x...)ไม่มีคีย์สำหรับที่อยู่หรือไฟล์ที่ระบุ {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

ข้อผิดพลาดนี้เกิดขึ้นเนื่องจากเส้นทางสำหรับไฟล์ password.txt ไม่ถูกต้องคุณสามารถทำตามขั้นตอนด้านล่างเพื่อแก้ไขปัญหานี้:

ข้อผิดพลาดนี้เกิดขึ้นเนื่องจากเส้นทางสำหรับไฟล์ password.txt และ Keystore ไม่ถูกต้องคุณสามารถทำตามขั้นตอนด้านล่างเพื่อแก้ไขปัญหานี้:

1. คัดลอกไฟล์ที่เก็บคีย์ Bor ไปยัง

    /etc/bor/dataDir/keystore

2. และ password.txt ไปยัง

    /etc/bor/dataDir/

3. ตรวจสอบให้แน่ใจว่าคุณได้เพิ่มที่อยู่ที่ถูกต้องลงใน`/etc/bor/metadata`

สำหรับไบนารี:

1. คัดลอกไฟล์ Keystore ของ Bor ไปยัง:

`/var/lib/bor/keystore/`

2. และ password.txt ไปยัง

`/var/lib/bor/password.txt`


### 4. ข้อผิดพลาด: Wrong Block.Header.AppHash. Expected xxxx {#4-error-wrong-block-header-apphash-expected-xxxx}

ข้อผิดพลาดนี้มักจะเกิดขึ้นเมื่อบริการ heimdall ติดอยู่ในบล็อก และไม่มีทางเลือก Rewind ใน heimdall

ในการแก้ไขปปํยหาดังกล่าวนี้ คุณจำเป็นต้องรีเซ็ต heimdall ใหม่ทั้งหมด:

```bash
    sudo service heimdalld stop

    heimdalld unsafe-reset-all
```

หลังจากนั้น คุณควรซิงค์จาก snapshot อีกครั้ง

```bash
    wget -c <Snapshot URL>

    tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>

```

จากนั้น เริ่มต้นบริการ heimdall ใหม่อีกครั้ง


### 5. ฉันจะสร้างคีย์ API ได้จากที่ไหน {#5-from-where-do-i-create-the-api-key}

คุณสามารถเข้าไปที่ลิงก์นี้: [https://infura.io/register](https://infura.io/register) ตรวจสอบให้แน่ใจว่าเมื่อคุณตั้งค่าบัญชีและโครงการของคุณแล้ว คุณต้องคัดลอกคีย์ API สำหรับ Ropsten ไม่ใช่ Mainnet

Mainnet จะถูกเลือกไว้โดยค่าเริ่มต้น

### 6. Heimdall ไม่ทำงานฉันได้รับข้อผิดพลาด Panic {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**ข้อผิดพลาดที่เกิดขึ้นจริง**: Heimdalld ของฉันไม่ทำงาน ใน Log บรรทัดแรกคือ:
panic: Unknown db_backend leveldb, expected either goleveldb or memdb or fsdb

ให้เปลี่ยนการกำหนดค่าเป็น `goleveldb` ใน config.toml


### 7. ฉันจะลบเศษของ Heimdall และ Bor ได้อย่างไร {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

หากคุณต้องการลบเศษของ Heimdall และ Bor คุณสามารถเรียกใช้คำสั่งต่อไปนี้
Bor:

สำหรับแพ็กเกจ Linux:

```$ sudo dpkg -i matic-bor```

และลบไดเรกทอรีของ Bor:

```$ sudo rm -rf /etc/bor```

สำหรับไบนารี:

```$ sudo rm -rf /etc/bor```

และ

```$ sudo rm /etc/heimdall```


### 8. ผู้ตรวจสอบสามารถทำงานพร้อมกันได้กี่ราย {#8-how-many-validators-can-be-active-concurrently}

สามารถมีผู้ตรวจสอบที่ทำงานอยู่ได้สูงสุด 100 รายต่อครั้งเราจะรับผู้เข้าร่วมเพิ่มหากถึงขีดจำกัดในระหว่างนั้นอีกด้วยโปรดทราบว่าผู้ตรวจสอบที่ทำงานอยู่ส่วนใหญ่จะเป็นผู้ที่มีสถานะการออนไลน์สูง ผู้เข้าร่วมที่มีสถานะการออฟไลน์สูงจะถูกบังคับให้ออก

### 9. ฉันควร Stake เท่าไหร่ {#9-how-much-should-i-stake}

"Stake Amount" และ "Heimdal-Fee-Amount" - ควรเป็นเท่าไหร่

สำหรับจำนวนเงินที่จะ Stake จะต้องใช้โทเค็น MATIC ขั้นต่ำ 10 โทเค็น ในขณะที่ค่าธรรมเนียม Heimdall ควรมากกว่า 10 ตัวอย่างเช่น จำนวนการ Stake ของคุณคือ 400 ค่าธรรมเนียม Heimdall ก็ควรเป็น 20 เราแนะนำให้เก็บค่าธรรมเนียม Heimdall ไว้ที่ 20

อย่างไรก็ตาม โปรดทราบว่ามูลค่าที่ป้อนใน Stake Amount และ Heimdal-Fee-Amount ควรป้อนเป็นทศนิยม 18 ตำแหน่ง

ตัวอย่างเช่น

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. ฉันได้รับเลือกให้เป็นผู้ตรวจสอบ แต่ที่อยู่ ETH ของฉันไม่ถูกต้อง ฉันต้องทำอย่างไร {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

หากคุณสามารถเข้าถึงที่อยู่ ETH ที่คุณส่งมาก่อนหน้านี้ คุณสามารถโอนโทเค็นการทดสอบจากบัญชีนั้นไปยังบัญชีปัจจุบันได้จากนั้นคุณก็จะสามารถเริ่มกระบวนการติดตั้งโหนดของคุณได้

หากคุณไม่สามารถเข้าถึงที่อยู่ ETH นั้น เราจะไม่โอนโทเค็นให้คุณคุณสามารถลงทะเบียนใหม่ในแบบฟอร์มอีกครั้งโดยใช้ที่อยู่ ETH ที่ถูกต้อง

### 11. ฉันได้รับข้อผิดพลาดในการเริ่มบริดจ์ {#11-i-m-getting-an-error-starting-the-bridge}

**Error**: Object "start" is unknown, try "bridge help". จะเป็นอะไรไหมถ้าจะเพิกเฉยต่อข้อผิดพลาดนี้

ให้ตรวจสอบว่าเป็น "บริดจ์ใด" - หากเป็น `/usr/sbin/bridge` แสดงว่าคุณไม่ได้ใช้โปรแกรม "บริดจ์" ที่ถูกต้อง

ให้ลอง `~/go/bin/bridge` แทน `(or $GOBIN/bridge)`


### 12. ฉันได้รับข้อผิดพลาด dpkg {#12-i-m-getting-dpkg-error}

**Error**: "dpkg: error processing archive matic-heimdall_1.0.0_amd64.deb (--install): trying to overwrite '/heimdalld-rest-server.service', which is also in package matic-node 1.0.0"

สาเหตุหลักมาจากการติดตั้ง Matic ในเครื่องของคุณก่อนหน้านี้เมื่อต้องการแก้ไขปัญหา คุณสามารถรัน:

`sudo dpkg -r matic-node`


### 13. ฉันยังไม่เข้าใจว่าฉันควรใส่คีย์ส่วนตัวอันไหน เมื่อฉันจะสร้างคีย์ผู้ตรวจสอบ {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

คีย์ส่วนตัวที่จะใช้คือที่อยู่ ETH ของวอลเล็ตที่จัดเก็บโทเค็น Polygon testnet ของคุณ คุณสามารถตั้งค่าให้เสร็จสมบูรณ์ได้ด้วยคีย์สาธารณะและคีย์ส่วนตัวหนึ่งคู่ที่เชื่อมโยงกับที่อยู่ที่ส่งในแบบฟอร์ม


### 14. มีวิธีใดบ้างที่จะทราบได้ว่า Heimdall มีการซิงค์หรือไม่ {#14-is-there-a-way-to-know-if-heimdall-is-synced}

คุณสามารถเรียกใช้คำสั่งต่อไปนี้เพื่อตรวจสอบ:

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

ให้ตรวจสอบค่าของ catching_up หากเป็นเท็จ แสดงว่าโหนดซิงค์ทั้งหมด


### 15. จะเกิดอะไรขึ้นถ้ามีคนกลายเป็นผู้วาง Stake 10 อันดับแรก เขาจะได้รับผลตอบแทน MATIC อย่างไรในตอนท้าย {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

ผลตอบแทน Stage 1 ไม่ได้ขึ้นอยู่กับการ Stake โปรดดูรายละเอียดผลตอบแทนที่ https://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/ ผู้เข้าร่วมที่มีการ Stake สูงจะไม่มีสิทธิ์ได้รับผลตอบแทนในขั้นตอนนี้โดยอัตโนมัติ


### 16. เวอร์ชัน Heimdall ของฉันควรเป็นอย่างไร {#16-what-should-be-my-heimdall-version}

เมื่อต้องการตรวจสอบเวอร์ชัน Heimdall คุณสามารถเรียกใช้:

```heimdalld version```

Heimdall เวอร์ชันที่ถูกต้องสำหรับ Stage 1 ควรเป็น `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`


### 17. ฉันควรใส่ค่าใดในจำนวนเงินการ Stake และค่าธรรมเนียม {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

สำหรับจำนวนเงินที่จะ Stake จะต้องใช้โทเค็น MATIC ขั้นต่ำ 10 โทเค็น ในขณะที่ค่าธรรมเนียม Heimdall ควรมากกว่า 10 ตัวอย่างเช่น จำนวนการ Stake ของคุณคือ 400 ค่าธรรมเนียม Heimdall ก็ควรเป็น 20 เราแนะนำให้เก็บค่าธรรมเนียม Heimdall ไว้ที่ 20

อย่างไรก็ตาม โปรดทราบว่ามูลค่าที่ป้อนใน Stake Amount และ Heimdal-Fee-Amount ควรป้อนเป็นทศนิยม 18 ตำแหน่ง

ตัวอย่างเช่น

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. `/var/lib/heimdall` กับ `/etc/heimdall?` แตกต่างกันอย่างไร

`/var/lib/heimdall` คือ Dir ของ Heimdall เมื่อคุณใช้วิธีการติดตั้งแบบไบนารี ส่วน `/etc/heimdall` จะใช้สำหรับการติดตั้งแพ็กเกจ Linux


### 19. เมื่อฉันทำธุรกรรมการ Stake ฉันได้รับข้อผิดพลาด "Gas Exceeded" {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

ข้อผิดพลาดนี้อาจเกิดขึ้นเนื่องจากรูปแบบจำนวนเงินการ Stake หรือค่าธรรมเนียม ค่าที่ป้อนระหว่างคำสั่ง Stake ต้องมีทศนิยม 18 ตำแหน่ง

อย่างไรก็ตาม โปรดทราบว่ามูลค่าที่ป้อนใน Stake Amount และ Heimdal-Fee-Amount ควรป้อนเป็นทศนิยม 18 ตำแหน่ง

ตัวอย่างเช่น

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. ฉันจะได้รับโอกาสในการเป็นผู้ตรวจสอบเมื่อใด {#20-when-will-i-get-a-chance-to-become-a-validator}

เรากำลังเพิ่มผู้ตรวจสอบอย่างต่อเนื่องตลอดช่วงกิจกรรม Stage 1 เราจะค่อย ๆ เผยแพร่รายชื่อผู้ตรวจสอบภายนอกรายใหม่ โดยจะประกาศรายชื่อนี้ในช่อง Discord


### 21. ฉันจะหาตำแหน่งข้อมูลบัญชี Heimdall ได้ที่ไหน {#21-where-can-i-find-heimdall-account-info-location}

สำหรับไบนารี:

    /var/lib/heimdalld/config folder

สำหรับแพ็กเกจ Linux:

    /etc/heimdall/config


### 22. ฉันจะเพิ่มคีย์ API ลงในไฟล์ใด {#22-which-file-do-i-add-the-api-key-in}

เมื่อคุณสร้างคีย์ API แล้ว คุณต้องเพิ่มคีย์ API ในไฟล์ `heimdall-config.toml`


### 23. ฉันจะเพิ่ม persistent_peers ลงในไฟล์ใด {#23-which-file-do-i-add-the-persistent_peers}

คุณสามารถเพิ่ม persistent_peers ในไฟล์ต่อไปนี้:

    /var/lib/heimdalld/config/config.toml


### 24. “คุณได้รีเซ็ต Tendermint โดยไม่รีเซ็ตข้อมูลแอปพลิเคชันของคุณหรือไม่” {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

ในกรณีดังกล่าว คุณสามารถรีเซ็ตข้อมูลการกำหนดค่า Heimdall และลองเรียกใช้การติดตั้งอีกครั้ง

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. ข้อผิดพลาด: Unable to unmarshall config Error 1 error(s) decoding {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

ข้อผิดพลาด: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

กรณีนี้ส่วนใหญ่เกิดขึ้นเนื่องจากมีการพิมพ์ผิด หรือบางส่วนขาดหายไป หรือไฟล์ Config อันเก่ายังคงเหลือค้างอยู่ คุณจะต้องล้างส่วนที่เหลือทั้งหมดแล้วลองติดตั้งอีกครั้ง

### 26. การหยุดบริการของ Heimdall และ Bor {#26-to-stop-heimdall-and-bor-services}

**สำหรับแพ็กเกจ Linux**:

หยุด Heimdall: `sudo service heimdalld stop`

หยุด Bor: `sudo service bor stop` หรือ

1. `ps -aux | grep bor` รับ PID สำหรับ Bor และหลังจากนั้นเรียกใช้คำสั่งดังต่อไปนี้
2. `sudo kill -9 PID`

**สำหรับไบนารี**:

หยุด Heimdall: `pkill heimdalld`

หยุดบริดจ์: `pkill heimdalld-bridge`

หยุด Bor: ไปที่ CS-2001/bor แล้วเรียกใช้ `bash stop.sh`

### 27. การลบไดเรกทอรี Heimdall และ Bor {#27-to-remove-heimdall-and-bor-directories}

**สำหรับแพ็กเกจ Linux**:
ลบ Heimdall: `sudo rm -rf /etc/heimdall/*`

ลบ Bor: `sudo rm -rf /etc/bor/*`

**สำหรับไบนารี**:

ลบ Heimdall: `sudo rm -rf /var/lib/heimdalld/`

ลบ Bor: `sudo rm -rf /var/lib/bor`

### 28. จะทำอย่างไรเมื่อคุณได้รับข้อผิดพลาด "Wrong Block.Header.AppHash" {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

ข้อผิดพลาดนี้มักเกิดขึ้นเนื่องจากคำขอ Infura หมดเวลาลง เมื่อคุณติดตั้งโหนดบน Polygon ให้คุณเพิ่ม Infura Key ให้กับไฟล์ Config (Heimdall) โดยค่าเริ่มต้น คุณได้รับอนุญาต 100,000 คำขอต่อวัน หากเกินขีดจำกัดนี้ คุณจะประสบปัญหาดังกล่าว เมื่อต้องการการแก้ไขปัญหานี้ คุณสามารถสร้างคีย์ API ใหม่และเพิ่มลงในไฟล์ `config.toml`