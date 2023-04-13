---
id: validator-staking-operations
title: Einsatz auf Polygon
description: Erfahre wie du als Prüfer auf dem Polygon Network stake kannst
keywords:
  - docs
  - matic
  - polygon
  - stake
  - claim
  - unstake
slug: validator-staking-operations
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Voraussetzungen {#prerequisites}

### Vollständiger Knoten einrichten {#full-node-set-up}

Dein validator ist vollständig eingerichtet und synchronisiert. Siehe auch:

* [Führe einen Validator aus](run-validator.md)
* [Einen Validator-Knoten mit Ansible ausführen](run-validator-ansible.md)
* [Einen Validator-Knoten von Binaries ausführen](run-validator-binaries.md)

### Kontoeinrichtung {#account-setup}

Überprüfe auf deinem Prüfknoten ob das Konto eingerichtet ist. Um die Überprüfung zu gewährleisten, führen Sie den folgenden Befehl **auf dem Validatorknoten** aus:

```sh
    heimdalld show-account
```

Ihre Ausgabe sollte in dem folgenden Format erscheinen:

```json
{
    "address": "0x6c468CF8c9879006E22EC4029696E005C2319C9D",
    "pub_key": "0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19"
}
```

Dadurch wird Ihre Adresse und der öffentliche Schlüssel für Ihren Validatorknoten angezeigt. Beachten Sie, dass **diese Adresse mit deiner Signer-Adresse auf Ethereum übereinstimmen muss**.

### Privatschlüssel anzeigen {#show-private-key}

Dieser Schritt ist optional.

Überprüfe auf deinem Prüfknoten ob der Private Key korrekt ist. Um die Überprüfung zu gewährleisten, führen Sie den folgenden Befehl **auf dem Validatorknoten** aus:

```sh
heimdalld show-privatekey
```

Die folgende Ausgabe sollte erscheinen:

```json
{
    "priv_key": "0x********************************************************"
}
```

## Einsatz auf Polygon {#stake-on-polygon}

Sie können Polygon mit dem [Validator Dashboard](https://staking.polygon.technology/validators/) einsetzen.

### Einsatz mit dem Staking-Dashboard {#stake-using-the-staking-dashboard}

1. Zugriff auf das [Validator-Dashboard](https://staking.polygon.technology/validators/).
2. Melden Sie sich mit Ihrem Wallet an. MetaMask ist die empfohlene Wallet. Du musst sicherstellen, dass du dich mit der gleichen Adresse anmeldest, in der deine MATIC-Token vorhanden sind.
3. Klicken Sie auf **Prüfer werden**. Du wirst gebeten, deinen Knoten einzurichten. Wenn Sie Ihren Knotenpunkt noch nicht eingerichtet haben, müssen Sie dies nachholen, sonst erhalten Sie eine Fehlermeldung, wenn Sie versuchen, den Einsatz zu tätigen.
4. Geben Sie auf dem nächsten Bildschirm Ihre Validatorenangaben, den Provisionssatz und den Einsatzbetrag ein.
5. Klicken Sie auf **Jetzt Einsatz tätigen**,

Sobald die Transaktion abgeschlossen ist, haben Sie einen erfolgreichen Einsatz geleistet, um ein Validator zu werden. Sie werden dreimal aufgefordert, die Transaktion zu bestätigen.

* Transaktion genehmigen  dies– wird Ihre Transaktion genehmigen.
* Einsatz – Hiermit wird Ihre Einsatztransaktion bestätigt.
* Speichern –ß Damit werden Ihre Validatorenangaben gespeichert.

:::note

Damit die Änderungen auf dem [Staking-Dashboard](https://staking.polygon.technology/account) wirksam werden, benötigt es mindestens 12 Blockbestätigungen.

:::

### Überprüfen Sie das Guthaben {#check-the-balance}

Zur Überprüfung des Guthabens Ihrer Adresse:

```sh
heimdallcli query auth account SIGNER_ADDRESS --chain-id CHAIN_ID
```

wo

* SIGNER_ADDRESS – Ihre [Signieradresse](/docs/maintain/glossary.md#validator).
* CHAIN_ID – die Polygon-Hauptnetzwerk-Ketten-ID mit dem Client-Präfix: `heimdall-137`

Die folgende Ausgabe sollte erscheinen:

```json
address: 0x6c468cf8c9879006e22ec4029696e005c2319c9d
coins:
- denom: matic
amount:
    i: "1000000000000000000000"
accountnumber: 0
sequence: 0
```

### Anspruch auf Belohnungen als Validator {#claim-rewards-as-a-validator}

Sobald Sie als Validator eingerichtet und eingesetzt sind, erhalten Sie Belohnungen für die Erfüllung von Validatoraufgaben. Wenn Sie Ihre Aufgaben als Validator pflichtbewusst erfüllen, erhalten Sie eine Belohnung.

Um Belohnungen zu erhalten, können Sie auf Ihr [Validator-Dashboard](https://staking.polygon.technology/account) gehen.

Sie werden zwei Tasten auf Ihrem Profil sehen:

* Belohnung zurückziehen
* Belohnung wiederverwenden

#### Belohnung zurückziehen {#withdraw-reward}

Als Validator erhalten Sie Belohnungen, solange Sie Ihre Validatoraufgaben ordnungsgemäß erfüllen.

Wenn Sie auf **Belohnung** zurückzahlen klicken, erhalten Sie Ihre Belohnungen auf Ihr Wallet zurück.

Das Dashboard wird nach 12 Blockbestätigungen aktualisiert.

#### Belohnung wiederverwenden {#restake-reward}

Die Wiederherstellung Ihrer Belohnungen ist eine einfache Möglichkeit, Ihren Einsatz als Validator zu erhöhen.

Wenn Sie auf **Belohnungen wiederverwenden**klicken, wird Ihre Belohnung wiederverwendet und Ihr Einsatz erhöht.

Das Dashboard wird nach 12 Blockbestätigungen aktualisiert.
