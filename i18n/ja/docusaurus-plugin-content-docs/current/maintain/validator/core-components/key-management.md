---
id: key-management
title: 鍵管理
description: 署名者と所有者キーの管理
keywords:
  - docs
  - polygon
  - matic
  - key
  - key management
  - signer
  - owner
slug: key-management
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

各バリデータは、Polygonで二つの鍵を使用してバリデータ関連の活動を管理します。

* 署名鍵
*  所有者鍵

## 署名鍵 {#signer-key}

署名鍵はHeimdallブロック、チェックポイント、他の署名関連活動に署名するために使用されるアドレスです。

署名アドレスの秘密鍵は、署名目的のためにバリデータノードを実行しているマシンに配置する必要があります。

署名鍵ではステーキング、報酬、デリゲーションの管理はできません。

バリデータはEthereumメインネット上の署名アドレスにETHを維持した上で[チェックポイント](/docs/maintain/glossary.md#checkpoint-transaction)を送信する必要があります。

## Owner key {#owner-key}

所有者の鍵はステーク、リステーク、署名鍵の変更、報酬引き出し、Ethereumメインネット上でのデレゲーション関連パラメータの管理に使用されるアドレスです。Owner keyのための秘密鍵はあらゆる犠牲を払ってでも安全なものでなければなりません。

Owner keyを介したすべてのトランザクションはEthereumメインネット上で行われます。

署名鍵はノードに保管され、通常は**ホット**ウォレットとみなされる一方、owner keyは非常に安全に保管されるべきで、まれに使用され、通常は**コールド**ウォレットとみなされます。ステークされた資金はowner keyを通じて管理します。

署名鍵とowner keyで役割を分離することは、セキュリティと使いやすさの間の有効なトレードオフを確保するために行われています。

両方の鍵ともEthereumと互換性のあるアドレスで、まったく同じように動作します。

## 署名変更 {#signer-change}

 [署名アドレス変更](/docs/maintain/validate/change-signer-address)を参照してください。
