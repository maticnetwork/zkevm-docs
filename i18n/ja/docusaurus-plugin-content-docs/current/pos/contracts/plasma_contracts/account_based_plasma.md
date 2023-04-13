---
id: account_based_plasma
title: アカウントベースのPlasma
description: アカウントベースのプラズマ実装
keywords:
  - docs
  - matic
  - Account Based Plasma
  - polygon
  - implementation
image: https://matic.network/banners/matic-network-16x9.png
---

# アカウントベースのPlasma {#account-based-plasma}

Polygon Plasmaは[Plasma MoreVP](https://ethresear.ch/t/more-viable-plasma/2160)と同様のモデルをフォローするが、他のUTXOベースの実装と比較して**アカウントベースの実装**です。サイドチェーンはEVM互換性です。MoreVP構築を使用して、承認署名の必要もなくします。

## PoSレイヤーとチェックポイント {#pos-layer-and-checkpoints}

Polygonネットワークはチェックポイントレイヤーでプルーフオブステークのデュアルストラテジーとブロックプロブロックプロデューサーレイヤーでブロックプロデューサーを使用して、ブロック時間の短縮及び、チェックポイントとfraud proofを使用してメインチェーン上の最終的な実行を達成します。

Polygonネットワークのチェックポイントレイヤーでは、Polygonネットワークのブロックレイヤー上の数ブロックごとに、（十分に結びついた）バリデータはブロックレイヤー上のすべてのブロックを検証後、メインチェーン上でチェックポイントを作成し、最後のチェックポイント以降からブロックハッシュのMerkleツリーを作成します。

メインチェーン上で最終的な機能を提供するだけでなく、チェックポイントはユーザー引き出しのイベントにトークンのプルーフオブバーン（引き出し）を含むため、引き出す際に役割を果たします。それにより、ユーザーは、Patricia Merkプルーフとヘッダーブロックプルーフを使用してルートコントラクトで残りのトークンを証明することができます。残りのトークンを証明するには、ヘッダーブロックはPoS（ステークホルダー）を介してルートチェーンにコミットする必要があります。引き出しプロセスは通常どおりにガス代をEthereumに発生します。終了ゲームにチェックポイントを大きく活用します。

## UTXOのようなイベントログ {#utxo-like-event-logs}

ERC20/ERC721転送の場合、これはUTXOのようなイベントログデータ構造を使用して達成されます。下記には、`LogTransfer`イベントの参照です。

```jsx
event LogTransfer(
    address indexed token,
    address indexed from,
    address indexed to,
    uint256 amountOrTokenId,
    uint256 input1, // previous account balance of the sender
    uint256 input2, // previous account balance of the receiver
    uint256 output1, // new account balance of the sender
    uint256 output2 // new account balance of the receiver
);
```

基本的にすべてのERC20/ERC72転送はイベントを発生させ、送信者と受信者（`input1`と`input2`）の以前の残高は txへの入力（UTXOのような）となり、新しい残高は出力（`output1`と`output2`）になります。転送は、関連するすべての`LogTransfer`イベントを照合する方法によって追跡されます。

## ゲームを終了する {#exit-games}

ブロックはシングルブロックプロデューサー（または非常に少ない）によって生成されるため、fraudの表面を公開します。攻撃シナリオについて簡潔に議論し、Plasmaがどのようにユーザーの保護を保証するかについて話します。

## 攻撃ベクトル {#attack-vectors}

### 悪意のあるオペレーター {#malicious-operator}
以下は、演算子が悪意のあるものになり、詐欺を試みる可能性があるシナリオについて説明します。

1. トークンの残高が不正に増加したり（オペレータが管理するアカウントの場合）、減少したりする（ユーザーの場合）、トークンが存在しないか、ダブル支出または不正な受信確認です。
2. ユーザーがtxを送信した後のデータの不可性について、演算子がプラズマブロックにtxを含めたが、チェーンデータがユーザーに利用できないようにしたとします。その場合、ユーザーが古いTXからexitを開始した場合、最新のTXを示すことでチェーン上で挑戦する可能性があります。ユーザーを悲しませることになります。
3. 悪いチェックポイントにおいて最悪の場合、演算子はA.1及び（または）A.2を実行し、バリデータと相互作用し、これらの状態の無効な移行をルートチェーンにコミットすることができます。
4. 不完全なサイドチェーンでは演算子はブロックの生産を停止し、チェーンは停止します。指定期間でチェックポイントが送信されない場合、サイドチェーンがルートチェーンで停止したとしてマークすることができます。これ以上チェックポイントは送信できません。

上記以外の理由により、プラズマチェーンは不正になった場合、必要な際はマスエクジットを開始するユーザーの必要性と、ユーザーが利用できるルートチェーンでイグジット構造を終了する必要があります。

### 悪意のあるユーザー {#malicious-user}

1. ユーザーはtxから終了しますが、サイドチェーンでトークンを引き続き費やします。二重支出と同様ですが、2つのチェーン間で行われます。

[MoreVp 7](https://ethresear.ch/t/more-viable-plasma/2160)のアイデアに基づき構築しています。一言で言うと、MoreVPは、「最新の入力」優先順位と呼ばれるエグジッドの優先順位を算出する新しい方法を導入します。出力の年によるイグジットを注文する代わりに、moreVPオーダーは最新の入力の年にイグジットします。これは、「想定外」トランザクションの後にwithheld blockに含まれる場合でも、有効なインプットからステムできる限り、正しく処理されます。txを含む年を割り当てる`getAge`を定義します。これは、[最小の実行可能なPlasma 1](https://ethresear.ch/t/minimal-viable-plasma/426)で定義されます。

```jsx
function getAge(receipt) {
  const { headerNumber, plasmaBlockNum, txindex, oindex } = receipt
  return f(headerNumber, plasmaBlockNum, txindex, oindex) // multiplied with their respective weights
}
```

## イグジットシナリオ {#exit-scenarios}

終了シナリオを議論する前に、いくつかの用語を紹介しましょう：

- **引き出し申請者**：plasmaチェーンを終了したいユーザー。
- **コミットされたtx**：Polygonチェーンブロックに含まれるtxであり、ルートチェーンでチェックポイントされたtxです。
- **消費tx**：ユーザーが署名したアクションに応じて、ユーザーのトークン残高を変更するtxです（トークン転送は含まれません）。これは、txを焼却することなど、転送を開始するユーザーの可能性があります。
- **リファレンスtx**：特定のユーザーおよびトークンのためのイグジットtxの前のTxアカウント残高ベースのUTXOスキームで定義されたように、リファレンスtxへの出力は、終了するtxへの入力となります。
- **MoreVPのイグジット優先順位**：特定のtxへの最新の入力の年（リファレンスtxの中）。イグジット優先順位を算出するために最も頻繁に使用されます。

### トークンバーン {#burn-tokens}

サイドチェーンを終了するには、ユーザーはプラズマチェーンで*引き出す別名トークンの焼却*txを起動します。このtxは、`Withdraw`イベントを出します。

```jsx
event Withdraw(
    address indexed token,
    address indexed from,
    uint256 amountOrTokenId,
    uint256 input1,
    uint256 output1
);
```

ここでは`input1`トークンに対するユーザーの以前の残高を示し、`output1`サイドチェーンに残ったトークン数を示します。この構築はアカウントベースの*UTXO*スキームと一貫します。ユーザーはこの引き出しtxを受け取り、メインチェーンでトークンを引き出すことを提示します。この受信を参照する際、ユーザーは次のものを提供する必要があります：

1. サイドチェーンブロックに受信を含むMerkleプルーフ（`receiptsRoot`）
2. サイドチェーンブロックにトランザクションを含むMerkleプルーフ（`transactionsRoot`）
3. ルートチェーン上のチェックポイントにサイドチェーンブロックヘッダーを含むプルーフ

```jsx
startExit(withdrawTx, proofOfInclusion /* of the withdrawTx in the checkpoint */) {
  Verify inclusion of withdrawTx in checkpoint using proofOfInclusion
  Verify msg.sender == ecrecover(withdrawTx)

  uint age = getAge(withdrawTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}
```

ユーザーがPlasmaチェーンを終了したい場合、（またはクライアントアプリ、例えばウォレットによって抽象化）サイドチェーンでトークンを焼却する必要があり、チェックポイントが取得されるのを待機し、チェックポイントでの引き出しtxからイグジットを開始する必要があります。

### 前回のERC20/721トランザクションから終了（詳細VP） {#exit-from-the-last-erc20-721-transfers-morevp}

シナリオを考慮し、ユーザーはサイドチェーン上でERC20転送を実施します。演算子はユーザーの転送直前に予想外のtxを追加し、バリデータと相互作用し、このブロックをチェックポイントします。このシナリオで、より一般的に、上記で説明した攻撃ベクトルA1からA3では、ユーザーは悪意のあるtxが含まれる前にトークンを焼却する機会がなかった場合もあり、ルートチェーン上の最後のチェックポイントされたtxからイグジットを開始する必要があります。そのため、イグジットを焼却するだけでなく、他とのERC20/721転送などの様々なtxからイグジットをサポートする必要があります。この攻撃ベクトルを基に構築し、2つのシナリオを見ていきます：

**送出移送：**ユーザーにトークンを転送しましたが、演算子が転送txを含む前にブロック/チェックポイントに悪意のあるtxが含まれていることに気付きました。チェーンからイグジットを開始する必要があります。転送txからイグジットを開始します。MoreVPで定義されているように、イグジットのイグジット優先順位を定義するリファレンスtx（*入力UTXO*）を提供する必要があります。トークン残高を更新し、送出移送txに先行するtxを参照します。

```jsx
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the user after the input tx was executed >= tokens being transferred in the exitTx
  Verify msg.sender == ecrecover(exitTx)

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

**受入移送：**演算子が受入移送txを含む前にブロック/チェックポイントに悪意のあるtxが含まれていることに気付きました。ここには*入力UTXO*は相手のトークン残高があるため、相手の残高を参照しながら受入移送txからイグジットを開始します。

```
startExit(referenceTx, proofOfInclusion, exitTx) {
  Verify inclusion of referenceTx in checkpoint using proofOfInclusion
  Verify token balance for the counterparty after the input tx was executed >= tokens being transferred in the exitTx
  Verify input.sender == ecrecover(exitTx) && input.receiver == msg.sender

  uint age = getAge(referenceTx)
  // add exit to priority Q
  PlasmaExit exit = ({owner, age, amount, token})
  addExitToQueue(exit)
}

```

### 機内トランザクション（MoreVP）からの退会 {#exit-from-an-in-flight-transaction-morevp}

このシナリオはデータ不可用性シナリオの対策です。txを作ったとし、データ不可用性のためにtxが期限内に含まれているかどうかわからないとしましょう。最後のチェックポイントされたtxを参照して、この処理中のtxからイグジットを開始します。ユーザーはMoreVPスタイルイグジットを開始する際にtxを作成しないように注意すべきであり、そうでなければ課題が発生します。

**注意事項：**MoreVPスタイル構築から終了する場合、ユーザーはリファレンスtx、イグジットtxを提供し、小さな`exit bond`を配置することでイグジットを開始することができます。イグジットの場合、イグジットが正常に試行された場合、イグジットはキャンセルされ、イグジットボンドは使用されることはありません。

## 制限 {#limitations}

1. 大規模のプルーフサイズ：チェックポイントにブロック（トランザクションを含む）を含むMerkプルーフとトランザクションを含むMerkleプルーフ。
2. 大量退出：演算子が悪意のある場合、ユーザーは大量退出をする必要があります。

仕様は初期段階にあり、この構築が絶望的に壊れている場合、改善するか、再設計するのに役立つフィードバックを当社は受け付けております。実装は、[コントラクト](https://github.com/maticnetwork/contracts)リポジトリで進行中の作業です。