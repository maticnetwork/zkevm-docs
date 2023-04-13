---
id: delegation
title: Validator শেয়ার মাধ্যমে প্রতিনিধিদল
sidebar_label: Delegation
description: Validator শেয়ার মাধ্যমে প্রতিনিধিদল
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon যাচাইকারীর শেয়ারের মাধ্যমে ডেলিগেশন-কে সমর্থন করে। এই ডিজাইন ব্যবহার করে, বেশি গণনা ছাড়াই Ethereum চুক্তিগুলিতে পুরস্কার বিতরণ করা এবং স্কেলের মাধ্যমে বাদ দেওয়া (সহস্রাধিক অর্পণকারী) সহজতর হয়।

নিয়োজকরা যাচাইকারীদের থেকে একটি সীমাবদ্ধ পুলের শেয়ার কেনার মাধ্যমে অর্পণ করেন। প্রত্যেক যাচাইকারীর তাদের নিজস্ব যাচাইকারী শেয়ার টোকেন থাকবে। একজন যাচাইকারী `A`-র জন্য এই পারস্পরিক বিনিময়যোগ্য টোকেনগুলিকে `VATIC` বলা যাক। একজন ব্যবহারকারী যত শীঘ্র একজন যাচাইকারীর `A` কাছে অর্পণ করে তত শীঘ্র তাদের-`MATIC/VATIC`-পেয়ারের একটি বিনিমেয় হারের উপর ভিত্তি করে`VATIC` ইস্যু করা হবে। যেহেতু ব্যবহারকারীদের অর্থপরিমাণ প্রাপ্য, বিনিময়ের হার নির্দেশ করে যে তারা এখন প্রতিটি`VATIC` -এর জন্য বেশি`MATIC` উইথড্র করতে পারবে এবং যখন ব্যবহারকারীদের বাদ দেওয়া হয় তখন ব্যবহারকারীরা তাদ`VATIC`ের -এর জন্য `MATIC`কম  উইথড্র করতে পারবে।

মনে রাখবেন যে `MATIC` একটি স্টেকিং টোকেন। অর্পণটিতে অংশগ্রহণ করতে একজন অর্পণকারীর `MATIC`টি টোকেন থাকতে হবে।

প্রাথমিকভাবে, `1 MATIC per 1 VATIC`-এর সময় একজন অর্পণকার`D`ী, যাচাইকারী`A` নির্দিষ্ট পুলের থেকে টোকেন ক্রয় করে।

যখন একজন যাচাইকারী আরও `MATIC`টি টোকেন দিয়ে পুরস্কৃত হন তখন নতুন টোকেনগুলি পুলে যোগ করা হয়। আসুন টোকেন এর বর্তমান পুলের সাথে `100 MATIC`বল, পুলে `10 MATIC`rewards যোগ করা হয়। যেহেতু `VATIC`টি টোকেনের মোট সরবরাহ পুরস্কারগুলির কারণে পরিবর্তন হয়নি তাই বিনিময় হার`1 MATIC per 0.9 VATIC`  হয়ে যায়। এখন, অর্পণকারী `D` একই শেয়ারগুলির জন্য`MATIC` টি বেশি পান।

`VATIC`: যাচাইকারী নির্দিষ্ট সৃষ্ট যাচাইকারী টোকেনগুলি (ERC20 টোকেন) শেয়ার করে।

## প্রযুক্তিগত স্পেসিফিকেশন {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

বিনিময় হার নিচের হিসাবে গণনা করা হয়:

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## পদ্ধতি এবং ভেরিয়েবল {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- স্টেক ম্যানেজারকে `_amount` ট্রান্সফার করে এবং সক্রিয় স্টেকের জন্য টাইমলাইন ডেটা স্ট্রাকচার আপডেট করে।
- টাইমলাইন DS আপডেট করতে `updateValidatorState` ব্যবহার করা হয়।
- `_amount` এর জন্য বর্তমান `exchangeRate` ব্যবহার করে `Mint` অর্পণ শেয়ার করে।
- লিক্যুউইড পুরস্কারগুলি গণনা করতে প্রত্যেক অর্পণকারীর সক্রিয় স্টেকের ট্র্যাক রাখতে`amountStaked`  ব্যবহার করা হয়।

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- মোট পরিমাণ (সক্রিয় স্টেক + পুরষ্কার গণনা করতে বর্তমান `exchangeRate`এবং শেয়ার সংখ্যা ব্যবহার করে)।
- `unBond`যদি না হ, , তাহলে যাচাইকারী থেকে সক্রিয় স্টেক এবং প্রাপক রিওয়ার্ড স্থানান্তর করুন।
- stakeManger-এ `updateValidatorState` ব্যবহার করে টাইমলাইন থেকে অবশ্যই সক্রিয় স্টেক সরিয়ে ফেলতে হবে।
- উইথড্রয়ালের সময়কালে স্টেকের ট্র্যাক রাখত`delegators`ে  ম্যাপিং ব্যবহার করা হয়।

### withdrawRewards {#withdrawrewards}

```js
function withdrawRewards() public;
```

- একজন প্রতিনিধিদলের জন্য, রিওয়ার্ড এবং ট্রান্সফার গণনা করুন এবং শেয়ারের `exchangeRate`বার্ন কাউন্টের উপর নির্ভর করে।
- উদাহরণ: যদি একটি delegator েটর 100 শেয়ার মালিক এবং বিনিময় হার 200 তাই পুরষ্কার 100 টোকেন, delegator. 100 টোকেন স্থানান্তর করুন। অবশিষ্ট স্টেক হচ্ছে 100%, যাতে বিনিময় হার 200%, এখন এটি 50 শেয়ারের। তাই 50 শেয়ার বার্ন করুন। Delegator এখন 100 টোকেন মূল্য 50 শেয়ার আছে

### রিস্টেক {#restake}

Restake দুটি উপায়ে কাজ করতে পারে: delegator রিওয়ার্ড ব্যবহার করে আরও বেশি শেয়ার কিনতে পারেন `buyVoucher`বা রিস্ট্যাক কিনতে পারেন।

```js
function reStake() public;
```

উপরে ফাংশন রিওয়ার্ড reStake করতে ব্যবহার করা হয়। শেয়ারগুলির সংখ্যা প্রভাবিত হয় না কার`exchangeRate`ণ  একই; তাই কেবলমাত্র পুরস্কারগুলি যাচাইকারী শেয়ার চুক্তি এবং স্টেকম্যানেজার টাইমলাইন, উভয়ের জন্য সক্রিয় স্টেক-এ স্থানান্তরিত হয়।

`getLiquidRewards`জমা পুরষ্কার অর্থাত্ গণনা করার জন্য ব্যবহৃত হয়, যার মধ্যে 100 ভাগ এবং বিনিময় হার 200। বর্তমানে আরও ১০০ টোকেন সক্রিয় stake, Move ে Move । শুধুমাত্র পার্থক্য হচ্ছে এখন 200 টোকেন সক্রিয় স্টেটে বিবেচনা করা হয় এবং অবিলম্বে প্রত্যাহার করা যাবে না (তরল পুরষ্কার একটি অংশ)।

reStaking এর উদ্দেশ্য হচ্ছে যেহেতু delegator's যাচাইকারী এখন আরও সক্রিয় স্টেক আছে এবং সেজন্য তারা আরও রিওয়ার্ড পাবেন তাই delegator. হবে।

### unStakeClaimTokens {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

একবার প্রত্যাহারের মেয়াদ শেষ is যারা তাদের শেয়ার বিক্রি করেছে তাদের MATIC টোকেন দাবি করতে পারে। টোকেনগুলি অবশ্যই ব্যবহারকারীকে ট্রান্সফার করতে হবে।

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- যাচাইকারীর জন্য কমিশন % আপডেট করে।

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

যখন একটি যাচাইকারী চেকপয়েন্ট জমা দেয়ার জন্য রিওয়ার্ড gets া a , তখন এই ফাংশনটি যাচাইকারী এবং validator মধ্যে disbursements disbursements for ডা. া হ. ।
