---
id: chainstack
title: ChainstackとFoundryを使用してスマートコントラクトを展開する
sidebar_label: Using Chainstack
description:  ChainstackとFoundryを使用して、Polygonでスマートコントラクトを開発することができます。
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 概要 {#overview}

このセクションでは、Polygonムンバイテストネット上の[Chainstack](https://chainstack.com/build-better-with-polygon/)と[Foundry](https://github.com/gakonst/foundry/)を使用してHello Worldコントラクトを展開する方法を説明します。

Chainstackは、Ethereumベースのアプリケーションや他のブロックチェーンのためのインフラストラクチャを提供します。ノードを維持し、ネットワークへの接続を保証するとともに、メインネットやテストネットとのやり取りのためのインターフェースを提供します。

FoundryはRustで書き込まれたEthereumアプリケーション開発のための高速なツールキットです。テスト、EVMスマートコントラクトとのやり取り、トランザクションの送信、ブロックチェーンデータ取得を提供します。

:::tip

質問がある場合は、[<ins>Chainstack Discord</ins>](https://discord.com/invite/Cymtg2f7pX)サーバーにご連絡ください。

:::

## 学習内容 {#what-you-will-learn}

Hello Worldコントラクトを作成し、Chainstackを使用してPolygonノードとFoundryをデプロイしてコントラクトをデプロイします。

## 実行すること {#what-you-will-do}

1. Chainstackを使用してPolygonノードを展開する
2. Foundryを設定する
3. スマートコントラクトを作成する
4. スマートコントラクトを展開する。

## Polygon Mumbaiノードを展開する {#deploy-a-polygon-mumbai-node}

ブロックチェーンネットワークにスマートコントラクトを展開するには、ノードが必要です。ノードを起動して実行する方法は、次の手順に従います：

**ステップ1 →** [Chainstack](https://console.chainstack.com/user/account/create)でサインアップする

![img](/img/chainstack/sign-up.png)

**ステップ2→**[Mumbaiノード](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network)を展開する方法の手順に従ってください。

![img](/img/chainstack/join-network.png)

**ステップ3 →**[デプロイされたノードのHTTPSエンドポイント](https://docs.chainstack.com/platform/view-node-access-and-credentials)を取得する

## Foundryをインストールする {#install-foundry}

Foundryはスマートコントラクトで作業する開発ツールキットです。それで作業を開始するには、まずはRustコーディング言語をインストールする必要があります。

1. [Rustをインストールする](https://www.rust-lang.org/tools/install)
1. [Foundryをインストールする](https://github.com/gakonst/foundry/)

## Foundryを初期化する {#initialize-with-foundry}

ボイラープレートプロジェクト作成するには、作業ディレクトリに移動し、実行する

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## アカウントに入金する {#fund-your-account}

スマートコントラクトをデプロイするためにウォレットアカウントが必要となります。[メタマスク](https://metamask.io/)を使用できます。コントラクトをデプロイするにはネットワークにガスを支払う必要があります。ウォレットアドレスをコピーして、Mumbai MATICトークンをフォークで取得するだけ[です。](https://faucet.polygon.technology/)

## Hello Worldコントラクトを作成する {#create-the-hello-world-contract}

`src/`で初期化されたFoundryプロジェクトで、`HelloWorld.sol`を作成する

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## コントラクトをデプロイする {#deploy-the-contract}

この時点で、コントラクトをデプロイする準備が整いました：

* Polygon Mumbaiネットワークにノードを持ち、コントラクトをデプロイする必要があります。
* コントラクトをデプロイするために使用するFoundryがあります。
* コントラクトをデプロイするアカウントがあります。

コントラクトをデプロイするには、実行します：

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

ここでは、

* CONTRACT_PATH —`HelloWorld.sol`ファイルへのパス
* PRIVATE_KEY —アカウントからの秘密鍵
* HTTPS_ENDPOINT — [ノードのエンドポイント](https://docs.chainstack.com/platform/view-node-access-and-credentials)

例：

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

最後のステップから新しく生成されたハッシュを使用して、[<ins>Mumbai Polygonscan</ins>](https://mumbai.polygonscan.com/)でコントラクトのデプロイを常に確認することができます。

:::

## コントラクトをテストする {#test-the-contract}

コントラクトが正常に機能しているかどうかを確認する必要がある場合は、`forge test`コマンドがあります。Foundryは、より具体的なテストのために多くの[オプション](https://book.getfoundry.sh/reference/forge/forge-test)（フラグ）を提供します。[Foundryのドキュメント](https://book.getfoundry.sh/forge/tests)でテスト、高度なテスト、他の機能を書き込む方法についての詳細を確認できます。

**おめでとうございます！Hello WorldスマートコントラクトをPolygonに展開しています。**

Polygon関連の[<ins>チュートリアル</ins>](https://docs.chainstack.com/tutorials/polygon/)と[<ins>ツール</ins>](https://docs.chainstack.com/operations/polygon/tools)については、Chainstドキュメントをご確認ください。
