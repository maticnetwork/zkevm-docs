---
id: adding-a-custom-token
title: カスタムトークンを追加する
sidebar_label: Adding a Custom Token
description: Polygonで新しいブロックチェーンアプリを構築しましょう。
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

**Add Custom Token**（カスタムトークンを追加）の機能により、Polygonウォレット製品群でトークンを明示的に追加して、使用することができるようになります。ルートまたは子のいずれかのコントラクトアドレスでトークンを検索するだけです。

* **ルート**は、Ethereum上のトークンコントラクトです。
* **子**は、Polygon上のコントラクトです。

### トークンコントラクトはどこで見つけることができますか。 {#how-do-i-find-the-token-contract}

[Coingecko](http://coingecko.com)または[Coinmarketcap](https://coinmarketcap.com/)のいずれかで、トークンを名前で検索できます。そこで、Ethereumチェーン（ERC20トークン専用）や、Polygonのような他のサポートされている次のチェーンのアドレスを確認することが可能になります。他のチェーン上のトークンアドレスは、更新されていないかもしれませんが、すべての目的において確実にルートアドレスを使用することはできます。

トークンを選択する際は、以下で検索が可能です：
* トークンシンボル
* トークン名
* コントラクト

こちらに、どのように機能するか示しています：

1. コントラクトアドレスをカスタムトークンとして追加することで、トークンを簡単にリストに追加できます

（PolygonまたはEthereumの両方でコントラクトアドレスをサポートします）：

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. トークン情報がフェッチされると、すべてのトークン情報が確認画面に表示されます。そうすると、自身のシステムにローカルに保存されるカスタムトークンとして追加できます。多くのクローンやスキャムトークンがあるため、トークンコントラクトを2度再検証することを推奨します。

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. トークンを選択する際に、追加されたトークンが表示されるようになりました：

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

**管理**画面のトークンタブから直接トークンを追加することもできます：

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>