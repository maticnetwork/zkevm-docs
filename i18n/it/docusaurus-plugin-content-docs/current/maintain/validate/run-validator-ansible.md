---
id: run-validator-ansible
title: Esegui il nodo di Validator
sidebar_label: Using Ansible
description: Utilizza Ansible per impostare il tuo nodo di validatore su Polygon
keywords:
  - docs
  - matic
  - polygon
  - ansible
  - node
  - validator
  - sentry
slug: run-validator-ansible
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip

I passaggi di questa guida prevedono l'attesa per la sincronizzazione completa dei servizi **Heimdall** e **Bor**.
Il completamento di questo processo richiede diversi giorni. In alternativa, puoi utilizzare uno snapshot mantenuto che ridurrà il tempo di sincronizzazione ad alcune ore. Per istruzioni dettagliate, consulta le [<ins>Istruzioni sugli snapshot per Heimdall e Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Per i link di download dello snapshot, vedere [<ins>le Istantanea delle Polygon Chains</ins>](https://snapshot.polygon.technology/).
:::

Questa sezione costituisce una guida all'avvio e all'esecuzione del nodo validatore attraverso un playbook Ansible.

Per i requisiti del sistema, consulta [Requisiti del sistema del nodo validatore](validator-node-system-requirements.md).

Se vuoi avviare ed eseguire il nodo validatore dai binari, consulta [Eseguire il nodo validatore dai binari](run-validator-binaries.md).

:::caution

Lo spazio per accettare nuovi validatori è limitato. I nuovi validatori possono unirsi al set attivo solo quando un validatore già attivo non si blocca.

:::

## Prerequisiti {#prerequisites}

* Tre macchine: una macchina locale su cui eseguire il playbook Ansible: due macchine remote: una [macchina sentinella](/docs/maintain/glossary.md#sentry) e una [validatrice](/docs/maintain/glossary.md#validator).
* Sulla macchina locale, [Ansible](https://www.ansible.com/) installato.
* Sulla macchina locale, [Python 3.x](https://www.python.org/downloads/) installato.
* Sulle macchine remote, assicurati che Go *non* sia installato.
* Sulle macchine remote, la chiave pubblica SSH della tua macchina locale si trova sulle macchine remote per permettere ad Ansible di connettersi a loro.
* È possibile utilizzare Bloxroute come rete di trasmissione. Se hai bisogno di una gateway per essere aggiunto come tuo Trusted Peer ti invitiamo a contattare **@validator-support-team** in [Polygon Discord](https://discord.com/invite/0xPolygon) > POS VALIDATORS | FULL NODE PROVIDER | PARTNERS > bloxroute.

## Panoramica {#overview}

Per ottenere un nodo validatore in esecuzione, segui questi passaggi:

1. Assicurati che le tre macchine siano pronte.
1. Configura un nodo sentinella mediante Ansible.
1. Configura un nodo validatore mediante Ansible.
1. Configura il nodo sentinella.
1. Avvia il nodo sentinella.
1. Configura il nodo validatore.
1. Configura le chiavi del proprietario e del firmatario.
1. Avvia il nodo validatore.
1. Verifica l'integrità del nodo con la community.

:::note

Devi seguire le **azioni descritte nella sequenza esatta**, altrimenti avrai dei problemi.

Ad esempio, bisogna sempre configurare il nodo sentinella prima del nodo validatore.

:::

## Configura il nodo sentinella {#set-up-the-sentry-node}

Sulla tua macchina locale, clona il [repository node-ansible](https://github.com/maticnetwork/node-ansible):

```sh
git clone https://github.com/maticnetwork/node-ansible
```

Cambia il repository clonato:

```sh
cd node-ansible
```

Aggiungi al file `inventory.yml` gli indirizzi IP delle macchine remote che diventeranno un nodo sentinella e un nodo validatore.

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for sentry node
        xxx.xxx.xx.xx: # <----- Add IP for second sentry node (optional)
    validator:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for validator node
```

Esempio:

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        188.166.216.25:
    validator:
      hosts:
        134.209.100.175:
```

Controlla che la macchina sentinella remota sia raggiungibile. Sulla macchina locale, esegui:

```sh
$ ansible sentry -m ping
```

Dovresti ottenere il seguente output:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Fai una prova della configurazione del nodo sentinella:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

Questo sarà l'output:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Esegui la configurazione del nodo sentinella con privilegi sudo:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

Una volta completata la configurazione, visualizzerai un messaggio di completamento sul terminale.

:::note

Se si verifica un problema e desideri ricominciare da capo, esegui:

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## Configura il nodo validatore {#set-up-the-validator-node}

A questo punto, il nodo sentinella sarà già stato configurato.

Sulla tua macchina locale, avrai anche configurato il playbook Ansible per eseguire la configurazione del nodo validatore.

Controlla che la macchina remota del validatore sia raggiungibile. Sulla macchina locale, `ansible validator -m ping`eseguire.

Dovresti ottenere il seguente output:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Fai una prova della configurazione del nodo validatore:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

Dovresti ottenere il seguente output:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Esegui la configurazione del nodo validatore con privilegi sudo:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

Una volta completata la configurazione, visualizzerai un messaggio di completamento sul terminale.

:::note

Se si verifica un problema e desideri ricominciare da capo, esegui:

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## Configura il nodo sentinella {#configure-the-sentry-node}

Accedi alla macchina sentinella remota.

### Configura il servizio Heimdall {#configure-the-heimdall-service}

Apri `config.toml` per modificare `vi ~/.heimdalld/config/config.toml`.

Cambia quanto segue:

* `moniker` — qualsiasi nome. Esempio: `moniker = "my-full-node"`.
* `seeds`— gli indirizzi del nodo seminale sono costituiti da un valore identificativo del nodo, un indirizzo IP e una porta.

  Usa i seguenti valori:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — imposta il valore a `true` per abilitare lo scambio peer. Esempio: `pex = true`.
* `private_peer_ids` — il valore identificativo del nodo della configurazione Heimdall sulla macchina validatrice.

  Per ottenere l'ID del nodo Heimdall sulla macchina del validatore:

  1. Accedi alla macchina del validatore.
  1. Esegui `heimdalld tendermint show-node-id`.

  Esempio: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — imposta il valore a `true` per abilitare le metriche Prometheus. Esempio: `prometheus = true`.
* `max_open_connections` — imposta il valore a `100`. Esempio: `max_open_connections = 100`.

Salva le modifiche in `config.toml`.

### Configura il servizio Bor {#configure-the-bor-service}

Apri per modificare `vi ~/node/bor/start.sh`.

In `start.sh`, aggiungi gli indirizzi del nodo di avvio costituiti da un ID del nodo, un indirizzo IP e una porta aggiungendo la seguente riga alla fine:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Salva le modifiche in `start.sh`.

Apri e modifica `vi ~/.bor/data/bor/static-nodes.json`.

In `static-nodes.json`, cambia quanto segue:

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"` — l'ID del nodo e l'indirizzo IP della configurazione Bor sulla macchina del validatore.

  Per ottenere l'ID del nodo di Bor sulla macchina del validatore:

  1. Accedi alla macchina del validatore.
  1. Esegui `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Esempio: `"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`.

Salva le modifiche in `static-nodes.json`.

### Configura il firewall {#configure-firewall}

Le seguenti porte della macchina sentinella devono essere accessibili dal mondo `0.0.0.0/0`:

* 26656- Il tuo servizio Heimdall connetterà il tuo nodo agli altri nodi utilizzando il servizio Heimdall.

* 30303- Il tuo servizio Bor connetterà il tuo nodo agli altri nodi utilizzando il servizio Bor.

* 22- Per consentire la connessione SSH del validatore ovunque si trovi.

:::note

Tuttavia, se utilizzi una connessione VPN, sono consentite le connessioni SSH in entrata solo dall'indirizzo IP della VPN.

:::

## Avvia il nodo sentinella {#start-the-sentry-node}

Per prima cosa avvia il servizio Heimdall. Una volta sincronizzato il servizio Heimdall, avvia il servizio Bor.

:::note

Partendo da zero, il servizio Heimdall impiega diversi giorni per sincronizzarsi completamente.

In alternativa, puoi utilizzare uno snapshot mantenuto che ridurrà il tempo di sincronizzazione ad alcune ore. Per istruzioni dettagliate, consulta le [<ins>Istruzioni sugli snapshot per Heimdall e Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Per i link di download dello snapshot, consulta [Snaphot delle chain di Polygon](https://snapshot.polygon.technology/).

:::

### Avvia il servizio Heimdall {#start-the-heimdall-service}

L'ultima versione, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), contiene alcuni miglioramenti come:
1. Limitare la dimensione dei dati in stato di sincronizzazione txs a:
    * **30Kb** se rappresentato in **byte**
    * **60Kb** se rappresentato in **stringa**.
2. Aumentare il **ritardo** tra gli eventi del contratto di diversi validatori per far sì che il mempool non si riempa troppo rapidamente in caso di una raffica di eventi che potrebbe ostacolare il progresso della catena.

Il seguente esempio mostra come la dimensione dei dati sia stata ridotta:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Avvia il servizio Heimdall:

```sh
sudo service heimdalld start
```

Avvia il rest-server Heimdall:

```sh
sudo service heimdalld-rest-server start
```

Controlla i registri del servizio Heimdall:

```sh
journalctl -u heimdalld.service -f
```

:::note

Potresti visualizzare i seguenti errori nei registri:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

Ciò significa che uno dei nodi della rete ha rifiutato una connessione al tuo nodo. Non è necessario fare nulla con questi errori. Attendi che il tuo nodo esegua il crawling di più nodi sulla rete.

:::

Controlla i registri del rest-server Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Controlla lo stato della sincronizzazione di Heimdall:

```sh
curl localhost:26657/status
```

Nell'output, il valore `catching_up` è:

* `true` — la sincronizzazione del servizio Heimdall è in corso.
* `false` — il servizio Heimdall è stato completamente sincronizzato.

Attendi che la sincronizzazione del servizio Heimdall sia completata.

### Avvia il servizio Bor {#start-the-bor-service}

Una volta sincronizzato completamente il servizio Heimdall, avvia il servizio Bor.

Avvia il servizio Bor:

```sh
sudo service bor start
```

Controlla i registri del servizio Bor:

```sh
journalctl -u bor.service -f
```

## Configura il nodo validatore {#configure-the-validator-node}

:::note

Per completare questa sezione, è necessario che sia già pronto un endpoint RPC del nodo dell'Ethereum mainnet completamente sincronizzato.

:::

### Configura il servizio Heimdall {#configure-the-heimdall-service-1}

Accedi alla macchina remota del validatore.

Apri `config.toml` per modificare `vi ~/.heimdalld/config/config.toml`.

Cambia quanto segue:

* `moniker` — qualsiasi nome. Esempio: `moniker = "my-validator-node"`.
* `pex` — imposta il valore a `false` per disabilitare lo scambio peer. Esempio: `pex = false`.
* `private_peer_ids` — trasforma il valore in commento per disabilitarlo. Esempio: `# private_peer_ids = ""`.


  Per ottenere l'ID del nodo di Heimdall sulla macchina sentinella:

  1. Accedi alla macchina sentinella.
  1. Esegui `heimdalld tendermint show-node-id`.

  Esempio: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — imposta il valore a `true` per abilitare le metriche Prometheus. Esempio: `prometheus = true`.

Salva le modifiche in `config.toml`.

Apri e modifica `vi ~/.heimdalld/config/heimdall-config.toml`.

In `heimdall-config.toml`, cambia quanto segue:

* `eth_rpc_url` — un endpoint RPC per un nodo Ethereum mainnet completamente sincronizzato, ad esempio Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Esempio: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


Salva le modifiche in `heimdall-config.toml`.

### Configura il servizio Bor {#configure-the-bor-service-1}

Apri per modificare `vi ~/.bor/data/bor/static-nodes.json`.

In `static-nodes.json`, cambia quanto segue:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — l'ID del nodo e l'indirizzo IP della configurazione Bor sulla macchina sentinella.

  Per ottenere l'ID del nodo di Bor sulla macchina sentinella:

  1. Accedi alla macchina sentinella.
  1. Esegui `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Esempio: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Salva le modifiche in `static-nodes.json`.

## Configura la chiave del proprietario e del firmatario {#set-the-owner-and-signer-key}

Su Polygon è necessario mantenere chiavi differenti per il proprietario e il firmatario.

* Firmatario — l'indirizzo che firma le [transazioni di checkpoint](../glossary#checkpoint-transaction). Si raccomanda di mantenere almeno 1 ETH sull'indirizzo del firmatario.
* Proprietario — l'indirizzo che esegue le transazioni relative allo staking. Si raccomanda di mantenere i token MATIC sull'indirizzo del proprietario.

### Genera una chiave privata Heimdall {#generate-a-heimdall-private-key}

Devi generare una chiave privata Heimdall solo sulla macchina del validatore. **Non generare una chiave privata Heimdall sulla macchina sentinella.**

Per generare una chiave privata, esegui:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — la chiave privata del tuo wallet Ethereum

:::

Questo genererà `priv_validator_key.json`. Sposta il file JSON generato nella directory di configurazione Heimdall:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Genera un file keystore Bor {#generate-a-bor-keystore-file}

Devi generare un file keystore Bor solo sulla macchina del validatore. **Non generare il file keystore Bor sulla macchina sentinella.**

Per generare una chiave privata, esegui:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — la chiave privata del tuo portafogli Ethereum.

:::

Quando richiesto, imposta una password per il file di custodia-chiave.

Questo genererà un file di custodia-chiave`UTC-<time>-<address>`.

Sposta il file di custodia-chiave generato nella directory di configurazione Bor:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Aggiungi`password.txt`

Assicurati di aver creato un file `password.txt`, aggiungi la password del file keystore di Bor nel file `~/.bor/password.txt`.

### Aggiungi il tuo indirizzo Ethereum {#add-your-ethereum-address}

Apri e modifica `vi /etc/matic/metadata`.

In `metadata`, aggiungi il tuo indirizzo Ethereum. Esempio: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Salva le modifiche in `metadata`.

## Avvia il nodo validatore {#start-the-validator-node}

A questo punto, dovrai avere:

* Il servizio Heimdall sulla macchina sentinella completamente sincronizzato e in esecuzione.
* Il servizio Bor sulla macchina sentinella in esecuzione.
* Il servizio Heimdall e il servizio Bor sulla macchina del validatore configurati.
* Le tue chiavi di proprietario e firmatario configurate.

### Avvia il servizio Heimdall {#start-the-heimdall-service-1}

Ora avvia il servizio Heimdall sulla macchina del validatore. Una volta sincronizzato il servizio Heimdall, avvia il servizio Bor sulla macchina del validatore.

Avvia il servizio Heimdall:

```sh
sudo service heimdalld start
```

Avvia il rest-server Heimdall:

```sh
sudo service heimdalld-rest-server start
```

Avvia il ponte Heimdall:

```sh
sudo service heimdalld-bridge start
```

Controlla i registri del servizio Heimdall:

```sh
journalctl -u heimdalld.service -f
```

Controlla i registri del rest-server Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Controlla i registri del ponte Heimdall:

```sh
journalctl -u heimdalld-bridge.service -f
```

Controlla lo stato della sincronizzazione di Heimdall:

```sh
curl localhost:26657/status
```

Nell'output, il valore `catching_up` è:

* `true` — la sincronizzazione del servizio Heimdall è in corso.
* `false` — il servizio Heimdall è stato completamente sincronizzato.

Attendi che la sincronizzazione del servizio Heimdall sia completata.

### Avvia il servizio Bor {#start-the-bor-service-1}

Una volta sincronizzato completamente il servizio Heimdall sulla macchina del validatore, avvia il servizio Bor sulla macchina del validatore.

Avvia il servizio Bor:

```sh
sudo service bor start
```

Controlla i registri del servizio Bor:

```sh
journalctl -u bor.service -f
```

## Controlla l'integrità del nodo con la community {#check-node-health-with-the-community}

Ora che i tuoi nodi sentinella e validatore sono sincronizzati e in esecuzione, vai su [Discord](https://discord.com/invite/0xPolygon) e chiedi alla community di controllare l'integrità dei tuoi nodi.

## Procedi con lo staking {#proceed-to-staking}

Una volta verificata l'integrità dei tuoi nodi sentinella e validatore, procedi con lo [staking](/docs/maintain/validator/core-components/staking).
