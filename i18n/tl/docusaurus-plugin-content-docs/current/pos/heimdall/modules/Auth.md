---
id: auth
title: Auth
description: Module para sa pagtukoy ng mga base transaksyon at mga uri ng account
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# Module ng Auth {#auth-module}

Inilalarawan ng dokumentong ito ang `auth`module ng Heimdall.

Ang `auth`module ay may pananagutan para sa pagtukoy ng base na transaksyon at mga uri ng account para sa isang aplikasyon. Naglalaman ito ng ante handler, kung saan ang lahat ng pangunahing pagsusuri sa validity ng transaksyon (mga lagda, nonces, mga auxiliary field) ay ginagawa, at inilalantad ang keeper ng account, na nagpapahintulot sa iba pang mga module na magbasa, magsulat, at magbago ng mga account.

## Gas at Mga Bayarin {#gas-and-fees}

Ang mga bayarin ay nagsisilbi ng dalawang layunin para sa isang operator ng network.

Nililimitahan ng mga bayarin ang paglago ng state na nakaimbak ng bawat buong node at nagbibigay-daan para sa pangkalahatang layunin na censorship ng mga transaksyon na may maliit na ekonomikong value. Ang mga bayarin ay pinakaangkop bilang isang anti-spam na mekanismo kung saan ang mga validator ay walang interes sa paggamit ng network at pagkakakilanlan ng mga user.

Dahil hindi sinusuportahan ng Heimdall ang custom na kontrata o code para sa anumang transaksyon, gumagamit ito ng mga nakapirming transaksyon sa gastos. Para sa mga transaksyon sa fixed cost, maaaring i-top up ng validator ang kanilang mga account sa Ethereum chain at makakuha ng mga token sa Heimdall gamit ang [Topup](Topup.md) module.

## Mga Uri {#types}

Bukod sa mga account (na tinukoy sa State), ang mga tipong nakalantad ng auth module ay **ang** **StdSignature****,** ang kumbinasyon ng isang opsyonal na public key at isang cryptographic signature bilang isang byte array, StdTx, isang struct na nagpapatupad ng `sdk.Tx`interface gamit ang StdSignature, at S**tdSignDoc,** isang replay-prevention structure para sa S**tdTx **na dapat mag-sign over.

### StdSignature {#stdsignature}

Ang A `StdSignature` ay ang mga uri ng isang byte array.

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

Ang A `StdTx` ay isang struct na nagpapatupad ng `sdk.Tx` na interface, at malamang na sapat na generic upang maihatid ang mga layunin ng maraming uri ng mga transaksyon.

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

Ang A `StdSignDoc` ay isang replay-prevention structure na lalagdaan, na nagsisiguro na ang anumang isinumiteng transaksyon (na simpleng lagda sa isang partikular na byte string) ay isasagawa lamang nang isang beses sa isang Heimdall.

```go
// StdSignDoc is replay-prevention structure.
// It includes the result of msg.GetSignBytes(),
// as well as the ChainID (prevent cross chain replay)
// and the Sequence numbers for each signature (prevent
// inchain replay and enforce tx ordering per account).
type StdSignDoc struct {
	ChainID       string          `json:"chain_id" yaml:"chain_id"`
	AccountNumber uint64          `json:"account_number" yaml:"account_number"`
	Sequence      uint64          `json:"sequence" yaml:"sequence"`
	Msg           json.RawMessage `json:"msg" yaml:"msg"`
	Memo          string          `json:"memo" yaml:"memo"`
}
```

### Account {#account}

Pinamamahalaan nito ang mga address, mga coin at nonce para sa mga transaksyon. Ito rin ay lumalagda at nagba-validate ng mga transaksyon.

Pinagmulan: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

```go
type BaseAccount struct {
		Address types.HeimdallAddress `json:"address" yaml:"address"`
		Coins types.Coins `json:"coins" yaml:"coins"`
		PubKey crypto.PubKey `json:"public_key" yaml:"public_key"`
		AccountNumber uint64 `json:"account_number" yaml:"account_number"`
		Sequence uint64 `json:"sequence" yaml:"sequence"`
}
```

## Mga Parameter {#parameters}

Ang auth module ay naglalaman ng mga sumusunod na parameter:

| Key | Uri | Default na value |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSigLimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1000000 |
| DefaultTxFees | string | "1000000000000000" |


## Mga CLI Command {#cli-commands}

### Ipakita ang account {#show-account}

Para mag-print ng data na may kaugnayan sa account sa Heimdall;

```bash
heimdalld show-account
```

Mga Inaasahang Resulta:

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### Mga detalye ng account at barya {#account-and-coin-details}

Para ipakita ang mga detalye ng account, coins, sequence at numero ng account;

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

Mga Inaasahang Resulta:

```json
address: 0x68243159a498cf20d945cf3e4250918278ba538e
coins:
- denom: matic
    amount:
    i: "1000000000000000000000"
pubkey: ""
accountnumber: 0
sequence: 0
```

### Mga Parameter {#parameters-1}

Para i-print ang lahat ng param;

```go
heimdallcli query auth params
```

Mga Inaasahang Resulta:

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## Mga REST API {#rest-apis}

| Pangalan | Endpoint | Paglalarawan |
|----------------------|--------|------------------|
| Mga detalye ng account | /auth/accounts/{address} | Ibinabalik ang lahat ng detalye para sa isang address |
| Mga detalye ng sequence ng account | /auth/accounts/{address}/sequence | Ibinabalik lamang ang mga kinakailangang detalye para sa paglagda |
| Mga params ng Auth | /auth/params | Ibinabalik ang lahat ng ginagamit ng params auth module |
