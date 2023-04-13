---
id: checkpoint
title: Checkpoint
description: Modul, das checkpoint-bezogene Funktionalitäten verwaltet
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Checkpoint {#checkpoint}

Das `checkpoint`-Modul verwaltet Checkpoint bezogene Funktionalitäten für Heimdall. Es zieht die Bor-Chain hinzu, wenn ein neuer Checkpoint auf Heimdall vorgeschlagen wird, um den Checkpoint-Root-Hash zu überprüfen.

Alle bezüglich der [checkpoint](/docs/pos/heimdall/checkpoint) werden hier detailliert erklärt.

## Lebenszyklus eines Checkpoints {#checkpoint-life-cycle}

Heimdall verwendet den gleichen leader wie Tendermint, um den nächsten Proposer auszuwählen. Während er auf der Ethereum-Chain Checkpoints einreicht, kann er aus vielen Gründen wie Gas-Limit, Datenverkehr auf Ethereum, hohe Gas-Gebühren, fehlschlagen. Deshalb ist ein mehrstufiger Checkpoint-Prozess erforderlich.

Jeder Checkpoint hat Prüfer als Proposer. Wenn der Checkpoint auf der Ethereum-Chain fehlschlägt oder erfolgreich ist, `ack`und die `no-ack`Transaktion den Proposer auf Heimdall für den nächsten Checkpoint ändern würde. Das folgende Flussdiagramm stellt den Lebenszyklus des Checkpoints dar:

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## Nachrichten {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint` wickelt die Checkpoint-Verifizierung auf Heimdall ab. Nur diese Nachricht verwendet die RLP-Codierung, da sie auf der Ethereum Chain verifiziert werden muss.

```go
// MsgCheckpoint represents checkpoint transaction
type MsgCheckpoint struct {
	Proposer        types.HeimdallAddress `json:"proposer"`
	StartBlock      uint64                `json:"startBlock"`
	EndBlock        uint64                `json:"endBlock"`
	RootHash        types.HeimdallHash    `json:"rootHash"`
	AccountRootHash types.HeimdallHash    `json:"accountRootHash"`
}
```

Sobald diese Transaktion auf Heimdall verarbeitet wird, entnimmt `proposer` für diese Transaktion  `votes` und `sigs` von Tendermint und sendet den Checkpoint auf die Ethereum-Chain.

Da der Block mehrere Transaktionen enthält und diese eine bestimmte Transaktion auf der Ethereum-Chain überprüft, ist ein Merkle-Proof erforderlich. Um eine zusätzliche Merkle-Proof-Verifizierung auf Ethereum zu vermeiden, lässt Heimdall nur eine Transaktion im Block zu, wenn der Transaktionstyp `MsgCheckpoint` ist.

Um diesen Mechanismus stattzugeben, stellt Heimdall `MsgCheckpoint`-Transaktionen als Transaktion mit hohen Gasgebühren ein. Schau hier vorbei [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

Die Transaktion wird den vorgeschlagenen Checkpoint im `checkpointBuffer`-Status abspeichern und nicht als tatsächlichen Status der Checkpoint-Liste.

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck` wickelt erfolgreiche Checkpoint-Einreichungen ab. Hier `HeaderBlock`ist ein Checkpoint-Zähler;

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

Für gültige `TxHash` und `LogIndex` für den übermittelten Checkpoint verifiziert diese Transaktion das folgende Ereignis und validiert den Checkpoint im `checkpointBuffer`-Status: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

```jsx
event NewHeaderBlock(
    address indexed proposer,
    uint256 indexed headerBlockId,
    uint256 indexed reward,
    uint256 start,
    uint256 end,
    bytes32 root
);
```

Nach erfolgreicher event aktualisiert es die tatsächliche Anzahl von Checkpoint, auch bekannt als `ackCount`und löscht die .`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

`MsgCheckpointNoAck` wickelt nicht erfolgreiche Checkpoints oder Offline-Proposer ab. Diese Transaktion ist nur gültig, nachdem `CheckpointBufferTime` von den folgenden Ereignissen weitergegeben wurde:

- Letzte erfolgreiche `ack` Transaktion
- Letzte erfolgreiche `no-ack` Transaktion

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

Diese Transaktion gibt den Timeout-Zeitraum für den aktuellen Proposer aus, damit er den Checkpoint/Ack absenden kann, bevor Heimdall einen neuen `proposer` für den nächsten Checkpoint auswählt.

## Parameter {#parameters}

Das Checkpoint-Modul enthält die folgenden Parameter:

| Key | Typ | Standardwert |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 * time.Second |


## CLI-Befehle {#cli-commands}

### Parameter {#params}

Um alle Params auszudrucken:

```go
heimdallcli query checkpoint params --trust-node
```

Voraussichtliches Ergebnis:

```yaml
checkpoint_buffer_time: 16m40s
```

### Checkpoint senden {#send-checkpoint}

Der folgende Befehl sendet die Checkpoint-Transaktion auf Heimdall:

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### Senden`ack`

Der folgende Befehl sendet Ack-Transaktion auf Heimdall, wenn der Checkpoint auf Ethereum erfolgreich ist:

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### Senden`no-ack`

Folgende Befehle senden eine No-Ack-Transaktion auf Heimdall:

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## REST APIs {#rest-apis}

| Name | Methode | Endpunkt |
|----------------------|------|------------------|
| Hole dir den aktuellen Checkpoint-Puffer-Status | HOLEN | /checkpoint/buffer |
| Hole dir Checkpoint-Zähler | HOLEN | /checkpoint/count |
| Hole dir Checkpoint-Details via Block-Index | HOLEN | /checkpoint/headers/<header-block-index\> |
| Hole dir den neuesten Checkpoint | HOLEN | /checkpoint/latest-checkpoint |
| Hole dir die Last-No-Ack-Details | HOLEN | /checkpoint/last-no-ack |
| Checkpoint-Details für den jeweiligen Start- und Endblock | HOLEN | /checkpoint/<start\>/<end\> |
| Checkpoint nach Nummer | HOLEN | /checkpoint/<checkpoint-number\> |
| Alle Checkpoints | HOLEN | /checkpoint/list |
| Hole dir den Ack-Zähler, den Puffer, die Validator-Auswahl, den Validator-Zähler und Last-No-Ack-Details | HOLEN | /overview |


Alle Abfrage-APIs liefern das Ergebnis in folgendem Format:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
