---
id: topup
title: Mag-ulat

description: Isang halaga na gagamitin para magbabayad ng mga bayad sa Heimdall chain
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Mag-ulat
 {#topup}

Ang Heimdall Top Up ay isang halaga na gagamitin para magbayad ng mga bayarin sa Heimdall chain.

May dalawang paraan para i-topup ang iyong account:

1. Kapag sumali, puwede nilang banggitin ang isang `topup`halaga bilang top-up bilang karagdagan sa staked amount, na lilipat bilang balanse sa chain ng Heimdall para magbabayad ng mga bayad sa Heimdall.
2. Maaaring direktang tumawag ang isang user ng top-up function sa pag-stake ng smart contract sa Ethereum para dagdagan ang top-up balance sa Heimdall.

## Mga mensahe {#messages}

### MsgTopup {#msgtopup}

Ang `MsgTopup` na transaksyon ay responsable para sa pag-mint ng balanse sa isang address sa Heimdall na nakabatay sa `TopUpEvent` ng Ethereum chain sa kontrata ng manager.

Ang Handler para sa transaksyong ito ay nagpoproseso ng top-up at pinapataas ang balanse nang isang beses lamang para sa anumang ibinigay na `msg.TxHash` at `msg.LogIndex`. Nagiging dahilan ito ng `Older invalid tx found` na error, kung sinusubukang iproseso ang top-up nang higit sa isang beses.

Narito ang istraktura para sa top-up na mensahe ng transaksyon:

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### MsgWithdrawFee {#msgwithdrawfee}

Ang `MsgWithdrawFee` na transaksyon ay responsable para sa pag-withdraw ng balanse mula sa Heimdall patungo sa Ethereum chain. Ang isang Validator ay maaaring mag-withdraw ng anumang halaga mula sa Heimdall.

Pinoproseso ng handler ang pag-withdraw sa pamamagitan ng pagbabawas ng balanse mula sa ibinigay na validator at inihahanda ang state na ipadala ang susunod na checkpoint. Ang susunod na posibleng checkpoint ay maglalaman ng kaugnay na state ng pag-withdraw para sa partikular na validator.

`ValidatorAddress`Ang Handler ay makakakuha i-withdraw na impormasyon batay sa at pinoproseso ang withdraw.

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## Mga CLI Command {#cli-commands}

### Topup bayad {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### Bayad sa pag-withdraw {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

Upang suriin ang reflected na topup sa account, patakbuhin ang sumusunod na command

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## Mga REST API {#rest-apis}

| Pangalan | Pamamaraan | URL | Mga Body Param |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Bayad sa Topup | POST | /topup/fee | `id` Validator id, `tx_hash` Transaksyon nahash ng matagumpay na topup na event sa Ethereum chain, `log_index` Log index ng topup na inilalabas sa Ethereum chain |
| Bayad sa Pag-withdraw | POST | /topup/withdraw | `amount` I-withdraw ang halaga |
