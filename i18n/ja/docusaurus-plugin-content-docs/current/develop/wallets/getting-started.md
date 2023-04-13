---
id: getting-started
title: ウォレット
sidebar_label: Getting Started
description: サポートされているウォレットのリストを取得し、鍵となる戦略を管理します。
keywords:
  - wiki
  - polygon
  - wallet
  - integrate
  - guide
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip 内情に精通し続けましょう。

通知を購読して、Polygonチームとコミュニティから最新のウォレットスイートにアップデートしてください[<ins>。</ins>](https://polygon.technology/notifications/)

:::

Polygonをサポートするウォレットは、鍵の管理、プライベートキーにより管理されたアカウントへのアクセス、およびユーザがチェーンアクションを実行し、トランザクションに署名できるインターフェースを可能とします。以下のページは、Polygonと互換性のあるウォレットのウォレットインデックスとして機能します。これは網羅的な網羅的なインデックスではないことにご注意ください。

:::caution サードパーティウォレット

これらのサードパーティウォレットはPolygonを統合し、さまざまな機能をサポートしています。**使用する前に、ご自身でデューデリジェンスを行う必要があります。**Polygon公式これらのウォレットまたは他のネイティブウォレットに関する問題についてはサポートできません。

:::

:::info 集中型取引所（CEX）

PolygonをサポートしているCEXのリストについては、以下のようなサードパーティの追跡ウェブサイトをご覧ください。[<ins>**CoinMarketCap**</ins>](https://coinmarketcap.com/currencies/polygon/markets)。

:::

## ネイティブウォレット {#native-wallets}

[Polygon](https://support.polygon.technology/support/home)サポートは、ユーザーに支援を提供し、次のウォレットに関連する問題に対処することができます：

| ウォレット | 保管 | アカウントタイプ | マルチシグ | dAppブラウザ | プラットフォーム |
|----------------------------------------------------------------------|---------------|--------------|-----------|--------------|----------|
| [PoSウォレット](https://wallet.polygon.technology/login/) | 非保管 | EOA | いいえ | いいえ | ブラウザ |
| [Hermezウォレット](https://wallet.hermez.io/login) | 非保管 | EOA | いいえ | いいえ | ブラウザ |

## パートナーウォレット {#partner-wallets}

以下のウォレットは、Polygon Technologyと提携したソリューションです。

| ウォレット | 保管 | アカウントタイプ | マルチシグ | NFT | dAppブラウザ | ブリッジサポート | Fiat On-Ramp | プラットフォーム |
|---	|---	|---	|---	|---	|---	|---	|---	|---	|
| [1インチ](https://1inch.io/wallet/) | 非保管 | EOA | いいえ | インターフェース | はい | はい | はい | モバイル |
| [アルファウォレット](https://alphawallet.com/) | 非保管 | EOA | いいえ | インターフェース | はい | はい | はい | モバイル、api/sdk |
| [Atomicウォレット](https://atomicwallet.io/)* | 非保管 | EOA | いいえ | いいえ | いいえ | いいえ | はい | モバイル、デスクトップ、api/sdk |
| [Ambire](https://www.ambire.com/) | 非保管 | スマートコントラクト | いいえ | インターフェース | いいえ | はい | はい | ブラウザ |
| [BitKeep](https://bitkeep.com/) | 非保管 | EOA | いいえ | インターフェース | はい | はい | はい | モバイル、ブラウザ拡張 |
| [Bitski](https://www.bitski.com/) | カストディアル | EOA | いいえ | インターフェース | いいえ | はい | いいえ | ブラウザ、api/sdk |
| [Coin98](https://coin98.com/wallet) | 非保管 | EOA | いいえ | インターフェース | はい | はい | はい | モバイル、ブラウザ、api/sdk |
| [Coinbase](https://www.coinbase.com/wallet) | ハイブリッド | EOA | いいえ | インターフェース | はい | はい | はい | モバイル、ブラウザ、api/sdk |
| [CypherD](https://cypherd.io/) | 非保管 | EOA | いいえ | はい | はい | はい | はい | モバイル |
| [D'Cent](https://dcentwallet.com/) | ハイブリッド | EOA | いいえ | インターフェース | はい | はい | いいえ | モバイル |
| [Exodus](https://www.exodus.com/) | 非保管 | EOA | いいえ | はい | いいえ | いいえ | はい | モバイル、デスクトップ |
| [Gnosisセーフ](https://gnosis-safe.io/) | 非保管 | スマートコントラクト | はい | インターフェース | いいえ | いいえ | いいえ | モバイル、ブラウザ、デスクトップ、api/sdk |
| [Guarda](https://guarda.com/) | 非保管 | EOA | いいえ | いいえ | いいえ | はい | はい | モバイル、ブラウザ、デスクトップ |
| [Huobi](https://www.itoken.com/en) | 非保管 | EOA | いいえ | はい | はい | はい | いいえ | モバイル |
| [元帳](https://www.ledger.com/) | 非保管 | EOA | いいえ | インターフェース | いいえ | いいえ | はい | ハードウェア、モバイル、デスクトップ |
| [Loopring](https://loopring.io/#/) | 非保管 | スマートコントラクト | いいえ | いいえ | いいえ | いいえ | いいえ | モバイル、api/sdk |
| [Magic](https://fortmatic.com/)* | カストディアル | EOA | いいえ | いいえ | いいえ |   |   | モバイル、ブラウザ、api/sdk |
| [MathWallet](https://mathwallet.org/en-us/) | カストディアル | EOA | いいえ | いいえ | いいえ | はい | はい | モバイル、ブラウザ、api/sdk |
| [MetaMask](https://metamask.io/)* | 非保管 | EOA | いいえ | インターフェース | はい | いいえ | いいえ | モバイル、ブラウザ、api/sdk |
| [Multis](https://multis.co/)* | 非保管 | EOA | いいえ | いいえ | いいえ |   | はい | モバイル、デスクトップ |
| [MyEtherWallet](https://www.myetherwallet.com/)* | 非保管 | EOA | いいえ | インターフェース | いいえ |   | はい | モバイル |
| [オムニ](https://omni.app/) | 非保管 | EOA | いいえ | インターフェース | いいえ | はい |   | モバイル、api/sdk |
| [Opera Cryptoブラウザ](https://www.opera.com/crypto/next)* | 非保管 | EOA | いいえ | サポート | はい |   |   | モバイル、ブラウザ |
| [Pillar](https://www.pillar.fi/) | 非保管 | EOA | いいえ | インターフェース | いいえ |   | はい | モバイル |
| [Rainbow](https://rainbow.me/) | 非保管 | EOA | いいえ | インターフェース | はい |   | いいえ | モバイル、api/sdk |
| [SafePal](https://safepal.io/) | 非保管 | EOA | いいえ | いいえ | はい | はい |   | ハードウェア、モバイル、api/sdk |
| [Sequence](https://sequence.app/auth) | 非保管 | スマートコントラクト | いいえ | インターフェース | いいえ |   |   | ブラウザ、api/sdk |
| [SimpleHold](https://simplehold.io/) | 非保管 | EOA | はい | いいえ | いいえ |   | はい | モバイル、api/sdk |
| [TokenPocket](https://www.tokenpocket.pro/en) | 非保管 | EOA | いいえ | サポート | はい | はい | はい | モバイル、ブラウザ、api/sdk |
| [Torus](https://toruswallet.io/) | 非保管 | EOA | はい | サポート | いいえ | いいえ | いいえ | ブラウザ、api/sdk |
| トレザー | 非保管 | EOA | いいえ | サポート | いいえ |   |   | ハードウェア、モバイル |
| [トラストウォレット](https://trustwallet.com/) | 非保管 | EOA | いいえ | サポート | はい |   | はい | モバイル |
| [Unstoppable](https://unstoppable.money/) | 非保管 | EOA | いいえ | はい | はい |   | いいえ | モバイル、api/sdk |
| [Venly](https://www.venly.io/) | ハイブリッド | スマートコントラクト | いいえ | インターフェース | いいえ |   |   | ブラウザ、api/sdk |
| [Wirex](https://wirexapp.com/en/wirex-wallet)* | 非保管 | EOA | はい | いいえ | いいえ |   |   | モバイル |
| [XDeFi](https://www.xdefi.io/) | 非保管 | EOA | いいえ | インターフェース | いいえ | いいえ | いいえ | ブラウザ |
| [Zerion](https://zerion.io/) | 非保管 | EOA | いいえ | はい | はい | はい |   | モバイル、ブラウザ |

:::caution ネイティブでないウォレットサポート

上記の表に*で示されたウォレットは、ウォレットソフトウェアでネイティブにサポートされておらず、Polygonネットワークを追加するには、手動のステップを必要とします。

:::

## 重要な管理戦略 {#key-management-strategy}

次の基本的なステップでは、クライアントサイドアプリケーションとPolygonを統合することができます：

1. **web3**の設定：[web3.js](https://web3js.readthedocs.io/)は、javascriptライブラリであり、クライアントアプリケーションがブロックチェーンと話すことができるようにします。web3.jsを通信するように設定します。web3を通信するように設定します。[web3.ドキュメント](https://web3js.readthedocs.io/en/v1.2.2/getting-started.html#adding-web3-js)を使用して、プロジェクト`web3.js`に追加する方法について学びます。
2. **アカウントを設定**する：トランザクションを送信することができます（特に変更するもの）。（とりわけ、ブロックチェーンの状態を変更するトランザクション）。
3. **コントラクトのインスタンス化：**Web3オブジェクトが完了したら、展開されたコントラクトを次にインスタンス化します。インスタンス化します。
4. **コール機能：**コントラクトオブジェクトを介してコントラクト内の関数を介してデータを取得します。
