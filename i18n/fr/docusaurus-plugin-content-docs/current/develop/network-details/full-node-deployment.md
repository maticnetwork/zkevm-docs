---
id: full-node-deployment
title: Exécuter un nœud complet avec Ansible
description: Déployez un nœud complet en utilisant Ansible
keywords:
  - docs
  - polygon
  - matic
  - node
  - full node setup
  - ansible
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Ce tutoriel vous guide à travers le démarrage et l'exécution d'un nœud complet en utilisant Ansible.

Un [playbook Ansible](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html) est utilisé pour configurez et gérez un nœud complet. Consultez le guide [des exigences techniques minimales](technical-requirements.md) pour les exigences du système.

:::tip

Les étapes de ce guide impliquent d'attendre que les services Heimdall et Bor puissent se synchroniser complètement. Ce processus prend plusieurs jours pour être complété.

Alternativement, vous pouvez utiliser un instantané maintenu pour réduire le temps de synchronisation à quelques heures. Pour des instructions détaillées, voir [<ins>Instructions en matière d'instantanés pour Heimdall et Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Pour les liens de téléchargement instantanés, consultez la page [<ins>Snapshot des chaînes Polygon</ins>](https://snapshot.polygon.technology/) .

:::

## Prérequis {#prerequisites}

- Installez Ansible sur votre machine locale avec Python3.x. La configuration ne fonctionnera pas si vous avez Python2.x.
    - Pour installer Ansible avec Python 3.x, vous pouvez utiliser pip. Si vous n'avez pas de pip sur votre machine, suivez les étapes décrites [ici](https://pip.pypa.io/en/stable/). Exécutez `pip3 install ansible`pour installer Ansible.
- Consultez le [référentiel Ansible Polygon PoS](https://github.com/maticnetwork/node-ansible#requirements) pour exigences
- Vous devrez également vous assurer que Go n'est **pas installé** dans votre environnement. Vous rencontrerez des problèmes si vous essayez de configurer votre nœud complet via Ansible avec Go installé, car Ansible exige l'installation de paquets spécifiques de Go.
- Vous devez également vous assurer que votre VM / machine n'a pas de configurations antérieures pour la Validation de Polygone ou Heimdall ou Bor. Vous devrez les supprimer car votre installation rencontrera des problèmes.  

:::info Améliorations de la source Heimdall

La dernière version Heimdall, **[v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0)**, contient quelques améliorations. Le délai entre les événements du contrat de différents validateurs **a été augmenté** pour s'assurer que le mempool ne soit pas rempli rapidement en cas de rafales d'événements susceptibles de compromettre les progrès de la chaîne.

De plus, la taille des données **a été limitée dans la synchronisation d'état txs à 30 Kb (lorsqu'elle est représentée en octets) et 60 Kb (lorsqu'elle est définie comme chaîne)**. Par exemple:

```bash
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```
:::

## Configuration complète {#full-node-setup}

- Assurez-vous d'avoir accès à la machine distante ou à la machine virtuelle sur laquelle le nœud complet est configuré .
  > Référez-vous à [https://github.com/maticnetwork/node-ansible#setup](https://github.com/maticnetwork/node-ansible#setup) pour plus de détails.
- Clonez le répertoire [https://github.com/maticnetwork/node-ansible](https://github.com/maticnetwork/node-ansible).
- Naviguez dans le dossier ansible aux nœud:`cd node-ansible`
- Modifiez le `inventory.yml`fichier et insérez votre ou vos IP(s) dans la `sentry->hosts`section.
  > Référez-vous à [https://github.com/maticnetwork/node-ansible#inventory](https://github.com/maticnetwork/node-ansible#inventory) pour plus de détails.
- Vérifiez si la machine distante est accessible en exécutant:`ansible sentry -m ping`
- Pour tester si la bonne machine est configurée, exécutez la commande suivante :

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry" --list-hosts

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry" --list-hosts
  ```

  <img src={useBaseUrl("img/network/full-node-mumbai.png")} />

- Ensuite, configurez le nœud complet avec cette commande:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry"

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry"
  ```

- Si vous rencontrez des problèmes, supprimez et nettoyez toute la configuration en utilisant :
  ```
  ansible-playbook playbooks/clean.yml
  ```

- Une fois que vous avez initié le livre de lecture Ansible, connectez-vous à la machine distante.

- Nœuds de graines Heimdall:

  ```bash
  moniker=<enter unique identifier>

  # Mainnet:
  seeds="d3a8990f61bb3657da1664fe437d4993c4599a7e@3.211.248.31:26656,d3d7d397339c9126235dfab11bf925e269776f4f@3.212.183.151:26656,68254d33685fad151e45bfe1ed33d538ba6ec8cb@3.93.224.197:26656,d26c54ebbf274896f12977bb13d83ac1237a8226@184.73.124.158:26656,f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656"

  # Testnet:
  seeds="b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656,4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,7a6c7b5d25b13ce3448b047dbebeb1a19cc2e092@18.213.200.99:26656"
  ```
- Bootnodes:

  ```bash
  # Mainnet:
  bootnode ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303","enode://4be7248c3a12c5f95d4ef5fff37f7c44ad1072fdb59701b2e5987c5f3846ef448ce7eabc941c5575b13db0fb016552c1fa5cca0dda1a8008cf6d63874c0f3eb7@3.93.224.197:30303","enode://32dd20eaf75513cf84ffc9940972ab17a62e88ea753b0780ea5eca9f40f9254064dacb99508337043d944c2a41b561a17deaad45c53ea0be02663e55e6a302b2@3.212.183.151:30303"]

  # Testnet:
  bootnodes ["enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303","enode://f0f48a8781629f95ff02606081e6e43e4aebd503f3d07fc931fad7dd5ca1ba52bd849a6f6c3be0e375cf13c9ae04d859c4a9ae3546dc8ed4f10aa5dbb47d4998@34.226.134.117:30303"]
  ```

- Pour vérifier si Heimdall est synchronisé
    - Sur la machine/VM automatique, exécutez`curl localhost:26657/status`
    - Dans la sortie, `catching_up`la valeur devrait être `false`

- Une fois que Heimdall est synchronisé, exécutez
    - `sudo service bor start`

Vous avez configuré avec succès un nœud complet avec Ansible.

:::note

Si Bor présente une erreur de permission pour les données, exécutez cette commande pour faire de l'utilisateur Bor le propriétaire des fichiers Bor :

```bash
sudo chown bor /var/lib/bor
```

:::
## Registres {#logs}

Les fichiers journaux peuvent être gérés par l'outil `journalctl`linux. Voici un tutoriel pour une utilisation avancée: [Comment utiliser Journalctl pour afficher et manipuler les journaux Systemd](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**Vérifiez les dossiers des nœuds Heimdall**

```bash
journalctl -u heimdalld.service -f
```

**Vérifiez les fichiers journaux Rest-server Bor**

```bash
journalctl -u bor.service -f
```

## Ports et configuration du pare-feu {#ports-and-firewall-setup}

Ouvrez les ports 22, 26656 et 30303 au monde (0.0.0.0/0) sur le pare-feu du noeud sentinelle.

Vous pouvez utiliser le VPN pour restreindre l'accès au port 22 en fonction de vos besoins et des directives de sécurité.