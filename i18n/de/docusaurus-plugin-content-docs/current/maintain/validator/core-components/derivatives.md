---
id: derivatives
title: Derivate
description: Delegation durch validator
keywords:
  - docs
  - polygon
  - matic
  - derivatives
  - delegation
  - shares
slug: derivatives
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon unterstützt [Delegation](/docs/maintain/glossary#delegator) über Prüferanteile. Mit diesem Design ist es einfacher, Prämien zu verteilen und die Verträge im Ethereum Mainnet ohne viel Rechenaufwand zu skalieren.

Die Delegatoren delegieren, indem sie von den Validatoren Anteile eines begrenzten Pools erwerben. Jeder Validator hat seinen eigenen Validator-Share-Token.

Nennen wir die fungiblen Validator-Share-Token für den Validator A „VATIC“. Wenn ein Benutzer an den Validator A delegiert, erhält er VATIC auf Grundlage des Wechselkurses des MATIC-VATIC-Paares. Wenn die Benutzer an Wert gewinnen, zeigt der Wechselkurs an, dass der Benutzer mehr MATIC für jeden VATIC abheben kann. Werden Validatoren abgestraft, bekommen die Benutzer weniger MATIC für ihre VATIC ausgezahlt.

Beachte, dass MATIC der Staking-Token ist. Ein Delegator muss MATIC-Token haben, um an der Delegation teilnehmen zu können.

Zu Beginn kauft der Delegator D Token aus dem Pool des Validators A, wenn der Wechselkurs 1 MATIC für 1 VATIC beträgt.

Wenn ein Validator mit mehr MATIC-Token belohnt wird, werden die neuen Token dem Pool hinzugefügt.

Nehmen wir an, zum aktuellen Pool von 100 MATIC-Tokens werden 10 MATIC-Prämien hinzugefügt. Da sich die Gesamtversorgung von VATIC Token aufgrund der Prämien nicht geändert hat, wird der Wechselkurs 1 MATIC pro 0,9 VATIC. Delegator D erhält nun mehr MATIC für den gleichen Betrag, wenn Aktien.

## Der Ablauf im Contract {#the-flow-in-the-contract}

`buyVoucher`: Diese Funktion wird zugewiesen, wenn ein Delegationsprozess zu gunsten eines Validators durchgeführt wird. Die Delegation `_amount` wird zunächst an `stakeManager` übertragen, welcher nach Bestätigung Delegationsanteile über `Mint` unter Verwendung der aktuellen `exchangeRate` ausgibt.

Der Wechselkurs wird nach dieser Formel berechnet:

`ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares`

`sellVoucher`: Diese Funktion wird aufgerufen, wenn ein Delegator die Bindung zu einem Validator aufhebt. Diese Funktion leitet den Verkauf der Gutscheine ein, die während der Delegation gekauft wurden. Es gibt einen Abhebungszeitraum, der beachtet werden muss, bevor die Delegatoren ihre Token `claim` können.

`withdrawRewards`: Als Delegator kannst du deine Prämien einfordern, indem du die `withdrawRewards`-Funktion aufrufst.

`reStake`: Die Wiedereinlage kann auf zwei Arten funktionieren: a) Der Delegator kann mittels `buyVoucher` mehr Anteile kaufen oder Prämien `reStake`. Du kannst eine Wiedereinlage in den Stake leisten, indem du einem Validator weitere Token zuweist oder indem du als ein Delegator deine gesammelten Prämien einsetzt. Der Zweck des `reStaking` ist, dass der Validator des Delegators jetzt mehr aktive Stakes hat und dafür mehr Prämien erhält, ebenso wie der Delegator.

`unStakeClaimTokens`: Sobald der Abhebungszeitraum abgelaufen ist, können die Delegatoren, die ihre Anteile verkauft haben, ihre MATIC-Tokens einfordern.

`updateCommissionRate`: Aktualisiert die Provision % für den Validator. Siehe auch [Modalitäten für Validatoren-Provisionen](/docs/maintain/validate/validator-commission-operations).

`updateRewards`: Wenn ein Validator für das Einreichen eines [Checkpoints](/docs/maintain/glossary#checkpoint-transaction) Prämien erhält, wird diese Funktion für die Auszahlung der Prämien zwischen dem Validator und den Delegatoren aufgerufen.
