---
id: getting-started
title: Polygon PoSの紹介
sidebar_label: Quick Start
description: Polygonで新しいブロックチェーンアプリを構築しましょう。
keywords:
  - docs
  - matic
  - polygon
  - build on polygon
  - blockchain
  - introduction
  - how to launch dapp
  - dapps
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::caution 開発ドキュメントの更新

ドキュメントは更新され、強化され、改善されます。これらは随時変更される可能性があります。ご質問やご提案がありましたら、お気軽に問題を提起するか、リクエストをお送りください。

:::

**Polygon（旧名：Maticネットワーク）**へようこそ！ブロックチェーンアプリケーションを開発するための最も革新的でエキサイティングなプラットフォームです。ブロックチェーンテクノロジーは、デジタル世界のデータ管理やビジネスのあり方に革命をもたらすと言われています。ポリゴンの分散型アプリケーション（dApp）開発で、一足先にこの革命に参加することができます。

このガイドでは、Polygonのエコシステムをご紹介します。Polygonに限らず、ブロックチェーンアプリケーション開発全般に関する、構築のスピードアップにつながる貴重なリソースやウェブサイトへのリンクが掲載されています。

:::tip 内情に精通し続けましょう。

Polygonチームやコミュニティから最新のビルダー情報をお届けします。追いかけるために以下を購読しましょう。
[<ins>Polygon通知グループ。</ins>](https://polygon.technology/notifications/)

:::

## Polygonの鍵となる機能 {#key-features-of-polygon}

- **スピード：**Polygonネットワークは、ステークホルダーが選択したブロックプロデューサーグループによってコンセンサスを提供したハイスループットのブロックチェーンを使用しています。プルーフ・オブ・ステーク（PoS）レイヤーは、ブロックをバリデートし、定期的にブロックプロデューサーのプルーフを Ethereum Mainnetに投稿するために使用されます。これにより、大量の分散化を維持しながら約2秒の迅速なブロック確認レートが可能になり、ネットワークの優れたスループットが実現します。
- **スケーラビリティ：**Polygonネットワークは、1サイドチェーンで2秒未満のトランザクション速度を実現します。複数のサイドチェーンを使用すると、ネットワークは毎秒数百万のトランザクションを処理できます。このメカニズム (最初のMaticサイドチェーンで既に実証済み) により、Polygonネットワークを簡単にスケールすることができます。
- **セキュリティ：**Polygonのスマートコントラクトは、Ethereumのセキュリティに依存しています。ネットワークを保護するために、3つの重要なセキュリティモデルを採用しています。これは、Ethereumの**ステーキング管理契約**と**Heimdall**および.**Bor**ノードを実行するインセンティブ付きバリデータのグループを使用します。開発者は両方のモデル（ハイブリッド）をdAppに実装することもできます。

## Polygon上での構築 {#building-on-polygon}

Ethereumの開発者なら、すでにPolygon開発者になっています。[Polygon RPC](https://polygon-rpc.com/)に切り替えるだけで始められます。Truffle、Remix、Web3jsなど、Ethereumブロックチェーンで使い慣れたすべてのツールが、Polygon上でデフォルトのサポートがされています。

分散型アプリケーションをPolygon Mumbaiテストネットまたは ネットのいずれかにデプロイできます。Polygon Mumbaiテストネットは、ParentChainとして機能する、Ethereum Goërliテストネットに接続されます。すべてのネットワーク関連の詳細は、[ネットワークドキュメント](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/network-details/network.md)でご覧いただけます。

### ウォレット {#wallets}

Polygonネットワークとやり取りするには、PolygonがEthereumバーチャルマシン（EVM）上で動作するため、Ethereumベースのウォレットを持つ必要があります。[Metamask](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md)または[Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md)ウォレットの設定を選択できます。ウォレット関連の情報と必要な理由については[、ウォレットのドキュメント](https://docs.polygon.technology/docs/develop/wallets/getting-started)を参照してください。

### スマートコントラクト {#smart-contracts}

Polygonは、分散型アプリケーションのテスト、コンパイル、デバッグ、およびPolygonネットワークへのデプロイに使用できる多くのサービスをサポートしています。これらには、[Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md)、[Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md)、[QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md)、[Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md)、[Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md)5、[Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md)、および[Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md)を使用したデプロイが含まれます。

### Polygonへの接続 {#connecting-to-polygon}

PolygonをMetamaskに追加するか、Arkaneを直接使用することができます。これにより、[RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/)を使用してPolygonに接続できます。

ブロックチェーン情報を読み取るためにPolygonネットワークと接続するには、Alchemy SDKを使用することをお勧めします。

```js
// Javascript
// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: "demo", // Can replace with your API Key from https://www.alchemy.com
  network: Network.MATIC_MAINNET, // Can replace with MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
```

### Polygon上で新しいdAppを構築しますか？ {#building-a-new-dapp-on-polygon}

分散型アプリケーション（dApps）は、ユーザとブロックチェーン上のデータプライバシーとの間のブリッジとして機能します。dAppsの数が増加すると、ブロックチェーンエコシステム内での有用性を検証し、スマートコントラクトを介して中央機関を必要とせずに2人の参加者間でトランザクションを実行するなどの課題を解決します。

分散型アプリケーション（dApps）を構築した経験がないかもしれませんね。その場合、以下のリソースを使用すると、Polygonネットワーク上で、dAppsをビルド、デバッグ、デプロイするために必要なツールを有利に開始できます。

- [フルスタックdApp： チュートリアルシリーズ](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffle](https://docs.polygon.technology/docs/develop/truffle)
- [MetaMask](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [Fauna、Polygon、Reactを使用しdAppを開発する](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### dAppはすでに持っていますか？ {#already-have-a-dapp}

分散型アプリケーション (dApp) をすでにお持ちで、効率的なスケーリングに役立つプラットフォームを探しているのなら、Polygonはそれを可能にするので、あなたは正しい場所にいるのです。

1. **Ethereum Virtual Machine（EVM）ベースのチェーンから簡単に移行**する：Polygonは、Ethereumの究極のレイヤースケーリングソリューションであることを誇りにしています。EVM と互換性がある限り、dAppsをPolygonネットワークに移動またはデプロイする際に、基盤となるアーキテクチャについて心配する必要はありません。
2. P**olygonをより高速なトランザクションレイヤーとして使用**する： dAppをPolygon Mainnetにデプロイすると、dAppのより高速なトランザクションレイヤーとしてPolygonを活用できます。さらに、マッピングされたトークンを取得することもできます。詳しく学びたい場合は、Telegramの[テクニカルディスカッショングループ](http://bit.ly/matic-technical-group)に参加してください。

## サイドノート {#side-note}

できないかも知れないと思う？ でも大丈夫ですよ！すぐに行動を起こして、ハッキングをスタートしちゃいましょう。ここに、リソース、リポジトリ、ドキュメントの攻略スタート前のいくつかの注意事項があります。

1. **ブリーディングエッジにいることのコストに注意してください**： 典型的なニッチなプログラミングと同様に、dAppsとブロックチェーンの開発はあっと言う間に進行します。リサーチ中に、複雑なコードリポジトリがあったり、ドキュメントサイトで404が表示されたりたり、ドキュメントがないことさえあるかもしれません。そんなことに遭遇したら、ソーシャルメディアチャネルを介して、当社にご連絡ください。
2. **学習曲線には気が遠くなるかもしれませんが、参加への壁は高くはありません**：誰にでも門戸を開くコミュニティは、大歓迎をしますよ！プロジェクトは部外者からのプルリクエストを歓迎し、ブロッカーを積極的に解決します。より良い世界の創造に取り組んでおり、あらゆる形での貢献を歓迎します。この素晴らしい Web3エコシステムに参加していただけることに感謝いたします。

:::info 最新の状態を維持する

分散型アプリケーション開発は、ネットワークの分散化を促進します。Polygonエコシステムに関する詳細な洞察と最新情報については、ソーシャルメディアハンドルをフォローしてください。すべてのPolygonコミュニティへのリンクは[こちら](https://polygon.technology/community/)にあります。

:::
