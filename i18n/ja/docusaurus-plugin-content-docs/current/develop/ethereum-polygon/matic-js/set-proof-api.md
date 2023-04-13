---
id: set-proof-api
title: ProofApiを設定
keywords:
    - setProofApi
    - polygon
    - sdk
description: Proof APIを設定します。
---

matic.js内のいくつかの機能は、より速く用語で充分に設定されます。名前が示すように、非速度で結果を生成することができます。プルーフジェネレーションAPIをバックエンドとして利用することで、誰でもホストできるようにします。

[https://apis/matic.network](https://apis/matic.network)はPolygonがホストする公開可能なプルーフジェネレーションAPIです。

`setProofApi`プルーフジェネレーションAPIのURLをmatic.jsインスタンスに設定するのに役立ちます。

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://apis.matic.network/");
```

セルフホスト型のプルーフ生成APIサービスを利用することで、公開型のプルーフ生成APIと比較してパフォーマンスが向上します。

https://github.com/maticnetwork/proof-generation-apiのREADME.mdファイルに記載されているインストール手順に従って、サービスをセルフホストしてください。

例：Proof APIをデプロイし、ベースURLが-`https://abc.com/`の場合、`setProofApi`に、ベースURLを設定する必要があります。

```
import { setProofApi } from '@maticnetwork/maticjs'

setProofApi("https://abc.com/");
```

:::tip
プルーフが生成されている場合、特にいくつかのAPIがRPCを多く呼び出すため、パブリックRPCで非常に遅い可能性があるため、より高速なAPIを使用することをお勧めします。
:::
