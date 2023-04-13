---
id: matic-to-ethereum
title: PolygonからEthereumにデータを転送する
description: コントラクトを介してPolygonからEthereumに状態またはデータを転送する
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

PolygonからEthereumにデータを転送するメカニズムは、EthereumからPolygonに同じことを行うのとは少し異なっています。これを達成するためには、Ethereumチェーン上のバリデータによって作成された**チェックポイント**トランザクションを使用します。基本的にトランザクションはPolygon上で最初に作成されます。このトランザクションを作成している間、**イベントが発行され**、**イベントログにPolygonからEthereumに転送したいデータが含まれている**ことを確認する必要があります

一定期間（約10〜30分）で、このトランザクションはバリデータによってEthereumチェーンにチェックポイントされます。チェックポインティングが完了すると、Polygonチェーン上で作成されたトランザクションのハッシュは、Ethereumチェーンの**RootChainManager**コントラクトのプルーフとして送信できます。このコントラクトは、トランザクションをバリデートし、このトランザクションがチェックポイントに含まれていることを検証し、最後に、このトランザクションからイベントログをデコードします。

このフェーズが終了したら、**デコードされたイベントログデータを使用して、任意の変更を**、Ethereumチェーン上にデプロイされたルートコントラクト上で実行できます。このためには、Ethereumの状態の変更が安全な方法でのみ行われるようにする必要もあります。したがって、**RootChainManager**コントラクトによってのみトリガーできる特殊なタイプのコントラクトである、**Predicate**コントラクトを使用します。このアーキテクチャにより、**RootChainManager**コントラクトによって、Polygon上のトランザクションがチェックポイントされ、Ethereumチェーン上で検証された場合にのみ、Ethereum上の状態の変更が発生することが保証されます。

# 概要 {#overview}

- トランザクションは、Polygonチェーンにデプロイされた子コントラクトで実行されます。
- このトランザクションでは、イベントも発行されます。この**イベントのパラメータには、PolygonからEthereumに転送する必要のあるデータが含まれて**います。
- Polygonネットワーク上のバリデータは、特定の時間間隔 (おそらく 10 ～ 30 分) でこのトランザクションを取得し、それらを検証して、1...イーサリアムの**チェックポイント1** に追加します。
- チェックポイントトランザクションは、**RootChain**コントラクト上で作成され、チェックポイントインクルージョンは、スクリ[プ](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js)トを使用してチェックすることができます。
- チェックポイントの追加が完了すると、**matic.js**ライブラリを使用して、**RootChainManager**コントラクトの**exit**機能を呼び出しすることができます。**終了**機能は、この[例](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/exit.js)に示すように、matic.jsライブラリを使用して呼び出すことができます。

- スクリプトを実行し、Ethereumチェーン上にPolygonトランザクションハッシュが含まれていることを検証し、次に、[述語](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/contracts/CustomPredicate.sol)コントラクトの**exitToken**機能が呼び出されます。
- これにより、**ルートチェーンコントラクト上の状態の変更**が、常に**安全な**方法で行われ、**述語コントラクトのみを介して**行われることが保証されます。
- 注意すべき重要な点は、Polygon からの**トランザクションハッシュの検証**と**述語コントラクトのトリガー**が**単一のトランザクション**で発生するため、ルートコントラクトの状態変化のセキュリティが確保されることです。

# 実装 {#implementation}

これは、PolygonからEthereumにデータを転送する方法の簡単なデモです。このチュートリアルでは、チェーン全体でuint256バリュー転送する例を示します。データの種類を転送できますが、データをバイト単位でエンコードしてから、子コントラクトから発行する必要があります。これは、ルートコントラクトで最終的にデコードできます。

1. 最初に、ルートチェーンと子チェーンコントラクトを作成します。状態の変更を行う機能もイベントを発行することを確認してください。このイベントには、パラメータの1つとして転送されるデータが含まれている必要があります。子とルートのコントラクトがどのように見えるかのサンプル形式を以下に示します。これは、setData機能を使用して値が設定されるデータ変数を持つ非常に単純なコントラクトです。setData機能を呼び出すと、データイベントが発行されます。コントラクトの残りの部分については、このチュートリアルの次のセクションで説明します。

A. 子コントラクト

```javascript
contract Child {

    event Data(address indexed from, bytes bytes_data);

    uint256 public data;

    function setData(bytes memory bytes_data) public {
     data = abi.decode(bytes_data,(uint256));
     emit Data(msg.sender,bytes_data);
    }

}
```

B. ルートコントラクト

この`0x1470E07a6dD1D11eAE439Acaa6971C941C9EF48f`をルートコントラクトコンストラクタの`_predicate`のバリューとして渡します。

```javascript
contract Root {

    address public predicate;
    constructor(address _predicate) public{
        predicate=_predicate;
    }

   modifier onlyPredicate() {
        require(msg.sender == predicate);
        _;
    }

    uint256 public data;

    function setData(bytes memory bytes_data) public onlyPredicate{
        data = abi.decode(bytes_data,(uint256));
    }

}
```

2. 子コントラクトとルートコントラクトがそれぞれPolygonとEthereumチェーンにデプロイされたら、PoSブリッジを使用してこれらのコントラクトをマッピングする必要があります。このマッピングにより、チェーン全体でこれら2つのコントラクト間の接続が維持されます。このマッピングを行うために、Polygonチームは[discord](https://discord.com/invite/0xPolygon)で連絡を取ることができます。

3. 注意すべき重要な点の1つは、ルートコントラクトにonlyPredicate修飾子があることです。この修飾子は、述語コントラクトだけがルートコントラクトの状態を変更することを保証するため、常に使用することが推奨されます。述語コントラクトは、Polygonチェーン上で起こったトランザクションがEthereumチェーン上のRootChainManagerによって検証された場合にのみ、ルートコントラクトを発行する特別なコントラクトです。これにより、ルートコントラクトの状態を安全に変更することができます。

上記の実装をテストするために、子コントラクトの**setData**機能を呼び出すことによって、Polygonチェーン上でトランザクションを作成することができます。この時点でチェックポイントが完了するのを待機する必要があります。チェックポイントの組み込みは、[スクリプト](https://github.com/rahuldamodar94/matic-learn-pos/blob/transfer-matic-ethereum/script/check-checkpoint.js)で確認することができます。チェックポイントが完了したら、matic.js SDKを使用してRootChainManagerの終了機能を呼び出します。

```jsx
const txHash =
  "0xc094de3b7abd29f23a23549d9484e9c6bddb2542e2cc0aa605221cb55548951c";

const logEventSignature =
  "0x93f3e547dcb3ce9c356bb293f12e44f70fc24105d675b782bd639333aab70df7";

const execute = async () => {
  try {
    const tx = await maticPOSClient.posRootChainManager.exit(
      txHash,
      logEventSignature
    );
    console.log(tx.transactionHash); // eslint-disable-line
  } catch (e) {
    console.error(e); // eslint-disable-line
  }
};
```

上記のスクリーンショットに示すように、**txHash**は、Polygonチェーン上にデプロイされた子コントラクト上で発生したトランザクションのトランザクションハッシュです。

**logEventSignature**には、Dataイベントのkeccack-256ハッシュが格納されます。これは、Predicateのコントラクトに含まれるハッシュと同じものです。このチュートリアルで使用したすべてのコントラクトコードと終了スクリプトは、[ここ](https://github.com/rahuldamodar94/matic-learn-pos/tree/transfer-matic-ethereum)でご覧いただけます。

終了スクリプトが完了すると、Ethereumチェーン上のルートコントラクトにクエリをして、子コントラクトに設定された変数**データ**のバリューがルートコントラクトの**データ**変数にも反映されているかどうかを確認できるようになります。
