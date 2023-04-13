---
id: full-node-deployment
title: Esegui in nodo completo con Ansible
description: Distribuzione un Nodo completo utilizzando Ansible
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

Questo tutorial ti guida per iniziare e eseguire un nodo completo utilizzando Ansible.

Una [playbook Ansible](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html) è usata configurare e gestire un nodo completo. Vedere la guida [dei requisiti tecnici minimi](technical-requirements.md) per le esigenze di sistema.

:::tip

I passaggi in questa guida prevedono l'attesa che i servizi di Heimdall e Bor si sincronizzino completamente. Questo processo richiede diversi giorni per essere completato.

In alternativa, puoi utilizzare uno snapshot mantenuto, riducendo il tempo di sincronizzazione a poche ore. Per istruzioni dettagliate, consulta le [<ins>Istruzioni per gli snapshot su Heimdall e Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Per i link di download dello snapshot, vedere la pagina [<ins>delle Snapshots Polygon</ins>](https://snapshot.polygon.technology/) Chains.

:::

## Prerequisiti {#prerequisites}

- Installare Ansible sulla tua macchina locale con Python3.x. La configurazione non funziona se hai Python2.x.
    - Per installare Ansible con Python 3.x, puoi usare pip. Se non hai pip sulla tua macchina, seguire le fasi indicate [qui](https://pip.pypa.io/en/stable/). Esegui `pip3 install ansible`per installare Ansible.
- Controllare [il repository di Polygon PoS](https://github.com/maticnetwork/node-ansible#requirements) requisiti.
- Dovrai anche garantire che Go **non** sia installato nel tuo ambiente. Se cerchi di configurare l'intero nodo attraverso Ansible con Go installato, incontrerai dei problemi, poiché Ansible richiede l'installazione di pacchetti specifici di Go.
- Dovrai anche assicurarti che la tua macchina virtuale non abbia configurazioni precedenti per Polygon Validator o Heimdall o Bor. Dovrai eliminarli o la tua configurazione avrà dei problemi.

:::info Miglioramenti delle sorgenti di Heimdall

L'ultima versione di Heimdall **[v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0)**, contiene alcuni miglioramenti. Il tempo di ritardo tra gli eventi del contratto di diversi validatori **è stato aumentato** per garantire che la mempool non venga riempita rapidamente in caso di una scoppio di eventi che potrebbero ostacolare i progressi della catena.

Inoltre, la dimensione dei dati **è stata limitata nelle tx di stato di sincronizzazione a 30Kb (quando rappresentata in byte) e 60Kb (quando definita come stringa)**. Ad esempio:

```bash
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```
:::

## Configurazione completa {#full-node-setup}

- Assicurati di avere accesso alla macchina remota o alla VM su cui è stato impostato il nodo completo.
  > Consultare [https://github.com/maticnetwork/node-ansible#setup](https://github.com/maticnetwork/node-ansible#setup) per maggiori dettagli.
- Clonare il file [https://github.com/maticnetwork/node-ansible](https://github.com/maticnetwork/node-ansible) repository.
- Navigare nella cartella node-ansible`cd node-ansible`
- Modifica il `inventory.yml`file e inserisci le IP nella `sentry->hosts`sezione.
  > Consultare [https://github.com/maticnetwork/node-ansible#inventory](https://github.com/maticnetwork/node-ansible#inventory) per maggiori dettagli.
- Verifica se la macchina remota è raggiungibile eseguendo:`ansible sentry -m ping`
- Per verificare se la macchina corretta è configurata, esegui il seguente comando:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry" --list-hosts

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry" --list-hosts
  ```

  <img src={useBaseUrl("img/network/full-node-mumbai.png")} />

- Successivamente, configurare il nodo completo con questo comando:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry"

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry"
  ```

- Nel caso in cui tu incontri qualsiasi problema, cancella e pulisci l'intera configurazione utilizzando:
  ```
  ansible-playbook playbooks/clean.yml
  ```

- Una volta che si avvia la playbook Ansible, accedi alla macchina remota.

- Nodi di seme di Heimdall:

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

- Per verificare che Heimdall sia sincronizzato
    - Sulla macchina/VM remota, esegui `curl localhost:26657/status`
    - Nell'output, il valore `catching_up` deve essere `false`

- Una volta che Heimdall è sincronizzato, esegui
    - `sudo service bor start`

Hai creato con successo un nodo completo con Ansible.

:::note

Se Bor presenta un errore di autorizzazione ai dati, esegui questo comando per rendere l'utente Bor il proprietario dei file Bor:

```bash
sudo chown bor /var/lib/bor
```

:::
## Registri {#logs}

I log possono essere gestiti dallo strumento `journalctl`linux. Ecco un tutorial per l'uso avanzato: [Come utilizzare Journalctl per visualizzare e Manipolare i log Systemd](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**Controlla i registri del nodo Heimdall**

```bash
journalctl -u heimdalld.service -f
```

**Verifica i log Bor Rest-server**

```bash
journalctl -u bor.service -f
```

## Configurazione di porte e firewall {#ports-and-firewall-setup}

Apri le porte 22, 26656 e 30303 al mondo (0.0.0.0/0) sul firewall del nodo sentry.

Puoi utilizzare la VPN per limitare l'accesso alla porta 22 in base alle tue esigenze e alle linee guida sulla sicurezza.