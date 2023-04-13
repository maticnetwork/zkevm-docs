---
id: network-rpc-endpoints
title: নেটওয়ার্ক এন্ডপয়েন্ট
sidebar_label: Endpoints
description: Polyon PoS mainnet এবং for জন্য নেটওয়ার্ক endpoints
keywords:
  - docs
  - polygon
  - matic
  - remote procedure call
  - network endpoints
  - rpcs
  - http
  - websocket
  - wss
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: endpoints
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

এই সূচকের গাইডটিতে Polygon Mumbai testnet এবং Polygon PoS Mainnet এর জন্য নেটওয়ার্ক বিস্তারিত রয়েছে এবং সেগুলো তাদের সংশ্লিষ্ট RPC এবং নোড এন্ডপয়েন্টগুলোর তালিকা তৈরি করে।

<Tabs
defaultValue="mainnet"
values={[
{ label: 'PoS Mainnet', value: 'mainnet', },
{ label: 'PoS Testnet', value: 'mumbai', },
]
}>
<TabItem value="mumbai">

## মুম্বই PoS টেস্টনেট {#mumbai-pos-testnet}

মুম্বই টেস্টনেট Polygon মেইননেটের প্রতিলিপি তৈরি করে এবং পরীক্ষার জন্য ব্যবহার করা হয়। ব্যবহারকারীরা পেতে পারেন [ফসেট](https://faucet.polygon.technology/) থেকে টেস্টনেট টোকেন। টেস্টনেট টোকেনগুলো মূল্যহীন এবং MATIC-এর মত মূল্য রয়েছে এমন অ্যাসেট থেকে ভিন্ন। এটি ডেভেলপারদের বা নেটওয়ার্ক রক্ষণাবেক্ষণকারীদেরকে কনফিগারেশন পরীক্ষা করার এবং পরীক্ষা বাস্তবায়ন করার সুযোগ দেয়।

| বৈশিষ্ট্য | নেটওয়ার্কের বিস্তারিত তথ্য |
| ---------------------------------- | ---------------------------------------------------------------- |
| NetworkName | **মুম্বই** |
| ParentChain | **[Goërli](https://goerli.net/)** |
| chainId | `80001` |
| গ্যাস টোকেন | [MATIC](gas-token) |
| গ্যাস স্টেশন | [মুম্বাই গ্যাস স্টেশন](https://gasstation-mumbai.matic.today/v2) ([এখান](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/) থেকে আরো শিখুন) |
| RPC এন্ডপয়েন্ট | [https://rpc-mumbai.matic.today](https://rpc-mumbai.matic.today) |
| নোড এন্ডপয়েন্ট | [wss://rpc-mumbai.matic.today](wss://rpc-mumbai.matic.today) |
| Heimdall API | [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology) |
| ব্লক এক্সপ্লোরার | [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com/) |

:::note আরো বিস্তারিত তথ্য

নিম্নলিখিত [**JSON ডেটা**](https://static.matic.network/network/testnet/mumbai/index.json) দেখুন যেগুলোতে রয়েছে
নেটওয়ার্কের বিস্তারিত তথ্য।

:::

</TabItem>
<TabItem value="mainnet">

## Polygon PoS মেইননেট {#polygon-pos-mainnet}

Polygon PoS-এর নেটিভ টোকেন হলো MATIC, এবং গ্যাসের জন্য ব্যবহার করা হয়।

| বৈশিষ্ট্য | নেটওয়ার্কের বিস্তারিত তথ্য |
| ---------------------------------- | ---------------------------------------------------------------- |
| NetworkName | **Polygon** |
| ParentChain | **Ethereum** |
| chainId | `137` |
| গ্যাস টোকেন | [MATIC](gas-token) |
| পেট্রোল পাম্প | [PolygonScan গ্যাস ট্র্যাকার (**সুপারিশকৃত**)](https://polygonscan.com/gastracker) বা [ম্যাটিক নেটওয়ার্ক গ্যাস স্টেশন](https://gasstation-mainnet.matic.network/v2) ([এখান](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/) থেকে আরো শিখুন) |
| RPC এন্ডপয়েন্ট | [https://polygon-rpc.com/](https://polygon-rpc.com/) |
| নোড এন্ডপয়েন্ট | [wss://rpc-mainnet.matic.network](wss://rpc-mainnet.matic.network) |
| Heimdall API | [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology) |
| ব্লক এক্সপ্লোরার | [https://polygonscan.com/](https://polygonscan.com/) |

:::note আরো বিস্তারিত তথ্য

নিম্নলিখিত [**JSON data**](https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json) দেখুন যেগুলোতে নেটওয়ার্কের বিস্তারিত তথ্য রয়েছে।

:::

</TabItem>
</Tabs>

## RPC API পদ্ধতি {#rpc-api-methods}

ডেভেলপাররা অন-চেইন ডেটার সাথে ইন্টারঅ্যাক্ট করতে পারেন এবং বিভিন্ন ধরনের লেনদেন নেটওয়ার্কে পাঠাতে পারেন, নেটওয়ার্ক এন্ডপয়েন্ট ব্যবহার করে। API-গুলো JSON-RPC স্ট্যান্ডার্ড অনুসরণ করে; JSON-RPC একটি স্টেটলেস, হালকা, রিমোট প্রসিডিউর কল (RPC) প্রোটোকল যা সাধারণত একটি ব্লকচেইন নেটওয়ার্কের সাথে ইন্টারঅ্যাক্ট করার সময় ব্যবহার করা হয়।

:::info RPC কল দিয়ে শুরু করুন

স্ট্যান্ডার্ডের জন্য API ডকুমেন্টেশনের সম্পূর্ণ সেট পরিদর্শন করার মাধ্যমে শুরু করুন [**Polygon JSON-RPC কল করে**](https://edge-docs.polygon.technology/docs/get-started/json-rpc-commands/)।

আপনি যদি এমন কোন API অনুরোধ দিয়ে শুরু করতে চান যেখানে কোনো সেটআপের প্রয়োজন নেই, তবে অনুরোধ ব্যর্থ হওয়ার সমস্যা দূর করুন, বা, Polygon নেটওয়ার্কে নতুন নতুন পদ্ধতি অনুসন্ধান করুন, [**Composer App**](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D) ব্যবহার করে দেখুন।

:::

একজন ব্যবহারকারী তার নিজস্ব নোডও চালাতে পারেন যখন Polygon PoS চেইনে ইন্টারঅ্যাক্ট করেন বা অবকাঠামো এবং API পরিষেবা প্রদানকারী কর্তৃক প্রদত্ত পাবলিক এন্ডপয়েন্টগুলোর একটির সাথে সংযোগ স্থাপনে ব্যবহার করতে, যেন নেটওয়ার্কে যুক্ত হতে পারে। ড্যাগার হলো চেইনে থেকে রিয়েলটাইম আপডেট পাওয়ার সেরা উপায়, কারণ এটি আপনার dApps এবং ব্যাকএন্ড সিস্টেমের জন্য একটি সকেট বা ওয়েবসকেট-এ রিয়েলটাইমে ব্লকচেইন ইভেন্ট পাওয়ার একটি উপায় প্রদান করে।

### অবকাঠামো প্রদানকারী {#infrastructure-providers}

ব্যবহারের উপর নির্ভর করে পাবলিক RPC-গুলোর ট্র্যাফিক বা রেটের-সীমা থাকতে পারে। একটি নিবেদিত ফ্রি RPC URL-এর জন্য আপনি নিচে সাইন আপ করতে পারেন:

* [Alchemy](https://www.alchemy.com/)
* [Ankr](https://www.ankr.com/)
* [Blast (Bware Labs)](https://blastapi.io/)
* [BlockPI](https://blockpi.io/)
* [BlockSpaces](https://www.blockspaces.com/web3-infrastructure)
* [Chainnodes](https://www.chainnodes.org/)
* [Chainstack](https://chainstack.com/build-better-with-polygon/)
* [DataHub (Figment)](https://datahub.figment.io)
* [Getblock](https://getblock.io/en/)
* [Infura](https://infura.io)
* [MaticVigil](https://rpc.maticvigil.com/)
* [Moralis](https://moralis.io)
* [পকেট নেটওয়ার্ক](https://www.portal.pokt.network/)
* [QuickNode](https://www.quicknode.com/chains/matic)
* [SettleMint](https://docs.settlemint.com/docs/polygon-connect-to-a-node)
* [WatchData](https://docs.watchdata.io/blockchain-apis/polygon-api)
* [NOWNodes](https://nownodes.io/nodes/polygon-matic)
