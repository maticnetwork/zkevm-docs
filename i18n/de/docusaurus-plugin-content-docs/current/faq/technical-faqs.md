---
id: technical-faqs
title: Technische FAQ
description: Erstelle deine nächste Blockchain-App auf Polygon.
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Immer auf dem Laufenden

Behalte mit den neuesten Node und validator aus dem Polygon Team und der Community fort, indem du [<ins>Polygon Benachrichtigungen</ins>](https://polygon.technology/notifications/) abonnierst.

:::

### 1. Sind die Private Keys für Heimdall- und Bor-Keystore gleich? {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}
Ja, der Privat Key, der zur Generierung von Validator-Schlüsseln und dem Bor Keystore verwendet wird, ist der gleiche. Der Private Key, der in dieser Instanz verwendet wird, ist die ETH-Adresse deiner Wallet, in der deine Polygon-Testnet-Token gespeichert werden.

### 2. Liste gemeinsamer Befehle {#2-list-of-common-commands}

Wir stellen dir derzeit eine leicht verständliche Liste für die Linux-Pakete bereit. Wir werden diese Liste für mehr Komfort regelmäßig aktualisieren.

**Für Linux-Pakete**

#### A. Wo die Heimdall genesis-Datei zu finden ist {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### B. Wo heimdall-config.toml zu finden ist {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. Wo config.toml zu finden ist {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. Wo heimdall-seeds.txt zu finden ist {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. Heimdall starten {#e-start-heimdall}

`$ sudo service heimdalld start`

#### F. Heimdall Rest-Server starten {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### G. Heimdall Bridge-Server starten {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. Heimdall-Protokolle {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. Wo die Bor genesis-Datei zu finden ist {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### J. Bor starten {#j-start-bor}

`sudo service bor start`

#### K Heimdall-Protokolle überprüfen {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. Heimdall Rest-Server überprüfen {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. Heimdall Bridge-Protokolle überprüfen {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. Bor-Protokolle überprüfen {#n-check-bor-logs}

`tail -f bor.log`

#### O. Bor-Prozess abbrechen {#o-kill-bor-process}

**Für Linux**:

1. `ps -aux | grep bor`. Rufe PID für Bor ab und führe dann den folgenden Befehl aus.
2. `sudo kill -9 PID`

**Für Binaries**:

Gehe auf `CS-2003/bor` und führe dann `bash stop.sh` aus

### 3. Fehler: Konto konnte nicht entsperrt werden (0x...) Kein Key für die angegebene Adresse oder Datei vorhanden {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

Dieser Fehler tritt auf, weil der Pfad für die password.txt-Datei falsch ist. Du kannst die folgenden Schritte ausführen, um dies zu korrigieren:

Dieser Fehler tritt auf, weil der Pfad für die password.txt- und die Keystore-Datei falsch ist. Du kannst die folgenden Schritte ausführen, um dies zu korrigieren:

1. Kopiere die Bor Keystore-Datei nach

    /etc/bor/dataDir/keystore

2. Und password.txt nach

    /etc/bor/dataDir/

3. Gehe sicher, dass du die korrekte Adresse in `/etc/bor/metadata` hinzugefügt hast

Für Binaries:

1. Kopiere die Bor Keystore-Datei nach:

`/var/lib/bor/keystore/`

2. Und password.txt nach

`/var/lib/bor/password.txt`


### 4. Fehler: Wrong Block.Header.AppHash. Erwartet xxxx {#4-error-wrong-block-header-apphash-expected-xxxx}

Dieser Fehler tritt in der Regel auf, wenn der Heimdall-Dienst auf einem Block festhängt und auf Heimdall keine Aufhebungsmethode verfügbar ist.

Um dies zu beheben, musst du Heimdall vollständig zurücksetzen:

```bash
    sudo service heimdalld stop

    heimdalld unsafe-reset-all
```

Danach solltest du ab dem Snapshot erneut synchronisieren:

```bash
    wget -c <Snapshot URL>

    tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>

```

Starte dann die Heimdall-Dienste erneut.


### 5. Wo kann ich den API-Schlüssel erstellen? {#5-from-where-do-i-create-the-api-key}

Du kannst diesen Link abrufen: [https://infura.io/register](https://infura.io/register). Gehe sicher, dass du den API-Key für Ropsten und nicht für Mainnet kopierst, sobald du dein Konto und dein Projekt eingerichtet hast.

Mainnet wird standardmäßig ausgewählt.

### 6. Heimdall funktioniert nicht. Ich erhalte einen Panic-Fehlermeldung {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**Tatsächlicher Fehler**: Mein Heimdall funktioniert nicht. Im Protokoll lautet die erste Zeile: panic: Unknown db_backend leveldb, expected either goleveldb or memdb or fsdb

Ändere die Konfiguration in config.toml zu `goleveldb`


### 7. Wie kann ich Reste von Heimdall und Bor löschen? {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

Wenn du Reste von Heimdall und Bor löschen möchten, kannst du die folgenden Befehle ausführen Bor:

Für das Linux-Paket:

```$ sudo dpkg -i matic-bor```

Und Bor-Verzeichnis löschen:

```$ sudo rm -rf /etc/bor```

Für Binaries:

```$ sudo rm -rf /etc/bor```

Und

```$ sudo rm /etc/heimdall```


### 8. Wie viele Validatoren können gleichzeitig aktiv sein? {#8-how-many-validators-can-be-active-concurrently}

Es wird bis zu 100 aktive Validator auf einmal geben. Wir werden mehr Teilnehmer einbringen, wenn das Limit auch in der Mitte des Events erreicht wird. Beachte, dass aktive Validatoren hauptsächlich diejenigen sind, deren Verfügbarkeit hoch ist. Teilnehmer mit hoher Ausfallzeit werden herausgedrängt.

### 9. Wie viel sollte ich staken? {#9-how-much-should-i-stake}

„stake-amount“ (dt. Staking-Betrag) und „heimdall-fee-amount“ (dt. Höhe der Heimdall-Gebühren) – Wie viel sollten sie betragen?

Es sind mindestens 10 Matic-Token für den Staking-Betrag erforderlich, während die Heimdall-Gebühr mehr als 10 betragen sollte. Wenn dein Stake beispielsweise 400 beträgt, dann sollte die Heimdall-Gebühr 20 betragen. Wir empfehlen, die Heimdall-Gebühr bei 20 zu belassen.

Bitte beachte jedoch, dass die im Staking-Betrag und Heimdall-Gebührenbetrag eingegebenen Werte in 18 Dezimalen eingegeben werden sollten

Zum Beispiel:

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. Ich wurde ausgewählt, ein Validator zu werden, aber meine ETH-Adresse war falsch. Was kann ich tun? {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

Wenn du Zugriff auf die ETH-Adresse hast, die du früher eingereicht hast, kannst du die Test-Token von diesem Konto auf das aktuelle Konto übertragen. Und dann kannst du den Einrichtungsablauf deiner Knoten initiieren.

Wenn du keinen Zugriff auf diese ETH-Adresse hast, werden wir dir Token nicht separat übertragen. Du kannst  dich im Formular erneut mit der korrekten ETH-Adresse registrieren.

### 11. Ich erhalte eine Fehlermeldung, wenn ich die Bridge starte {#11-i-m-getting-an-error-starting-the-bridge}

**Fehler**: Object "start" is unknown, try "bridge help". Kann ich dies auch ignorieren?

Überprüfe „which bridge“ – Wenn es sich um `/usr/sbin/bridge` handelt, führst du nicht das richtige „Bridge“-Programm aus.

Versuche `~/go/bin/bridge` anstatt `(or $GOBIN/bridge)`


### 12. Ich erhalte eine dpkg-Fehlermeldung {#12-i-m-getting-dpkg-error}

**Fehler**: "dpkg: error processing archive matic-heimdall_1.0.0_amd64.deb (--install): trying to overwrite '/heimdalld-rest-server.service', which is also in package matic-node 1.0.0"

Dies geschieht hauptsächlich aufgrund einer vorherigen Installation von Matic auf deinem Computer. Um dies zu beheben, kannst du Folgendes ausführen:

`sudo dpkg -r matic-node`


### 13. Ich bin mir nicht im Klaren, welchen Private Key ich hinzufügen soll, wenn ich einen Validator-Key erstelle. {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

Der Private Key, der verwendet werden soll, ist die ETH-Adresse deiner Wallet, in der deine Polygon-Testnet-Token gespeichert werden. Du kannst die Einrichtung mit einem Schlüsselpaar aus Public Key und Private Key abschließen, das an die im Formular eingereichte Adresse gebunden ist.


### 14. Gibt es eine Möglichkeit, zu wissen, ob Heimdall synchronisiert wurde? {#14-is-there-a-way-to-know-if-heimdall-is-synced}

Du kannst den folgenden Befehl ausführen, um dies zu überprüfen:

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

Überprüfe den catching_up - Wert. Wenn er falsch ist, ist der Knoten vollständig synchronisiert.


### 15. Was ist, wenn jemand ein Top-10-Staker wird? Wie wird er letztendlich seine MATIC-Belohnung erhalten? {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

Belohnungen der Stufe 1 sind nicht Staking-basiert. Bitte lies https://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/ bezüglich Prämiendetails. Teilnehmer mit einem hohen Stake qualifizieren sich in dieser Stufe nicht automatisch für eine Belohnung.


### 16. Welche Heimdall-Version sollte ich haben? {#16-what-should-be-my-heimdall-version}

Um deine Heimdall-Version zu überprüfen, kannst du einfach Folgendes ausführen:

```heimdalld version```

Die korrekte Version von Heimdall für Stufe 1 sollte `heimdalld version is beta-1.1-rc1-213-g2bfd1ac` sein


### 17. Welche Werte sollte ich bei Staking-Betrag und Gebührenbetrag eingeben? {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

Es sind mindestens 10 Matic-Token für den Staking-Betrag erforderlich, während die Heimdall-Gebühr mehr als 10 betragen sollte. Wenn dein Stake beispielsweise 400 beträgt, dann sollte die Heimdall-Gebühr 20 betragen. Wir empfehlen, die Heimdall-Gebühr bei 20 zu belassen.

Bitte beachte jedoch, dass die im Staking-Betrag und Heimdall-Gebührenbetrag eingegebenen Werte in 18 Dezimalen eingegeben werden sollten

Zum Beispiel:

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. Was ist der Unterschied zwischen `/var/lib/heimdall` und `/etc/heimdall?`

`/var/lib/heimdall` ist die heimdall dir, wenn du die binäre Installationsmethode verwendest. `/etc/heimdall` ist für die Linux-Paketinstallation.


### 19. Wenn ich die Staking-Transaktion durchführe, erhalte ich die Fehlermeldung „Gas Exceeded“ {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

Dieser Fehler kann aufgrund des Staking- oder des Gebührenbetragformates auftreten. Die Werte, die während des Staking-Befehls eingegeben werden, müssen 18 Dezimale aufweisen.

Bitte beachte jedoch, dass die im Staking-Betrag und Heimdall-Gebührenbetrag eingegebenen Werte in 18 Dezimalen eingegeben werden sollten

Zum Beispiel:

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. Wann erhalte ich die Chance, ein Validator zu werden? {#20-when-will-i-get-a-chance-to-become-a-validator}

Wir fügen Validatoren im Verlauf des Stufe-1-Events schrittweise hinzu. Wir werden schrittweise eine Liste neuer externer Validatoren veröffentlichen. Diese Liste wird im Discord-Kanal angekündigt.


### 21. Wo kann ich eine Stelle für Infos zum Heimdall-Konto finden? {#21-where-can-i-find-heimdall-account-info-location}

Für Binaries:

    /var/lib/heimdalld/config folder

Für Linux-Paket:

    /etc/heimdall/config


### 22. In welcher Datei füge ich den API-Schlüssel hinzu? {#22-which-file-do-i-add-the-api-key-in}

Sobald du den API-Key erstellt hast, musst du den API-Key der `heimdall-config.toml`-Datei hinzufügen.


### 23. Welcher Datei füge ich persistent_peers hinzu? {#23-which-file-do-i-add-the-persistent_peers}

Du kannst die persistent_peers in der folgenden Datei hinzufügen:

    /var/lib/heimdalld/config/config.toml


### 24. „Hast du Tendermint zurückgesetzt, ohne die Daten deiner Anwendung zurückzusetzen?“ {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

In einem solchen Fall kannst du Heimdall-Konfigurationsdaten zurücksetzen und die Installation erneut ausführen.

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. Fehler: Unable to unmarshall config Error 1 error(s) decoding {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

Fehler: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

Dies geschieht hauptsächlich dann, wenn es Tippfehler oder einige fehlende Teile oder eine alte Konfigurationsdatei gibt, die noch als Überreste vorliegen. Du musst alle Reste löschen und dann versuchen, es erneut einzurichten.

### 26. Heimdall- und Bor-Dienste stoppen {#26-to-stop-heimdall-and-bor-services}

**Für Linux-Pakete**:

Heimdall stoppen: `sudo service heimdalld stop`

Bor stoppen: `sudo service bor stop` oder

1. `ps -aux | grep bor`. Rufe PID für Bor ab und führe dann den folgenden Befehl aus.
2. `sudo kill -9 PID`

**Für Binaries**:

Heimdall stoppen: `pkill heimdalld`

Bridge stoppen: `pkill heimdalld-bridge`

Bor stoppen: Gehe zu CS-2001/bor und führe dann `bash stop.sh` aus

### 27. Heimdall- und Bor-Verzeichnisse entfernen {#27-to-remove-heimdall-and-bor-directories}

**Für Linux-Pakete**:
Heimdall löschen: `sudo rm -rf /etc/heimdall/*`

Bor löschen: `sudo rm -rf /etc/bor/*`

**Für Binaries**:

Heimdall löschen: `sudo rm -rf /var/lib/heimdalld/`

Bor löschen: `sudo rm -rf /var/lib/bor`

### 28. Was ist zu tun, wenn du die Fehlermeldung „Wrong Block.Header.AppHash.“ erhältst? {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

Dieser Fehler tritt in der Regel aufgrund von überlasteten Infura-Anfragen auf. Wenn du einen Knoten auf Polygon einrichtest, fügst du der Konfigurationsdatei (Heimdall) einen Infura-Key hinzu. Standardmäßig sind dir Anfragen über 100K pro Tag gestattet. Wird dieses Limit überschritten, würden solche Probleme auftauchen. Um dies zu beheben, kannst du einen neuen API-Schlüssel erstellen und der Datei `config.toml` hinzufügen.