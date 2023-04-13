---
id: validator-node-system-requirements
title: システム要件
description: バリデータノードを実行するためのシステム要件
keywords:
  - docs
  - matic
  - polygon
  - prerequisites
  - requirements
slug: validator-node-system-requirements
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

このセクションに記載されているシステム要件は、[sentry](/docs/maintain/glossary.md#sentry) [バリデータ](/docs/maintain/glossary.md#validator)ノードの両方についてです。

**minimum**システム要件はノード実行できることを意味しますが、設定は未来プルーフではありません。

**recommended**システム要件はノードが未来プルーフであることを意味します。しかし、ノード未来プルーフに制限はありません。

sentry ノードとバリデータノードは別々のマシンで実行する必要があります。

## 最小システム要件 {#minimum-system-requirements}

* RAM: 32 GB
* CPU: 8-core
* ストレージ：2.5TB SSD

:::info

webサービス（AWS）では、最小要件インスタンスと同等である**m5d.2xlarge** または **t3.2xlarge**で、無制限の選ばれたクレジットがあります。

ストレージの場合、2.5TBのSSDストレージが拡張可能であることを確認してください。

:::

## お勧めのシステム要件 {#recommended-system-requirements}

* RAM: 64 GB
* CPU: 16-core
* ストレージ：5 TB SSD
* 帯域幅: 1 Gbit/s

:::info

webサービス(AWS) では、推奨される要件インスタンスと同等である **m5d.4xlarge**です。

OVHでは、推奨される要件インスタンスと同等である**infra-3**です。

ネットワークでは、月額転送されたデータが3-5 TBを期待します。

:::
