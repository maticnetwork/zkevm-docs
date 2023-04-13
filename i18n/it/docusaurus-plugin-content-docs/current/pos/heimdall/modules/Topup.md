---
id: topup
title: Topup
description: Una quantità che verrà utilizzata per pagare le tasse sulla catena di Heimdall
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Topup {#topup}

Heimdall Topup è un importo che verrà utilizzato per pagare le commissioni sulla catena di Heimdall.

Ci sono due modi per topup il tuo account:

1. Quando il nuovo validatore si unisce, possono menzionare una `topup`quantità come top up oltre alla quantità messa in punto, che verrà spostata come equilibrio sulla catena di Heimdall per pagare le tasse su Heimdall.
2. Un utente può chiamare direttamente la funzione di top up sullo smart contract di Ethereum per aumentare il saldo di top up su Heimdall.

## Messaggi {#messages}

### MsgTopup {#msgtopup}

La transazione `MsgTopup` è responsabile del minting del saldo a un indirizzo su Heimdall basato sul contratto di gestione dello staking su `TopUpEvent` della catena di Ethereum,

Il gestore di questa transazione elabora la ricarica e aumenta il saldo una sola volta per ogni dato `msg.TxHash` e `msg.LogIndex`. Genera un errore `Older invalid tx found`, se si tenta di elaborare la ricarica più di una volta.

Ecco la struttura di un messaggio di transazione di ricarica:

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### MsgWithdrawFee {#msgwithdrawfee}

La transazione `MsgWithdrawFee` è responsabile del prelievo del saldo da Heimdall alla catena Ethereum. Un validatore può prelevare qualsiasi importo da Heimdall.

L'handler elabora il prelievo sottraendo il saldo dal validatore dato e prepara lo stato per inviare il checkpoint successivo. Il prossimo checkpoint possibile conterrà il relativo stato di prelievo per lo specifico validatore.

Il gestore ottiene informazioni del validatore in base a `ValidatorAddress` e elabora il prelievo.

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## Comandi CLI {#cli-commands}

### Commissione di Topup {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### Commissione di prelievo {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

Per verificare la ricarica riflessa sull'account, esegui il comando seguente

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## API REST {#rest-apis}

| Nome | Metodo | URL | Parametri del corpo |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Commissione di Topup | POST | /topup/fee | `id` Id validatore, `tx_hash` Hash della transazione dell'evento di ricarica riuscito sulla catena di Ethereum `log_index` Indice di log dell'evento di ricarica emesso sulla catena di Ethereum |
| Commissione di prelievo | POST | /topup/withdraw | `amount` Importo del prelievo |
