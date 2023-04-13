---
id: proposer-bonus
title: Proposerbonus
description: Zusätzlicher Anreiz, ein Prüfer zu sein
keywords:
  - docs
  - polygon
  - matic
  - validate
  - proposer
  - bonus
  - incentive
slug: proposer-bonus
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Proposerbonus {#proposer-bonus}

In Polygon gibt es ein zusätzliches Element des Übertragens von regelmäßigen [Checkpoints](/docs/maintain/glossary.md#checkpoint-transaction) im Ethereum Mainnet. Dies ist ein wichtiger Teil der Aufgaben der Validatoren, und sie werden dazu angehalten, diese Tätigkeit auszuführen. Dies ist ein Kostenfaktor für den Validator, der nur bei einer Layer-2-Lösung wie Polygon anfällt. Wir bemühen uns, diese Kosten in den Auszahlungsmechanismus des Validator Staking Rewards einzubeziehen, und zwar als Bonus, der an den [Proposer](/docs/maintain/glossary.md#proposer) gezahlt wird, der für die Begehung des Checkpoints verantwortlich ist. Prämien abzüglich des Bonus sind auf alle Staker, Proposer und [Signierer](/docs/maintain/glossary.md#signer-address), proportional zu teilen.

Um den Bonus vollständig zu nutzen, muss der Proposer alle Signaturen im Checkpoint enthalten. Da das Protokoll 2/3 +1 Gewicht des Gesamteinsatzes wünscht, wird der Checkpoint auch mit 80 % Stimmen angenommen. In diesem Fall erhält der Proposer jedoch nur 80 % des berechneten Bonus.
