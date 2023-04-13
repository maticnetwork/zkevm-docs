---
id: run-validator-ansible
title: Ansible দিয়ে ভ্যালিডেটর নোড চালান
sidebar_label: Using Ansible
description: Polygon এ আপনার যাচাইকারী নোড সেট আপ করতে Ansible ব্যবহার করুন
keywords:
  - docs
  - matic
  - polygon
  - ansible
  - node
  - validator
  - sentry
slug: run-validator-ansible
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip

এই নির্দেশানায় থাকা ধাপগুলি **Heimdall** এবং **Bor** পরিষেবা সম্পূর্ণ সিঙ্কে আসার অপেক্ষার সাথে জড়িত।
এই প্রক্রিয়াটি সম্পূর্ণ হতে বেশ কয়েকদিন সময় লাগে। বিকল্পভাবে, আপনি একটি রক্ষণাবেক্ষণ করা স্ন্যাপশট ব্যবহার করতে পারেন, যা কয়েক ঘন্টা সিঙ্কের সময় কমিয়ে দেবে। বিস্তারিত নির্দেশাবলীর জন্য, [<ins>Heimdall এবং Bor এর জন্য স্ন্যাপশটের নির্দেশাবলী</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor) দেখুন।

স্ন্যাপশট ডাউনলোডের লিঙ্কগুলির জন্য, [<ins>Polygon চেইন স্ন্যাপশট</ins>](https://snapshot.polygon.technology/) দেখুন।
:::

এই বিভাগটি একটি Ansible প্লেবুকের মাধ্যমে আপনাকে যাচাইকারী নোড শুরু করার এবং চালানোর জন্য নির্দেশনা দেয়।

সিস্টেমের প্রয়োজনীয়তার জন্য [যাচাইকারী নোড সিস্টেমের প্রয়োজনীয়তা](validator-node-system-requirements.md) দেখুন।

আপনি বাইনারি থেকে যাচাইকারী নোড শুরু করতে এবং চালাতে চাইলে, [বাইনারি থেকে একটি যাচাইকারী নোড চালান](run-validator-binaries.md) বিকল্পটি দেখুন।

:::caution

নতুন যাচাইকারী গ্রহণের জন্য সীমিত স্থান রয়েছে। নতুন যাচাইকারী শুধুমাত্র সক্রিয় সেটটিতে যোগ দিতে পারেন যখন একটি ইতিমধ্যে সক্রিয় যাচাইকারী unbonds

:::

## পূর্বশর্ত {#prerequisites}

* তিনটি মেশিন — একটি স্থানীয় মেশিন যেখানে আপনি Ansible প্লেবুক চালাবেন; বাকি দুটি রিমোট মেশিন — একটি [sentry](/docs/maintain/glossary.md#sentry) এবং আরেকটি [যাচাইকারী](/docs/maintain/glossary.md#validator)।
* স্থানীয় মেশিনে, [Ansible](https://www.ansible.com/) ইনস্টল করা থাকে।
* স্থানীয় মেশিনটিতে, [Python 3.x](https://www.python.org/downloads/) ইনস্টল করা থাকে।
* রিমোট মেশিনগুলোতে, Go যাতে ইনস্টল করা *না* থাকে তা নিশ্চিত করুন।
* রিমোট মেশিনগুলিতে, আপনার স্থানীয় মেশিনের SSH পাবলিক কী রিমোট মেশিনগুলিতে Ansible সংযুক্ত করতে দেয়।
* আমরা একটি রিলে নেটওয়ার্ক হিসাবে Bloxroute উপলভ্য রেখেছি। আপনার বিশ্বস্ত Peer ার হিসাবে আপনার একটি গেটওয়ে যোগ করতে হবে তবে দয়া **করে**[](https://discord.com/invite/0xPolygon)  

:::info

অনুগ্রহ করে [<ins>bloXroute</ins>](/maintain/validate/bloxroute.md) গি. ে আপনার নোডটি সংযোগ করতে bloXroute নির্দেশাবলীতে পদক্ষেপটি অনুসরণ করুন।

:::

## সংক্ষিপ্ত বিবরণ {#overview}

:::caution

আপনাকে **অবশ্যই কর্মের সঠিক রূপরেখা সিকোয়েন্সের** অনুসরণ করতে হবে, অন্যথা,  আপনি সমস্যাতে পাও. া যাবে। উদাহরণস্বরূপ, **যাচাইকারী নোডের আগে একটি sentry নোড সবসময় সেট আপ করতে হবে।**

:::

একটি চলমান যাচাইকারী নোড পেতে নিম্নলিখিত কাজগুলি করুন:

1. তিনটি মেশিন প্রস্তুত করুন।
1. Ansible-এর মাধ্যমে একটি sentry নোড সেট আপ করুন।
1. Ansible-এর মাধ্যমে একটি যাচাইকারী নোড সেট আপ করুন।
1. Sentry নোড কনফিগার করুন।
1. Sentry নোড শুরু করুন।
1. যাচাইকারী নোড কনফিগার করুন।
1. মালিক এবং স্বাক্ষরকারীর কী সেট করুন।
1. যাচাইকারী নোডটি শুরু করুন।
1. কমিউনিটি দিয়ে নোডের হেলথ পরীক্ষা করুন।

## Sentry নোড সেট আপ করুন {#set-up-the-sentry-node}

আপনার স্থানীয় মেশিনে, [node-ansible সংগ্রহস্থল](https://github.com/maticnetwork/node-ansible) ক্লোন করুন:

```sh
git clone https://github.com/maticnetwork/node-ansible
```

ক্লোন করা সংগ্রহস্থলটি পরিবর্তন করুন:

```sh
cd node-ansible
```

রিমোট মেশিনগুলির IP ঠিকানা যোগ করুন যা `inventory.yml` ফাইলের একটি Sentry নোড এবং একটি যাচাইকারী নোড হয়ে উঠবে।

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for sentry node
        xxx.xxx.xx.xx: # <----- Add IP for second sentry node (optional)
    validator:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for validator node
```

উদাহরণ:

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        188.166.216.25:
    validator:
      hosts:
        134.209.100.175:
```

সেই রিমোট Sentry মেশিনটি আয়ত্তাধীন কি না পরীক্ষা করুন। স্থানীয় মেশিনটিতে, চালান:

```sh
$ ansible sentry -m ping
```

আপনার আউটপুট হিসাবে এটি পাওয়া উচিত:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Sentry নোড সেটআপের একটি টেস্ট রান করুন:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

আউটপুট হিসাবে এটি পাওয়া যাবে:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Sudo- সুবিধা দিয়ে নোডের সেটআপ চালান:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

একবার সেটআপ সম্পূর্ণ হয়ে গেলে, আপনি টার্মিনালটিতে সমাপ্তির একটি বার্তা দেখতে পাবেন।

:::note

যদি আপনি কোনো সমস্যার মধ্যে পড়েন এবং আবার শুরু করতে চান, তাহলে চালান:

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## যাচাইকারী নোডের সেট আপ করুন {#set-up-the-validator-node}

এখানে এসে, আপনার কাছে Sentry নোডের সেট আপ থাকবে।

আপনার স্থানীয় মেশিনে, আপনার কাছে যাচাইকারী নোডে সেটআপ চালানোর জন্য Ansible প্লেবুকের সেটআপও আছে।

রিমোট যাচাইচারী মেশিনটি আয়ত্তাধীন কিনা পরীক্ষা করুন। স্থানীয় মেশিনে রান `ansible validator -m ping`করুন।

আপনার আউটপুট হিসাবে এটি পাওয়া উচিত:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

যাচাইকারী নোডের সেটআপটির একটি টেস্ট রান করুন:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

আপনার আউটপুট হিসাবে এটি পাওয়া উচিত:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Sudo সুবিধাদির সাথে যাচাইকারী নোডের সেটআপ চালান:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

একবার সেটআপ সম্পূর্ণ হয়ে গেলে, আপনি টার্মিনালটিতে সমাপ্তির একটি বার্তা দেখতে পাবেন।

:::note

যদি আপনি কোনো সমস্যার মধ্যে পড়েন এবং আবার শুরু করতে চান, তাহলে চালান:

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## Sentry নোডটি কনফিগার করুন {#configure-the-sentry-node}

রিমোট Sentry মেশিনটিতে লগইন করুন।

### Heimdall পরিষেবাটি কনফিগার করুন {#configure-the-heimdall-service}

`vi ~/.heimdalld/config/config.toml` সম্পাদনার জন্য `config.toml` খুলুন।

নিম্নলিখিতটি পরিবর্তন করুন:

* `moniker` — যেকোনো নাম। উদাহরণ: `moniker = "my-full-node"`।
* `seeds` — সিড নোডের ঠিকানাগুলিতে একটি নোড ID, একটি IP ঠিকানা এবং একটি পোর্ট থাকে।

নিম্নলিখিত মানগুলি ব্যবহার করুন:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — পিয়ার এক্সচেঞ্জ সক্রিয় করতে `true`-এ মান সেট করুন। উদাহরণ: `pex = true`।
* `private_peer_ids` — যাচাইকারী মেশিনটিতে Heimdall এর নোড ID-র সেটআপ।

  যাচাইকারী মেশিনটিতে Heimdall নোড ID পেতে:

  1. যাচাইকারী মেশিনটিতে লগইন করুন।
  1. `heimdalld tendermint show-node-id` চালান।

  উদাহরণ: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`।

* `prometheus` — Prometheus মেট্রিক্স সক্রিয় করার জন্য `true`-তে মান সেট করুন। উদাহরণ: `prometheus = true`।
* `max_open_connections` — `100`-তে মান সেট করুন। উদাহরণ: `max_open_connections = 100`।

পরিবর্তনগুলি `config.toml`-এ সেভ করুন।

### Bor পরিষেবাটি কনফিগার করুন {#configure-the-bor-service}

 `vi ~/node/bor/start.sh` সম্পাদনার জন্য খুলুন।

`start.sh`-এ, সবশেষে নিম্নলিখিত লাইনটি যোগ করে একটি নোড ID, একটি IP ঠিকানা এবং একটি পোর্ট সমন্বিত বুট নোডের ঠিকানাগুলি যোগ করুন:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

পরিবর্তনগুলি `start.sh`-এ সেভ করুন।

`vi ~/.bor/data/bor/static-nodes.json` সম্পাদনার জন্য খুলুন।

`static-nodes.json`-এ, নিম্নলিখিতটি পরিবর্তন করুন:

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"`- যাচাইকারী মেশিনটিতে Bor-এর নোড ID এবং IP ঠিকানার সেটআপ।

যাচাইকারী মেশিনটিতে Bor-এর নোড ID পেতে:

  1. যাচাইকারী মেশিনটিতে লগইন করুন।
  1. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress` চালান।

  উদাহরণ: `"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`।

পরিবর্তনগুলি `static-nodes.json`-এ সেভ করুন।

### ফায়ারওয়াল কনফিগার করুন {#configure-firewall}

`0.0.0.0/0`-এর দুনিয়া খুলতে Sentry মেশিনটিতে অবশ্যই নিম্নলিখিত পোর্টগুলি থাকতে হবে:

* 26656- আপনার Heimdall পরিষেবাটি Heimdall পরিষেবা ব্যবহার করে অন্যান্য নোডের সাথে আপনার নোড সংযুক্ত করবে।

* 30303- আপনার Bor পরিষেবাটি Bor পরিষেবা ব্যবহার করে অন্যান্য় নোডের সাথে আপনার নোড সংযুক্ত করবে।

* 22- যাচাইকারী যেখানেই থাকুন না কেন, সেখান থেকে SSH সক্ষম করার জন্য।

:::note

তবে, যদি তারা কোনো VPN সংযোগ ব্যবহার করেন, তাহলে তারা একমাত্র VPN IP ঠিকানা থেকেই ইনকামিং SSH সংযোগের অনুমতি দিতে পারেন।

:::

## Sentry নোডটি শুরু করুন {#start-the-sentry-node}

আপনি প্রথমে Heimdall পরিষেবা শুরু করবেন। একবার Heimdall পরিষেবা সিঙ্ক হয়ে গেলে, আপনি Bor পরিষেবা শুরু করবেন।

:::note

Heimdall পরিষেবাটির একদম শূণ্য থেকে পুরোপুরি সিঙ্ক হওয়ার জন্য বেশ কয়েকদিন সময় লাগে।

বিকল্পভাবে, আপনি একটি রক্ষণাবেক্ষণ করা স্ন্যাপশট ব্যবহার করতে পারেন, যা কয়েক ঘণ্টা সিঙ্কের সময় কমিয়ে দেবে। বিস্তারিত নির্দেশাবলীর জন্য, [<ins>Heimdall এবং Bor এর জন্য স্ন্যাপশটের নির্দেশাবলী</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233) দেখুন।

স্ন্যাপশট ডাউনলোডের লিঙ্কগুলির জন্য, [Polygon চেইনের স্ন্যাপশট](https://snapshot.polygon.technology/) দেখুন।

:::

### Heimdall পরিষেবাটি শুরু করুন {#start-the-heimdall-service}

সর্বশেষ সংস্করণ, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), যেমন কয়েকটি উন্নতি রয়েছে:
1. স্টেট সিঙ্ক txs-এ ডেটার আকার সীমিত করে দাঁড়িয়েছে:
    * **30Kb** যখন **বাইটস** এ উপস্থাপন করা হয়
    * **60Kb** যখন **স্ট্রিং** হিসাবে উপস্থাপন করা হয়।
2. বিভিন্ন যাচাইকারীদের চুক্তির ইভেন্টগুলি মাঝে **বিলম্বের সময়** বাড়ানো হয়েছে এটি নিশ্চিত করার জন্য যে অতিরিক্ত ঘটনাবহুল হওয়ার অবস্থায় মিমপুল অত্যন্ত দ্রুত পূরণ হয় না যার ফলে চেইনটির অগ্রগতি হস্তক্ষেপ হতে পরে।

নিম্নলিখিত উদাহরণটি দেখায় কীভাবে ডেটার আকার সীমিত:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Heimdall পরিষেবা শুরু করুন:

```sh
sudo service heimdalld start
```

Heimdall রেস্ট-সার্ভার শুরু করুন:

```sh
sudo service heimdalld-rest-server start
```

Heimdall পরিষেবার লগগুলি পরীক্ষা করুন:

```sh
journalctl -u heimdalld.service -f
```

:::note

লগগুলিতে, আপনি নিম্নলিখিত ত্রুটিগুলি দেখতে পারেন:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

এর অর্থ হল নেটওয়ার্কটিতে থাকা নোডগুলির একটিকে আপনার নোডের সাথে সংযোগ করা যায়নি। আপনাকে এই ত্রুটিগুলি নিয়ে কিছু করতে হবে না। নেটওয়ার্কে আরও নোড ক্রল করে আনার জন্য আপনার নোডের অপেক্ষা করুন।

:::

Heimdall রেস্ট-সার্ভারের লগগুলি পরীক্ষা করুন:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Heimdall-এর সিঙ্ক স্টেটাস দেখুন:

```sh
curl localhost:26657/status
```

আউটপুটে, `catching_up` এর মান হল:

* `true` — Heimdall পরিষেবাটি সিঙ্ক হচ্ছে।
* `false` — Heimdall পরিষেবাটি সম্পূর্ণ সিঙ্ক করা হয়েছে।

Heimdall পরিষেবাটি পুরোপুরি সিঙ্ক হওয়ার জন্য অপেক্ষা করুন।

### Bor পরিষেবাটি শুরু করুন {#start-the-bor-service}

একবার Heimdall পরিষেবাটি পুরোপুরি সিঙ্ক হয়ে গেলে, Bor পরিষেবাটি শুরু করুন।

Bor পরিষেবাটি শুরু করুন:

```sh
sudo service bor start
```

Bor পরিষেবাটির লগগুলি পরীক্ষা করুন:

```sh
journalctl -u bor.service -f
```

## যাচাইকারী নোডটি কনফিগার করুন {#configure-the-validator-node}

:::note

এই বিভাগটি সম্পূর্ণ করতে, আপনাকে অবশ্যই আপনার সম্পূর্ণ সিঙ্ক করা Ethereum মেইননেট নোডের একটি RPC এন্ডপয়েন্ট প্রস্তুত রাখতে হবে।

:::

### Heimdall পরিষেবাটি কনফিগার করুন {#configure-the-heimdall-service-1}

রিমোট যাচাইকারী মেশিনে লগইন করুন।

`vi ~/.heimdalld/config/config.toml` সম্পাদনার জন্য `config.toml` খুলুন।

নিম্নলিখিতটি পরিবর্তন করুন:

* `moniker` — যেকোনো নাম। উদাহরণ: `moniker = "my-validator-node"`।
* `pex` — পিয়ার এক্সচেঞ্জ নিষ্ক্রিয় করতে `false`-এ মান সেট করুন। উদাহরণ: `pex = false`।
* `private_peer_ids` — এটি নিষ্ক্রিয় করতে মানটির বিষয়ে মন্তব্য করুন। উদাহরণ:.`# private_peer_ids = ""`।


Sentry মেশিনে Heimdall-এর নোড ID পেতে:

  1. Sentry মেশিনটিতে লগইন করুন।
  1. `heimdalld tendermint show-node-id` চালান।

উদাহরণ: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — Prometheus মেট্রিক্স সক্রিয় করার জন্য `true`-তে মান সেট করুন। উদাহরণ: `prometheus = true`।

পরিবর্তনগুলি `config.toml`-এ সেভ করুন।

`vi ~/.heimdalld/config/heimdall-config.toml` সম্পাদনার জন্য খুলুন।

`heimdall-config.toml`-এ, নিম্নলিখিতটি পরিবর্তন করুন:

* `eth_rpc_url` — সম্পূর্ণ সিঙ্ক করা Ethereum মেইননেটের জন্য একটি RPC এন্ডপয়েন্ট, অর্থাৎ Infura। `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

উদাহরণ: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


পরিবর্তনগুলি `heimdall-config.toml`-এ সেভ করুন।

### Bor পরিষেবাটি কনফিগার করুন {#configure-the-bor-service-1}

 `vi ~/.bor/data/bor/static-nodes.json` সম্পাদনার জন্য খুলুন।

`static-nodes.json`-এ, নিম্নলিখিতটি পরিবর্তন করুন:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — Sentry মেশিনটিতে Bor সেটআপের নোড ID এবং IP ঠিকানা।

Sentry মেশিনে Bor এর নোড ID পেতে:

  1. Sentry মেশিনটিতে লগইন করুন।
  1. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress` চালান।

  উদাহরণ: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`।

পরিবর্তনগুলি `static-nodes.json`-এ সেভ করুন।

## মালিক এবং স্বাক্ষরকারীর কী সেট করুন {#set-the-owner-and-signer-key}

Polygon-এ, আপনাকে মালিক এবং স্বাক্ষরকারীর কীগুলি আলাদা রাখতে হবে।

* স্বাক্ষরকারী — সেই ঠিকানা [চেকপয়েন্ট লেনদেনগুলি](../glossary#checkpoint-transaction) চিহ্নিত করে। স্বাক্ষরকারীর ঠিকানায় কমপক্ষে 1 ETH রাখার সুপারিশ করা হয়।
* মালিক — সেই ঠিকানা যা স্ট্যাক করার লেনদেন করে। মালিকের ঠিকানায় MATIC টোকেনগুলি রাখার সুপারিশ করা হয়।

### একটি Heimdall প্রাইভেট কী তৈরি করুন {#generate-a-heimdall-private-key}

কেবলমাত্র যাচাইকারী মেশিনেই আপনাকে একটি Heimdall প্রাইভেট কী তৈরি করতে হবে। **Sentry মেশিনে কোনো Heimdall প্রাইভেট কী তৈরি করবেন না।**

প্রাইভেট কী তৈরি করার জন্য, রান করুন:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY - আপনার Ethereum ওয়ালেট এর প্রাইভেট কী

:::

এটি `priv_validator_key.json` তৈরি করবে। তৈরি হওয়া JSON ফাইলটি Heimdall কনফিগারেশন ডিরেক্টরিতে স্থানান্তর করুন:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### একটি Bor কীস্টোর ফাইল তৈরি করুন {#generate-a-bor-keystore-file}

কেবলমাত্র যাচাইকারী মেশিনেই আপনাকে একটি Bor কীস্টোর ফাইল তৈরি করতে হবে। **Sentry মেশিনে কোনো Bor কীস্টোর ফাইল তৈরি করবেন না।**

প্রাইভেট কী তৈরি করার জন্য, রান করুন:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — আপনার Ethereum ওয়ালেটের প্রাইভেট কী।

:::

প্রম্পট করা হলে, কীস্টোর ফাইলে একটি পাসওয়ার্ড সেটআপ করুন।

এটি একটি `UTC-<time>-<address>` কীস্টোর ফাইল তৈরি করবে।

তৈরি করা কীস্টোর ফাইলটি Bor কনফিগারেশন ডিরেক্টরিতে স্থানান্তর করুন:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### যোগ`password.txt`

একটি `password.txt` ফাইল নিশ্চিতভাবে তৈরি করুন এবং তারপর Bor কীস্টোর ফাইলের পাসওয়ার্ড সরাসরি `~/.bor/password.txt` ফাইলে যোগ করুন।

### আপনার Ethereum ঠিকানা যোগ করুন {#add-your-ethereum-address}

`vi /etc/matic/metadata` সম্পাদনার জন্য খুলুন।

`metadata`-এ, আপনার Ethereum ঠিকানা যোগ করুন। উদাহরণ: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`।

পরিবর্তনগুলি `metadata`-এ সেভ করুন।

## যাচাইকারী নোডটি শুরু করুন {#start-the-validator-node}

এই সময়ে, আপনার কাছে থাকা আবশ্যক:

* Sentry মেশিনে সম্পূর্ণ সিঙ্ক করা এবং চলমান Heimdall পরিষেবা।
* Sentry মেশিনে চলমান Bor পরিষেবা।
* কনফিগার করা যাচাইকারী মেশিনে Heimdall পরিষেবা এবং Bor পরিষেবা।
* আপনার কনফিগার করা মালিক এবং স্বাক্ষরকারীর কী।

### Heimdall পরিষেবাটি শুরু করুন {#start-the-heimdall-service-1}

আপনি এখন যাচাইকারী মেশিনে Heimdall পরিষেবাটি শুরু করবেন। একবার Heimdall পরিষেবাটি সিঙ্ক হয়ে গেলে, আপনি যাচাইকারী মেশিনে Bor পরিষেবা শুরু করতে পারবেন।

Heimdall পরিষেবা শুরু করুন:

```sh
sudo service heimdalld start
```

Heimdall রেস্ট-সার্ভার শুরু করুন:

```sh
sudo service heimdalld-rest-server start
```

Heimdall ব্রিজ শুরু করুন:

```sh
sudo service heimdalld-bridge start
```

Heimdall পরিষেবার লগগুলি পরীক্ষা করুন:

```sh
journalctl -u heimdalld.service -f
```

Heimdall রেস্ট-সার্ভারের লগগুলি পরীক্ষা করুন:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Heimdall ব্রিজের লগগুলি পরীক্ষা করুন:

```sh
journalctl -u heimdalld-bridge.service -f
```

Heimdall-এর সিঙ্ক স্টেটাস দেখুন:

```sh
curl localhost:26657/status
```

আউটপুটে, `catching_up` এর মান হল:

* `true` — Heimdall পরিষেবাটি সিঙ্ক হচ্ছে।
* `false` — Heimdall পরিষেবাটি সম্পূর্ণ সিঙ্ক করা হয়েছে।

Heimdall পরিষেবাটি পুরোপুরি সিঙ্ক হওয়ার জন্য অপেক্ষা করুন।

### Bor পরিষেবাটি শুরু করুন {#start-the-bor-service-1}

একবার যাচাইকারী মেশিনে Heimdall পরিষেবাটি পুরোপুরি সিঙ্ক হয়ে গেলে, যাচাইকারী মেশিনে Bor পরিষেবাটি শুরু করুন।

Bor পরিষেবাটি শুরু করুন:

```sh
sudo service bor start
```

Bor পরিষেবাটির লগগুলি পরীক্ষা করুন:

```sh
journalctl -u bor.service -f
```

## কমিউনিটি দিয়ে নোড হেলথ পরীক্ষা করুন {#check-node-health-with-the-community}

এখন যখন আপনার Sentry এবং যাচাইকারী নোডগুলি সিঙ্ক হয়ে গেছে এবং চলমান অবস্থায় আছে, তখন [Discord](https://discord.com/invite/0xPolygon)-এর দিকে যান এবং আপনার নোডগুলির হেলথ পরীক্ষা করতে কমিউনিটিকে অনুরোধ করুন।

:::note

যাচাইকারী হিসাবে যাচাইকারী হিসেবে সবসময়ই signer ঠিকানাটির একটি চেক থাকতে বাধ্য। যদি ETH ব্যালেন্স 0.5 ETH নিচে পৌঁছাতে থাকে তাহলে এটি refilled. করা উচিত। এই এড়িয়ে চলুন সেটিকে চেকপয়েন্ট লেনদেন জমা থেকে নোডটি ধাক্কা দেবে।

:::

## স্ট্যাক করার জন্য এগিয়ে যান {#proceed-to-staking}

এখন যখন আপনার Sentry এবং যাচাইকারী নোডগুলির হেলথ পরীক্ষা হয়ে গেছে, তখন [স্ট্যাক করার](/docs/maintain/validator/core-components/staking) জন্য এগিয়ে যান।
