---
id: did-implementation
title: Polygon DID বাস্তবায়ন
sidebar_label: Identity
description: Polygon-এ DID বাস্তবায়ন সম্পর্কে শিখুন
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

Polygon লেজারে একটি Polygon DID তৈরি ও প্রকাশ করার জন্য Polygon টিম দ্বারা প্রকাশিত এই বাস্তবায়নটি ব্যবহার করতে ইচ্ছুক ব্যবহারকারীদের জন্য এটি একটি শুরু করার নির্দেশিকা।

Polygon DID পদ্ধতির বাস্তবায়নটি 3টি প্যাকেজ নিয়ে গঠিত হয়েছে, সেগুলো হচ্ছে Polygon-did-registrar, Polygon-did-resolver এবং Polygon-did-registry-contract। কোনো ব্যবহারকারী যদি Polygon নেটওয়ার্কে বা সে নেটওয়ার্ক থেকে রেজিস্ট্রেশন করার বা DID পড়ার ফাংশনালিটি অন্তর্ভুক্ত করতে চান, তাহলে তিনি নিম্নলিখিত নির্দেশিকাটি ব্যবহার করতে পারেন।

DID মূলত একটি ইউনিক আইডেন্টিফায়ার, যা কোনো কেন্দ্রীয় কর্তৃপক্ষের উপস্থিতি ছাড়াই তৈরি করা হয়েছে।  যাচাইযোগ্য ক্রেডেনশিয়ালের আলোকে নথিপত্র স্বাক্ষর করতে DID ব্যবহার করা হয়, যার ফলে প্রয়োজনের সময় নথির মালিকানা প্রমাণ করতে ব্যবহারকারীকে সুবিধা প্রদান করে।

## Polygon DID পদ্ধতি {#polygon-did-method}

Polygon DID পদ্ধতির সংজ্ঞাটি DID-কোর স্পেসিফিকেশন এবং স্ট্যান্ডার্ড মেনে চলে। DID URI কোলন দিয়ে পৃথক হওয়া তিনটি উপাদান নিয়ে গঠিত - প্রথমে হলো স্কিম, তারপর পদ্ধতির নাম এবং সবশেষে পদ্ধতির জন্য নির্দিষ্ট আইডেন্টিফায়ার। Polygon জন্য URI দেখতে পাও:

```
did:polygon:<Ethereum address>
```

এখানে স্কিমটি হল `did`, মেথড নাম `polygon`এবং মেথড নির্দিষ্ট শনাক্তকারী হল একটি ethereum ঠিকানা।

## Polygon DID বাস্তবায়ন {#polygon-did-implementation}

দুইটি প্যাকেজের সাহায্যে Polygon DID বাস্তবায়ন করা যেতে পারে, ব্যবহারকারী সংশ্লিষ্ট npm লাইব্রেরিগুলো ইমপোর্ট করতে পারেন এবং তাদের নিজ নিজ অ্যাপ্লিকেশনে Polygon DID পদ্ধতিগুলো অন্তর্ভুক্ত করতে সেগুলো ব্যবহার করতে পারেন। পরবর্তী সেকশনে বাস্তবায়নের বিবরণ প্রদান করা হলো।

শুরু করার জন্য, প্রথমে একটি DID তৈরি করতে হবে। Polygon did তৈরি করার বিষয়টিতে দুটি ধাপ অন্তর্ভুক্ত থাকে, প্রথমে, ব্যবহারকারীর নিজের জন্য একটি DID uri তৈরি করতে হয় এবং তারপর Polygon লেজারে রেজিস্টার করতে হয়।

### DID তৈরি করা {#create-did}

আপনার প্রোজেক্টে একটি বহুভুজ ডিআইডি URI তৈরি করতে হবে যা প্রথমে ইনস্টল করতে হবে:

```
npm i @ayanworks/polygon-did-registrar --save
```

একবার ইনস্টলেশন সম্পন্ন installation ে, the নিম্নরূপ এটি ব্যবহার করতে পারে:

```
import { createDID } from "polygon-did-registrar";
```

`createdDID`ফাংশন ব্যবহারকারীকে একটি DID URI তৈরি করতে সহায়তা করে। DID তৈরি করার সময়, দুটি পরিস্থিতি হতে পারে।

  1. ইতোমধ্যে ব্যবহারকারীর একটি ওয়ালেট থাকতে পারে এবং একই ওয়ালেটের জন্য একটি DID তৈরি করতে চাইতে পারে।

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. যদি ব্যবহারকারীর একটি বিদ্যমান ওয়ালেট না থাকে এবং একটি তৈরি করতে চায়, তাহলে ব্যবহারকারী ব্যবহার করতে পারে:

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

উভয় ক্ষেত্রে নেটওয়ার্ক প্যারামিটারটি বোঝায় যে ব্যবহারকারী Polygon Mumbai Testnet বা Polygon Mainnet-এ DID তৈরি করতে চায়।

নমুনা ইনপুট:

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

DID, তৈরি করার পরে, আপনার একটি DID URI তৈরি থাকবে।

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### নিবন্ধন DID {#register-did}

on DID URI এবং সংশ্লিষ্ট DID ডকুমেন্ট নিবন্ধন করতে, প্রথমে ব্যবহারকারীকে `polygon-did-registrar`নিম্নরূপ ব্যবহার করতে হবে:

```js
import { registerDID } from "polygon-did-registrar";
```

DID, নিবন্ধন করার একটি পূর্বশর্ত হিসাবে, ব্যবহারকারীকে নিশ্চিত করতে হবে যে the ওয়ালেট corrsponding প্রয়োজনীয় টোকেন ব্যালেন্স উপলব্ধ রয়েছে। একবার ব্যবহারকারীর ওয়ালেটে একটি টোকেন ব্যালেন্স থাকলে, তাহলে registerDID কার্যকারিতায় একটি কল তৈরি করা যেতে পারে।

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

পরামিতি `did``privateKey`এবং বাধ্যতামূলক আছে, যখন এটি `url`প্রবেশ করা এবং ঐচ্ছিক ।`contractAddress` ব্যবহারকারী যদি শেষ দুটি প্যারামিটার না দেন, তবে লাইব্রেরি DID URI থেকে নেটওয়ার্কের ডিফল্ট কনফিগারেশন বেছে নেয়।

যদি সমস্ত প্যারামিটারে স্পেসিফিকেশনের মেলে এবং সবকিছু সঠিক অর্ধে দেওয়া হয়, তাহলে `registerDID`ফাংশনের একটি লেনদেনের হ্যাশ returns ে ফি. ে ফে. ে ফে. ে ফে. া হয়, তাহলে একটি সংশ্লিষ্ট ত্রুটি অন্যথায় ফি. ে যাবে।

এবং এর সাথে, আপনি বহুভুজ নেটওয়ার্কে একটি DID নিবন্ধনের আপনার টাস্ক সফলভাবে সম্পন্ন করেছেন।

## DID সমাধান {#resolve-did}

শুরু করতে, নিম্নলিখিত লাইব্রেরি ইনস্টল করুন:

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

লেজারে নিবন্ধিত একটি DID নথি পড়তে, DID Polygon URI সহ কোনো ব্যবহারকারী প্রথমে তাদের প্রজেক্টে ইমপোর্ট করতে পারেন,

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

প্যাকেজ আমদানি করার পরে, ডিআইডি ডকুমেন্ট ব্যবহার করে পুনরুদ্ধার করা যেতে পারে:

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

যেখানে `didResolutionResult`অবজেক্টটি নিম্নরূপ রয়েছে:

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

উল্লেখ্য যে, কোনো DID সমাধান করার চেষ্টা করার সময় ব্যবহারকারীর কোনো গ্যাস খরচ দিতে হবে না।

## DID ডকুমেন্ট আপডেট করা {#update-did-document}

DID ডকুমেন্ট আপডেট করার ক্ষমতা নিয়ে প্রকল্পটি encapsulate করতে হবে, প্রথমে ব্যবহারকারীকে `polygon-did-registrar`নিম্নরূপ ব্যবহার করতে হবে:

```js
import { updateDidDoc } from "polygon-did-registrar";
```

পরবর্তী, ফাংশন কল করুন:

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

এটি অবশ্যই অবশ্যই উল্লেখ করা উচিত যে ডিআইডি ডকুমেন্ট আপডেট করা, শুধুমাত্র of মালিক অনুরোধ পাঠাতে পারেন। এখানকার প্রাইভেট কী-টিকেও কিছু সংশ্লিষ্ট MATIC টোকেন ধারণ করতে হবে।

ব্যবহারকারী যদি `url` এবং `contractAddress`-এর সাথে কনফিগারেশন প্রদান না করেন, তবে লাইব্রেরি DID URI থেকে নেটওয়ার্কের ডিফল্ট কনফিগারেশন বেছে নেয়।

## DID ডকুমেন্ট মুছে ফেলা {#delete-did-document}

Polygon DID বাস্তবায়ন করার সাথে সাথে একজন ব্যবহারকারী লেজারে থেকে তার DID ডকুমেন্ট revoke করতে পারেন। প্রথম ব্যবহারকারী নিম্নলিখিত `polygon-did-registrar`হিসাবে ব্যবহার করতে হবে:

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

তারপর ব্যবহার করুন,

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

উল্লেখ্য যে, প্যারামিটারগুলোর মধ্যে `url` এবং `contractAddress` হলো ঐচ্ছিক প্যারামিটার, যা ব্যবহারকারী প্রদান না করলে, DID URI-এর উপর ভিত্তি করে একটি ডিফল্ট কনফিগারেশন বেছে নেওয়া হবে।

DID-এর নেটওয়ার্ক কনফিগারেশন অনুযায়ী প্রাইভেট কী-তে প্রয়োজনীয় MATIC টোকেন রাখা গুরুত্বপূর্ণ, অন্যথায় লেনদেন ব্যর্থ হতে পারে।

## রিপোজিটরিতে অবদান রাখা {#contributing-to-the-repository}

স্ট্যান্ডার্ড ফর্ক ব্যবহার করুন, রিপোজিটরিতে পরিবর্তনগুলো প্রক্রিয়া করতে ব্রাঞ্চ করুন এবং অনুরোধের ওয়ার্কফ্লো টানুন। অনুগ্রহ করে উদাহরণস্বরূপ ইস্যু বা বাগ নম্বর সহ ইনফরমেটিভ ব্রাঞ্চের নাম তৈরি করুন।

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
