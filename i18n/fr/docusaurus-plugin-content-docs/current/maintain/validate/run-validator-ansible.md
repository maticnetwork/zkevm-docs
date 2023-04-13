---
id: run-validator-ansible
title: exécutez un nœud validateur avec Ansible
sidebar_label: Using Ansible
description: Utilisez Ansible pour configurer votre nœud validateur sur Polygon
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

Les étapes de ce guide impliquent d'attendre que les services **Heimdall** et **Bor** soient entièrement synchronisés. Ce processus prend plusieurs jours. Vous pouvez également utiliser un instantané maintenu, ce qui réduira le temps de synchronisation à quelques heures. Pour des instructions détaillées, voir [<ins>Instructions en matière d'instantanés pour Heimdall et Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Pour les liens de téléchargement instantanés, consultez [<ins>les Snapshots des chaînes Polygon </ins>](https://snapshot.polygon.technology/).
:::

Cette section vous guide tout au long du démarrage et de l'exécution du nœud validateur à travers un manuel Ansible.

Pour connaître les exigences du système, reportez-vous à la section [Configuration requise du nœud validateur](validator-node-system-requirements.md).

Si vous souhaitez démarrer et exécuter le nœud validateur à partir des binaires, voir [Exécuter un nœud validateur à partir des binaires](run-validator-binaries.md).

:::caution

La capacité de réception de nouveaux validateurs est limitée. Les nouveaux validateurs ne peuvent rejoindre l'ensemble actif que lorsqu'un validateur déjà actif se déroule.

:::

## Prérequis {#prerequisites}

* Trois machines : une machine locale sur laquelle vous utiliserez le manuel Ansible et deux machines distantes, dont une [sentinelle](/docs/maintain/glossary.md#sentry) et une [de validation](/docs/maintain/glossary.md#validator).
* Sur la machine locale, [Ansible](https://www.ansible.com/) doit être installé.
* Sur la machine locale, [Python 3.x](https://www.python.org/downloads/) doit être installé.
* Sur les machines distantes, assurez-vous que Go n'est *pas* installé.
* Sur les machines distantes, la clé publique SSH de votre machine locale se trouve sur les machines distantes pour permettre à Ansible de se connecter à elles.
* Nous avons Bloxroute disponible en tant que réseau de relais. Si vous avez besoin d'une passerelle à ajouter comme votre pair Trusted s'il vous plaît contacter **@validator-support-team** dans [Polygon Discord](https://discord.com/invite/0xPolygon) > VALIDATEURS POS | FOURNISSEURS DE NŒUDS COMPLETS | PARTENAIRES > bloxroute.

## Aperçu {#overview}

Pour accéder à un nœud validateur en cours, procédez comme suit :

1. Préparez les trois machines.
1. Configurez un nœud sentinelle via Ansible.
1. Configurez un nœud validateur via Ansible.
1. Configurez le nœud sentinelle.
1. Démarrez le nœud sentinelle.
1. Configurez le nœud de validation.
1. Définissez les clés du propriétaire et du signataire.
1. Démarrez le nœud de validation.
1. Vérifiez l'état des nœuds avec la communauté.

:::note

Vous devez suivre la **séquence exacte des actions**, sinon vous rencontrerez des problèmes.

Par exemple, un nœud sentinelle doit toujours être configuré avant le nœud validateur.

:::

## Configurer le nœud sentinelle {#set-up-the-sentry-node}

Sur votre machine locale, clonez le [dépôt du nœud Ansible](https://github.com/maticnetwork/node-ansible) :

```sh
git clone https://github.com/maticnetwork/node-ansible
```

Passez au dépôt cloné :

```sh
cd node-ansible
```

Ajoutez les adresses IP des machines distantes qui deviendront un nœud sentinelle et un nœud validateur au `inventory.yml` fichier.

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

Exemple :

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

Vérifiez que la machine distante sentinelle est accessible. Sur la machine locale, exécutez :

```sh
$ ansible sentry -m ping
```

Vous devriez obtenir le résultat suivant :

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Effectuez un test de configuration du nœud sentinelle :

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

Le résultat sera le suivant :

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Exécutez la configuration du nœud sentinelle avec les privilèges sudo :

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

Une fois la configuration terminée, vous verrez un message de validation s'afficher sur le terminal.

:::note

Si vous rencontrez un problème et souhaitez recommencer, exécutez :

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## Configurer le nœud validateur {#set-up-the-validator-node}

À ce stade, vous avez configuré le nœud sentinelle.

Sur votre machine locale, vous avez également configuré le manuel Ansible pour exécuter la configuration du nœud validateur.

Vérifiez que la machine distante de validation est accessible. Sur la machine locale, exécutez `ansible validator -m ping`.

Vous devriez obtenir le résultat suivant :

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Effectuez un test de configuration du nœud validateur :

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

Vous devriez obtenir le résultat suivant :

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Exécutez la configuration du nœud validateur avec les privilèges sudo :

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

Une fois la configuration terminée, vous verrez un message de validation s'afficher sur le terminal.

:::note

Si vous rencontrez un problème et souhaitez recommencer, exécutez :

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## Configurer le nœud sentinelle {#configure-the-sentry-node}

Connectez-vous à la machine distante sentinelle.

### Configurer le service Heimdall {#configure-the-heimdall-service}

Ouvrez `config.toml` pour effectuer des modifications sur `vi ~/.heimdalld/config/config.toml`.

Effectuez les modifications suivantes :

* `moniker` — n'importe quel nom. Exemple: `moniker = "my-full-node"`.
* `seeds` — les adresses de nœud de départ constituées d'un ID de nœud, d'une adresse IP et d'un port.

  Utilisez les valeurs suivantes :

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex`— définissez la valeur sur `true` pour activer l'échange de pairs. Exemple: `pex = true`.
* `private_peer_ids`— l'identifiant de nœud de Heimdall configuré sur la machine de validation.

Pour obtenir l'ID de nœud de Heimdall sur la machine de validation :

  1. Connectez-vous à la machine de validation.
  1. Exécutez `heimdalld tendermint show-node-id`.

  Exemple : `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — définissez la valeur sur `true` pour activer les mesures Prometheus. Exemple: `prometheus = true`.
* `max_open_connections` — définissez la valeur sur `100`. Exemple: `max_open_connections = 100`.

Enregistrez les modifications dans `config.toml`.

### Configurer le service Bor {#configure-the-bor-service}

Ouvrez pour effectuer les modifications `vi ~/node/bor/start.sh`.

Dans `start.sh`, ajoutez les adresses de nœud de démarrage consistant en un ID de nœud, une adresse IP et un port en ajoutant la ligne suivante à la fin :

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

Sauvegardez les modifications dans `start.sh`.

Ouvrez pour effectuer les modifications `vi ~/.bor/data/bor/static-nodes.json`.

Dans `static-nodes.json`, effectuez les modifications suivantes :

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"` — l'ID de nœud et l'adresse IP de Bor configurés sur la machine de validation.

Pour obtenir l'ID de nœud de Bor sur la machine de validation :

  1. Connectez-vous à la machine de validation.
  1. Exécutez `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Exemple : `"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`.

Sauvegardez les modifications dans `static-nodes.json`.

### Configurer le pare-feu {#configure-firewall}

La machine sentinelle doit avoir les ports suivants ouverts au monde `0.0.0.0/0`:

* 26656- Votre service Heimdall connectera votre nœud à d'autres nœuds en utilisant le service Heimdall.

* 30303- Votre service Bor connectera votre nœud à d'autres nœuds en utilisant le service Bor.

* 22- Pour que le validateur soit en mesure d'accéder à ssh de n'importe quel endroit où il se trouve.

:::note

Cependant, s'ils utilisent une connexion VPN, ils ne peuvent autoriser les connexions ssh entrantes qu'à partir de l'adresse IP VPN.

:::

## Démarrer le nœud sentinelle. {#start-the-sentry-node}

Vous démarrerez d'abord le service Heimdall. Une fois le service Heimdall synchronisé, vous démarrerez le service Bor.

:::note

Le service Heimdall prend plusieurs jours pour se synchroniser complètement à partir de zéro.

Vous pouvez également utiliser un instantané maintenu, ce qui réduira le temps de synchronisation à quelques heures. Pour des instructions détaillées, voir [<ins>Instructions en matière d'instantanés pour Heimdall et Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Pour obtenir des liens de téléchargement des instantanés, voir [Instantanés des chaînes Polygon](https://snapshot.polygon.technology/).

:::

### Démarrer le service Heimdall {#start-the-heimdall-service}

La dernière version, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), contient quelques améliorations telles que:
1. Restreindre la taille des données dans synchronisation d'état txs à :
    * **30 kB** lorsqu'elles sont représentées en **octets**
    * **60 kB** lorsqu'elles sont représentées sous forme de **chaîne**.
2. Augmenter le **délai** entre les événements contractuels des différents validateurs pour s'assurer que le mempool ne se remplit pas très rapidement en cas d'arrivée d'événements pouvant entraver la progression de la chaîne.

L'exemple suivant montre comment la taille des données est restreinte :

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

Démarrez le service Heimdall :

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

Dans les fichiers journaux, vous pouvez voir les erreurs suivantes :

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

Cela signifie que l'un des nœuds du réseau a refusé une connexion à votre nœud. Vous n'avez aucune action à effectuer concernant ces erreurs. Attendez que votre nœud analyse plus de nœuds sur le réseau.

:::

Consultez les fichiers journaux du serveur REST de Heimdall :

```sh
journalctl -u heimdalld-rest-server.service -f
```

Vérifiez l'état de synchronisation de Heimdall :

```sh
curl localhost:26657/status
```

La valeur de sortie `catching_up` est :

* `true` — le service Heimdall se synchronise.
* `false` — le service Heimdall est entièrement synchronisé.

Attendez que le service Heimdall soit entièrement synchronisé.

### Démarrer le service Bor {#start-the-bor-service}

Une fois que le service Heimdall a été entièrement synchronisé, démarrez le service Bor.

Démarrez le service Bor :

```sh
sudo service bor start
```

Consultez les fichiers journaux du service Bor :

```sh
journalctl -u bor.service -f
```

## Configurez le nœud validateur. {#configure-the-validator-node}

:::note

Pour exécuter cette section, vous devez avoir à disposition un point de terminaison RPC de votre nœud de réseau principal d'Ethereum entièrement synchronisé.

:::

### Configurer le service Heimdall {#configure-the-heimdall-service-1}

Connectez-vous à la machine de validation.

Ouvrez `config.toml` pour effectuer des modifications sur `vi ~/.heimdalld/config/config.toml`.

Effectuez les modifications suivantes :

* `moniker` — n'importe quel nom. Exemple: `moniker = "my-validator-node"`.
* `pex` — définissez la valeur sur `false` pour désactiver l'échange de pairs. Exemple: `pex = false`.
* `private_peer_ids` — commentez la valeur pour la désactiver. Exemple : `# private_peer_ids = ""`.


Pour obtenir l'ID de nœud de Heimdall sur la machine sentinelle :

  1. Connectez-vous à la machine sentinelle.
  1. Exécutez `heimdalld tendermint show-node-id`.

  Exemple : `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — définissez la valeur sur `true` pour activer les mesures Prometheus. Exemple: `prometheus = true`.

Enregistrez les modifications dans `config.toml`.

Ouvrez pour effectuer les modifications `vi ~/.heimdalld/config/heimdall-config.toml`.

Dans `heimdall-config.toml`, effectuez les modifications suivantes :

* `eth_rpc_url` — un point de terminaison RPC pour un nœud principal Ethereum entièrement synchronisé, à savoir Infura.`eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Exemple :`eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


Sauvegardez les modifications dans `heimdall-config.toml`.

### Configurer le service Bor {#configure-the-bor-service-1}

Ouvrez pour effectuer les modifications `vi ~/.bor/data/bor/static-nodes.json`.

Dans `static-nodes.json`, effectuez les modifications suivantes :

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — l'ID de nœud et l'adresse IP de Bor configurés sur la machine sentinelle.

Pour obtenir l'ID de nœud de Bor sur la machine sentinelle :

  1. Connectez-vous à la machine sentinelle.x
  1. Exécutez `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Exemple : `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

Sauvegardez les modifications dans `static-nodes.json`.

## Définissez la clé du propriétaire et du signataire {#set-the-owner-and-signer-key}

Sur Polygon, vous devez avoir différentes clés en tant que propriétaire et signataire.

* Signataire — l'adresse qui signe les [transactions aux points de contrôle](../glossary#checkpoint-transaction). Il est recommandé de conserver au moins 1 ETH sur l'adresse du signataire.
* Propriétaire — l'adresse qui effectue les transactions de staking. Il est recommandé de conserver les jetons MATIC sur l'adresse du propriétaire.

### Générer une clé privée Heimdall {#generate-a-heimdall-private-key}

Vous devez générer une clé privée Heimdall uniquement sur la machine de validation. **Ne générez pas de clé privée Heimdall sur la machine sentinelle.**

Pour générer la clé privée, exécutez :

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — la clé privée de votre portefeuille Ethereum

:::

Cela générera `priv_validator_key.json`. Déplacez le fichier JSON généré dans le répertoire de configuration Heimdall :

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Générer un fichier keystore Bor {#generate-a-bor-keystore-file}

Vous devez générer un fichier keystore Bor uniquement sur la machine de validation. **Ne générez pas de fichier keystore Bor sur la machine sentinelle.**

Pour générer la clé privée, exécutez :

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — la clé privée de votre portefeuille Ethereum.

:::

Lorsque vous y êtes invité, configurez un mot de passe pour le fichier keystore.

Cela générera un `UTC-<time>-<address>` fichier keystore.

Déplacez le fichier keystore généré vers le répertoire de configuration Bor :

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Ajouter`password.txt`

Assurez-vous de créer un fichier `password.txt`, puis ajoutez le mot de passe du ficher keystore Bor directement dans le fichier `~/.bor/password.txt`.

### Ajoutez votre adresse Ethereum {#add-your-ethereum-address}

Ouvrez pour effectuer les modifications `vi /etc/matic/metadata`.

Dans `metadata`, ajoutez votre adresse Ethereum. Exemple: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

Enregistrez les modifications dans `metadata`.

## Démarrez le nœud validateur. {#start-the-validator-node}

À ce stade, vous devez avoir :

* Le service Heimdall sur la machine sentinelle entièrement synchronisé et fonctionnel.
* Le service Bor sur la machine sentinelle en train de fonctionner.
* Le service Heimdall et le service Bor sur la machine de validation configurés.
* Vos clés propriétaire et signataire configurées.

### Démarrer le service Heimdall {#start-the-heimdall-service-1}

Vous allez maintenant démarrer le service Heimdall sur la machine de validation. Une fois le service Heimdall synchronisé, vous démarrerez le service Bor sur la machine de validation.

Démarrez le service Heimdall :

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

* `true` — le service Heimdall se synchronise.
* `false` — le service Heimdall est entièrement synchronisé.

Attendez que le service Heimdall soit entièrement synchronisé.

### Démarrer le service Bor {#start-the-bor-service-1}

Une fois que le service Heimdall sur la machine de validation a été entièrement synchronisé, démarrez le service Bor sur la machine de validation.

Démarrez le service Bor :

```sh
sudo service bor start
```

Consultez les fichiers journaux du service Bor :

```sh
journalctl -u bor.service -f
```

## Vérifiez l'état des nœuds auprès de la communauté. {#check-node-health-with-the-community}

Maintenant que vos nœuds de sentinelle et de validation sont synchronisés et en cours d'exécution, rendez-vous sur [Discord](https://discord.com/invite/0xPolygon) et demandez à la communauté de vérifier l'état de vos nœuds.

## Procédez au staking {#proceed-to-staking}

Maintenant que vous avez vérifié l'état de vos nœuds de sentinelle et de validation, passez au [staking](/docs/maintain/validator/core-components/staking).
