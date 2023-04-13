---
id: graph
title: グラフとPolygonでホストされたプロジェクトを設定する
description: グラフとPolygonでホストされたプロジェクトを設定する方法を学びます。
keywords:
  - graph
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

チェーンデータのインデックス化とクエリを行うための分散型プロトコルであるGraphは、Polygonチェーンをサポートしています。サブグラフで定義されたデータは、クエリと探索が簡潔にできます。サブグラフはローカルに作成するか、インデクシングおよびデータ表示のための無料のホストされたエクスプローラーを使用することができます。

> 注意事項： ローカルのインストールなどの詳細につきましては、https://thegraph.com/docs/quick-start をご覧ください。ドキュメントには、サブグラフがどのように機能するかを学ぶための例が含まれており、この動画では良い導入を提供しています。

## ステップ {#steps}

1. グラフエクスプローラー（https://thegraph.com/explorer/）にアクセスし、アカウントを設定します。認証のためにGitHubアカウントが必要です。

2. ダッシュボードに移動して、サブグラフの追加をクリックします。サブグラフ名、アカウント、サブタイトルを定義し、必要に応じて、画像やその他の情報（後で更新することが可能）を更新します。

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. グラフCLIを機器にインストールする（npmまたはyarnのいずれかを使用）

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. 次のコマンドは既存のコントラクトのすべてのイベントをインデックス化するサブグラフを作成します。BlockScoutからコントラクトABIを取得を試みて、ローカルファイルパスの要求に戻ります。オプション引数がない場合、インタラクティブフォームを介して誘導します。

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Polygon” for Matic mainnet and “Mumbai” for Polygon Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on Polygon: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> 注意事項：詳細につきましてはこちらをご覧ください：https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. ホストされたサービスで認証する

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
グラフのウェブサイト上でダッシュボードに移動することで、トークンへのアクセスを見つけることができます。

6. 作成したディレクトリへcdし、サブグラフの定義を開始します。サブグラフの作成における情報は、こちらのGraph Docsで取得できます。
https://thegraph.com/docs/define-a-subgraph

7. 準備が出来次第、サブグラフをデプロイしてください。必要であれば、いつでもテストおよび再デプロイ可能です。

> 以前デプロイしたサブグラフが同期中のステータスにある場合、すぐに新しいデプロイされたバージョンに置き換えられます。以前にデプロイしたサブグラフがすでに完全に同期されている場合、グラフノードは、新しいデプロイされたバージョンを保留中のバージョンとして示し、バックグラウンドでそれを同期し、新しいバージョンの同期が完了した後に、現在のバージョンを新しいものに置き換えるだけです。これにより、新しいバージョンが同期中にサブグラフが使用できるようになります。

```bash
yarn deploy
```

サブグラフはデプロイされ、ダッシュボードからアクセスできます。

サブグラフのクエリについて、こちらをご覧ください：https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

サブグラフを公開したい場合は、ダッシュボードからサブグラフにアクセスし、編集ボタンをクリックすると可能です。編集ページの下にスライダが表示されます。
