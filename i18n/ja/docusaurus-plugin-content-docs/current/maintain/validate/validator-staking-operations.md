---
id: validator-staking-operations
title: Polygon上のステーク
description: Polygonネットワークでバリデータとしてステークする方法を学びます。
keywords:
  - docs
  - matic
  - polygon
  - stake
  - claim
  - unstake
slug: validator-staking-operations
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## 前提条件 {#prerequisites}

### フルノードの設定 {#full-node-set-up}

バリデータノードが完全に設定され同期されます。こちらも参照してください：

* [バリデータノードを実行する](run-validator.md)
* [Ansibleでバリデータノードを実行する](run-validator-ansible.md)
* [バイナリからバリデータノードを実行する](run-validator-binaries.md)

### アカウント設定 {#account-setup}

バリデータノードで、アカウントが設定されていることを確認します。チェックするには、**バリデータノード上で**次のコマンドを実行します：

```sh
    heimdalld show-account
```

出力は次の形式で表示されるはずです：

```json
{
    "address": "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
    "pub_key": "0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19"
}
```

これはバリデータノードにアドレスと公開鍵を表示します。**このアドレスはEthereum上の署名者のアドレスと一致する必要**があります。

### 秘密鍵を表示 {#show-private-key}

このステップはオプションです。

バリデータノードで、秘密鍵が正しいかどうかを確認します。チェックするには、**バリデータノード上で**次のコマンドを実行します：

```sh
heimdalld show-privatekey
```

次の出力が表示されるはずです：

```json
{
    "priv_key": "0x********************************************************"
}
```

## Polygon上のステーク {#stake-on-polygon}

 [バリデータダッシュボード](https://staking.polygon.technology/validators/)を使用してPolygonにステークすることができます。

### ステーキングダッシュボードを使用してステーク {#stake-using-the-staking-dashboard}

1.  [バリデータダッシュボード](https://staking.polygon.technology/validators/)にアクセスします。
2. ウォレットでログインします。MetaMaskを推奨するウォレットです。MATICトークンが存在する場所と同じアドレスを使用してログインする必要があります。
3. **バリデータになるをクリックします。**ノードを設定するように求められます。今までにノードを設定していない場合、そうする必要があり、さもなければ先に進んでステークしようとするとエラーが発生します。
4. 次の画面では、バリデータの詳細、手数料率、ステーキング額を追加します。
5.  **ステークNow**をクリックします。

トランザクションが完了すると、バリデータになるためのステークが成功したことになります。トランザクションは3回確認するよう求められます。

* トランザクションの承認 ー これでステークトランザクションを承認します。
* ステーク — これでステークトランザクションが確認されます。
* 保存 —ß これはバリデータ詳細を保存します。

:::note

変更が[ステーキングダッシュボード](https://staking.polygon.technology/account)に反映されるためには、最低12ブロックの確認が必要になります。

:::

### 残高をチェック {#check-the-balance}

アドレスの残高をチェックするには：

```sh
heimdallcli query auth account SIGNER_ADDRESS --chain-id CHAIN_ID
```

場所

* 署名_アドレス — [署名アドレス](/docs/maintain/glossary.md#validator)。
* `heimdall-137`チェーン_ID — Polygon MainnetのチェーンIDとクライアントプレフィックス:

次の出力が表示されるはずです：

```json
address: 0x6c468cf8c9879006e22ec4029696e005c2319c9d
coins:
- denom: matic
amount:
    i: "1000000000000000000000"
accountnumber: 0
sequence: 0
```

### バリデータとして報酬を請求 {#claim-rewards-as-a-validator}

バリデータとして設定、ステークを終えたら、バリデータ業務を実行したことに対して報酬を獲得します。バリデータ業務を正しく遂行すると、報酬が与えられます。

報酬を請求するには、[バリデータダッシュボード](https://staking.polygon.technology/account)に移動します。

プロフィールに2つのボタンが表示されます：

* 報酬引き出し
* 報酬リステーク

#### 報酬引き出し {#withdraw-reward}

バリデータとして、バリデータ業務を正しく遂行している限りは報酬を得ることができます。

 **報酬引き出し**をクリックすると、ウォレットに報酬が送られます。

ダッシュボードは12ブロックの確認後に更新されます。

#### 報酬リステーク {#restake-reward}

報酬をリステークするのはバリデータのステークを増やす簡単な方法です。

 **報酬リステーク**をクリックすると、報酬はリステークされ、ステークが増加します。

ダッシュボードは12ブロックの確認後に更新されます。
