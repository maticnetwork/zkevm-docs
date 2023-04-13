---
id: hello
title: MetaMaskウォレットの作成方法
sidebar_label: Hello Metamask
description: MetaMaskウォレットの作成方法を学びます。
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

新しい暗号通貨ウォレットを作成する方法を知りたい場合は、MetaMask拡張機能をインストールして作成することを検討してください。

MetaMaskは、WebアプリケーションがEthereumブロックチェーンを読み取ってやり取りできるようにする、無料で安全なブラウザ拡張機能です。

## ステップ 1. MetaMaskをブラウザにインストールする {#step-1-install-metamask-on-your-browser}

MetaMaskで新しいウォレットを作成するには、最初に拡張機能をインストールする必要があります。[Chrome](https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn)、·[Firefox](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/)、Brave、および·[Opera](https://addons.opera.com/en/extensions/details/metamask/)ブラウザ用のMetamaskをインストールできます。

1. [https://metamask.io](https://metamask.io/)を開くか、お気に入りの検索エンジンを使用して「Metamask拡張機能」を検索します。

:::note
このチュートリアルでは、例としてGoogle Chromeを使用しますが、ワークフローはすべてのブラウザで同じです。
:::

<img src={useBaseUrl("img/metamask/develop/metamask-home.png")} />

2. **ダウンロード**をクリックして、Google Chrome拡張機能としてMetaMaskをインストールします。

3. **Chromeに追加**をクリックします。

<img src={useBaseUrl("img/metamask/develop/add-chrome.png")} />

4. **拡張機能を追加**をクリックします。

<div align="center">
<img src={useBaseUrl("img/metamask/develop/add-extension.png")} />
</div>

そうです！MetaMask拡張機能を正常にインストールしました！

## ステップ 2. アカウントを作成する {#step-2-create-an-account}

次のステップは、アカウント作成です。

1. ダウンロードが完了すると、秘密の回復フレーズで**ウォレット**を復元するか**、新しい**アカウントを作成することができます。

<div align="center">
<img src={useBaseUrl("img/metamask/develop/new-metamask.png")} />
</div>

2. 新しいパスワードを作成するよう求められます。強力なパスワードを作成し、[**作成**]をクリックします。

<div align="center" >
<img width="500" src={useBaseUrl("img/metamask/develop/create-password.png")} />
</div>

3. MetaMaskは秘密の回復フレーズについてのいくつかの情報を提供し、次のページであなたのフレーズを参照してください。

<div align="center" >
<img  src={useBaseUrl("img/metamask/develop/reveal-phrase.png")} />
</div>


4. 発表された順番に12ワードフレーズを論文に書き込んでください。

:::caution
MetaMaskの説明をよく読んでください。このフレーズを一枚の紙に書き、安全な場所に保存してください。さらにセキュリティを強化したい場合は、複数の紙に書き留めて、2～3の異なる場所に保存してください。このフレーズを覚えることもできます。
:::

5. 以前に生成されたフレーズを選択して、秘密のフレーズを確認します。完了したら、**確認**をクリックします。

<img src={useBaseUrl("img/metamask/develop/phrase.gif")} />

「このパズルを解く」ことで、秘密のフレーズを知っていることを確認しています。

**おめでとうございます！**MetaMasアカウントが正常に作成されました。新しいEthereumウォレットアドレスが自動的に生成されました!