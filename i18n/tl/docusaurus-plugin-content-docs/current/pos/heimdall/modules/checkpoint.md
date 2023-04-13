---
id: checkpoint
title: Checkpoint
description: Module na namamahala ng mga function na may kaugnayan sa checkpoint
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Checkpoint {#checkpoint}

`checkpoint`pinapamahalaan ng modyul ang mga function na nauugnay sa checkpoint para sa Heimdall. Kailangan nito ng Bor chain kapag may iminungkahi na bagong checkpoint sa Heimdall para i-verify ang checkpoint root hash.

Ipinaliwanag ang lahat na may kinalaman sa data ng checkpoint sa mga detalye [dito](/docs/pos/heimdall/checkpoint).

## Siklo ng buhay ng checkpoint {#checkpoint-life-cycle}

Ginagamit ng Heimdall ang parehong leader selection algorithm bilang Tendermint para piliin ang susunod na proposer. Habang nagsusumite ng mga checkpoint sa Ethereum chain, maaari itong mabigo dahil sa maraming dahilan tulad ng limitasyon sa gas, trapiko sa Ethereum, mataas na bayad sa gas. Iyon ang dahilan kung bakit kinakailangan ang proseso ng multi-stage na checkpoint.

May validator ang bawat checkpoint bilang tagapanukala. Kung nabigo ang checkpoint sa Ethereum chain o nagtagumpay, `ack`at babaguhin ng `no-ack`transaksyon ang tagapanukala sa Heimdall para sa susunod na checkpoint. Ang sumusunod na flow chart ay kumakatawan sa life cycle ng checkpoint:

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## Mga mensahe {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint`pinangangasiwaan ang pag-verify ng checkpoint sa Heimdall. Ginagamit lamang ng mensaheng ito ang pag-encode ng RLP dahil kailangang ma-verify ito sa Ethereum chain.

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

`proposer`Kapag naproseso na ang transaksyong ito sa Heimdall, ang pagkuha `votes`at mula `sigs`sa Tendermint para sa transaksyong ito at nagpapadala ng checkpoint sa Ethereum chain.

Dahil ang block ay naglalaman ng maramihang transaksyon at bini-verify ang partikular na transaksyong ito sa Ethereum chain, kinakailangan ng Merkle proof. Para maiwasan ang karagdagang pag-verify sa Merkle proof sa Ethereum, pinapayagan lang ng Heimdall ang isang transaksyon sa block kung ang uri ng transaksyon ay `MsgCheckpoint`

Upang payagan ang mekanismong ito, itinatakda ng Heimdall ang `MsgCheckpoint` na transaksyon bilang transaksyong mataas ang kinokunsumong gas. Tingnan ang [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

Ang transaksyong ito ay mag-iimbak ng iminungkahing checkpoint sa `checkpointBuffer` na state sa halip na sa aktwal na checkpoint list na state.

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck`humahawak ng matagumpay na pagsusumite ng checkpoint. Narito `HeaderBlock`ang isang checkpoint counter;

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

`LogIndex`Para sa wastong `TxHash`at para sa checkpoint na isinumite ng transaksyon na ito, pinapatunayan ng transaksyong ito ang kaganapan at pinapatunayan ang checkpoint sa kalagayan ng `checkpointBuffer`estado: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

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

Sa matagumpay na pag-verify ng kaganapan, ina-update nito ang aktwal na pagbilang ng checkpoint, na kilala rin `ackCount`at nililimitahan ang .`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

Ang `MsgCheckpointNoAck` ay nangangasiwa ng mga hindi matagumpay na checkpoint o mga offline na proposer. Ang transaksyon na ito ay may bisa lamang pagkatapos ng `CheckpointBufferTime` na lumipas mula sa mga sumusunod na event:

- Huling matagumpay na `ack` na transaksyon
- Huling matagumpay na `no-ack` na transaksyon

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

Binibigyan ng transaksyong ito ang panahon ng timeout para sa kasalukuyang proposer na magpadala ng checkpoint/ack bago pumili ang Heimdall ng bagong `proposer` para sa susunod na checkpoint.

## Mga Parameter {#parameters}

Ang module ng checkpoint ay naglalaman ng mga sumusunod na parameter:

| Key | Uri | Default na value |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 oras.Ikalawa |


## Mga CLI Command {#cli-commands}

### Params {#params}

Para i-print ang lahat ng params:

```go
heimdallcli query checkpoint params --trust-node
```

Mga Inaasahang Resulta:

```yaml
checkpoint_buffer_time: 16m40s
```

### Magpadala ng checkpoint {#send-checkpoint}

Ang sumusunod na command ay nagpapadala ng checkpoint na transaksyon sa Heimdall:

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### Ipadala ang`ack`

Ang pagsunod sa command ay nagpapadala ng transaksyon ng ack sa Heimdall kung matagumpay ang checkpoint sa Ethereum:

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### Ipadala ang`no-ack`

Kasunod na utos na magpadala ng walang-ack na transaksyon sa Heimdall:

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## Mga REST API {#rest-apis}

| Pangalan | Pamamaraan | Endpoint |
|----------------------|------|------------------|
| Kumuha ng kasalukuyang buffer state ng checkpoint | GET | /checkpoint/buffer |
| Kumuha ng mga count ng checkpoint | GET | /checkpoint/count |
| Kumuha ng mga detalye ng checkpoint sa pamamagitan ng block index | GET | /checkpoint/headers/<header-block-index\> |
| Kumuha ng pinakahuling checkpoint | GET | /checkpoint/latest-checkpoint |
| Kumuha ng mga pinakahuling detalye ng no-ack | GET | /checkpoint/last-no-ack |
| Mga detalye ng checkpoint para sa ibinigay na simula at pagtatapos na block | GET | /checkpoint/<start\><end\> |
| Checkpoint ayon sa numero | GET | /checkpoint/<checkpoint-number\> |
| Lahat ng mga checkpoint | GET | /checkpoint/list |
| Kumuha ng mga detalye ng ack count, buffer, validator set, validator count at last-no-ack | GET | Pangkalahatang-ideya |


Magkakaloob ang lahat ng query API ng resulta sa sumusunod na format:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
