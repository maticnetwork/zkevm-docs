---
id: full-node-deployment
title: Führen Sie einen vollständigen Knoten mit Ansible aus
description: Bereitstellung eines Full Node mit Ansible
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

Dieses Tutorial führt dich durch den Start und die Ausführung eines vollständigen Knotens mit Ansible.

Ein [Ansible Playbook](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html) wird verwendet, um Konfiguriere und verwalte einen vollständigen Knoten. Im Leitfaden [Minimum Technical Requirements](technical-requirements.md) für die Systemanforderungen ansehen.

:::tip

Schritte in diesem Leitfaden beinhalten das Warten auf die Heimdall und die Bor-Dienste und die Synchronisierung vollständig. Dieser Vorgang dauert mehrere Tage.

Alternativ kannst du einen gewarteten Snapshot verwenden, um die Synchronisierungszeit auf einige Stunden zu reduzieren. Ausführliche Anweisungen finden Sie unter [<ins>Snapshot Instructions für Heimdall und Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Für Snapshot Download-Links findest du auf der Seite [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/) auf.

:::

## Voraussetzungen {#prerequisites}

- Installiere Ansible auf deinem lokalen Rechner mit Python3.x. Die Einrichtung funktioniert nicht, wenn du Python2.x verwendest.
    - Um Ansible mit Python 3.x zu installieren, kannst du use Wenn du kein Pip auf deiner Maschine hast, folge den Schritten, die [hier](https://pip.pypa.io/en/stable/) beschrieben sind. Zur Installation `pip3 install ansible`ausführen Ansible.
- Überprüfe das [Polygon PoS Ansible Repository](https://github.com/maticnetwork/node-ansible#requirements) für Anforderungen werden.
- Du musst auch sicherstellen, dass Go **nicht** in deiner Umgebung installiert ist. Es werden Probleme auftreten, wenn du versuchst, deinen vollständigen Knoten über Ansible einzurichten, wenn Go installiert ist, da Ansible voraussetzt, dass bestimmte Go-Pakete installiert werden.
- Du solltest außerdem sicherstellen, dass auf deiner VM/deinem Rechner keine früheren Versionen von Polygon Validator oder Heimdall oder Bor eingerichtet sind. Lösche diese bitte, um Probleme bei der Einrichtung zu vermeiden.

:::info Heimdall source

Die neueste Heimdall-Version, **[v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0)**, enthält einige Verbesserungen. Die Verzögerungszeit zwischen den Vertragsereignissen verschiedener Prüfer **wurde** erhöht, um sicherzustellen, dass der mempool nicht gefüllt wird. schnell im Falle eines Bursts von Ereignissen, die den Fortschritt der Chain beeinträchtigen könnten.

Darüber hinaus wurde die Datengröße **in State sync txs auf 30Kb (wenn in Bytes dargestellt) und 60Kb (wenn als String definiert) eingeschränkt**. Zum Beispiel:

```bash
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```
:::

## Vollständiger node {#full-node-setup}

- Vergewissere dich, dass du Zugriff auf die entfernte Maschine oder auf die VM hast, auf der der volle Knoten eingerichtet wird.
  > Weitere Details findest du unter [https://github.com/maticnetwork/node-ansible#setup](https://github.com/maticnetwork/node-ansible#setup)
- Klone das [https://github.com/maticnetwork/node-ansible](https://github.com/maticnetwork/node-ansible) Repository.
- Navigiere in den node-ansible Ordner:`cd node-ansible`
- Bearbeite die `inventory.yml`Datei und füge deine IP(s) in den Abschnitt `sentry->hosts`ein.
  > Weitere Details findest du unter [https://github.com/maticnetwork/node-ansible#inventory](https://github.com/maticnetwork/node-ansible#inventory).
- Überprüfe, ob die Remote-Maschine erreichbar ist, indem du Folgendes ausführst:`ansible sentry -m ping`
- Um zu testen, ob die richtige Maschine konfiguriert ist, führe den folgenden Befehl aus:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry" --list-hosts

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry" --list-hosts
  ```

  <img src={useBaseUrl("img/network/full-node-mumbai.png")} />

- Als nächstes richte den vollen Knoten mit diesem Befehl ein:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry"

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry"
  ```

- Falls du auf irgendwelche Probleme ausführst, lösche und bereinige das gesamte Setup mit:
  ```
  ansible-playbook playbooks/clean.yml
  ```

- Sobald du das Ansible Playbook initiierst, melde dich auf der Remote-Maschine an.

- Heimdall seed Knoten:

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

- Um zu prüfen, ob Heimdall synchronisiert ist
    - Führe `curl localhost:26657/status` auf dem Remoteserver/VM aus
    - In der Ausgabe sollte der `catching_up`-Wert `false` sein

- Sobald Heimdall synchronisiert ist, führe aus.
    - `sudo service bor start`

Du hast einen vollständigen Knoten mit Ansible eingerichtet.

:::note

Wenn Bor einen Fehler der Berechtigung für Daten vorzeigt, führe diesen Befehl aus, um den Bor Benutzer zum Eigentümer der Bor Dateien zu machen:

```bash
sudo chown bor /var/lib/bor
```

:::
## Logs {#logs}

Protokolle können vom `journalctl`linux-Tool verwaltet werden. Hier ist ein Tutorial für fortgeschrittene Nutzung: [Wie man Journalctl zum Anzeigen und Manipulieren von Systemd verwendet](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**Prüfe die Heimdall-Knotenprotokolle**

```bash
journalctl -u heimdalld.service -f
```

**Überprüfe Bor Rest-server**

```bash
journalctl -u bor.service -f
```

## Einrichtung von Ports und Firewall {#ports-and-firewall-setup}

Öffne die Ports 22, 26656 und 30303 für die Welt (0.0.0.0/0) auf der Sentry-Knoten-Firewall.

Du kannst VPN verwenden, um den Zugriff auf Port 22 gemäß deiner Anforderung und Sicherheitsrichtlinien zu beschränken.