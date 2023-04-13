---
id: antehandler
title: Vorabwickler
description: Ante Handler prüft und validiert die Transaktion
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Vorabwickler {#ante-handler}

Der Vorabwickler prüft und validiert die Transaktion. Nach der Verifizierung prüft es das Guthaben des Absenders auf einen ausreichenden Saldo und zieht im Falle einer erfolgreichen Transaktionsaufnahme Gebühren ab.

## Gaslimit {#gas-limit}

Für jeden Block und jede Übertragung gibt es ein Limit für den Gasverbrauch. Ein Block kann mehrere Transaktionen enthalten, aber Gas wird von allen Transaktionen in einem Block verwendet, muss weniger als Blockgaslimit sein, um größere Blöcke zu vermeiden.

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

Beachten Sie, dass jede Änderung von Übertragungen Gas kostet, einschließlich der Überprüfung der Unterschrift für die Übertragung.

### Blockgaslimit {#block-gas-limit}

Maximale Blockgaslimit und Bytes pro Block werden beim Einrichten der Konsensparameter der Anwendung übergeben: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

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

### Übertragungsgaslimit {#transaction-gas-limit}

Das Übertragungsgaslimit wird in den Parametern im Modul `auth` definiert. Dies kann über das Heimdall `gov` Modul geändert werden.

### Checkpoint Transaction Gas Limit {#checkpoint-transaction-gas-limit}

Da der Block mehrere Transaktionen enthält und diese eine bestimmte Transaktion auf der Ethereum-Chain überprüft, ist ein Merkle-Proof erforderlich. Um eine zusätzliche Merkle-Proof-Verifizierung für Checkpoint-Übertragungen zu vermeiden, lässt Heimdall nur eine Übertragung im Block zu, wenn der Übertragungstyp `MsgCheckpoint` ist.

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## Übertragungs-Verifizierung und Wiedergabeschutz {#transaction-verification-and-replay-protection}

Der Vorabwickler bearbeitet und prüft die Signatur in der eingehenden Übertragung: [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

Jede Übertragung muss `sequenceNumber` enthalten, um Wiederholungsangriffe zu vermeiden. Nach jeder erfolgreichen Übertragungsaufnahme erhöht der Vorabwickler die Sequenznummer für das TX-Senderkonto, um eine Duplizierung (Wiederholung) der vorherigen Übertragungen zu vermeiden.