---
id: mapping-assets
title: PoS를 사용하여 자산 매핑
description: "Polygon에서 이더리움으로 자산 매핑"
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### 소개 {#introduction}

이더리움 및 Polygon으로 자산을 이전하려면 매핑이 필요합니다.

- **루트 체인** :: Goerli 또는 이더리움 메인넷
- **하위 체인** :: Polygon Mumbai 또는 Polygon 메인넷

토큰 계약이 루트 체인에 이미 배포되어 있고 하위 체인으로 이동하려면 이 단계를 따라야 하지만, 먼저 Polygon 메인넷에서 계약을 배포하려면 먼저 하위 체인에서 토큰을 발행한 다음 루트 체인으로 다시 이동하세요. 그런 다음 이 [가이드](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets)를 따라야 합니다.

## 표준 하위 토큰 {#standard-child-token}

표준 ERC20/ERC721/ERC1155 계약만 필요한 경우, https://mapper.polygon.technology/에서 매핑 요청을 제출하면 표준 하위 토큰 계약을 자동 배포할 수 있습니다.

표준 하위 토큰 계약은 다음과 같습니다.
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

새로운 매핑 요청을 생성하는 방법을 알아보려면 이 [링크](/docs/develop/ethereum-polygon/submit-mapping-request)를 방문하세요.

## 사용자 정의 하위 토큰 {#custom-child-token}

표준 함수 외에 추가 함수가 있는 사용자 정의 하위 토큰 계약이 필요한 경우, **하위 체인에 토큰 계약을 배포하고 **[여기](https://mapper.polygon.technology/)에서 매핑 요청을 제출해야 합니다. 이때 배포된 하위 토큰 계약의 주소를 포함해야 합니다. 사용자 정의 하위 토큰 계약을 만드는 예를 설명하겠습니다.

**사용자 정의 하위 계약은 하위 체인에 배포하기 전에 특정 지침을 따라야 합니다.**

`deposit` 메서드가 사용자 정의 하위 계약에 있어야 합니다. 이 함수는 루트 체인에서 입금이 시작될 때마다 `ChildChainManagerProxy` 계약에 의해 호출됩니다. 이 입금 함수는 내부적으로 하위 체인의 토큰을 만듭니다.

`withdraw` 메서드가 사용자 정의 하위 계약에 있어야 합니다. 하위 체인의 토큰을 소각하기 위해 호출할 수 있습니다. 소각은 출금 과정의 첫 번째 단계입니다. 이 출금 함수는 내부적으로 하위 체인의 토큰을 소각합니다.

이 규칙은 두 체인에서 사이에 적절한 자산의 균형을 유지하기 위해 따라야 합니다.

:::note

자녀 토큰의 제작자가 토큰을 표시하지 않습니다.

:::

#### 구현 {#implementation}

하위 토큰 계약에서 `deposit` 및 `withdraw` 메서드를 구현해야 하는 _이유_를 설명했으므로 이제 구현 작업을 진행할 수 있습니다.

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

위의 코드 샘플에서 `deposit` 함수는 누구나 호출할 수 있지만 이것이 허용되지 않는다는 점을 알 수 있습니다. 이를 방지하기 위해 `ChildChainManagerProxy`에서만 호출할 수 있도록 할 것입니다. (ChildChainManagerProxy - [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions)에서, [Polygon 메인넷](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/)에서)

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

이 업데이트된 구현을 매핑에 사용할 수 있습니다.

단계:

1. 루트 토큰을 루트 체인(즉 Goerli, 이더리움 메인넷)에 배포합니다.
2. 하위 토큰에 `deposit` 및 `withdraw` 함수가 있는지 확인합니다.
3. 하위 토큰을 하위 체인(즉 Polygon Mumbai, Polygon 메인넷)에 배포합니다.
4. 팀별로 해결할 매핑 요청을 제출합니다.

### 요청 제출 {#request-submission}

[이 링크](/docs/develop/ethereum-polygon/submit-mapping-request)로 이동해서 매핑 요청을 제출하세요.
