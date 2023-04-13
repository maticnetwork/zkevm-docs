---
id: quicknode
title: QuickNodeを使用してスマートコントラクトを展開する
sidebar_label: Using QuickNode
description:  BrownieとQuicknodeを使用してPolygonにスマートコントラクトをデプロイします。
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## 概要 {#overview}

Pythonは最も汎用性の高いプログラミング言語の1つです。テストモデルを実行している研究者から、大量のプロダクション環境で使用する開発者まで、あらゆる技術的な分野で使用可能なケースがあります。

このチュートリアルで[は](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie)、[QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide)テストネットノードを活用してスマートコントラクトを書き、展開する方法を学びます。

:::tip

Quicknodeチームに連絡するには、メッセージを送信するか、Twitter[@QuickNode](https://twitter.com/QuickNode)にタグ付けしてください。

:::

## 前提条件 {#prerequisites}

- Python3をインストールしました。
- Polygonノード
- コードエディタ
- コマンドラインインターフェース

## 実行すること {#what-you-will-do}

1. Brownieを設定する
2. Quicknode テスト ノードにアクセスする
3. スマートコントラクトをコンパイルしてデプロイする
4. 展開されたコントラクトデータを確認する

## Brownieと何か？ {#what-is-brownie}

スマートコントラクトの開発では、主に[web3.js](https://web3js.readthedocs.io/)、[ethers.js](https://docs.ethers.io/)、[Truffle](https://www.trufflesuite.com/docs/truffle/)、[Hardhat](https://hardhat.org/)などのJavaScriptベースのライブラリが主役となっています。Pythonは汎用性の高い言語であり、スマートコントラクト/Web3開発にも使用することができます。[web3.py](https://web3py.readthedocs.io/en/stable/)は、Web3のニーズを満たす魅力的なPythonライブラリです。Brownieフレームワークは、上に構築されています`web3.py`。

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie)は、スマートコントラクトを開発・テストするためのPythonベースのフレームワークです。Brownieは、SolidityとVyperの両方のコントラクトをサポートしており、[pytest](https://github.com/pytest-dev/pytest)によるコントラクトテストも提供しています。

Brownieでスマートコントラクトを作成してデプロイするプロセスを示すために、テンプレートプロジェクトである[Brownie-mixes](https://github.com/brownie-mix)を使用します。具体的には、ERC-20実装のテンプレートである[token mix](https://github.com/brownie-mix/token-mix)を使用します。

## 依存関係をインストールする {#install-dependencies}

Brownieはpython3の上に構築されているため、Brownieと連携するためにインストールする必要があります。python3がインストールされているかどうかを確認してください。これを行うには、コマンドラインツールに次のように入力します：

```bash
python3 -V
```

これにより、インストールされているpython3のバージョンが返されます。インストールされていない場合は、[python](https://www.python.org/downloads/)の公式サイト1からダウンロードしてインストールしてください。

Brownieをインストールする前にプロジェクトディレクトリを作成し、そのプロジェクトディレクトリを現在の作業ディレクトリにします。

```bash
mkdir brownieDemo
cd brownieDemo
```

システムにpython3をインストールしたので、Pythonのパッケージマネージャーであるpipを使用してBrownieをインストールしましょう。Pip は、JavaScript の npm に似ています。コマンドラインに次のように入力します：

```bash
pip3 install eth-brownie
```

:::tip

インストールに失敗した場合、代わりに次のコマンドを使用することができます：`sudo pip3 install eth-brownie`

:::

ブラウニーが正しくインストールされているかどうかを確認するには、コマンドライン`brownie`を入力し、次の出力を行う必要があります：

![img](/img/quicknode/brownie-commands.png)

トークンミックスを取得するには、コマンドラインに次のように入力するだけです：

```
brownie bake token
```

これにより、`brownieDemo`ディレクトリ`token/`に新しいディレクトリが作成されます。

### ファイル構造 {#file-structure}

まず、ディレクトリに移動します`token`：

```bash
cd token
```

次に、テキストエディタで`token`ディレクトリを開きます。`contracts/`フォルダの下に`Token.sol`、メインコントラクトがあります。自分のコントラクトを書くか、`Token.sol`ファイルを変更することができます。

フォルダの下に`scripts/`、`token.py`Pythonスクリプトがあります。このスクリプトは、コントラクトを展開するために使用され、コントラクトに基づいて変更が必要です。

![img](/img/quicknode/token-sol.png)

契約はERC-20契約です。ERC-20の標準と契約についての詳細は[、ERC-20トークンについてのこのガイド](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token)でご覧いただけます。

## Polygonノードのブート {#booting-your-polygon-node}

QuickNodeは、PolygonメインネットとMumbaのテストネットノードがグローバルなネットワークを持っています。[無料のパブリックPolygon RPC](https://docs.polygon.technology/docs/develop/network-details/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro)を実行していますが、レート制限が得られる場合は、[QuickNodeから無料トライアル](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide)ノードにサインアップすることができます。

![img](/img/quicknode/http_URL.png)

チュートリアルで後で役に立つ**HTTP URL**をコピーします。

## ネットワークとアカウントの設定 {#network-and-account-setup}

BrownieでQuickNodeエンドポイントを設定する必要があります。これを行うには、コマンドラインに次のように入力します：

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

Polygonノードを実行する際に受け取った**MumbaiテストネットHTTP URL**`YOUR_QUICKNODE_URL`に置き換えます。

上記のコマンドで、`Ethereum`は環境の名前で、`matic_mumbai`はネットワークのカスタム名です。カスタムネットワークには、任意の名前を付けることができます。

次に必要なことは、Brownieを使用して新しいウォレットを作成することです。コマンドラインに次のように入力します：

```
brownie accounts generate testac
```

アカウントにパスワードを設定するように求められます！手順を完了すると、これにより、mnemonicフレーズと共にアカウントが生成され、オフラインで保存されます。`testac`名前はアカウントの名前です（好きな名前を選択できます）。

![img](/img/quicknode/new-account.png)

:::note

Mnemonicフレーズを使用して、アカウントを回復したり、他の[<ins>非カストディアルウォレット</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode)にインポートすることができます。上の画像に表示されているアカウントは、このガイド用に作成されたものです。

:::

アカウントアドレスをコピーして、テストMATICを取得できるようにします。これにより、コントラクトを展開する必要があります。

## テストネットMATICを取得する {#getting-testnet-matic}

スマートコントラクトを展開するには、ガス代を支払うためのテストMATICトークンが必要です。

このチュートリアルで生成したアカウントのアドレスをコピーし、Polygonフォークに貼り付けて[、](https://faucet.polygon.technology/)**[送信**]をクリックします。Faucetから0.2テストMATICが送信されます。

![img](/img/quicknode/faucet.png)

## スマートコントラクトの展開 {#deploying-your-smart-contract}

コントラクトを展開する前に、次の方法でコンパイルする必要があります：

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

テキストエディター`scripts/token.py`で開き、次の変更を行います：

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info 説明

上記のコードを使用し、先に作成した`testac`アカウントをインポートし、変数に保存しています`acct`。また、次の行で、`acct`変数からデータを受信するための`'from':`部分を編集しました。

:::

最後に、スマートコントラクトを展開します：

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`は、先に作成したカスタムネットワーク名です。アカウントを作成する際に、前期に設定した**パスワード**をお願いします。

上記のコマンドを実行した後、トランザクションハッシュを取得する必要があります。Brownieはトランザクションが確認されるまで待機します。トランザクションが確認されると、Polygon Mumbaiテストネットでコントラクトがデプロイされているアドレスが返されます。

![img](/img/quicknode/brownie-run.png)

デプロイされたコントラクトは、[Polygonscan Mumbai](https://mumbai.polygonscan.com/)のコントラクトアドレスをコピーアンドペーストすることでチェックできます。

![img](/img/quicknode/polygonscan.png)

## コントラクトをテストする {#testing-the-contract}

Brownieは、スマートコントラクト機能をテストするオプションも提供します。これは、`pytest`フレームワークを使用して、単体テストを簡単に生成します。Bronwnieでのテストの作成に関する詳細情報は、Bronwnieの[ドキュメント上で](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#)確認できます。

**これは、Brownie QuickNodeを使用して、Polygonにコントラクトをデプロイする方法です。**

QuickNodeは、Polygonと同様に、開発者[ガイド、](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide)[ドキュメント、](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide)[チュートリアルビデオ](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos)、そして互いに助け合いたいと熱望している[Web3デベロッパーのコミュニティ](https://discord.gg/DkdgEqE)を提供する教育ファーストのアプローチを持っています。
