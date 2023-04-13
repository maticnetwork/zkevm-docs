---
id: consensus-mechanism
title: Konsensmechanismus
description: "PoW, PoS, DPoS, PoSpace und PoET."
keywords:
  - docs
  - matic
  - polygon
  - consensus mechanisms
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

# Konsensmechanismus {#consensus-mechanism}

Ein Konsensmechanismus ist ein fehlertoleranter Mechanismus, der in Computer- und Blockchain-Systemen verwendet wird, um die notwendige Vereinbarung über einen einzigen Datenwert oder einen einzigen Zustand des Netzwerks unter verteilten Prozessen oder Mulit-Agent-Systemen, wie mit Kryptowährungen, zu erzielen.

## Arten von Konsensmechanismen {#types-of-consensus-mechanism}

### Proof of Work {#proof-of-work}
Proof of Work beschreibt ein System, das einen nicht unbedeutenden, aber machbaren Aufwand erfordert, um Dos (Denial-of-Service) und andere bösartige Angriffe abzuwehren. Es erfordert ein herausforderndes computational zu lösen, um neue Blöcke in Blockchain zu erstellen.

### Proof of Stake {#proof-of-stake}
Der Proof-of-Stake-Mechanismus erzielt einen Konsens, indem er die Benutzer dazu verpflichtet, eine Menge ihrer Token einzusetzen, um die Chance zu haben, ausgewählt zu werden, um Blöcke von Transaktionen zu validieren und dafür belohnt zu werden. Priorität wird Minern gegeben, die den größten Anteil am Blockchain-System erworben haben.

### Delegierter Proof of Stake {#delegated-proof-of-stake}
Diese Form des Konsens spiegelt die Wahl von Mitgliedern in regulierenden Gremien wieder. Statt ihr Assets selbst zu stagen, können die Stakeholder diese Aktivität an Dritte übertragen, den Zeugen oder den Delegierten, die am consensus teilnehmen. Zeugen, diejenigen, die Transaktionen validieren, in der Regel einen Vorschlag vorlegen, um Stimmen bitten, von den Stakeholdern gewählt werden. Die Belohnungen von diesen Entitäten werden in der Regel mit den Netzwerkteilnehmern geteilt.

### Proof of Space {#proof-of-space}
Diese Art von Konsens-Mechanismus ist nützlich für dezentrale Dateispeicheranwendungen wie in Storj.io, Filecoin und Crust, wo Knoten beweisen, dass sie legitime Kapazität in ihrer Hardware haben. Anstatt die schwere Berechnung wie im PoW zu verwenden, nutzt sie jedoch die Speicherkapazität jedes Knotens. Manchmal auch PoStorage oder PoCapacity genannt.

### Proof of Elapsed Time {#proof-of-elapsed-time}
Eine bessere Alternative zu PoW, die weniger Computerressourcen verbraucht. Jeder teilnehmende Knoten muss auf eine zufällige Zeit warten, und der allererste Knoten, der aus dem Schlaf aufwacht, erhält die Chance, einen neuen Block zu erstellen, der dann über das Netzwerk weitergegeben wird. Es erfordert Trusted Execution Environments (TEE ) wie Intel SGX, die ein isolierter Teil des Speichers sind und nur mit einem bestimmten Satz von Anweisungen zugegriffen werden können.

## **Ressourcen**

- [Byzantine Fault Tolerance](https://medium.com/loom-network/understanding-blockchain-fundamentals-part-1-byzantine-fault-tolerance-245f46fe8419)<br></br>
- [Art der Consensus Mechanisms](https://www.codementor.io/blog/consensus-algorithms-5lr8exfi0s#types-of-consensus-algorithms)<br></br>
- [Übersicht und Geschichte der Consensus System Development](https://softwareengineeringdaily.com/2018/03/26/consensus-systems-with-ethan-buchman/)<br></br>
- [Verstehen von verteiltem Konsens](https://medium.com/s/story/lets-take-a-crack-at-understanding-distributed-consensus-dad23d0dc95)<br></br>
- [Byzantine Generals Problem](https://en.wikipedia.org/wiki/Byzantine_fault#Byzantine_Generals'_Problem)