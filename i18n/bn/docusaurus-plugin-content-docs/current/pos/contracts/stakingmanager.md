---
id: stakingmanager
title: স্টেকিং ম্যানেজার
description: স্ট্যাকিং ম্যানেজার হল Polygon নেটওয়ার্কে যাচাইকারী সংক্রান্ত কার্যক্রম পরিচালনা করার জন্য প্রধান চুক্তি।
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygon-এর প্রুফ অফ সিকিউরিটি ভিত্তিক কনসেনসাস জন্য সমস্ত ⅔ +1 প্রমাণ যাচাইকরণ এবং স্ট্যাকিং পরিচালনা করা staking, Ethereum স্মার্ট contract. পুরষ্কার কার্যকর করা হ. । সম্পূর্ণ ডিজাইনটি মেইননেট চুক্তিতে কম করার এই দর্শন অনুসরণ করে। এটি তথ্য যাচাইকরণ করে এবং L2-এ সমস্ত computation-heavy অপারেশন ধাক্কা does  ([Heimdall](https://wiki.polygon.technology/docs/pos/heimdall/overview)-এর সম্পর্কে পড়ুন)।

**স্ট্যাকারদের** **যাচাইকারী** (জালিয়াতি **into****** বিভক্ত করা হয়।

[**স্টেকম্যানেজার**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol) is ে StakeManager `checkPoint`StakeManager StakeManager যেহেতু চুক্তিটি মালিকানা উৎস হিসাবে **NFT আইডি** ব্যবহার করছে, তাই মালিকানা এবং signer পরিবর্তন সিস্টেমে কিছু প্রভাবিত করবে না।

:::tip

এক Ethereum ঠিকানা থেকে, একটি **স্ট্যাকার শুধুমাত্র একজন যাচাইকারী বা প্রতিনিধিত্বকারী হতে পারে** (এটি কেবল একটি ডিজাইনের পছন্দ, কোন কঠিন কারণ নেই)।

:::

## যাচাইকারী ভর্তি / প্রতিস্থাপন {#validator-admissions-replacement}

### অ্যাডমিশন {#admissions}
বর্তমানে, Polygon PoS-এ কোন ওপেন যাচাইকারী স্লট উপলব্ধ নেই। একজন যাচাইকারী হওয়ার জন্য একটি waitlist রয়েছে। ভবিষ্যতে, যদি স্লট পাওয়া যায়, তাহলে যাচাইকারী considered এর validators বিবেচনা করা এবং অপসারণ করতে আবেদন করতে পারেন।


### প্রতিস্থাপন {#replacement}
PIP4 কমিউনিটি দৃশ্যমানতার জন্য যাচাইকারী কর্মক্ষমতা প্রদর্শন করার ধারণা চালু করেছে। যদি একটি যাচাইকারী PIP4-এ উল্লিখিত সময়ের জন্য একটি অস্বাস্থ্যকর অবস্থায় থাকে, তাহলে তারা নেটওয়ার্ক থেকে off-boarded আছে। তারপর যাচাইকারী স্লট waitlist. বন্ধ আসা সেই জন্য উপলব্ধ করা হয়।

:::info

বর্তমানে, [<ins>PIP4-এ PART C-এর দ্বিতীয় ধাপ বাস্তবায়িত</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24) হচ্ছে। এই যেখানেই কমিউনিটি যাচাইকারী prospect  মূল্যায়ন মানদন্ডে সিদ্ধান্ত নেয়। সময়কালে, এই ব্যায়াম একটি অ্যাপ্লিকেশন এবং ভর্তি প্রক্রিয়া তৈরি করবে।

:::

## পদ্ধতি এবং ভেরিয়েবল {#methods-and-variables}

:::caution Slashing বাস্তবায়ন

`jail`, `unJail`, এবং `slash`ফাংশন বর্তমানে slashing বাস্তবায়নের অংশ হিসাবে ব্যবহার করা হয় না।

:::

### validatorThreshold {#validatorthreshold}

এটি সিস্টেমটি দ্বারা গৃহীত যাচাইকারী সর্বোচ্চ সংখ্যক সংরক্ষণ করে, যা স্লট নামেও পরিচিত।

### AccountStateRoot {#accountstateroot}

- যাচাইকারী এবং প্রতিনিধিদের জন্য Heimdall উপর করা বিভিন্ন অ্যাকাউন্টটির জন্য, জমা দেও. া করার সময় অ্যাকাউন্ট রুট জমা দেওয়া `checkpoint`হবে।
- accRoot ব্যবহার করা হয় এবং accRoot `claimRewards`ব্যবহার করা হয়।`unStakeClaim`

### স্টেক / stakeFor {#stake-stakefor}

```solidity title="StakeManager.sol"
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- যদি কম থাকে `currentValidatorSetSize`তবে এর `minDeposit`চেয়ে বেশি পরিমাণ (MATIC টোকেন) থাকে এমন যে কেউ অনুমতি দেয়।`validatorThreshold`
- অবশ্যই ট্রান্সফার করতে `amount+heimdallFee`হবে, যাচাইকারী একটি auctionInterval (Auction বিভাগে আরও for জন্য নিলাম সময়ের মধ্যে পরিণত হবেন।
- `updateTimeLine`বিশেষ টাইমলাইন ডাটা স্ট্রাকচার আপডেট করে, যা প্রদত্ত epoch/checkpoint গণনার জন্য সক্রিয় যাচাইকারী এবং সক্রিয় স্টেকের ট্র্যাক রাখে।
- প্রতিটি নতুন `stake`বা কলে একটি অনন্য minted করা `NFT``stakeFor`হয়, যা কাউকে স্থানান্তর করা যেতে পারে কিন্তু 1:1 Ethereum ঠিকানা মালিকানাধীন হতে পারে।
- `acceptDelegation`যদি যাচাইকারী প্রতিনিধিদল গ্রহণ করতে চান তবে সত্যের জন্য সেট করুন, তাহলে যাচাইকারীর জন্য `ValidatorShare`চুক্তি মোতায়েন করা হ. ।

### আনস্টেক {#unstake}

- পরবর্তী epoch এ যাচাইকারী সেট থেকে যাচাইকারী অপসারণ করুন (একবার একবার বলা হবে এমন একটি বর্তমান চেকপয়েন্টের জন্য শুধুমাত্র `unstake`বৈধ)
- টাইমলাইন ডেটা স্ট্রাকচার থেকে যাচাইকারীর স্টেক অপসারণ করে, যাচাইকারীর প্রস্থান ইপোক এর জন্য গুণতি আপডেট করে।
- যদি যাচাইকারীর উপর প্রতিনিধিদল থাক, , তাহলে নতুন প্রতিনিধিদের জন্য সকল পুরষ্কার সংগ্রহ করুন এবং delegation ে প্রতিনিধিদল চুক্তি লক করুন।

### unstakeClaim {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- পর, যাচাইকারীদের প্রত্যাহারের মেয়াদে রাখা `unstaking`হ, ে যাতে গত জালিয়াতি জন্য `unstaking`যদি পাওয়া যায় তবে তা হলে তা স্ল্যাশ করা যেতে পারে।
- একবার `WITHDRAWAL_DELAY`সময়ের served, করা is যাচাইকারী এই ফাংশন কল করতে পারেন এবং সেটির সাথে সেটির মাধ্যমে সেটির মাধ্যমে (যদি কোন রিওয়ার্ড `stakeManager`পান তাহলে স্টেকড টোকেন ফিরে যান, NFT বার্ন করুন)।

### রিস্টেক {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- নতুন অর্থরাশি বা পুরষ্কার বা উভয়ই রেখে দিয়ে যাচাইকারীদের, তাদের স্টেক বৃদ্ধি করতে দেয়।
- সক্রিয় স্টেকের জন্য টাইমলাইন (পরিমাণ) আপডেট করতে হবে।

### withdrawRewards {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

এই পদ্ধতি হলে যাচাইকারী জমা পুরষ্কার প্রত্যাহার করতে পারবেন, তাহলে যাচাইকারী প্রতিনিধিদল চুক্তি থেকে পুরষ্কার পাওয়ার বিবেচনা করতে হবে।

### updateSigner {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

এই পদ্ধতি যাচাইকারী signer ঠিকানা আপডেট করতে পারে (যা Polygon blockchain এবং চেকপয়েন্ট signatures ব্লক যাচাই করতে ব্যবহৃত `stakeManager`হয়)।

### topUpForFee {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

যাচাইকারী এই পদ্ধতি চালান করে Heimdall ফির জন্য তাদের ব্যালেন্স শীর্ষে উঠতে পারেন।

### claimFee {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

এই পদ্ধতিটি Heimdall থেকে ফি প্রত্যাহার করতে ব্যবহার করা হয়। প্রতিটি চেকপয়েন্টে আপডেট করা `accountStateRoot`হয়, যাতে যাচাইকারী Heimdall এ অ্যাকাউন্টের জন্য এই রুটে অন্তর্ভুক্তি প্রমাণ সরবরাহ করতে পারেন এবং ফি. া ফি. া করতে পারেন।

মনে রাখবেন যে একাধিক চেকপয়েন্টে প্রস্থান প্রতিরোধ করতে পুনরায় লেখা `accountStateRoot`আছে (পুরানো রুটের জন্য এবং অ্যাকাউন্টিং সংরক্ষণ করুন)। এই মুহূর্তে অব্যবহৃত `accumSlashedAmount`is ে এবং প্রয়োজন হলে Heimdall এ slashing করার জন্য ব্যবহার করা `stakeManager`হবে।

### StakingNFT {#stakingnft}

প্রতি user ার এক টোকেন এবং sequential পদ্ধতিতে minted করা মত কয়েকটি সীমাবদ্ধতার সাথে স্ট্যান্ডার্ড ERC721 চুক্তি।

### startAuction {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

ইতিমধ্যে চলমান on একটি বিড বা বিড বেশি শুরু করার জন্য, এই ফাংশনটি ব্যবহার করা হয়। নিলাম পিরিয়ড চক্রের মধ্যে রান করে `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`যেমন তা **সঠিক নিলাম পিরিয়ডের জন্য চেক করতে হবে।**

`perceivedStakeFactor`সঠিক ফ্যাক্টর * পুরানো স্টেক গণনা করতে ব্যবহৃত is  (বর্তমানে এটি ফাংশনের জন্য ডিফল্ট 1 WIP দ্বারা রয়েছে)। **এখনও যে কোনও যাচ্ছে তা হলে শেষ নিলাম সময়ের থেকে নিলাম দেখতে হবে** (একজন পরবর্তী in তাদের রাজধানী পেতে `confirmAuction`কল না করতে পছন্দ করতে পারেন)। সাধারণত একদিনে একটানা ইংলিশ নিলাম `auctionPeriod`চলছে

### confirmAuctionBid {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **অবশ্যই চেক করতে হবে যে এটি একটি auctionPeriod. নয়।**
- যদি শেষ বিডার bidder া is , তাহলে `validatorId`আচরণটি বিশ্রাম নেওয়ার অনুরূপ।
- দ্বিতীয় ক্ষেত্রে, unStake `validatorId` এবং পরবর্তী চেকপয়েন্ট থেকে নতুন ব্যবহারকারীকে যাচাইকারী হিসাবে যোগ করুন, নতুন ব্যবহারকারীর জন্য আচরণ stake/stakeFor-এর অনুরূপ হতে হবে।

### checkSignatures {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- চেকপয়েন্টগুলি জমা করার সময় শুধুমাত্র RootChain চুক্তি বোঝানোর জন্য Writes।
- `voteHash` যার ওপর সব যাচাইকারী স্বাক্ষর করেন (BFT ⅔+1 চুক্তি)
- এই ফাংশনটি শুধুমাত্র স্বতন্ত্র sigs যাচাই করে এবং ⅔ +1 ক্ষমতা চেকপয়েন্ট রুট `currentValidatorSetTotalStake` যা বর্তমান সক্রিয় স্টেকে স্বাক্ষর করেছে, তার জন্য চেক করে (সমস্ত ডেটা জন্য RootChain চুক্তিতে`voteHash`  যাচাইকরণের মধ্যে অন্তর্ভুক্তি)।
- প্রাপক Rewards পুরষ্কার অনুপাতে বিতরণ করা হয়। [রিওয়ার্ড](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2) ডিস্ট্রিবিউশনে rewards আরও বেশি হবে।

### isValidator {#isvalidator}

একটি প্রদত্ত যাচাইকারী কিনা তা পরীক্ষা করে দেখুন বর্তমান epoch এর জন্য সক্রিয় যাচাইকারী ।

## টাইমলাইন ডেটা স্ট্রাকচার {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## StakingInfo {#stakinginfo}

যাচাইকারী এবং প্রতিনিধিদল ইভেন্টের জন্য কেন্দ্রীয় লগিং চুক্তি, এতে রয়েছে কয়েকটি শুধুমাত্র ফাংশন পড়. । আপনি GitHub এ [StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) চুক্তির সোর্স কোড চেক করতে পারেন।

## ValidatorShareFactory {#validatorsharefactory}

প্রতিনিধিদলের জন্য যে সমস্ত যাচাইকারীর জন্য `ValidatorShare`চুক্তি deploy  করার জন্য একটি ফ্যাক্টরি চুক্তি। আপনি GitHub এ [ValidatorShareFactory.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) of সোর্স কোড চেক করতে পারেন।
