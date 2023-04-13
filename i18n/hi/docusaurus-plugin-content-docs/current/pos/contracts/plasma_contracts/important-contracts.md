---
id: important-contracts
title: महत्वपूर्ण कॉन्ट्रैक्ट
description: स्टेट सिंजर, डिपॉजिट मैनेजर, चाइल्डचेन और चाइल्डerC20/721
keywords:
  - docs
  - matic
  - polygon
  - Important contracts
image: https://matic.network/banners/matic-network-16x9.png
---

# महत्वपूर्ण कॉन्ट्रैक्ट {#important-contracts}

## स्टेट सिंकर {#state-syncer}

इस कॉन्ट्रैक्ट का इस्तेमाल एथेरेयम मेनचेन से बोर में स्टेट बदलावों को रिले करने के उद्देश्य से किया जाता है. हेम्डल `StateSender`कॉन्ट्रैक्ट पर `StateSynced`इवेंट को सुनता है और एक सिस्टम कॉल का इस्तेमाल करके उन्हें बोर में रिले करता है.

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

## डिपोजिट मैनेजर {#deposit-manager}

मेनचेन से बोर में एसेट्स को डिपोजिट करने के लिए. यह कॉन्ट्रैक्ट एक एस्क्रो कॉन्ट्रैक्ट की तरह काम करता है जहां एसेट्स को तब तक रोक कर रखा जाता है जब तक उन्हें (निकास मैनेजर और प्रेडिकेट्स के माध्यम से) निकाल नहीं लिया जाता.

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

## चाइल्डचेन (बोर) {#childchain-bor}

उपरोक्त डिपोजिट को बोर पर ERC20/721 टोकन कॉन्ट्रैक्ट्स में मिंट किया जाता है. यह [स्टेट रिसीवर कॉन्ट्रैक्ट](https://www.notion.so/maticnetwork/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab#aa94e6a9373943068b93d2c0e7f3d2e6) के माध्यम से होता है जो`ChildChain` में `onStateReceive`तरीके को कॉल करता है.

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

## चाइल्डERC20/721 {#childerc20-721}

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
