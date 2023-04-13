---
id: who-is-validator
title: バリデータとは誰ですか？
sidebar_label: Who is a Validator
description: "ネットワークの参加者でHeimdallとBorノードを実行します。"
keywords:
  - docs
  - matic
  - polygon
  - validator
  - Who is a Validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

バリデータは、システムでMATICトークンをロックし、HeimdallバリデータとBorブロックプロデューサーノードを実行するネットワークに参加しています。バリデータは自身のMaticトークンを担保としてステークし、ネットワークの安全を確保することに取り組み、そのサービスの見返りとして報酬を獲得します。

報酬は各チェックポイントですべてのステーク保有者にそのステークに比例して配布されますが、例外はプロポーザーで追加のボーナスを取得します。ユーザーの報酬残高はコントラクトに更新されますが、これは報酬を請求する際に参照されます。

ステークはバリデータノードが悪意のある行為に及んだ際に、スラッシュされるリスクがあり、たとえば二重署名はそのチェックポイントにおいてリンクされたデリゲータにも影響を与えます。

:::tip

ネットワークを確保したいがフルノードを実行していない方は[、デリ](/docs/maintain/glossary.md#delegator)ゲーターとして参加できます。

:::

## 概要 {#overview}

Polygonネットワーク上のバリデータは、オンチェーン入札プロセスを通じて選ばれますが、これは定期的に実施されます。これらの選ばれたバリデータはブロックの作成者、検証者として参加します。いったん[チェックポイント](/docs/maintain/glossary.md#checkpoint-transaction)が参加者によって検証されると、アップデートが親のチェーン（Ethereumメインネット）において行われ、そこでバリデータにそれぞれのネットワークのステークに応じて報酬が放出されます。

Polygonはネットワークを安全な状態にするために[バリデータ](/docs/maintain/glossary.md#validator)のセットに依存します。バリデータの役割はフルノードを実行し、[ブロックを生成](/docs/maintain/glossary.md#block-producer)、検証し、コンセンサスに参加し、Ethereumメインネット上に[チェックポイント](/docs/maintain/glossary.md#checkpoint-transaction)をコミットすることです。バリデータになるためには、自身のMaticトークンを[ステーク](/docs/maintain/glossary.md#staking)し、Etheriumメインネット上にステーキング管理コントラクトを設置する必要があります。

## コアコンポーネント {#core-components}

[Heimdall](/docs/maintain/glossary.md#heimdall)はステーキングコントラクトに送信されたイベントを読み取り、現在のセットにバリデータを選ぶとともに更新ステークレシオを添え、これは[Bor](/docs/maintain/glossary.md#bor)でもブロックを作成している間に活用されます。

[デリゲーション](/docs/maintain/glossary.md#delegator)またはステーキングコントラクトに記録されるとともに、バリデータのパワー、ノード、[署名アドレス](/docs/maintain/glossary.md#signer-address)、あるいはアンボンディング要請に関する更新も次のチェックポイントがコミットされる時に有効になります。


## Polygonバリデータのためのエンドツーエンドのフロー {#end-to-end-flow-for-a-polygon-validator}

バリデータは署名ノードを設定し、データを同期した後、現在のセットにバリデータとして受け入れられるためにはトークンをEthereumメインネットのステーキングコントラクト上にステークします。枠が空いている場合、バリデータはただちに受け入れることができます。そうでなければ、枠を取得するには交代メカニズムを経由する必要があります。

:::warning

新しいバリデータを受け入れるスペースは限られています。新しいバリデータは現在アクティブなバリデータがアンボンドしたときのみアクティブなセットに参加できます。バリデータの交代のための新しい入札プロセスが今後ロールアウトされる予定です。

:::

ブロック作成者はバリデータのセットから選ばれ、選ばれたバリデータは特定の[スパン](/docs/maintain/glossary.md#span)についてブロックを作成する責任を担います。

Heimdallのノードは作成されているブロックを検証、コンセンサスに参加、定義された間隔でEthereumメインネット上にチャックポイントをコミットします。

バリデータがブロックプロデューサでやチェックポイント[プロポーザー](/docs/maintain/glossary.md#proposer)に選ばれる確率は、全体のプール内のデリゲーションを含む自身のステークレシオに依存します。

バリデータはそのステークレシオに基づくすべてのチェックポイントで報酬を受け取りますが、これはチェックポイントプロポーザに付与されるプロポーザー提唱者ボーナスを差し引いた後となります。　

バリデータはいつでもシステムからオプトアウトできるほか、アンボンディング期間がいったん終われば、トークンを引き出すこともできます。

## 経済性 {#economics}

 [報酬](/docs/maintain/validator/rewards)を参照してください。

## バリデータノードを設定する {#setting-up-a-validator-node}

 [バリデート](/docs/maintain/validate/validator-index)を参照してください。

## 関連項目 {#see-also}

* [バリデータの責任](/docs/maintain/validate/validator-responsibilities)
* [バリデート](/docs/maintain/validate/validator-index)
* [バリデータよくある質問](/docs/maintain/validate/faq/validator-faq)
