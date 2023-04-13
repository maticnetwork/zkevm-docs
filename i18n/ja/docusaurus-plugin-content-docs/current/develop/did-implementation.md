---
id: did-implementation
title: Polygon DIDの実装
sidebar_label: Identity
description: PolygonでDIDの実装について学ぶ
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

これは、Polygonチームにより公開された実装パッケージを使用して、PolygonレジャーでPolygon DIDを生成して公開するようにしたいユーザーのためのスタートアップガイドです。

Polygon DIDメソッドの実装は、polygon-did-registrar、polygon-did-resolver、polygon-did-registry-contractという3つのパッケージで構成されています。Polygonネットワーク上またはそこから、DIDを登録や、読み取りする機能を搭載したいユーザーは、次のガイドを使用できます。

DIDは、必要不可欠な固有の識別子であり、中央集権型の存在なしに作成されています。検証可能な資格情報のコンテキストにあるDIDは、ドキュメントに署名するために使用され、必要に応じて、ユーザーがドキュメントの所有権を証明することを容易にします。

## Polygon DIDメソッド {#polygon-did-method}

Polygon DIDメソッドの定義は、DID-Coreの仕様と標準に準拠しています。DID URIは、コロンで区切られた3つのコンポーネント、スキーム、メソッド名、最後にメソッド特定の識別子で構成されています。Polygonの場合、URIは次のようになります：

```
did:polygon:<Ethereum address>
```

ここではスキームが示されます , メソッド名が`polygon`示され`did`、メソッド固有の識別子がehereumアドレスです。

## Polygon DIDの実装 {#polygon-did-implementation}

Polygon DIDは2つのパッケージのヘルプで実装することができ、ユーザーは個別のnpmライブラリをインポートし、個別のアプリケーションにPolygon DIDの方法論を組み込むために使用することができます。実装の詳細は次のセクションで説明致します。

開始するには、まず最初にDIDを作成する必要があります。Polygonが実行した場合の作成は、2つのステップのカプセル化であり、まず、ユーザーが自分自身でDID URIを生成し、次にPolygonレジャーに登録する必要があります。

### DIDの作成 {#create-did}

プロジェクトでは、Polygon DID URIを作成する必要があります。

```
npm i @ayanworks/polygon-did-registrar --save
```

インストールが完了したら、ユーザーは次のように使用できます：

```
import { createDID } from "polygon-did-registrar";
```

この`createdDID`機能は、ユーザーがDID URIを生成するのに役立ちます。DIDを作成している間、2つのシナリオがあります。

  1. ユーザーはすでにウォレットを所有しており、同じウォレットに対応するDIDを生成したいと考えています。

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. ユーザーが既存のウォレットを持っていない場合、ユーザーは次のようにしてください：

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

どちらの場合でも、ネットワークパラメーターは、ユーザーがPolygonムンバイテストネットまたはPolygonメインネットでDIDを作成するかどうかを示しています。

サンプル入力：

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

DIDを作成した後、DID URIが生成されます。

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### DIDを登録する {#register-did}

DID URIと対応するDIDドキュメントをレジャーに登録するには、まず次の`polygon-did-registrar`ように使用する必要があります：

```js
import { registerDID } from "polygon-did-registrar";
```

DIDを登録する前に、ユーザーは、ウォレットがDIDにコールスポンジする必要があるトークンバランスがあることを確認する必要があります。ユーザーがウォレットにトークン残高を保つと、下記のようにregisterDID機能に呼び出すことができます：

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

パラメーター`did`と必須`privateKey`です。`url`入力はオプションですが、。`contractAddress`ユーザーは最後の2つのパラメーターを指定しない場合、ライブラリはDID URIからネットワークのデフォルト設定を選択します。

すべてのパラメーターが仕様と一致し、すべてが正しい順番で与えられる場合、`registerDID`関数はトランザクションハッシュを返すと、それ以外の場合に対応するエラーが返されます。

これにより、PolygonネットワークにDIDを登録する作業が完了しました。

## DIDを解決する {#resolve-did}

まずは、次のライブラリをインストールします：

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

レジャーに登録されているDIDドキュメントを読み取るには、DID Polygon URIを持つユーザーはまずプロジェクトのインポートであり、

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

パッケージをインポートした後、DIDドキュメントを取得することができます：

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

`didResolutionResult`オブジェクトは次のとおりです：

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

DIDを解決しようとしている間、ガスコストは、ユーザーによって科されることはないということを留意してください。

## DIDドキュメントを更新する {#update-did-document}

DIDドキュメントを更新する機能でプロジェクトをカプセル化するには、まず次の`polygon-did-registrar`ように使用する必要があります：

```js
import { updateDidDoc } from "polygon-did-registrar";
```

次に、関数を呼び出します：

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

DIDドキュメントを更新するには、DIDの所有者だけがリクエストを送信することができます。ここで秘密鍵はMaticトークンにいくらか対応するものもあります。

ユーザーが`url`および`contractAddress`で設定を指定していない場合、ライブラリはDID URIからネットワークのデフォルト設定を選択します。

## DIDドキュメントを削除する {#delete-did-document}

Polygon DID実装を使用すると、ユーザーはレジャーからDIDドキュメントを取り消すことができます。ユーザーはまず次の`polygon-did-registrar`ように使用する必要があります：

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

その後、使用します

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

パラメーターの中では、`url`および`contractAddress`はオプションのパラメーターであり、ユーザーにより提供されていない場合、DID URIに基づく関数によってデフォルトの設定が選択されます。

秘密鍵にとって、DIDのネットワーク構成に従って、必要なMaticトークンを保持することが重要であるか、トランザクションは失敗する可能性があります。

## リポジトリへの貢献 {#contributing-to-the-repository}

標準のフォーク、ブランチ、プルリクエストワークフローを使用して、リポジトリへの変更を提案します。例として、問題やバグ番号を記載して、ブランチ名を知らせてください。

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
