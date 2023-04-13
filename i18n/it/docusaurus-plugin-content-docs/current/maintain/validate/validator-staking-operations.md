---
id: validator-staking-operations
title: Staking su Polygon
description: Scopri come valere come validatore sulla Polygon Network
keywords:
  - docs
  - matic
  - polygon
  - stake
  - claim
  - unstake
slug: validator-staking-operations
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Prerequisiti {#prerequisites}

### Configurazione del nodo completo {#full-node-set-up}

Il tuo nodo di validatore è completamente configurato e sincronizzato. Vedi anche:

* [Esegua un Nodo Validator](run-validator.md)
* [Operare un nodo validatore con Ansible](run-validator-ansible.md)
* [Operare un nodo validatore dai binari](run-validator-binaries.md)

### Configurazione account {#account-setup}

Sul nodo del validatore, controlla che l'account sia impostato. Per controllare, esegui il seguente comando **sul nodo validatore**:

```sh
    heimdalld show-account
```

Il tuo output dovrebbe apparire nel seguente formato:

```json
{
    "address": "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
    "pub_key": "0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19"
}
```

Questo mostrerà il tuo indirizzo e la chiave pubblica per il tuo nodo validatore. Tieni presente che **questo indirizzo deve corrispondere al tuo indirizzo di firmatario su Ethereum**.

### Mostra la chiave privata {#show-private-key}

Questo passaggio è facoltativo.

Sul nodo del validatore, controlla che la chiave privata sia corretta. Per controllare, esegui il seguente comando **sul nodo validatore**:

```sh
heimdalld show-privatekey
```

Dovrebbe apparire il seguente output:

```json
{
    "priv_key": "0x********************************************************"
}
```

## Staking su Polygon {#stake-on-polygon}

Puoi fare staking su Polygon utilizzando la [dashboard del validatore](https://staking.polygon.technology/validators/).

### Metti in staking utilizzando la dashboard di staking {#stake-using-the-staking-dashboard}

1. Accedi alla [dashboard del validatore](https://staking.polygon.technology/validators/).
2. Accedi con il tuo wallet. MetaMask è il wallet consigliato. Devi assicurarti di effettuare il login utilizzando lo stesso indirizzo in cui sono presenti i tuoi token MATIC.
3. Clicca **su Diventa un Validator**. Ti verrà chiesto di impostare il tuo nodo. Se non hai ancora impostato il tuo nodo, dovrai farlo, altrimenti se procedi riceverai un errore quando tenterai di mettere in staking i tuoi asset.
4. Nella prossima schermata, aggiungi i tuoi dettagli come validatore, la tariffa della commissione e l'importo dello staking.
5. Clicca su **Metti in staking ora**.

Una volta completata la transazione, avrai messo in staking in tuoi asset correttamente per diventare un validatore. Ti verrà chiesto tre volte di confermare la transazione.

* Approva la transazione — così approverai la transazione relativa al tuo stake.
* Metti in staking — Questo confermerà la transazione relativa al tuo stake.
* Salva —ß Questo salverà i tuoi dettagli come validatore.

:::note

Affinché le modifiche abbiano effetto sulla [dashboard di staking](https://staking.polygon.technology/account), sono necessarie almeno 12 conferme di blocco.

:::

### Controlla il saldo {#check-the-balance}

Per controllare il saldo del tuo indirizzo:

```sh
heimdallcli query auth account SIGNER_ADDRESS --chain-id CHAIN_ID
```

dove

* SIGNER_ADDRESS — il tuo [indirizzo firmatario](/docs/maintain/glossary.md#validator).
* CHAIN_ID — l'ID di catena della Polygon mainnet con il prefisso del client: `heimdall-137`.

Dovrebbe apparire il seguente output:

```json
address: 0x6c468cf8c9879006e22ec4029696e005c2319c9d
coins:
- denom: matic
amount:
    i: "1000000000000000000000"
accountnumber: 0
sequence: 0
```

### Richiede le ricompense come validatore {#claim-rewards-as-a-validator}

Una volta impostato ed eseguito lo staking come validatore, guadagnerai ricompense per l'esecuzione delle funzioni di validatore. Quando svolgi diligentemente le funzioni di validatore, vieni ricompensato.

Per richiedere le ricompense puoi accedere alla [dashboard del validatore](https://staking.polygon.technology/account).

Vedrai due pulsanti sul tuo profilo:

* Preleva la ricompensa
* Rimetti in staking la ricompensa

#### Preleva la ricompensa {#withdraw-reward}

In qualità di validatore, guadagni ricompense fintanto che svolgi correttamente le tue funzioni di validatore.

Cliccando su **Preleva la ricompensa** riceverai le tue ricompense nel tuo wallet.

La dashboard si aggiornerà dopo 12 conferme del blocco.

#### Rimetti in staking la ricompensa {#restake-reward}

Rimettere in staking le tue ricompense è un modo semplice per aumentare il tuo stake come validatore.

Cliccando su **Rimetti in staking la ricompensa** rimetti in staking la tua ricompensa e aumenti il tuo stake.

La dashboard si aggiornerà dopo 12 conferme del blocco.
