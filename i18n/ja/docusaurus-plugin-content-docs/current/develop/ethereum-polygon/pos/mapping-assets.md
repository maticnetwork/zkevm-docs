---
id: mapping-assets
title: PoSを使用した資産のマッピング
description: "PolygonからEthereumへの資産のマッピング。"
keywords:
  - docs
  - matic
  - mapping
image: https://matic.network/banners/matic-network-16x9.png
---

### はじめに {#introduction}

EthereumとPolygon間で資産を転送するには、マッピングが必要です。

- **ルートチェーン**とは、GoerliまたはEthereumメインネットのいずれかを指します
- **子チェーン**とは、Polygon MumbaiまたはPolygon Mainnetのいずれかを指します

すでにトークンコントラクトをルートチェーンにデプロイしていてそれを子チェーンに移動したい場合は、このチュートリアルに従う必要があります。一方、最初にコントラクトをPolygon Mainnetにデプロイする場合は、まず子チェーンでトークンをミントし、次にそれらをルートチェーンに戻します。そしてこの[ガイド](https://docs.polygon.technology/docs/develop/ethereum-polygon/mintable-assets)に従ってください。

## スタンダード子トークン {#standard-child-token}

標準ERC20/ERC721/ERC1155コントラクトのみが必要な場合は、先に進み、https://mapper.polygon.technology/ でマッピングリクエストを送信してください。標準の子トークンコントラクトが自動的にデプロイされます。

標準の子トークンコントラクトは、以下のようになります。
1. [ERC20](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC20.sol#L1492-#L1508)
2. [ERC721](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC721.sol#L2157-#L2238)
3. [ERC1155](https://github.com/maticnetwork/pos-portal/blob/master/flat/ChildERC1155.sol#L1784-#L1818)

新しいマッピングリクエスト作成の方法については、この[リンク](/docs/develop/ethereum-polygon/submit-mapping-request)にアクセスしてください。

## カスタム子トークン {#custom-child-token}

標準機能に追加の機能を持つカスタム子トークンコントラクトが必要な場合は、**トークンコントラクトを子チェーン上にデプロイし**、[こちら](https://mapper.polygon.technology/)のマッピングリクエストを送信して、デプロイされた子トークンコントラクトのアドレスを含める必要があります。カスタム子トークンコントラクトを作成する例を説明しましょう。

**カスタム子コントラクトは、子チェーンにデプロイする前に、特定のガイドラインに従う必要があります。**

`deposit`メソッドは、カスタム子コントラクトに存在する必要があります。この機能は、ルートチェーンからデポジットが開始されるたびに、`ChildChainManagerProxy`コントラクトによって呼び出されます。このデポジット機能は、子チェーン上でトークンを内部的にミントします。

`withdraw`メソッドは、カスタム子コントラクトに存在する必要があります。これを呼び出すと、子チェーン上のトークンをバーンすることができます。バーンするのは引き出しプロセスの最初のステップです。この引き出し機能は、子チェーン上でトークンを内部的にバーンします。

2つのチェーン間の資産の適切なバランスを維持するために、これらのルールに従う必要があります。

:::note

子トークンコントラクトのコンストラクターにトークンマイトがない。

:::

#### 実装 {#implementation}

さて、`deposit`と`withdraw`メソッドを子トークンコントラクトに実装する必要がある_理由_を説明してきたので、次に、その実装に進みます。

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

上記のコードサンプルでお気づきになったかもしれませんが、この`deposit`機能は誰でも呼び出すことができますが、これは許可されていません。これを防ぐために、`ChildChainManagerProxy`でしか呼び出せないようになっているか確認しましょう。（ChildChainManagerProxy - [Mumbai](https://mumbai.polygonscan.com/address/0xb5505a6d998549090530911180f38aC5130101c6/transactions)で、[Polygon Mainnet](https://polygonscan.com/address/0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa/)で）

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

この更新された実装は、マッピングに使用できます。

ステップ：

1. ルートチェーン上にルートトークンをデプロイします。例 {Goerli, Ethereumメインネット}
2. 子トークンに`deposit`と`withdraw`の機能があることを確認してください。
3. 子チェーン上に子トークンをデプロイします。例 {Polygon Mumbai, Polygon Mainnet}
4. マッピングリクエストを送信して、チームによって解決させます。

### リクエストの送信 {#request-submission}

[このリンク](/docs/develop/ethereum-polygon/submit-mapping-request)を使用して、マッピングリクエストを送信してください。
