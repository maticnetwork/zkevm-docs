---
id: truffle
title: Truffleを使用してスマートコントラクトを展開する
sidebar_label: Using Truffle
description:  Truffleを使用してPolygonにスマートコントラクトを展開することができます。
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contract
  - truffle
  - deploy
  - polygonscan
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 概要 {#overview}

[Truffle](https://trufflesuite.com/)はブロックチェーン開発環境で、Ethereum仮想マシンを活用してスマートコントラクトを作成およびテストすることができます。このガイドでは、Truffleを使用してスマートコントラクトを作成し、EVM対応のPolygonネットワークに展開する方法を教えてください。

:::note

このチュートリアルでは[<ins>、Truffleクイックスタートガイド</ins>](https://www.trufflesuite.com/docs/truffle/quickstart)記事を適応させたバージョンです。

:::

## 以下を行います： {#what-you-will-do}

- Truffleのインストールとセットアップをする
- Polygonネットワークにコントラクトをデプロイする
- Polygonscanでデプロイメントステータスを確認する

## 前提条件 {#prerequisites}

スタートする前に、技術的な要件がいくつかあります。以下をインストールしてください：

- [Node.js v8+ LTSおよびnpm](https://nodejs.org/en/)（Nodeでパッケージ化）
- [Git](https://git-scm.com/)

これらをインストールしたら、Truffleをインストールするために必要なコマンドは、以下に示す1つだけです：

```
npm install -g truffle
```

Truffleを適切にインストールしていることを確認するには、端末`truffle version`に入力します。エラーが表示された場合は、npmモジュールがパスに追加されていることを確認してください。

## プロジェクトを作成する {#creating-a-project}

### MetaCoinプロジェクト {#metacoin-project}

[Truffle Boxes](https://trufflesuite.com/boxes/)ページにあるTruffleのボイラープレートの1つを使用します。[MetaCoinボックス](https://trufflesuite.com/boxes/metacoin/)は、アカウント間で転送できるトークンを作成します。

1. Truffleプロジェクトの新しいディレクトリを作成しスタートします：

  ```bash
  mkdir MetaCoin
  cd MetaCoin
  ```

2. MetaCoinボックスをダウンロードします：

  ```bash
  truffle unbox metacoin
  ```

最後のステップで、コントラクト、デプロイ、テスト、設定ファイルでTruffleプロジェクトのコインティングフォルダを作成しました。

これは、`metacoin.sol`ファイルからのスマートコントラクトデータです：

```solidity title="metacoin.sol"
// SPDX-License-Identifier: MIT
// Tells the Solidity compiler to compile only from v0.8.13 to v0.9.0
pragma solidity ^0.8.13;

import "./ConvertLib.sol";

// This is just a simple example of a coin-like contract.
// It is not ERC20 compatible and cannot be expected to talk to other
// coin/token contracts.

contract MetaCoin {
	mapping (address => uint) balances;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);

	constructor() {
		balances[tx.origin] = 10000;
	}

	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		if (balances[msg.sender] < amount) return false;
		balances[msg.sender] -= amount;
		balances[receiver] += amount;
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
```

:::note

`pragma`ステートメントの直後に、ConvertLibがインポートされていることに注意してください。このプロジェクトでは、実際に最後に展開される2つのスマートコントラクトがあります。1つは、Metacoinで、すべての送信および残高ロジックを含み、もう1つは、値の変換に使用されるライブラリであるConvertLibです。

:::

### コントラクトをテストする {#testing-the-contract}

SolidityとJavaScriptテストを実行できます。

1. ターミナルでSolidityテスト実行します：

  ```bash
  truffle test ./test/TestMetaCoin.sol
  ```

次の出力が表示されます：

![img](/img/truffle/test1.png)

2. JavaScriptテストを実行します：

  ```bash
  truffle test ./test/metacoin.js
  ```

次の出力が表示されます：

![img](/img/truffle/test2.png)

### コントラクトをコンパイルする {#compiling-the-contract}

次のコマンドを使用してスマートコントラクトをコンパイルします：

```bash
truffle compile
```

以下の出力が表示されます：

![img](/img/truffle/compile.png)

### スマートコントラクトの設定 {#configuring-the-smart-contract}

コントラクトを実際にデプロイする前に、ネットワークとコンパイラのデータを挿入する`truffle-config.js`ファイルをセットアップする必要があります。

Polygon Mumbaiネットワークの詳細でファイルを更新`truffle-config.js`してください。

```js title="truffle-config.js"
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.maticvigil.com`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
        version: "0.8.13",
    }
  }
}
```

なお、mnemonicを渡す必要があることに注意してください`maticProvider`。これは、デプロイしたいアカウントのシードフレーズ（または秘密鍵）です。ルート ディレクトリに新しい `.secret`ファイルを作成し、12語のニーモニックシードフレーズを入力して開始します。MetaMaskウォレットからシードワードを取得するには、MetaMask設定に進み、メニューから**セキュリティと**プライバシーを選択し、シードワードを**公開**するボタンが表示されます。

### Polygonネットワークへの展開 {#deploying-on-polygon-network}

[Polygon Faucet](https://faucet.polygon.technology/)を使用してウォレットにMATICを追加します。次に、プロジェクトディレクトリのルートフォルダでこのコマンドを実行します：

```
truffle compile
truffle deploy --network matic
```

![img](/img/truffle/deployed-contract.png)

:::note

ご記入`address`ください。および提供されるその他の詳細`transaction_hash`は異なります。上記は、構造のアイデアを提供するだけです。

:::

**おめでとうございます！Truffleを使用してスマートコントラクトを正常に展開しました。**コントラクトとやり取りでき、[Polygonscan](https://mumbai.polygonscan.com/)でデプロイメント状況を確認することができます。
