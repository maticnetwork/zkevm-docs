---
id: antehandler
title: Менеджер Ante
description: Ante Handler проверяет и подтверждает транзакцию
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Менеджер Ante {#ante-handler}

Менеджер Ante проверяет и подтверждает транзакцию. После проверки он проверяет остаток по счету отправителя на наличие достаточной суммы средств для оплаты комиссии и взимает комиссию в случае успешного добавления транзакции.

## Лимит на газ {#gas-limit}

Каждый блок и транзакция имеют лимит на использование газа. Блок может содержать несколько транзакций, но газ, используемый всеми транзакциями в блоке, должен быть меньше предела газа для блока, чтобы избежать больших блоков.

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

Обратите внимание, что каждая манипуляция состоянием транзакции расходует газ, включая проверку подписи транзакции.

### Лимит газа для блока {#block-gas-limit}

Максимальный лимит газа для блока и байтов на блок устанавливается при настройке параметров консенсуса для приложения: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

```go
maxGasPerBlock   int64 = 10000000 // 10 Million
maxBytesPerBlock int64 = 22020096 // 21 MB

// pass consensus params
ConsensusParams: &abci.ConsensusParams{
	Block: &abci.BlockParams{
		MaxBytes: maxBytesPerBlock,
		MaxGas:   maxGasPerBlock,
	},
	...
},
```

### Лимит газа для транзакции {#transaction-gas-limit}

Лимит газа для транзакции определяется в параметрах модуля `auth`. Его можно изменить через модуль `gov` в Heimdall.

### Лимит газа транзакции checkpoint {#checkpoint-transaction-gas-limit}

Поскольку блок содержит несколько транзакций, а эта конкретная транзакция проверяется в цепочке Ethereum, требуется доказательство Меркла. Чтобы избежать необходимости дополнительной проверки доказательства Меркла для транзакции создания checkpoint, в Heimdall разрешено включать в блок только одну транзакцию, если тип транзакции `MsgCheckpoint`.

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## Проверка транзакций и защита от повторов {#transaction-verification-and-replay-protection}

Менеджер Ante обрабатывает и проверяет подпись входящей транзакции: [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

Каждая транзакция должна включать `sequenceNumber` во избежание атаки повтора. После каждого успешного включения транзакции менеджер Ante увеличивает порядковый номер аккаунта отправителя транзакции, чтобы избежать дублирования (повторения) предыдущих транзакций.