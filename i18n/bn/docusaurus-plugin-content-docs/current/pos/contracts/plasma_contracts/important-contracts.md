---
id: important-contracts
title: গুরুত্বপূর্ণ চুক্তি
description: স্টেট Syncer, ডিপোজিট ম্যানেজার, Childchain এবং ChildERC20/721
keywords:
  - docs
  - matic
  - polygon
  - Important contracts
image: https://matic.network/banners/matic-network-16x9.png
---

# গুরুত্বপূর্ণ চুক্তি {#important-contracts}

## স্টেট সিঙ্কার {#state-syncer}

Ethereum মেইনচেইন থেকে Bor পর্যন্ত স্টেট পরিবর্তনগুলো রিলে করতে এই চুক্তি ব্যবহার করা হয়
Heimdall `StateSender` চুক্তিতে `StateSynced` থাকা ইভেন্ট শুনতে পায় এবং একটি সিস্টেম কল ব্যবহার করে Bor-কে সেগুলো রিলে করে।

```jsx
contract StateSender {
	function syncState(address receiver, bytes calldata data)
    external
	{
	    counter = counter.add(1);
	    emit StateSynced(counter, receiver, data);
	}
}
```

## ডিপোজিট ম্যানেজার {#deposit-manager}


মেইনচেন থেকে Bor পর্যন্ত অ্যাসেট জমা করার জন্য।
এই চুক্তি একটি এসক্রো চুক্তি হিসাবে কাজ করে, যেখানে সম্পদগুলো প্রত্যাহার না হওয়া পর্যন্ত রাখা হয় (প্রত্যাহার ম্যানেজার এবং পূর্বাভাসের মাধ্যমে)

```jsx
function depositERC20ForUser(address _token, address _user, uint256 _amount)
		public
{
    require(
        IERC20(_token).transferFrom(msg.sender, address(this), _amount),
        "TOKEN_TRANSFER_FAILED"
    );
    _createDepositBlock(_user, _token, _amount);
}

function _createDepositBlock(
    address _user,
    address _token,
    uint256 _amountOrToken,
    uint256 _depositId
) internal {
    ...
    stateSender.syncState(
        childChain,
        abi.encode(_user, _token, _amountOrToken, _depositId /* sequential ID */)
    );
		...
}
```

## ChildChain (Bor) {#childchain-bor}

উপরের থেকে এই ডিপোজিটগুলো bor-এর উপর ERC20/721 টোকেন চুক্তিতে তৈরি করা হয়। এটি এমন [স্টেট রিসিভার চুক্তির](https://www.notion.so/maticnetwork/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab#aa94e6a9373943068b93d2c0e7f3d2e6) মাধ্যমে ঘটে, যাকে বলে `ChildChain`এর `onStateReceive`পদ্ধতি।

```jsx
contract ChildChain {
	...
	function onStateReceive(
	  uint256, /* id */
	  bytes calldata data
	) external onlyStateSyncer {
	  (address user, address rootToken, uint256 amountOrTokenId, uint256 depositId)
			= abi.decode(data, (address, address, uint256, uint256));
	  depositTokens(rootToken, user, amountOrTokenId, depositId);
	}

	function depositTokens(
	  address rootToken,
	  address user,
	  uint256 amountOrTokenId,
	  uint256 depositId)
	{
		...
		if (isERC721[rootToken]) {
        obj = ChildERC721(childToken);
    } else {
        obj = ChildERC20(childToken);
    }
    obj.deposit(user, amountOrTokenId);	
	}
}
```

## ChildERC20/721 {#childerc20-721}

```jsx
contract ChildERC20 is ERC20 {
	function deposit(address user, uint256 amount) public onlyOwner {
	  ...
    _mint(user, amount);
		...
  }

	function withdraw(uint256 amount) public payable {
    ...
    _burn(user, amount);
		...
	}
}
```
