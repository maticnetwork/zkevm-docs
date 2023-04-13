---
id: governance
title: Управление
sidebar_label: Governance
description: Система с 1 токеном - 1 основа
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Управление {#governance}

Управление Heimdall работает точно так же, как [модуль `x/gov`Cosmos-sdk.](https://docs.cosmos.network/master/modules/gov/)

В этой системе владельцы нативного токена стейкинга цепочки могут голосовать по предложениям по принципу `1 token = 1 vote`. Вот список функций, которые в настоящее время поддерживает:

- **Отправка предложений:** валидаторы могут отправлять предложения с размещением депозита. По достижении минимального требуемого размера депозита начинается период голосования по предложению. Валидаторы, которые внесли депозиты по предложениям, могут вернуть свои депозиты после того, как предложение будет отклонено или принято.
- **Голосование:** Валидаторы могут голосовать по предложениям, которые достигли MinDeposit.

В качестве параметров модуля `gov` определяются депозитный период и период голосования. Минимальный депозит должен быть достигнут до окончания периода депозита, в противном случае предложение будет автоматически отклонено.

По достижении минимального депозита до истечения депозитного периода начинается период голосования. В период голосования всем валидаторам следует проголосовать по предложению в соответствии со своим выбором. После окончания периода голосования `gov/Endblocker.go` выполняет функцию `tally` и принимает или отклоняет предложение на основании `tally_params` — `quorum`, `threshold` и `veto`.

Источник: [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

Существуют различные типы предложений, которые могут быть реализованы в Heimdall. На данный момент он поддерживает только **предложение о изменении параметра**.

### Предложение по изменению параметра {#param-change-proposal}

Используя этот тип предложения, валидаторы могут изменить любой `params``module`из Heimdall.

Например: изменить минимальный размер `tx_fees` для проведения транзакции в модуле `auth`. После принятия предложения оно автоматически изменяет `params` в состоянии Heimdall. Дополнительные транзакции не требуются.

## Команды CLI {#cli-commands}

### Запрос параметров управления {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

Показывает все параметры модуля управления.

```go
voting_params:
  voting_period: 48h0m0s
tally_params:
  quorum: "334000000000000000"
  threshold: "500000000000000000"
  veto: "334000000000000000"
deposit_parmas:
  min_deposit:
  - denom: matic
    amount:
      i: "10000000000000000000"
  max_deposit_period: 48h0m0s
```

### Направление предложения {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json` — это файл, который содержит предложение в формате json.

```json
{
  "title": "Auth Param Change",
  "description": "Update max tx gas",
  "changes": [
    {
      "subspace": "auth",
      "key": "MaxTxGas",
      "value": "2000000"
    }
  ],
  "deposit": [
    {
      "denom": "matic",
      "amount": "1000000000000000000"
    }
  ]
}
```

### Запрос предложения {#query-proposal}

Чтобы запросить все предложения:

```go
heimdallcli query gov proposals --trust-node
```

Чтобы запросить конкретное предложение:

```go
heimdallcli query gov proposals 1 --trust-node
```

### Голосование по предложению {#vote-on-proposal}

Чтобы проголосовать по конкретному предложению:

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

Итоги голосования по предложению будут автоматически подсчитаны по окончании периода голосования.

## REST API {#rest-apis}

| Название | Метод | Конечная точка |
|----------------------|------|------------------|
| Получить все предложения | GET | /gov/proposals |
| Получить информацию о предложении | GET | /gov/proposals/`proposal-id` |
| Получить информацию обо всех голосах за предложение | GET | /gov/proposals/`proposal-id`/votes |
