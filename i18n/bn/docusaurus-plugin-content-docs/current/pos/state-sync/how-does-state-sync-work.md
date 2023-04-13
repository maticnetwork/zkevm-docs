---
id: how-state-sync-works
title: স্টেট সিঙ্ক কীভাবে কাজ করে?
description: "Ethereum চেইন থেকে Bor চেইনে স্টেটটি প্রেরণ করা।"
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# স্টেট সিঙ্ক কীভাবে কাজ করে? {#how-does-state-sync-work}

স্টেট ম্যানেজমেন্ট স্টেটটিকে Ethereum চেইন থেকে Bor চেইনে পাঠায়। এটি **state-sync**. বলা হয়।

Ethereum থেকে বোর পর্যন্ত স্টেট ট্রান্সফার সিস্টেম কল মাধ্যমে হবে। Suppose, একজন ব্যবহারকারী Ethereum-এ ডিপোজিট ম্যানেজারে USDC জমা দি. ে। যাচাইকারী সেই ইভেন্টগুলো শুনতে, যাচাই, এবং সেগুলো হেইমডেল স্টেটে সংরক্ষণ করে। Bor সর্বশেষ স্টেট-সিঙ্ক রেকর্ড পায় এবং একটি সিস্টেম কল ব্যবহার করে Bor স্টেট (Bor-এ USDC সমান পরিমাণ তৈরি করে) আপডেট করে।

## স্টেট প্রেরক {#state-sender}

সূত্র: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

স্টেট সিঙ্ক করতে, কন্ট্র্যাক্ট Ethereum চেইনে নিম্নলিখিত পদ্ধতি **স্টেট প্রেরক কন্ট্র্যাক্ট** কল করে।

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

`receiver`-চুক্তিকে অবশ্যই চাইল্ড চেইনে উপস্থিত থাকতে হবে, যা প্রক্রিয়াটি একবার সম্পূর্ণ হলে স্টেট`data`  প্রাপ্ত হয়। `syncState` Ethereum-এ`StateSynced`  ইভেন্ট নির্গত করে, যা নিম্নরূপ:

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

Ethereum চেইনে `StateSynced` কন্ট্র্যাক্টে `stateSender` ইভেন্টটি নির্গত হওয়ার পরে, Heimdall সেই ইভেন্টগুলি শোনে এবং 2/3+ যাচাইকারীরা সম্মত হওয়ার পরে সেটিকে Heimdall স্টেটে যোগ করে।

প্রতিটি স্প্রিন্ট (বর্তমানে Bor-এ 64ব্লক) এর পরে, Bor নতুন স্টেট-সিঙ্ক রেকর্ড টেনে আনে এবং একটি `system` কল ব্যবহার করে স্টেটটি আপডেট করে। এটির জন্য কোড এখানে দেওয়া হল:[ https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L5](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)1

`commitState`-র সময়, লক্ষীভূত চুক্তিতে, Bor আর্গুমেন্ট হিসাবে`stateId`  এবং`data`  দিয়`onStateReceive`ে  সম্পাদন করে।

## Bor এ স্টেট রিসিভার ইন্টারফেস {#state-receiver-interface-on-bor}

Bor চেইনে `receiver` চুক্তিকে অবশ্যই নিম্নলিখিত ইন্টারফেস কার্যকর করতে হবে।

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

শুধুমাত্র `0x0000000000000000000000000000000000001001` — `StateReceiver.sol`, লক্ষীভূত চুক্তিতে অবশ্যই `onStateReceive` ফাংশনকে কল করার অনুমতি দিতে হবে।

## সিস্টেম কল {#system-call}

শুধুমাত্র সিস্টেম অ্যাড্রেস `2^160-2`, একটি সিস্টেম কল করার অনুমতি দেয়। Bor `msg.sender` হিসাবে সিস্টেম অ্যাড্রেস দিয়ে এটিকে অভ্যন্তরীণভাবে কল করে। এটি কন্ট্র্যাক্ট স্টেটটি পরিবর্তন করে এবং একটি নির্দিষ্ট ব্লকের জন্য স্টেট রুট আপডেট করে। [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) এবং [ https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)-এর থেকে অনুপ্রাণিত

সিস্টেম কল কোনও লেনদেন না করে কনট্র্যাক্ট করতে স্টেট পরিবর্তন করতে সহায়ক।

## স্টেট-সিঙ্ক লগগুলি এবং Bor ব্লক রিসিট {#state-sync-logs-and-bor-block-receipt}

সিস্টেম কল দ্বারা নির্গত ইভেন্টগুলি স্বাভাবিক লগের চেয়ে ভিন্ন ভাবে চালনা করা হয়। এখানে কোড: [https://github.com/maticnetwork/bor/pull/90](https://github.com/maticnetwork/bor/pull/90)।

বোর শুধু ক্লায়েন্টের জন্য একটি নতুন tx / receipt া তৈরি করে যার মধ্যে স্টেট-সিঙ্কের জন্য সমস্ত লগ রয়েছে। Tx হ্যাশ ব্লক নম্বর এবং ব্লক হ্যাশ থেকে প্রাপ্ত (যে স্প্রিন্টে শেষ ব্লক):

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

এটি কোন কনসেনসাস লজিক পরিবর্তন করে না, শুধুমাত্র ক্লায়েন্ট পরিবর্তন। `eth_getBlockByNumber``eth_getTransactionReceipt`, , এবং derived সঙ্গে state-sync লগ অন্তর্ভুক্ত `eth_getLogs`করে। মনে রাখবেন যে ব্লকে ব্লুম ফিল্টারটি স্টেট-সিঙ্ক লগগুলির জন্য অন্তর্ভুক্তি অন্তর্ভুক্ত করে না। এটি এছাড়াও মধ্যে derived tx অন্তর্ভুক্ত না `transactionRoot`বা ।`receiptRoot`