---
id: antehandler
title: Tratador Ante
description: O manipulador de antra verifica e valide a transação
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Tratador Ante {#ante-handler}

O tratador Ante verifica e valida a transação. Após a verificação, verifica o saldo do remetente para taxas suficientes, e deduz as taxas no caso de inclusão de transação bem-sucedida.

## Limite de gás {#gas-limit}

Cada bloco e transação tem um limite de uso de gás. Um bloco pode conter várias transações, mas o gás usado por todas as transações num bloco deve ter menos do que o limite de gás de bloqueio para evitar blocos maiores.

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

Observe que cada manipulação de estado na transação custa gás, incluindo a verificação de assinatura para a transação.

### Limite de gás do bloco {#block-gas-limit}

O limite máximo de gás do bloco e os bytes por bloco são passados ao configurar os params de consenso da aplicação: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

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

### Limite de gás da transação {#transaction-gas-limit}

O limite de gás da transação está definido em params no módulo `auth`. Pode ser alterado através do módulo `gov` do Heimdall.

### Limite do gás da transação do ponto de verificação {#checkpoint-transaction-gas-limit}

Como o bloco contém múltiplas transações e verifica esta transação em particular na chain Ethereum, é necessária a prova Merkle. Para evitar a verificação da prova extra Merkle para o checkpoint da transação, o Heimdall só permite transação no bloco se o tipo de transação for `MsgCheckpoint`

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## Verificação de transação e proteção contra repetição {#transaction-verification-and-replay-protection}

O tratador Ante lida e verifica a assinatura numa transação recebida: [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

Cada transação deve incluir `sequenceNumber` para evitar ataques de repetição. Após cada inclusão de transação bem-sucedida, o tratador Ante aumenta o número de sequência para a conta do remetente TX para evitar a duplicação (repetição) das transações anteriores.