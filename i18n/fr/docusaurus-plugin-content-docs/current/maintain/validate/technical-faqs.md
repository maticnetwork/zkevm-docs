---
id: technical-faqs
title: FAQ techniques
description: Foire aux questions relatives à l'exécution d'un validateur sur le réseau Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - faqs
  - technical
slug: technical-faqs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### 1. Les clés privées sont-elles les mêmes pour les keystore Heimdall et Bor ? {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}

Oui, la clé privée utilisée pour générer les clés validateur et le keystore Bor est la même. La clé privée utilisée dans ce cas est l'adresse ETH de votre portefeuille où vos jetons testnet Polygon sont stockés.

### 2. Liste des commandes communes {#2-list-of-common-commands}

Nous avons actuellement une liste facile à consulter pour les paquets Linux. Nous continuerons à mettre à jour cette liste régulièrement pour plus de facilité.

**Pour les paquets Linux**

#### A. Où trouver le fichier genesis Heimdall ? {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### B. Où trouver heimdall-config.toml ? {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. Où trouver config.toml ? {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. Où trouver heimdall-seeds.txt ? {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. Démarrer Heimdall {#e-start-heimdall}

`$ sudo service heimdalld start`

#### F. Démarrer le serveur REST de Heimdall {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### G. Démarrer le serveur pont de Heimdall {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. Journaux Heimdall {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. Où trouver le fichier genesis Bor ? {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### J. Démarrer Bor {#j-start-bor}

`sudo service bor start`

#### K. Consulter les journaux Heimdall {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. Consulter le serveur REST de Heimdall {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. Consulter les journaux du pont Heimdall {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. Consulter les journaux Bor {#n-check-bor-logs}

`tail -f bor.log`

#### O. Processus Kill Bor {#o-kill-bor-process}

**Pour Linux** :

1. `ps -aux | grep bor`. Obtenez le PID pour Bor, puis exécutez la commande suivante.
2. `sudo kill -9 PID`

**Pour les binaires** :

Allez sur `CS-2003/bor`, puis exécutez `bash stop.sh`

### 3. Error: Failed to unlock account (0x...) No key for given address or file {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

Cette erreur se produit parce que le chemin du fichier password.txt est incorrect. Vous pouvez suivre les étapes ci-dessous pour corriger cette erreur :

Cette erreur se produit parce que le chemin du fichier password.txt et Keystore est incorrect. Vous pouvez suivre les étapes ci-dessous pour corriger cette erreur :

1. Copiez le fichier du keystore Bor sur

    /etc/bor/dataDir/keystore

2. Et password.txt sur

    /etc/bor/dataDir/

3. Assurez-vous d'avoir ajouté la bonne adresse dans `/etc/bor/metadata`

Pour les binaires :

1. Copiez le fichier du keystore Bor sur :

`/var/lib/bor/keystore/`

2. Et password.txt sur

`/var/lib/bor/password.txt`


### 4. Error: Wrong Block.Header.AppHash. Expected xxxx {#4-error-wrong-block-header-apphash-expected-xxxx}

Cela se produit généralement en raison d'une installation incorrecte de Heimdall. Vous pouvez suivre les étapes ci-dessous pour rectifier ceci :

exécuter

    ```heimdalld unsafe-reset-all```

et redémarrez les services Heimdall. Vous pouvez vous référer à ce guide - https://docs.polygon.technology/docs/validate/validate/run-validator

### 5. À partir de quelle source puis-je créer la clé API ? {#5-from-where-do-i-create-the-api-key}

Vous pouvez accéder à ce lien: [https://infura.io/register](https://infura.io/register). Une fois que vous avez configuré votre compte et votre projet, assurez-vous de copier la clé API pour Ropsten et non Réseau principal.

Réseau principal est sélectionné par défaut.

### 6. Heimdall ne fonctionne pas. Je reçois une erreur « Panique » {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**Erreur réelle** : mon heimdalld ne fonctionne pas. Dans le journal, la première ligne est :
panique : db_backend leveldb inconnu, attendu goleveldb ou memdb ou fsdb

Changez la configuration pour `goleveldb` dans `config.toml`.


### 7. Comment puis-je supprimer les restes de Heimdall et Bor ? {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

Si vous souhaitez supprimer les restes de Heimdall et Bor, vous pouvez exécuter les commandes suivantes
Bor :

Pour le paquet Linux :

```$ sudo dpkg -i matic-bor```

Et supprimez le répertoire Bor :

```$ sudo rm -rf /etc/bor```

Pour les binaires :

```$ sudo rm -rf /etc/bor```

Et

```$ sudo rm /etc/heimdall```


### 8. Combien de validateurs peuvent être actifs simultanément ? {#8-how-many-validators-can-be-active-concurrently}

Il y aura jusqu'à 100 validateurs actifs à la fois. Nous attirerons plus de participants si la limite est atteinte à mi-parcours de l'événement. Notez que les validateurs actifs sont principalement ceux dont la disponibilité est élevée. Les participants avec des temps d'arrêt élevés seront forcés de sortir.

### 9. Combien dois-je staker ? {#9-how-much-should-i-stake}

« stake-amount » et « heimdall-fee-amount » : combien cela devrait-il coûter ?

Un minimum de 10 jetons Matic est requis pour le montant de la mise, et les frais de Heimdall doivent être supérieurs à 10. Par exemple, si le montant de votre stake est de 400, les frais de Heimdall devraient être de 20. Nous recommandons de maintenir les frais de Heimdall à 20.

Cependant, veuillez noter que les valeurs saisies dans stake-amount et heimdall-fee-amount doivent être saisies en 18 décimales

Par exemple,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. J'ai été sélectionné pour devenir validateur mais mon adresse ETH était incorrecte. Que dois-je faire ? {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

Si vous avez accès à l'adresse ETH que vous avez fournie précédemment, vous pouvez transférer les jetons de test de ce compte vers le compte courant. Ensuite, vous pouvez lancer votre processus de configuration de vos nœuds.

Si vous n'avez pas accès à cette adresse ETH, nous ne transférerons pas vos jetons séparément. Vous pouvez vous réenregistrer dans le formulaire avec l'adresse ETH correcte.

### 11. Je reçois une erreur au démarrage du pont {#11-i-m-getting-an-error-starting-the-bridge}

**Error**: Object "start" is unknown, try "bridge help". Est-il toujours acceptable d'ignorer cela ?

Vérifiez « quel pont » : s'il s'agit de `/usr/sbin/bridge`, vous n'exécutez pas le bon programme de pont.

Essayez `~/go/bin/bridge` à la place `(or $GOBIN/bridge)`


### 12. Je reçois une erreur dpkg {#12-i-m-getting-dpkg-error}

**Error**: "dpkg: error processing archive matic-heimdall_1.0.0_amd64.deb (--install): trying to overwrite '/heimdalld-rest-server.service', which is also in package matic-node 1.0.0"

Cela se produit principalement en raison d'une installation antérieure de Polygon sur votre machine. Pour résoudre le problème, vous pouvez exécuter :

`sudo dpkg -r matic-node`


### 13. Je ne sais pas quelle clé privée je dois ajouter lorsque je génère une clé de validateur {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

La clé privée à utiliser est l'adresse ETH de votre portefeuille où vos jetons Polygon testnet sont stockés. Vous pouvez terminer la configuration avec une clé privée et une clé publique liées à l'adresse fournie dans le formulaire.


### 14. Y a-t-il un moyen de savoir si Heimdall est synchronisé ? {#14-is-there-a-way-to-know-if-heimdall-is-synced}

Vous pouvez exécuter la commande suivante pour vérifier :

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

Vérifiez la valeur de catching_up. Si elle est fausse, le nœud est entièrement synchronisé.


### 15. Si quelqu'un devient un staker du Top 10, comment recevra-t-il sa récompense MATIC ? {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

Les récompenses de l'étape 1 ne sont pas basées sur le stake. Veuillez vous reporter à https://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/ pour consulter les détails de la récompense. Les participants ayant un stake élevé ne sont pas automatiquement qualifiés pour recevoir une récompense à cette étape.


### 16. Quelle devrait être ma version de Heimdall ? {#16-what-should-be-my-heimdall-version}

Pour consulter votre version de Heimdall, vous pouvez simplement exécuter :

```heimdalld version```

La version correcte de Heimdall pour l'étape 1 devrait être `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`


### 17. Quelles valeurs dois-je ajouter dans le montant du stake et le montant des frais ? {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

Un minimum de 10 jetons Matic est requis pour le montant de la mise, et les frais de Heimdall doivent être supérieurs à 10. Par exemple, si le montant de votre stake est de 400, les frais de Heimdall devraient être de 20. Nous recommandons de maintenir les frais de Heimdall à 20.

Cependant, veuillez noter que les valeurs saisies dans stake-amount et heimdall-fee-amount doivent être saisies en 18 décimales

Par exemple,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. Quelle est la différence entre `/var/lib/heimdall` et `/etc/heimdall?` ?

`/var/lib/heimdall` est le répertoire Heimdall lorsque vous utilisez la méthode d'installation binaire. `/etc/heimdall` est pour la méthode d'installation du paquet Linux.


### 19. Lorsque j'effectue la transaction de stake, je reçois l'erreur « Gaz dépassé » {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

Cette erreur peut se produire en raison du format du stake ou du montant des frais. Les valeurs saisies lors de l'ordre de stake doivent contenir 18 décimales.

Cependant, veuillez noter que les valeurs saisies dans stake-amount et heimdall-fee-amount doivent être saisies en 18 décimales

Par exemple,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. Quand aurai-je une chance de devenir un validateur ? {#20-when-will-i-get-a-chance-to-become-a-validator}

Nous ajoutons progressivement des validateurs tout au long de l'événement de la phase 1. Nous publierons progressivement une liste de nouveaux validateurs externes. Cette liste sera annoncée sur la chaîne Discord.


### 21. Où puis-je trouver les informations de compte Heimdall ? {#21-where-can-i-find-heimdall-account-info-location}

Pour les binaires:

    /var/lib/heimdall/config folder

Pour le paquet Linux :

    /etc/heimdall/config


### 22. Dans quel fichier dois-je ajouter la clé API ? {#22-which-file-do-i-add-the-api-key-in}

Une fois que vous avez créé la clé API, vous devez l'ajouter dans le fichier `heimdall-config.toml`.


### 23. Quel fichier dois-je ajouter aux persistent_peers ? {#23-which-file-do-i-add-the-persistent_peers}

Vous ajouter les persistent_peers dans le dossier suivant :

    /var/lib/heimdall/config/config.toml


### 24. « Avez-vous réinitialisé Tendermint sans réinitialiser les données de votre application ? » {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

Dans ce cas, vous pouvez réinitialiser les données de configuration de Heimdall et essayer de relancer l'installation.

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. Error: Unable to unmarshall config Error 1 error(s) decoding {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

Error: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

Cela est dû principalement à des fautes de frappe, à des parties manquantes ou à un ancien fichier de configuration qui est toujours un reste. Vous devrez effacer tous les restes, puis essayer à nouveau de procéder à la configuration.

### 26. Arrêter les services de Heimdall et Bor {#26-to-stop-heimdall-and-bor-services}

**Pour les paquets Linux** :

Arrêter Heimdall : `sudo service heimdalld stop`

Arrêter Bor : `sudo service bor stop`ou

1. `ps -aux | grep bor`. Obtenez le PID pour Bor, puis exécutez la commande suivante.
2. `sudo kill -9 PID`

**Pour les binaires** :

Arrêter Heimdall : `pkill heimdalld`

Arrêter le pont : `pkill heimdalld-bridge`

Arrêter Bor : aller sur CS-2001/bor, puis exécuter `bash stop.sh`

### 27. Pour supprimer les répertoires Heimdall et Bor {#27-to-remove-heimdall-and-bor-directories}

**Pour les paquets Linux** :
Supprimer Heimdall : `sudo rm -rf /etc/heimdall/*`

Supprimer Bor : `sudo rm -rf /etc/bor/*`

**Pour les binaires** :

Supprimer Heimdall : `sudo rm -rf /var/lib/heimdall/`

Supprimer Bor : `sudo rm -rf /var/lib/bor`

### 28. Que faire lorsque vous obtenez l'erreur « Wrong Block.Header.AppHash. » ? {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

Cette erreur survient généralement en raison de l'épuisement des requêtes Infura. Lorsque vous configurez un nœud sur Polygon, vous ajoutez une clé Infura au fichier de configuration (Heimdall). Par défaut, vous êtes autorisé à effectuer 100 000 demandes par jour. Si cette limite est dépassée, vous pouvez rencontrer ce type de problème.
Pour résoudre ce problème, vous pouvez créer une nouvelle clé API et l'ajouter au fichier `config.toml`.

:::tip Restez informé

Suivez les dernières actualités en matière de nœuds et de validateurs de l'équipe Polygon et de la communauté en vous inscrivant sur les [Groupes de notification Polygon](https://polygon.technology/notifications/)

:::
