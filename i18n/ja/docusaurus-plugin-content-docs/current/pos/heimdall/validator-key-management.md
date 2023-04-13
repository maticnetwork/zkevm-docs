---
id: validator-key-management
title: バリデータの鍵管理
description: 署名者と所有者の鍵バリデータ管理
keywords:
  - docs
  - matic
  - polygon
  - Validator Key Management
  - signer
  - owner
image: https://matic.network/banners/matic-network-16x9.png
---

# バリデータの鍵管理  {#validator-key-management}

各バリデータは、Polygon上のバリデータ関連のアクティビティを管理するために2つのキーを使用しています。署名鍵はノードに保持され、一般的に`hot`ウォレットと見なされますが、所有者鍵は安全な保持にされているのに対して、あまり頻繁に使用されないため、一般的に`cold`ウォレットと見なされています。ステークされた資金はowner keyを通じて管理します。

この責任を分離して、セキュリティと使いやすさの間の効率的なトレードオフを確保するために行われています。どちらのキーもEthereum互換のアドレスであり、まったく同じ方法で動作します。はい、所有者と署名者の鍵を持つことも可能です。

## 署名鍵 {#signer-key}

署名キーは、Heimdallブロック、チェックポイント、その他の署名に関連する活動に署名するために使用されるアドレスです。この鍵の秘密鍵は、署名目的のためにバリデータノードにされます。ステーク、報酬、またはデリゲーションを管理することはできません。

バリデータは、このアドレスに2種類の残高を保つ必要があります：

- Heimdall上のバリデータ責任を実行するHeimdall（Topupトランザクションを通じて）のMaticトークン
- Ethereumでチェックポイントを送信するEthereumチェーン上のETH

## Owner key {#owner-key}

所有者キーは、ステーキング、再ステーク、署名キーの変更、報酬の引き出し、Ethereumチェーン上の委任関連パラメータを管理するために使用されるアドレスです。この鍵の秘密鍵は、すべての費用において安全なものでなければなりません。

この鍵を介したすべてのトランザクションは、Ethereumチェーン上で実行されます。

## 署名変更 {#signer-change}

次のイベントは、`StakingInfo.sol`上のEthereumチェーンの署名者変更の場合に生成されます：[https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol)

```go
// Signer change
event SignerChange(
  uint256 indexed validatorId,
  address indexed oldSigner,
  address indexed newSigner,
  bytes signerPubkey
);
```

Heimdallブリッジは、これらのイベントを処理し、Heimdallでトランザクションを送信して、イベントに基づいて状態変更します。