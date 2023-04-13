---
id: governance
title: Governance
sidebar_label: Governance
description: System mit einem 1 Token - 1 vote
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Governance {#governance}

Heimdall Governance funktioniert genau wie [das Cosmos-sdk `x/gov`Modul.](https://docs.cosmos.network/master/modules/gov/)

In diesem System können Inhaber, die den nativen Staking-Token auf der Chain halten, über Vorschläge auf einer `1 token = 1 vote`-Basis abstimmen. Hier ist eine Liste der Funktionen, die das Modul derzeit unterstützt:

- **Einreichen eines Vorschlags:** Validatoren können Vorschläge mit einer Einzahlung einreichen. Sobald die Mindesteinzahlung erreicht ist, tritt der Vorschlag in die Abstimmungsperiode ein. Validatoren, die auf Vorschläge Einzahlungen hinterlegten, können ihre Einlagen wieder zurückgewinnen, sobald der Vorschlag abgelehnt oder angenommen wurde.
- **Bewertung:** Prüfer können über Vorschläge abstimmen, die MinDeposit erreicht haben.

Es gibt die Einzahlungsperiode und die Abstimmungsperiode als Parameter im `gov`-Modul. Die Mindesteinzahlung muss erreicht werden, bevor die Einzahlungsfrist endet, andernfalls wird der Vorschlag automatisch abgelehnt.

Sobald die Mindesteinzahlung innerhalb der Einzahlungsperiode erreicht wurde, startet die Abstimmungsperiode. In der Abstimmungsperiode sollten alle Validatoren ihre Stimme zum Vorschlag abgeben. `threshold`Nach Ablauf der Abstimmungsperiode führt `gov/Endblocker.go`  die `tally`-Funktion aus und nimmt den Vorschlag an oder lehnt in ab, basierend auf  — `quorum`, `tally_params`und `veto`.

Quelle: [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

Es gibt verschiedene Arten von Anträgen, die in Heimdall umgesetzt werden können. Es unterstützt ab sofort nur den **Param Change Vorschlag**.

### Vorschlag zur Änderung von Parametern {#param-change-proposal}

Mit dieser Art von Vorschlag können Prüfer jede `params`in einem `module`der Heimdall ändern.

Beispiel: Wechseln des Minimum-`tx_fees` für eine Transaktion in ein `auth`-Modul. Wenn der Vorschlag angenommen wird, wechselt er das `params` automatisch in den Heimdall-Status. Es werden keine zusätzlichen TX benötigt.

## CLI-Befehle {#cli-commands}

### Abfrage von Governance-Parametern {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

Dies zeigt alle Parameter für das Governance-Modul an.

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

### Einreichung des Vorschlags {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json` ist eine Datei, welche den Vorschlag im json-Format enthält.

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

### Abfrage des Vorschlags {#query-proposal}

Um alle Vorschläge abzufragen:

```go
heimdallcli query gov proposals --trust-node
```

Um einen bestimmten Vorschlag abzufragen:

```go
heimdallcli query gov proposals 1 --trust-node
```

### Abstimmen über einen Vorschlag {#vote-on-proposal}

Um über einen bestimmten Vorschlag zu stimmen:

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

Der Vorschlag wird nach Ablauf der Abstimmungsperiode automatisch abgehakt.

## REST APIs {#rest-apis}

| Name | Methode | Endpunkt |
|----------------------|------|------------------|
| Hole dir alle Vorschläge | HOLEN | /gov/proposals |
| Hole dir die Details des Vorschlags. | HOLEN | /gov/proposals/`proposal-id` |
| Hole dir alle Stimmen für den Vorschlag. | HOLEN | /gov/proposals/`proposal-id`/votes |
