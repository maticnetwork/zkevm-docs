---
id: checkpoint
title: Denetim noktası
description: Kontrol noktası ile ilgili işlevleri yöneten modül
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Denetim noktası {#checkpoint}

`checkpoint` modülü, Heimdall için denetim noktası ile ilgili işlevleri yönetir. Denetim noktası kök hash’ini doğrulamak için Heimdall üzerinde yeni bir denetim noktası teklif edildiğinde Bor zincirine ihtiyaç duyar.

Kontrol noktası verisiyle ilgili tüm bilgiler [burada](/docs/pos/heimdall/checkpoint) ayrıntılı olarak açıklanmaktadır.

## Denetim noktası yaşam döngüsü {#checkpoint-life-cycle}

Heimdall bir sonraki öneriyi seçmek için Tendermint ile aynı lider seçim algoritmasını kullanır. Ethereum zinciri üzerinde denetim noktaları gönderilirken gaz limiti, Ethereum üzerindeki trafik, yüksek gaz ücretleri gibi çeşitli nedenlerden ötürü işlem başarısız olabilir. İşte bu yüzden, çok aşamalı denetim noktası işlemi gerekir.

Her kontrol noktasının öneren olarak doğrulayıcı vardır. Ethereum zincirinde kontrol noktası başarısız olursa veya başarılı olursa `ack`ve `no-ack`işlem bir sonraki kontrol noktası için Heimdall üzerindeki öneriyi değiştirecektir. Aşağıdaki akış şeması, kontrol noktasının yaşam döngüsünü temsil eder:

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## Mesajlar {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint`, Heimdall üzerinde denetim noktası doğrulamasıyla ilgilenir. Sadece bu mesaj Ethereum zincirinde doğrulanması gereken için RLP kodlamasını kullanır.

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

Bu işlem Heimdall üzerinde işleme alındıktan sonra `proposer` bu işlem için Tendermint’ten `votes` ve `sigs`’i alır ve Ethereum zinciri üzerinde denetim noktası gönderir.

Blok birden fazla işlem içerdiği ve bu belirli işlemi Ethereum zinciri üzerinde doğruladığı için Merkle kanıtı gerekir. Ethereum üzerinde ekstra Merkle kanıtı doğrulamasından kaçınmak üzere Heimdall, işlem türü `MsgCheckpoint` ise blokta yalnızca bir işleme izin verir

Bu mekanizmaya olanak vermek için Heimdall `MsgCheckpoint` işlemini yüksek gaz tüketilen işlem olarak ayarlar. [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106) adresine göz atın

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

Bu işlem, teklif edilen denetim noktasını gerçek denetim noktası liste durumu yerine `checkpointBuffer` durumunda tutar.

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck`, başarılı denetim noktası gönderimiyle ilgilenir. İşte bir kontrol noktası `HeaderBlock`tezgahı;

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

Gönderilen denetim noktası için geçerli `TxHash` ve `LogIndex` açısından bu işlem aşağıdaki olayı onaylar ve `checkpointBuffer` durumundaki denetim noktasını doğrular: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

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

Başarılı bir olay doğrulaması ile bu durum kontrol noktasının gerçek sayısını günceller, ayrıca bilinen `ackCount`ve temizler`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

`MsgCheckpointNoAck`, başarısız denetim noktalarıyla ya da çevrimdışı teklif sahipleriyle ilgilenir. Bu işlem ancak `CheckpointBufferTime` aşağıdaki olaylardan geçtikten sonra geçerli olur:

- Son başarılı `ack` işlemi
- Son başarılı `no-ack` işlemi

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

Bu işlem, Heimdall bir sonraki denetim noktası için yeni bir `proposer` seçmeden önce mevcut teklif sahibinin denetim noktasını/ack’yi göndermesi için zaman aşımı süresini verir.

## Parametreler {#parameters}

Denetim noktası modülü aşağıdaki parametreleri içerir:

| Anahtar | Tip | Varsayılan değer |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 * time.Second |


## CLI komutları {#cli-commands}

### Parametreler {#params}

Tüm parametreleri yazdırmak için:

```go
heimdallcli query checkpoint params --trust-node
```

Beklenen Sonuç:

```yaml
checkpoint_buffer_time: 16m40s
```

### Denetim noktasını gönderme {#send-checkpoint}

Aşağıdaki komut, Heimdall üzerinde denetim noktası işlemini gönderir:

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### Gönder`ack`

Aşağıdaki komut, denetim noktası Ethereum üzerinde başarılı olursa Heimdall üzerinde ack işlemini gönderir:

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### Gönder`no-ack`

Aşağıdaki komut, Heimdall üzerinde no-ack işlemini gönderir:

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## REST API’leri {#rest-apis}

| Ad | Yöntem | Bitiş noktası |
|----------------------|------|------------------|
| Güncel denetim noktası tampon durumunu alma | GET | /checkpoint/buffer |
| Denetim noktası sayısını alma | GET | /checkpoint/count |
| Blok dizinine göre denetim noktası ayrıntılarını alma | GET | /checkpoint/headers/<header-block-index\> |
| En son denetim noktasını alma | GET | /checkpoint/latest-checkpoint |
| En son no-ack ayrıntılarını alma | GET | /checkpoint/last-no-ack |
| Belirtilen başlangıç ve bitiş bloku için denetim noktası ayrıntıları | GET | /checkpoint/<start\>/<end\> |
| Sayıya göre denetim noktası | GET | /checkpoint/<checkpoint-number\> |
| Tüm denetim noktaları | GET | /checkpoint/list |
| Ack sayısı, tampon, doğrulayıcı kümesi, doğrulayıcı sayısı ve son no-ack ayrıntılarını alma | GET | /overview |


Tüm sorgu API'leri aşağıdaki formatta sonuç verecektir:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
