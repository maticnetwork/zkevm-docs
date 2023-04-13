---
id: api-architecture
title: API আর্কিটেকচার
keywords:
    - api architecture
    - api type
    - read
    - write
    - polygon
description: রিড ও রাইট API এবং লেনদেনের সেটিংস।
---

লাইব্রেরিটি সর্বত্র সাধারণ API আর্কিটেকচার অনুসরণ করে এবং API-গুলো দুইভাগে বিভক্ত -

1. রিড API
2. রাইট API

## রিড API {#read-api}

রিড API ব্লকচেইনে কিছু প্রকাশ করে না, তাই এটি কোনো গ্যাসও খরচ করে না। রিড API-এর উদাহরণ হচ্ছে - `getBalance`, `isWithdrawExited` ইত্যাদি।

রিড API-এর একটি উদাহরণ দেখুন -

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

রিড API খুবই সহজ এবং সরাসরি ফলাফল প্রদান করে।

## 2. রাইট API {#2-write-api}

রাইট API ব্লকচেইনে কিছু ডেটা প্রকাশ করে, তাই এটি গ্যাস ব্যবহার করে। রাইট API-এর উদাহরণ হচ্ছে - `approve`, `deposit` ইত্যাদি।

আপনি কোনো রাইট API কল করলে - ফলাফল থেকে আপনার দুইটি ডেটার প্রয়োজন হবে।

1. TransactionHash
2. TransactionReceipt

চলুন রাইট API-এর একটি উদাহরণ দেখি এবং লেনদেনের হ্যাশ ও রশিদটি নেই -

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

### লেনদেনের বিকল্প {#transaction-option}

সকল API-এ ব্যবহার করা যায় এমন কিছু কনফিগারযোগ্য বিকল্প রয়েছে। এই কনফিগারেশনগুলো প্যারামিটারে পাস করা যেতে পারে।

উপলভ্য কনফিগারেশনগুলো হচ্ছে -

- প্রেরক?: স্ট্রিং | নম্বর - লেনদেনের ঠিকানাকে প্রেরক করতে হবে।
- প্রাপক?: স্ট্রিং - লেনদেনের ঠিকানাকে প্রাপক করতে হবে।
- মান?: সংখ্যা | স্ট্রিং | BN - wei-তে লেনদেনের জন্য স্থানান্তরিত মান।
- gasLimit?: নম্বর | স্ট্রিং - একটি লেনদেনের জন্য প্রদত্ত সর্বাধিক গ্যাস (গ্যাসের সীমা)।
- gasPrice?: নম্বর | স্ট্রিং | BN - লেনদেনের ক্ষেত্রে ব্যবহার করার জন্য wei-এর গ্যাসের দাম।
- ডেটা?: স্ট্রিং - চুক্তির বাইট কোড।
- একক?: সংখ্যা;
- chainId?: সংখ্যা;
- চেইন?: স্ট্রিং;
- হার্ডফর্ক?: স্ট্রিং;
- returnTransaction?: বুলিয়ান - এটি সত্য করা হলে লেনদেনের অবজেক্ট ফেরত করা হবে যা ম্যানুয়ালি লেনদেন পাঠাতে ব্যবহার করা যেতে পারে।

আসুন gasPrice কনফিগার করে একটি উদাহরণ দেখি

```js
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
