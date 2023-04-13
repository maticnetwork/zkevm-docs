---
id: full-node-docker
title: Eseguire un nodo completo con Docker
sidebar_label: Run a full node with Docker
description:  Guida per eseguire un nodo completo utilizzando Docker
keywords:
  - docs
  - matic
  - docker
  - full node
  - polygon
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Il team di Polygon distribuisce immagini Docker ufficiali che possono essere utilizzate per eseguire nodi sulla rete principale di Polygon. Queste istruzioni riguardano l'esecuzione di un nodo completo, ma possono essere adattate anche per l'esecuzione di nodi sentinella e validatori.

:::tip Istantanee

Scoprirai che la sincronizzazione da zero può richiedere molto tempo. Se vuoi accelerare il processo, puoi seguire le istruzioni elencate qui: [<ins>Istruzioni Snapshot per Heimdall e Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor)

Queste saranno le istruzioni più aggiornate, ma in linea di massima puoi fare qualcosa di simile ai passi che seguono:
```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# at this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```

Il `aria2c`metodo viene utilizzato per scaricare le snapshot più velocemente. C'è un modo alternativo in cui le snapshot scaricate possono essere direttamente estratte senza alcun intervento.

**Passaggi per questo:**

```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::

## Prerequisiti {#prerequisites}

La configurazione generale per l'esecuzione di un nodo completo Polygon prevede **almeno** 4 CPU/core e 16 GB di RAM. Per questa guida utilizzeremo AWS e un tipo di istanza `t3.2xlarge`. L'applicazione può essere eseguita sia su architetture x86 che Arm.

Queste istruzioni sono basate su Docker, quindi dovrebbero essere facili da seguire con quasi tutti i sistemi operativi, ma noi stiamo usando Ubuntu.

Per quanto riguarda lo spazio, per un nodo completo avrai probabilmente bisogno da **2,5 a 5 terabyte di SSD (o più veloce)**.

Lo scambio di peer per un nodo completo Polygon dipende generalmente dall'apertura delle porte 30303 e 26656. Quando si configura il suo firewall o i gruppi di sicurezza per AWS, assicurarsi che queste porte siano aperte insieme a tutte le porte che ti servono per accedere alla macchina.

TLDR:

- Usa una macchina con almeno 4 core e 16 GB di RAM.
- Assicurati di avere da 2,5 TB a 5 TB di una rapida conservazione
- Usa un IP pubblico e apri le porte 30303 e 26656

## Configurazione iniziale {#initial-setup}
A questo punto, dovresti avere accesso alla shell con privilegi di root di un computer Linux.

![img](/img/full-node-docker/term-access.png)

### Installare Docker {#install-docker}
Molto probabilmente il tuo sistema operativo non avrà Docker installato di default. Segui le istruzioni per la tua distribuzione specifica che trovi qui: https://docs.docker.com/engine/install/

Stiamo seguendo le istruzioni per Ubuntu. I passi sono riportati di seguito, ma ti invitiamo a consultare le istruzioni ufficiali nel caso in cui siano state aggiornate.

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

A questo punto dovresti aver installato Docker. Per verificare, dovresti essere in grado di eseguire un comando come questo:

```bash
sudo docker run hello-world
```

![img](/img/full-node-docker/hello-world.png)

In molti casi, è scomodo eseguire docker come utente di `root`, quindi seguiremo i passi di post-installazione [qui](https://docs.docker.com/engine/install/linux-postinstall/) per interagire con docker senza dover essere `root`:

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

Ora dovresti essere in grado di effettuare il logout e il login e di eseguire i comandi docker senza `sudo`.

### Configurazione del disco {#disk-setup}
I passaggi esatti necessari variano molto in base alle tue esigenze. Molto probabilmente avrai una partizione root che esegue il tuo sistema operativo su un dispositivo. Probabilmente vorrai uno o più dispositivi per conservare i dati della blockchain. Per il resto della guida, avremo questo dispositivo aggiuntivo montato su `/mnt/data`.

In questo esempio, abbiamo un dispositivo con 4 TB di spazio disponibile situato in `/dev/nvme1n1`. Stiamo per montare che utilizzando le fasi sottostanti:

```bash
sudo mkdir /mnt/data
sudo mount /dev/nvme1n1 /mnt/data
```

Usiamo `df -h` per far sì che vada a buon fine.

![img](/img/full-node-docker/space.png)

Se tutto va bene, possiamo anche creare le directory home su questo supporto per Bor e Heimdall.

```bash
sudo mkdir /mnt/data/bor
sudo mkdir /mnt/data/heimdall
```

A seconda del caso d'uso e del sistema operativo, probabilmente vorrai creare una voce in `/etc/fstab` per assicurarti che il dispositivo sia montato al riavvio del sistema.

Nel nostro caso stiamo seguendo alcuni passaggi come questo:

```bash
# Use blkid to get the UUID for the device that we're mounting
blkid

# Edit the fstab file  and add a line to mount your device
# UUID={your uuid}		/mnt/data	{your filesystem}	defaults	0	1
sudo emacs /etc/fstab

# use this to verify the fstab actually works
sudo findmnt --verify --verbose
```

A questo punto dovresti essere in grado di riavviare e confermare che il sistema sia in grado di caricare correttamente il tuo supporto.

### Configurazione di Heimdall {#heimdall-setup}

A questo punto, abbiamo un host con docker in esecuzione e un ampio spazio di archiviazione montato per eseguire il software del nodo Polygon. Quindi configuriamo Heimdall e mettiamolo in funzione.

Per prima cosa assicuriamoci di poter eseguire Heimdall con docker. Esegui il seguente comando:

```bash
docker run -it 0xpolygon/heimdall:0.3.0 heimdallcli version
```

Se è la prima volta che esegui Heimdall con docker, dovrebbe estrarre automaticamente l'immagine richiesta e fornire le informazioni sulla versione.

![img](/img/full-node-docker/heimdall-version.png)

Se vuoi controllare i dettagli dell'immagine di Heimdall o trovare un tag diverso, puoi dare un'occhiata al repository su Docker Hub: https://hub.docker.com/repository/docker/0xpolygon/heimdall

A questo punto, eseguiamo il comando `init` di Heimdall per impostare la nostra home directory.

```bash
docker run -v /mnt/data/heimdall:/heimdall-home:rw --entrypoint /usr/bin/heimdalld -it 0xpolygon/heimdall:0.3.0 init --home=/heimdall-home
```

Soffriamo questo comando un po' nel caso in cui qualcosa vada storto.

* Stiamo usando `docker run`per eseguire un comando tramite docker.

* Lo switch `-v /mnt/data/heimdall:/heimdall-home:rw` è molto importante. Sta montando la cartella che abbiamo creato in precedenza `/mnt/data/heimdall`dal nostro sistema host `/heimdall-home`all'interno del contenitore come volume docker.

* `rw` consente al comando di scrivere su questo volume docker. Per tutti gli intenti e finalità, dall'interno del docker container, la home directory per Heimdall sarà `/heimdall-home`.

* L'argomento `--entrypoint /usr/bin/heimdalld`è il punto di ingresso predefinito per questo container.

* Lo switch `-it`viene utilizzato per eseguire il comando interattivamente.

* Infine stiamo specificando l'immagine con cui vogliamo eseguire `0xpolygon/heimdall:0.3.0`.

* Dopo di che `init --home=/heimdall-home` sono gli argomenti che vengono passati all'eseguibile heimdalld. `init` è il comando che vogliamo eseguire e `--home` è utilizzato per specificare la posizione della home directory.

Dopo aver eseguito il comando `init`, la directory `/mnt/data/heimdall` dovrebbe avere una certa struttura e assomigliare a questo:

![img](/img/full-node-docker/heimdall-tree.png)

Ora dobbiamo effettuare alcuni aggiornamenti prima di avviare Heimdall. Per prima cosa modificheremo il file `config.toml`.

```bash
# Open the config.toml and and make three edits
# moniker = "YOUR NODE NAME HERE"
# laddr = "tcp://0.0.0.0:26657"
# seeds = "LATEST LIST OF SEEDS"

sudo emacs /mnt/data/heimdall/config/config.toml
```

Se non hai un elenco di seed, puoi trovarlo nella documentazione per la configurazione di un nodo completo. Nel nostro caso, il file contiene queste tre righe:

```
# A custom human readable name for this node
moniker="examplenode01"

# TCP or UNIX socket address for the RPC server to listen on
laddr = "tcp://0.0.0.0:26657"

# Comma separated list of seed nodes to connect to
seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
```

:::caution

Ci sono due file `laddr``config.toml`all'interno. Assicurati di cambiare solo il `laddr`parametro in `[rpc]`sezione.

:::

Ora che il file `config.toml` è pronto, dovrai fare due piccole modifiche al file `heimdall-config.toml`. Usa il tuo editor preferito per aggiornare queste due impostazioni:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "http://localhost:9545"

# RPC endpoint for bor chain
bor_rpc_url = "http://localhost:8545"
```

`eth_rpc_url` deve essere aggiornato con l'URL che utilizzi per Ethereum Mainnet RPC. `bor_rpc_url`Il nostro caso sarà aggiornato a .`http://bor:8545` Dopo aver effettuato le modifiche, il nostro file ha queste linee:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "https://eth-mainnet.g.alchemy.com/v2/ydmGjsREDACTED_DONT_USE9t7FSf"

# RPC endpoint for bor chain
bor_rpc_url = "http://bor:8545"
```

Il comando `init` predefinito fornisce un `genesis.json` ma non funziona con Polygon Mainnet o Mumbai. Se stai configurando un nodo mainnet, puoi eseguire questo comando per scaricare il file genesis corretto:

```bash
sudo curl -o /mnt/data/heimdall/config/genesis.json https://raw.githubusercontent.com/maticnetwork/heimdall/master/builder/files/genesis-mainnet-v1.json
```

Se vuoi verificare di avere il file giusto, puoi fare un controllo su questo hash:

```
# sha256sum genesis.json
498669113c72864002c101f65cd30b9d6b159ea2ed4de24169f1c6de5bcccf14  genesis.json
```

## Avviare Heimdall {#starting-heimdall}
Prima di avviare Heimdall, creeremo una rete docker in modo che i contenitori possano facilmente collegarsi tra loro in base ai nomi. Per creare la rete, esegui il seguente comando:

```bash
docker network create polygon
```

Ora avviamo Heimdall. Esegui il seguente comando:

```bash
docker run -p 26657:26657 -p 26656:26656 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdall --entrypoint /usr/bin/heimdalld -d --restart unless-stopped  0xpolygon/heimdall:0.3.0 start --home=/heimdall-home
```

Molte parti di questo comando ti sembreranno familiari. Quindi parliamo di ciò che è nuovo.

* Gli switch `-p 26657:26657` e `-p 26656:26656` sono mappature di porte. Questo istruirà docker per mappare la porta host `26657`alla porta container `26657`e lo stesso per .`26656`

* Lo `--net polygon`switch dice a docker di eseguire questo contenitore nella rete di polygon.

* `--name heimdall`sta dando il nome al container che è utile per il debug, ma è tutto il nome che verrà utilizzato per altri container per connettersi a Heimdall.

* `-d`L'argomento indica a docker di eseguire questo container in background.

* Lo switch `--restart unless-stopped`dice a docker di riavviare automaticamente il container se non è stato fermato manualmente.

* Infine, `start`viene utilizzato per eseguire l'applicazione invece di `init`cui basta impostare la home directory.

A questo punto è utile controllare e vedere cosa sta succedendo. Questi due comandi possono essere utili:

```bash
# ps will list the running docker processes. At this point you should see one container running
docker ps

# This command will print out the logs directly from the heimdall application
docker logs -ft heimdall
```

A questo punto, Heimdall dovrebbe iniziare a sincronizzarsi. Quando guardi i registri, dovresti vedere un log di informazioni che appare come questo:

```
2022-12-14T19:43:23.687640820Z INFO [2022-12-14|19:43:23.687] Executed block                               module=state height=26079 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.721220869Z INFO [2022-12-14|19:43:23.721] Committed state                              module=state height=26079 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.730533414Z INFO [2022-12-14|19:43:23.730] Executed block                               module=state height=26080 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.756646938Z INFO [2022-12-14|19:43:23.756] Committed state                              module=state height=26080 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.768129711Z INFO [2022-12-14|19:43:23.767] Executed block                               module=state height=26081 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.794323918Z INFO [2022-12-14|19:43:23.794] Committed state                              module=state height=26081 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.802989809Z INFO [2022-12-14|19:43:23.802] Executed block                               module=state height=26082 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.830960386Z INFO [2022-12-14|19:43:23.830] Committed state                              module=state height=26082 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.840941976Z INFO [2022-12-14|19:43:23.840] Executed block                               module=state height=26083 validTxs=0 invalidTxs=0
2022-12-14T19:43:23.866564767Z INFO [2022-12-14|19:43:23.866] Committed state                              module=state height=26083 txs=0 appHash=CAEC4C181C9F82D7F55C4BB8A7F564D69A41295A3B62DDAA45F2BB41333DC20F
2022-12-14T19:43:23.875395744Z INFO [2022-12-14|19:43:23.875] Executed block                               module=state height=26084 validTxs=0 invalidTxs=0
```

Se non vedi informazioni di questo tipo, il tuo nodo potrebbe non trovare abbastanza peer. L'altro comando utile a questo punto è una chiamata RPC per verificare lo stato di sincronizzazione di Heimdall:

```bash
curl localhost:26657/status
```

Questo restituirà una risposta del tipo:

```json
{
  "jsonrpc": "2.0",
  "id": "",
  "result": {
    "node_info": {
      "protocol_version": {
        "p2p": "7",
        "block": "10",
        "app": "0"
      },
      "id": "0698e2f205de0ffbe4ca215e19b2ee7275d2c334",
      "listen_addr": "tcp://0.0.0.0:26656",
      "network": "heimdall-137",
      "version": "0.32.7",
      "channels": "4020212223303800",
      "moniker": "examplenode01",
      "other": {
        "tx_index": "on",
        "rpc_address": "tcp://0.0.0.0:26657"
      }
    },
    "sync_info": {
      "latest_block_hash": "812700055F33B175CF90C870B740D01B0C5B5DCB8D22376D2954E1859AF30458",
      "latest_app_hash": "83A1568E85A1D942D37FE5415F3FB3CBD9DFD846A42CBC247DFD6ABB9CE7E606",
      "latest_block_height": "16130",
      "latest_block_time": "2020-05-31T17:06:31.350723885Z",
      "catching_up": true
    },
    "validator_info": {
      "address": "3C6058AF387BB74D574582C2BEEF377E7A4C0238",
      "pub_key": {
        "type": "tendermint/PubKeySecp256k1",
        "value": "BOIKA6z1q3l5iSJoaAiagWpwUw3taAhiEMyZ9ffxAMznas2GU1giD5YmtnrB6jzp4kkIqv4tOmuGYILSdy9+wYI="
      },
      "voting_power": "0"
    }
  }
}
```

In questa fase di configurazione iniziale, è importante prestare attenzione al campo `sync_info`. Se `catching_up` è vera, significa che Heimdall non è completamente sincronizzato. Puoi controllare le altre proprietà all'interno di `sync_info` per avere un'idea di quanto sia indietro Heimdall.

## Avviare Bor {#starting-bor}

A questo punto dovresti avere un nodo che esegue Heimdall correttamente, Ora dovresti essere pronto per eseguire Bor.

Prima di iniziare con Bor, dobbiamo eseguire il Heimdall rest server. Questo comando avvia un'API REST che Bor utilizza per recuperare informazioni da Heimdall. Il comando per avviare il server è:

```bash
docker run -p 1317:1317 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdallrest --entrypoint /usr/bin/heimdalld -d --restart unless-stopped 0xpolygon/heimdall:0.3.0 rest-server --home=/heimdall-home --node "tcp://heimdall:26657"
```

Ci sono due parti di questo comando che sono diverse e che meritano di essere notate. Invece di eseguire il comando `start`, eseguiamo il comando `rest-server`. Inoltre, stiamo passando `~–node “tcp://heimdall:26657”~`, che indica al rest server come comunicare con Heimdall.

Se questo comando viene eseguito con successo, quando esegui `docker ps`, dovresti vedere due container di comandi in esecuzione. Inoltre, se esegui questo comando dovresti vedere un output di base:

```bash
curl localhost:1317/bor/span/1
```

Bor si affiderà a questa interfaccia. Quindi, se non vedi l'uscita di JSON, c'è qualcosa che non va!

Ora scarichiamo il `genesis`file per Bor specificamente:

```bash
sudo curl -o /mnt/data/bor/genesis.json 'https://raw.githubusercontent.com/maticnetwork/bor/master/builder/files/genesis-mainnet-v1.json'
```

Verifichiamo ancora il `sha256 sum` per questo file:

```
# sha256sum genesis.json
5c10eadfa9d098f7c1a15f8d58ae73d67e3f67cf7a7e65b2bd50ba77eeac67e1  genesis.json
```

Ora dobbiamo creare un file di config predefinito per avviare Bor.

```bash
docker run -it  0xpolygon/bor:0.3.3 dumpconfig | sudo tee /mnt/data/bor/config.toml
```

Questo comando genererà un file .toml con le impostazioni predefinite. Stiamo per fare alcune modifiche al file, quindi aprirlo con il tuo editor preferito e fare qualche aggiornamento. Nota: stiamo solo mostrando le linee che vengono cambiate.

Per riferimento, puoi vedere i dettagli dell'immagine Bor qui: [https://hub.docker.com/repository/docker/0xpolygon/bor](https://hub.docker.com/repository/docker/0xpolygon/bor)

```bash
# Similar to moniker, you might want to update this with a name of your own choosing
identity = "docker.example"

# Setting this to the location of a mount that we'll make
datadir = "/bor-home"

# We'll want to specify some boot nodes
[p2p]
  [pep.discovery]
    bootnodes = ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303", "enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"]

# Because we're running inside docker, we'll likely need to change the way we connect to heimdall
[heimdall]
  url = "http://heimdallrest:1317"

# Assumming you want to access the RPC, you'll need to make a change here as well
[jsonrpc]
  [jsonrpc.http]
    enabled = true
    host = "0.0.0.0"
```

A questo punto dovremmo essere pronti ad avviare Bor. Useremo questo comando:
```bash
docker run -p 30303:30303 -p 8545:8545 -v /mnt/data/bor:/bor-home:rw --net polygon --name bor -d --restart unless-stopped  0xpolygon/bor:0.3.3 server --config /bor-home/config.toml
```

Se tutto è andato bene, dovresti vedere un sacco di log che assomigliano a questo:

```bash
2022-12-14T19:53:51.989897291Z INFO [12-14|19:53:51.989] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:47:46Z
2022-12-14T19:53:51.989925064Z INFO [12-14|19:53:51.989] Fetching state sync events               queryParams="from-id=4&to-time=1590882466&limit=50"
2022-12-14T19:53:51.997640841Z INFO [12-14|19:53:51.997] StateSyncData                            Gas=0       Block-number=12800 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.021990622Z INFO [12-14|19:53:52.021] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:49:58Z
2022-12-14T19:53:52.022015930Z INFO [12-14|19:53:52.021] Fetching state sync events               queryParams="from-id=4&to-time=1590882598&limit=50"
2022-12-14T19:53:52.040660857Z INFO [12-14|19:53:52.040] StateSyncData                            Gas=0       Block-number=12864 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.064795784Z INFO [12-14|19:53:52.064] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:52:10Z
2022-12-14T19:53:52.064828634Z INFO [12-14|19:53:52.064] Fetching state sync events               queryParams="from-id=4&to-time=1590882730&limit=50"
2022-12-14T19:53:52.085029612Z INFO [12-14|19:53:52.084] StateSyncData                            Gas=0       Block-number=12928 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.132067703Z INFO [12-14|19:53:52.131] ✅ Committing new span                    id=3                startBlock=13056 endBlock=19455 validatorBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d9018238a2945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822 producerBytes=f8b6d906822710940375b2fc7140977c9c76d45421564e354ed42277d9078227109442eefcda06ead475cde3731b8eb138e88cd0bac3d9018238a2945973918275c01f50555d44e92c9d9b353cadad54d905822710947fcd58c2d53d980b247f1612fdba93e9a76193e6d90482271094b702f1c9154ac9c08da247a8e30ee6f2f3373f41d90282271094b8bb158b93c94ed35c1970d610d1e2b34e26652cd90382271094f84c74dea96df0ec22e11e7c33996c73fcc2d822
2022-12-14T19:53:52.133545235Z INFO [12-14|19:53:52.133] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:54:22Z
2022-12-14T19:53:52.133578948Z INFO [12-14|19:53:52.133] Fetching state sync events               queryParams="from-id=4&to-time=1590882862&limit=50"
2022-12-14T19:53:52.135049605Z INFO [12-14|19:53:52.134] StateSyncData                            Gas=0       Block-number=12992 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.152067646Z INFO [12-14|19:53:52.151] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:56:34Z
2022-12-14T19:53:52.152198357Z INFO [12-14|19:53:52.151] Fetching state sync events               queryParams="from-id=4&to-time=1590882994&limit=50"
2022-12-14T19:53:52.176617455Z INFO [12-14|19:53:52.176] StateSyncData                            Gas=0       Block-number=13056 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.191060112Z INFO [12-14|19:53:52.190] Fetching state updates from Heimdall     fromID=4 to=2020-05-30T23:58:46Z
2022-12-14T19:53:52.191083740Z INFO [12-14|19:53:52.190] Fetching state sync events               queryParams="from-id=4&to-time=1590883126&limit=50"
2022-12-14T19:53:52.223836639Z INFO [12-14|19:53:52.223] StateSyncData                            Gas=0       Block-number=13120 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.236025906Z INFO [12-14|19:53:52.235] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:00:58Z
2022-12-14T19:53:52.236053406Z INFO [12-14|19:53:52.235] Fetching state sync events               queryParams="from-id=4&to-time=1590883258&limit=50"
2022-12-14T19:53:52.269611566Z INFO [12-14|19:53:52.269] StateSyncData                            Gas=0       Block-number=13184 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.283199351Z INFO [12-14|19:53:52.283] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:03:10Z
2022-12-14T19:53:52.283737573Z INFO [12-14|19:53:52.283] Fetching state sync events               queryParams="from-id=4&to-time=1590883390&limit=50"
2022-12-14T19:53:52.314141359Z INFO [12-14|19:53:52.314] StateSyncData                            Gas=0       Block-number=13248 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.325150782Z INFO [12-14|19:53:52.325] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:05:22Z
2022-12-14T19:53:52.325171075Z INFO [12-14|19:53:52.325] Fetching state sync events               queryParams="from-id=4&to-time=1590883522&limit=50"
2022-12-14T19:53:52.354470271Z INFO [12-14|19:53:52.354] StateSyncData                            Gas=0       Block-number=13312 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.372354857Z INFO [12-14|19:53:52.372] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:07:34Z
2022-12-14T19:53:52.372389214Z INFO [12-14|19:53:52.372] Fetching state sync events               queryParams="from-id=4&to-time=1590883654&limit=50"
2022-12-14T19:53:52.398246950Z INFO [12-14|19:53:52.398] StateSyncData                            Gas=0       Block-number=13376 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.413321099Z INFO [12-14|19:53:52.413] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:09:46Z
2022-12-14T19:53:52.413345355Z INFO [12-14|19:53:52.413] Fetching state sync events               queryParams="from-id=4&to-time=1590883786&limit=50"
2022-12-14T19:53:52.437176855Z INFO [12-14|19:53:52.437] StateSyncData                            Gas=0       Block-number=13440 LastStateID=3 TotalRecords=0
2022-12-14T19:53:52.450356966Z INFO [12-14|19:53:52.450] Fetching state updates from Heimdall     fromID=4 to=2020-05-31T00:11:58Z
```

Esistono alcuni modi per verificare lo stato di sincronizzazione di Bor. Il più facile è con `curl`:

```bash
curl 'localhost:8545/' \
--header 'Content-Type: application/json' \
-d '{
	"jsonrpc":"2.0",
	"method":"eth_syncing",
	"params":[],
	"id":1
}'
```

Quando esegui questo comando, ti darà un risultato come:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x2eebf",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodeBytes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x1d4ee3e",
    "startingBlock": "0x0",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Questo indicherà i `currentBlock` che sono stati sincronizzati e anche i `highestBlock` di cui siamo a conoscenza. Se il nodo è già sincronizzato, dovremmo `false`ottenere.

## Istantanee {#snapshots}
Scoprirai che la sincronizzazione da zero può richiedere molto tempo. Se vuoi accelerare il processo, puoi seguire le istruzioni riportate qui: [https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/](https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/)

Queste saranno le istruzioni più aggiornate, ma in linea di massima puoi fare qualcosa di simile ai passi che seguono:

```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# At this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```
