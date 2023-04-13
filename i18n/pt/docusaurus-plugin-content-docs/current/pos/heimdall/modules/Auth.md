---
id: auth
title: Auth
description: Módulo para especificar tipos de transação de base e conta
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# Módulo de autos {#auth-module}

Este documento descreve o `auth`módulo do Heimdall.

O módulo `auth` é responsável por especificar a transação base e os tipos de conta para uma aplicação. Contém o ante handler, onde todas as verificações básicas de validade das transações (assinaturas, nonces, campos auxiliares) são executadas, e expõe o gestor da conta, o que permite que outros módulos leiam, escrevam e modifiquem as contas.

## Gás e taxas {#gas-and-fees}

As taxas servem duas finalidades para um operador da rede.

As taxas limitam o crescimento do estado armazenado por todos os nós completos e permitem a censura geral das transações de baixo valor económico. As taxas são mais adequadas como mecanismo anti-spam, em que os validadores não estão interessados na utilização da rede e nas identidades dos utilizadores.

Como o Heimdall não suporta contrato ou código personalizado para nenhuma transação, ele usa transações de custo fixo. Para transações de custo fixo, o validador pode completar as suas contas na chain Ethereum e obter tokens na Heimdall usando o módulo [Topup](Topup.md).

## Tipos {#types}

Além de contas (especificadas no Estado), os tipos expostos pelo módulo de autenticação são **o** **StdSignature**, a combinação de uma chave pública opcional e uma assinatura criptográfica como array de byte, o StdTx, uma estrutura que implementa a `sdk.Tx`interface usando **o** StdSignature, e o S**tdSignDoc,** uma estrutura de prevenção de repetições para o S**tdTx **que os remetentes de transação devem assinar.

### StdSignature {#stdsignature}

Uma `StdSignature` é os tipos de um array de bytes.

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

O `StdTx` é uma estrutura que implementa a interface `sdk.Tx`  e é provável que seja suficientemente genérico para servir os propósitos de muitos tipos de transações.

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

O `StdSignDoc` é uma estrutura de prevenção de repetições a ser assinada, o que garante que qualquer transação enviada (que é simplesmente a assinatura sobre um determinado string de bytes) seja executável apenas uma vez numa Heimdall.

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

### Conta {#account}

Gere endereços, moedas e nonce para transações. Também assina e valida as transações.

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

## Parâmetros {#parameters}

O módulo auth contém os seguintes parâmetros:

| Chave | Tipo | Valor padrão |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSigLimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1000000 |
| DefaultTxFees | string | "1000000000000000" |


## Comandos CLI {#cli-commands}

### Mostrar conta {#show-account}

Para imprimir dados relacionados com a conta no Heimdall;

```bash
heimdalld show-account
```

Resultado esperado:

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### Detalhes da conta e da moeda {#account-and-coin-details}

Para exibir detalhes da conta, moedas, sequência e número da conta;

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

Resultado esperado:

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

### Parâmetros {#parameters-1}

Para imprimir todos os parâmetros;

```go
heimdallcli query auth params
```

Resultado esperado:

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## APIs REST {#rest-apis}

| Nome | Endpoint | Descrição |
|----------------------|--------|------------------|
| Detalhes da conta | /auth/accounts/{address} | Retorna todos os detalhes de um endereço |
| Detalhes da sequência da conta | /auth/accounts/{address}/sequence | Retorna apenas os detalhes necessários para assinar |
| Parâmetros Auth | /auth/params | Retorna todos os parâmetros que o módulo auth usa |
