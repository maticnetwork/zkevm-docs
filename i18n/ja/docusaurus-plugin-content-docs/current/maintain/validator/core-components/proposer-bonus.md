---
id: proposer-bonus
title: プロポーザーのボーナス
description: バリデータになる追加のインセンティブ
keywords:
  - docs
  - polygon
  - matic
  - validate
  - proposer
  - bonus
  - incentive
slug: proposer-bonus
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# プロポーザーのボーナス {#proposer-bonus}

Polygonでは、Ethereumメインネットに定期的に[チェックポイントを](/docs/maintain/glossary.md#checkpoint-transaction)コミットする上で追加的要素があります。これはバリデータの責任の重大な一部であり、この活動を遂行するためにインセンティブが与えられます。これはPolygonなどのレイヤー2ソリューションに固有のバリデータにとってのコストを構成します。私たちはこのコストを、チェックポイントにコミットする責任のある[プロポーザー](/docs/maintain/glossary.md#proposer)に支払われるボーナスとして、バリデータステーキング報酬の支払いメカニズムに盛り込まれるよう努めています。報酬からボーナスを差し引いた額は全ステーカー；プロポーザーと[署名者](/docs/maintain/glossary.md#signer-address)に比例して共有されます。

ボーナスを完全に成立させるために、プロポーザーはチェックポイントにすべての署名を含める必要があります。プロトコルがステーク全体の2/3 +1ウェイトを望むため、チェックポイントはたとえ80％の票であっても受け入れられます。しかし、この場合、プロポーザーは計算されたボーナス額の80％のみを獲得します。
