---
id: quicknode
title: QuickNode ব্যবহার করে একটি স্মার্ট কন্ট্রাক স্থাপন করুন
sidebar_label: Using QuickNode
description:  Brownie এবং Quicknode ব্যবহার করে Polygon এ স্মার্ট চুক্তি Deploy  করুন।
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## সংক্ষিপ্ত বিবরণ {#overview}

পাইথন হল সবচেয়ে বহুমুখী প্রোগ্রামিং ভাষা; ভারী উৎপাদন পরিবেশে এটি ব্যবহার করে তাদের টেস্ট মডেল থেকে ডেভেলপারদের চলমান গবেষকরা থেকে, এটি প্রতিটি সম্ভাব্য প্রযুক্তিগত ক্ষেত্রে ক্ষেত্রে ব্যবহার করে।

এই টিউটোরিয়াল, আপনি Polygon জন্য [QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) testnet নোড ব্যবহার করে একটি স্মার্ট চুক্তি লিখতে এবং deploy  করতে কিভাবে [ব্রাউনি](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) ফ্রেমওয়ার্ক ব্যবহার করবেন শিখবেন।

:::tip

Quicknode টিমের সাথে যোগাযোগ করতে, তাদেরকে একটি মেসেজ পাঠান বা টুইটারে তাদেরকে ট্যাগ করুন [@QuickNode](https://twitter.com/QuickNode)।

:::

## পূর্বশর্ত {#prerequisites}

- Python3 ইনস্টল
- একটি Polygon নোড
- কোড এডিটর
- কমান্ড লাইন ইন্টারফেস

## আপনি কী করবেন {#what-you-will-do}

1. Brownie সেট আপ করুন
2. Quicknode টেস্ট নোডগুলোতে অ্যাক্সেস নিন
3. একটি স্মার্ট চুক্তি সংকলন ও ডিপ্লয় করুন
4. মোতায়েন করা চুক্তি ডেটা চেক করুন

## Brownie কী? {#what-is-brownie}

স্মার্ট চুক্তির ডেভেলপমেন্ট প্রধানত JavaScript-based লাইব্রেরিগুলোর প্রাধান্য থাকে, যেমন [web3.js](https://web3js.readthedocs.io/), [ethers.js](https://docs.ethers.io/), [Truffle](https://www.trufflesuite.com/docs/truffle/), এবং [Hardhat](https://hardhat.org/)। পাইথন একটি বহুমুখী, অত্যন্ত ব্যবহৃত ভাষা এবং স্মার্ট কন্ট্রাক / Web3 উন্নয়নের জন্য ব্যবহার করা যেতে পারে; [web3.py](https://web3py.readthedocs.io/en/stable/) হল একটি বাধ্যতামূলক পাইথন লাইব্রেরি যা Web3 চাহিদা পূরণ করে। ব্রাউনি ফ্রেমওয়ার্ক এর `web3.py`শীর্ষে নির্মিত হয়েছে

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) হলো একটি পাইথন-ভিত্তিক ফ্রেমওয়ার্ক, যা স্মার্ট চুক্তি ডেভেলপ ও পরীক্ষা করতে পারে। Solidity এবং Vyper উভয় চুক্তির জন্য Brownie সমর্থন রয়েছে এবং এটি [pytest](https://github.com/pytest-dev/pytest)-এর মাধ্যমে চুক্তির পরীক্ষাও প্রদান করে।

Brownie-এর মাধ্যমে কোনো স্মার্ট চুক্তি লেখা ও ডিপ্লয় করার প্রক্রিয়া প্রদর্শন করতে, আমরা [Brownie-mixes](https://github.com/brownie-mix) ব্যবহার করবো, যেগুলো হলো টেমপ্লেট প্রজেক্ট। বিশেষত, আমরা একটি [টোকেন মিক্স](https://github.com/brownie-mix/token-mix) ব্যবহার করব, যা ERC-20 বাস্তবায়নের একটি টেমপ্লেট।

## নির্ভরতা ইনস্টল করুন {#install-dependencies}

Brownie python3 top নির্মিত হয়, তাই আমাদের with কাজ করতে ইনস্টল করা দরকার। আমাদের সিস্টেমে আমাদের python3 ইনস্টল আছে কিনা তা আমাদের পরীক্ষা করুন। তাই করতে, আপনার কমান্ড লাইন টুলটিতে নিম্নলিখিত টাইপ করুন:

```bash
python3 -V
```

এটি ইনস্টল করা python3-এর সংস্করণটির তথ্য দেবে। ইনস্টল করা না থাকলে, অফিসিয়াল [পাইথন ওয়েবসাইট](https://www.python.org/downloads/) থেকে এটি ডাউনলোড করুন এবং ইনস্টল করুন।

Brownie ইনস্টল করার আগে চলুন একটি প্রজেক্ট ডিরেক্টরি তৈরি করি এবং সেই প্রজেক্ট ডিরেক্টরিটিকে আমাদের বর্তমান কাজের ডিরেক্টরি হিসেবে তৈরি করুন:

```bash
mkdir brownieDemo
cd brownieDemo
```

এখন আপনি আপনার সিস্টেমে python3 ইনস্টল করেছেন, আসুন আমরা পাইথনের প্যাকেজ ম্যানেজার pip ব্যবহার করে Brownie ইনস্টল করি। Pip হলো JavaScript-এর জন্য npm-এর অনুরূপ। আপনার কমান্ড লাইনে নিম্নলিখিত টাইপ করুন:

```bash
pip3 install eth-brownie
```

:::tip

যদি ইনস্টল ব্যর্থ হয়, তাহলে আপনি পরিবর্তে নিম্নলিখিত কমান্ড ব্যবহার করতে পারেন:`sudo pip3 install eth-brownie`

:::

ব্রাউনি সঠিকভাবে ইনস্টল করা হয়েছে কিনা তা পরীক্ষা করতে, আপনার কমান্ড লাইনে `brownie`টাইপ করুন, এবং এটি নিম্নলিখিত আউটপুট দিতে হবে:

![img](/img/quicknode/brownie-commands.png)

টোকেন মিক্স পেতে , কেবল আপনার কমান্ড লাইনে নিম্নলিখিত টাইপ করুন:

```
brownie bake token
```

এটি আমাদের `token/`ডিরেক্টরিতে একটি নতুন ডিরেক্টরি তৈরি `brownieDemo`করবে।

### ফাইলের কাঠামো {#file-structure}

সবসময়, ডিরেক্টরিতে navigate `token`করুন:

```bash
cd token
```

এখন, আপনার টেক্সট এডিটরে `token`ডিরেক্টরি খুলুন। `contracts/`ফোল্ডারের অধীনে আপনি পাবেন , `Token.sol`যা আমাদের প্রধান চুক্তি। আপনি নিজের কন্ট্রাক লিখতে পারেন বা ফাইল পরিবর্তন করতে `Token.sol`পারেন।

ফোল্ডারের `scripts/`অধীনে, আপনি `token.py`Python স্ক্রিপ্ট পাবেন। এই স্ক্রিপ্টটি চুক্তি deploy ে ব্যবহার করা হবে এবং চুক্তির উপর ভিত্তি করে পরিবর্তন প্রয়োজন।

![img](/img/quicknode/token-sol.png)

চুক্তিটি একটি ERC-20 চুক্তি। আপনি [ERC-20 on](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token) এই গাইডটিতে ERC-20 মান এবং চুক্তিগুলির সম্পর্কে আরও জানতে পারেন।

## আপনার Polygon নোড বুট হচ্ছে {#booting-your-polygon-node}

QuickNode হচ্ছে Polygon Mainnet এবং Mumbai testnet node এর একটি গ্লোবাল নেটওয়ার্ক। তারা একটি [বিনামূল্যে পাবলিক Polygon RPC](https://docs.polygon.technology/docs/develop/network-details/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) চালাতে পারে কিন্তু যদি আপনি হার সীমিত পান তবে আপনি [QuickNode থেকে একটি ফ্রি ট্রায়াল নোডের](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) জন্য সাইন আপ করতে পারেন।

![img](/img/quicknode/http_URL.png)

tutorial. পরে উপযোগী হবে এমন **HTTP URL**, কপি করুন।

## নেটওয়ার্ক এবং অ্যাকাউন্ট সেটআপ {#network-and-account-setup}

আমাদেরকে Brownie দিয়ে আমাদের QuickNode এন্ডপয়েন্ট সেট আপ করতে হবে। তাই করতে, আপনার কমান্ড লাইনে নিম্নলিখিত টাইপ করুন:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

আমাদের Polygon node while সময় আমরা কেবল পেয়েছি, যা **মুম্বাই Testnet HTTP URL** এর `YOUR_QUICKNODE_URL`সাথে প্রতিস্থাপন করুন।

উপরের কমান্ডে, `Ethereum` হলো এনভারনমেন্টের নাম এবং `matic_mumbai` হচ্ছে নেটওয়ার্কের কাস্টম নাম; আপনি আপনার কাস্টম নেটওয়ার্কের যেকোনো কিছুর রাখতে পারেন।

আমাদের এখানে করতে হবে পরবর্তী জিনিস হল Brownie, ব্যবহার করে একটি নতুন ওয়ালেট তৈরি করা, যাতে আপনার কমান্ড লাইনে নিম্নলিখিত টাইপ করুন:

```
brownie accounts generate testac
```

আপনার অ্যাকাউন্টের জন্য একটি পাসওয়ার্ড সেট আপ করতে আপনাকে জিজ্ঞাসা করা হবে! ধাপ শেষ করার পরে, এটি একটি mnemonic ফ্রেজ সহ একটি অ্যাকাউন্ট তৈরি করবে, এটি অফলাইন সংরক্ষণ করুন। নাম `testac`হচ্ছে আমাদের অ্যাকাউন্টের নাম (আপনি যে কোনও নাম পছন্দ করতে পারেন)।

![img](/img/quicknode/new-account.png)

:::note

Mnemonic বাক্যাংশ একটি অ্যাকাউন্ট পুনরুদ্ধার করতে বা অন্যান্য [<ins>non-custodial ওয়ালেটে</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode) অ্যাকাউন্ট আমদানি করতে ব্যবহার করা যেতে পারে। উপরের ছবিতে আপনি যে অ্যাকাউন্টটি দেখতে পান তা শুধু এই নির্দেশিকাটির জন্য তৈরি করা হয়েছে।

:::

অ্যাকাউন্ট ঠিকানা কপি করুন যাতে আমরা কিছু টেস্ট MATIC পেতে পারি, যা আমাদের চুক্তি deploy  করতে হবে।

## Testnet MATIC পেয়ে {#getting-testnet-matic}

আমাদের স্মার্ট কন্ট্রাক্ট deploy ে গ্যাসের ফির জন্য কিছু টেস্ট MATIC টোকেন দিতে হবে।

এই tutorial, আমরা যে অ্যাকাউন্টের তৈরি করেছি সেটির ঠিকানা কপি করুন, এটি [Polygon faucet](https://faucet.polygon.technology/) এর ঠিকানা ফিল্ডে পেস্ট করুন, এবং **Submit**. ক্লিক করুন। ফসেটটি আপনাকে 0.2 টেস্ট MATIC পাঠাবে।

![img](/img/quicknode/faucet.png)

## আপনার স্মার্ট কন্ট্রাক Deploying করা হচ্ছে {#deploying-your-smart-contract}

চুক্তি deploying আগে, আপনাকে এটি ব্যবহার করে কম্পাইল করতে হবে:

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

এখন আপনার টেক্সট `scripts/token.py`এডিটরে খুলুন এবং নিম্নলিখিত পরিবর্তন করুন:

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info ব্যাখ্যা

উপরে কোড ব্যবহার করে, আমরা আগে তৈরি `testac`অ্যাকাউন্ট আমদানি করেছি এবং এটি variable. সংরক্ষণ `acct`করেছি। এছাড়াও, পরবর্তী লাইনে আমরা Also, থেকে ডেটা পাওয়ার জন্য `'from':`অংশ সম্পাদনা `acct`করেছি।

:::

অবশেষে, আমরা আমাদের স্মার্ট চুক্তি deploy  করব:

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`আমরা আগে তৈরি করেছি এমন কাস্টম নেটওয়ার্কের নাম। প্রম্পট আপনাকে অ্যাকাউন্ট তৈরি করার সময় আমরা আগে সেট করেছি এমন **পাসওয়ার্ডের** জন্য জিজ্ঞেস করবে।

উপরের কমান্ডটি চালানোর পরে, আপনাকে অবশ্যই লেনদেন হ্যাশ পেতে হবে, এবং লেনদেনটি নিশ্চিত করার জন্য Brownie অপেক্ষা করবে। লেনদেন নিশ্চিত করা হলে, Polygon মুম্বই টেস্টনেটে আমাদের ডিপ্লয় করা ঠিকানাটি এটি ফেরত দেবে।

![img](/img/quicknode/brownie-run.png)

আপনি [Polygonscan মুম্বাই-ত](https://mumbai.polygonscan.com/)ে চুক্তির ঠিকানা কপি-পেস্ট করে ডিপ্লয় করা চুক্তিটি পরীক্ষা করতে পারেন।

![img](/img/quicknode/polygonscan.png)

## চুক্তি পরীক্ষা করা {#testing-the-contract}

Brownie স্মার্ট চুক্তি ফাংশনালিটি পরীক্ষা করার সুযোগও দিয়ে থাকে। সহজেই ইউনিট টেস্ট তৈরি করতে এটি `pytest` ফ্রেমওয়ার্ক ব্যবহার করে। Bronwnie-তে টেস্ট লেখার বিষয়ে আপনি [সেগুলোর ডকুমেন্টেশনে](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#) আরো তথ্য পেতে পারেন।

**এভাবেই Brownie এবং QuickNode ব্যবহার করে Polygon-এ চুক্তি ডিপ্লয় করা হয়ে থাকে।**

Polygon এর মতো QuickNode, সবসময় একটি education-first পদ্ধতি আছে যা ডেভেলপার [গাইড](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [ডক](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [টিউটোরিয়াল ভিডিও](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) এবং [ওয়েব3 ডেভেলপারদের](https://discord.gg/DkdgEqE) একটি কমিউনিটি প্রদান করে, যারা একে অপরকে সাহায্য করতে আগ্রহী।
