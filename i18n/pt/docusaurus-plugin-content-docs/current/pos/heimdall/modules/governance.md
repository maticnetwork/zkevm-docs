---
id: governance
title: Governação
sidebar_label: Governance
description: Sistema com 1 token - 1 base de voto
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Governação {#governance}

A governança do Heimdall funciona exatamente da mesma forma que o [módulo `x/gov`Cosmos-sdk.](https://docs.cosmos.network/master/modules/gov/)

Neste sistema, os detentores do token de staking nativo da chain podem votar em propostas com base em `1 token = 1 vote`. Aqui está uma lista de recursos que o módulo atualmente suporta:

- **Envio de propostas:** os validadores podem enviar propostas com um depósito. Uma vez atingido o depósito mínimo, a proposta entra no período de votação. Os validadores que depositaram em propostas podem recuperar os seus depósitos assim que a proposta for rejeitada ou aceite.
- **Pontuação:** Os validadores podem votar propostas que atingiram o MinDeposit.

Existe período de depósito e período de votação como params no módulo `gov`. O depósito mínimo tem de ser alcançado antes do término do período de depósito, caso contrário, a proposta será automaticamente rejeitada.

O período de votação começa assim que os depósitos mínimos forem alcançados dentro do período do depósito. No período de votação, todos os validadores devem votar nas suas escolhas para a proposta. Após o término do período de votação, `gov/Endblocker.go` executa a função `tally` e aceita ou rejeita a proposta com base em `tally_params` — `quorum`, `threshold` e `veto`.

Fonte: [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

Existem diferentes tipos de propostas que podem ser implementadas no Heimdall. A partir de agora, ele suporta apenas a **proposta de alteração** de Param.

### Proposta de alteração de param {#param-change-proposal}

Usando este tipo de proposta, os validadores podem alterar qualquer `params`um `module`dos Heimdall.

Exemplo: alterar `tx_fees` mínimas para a transação no módulo `auth`. Quando a proposta é aceite, muda automaticamente os `params` no estado de Heimdall. Não é necessário nenhum TX extra.

## Comandos CLI {#cli-commands}

### Consulta params gov {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

Isto mostra todos os params para o módulo de governança.

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

### Enviar proposta {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json` é um ficheiro que inclui a proposta no formato json.

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

### Consulta de proposta {#query-proposal}

Para consultar todas as propostas:

```go
heimdallcli query gov proposals --trust-node
```

Para consultar uma proposta específica:

```go
heimdallcli query gov proposals 1 --trust-node
```

### Votar na proposta {#vote-on-proposal}

Para votar uma proposta específica:

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

A proposta será automaticamente lida após o período de votação.

## APIs REST {#rest-apis}

| Nome | Método | Endpoint |
|----------------------|------|------------------|
| Obter todas as propostas | GET | /gov/proposals |
| Obter detalhes da proposta | GET | /gov/proposals/`proposal-id` |
| Obter todos os votos para a proposta | GET | /gov/proposals/`proposal-id`/votes |
