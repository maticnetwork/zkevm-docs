---
id: full-node-deployment
title: Ansible দিয়ে একটি সম্পূর্ণ নোড চালান
description: Ansible ব্যবহার করে একটি ফুল নোড স্থাপন করুন
keywords:
  - docs
  - polygon
  - matic
  - node
  - full node setup
  - ansible
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

এই টিউটোরিয়ালটি আপনাকে আনসিবল ব্যবহার করে একটি সম্পূর্ণ নোড শুরু করা থেকে রান করা পর্যন্ত পথনির্দেশ করবে।

একটি [Ansible প্লেবুক](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html) ব্যবহার করা হয় একটি সম্পূর্ণ নোড কনফিগার এবং পরিচালনা করতে। সিস্টেমের প্রয়োজনীয়তার জন্য [নূন্যতম কারিগরি প্রয়োজনীয়তার](technical-requirements.md) নির্দেশিকাটি দেখুন।

:::tip

এই গাইডে থাকা ধাপগুলো Heimdall এবং Bor পরিষেবাকে সম্পূর্ণ সিঙ্ক হওয়ার অপেক্ষার সাথে জড়িত। এই প্রক্রিয়াটি সম্পূর্ণ হতে বেশ কয়েকদিন সময় লাগে।

বিকল্পভাবে, সিঙ্ক সময়টি কয়েক ঘন্টায় কমিয়ে এনে আপনি একটি রক্ষণাবেক্ষণ করা স্ন্যাপশট ব্যবহার করতে পারেন। বিস্তারিত নির্দেশাবলীর জন্য, [<ins>Heimdall এবং Bor এর জন্য স্ন্যাপশটের নির্দেশাবলী</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor) দেখুন।

স্ন্যাপশট ডাউনলোডের লিঙ্কগুলোর জন্য, [<ins>Polygon চেইনের স্ন্যাপশটের</ins>](https://snapshot.polygon.technology/) পেজটি দেখুন।

:::

## পূর্বশর্ত {#prerequisites}

- Python3.x-এর মাধ্যমে আপনার স্থানীয় মেশিনে Ansible ইনস্টল করুন। আপনি যদি Python2.x থাকে তবে সেটআপ কাজ করবে না।
    - Python 3.x-এর মাধ্যমে আনসিবল ইনস্টল করতে, আপনি pip ব্যবহার করতে পারেন। আপনার মেশিনে পিপ না থাকলে, [এখানে](https://pip.pypa.io/en/stable/) উল্লিখিত ধাপগুলো অনুসরণ করুন। ইনস্টল করার জন্য `pip3 install ansible` চালান Ansible।
- পূর্বশর্তের জন্য [Polygon PoS আনসিবল রিপোজিটরি](https://github.com/maticnetwork/node-ansible#requirements) পরীক্ষা করুন।
- আপনাকে আরো নিশ্চিত করতে হবে যে আপনার এনভারনমেন্টে Go **ইনস্টল করা নেই**। আপনি যদি you দিয়ে Go ইনস্টল করার মাধ্যমে আপনার পূর্ণ নোড সেট আপ করার চেষ্টা করেন তবে আপনি issues ে into চালানো হবে।
- আপনাকে আরো নিশ্চিত করতে হবে যে আপনার VM / মেশিনে Polygon যাচাইকারী বা Heimdall বা Bor-এর জন্য পূর্ববর্তী কোনো সেটআপ নেই। আপনার সেটআপে যেহেতু সমস্যায় চলবে, তাই আপনাকে সেগুলো মুছে ফেলতে হবে।

:::info Heimdall-এর উৎস সম্প্রসারণ

সর্বশেষ Heimdall সংস্করণ, **[v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0)**, কিছু উন্নতি রয়েছে। বিভিন্ন যাচাইকারীর চুক্তির ঘটনাগুলোর মধ্যকার বিলম্বের সময়টি **বৃদ্ধি করা হয়েছে** এবং এর কারণ হলো মেমপুলটি
কোনো ইভেন্ট বার্স্ট হলে দ্রুত পূরণ হয় না, যা চেইনের অগ্রগতিকে ব্যাহত করতে পারে।

উপরন্তু, ডেটার আকার **স্টেট সিঙ্ক txs-এ 30Kb-এ সীমাবদ্ধ করা হয়েছে (যখন বাইট হিসেবে উপস্থাপন করা হয়) এবং 60Kb (যখন স্ট্রিং হিসেবে নির্ধারণ করা হয়)**। উদাহরণস্বরূপ:

```bash
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```
:::

## সম্পূর্ণ নোড সেটআপ {#full-node-setup}

- নিশ্চিত করে যে রিমোট মেশিন বা VM-এ আপনার অ্যাক্সেস রয়েছে, যার উপর সম্পূর্ণ নোড সেট আপ করা আছে।
  > আরো বিস্তারিত জানার জন্য [https://github.com/maticnetwork/node-ansible#setup](https://github.com/maticnetwork/node-ansible#setup) দেখুন।
- [the](https://github.com/maticnetwork/node-ansible)  the  the
- নোড-আনসিবল ফোল্ডারে ন্যাভিগেট করুন: `cd node-ansible`
- `inventory.yml` ফাইল সম্পাদনা করুন এবং `sentry->hosts` বিভাগে আপনার IP(s) লিখুন।
  > আরো বিস্তারিত জানার জন্য [https://github.com/maticnetwork/node-ansible#inventory](https://github.com/maticnetwork/node-ansible#inventory) দেখুন।
- চলমান দ্বারা রিমোট মেশিন পৌঁছানো হচ্ছে কিনা তা পরীক্ষা করুন:`ansible sentry -m ping`
- সঠিক মেশিনটি কনফিগার করা আছে কি না তা পরীক্ষা করতে, নিম্নলিখিত কমান্ডটি রান করুন:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry" --list-hosts

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry" --list-hosts
  ```

  <img src={useBaseUrl("img/network/full-node-mumbai.png")} />

- তারপর, এই কমান্ডের মাহদ্যমে সম্পূর্ণ নোডটি সেট আপ করুন:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry"

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry"
  ```

- আপনি যদি কোন সমস্যায় রান করেন, তাহলে পুরো সেটআপ মুছে ফেলুন এবং পরিষ্কার করুন:
  ```
  ansible-playbook playbooks/clean.yml
  ```

- আপনি আনসিবল প্লেবুক শুরু করার পরে, রিমোট মেশিনে লগইন করুন।

- Heimdall বীজ নোড:

  ```bash
  moniker=<enter unique identifier>

  # Mainnet:
  seeds="d3a8990f61bb3657da1664fe437d4993c4599a7e@3.211.248.31:26656,d3d7d397339c9126235dfab11bf925e269776f4f@3.212.183.151:26656,68254d33685fad151e45bfe1ed33d538ba6ec8cb@3.93.224.197:26656,d26c54ebbf274896f12977bb13d83ac1237a8226@184.73.124.158:26656,f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656"

  # Testnet:
  seeds="b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656,4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,7a6c7b5d25b13ce3448b047dbebeb1a19cc2e092@18.213.200.99:26656"
  ```
- Bootnodes:

  ```bash
  # Mainnet:
  bootnode ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303","enode://4be7248c3a12c5f95d4ef5fff37f7c44ad1072fdb59701b2e5987c5f3846ef448ce7eabc941c5575b13db0fb016552c1fa5cca0dda1a8008cf6d63874c0f3eb7@3.93.224.197:30303","enode://32dd20eaf75513cf84ffc9940972ab17a62e88ea753b0780ea5eca9f40f9254064dacb99508337043d944c2a41b561a17deaad45c53ea0be02663e55e6a302b2@3.212.183.151:30303"]

  # Testnet:
  bootnodes ["enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303","enode://f0f48a8781629f95ff02606081e6e43e4aebd503f3d07fc931fad7dd5ca1ba52bd849a6f6c3be0e375cf13c9ae04d859c4a9ae3546dc8ed4f10aa5dbb47d4998@34.226.134.117:30303"]
  ```

- Heimdall সিঙ্ক হয়েছে কি না তা পরীক্ষা করতে
    - রিমোট মেশিন/VM-এ, `curl localhost:26657/status` চালান
    - আউটপুটে, `catching_up` মান `false` হওয়া উচিত

- Heimdall সিঙ্ক হয়ে গেলে, চালান
    - `sudo service bor start`

আপনি আনসিবল সহ একটি সম্পূর্ণ নোড সফলভাবে সেট আপ করেছেন।

:::note

যদি Bor ডাটা করার অনুমতি একটি ত্রুটি উপস্থাপন করে, তাহলে Bor ব্যবহারকারীকে Bor ফাইলের মালিক করতে এই কমান্ড চালান:

```bash
sudo chown bor /var/lib/bor
```

:::
## লগ {#logs}

`journalctl` লিনাক্স টুল দ্বারা লগগুলো নিয়ন্ত্রণ করা যাবে। আরো উন্নত ব্যবহারের ব্যাপারে এখানে একটি টিউটোরিয়াল দেওয়া হয়েছে: [Systemd লগ দেখতে ও পরিবর্তন করতে কীভাবে Journalctl ব্যবহার করা যায়](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs)।

**Heimdall নোড লগ পরীক্ষা করুন**

```bash
journalctl -u heimdalld.service -f
```

**Bor রেস্ট-সার্ভার লগ পরীক্ষা করুন**

```bash
journalctl -u bor.service -f
```

## পোর্ট এবং ফায়ারওয়াল সেটআপ {#ports-and-firewall-setup}

সেন্ট্রি নোড ফায়ারওয়ালে পোর্ট 22, 26656 এবং 30303 ওয়ার্ল্ড (0.0.0.0/0)-এ খুলুন।

আপনি আপনার প্রয়োজন এবং নিরাপত্তার নির্দেশিকা অনুযায়ী পোর্ট 22-এর জন্য অ্যাক্সেস সীমিত করতে VPN ব্যবহার করতে পারেন।