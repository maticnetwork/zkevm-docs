---
id: run-validator-binaries
title: Esegui il nodo di Validator
sidebar_label: Using Binaries
description: Usa i binari per impostare il tuo nodo validator
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
slug: run-validator-binaries
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
I passaggi in questa guida prevedono l'attesa che i servizi di H**eimdall **e B**or **possano sincronizzare completamente. In alternativa, puoi utilizzare uno snapshot assicurato che ridurrà il tempo di sincronizzazione ad alcune ore. Per istruzioni dettagliate, consulta le [<ins>Istruzioni per gli snapshot su Heimdall e Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Per i link di download dello snapshot, vedere [<ins>le Istantanea delle Polygon Chains</ins>](https://snapshot.polygon.technology/).

:::

Questa guida ti aiuterà a capire come eseguire un nodo validatore di Polygon da binari.

Per le esigenze del sistema, segui la guida [delle prescrizioni del sistema Node Validator](validator-node-system-requirements.md)

Se vuoi avviare ed eseguire il nodo del validatore attraverso Ansible, vedere [Eseguire un Nodo di Validatore con](run-validator-ansible.md) Ansible.

:::caution

Lo spazio per accettare nuovi validatori è limitato. I nuovi validatori possono unirsi al set attivo solo quando un validatore già attivo non si blocca.

:::

## Prerequisiti {#prerequisites}

* Due dispositivi - una [sentinella](/docs/maintain/glossary.md#sentry) e un [validatore](/docs/maintain/glossary.md#validator).
* `build-essential` installati su entrambe le macchine.

  Per l'installazione:

  ```sh
  sudo apt-get install build-essential
  ```

* Vai all'1.18 installato su entrambe le macchine.

  Per l'installazione:

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* RabbitMQ installato sia sulla sentry che sulle macchine per il validatore.

Ecco i comandi per installare RabbitMQ:

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

Scopri altre informazioni sul download e l'installazione di RabbitMQ [<ins>qui.</ins>](https://www.rabbitmq.com/download.html)

:::

## Panoramica {#overview}

Per mettere in funzione un nodo validatore, segui esattamente questa **sequenza di passaggi**:

> Se non esegui i passaggi in sequenza avrai problemi di configurazione. È importante ricordare che un nodo sentinella deve essere sempre configurato prima del nodo validatore.

1. Prepara le due macchine, una per il nodo sentinella e una per il nodo validatore.
2. Installa i binari Heimdall e Bor su entrambe le macchine: sentinella e validatore.
3. Configura i file di servizio Heimdall e Bor su entrambe le macchine: sentinella e validatore.
4. Configura i servizi Heimdall e Bor su entrambe le macchine: sentinella e validatore.
5. Configura il nodo sentinella.
6. Avvia il nodo sentinella.
7. Configura il nodo validatore.
8. Configura le chiavi del proprietario e del firmatario.
9. Avvia il nodo validatore.
10. Verifica l'integrità del nodo con la comunità.

## Installazione dei binari {#installing-the-binaries}

Installa i binari per entrambe le macchine: sentinella e validatore.

### Installazione Heimdall {#installing-heimdall}

[Heimdall](/docs/pos/heimdall/overview) è il layer di verifica Proof-of-Stake responsabile per la creazione di checkpoint che rappresentino i blocchi Plasma sulla rete Ethereum mainnet.

L'ultima versione, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), contiene alcuni miglioramenti come:
1. Limitare la dimensione dei dati in stato di sincronizzazione txs a:
    * **30Kb** se rappresentato in **byte**
    * **60Kb** se rappresentato in **stringa**.
2. Aumentare il **ritardo** tra gli eventi del contratto di diversi validatori per far sì che il mempool non si riempa troppo rapidamente in caso di una raffica di eventi che potrebbe ostacolare il progresso della catena.

Il seguente esempio mostra come la dimensione dei dati è stata ridotta:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Clona il [Heimdall repository](https://github.com/maticnetwork/heimdall/):

```sh
git clone https://github.com/maticnetwork/heimdall
```

Naviga alla [versione di rilascio](https://github.com/maticnetwork/heimdall/releases) corretta:

```sh
git checkout RELEASE_TAG
```

`RELEASE_TAG`è il tag della versione di rilascio che installi.

Per esempio:

```sh
git checkout v0.3.0
```

Una volta arrivato/a sulla versione corretta, installa heimdall:

```sh
make install
source ~/.profile
```

Verifica l'installazione di heimdall:

```sh
heimdalld version --long
```

:::note

Prima di procedere, heimdall dovrebbe essere installato su entrambe le macchine.

:::

### Per l'installazione bor {#installing-bor}

[Bor](/docs/pos/bor) è l'operatore sidechain che agisce come lo strato di produzione di blocco, che si sincronizza con Heimdall per selezionare i produttori e i verificatori per ogni [intervallo](/docs/maintain/glossary.md#span) e [sprint](/docs/maintain/glossary.md#sprint).

Clona il [magazzino bor](https://github.com/maticnetwork/bor):

```sh
git clone https://github.com/maticnetwork/bor
```

Naviga alla [versione di rilascio](https://github.com/maticnetwork/bor/releases) corretta:

```sh
git checkout RELEASE_TAG
```

`RELEASE_TAG`è il tag della versione di rilascio che installi.

Per esempio:

```sh
git checkout v0.3.3
```

Installa bor:

```sh
make bor-all
```

crea i collegamenti di simbolo (conosciuti specificamente come symlink):

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Controlla l'installazione di bor:

```sh
bor version
```

:::note

Prima di procedere, bor dovrebbe essere installato su entrambe le macchine.

:::

## Configurare i file di un nodo {#setting-up-node-files}

:::note

I file di nodo devono essere configurati su entrambe le macchine.

:::

### Pescare il magazzino di lancio {#fetching-the-launch-repository}

Clona il magazzinto [di lancio](https://github.com/maticnetwork/launch):

```sh
git clone https://github.com/maticnetwork/launch
```

### Configura la directory di lancio {#setting-up-the-launch-directory}

#### Sulla macchina sentinella {#on-the-sentry-machine}

Crea una directory `node`:

```sh
mkdir -p node
```

Copia i file e gli script dalla directory `launch` alla directory `node`:

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### Sulla macchina convalidatrice {#on-the-validator-machine}

Crea una directory `node`:

```sh
mkdir -p node
```

Copia i file e gli script dalla directory `launch` alla directory `node`:

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### Per la configurazione delle directory di rete {#setting-up-the-network-directories}

:::note

Eseguire questa sezione per entrambe le macchine.

:::

#### Per la configurazione heimdall {#setting-up-heimdall}

Spostarsi alla directory `node`:

```sh
cd ~/node/heimdall
```

Eseguire lo script di configurazione:

```sh
bash setup.sh
```

#### Per la configurazione {#setting-up-bor}

Spostarsi alla directory `node`:

```sh
cd ~/node/bor
```

Eseguire lo script di configurazione:

```sh
bash setup.sh
```

## Per la configurazione dei Servizi {#setting-up-the-services}

:::note

Eseguire questa sezione per entrambe le macchine.

:::

Spostarsi alla directory `node`:

```sh
cd ~/node
```

Eseguire lo script di configurazione:

```sh
bash service.sh
```

Copia il file di servizio alla directory di sistema:

```sh
sudo cp *.service /etc/systemd/system/
```

## Per la configurazione del nodo sentinella {#configuring-the-sentry-node}

Inizia con l'accesso alla macchina sentinella remota.

### Per la configurazione dei servizi heimdall {#configuring-the-heimdall-services}

Apri i file di configurazione heimdall per la modifica:

```sh
vi ~/.heimdalld/config/config.toml
```

In `config.toml`, cambia i seguenti parametri:

* `moniker` — un nome qualsiasi. Esempio: `moniker = "my-sentry-node"`.
* `seeds`— gli indirizzi del nodo seminale sono costituiti da un valore identificativo del nodo, un indirizzo IP e una porta.

  Usa i seguenti valori:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — imposta il valore a `true` per abilitare lo scambio peer. Esempio: `pex = true`.
* `private_peer_ids` — il valore identificativo del nodo della configurazione Heimdall sulla macchina validatrice.

  Per ottenere il valore identificativo del nodo Heimdall sulla macchina validatrice:

  1. Accedi alla macchina convalidatrice.
  2. Esegui:
     ```sh
     heimdalld tendermint show-node-id
     ```

  Esempio: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — imposta il valore a `true` per abilitare le metriche Prometheus. Esempio: `prometheus = true`.
* `max_open_connections` — imposta il valore a `100`. Esempio: `max_open_connections = 100`.

Salva le modifiche in `config.toml`.

### Per la configurazione del servizio bor {#configuring-the-bor-service}

Apri il file di configurazione bor per la modifica:

```sh
`vi ~/node/bor/start.sh`
```

In `start.sh`, aggiungi gli indirizzi di avvio del nodo costituito da un valore identificativo, un indirizzo IP e una porta aggiungendo la seguente riga alla fine file:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Salva le modifiche in `start.sh`.

### Per la configurazione di un firewall {#configuring-a-firewall}

Le seguenti porte della macchina sentinella devono essere accessibili da tutti `0.0.0.0/0`:

* `26656`- Il servizio heimdall connetterà il tuo nodo ad altri nodi heimdall.

* `30303`Il servizio bor connetterà il tuo nodo ad altri nodi bor.

* `22`- Accesso da parte del convalidatore da qualsiasi luogo in cui si trovi.

## Per l'avvio del nodo sentinella {#starting-the-sentry-node}

Per prima cosa avvia il servizio Heimdall. Una volta sincronizzato il servizio Heimdall, avvia il servizio Bor.

:::note

Come detto in precedenza, il servizio heimdall richiede diversi giorni per sincronizzarsi completamente da zero.

In alternativa, puoi utilizzare uno snapshot assicurato che ridurrà il tempo di sincronizzazione ad alcune ore. Per istruzioni dettagliate, consulta le [<ins>Istruzioni per gli snapshot su Heimdall e Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Per i link di download dello snapshot, consulta [Snaphot delle Polygon chain](https://snapshot.polygon.technology/).

:::

### Per l'avvio del servizio heimdall {#starting-the-heimdall-service}

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

Questo significa che uno dei nodi sulla rete ha rifiutato la connessione al tuo nodo. Attendi che il tuo nodo penetri la rete per cercare altri nodi; non devi fare nulla Per affrontare questi errori.

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

Attendi che il servizio heimdall si sincronizzi completamente.

### Per l'avvio del servizio bor {#starting-the-bor-service}

Una volta sincronizzato il servizio heimdall, avviare il servizio bor.

Avvia il servizio Bor:

```sh
sudo service bor start
```

Controlla i registri del servizio Bor:

```sh
journalctl -u bor.service -f
```

## Configura il nodo validatore {#configuring-the-validator-node}

:::note

Per completare questa sezione, è necessario avere un endpoint RPC della rete principale di ethereum (conosciuta come ethereum mainnet) già completamente sincronizzato nodo pronto.

:::

### Per la configurazione del servizio heimdall {#configuring-the-heimdall-service}

Accedi alla macchina convalidatrice remota.

Apri e modifica `vi ~/.heimdalld/config/config.toml`.

In `config.toml`, cambia quanto segue:

* `moniker` — un nome qualsiasi. Esempio: `moniker = "my-validator-node"`.
* `pex` — imposta il valore a `false` per disabilitare lo scambio peer. Esempio: `pex = false`.
* `private_peer_ids` — trasforma il valore in commento per disabilitarlo. Esempio: `# private_peer_ids = ""`.

  Per ottenere il valore identificativo del nodo heimdall sulla macchina sentinella:

  1. Accedi alla macchina sentinella.
  1. Esegui `heimdalld tendermint show-node-id`.

Esempio: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — imposta il valore a `true` per abilitare le metriche Prometheus. Esempio: `prometheus = true`.

Salva le modifiche in `config.toml`.

Apri e modifica `vi ~/.heimdalld/config/heimdall-config.toml`.

In `heimdall-config.toml`, cambia quanto segue:

* `eth_rpc_url` — un endpoint RPC per un nodo su Ethereum mainnet completamente sincronizzato, ovvero Infura.`eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Esempio: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

Salva le modifiche in `heimdall-config.toml`.

### Per la configurazione del servizio bor {#configuring-the-bor-service-1}

Apri e modifica `vi ~/.bor/data/bor/static-nodes.json`.

In `static-nodes.json`, cambia quanto segue:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"`— il valore identificativo del nodo e l'indirizzo IP della configurazione bor sulla macchina sentinella.

  Per ottenere il valore identificativo del nodo Bor sulla macchina sentinella:

  1. Accedi alla macchina sentinella.
  2. Esegui `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Esempio: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Salva le modifiche in `static-nodes.json`.

## Per la configurazione della chiave del proprietario e della chiave del firmatario {#setting-the-owner-and-signer-key}

Polygon consiglia di mantenere le chiavi del proprietario e del firmatario diverse.

* Firmatario - l'indirizzo che firma il [transazioni del checkpoint](/docs/maintain/glossary.md#checkpoint-transaction). La raccomandazione è di tenere almeno 1 ETH sull'indirizzo del firmatario.
* Proprietario — l'indirizzo che esegue le transazioni relative allo staking. La raccomandazione è di tenere i token MATIC sull'indirizzo del proprietario.

### Per generare una chiava privata heimdall {#generating-a-heimdall-private-key}

Devi generare una chiave privata Heimdall solo sulla macchina validatrice. Non generare un chiave privata heimdall sulla macchina sentinella.

Per generare una chiave privata, esegui:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

dove

* ETHEREUM_PRIVATE_KEY — la chiave privata del tuo portafogli Ethereum.

Questo genererà `priv_validator_key.json`. Sposta il file JSON generato alla configurazione heimdall directory:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Per generare un file di custodia-chiave bor {#generating-a-bor-keystore-file}

Devi generare un file di custodia-chiave Bor solo sulla macchina validatrice. Non generare un file di custodia-chiave bor sulla macchina sentinella.

Per generare una chiave privata, esegui:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

dove

* ETHEREUM_PRIVATE_KEY — la chiave privata del tuo portafogli Ethereum.

Quando richiesto, imposta una password per il file di custodia-chiave.

Questo genererà un file di custodia-chiave`UTC-<time>-<address>`.

Sposta il file di custodia-chiave generato nella directory di configurazione Bor:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Aggiungi password.txt {#add-password-txt}

Assicurati di aver creato un file `password.txt`, aggiungi la password del file di custodia-chiave bor nel file `~/.bor/password.txt`. file.

### Aggiungi il tuo indirizzo Ethereum {#add-your-ethereum-address}

Apri e modifica `vi /etc/matic/metadata`.

In `metadata`, aggiungi il tuo indirizzo Ethereum. Esempio: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Salva le modifiche in `metadata`.

## Per avviare il nodo validatore {#starting-the-validator-node}

A questo punto, dovrai avere:

* Il servizio heimdall sulla macchina sentinella in corso di sincronizzazione e in esecuzione.
* Il servizio Bor sulla macchina sentinella in esecuzione.
* Il servizio Heimdall e il servizio Bor sulla macchina del validatore configurati.
* Le tue chiavi di proprietario e firmatario configurate.

### Per l'avvio del servizio heimdall {#starting-the-heimdall-service-1}

Ora avvia il servizio Heimdall sulla macchina validatrice. Una volta sincronizzato il servizio heimdall, fai partire il servizio bor sulla macchina validatrice.

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
* `false`— il servizio heimdall è sincronizzato.

Attendi che la sincronizzazione del servizio Heimdall sia completata.

### Per l'avvio del servizio bor {#starting-the-bor-service-1}

Una volta sincronizzato heimdall sulla macchina validatrice, avvia il servizio bor sulla macchina validatrice.

Avvia il servizio Bor:

```sh
sudo service bor start
```

Controlla i registri del servizio Bor:

```sh
journalctl -u bor.service -f
```

## Controlli delle condizioni generali con la Comunità {#health-checks-with-the-community}

Ora che i tuoi nodi sentinella e validatore sono sincronizzati e in esecuzione, naviga su [Discord](https://discord.com/invite/0xPolygon) e chiedi alla comunità di fare un controllo generale dei tuoi nodi.

## Passi successivi: Staking {#next-steps-staking}

Ora che i tuoi nodi sentinella e validatore sono stati appurati, procedi alla guida [di staking](/docs/maintain/validator/core-components/staking.md) per iniziare a dare il tuo sostegno alla rete.
