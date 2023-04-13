---
id: transactions
title: Transactions
description: 트랜잭션 중 무엇이며 언제 사용할 수 있습니까
keywords:
  - docs
  - matic
  - polygon
  - Transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Transactions {#transactions}

거래는 모듈의 핸들러를 통해 모듈 내의 상태 변경을 촉발하는 [컨텍스트](https://docs.cosmos.network/main/core/context.html) 및 [메시지에서](https://docs.cosmos.network/main/building-modules/messages-and-queries.html) 열리는 메타데이터로 구성됩니다.

사용자가 애플리케이션과 상호 작용하며 상태를 변경하고 싶을 때(예: 코인 전송) 트랜잭션을 생성합니다. 네트워크에 트랜잭션을 전달하기 전에 해당 계정과 관련된 개인 키를 사용하여 트랜잭션의 각 `message`에 서명해야 합니다. 이후 트랜잭션은 블록에 포함되어 유효성 검사를 받은 다음 합의 프로세스를 통해 네트워크의 승인을 받아야 합니다. 트랜잭션의 라이프 사이클에 대해 자세히 알아보려면 [여기](https://docs.cosmos.network/main/basics/tx-lifecycle.html)를 클릭하세요.

## 유형 정의 {#type-definition}

트랜잭션 객체가 인터페이스를 구현하는 SDK `Tx`유형입니다.

```go
type Tx interface {
	// Gets all the transaction's messages.
	GetMsgs() []Msg

	// ValidateBasic does a simple and lightweight validation check that doesn't
	// require access to any other information.
	ValidateBasic() Error
}
```

트랜잭션에 대한 자세한 내용은 [https://docs.cosmos.network/main/core/talu.html](https://docs.cosmos.network/main/core/transactions.html)
