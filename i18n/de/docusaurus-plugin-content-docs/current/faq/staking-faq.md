---
id: staking-faq
title: Staking FAQs
sidebar_label: Staking FAQ
description: Erstelle deine nächste Blockchain-App auf Polygon.
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

### Wie kann man Token auf Polygon staken? {#how-to-stake-tokens-on-polygon}

Für Staking müssten Sie Geld auf dem Ethereum Mainnet haben (mehr Informationen [hier](https://etherscan.io/gastracker)). Melde dich in MetaMask im Ethereum-Netzwerk mit dem Staking Dashboard an. https://staking.polygon.technology/

Bitte lesen Sie dieses Video für eine grafische Darstellung der Funktionsweise dieses Videos:

<video autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking/staking.mp4"></source>
  <p>Dein Browser unterstützt das Video-Element nicht.</p>
</video>

### Ich habe meine Matic-Token gestaked. Wie kann ich weitere staken? {#i-ve-staked-my-matic-tokens-how-can-i-stake-more}
Du kannst zu „Deine Delegationen“ navigieren, einen der Stakes auswählen und auf „Mehr staken“ klicken.

Bitte sieh dir dieses Video an. Hier wird veranschaulicht wird, wie es geht:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/staking-more.mov"></source>
  <p>Dein Browser unterstützt das Video-Element nicht.</p>
</video>

### Warum kann ich nicht staken? {#why-am-i-not-able-to-stake}

Überprüfe, ob du über Geld im Main Ethereum Network verfügst, um deine Token zu delegieren. Der Staking-Vorgang läuft nur im Ethereum Network ab.

### Ich kann die Registerkarte Staking nicht anzeigen. Wie kann ich auf das Staking zugreifen? {#i-am-unable-to-view-the-staking-tab-how-do-i-access-staking}

Du musst nur **https://staking.polygon.technology/**, zugreifen, wo du die folgende landing siehst:

<img src={useBaseUrl("img/staking_faq/staking-lp.png")} height="500px"/>

Alternativ kannst du einmal in der [Polygon Wallet Suite](https://wallet.polygon.technology/) angemeldet sein, auf **Weitere Apps > Staking** klicken. Benutzer werden auf der Seite **Staking Overview** gelandet. Referenzen zur Anleitung:

<img src={useBaseUrl("img/staking_faq/staking-app.png")} height="500px"/>

### Woher weiß ich, welchen Validator ich für bessere Belohnungen auswählen sollte? {#how-do-i-know-which-validator-to-select-for-better-rewards}

Es hängt von Ihrem Verständnis und Ihrem Wissensstand ab, welchen Prüfer Sie verwenden möchten. Die Liste der Prüfer findest du hier: https://staking.polygon.technology/validators

### Wie kann man sich entkoppeln? {#how-to-unbond}

Um sich von einem Validator zu entkoppeln, navigiere zu MyAccount, wo du „Deine Delegationen“ findest. Dort siehst du für jeden der Validatoren eine Schaltfläche zum Entkoppeln. Klicke auf die Entkoppeln-Schaltfläche für jeden einzelnen Validator, von dem du dich entkoppeln möchtest.

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/step1unbond.png")} height="400px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/step2unbond.png")} height="500px"/><br/>

Bitte sieh dir das Video an. Hier wird veranschaulicht, wie es geht:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking/unbond.mp4"></source>
  <p>Dein Browser unterstützt das Video-Element nicht.</p>
</video>

### Wie lange dauert die Entkopplung? {#what-is-the-unbonding-period}

Die Entkopplungsdauer auf Polygon beträgt 80 Checkpoints. Das sind etwa 3–4 Tage. Jeder Checkpoint dauert etwa 3 Stunden. Einige Checkpoints können jedoch aufgrund von Überlastungen auf Ethereum länger brauchen. Dieser Zeitraum gilt für den ursprünglich delegierten Betrag und erneut delegierte Beträge. Er gilt nicht für Belohnungen, die nicht erneut delegiert wurden.

### Wie kann ich Belohnungen wieder ins Staking legen? {#how-to-restake-rewards}

Gehe zu „Mein Konto“, um „Deine Delegationen“ zu überprüfen. Wenn du auf „Belohnung erneut staken“ klickst, wirst du um Bestätigung deines Metamask-Kontos gebeten. Erst wenn du die Transaktion bestätigt hast, ist die Transaktion zum erneuten Staking abgeschlossen.

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/restake-rewards1.png")} height="300px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/restake-rewards2.png")} height="415px"/><br/>

Bitte sieh dir das Video an. Hier wird veranschaulicht, wie es geht:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking/restake.mp4"></source>
  <p>Dein Browser unterstützt das Video-Element nicht.</p>
</video>

### Ich möchte Belohnungen wieder in das Staking legen, doch es funktioniert bei mir nicht. {#i-want-to-restake-rewards-but-i-am-unable-to}

Du musst über mindestens **2 Matic** verfügen, um Belohnungen wieder in das Staking zu legen.

### Wie kann man Belohnungen abbuchen? {#how-to-withdraw-rewards}

Du kannst deine Belohnungen einfordern, indem du auf „Mein Konto“ klickst. Alle Delegierten für einen Validator werden angezeigt. Klicke auf die Schaltfläche „Belohnung abbuchen“ und die Belohnungen werden auf dein delegiertes Konto auf Metamask überwiesen.

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/withdraw1.png")} height="300px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/withdraw2.png")} height="380px"/><br/>

Bitte sieh dir das Video an. Hier wird veranschaulicht, wie es geht:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/claim-rewards.mp4"></source>
  <p>Dein Browser unterstützt das Video-Element nicht.</p>
</video>

### Ich möchte Belohnungen abbuchen, aber es funktioniert bei mir nicht. {#i-want-to-withdraw-rewards-but-i-am-unable-to}

Du musst über mindestens **2 Matic** verfügen, um Belohnungen abzubuchen.

### Wie kann man einen Stake einfordern? {#how-to-claim-stake}

Sobald die **Entkopplungsdauer abgeschlossen ist**, wird die Schaltfläche „Stake einfordern“ aktiviert und du kannst deine gestakten Token dann einfordern. Die Token werden auf dein Konto übertragen.

`Step 1` <br/>
<img src={useBaseUrl("img/staking_faq/claim-stake1.png")} height="400px"/><br/>

`Step 2` <br/>
<img src={useBaseUrl("img/staking_faq/claim-stake2.png")} height="300px"/><br/>

`Step 3` <br/>
<img src={useBaseUrl("img/staking_faq/claim-stake3.png")} height="400px"/><br/>

Bitte sieh dir das Video an. Hier wird veranschaulicht, wie es geht:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/claiming-stake.mov"></source>
  <p>Dein Browser unterstützt das Video-Element nicht.</p>
</video>

### Werden Hardware-Wallets unterstützt? {#are-hardware-wallets-supported}

Ja, Hardware-Wallets werden unterstützt. Du kannst die Option „Hardware-Wallet verbinden“ auf Metamask nutzen, um deine Hardware-Wallet zu verbinden, und dann den Delegationsprozess fortsetzen.

### Warum kann ich nicht direkt von Binance aus einen Stake platzieren? {#why-can-t-i-stake-directly-from-binance}

Das Staking über Binance wird noch nicht unterstützt. Es wird eine Ankündigung geben, ob und wann Binance dieses unterstützt.

### Muss ich Matic-Token in das Polygon-Mainnet-Netzwerk einzahlen, um Stakes zu platzieren? {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

Nein. Dein gesamtes Guthaben muss sich im Ethereum-Hauptnetzwerk befinden.

### Wann werden Belohnungen ausgeschüttet? {#when-do-rewards-get-distributed}

Belohnungen werden immer dann ausgeschüttet, wenn ein Checkpoint eingereicht wird.

Es werden ca. 20188 Matic-Token bei jeder erfolgreichen Checkpoint-Einreichung anteilig an jeden Delegierer ausgeschüttet, und zwar auf der Grundlage seines Stakes anteilig am gesamten Staking-Pool aller Validatoren und Delegierer. Außerdem variiert der Prozentsatz der Belohnung für jeden Delegierer bei jedem Checkpoint, je nach Anteil des Stakes des Delegierers, des Validators sowie dem Anteil am Gesamt-Stake.

(Beachte, dass es einen 10%igen Proposer-Bonus gibt, der demjenigen Validator zusteht, der den Checkpoint einreicht, jedoch nimmt der Effekt des zusätzlichen Bonus im Laufe der Zeit über mehrere Checkpoints hinweg durch verschiedene Validatoren auf null ab.)

Die Checkpoint-Einreichung wird von einem der Validatoren ungefähr alle 34 Minuten durchgeführt. Diese Zeit kann je nach Konsens der Validatoren über den Polygon-Heimdall-Layer variieren. Dies kann auch je nach Ethereum-Netzwerk variieren. Eine höhere Überlastung des Netzwerks kann zu sich verzögernden Checkpoints führen.

Du kannst die Checkpoints des Staking-Vertrags hier verfolgen: https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287

### Warum werden Belohnungen bei jedem Checkpoint verringert? {#why-do-rewards-keep-getting-decreased-at-every-checkpoint}

Die angehäuften Belohnungen hängen von der tatsächlichen Gesamtversorgung des Netzwerks bei jedem Checkpoint ab. Dies wird voraussichtlich erheblich variieren, je mehr MATIC-Token in die Staking-Verträge aufgenommen werden. Die Belohnungen werden zu Beginn höher sein und mit steigendem Anteil des gesperrten Vorratsprozentsatz weiter sinken. Diese Veränderung des gesperrten Vorrats wird bei jedem Checkpoint erfasst, und die Belohnungen werden auf dieser Grundlage berechnet.

### Erhalte ich weiterhin Belohnungen, nachdem ich entkoppelt bin? {#will-i-keep-receiving-rewards-after-i-unbond}

Nein. Sobald du entkoppelt bist, erhältst du keine Belohnungen mehr.

### Kann ich den Stake zu einem anderen Validator verschieben? {#can-i-move-the-stake-to-another-validator}
Ja, du musst nur auf „Deine Delegationen“ gehen, auf „Stake verschieben“ klicken und dann deinen neuen Validator auswählen.

Bitte sieh dir das Video an. Hier wird veranschaulicht, wie es geht:

<video width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/staking_faq/moving.mp4"></source>
  <p>Dein Browser unterstützt das Video-Element nicht.</p>
</video>

### Welche Browser sind mit dem Staking Dashboard kompatibel? {#which-browsers-are-compatible-with-the-staking-dashboard}

Chrome, Firefox und Brave.

### Es passiert nichts, wenn ich versuche, mich anzumelden, oder meine Metamask bleibt nach der Anmeldung bei der Bestätigung stehen. Was kann ich tun? {#nothing-happens-when-i-try-to-log-in-or-my-metamask-is-stuck-at-confirming-after-logging-in-what-do-i-do}

Überprüfe Folgendes:
- Wenn du Brave verwendest, deaktiviere bitte die Option „Krypto-Wallets verwenden“ im Bereich Einstellungen.
- Überprüfe, ob du bei Metamask angemeldet bist.
- Überprüfe, ob du mit Trezor/Ledger bei Metamask angemeldet bist. Du musst zusätzlich die Berechtigung zum Aufrufen von Verträgen auf deinem Ledger-Gerät aktivieren, falls dies noch nicht geschehen ist.
- Überprüfe den Zeitstempel deines Systems. Wenn die Systemzeit nicht korrekt ist, musst du sie korrigieren.