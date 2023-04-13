---
id: wallet-bridge-faq
title: สำนักงานการดำเนินการ<>Wallet Bridge
description: สร้างแอปบล็อกเชนถัดไปบน Polygon
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## ฉันสามารถใช้กระเป๋าสตางค์ของ Polygon ได้ที่ไหน? {#where-can-i-use-the-polygon-web-wallet}
นี่คือที่อยู่ URL Suite ของ Polygon : https://กระเป๋าสตางค์ เทคโนโลยี polygon./ Wallet Polygon เป็นชุดคอลเลกชันของแอพพลิเคชัน Web3 ที่กำหนด โดย Polygonประกอบด้วย[กระเป๋าสตางค์ Polygon](https://wallet.polygon.technology/polygon/assets) (กระเป๋าสตางค์แบบด้านล่าง) [สะพาน](https://wallet.polygon.technology/polygon/bridge/deposit)โพลีกอน (สะพาน L1-L2 ), [Polygon Stake](https://staking.polygon.technology/) (สภาพแวดล้อมสำหรับการเดิมพันและโทเค็นที่มอบหมาย) และ [Polygon Safe Bridge](https://safe-bridge.polygon.technology/safe) (สะพานแบบมัลติซิก)

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## กระเป๋าเงินใดบ้างที่รองรับในปัจจุบัน {#which-wallets-are-currently-supported}

เมตาสก, โคลิน เบส , กระเป๋าสตางค์ Bitski , Venly และ WalletConnect คือกระเป๋าสตางค์ที่รองรับในปัจจุบัน

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## ฉันทำอะไรกับ Polygon Wallet ของฉันได้บ้าง {#what-can-i-do-with-my-polygon-wallet}

- ส่งเงินไปยังบัญชีใดๆ ก็ได้บน Polygon
- ฝากเงินจาก Ethereum ไปยัง Polygon (โดยใช้บริดจ์)
- ถอนเงินกลับไปยัง Ethereum จาก Polygon (โดยใช้บริดจ์)

## วอลเล็ต Metamask ของฉันไม่เชื่อมต่อกับ Polygon Wallet {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

เหตุการณ์นี้มีได้หลายสาเหตุ เราขอแนะนำให้**คุณลองเวลาอื่น****ใช้เบราว์เซอร์อื่น**หรือหากสิ่งเหล่านี้ไม่ช่วย **[ติดต่อทีมการสนับสนุนของ](https://support.polygon.technology/support/home)**เรา

## ฉันจะฝากกองทุนจาก Ethereum ไปยัง Polygon โดยใช้สวีทของกระเป๋าสตางค์ Polygon ได้อย่างไร {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
โปรดดูวิดีโอด้านล่างหรือติดตาม[บทเรียนนี้](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon)

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>เบราว์เซอร์ของคุณไม่รองรับองค์ประกอบวิดีโอ</p>
</video>

## ฉันจะถอนเงินจากโพลกอน ไปยัง Ethereum ผ่านสะพาน PoS โดยใช้ห้องคุมข้อมูล Polygon ได้อย่างไร? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
โปรดดูวิดีโอด้านล่างหรือติดตาม[บทเรียนนี้](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge)

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>เบราว์เซอร์ของคุณไม่รองรับองค์ประกอบวิดีโอ</p>
</video>

## ฉันจะถอนเงินจากโพลกูนไปยัง Ethereum ผ่านสะพานพลาสม่าโดยใช้สวีทกระเป๋าสตางค์ Polygon ได้อย่างไร? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
โปรดดูวิดีโอด้านล่างหรือติดตาม[บทเรียนนี้](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge)

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>เบราว์เซอร์ของคุณไม่รองรับองค์ประกอบวิดีโอ</p>
</video>

## วิธีการเพิ่มโทเค็นใหม่หรือแบบกำหนดเองไปยังรายการ Polygon Wallet Token {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
โปรดติดตาม[บทเรียนนี้](/docs/faq/adding-a-custom-token)

## ฉันจะหาสัญญาโทเค็นได้อย่างไร {#how-do-i-find-the-token-contract}

ที่อยู่สัญญาของโทเค็นจะต้องใช้เมื่อคุณพยายามเพิ่มโทเค็นใหม่หรือโทเค็นแบบกำหนดเองคุณสามารถค้นหาโทเคโกโดยชื่อของมันบนโค้งโกหรือCoinMarketCap ซึ่งคุณจะสามารถดูที่อยู่บนเชน Ethereum (สำหรับโทเค็น) และโซ่น์ที่รองรับอื่นๆ เช่น Polygonที่อยู่โทเค็นในเชนอื่นๆ อาจไม่ได้รับการอัปเดต แต่คุณสามารถใช้ที่อยู่ root ตามความต้องการของคุณได้

## ฉันได้ฝากเงินของฉัน แต่ฉันไม่เห็นมันบน เมตาสก์ฉันต้องทำอย่างไร {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

คุณต้องเพิ่มที่อยู่โทเค็นแบบกำหนดเองไปยัง เมตาสก์

เปิด Metamask และเลื่อนลงแล้วคลิก**เพิ่มโทเค็น**

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

จากนั้นเพิ่มที่อยู่สัญญาการที่เกี่ยวข้อง สัญลักษณ์ และความแม่นยำแบบทศนิยมที่อยู่สัญญา (PoS-WETH ในกรณีนี้) สามารถพบได้บนลิงค์นี้: [https://docs.polygon.technology/docs/convertions/s/salk/mapped tokens/](https://docs.polygon.technology/docs/operate/mapped-tokens/)คุณจะต้องเพิ่มที่อยู่โทเค็นย่อยเพื่อดูยอดคงเหลือบน Polygon Mainnet ทศนิยมความแม่นยำคือ 18 สำหรับ WETH (สำหรับโทเค็นส่วนใหญ่ ทศนิยมของความแม่นยำคือ 18)

## ฉันจะเพิ่ม Polygon Maainnet บน Metamask ได้อย่างไร? {#how-can-i-add-polygon-mainnet-on-metamask}

ตรวจสอบ[แบบฝึกหัดนี้](/docs/develop/metamask/config-polygon-on-metamask)

## โทเค็นของฉันไม่ปรากฏในรายการ ฉันควรติดต่อใคร {#my-token-is-not-visible-in-the-list-who-should-i-contact}

ติดต่อทีม Polygon บน Discord หรือ Telegram เพื่อให้โทเค็นของคุณแสดงในรายการ ก่อนหน้านั้นโปรดตรวจสอบให้แน่ใจว่าโทเค็นของคุณแมปแล้ว หากไม่ได้ใช้ med โปรดเพิ่มคำขอที่ [https:///mapper.polygon.technology/](https://mapper.polygon.technology/)

## ฉันสามารถยกเลิกธุรกรรมของฉันหลังจากเช็คพอยต์มาถึงได้หรือไม่ {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
เมื่อมีการเริ่มธุรกรรมการถอนบน Polygon Main แล้ว จึงโชคไม่ดีที่จึงไม่สามารถยกเลิกหรือย้อนกลับได้ในการโอนการถอนโทเค็นจะถูกเผาจาก Polygon Maainnet และลบบนเมนเน็ต Ethereumดังนั้น โทเค็นหนึ่งครั้งจะถูกเผาจากเชน Polygon จึงไม่สามารถย้อนกลับไปยังกระเป๋าสตางค์ของคุณ

## ค่าแก๊สสูงเกินไป ให้ฉันยกเลิกธุรกรรมเลยมั้ยคะ {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

น่าเสียดายที่เราไม่สามารถยกเลิกธุรกรรมการถอนได้ เมื่อถูกเผาโทเค็นจาก Polygon Manetโดยกล่าวอีกนัยหนึ่งจึงเป็นไปไม่ได้ที่จะยกเลิกธุรกรรมเมื่อเริ่มดำเนินการแล้วค่าธรรมเนียมก๊าซไม่สามารถควบคุมได้โดยโพลีกอนโดยทั้งหมดจะขึ้นอยู่กับคอนแทปชั่นของเครือข่าย และจำนวนธุรกรรมในบล็อกเฉพาะบน Ethereum Mainหากคุณคิดว่าคุณไม่สามารถจ่ายค่าธรรมเนียมแก๊สปัจจุบันได้ คุณสามารถรอและพยายามดำเนินการกับธุรกรรมของคุณต่อเนื่องเมื่อค่าแก๊สอยู่ด้านล่างนอกจากนี้ คุณยังสามารถตรวจสอบค่าแก๊สบน Ethereum Maainnet จากที่นี่: https://etherscan.io/gastracker


## ฉันสามารถส่งโทเค็นจาก Polygon ไปยังวอลเล็ต/ตลาดแลกเปลี่ยนอื่นได้หรือไม่ {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

คุณไม่สามารถส่งโทเค็นโดยตรงจาก Polygon UI เพื่อแลกเปลี่ยน / Walletsคุณต้องถอนจาก Polygon ไปยัง Ethereum ก่อน แล้วส่งไปยังที่อยู่ตลาดแลกเปลี่ยนของคุณ (ยกเว้นว่าตลาดแลกเปลี่ยน/วอลเล็ตของคุณรองรับเครือข่ายอย่างแน่นอน)

## ฉันทำผิดพลาดในการส่งกองทุนไปยังการแลกเปลี่ยน / กระเป๋าสตางค์โดยตรงคุณช่วยฉันได้ไหม {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

ขออภัยด้วย เราไม่สามารถช่วยได้ในกรณีนี้ โปรดอย่าส่งเงินไปยังตลาดแลกเปลี่ยนที่รองรับแค่ Ethereum โดยตรง คุณต้องถอนจาก Polygon ไปยัง Ethereum ก่อน แล้วส่งไปยังที่อยู่ตลาดแลกเปลี่ยนของคุณ

## ฉันโอนไปยังที่อยู่ผิด ฉันจะนำเงินกลับมาได้อย่างไร {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

ขออภัยด้วย ทำอะไรไม่ได้ เฉพาะเจ้าของคีย์ส่วนตัวไปยังที่อยู่นั้นเท่านั้นที่สามารถย้ายสินทรัพย์เหล่านั้นได้โดยแนะนำให้ยืนยันว่าที่อยู่คุณกำลังส่งโทเค็นไปยังคืออันที่ถูกต้อง

## ธุรกรรมของฉันถูกส่งไปนานเกินไปฉันจะทำอะไรได้? {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
ธุรกรรมอาจส่งเนื่องจากเหตุผลต่อไปนี้:

1. การตั้งค่าราคาแก๊สต่ำในขณะที่ส่งธุรกรรม
2. การเพิ่มขึ้นอย่างฉับพลันในราคาน้ำมันเนื่องจากมีการแออัดบน Ethereum Mainnet
3. ธุรกรรมถูกยกเลิกโดยคุณจากกระเป๋าสตางค์หรือแทนที่ด้วยธุรกรรมใหม่

คุณสามารถดำเนินการต่อไปด้วยการโอนที่ตกลงไปในวิธีต่อไปนี้:

1. หากธุรกรรมของคุณติดอยู่เป็นเวลานานกว่าหนึ่งชั่วโมง ก็จะแสดงปุ่ม**อีกครั้ง**คุณสามารถคลิกบนปุ่ม **ลองอีกครั้ง**เพื่อทำการดำเนินการเดียวกันได้สำเร็จคุณสามารถอ้างอิงวิดีโอนี้เพื่อข้อมูลเพิ่มเติมเกี่ยวกับวิธีการใช้คุณสมบัติ **Sirch อีกครั้ง**
2. โปรดตรวจสอบกระเป๋าสตางค์ MetaMask ของคุณด้วยเช่นกันเนื่องจากบางครั้งธุรกรรมอาจจะลดลงเนื่องจากธุรกรรมแบบฟอร์ม ใน Metalaskในกรณีนี้ ลบธุรกรรมแบบฟอร์ม หรือติดตั้ง เมตาMask ในเบราว์เซอร์เดียวกัน
3. คุณสามารถติดตั้ง MetaMask ในเบราว์เซอร์อื่น จากนั้นพยายามที่จะเสร็จสิ้นธุรกรรมโดยใช้สูท Polygon
4. นอกจากนี้ คุณยังสามารถใช้ลิงค์นี้เพื่อจัดการธุรกรรมการถอนที่รออยู่ให้เสร็จวางแฮชธุรกรรมในตัวเลือกการค้นหา และคลิกปุ่ม **Exit ยืนยัน**เพื่อดำเนินการให้เสร็จสิ้น

## ฉันควรทำอย่างไรหากการฝากได้รับการยืนยันแต่ยอดคงเหลือไม่อัปเดต {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

ใช้เวลาประมาณ 22-30 นาทีในการจัดการธุรกรรมการฝากเพื่อเสร็จสมบูรณ์โปรดรอสักครู่และคลิกที่ **Refresh Balance**

## ฉันควรทำอย่างไรหากเช็คพอยต์ไม่ดำเนินการ {#what-should-i-do-if-the-checkpoint-is-not-happening}

บางครั้งเช็คพอยต์จะใช้เวลามากกว่า 45 นาทีถึง 1 ชั่วโมงโดยอิงจากคอนแทปชั่นเครือข่ายบน Ethereum เราแนะนำให้รอสักครู่ก่อนที่จะเพิ่มตั๋ว

## ธุรกรรมของฉันหยุดชะงัก {#my-transaction-is-stuck}

เราได้แสดงข้อผิดพลาดทั่วไปบางอย่างที่ผู้ใช้อาจเผชิญคุณสามารถดูวิธีแก้ปัญหาได้ที่ด้านล่างของรูปภาพข้อผิดพลาด ในกรณีที่คุณพบข้อผิดพลาดอื่น โปรด[เปิด Ticket สนับสนุน](https://support.polygon.technology/support/home)ให้ทีมของเราแก้ปัญหา

  - ### ข้อผิดพลาดที่พบบ่อย {#common-errors}
ก. การถอนติดอยู่ที่ขั้นตอนเริ่มต้นแล้ว

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

  ข. ข้อผิดพลาด RPC

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/operate/network#matic-mainnet) for more information.

  ค.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

  มักเป็นข้อผิดพลาดที่เกิดบ้างไม่เกิดบ้างที่ได้รับการแก้ไขเองโดยอัตโนมัติ หากคุณยังได้รับข้อผิดพลาดเดิมตอนที่เริ่มดำเนินการขั้นตอนนี้ใหม่ ให้[เปิด Ticket สนับสนุน](https://support.polygon.technology/)พร้อมด้วยข้อมูลที่เกี่ยวข้องทั้งหมดเพื่อแก้ไขปัญหานี้ต่อไป


## ระบบแสดงข้อผิดพลาดว่ายอดคงเหลือไม่เพียงพอ {#i-m-shown-an-insufficient-balance-error}

การถอนและฝากเงินบนเครือข่าย Polygon มีค่าใช้จ่ายถูก ข้อผิดพลาดยอดคงเหลือไม่เพียงพอสามารถแก้ไขได้ด้วยการนำยอดคงเหลือ ETH จำนวนหนึ่งเข้า Ethereum Mainnet โดยทั่วไปจะลบปัญหาของสมดุลที่ไม่เพียงพอหากนี่เป็นธุรกรรมบน Polygon Main เราจะต้องใช้ ให้คุณมีโทเค็นจำนวนที่เพียงพอ

## ธุรกรรมของฉันไม่ปรากฏบน Explorer ฉันควรทำอย่างไร {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

นี่น่าจะเป็นปัญหาการจัดทำดัชนีด้วย Polygonscan โปรดติดต่อ[ทีมสนับสนุน](https://support.polygon.technology/support/home)เพื่อแก้ไขความชัดเจนเพิ่มเติม

## ฉันเริ่มต้นการฝากบน Ethereum แล้ว แต่ระบบยังแสดงว่ารอดำเนินการอยู่ ฉันควรทำอย่างไร {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

ก๊าซที่จ่ายของคุณอาจต่ำเกินไป คุณควรรอสักครู่ แล้วดำเนินธุรกรรมอีกครั้งหากยังไม่โดนขุดไป หากต้องการความช่วยความเพิ่มเติม โปรดติดต่อ[ทีมสนับสนุน](https://support.polygon.technology/support/home)พร้อมด้วยที่อยู่วอลเล็ตของคุณ, Hash ของธุรกรรม (หากมี) และภาพหน้าจอที่เกี่ยวข้อง

## ฉันไม่ได้รับ Hash ธุรกรรมและไม่ได้รับเงินฝากของฉัน เกิดอะไรขึ้น {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

คุณอาจมีธุรกรรมที่รอดำเนินการอยู่ก่อนหน้านี้ โปรดยกเลิกหรือเร่งให้ดำเนินการก่อน ธุรกรรมใน Ethereum สามารถดำเนินการได้ทีละอย่างเท่านั้น

## ระบบแสดงว่า Polygon ไม่คิดค่าถอนใดๆ แต่เราต้องชำระในตอนดำเนินธุรกรรม {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

ธุรกรรมการถอนด้วยบริดจ์ Plasma จะแบ่งเป็น 3 ขั้นตอน หนึ่งขั้นตอนเกิดขึ้นบน Polygon Mainnet และสองขั้นตอนที่ดำเนินการบน Ethereum Mainnet บนบริดจ์ PoS ธุรกรรมการถอนจะเกิดขึ้นในสองขั้นตอน: การเบิร์นโทเค็นบนเครือข่าย Polygon และการส่งหลักฐานบนเครือข่าย Ethereum ในทุกกรณี การเบิร์นโทเค็นที่เกิดขึ้นบน Polygon Mainnet มีค่าใช้จ่ายถูกมาก ขั้นตอนที่เหลือที่เกิดขึ้นบน Ethereum Mainnet จะต้องชำระ ETH ขึ้นอยู่กับราคาก๊าซปัจจุบัน โดยคุณสามารถตรวจสอบได้[ที่นี่](https://ethgasstation.info/)

## ฉันพยายามฝากเงิน แต่ธุรกรรมหยุดอยู่ที่ขั้นตอนอนุมัติ {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

หากธุรกรรมยังอยู่ที่ขั้นตอน**อนุมัติ** แสดงว่ายังดำเนินการไม่เสร็จสิ้น ในการทำให้เสร็จสิ้น คุณต้องชำระค่าก๊าซ แล้วจึงดำเนินการต่อได้

## Polygon Wallet แสดงข้อความข้อผิดพลาดว่า ‘ผู้ใช้ปฏิเสธลายเซ็นธุรกรรม (User denied transaction signature)’ {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

สิ่งนี้มักจะเกิดขึ้นเพราะว่าผู้ใช้ยกเลิกหรือปฏิเสธที่จะเซ็นธุรกรรมผ่าน Metamask เมื่อได้รับการแจ้งให้ทราบโดยกระเป๋าสตางค์ MetaMask ดำเนินการด้วยการลงนามโดยคลิกบน **Approve** และไม่ใช่บน**แคนเซิล**

## ธุรกรรมทำงานสำเร็จ แต่แสดงการส่งออก {#the-transaction-is-successful-but-it-shows-pending}

หากธุรกรรมของคุณเสร็จสิ้นแล้ว คุณได้รับเงินทุนของคุณ แต่ยังคง  จะแสดงการจ่ายบน UI คุณสามารถเพิ่มตั๋วการสนับสนุนได้โดยส่งรายละเอียดและภาพถ่ายที่เกี่ยวข้องได้

## อะไรคือรายชื่อการเปลี่ยนการรองรับบน Polygon {#what-is-the-list-of-supported-exchanges-on-polygon}

เหรียญ MATIC สามารถซื้อขายได้ในหลายการแลกเปลี่ยนอย่างไรก็ตาม มันสำคัญเสมอที่จะทำการวิจัยของคุณเอง เมื่อคุณเลือกหนึ่งเพื่อทำการค้าโดยไม่ได้ผิดปกติที่การแลกเปลี่ยนบางประการยังคงทำให้การเปลี่ยนแปลงไปยังโทเค็นที่มีอยู่ปัจจุบันของพวกเขาและยังมีช่วงการบำรุงรักษา

คุณอาจไป[เยี่ยมสโมสร]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) Coinmetcape เพื่อรายการการแลกเปลี่ยนที่คุณอาจหา Matic

## Polygon รองรับวอลเล็ตฮาร์ดแวร์หรือไม่ {#does-polygon-support-hardware-wallets}

ใช่เรารองรับตู้ฮาร์ดแวร์ต่อไปนี้:
1. เทรซอร์
2. เล็ดเกอร์

ผู้ใช้สามารถเชื่อมต่อตัวเลือกกระเป๋าสตางค์ของฮาร์ดแวร์บน Meta Mask และดำเนินการต่อไปด้วยการดำเนินการของตนนี่คือลิงค์สำหรับเชื่อมต่อกระเป๋าสตางค์ฮาร์ดแวร์บน Metamask :https://metamask.zendesk.com/hc/en-us/บทความ/44085261275

## ทำไมโทเค็น MATIC จึงไม่รองรับบน PoS {#why-isn-t-the-matic-token-supported-on-pos}

MATIC เป็นโทเค็นเนทีฟของ Polygon และมีที่อยู่สัญญาคือ - 0x0000000000000000000000000000000000001010 บนเชน Polygon นอกจากนี้ยังใช้เพื่อจ่ายสำหรับแก๊สการแมปโทเค็น MATIC บนบริดจ์ PoS จะทำให้ MATIC มีที่อยู่สัญญาเพิ่มอีกอันบนเชน Polygon ซึ่งจะไปชนกับที่อยู่สัญญาที่มีอยู่ เนื่องจากที่อยู่โทเค็นใหม่นี้ไม่สามารถใช้ชำระค่าก๊าซได้และจะต้องเป็นโทเค็น ERC20 ปกติบนเชน Polygon ดังนั้น เพื่อหลีกเลี่ยงความสับสนนี้ เราจึงตัดสินใจที่จะคงเหลือ MATIC บนพลาสม่า

## ฉันจะแมปโทเค็นได้อย่างไร {#how-do-i-map-tokens}

โปรดอ้างอิงถึง[คำสอนนี้] (/docs/deleveloption/ethereum-polygon/submiting - mapping) หรือคุณสามารถตรงไปที่[Mapper](https://mapper.polygon.technology/)

## ฉันควรทำอย่างไรหากธุรกรรมใช้เวลานานเกินไปหรือราคาก๊าซสูงเกินไป {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

เวลาดำเนินการและราคาแก๊สแตกต่างกันไปตามการแออัดของเครือข่าย และยังถูกกำหนดโดยอุปทานและความต้องการระหว่างตัวส่งของเครือข่าย

สิ่งที่คุณสามารถทำได้:
- อดทนไว้
- เพิ่มค่าธรรมเนียมแก๊สหากช้าเกินไป
- ตรวจสอบค่าธรรมเนียมก่อนที่จะส่งธุรกรรมนี่คือลิงค์สำหรับตัวติดตามแก๊ส Etherscan :https://etherscan.io/gastracker

สิ่งที่คุณไม่ควรทำ:
- โปรดอย่าตั้งขีดจำกัดของแก๊สหรือธุรกรรมของคุณอาจล้มเหลว
- อย่าพยายามยกเลิกธุรกรรมตรวจสอบค่าธรรมเนียมก่อนหน้า


## ฉันสามารถเปลี่ยนขีดจำกัดก๊าซหรือราคาก๊าซได้หรือไม่ {#can-i-change-the-gas-limit-or-the-gas-price}

ขีดจำกัดของแก๊สจะประเมินและตั้งค่าตามโปรแกรมตามข้อกำหนดบางประการของฟังก์ชัน ที่ถูกเรียกว่า ในสัญญาซึ่งไม่ควรปรับเปลี่ยน สามารถเปลี่ยนราคาแก๊สเพื่อเพิ่มหรือลดค่าธรรมเนียมของธุรกรรม

## วิธีการเร่งธุรกรรมหรือไม่ {#how-to-speed-up-the-transactions}
คุณสามารถทำได้โดยเพิ่มค่าธรรมเนียมแก๊สนี่คือลิงค์ที่อธิบายวิธีการทำบน Metalask: https://metamask.zendesk.com/hc/en-us/ticles /360015489251-How-to-Speed-Up-Cancel-a-Pending-Conftion-Conftion

## โทเค็น MATIC จะเพียงพอสำหรับค่าธรรมเนียมการเติมน้ำมันเท่าไหร่ {#how-much-matic-token-is-enough-for-the-gas-fee}
ผู้ใช้จำเป็นต้องมีMATIC ขั้นต่ำ 0.01 ใน Main Polygon

## ฉันเปิด Ticket สนับสนุนได้ที่ไหน {#where-do-i-raise-a-support-ticket}
หากคุณต้องการความช่วยเหลือจากผู้เชี่ยวชาญของเรา โปรดส่งข้อความไปยัง https://support.polygon.technology/support/home

## ฉันจะบริดจ์สินทรัพย์ข้ามเชนได้อย่างไร {#how-do-i-bridge-assets-across-chains}

Polygon มีสะพานเพื่อย้ายสินทรัพย์จาก Ethereum ไปยัง Polygon และในทางกลับกันคุณสามารถเรียนรู้เพิ่มเติมเกี่ยวกับเรื่องนี้บน[ส่วนสะพาน]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started))ของ wiki นี้

อย่างไรก็ตาม หากคุณใช้บริการภายนอกใด ๆ ที่ไม่มี Polygon เราจึงขอแนะนำให้คุณเข้าถึงบริการลูกค้าเพื่อร้องขอบทเรียนและคำแนะนำของพวกเขานอกจากนี้ยังเป็นสิ่งสำคัญในการทำการวิจัยของคุณเองเมื่อคุณใช้บริการ web3

## ฉันมีปัญหาการถอนโทเค็นกับ OpenSea หรือแอปพลิเคชันอื่นๆ ที่ใช้บริดจ์ Polygon {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

หากคุณมีปัญหากับธุรกรรมการถอนของคุณติดอยู่ Polygon จะเสนอสะพานถอนพร้อมกับ [https://gawing เทคโนโลยี polygon.](https://withdraw.polygon.technology)เพื่อช่วยให้คุณออกจากพื้นดินหากคุณมีแฮชการเผาไหม้ของคุณด้วยเครื่องมือนี้ คุณจะออนบอร์ดอย่างรวดเร็วและปัญหาจะได้รับแก้ไข คำถามอื่น ๆ เกี่ยวกับธุรกรรมของคุณกับ OpenSea และ dApps อื่น ๆ จะต้องจัดการโดยทีมโปรแกรม

## ฉันโดนหลอกลวง ฉันจะนำโทเค็นของฉันกลับมาได้อย่างไร {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

ขออภัยด้วย ไม่มีกระบวนการกู้คืนเหรียญที่สูญเสียไปแล้ว เราถามก่อนที่คุณจะทำการธุรกรรม คุณสามารถตรวจสอบและตรวจสอบซ้ำก่อนที่จะเริ่มและเสร็จสิ้น โปรดทราบว่าเครือข่าย Polygon และมือจับอย่างเป็นทางการของเราไม่สามารถเข้าร่วม ในโพสต์ของ giveway หรือโทเค็นสองเท่า และเราจะไม่มีทางเข้าใกล้คุณในนามขององค์กรโปรดอย่าสนใจความพยายามเหล่านี้เพราะมักจะเป็นการหลอกลวง การสื่อสารทั้งหมดของเราผ่านมือจับอย่างเป็นทางการของเรา

## มีธุรกรรมที่ไม่ได้รับอนุญาตในวอลเล็ตของฉัน วอลเล็ตของฉันโดนแฮ็กหรือเปล่า {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

ขออภัยด้วย เครือข่ายไม่สามารถย้อนคืนธุรกรรมที่ไม่พึงประสงค์ได้
การระมัดระวังรักษาคีย์ส่วนตัวของคุณเป็นสิ่งสำคัญเสมอและ**อย่าบอกให้ใครรู้**
หากคุณยังมีเงินเหลืออยู่บ้าง ให้โอนไปยังวอลเล็ตใหม่ทันที

## Ethereum มี Goerli เป็นเครือข่ายการทดสอบเครือข่าย Polygon มีเครือข่ายทดสอบด้วยหรือไม่? {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

เนื่องจากเครือข่าย Ethereum มี Gerli เป็นเครือข่ายการทดสอบ คือ Polygon Mainnet มี มุมไบธุรกรรมทั้งหมดบนเครือข่ายทดสอบนี้จะถูก Index บน Mumbai Explorer

## ฉันจะเปลี่ยนโทเค็นของฉันสำหรับโทเค็นอื่นได้อย่างไร {#how-can-i-swap-my-tokens-for-other-tokens}
โปรดดูวิดีโอด้านล่างหรือติดตาม[บทเรียนนี้](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap)

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>เบราว์เซอร์ของคุณไม่รองรับองค์ประกอบวิดีโอ</p>
</video>

## การสลับโทเค็นช้าเกินไป {#the-token-swap-is-too-slow}

หากคุณกำลังพยายามแลกโทเค็นแล้วใช้เวลานานเกินไป คุณสามารถลองธุรกรรมเดียวนี้ในเบราว์เซอร์อื่น หากยังไม่ได้ผลแล้วคุณพบกับข้อผิดพลาด โปรดส่งภาพหน้าจอไปยังทีมสนับสนุนของเรา

## โทเค็นตัวไหนถูกเรียกเก็บเพื่อเป็นค่าเปลี่ยนแก๊สสำหรับการแปลงโทเค็น {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
MATIC

## ฉันจะเปลี่ยนโทเค็นเพื่อเติมน้ำมันได้อย่างไร {#how-can-i-swap-my-token-for-gas}
โปรดดูวิดีโอด้านล่างหรือติดตาม[บทเรียนนี้](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas)

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>เบราว์เซอร์ของคุณไม่รองรับองค์ประกอบวิดีโอ</p>
</video>

## ใช้โทเค็นไหนเพื่อแลกเปลี่ยนสำหรับแก๊สได้ {#which-tokens-can-be-used-to-swap-for-gas}
มีเพียงโทเค็นเหล่านี้ได้รับการสนับสนุนสำหรับ ‘Swiftware สำหรับแก๊ส: ETH, USDT, DAI, AAVE, LINK, WBTC, UNI, GHST, TEL, EMON และ COMBO.

## วิธีรับโทเคนของ ETH {#how-to-get-eth-tokens}
เพื่อเรียกร้องโทเค็น Eth คุณสามารถแลกเปลี่ยนได้เพื่อแลกเปลี่ยนได้เพื่อแลกเปลี่ยนเพื่อแลกเปลี่ยนของโทเค็น หรือโอนเงินด้วยการแลกเปลี่ยน ซื้อบนแรมพี (หรือ บน เมแทมาสก์ ) หรือแม้แต่จะเปลี่ยนโทเค็นอื่น ๆ สำหรับ ETH โดยใช้[คุณสมบัติ แลกเปลี่ยนโทเค็นของโหนด Polygon](https://wallet.polygon.technology/polygon/token-swap)

## ฉันจะรับโทเค็น MATIC เพื่อใช้ชำระค่าก๊าซอย่างไร {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

เรามีบริการ[แลกก๊าซ](https://wallet.polygon.technology/gas-swap/)ที่สามารถช่วยคุณได้ในเรื่องนี้ คุณเลือกจำนวน MATIC ที่คุณต้องใช้ในการดำเนินธุรกรรม แล้วคุณสามารถแลกกับโทเค็นอื่นๆ ได้ เช่น Ether หรือ USDT โปรดทราบว่านี้เป็น**ธุรกรรมที่ไม่ใช่ก๊าซ**

## ฉันสามารถรับโทเค็น MATIC ได้โดยตรงที่ไหน {#where-can-i-get-matic-tokens-directly}

ดังนั้นโทเค็นของ MATIC จึงสามารถซื้อได้จากระบบกลาง ([Bainance](https://www.binance.com/en), [Coinbase](https://www.coinbase.com/) eet.al) หรือแบบย่อยสลาย ([Uniswap](https://uniswap.org/), การแลกเปลี่ยน [QuickSwap](https://quickswap.exchange/#/swap))นอกจากนี้ คุณยังสามารถวิจัยและลองบนเมนต์บางอย่าง เช่น [ทรานแซก](https://transak.com/) และ [Ramp](https://ramp.network/).วัตถุประสงค์ของการซื้อเหรียญ MATIC ของคุณควรตัดสินว่าคุณจะซื้อจากที่ไหนและรวมถึงเครือข่ายด้วย แนะนำให้มี MATIC บน Ethereum Mainnet หากความตั้งใจของคุณคือการเดิมพันหรือการมอบหมายใดหากจุดประสงค์ของคุณคือธุรกรรมบน Polygon Manet คุณควรถือและโอนแบบ MATIC บน Polygon Manet





