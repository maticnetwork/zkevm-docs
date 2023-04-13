---
id: delegator-faq
title: FAQ zu Delegieren
sidebar_label: Delegator FAQ
description: FAQs in Bezug auf Delegation auf Polygon Netzwerk
keywords:
  - docs
  - polygon
  - how to delegate
  - validator
  - stake
  - faq
  - delegator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

### Wie lautet die URL des Staking-Dashboards? {#what-is-the-staking-dashboard-url}

Die staking dashboard URL ist https://staking.polygon.technology/. .

### Wie hoch ist der minimale Stake? {#what-is-the-minimum-stake-amount}

Es gibt keinen minimalen Stake, der delegiert werden muss. Du kannst jedoch immer mit 1 MATIC Token beginnen.

### Wie viele Belohnungen erhalte ich für das Delegieren? {#how-many-rewards-will-i-get-if-i-delegate}

Bitte verwende den [Staking Rewards Calculator](https://staking.polygon.technology/rewards-calculator), um deine Schätzungen zu ermitteln.

### Warum dauert meine Transaktion so lange? {#why-does-my-transaction-take-so-long}

Alle Staking-Transaktionen von Polygon finden aus Sicherheitsgründen auf Ethereum statt.

Die Zeit, die für den Abschluss einer Transaktion benötigt wird, hängt von den Gasgebühren ab, die Sie entrichten, und auch von der Netzwerküberlastung des Ethereum-Hauptnetzes zu diesem Zeitpunkt. Du kannst immer die Option „Speed Up“ verwenden, um die Gasgebühren zu erhöhen, damit deine Transaktion bald abgeschlossen werden kann.

### Welche Wallets werden derzeit unterstützt? {#which-wallets-are-currently-supported}

Derzeit wird nur die Metamask-Erweiterung für den Desktop-Browser und Coinbase Wallet unterstützt. Zusätzlich kannst du WalletConnect und Walletlink von unterstützten mobilen Wallets verwenden, um mit dem Staking UI Dashboard auf Desktop / Laptop zu interagieren. Wir werden demnächst schrittweise Unterstützung für andere Wallets hinzufügen.

### Werden Hardware-Wallets unterstützt? {#are-hardware-wallets-supported}

Ja, Hardware-Wallets werden unterstützt. Du kannst die Option „Hardware-Wallet verbinden“ auf Metamask nutzen, um deine Hardware-Wallet zu verbinden, und dann den Delegationsprozess fortsetzen.

### Warum kann ich nicht direkt von Binance aus einen Stake platzieren? {#why-can-t-i-stake-directly-from-binance}

Das Staking über Binance wird noch nicht unterstützt. Es wird eine Ankündigung geben, ob und wann Binance dies unterstützt.

### Ich habe meine Delegation abgeschlossen. Wo kann ich die Details überprüfen? {#i-have-completed-my-delegation-where-can-i-check-details}

Sobald du deine Delegation abgeschlossen hast, warte auf 12 Blockbestätigungen auf Ethereum (ca. 3-5 Minuten), und dann kannst du auf dem Dashboard auf **Mein Konto** klicken.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Wo kann ich meine Prämien überprüfen? {#where-can-i-check-my-rewards}

Auf dem Dashboard kannst du auf der linken Seite auf die **Option Mein Konto** klicken.

<div>
  <img src={useBaseUrl("/img/delegator-faq/my-account.png")} />
</div>

### Brauche ich ETH, um die Gasgebühren zu bezahlen? {#do-i-need-eth-to-pay-for-gas-fees}

Ja. Sie sollten ~0,05–0,1 ETH vorsehen, um sicherzugehen.

### Muss ich Matic-Token in das Polygon Mainnet-Netzwerk einzahlen, um Stakes zu platzieren? {#do-i-need-to-deposit-matic-tokens-to-the-polygon-mainnet-network-for-staking}

Nein. Dein gesamtes Guthaben muss sich im Ethereum-Hauptnetzwerk befinden.

### Wenn ich versuche, die Transaktion durchzuführen, ist die Schaltfläche „Bestätigen“ deaktiviert. Woran liegt das? {#when-i-try-to-do-the-transaction-my-confirm-button-is-disabled-why-so}

Vergewissern, ob genügend ETH für die Gasgebühren vorhanden sind.

### Wann werden die Prämien ausgeschüttet? {#when-does-reward-get-distributed}

Belohnungen werden immer dann ausgeschüttet, wenn ein Checkpoint eingereicht wird.

Aktuell werden MATIC-Token proportional auf jede erfolgreiche Checkpoint-Einreichung an jeden Delegator verteilt, basierend auf ihrem Einsatz in Bezug auf den gesamten Staking Pool aller Prüfer und Delegierten. Außerdem variiert der Prozentsatz der Belohnung für jeden Delegierer bei jedem Checkpoint, je nach Anteil des Stakes des Delegierers, des Validators sowie dem Anteil am Gesamt-Stake.

(Beachte, dass es einen 10%igen Proposer-Bonus gibt, der demjenigen Validator zusteht, der den Checkpoint einreicht, jedoch nimmt der Effekt des zusätzlichen Bonus im Laufe der Zeit über mehrere Checkpoints hinweg durch verschiedene Validatoren auf null ab.)

Die Checkpoint-Einreichung wird von einem der Prüfer ungefähr alle 34 Minuten durchgeführt. Diese Zeit ist eine ungefähre Angabe und kann je nach dem Konsens der Prüfer über den Polygon-Heimdall-Layer variieren. Dies kann auch je nach Ethereum-Netzwerk variieren. Eine höhere Überlastung des Netzwerks kann zu sich verzögernden Checkpoints führen.

Du kannst Checkpoints auf dem Staking Vertrag [verfolgen.](https://etherscan.io/address/0x86e4dc95c7fbdbf52e33d563bbdb00823894c287)

### Warum wird die Prämie bei jedem Checkpoint verringert? {#why-does-reward-keep-getting-decreased-every-checkpoint}

Die tatsächlich verdienten Prämien hängen von der tatsächlichen Gesamtmenge der gesperrten Vorräte im Netzwerk bei jedem Checkpoint ab. Dies wird voraussichtlich erheblich variieren, je mehr MATIC-Token in die Staking-Verträge aufgenommen werden.

Die Prämien werden zu Beginn höher sein und mit steigendem Anteil des gesperrten Vorrats % weiter sinken. Diese Veränderung des gesperrten Vorrats wird bei jedem Checkpoint erfasst, und die Prämien werden auf dieser Grundlage berechnet.

### Wie kann ich meine Prämien einfordern? {#how-can-i-claim-my-rewards}

Du kannst deine Prämien sofort beanspruchen, indem du auf den **Button** Auszahlungen klickst. Dadurch werden die gesammelten Prämien auf Ihr delegiertes Konto auf Metamask übertragen.

<div>
  <img src={useBaseUrl("/img/delegator-faq/withdraw-reward.png")} />
</div>

### Wie lange dauert die Aufhebung der Bindung? {#what-is-the-unbonding-period}

Die Aufhebung der Bindung auf Polygon dauert jetzt etwa 9 Tage. Vorher waren es 19 Tage. Diese Periode gilt für den ursprünglich delegierten Betrag und den erneut delegierten Beträgen - sie gilt nicht für Prämien, die nicht erneut delegiert wurden.

### Erhalte ich weiterhin Belohnungen, nachdem ich entkoppelt bin? {#will-i-keep-receiving-rewards-after-i-unbond}

Nein. Sobald du dich unbond, wirst du nicht mehr mehr erhalten, Belohnungen zu erhalten.

### Wie viele Transaktionen sind für die Delegation erforderlich? {#how-many-transactions-does-the-delegation-require}

Die Delegation erfordert 2 Transaktionen, eine nach dem anderen. Ein, um die Anfrage zu **genehmigen** und eine auf **Einzahlung**.

<div>
  <img src={useBaseUrl("/img/delegator-faq/delegate.png")} />
</div>

### Was bedeutet „Prämien rückübertragen“? {#what-does-redelegate-rewards-mean}

Die Redelegating deiner Belohnungen bedeutet, dass du deinen Einsatz erhöhen möchtest, indem du die Belohnungen erneut restaking die du gesammelt hast.

### Kann ich für jeden Prüfer einen Stake platzieren? {#can-i-stake-to-any-validator}

Ja. Bei allen Prüfern handelt es sich derzeit um Polygon Foundation-Knoten.

Wir führen das Polygon-Hauptnetzwerk phasenweise ein. Später kommen schrittweise externe Prüfer hinzu. Weitere Informationen finden Sie unter https://blog.matic.network/mainnet-is-going-live-announcing-the-launch-sequence/.

### Welcher Browser ist mit dem Staking-Dashboard kompatibel? {#which-browser-is-compatible-with-staking-dashboard}

Chrome, Firefox und Brave

### Meine Metamask bleibt nach der Anmeldung bei der Bestätigung hängen, was kann ich tun? Oder es passiert nichts, wenn ich versuche, mich anzumelden? {#my-metamask-is-stuck-at-confirming-after-login-what-do-i-do-or-nothing-happens-when-i-try-to-login}

Überprüfe Folgendes:

- Wenn du Brave verwendest, deaktiviere bitte die Option für **Crypto Wallets** verwenden, im settings
- Überprüfen Sie, ob Sie bei Metamask angemeldet sind
- Überprüfen Sie, ob Sie mit Trezor/Ledger bei Metamask angemeldet sind. Du musst zusätzlich die Berechtigung zum Aufrufen von Verträgen auf deinem Ledger-Gerät aktivieren, falls dies noch nicht geschehen ist.
- Überprüfe den Zeitstempel deines Systems. Wenn die Systemzeit nicht korrekt ist, muss sie korrigiert werden.

### Wie kann ich Geld von Binance oder anderen Börsen an die Polygon-Wallet senden? {#how-do-i-send-funds-from-binance-or-other-exchanges-to-polygon-wallet}

Technisch gesehen ist die Polygon Wallet Suite/Staking-Schnittstelle nur eine Webanwendung. Derzeit unterstützt es die folgenden Wallets - Metamask, WalletConnect und WalletLink.

Zuerst musst du deine Gelder von Binance oder einem anderen Austausch an deine Ethereum-Adresse auf Metamask. abheben. Wenn Sie nicht wissen, wie man Metamask benutzt, Google kennt die Antwort. Es gibt jede Menge Videos und Blogs, die den Einstieg erleichtern.

### Wann kann ich ein Prüfer werden und wie viele Token mache ich dafür doch? {#when-can-i-become-a-validator-and-how-many-tokens-do-i-for-that}

Ein Benutzer kann nur dann einen Platz als Prüfer erhalten, wenn die folgenden Bedingungen erfüllt sind:
1. Wenn ein Prüfer sich entscheidet, aus dem Netzwerk zu unstake oder
2. warte auf den Auktionsmechanismus und ersetze den inaktiven Prüfer.

Der minimale Stake hängt vom Auktionsverfahren ab, bei dem ein Benutzer einen anderen überbietet.

### Was passiert, wenn ich während des Delegierens Prämien gesammelt habe und ich demselben Prüferknoten zusätzliches Geld hinzufüge? {#if-i-have-earned-rewards-while-delegating-and-if-i-add-additional-funds-to-the-same-validator-node-what-happens}

Wenn Sie Ihre Prämien nicht rückübertragen haben, bevor Sie weitere Gelder an denselben Prüferknoten delegieren, werden Ihre Prämien automatisch abgezogen.

Falls Sie das nicht wollen, delegieren Sie Ihre Belohnungen erneut, bevor Sie zusätzliche Mittel delegieren.

### Ich habe meine Token über Metamask auf dem Staking-Dashboard delegiert. Muss ich mein System oder Gerät eingeschaltet lassen? {#i-have-delegated-my-tokens-via-metamask-on-the-staking-dashboard-do-i-need-to-keep-my-system-or-device-on}

Nein. Sobald deine Delegation bestätigt sind, und du kannst deine Token sehen, die in den Bereichen **Total Stake** und **New Reward** angezeigt werden, dann bist du fertig. Es ist nicht nötig, dein System oder Gerät eingeschaltet zu lassen.

### Ich habe unbonded, wie lange dauert es zu Unbond? {#i-have-unbonded-how-long-will-it-take-to-unbond}

Die Frist für die Aufhebung der Bindung ist derzeit auf 82 Checkpoints festgelegt. Das sind etwa 9 Tage. Jeder Checkpoint dauert etwa 34 Minuten. Allerdings können sich einige Checkpoints aufgrund einer Überlastung auf Ethereum um bis zu ~1 Stunde verzögern.

### Ich habe unbonded und sehe jetzt den Claim Stake Button, aber es ist deaktiviert, warum ist das? {#i-have-unbonded-and-i-now-see-the-claim-stake-button-but-it-is-disabled-why-is-that}

Die Schaltfläche „Stake einfordern“ wird erst aktiviert, wenn die Frist für die Aufhebung der Bindung abgelaufen ist. Der Zeitraum für die Aufhebung der Bindung ist derzeit auf 82 Checkpoints festgelegt.

### Woher weiß ich, wann die Schaltfläche „Stake einfordern“ aktiviert wird? {#do-i-know-when-will-the-claim-stake-button-be-enabled}

Ja, unter der Schaltfläche „Stake einfordern“ sehen Sie einen Hinweis, wie viele Checkpoints noch ausstehen, bevor die Schaltfläche „Stake einfordern“ aktiviert wird. Jeder Checkpoint dauert etwa 30 Minuten. Allerdings können sich einige Checkpoints aufgrund einer Überlastung auf Ethereum um bis zu ~1 Stunde verzögern.

<div>
  <img src={useBaseUrl("/img/delegator-faq/unbond.png")} />
</div>

### Wie stelle ich meine Delegation von Foundation-Knoten auf externe Knoten um? {#how-do-i-switch-my-delegation-from-foundation-nodes-to-external-nodes}

Die Delegation kann mit der Option **Stake verschieben** auf der Staking-UI umgestellt werden. Dadurch wird deine Delegation vom Foundation-Knoten auf einen anderen externen Knoten ihrer Wahl umgestellt.

<div align="center">
  <img src={useBaseUrl("/img/delegator-faq/move-stake.png")} width="500" />
</div>

Du wirst eine Liste anderer Prüfer sehen:

<div>
  <img src={useBaseUrl("/img/delegator-faq/validators.png")} />
</div>

### Gibt es eine Frist für die Aufhebung der Bindung, wenn ich die Delegation von Foundation-Knoten auf externe Knoten umstelle? {#will-there-be-any-ubonding-period-when-i-switch-delegation-from-foundation-nodes-to-external-nodes}

Wenn die Delegation von Foundation-Knoten auf externe Knoten umgestellt wird, gibt es keine Frist für die Aufhebung der Bindung. Es ist eine direkte verzögerungslose Umstellung. Wenn Sie jedoch die Bindung von einem Foundationknoten oder einem externen Knoten aufheben, gibt es dafür einen Aufhebungszeitraum.

### Gibt es Besonderheiten bei der Wahl eines externen Knotens bei der Umstellung der Delegation? {#are-they-any-specifics-to-choose-an-external-node-during-switch-delegation}

Nein. Jeder beliebige Knoten kann ausgewählt werden.

### Was passiert mit meinen angesammelten Belohnungen, wenn ich die Delegation von einem Foundation-Knoten auf einen externen Knoten umstelle? {#what-happens-to-my-rewards-that-are-accumalated-if-i-switch-delegation-from-foundation-to-external-node}

Wenn Sie Ihre Prämien vor dem Delegationswechsel noch nicht eingefordert haben, werden die bis dahin angesammelten Prämien nach dem erfolgreichen Wechsel Ihrer Delegation von Foundation zu Extern auf Ihr Konto zurücküberwiesen.

### Funktioniert die Delegation auf externen Knoten genauso wie auf Foundation-Knoten? {#will-delegation-on-the-external-nodes-work-the-same-as-foundation-nodes}

Ja, es funktioniert genauso wie Foundation-Knoten.

### Bekomme ich weiterhin Prämien, nachdem ich die Delegation auf einen externen Knoten umgestellt habe? {#will-i-still-get-rewards-after-delegating-to-an-external-node}

Ja, die Prämien werden genauso verteilt wie vorher auf den Foundation-Knoten. Jede erfolgreiche Einreichung eines Checkpoints bringt Prämien. Wie derzeit umgesetzt, werden die Prämien an jedem Kontrollpunkt im Verhältnis zum Einsatzverhältnis verteilt und berechnet.

### Gibt es eine Frist für die Aufhebung der Bindung, wenn ich die Bindung zu einem externen Knoten aufhebe? {#will-there-be-any-unbonding-period-if-i-unbond-from-an-external-node}

Ja, die Frist für die Aufhebung der Bindung bleibt wie bisher. 82 Checkpoints.

### Gibt es eine Sperrfrist, nachdem ich meine Delegation von einem Foundation-Knoten auf einen externen Knoten umgestellt habe? {#will-there-be-any-locking-period-after-i-switch-my-delegation-from-foundation-to-external-node}

Nein. Es gibt keine Sperrfrist, nachdem die Delegation umgestellt wurde.

### Kann ich meine Delegation teilweise von einem Foundation-Knoten auf einen externen Knoten umstellen? {#can-i-partially-switch-my-delegation-from-foundation-to-external-nodes}

Ja, Sie haben die Möglichkeit, Ihren Stake teilweise vom Foundation-Knoten auf einen externen Knoten zu verschieben. Der Rest des Stakes verbleibt auf dem Foundation-Knoten. Sie können diese dann auf einen anderen Knoten Ihrer Wahl oder auf denselben Knoten verschieben.

### Kann ich die Delegation von einem externen Knoten auf einen anderen externen Knoten umstellen? {#can-i-switch-delegation-from-an-external-node-to-another-external-node}

Nein, die Option **Stake verschieben** ist nur auf den Foundation-Knoten verfügbar. Wenn Sie Ihre Delegation von einem externen Knoten zu einem anderen externen Knoten wechseln möchten, müssen Sie zunächst die Bindung aufheben und dann die Delegation an einen anderen externen Knoten vornehmen.

### Wann wird der Foundation-Knoten abeschaltet? {#when-will-the-foundations-node-be-turned-off}

Die Foundation-Knoten werden bis Ende Januar 2021 deaktiviert.

### Wird es in Zukunft weitere Foundation-Knoten geben? {#will-there-be-any-foundation-nodes-in-the-future}

Nein, es wird in Zukunft keine Foundation-Knoten geben.

### Wie viele Transaktionen muss ich für Gas bezahlen, wenn ich einen Stake verschiebe? {#how-many-transactions-do-i-need-to-pay-for-gas-when-i-do-a-move-stake}

Das Verschieben eines Stakes ist nur eine Einzeltransaktion. Alle Transaktionen würden über die Ethereum-Blockchain abgewickelt, sodass Sie für die Transaktion zum Verschieben des Stakes einige ETH ausgeben müssten.
