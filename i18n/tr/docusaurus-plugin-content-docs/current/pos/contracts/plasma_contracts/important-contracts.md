---
id: important-contracts
title: Önemli sözleşmeler
description: Devlet Senkronizasyonu, Mevduat Yöneticisi, Çocuk Zinciri ve ChildERC20/721
keywords:
  - docs
  - matic
  - polygon
  - Important contracts
image: https://matic.network/banners/matic-network-16x9.png
---

# Önemli sözleşmeler {#important-contracts}

## State Syncer {#state-syncer}

Bu sözleşme, durum değişikliklerini Ethereum mainchain’den Bor’a iletmek için kullanılır. Heimdall, `StateSender` sözleşmesindeki `StateSynced` olayları dinler ve sistem çağrısını kullanarak onları Bor’a iletir.

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

## Deposit manager {#deposit-manager}

Varlıkları mainchain’den Bor’a yatırmaya yöneliktir. Bu sözleşme, (fon çekme yöneticisi ve koşullar üzerinden) çekilene kadar varlıkların tutulduğu bir emanet sözleşmesi olarak çalışır.

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

Yukarıdaki fon yatırma işlemleri, bor’daki ERC20/721 token sözleşmelerine mint edilir. Bu, `ChildChain`’de `onStateReceive` yöntemini çağıran [durum alıcı sözleşmesi](https://www.notion.so/maticnetwork/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab#aa94e6a9373943068b93d2c0e7f3d2e6) üzerinden gerçekleşir.

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
