---
id: get-allowance
title: getAllowance
keywords:
- 'plasma client, erc20, getAllowance, polygon, sdk'
description: 'MATICJS দিয়ে শুরু করুন'
---

# getAllowance {#getallowance}

ব্যবহারকারী্র জন্য অনুমোদিত পরিমাণ পেতে `getAllowance`পদ্ধতি ব্যবহার করা যেতে পারে।

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const balance = await erc20Token.getAllowance(<userAddress>);
```
