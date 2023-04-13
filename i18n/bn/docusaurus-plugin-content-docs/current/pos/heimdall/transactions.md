---
id: transactions
title: Transactions
description: লেনদেনের কি এবং যখন তাদের ব্যবহার করা are
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Transactions {#transactions}

লেনদেনের মধ্যে রয়েছে মডিউলের হ্যান্ডলারের মাধ্যমে একটি মডিউলের মধ্যে রাষ্ট্রীয় পরিবর্তন ট্রিগার করে এমন [কনটেক্সট](https://docs.cosmos.network/main/core/context.html) এবং [মেসেজে](https://docs.cosmos.network/main/building-modules/messages-and-queries.html) মেটাডাটা ধারণ।

যখন ব্যবহারকারীরা কোনও অ্যাপ্লিকেশনের সাথে যোগাযোগ করতে চায় এবং স্টেট পরিবর্তন করতে চায় (যেমন কয়েন পাঠানো), তখন তারা লেনদেন তৈরি করে।
নেটওয়ার্কে লেনদেন সম্প্রচার করার আগে প্রতিটি লেনদেনের `message` যথাযথ অ্যাকাউন্টের সাথে যুক্ত ব্যক্তিগত কী ব্যবহার করে সাইন করতে হবে। এরপর একটি লেনদেন অবশ্যই একটি ব্লকের মধ্যে অন্তর্ভুক্ত করতে হবে, বৈধ করতে হবে এবং তারপর ঐক্যমত্য প্রক্রিয়ার মাধ্যমে নেটওয়ার্ক দ্বারা অনুমোদিত করতে হবে৷ লেনদেনের জীবনচক্রের সম্পর্কে আরও পড়তে [এখানে ](https://docs.cosmos.network/main/basics/tx-lifecycle.html) ক্লিক করুন।

## প্রকারের সংজ্ঞা {#type-definition}

লেনদেনের অবজেক্টের হল SDK ধরনের যা ইন্টারফেসটি বাস্তবায়ন `Tx`করে।

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

লেনদেনের উপর আরও বিস্তারিত: [https://docs.cosmos.network/main/core/transactions.html](https://docs.cosmos.network/main/core/transactions.html)
