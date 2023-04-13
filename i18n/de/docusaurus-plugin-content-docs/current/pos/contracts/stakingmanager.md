---
id: stakingmanager
title: Staking-Manager
description: Staking Manager ist der Hauptauftrag für die Handhabung von validator-bezogenen Aktivitäten im Polygon Netzwerk.
keywords:
  - docs
  - Staking Manager
  - polygon
  - wiki
  - validator
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Alle Prämien werden auf Grundlage von Polygons Proof-of Security-basiertem Konsens, der gesamten ⅔+1- Proof-Verfizierung und der Abwicklung des Stakings auf dem Ethereum Smart Contract durchgeführt. Der gesamte Aufbau folgt dieser Philosophie, den Datenverkehr auf dem Mainnet-Contract möglichst gering zu halten. Es führt die information durch und schiebt alle computation-heavy Operationen auf L2 (lies über [Heimdall](https://wiki.polygon.technology/docs/pos/heimdall/overview)).

**Stakers** werden in **Prüfer**, **Delegatoren** und **Beobachter** unterteilt (für fraud

[**StakeManager**](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/stakeManager/StakeManager.sol) ist der Hauptvertrag für die Handhabung von Validator-bezogenen Aktivitäten wie `checkPoint`signature Prämienverteilung und Stake Management. Da der Vertrag **NFT ID** als source verwendet, hat der Wechsel des Eigentums und des Signers nichts im System.

:::tip

Von einer Ethereum-Adresse **aus kann ein Staker nur ein Prüfer oder Delegator sein** (es ist nur eine Design-Wahl, keine harten Gründen).

:::

## Validator Admissions / Ersatz {#validator-admissions-replacement}

### Zulassungen {#admissions}
Derzeit sind keine offenen Validator-Slots auf Polygon PoS verfügbar. Es gibt auch eine Warteliste, um Prüfer zu werden. Wenn Slots verfügbar werden, können Validatoren angewandt werden, um in Betracht zu ziehen und von der Warteliste entfernt werden.


### Ersatz {#replacement}
PIP4 hat das Konzept der Darstellung der validator für die community vorgestellt. Wenn sich ein Prüfer für einen längeren Zeitraum in einem ungesunden Zustand befindet, wie in PIP4 beschrieben, werden sie vom Netzwerk ausgesperrt. Der validator wird dann für diejenigen zur Verfügung gestellt, die aus der Warteliste kommen.

:::info

Derzeit wird [<ins>Phase 2 von PART C in PIP4</ins>](https://forum.polygon.technology/t/pip-4-validator-performance-management/9956/24) implementiert. Hier entscheidet die Community über die Bewertungskriterien für die validator In der Zeit wird diese Übung einen Bewerbungs- und Zulassungsprozess erstellen.

:::

## Methoden und Variablen {#methods-and-variables}

:::caution Slashing Implementation

`jail``unJail`, und `slash`Funktionen werden derzeit nicht als Teil der slashing verwendet.

:::

### validatorThreshold {#validatorthreshold}

Es speichert die maximale Anzahl der vom System akzeptierten Prüfer, auch Slots genannt.

### AccountStateRoot {#accountstateroot}

- Für verschiedene Buchhaltung, die auf Heimdall für Prüfer und Delegator durchgeführt wird, wird Account root eingereicht, während der Einreichung der `checkpoint`.
- accRoot wird verwendet während `claimRewards`und .`unStakeClaim`

### stake / stakeFor {#stake-stakefor}

```solidity title="StakeManager.sol"
function stake(
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes calldata signerPubkey
) public;

function stakeFor(
    address user,
    uint256 amount,
    uint256 heimdallFee,
    bool acceptDelegation,
    bytes memory signerPubkey
) public;
```

- Ermöglicht jedem mit einem Betrag (in MATIC Token) größer als , wenn weniger `minDeposit`als `currentValidatorSetSize`ist.`validatorThreshold`
- Muss übertragen `amount+heimdallFee`werden, legt Prüfer in den Auktionsperiode für ein auctionInterval (mehr im Auction
- `updateTimeLine`aktualisiert spezielle Timeline-Datenstruktur, die den Überblick über aktive Prüfer und den aktiven Einsatz für die gegebenen for behalten.
- Eine Unique `NFT`wird auf jedem neuen `stake`oder Call angezeigt, der an jeden übertragen werden `stakeFor`kann, aber 1:1 Ethereum Adresse sein.
- `acceptDelegation`auf true gesetzt, wenn Validatoren eine Delegation akzeptieren möchten, wird der `ValidatorShare`Vertrag für den Validator bereitgestellt.

### Entfernen {#unstake}

- Entfernen Sie den Prüfer von der in der nächsten Epoche gesetzt (nur gültig für den aktuellen Checkpoint, der einmal aufgerufen `unstake`wird)
- Entferne den Stake des Validators von der Datenstruktur der Timeline, aktualisiere den Zähler für den Austritt des Validators am Ende der Epoche.
- Wenn der Prüfer die Delegation aufgeteilt hat, sammle alle Belohnungen und schalte den delegation für neue Delegationen ein.

### unstakeClaim {#unstakeclaim}

```solidity
function unstakeClaim(uint256 validatorId) public;
```

- `unstaking`Nach werden Prüfer in den withdrawal gesetzt, damit sie für frühere Betrüger gesättigt werden können, wenn ein Betrug nach `unstaking`, gefunden wird.
- Sobald der `WITHDRAWAL_DELAY`Zeitraum bedient ist, können Prüfer diese Funktion aufrufen und mit der Abwicklung durchführen `stakeManager`(erhalten Sie Prämien, wenn überhaupt, erhalten gestohlene Token zurück, brennen NFT usw.).

### Wiederverwenden {#restake}

```solidity
function restake(uint256 validatorId, uint256 amount, bool stakeRewards) public;
```

- Erlaubt es Validatoren, ihren Stake zu erhöhen, indem sie neue Beträge oder Prämien oder beides einlegen.
- Muss die Timeline (Betrag) für den aktiven Einsatz aktualisieren.

### withdrawRewards {#withdrawrewards}

```solidity
function withdrawRewards(uint256 validatorId) public;
```

Diese Methode ermöglicht es den Prüfern, akkumulierte Belohnungen zurückzuziehen, müssen in Erwägung ziehen, Belohnungen aus dem delegation zu erhalten, wenn der Prüfer die Delegation akzeptiert.

### updateSigner {#updatesigner}

```solidity
function updateSigner(uint256 validatorId, bytes memory signerPubkey) public
```

Diese Methode ermöglicht es validators die Signer-Adresse zu aktualisieren (die verwendet wird, um Blöcke auf Polygon blockchain und Checkpoint-Signaturen auf zu `stakeManager`validieren).

### topUpForFee {#topupforfee}

```solidity
function topUpForFee(uint256 validatorId, uint256 heimdallFee) public;
```

Validatoren können ihr Guthaben für Heimdall Fee aufladen, indem sie diese Methode aufrufen.

### claimFee {#claimfee}

```solidity
function claimFee(
        uint256 validatorId,
        uint256 accumSlashedAmount,
        uint256 accumFeeAmount,
        uint256 index,
        bytes memory proof
    ) public;
```

Diese Methode wird verwendet, um Gebühren von Heimdall abzuheben. wird auf jedem Checkpoint aktualisiert, damit Prüfer einen Nachweis über die Aufnahme in diesem root für Konto auf `accountStateRoot`Heimdall erbringen und Gebühren zurücknehmen können.

Beachten Sie, dass neu geschrieben `accountStateRoot`wird, um Ausgänge auf mehreren Checkpoints zu verhindern (für alte root und Accounting `stakeManager`speichern). `accumSlashedAmount`wird im Moment nicht verwendet und für das Slashing auf Heimdall verwendet, wenn nötig.

### StakingNFT {#stakingnft}

Standard ERC721 Vertrag mit wenigen Einschränkungen wie einem Token pro Benutzer und in sequentieller Weise geprägt.

### startAuction {#startauction}

```solidity
function startAuction(
    uint256 validatorId, /**  auction for validator */
    uint256 amount /**  amount greater then old validator's stake */
    ) external;
```

Um ein Gebot zu starten oder ein Gebot höher auf bereits laufenden Auktion zu starten, wird diese Funktion verwendet. Die Auktionsperiode läuft in Zyklen, `(auctionPeriod--dynasty)--(auctionPeriod--dynasty)--(auctionPeriod--dynasty)`so dass sie **auf die richtige Auktionsperiode überprüfen muss.**

`perceivedStakeFactor`wird verwendet, um den genauen Faktor zu calculate Stake (beachte, dass es derzeit standardmäßig 1 WIP für die Auswahl der Funktion ist). **Muss nach Auktion aus der letzten Auktionsphase überprüfen, ob noch los ist** (man kann wählen, nicht `confirmAuction`anrufen um ihr Kapital in der nächsten Auktion zu erhalten). Normalerweise wird die kontinuierliche englische Auktion in einer `auctionPeriod`stattfinden.

### confirmAuctionBid {#confirmauctionbid}

```solidity
function confirmAuctionBid(
        uint256 validatorId,
        uint256 heimdallFee, /** for new validator */
        bool acceptDelegation,
        bytes calldata signerPubkey
    ) external
```

- **Muss überprüfen, ob dies keine auctionPeriod. ist.**
- Wenn der letzte Bieter Eigentümer von `validatorId`ist, sollte Verhalten ähnlich sein, wie auf restake.
- Im zweiten Fall, nimm einen unStake vor `validatorId`und füge einen neuen Benutzer als Validator vom nächsten Checkpoint hinzu, da das Verhalten für den neuen Benutzer ähnlich sein sollte, wie stake/stakeFor.

### checkSignatures {#checksignatures}

```solidity
function checkSignatures(
        uint256 blockInterval,
        bytes32 voteHash,
        bytes32 stateRoot,
        bytes memory sigs
    ) public;
```

- Die Writes sind nur für den Root-Chain-Contract gedacht, wenn Checkpoints eingereicht werden.
- `voteHash`, auf welchem alle Validatoren unterschreiben (BFT ⅔+1-Vereinbarung)
- Diese Funktion validiert nur die eindeutigen Signaturen und Kontrollen, da die ⅔+1-Bemächtigung auf der Checkpoint-Root unterschrieben wurde (Miteinbeziehung in `voteHash`-Verifizierung im RootChain-Contract für alle Daten) `currentValidatorSetTotalStake` stellt den aktuellen aktiven Stake zur Verfügung.
- Prämien werden proportional zum Einsatz des Prüfers verteilt. Mehr zu Prämien in [Rewards Distribution](https://www.notion.so/Rewards-Distribution-127d586c14544beb9ea326fd3bb5d3a2).

### isValidator {#isvalidator}

Prüft, ob ein bestimmter Prüfer für die aktuelle Epoche aktiv ist.

## Datenstruktur der Timeline {#timeline-data-structure}

```solidity
struct State {
    int256 amount;
    int256 stakerCount;
}

mapping(uint256 => State) public validatorState;
```

<img src={useBaseUrl("img/staking_manager/staking_manager.png")} />

## StakingInfo {#stakinginfo}

Der zentralisierte logging für Validator- und delegation enthält nur wenige read Du kannst den Quellcode des [StakingInfo.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol) auf GitHub ansehen.

## ValidatorShareFactory {#validatorsharefactory}

Ein Werkvertrag zur Bereitstellung von `ValidatorShare`Vertrag für jeden Prüfer, der sich für die Delegation anmeldet. Du kannst den Quellcode des Vertrags über den [ValidatorShareFactory.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/validatorShare/ValidatorShareFactory.sol) auf GitHub ansehen.
