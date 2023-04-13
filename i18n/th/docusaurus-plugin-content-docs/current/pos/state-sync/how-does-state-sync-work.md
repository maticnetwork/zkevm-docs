---
id: how-state-sync-works
title: การซิงค์สถานะทำงานอย่างไร
description: "การส่งสถานะจากเชน Ethereum ไปยังเชน Bor"
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# การซิงค์สถานะทำงานอย่างไร {#how-does-state-sync-work}

การจัดการสถานะจะส่งข้อมูลสถานะจากเชน Ethereum ไปยังเชน Borเรียกว่า **Statesync**.

การโอนสถานะจาก Ethereum ไปยัง Bor จะเกิดขึ้นผ่านการเรียก ระบบแล้วหากว่า ผู้ใช้ฝากยูเอสดีซีไปยังตัวจัดการการฝากบน Ethereumตัวตรวจสอบความถูกต้องจะรอรับอีเวนต์เหล่านั้น ตรวจสอบความถูกต้อง และเก็บไว้ในสถานะ HeimdallBor ได้รับบันทึกการซิงค์สถานะล่าสุดและอัปเดตสถานะ Bor (สร้างยอด USDC ที่เท่ากัน ใน Bor) โดยใช้การเรียกระบบ

## State sender {#state-sender}

ที่มา: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

ในการซิงค์สถานะ สัญญาจะเรียกใช้เมธอด **state sender contract** บนเชน Ethereum

```jsx
contract StateSender {
	/**
	 * Emits `stateSynced` events to start sync process on Ethereum chain
	 * @param receiver    Target contract on Bor chain
	 * @param data        Data to send
	 */
	function syncState (
		address receiver,
		bytes calldata data
	) external;
}
```

สัญญา `receiver` ต้องมีอยู่ในเชนย่อย ซึ่งได้รับสถานะ `data` เมื่อกระบวนการเสร็จสมบูรณ์ `syncState` จะปล่อยอีเวนต์ `StateSynced` บน Ethereum ซึ่งมีลักษณะดังต่อไปนี้:

```jsx
/**
 * Emits `stateSynced` events to start sync process on Ethereum chain
 * @param id                  State id
 * @param contractAddress     Target contract address on Bor
 * @param data                Data to send to Bor chain for Target contract address
 */
event StateSynced (
	uint256 indexed id,
	address indexed contractAddress,
	bytes data
);
```

เมื่ออีเวนต์ `StateSynced` มีการส่งบนสัญญา `stateSender` บนเชน Ethereum ทาง Heimdall จะรอรับอีเวนต์เหล่านั้นและเพิ่มลงในสถานะ Heimdall หลังจากที่ตัวตรวจสอบความถูกต้องมากกว่า 2 ใน 3 ตกลง

หลังแต่ละสปรินต์ (ปัจจุบันมี 64 บล็อกบน Bor) Bor จะดึงข้อมูลบันทึกการซิงค์สถานะใหม่และอัปเดตสถานะโดยใช้การเรียก `system`นี่คือโค้ด: [https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

ระหว่าง `commitState` Bor จะดำเนินการ `onStateReceive` โดยมี `stateId` และ `data` เป็นอาร์กิวเมนต์บนสัญญาเป้าหมาย

## อินเทอร์เฟซตัวรับสถานะบน Bor {#state-receiver-interface-on-bor}

สัญญา `receiver` บนเชน Bor ต้องนำอินเทอร์เฟซต่อไปนี้ไปใช้

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

อนุญาตเฉพาะ `0x0000000000000000000000000000000000001001` — `StateReceiver.sol` ให้เรียกฟังก์ชัน `onStateReceive` บนสัญญาเป้าหมายได้

## การเรียกระบบ {#system-call}

เฉพาะที่อยู่ระบบ `2^160-2` เท่านั้นที่สามารถอนุญาตการเรียกระบบได้Bor จะเรียกใช้ภายในระบบ โดยมีที่อยู่ระบบเป็น `msg.sender`ซึ่งจะเปลี่ยนสถานะสัญญาและอัปเดตต้นทางของสถานะสำหรับบล็อกเฉพาะได้รับแรงบันดาลใจจาก [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) และ [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

การเรียกระบบมีประโยชน์ในการเปลี่ยนสถานะให้กับสัญญาโดยไม่ต้องทำธุรกรรมใดๆ

## บันทึกการซิงค์สถานะและการรับบล็อก Bor {#state-sync-logs-and-bor-block-receipt}

มีการจัดการอีเวนต์ที่การเรียกระบบส่งออกมาด้วยวิธีที่ต่างจากบันทึกธรรมดานี่คือโค้ด: [https://github.com/maticnetwork/bor/ดึง 90](https://github.com/maticnetwork/bor/pull/90)

Bor ผลิต tx / ใบเสร็จใหม่สำหรับลูกค้าซึ่งรวมถึงบันทึกทั้งหมดสำหรับการซิงค์สถานะTx hash ได้รับการมาจากหมายเลขบล็อกและแฮช(บล็อกสุดท้ายที่ Sprint):

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

ซึ่งจะไม่เปลี่ยนตรกะที่ทามติ มีการเปลี่ยนแปลงเพียง`eth_getBlockByNumber``eth_getTransactionReceipt`ตัวไคลเอนต์เท่านั้น `eth_getLogs`รวมถึงปูมบันทึกการซิงค์แบบสถานะด้วยโปรดทราบว่า Bloom Filter บนบล็อกไม่ได้นับรวมถึงการรวมบันทึกการซิงค์สถานะนอกจากนี้ยังไม่ได้รวมtx ที่มาใน `transactionRoot`หรือ`receiptRoot`