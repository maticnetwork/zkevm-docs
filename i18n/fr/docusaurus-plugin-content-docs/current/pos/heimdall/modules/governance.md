---
id: governance
title: Gouvernance
sidebar_label: Governance
description: Système avec un jeton 1 - 1 base de vote
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Gouvernance {#governance}

La gouvernance Heimdall fonctionne exactement comme le [module `x/gov`Cosmos-sdk.](https://docs.cosmos.network/master/modules/gov/)

Dans ce système, les titulaires du jeton de staking originaire de la chaîne peuvent voter sur des propositions, sur une `1 token = 1 vote`base. Voici une liste de fonctionnalités que le module prend actuellement en charge:

- **Soumission de propositions:** Les validateurs peuvent soumettre des propositions avec un dépôt. Une fois que le dépôt minimum est atteint, la proposition inclue la période de vote. Les validateurs qui ont déposés sur les propositions peuvent récupérer leurs dépôts une fois que la proposition est rejetée ou acceptée.
- **Vote:** les validateurs peuvent voter sur des propositions qui ont atteint MinDeposit.

Il y a une période de dépôt et une période de vote en tant que params dans `gov` le module. Le dépôt minimum doit être réalisé avant la fin de la période de dépôt, sinon la proposition sera automatiquement rejetée.

Une fois que les dépôts minimums atteints pendant la période de dépôt, la période de vote commence. Pendant la période de vote, tous les validateurs doivent voter leurs choix pour la proposition. Après que la période de vote se termine, `gov/Endblocker.go` exécute `tally` la fonction et accepte ou rejette la proposition en fonction de `tally_params` — `quorum`, `threshold` et `veto`.

Source: [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)   

Il existe différents types de propositions qui peuvent être mises en œuvre dans Heimdall. À partir de maintenant, il prend en charge uniquement la **proposition de changement Param**.

### Proposition de modification de Param {#param-change-proposal}

En utilisant ce type de proposition, les validateurs peuvent changer `params`n'importe `module`quel Heimdall.

Exemple: le changement minimum `tx_fees` pour la transaction dans `auth` le module. Lorsque la proposition est acceptée, elle modifie automatiquement `params` dans l'état de Heimdall. Aucun TX supplémentaire n'est nécessaire.

## Les commandes de CLI {#cli-commands}

### Demande de gov params {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

Cela montre tous les params pour le module de gouvernance.

```go
voting_params:
  voting_period: 48h0m0s
tally_params:
  quorum: "334000000000000000"
  threshold: "500000000000000000"
  veto: "334000000000000000"
deposit_parmas:
  min_deposit:
  - denom: matic
    amount:
      i: "10000000000000000000"
  max_deposit_period: 48h0m0s
```

### Soumettre la proposition {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json`est un dossier qui inclut la proposition en format json.

```json
{
  "title": "Auth Param Change",
  "description": "Update max tx gas",
  "changes": [
    {
      "subspace": "auth",
      "key": "MaxTxGas",
      "value": "2000000"
    }
  ],
  "deposit": [
    {
      "denom": "matic",
      "amount": "1000000000000000000"
    }
  ]
}
```

### Proposition de requête {#query-proposal}

Pour interroger toutes les propositions:

```go
heimdallcli query gov proposals --trust-node
```

Pour interroger une proposition particulière:

```go
heimdallcli query gov proposals 1 --trust-node
```

### Voter sur la proposition {#vote-on-proposal}

Pour voter sur une proposition particulière:

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

La proposition sera automatiquement accordée après la période de vote.

## API de REST {#rest-apis}

| Nom | Méthode | Point de terminaison |
|----------------------|------|------------------|
| Obtenez toutes les propositions | GET | /gov/propositions |
| Obtenez les détails de la proposition | GET | /gov/propositions/`proposal-id` |
| Obtenez tous les votes pour la proposition | GET | /gov/propositions/`proposal-id`/votes |
