---
id: full-node-binaries
title: Esegui un nodo completo con i binari
description: Distribuire un Nodo Full Polygon utilizzando i binari
keywords:
  - docs
  - matic
  - polygon
  - node
  - binaries
  - deploy
  - run full node
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

Questo tutorial ti guida per iniziare e eseguire un nodo completo utilizzando i binari. Per le esigenze di sistema, vedere la guida [delle prescrizioni tecniche](technical-requirements.md) minime.

:::tip


I passaggi di questa guida implicano l'attesa per la sincronizzazione completa dei servizi Heimdall e Bor. Questo processo richiede diversi giorni per essere completato.

In alternativa, puoi utilizzare uno snapshot mantenuto che ridurrà il tempo di sincronizzazione ad alcune ore. Per istruzioni dettagliate, consulta le [<ins>Istruzioni per gli snapshot su Heimdall e Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Per i link di download dello snapshot, vedere la pagina [<ins>delle Snapshots Polygon</ins>](https://snapshots.polygon.technology/) Chains.

:::

## Panoramica {#overview}

- Preparare la macchina
- Installare i binari Heimdall e Bor sulla macchina del nodo completo
- Configurare i servizi Heimdall e Bor sulla macchina full node
- Configurare la macchina del nodo completo
- Avviare la macchina del nodo completo
- Controlla l'integrità del nodo con la community

:::note

Devi seguire la sequenza esatta delineata delle azioni, altrimenti dovrai affrontare problemi.

:::

### Installare`build-essential`

Questo è **necessario** per il tuo nodo completo. Per installare, esegui il comando seguente:

```bash
sudo apt-get update
sudo apt-get install build-essential
```

### Installa GO {#install-go}

Questo è anche **necessario** per eseguire il tuo nodo completo. È consigliabile installare **v1.18 o** superiore.

```bash
wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
bash go-install.sh
sudo ln -nfs ~/.go/bin/go /usr/bin/go
```

## Installare i binari {#install-binaries}

Il nodo Polygon è composto da 2 strati: Heimdall e Bor. Heimdall è una forcella di tendermint che monitora i contratti in parallelo alla rete Ethereum. Bor è fondamentalmente una forcella di Geth che genera blocchi che vengono scambiati dai nodi di Heimdall.

Entrambi i binari devono essere installati e eseguiti nell'ordine corretto per funzionare correttamente.

### Heimdall {#heimdall}

Installare l'ultima versione di Heimdall e i relativi servizi. Assicurati di verificare la [corretta versione di rilascio](https://github.com/maticnetwork/heimdall/releases). Nota che l'ultima versione, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), contiene miglioramenti come:
1. Limitare la dimensione dei dati in stato di sincronizzazione txs a:
    * **30Kb** se rappresentato in **byte**
    * **60Kb** quando rappresentato come **as**
2. L'aumento del **ritardo** tra gli eventi del contratto di diversi convalidatori affinché il mempool non si riempa troppo rapidamente in caso di una raffica di eventi che potrebbe ostacolare il progresso della catena.

Il seguente esempio mostra come la dimensione dei dati è stata ridotta:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Per installare **Heimdall**, esegui i comandi sottostanti:

```bash
cd ~/
git clone https://github.com/maticnetwork/heimdall
cd heimdall

# Checkout to a proper version, for example
git checkout v0.3.0
git checkout <TAG OR BRANCH>
make install
source ~/.profile
```

Verranno installati i binari `heimdalld` e `heimdallcli`. Verifica l'installazione controllando la versione Heimdall sulla tua macchina:

```bash
heimdalld version --long
```

### Bor {#bor}

Installare l'ultima versione di Bor. Assicurati di dare il checkout alla [versione](https://github.com/maticnetwork/bor/releases) corretta rilasciata.

```bash
cd ~/
git clone https://github.com/maticnetwork/bor
cd bor

# Checkout to a proper version
# For e.g: git checkout 0.3.3
git checkout <TAG OR BRANCH>
make bor
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Verranno installati i binari `bor` e `bootnode`. Verifica l'installazione controllando la versione Bor sulla tua macchina:

```bash
bor version
```

## Configura file di nodo {#configure-node-files}

### Ottieni il repository di lancio {#fetch-launch-repo}

```bash
cd ~/
git clone https://github.com/maticnetwork/launch
```

### Configura la directory di lancio {#configure-launch-directory}

Per configurare la directory di rete, sono necessari il nome della rete e il tipo di nodo.

**Reti disponibili**: `mainnet-v1`e`testnet-v4`

**Tipo di nodo**:`sentry`

:::tip

Per la configurazione di Mainnet e Testnet, utilizzare `<network-name>`appropriato. Utilizzo `mainnet-v1`per Polygon mainnet e `testnet-v4`per Mumbai Testnet.
:::

```bash
cd ~/
mkdir -p node
cp -rf launch/<network-name>/sentry/<node-type>/* ~/node
```

### Configurare le directory di rete {#configure-network-directories}

**Configurazione dei dati di Heimdall**

```bash
cd ~/node/heimdall
bash setup.sh
```

**Configurazione dei dati di Bor**

```bash
cd ~/node/bor
bash setup.sh
```

## Configura i file di servizio {#configure-service-files}

Scarica il `service.sh`file utilizzando appropriato.`<network-name>` Utilizzo `mainnet-v1`per Polygon mainnet e `testnet-v4`per Mumbai Testnet.

```bash
cd ~/node
wget https://raw.githubusercontent.com/maticnetwork/launch/master/<network-name>/service.sh
```

Generare il file **metadata**:

```bash
sudo mkdir -p /etc/matic
sudo chmod -R 777 /etc/matic/
touch /etc/matic/metadata
```

Generare `.service`file e copiarli nella directory di sistema:

```bash
cd ~/node
bash service.sh
sudo cp *.service /etc/systemd/system/
```


## Configurazione dei file di configurazione {#setup-config-files}

- Accedi alla macchina remota/VM
- Dovrai aggiungere alcuni dettagli nel file `config.toml`. Per aprire e modificare il `config.toml`file, esegui il seguente comando: .`vi ~/.heimdalld/config/config.toml`

Nel file di config, dovrai cambiare e `Moniker`aggiungere `seeds`informazioni:

    ```bash
    moniker=<enter unique identifier>
    # For example, moniker=my-sentry-node

    # Mainnet:
    seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656"

    # Testnet:
    seeds="4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656"
    ```

    - Cambia il valore di **Pex** in `true`
    - Cambia il valore di **Prometheus** in `true`
    - Imposta il valore di `max_open_connections` su `100`

Assicurati di **mantenere la corretta formattazione quando** si effettua le modifiche di cui sopra.

- Configura quanto segue in `~/.heimdalld/config/heimdall-config.toml`:

    ```jsx
    eth_rpc_url=<insert Infura or any full node RPC URL to Goerli>
    ```

- Apri il `start.sh`file per Bor utilizzando questo comando: .`vi ~/node/bor/start.sh` Aggiungi le seguenti bandiere per avviare le parametri:

  ```bash
  # Mainnet:
  --bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"

  # Testnet:
  --bootnodes "enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303"
  ```

- Per attivare la modalità **di** Archivio, puoi aggiungere le seguenti bandiere nel `start.sh`file:

  ```jsx
  --gcmode 'archive' \
  --ws --ws.port 8546 --ws.addr 0.0.0.0 --ws.origins '*' \
  ```

## Avvia i servizi {#start-services}

Esegui il nodo completo di Heimdall con questi comandi sul tuo Nodo di Sentry

```bash
sudo service heimdalld start
sudo service heimdalld-rest-server start
```

Ora devi assicurarti che **Heimdall sia sincronizzata** completamente, e poi solo iniziare Bor. Se avvii Bor senza che Heimdall si sincronizzi completamente, incontrerai spesso dei problemi.

**Per verificare se Heimdall viene sincronizzato**
  1. Sulla macchina/VM remota, esegui `curl localhost:26657/status`
  2. Nell'output, il valore `catching_up` deve essere `false`

Una volta che Heimdall è sincronizzato, esegui il comando seguente:

```bash
sudo service bor start
```

## Registri {#logs}

I log possono essere gestiti dallo strumento `journalctl`linux. Ecco un tutorial per l'uso avanzato: [Come utilizzare Journalctl per visualizzare e Manipolare i log Systemd](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**Controlla i registri del nodo Heimdall**

```bash
journalctl -u heimdalld.service -f
```

**Verifica i log di Heimdall Rest-server**

```bash
journalctl -u heimdalld-rest-server.service -f
```

**Verifica i log Bor Rest-server**

```bash
journalctl -u bor.service -f
```

## Configurazione di porte e firewall {#ports-and-firewall-setup}

Apri le porte 22, 26656 e 30303 al mondo (0.0.0.0/0) sul firewall del nodo sentry.

Puoi utilizzare la VPN per limitare l'accesso alla porta 22 in base alle tue esigenze e alle linee guida sulla sicurezza.
