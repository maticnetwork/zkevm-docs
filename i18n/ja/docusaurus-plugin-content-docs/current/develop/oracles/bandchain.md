---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: BandChainは、従来のWeb APIからデータをクエリするためにデータオラクルのために構築された高性能ブロックチェーンです。
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Bandプロトコルを使用すると、従来のWeb APIからデータをクエリし、ブロックチェーンで使用できます。開発者は、オラクルの要求と支払いを容易にするための**コスモスをベースとしたブロックチェーンであるBandChain**を介してクエリを実行し、dApp上のデータを使用することができます。オラクルデータの統合は、次の3つの簡単なステップで実行できます。

1. **オラクルスクリプトを選択する**

オラクルスクリプトは、BandChainから要求されるデータの種類を一意に識別するハッシュです。スクリプトは[**ここ**](https://guanyu-devnet.cosmoscan.io/oracle-scripts)にあります。これらのスクリプトは、オラクルリクエストの作成時に、パラメータの1つとして使用されます。

2. **BandChainからのデータをリクエストする**

これを実行する方法は次の2つです：

    - **バンドチェーンエクスプローラーを使用する**

    選択したオラクルスクリプトをクリックして、**実行**タブからパラメーターを渡してBandChainから応答を取得することができます。応答には結果とevmプルーフが含まれています。このプルーフはコピーする必要があり、最終ステップで使用されます。エクスプローラーを使用してオラクルをクエリするためのBandChainドキュメントは[**こちら**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer)からご覧いただけます。

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    上記に示すと、乱数値を取得するためのオラクルリクエストを行う例です。値100は、オラクルリクエストの`max_range`パラメータに渡されます。応答でハッシュを取得します。このハッシュをクリックすると、応答の完全な詳細が表示されます。

    - **BandChain-Devnet JSライブラリーの使用**

    BandChain-Devnetライブラリーを使用して、直接BandChainをクエリすることができます。クエリを実行すると、応答で**evm プルーフ**が返されます。このプルーフは、BandChain統合の最終ステップで使用できます。BandChain-Devnet JSライブラリーを使用したオラクルをクエリするためのBandChainドキュメントは[**こちら**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library)からご覧いただけます。乱数のオラクルリクエストのペイロードは、次のようになります。リクエストの本文がapplication/json形式で渡されていることを確認してください。

3. **スマートコントラクトでデータを利用する**

最後のステップでは、検証コントラクトをデプロイし、オラクルリクエストからの応答を、検証コントラクトの状態変数に格納します。これらの状態変数が設定されると、必要に応じてdappからアクセスできます。また、これらの状態変数は、dAppからオラクルスクリプトに再度クエリを実行することにより、新しい値で更新できます。以下に示すのは、乱数のオラクルスクリプトを使用して、乱数値を格納する検証コントラクトです。

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

デプロイする際には、3つのパラメーターを渡す必要があります。**最初**のパラメータは、オラクルスクリプトハッシュである`codeHash`ものです。**2番目**のパラメータは、オラクルスクリプトリクエストパラメータオブジェクトです。これはバイト形式で渡される必要があります。BandChainは、パラメータのJSONオブジェクトをバイト形式に変換するためのREST APIを提供します。APIの詳細は、[**こちら**](https://docs.bandchain.org/references/encoding-params)で確認できます。このAPIから受信した応答に0xを追加する必要があります。**3番目**のパラメータは、すでにPolygonネットワークに展開されているBandChainコントラクトのアドレスです。バンドプロトコルはPolygon TestnetV3をサポートします：0x3ba819b03fb8d34995f68304946eefa6dcff7cbf

もう1つの注意すべきことは、バリデーションコントラクトは、それぞれ`BandChainLib.sol``IBridge.sol`呼び出されたヘルパーライブラリとインターフェースをインポートする必要があります。[**バンド**](https://docs.bandchain.org/references/bandchainlib-library)チェーンライブラリと[**IBridge**](https://docs.bandchain.org/references/ibridge-interface)インターフェースがあります。

検証コントラクトがデプロイされると、dAppからクエリを実行して状態変数にアクセスできます。同様に、組み込みのオーラクルスクリプトのために複数のバリデーションコントラクトを作成することができます。IBridgeインターフェースには、バリデーションコントラクトで毎回更新される値を検証`relayAndVerify()`する方法があります。バリデーションコントラクトの`update()`メソッドにはステート変数を更新するロジックがあります。オラクルスクリプトをクエリーすることから得られたEVM証明を`update()`メソッドに渡す必要があります。値が更新されるたびに、Polygonに展開されたBandChainコントラクトは、コントラクトステート変数に保存する前にデータを検証します。

バンドチェーンには分散型のオラクルのネットワークがあり、dAppsでスマートコントラクトロジックを高めることができます。バンドチェーンドキュメントは、コントラクトの展開、値の保存、更新に[**関する**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library)情報をご覧ください。