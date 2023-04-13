---
id: governance
title: Pamamahala
sidebar_label: Governance
description: Sistema na may 1 token - 1 vote basis
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Pamamahala {#governance}

Gumagana ang pamamahala ng Heimdall nang eksaktong katulad ng [`x/gov`module](https://docs.cosmos.network/master/modules/gov/) ng Cosmos-sdk.

Sa sistemang ito, ang mga may hawak ng katutubong staking token ng chain ay maaaring bumoto sa mga panukala nang `1 token = 1 vote`batayan. Narito ang listahan ng mga tampok na kasalukuyang sinusuportahan ng modyul:

- **Pagsusumite ng panukala**: Ang mga validator ay maaaring magsumite ng mga panukala na may deposito. Kapag naabot na ang minimum na deposito, papasok ang panukala sa panahon ng pagboto. Maaaring mabawi ng mga Valdiator na nagdeposito sa mga panukala ang kanilang mga deposito kapag tinanggihan o tinanggap ang panukala.
- **Vote:** Maaaring bumoto ang mga validator sa mga panukala na umabot sa MinDeposit.

Mayroong narito ang panahon ng deposito at panahon ng pagboto bilang mga param sa `gov`modyul. Kailangang makamit ang minimum na deposito bago magtapos ang deposit period, kung hindi man ay awtomatikong itatanggi ang panukala.

Kapag naabot na ang pinakamababang deposito sa loob ng panahon ng deposito, magsisimula ang panahon ng pagboto. Sa panahon ng pagboto, dapat bumoto ang lahat ng validator sa kanilang mga pagpipilian para sa panukala. Pagkatapos ng panahon ng pagboto, `gov/Endblocker.go` ay isinasagawa ang `tally` na function at tumatanggap o tinatanggihan ang panukala batay sa `tally_params` — `quorum`, `threshold` at `veto`.

Pinagmulan: [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

May iba't ibang uri ng mga panukala na maaaring ipatupad sa Heimdall. Tulad ng ngayon, sinusuportahan lamang nito ang **panukala** ng pagbabago ng Param.

### Panukala ng baguhin ng Param {#param-change-proposal}

Gamit ang ganitong uri ng panukala, maaaring baguhin ng mga validator ang `module`alinman `params`sa Heimdall.

Halimbawa: baguhin ang minimum para `tx_fees`sa transaksyon sa `auth`Modyul. Kapag natanggap ang panukala, awtomatiko nitong binabago ang nasa `params` state ng Heimdall. Walang dagdag na TX ang kailangan.

## Mga CLI Command {#cli-commands}

### Mga params ng query gov {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

Ipinapakita nito ang lahat ng param para sa module ng pamamahala.

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

### Isumite ang panukala {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

Ang `proposal.json` ay isang file na may kasamang panukala sa json na format.

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

### Query panukala {#query-proposal}

Para i-query ang lahat ng panukala:

```go
heimdallcli query gov proposals --trust-node
```

Para mag-query ng isang partikular na panukala:

```go
heimdallcli query gov proposals 1 --trust-node
```

### Bumoto sa panukala {#vote-on-proposal}

Para bumoto sa isang partikular na panukala:

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

Ang panukala ay awtomatikong tallied pagkatapos ng panahon ng pagboto.

## Mga REST API {#rest-apis}

| Pangalan | Pamamaraan | Endpoint |
|----------------------|------|------------------|
| Kunin ang lahat ng mga panukala | GET | /gov/proposals |
| Kunin ang mga detalye ng panukala | GET | /gov/proposals/`proposal-id` |
| Kunin ang lahat ng boto para sa panukala | GET | /gov/proposals/`proposal-id`/votes |
