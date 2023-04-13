---
id: graph
title: দ্যা গ্রাফ এবং Polygon-এর মাধ্যমে একটি হোস্ট করা প্রজেক্ট সেট আপ করা
description: দ্যা গ্রাফ এবং Polygon-এর মাধ্যমে একটি হোস্ট করা প্রজেক্ট কীভাবে সেট আপ করবেন তা শিখুন।
keywords:
  - graph
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

চেইন ডেটা ইনডেক্স করা ও কুয়েরি করার জন্য একটি ডিসেন্ট্রালাইজড প্রোটোকল দ্যা গ্রাফ Polygon চেইন সাপোর্ট করে। সাবগ্রাফের মাধ্যমে নির্ধারিত ডেটা কুয়েরি ও অনুসন্ধান করা সহজ। সাবগ্রাফগুলো স্থানীয়ভাবে তৈরি করা যেতে পারে, বা ইনডেক্সিং এবং ডেটা প্রদর্শনের জন্য একটি বিনামূল্যে হোস্ট করা এক্সপ্লোরার ব্যবহার করা যেতে পারে।

> দ্রষ্টব্য: আরো বিশদ বিবরণ, স্থানীয় ইনস্টলেশন এবং আরো অনেক কিছুর জন্য https://thegraph.com/docs/quick-start দেখুন৷ সাবগ্রাফগুলো কীভাবে কাজ করে তা বোঝার জন্য docs-এ একটি উদাহরণ রয়েছে এবং এই ভিডিওটি একটি ভালো পরিচিতি প্রদান করে।

## ধাপসমূহ {#steps}

1. গ্রাফ এক্সপ্লোরারে (https://thegraph.com/explorer/) যান এবং একটি অ্যাকাউন্ট সেটআপ করুন। প্রমাণীকরণের জন্য আপনার একটি GitHub অ্যাকাউন্ট দরকার।

2. আপনার ড্যাশবোর্ডে যান এবং 'সাবগ্রাফ যোগ করুন'-এ ক্লিক করুন। সাবগ্রাফের নাম, অ্যাকাউন্ট এবং সাবটাইটেল নির্ধারণ করুন এবং প্রয়োজনে ছবি এবং অন্যান্য তথ্য (আপনি পরে আপডেট করতে পারবেন) আপডেট করুন।

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. আপনার মেশিনে গ্রাফ CLI ইনস্টল করুন (npm বা yarn ব্যবহার করে)

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. নিম্নলিখিত কমান্ডটি একটি সাবগ্রাফ তৈরি করে যা একটি বিদ্যমান চুক্তির সকল ইভেন্টের ইনডেক্স করে। এটি BlockScout থেকে চুক্তির ABI আনার চেষ্টা করে এবং একটি স্থানীয় ফাইলের পথের অনুরোধ করার ক্ষেত্রে পিছিয়ে থাকে। যদি কোনো ঐচ্ছিক আর্গুমেন্ট অনুপস্থিত থাকে, তাহলে এটি আপনাকে একটি ইন্টারেক্টিভ ফর্মের দিকে নিয়ে যায়।

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Polygon” for Matic mainnet and “Mumbai” for Polygon Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on Polygon: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> দ্রষ্টব্য: আরও বিস্তারিত এখানে রয়েছে: https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. হোস্ট করা পরিষেবা দিয়ে প্রমাণীকরণ করুন

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
আপনি গ্রাফ ওয়েবসাইটে আপনার ড্যাশবোর্ডে গিয়ে অ্যাক্সেস টোকেনটি খুঁজে পেতে পারেন।

6. আপনার তৈরি ডিরেক্টরিতে cd করুন এবং সাবগ্রাফ নির্ধারণ করা শুরু করুন। একটি সাবগ্রাফ তৈরির তথ্য এখানে (https://thegraph.com/docs/define-a-subgraph) গ্রাফ Docs-এ পাওয়া যায়।

7. আপনি প্রস্তুত হলে, আপনার সাবগ্রাফ ডিপ্লয় করুন। আপনি সর্বদা পরীক্ষা করতে পারেন এবং প্রয়োজন অনুসারে পুনরায় ডিপ্লয় করতে পারেন।

> যদি আপনার পূর্বে ডিপ্ল্য করা সাবগ্রাফটিতে এখনও সিঙ্কিং চলমান থাকে, তাহলে এটি অবিলম্বে নতুন ডিপ্লয় করা সংস্করণ দিয়ে প্রতিস্থাপিত হবে। যদি পূর্বে ডিপ্লয় করা সাবগ্রাফটি আগে থেকেই সম্পূর্ণভাবে সিঙ্ক করা থাকে, তাহলে গ্রাফ নোড নতুন ডিপ্লয় করা সংস্করণটিকে অসম্পূর্ণ সংস্করণ হিসেবে চিহ্নিত করবে, এটিকে ব্যাকগ্রাউন্ডে সিঙ্ক করবে এবং নতুন সংস্করণটি সিঙ্ক করা শেষ হয়ে গেলে শুধুমাত্র বর্তমানে ডিপ্লয় করা সংস্করণটিকে নতুনটির সাথে প্রতিস্থাপন করবে। এটি নিশ্চিত করে যে নতুন সংস্করণটির সিঙ্ক চলমান থাকার সময় আপনার কাছে কাজ করার জন্য একটি সাবগ্রাফ রয়েছে৷

```bash
yarn deploy
```

আপনার সাবগ্রাফটি ডিপ্লয় করা হবে এবং আপনার ড্যাশবোর্ড থেকে অ্যাক্সেস করা যাবে।

আপনি সাবগ্রাফ সম্পর্কে কুয়েরি করার বিষয়ে এখান থেকে জানতে পারবেন: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

আপনি যদি আপনার সাবগ্রাফ সর্বজনীন করতে চান, তবে আপনি আপনার ড্যাশবোর্ড থেকে আপনার সাবগ্রাফে অ্যাক্সেস করে এবং তারপর 'সম্পাদনা করুন' বাটনে ক্লিক করে তা করতে পারেন। আপনি সম্পাদনা পেজের নিচে স্লাইডার দেখতে পাবেন।
