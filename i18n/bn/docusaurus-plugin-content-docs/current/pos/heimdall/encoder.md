---
id: encoder
title: এনকোডার (পাল্প)
description: চেকপয়েন্ট মত বিশেষ লেনদেনের জন্য RLP এনকোডিং তৈরি করা হবে
keywords:
  - docs
  - matic
  - rlp encoding
  - checkpoint
  - encoder
  - polygon
image: https://matic.network/banners/matic-network-16x9.png
---

# এনকোডার (পাল্প) {#encoder-pulp}

Heimdall-কে Ethereum চেইনে Heimdall এর লেনদেনগুলি যাচাই করতে হয়। এর জন্য এটি চেকপয়েন্ট এর মতো বিশেষ লেনদেনগুলি তৈরি করতে RLP এনকোডিং ব্যবহার করে।

এই বিশেষ লেনদেন ডিফল্ট অ্যামিনো এনকোডিং এর পরিবর্তে `pulp` (RLP ভিত্তিক) এনকোডিং ব্যবহার করে।

ইন্টারফেস ডিকোডিং সমাধানের জন্য পাল্প একটি প্রিফিক্স-ভিত্তিক সহজ এনকোডিং প্রক্রিয়া ব্যবহার করে। `GetPulpHash` পদ্ধতি চেক করুন।

সূত্র: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go](https://github.com/maticnetwork/heimdall/blob/master/auth/types/pulp.go)

```go
const (
	// PulpHashLength pulp hash length
	PulpHashLength int = 4
)

// GetPulpHash returns string hash
func GetPulpHash(name string) []byte {
	return crypto.Keccak256([]byte(name))[:PulpHashLength]
}
```

নিচেরটি একটি প্রদত্ত `msg`-এর জন্য প্রিফিক্স-বাইটগুলি ফেরত দেয়। এখানে সজ্জা এনকোডিং-এর জন্য একটি অবজেক্ট কীভাবে নিবন্ধন করতে হবে তার একটি উদাহরণ:

```go
RegisterConcrete(name, obj) {
	rtype := reflect.TypeOf(obj)
	// set record for name => type of the object
	p.typeInfos[hex.EncodeToString(GetPulpHash(name))] = rtype
}

// register "A"
pulp.RegisterConcrete("A", A{})
```

এনকোডিং হচ্ছে শুধু RLP এনকোডিং এবং প্রিপেন্ডিং `GetPulpHash`হ্যাশ :`name`

```go
// EncodeToBytes encodes msg to bytes
txBytes, err := rlp.EncodeToBytes(obj)
if err != nil {
	return nil, err
}

result := append(GetPulpHash("A"), txBytes[:]...), nil
```

ডিকোডিং কাজ নিম্নরূপ রয়েছে:

```go
// retrieve type of objet based on prefix
rtype := typeInfos[hex.EncodeToString(incomingData[:PulpHashLength])]

// create new object
newMsg := reflect.New(rtype).Interface()

// decode without prefix and inject into newly created object
if err := rlp.DecodeBytes(incomingData[PulpHashLength:], newMsg); err != nil {
	return nil, err
}

// result => newMsg
```

:::info আরও তথ্যের জন্য

Cosmos SDK দুটি বাইনারি ওয়্যার এনকোডিং প্রোটোকল ব্যবহার করে, [অ্যামিনো](https://github.com/tendermint/go-amino/) এবং [প্রোটোকল বাফার](https://developers.google.com/protocol-buffers), যেখানে অ্যামিনো একটি অবজেক্ট এনকোডিং স্পেসিফিকেশন। ইন্টারফেস সমর্থনের জন্য এটি Proto3 এর একটি এক্সটেনশন যুক্ত সাবসেট। কোন অ্যামিনো Proto3 এর সাথে আরও বেশি সুসংগত (কিন্তু Proto2 এর সাথে নয়) সে সম্পর্কিত আরও তথ্যের জন্য সম্পর্কিত [Proto3 স্পেসিফিকেশন](https://developers.google.com/protocol-buffers/docs/proto3) দেখুন।

এখানে আরও দেখুন: [https://docs.cosmos.network/master/core/encoding.html](https://docs.cosmos.network/master/core/encoding.html)

:::
