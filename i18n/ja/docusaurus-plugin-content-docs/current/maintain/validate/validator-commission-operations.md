---
id: validator-commission-operations
title: 手数料操作
description: バリデータコミッションを設定および変更する
keywords:
  - docs
  - matic
  - polygon
  - validator
  - commission operations
slug: validator-commission-operations
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

バリデータとして[手数料](/docs/maintain/glossary.md#commission)を設定、変更することができます。

バリデータにはあらゆる手数料率へと変更する権利があります。獲得する報酬のうち、最小手数料率は0％、最大手数料率は100％になります。

手数料率の変更は何度でも許可されています。

バリデータとしての責任の１つにコミュニティーに手数料の変更について通知することがあります。 [バリデータの責任](/docs/maintain/validator/responsibilities)を参照してください。

## バリデータとして手数料率を設定します。 {#set-up-your-commission-rate-as-a-validator}

手数料率の設定は当初のバリデータのステーキングプロセスの一部として行います。 [バリデータのステーキング操作](validator-staking-operations.md)を参照してください。

## 手数料率を変更します。 {#change-your-commission-rate}

手数料率を変更することができます。

1. 所有者アドレスで[ステーキングダッシュボード](https://staking.polygon.technology/)にログインします。
1. プロフィールで**プロフィール編集**をクリックします。
1.  **コミッション**フィールドで、新しい手数料率を提供します。

トランザクションを確認、署名したら、手数料率が設定されます。

いったん手数料が更新されると、80チェックポイントのクールダウン期間があります。
