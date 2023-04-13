---
id: validator-key-management
title: Validator-Schlüsselverwaltung
description: Signer und Owner Key Validator-Management
keywords:
  - docs
  - matic
  - polygon
  - Validator Key Management
  - signer
  - owner
image: https://matic.network/banners/matic-network-16x9.png
---

# Validator-Schlüsselverwaltung {#validator-key-management}

Jeder Prüfer verwendet zwei Keys, um die validator Aktivitäten auf Polygon zu verwalten. Der Signierschlüssel wird auf Knoten gehalten und wird im Allgemeinen als `hot`-Wallet betrachtet, während der Eigentümerschlüssel sehr sicher gehalten wird, selten verwendet wird und allgemein als `cold`-Wallet gilt. Das eingesetzte Geld wird durch den Eigentümerschlüssel kontrolliert.

Diese Trennung der Verantwortlichkeiten wurde durchgeführt, um einen effizienten Tradeoff zwischen Sicherheit und Benutzerfreundlichkeit zu gewährleisten. Beide Keys sind Ethereum kompatible Adressen und arbeiten genau auf die gleiche Weise. Und ja, es ist möglich, dieselben Owner und Signer zu haben.

## Signierschlüssel {#signer-key}

Der Signierschlüssel ist eine Adresse, die für die Signierung von Heimdall-Blöcken, Checkpoints und anderen signing Aktivitäten verwendet wird. Der private Schlüssel dieses Schlüssels wird auf dem Prüfknoten zu Signierzwecken gespeichert. Er kann nicht Stake, Prämien oder Delegationen verwalten.

Der Prüfer muss zwei Arten von Salden auf dieser Adresse behalten:

- Matic-Token auf Heimdall (durch Top-up-Transaktionen), um Validierungsaufgaben auf Heimdall wahrzunehmen
- ETH auf der Ethereum-Chain zum Senden von Checkpoints auf Ethereum

## Eigentümerschlüssel {#owner-key}

Der Eigentümerschlüssel ist eine Adresse, die zum Stanzen, Re-Stake, Ändern des Signierschlüssels verwendet wird, zum Auszahlen von Belohnungen und zum Verwalten delegation Parameter auf der Ethereum-Chain verwendet wird. Der Privatschlüssel für diesen Schlüssel muss um jeden Preis sicher sein.

Alle Transaktionen über diesen Key werden auf der Ethereum-Chain durchgeführt.

## Signiererwechsel {#signer-change}

Das folgende Ereignis wird im Falle eines Signiererwechsels auf der Ethereum-Chain `StakingInfo.sol`erzeugt: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol)

```go
// Signer change
event SignerChange(
  uint256 indexed validatorId,
  address indexed oldSigner,
  address indexed newSigner,
  bytes signerPubkey
);
```

Die Heimdall-Bridge verarbeitet diese Ereignisse und sendet Transaktionen an Heimdall, um den Status auf der Grundlage der Ereignisse zu ändern.