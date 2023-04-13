---
id: full-node-binaries
title: Exécuter un nœud complet avec des Binaires
description: Déployez un nœud polygon complet à l'aide de binaires
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

Ce tutoriel vous guide en démarrant et en exécutant un nœud complet à l'aide de binaires. Pour les exigences du système, consultez le guide [des exigences techniques](technical-requirements.md) minimales.

:::tip

Les étapes de ce guide impliquent d'attendre que les services Heimdall et Bor se synchronisent complètement. Ce processus prend plusieurs jours pour être complété.

Vous pouvez également utiliser une image maintenue, ce qui réduira le temps de synchronisation en quelques heures. Pour des instructions détaillées, voir [<ins>Instructions en matière d'instantanés pour Heimdall et Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Pour les liens de téléchargement instantanés, consultez la page [<ins>Snapshot des chaînes Polygon</ins>](https://snapshots.polygon.technology/) .

:::

## Aperçu {#overview}

- Préparez la machine
- Installez les binaires Heimdall et Bor sur la machine pleine machine à nœud
- Configurez les services Heimdall et Bor sur la machine pleine machine à nœud
- Configurez la machine à nœud complet
- Démarrez la machine pleine de nœud
- Vérifiez l'état des nœuds auprès de la communauté.

:::note

Vous devez suivre la séquence exacte d'actions exposées et sinon vous allez rencontrer des problèmes.

```bash
cd ~/node
bash service.sh
sudo cp *.service /etc/systemd/system/
```

## Setup config files

**For Mumbai Testnet**

- Configure the following in `~/.heimdalld/config/config.toml`:
    - `moniker=<enter unique identifier>`

```js
 seeds="4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656"
```
- Configure the following in `vi ~/.heimdalld/config/heimdall-config.toml`:

    ```js
    eth_rpc_url =<insert Infura or any full node RPC URL to Goerli>
    ```

- Add the following flag in `vi ~/node/bor/start.sh` to the `bor` start params:

```bash
--bootnodes "enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303"
```

## Start services

Run the full Heimdall node with the following commands:

```bash
sudo service heimdalld start
sudo service heimdalld-rest-server start
```

Once Heimdall is synced, start Bor:

```bash
sudo service bor start
```

## Logs

Logs are managed by `journalctl` linux tool. Here is a link for advanced usage: [https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs)

**Check Heimdall node logs**

```bash
journalctl -u heimdalld.service -f
```

**Check Heimdall rest server logs**

```bash
journalctl -u heimdalld-rest-server.service -f
```

**Check Bor rest server logs**

```bash
journalctl -u bor.service -f
```

### To check if Heimdall is synced

1. On the remote machine/VM, run `curl localhost:26657/status`
2. In the output, `catching_up` value should be `false`

### **Ports and firewall setup**

Open following ports 22, 26656 and 30303 to world (0.0.0.0/0) on sentry node firewall.

You can use VPN to restrict access for 22 port as per your requirement and security guidelines.


</TabItem>

<TabItem value="mainnet">

# Polygon Full Node Setup Using Binaries

This section guides you through starting and running a full node on a binary.

For the system requirements, see [Minimum Technical Requirements](https://docs.polygon.technology/docs/operate/technical-requirements).

:::note

Steps in this guide involve waiting for the Heimdall and Bor services to fully sync. This process takes several days to complete.

Alternatively, you can use a maintained snapshot, which will reduce the sync time to a few hours. For detailed instructions, see [Snapshot Instructions for Heimdall and Bor](https://forum.matic.network/t/snapshot-instructions-for-heimdall-and-bor/2278).

For snapshot download links, see [Polygon Chains Snapshots](https://snapshots.matic.today/).

:::


## Prerequisites

- One machine is required.
- `build-essential` installed on the Full Node machine.
- To install:
- `sudo apt-get install build-essential`
- Go 1.17 installed on both the Full Node machine.

<!-- ### To install

```bash
wget https://gist.githubusercontent.com/ssandeep/a6c7197811c83c71e5fead841bab396c/raw/go-install.sh
```

```bash
go-install.sh
```

```bash
sudo ln -nfs ~/.go/bin/go /usr/bin/go
```

RabbitMQ installed on both the Full Node machines. See Downloading and Installing RabbitMQ. --><!-- - Two machines — one local machine on which you will run the Ansible playbook; one remote machine — for Full Node.
- On the local machine, Ansible installed.
- On the local machine, Python 3.x installed.
- On the remote machine, make sure Go is not installed.
- On the remote machine, your local machine's SSH public key is on the remote machine to let Ansible connect to them. -->


## Overview

- Have the one machine prepared.
- Install the Heimdall and Bor binaries on the Full Node machine.
- Set up the Heimdall and Bor services on the Full Node machine.
- Configure the Full node.
- Start the Full node.
- Check node health with the community.

:::note
You have to follow the exact outlined sequence of actions, otherwise you will run into issues.
:::

### Installez`build-essential`

Cela est **requis** pour votre nœud complet. Pour installer, exécutez la commande ci-dessous:

```bash
sudo apt-get update
sudo apt-get install build-essential
```

### Installer GO {#install-go}

Cela est également **nécessaire** pour exécuter votre nœud complet. L'installation **de v1.18 ou supérieures** est recommandée.

```bash
wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
bash go-install.sh
sudo ln -nfs ~/.go/bin/go /usr/bin/go
```

## Installer les Binaires {#install-binaries}

Le nœud Polygon se compose de 2 couches: Heimdall et Bor. Heimdall est une fourchette tendermint qui surveille les contrats en parallèle avec le réseau Ethereum. Bor est fondamentalement une fourchette Geth qui génère des blocs shuffled par les nœuds Heimdall.

Les deux binaires doivent être installés et exécutés dans l'ordre correct pour fonctionner correctement.

### Heimdall {#heimdall}

Installez la dernière version de Heimdall et des services connexes. Assurez-vous de vérifier la bonne [version de version](https://github.com/maticnetwork/heimdall/releases). Notez que la dernière version, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), contient des améliorations telles que:
1. Restreindre la taille des données dans synchronisation d'état txs à :
    * **30 kB** lorsqu'elles sont représentées en **octets**
    * **60Kb** lorsqu'ils sont représentés comme **chaîne de caractères**
2. Augmenter le **délai** entre les événements contractuels des différents validateurs pour s'assurer que le mempool ne se remplit pas très rapidement en cas d'arrivée d'événements pouvant entraver la progression de la chaîne.

L'exemple suivant montre comment la taille des données est restreinte :

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Pour installer **Heimdall**, exécutez les commandes ci-dessous:

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

Cela va installer les `heimdalld`et `heimdallcli`binaires. Vérifiez l'installation en vérifiant la version Heimdall sur votre machine:

```bash
heimdalld version --long
```

### Bor {#bor}

Installez la dernière version de Bor. Assurez-vous de giter le paiement vers la bonne [version libérée](https://github.com/maticnetwork/bor/releases).

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

Cela va installer les `bor`et `bootnode`binaires. Vérifiez l'installation en vérifiant la version Bor sur votre machine:

```bash
bor version
```

## Configurer les Fichiers Nœuds {#configure-node-files}

### Récupérer le repo du lancement {#fetch-launch-repo}

```bash
cd ~/
git clone https://github.com/maticnetwork/launch
```

### Configurer le répertoire du lancement {#configure-launch-directory}

Pour configurer le répertoire du réseau, le nom du réseau et le type de nœud sont nécessaires.

**Réseaux disponibles**: `mainnet-v1`et`testnet-v4`

**Type de nœud**:`sentry`

:::tip

Pour la configuration Mainnet et Testnet, utilisez approprié `<network-name>`. Utilisez `mainnet-v1`pour le réseau principal Polygon et `testnet-v4`pour Mumbai Testnet.
:::

```bash
cd ~/
mkdir -p node
cp -rf launch/<network-name>/sentry/<node-type>/* ~/node
```

### Configurer les répertoires du réseau {#configure-network-directories}

**Configuration  des données Heimdall**

```bash
cd ~/node/heimdall
bash setup.sh
```

**Configuration des données de Bor**

```bash
cd ~/node/bor
bash setup.sh
```

## Configurer les Fichiers de Service {#configure-service-files}

Téléchargez le `service.sh`fichier en utilisant approprié .`<network-name>` Utilisez `mainnet-v1`pour le réseau principal Polygon et `testnet-v4`pour Mumbai Testnet.

```bash
cd ~/node
wget https://raw.githubusercontent.com/maticnetwork/launch/master/<network-name>/service.sh
```

Générer le fichier **de** métadonnées:

```bash
sudo mkdir -p /etc/matic
sudo chmod -R 777 /etc/matic/
touch /etc/matic/metadata
```

Générer des `.service`fichiers et les copiez dans le répertoire système:

```bash
cd ~/node
bash service.sh
sudo cp *.service /etc/systemd/system/
```


## Configuration des fichiers Config {#setup-config-files}

- Connectez-vous à la machine automatique / VM
- Vous devrez ajouter quelques détails dans le `config.toml`fichier. Pour ouvrir et modifier le `config.toml`fichier, exécutez la commande suivante : .`vi ~/.heimdalld/config/config.toml`

Dans le fichier de configuration, vous devrez modifier et `Moniker`ajouter des `seeds`informations:

    ```bash
    moniker=<enter unique identifier>
    # For example, moniker=my-sentry-node

    # Mainnet:
    seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656"

    # Testnet:
    seeds="4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656"
    ```

    - Changez la valeur de **Pex** en`true`
    - Changez la valeur de **Prometheus** en`true`
    - Définissez la `max_open_connections`valeur sur`100`

Assurez-vous **de conserver la bonne mise en forme lorsque** vous effectuez les modifications ci-dessus.

- Configurer ce qui suit dans `~/.heimdalld/config/heimdall-config.toml`:

    ```jsx
    eth_rpc_url=<insert Infura or any full node RPC URL to Goerli>
    ```

- Ouvrez le `start.sh`fichier pour Bor à l'aide de cette commande: .`vi ~/node/bor/start.sh` Ajoutez les indicateurs suivants pour démarrer les params:

  ```bash
  # Mainnet:
  --bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303"

  # Testnet:
  --bootnodes "enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303"
  ```

- Pour activer le mode **Archivage,** vous pouvez ajouter les indicateurs suivants dans le `start.sh`fichier:

  ```jsx
  --gcmode 'archive' \
  --ws --ws.port 8546 --ws.addr 0.0.0.0 --ws.origins '*' \
  ```

## Démarrer les services {#start-services}

exécutez le nœud Heimdall complet avec ces commandes sur votre nœud sentinelle:

```bash
sudo service heimdalld start
sudo service heimdalld-rest-server start
```

Maintenant, vous devez vous assurer que **Heimdall est synchronisé** complètement, et puis démarrez Bor. Si vous lancez Bor sans synchroniser complètement Heimdall, vous rencontrerez fréquemment des problèmes.

**Pour vérifier si Heimdall est synchronisé**
  1. Sur la machine/VM automatique, exécutez`curl localhost:26657/status`
  2. Dans la sortie, `catching_up`la valeur devrait être `false`

Une fois Heimdall synchronisé, exécutez la commande ci-dessous:

```bash
sudo service bor start
```

## Registres {#logs}

Les fichiers journaux peuvent être gérés par l'outil `journalctl`linux. Voici un tutoriel pour une utilisation avancée: [Comment utiliser Journalctl pour afficher et manipuler les journaux Systemd](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**Vérifiez les dossiers des nœuds Heimdall**

```bash
journalctl -u heimdalld.service -f
```

**Vérifiez les fichiers journaux Rest-server Heimdall**

```bash
journalctl -u heimdalld-rest-server.service -f
```

**Vérifiez les fichiers journaux Rest-server Bor**

```bash
journalctl -u bor.service -f
```

## Ports et configuration du pare-feu {#ports-and-firewall-setup}

Ouvrez les ports 22, 26656 et 30303 au monde (0.0.0.0/0) sur le pare-feu du noeud sentinelle.

Vous pouvez utiliser le VPN pour restreindre l'accès au port 22 en fonction de vos besoins et des directives de sécurité.
