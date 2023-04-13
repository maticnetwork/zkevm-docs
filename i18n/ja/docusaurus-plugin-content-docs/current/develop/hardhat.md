---
id: hardhat
title: ハードハットを使用してスマートコントラクトを展開する
sidebar_label: Using Hardhat
description: Hardhatを使用して、Polygonにスマートコントラクトを展開することができます。
keywords:
  - docs
  - matic
  - polygon
  - smart
  - contracts
  - hardhat
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 概要 {#overview}

Hardhatは、スマートコントラクトを展開し、テストを実行し、ローカルでSolidityコードをデバッグする簡単な方法を提供するEthereum開発環境です。

このチュートリアルでは、Hardhatをセットアップし、それを使用して単純なスマートコントラクトを構築、テスト、デプロイする方法を学習します。

### 以下を行います： {#what-you-will-do}

- Hardhatを設セットアップする
- スマートコントラクトを作成する
- コントラクトをコンパイルする
- コントラクトをテストする
- コントラクトをデプロイする

## 開発環境をセットアップする {#setting-up-the-development-environment}

スタートする前に、技術的な要件がいくつかあります。以下をインストールしてください：

- [Node.js v10+ LTSnpmとnpm](https://nodejs.org/en/) (ノードに付属しています）
- [Git](https://git-scm.com/)

これらをインストールしたら、空のフォルダに移動して`npm init`を実行し、その指示に従ってHardhatをインストールして、npmプロジェクトを作成する必要があります。プロジェクトの準備ができたら、次を実行してください。

```bash
npm install --save-dev hardhat
```

Hardhatプロジェクトを作成するために、プロジェクトフォルダ内の`npx hardhat`を実行しますサンプルプロジェクトを作成し、以下の手順でサンプルタスクを試し、サンプルコントラクトをコンパイル、テスト、デプロイしてみましょう。

:::note

ここで使用するサンプルプロジェクトは、[<ins>Hardhatクイックスタートガイド</ins>](https://hardhat.org/getting-started/#quick-start)とその説明書から引用しています。

:::

## プロジェクトを作成する {#creating-a-project}

サンプルプロジェクトを作成するには、プロジェクトフォルダ内の`npx hardhat`を実行します。以下のプロンプトが表示されるはずです。

![img](/img/hardhat/quickstart.png)

JavaScriptプロジェクトを選択し、以下の手順でサンプルコントラクトのコンパイル、テスト、デプロイを行います。

### コントラクトをチェックする {#checking-the-contract}

フォルダには、`contracts`を含みます。これは`Lock.sol`、ユーザが一定時間の期間後にのみファンドを引き出すことができるシンプルなデジタルロックで構成されるサンプルコントラクトです。

```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    function withdraw() public {
        // Uncomment this line to print a log in your terminal
        // console.log("Unlock time is %o and block timestamp is %o", unlockTime, block.timestamp);

        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }
}
```

### コントラクトをセットアップする {#setting-up-the-contract}

- `hardhat.config.js`に移動する
- `hardhat-config`をmatic-network-credentialsで更新します
- 秘密鍵を保存する`.env`ファイルをルートに作成します。
- PolygonscanAPI鍵を`.env`ファイルに追加して、Polygonscanでコントラクトを検証します。[アカウントを作成](https://polygonscan.com/register)して、API鍵を生成できます。

```js
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

module.exports = {
  defaultNetwork: "matic",
  networks: {
    hardhat: {
    },
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

:::note

上記のファイルには、環境変数とethersおよびetherscanを管理するためのDOTENVが必要であることに注意してください。これらのパッケージをすべてインストールしてください。

DOTENVの使用方法の詳細については、この[<ins>ページ</ins>](https://www.npmjs.com/package/dotenv)を参照してください。

MATICでpolygon_mumbaiを変更すれば、MATIC（Polygonメインネット）にデプロイすることができます。

:::

### コントラクトをコンパイルする {#compiling-the-contract}

コントラクトコンパイルするには、まずHardhat Toolboxをインストールする必要があります。

```bash
npm install --save-dev @nomicfoundation/hardhat-toolbox
```

次に、実行してコンパイルをするだけです。

```bash
npx hardhat compile
```

### コントラクトをテストする {#testing-the-contract}

Hardhatでテストを実行するには、以下のように入力するだけです：

```bash
npx hardhat test
```

そして、これは期待される出力です：

![img](/img/hardhat/test.png)

### Polygonネットワークへの展開 {#deploying-on-polygon-network}

プロジェクトディレクトリのルートで、以下のコマンドを実行します：

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

コントラクトはMaticのMumbaiテストネットにデプロイされます。デプロイメント状況は、 https://mumbai.polygonscan.com/で確認できます。

**おめでとうございます！Greeterスマートコントラクトのデプロイに成功しました。これで、スマートコントラクトとやり取りできます。**

:::tip Polygonscanでコントラクトをすばやく検証する

以下のコマンドを実行して、Polygonscanでコントラクトをすばやく検証します。これにより、デプロイされたコントラクトのソースコードを誰でも簡単に見ることができます。複雑な引数リストを持つコンストラクタを持つコントラクトについては、[こちら](https://hardhat.org/plugins/nomiclabs-hardhat-etherscan.html)を参照してください。

```bash
npm install --save-dev @nomiclabs/hardhat-etherscan
npx hardhat verify --network polygon_mumbai 0x4b75233D4FacbAa94264930aC26f9983e50C11AF
```
:::
