---
id: run-validator-binaries
title: exécutez le nœud validateur à partir de Binaries
sidebar_label: Using Binaries
description: Utilisez des binaires pour configurer votre nœud validateur
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
Les étapes de ce guide impliquent d'attendre que les services H**eimdall **et B**or **soient entièrement synchronisés. Alternativement, vous pouvez utiliser un instantané géré, ce qui réduira le temps de synchronisation à quelques heures.
Pour des instructions détaillées, voir [<ins>Instructions en matière d'instantanés pour Heimdall et Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Pour les liens de téléchargement instantanés, consultez [<ins>les Snapshots des chaînes Polygon </ins>](https://snapshot.polygon.technology/).

:::

Ce guide vous aidera à exécuter un nœud de validation Polygon à partir des binaires.

Pour les exigences du système, suivez le guide [des exigences](validator-node-system-requirements.md) du système Nœud.

Si vous souhaitez démarrer et exécuter le nœud validateur via Ansible, consultez [Exécuter un nœud validateur avec Ansible](run-validator-ansible.md).

:::caution

La capacité de réception de nouveaux validateurs est limitée. Les nouveaux validateurs ne peuvent rejoindre l'ensemble actif que lorsqu'un validateur déjà actif se déroule.

:::

## Prérequis {#prerequisites}

* Deux machines, une [sentinelle](/docs/maintain/glossary.md#sentry) et une [de validation](/docs/maintain/glossary.md#validator).
* `build-essential` installé à la fois sur les machines sentinelle et de validation.

  Pour installer :

  ```sh
  sudo apt-get install build-essential
  ```

* Go 1.18 installé sur les deux machines sentinelle et de validation.

  Pour installer :

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* RabbitMQ installé sur les machines sentinelles et validateurs.

Voici les commandes pour installer RabbitMQ:

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

Consultez plus d'informations sur le téléchargement et l'installation de RabbitMQ [<ins>ici.</ins>](https://www.rabbitmq.com/download.html)

:::

## Aperçu {#overview}

Pour obtenir un nœud de validation en cours d'exécution, procédez comme suit dans l'**ordre exact des étapes** :

> Vous rencontrerez des problèmes de configuration si ces étapes sont effectuées dans un ordre différent.
> Il est important de garder à l'esprit qu'un nœud sentinelle doit toujours être mis en place avant le nœud de validation.

1. Préparez deux machines, une pour le nœud sentinelle et une autre pour le nœud de validation.
2. Installez les binaires Heimdall et Bor sur les machines sentinelle et de validation.
3. Configurez les fichiers de service de Heimdall et Bor sur les machines sentinelle et de validation.
4. Configurez les services Heimdall et Bor sur les machines sentinelle et de validation.
5. Configurez le nœud sentinelle.
6. Démarrez le nœud sentinelle.
7. Configurez le nœud de validation.
8. Définissez les clés du propriétaire et du signataire.
9. Démarrez le nœud de validation.
10. Vérifiez l'état des nœuds avec la communauté.

## Installation des binaires {#installing-the-binaries}

Installez les binaires à la fois sur les machines sentinelle et de validation.

### Installation de Heimdall {#installing-heimdall}

[Heimdall](/docs/pos/heimdall/overview) est la couche de vérification de la preuve d'enjeu
responsable du point de contrôle de la représentation des blocs Plasma sur le réseau principal Ethereum.

La dernière version, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), contient quelques améliorations telles que:
1. Restreindre la taille des données dans synchronisation d'état txs à :
    * **30 kB** lorsqu'elles sont représentées en **octets**
    * **60 kB** lorsqu'elles sont représentées sous forme de **chaîne**.
2. Augmenter le **délai** entre les événements contractuels des différents validateurs pour s'assurer que le mempool ne se remplit pas très rapidement en cas d'arrivée d'événements pouvant entraver la progression de la chaîne.

L'exemple suivant montre comment la taille des données est restreinte :

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Clonez le  [répertoire de Heimdall](https://github.com/maticnetwork/heimdall/) :

```sh
git clone https://github.com/maticnetwork/heimdall
```

Naviguez jusqu'à la [version correcte](https://github.com/maticnetwork/heimdall/releases) :

```sh
git checkout RELEASE_TAG
```

Dans `RELEASE_TAG` se trouve la balise de la version que vous installez.

Par exemple :

```sh
git checkout v0.3.0
```

Une fois que vous obtenez la bonne version, installez Heimdall :

```sh
make install
source ~/.profile
```

Vérifiez l'installation de Heimdall :

```sh
heimdalld version --long
```

:::note

Avant de procéder, Heimdall doit être installé sur les machines sentinelle et de validation.

:::

### Installation de Bor {#installing-bor}

[Bor](/docs/pos/bor) est l'opérateur sidechain qui agit comme couche de production de blocs, qui se synchronise avec Heimdall pour sélectionner les producteurs de blocs et les vérificateurs pour chaque [portée](/docs/maintain/glossary.md#span) et [sprint](/docs/maintain/glossary.md#sprint).

Clonez le [répertoire Bor](https://github.com/maticnetwork/bor) :

```sh
git clone https://github.com/maticnetwork/bor
```

Naviguez jusqu'à la [version correcte](https://github.com/maticnetwork/bor/releases) :

```sh
git checkout RELEASE_TAG
```

Dans `RELEASE_TAG` se trouve la balise de la version que vous installez.

Par exemple :

```sh
git checkout v0.3.3
```

Installez Bor :

```sh
make bor-all
```

Créez des liens symboliques :

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Vérifiez l'installation de Bor :

```sh
bor version
```

:::note

Avant de poursuivre, Bor doit être installé sur les machines sentinelle et de validation.

:::

## Configuration des fichiers de nœuds {#setting-up-node-files}

:::note

Les fichiers de nœuds doivent être configurés sur les machines sentinelle et de validation.

:::

### Récupération du référentiel de lancement {#fetching-the-launch-repository}

Clonez le [référentiel de lancement](https://github.com/maticnetwork/launch) :

```sh
git clone https://github.com/maticnetwork/launch
```

### Configuration du répertoire de lancement {#setting-up-the-launch-directory}

#### Sur la machine sentinelle {#on-the-sentry-machine}

Créez un répertoire `node` :

```sh
mkdir -p node
```

Copiez les fichiers et scripts du répertoire `launch` vers le `node`répertoire :

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### Sur la machine de validation {#on-the-validator-machine}

Créez un répertoire `node` :

```sh
mkdir -p node
```

Copiez les fichiers et scripts du répertoire `launch` vers le `node`répertoire :

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### Configuration des répertoires réseau {#setting-up-the-network-directories}

:::note

Exécutez cette section à la fois sur les machines sentinelle et de validation.

:::

#### Configuration de Heimdall {#setting-up-heimdall}

Passez au répertoire `node` :

```sh
cd ~/node/heimdall
```

Exécutez le scénario de configuration :

```sh
bash setup.sh
```

#### Configuration de Bor {#setting-up-bor}

Passez au répertoire `node` :

```sh
cd ~/node/bor
```

Exécutez le scénario de configuration :

```sh
bash setup.sh
```

## Configuration des services {#setting-up-the-services}

:::note

Exécutez cette section à la fois sur les machines sentinelle et de validation.

:::

Naviguez jusqu'au `node` répertoire :

```sh
cd ~/node
```

Exécutez le scénario de configuration :

```sh
bash service.sh
```

Copiez le fichier de service vers le répertoire système :

```sh
sudo cp *.service /etc/systemd/system/
```

## Configuration du nœud sentinelle {#configuring-the-sentry-node}

Commencez par vous connecter à la machine sentinelle distante.

### Configuration des services Heimdall {#configuring-the-heimdall-services}

Ouvrez le fichier de configuration de Heimdall pour le modifier :

```sh
vi ~/.heimdalld/config/config.toml
```

Dans `config.toml`, modifiez les paramètres suivants :

* `moniker` — n'importe quel nom. Exemple: `moniker = "my-sentry-node"`.
* `seeds` — les adresses de nœud de départ constituées d'un ID de nœud, d'une adresse IP et d'un port.

  Utilisez les valeurs suivantes :

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex`— définissez la valeur sur `true` pour activer l'échange de pairs. Exemple: `pex = true`.
* `private_peer_ids`— l'identifiant de nœud de Heimdall configuré sur la machine de validation.

  Pour obtenir l'identifiant de nœud de Heimdall sur la machine de validation :

  1. Connectez-vous à la machine de validation.
  2. Exécutez :
     ```sh
     heimdalld tendermint show-node-id
     ```

  Exemple : `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — définissez la valeur sur `true` pour activer les mesures Prometheus. Exemple: `prometheus = true`.
* `max_open_connections` — définissez la valeur sur `100`. Exemple: `max_open_connections = 100`.

Enregistrez les modifications dans `config.toml`.

### Configuration du service Bor {#configuring-the-bor-service}

Ouvrez le fichier de configuration de Bor pour le modifier :

```sh
`vi ~/node/bor/start.sh`
```

Dans `start.sh`, ajoutez les adresses des nœuds de démarrage qui consistent en un identifiant de nœud, une adresse IP et un port
en ajoutant la ligne suivante à la fin du fichier :

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Enregistrez les modifications dans `start.sh`.

### Configuration d'un pare-feu {#configuring-a-firewall}

La machine sentinelle doit avoir les ports suivants ouverts au monde `0.0.0.0/0` :

* `26656`- Votre service Heimdall connectera votre nœud au service Heimdall d'autres nœuds.

* `30303`- Votre service Bor connectera votre nœud au service Bor d'autres nœuds.

* `22`- Pour que le validateur soit capable d'accéder à ssh d'où qu'il soit.

## Démarrage du nœud sentinelle {#starting-the-sentry-node}

Vous démarrerez d'abord le service Heimdall. Une fois le service Heimdall synchronisé, vous démarrerez le service Bor.

:::note

Comme nous l'avons mentionné précédemment, le service Heimdall prend plusieurs jours pour se synchroniser complètement à partir de zéro.

Alternativement, vous pouvez utiliser un instantané géré, ce qui réduira le temps de synchronisation à quelques heures.
Pour des instructions détaillées, voir [<ins>Instructions en matière d'instantanés pour Heimdall et Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Pour obtenir des liens de téléchargement des instantanés, voir [Instantanés des chaînes Polygon](https://snapshot.polygon.technology/).

:::

### Démarrage du service Heimdall {#starting-the-heimdall-service}

Démarrez le service Heimdall :

```sh
sudo service heimdalld start
```

Démarrez le serveur REST de Heimdall :

```sh
sudo service heimdalld-rest-server start
```

Vérifiez les journaux de service Heimdall :

```sh
journalctl -u heimdalld.service -f
```

:::note

Dans les journaux, vous pouvez voir les erreurs suivantes :

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

Ces journaux signifient que l'un des nœuds du réseau a refusé une connexion à votre nœud.
Attendez que votre nœud ramène d'autres nœuds sur le réseau ; vous n'avez rien à faire
pour corriger ces erreurs.

:::

Vérifiez les journaux du serveur REST de Heimdall :

```sh
journalctl -u heimdalld-rest-server.service -f
```

Vérifiez l'état de synchronisation de Heimdall :

```sh
curl localhost:26657/status
```

La valeur de sortie `catching_up` est :

* `true` — le service Heimdall se synchronise.
* `false`— le service Heimdall est complètement synchronisé.

Attendez que le service Heimdall se synchronise complètement.

### Démarrage du service Bor {#starting-the-bor-service}

Une fois le service Heimdall synchronisé, démarrez le service Bor.

Démarrer le service Bor :

```sh
sudo service bor start
```

Vérifiez les journaux de service Bor :

```sh
journalctl -u bor.service -f
```

## Configuration du nœud de validation {#configuring-the-validator-node}

:::note

Pour compléter cette section, le point de terminaison RPC de votre nœud du réseau principal Ethereum entièrement synchronisé
devra être prêt.

:::

### Configuration du service Heimdall {#configuring-the-heimdall-service}

Connectez-vous à la machine de validation distante.

Ouvrez pour modifier `vi ~/.heimdalld/config/config.toml`.

Dans `config.toml`, effectuez les modifications suivantes :

* `moniker` — n'importe quel nom. Exemple: `moniker = "my-validator-node"`.
* `pex` — définissez la valeur sur `false` pour désactiver l'échange de pairs. Exemple: `pex = false`.
* `private_peer_ids` — commentez la valeur pour la désactiver. Exemple : `# private_peer_ids = ""`.

  Pour obtenir l'identifiant de nœud de Heimdall sur la machine sentinelle :

  1. Connectez-vous à la machine sentinelle.
  1. Exécutez `heimdalld tendermint show-node-id`.

Exemple :`persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus`— définissez la valeur sur `true` pour activer les mesures Prometheus. Exemple: `prometheus = true`.

Enregistrez les modifications dans `config.toml`.

Ouvrez pour effectuer les modifications `vi ~/.heimdalld/config/heimdall-config.toml`.

Dans `heimdall-config.toml`, effectuez les modifications suivantes :

* `eth_rpc_url` — un point de terminaison RPC pour un nœud de réseau principal Ethereum complètement synchronisé,
c.-à-d. Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Exemple :`eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

Enregistrez les modifications dans `heimdall-config.toml`.

### Configuration du service Bor {#configuring-the-bor-service-1}

Ouvrez pour modifier `vi ~/.bor/data/bor/static-nodes.json`.

Dans `static-nodes.json`, effectuez les modifications suivantes :

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"`— l'identifiant du nœud et
l'adresse IP de Bor installée sur la machine sentinelle.

  Pour obtenir l'ID de nœud de Bor sur la machine sentinelle :

  1. Connectez-vous à la machine sentinelle.
  2. Exécutez `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Exemple : `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Enregistrez les modifications dans `static-nodes.json`.

## Définition de la clé du propriétaire et du signataire {#setting-the-owner-and-signer-key}

Sur Polygon, il est recommandé de différencier la clé du propriétaire de celle du signataire.

* Signataire — l'adresse qui signe les
[transactions des points de contrôle](/docs/maintain/glossary.md#checkpoint-transaction). La recommandation est de
conserver au moins 1 ETH sur l'adresse du signataire.
* Propriétaire — l'adresse qui effectue les transactions de staking. La recommandation est de conserver les jetons MATIC
sur l'adresse du propriétaire.

### Génération d'une clé privée Heimdall {#generating-a-heimdall-private-key}

Vous devez générer une clé privée Heimdall uniquement sur la machine de validation. Ne générez pas de clé privée Heimdall
sur la machine sentinelle.

Pour générer la clé privée, exécutez :

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

où

* ETHEREUM_PRIVATE_KEY — la clé privée de votre portefeuille Ethereum.

Cela générera `priv_validator_key.json`. Déplacez le fichier JSON généré vers la configuration du
répertoire Heimdall :

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Génération d'un fichier keystore Bor {#generating-a-bor-keystore-file}

Vous devez générer un fichier keystore Bor uniquement sur la machine de validation. Ne générez pas de fichier keystore Bor
sur la machine sentinelle.

Pour générer la clé privée, exécutez :

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

où

* ETHEREUM_PRIVATE_KEY — la clé privée de votre portefeuille Ethereum.

Lorsque vous y êtes invité, configurez un mot de passe pour le fichier keystore.

Cela générera un `UTC-<time>-<address>` fichier keystore.

Déplacez le fichier keystore généré vers le répertoire de configuration Bor :

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Ajoutez password.txt {#add-password-txt}

Assurez-vous de créer un fichier `password.txt`, puis ajoutez le mot de passe du fichier keystore Bor directement dans le
`~/.bor/password.txt`. fichier.

### Ajoutez votre adresse Ethereum {#add-your-ethereum-address}

Ouvrez pour effectuer les modifications `vi /etc/matic/metadata`.

Dans `metadata`, ajoutez votre adresse Ethereum. Exemple: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Enregistrez les modifications dans `metadata`.

## Démarrage du nœud de validation {#starting-the-validator-node}

À ce stade, vous devez avoir :

* Le service Heimdall sur la machine sentinelle se synchronise et s'exécute.
* Le service Bor sur la machine sentinelle en cours d'exécution.
* Le service Heimdall et le service Bor sur la machine de validation configurés.
* Vos clés propriétaire et signataire configurées.

### Démarrage du service Heimdall {#starting-the-heimdall-service-1}

Vous allez maintenant démarrer le service Heimdall sur la machine de validation. Une fois le service Heimdall synchronisé, vous
démarrerez le service Bor sur la machine de validation.

Démarrez le service Heimdall :

```sh
sudo service heimdalld start
```

Démarrez le serveur REST de Heimdall :

```sh
sudo service heimdalld-rest-server start
```

Démarrez le pont Heimdall :

```sh
sudo service heimdalld-bridge start
```

Vérifiez les journaux de service Heimdall :

```sh
journalctl -u heimdalld.service -f
```

Vérifiez les journaux du serveur REST de Heimdall :

```sh
journalctl -u heimdalld-rest-server.service -f
```

Vérifiez les journaux de pont Heimdall :

```sh
journalctl -u heimdalld-bridge.service -f
```

Vérifiez l'état de synchronisation de Heimdall :

```sh
curl localhost:26657/status
```

La valeur de sortie `catching_up` est :

* `true`— le service Heimdall se synchronise.
* `false`— le service Heimdall est synchronisé.

Attendez que le service Heimdall se synchronise complètement.

### Démarrage du service Bor {#starting-the-bor-service-1}

Une fois que le service Heimdall sur la machine de validation s'est synchronisé, démarrez le service Bor
sur la machine de validation.

Démarrer le service Bor :

```sh
sudo service bor start
```

Vérifiez les journaux de service Bor :

```sh
journalctl -u bor.service -f
```

## Contrôles de l'intégrité avec la communauté {#health-checks-with-the-community}

Maintenant que vos nœuds sentinelle et de validation sont synchronisés et en cours d'exécution, rendez-vous sur
[Discord](https://discord.com/invite/0xPolygon) et invitez la communauté à effectuer un contrôle de l'intégrité de vos nœuds.

## Étapes suivantes : staking {#next-steps-staking}

Maintenant que l'intégrité de vos nœuds sentinelle et de validation sont contrôlés, passez au
guide [Staking](/docs/maintain/validator/core-components/staking.md) pour commencer à sauvegarder le réseau.
