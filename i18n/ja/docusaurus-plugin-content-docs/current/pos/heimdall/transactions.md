---
id: transactions
title: トランザクション
description: トランザクションとは何ですか、そしてそれらが使用されるとき
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# トランザクション {#transactions}

トランザクションは、[コンテキスト](https://docs.cosmos.network/main/core/context.html)に保持されているメタデータと、モジュール内のステート変更を引き起こす[メッセージ](https://docs.cosmos.network/main/building-modules/messages-and-queries.html)で構成されます。

ユーザーがアプリケーションと相互作用し、状態変更（コインの送信など）を行い、トランザクションを作成します。各トランザクションの`message`は、トランザクションがネットワークにブロードキャストされる前に、適切なアカウントに関連する秘密鍵を使用して署名される必要があります。トランザクションは、ブロックに含まれ、検証され、その後、コンセンサスプロセスを通じてネットワークによって承認される必要があります。トランザクションのライフサイクルの詳細を確認するには、[ここ](https://docs.cosmos.network/main/basics/tx-lifecycle.html)クリックしてください。

## 種類の定義 {#type-definition}

トランザクションオブジェクトは、インターフェースを実装するSDKタイプです`Tx`。

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

トランザクションの詳細は[https://docs.cosmos.network/main/core/transactions.html](https://docs.cosmos.network/main/core/transactions.html)
