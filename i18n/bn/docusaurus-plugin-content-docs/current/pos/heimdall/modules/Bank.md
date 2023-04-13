---
id: bank
title: ব্যাঙ্ক
description: Heimdall জন্য মডিউল হ্যান্ডলিং অ্যাকাউন্ট ব্যালেন্স ট্রান্সফার
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# ব্যাংক মডিউল {#bank-module}

`bank` Heimdall-এর জন্য মডিউল অ্যাকাউন্টের ব্যালেন্স ট্রান্সফার পরিচালনা করে। এই মডিউলটি cosmos-sdk-এর `bank`মডিউলের সাথে সম্পর্কিত।

## মেসেজ
 {#messages}

### MsgSend {#msgsend}

`MsgSend`Heimdall-এ অ্যাকাউন্টগুলোর মধ্যে ট্রান্সফার পরিচালনা করে। লেনদেনের মেসেজের জন্য এখানে একটি কাঠামো রয়েছ:

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend`Heimdall-এর জন্য অ্যাকাউন্টের মধ্যে মাল্টি ট্রান্সফার পরিচালনা করে।

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## প্যারামিটার {#parameters}

ব্যাঙ্ক মডিউলে এই প্যারামিটার রয়েছে:

| "কী" | ধরন | ডিফল্ট মান |
|----------------------|--------|------------------|
| `sendenabled` | বুল | সত্য |

## CLI কমান্ড {#cli-commands}

### ব্যালেন্স পাঠান {#send-balance}

নিম্নলিখিত কমান্ড উল্লেখ করা 1000 ম্যাটিক টোকেন `address`পাঠাবে;

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
