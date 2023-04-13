---
id: contributor-guidelines
title: কীভাবে অবদান রাখবেন
sidebar_label: Contributor guidelines
description: আপনার আসন্ন অবদানের জন্য প্রস্তুত হোন
keywords:
  - docs
  - matic
  - polygon
  - contribute
  - contributor
  - contributing
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: orientation
---

:::tip

[আমাদের Polygon Wiki রিপোজিটরিতে বিনা দ্বিধায় সমস্যার অভিযোগ জানান](https://github.com/maticnetwork/matic-docs/issues)

:::

## কোথায় অবদান রাখবেন, তা চিহ্নিত করুন {#identify-an-area-to-contribute-to}

Wiki-তে অবদানের ক্ষেত্র চিহ্নিত করার অনেক উপায় আছে:

- তবে, সবচেয়ে সহজ উপায় হচ্ছে "আমি Polygon Wiki-তে অবদান রাখতে চাই" বলার মাধ্যমে একজন [Wiki রক্ষণাবেক্ষণকারীর](/docs/contribute/community-maintainers) 
সাথে যোগাযোগ করা। আপনার অবদানের ক্ষেত্র খুঁজে পেতে
তারা আপনাকে সাহায্য করবেন।
- আপনি যদি নির্দিষ্ট কোনো ক্ষেত্রে অবদান রাখতে চান এবং সেই ব্যাপারে নিশ্চিত না হন, তাহলে
সরাসরি একজন [Wiki রক্ষণাবেক্ষণকারীর](/docs/contribute/community-maintainers) সাথে যোগাযোগ করে নিশ্চিত হয়ে নিন অবদানটি যথাযথ কিনা।
- কী অবদান রাখতে চান সেই ব্যাপারে নিশ্চিত না হলে, আপনি চাইলে
[Polygon GitHub রেপো](https://github.com/maticnetwork)-তে `help wanted` হিসেবে চিহ্নিত করা ইস্যুগুলো ব্রাউজ করতে পারেন।
- সাধারণত `good first issue` লেবেল থাকা ইস্যুগুলো নতুনদের জন্য
আদর্শ।

## Polygon ডকুমেন্টেশনে যোগ করুন {#add-to-the-polygon-documentation}

  - Polygon Wiki-তে যদি আপনি কোন কিছু যোগ বা পরিবর্তন করতে চান,
  তাহলে অনুগ্রহ করে `master` শাখার বিরুদ্ধে একটি PR উত্থাপন করুন (অনুগ্রহ করে নমুনা PR পরীক্ষা করুন)।
  - ডকুমেন্টেশন টিম PR পর্যালোচনা করবে বা সেই অনুযায়ী যোগাযোগ করবে।
  - রিপোজিটরি: https://github.com/maticnetwork/matic-docs
  - নমুনা PR: https://github.com/maticnetwork/matic-docs/pull/360

:::tip
আপনি যদি নিজের মেশিনে স্থানীয়ভাবে আমাদের Wiki চালাতে চান, তবে [লোকালি Wiki চালানোর](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally) বিভাগ দেখুন। কোনো নতুন ডকুমেন্ট যোগ করার ক্ষেত্রে, আরও বিস্তারিত বিবরণের জন্য শুধু সারাংশ/ভূমিকা এবং আপনার Github বা ডকুমেন্টেশনের একটি লিঙ্ক যুক্ত করার সুপারিশ করা হয়ে থাকে।

:::

## Git-এর নিয়মাবলী {#git-rules}

চেঞ্জ লগের জন্য আমাদের সমস্ত রেপোর ক্ষেত্রে আমরা `gitchangelog` ব্যবহার করি। সেই জন্য, আমাদেরকে
কমিট মেসেজের ক্ষেত্রে নিচের কনভেনশন মেনে চলতে হবে। আপনি যদি কনভেনশনটি না ফলো করেন তাহলে কোনো মার্জ হবে না।

### কমিট মেসেজ কনভেনশন {#commit-message-convention}

নিচের সুপারিশগুলি আপনার কমিট মেসেজে যোগ করার জন্য
উপযোগী হতে পারে। আপনি নিজের কমিটগুলো সাধারণত বড় বিভাগে আলাদা করতে পারেন:

- ইন্টেন্ট অনুসারে (যেমন: নতুন, ফিক্স, পরিবর্তন ...)
- অবজেক্ট অনুসারে (যেমন: ডকুমেন্ট, প্যাকেজিং, কোড ...)
- দর্শক অনুসারে (যেমন: ডেভ, টেস্টার, ইউজার ...)

এছাড়াও, আপনি কিছু কমিট ট্যাগ করতে পারেন:

- "মাইনর" কমিট হিসেবে যা আপনার চেঞ্জ লগে আউটপুট পাওয়া উচিত নয় (সামান্য পরিবর্তন,
কমেন্টে লেখার সামান্য ভুল...)।
- “রিফ্যাক্টর” হিসাবে, যদি ফিচারে কোনো উল্লেখযোগ্য পরিবর্তন করতে না হয়। তাই
এটি চূড়ান্ত ইউজারকে দেখানো চেঞ্জলগের অংশ হওয়া উচিত নয়, তবে আপনার যদি ডেভেলপার চেঞ্জলগ থাকে, তাহলে আপনার ক্ষেত্রে উপযোগী হতে পারে।
- এছাড়াও, আপনি API পরিবর্তন চিহ্নিত করতে বা এটি যদি নতুন API বা অনুরূপ কিছু হয়ে থাকে, তাহলে "api" হিসেবে ট্যাগ করতে পারেন।

আপনি যত ঘন ঘন সম্ভব ইউজার ফাংশনালিটি টার্গেট করে আপনার কমিট মেসেজ লেখার চেষ্টা করুন।

:::note উদাহরণ

এই তথ্য কীভাবে স্টোর করা যেতে পারে তা দেখানোর জন্য এটা একটা স্ট্যান্ডার্ড `--oneline` গিট লগ:

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

আরও তথ্যের জন্য অনুগ্রহ করে
[Git ব্যবহার করে কী কী উপায়ে চেঞ্জলগ সবচেয়ে ভালোভাবে পরিচালনা করা যায়?](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890) দেখুন।

আরও বিস্তারিত জানার জন্য, অনুগ্রহ করে [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/) দেখুন।
