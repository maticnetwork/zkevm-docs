---
id: plugin
title: প্লাগইন
keywords:
- 'plugin, api type, read, write, polygon'
description: 'Matic.js-এ কোড প্রবেশ করানোর জন্য প্লাগইন ব্যবহার করুন।'
---

প্লাগইন ব্যবহার করে আপনি `matic.js`-এ আপনার কোড প্রবেশ করাতে পারবেন। এটি ব্যবহার করে কিছু সাধারণ কোডের সেট লিখা যেতে পারে, যা শুধু একটি প্যাকেজ দিয়েই যে কাউকে পাঠানো যাবে।

:::info

প্লাগইন `matic.js`-কে হালকা করে তুলে কারণ এটি শুধুমাত্র গুরুত্বপূর্ণ লজিকাল অংশটি ব্যবহার করে।

:::

প্রকৃতপক্ষে, web3 লাইব্রেরিটি প্লাগইন ব্যবহার করা সমর্থন করে, ফলে আমরা আমাদের প্রিয় লাইব্রেরি ব্যবহারের সুযোগ পাবো।

### প্লাগইন ডেভেলপমেন্ট {#plugin-development}

প্লাগইন হলো একটি ক্লাস যা `IPlugin` বাস্তবায়ন করে।

```
import { IPlugin } from "@maticnetwork/maticjs";

export class MyPlugin implements IPlugin {

    // variable matic is - default export of matic.js
    setup(matic) {

        // get web3client
        const web3Client = matic.Web3Client ;
    }
}
```

আপনি যেমনটি দেখতে পাচ্ছেন - আপনাকে শুধু একটি `setup` পদ্ধতি বাস্তবায়ন করতে হবে, যা `matic.js`-এর ডিফল্ট এক্সপোর্ট দিয়ে কল করা হবে।

### প্লাগইন ব্যবহার করুন {#use-plugin}

প্লাগইন ব্যবহার করার জন্য `matic.js` `use` পদ্ধতি প্রকাশ করে।

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

আপনি একাধিক প্লাগইন ব্যবহার করতে পারেন এবং সেগুলো যেভাবে ঘোষণা করা হয় সেই একই ক্রমে কল করা হবে।

**কিছু প্লাগইন রেপোস হলো -**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
