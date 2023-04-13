---
id: important-contracts
title: 重要なコントラクト
description: ステートシンサー、デポジットマネージャー、チャイルドチェーンおよびチャイルドERC20/721
keywords:
  - docs
  - matic
  - polygon
  - Important contracts
image: https://matic.network/banners/matic-network-16x9.png
---

# 重要なコントラクト {#important-contracts}

## State Syncer {#state-syncer}

このコントラクトはEthereumメインチェーンからBorにステートの変更を中継するために使用されます。Heimdallはコントラクト上で`StateSynced`イベント`StateSender`を聞き、システムコールを使用してBorにそれらを中継します。

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

## デポジットマネージャー {#deposit-manager}

メインチェーンからBorに資産を入金するこのコントラクトは、（引き出しマネージャと述語を介して）引き出されるまで、資産が保持されるEscrowコントラクトとして機能します。

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

上記からのこれらの入金額はBor上でERC20/721トークンコントラクトにマイニングされます。これは、`ChildChain`で`onStateReceive`メソッドを呼び出す[状態レシーバコントラクト](https://www.notion.so/maticnetwork/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab#aa94e6a9373943068b93d2c0e7f3d2e6)を介して発生します。

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
