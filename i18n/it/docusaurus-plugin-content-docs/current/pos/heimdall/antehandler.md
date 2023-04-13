---
id: antehandler
title: Ante handler
description: Ante Handler verifica e convalida la transazione
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Ante handler {#ante-handler}

Ante handler controlla e convalida la transazione. Dopo la verifica, controlla che il saldo del mittente sia sufficiente a coprire le tasse e le detragga in caso di riuscita inclusione della transazione.

## Limite gas {#gas-limit}

Ciascun blocco e ciascuna transazione hanno un limite per l'uso di gas. Un blocco può contenere più transazioni, ma il gas utilizzato da tutte le transazioni in un blocco deve essere inferiore al limite di gas per evitare blocchi di dimensioni maggiori.

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

Si noti che qualsiasi manipolazione dello stato sulla transazione comporta l'uso di gas, inclusa la verifica della firma per la transazione.

### Limite gas del blocco {#block-gas-limit}

Il limite gas massimo del blocco e i byte per blocco vengono trasmessi impostando i parametri di consensus dell'app: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

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

### Limite gas della transazione {#transaction-gas-limit}

Il limite gas della transazione è definito nei parametri del modulo `auth`. Può essere modificato attraverso il modulo `gov` di Heimdall.

### Checkpoint limite del gas di transazione {#checkpoint-transaction-gas-limit}

Dal momento che il blocco contiene più transazioni e verifica questa specifica transazione sulla catena di Ethereum, è necessaria una prova Merkle. Per evitare un'ulteriore prova Merkle per la transazione di checkpoint, Heimdall consente una sola transazione nel blocco se il tipo di transazione è `MsgCheckpoint`

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## Verifica della transazione e protezione dal replay {#transaction-verification-and-replay-protection}

Ante handler gestisce e verifica la firma nella transazione in entrata: [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

Ogni transazione deve includere `sequenceNumber` per evitare attacchi replay. Dopo l'avvenuta inclusione di ciascuna transazione, Ante handler aumenta il numero di sequenza per l'account del mittente della TX, in modo da evitare la duplicazione (replay) delle transazioni precedenti.