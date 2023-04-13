---
id: nftstorage
title: মিন্ট NFTs
description: NFT.storage এবং Polygon-এর সাথে মিন্ট করুন।
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

এই টিউটোরিয়ালটি আপনাকে NFT.Storage মাধ্যমে Polygon ব্লকচেইন এবং IPFS/Filecoin স্টোরেজ ব্যবহার করে একটি NFT মিন্ট করতে শিখবে। Ethereum-এর জন্য একটি লেয়ার 2 স্কেলিং সমাধান Polygon, প্রায়শই Ethereum-এর সাথে সম্পূর্ণ সামঞ্জস্য বজায় রাখার সময় ডেভেলপারদের তার গতি এবং কম লেনদেনের খরচ জন্য বেছে নেওয়া হয়। টিউটোরিয়ালটি আপনাকে NFT.Storage API এর মাধ্যমে IPFS এবং Filecoin এ মেটাডেটা এবং সম্পদ সংরক্ষণ করে এবং একটি মানসম্মত স্মার্ট চুক্তি তৈরি ও স্থাপনার মাধ্যমে এবং NFT.Storage মাধ্যমে আপনাকে হেঁটে ফেলবে।

## ভূমিকা {#introduction}

এই টিউটোরিয়ালে আমরা আমাদের মিন্টিং প্রক্রিয়া নিয়ে তিনটি বৈশিষ্ট্য পূরণ করতে চাই:

1. খরচ এবং থ্রুপুট পরিপ্রেক্ষিতে *পরিমাপযোগ্যতা*  প্রক্রিয়া। যদি ব্যবহার করা মামলার দ্রুত NFTs তৈরি করা হয়, তবে অন্তর্নিহিত প্রযুক্তিটি সকল মিন্টিং অনুরোধ পরিচালনা করতে হবে এবং মিন্টিং সস্তা হওয়া উচিত।
2. NFT এর *সময়কাল* , যেহেতু সম্পদ দীর্ঘজীবী হতে পারে এবং তাই তাদের পূর্ণ জীবদ্দশায় ব্যবহারযোগ্য থাকতে হবে।
3. এনএফটি *অপরিবর্তনীয়তা* এবং এটি যে সম্পদের প্রতিনিধিত্ব করে তা অবাঞ্ছিত পরিবর্তন এবং ক্ষতিকারক অভিনেতাদের ডিজিটাল সম্পদ পরিবর্তন করতে বাধা দেয় যা NFT প্রতিনিধিত্ব করে।

[Polygon](https://polygon.technology)  *পরিমাপযোগ্যতা* ঠিকানার মাধ্যমে তাদের প্রোটোকল এবং কাঠামোর সাথে বৈশিষ্ট্যযুক্ত। তারা Ethereum এবং এর ভার্চুয়াল মেশিনের সাথেও সামঞ্জস্যপূর্ণ, যা বিকাশকারীদের তাদের কোড দুটি ব্লকচেইনের মধ্যে অবাধে সরাতে সক্ষম করে। একইভাবে, [NFT.Storage অন্তর্নিহিত শক্তি সঙ্গে](https://nft.storage) গ্যারান্টি *সময়কাল* [Filecoin](https://filecoin.io) নেটওয়ার্ক এবং বিষয়বস্তু ঠিকানা ব্যবহার করে অন্তর্নিহিত *সময়কাল*   IPFS' ব্যবহার করে ক্ষমতা নিয়ে স্থায়িত্ব নিশ্চিত করে[](https://nftschool.dev/concepts/content-addressing/)।

এই টিউটোরিয়ালে আপনাকে NFT মিন্টিং প্রক্রিয়া সম্পর্কে একটি ওভারভিউ পাবেন, NFT.Storage দিয়ে একটি ডিজিটাল সম্পদ কীভাবে সংরক্ষণ করা যায় এবং Polygon-এ আপনার NFT মিন্ট করতে এই ডিজিটাল সম্পদ ব্যবহার করুন।

## পূর্বশর্ত {#prerequisites}

NFTs সম্পর্কে সাধারণ জ্ঞান আপনাকে পটভূমি এবং প্রসঙ্গ প্রদান করবে। [NFT স্কুল NFT বেসিক জুড়ে](https://nftschool.dev/concepts/non-fungible-tokens/), উন্নত বিষয় এবং আরো বেশি টিউটোরিয়াল রয়েছে।

এই টিউটোরিয়ালে পাওয়া কোডটি পরীক্ষা এবং চালানোর জন্য, আপনাকে একটি কাজ করার প্রয়োজন Node.js [Node.js ইনস্টলেশন](https://nodejs.org/en/download/package-manager/)।

আপনাকে মুম্বাই টেস্টনেট-এ একটি Polygon ওয়ালেট প্রয়োজন এবং একটি ছোট পরিমাণ MATIC নিয়ে থাকবে। শুরু করতে নিচের নির্দেশাবলী অনুসরণ করুন:

1. ** [Metamask](https://metamask.io/)Metamask ডাউনলোড এবং ইনস্টল করুন** । Metamask হলো একটি ক্রিপ্টো ওয়ালেট এবং ব্লকচেইন অ্যাপস এর গেটওয়ে। এটি ব্যবহার করা খুব সহজ এবং অনেক পদক্ষেপ সহজ করা সহজ, যেমন একটি Polygon ওয়ালেট সেট আপ করুন।
2. **মেটামাস্ককে Polygon সাথে কানেক্ট করুন [মুম্বাই টেস্টনেট](https://docs.polygon.technology/docs/develop/metamask/overview)** এবং ড্রপডাউন মেনুতে এটি বেছে নিন। আমরা আমাদের NFT মিন্ট করতে Polygon-এর টেস্টনেট ব্যবহার করব, কারণ এটি বিনামূল্যে হয়।
3. **MATIC টোকেন পান** আপনার মানিব্যাগ [faucet](https://faucet.polygon.technology/) ব্যবহার করে আপনার ওয়ালেটে করুন। মুম্বাই টেস্টনেট নির্বাচন করুন এবং Metamask থেকে আপনার ওয়ালেট ঠিকানা ফর্মে পেস্ট করুন। একটি NFT মিন্ট করতে, আমাদের একটি ছোট পরিমাণ MATIC দিতে হবে, যা ব্লকচেইনে নতুন লেনদেনের যোগ করার জন্য অপারেশনগুলো জন্য miners দ্বারা চার্জ করা একটি ফি রয়েছে, যেমন একটি NFT মিন্টিং করা বা একটি নতুন স্মার্ট চুক্তি তৈরি করা যায়।
4. শীর্ষ ডান কো${ **-এ তিনটি on ক্লিক করে এবং 'অ্যাকাউন্ট বিশদ বিবরণ' বেছে নিয়ে করে মেটামাস্ক থেকে আপনার ব্যক্তিগত কী কপি** করুন। নীচে আপনি আপনার ব্যক্তিগত কী এক্সপোর্ট  করার জন্য একটি বাটন খুঁজে পেতে পারেন। এটি ক্লিক করুন এবং অনুরোধ করা হলে আপনার পাসওয়ার্ড লিখুন। আপনি এখন জন্য একটি টেক্সট ফাইলে ব্যক্তিগত কী কপি করুন এবং পেস্ট করতে পারেন। ব্লকচেইন দিয়ে ইন্টারঅ্যাক্ট করার সময় আমরা পরে টিউটোরিয়ালে এটি ব্যবহার করব।

অবশেষে, আপনার একটি টেক্সট বা কোড এডিটর দরকার। আরো সুবিধার জন্য, জাভাস্ক্রিপ্ট এবং সলিডিটির জন্য ভাষা সমর্থন সহ এডিট করা বেছে নিন। একটি ভাল বিকল্প হল [ভিজ্যুয়াল স্টুডিও কোড](https://code.visualstudio.com) যার সাথে [সলিডিটি](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) এক্সটেনশন চালু করুন।

## প্রস্তুতি {#preparation}

### NFT.storage এর জন্য একটি API কী পান {#get-an-api-key-for-nft-storage}

NFT.Storage ব্যবহার করার জন্য আপনাকে একটি API কী দরকার। প্রথমত, [আপনার ইমেইল ঠিকানার মাধ্যমে লগ ইন করতে NFT.Storage address](https://nft.storage/login/) এ হেড করুন। আপনি একটি ম্যাজিক লিঙ্ক দিয়ে একটি ইমেল পাবেন যা আপনাকে সাইন ইন করে - কোন পাসওয়ার্ড প্রয়োজন নেই। আপনি সফলভাবে লগইন করার পরে, ন্যাভিগেশন বার মাধ্যমে API কী-এ যান। একটি **নতুন কী** তৈরি করতে আপনি একটি বাটন পাবেন। একটি API কী নামের জন্য অনুরোধ করা হলে, আপনি স্বাধীনভাবে একটি চয়ন করতে পারেন বা "polygon + NFT. স্টোরেজ" ব্যবহার করতে পারেন৷ আপনি এখন কী কলামের কন্টেন্ট কপি করতে পারেন বা টিউটোরিয়ালে পরে NFT.Storage ফিরে রেফারেন্স করতে পারেন।

### আপনার ওয়ার্কস্পেস সেট আপ করুন {#set-up-your-workspace}

এই টিউটোরিয়ালের জন্য আমরা আমাদের ওয়ার্কস্পেস হিসেবে ব্যবহার করতে পারি এমন একটি নতুন খালি ফোল্ডার তৈরি করুন। আপনার ফাইল সিস্টেমে কোনো নাম এবং অবস্থান নির্বাচন করতে বিনা দ্বিধায়। একটি টার্মিনাল ওপেন করুন এবং নতুন তৈরি ফোল্ডার-এ নেভিগেট করুন।

পরবর্তী, আমরা নিম্নলিখিত Node.js নির্ভরতা ইনস্টল করব:

- **Hardhat and Hardhat-Ethers**, Ethereum (Ethereum সামঞ্জস্যপূর্ণ ব্লকচেইন যেমন Polygon) এর জন্য একটি উন্নয়ন পরিবেশ।
- **OpenZeppelin**, মানসম্মত NFT বেস চুক্তির সমন্বিত স্মার্ট চুক্তির একটি সংগ্রহ।
- **NFT.Storage**, NFT.Storage API এর সাথে সংযোগ করার জন্য একটি লাইব্রেরি।
- **Dotenv**, কনফিগারেশন জন্য পরিবেশ ফাইল পরিচালনা করার জন্য একটি লাইব্রেরি (যেমন স্ক্রিপ্টে ব্যক্তিগত কী ইনজেকশন করা )।

একবারে সমস্ত নির্ভরতা ইনস্টল করতে নিম্নলিখিত কমান্ডটি ব্যবহার করুন:

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Hardhat বর্তমান ফোল্ডার-এ শুরু করতে হবে। প্রাথমিক সূচনাটি শুরু করার জন্য, মৃত্যু:

```bash
npx hardhat
```

প্রম্পট হলে, **একটি খালি hardhat.config.js তৈরি করুন** আপনার কনসোল আউটপুট এই মত দেখতে উচিত:

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

আমরা হার্ডহ্যাট কনফিগারেশন ফাইলে কিছু পরিবর্তন করব `hardhat.config.js`Polygon Polygon মুম্বাই টেস্ট নেটওয়ার্কে সমর্থন করতে। `hardhat.config.js` শেষ ধাপে তৈরি করা খুলুন। অনুগ্রহ করে মনে রাখবেন যে আমরা একটি এনভায়রনমেন্ট ফাইল থেকে আপনার Polygon ওয়ালেট ব্যক্তিগত কী লোড করছি এবং এই এনভায়রনমেন্ট ফাইল নিরাপদ রাখা আবশ্যক। আপনি প্রয়োজন অনুযায়ী অন্যান্য rpc [লিঙ্ক](https://docs.polygon.technology/docs/develop/network-details/network),  ব্যবহার করতে পারেন।

```js
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
    PolygonMumbai : {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

NFT.Storage এবং আপনার Polygon ওয়ালেট প্রাইভেট কী জন্য আপনার API কী থাকবে `.env`এমন একটি নতুন ফাইল তৈরি করুন। `.env`ফাইলের কনটেন্ট অবশ্যই কিছু দেখতে হবে:

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

প্রস্তুতির সময় আপনার তৈরি করা API কী এবং আপনার বহুভুজ ওয়ালেট ব্যক্তিগত কী দিয়ে স্থানধারকগুলিকে প্রতিস্থাপন করুন।

আমাদের প্রজেক্ট সংগঠিত রাখার জন্য, আমরা তিনটি নতুন ফোল্ডার তৈরি করব:

1. `contracts`, সলিডিটিতে লিখিত Polygon চুক্তির জন্য।
2. `assets`, ডিজিটাল অ্যাসেট ধারণকারী যা আমরা একটি NFT হিসাবে মিন্ট করব।
3. `scripts`, প্রস্তুতি এবং মিন্টিং প্রক্রিয়া চালানোর জন্য সাহায্যকারী হিসাবে।

নিম্নলিখিত কমান্ডটি এক্সিকিউট করুন:

```bash
mkdir contracts assets scripts
```

অবশেষে, আমরা  `assets` ফোল্ডার-এ একটি ইমেজ যোগ করব। এই ছবিটি আমাদের আর্টওয়ার্ক হবে যা আমরা NFT.Storage এবং Polygon-এ মিন্ট এ আপলোড করব। আমরা এখন জন্য `MyExampleNFT.png` এটি নাম করব। আপনার যদি কিছু চমৎকার আর্ট প্রস্তুত না থাকে, [তবে আপনি একটি সহজ প্যাটার্ন ডাউনলোড করতে পারেন।](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu)

## আপনার NFT মিন্টিং করা {#minting-your-nft}

### NFT.Storage সঙ্গে সম্পদ ডেটা স্টোর করা {#storing-asset-data-with-nft-storage}

আমরা আমাদের ডিজিটাল সম্পদ এবং এর মেটাডেটা সংরক্ষণ করতে NFT.Storage ব্যবহার করব। NFT.Storage আপনার ডিজিটাল সম্পদ Filecoin এবং IPFS স্বয়ংক্রিয়ভাবে আপলোড করে immutability এবং স্থায়িত্ব নিশ্চিত করে। IPFS এবং Filecoin অপরিবর্তনীয় রেফারেন্সের জন্য কন্টেন্ট শনাক্তকারী (CID) এ কাজ করে। IPFS তার geo-replicated ক্যাচিং এবং Filecoin ইন-এর incentivized স্টোরেজ প্রদানকারীর সাথে স্থায়িত্ব নিশ্চিত করে দ্রুত পুনরুদ্ধার প্রদান করবে।

ডিরেক্টরির নিচে `store-asset.mjs` নামক একটি স্ক্রিপ্ট `scripts` তৈরি করুন। বিষয়বস্তু নীচে তালিকাভুক্ত করা হয়:

```js
import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env

async function storeAsset() {
   const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
   const metadata = await client.store({
       name: 'ExampleNFT',
       description: 'My ExampleNFT is an awesome artwork!',
       image: new File(
           [await fs.promises.readFile('assets/MyExampleNFT.png')],
           'MyExampleNFT.png',
           { type: 'image/png' }
       ),
   })
   console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

স্ক্রিপ্ট প্রধান অংশ হল `storeAsset`  ফাংশন। এটি আগে তৈরি করা API কী ব্যবহার করে NFT.Storage থেকে সংযোগ করা একটি নতুন ক্লায়েন্ট তৈরি করে। পরের আমরা নাম, বর্ণনা এবং ইমেজ ধারণকারী মেটাডেটা পরিচয় করি। মনে রাখবেন, আমরা  ডিরেক্টরি থেকে ফাইল সিস্টেম থেকে সরাসরি NFT অ্যাসেট `assets` রিডিং করছি। ফাংশন শেষে আমরা মেটাডেটা URL মুদ্রণ করব, কারণ আমরা Polygon-এ NFT তৈরি করার সময় পরে এটি ব্যবহার করব।

স্ক্রিপ্ট সেট আপ করার পরে, আপনি চলমান করে এটি এক্সিকিউট করতে পারেন:

```bash
node scripts/store-asset.mjs
```

আপনার আউটপুট নীচের লিস্টিং মত দেখতে উচিত, `HASH` আপনি যে শিল্প সংরক্ষণ করতে CID কোথায়।

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### Polygon-এ আপনার NFT তৈরি করা {#creating-your-nft-on-polygon}

#### মিন্টিং করার জন্য স্মার্ট চুক্তি তৈরি করুন {#create-the-smart-contract-for-minting}

প্রথমত, আমরা একটি স্মার্ট চুক্তি তৈরি করব, যা NFT মিন্ট করতে ব্যবহার করা হবে। Polygon Ethereum এর সাথে সামঞ্জস্যপূর্ণ, তাই আমরা [সলিডিটিতে ](https://soliditylang.org) স্মার্ট চুক্তি লিখুন। ডিরেক্টরির `ExampleNFT.sol` ভিতরে `contracts` নামক আমাদের NFT স্মার্ট চুক্তির জন্য একটি নতুন ফাইল তৈরি করুন। আপনি নীচের লিস্টিং কোড কপি করতে পারেন:

```solidity
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleNFT is ERC721URIStorage, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("NFT", "ENFT") {}

   function mintNFT(address recipient, string memory tokenURI)
       public onlyOwner
       returns (uint256)
   {
       _tokenIds.increment();

       uint256 newItemId = _tokenIds.current();
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);

       return newItemId;
   }
}
```

একটি বৈধ NFT হতে, আপনার স্মার্ট চুক্তি [ERC-721 standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/)  স্ট্যান্ডার্ডের সমস্ত পদ্ধতি বাস্তবায়ন করতে হবে। আমরা [OpenZeppelin](https://openzeppelin.com) লাইব্রেরির বাস্তবায়ন ব্যবহার করি, যা আগে থেকেই মৌলিক কার্যকারিতার একটি সেট প্রদান করে এবং মান অনুসরণ করে।

আমাদের স্মার্ট চুক্তির উপরে, আমরা তিনটি OpenZeppelin স্মার্ট চুক্তি ক্লাস ইম্পোর্ট করি:

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol` ERC-721 স্ট্যান্ডার্ডের মৌলিক পদ্ধতি বাস্তবায়ন রয়েছে, যা আমাদের NFT স্মার্ট চুক্তি উত্তরাধিকার হবে। আমরা `ERC721URIStorage,` ব্যবহার করি যা শুধু সম্পদ সংরক্ষণ করতে একটি এক্সটেনশন কিন্তু একটি JSON ফাইল অফ-চেইন হিসাবে মেটাডেটা হিসাবে। চুক্তি মত, এই JSON ফাইল ERC-721 অনুসরণ করতে হবে।

2. `\@openzeppelin/contracts/utils/Counters.sol` কাউন্টার প্রদান করে যা শুধুমাত্র একটি দ্বারা বৃদ্ধি বা হ্রাস করা যেতে পারে। আমাদের স্মার্ট চুক্তি মিন্ট করা NFT মোট সংখ্যা ট্র্যাক করতে এবং আমাদের নতুন NFT এ অনন্য আইডি সেট করতে একটি কাউন্টার ব্যবহার করে।

3. আমাদের `\@openzeppelin/contracts/access/Ownable.sol`স্মার্ট চুক্তিতে অ্যাক্সেস নিয়ন্ত্রণ সেট আপ করে, তাই শুধুমাত্র স্মার্ট চুক্তি (আপনি) মালিক NFTs মিন্ট করতে পারেন।

আমাদের আমদানি স্টেটমেন্ট পরে, আমাদের নিজস্ব NFT স্মার্ট চুক্তি রয়েছে, যা একটি কাউন্টার, একটি কন্সট্রাকটর এবং আসলে NFT মিন্ট করার একটি পদ্ধতি রয়েছে। বেশিরভাগ কঠোর কাজ OpenZeppelin থেকে উত্তরাধিকার বেস চুক্তি দ্বারা করা হয়, যা আমাদের ERC-721 মান অনুসরণ করে একটি NFT তৈরি করতে প্রয়োজন বেশিরভাগ পদ্ধতি প্রয়োগ করে।

কাউন্টার মিন্ট NFTs মোট সংখ্যা ট্র্যাক রাখে, যা NFT জন্য একটি অনন্য শনাক্তকারী হিসাবে মিন্টিং পদ্ধতিতে ব্যবহার করা হয়।

কন্সট্রাকটর ইন, আমরা স্মার্ট চুক্তি এবং প্রতীক (ওয়ালেট প্রতিনিধিত্ব করে) জন্য দুটি স্ট্রিং আর্গুমেন্টে পাস করি। আপনি তাদের আপনি যা চান তা পরিবর্তন করতে পারেন।

অবশেষে, আমাদের পদ্ধতি আছে যা আমাদের আসলে  `mintNFT` NFT মিন্ট করতে দেয়। পদ্ধতিটি সেট করা হয় যাতে নিশ্চিত করা হয় `onlyOwner` এটি শুধুমাত্র স্মার্ট চুক্তির মালিক দ্বারা কার্যকর করা যেতে পারে।

`address recipient`প্রথমে NFT পাবেন এমন ঠিকানা নির্দিষ্ট করে।

`string memory tokenURI`হল একটি URL যা একটি JSON ডকুমেন্টে সমাধান করতে হবে, যা NFT এর মেটাডেটা বর্ণনা করে। আমাদের ক্ষেত্রে, এটি already আগে থেকেই সংরক্ষণ করা হয়। পদ্ধতিটির কার্যকর করার সময় আমরা মেটাডেটা JSON ফাইলের জন্য ফেরত IPFS লিঙ্কটি ব্যবহার করতে পারি।

পদ্ধতি ভিতরে, আমাদের NFT জন্য একটি নতুন অনন্য শনাক্তকারী পাওয়ার জন্য আমরা কাউন্টার বৃদ্ধি করি। তারপর আমরা OpenZeppelin থেকে বেস চুক্তি দ্বারা প্রদত্ত পদ্ধতিগুলো কল করি নতুন তৈরি শনাক্তকারী এবং মেটাডেটা এর URI সেট করার সাথে প্রাপককে NFT মিন্ট করতে। পদ্ধতি এক্সিকিউশন করার পরে অনন্য শনাক্তকারী ফেরত দেয়।

#### Polygon-এ স্মার্ট চুক্তি স্থাপন করুন {#deploy-the-smart-contract-to-polygon}

এখন, Polygon-এ আমাদের স্মার্ট চুক্তি নিয়োগের সময়। `deploy-contract.mjs` ডিরেক্টরির মধ্যে `scripts` নামক একটি নতুন ফাইল তৈরি করুন। যে ফাইলে নীচের লিস্টিং এর বিষয়বস্তু কপি করুন এবং এটি সংরক্ষণ করুন।

```js
async function deployContract() {
 const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
 const exampleNFT = await ExampleNFT.deploy()
 await exampleNFT.deployed()
 // This solves the bug in Mumbai network where the contract address is not the real one
 const txHash = exampleNFT.deployTransaction.hash
 const txReceipt = await ethers.provider.waitForTransaction(txHash)
 const contractAddress = txReceipt.contractAddress
 console.log("Contract deployed to address:", contractAddress)
}

deployContract()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });
```

হার্ডহ্যাট লাইব্রেরি দ্বারা প্রদত্ত সাহায্যকারী ফাংশনগুলির সাথে চুক্তি স্থাপন করা হয়। প্রথমত, আমরা প্রদত্ত কারখানার সাথে পূর্ববর্তী ধাপে তৈরি করা স্মার্ট চুক্তিটি পাই। তারপরে আমরা সংশ্লিষ্ট পদ্ধতিতে কল করে এটি স্থাপন করি এবং স্থাপনা সম্পূর্ণ হওয়ার জন্য অপেক্ষা করি। টেস্টনেট পরিবেশে সঠিক ঠিকানা পেতে বর্ণিত কোডের নীচে আরও কয়েকটি লাইন রয়েছে। ফাইল সংরক্ষণ `mjs`করুন।

নিম্নলিখিত কমান্ডের সাথে স্ক্রিপ্ট এক্সিকিউট করুন:

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

সবকিছু সঠিক হলে, আপনি নিম্নলিখিত আউটপুট দেখতে পাবেন:

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

মনে রাখবেন, মিন্টিং স্টেপে আপনার প্রিন্টেড চুক্তি ঠিকানা দরকার। আপনি একটি পৃথক টেক্সট ফাইলে এটি কপি এবং পেস্ট করতে পারেন এবং পরে এটি সংরক্ষণ করতে পারেন। এটি প্রয়োজন যাতে মিন্টিং স্ক্রিপ্ট সেই নির্দিষ্ট চুক্তির মিন্টিং পদ্ধতি কল করতে পারে।

#### Polygon-এ NFT মিন্টিং করা {#minting-the-nft-on-polygon}

NFT মিন্টিং করা এখন কেবল আমরা Polygon-এ নিযুক্ত চুক্তি কল করছি। ডিরেক্টরির `mint-nft.mjs` মধ্যে `scripts` নামক একটি নতুন ফাইল তৈরি করুন এবং নীচের লিস্টিং থেকে এই কোড কপি করুন:

```bash
const CONTRACT_ADDRESS = "0x00"
const META_DATA_URL = "ipfs://XX"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

পূর্ববর্তী স্থাপনার থেকে আপনার **চুক্তি ঠিকানা** যোগ করতে প্রথম দুটি লাইন সম্পাদনা করুন এবং NFT.Storage সহ সম্পদ সংরক্ষণ করার সময় ফেরত দেওয়া **মেটাডেটা URL** যা রিটার্ন করা হয়েছিল। বাকি স্ক্রিপ্ট NFT এর মালিক এবং IPFS এ সংরক্ষিত মেটাডেটা থেকে পয়েন্টার হিসাবে আপনার স্মার্ট চুক্তিতে কল সেট আপ করে।

পরবর্তী, স্ক্রিপ্ট চালান:

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

আপনি নিম্নলিখিত আউটপুট দেখতে আশা করতে পারেন:

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

এই টিউটোরিয়াল থেকে নমুনা কোড খুঁজছেন? আপনি এটি polygon-nft.storage-demo [লিঙ্ক](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo) Github রেপোতে খুঁজে পেতে পারেন।

## উপসংহার {#conclusion}

এই টিউটোরিয়ালে, আমরা Polygon এবং NFT.Storage সহ একটি NFT এন্ড-টু-এন্ড মিন্ট করতে শিখিয়েছিলাম। এই প্রযুক্তির সংমিশ্রণের ফলে সঠিক বিকেন্দ্রীকরণ হয় এবং *স্কেলেবিলিটি*, *স্থায়িত্ব* এবং  *অপরিবর্তনীয়তার*  গ্যারান্টি দেয়।

আমাদের প্রয়োজনের জন্য আমাদের NFT নির্দিষ্ট করার জন্য আমরা একটি কাস্টম স্মার্ট চুক্তি স্থাপন করেছি। এই টিউটোরিয়ালের জন্য, আমরা ERC-721 স্ট্যান্ডার্ডের উপর ভিত্তি করে একটি সহজ উদাহরণ ব্যবহার করেছি। যাইহোক, আপনি আপনার NFT জীবন চক্র নিয়ন্ত্রণ করে এমন জটিল যুক্তিও নির্ধারণ করতে পারেন। আরো জটিল ব্যবহারের ক্ষেত্রে উত্তরসূরি স্ট্যান্ডার্ড  [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/) শুরু করার জন্য একটি ভাল জায়গা। OpenZeppelin, আমাদের in আমরা ব্যবহার করি এমন লাইব্রেরি [চুক্তি উইজার্ড](https://docs.openzeppelin.com/contracts/4.x/wizard) একটি  প্রদান করে যা NFT চুক্তি তৈরি করতে সহায়তা করে।

NFT এর মূল্যবান পর্যায়ে শুরু হিসাবে সফল মিন্টিং দেখা যেতে পারে। NFT মালিকানা প্রমাণ করতে ব্যবহার করা যেতে পারে এবং অন্যান্য ব্যবহারকারীদের কাছে স্থানান্তর করা যেতে পারে। একটি NFT ট্রান্সফার করার কারণগুলির মধ্যে [OpenSea](https://opensea.io), বা একটি NFT ভিত্তিক গেমে একটি আইটেম অর্জন করার মতো NFT মার্কেটের একটি অংশে একটি সফল বিক্রয় অন্তর্ভুক্ত হতে পারে। NFTs জন্য সমৃদ্ধ সম্ভাবনার অনুসন্ধান করা অবশ্যই একটি উত্তেজনাপূর্ণ পরবর্তী ধাপ।

আপনি যদি NFT প্রকল্পের NFT স্টোরেজ দিয়ে তৈরি করতে সহায়তা চান তবে আমরা আপনাকে D[iscord ](https://discord.gg/Z4H6tdECb9)এবং [স্ল্যাকের](https://filecoinproject.slack.com/archives/C021JJRH26B) `#nft-storage`চ্যানেলে যোগ দিতে উত্সাহিত করি।
