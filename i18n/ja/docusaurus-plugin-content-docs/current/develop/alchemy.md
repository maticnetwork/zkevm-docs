---
id: alchemy
title: Alchemyを使用したスマートコントラクトのデプロイ
sidebar_label: Using Alchemy
description: Alchemyを使用したスマートコントラクトを展開するガイド
keywords:
  - docs
  - matic
  - polygon
  - alchemy
  - create smart contract
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 概要 {#overview}

こちらのチュートリアルでは、Ethereumブロックチェーン開発に新規参入または、スマートコントラクトをデプロイしやり取りする基礎を理解したいデベロッパー向けです。暗号通貨ウォレット（[Metamask](https://metamask.io)）、[Solidity](https://docs.soliditylang.org/en/v0.8.0/)、[Hardhat](https://hardhat.org)、[Alchemy](https://alchemy.com/?a=polygon-docs)を使用して、Polygon Mumbaiテストネットワーク上のスマートコントラクトを作成およびデプロイすることについて説明します。

:::tip

質問や懸念がある場合は、[<ins>公式</ins>](https://discord.gg/gWuC7zB)のDiscordサーバーからAlchemyチームに連絡してください。

:::

## 学習内容 {#what-you-will-learn}

こちらのチュートリアルでスマートコントラクトを作成するには、Alchemyのプラットフォームを使用する方法を学びます。
- スマートコントラクトアプリケーションを作成する
- ウォレットの残高を確認する
- ブロックチェーンエクスプローラーでコントラクトコールを確認する

## 実行すること {#what-you-will-do}

チュートリアルに従って、次のことを実行します。
1. Alchemyでアプリを作成し、開始します。
2. MetaMaskでウォレットアドレスを作成
3. ウォレットに残高を追加（テストトークンを使用）
4. HardhatとEthers.jsを使用して、プロジェクトをコンパイルおよびデプロイ
5. Alchemyのプラットフォームでコントラクトステータスを確認する

## スマートコントラクトを作成および展開する {#create-and-deploy-your-smart-contract}

### Polygonネットワークに接続する {#connect-to-the-polygon-network}

Polygon PoSチェーンにリクエストを行う方法は、いくつかあります。所有するノードを実行するのではなく、Alchemyのデベロッパープラットフォームで無料アカウントを使用して、Alchemy Polygon PoS APIとやり取りをして、Polygon PoSチェーンと通信します。プラットフォームには、リクエストを監視する機能、スマートコントラクトの展開中に実証するデータ分析、拡張されたAPI（トランザクト、NFTなど）、ethers.js SDKが含まれています。

Alchemyアカウントをお持ちでない場合は、[こちら](https://www.alchemy.com/polygon/?a=polygon-docs)から無料のアカウントにサインアップすることから始めます。アカウントを作成した後、ダッシュボードに到達する前に、直ぐに最初のアプリを作成するオプションが表示されます。

![img](/img/alchemy/alchemy-dashboard.png)

### アプリ（およびAPIキー）を作成する {#create-your-app-and-api-key}

Alchemyアカウントを作成した後、アプリを作成することによりAPIキーを生成する必要があります。これにより、Polygon Mumbaiテストネットに行われたリクエストを認証します。テストネットの使用方法をご確認したい場合は、[こちらのテスト](https://docs.alchemyapi.io/guides/choosing-a-network)ネットガイドをご覧ください。

新しいAPIキーを生成するには、Alchemyダッシュボードナビゲーションバーの**Apps**タブに移動し、**Appの作成**サブタブを選択します。

![img](/img/alchemy/create-app.png)

新しいアプリに**Hello World****に**名前を付け、簡単な説明を提供し、チェーン用のPolygonを選択し、ネットワーク用の**Polygon Mumbai**を選択します。

最後に、**アプリを**作成するをクリックします。新しいアプリが下の表に表示されます。

### ウォレットアドレスを作成する {#create-a-wallet-address}

Polygon PoSはEthereum用のレイヤー2スケーリングソリューションです。そのため、Ethereumウォレットが必要です。そして、Polygonムンバイテストネットでトランザクションを送信して受信するためのカスタムPolygon URLを追加します。このチュートリアルでは、ウォレットアドレスを管理するために使用するブラウザー互換の暗号通貨ウォレットであるMetaMaskを使用します。Ethereumを使用したトランザクションの仕組みについての詳細につきましては、こちらのEthereum Foundationの[取引ガイド](https://ethereum.org/en/developers/docs/transactions/)をご確認ください。

AlchemyからカスタムPolygon RPC URLを取得するには、Alchemyダッシュボードにある**Hello World**アプリにアクセスし、右上にある**View Key**をクリックします。次に、Alchemy HTTP APIキーをコピーします。

![img](/img/alchemy/view-key.png)

[こちら](https://metamask.io/download.html)から無料でMetaMaskアカウントをダウンロードして作成できます。アカウントを作成したら、次の手順に従ってPolygon PoSネットワークをウォレットに設定してください。

1. MetaMaskウォレットの右上にあるドロップダウンメニューから**設定**を選択します。
2. メニューから[**ネット**ワーク]を選択します。
3. 次のパラメーターを使用してウォレットをMumbaiテストネットに接続します：

**ネットワーク名：**Polygonムンバイテストネット

**新しいRPC** URL：https://polygon-mumbai.g.alchemy.com/v2/your-api-key

**チェーンID：**80001

**シンボル：**MATIC

**ブロックエクスプローラー**URL：https://mumbai.polygonscan.com/


### PolygonムンバイテストMATICを追加する {#add-polygon-mumbai-test-matic}

スマートコントラクトをMumbaiテストネットに展開するには、いくつかのテストネットトークンが必要です。テストネットトークンを取得するには、[Polygon](https://faucet.polygon.technology/) Mumbaiフォークにアクセスし、**Mumbai**を選択し、**MATIC**トークンを選択し、Polygonウォレットアドレスを入力して、**[送信**]をクリックします。ネットワークトラフィックのため、テストネットトークンを受け取るには時間がかかる場合があります。

Alchemyの無料の[Mumbaiフォークを](https://mumbaifaucet.com/?a=polygon-docs)使用することもできます。

![img](/img/alchemy/faucet.png)

その後すぐにMetaMaskアカウントでテストネットトークンを確認できます。

### ウォレットの残高を確認する {#check-your-wallet-balance}

残高がそこにあることをダブルチェックするには、[Alchemyのコンポーザーツ](https://composer.alchemyapi.io/)ールを使用して[eth\_getBalance](https://docs.alchemy.com/reference/eth-getbalance-polygon)リクエストを実行します。チェーンとして**Polygon**、ネットワークとして**Polygonムンバイ**を選択し、アドレス`eth_getBalance`を入力します。これによりウォレット内のMATICの量をリターンします。[こちらの動画](https://youtu.be/r6sjRxBZJuU)では、コンポーザーツールの使用方法についての手順を説明しておりますので、ご確認ください。

![img](/img/alchemy/get-balance.png)

MetaMaskアカウントアドレスを入力してリクエストを**送信**をクリックすると、次のようなレスポンスが表示されます：

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

:::info

この結果はETHではなくWeiで発生します。WeiはEtherの最小のデノミネーションです。WeiからEtherへの変換は次のとおりです：1 Ether = 10^18 Wei「0xde0b6b3a7640000」を10進数に変換すると、1ETHに等しい1\*10^18が取得されます。これはデノミネーションに基づいて1MATICにiマッピングされた場合にできます。

:::

### プロジェクトを初期化する {#initialize-your-project}

まずはプロジェクトのフォルダーを作成する必要があります[コマンドライン](https://www.computerhope.com/jargon/c/commandi.htm)およびタイプへ案内します：

```bash
mkdir hello-world
cd hello-world
```

現在、プロジェクトフォルダー内にいます、ここでプロジェクトを初期化するために 使用`npm init`します。npmがインストールされていない場合は、[次の手順](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm)に沿ってください（Node.jsも必要となるため、ダウンロードが必要です！）

```bash
npm init # (or npm init --yes)
```

インストールに関する質問にどのように答えるかは重要ではありませんが、ここでは参照のためにどのように答えたかを示しています：

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{   
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

package.jsonを承認すれば、次へ進めます！

### [Hardhat](https://hardhat.org/getting-started/#overview)をダウンロードする

Hardhatは開発環境であり、Ethereumソフトウェアをコンパイル、デプロイ、テスト、デバッグします。ライブチェーンにデプロイする前にスマートコントラクトとdAppsをローカルに構築する際にデベロッパーを手助けします。

プロジェクト内で`hello-world`、次のを実行します：

```bash
npm install --save-dev hardhat
```

[インストール手順](https://hardhat.org/getting-started/#overview)の詳細については、こちらのページをご確認ください。

### Hardhatプロジェクトを作成する {#create-hardhat-project}

`hello-world`プロジェクトフォルダー内で実行：

```bash
npx hardhat
```

ウェルカムメッセージと選択するオプションが表示されます。**空のハードハットを**作成するを選択します：

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

これにより、プロジェクトに設定するすべての`hardhat.config.js`設定を指定する場所です。

### プロジェクトフォルダを追加する {#add-project-folders}

プロジェクトを整理するために、2つの新しいフォルダーを作成します。コマンドラインおよびタイプで`hello-world`プロジェクトのルートディレクトリに案内します：

```bash
mkdir contracts
mkdir scripts
```

* `contracts/`helloワールドスマートコントラクトコードファイルを保管する
* `scripts/`コントラクトをデプロイし、やり取りをするスクリプトを保管する

### コントラクトを書く {#write-the-contract}

[vSCode](https://code.visualstudio.com)などのお気に入りのエディタで**hello-world**プロジェクトを開きます。スマートコントラクトは、Solidityという言語で書かれています。これは、`HelloWorld.sol`スマートコントラクトを書くために使用するものです。

1. `contracts`フォルダに移動し、名前を付けた新しいファイルを作成します。`HelloWorld.sol`
2. 下記に、こちらのチュートリアルで使用する[Ethereum Foundation](https://ethereum.org/en/)からのHello Worldスマートコントラクトのサンプルを示しています。`HelloWorld.sol`ファイルに下記のコンテンツをコピー＆ペーストし、このコントラクトが何を示しているかを理解するためにコメントを必ず読むようにしてください。

```solidity
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

これは、作成時にメッセージを保存し、`update`関数を呼び出すことにより更新できる簡潔なスマートコントラクトです。

### MetaMask＆Alchemyとの接続 {#connect-with-metamask-alchemy}

MetaMaskウォレット、Alchemyアカウントを作成し、スマートコントラクトを書き込み、3つを接続します。

仮想通貨ウォレットから送信される各トランザクションには固有の秘密鍵を使用した署名が必要です。この許可をプログラムに提供するためには、秘密鍵（およびAlchemy APIキー）を環境ファイルに安全に保存できます。

まず、プロジェクトディレクトリにdotenvパッケージをインストールします。

```bash
npm install dotenv --save
```

次に、プロジェクトのルートディレクトリに`.env`ファイルを作成し、MetaMask秘密鍵とHTTP Alchemy API URLを追加します。

:::warning 警告

環境ファイル名を指定する必要があります。`.env`または環境ファイルとして認識されません。名前を付けない、`process.env`または`.env-custom`、他の作業をする。

また、gitなどのバージョン管理システムを使用している場合、ファイルを追跡**しないで**ください`.env`。秘密データを公開しないように`.gitignore`ファイル`.env`に追加します。

:::

* 秘密鍵をエクスポートするには[、次の手順](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key)に沿ってください
* Alchemy HTTP APIキー（RPC URL）を取得するには、アカウントのダッシュボードにある**Hello World**アプリに移動し、右上にある**View Key**をクリックします。

`.env`次のように見える必要があります：

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

実際にコードに接続するには、このチュートリアルで後述の`hardhat.config.js`ファイルでこれらの変数を参照します。

### Ethers.jsをインストールする {#install-ethers-js}

Ethers.jsは、よりユーザーフレンドリーなメ[ソッドで標準的なJSON-RPCメソッド](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc)をカバーすることで、Ethereumにやり取りし、リクエストをすることが容易になるライブラリです。

Hardhatは、追加のツーリングと拡張機能のために[プラグイン](https://hardhat.org/plugins/)を簡潔に統合で切るようになります。コントラクトデプロイのために[Ethersプラグイン](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html)を活用します。[Ethers.js](https://github.com/ethers-io/ethers.js/)には、有用なコントラクトデプロイメソッドがあります。

プロジェクトディレクトリに、次のように入力します：

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

次のステップ`hardhat.config.js`でethersが必要となります。

### hardhat.config.jsを更新する {#update-hardhat-config-js}

これまでにいくつかの依存関係とプラグインを追加しました。プロジェクトがそれらの依存関係を認識できる`hardhat.config.js`ように更新する必要があります。

更新`hardhat.config.js`すると次のように表示されます：

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### スマートコントラクトをコンパイルする {#compile-our-smart-contract}

これまでのすべてが機能していることを確認するには、コントラクトをコンパイルします。その`compile`タスクは、組み込みのhardhatタスクの1つです。

コマンドラインの実行：

```bash
npx hardhat compile
```

警告が出るかもしれませんが`SPDX license identifier not provided in source file`、アプリケーションがうまく動作している可能性があります。そうでない場合は、[Alchemyの不具合](https://discord.gg/u72VCg3)でメッセージを常に表示できます。

### デプロイスクリプトを書く {#write-our-deploy-script}

コントラクトが書き込まれ、構成ファイルが適切に実行されたため、次にコントラクトデプロイスクリプトを書き込みます。

フォ`scripts/`ルダーに移動し、呼び出した新しいファイルを作成し`deploy.js`、次のコンテンツを追加します。

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");   
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

こちらの[コントラクトのチュートリアル](https://hardhat.org/tutorial/testing-contracts.html#writing-tests)からこれらのコードの各ラインが何を実行するかについてHardhatチームの説明を適用しました。

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

ethers.jsで、新しいスマート[コ](https://en.wikipedia.org/wiki/Factory\_\(object-oriented\_programming\))ントラクトをデプロイするために使用される抽象です。そのため、`HelloWorld`ここ`ContractFactory`ではhello worldコントラクトの例です。`ContractFactory`プラグイン`hardhat-ethers`を使用すると`Contract`、インスタンスはデフォルトで最初の署名者（オーナー）に接続されます。

```javascript
const hello_world = await HelloWorld.deploy();
```

`deploy()`で`ContractFactory`を呼び出すことでデプロイを開始し、`Contract`オブジェクトに解決するため`Promise`をリターンをします。これはスマートコントラクト関数ごとにメソッドを持つオブジェクトです。

### スマートコントラクトを展開する {#deploy-our-smart-contract}

コマンドラインに移動し、実行する

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

次のようなものが表示されるはずです：

```bash
Contract deployed to address: 0x3d94af870ED272Cd5370e4135F9B2Bd0e311d65D
```

[Polygonムンバイの](https://mumbai.polygonscan.com/)エクスプローラーにアクセスしてコントラクトアドレスを検索すれば、それが正常にデプロイされていることがわかります。

`From`アドレスは、MetaMaskアカウントアドレスと一致する必要があります。`To`アドレスは**、コントラクト作成**と呼ばれます。トランザクションをクリックすると、コントラクトアドレスがフィールドに表示されます`To`。

![img](/img/alchemy/polygon-scan.png)

### コントラクトを検証する {#verify-the-contract}

Alchemyは[、](https://dashboard.alchemyapi.io/explorer)応答時間、HTTPステータス、エラーコードなど、スマートコントラクトと共に展開されたメソッドに関する情報を見つけることができるエクスプローラーを提供しています。コントラクトを確認してトランザクションが実行されたかどうかを確認するのに良い環境です。

![img](/img/alchemy/calls.png)

**おめでとうございます！Polygonムンバイネットワークにスマートコントラクトを展開しただけです。**

## 他のリソース {#additional-resources}

- [NFTスマートコントラクトを開発する方法](https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy) – Alchemyには、このトピックに関するYouTubeビデオを用いたチュートリアルがあります。これは、無料の10週間の**Road to Web3** devシリーズの週1です。
- [Polygon API Quickstart](https://docs.alchemy.com/reference/polygon-api-quickstart) – Alchemyの開発者ドキュメントガイドでPolygonを取得して実行することができます。
