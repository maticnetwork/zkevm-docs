---
id: important-contracts
title: 중요 계약
description: 주 신서, 예금 관리자, ChildChain 및 ChildERC20/721
keywords:
  - docs
  - matic
  - polygon
  - Important contracts
image: https://matic.network/banners/matic-network-16x9.png
---

# 중요 계약 {#important-contracts}

## 상태 동기화기 {#state-syncer}

이 계약은 이더리움 메인 체인에서 Bor로 상태 변화를 중계하는 데 사용됩니다. Heimdall은 `StateSender`계약에서 이`StateSynced`벤트를 수신하고 시스템 호출을 사용하여 Bor로 중계합니다.

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

## 입금 관리자 {#deposit-manager}

메인 체인에서 Bor로 자산을 입금하는 경우. 이 계약은 인출될 때까지 자산을 보유하는 에스크로 계약 역할을 합니다(인출 관리자 및 술어를 통해).

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

## 차일드체인 (Bor) {#childchain-bor}

위의 이러한 입금은 Bor에서 ERC20/721 토큰 계약으로 발행됩니다. 이는 `ChildChain`에서 `onStateReceive`메서드를 호출하는 상[태 리씨버 계약을](https://www.notion.so/maticnetwork/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab#aa94e6a9373943068b93d2c0e7f3d2e6) 통해 발생합니다.

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

## 차일드ERC20/721 {#childerc20-721}

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
