---
id: auth
title: Auth
description: Modulo per specificare i tipi di transazione e account
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# Modulo Auth {#auth-module}

Questo documento descrive il `auth`modulo di Heimdall.

Il modulo `auth` è responsabile della specifica della transazione di base e dei tipi di account per un'applicazione. Contiene il gestore ante, dove vengono eseguiti tutti i controlli di validità delle transazioni di base (firme, nonces, campi ausiliari), ed espone il custode dell'account, che consente ad altri moduli di leggere, scrivere e modificare gli account.

## Gas e commissioni {#gas-and-fees}

Le commissioni servono a due scopi per un operatore della rete.

Le commissioni limitano la crescita dello stato immagazzinata da ogni nodo completo e consentono la censura generale di transazioni di scarso valore economico. Le commissioni sono più adatte come meccanismo anti-spam in cui i validatori sono disinteressati all'uso della rete e alle identità degli utenti.

Poiché Heimdall non supporta contratto o codice personalizzato per nessuna transazione, utilizza transazioni a costo fisso. Per le transazioni a costo fisso, il validatore può ricaricare i propri account sulla catena di Ethereum e ottenere token su Heimdall utilizzando il modulo [Topup](Topup.md).

## Tipi {#types}

Oltre agli account (specificati in Stato), i tipi esposti dal modulo auth sono **StdSignature**, la combinazione di una chiave pubblica facoltativa e una firma crittografica come un byte array, **StdTx**, una costruzione che implementa `sdk.Tx`l'interfaccia utilizzando **StdSignature,** e S**tdSignDoc,** una struttura di replay-prevention per S**tdTx **che mittente delle transazioni deve firmare.

### StdSignature {#stdsignature}

Un `StdSignature` sono i tipi di un array di byte.

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

Un `StdTx` è una struttura che implementa l'interfaccia `sdk.Tx` ed è probabile che sia sufficientemente generica da servire agli scopi di molti tipi di transazioni.

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

Un `StdSignDoc` è una struttura di prevenzione della riproduzione da firmare, che garantisce che qualsiasi transazione inviata (che è semplicemente una firma su una particolare stringa di byte) sarà eseguibile solo una volta su un Heimdall.

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

Gestisce indirizzi, monete e nonce per le transazioni. Inoltre firma e convalida le transazioni.

Fonte: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

```go
type BaseAccount struct {
		Address types.HeimdallAddress `json:"address" yaml:"address"`
		Coins types.Coins `json:"coins" yaml:"coins"`
		PubKey crypto.PubKey `json:"public_key" yaml:"public_key"`
		AccountNumber uint64 `json:"account_number" yaml:"account_number"`
		Sequence uint64 `json:"sequence" yaml:"sequence"`
}
```

## Parametri {#parameters}

Il modulo auth contiene i seguenti parametri:

| Chiave | Tipo | Valore predefinito |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSigLimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1000000 |
| DefaultTxFees | stringa | "1000000000000000" |


## Comandi CLI {#cli-commands}

### Mostra l'account {#show-account}

Per stampare i dati relativi all'account in Heimdall;

```bash
heimdalld show-account
```

Risultato previsto:

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### Dettagli su account e monete {#account-and-coin-details}

Per visualizzare i dettagli dell'account, le monete, la sequenza e il numero dell'account;

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

Risultato previsto:

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

### Parametri {#parameters-1}

Per stampare tutte le parametri;

```go
heimdallcli query auth params
```

Risultato previsto:

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## API REST {#rest-apis}

| Nome | Endpoint | Descrizione |
|----------------------|--------|------------------|
| Dettagli dell'account | /auth/accounts/{address} | Restituisce tutti i dettagli per un indirizzo |
| Dettagli della sequenza dell'account | /auth/account/{address}/sequenza | Restituisce solo i dettagli necessari per la firma |
| Parametri Auth | /auth/params | Restituisce tutti i parametri che utilizza il modulo auth |
