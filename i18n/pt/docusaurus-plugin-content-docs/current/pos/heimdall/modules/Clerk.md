---
id: clerk
title: Clerk
description: Módulo que gerencia a sincronização de estado genérica do Ethereum para Bor
keywords:
  - docs
  - matic
  - module
  - state sync
  - clerk
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Clerk {#clerk}

O Clerk gere a sincronização de estado genérica da chain Ethereum para a chain BOR. O Heimdall concorda com a sincronização de estado, que é iniciada na chain Ethereum usando o módulo Clerk.

Mais detalhes estão disponíveis no [mecanismo de sincronização de estado](/docs/pos/bor/core_concepts.md#state-management-state-sync)

## Mensagens {#messages}

### MsgEventRecord {#msgeventrecord}

A transação `MsgEventRecord` é responsável por validar eventos do `StateSender.sol` e armazenar o estado na Heimdall para a BOR para utilização.

O handler desta transação valida qualquer `msg.TxHash` e `msg.LogIndex`. Este lança o erro `Older invalid tx found` se estiver a tentar processar a transação mais do que uma vez.

Aqui está a estrutura para a mensagem da transação:

```go
// MsgEventRecord - state msg
type MsgEventRecord struct {
	From     types.HeimdallAddress `json:"from"`
	TxHash   types.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                `json:"log_index"`
	ID       uint64                `json:"id"`
	ChainID  string                `json:"bor_chain_id"`
}
```

## Comandos CLI {#cli-commands}

### Enviar transação de registo do estado {#send-state-record-transaction}

```bash
heimdallcli tx clerk record
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--bor-chain-id <bor-chain-id>
	--chain-id <heimdall-chain-id>
```

### Para consultar o registo do evento de estado já validado {#to-query-already-validated-state-event-record}

```go
heimdallcli query clerk record --id <state-record-id>
```

## APIs REST {#rest-apis}

| Nome | Método | Endpoint |
|----------------------|------|------------------|
| Detalhes de registo do evento | GET | /clerk/event-record/<record-id\> |
| Todos os registos dos eventos | GET | /clerk/event-record/list |
