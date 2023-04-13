---
id: covalent
title: Verwendung von Covalent
sidebar_label: Covalent
description: Erfahren, wie die Covalent-vereinten API für Daten verwendet werden
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## Einführung {#introduction}

Polygon bringt eine außergewöhnlich hohe Effizienz in Ethereum mithilfe einer angepassten Plasma-Version mit PoS-basierten Sidechains. Dadurch entsteht eine Lösung für schnellere und extrem kostengünstige Transaktionen mit Finalität auf der Mainchain. Das Polygon-Netzwerk sichert Lebendigkeit mithilfe von PoS-Checkpoints, die auf die Ethereum-Mainchain geschoben werden. Dadurch erzielt eine einzige Polygon-Sidechain theoretisch `2^16` Transaktionen
pro Block und möglicherweise Millionen von Transaktionen auf mehreren Chains in der Zukunft.

### Kurzinfos {#quick-facts}

<TableWrap>

| Eigenschaft | Wert |
|---|---|
| Polygon Mainnet chainId | `137` |
| Polygon Mumbai Testnet chainId | `80001` |
| Polygon Blockchain Explorer | https://polygonscan.com/ |
| Blockzeit | ~3 Sekunden |
| Datenaktualisierungs-Latenzzeit | ~6 Sekunden oder 2 Blöcke |

</TableWrap>

:::tip Schnellstart

Sehe dir dieses **[<ins>Einführungsvideo</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)** an
um loszulegen.

:::

## Unterstützte Endpunkte {#supported-endpoints}

Alle [__Class A__](https://www.covalenthq.com/docs/api/#tag--Class-A)-Endpunkte werden für das Matic Mainnet und das Mumbai Testnet unterstützt. Du kannst jedes Netzwerk über die einheitlichen APIs abfragen, indem du die `chainId`änderst.

:::info Endpunkte

Eine vollständige Liste aller Anfragen, die du im Polygon-Netzwerk mithilfe von Covalent ausführen kannst, ist in der [<ins>Covalent API-Dokumentation</ins>](https://www.covalenthq.com/docs/api/) verfügbar.

:::

---

## Anhang {#appendix}

### Matic Gas-Token {#matic-gas-token}

Um mit dem Matic-Netzwerk zu kommunizieren, müssen MATIC-Token als Gasgebühren bezahlt werden. Covalent Antworten geben `gas_*`Felder in den MATIC-Einheiten automatisch zurück.

### Token-Mapping {#token-mapping}

Covalent unterstützt eine Echtzeit-Mapping von Token-Adressen auf der Chain zwischen dem Ethereum-Mainnet und der Matic-Chain. Diese Adressen werden verwendet, um die Preise auf Matic rückwärts zu suchen und auch um die richtigen Token-Logo-URLs zurückzugeben.

Einige Beispiele für abgebildete Token:

| Token | Ethereum Mainnet | Matic Mainnet |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### Token-Preise {#token-prices}

An die Token, die dem Ethereum Mainnet wieder zugeordnet sind, kann Covalent die zugeordneten Preise zurückzugeben.
