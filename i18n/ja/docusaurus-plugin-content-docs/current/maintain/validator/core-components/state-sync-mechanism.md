---
id: state-sync-mechanism
title: 状態同期メカニズム
description: Ethereumデータをネイティブに読み込むためのステート同期メカニズム
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

[Heimdall](/docs/maintain/glossary.md#heimdall)のバリデータは[StateSynced](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) イベントをピックアップし、 [Bor](/docs/maintain/glossary.md#bor) レイヤーにイベントを渡します。[Polygon Architecture](/docs/pos/polygon-architecture).も参照してください。

**receiver contract**は[IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol),を継承し、カスタムロジックは[onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5)関数内に配置されています。

最新バージョンである[Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0)には、次のようないくつかの機能強化が含まれています：
1. 状態同期txsでデータサイズを制限するtxsは次のように：
    * **30Kb**：**バイト** として表現された場合
    * **60kb**： **文字列**として表現された場合。
2. 異なるバリデータのコントラクトイベント間の**遅延時間**を延ばすことで、イベントのバーストが発生した場合にメンプールがかなり迅速に満たされ、チェーンの進行を阻害しないことを確認します。

次の例はデータサイズが制限されている方法を示しています：

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## ユーザーのための要件 {#requirements-for-the-users}

dapps/ユーザーからステート同期で動作する必要なことは次のとおりです：

1. [syncState](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33)機能を呼び出しします。
2. `syncState` 機能は`StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);`イベントをエミットします。
3. Heimdallチェーン上のバリデータは`StateSynced`イベントを受け取ります。状態同期のために代金トランザクションを取得したいバリデータは、Heimdallにトランザクションを送信します。
4. Heimdall上の`state-sync`トランザクションがブロックに含まれれば、保留中の状態同期リストに追加されます。
5. Borの各スプリントの後、BorノードはAPIコールを介してHeimdallから保留中の状態同期イベントをフェッチします。
6.  [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol)機能の中に任意のアクションを実行するカスタムロジックレシーバーコントラクトは`IStateReceiver`インターフェースを継承します。
