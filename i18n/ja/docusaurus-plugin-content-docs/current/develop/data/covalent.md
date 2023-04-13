---
id: covalent
title: Covalentの使用
sidebar_label: Covalent
description: Covalentのデータに統合されたAPIを使用する方法を学びます。
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## 導入 {#introduction}

Polygonは、プラズマの適合したバージョンを使用して、Ethereumに大規模に拡張します。それには、メインチェーンで最終的に、より高速でより低価格のトランザクションのためのソリューションを提供するPoSベースのサイドチェーンを活用します。PolygonネットワークはEthereumメインチェーンに送信されるPoSチェックポイントを使用する活発性を保証します。これにより、単一のPolygonサイドチェーンが、理論的には`2^16`ブロックごとのトランザクションを達成し、将来的には複数のチェーン上の何百万ものトランザクションを達成する可能性があります。

### クイックファクト {#quick-facts}

<TableWrap>

| プロパティ | 値 |
|---|---|
| Polygon Mainnet chainId | `137` |
| Polygon MumbaiテストネットchainId | `80001` |
| Polygonブロックチェーンエクスプローラー | https://polygonscan.com/ |
| ブロック時間 | 〜3秒 |
| データ更新レイテンシー | 〜6秒または2ブロック |

</TableWrap>

:::tip Quickstart

**[<ins>この導入に関する動画</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)**をご覧になり、開始してください。

:::

## サポートされたエンドポイント {#supported-endpoints}

すべての[__クラスA__](https://www.covalenthq.com/docs/api/#tag--Class-A)エンドポイントは、MaticMainnetとMumbaiテストネットのためにサポートされています。`chainId`を変更することで、統合されたAPIを介してネットワークをクエリすることができます。

:::info エンドポイント

Covalentを使用してPolygonネットワーク上で実行できるすべてのリクエストの完全なリストは、[<ins>CovalentAPIドキュメント</ins>](https://www.covalenthq.com/docs/api/)で取得できます。

:::

---

## 付録 {#appendix}

### Maticガストークン {#matic-gas-token}

Maticネットワークとやり取りするには、Maticトークンをガス代として支払う必要があります。Covalentの応答は自動的にMatic単位で`gas_*`フィールドを返します。

### トークン のマッピング {#token-mapping}

Covalentは、Ethereum MainnetとMaticチェーン間のトークンアドレスのチェーン上のリアルタイムのマッピングを保持しています。これらのアドレスはMatic上の逆引き価格に使用され、正確なトークンロゴのURLをリターンするためにも使用されます。

マッピングされたトークンのいくつかの例：

| トークン | Ethereum Mainnet | MaticMainnet |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### トークン価格 {#token-prices}

Ethereum Mainnetにマッピングを戻すトークンがある場合、Covalentはマッピングされた価格をリターンすることができます。
