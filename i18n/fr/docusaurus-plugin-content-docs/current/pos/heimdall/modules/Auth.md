---
id: auth
title: Auth
description: Module pour spécifier les transactions de base et les types de compte
keywords:
  - docs
  - matic
  - auth module
  - transaction
  - account types
image: https://matic.network/banners/matic-network-16x9.png
---
# Module Auth {#auth-module}

Ce document décrit le `auth`module de Heimdall.

Le `auth` module est responsable pour la spécification de la base de transaction et les types de comptes pour une application. Il contient le gestionnaire d'ante, dans lequel toutes les vérifications de validité de la base des transactions (les signatures, les numéros utilisés une fois [nonces], les champs auxiliaires) sont effectuées, et cela expose le gardien du compte, ce qui permet à d'autres modules de lire, écrire et modifier les comptes.

## Gaz et Frais {#gas-and-fees}

Les frais servent deux objectifs pour un opérateur du réseau.

Les frais limitent la croissance de l'état stocké par chaque nœud complet et permettent une censure pour une raison générale des transactions de faible valeur économique. Les frais sont mieux adaptés comme un mécanisme anti-spam dans lequel les validateurs sont désintéressés par l'utilisation du réseau et les identités des utilisateurs.

Étant donné que Heimdall ne prend pas en charge le contrat ou le code personnalisé pour aucune transaction, il utilise des transactions à coûts fixes. Pour les transactions à coût fixe, le validateur peut recharger son compte sur la chaîne Ethereum et obtenir des jetons sur Heimdall en utilisant le module de [recharge](Topup.md).

## Types {#types}

Outre les comptes (spécifiés dans l'État), les types exposés par le module auth sont **StdSignature****,** la combinaison d'une clé publique facultative et d'une signature cryptographique comme un tableau d'octets, **StdTx**, une struct qui implémente `sdk.Tx`l'interface avec StdSignature et S**tdSignDoc,** une structure de prévention de replay-prevention pour S**tdTx **que les expéditeurs de transaction doivent signer over.

### StdSignature {#stdsignature}

Un `StdSignature` correspond aux types de tableau d'octet.

```go
// StdSignature represents a sig
type StdSignature []byte
```

### StdTx {#stdtx}

Un `StdTx` est une structure qui met en oeuvre l'interface `sdk.Tx`, et qui est susceptible d'être suffisamment générique pour servir les objectifs de nombreux types de transactions.

```go
type StdTx struct {
		Msg       sdk.Msg      `json:"msg" yaml:"msg"`
		Signature StdSignature `json:"signature" yaml:"signature"`
		Memo      string       `json:"memo" yaml:"memo"`
}
```

### StdSignDoc {#stdsigndoc}

Un `StdSignDoc` est une structure de prévention de reprise à signer, qui s'assure que toute transaction soumise (étant une simple signature sur une chaîne d'octet particulière) ne sera exécutable qu'une seule fois sur Heimdall.

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

### Compte {#account}

Il gère les adresses, les pièces et les numéros utilisés une fois (nonce) pour les transactions. Il signe et valide aussi les transactions.

Source: [https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54](https://github.com/maticnetwork/heimdall/blob/master/auth/types/account.go#L32-L54)

```go
type BaseAccount struct {
		Address types.HeimdallAddress `json:"address" yaml:"address"`
		Coins types.Coins `json:"coins" yaml:"coins"`
		PubKey crypto.PubKey `json:"public_key" yaml:"public_key"`
		AccountNumber uint64 `json:"account_number" yaml:"account_number"`
		Sequence uint64 `json:"sequence" yaml:"sequence"`
}
```

## Paramètres {#parameters}

Le module d'authentification contient les paramètres suivants:

| Clé | Type | Valeur par défaut |
|----------------------|------|------------------|
| MaxMemoCharacters | uint64 | 256 |
| TxSigLimit | uint64 | 7 |
| TxSizeCostPerByte | uint64 | 10 |
| SigVerifyCostED25519 | uint64 | 590 |
| SigVerifyCostSecp256k1 | uint64 | 1000 |
| DefaultMaxTxGas | uint64 | 1 000 000 |
| DefaultTxFees | chaîne de caractères | « 1000000000000000 » |


## Les Commandes CLI {#cli-commands}

### Affichez le compte {#show-account}

Pour imprimer des données liées au compte dans Heimdall;

```bash
heimdalld show-account
```

Résultat Attendu:

```json
{
	"address": "0x68243159a498cf20d945cf3E4250918278BA538E",
	"pub_key": "0x040a9f6879c7cdab7ecc67e157cda15e8b2ddbde107a04bc22d02f50032e393f6360a05e85c7c1ecd201ad30dfb886af12dd02b47e4463f6f0f6f94159dc9f10b8"
}
```

### Détails du compte et des pièces {#account-and-coin-details}

Pour afficher les détails du compte, les pièces, la séquence et le numéro de compte ;

```bash
heimdallcli query auth account 0x68243159a498cf20d945cf3E4250918278BA538E --trust-node
```

Résultat Attendu:

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

### Paramètres {#parameters-1}

Pour imprimer tous les params;

```go
heimdallcli query auth params
```

Résultat Attendu:

```go
max_memo_characters: 256
tx_sig_limit: 7
tx_size_cost_per_byte: 10
sig_verify_cost_ed25519: 590
sig_verify_cost_secp256k1: 1000
max_tx_gas: 1000000
tx_fees: "1000000000000000"
```

## API de REST {#rest-apis}

| Nom | Point de terminaison | Description |
|----------------------|--------|------------------|
| Détails du compte | /auth/accounts/{addresse} | Retourne tous les détails pour une adresse |
| Détails de la séquence du compte | /auth/accounts/{addresse}/sequence | Retourne uniquement les détails nécessaires pour la signature |
| Params d'authentification | /auth/params | Retourne toutes les utilisations de module d'authentification de params |
