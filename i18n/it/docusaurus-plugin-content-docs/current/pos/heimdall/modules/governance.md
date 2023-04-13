---
id: governance
title: Sistema di amministrazione
sidebar_label: Governance
description: Sistema con 1 token - 1 base di voto
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Sistema di amministrazione {#governance}

La governance di Heimdall funziona esattamente lo stesso del [modulo `x/gov`Cosmos-sdk.](https://docs.cosmos.network/master/modules/gov/)

In questo sistema, i detentori del token di staking nativo della catena possono votare le proposte su una base `1 token = 1 vote`. Ecco una lista di caratteristiche che il modulo attualmente supporta:

- **Presentazione della proposta:** i validatori possono presentare delle proposte con un deposito. Una volta raggiunto il deposito minimo, la proposta entra nel periodo di voto. I validatori che hanno effettuato dei depositi sulle proposte possono recuperare i loro depositi dopo che la proposta è stata respinta o accettata.
- **Vota:** I convalidatori possono votare sulle proposte che hanno raggiunto MinDeposit.

Nel modulo `gov` sono presenti i parametri periodo di deposito e periodo di voto. Il deposito minimo deve essere raggiunto prima della scadenza del periodo di deposito, altrimenti la proposta sarà automaticamente respinta.

Se i depositi minimi vengono raggiunti entro il periodo di deposito, ha inizio il periodo di voto. Nel periodo di voto, tutti i validatori devono votare in merito alla proposta. Al termine del periodo di voto, `gov/Endblocker.go` esegue la funzione `tally` e accetta o respinge la proposta in base a `tally_params` — `quorum`, `threshold` e `veto`.

Fonte: [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

Esistono diversi tipi di proposte che possono essere implementate in Heimdall. Da oggi supporta solo la **proposta di cambiamento di Param**.

### Proposta cambio dei parametri {#param-change-proposal}

Utilizzando questo tipo di proposta, i validatori possono cambiare qualsiasi altra scelta `params`in una qualsiasi `module`di Heimdall.

Esempio: cambia i `tx_fees` minimi per la transazione nel modulo `auth`. Se la proposta viene accettata, cambia automaticamente i `params` nello stato di Heimdall. Non sono necessarie ulteriori TX.

## Comandi CLI {#cli-commands}

### Parametri Ricerca gov {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

Mostra tutti i parametri per il modulo governance.

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

### Invia la proposta {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json` è un file che include la proposta in formato json.

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

### Ricerca proposta {#query-proposal}

Per fare domande a tutte le proposte:

```go
heimdallcli query gov proposals --trust-node
```

Per fare una richiesta particolare:

```go
heimdallcli query gov proposals 1 --trust-node
```

### Vota proposta {#vote-on-proposal}

Per votare una proposta particolare:

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

La proposta sarà automaticamente scrutinata dopo il periodo di voto.

## API REST {#rest-apis}

| Nome | Metodo | Endpoint |
|----------------------|------|------------------|
| Ottieni tutte le proposte | GET | /gov/proposals |
| Ottieni i dettagli della proposta | GET | /gov/proposals/`proposal-id` |
| Ottieni tutti i voti per la proposta | GET | /gov/proposals/`proposal-id`/votes |
