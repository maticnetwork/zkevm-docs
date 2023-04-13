---
id: widget
title: ウォレットウィジェット
sidebar_label: Wallet Widget
description: "ブリッジトランザクションを実行するUIツール"
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

ウォレットウィジェットは、ブリッジトランザクション（デポジットと引き出す）を実行するためのwebアプリケーションに埋め込むことができるUIツールです。

各ウィジェットは、[ウィジェットダッシュボード](https://wallet.polygon.technology/widget-dashboard)から取得できる一意の名前によって識別されます。

### ウィジェットダッシュボード {#widget-dashboard}

ウィジェットは、ウォレットアプリケーションのウィジェットダッシュボードページから作成することができます。これにより、ユーザは、いくつかのカスタマイズ可能なオプションを使用して新しいウィジェットを作成することができます。

ウィジェットが作成されたら、コードスニペットをコピーして、それをアプリケーションに追加するか、ウィジェット名を使用して、自分で設定することができます。

ウィジェットダッシュボードへのリンクはこちら -

* Mainnet - https://wallet.polygon.technology/widget-dashboard
* テストネット - https://wallet-dev.polygon.technology/widget-dashboard

## インストール {#install}

ウィジェットは、Javascriptライブラリとしてエクスポートし、npmパッケージとして利用できます。。

```bash
npm i @maticnetwork/wallet-widget
```

## 例 {#examples}

開発の参考になるよう、さまざまなフレームワークやツールに対応したサンプルを作成しました。すべての例は、[https://github.com/maticnetwork/wallet-widget-example](https://github.com/maticnetwork/wallet-widget-example)でご覧いただけます。

## 使い方 {#how-to-use}
### ターゲットと共に使用する {#with-target}

アプリにボタンがあり、そのボタンをクリックするとウィジェットが表示されるとします -

```html
<button id="btnMaticWidget"></btn>
```

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'mainnet' // network to be used - testnet or mainnet
});
```

準備ができたらいつでもウィジェットを作成できます。ドキュメントがロードされた後に、作成機能を呼び出しするのがベストです。

```javascript
await widget.create();
```
ウィジェットが作成されたら、ボタンをクリックします、するとウィジェットが表示されます。

### ターゲットなし {#without-target}

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    network: 'mainnet' // network to be used - testnet or mainnet
});

await widget.create();
```

ウィジェットが作成されていますが、ウィジェット表示のためには、API`show`呼び出しが必要です。

```
widget.show();
```

同様に、API`hide`を呼び出しすることで、ウィジェットを非表示にすることができます

```
widget.hide();
```

### 重要なノート 👉 {#important-note}

1. ネットワーク「テストネット」または「Mainnet」に基づいて、各ダッシュボード上のアプリケーションを作成する必要があります。テストネットとMainnetの両方で同じ名前のアプリケーションを作成することをお勧めします。そうすれば、ネットワークを変更するときに問題が発生することはありません。

2. ウォレットウィジェットは、UIライブラリであり、別のWebサイトでは外観が異なり、色、応答性などの問題が発生する可能性があります。そのため、テストとカスタマイズに時間を費やしてください。サポートが必要な場合は、[サポート チーム](https://support.polygon.technology/)までご連絡ください。

3. ウォレットウィジェットは、モバイルデバイスではフル画面表示ですが、`style`設定でカスタマイズできます。

## 設定 {#configuration}

設定は、Widgetコンストラクタで指定することができます。

## 利用可能な設定 {#available-configuration-are}

- **ターゲット**：文字列 - エレメントのクリック時にウィジェットを表示するためのCSSセレクター。 例えば、以下のコードでは「#btnMaticWidget」がターゲットになります。

```javascript
<button id="btnMaticWidget">Matic widget</button>
```

- **ネットワーク**：文字列 - 使用するネットワーク。「テストネット」または「メインネット」の2つのオプションがあります。
- **幅**：番号 - ウィジェットの幅
- **高さ**：番号 - ウィジェットの高さ
- **autoShowTime**：番号 - ミリ秒単位で指定された時間後にウィジェットを自動表示
- **appName**：文字列 - アプリケーションの名前。これはウィジェットダッシュボードで取得できます。
- **ポジション**：文字列 - ウィジェットの位置を設定します。利用可能なオプション -
    - センター
    - 下位右
    - 下部左
- **額**：文字列 - テキストボックスに額をあらかじめ入力する
- **ページ**：文字列 - ページを選択します。利用可能なオプション - `withdraw``deposit`。
- **オーバーレイ**：ブール値 - ウィジェットを開いたときにオーバーレイを表示します。デフォルトではfalse（偽）です。
- **スタイル** : オブジェクト - ウィジェットにいくつかのCSSスタイルを適用します。

```
var widget = new MaticWidget({
    appName: "<your app id>", //appName from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'testnet' // network to be used - testnet or mainnet,
    style:{
      color:'red'
    }
});
```

## イベント {#events}

ウィジェットはアプリケーション内で起こっていることを知るために使用できるいくつかのイベントを発行します。

### イベントをサブスクライブする {#subscribe-to-events}

```javascript
widget.on('load',()=>{
  console.log('widget is loaded');
})
```

### イベントのサブスクライブを解除 {#unsubscribe-to-events}

```javascript
widget.off('load',<callback>)
```

> コールバックは、イベントを登録するために使用されたものと同じでなければなりません。そのため、コールバックを変数に格納するのがよいでしょう。`

## イベントの一覧： {#list-of-events}

- **ロード** - ウィジェットがロードされる
- **閉**じる - ウィジェットが閉じる
- **approveInit** - 承認トランザクションが初期化される
- **approveComplete** - 承認トランザクションがする
- **approveError** - 何らかのエラーにより承認トランザクションに失敗した、またはユーザがMetamask上のトランザクションが拒否された
- **depositInit** - デポジットトランザクションが初期化される
- **depositComplete** デポジットトランザクションが完了する
- d**epositError** - なんらかのエラーが原因でデポジットトランザクションが失敗したか、ユーザがMetamask上でのデポジット完了トランザクションを拒否した
- **burnInit** - 引き出しバーントランザクションが初期される
- **burnComplete** - 引き出しバーントランザクショントランザクションが完了する
- **confirmWithdrawInit** - 引き出しがチェックポイントされ確認トランザクションが初期化される
- **confirmWithdrawComplete** - 引き出し確認トランザクションが完了
- **confirmWithdrawError** - 引き出し確認トランザクションがエラーのために失敗した、あるいはユーザが引き出し確認トランザクションをMetaMask上で拒否した
- **exitInit** - 引き出し終了トランザクションが初期化される
- **exitComplete** - 引き出し終了トランザクションが完了する
- **exitError** - 引き出し終了トランザクションがエラーのために失敗した、あるいはユーザがMetamask上で引き出し終了トランザクションを拒否した

## APIS {#apis}

- **表示** - ウィジェットを表示する

```javascript
widget.show()
```

- **非表示** - ウィジェットを非表示にする

```javascript
widget.hide()
```

- **オン** - イベントをサブスクライブする

```javascript
widget.on('<event name>', callback)
```

- **オフ** - イベントのサブスクライブを解除する

```javascript
widget.off('<event name>', callback)
```
