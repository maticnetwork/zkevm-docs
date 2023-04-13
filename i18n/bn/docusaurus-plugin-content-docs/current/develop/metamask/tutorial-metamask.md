---
id: hello
title: কীভাবে একটি MetaMask ওয়ালেট তৈরি করবেন?
sidebar_label: Hello Metamask
description: কীভাবে একটি Metamask ওয়ালেট তৈরি করা যায় তা শিখুন।
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

আপনি যদি একটি নতুন ক্রিপ্টোকারেন্সি ওয়ালেট তৈরি করতে চান, তবে MetaMask এক্সটেনশন ইনস্টল করার মাধ্যমে একটি তৈরি করার কথা বিবেচনা করতে পারেন।

MetaMask হলো একটি ফ্রি এবং নিরাপদ ব্রাউজার এক্সটেনশন, যা ওয়েব অ্যাপ্লিকেশনগুলোকে Ethereum ব্লকচেইনের সাথে পড়তে এবং ইন্টারঅ্যাক্ট করতে দেয়।

## ধাপ 1. আপনার ব্রাউজারে MetaMask ইনস্টল করুন {#step-1-install-metamask-on-your-browser}

MetaMask-এর মাধ্যমে একটি নতুন ওয়ালেট তৈরি করতে আপনাকে প্রথমে এক্সটেনশন ইনস্টল করতে হবে। আপনি [ক্রোম](https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn) , [ফায়ারফক্স](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/), ব্রেভ এবং [ওপেরা](https://addons.opera.com/en/extensions/details/metamask/) ব্রাউজার-এর জন্য Metamask ইনস্টল করতে পারেন।

1. [https://metamask.io](https://metamask.io/) বা আপনার পছন্দের সার্চ ইঞ্জিন ব্যবহার করে "Metamask এক্সটেনশন" অনুসন্ধান করুন.

:::note
এই টিউটোরিয়ালে আমরা একটি উদাহরণ হিসাবে Google Chrome ব্যবহার করব, কিন্তু সমস্ত ব্রাউজারের জন্য ওয়ার্কফ্লো একই।
:::

<img src={useBaseUrl("img/metamask/develop/metamask-home.png")} />

2. একটি Google Chrome এক্সটেনশান হিসাবে MetaMask ইনস্টল করতে **ডাউনলোড** ক্লিক করুন।

3. **ক্রোম-এ যোগ করুন-এ** ক্লিক করুন।

<img src={useBaseUrl("img/metamask/develop/add-chrome.png")} />

4. **এক্সটেনশন যোগ করুন**-এ ক্লিক করুন।

<div align="center">
<img src={useBaseUrl("img/metamask/develop/add-extension.png")} />
</div>

এতটুকুই! আপনি সফলভাবে MetaMask এক্সটেনশন ইনস্টল করেছেন!

## ধাপ 2. একটি অ্যাকাউন্ট তৈরি করুন {#step-2-create-an-account}

পরবর্তী ধাপটি হলো একটি অ্যাকাউন্ট তৈরি করা।

1. ডাউনলোড শেষ হওয়ার পরে, আপনি একটি নতুন ওয়ালেট তৈরি করে এবং একটি নতুন সিক্রেট রিকভারি ফ্রেজ তৈরি করে **একটি নতুন** **অ্যাকাউন্ট** তৈরি করতে পারেন বা সিক্রেট রিকভারি ফ্রেজ তৈরি করতে পারেন।

<div align="center">
<img src={useBaseUrl("img/metamask/develop/new-metamask.png")} />
</div>

2. আপনাকে একটি নতুন পাসওয়ার্ড তৈরি করতে বলা হবে। একটি শক্তিশালী পাসওয়ার্ড তৈরি করুন এবং **তৈরি করুন**-এ ক্লিক করুন।

<div align="center" >
<img width="500" src={useBaseUrl("img/metamask/develop/create-password.png")} />
</div>

3. MetaMask তারপর সিক্রেট রিকভারি ফ্রেজ সম্পর্কে কিছু তথ্য প্রদান করবে এবং পরবর্তী পৃষ্ঠায় আপনি আপনার ফ্রেজ দেখতে পাবেন।

<div align="center" >
<img  src={useBaseUrl("img/metamask/develop/reveal-phrase.png")} />
</div>


4. উপস্থাপনা করা একই অর্ধে কাগজের একটি টুপিতে 12-word ফ্রেজ নিচে লিখে নিন।

:::caution
সাবধানে মেটামাস্কের নির্দেশাবলী পড়ুন একটি নিরাপদ অবস্থানে কাগজের একটি on ে এবং স্টোরে এই ফ্রেজটি লিখুন । আপনি যদি আরও বেশি নিরাপত্তা চান তবে এটি কাগজের একাধিক on লিখে নিন এবং ২-৩ টি ভিন্ন স্থানে প্রতিটি সংরক্ষণ করুন। আপনি এই বাক্যাংশ স্মরণ করতে পারেন।
:::

5. পূর্বে তৈরি করা শব্দবন্ধটি বেছে নিয়ে আপনার গোপন শব্দবন্ধটি যাচাই করুন। সম্পন্ন হলে, **নিশ্চিত করুন**-এ ক্লিক করুন।

<img src={useBaseUrl("img/metamask/develop/phrase.gif")} />

“এই পাজল সমাধান করা” আপনি নিশ্চিত করছেন যে আপনি আপনার সিক্রেট ফ্রেজ জানেন।

**অভিনন্দন!** আপনি সফলভাবে আপনার MetaMask অ্যাকাউন্ট তৈরি করেছেন। আপনার জন্য একটি নতুন Ethereum ওয়ালেট ঠিকানা স্বয়ংক্রিয়ভাবে তৈরি করা হয়েছে!