---
id: bor-chain
title: BoR-চেইন কী?
sidebar_label: Bor Chain
description: Polygon PoS জন্য Bor Chain বা Sidechain VM পরিচিতি
keywords:
  - docs
  - matic
  - polygon
  - bor chain
  - sidechain VM
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Bor চেইন {#bor-chain}

বোর নোড, বা ব্লক প্রযোজক বাস্তবায়ন মূলত সাইডচেন অপারেটর। সাইডচেইন VM EVM সমর্থন করে। বর্তমানে, এটি হলো এমন একটি মৌলিক Geth বাস্তবায়ন, যা সম্মতিযুক্ত অ্যালগোরিদমে কাস্টম পরিবর্তন করে। তবে, এটিকে হালকা-পাতলা এবং আরো ফোকাসযোগ্য করে গড়ে তোলার জন্য একদম শুরু থেকে নির্মাণ করা হচ্ছে।

ব্লক প্রডিউসারদের ভ্যালিডেটর সেট থেকে নির্বাচিত করা হয় এবং একই উদ্দেশ্যে অতীত Ethereum ব্লক হ্যাশ ব্যবহার করে শাফল করা হয়। তবে, আমরা এই নির্বাচনের জন্য র‍্যান্ডমনেসের উৎস খুঁজে বেড়াচ্ছি।