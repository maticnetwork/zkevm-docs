---
id: delegation
title: Delegation über Validator
sidebar_label: Delegation
description: Delegation über Validator
keywords:
  - polygon wiki
  - docs
  - polygon
  - delegation
  - validator shares
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Polygon unterstützt Delegation über Validator-Anteile. Mithilfe dieses Modells ist es einfacher, auf Ethereum-Contracts Prämien ohne große Rechenleistung auszuschütten und im Rahmen des Slashing in großem Umfang abzustrafen (Tausende von Delegierende).

Die Delegierenden delegieren, indem sie von den Validatoren-Anteile eines begrenzten Pools erwerben. Jeder Validator wird seinen eigenen Validator-Anteils-Token haben. Nennen wir diese Fungible Token `VATIC` für einen Validator `A`. Sobald ein Benutzer `A` an einen Validator delegiert, werden diese `VATIC` auf Basis des Wechselkurses eines `MATIC/VATIC`-Paares ausgestellt. Solange Benutzer Beträge anhäufen lassen, zeigt der Wechselkurs an, dass sie jetzt mehr `MATIC` pro `VATIC` abheben können; werden Benutzer hingegen abgestraft, können diese weniger `MATIC` für ihre `VATIC` abheben.

Beachte, dass `MATIC` ein Staking-Token ist. Ein Delegierender muss über `MATIC`-Token verfügen, um an der Delegation teilzunehmen.

Zunächst kauft ein Delegierender `D` Token vom Validator `A` aus einem bestimmten Pool, wenn `1 MATIC per 1 VATIC`.

Wenn ein Validator mit mehr `MATIC`-Token belohnt wird, werden dem Pool neue Token hinzugefügt. Sagen wir mit dem aktuellen Pool von `100 MATIC`Token, werden `10 MATIC`Belohnungen in den Pool hinzugefügt. Doch da sich die Gesamtversorgung der `VATIC`-Token aufgrund der Prämien nicht verändert, fällt der Wechselkurs dann folgendermaßen aus: `1 MATIC per 0.9 VATIC`. Der Delegator `D`bekommt nun mehr `MATIC`für die gleichen Aktien.

`VATIC`: Validatoren-spezifische gemintete Validator-Anteils-Token (ERC20-Token)

## Technische Spezifikation {#technical-specification}

```solidity
uint256 public validatorId; // Delegation contract for validator
uint256 public validatorRewards; // accumulated rewards for validator
uint256 public commissionRate; // validator's cut %
uint256 public validatorDelegatorRatio = 10; // to be implemented/used

uint256 public totalStake;
uint256 public rewards; // rewards for pool of delegation stake
uint256 public activeAmount; // # of tokens delegated which are part of active stake
```

Der Wechselkurs wir wie folgt berechnet:

```js
ExchangeRate = (totalDelegatedPower + delegatorRewardPool) / totalDelegatorShares
```

## Methoden und Variablen {#methods-and-variables}

### buyVoucher {#buyvoucher}

```js
function buyVoucher(uint256 _amount) public;
```

- Übertrage die `_amount` an den stakeManager und aktualisiere die Timeline-Datenstruktur für den aktiven Stake.
- `updateValidatorState` wird verwendet, um die Timeline-DS zu aktualisieren.
- `Mint` Delegationsanteile, die die aktuellen `exchangeRate` für `_amount` verwenden.
- `amountStaked` wird verwendet, um den aktiven Stake eines jeden Delegierenden zu verfolgen, um liquide Prämien zu berechnen.

### sellVoucher {#sellvoucher}

```js
function sellVoucher() public;
```

- Mit der aktuellen `exchangeRate`und der Anzahl der Aktien zu berechnen, um den Gesamtbetrag zu errechnen (active stake + rewards).
- `unBond`aktiven Stake vom Prüfer und übertrage Belohnungen an den Delegator, falls vorhanden.
- Du musst den aktiven Stake von der Timeline entfernen, indem du `updateValidatorState` im stakeManger nutzt.
- Das `delegators`-Mapping wird verwendet, um den Stake in der Abhebungsperiode im Blick zu behalten.

### withdrawRewards {#withdrawrewards}

```js
function withdrawRewards() public;
```

- Für einen Delegator berechnen die Belohnungen und Transfer, und abhängig von der `exchangeRate`burn der Aktien.
- Beispiel: wenn ein Delegator 100 Aktien besitzt und der Wechselkurs 200 ist, also Belohnungen 100 Token sind, übertrage 100 Token an den Delegator. Der verbleibende Einsatz ist 100, also mit dem Wechselkurs 200, jetzt ist es Wert 50 Aktien. Also brennen 50 Shares. Delegator hat jetzt 50 Aktien im Wert von 100 Token (die er ursprünglich gestohlen / delegiert hat).

### Wiederverwenden {#restake}

Restake kann auf zwei Arten funktionieren: Delegator kann mehr Aktien mit `buyVoucher`oder reStake Prämien kaufen.

```js
function reStake() public;
```

Obige Funktion wird verwendet, um reStake Prämien zu erhalten. Die Anzahl an Anteilen ist nicht davon betroffen, weil `exchangeRate` dasselbe ist; also werden nur die Prämien in den aktiven Stake verschoben, sowohl für den Validator-Anteils-Contract als auch für die stakeManager-Timeline.

`getLiquidRewards`wird für die Berechnung akkumulierter Prämien verwendet, d.h. der Delegator besitzt 100 Aktie und der Wechselkurs ist 200, also Prämien sind 100 Token. Verschiebe 100 Token in aktiven Stake, da der Wechselkurs immer noch die gleiche Anzahl von Aktien ist, bleibt auch gleich. Der einzige Unterschied ist, dass nun 200 Token in aktiven Pfahl berücksichtigt werden und nicht sofort zurückgezogen werden können (kein Teil der flüssigen Prämien).

Der Zweck von reStaking ist, dass da der Prüfer des Delegators nun mehr aktiv beteiligt ist und sie mehr Belohnungen dafür verdienen werden, so wird der Delegator.

### unStakeClaimTokens {#unstakeclaimtokens}

```js
function unStakeClaimTokens()
```

Sobald die Auszahlungsfrist abgeschlossen ist, können Delegierten, die ihre Aktien verkauft haben, ihre MATIC-Token behaupten. Es müssen Token an den Benutzer übertragen werden.

### updateCommissionRate {#updatecommissionrate}

```js
function updateCommissionRate(uint256 newCommissionRate)
        external
        onlyValidator
```

- Aktualisierungs-Provision % für den Validator.

### updateRewards {#updaterewards}

```js
function updateRewards(uint256 reward, uint256 checkpointStakePower, uint256 validatorStake)
        external
        onlyOwner
        returns (uint256)
```

Wenn ein Prüfer Belohnungen für die Übermittlung von Checkpoint erhält, wird diese Funktion zur Auszahlung von Belohnungen zwischen Prüfer und Delegatoren aufgerufen.
