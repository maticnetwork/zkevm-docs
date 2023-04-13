---
id: checkpoint
title: Checkpoint
description: Módulo que gerencia funcionalidades relacionadas com pontos de verificação
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Checkpoint {#checkpoint}

O módulo `checkpoint` gere as funcionalidades relacionadas com o checkpoint para Heimdall. Requer que a chain BOR verifique a hash ROOT do checkpoint,  quando um checkpoint novo é proposto no Heimdall.

Todos os dados do checkpoint são explicados nos detalhes [aqui](/docs/pos/heimdall/checkpoint).

## Ciclo de vida do checkpoint {#checkpoint-life-cycle}

O Heimdall usa o mesmo algoritmo de seleção de líderes do Tendermint para selecionar o próximo proponente. Ao submeter checkpoints na cadeia Ethereum, podem ocorrer falhas devido a vários motivos, como limite de gás, tráfego no Ethereum e altas taxas de gás. É por isso que é necessário o processo de checkpoint em várias fases.

Cada ponto de verificação tem o validador como proponente. Se o checkpoint na chain do Ethereum falhar ou tiver êxito, `ack`e a `no-ack`transação alterará o proponente no Heimdall para o próximo checkpoint. O fluxograma a seguir representa o ciclo de vida do checkpoint:

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## Mensagens {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint` lida com a verificação de checkpoint em Heimdall. Somente esta mensagem usa a codificação RLP pois precisa ser verificada na chain Ethereum.

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

Assim que esta transação é processada no Heimdall, o `proposer` pega em `votes` e `sigs` do Tendermint para esta transação e envia o checkpoint na chain Ethereum.

Como o bloco contém múltiplas transações e verifica esta transação em particular na chain Ethereum, é necessária a prova Merkle. Para evitar a verificação extra da prova Merkle no Ethereum, o Heimdall só permite uma transação no bloco se o tipo de transação for `MsgCheckpoint`

Para permitir este mecanismo, Heimdall define a transação `MsgCheckpoint` como uma transação de alto consumo de gás. Consulte [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

Esta transação armazenará o checkpoint proposto no estado `checkpointBuffer` em vez do estado real da lista de checkpoints.

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck` lida com a submissão de checkpoint com êxito. Aqui `HeaderBlock`está um balcão de checkpoint;

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

Para `TxHash` e `LogIndex` válidos para o checkpoint submetido, esta transação verifica o seguinte evento e valida o checkpoint no estado `checkpointBuffer`: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

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

Na verificação de eventos bem-sucedida, ele atualiza a contagem real do ponto de verificação, também conhecida `ackCount`e limpa o .`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

`MsgCheckpointNoAck` lida com checkpoints sem êxito ou proponentes off-line. Esta transação só é válida depois de `CheckpointBufferTime` ter passado dos seguintes eventos:

- Última transação `ack` com êxito
- Última transação `no-ack` com êxito

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

Esta transação dá o período limite para o proponente atual enviar checkpoint/ack, antes que Heimdall escolha um novo `proposer` para o próximo checkpoint.

## Parâmetros {#parameters}

O módulo checkpoint contém os seguintes parâmetros:

| Chave | Tipo | Valor padrão |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 * tempo.Segundo |


## Comandos CLI {#cli-commands}

### Params {#params}

Para imprimir todos os parâmetros:

```go
heimdallcli query checkpoint params --trust-node
```

Resultado esperado:

```yaml
checkpoint_buffer_time: 16m40s
```

### Enviar checkpoint {#send-checkpoint}

O comando seguinte envia a transação do checkpoint no Heimdall:

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### Enviar`ack`

O comando seguinte envia a transação do ack no Heimdall se o checkpoint for bem-sucedido no Ethereum:

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### Enviar`no-ack`

O comando seguinte envia a transação no-ack no Heimdall:

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## APIs REST {#rest-apis}

| Nome | Método | Endpoint |
|----------------------|------|------------------|
| Obter o estado atual do buffer do checkpoint | GET | /checkpoint/buffer |
| Obter as contagens checkpoint | GET | /checkpoint/count |
| Obter os detalhes do checkpoint por índice de bloco | GET | /checkpoint/headers/<header-block-index\> |
| Obter o checkpoint mais recente | GET | /checkpoint/latest-checkpoint |
| Obter os últimos detalhes no-ack | GET | /checkpoint/last-no-ack |
| Os detalhes do checkpoint para determinado bloco inicial e final | GET | /checkpoint/<start\>/<end\> |
| Checkpoint por número | GET | /checkpoint/<checkpoint-number\> |
| Todos os checkpoints | GET | /checkpoint/list |
| Obtene a contagem de ack, buffer, o conjunto de validadores, a contagem de validadores e os detalhes do último no-ack | GET | /resumo |


Todas as APIs de consulta fornecerão resultados no seguinte formato:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
