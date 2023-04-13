---
id: topup
title: Topup
description: Um valor que será usado para pagar taxas na chain Heimdall
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Topup {#topup}

Topup da Heimdall é uma quantidade que será usada para pagar taxas na chain Heimdall.

Existem duas maneiras de fazer upload da sua conta:

1. Quando novos validadores se juntarem, eles podem mencionar um `topup`valor como top-up além do valor estipulado, que será movido como saldo na cadeia Heimdall para pagar taxas no Heimdall.
2. Um utilizador pode chamar diretamente a função de topo no contrato inteligente de staking no Ethereum para aumentar o saldo de topo no Heimdall.

## Mensagens {#messages}

### MsgTopup {#msgtopup}

A transação `MsgTopup` é responsável pelo mint de saldo para um endereço na Heimdall, com base no `TopUpEvent` da chain Ethereum, no contrato do gestor de staking.

O handler para esta transação processa o top-up e aumenta o saldo apenas uma vez para qualquer `msg.TxHash` e `msg.LogIndex`. Este lança o erro `Older invalid tx found` se estiver a tentar processar o top-up mais do que uma vez.

Aqui está a estrutura para a mensagem da transação de top-up:

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### MsgWithdrawFee {#msgwithdrawfee}

A transação `MsgWithdrawFee` é responsável por retirar saldo da Heimdall para a chain Ethereum. Um Validador pode retirar qualquer quantia da Heimdall.

O handler processa a retirada deduzindo o saldo do dito validador e prepara o estado para enviar o checkpoint seguinte. O próximo checkpoint possível irá conter o estado relacionado com a retirada para o validador específico.

O handler obtém informações do validador com base no `ValidatorAddress` e processa a retirada.

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## Comandos CLI {#cli-commands}

### Taxa de topup {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### Taxa de retirada {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

Para ver o topup refletido na conta execute o seguinte comando

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## APIs REST {#rest-apis}

| Nome | Método | URL | Parâmetros do corpo |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Taxa de topup | POST | /topup/fee | `id` identificação do validador, `tx_hash` hash da transação do evento de topup bem-sucedido na chain Ethereum, `log_index` índice de log do evento de topup emitido na chain Ethereum |
| Taxa de retirada | POST | /topup/withdraw | `amount` Quantidade retirada |
