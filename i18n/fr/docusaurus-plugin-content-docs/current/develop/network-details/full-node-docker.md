---
id: full-node-docker
title: Exécuter un nœud complet avec Docker
sidebar_label: Run a full node with Docker
description:  Guide pour exécuter un nœud complet en utilisant Docker
keywords:
  - docs
  - matic
  - docker
  - full node
  - polygon
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

L'équipe de Polygone distribue des images Docker officielles qui peuvent être utilisées pour faire fonctionner des nœuds sur le réseau principal Polygone. Ces instructions concernent l'exécution d'un nœud Complet, mais elles peuvent être adaptées à l'exécution de nœuds sentinelles et de validateurs.

:::tip Photographie

Vous constaterez que la synchronisation à partir de zéro peut prendre beaucoup de temps. Si vous souhaitez accélérer le processus, vous pouvez suivre les instructions listées ici: [<ins>Instructions instantanées pour Heimdall et Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor)

Il s'agit des instructions les plus récentes, mais en gros, vous pouvez faire quelque chose comme les étapes ci-dessous:
```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# at this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```

La `aria2c`méthode est utilisée pour télécharger des instantanés plus rapidement. Il existe une autre façon où les instantanés téléchargés peuvent être directement extraits sans aucune intervention.

**Étapes pour cela:**

```bash title="For Heimdall"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-11-30.tar.gz -O - | tar -xzf - -C ~/.heimdalld/data/
```

```bash title="For Bor"
wget -c https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-11-21.tar.gz  -O - | tar -xzf - -C ~/.bor/data/bor/chaindata
```
:::

## Prérequis {#prerequisites}

La configuration générale pour faire fonctionner un nœud complet Polygone  est de disposer **d'au moins** 4 CPU/cores et de 16 Go de RAM. Pour cette présentation, nous allons utiliser AWS et un `t3.2xlarge` type d'instance. L'application peut fonctionner sur les architectures x86 et Arm.

Ces instructions sont basées sur Docker, il devrait donc être facile de suivre avec presque tous les systèmes d'exploitation, mais nous utilisons Ubuntu.

En termes d'espace, pour un nœud complet, vous aurez probablement besoin de **2,5 à 5 téraoctets de stockage SSD (ou plus rapide)**.

L'échange de pairs pour un nœud complet Polygone dépend généralement de l'ouverture des ports 30303 et 26656. Lorsque vous configurez votre pare-feu ou des groupes de sécurité pour AWS, assurez-vous que ces ports sont ouverts avec tous les ports dont vous avez besoin pour accéder à la machine.

TLDR:

- Utilisez une machine avec au moins 4 cœurs et 16 Go de RAM
- Assurez-vous d'avoir de 2,5 To à 5 To de stockage rapide
- Utilisez une IP publique et ouvrez les ports 30303 et 26656.

## Configuration Initiale {#initial-setup}
A ce stade, vous devriez avoir un accès shell avec des privilèges root sur une machine linux.

![img](/img/full-node-docker/term-access.png)

### Installez Docker {#install-docker}
C'est fort probable que Docker ne soit pas installé par défaut sur votre système d'exploitation. Veuillez suivre les instructions pour votre distribution particulière qui se trouvent ici: https://docs.docker.com/engine/install/

Nous suivons les instructions de Ubuntu. Les étapes sont indiquées ci-dessous, mais veuillez consulter les instructions officielles si elles ont été mises à jour.

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

À ce stade, vous devriez avoir installé Docker. Afin de vérifier, vous devriez pouvoir exécuter une commande comme celle-ci:

```bash
sudo docker run hello-world
```

![img](/img/full-node-docker/hello-world.png)

Dans de nombreux cas, ce n'est pas pratique d'exécuter docker en tant qu'`root`utilisateur; nous suivrons donc les étapes de post-installation [ici](https://docs.docker.com/engine/install/linux-postinstall/) afin d'interagir avec docker sans avoir besoin d'être `root`:

```bash
sudo groupadd docker
sudo usermod -aG docker $USER
```

Maintenant, vous devriez être en mesure de vous déconnecter et de vous reconnecter et d'exécuter des commandes docker sans `sudo`.

### Configuration du Disque {#disk-setup}
Les étapes exactes requises ici vont varier considérablement en fonction de vos besoins. Le plus souvent, vous aurez une partition root exécutant votre système d'exploitation sur un seul appareil. Vous aurez probablement besoin d'un ou plusieurs périphériques pour contenir les données de la blockchain. Pour le reste de l'exposé, nous allons monter ce périphérique supplémentaire à`/mnt/data`.

Dans cet exemple, nous avons un appareil avec 4 To d'espace disponible situé au `/dev/nvme1n1`. Nous allons monter cela en utilisant les étapes ci-dessous:

```bash
sudo mkdir /mnt/data
sudo mount /dev/nvme1n1 /mnt/data
```

Nous utilisons  `df -h`pour assurer que la monture semble bien.

![img](/img/full-node-docker/space.png)

Si tout cela semble bon, nous pourrions aussi bien créer les répertoires personnels sur ce support pour Bor et Heimdall.

```bash
sudo mkdir /mnt/data/bor
sudo mkdir /mnt/data/heimdall
```

En fonction de votre cas d'utilisation et de votre système d'exploitation, vous voudrez probablement créer une entrée `/etc/fstab` afin d'assurer que votre périphérique soit monté lorsque le système redémarre.

Dans notre cas, nous suivons quelques étapes comme celles-ci:

```bash
# Use blkid to get the UUID for the device that we're mounting
blkid

# Edit the fstab file  and add a line to mount your device
# UUID={your uuid}		/mnt/data	{your filesystem}	defaults	0	1
sudo emacs /etc/fstab

# use this to verify the fstab actually works
sudo findmnt --verify --verbose
```

À ce stade, vous devriez pouvoir redémarrer et confirmer que le système charge correctement votre montage.

### Configuration Heimdall {#heimdall-setup}

À ce stade, nous disposons d'un hôte sur lequel fonctionne docker et nous avons suffisamment de stockage monté pour exécuter notre logiciel de nœud Polygone. Alors, configurons et faisons fonctionner Heimdall.

Tout d'abord, assurons-nous que nous pouvons exécuter Heimdall avec docker. Exécutez la commande suivante:

```bash
docker run -it 0xpolygon/heimdall:0.3.0 heimdallcli version
```

Si c'est la première fois que vous exécutez Heimdall avec Docker, il devrait récupérer automatiquement l'image requise et fournir les informations sur la version.

![img](/img/full-node-docker/heimdall-version.png)

Si vous souhaitez vérifier les détails de l'image Heimdall ou trouver un tag différent, vous pouvez jeter un coup d'œil au dépôt sur Docker Hub : https://hub.docker.com/repository/docker/0xpolygon/heimdall.

A ce stade, exécutons la `init`commande Heimdall  pour configurer notre répertoire personnel.

```bash
docker run -v /mnt/data/heimdall:/heimdall-home:rw --entrypoint /usr/bin/heimdalld -it 0xpolygon/heimdall:0.3.0 init --home=/heimdall-home
```

cassons cette commande un peu au cas où quelque chose ne va pas.

* Nous utilisons `docker run`pour exécuter une commande via docker.

* Le commutateur `-v /mnt/data/heimdall:/heimdall-home:rw`est très important. Il est en train de monter le dossier que nous avons créé précédemment `/mnt/data/heimdall`depuis notre système hôte vers `/heimdall-home`l'intérieur du conteneur comme volume docker.

* Le `rw`permet à la commande d'écrire sur ce volume docker. Pour toutes les intentions et toutes les fins, à partir du conteneur docker, le répertoire domicile pour Heimdall sera `/heimdall-home`.

* L'argument est en train de remplacer le point `--entrypoint /usr/bin/heimdalld`d'entrée par défaut pour ce contenant.

* Le commutateur `-it`est utilisé pour exécuter la commande de manière interactive.

* Enfin, nous spécifions quelle image avec laquelle nous voulons exécuter `0xpolygon/heimdall:0.3.0`.

* Après cela, `init --home=/heimdall-home`ce sont des arguments passés à l'exécutable heimdalld. `init` est la commande que nous voulons exécuter et `--home` est utilisé pour spécifier l'emplacement du répertoire personnel.

Après avoir exécuté la `init`commande, votre `/mnt/data/heimdall`répertoire devrait avoir une certaine structure et ressembler à ceci:

![img](/img/full-node-docker/heimdall-tree.png)

Maintenant nous devons faire quelques mises à jour avant de commencer Heimdall. Nous allons d'abord modifier le `config.toml`fichier.

```bash
# Open the config.toml and and make three edits
# moniker = "YOUR NODE NAME HERE"
# laddr = "tcp://0.0.0.0:26657"
# seeds = "LATEST LIST OF SEEDS"

sudo emacs /mnt/data/heimdall/config/config.toml
```

Si vous ne disposez pas d'une liste de graines, vous pouvez en trouver une dans la documentation relative à la configuration d'un nœud plein. Dans notre cas, notre fichier a ces trois lignes:

```
# A custom human readable name for this node
moniker="examplenode01"

# TCP or UNIX socket address for the RPC server to listen on
laddr = "tcp://0.0.0.0:26657"

# Comma separated list of seed nodes to connect to
seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
```

:::caution

Il y a deux fichiers à `laddr``config.toml`l'intérieur. Assurez-vous de ne modifier que le `laddr`paramètre sous la `[rpc]`section.

:::

Maintenant que votre `config.toml`fichier est prêt, vous devez apporter deux petites modifications à votre `heimdall-config.toml`fichier. Utilisez votre éditeur préféré pour mettre à jour ces deux paramètres:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "http://localhost:9545"

# RPC endpoint for bor chain
bor_rpc_url = "http://localhost:8545"
```

Le `eth_rpc_url`doit être mis à jour à l'URL que vous utilisez pour le Principal Réseau    Ethereum RPC. Le `bor_rpc_url`dans notre cas va être mis à jour vers .`http://bor:8545` Après avoir effectué les modifications, notre fichier a ces lignes:

```
# RPC endpoint for ethereum chain
eth_rpc_url = "https://eth-mainnet.g.alchemy.com/v2/ydmGjsREDACTED_DONT_USE9t7FSf"

# RPC endpoint for bor chain
bor_rpc_url = "http://bor:8545"
```

La commande `init`par défaut fournit un `genesis.json`mais cela ne fonctionnera pas avec le Réseau Principal de Polygon  ou Mumbai. Si vous configurez un nœud du réseau principal, vous pouvez exécuter cette commande pour télécharger le bon fichier d'origine:

```bash
sudo curl -o /mnt/data/heimdall/config/genesis.json https://raw.githubusercontent.com/maticnetwork/heimdall/master/builder/files/genesis-mainnet-v1.json
```

Si vous voulez vérifier que vous avez le bon fichier, vous pouvez le comparer à ce dièse:

```
# sha256sum genesis.json
498669113c72864002c101f65cd30b9d6b159ea2ed4de24169f1c6de5bcccf14  genesis.json
```

## Commencer Heimdall {#starting-heimdall}
Avant de lancer Heimdall, nous allons créer un réseau docker afin que les conteneurs puissent facilement se connecter les uns aux autres en fonction de leur nom. Pour créer le réseau, exécutez la commande suivante:

```bash
docker network create polygon
```

Nous allons commencer Heimdall. Exécutez la commande suivante:

```bash
docker run -p 26657:26657 -p 26656:26656 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdall --entrypoint /usr/bin/heimdalld -d --restart unless-stopped  0xpolygon/heimdall:0.3.0 start --home=/heimdall-home
```

Beaucoup des morceaux de cette commande sembleront familiers. Parlons de ce qui est nouveau.

* Les `-p 26657:26657` et `-p 26656:26656` commutateurs sont des cartographie de ports. Cela donnera aux docker de cartographier le port hôte `26657`au port conteneur `26657`et la même chose pour .`26656`

* Le `--net polygon`commutateur demande au docker d'exécuter ce conteneur dans le réseau polygon.

* `--name heimdall`est en train de nommer le conteneur qui est utile pour le débogage, mais il est tout le nom qui sera utilisé pour d'autres conteneurs pour se connecter à Heimdall.

* L'argument indique au docker `-d`d'exécuter ce conteneur en arrière-plan.

* Le commutateur `--restart unless-stopped`indique au docker de redémarrer automatiquement le conteneur sauf s'il a été arrêté manuellement.

* Enfin, `start`est utilisé pour exécuter réellement l'application au lieu de `init`laquelle il suffit de configurer le répertoire home.

À ce stade, c'est utile de vérifier et de voir ce qui se passe. Ces deux commandes peuvent être utiles:

```bash
# ps will list the running docker processes. At this point you should see one container running
docker ps

# This command will print out the logs directly from the heimdall application
docker logs -ft heimdall
```

A ce stade, Heimdall devrait commencer à se synchroniser. Lorsque vous regardez les journaux, vous devriez voir un journal d'informations étant craché et ressemblant à cela:

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

Si vous ne voyez pas d'informations de ce type, il se peut que votre nœud ne trouve pas assez de pairs. L'autre commande utile à ce stade est un appel RPC pour vérifier l'état de la synchronisation de Heimdall:

```bash
curl localhost:26657/status
```

Cela renverra une réponse comme:

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

Dans cette phase initiale de configuration, il est important de prêter attention au `sync_info`champ. Si `catching_up`est vrai, cela signifie que Heimdall n'est pas complètement synchronisé. Vous pouvez vérifier les autres propriétés en dedans  `sync_info`pour avoir une idée de la distance qui sépare Heimdall.

## Bor de démarrage {#starting-bor}

À ce stade, vous devriez avoir un nœud qui exécute Heimdall avec succès. Vous devriez maintenant être prêt à exécuter Bor.

Avant de commencer avec Bor, nous devons exécuter le serveur de repos Heimdall. Cette commande va démarrer une API REST que Bor utilise pour récupérer des informations de Heimdall. La commande pour démarrer le serveur est:

```bash
docker run -p 1317:1317 -v /mnt/data/heimdall:/heimdall-home:rw --net polygon --name heimdallrest --entrypoint /usr/bin/heimdalld -d --restart unless-stopped 0xpolygon/heimdall:0.3.0 rest-server --home=/heimdall-home --node "tcp://heimdall:26657"
```

Deux éléments de cette commande sont différents et méritent d'être notés. Au lieu d'exécuter la `start`commande , nous exécutons la `rest-server`commande. Aussi, nous passons `~–node “tcp://heimdall:26657”~`ce qui indique au serveur de repos comment communiquer avec Heimdall.

Si cette commande fonctionne avec succès, lorsque vous `docker ps`exécutez , vous devriez voir deux conteneurs de commandes s'exécutant maintenant. De plus, si vous exécutez cette commande, vous devriez voir quelques résultats de base:

```bash
curl localhost:1317/bor/span/1
```

Bor s'appuiera sur cette interface. Donc, si vous ne voyez pas de sortie JSON, il y a quelque chose de mal !

Maintenant, let’s le `genesis`fichier pour Bor spécifiquement:

```bash
sudo curl -o /mnt/data/bor/genesis.json 'https://raw.githubusercontent.com/maticnetwork/bor/master/builder/files/genesis-mainnet-v1.json'
```

Vérifions le à `sha256 sum`nouveau pour ce fichier:

```
# sha256sum genesis.json
5c10eadfa9d098f7c1a15f8d58ae73d67e3f67cf7a7e65b2bd50ba77eeac67e1  genesis.json
```

Maintenant, nous devons créer un fichier de configuration par défaut pour démarrer Bor.

```bash
docker run -it  0xpolygon/bor:0.3.3 dumpconfig | sudo tee /mnt/data/bor/config.toml
```

Cette commande va générer un fichier .toml avec les paramètres par défaut. Nous allons apporter quelques modifications au fichier, alors ouvrez le avec votre éditeur préféré et faites quelques mises à jour. Note: nous affichons uniquement les lignes qui sont modifiées.

Pour référence, vous pouvez voir les détails de l'image Bor ici: [https://hub.docker.com/repository/docker/0xpolygon/bor](https://hub.docker.com/repository/docker/0xpolygon/bor)

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

À ce stade, nous devrions être prêts à commencer Bor. Nous allons utiliser cette commande:
```bash
docker run -p 30303:30303 -p 8545:8545 -v /mnt/data/bor:/bor-home:rw --net polygon --name bor -d --restart unless-stopped  0xpolygon/bor:0.3.3 server --config /bor-home/config.toml
```

Si tout s'est bien passé, vous devriez voir beaucoup de fichiers journaux qui ressemblent à cela:

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

Il existe plusieurs façons de vérifier l'état de synchronisation de Bor. Le plus simple est avec `curl`:

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

Lorsque vous exécutez cette commande, elle vous donnera un résultat comme:

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

Cela indique le `currentBlock` qui a été synchronisé et aussi le `highestBlock`dont nous avons connaissance. Si le nœud est déjà synchronisé, nous devrions obtenir `false`.

## Photographie {#snapshots}
Vous constaterez que la synchronisation à partir de zéro peut prendre beaucoup de temps. Si vous souhaitez accélérer le processus, vous pouvez suivre les instructions énumérées ici: [https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/](https://docs.polygon.technology/docs/develop/network-details/snapshot-instructions-heimdall-bor/)

Il s'agit des instructions les plus récentes, mais en gros, vous pouvez faire quelque chose comme les étapes ci-dessous:

```bash
# stop your containers at this point. Since you're importing a snapshot you don't need to run them anymore
aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/heimdall-snapshot-2022-07-06.tar.gz
tar xzf heimdall-snapshot-2022-07-06.tar.gz -C /mnt/data/heimdall/data/

aria2c -x6 -s6 https://matic-blockchain-snapshots.s3-accelerate.amazonaws.com/matic-mainnet/bor-fullnode-snapshot-2022-07-01.tar.gz
tar xzf bor-fullnode-snapshot-2022-07-01.tar.gz -C /mnt/data/bor/bor/chaindata
# At this point, you can start your containers back up. Pay attention to the logs to make sure everything looks good
```
