---
id: important-contracts
title: Wichtige Contracts
description: State Syncer, Deposit Manager, Childchain und ChildERC20/721
keywords:
  - docs
  - matic
  - polygon
  - Important contracts
image: https://matic.network/banners/matic-network-16x9.png
---

# Wichtige Contracts {#important-contracts}

## State Syncer {#state-syncer}

Dieser Contract wird verwendet, um State-Änderungen von der Ethereum-Mainchain an Bor weiterzuleiten. Heimdall reagiert auf `StateSynced`-Ereignisse auf dem `StateSender`-Contract und leitet sie an Bor mittels eines Systemaufrufs weiter.

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

## Einzahlungs-Manager {#deposit-manager}

Für die Einzahlung von Geldmitteln von der Mainchain auf Bor. Dieser Contract fungiert als ein Treuhand-Contract, in welchem die Assets gehalten werden, bis sie abgehoben werden (mittels des Abhebungs-Managers und Prädikaten).

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

Die obigen Einzahlungen werden an die ERC20/721-Token-Contracts auf Bor gemintet. Dies läuft über den [State-Empfänger-Contract](https://www.notion.so/maticnetwork/Bor-Overview-c8bdb110cd4d4090a7e1589ac1006bab#aa94e6a9373943068b93d2c0e7f3d2e6) ab, der die -`onStateReceive`Methode in `ChildChain`aufruft.

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
