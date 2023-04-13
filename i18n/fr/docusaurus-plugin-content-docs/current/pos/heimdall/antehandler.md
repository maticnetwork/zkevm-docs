---
id: antehandler
title: Gestionnaire d'Ante
description: Ante Handler vérifie et valide la transaction
keywords:
  - docs
  - matic
  - polygon
  - Ante Handler
  - validate transactions
image: https://matic.network/banners/matic-network-16x9.png
---

# Gestionnaire d'Ante {#ante-handler}

Le gestionnaire d'Ante vérifie et valide la transaction. Après la vérification, il s'assure que la balance de l'expéditeur ait suffisamment de frais et déduit les frais en cas d'inclusion de transaction réussie.

## Limite de gaz {#gas-limit}

Chaque bloc et transaction a une limite de gaz pour l'usage. Un bloc peut contenir plusieurs transactions, mais le gaz utilisé par toutes les transactions dans un bloc doit être inférieur à la limite de gaz de bloc pour éviter les blocs plus grands.

```go
block.GasLimit >= sum(tx1.GasUsed + tx2.GasUsed + ..... + txN.GasUsed)
```

Remarquez que chaque manipulation d'état de transaction coûte du gaz, y compris la vérification de signature pour la transaction.

### Limite de gaz du bloc {#block-gas-limit}

La limite maximum de gaz et d'octets par bloc est calculée tout en configurant les params de consensus de l'application: [https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471](https://github.com/maticnetwork/heimdall/blob/develop/app/app.go#L464-L471) 

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

### Limite de gaz de transaction {#transaction-gas-limit}

La limite de gaz de transaction est définie en params dans le `auth`module. Il peut être modifié par le module de `gov` Heimdall.

### Limite de gaz de transaction {#checkpoint-transaction-gas-limit}

Puisque le bloc contient plusieurs transactions et vérifie cette transaction particulière sur la chaîne Ethereum, une preuve de Merkle est nécessaire. Pour éviter de vérifier la preuve supplémentaire de Merkle pour la transaction de point de contrôle, Heimdall n'autorise qu'une seule transaction dans le bloc si le type de transaction est `MsgCheckpoint`

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000 // 10 Million

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

## Vérification de transaction et reprise de protection {#transaction-verification-and-replay-protection}

Le gestionnaire d'Ante gère et vérifie la signature dans la transaction entrante: [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L230-L266)    

Chaque transaction doit inclure `sequenceNumber`pour éviter des reprises d'attaques. Après chaque inclusion de transaction réussie, le gestionnaire d'Ante augmente le numéro de séquence pour le compte d'expéditeur TX pour éviter la duplication (reprise) des transactions précédentes.