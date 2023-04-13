---
id: getting-started
title: Ethereum↔Polygonブリッジ
sidebar_label: Overview
description: PolygonおよびEthereum間の双方向のトランザクションチャネル。
keywords:
  - docs
  - polygon
  - polygon wiki
  - crosschain bridge
  - polygon
  - ethereum
  - fx portal
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Polygonは、プラズマおよびPoSセキュリティでクロスチェーンブリッジを導入することで、PolygonおよびEthereum間の信頼性がない双方向のトランザクションチャネルを提供します。このユーザーは、サードパーティのリスクおよび市場の流動性の制限を生じることなく、Polygon間でトークンを転送することができます。**PlasmaとPoSブリッジは、MumbaiテストネットとPolygonメインネットの両方で利用できます。**

**Polygonブリッジは、ほぼ即時、低コストで非常に柔軟なブリッジメカニズムを提供します。**Polygonは、デュアルコンセンサスアーキテクチャ（プラズマ +プルーフオブステーク（PoS）プラットフォーム）を使用します。速度と分散化のために最適化する。EVMが有効であるサイドチェーン上で任意の状態遷移をサポートするシステムを意識的に設計しました。

**ブリッジを通るとき、トークンが循環する供給について変更することはありません**

- Ethereumネットワークを残すトークンがロックされ、同数のトークンがPolygonでマイトされます（1：1）。
- Ethereumネットワークにトークンを戻すために、トークン はPolygonネットワーク上で燃焼され、プロセス中にEthereumネットワーク上でロック解除されます。

## PoS対Plasma {#pos-vs-plasma}

|                                      | PoSブリッジ（推奨） | Plasmaブリッジ |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **短い説明** | dAppデベロッパーは、POSシステムセキュリティで柔軟性とより速い引き出しを求めています。 | Plasma exitメカニズムでセキュリティ保証を強化することを探しているDAppデベロッパー。 |
| **構造** | 高い柔軟性 | リジッド、低い柔軟性 |
| **入金\（EthereumPolygon → Polygon\**） | 22〜30分 | 22〜30分 |
| **出金\（Polygon→Ethereum\）** | 1チェックポイント=〜30分～6時間 | Ethereumのコントラクトについてのプロセス終了手続きを呼び出す |
| **セキュリティ** | プルーフオブステークシステムは、外部のバリデータの堅牢なセットによって保護されます。 | Polygonのプラズマコントラクトは、Ethereumのセキュリティを利用します。 |
| **サポート標準** | ETH、ERC20、ERC721、ERC1155等 | ETH、ERC20、ERC721のみ |

:::info

[**FxPortal**](/develop/l1-l2-communication/fx-portal.md)は、PoSブリッジと非常に似ている別のタイプのブリッジです。上記の表に示すPoSと同じ特徴を共有しています。唯一の違いは、ブリッジする前にトークンをFxPortalブリッジでマッピングする必要はありません。マッピングは、特定のトークンのために開始された最初のデポジットトランザクション中に実行されます。また、誰でもFxPortalを利用して、Polygonブリッジの上に独自のカスタムトンネル/ブリッジを構築することができます。ブリッジのユースケースのためにFxPortalを使用することを強く推奨します。PoSとPlasma上の新しいトークンマッピングは、2023年1月31日以降に推奨されるため、マッピングプロセスを完全に分散化し、柔軟に実現することができます。

:::

## 他のリソース {#additional-resources}

- [ブロックチェーンブリッジの紹介](https://ethereum.org/en/bridges/)
- [クロスチェーンブリッジとは](https://www.alchemy.com/overviews/cross-chain-bridges)
