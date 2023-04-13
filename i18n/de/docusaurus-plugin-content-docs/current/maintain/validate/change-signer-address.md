---
id: change-signer-address
title: Ändere deine Signier-Adresse
description: Ände die Signer-Adresse deines Prüfers
keywords:
  - docs
  - matic
  - polygon
  - signer address
  - change
  - validator
slug: change-signer-address
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Für Informationen darüber, was eine [Signier-Adresse](/docs/maintain/glossary.md#signer-address) ist, siehe
[Key Management](/docs/maintain/validator/core-components/key-management).

## Voraussetzungen {#prerequisites}

Stelle sicher, dass dein neuer Prüfknoten vollständig synchronisiert ist und mit der neuen Signier-Adresse läuft.

## Ändere die Signier-Adresse {#change-the-signer-address}

In diesem Leitfaden wird dein aktueller Prüfknoten als Knoten 1 und dein neuer Prüfknoten als Knoten 2 bezeichnet.

1. Melde dich mit der Adresse des Knotens 1 im [Staking-Dasboard](https://staking.polygon.technology/) an.
2. Klicken Sie auf Ihrem Profil auf **Profile bearbeiten**.
3. Gib im **Adressfeld des Signierers** den Knoten 2 an.
4. Gib im Feld **Öffentlicher Key des Signierers den öffentlichen Key** von Knoten 2 an.

   Um den öffentlichen Key zu erhalten, führst du den folgenden Befehl auf dem Prüfknoten aus:

   ```sh
   heimdalld show-account
   ```

Durch Klicken **auf Speichern**, speicherst du deine neuen Details für deinen Knoten. Das bedeutet im Wesentlichen, dass Knoten 1 deine Adresse ist, die den Einsatz kontrolliert, an die die Prämien geschickt werden, usw. Und Knoten 2 wird nun Aktivitäten wie das Signieren von Blöcken, das Signieren von Checkpoints usw. durchführen.
