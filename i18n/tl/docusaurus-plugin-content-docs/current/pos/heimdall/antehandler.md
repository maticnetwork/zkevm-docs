---
id: antehandler
title: Ante handler
description: Sinusuri ng Ante Handler ang transaksyon
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Ante handler {#ante-handler}

Sinusuri at pinapatunayan ng ante handler ang transaksyon. Pagkatapos ng pagbe-verify, sinusuri nito ang balanse ng nagpadala para sa sapat na bayad at ibabawas ang bayad sa kaso ng matagumpay na inklusyon ng transaksyon.

## limitasyon ng Gas {#gas-limit}

Ang bawat bloke at transaksyon ay may limitasyon para sa paggamit ng gas. Maaaring maglaman ang isang block ng maraming transaksyon, ngunit ang gas na ginamit ng lahat ng transaksyon sa isang block ay dapat na mas mababa sa limitasyon ng gas ng block para maiwasan ang mas malalaking mga block.

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

Tandaan na ang bawat pagmamanipula ng estado sa transaksyon ay nagkakahalaga ng gas, kasama ang signature verification para sa transaksyon.

### Limitasyon ng gas kada block {#block-gas-limit}

Ang max block na limitasyon ng gas at byte bawat bloke ay ipinapasa habang nagse-set up ng mga consensus params ng: [https://github.com/maticnetwork/heimdall/blob/develop/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

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

### Limitasyon ng transaksyon ng gas {#transaction-gas-limit}

Transaksyon gas limitasyon ay tinutukoy sa pamamagitan ng mga params sa `auth`modyul. Maaari itong baguhin sa pamamagitan Heimdall `gov`modyul.

### Limitahan ang Checkpoint ng Gas {#checkpoint-transaction-gas-limit}

Dahil ang block ay naglalaman ng maraming transaksyon at bini-verify ang partikular na transaksyong ito sa Ethereum chain, kailangan ng Merkle proof. Upang maiwasan ang karagdagang Merkle proof na pag-verify para sa checkpoint na transaksyon, pinapayagan lang ng Heimdall ang isang transaksyon sa block kung ang uri ng transaksyon ay.`MsgCheckpoint`

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## Pag-verify ng transaksyon at proteksyon sa replay {#transaction-verification-and-replay-protection}

Pinangangasiwaan at bini-verify ng Ante handler ang mga lagda sa papasok na: [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

Ang bawat transaksyon ay dapat may kasamang `sequenceNumber`upang maiwasan ang muling pag-atake. Pagkatapos ng bawat matagumpay na inklusyon ng transaksyon, pinapataas ng Ante handler ang sequence number para sa TX sender account upang maiwasan ang pagdoble (replay) ng mga nakaraang transaksyon.