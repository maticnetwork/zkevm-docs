---
id: checkpoint
title: Checkpoint
description: Modulo che gestisce le funzionalità correlate al checkpoint
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Checkpoint {#checkpoint}

Il modulo `checkpoint` gestisce le funzionalità relative ai checkpoint per Heimdall. Ha bisogno della catena Bor quando viene proposto un nuovo checkpoint su Heimdall per verificare l'hash della radice del checkpoint.

Tutti relativi ai dati di checkpoint sono spiegati nei dettagli [qui](/docs/pos/heimdall/checkpoint).

## Ciclo di vita del checkpoint {#checkpoint-life-cycle}

Heimdall utilizza lo stesso algoritmo di selezione leader di Tendermint per selezionare il prossimo proponente. Durante l'invio dei checkpoint sulla catena di Ethereum, potrebbe fallire a causa di diversi motivi come il limite di gas, il traffico su Ethereum, le alte gas fee. Ecco perché è necessario un processo di checkpoint a più fasi.

Ogni checkpoint è validatore come proponente. Se il checkpoint sulla catena di Ethereum non riesce o riesce `ack`e la `no-ack`transazione cambierebbe il proponente su Heimdall per il prossimo checkpoint. Il seguente grafico di flusso rappresenta il ciclo di vita del checkpoint:

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## Messaggi {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint` gestisce la verifica dei checkpoint su Heimdall. Solo questo messaggio utilizza la codifica RLP in quanto deve essere verificato sulla catena di Ethereum.

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

Una volta che questa transazione viene elaborata su Heimdall, il `proposer` prende `votes` e `sigs` da Tendermint per questa transazione e invia il checkpoint sulla catena di Ethereum.

Dal momento che il blocco contiene più transazioni e verifica questa specifica transazione sulla catena di Ethereum, è necessaria una prova Merkle. Per evitare una verifica supplementare della prova Merkle su Ethereum, Heimdall permette una sola transazione nel blocco se il tipo di transazione è `MsgCheckpoint`

Per consentire questo meccanismo, Heimdall imposta la transazione `MsgCheckpoint` come ad alto consumo di gas. Consulta [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

Questa transazione memorizzerà lo stato proposto per il checkpoint su `checkpointBuffer` invece dello stato effettivo dell'elenco dei checkpoint.

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck` gestisce l'invio riuscito del checkpoint. `HeaderBlock`Ecco un banco di checkpoint;

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

Per i `TxHash` e `LogIndex` validi per il checkpoint inviato, questa transazione verifica il seguente evento e convalida il checkpoint nello stato `checkpointBuffer`: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

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

Per la verifica degli eventi di successo, aggiorna il numero effettivo di checkpoint, noto anche come `ackCount`e cancella il .`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

`MsgCheckpointNoAck` gestisce i checkpoint non andati a buon fine o i proponenti offline. Questa transazione è valida solo dopo che sono trascorsi `CheckpointBufferTime` dai seguenti eventi:

- Ultima transazione `ack` riuscita
- Ultima transazione `no-ack` riuscita

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

Questa transazione fornisce il periodo di timeout per l'invio del checkpoint/ack da parte del proponente corrente prima che Heimdall scelga un nuovo `proposer` per il prossimo checkpoint.

## Parametri {#parameters}

Il modulo checkpoint contiene i seguenti parametri:

| Chiave | Tipo | Valore predefinito |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 * time.Second |


## Comandi CLI {#cli-commands}

### Parametri {#params}

Per stampare tutte le parametri:

```go
heimdallcli query checkpoint params --trust-node
```

Risultato previsto:

```yaml
checkpoint_buffer_time: 16m40s
```

### Inviare checkpoint {#send-checkpoint}

Il comando seguente invia una transazione di checkpoint su Heimdall:

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### Invia`ack`

Il comando seguente invia una transazione ack su Heimdall se il checkpoint ha successo su Ethereum:

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### Invia`no-ack`

Il comando seguente invia la transazione no-ack su Heimdall:

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## API REST {#rest-apis}

| Nome | Metodo | Endpoint |
|----------------------|------|------------------|
| Ottieni lo stato attuale del buffer del checkpoint | GET | /checkpoint/buffer |
| Ottieni il numero di checkpoint | GET | /checkpoint/count |
| Ottieni i dettagli del checkpoint per indice di blocco | GET | /checkpoint/headers/<header-block-index\> |
| Ottieni l'ultimo checkpoint | GET | /checkpoint/latest-checkpoint |
| Ottieni i dettagli dell'ultimo no-ack | GET | /checkpoint/last-no-ack |
| Dettagli del checkpoint per un determinato blocco iniziale e finale | GET | /checkpoint/<start\>/<end\> |
| Checkpoint per numero | GET | /checkpoint/<checkpoint-number\> |
| Tutti i checkpoint | GET | /checkpoint/list |
| Ottieni il conteggio degli ack, il buffer, il set di validatori, il conteggio dei validatori e i dettagli dell'ultimo no-ack | GET | /overview |


Tutte le API di query forniranno il risultato del seguente formato:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
