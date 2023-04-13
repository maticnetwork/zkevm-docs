---
id: accounts
title: アカウントとは
sidebar_label: Accounts
description: "EOAおよびコントラクトアカウント。"
keywords:
  - docs
  - matic
  - polygon
  - accounts
  - EOAs
  - contract accounts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# アカウントとは {#what-are-accounts}

Ethereumのグローバル状態は、メッセージパッシングフレームワークを介して互いにやり取りするアカウントで構成されます。最も基本的なやり取りは、MATICトークン、Polygonのネイティブトークン、Ethereumブロックチェーンネイティブトークンである$ETHのようないくつかの値を送信することです。

各アカウントは、アカウントの公開鍵から生成されるアドレスと呼ばれる20バイト16進の識別子によって識別されます。

**外部所有**アカウントと**コントラクト**所有アカウントの2種類があります。

## 外部所有アカウント {#externally-owned-accounts}

EOAは、秘密鍵によってコントロールされるアカウントであり、トークンとメッセージを送信することができます。

1. トランザクション（Etherの転送またはコントラクトコードを実行）を送信することができます。
2. 秘密鍵によって制御される、
3. コードがないため、コードがありません。

## コントラクト所有のアカウント {#contract-owned-accounts}
コントラクト所有アカウントは、スマートコントラクトコードと関連するアカウントを持ち、秘密鍵は誰も所有していません。

1. それらは関連するコードを持っています、
2. 他のコントラクトから受信されたトランザクションまたはメッセージ（コール）によってコード実行がトリガーされます。
3. このコードが実行されると、任意の複雑性（チューリング完全性）の操作を実行します。独自の永続的なストレージを操作し、他のコントラクトを呼び出すことができます。

### リソース {#resources}

- [アカウントについての詳細を確認する](https://github.com/ethereum/homestead-guide/blob/master/source/contracts-and-transactions/account-types-gas-and-transactions.rst#externally-owned-accounts-eoas)
