---
id: derivatives
title: デリバティブ
description: バリデータシェアによる委任
keywords:
  - docs
  - polygon
  - matic
  - derivatives
  - delegation
  - shares
slug: derivatives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygonはバリデーターシェア介して[delegation](/docs/maintain/glossary#delegator)をサポートしています。このデザインを使用することで、Ethereumメインネット契約で報酬とスラッシュ拡張する報酬を配布するのは簡単です。

デリゲートはバリデータから有限プールのシェアを購入することによってします。バリデータはバリデータトークンがバリデータシェアトークンを持っています。

バリデータAのファンジブルバリデータシェアトークンをVATICと呼ぶことにします。ユーザーがバリデータAにデリゲートすると、MATIC-VATICペアの為替レートに基づいてVATICが発行される。ユーザーが価値を獲得すると、交換レートは、VATIC1枚に対してより多くのMATICを引き出すことができることを示します。バリデータがスラッシュされると、引き出すMMaticは、VATICのMaticを減らします。

Maticステーキングトークンであることにノートしてください。デリゲータはデリゲーションに参加するMaticトークンを持つ必要があります。

最初は為替レートが1MATIC/1VATICの場合、デリゲータDはバリデータAのプールからトークンを購入します。

バリデータがMaticMaticトークンで報酬が与えられると、新しいトークンはプールに追加されます。

100Maticトークンが10のプールで、10Matic報酬がプールに追加されます。報酬によりVATICトークンが供給されることはなく、為替レートは0.9 VATICあたり1MATICになります。デリゲーターdは、株式の場合と同じ量でMATICを増やすことができます。

## コントラクトのフロー {#the-flow-in-the-contract}

`buyVoucher`:この機能はバリデータにプロセスをデリゲートする際にアトリビュートされます。デリゲート`_amount`は最初`stakeManager`に転送されます。`Mint`を介して`exchangeRate`現在を使用して確認ミントデリゲートは共有します。

取引レートは公式によって計算されます：

`ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares`

`sellVoucher`:デリゲータがバリデータからボンディングを解除したときに呼び出される機能です。機能は基本的にデリゲーション中に購入されたバウチャーを販売するプロセスを開始します。デリゲ引き出し期間は、デリゲータが`claim`トークンできる前に考慮されることです。

`withdrawRewards`: デリゲータとして、 `withdrawRewards`機能を呼び出すことで報酬を請求できます。

`reStake`: : 再起動は2つの方法で機能することができます: aデリゲータは `buyVoucher` または `reStake`報酬を使用してより多くの株式を購入できます。 デリゲータをステーキングすることで、再ステークすることができます。報酬をデリゲータとして再ステークすることができます。`reStaking`の目的はデリゲータのバリデータはよりステークが増えているため、デリゲータはそれについて報酬を増やすこと、デリゲータも増加することです。

`unStakeClaimTokens`: 引き出し期間が終了すると、株式を売ったデリゲータはMaticトークンを請求できます。

`updateCommissionRate`: バリデータの手数料%を更新します。See also [Validator Commission Operations](/docs/maintain/validate/validator-commission-operations)も参照してください。

`updateRewards`: バリデータが[checkpoint](/docs/maintain/glossary#checkpoint-transaction)を提出することで報酬を得る場合、 この関数は、バリデータとデリゲータの間で報酬を分配するために呼び出される。
