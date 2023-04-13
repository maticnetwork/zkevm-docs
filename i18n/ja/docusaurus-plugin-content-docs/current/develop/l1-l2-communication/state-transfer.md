---
id: state-transfer
title: 状態の転送
description: EthereumからPolygonに簡単にステートまたはデータを転送します。
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygonバリデータは、Ethereumチェーン上で継続的にコントラクトを監視します`StateSender`。Ethereumチェーン上に登録されたコントラクトがこのコントラクトを呼び出すたびに、イベントが発行されます。このイベントを使用して、Polygonバリデータは、データをPolygonチェーン上の別のコントラクトに中継します。この**ステート同期**メカニズムを使用して、EthereumからPolygonにデータを送信します。

さらに、Polygonバリデータは、各トランザクションのEthereumハッシュをPolygonチェーンで送信します。この**チェックポイント**を使用して、Polygonで実行されたトランザクションを検証することができます。トランザクションがPolygonチェーンで実行されていることを確認した後、Ethereumを使用して適切なアクションを実行することができます。

これらの2つのメカニズムを組み合わせてEthereumとPolygon間で双方向データ（ステート）を転送することができます。これらのインタラクションをすべて抽象化するには、（Ethereumで）コントラクトと`FxBaseRootTunnel`（Polygon`FxBaseChildTunnel`で）直接継承することができます。

## ルートトンネルコントラクト {#root-tunnel-contract}

[ここ](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol)から、`FxBaseRootTunnel`コントラクトを使用します。この契約により、次の機能にアクセスできます：

- `function _processMessageFromChild(bytes memory data)`： 送信されたデータを処理するために、コントラクトに実装する必要があるバーチャル機能です`ChildTunnel`。
- `_sendMessageToChild(bytes memory message)`：この機能は、メッセージとしてバイトデータで、内部的に呼び出すことができます。このデータはそのまま子トンネルに送信されます。
- `receiveMessage(bytes memory inputData)`：この関数を`ChildTunnel`呼び出す必要があります。トランザクションのプルーフを、calldataとして提供する必要があります。**matic.js**を使用してプルーフを生成するためのスクリプトを以下に示します。

## 子トンネルコントラクト {#child-tunnel-contract}

[ここ](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol)から、`FxBaseChildTunnel`コントラクトを使用します。コントラクトは、次の機能にアクセスを与えます。

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`： これは、から送信されたメッセージを処理するためにロジックを実装する必要がある仮想関数です`RootTunnel`。
- `function _sendMessageToRoot(bytes memory message)`：この機能を内部的に呼び出して、バイトメッセージをルートトンネルに送信できます。

## 前提条件 {#prerequisites}

- Ethereumでルート`FxBaseRootTunnel`コントラクトを継承する必要があります。例として、この[contract](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol)に従うことができます。同様に、Polygonで子どもに`FxBaseChildTunnel`コントラクトを継承します。この[コントラクト](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol)を例としてみましょう。
- ルートコントラクトを展開している間に
  - **Goerliテストネットは、**0**x2890bA17EfE978480615e330ecB65333b880928e**と0`_fxRoot`x**3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA**`_checkpointManager`としてパスします。

  - **Ethereumメインネット**は0**x86e4dc95c7fbdbf52e33d563bbdb00823894c287**`_fxRoot`であり、0xfe5**e5D361b2ad62c541bAb87C45a0B9B018389a2**`_checkpointManager`です。
- **Mumbaiテストネット**で子コントラクトを展開するには、コンストラクターと`_fxChild`同様に**0xCf73231F28B7331BBe3124B907840A94851f9f11**をパスします。**Polygonメインネット**の場合`_fxChild`、0**x8397259c983751dAf40400790063935a11afa28a**になります。
- 子トンネルのアドレスを指定して展開されたルートトンネル`setFxChildTunnel`を呼び出します。例：[0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- ルートトンネルのアドレスを指定して展開された子トンネル`setFxRootTunnel`を呼び出します。例：[0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## 状態転送ブリッジのコントラクト例 {#example-contracts-of-state-transfer-bridge}

- **コントラクト：Fx**[-Portal Githubリポジトリ](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli：**[0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai：**[0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## Ethereum → Polygonからのステート転送 {#polygon}

- ルートコントラクトで内部`_sendMessageToChild()`的に呼び出して、Polygonに送信する引数としてデータを渡す必要があります。例：[0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- 子コントラクトでは、`_processMessageFromRoot()`仮想機能を`FxBaseChildTunnel`に実装して、Ethereumからデータを取得します。状態が同期されると、データは状態レシーバーから自動的に受信されます。

## Polygon→Ethereumからのステート転送 {#ethereum}

1. Ethereumに送信されるパラメーターとして、データを使用して、子コントラクトに内部的に`_sendMessageToRoot()`を呼び出します例：[0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

トランザクションハッシュは、チェックポイントとして含まれていた後に証拠を生成するために使用されるため、注意してください。

2. **ルートチェーンでの終了を完了するためのプルーフ生成：****txハッシュ**と**MESSAGE_SENT_EVENT_SIG**を使用してプルーフを生成します。プルーフを生成するには、Polygonがホストするプルーフ生成APIを使用するか、[こちら](https://github.com/maticnetwork/proof-generation-api)で説明したら、プルーフ生成APIをスピンアップすることもできます。

Polygonがホストする証拠生成エンドポイントは[こちら](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})からご覧いただけます。

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

メインネットとテストネットのプルーフ生成APIを使用する例は次のとおりです：-

→ [Mumbaiテストネット証明生成](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Polygonメインネットプルーフ生成](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. ルートコントラクトに`_processMessageFromChild()`を実装します。

4. 生成されたプルーフを`receiveMessage()`への入力として使用して、子トンネルからコントラクトに送信されたデータを取得します。例：[0x436dcd500659bea715a09d9257295ddc21290769daea7f0b666166ef75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515) ）
