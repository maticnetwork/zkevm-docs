---
id: auth
title: Auth
description: Модуль для указания транзакции базовой и типов аккаунта
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# Модуль {#auth-module}

Этот документ описывает `auth`модуль Heimdall.

Модуль `auth` отвечает за определение базовых транзакций и типов аккаунтов для приложения. Он содержит менеджер Ante, в котором выполняются все основные проверки достоверности транзакций (подписи, nonces, вспомогательные поля), и предоставляет хранителя аккаунта, который позволяет другим модулям читать, записывать и изменять аккаунты.

## Газ и комиссии {#gas-and-fees}

Комиссии служат двум целям для оператора сети.

Комиссии ограничивают рост состояния, хранимого каждым полным узлом, и допускают общую цензуру транзакций с небольшой экономической ценностью. Комиссии лучше всего подходят в качестве механизма защиты от спама, когда валидаторы не заинтересованы в использовании сети и личных данных пользователей.

Поскольку Heimdall не поддерживает пользовательский контракт или код для любой транзакции, он использует транзакции с фиксированной стоимостью. Для транзакций с фиксированной стоимостью валидатор может пополнить свои счета в цепочке Ethereum и получить токены на Heimdall с помощью модуля [Topup](Topup.md).

## Типы {#types}

Помимо аккаунтов (указанных в State) типы **модуля**, подвергающиеся Auth, являются **StdSignature**, сочетание дополнительного открытого ключа и криптографической подписи в качестве массива байтов, StdTx, структура, реализующая `sdk.Tx`интерфейс с использованием **StdSignature,** и S**tdSignDoc,** структура предотвращения воспроизведения для **StdTx,** которую отправители транзакции должны подписать.

### StdSignature {#stdsignature}

`StdSignature` — это типы массива байтов.

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

`StdTx` — это структура, которая реализует интерфейс `sdk.Tx` и может быть достаточно универсальной, чтобы служить целям многих типов транзакций.

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

`StdSignDoc` — это подписываемая структура предотвращения воспроизведения, которая гарантирует, что любая отправленная транзакция (которая представляет собой просто подпись над определенной строкой байтов) будет выполняться только один раз на Heimdall.

```go
// StdSignDoc is replay-prevention structure.
// It includes the result of msg.GetSignBytes(),
// as well as the ChainID (prevent cross chain replay)
// and the Sequence numbers for each signature (prevent
// inchain replay and enforce tx ordering per account).
type StdSignDoc struct {
	ChainID       string          `json:"chain_id" yaml:"chain_id"`
	AccountNumber uint64          `json:"account_number" yaml:"account_number"`
	Sequence      uint64          `json:"sequence" yaml:"sequence"`
	Msg           json.RawMessage `json:"msg" yaml:"msg"`
	Memo          string          `json:"memo" yaml:"memo"`
}
```

### Аккаунт {#account}

Он управляет адресами, монетами и nonce для транзакций. Он также подписывает и проверяет транзакции.

Источник: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

```go
type BaseAccount struct {
		Address types.HeimdallAddress `json:"address" yaml:"address"`
		Coins types.Coins `json:"coins" yaml:"coins"`
		PubKey crypto.PubKey `json:"public_key" yaml:"public_key"`
		AccountNumber uint64 `json:"account_number" yaml:"account_number"`
		Sequence uint64 `json:"sequence" yaml:"sequence"`
}
```

## Параметры {#parameters}

Модуль auth содержит следующие параметры:

| Ключ | Тип | Значение по умолчанию |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSigLimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1000000 |
| DefaultTxFees | string | "1000000000000000" |


## Команды CLI {#cli-commands}

### Показать аккаунт {#show-account}

Чтобы вывести данные аккаунта, связанные с ним, в Heimdall;

```bash
heimdalld show-account
```

Ожидаемый результат:

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### Информация об аккаунте и монете {#account-and-coin-details}

Чтобы отобразить данные аккаунта, монеты, последовательность и номер аккаунта;

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

Ожидаемый результат:

```json
address: 0x68243159a498cf20d945cf3e4250918278ba538e
coins:
- denom: matic
    amount:
    i: "1000000000000000000000"
pubkey: ""
accountnumber: 0
sequence: 0
```

### Параметры {#parameters-1}

Чтобы вывести все параметры;

```go
heimdallcli query auth params
```

Ожидаемый результат:

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## REST API {#rest-apis}

| Название | Конечная точка | Описание |
|----------------------|--------|------------------|
| Данные аккаунта | /auth/accounts/{address} | Возвращает все данные для адреса |
| Сведения о последовательности аккаунта | /auth/accounts/{address}/sequence | Возвращает только необходимые данные для подписи |
| Параметры Auth | /auth/params | Возвращает все параметры, используемые модулем аутентификации |
