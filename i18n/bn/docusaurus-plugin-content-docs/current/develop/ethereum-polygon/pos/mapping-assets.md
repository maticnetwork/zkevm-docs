---
id: mapping-assets
title: POS ব্যবহার করে এসেট ম্যাপ করা
description: "Polygon থেকে Ethereum-এ এসেট ম্যাপ করা।"
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### ভূমিকা {#introduction}

Ethereum এবং Polygon-এর মধ্যে আপনার এসেট ট্রান্সফার করতে বাধ্যতামূলকভাবে ম্যাপ করতে হবে।

- **রুট চেইন** :: সাধারণত Goerli বা Ethereum মেইননেটকে বুঝায়
- **চাইল্ড চেইন** :: সাধারণত Polygon মুম্বাই বা Polygon মেইননেটকে বুঝায়

আপনার টোকেন চুক্তি ইতোমধ্যেই রুট চেইনে ডিপ্লয় করে থাকলে এবং তা চাইল্ড চেইনে নিতে চাইলে এই নির্দেশিকাটি অনুসরণ করুন। তবে আপনি যদি আপনার চুক্তি প্রথমে Polygon মেইননেটে ডিপ্লয় করতে চান, তাহলে প্রথমে চাইল্ড চেইনে টোকেন মিন্ট করুন এবং তারপর তাদের রুট চেইনে ফেরত নিয়ে যান। আপনার উচিত এই [নির্দেশিকাটি](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets) করা।

## স্ট্যান্ডার্ড চাইল্ড টোকেন {#standard-child-token}

আপনার শুধু একটি স্ট্যান্ডার্ড ERC20/ERC721/ERC1155 চুক্তি প্রয়োজন হলে https://mapper.polygon.technology/ এ একটি ম্যাপ করার অনুরোধ করুন এবং আমরা স্বয়ংক্রিয়ভাবে চাইল্ড টোকেন ডিপ্লয় করব।

স্ট্যান্ডার্ড চাইল্ড টোকেন দেখতে অনেকটা নিচেরগুলোর মত হবে:
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

নতুন ম্যাপ করার অনুরোধ কীভাবে করতে হয় তা জানতে এই [লিঙ্কটি](/docs/develop/ethereum-polygon/submit-mapping-request) দেখুন।

## কাস্টম চাইল্ড টোকেন {#custom-child-token}

আপনার যদি স্ট্যান্ডার্ড ফাংশনের অতিরিক্ত কিছু ফাংশন থাকে এমন একটি কাস্টম চাইল্ড টোকেন চুক্তির প্রয়োজন হয়, **তাহলে আপনাকে চাইল্ড চেইনে আপনার টোকেন চুক্তি ডিপ্লয় করতে হবে** এবং [এখানে](https://mapper.polygon.technology/) একটি ম্যাপ করার অনুরোধ করতে হবে ও আপনার ডিপ্লয় করা চাইল্ড টোকেন চুক্তির ঠিকানা অন্তর্ভুক্ত করতে হবে। কাস্টম চাইল্ড টোকেন চুক্তি তৈরির একটি উদাহরণ দেখুন।

**আপনার কাস্টম চাইল্ড চুক্তি চাইল্ড চেইনে ডিপ্লয় করার আগে নির্দিষ্ট কিছু নির্দেশিকা অনুসরণ করতে হবে।**

আপনার কাস্টম চাইল্ড চুক্তিতে `deposit` পদ্ধতি অবশ্যই উপস্থিত থাকতে হবে। রুইট চেইন থেকে যখনই কোনো ডিপোজিট শুরু হয় `ChildChainManagerProxy` চুক্তি দ্বারা এই ফাংশনটিকে কল করা হয়। এই ডিপোজিট ফাংশনটি চাইল্ড চেইনে অভ্যন্তরীণভাবে টোকেন মিন্ট করে।

আপনার কাস্টম চাইল্ড চুক্তিতে `withdraw` পদ্ধতি অবশ্যই উপস্থিত থাকতে হবে। এটি কল করে চাইল্ড চেইনে আপনার টোকেন বার্ন করা যেতে পারে। আপনার উইথড্র করার প্রক্রিয়ার প্রথম ধাপ হচ্ছে বার্নিং। এই উইথড্র্র ফাংশনটি চাইল্ড চেইনে অভ্যন্তরীণভাবে টোকেন বার্ন করবে।

এই নিয়ম দুই চেইনের মধ্যে সম্পদের সঠিক ভারসাম্য বজায় রাখতে অনুসরণ করা প্রয়োজন।

:::note

শিশু টোকেন কন্ট্রাক্টরের কনস্ট্রাক্টরে কোন টোকেন মিন্টিং নেই।

:::

#### বাস্তবায়ন {#implementation}

যেহেতু চাইল্ড টোকেন চুক্তিতে _কেন_ `deposit` বাস্তবায়ন করতে হবে এবং কোন `withdraw` পদ্ধতিতে তা বাস্তবায়ন করতে হবে তা বুঝতে পেরেছি, তাই আমরা এখন এটি বাস্তবায়নের জন্য এগিয়ে যেতে পারি।

```js title="ChildERC20.sol"
pragma solidity 0.6.6;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract ChildERC20 is ERC20,
{
    using SafeMath for uint256;

    constructor(string memory name, string memory symbol, uint8 decimals) public ERC20(name, symbol) {

        _setupDecimals(decimals);
        // can't mint here, because minting in child chain smart contract's constructor not allowed
        // _mint(msg.sender, 10 ** 27);

    }

    function deposit(address user, bytes calldata depositData) external {
        uint256 amount = abi.decode(depositData, (uint256));

        // `amount` token getting minted here & equal amount got locked in RootChainManager
        _totalSupply = _totalSupply.add(amount);
        _balances[user] = _balances[user].add(amount);

        emit Transfer(address(0), user, amount);
    }

    function withdraw(uint256 amount) external {
        _balances[msg.sender] = _balances[msg.sender].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);

        emit Transfer(msg.sender, address(0), amount);
    }

}
```

উপর কোড থেকে আপনি হয়ত খেয়াল করে থাকবেন যে এই `deposit` ফাংশনটি যে কেউ কল করতে পারে, যা অনুমোদিত হওয়া উচিত নয়। তা প্রতিরোধ করতে আমরা নিশ্চিত করব যে শুধুমাত্র `ChildChainManagerProxy` দ্বারাই এটিকে কল করা যাবে। (ChildChainManagerProxy - [মুম্বাই](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions)-এ , [Polygon মেইননেটে](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/) )

```js title="ChildERC20.sol"
pragma solidity 0.6.6;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

contract ChildERC20 is ERC20,
{
    using SafeMath for uint256;
    // keeping it for checking, whether deposit being called by valid address or not
    address public childChainManagerProxy;
    address deployer;

    constructor(string memory name, string memory symbol, uint8 decimals, address _childChainManagerProxy) public ERC20(name, symbol) {

        _setupDecimals(decimals);
        childChainManagerProxy = _childChainManagerProxy;
        deployer = msg.sender;

        // Can't mint here, because minting in child chain smart contract's constructor not allowed
        //
        // In case of mintable tokens it can be done, there can be external mintable function too
        // which can be called by some trusted parties
        // _mint(msg.sender, 10 ** 27);

    }

    // being proxified smart contract, most probably childChainManagerProxy contract's address
    // is not going to change ever, but still, lets keep it
    function updateChildChainManager(address newChildChainManagerProxy) external {
        require(newChildChainManagerProxy != address(0), "Bad ChildChainManagerProxy address");
        require(msg.sender == deployer, "You're not allowed");

        childChainManagerProxy = newChildChainManagerProxy;
    }

    function deposit(address user, bytes calldata depositData) external {
        require(msg.sender == childChainManagerProxy, "You're not allowed to deposit");

        uint256 amount = abi.decode(depositData, (uint256));

        // `amount` token getting minted here & equal amount got locked in RootChainManager
        _totalSupply = _totalSupply.add(amount);
        _balances[user] = _balances[user].add(amount);

        emit Transfer(address(0), user, amount);
    }

    function withdraw(uint256 amount) external {
        _balances[msg.sender] = _balances[msg.sender].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);

        emit Transfer(msg.sender, address(0), amount);
    }

}
```

এই আপডেটকৃত ইমপ্লিমেন্টেশনটি ম্যাপ করার জন্য ব্যবহার করা যাবে।

ধাপ :

1. রুট চেইনে রুট টোকেন ডিপ্লয় করুন, অর্থাৎ {Goerli, Ethereum মেইননেট}
2. নিশ্চিত করুন আপনার চাইল্ড টোকেনে `deposit`ও `withdraw` ফাংশনগুলি আছে।
3. চাইল্ড চেইনে চাইল্ড টোকেন ডিপ্লয় করুন, অর্থাৎ {Polygon মুম্বাই, Polygon মেইননেট}
4. একটি ম্যাপ করার অনুরোধ জমা দিন। আমাদের টিম তা সমাধান করার চেষ্টা করবে।

### অনুরোধ জমা {#request-submission}

একটি ম্যাপ করার অনুরোধ জমা দিতে অনুগ্রহ করে [এই লিঙ্কটি](/docs/develop/ethereum-polygon/submit-mapping-request) ব্যবহার করুন।
