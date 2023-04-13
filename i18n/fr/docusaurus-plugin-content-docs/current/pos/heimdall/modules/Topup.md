---
id: topup
title: Recharge
description: Un montant qui sera utilisé pour payer des frais sur la chaîne Heimdall
keywords:
  - docs
  - matic
  - topup
  - fees
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Recharge {#topup}

La recharge de Heimdall est un montant qui sera utilisé pour payer les frais sur la chaîne de Heimdall.

Il existe deux façons de recharger votre compte:

1. Lorsque un nouveau validateur se joigne, il peut mentionner un montant comme complément en plus du `topup`montant piqué, qui sera déplacé comme solde sur la chaîne Heimdall pour payer des frais sur Heimdall.
2. Un utilisateur peut appeler directement la fonction de recharge sur le contrat intelligent d'empilage sur Ethereum pour augmenter le solde de recharge sur Heimdall.

## Messages {#messages}

### MsgTopup {#msgtopup}

`MsgTopup`La transaction est chargée de frapper la balance vers une adresse sur Heimdall en fonction de la balance de la chaîne Ethereum `TopUpEvent`sur le contrat gestionnaire du staking .

Le gestionnaire de cette transaction traite le rechargement et augmente la balance une seule fois pour tout `msg.TxHash` et `msg.LogIndex`. Si vous essayez de traiter la recharge plus d'une fois, vous obtenez `Older invalid tx found`une erreur .

Voici la structure du message de la transaction de rechargement:

```go
type MsgTopup struct {
	FromAddress types.HeimdallAddress `json:"from_address"`
	ID          types.ValidatorID     `json:"id"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

### MsgWithdrawFee {#msgwithdrawfee}

`MsgWithdrawFee`La transaction  est chargée de retirer la balance de Heimdall vers la chaîne Ethereum. Un Validateur peut retirer n'importe quel montant de Heimdall.

Le gestionnaire traite le retrait en déduisant la balance du validateur donné et prépare l'état pour envoyer le prochain point de contrôle. Le prochain point de contrôle possible contiendra l'état relatif au retrait pour le validateur spécifique.

Le gestionnaire obtient des informations sur le validateur en fonction de `ValidatorAddress` et procède au retrait.

```go
// MsgWithdrawFee - high-level transaction of the fee coin withdrawal module
type MsgWithdrawFee struct {
	ValidatorAddress types.HeimdallAddress `json:"from_address"`
	Amount           types.Int             `json:"amount"`
}
```

## Commandes CLI {#cli-commands}

### Frais de recharge {#topup-fee}

```bash
heimdallcli tx topup fee
	--log-index <log-index>
	--tx-hash <transaction-hash>
	--validator-id <validator ID here>
	--chain-id <heimdall-chain-id>
```

### Frais de retrait {#withdraw-fee}

```bash
heimdallcli tx topup withdraw --chain-id <heimdall-chain-id>
```

Pour vérifier la recharge effective du compte, exécutez la commande suivante

```bash
heimdallcli query auth account <validator-address> --trust-node
```

## API de REST {#rest-apis}

| Nom | Méthode | URL | Paramètres du Corps |
|----------------------|------|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
| Frais de recharge | POST | /topup/fee | `id`Identifiant du validateur , `tx_hash`Identifiant de transaction de l'événement de recharge réussi sur la chaîne Ethereum, `log_index`Index de journal de l'événement  de recharge émis sur la chaîne Ethereum |
| Frais de Retrait | POST | /topup/withdraw | `amount` Montant du retrait |
