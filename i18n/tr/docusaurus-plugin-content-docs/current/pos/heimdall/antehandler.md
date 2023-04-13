---
id: antehandler
title: Ante işleyicisi
description: Ante Handler işlemi kontrol eder ve doğrular
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Ante işleyicisi {#ante-handler}

Ante işleyicisi, işlemi kontrol eder ve doğrular. Doğrulamanın ardından, yeterli ücret için göndericinin bakiyesini kontrol eder ve işlem başarıyla dâhil edilirse ücretleri keser.

## Gaz limiti {#gas-limit}

Her blok ve işlemin gaz kullanımı için bir limiti vardır. Bir blok birden fazla işlem içerebilir, ancak bir bloktaki tüm işlemlerin kullandığı gaz daha büyük blokları önlemek için blok gaz sınırından daha az olmalıdır.

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

İşlem için imza doğrulaması dâhil olmak üzere, işlem üzerindeki her durum değişikliğinin gaz maliyeti olduğunu unutmayın.

### Blok gaz limiti {#block-gas-limit}

Maksimum blok gaz limiti ve blok başına bayt, uygulamanın konsensüs parametreleri ayarlanırken belirlenir: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471)

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

### İşlem gaz limiti {#transaction-gas-limit}

İşlem gaz limiti, `auth` modulündeki parametrelerde tanımlanır. Heimdall `gov` modülü üzerinden değiştirilebilir.

### Checkpoint İşlem Gaz Limiti {#checkpoint-transaction-gas-limit}

Blok birden fazla işlem içerdiği ve bu belirli işlemi Ethereum zinciri üzerinde doğruladığı için Merkle kanıtı gerekir. Denetim noktası işlemi için ekstra Merkle kanıtı doğrulamasından kaçınmak üzere Heimdall, işlem türü `MsgCheckpoint` ise blokta yalnızca bir işleme izin verir

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## İşlem doğrulaması ve yeniden oynatma koruması {#transaction-verification-and-replay-protection}

Ante işleyicisi, gelen işlemdeki imzayı işler ve doğrular: [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)

Tekrar oynatma saldırılarından kaçınmak için her işlem `sequenceNumber` içermelidir. Her işlem başarıyla dâhil edildikten sonra Ante işleyicisi önceki işlemlerin tekrarlanmasını (tekrar oynatmayı) önlemek üzere TX gönderici hesabı için sıra numarasını artırır.