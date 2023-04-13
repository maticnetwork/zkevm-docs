---
id: delegate
title: デリゲートする方法
description: Polygonネットワーク上でデリゲータになる方法について説明します。
keywords:
  - docs
  - matic
  - polygon
  - how to delegate
  - validator
  - stake
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: delegate
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# デリゲートする方法 {#how-to-delegate}

これはPolygonネットワーク上で[デリゲータ](/docs/maintain/glossary.md#delegator)になるヘルプをガイドします。

唯一の前提条件は、Ethereum MainnetアドレスにMaticトークンETHを設定することです。

## ダッシュボードにアクセス {#access-the-dashboard}

1. ウォレット（MetaMaskなど）でEthereum Mainnetを選択します。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/choose-eth-mainnet.png")} width="300" />
</div>
<br />

2. [Polygonステーキング](https://staking.polygon.technology/)にログインします。
3. ログインすると、バリデータの一覧と共に全体的な統計が表示されます。

![img](/img/staking/home.png)

:::note

バリデーターの場合は、別のバリデーション以外のアドレスを使用してデリゲーターとしてログインしてください。

:::

## バリデーターへデリゲートする {#delegate-to-a-validator}

1. **Become a Delegator**をクリックするか、特定のバリデーターまでスクロールダウンして**Delegate**をクリックします。

![img](/img/staking/home.png)

2. デリゲートするMaticの額を指定します。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate.png")} width="500" />
</div>
<br />

3. デリゲーショントランザクションを承認して、**Delegate**をクリックします。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate2.png")} width="500" />
</div>
<br />

デリゲーショントランザクションが完了すると、**Delegation Completed**メッセージを表示します。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/delegate3.png")} width="500" />
</div>
<br />

## デリゲーションを表示する {#view-your-delegations}

デリゲーションを表示するには[My Account](https://staking.polygon.technology/account)をクリックします。

![img](/img/staking/myAccount.png)

## 報酬を引き出す {#withdraw-rewards}

1. [My Account](https://staking.polygon.technology/account)をクリックします。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. デリゲートされたバリデーターの下で**Withdraw Reward**をクリックします。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/withdraw-reward.png")} width="800" />
</div>
<br />

これにより、EthereumアドレスにMATIC トークンの報酬を引き出します。

## 報酬を再起動する {#restake-rewards}

1. [My Account](https://staking.polygon.technology/account)をクリックします。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. デリゲートされたバリデーターの下で、**Restake Reward**をクリックします。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/restake-rewards.png")} width="800" />
</div>
<br />

これにより、MATICトークン報酬をバリデータに再起動し、委任の利害関係を増やすことができます。

## バリデーターからボンドを解除する {#unbond-from-a-validator}

1. [My Account](https://staking.polygon.technology/account)をクリックします。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/click-my-account.png")} width="500" />
</div>
<br />

2. デリゲートされたバリデーターの下で、**Unbond**をクリックします。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond-from-validator.png")} width="800" />
</div>
<br />

これにより、バリデータから報酬を引き出し、バリデータからステーク全体を引き出します。

引き落とされた報酬は、Ethereumアカウントにすぐに表示されます。

引き出されたステーク資金には80[チェックポイント](/docs/maintain/glossary.md#checkpoint-transaction)までロックされます。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/unbond.png")} width="500" />
</div>
<br />

:::note

ネットワネットワーク上に悪意のある振舞いがないことを保証するためにアンボンディング期間に資金ロックを設定します。

:::

## あるノードから別のノードにステークを移動する {#move-stake-from-one-node-to-another-node}

あるノードから別のノードにステークを移動することはシングルトランザクションです。イベント中に遅延またはアンボンディングの期間はありません。

1. ステーキングダッシュボード上の[My Account](https://wallet.polygon.technology/staking/my-account)にログインします。
1. デリゲートされたバリデーターの下で**Move Stake**をクリックします。
1. 外部バリデーターを選択して**Stake here**をクリックします。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move.png")} width="1500" />
</div>
<br />

4. ステーク額を指定して**Move Stake**をクリックします。

<div align="center">
<img align="center" src={useBaseUrl("/img/staking/move2.png")} width="400" />
</div>
<br />

これがステークを移動します。ダッシュボードは12ブロックの確認後に更新されます。

:::info

どんなノード間でもステークを移動することができます。唯一の例外は、1つのFoundationノードから別のFoundationノードにステークを移動することです。

:::
