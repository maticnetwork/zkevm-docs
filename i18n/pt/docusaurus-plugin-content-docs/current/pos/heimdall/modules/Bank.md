---
id: bank
title: Banco
description: Transferências de saldo da conta do gerenciamento de módulos para Heimdall
keywords:
  - docs
  - matic
  - bank
  - account balance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Módulo do banco {#bank-module}

O módulo `bank` lida com transferências do saldo da conta para Heimdall. Este módulo corresponde ao módulo `bank` da cosmos-sdk.

## Mensagens {#messages}

### MsgSend {#msgsend}

`MsgSend` lida com transferências entre contas no Heimdall. Aqui está uma estrutura para mensagem de transação:

```go
// MsgSend - high-level transaction of the coin module
type MsgSend struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ToAddress   types.HeimdallAddress `json:"to_address"`
	Amount      types.Coins           `json:"amount"`
}
```

### MsgMultiSend {#msgmultisend}

`MsgMultiSend` lida com multi transferência entre contas para Heimdall.

```go
// MsgMultiSend - high-level transaction of the coin module
type MsgMultiSend struct {
	Inputs  []Input  `json:"inputs"`
	Outputs []Output `json:"outputs"`
}
```

## Parâmetros {#parameters}

O módulo banco contém os seguintes parâmetros:

| Chave | Tipo | Valor padrão |
|----------------------|--------|------------------|
| `sendenabled` | bool | verdadeiro |

## Comandos CLI {#cli-commands}

### Enviar saldo {#send-balance}

O seguinte comando irá enviar 1000 tokens matic para mencionados `address`;

```bash
heimdallcli tx bank send <address> 1000matic --chain-id <chain-id>
```
