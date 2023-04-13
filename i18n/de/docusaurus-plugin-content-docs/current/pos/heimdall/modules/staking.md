---
id: staking
title: Staking
description: Modul, das validierungsbezogene Transaktionen und Status verwaltet
keywords:
  - docs
  - matic
  - staking
  - heimdall
  - validator
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Staking {#staking}

Das Staking-Modul verwaltet die Transaktionen und den Status des Validators für Heimdall. Beachten Sie, dass ein Validator seine Token in die Ethereum-Chain einbringt und ein Validator wird. Die jeweiligen Validatoren senden die Transaktionen mit den erforderlichen Parametern an Heimdall, um die Änderung des Ethereum-Stakes zu bestätigen. Sobald die Mehrheit der Validatoren der Änderung des Stakes zustimmt, speichert dieses Modul die Validatorinformationen im Heimdall-Status.

## Schlüsselmanagement {#key-management}

Informationen zur Schlüsselverwaltung finden Sie unter [Validator Schlüsselverwaltung](/docs/pos/heimdall/validator-key-management).

## Delegation {#delegation}

Dieses Modul verwaltet nur das Validator-Staking in Heimdall. Die Delegation ist nur für Smart Contracts auf der Ethereum-Chain verfügbar. Um die Delegations-Prämienberechnung von Smart Contracts zu optimieren, verwenden wir Validator-Anteile (Erc20 pro Validator).

Weitere Informationen hier: [Delegation (Validator-Anteile)](/docs/pos/contracts/delegation)

## Belohnungen {#rewards}

Alle Prämien werden auf der Ethereum-Chain verteilt. Die Validatoren und Delegatoren fordern ihre Prämien oder ihren Stake ein, indem sie die Transaktion einfach an `StakeManager.sol` senden.

Weitere Informationen hier: [Prämien](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## Nachrichten {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

`MsgValidatorJoin` übernimmt das Staking, wenn ein neuer Validator dem System beitritt. Sobald der Validator `stake` oder `stakeFor` in `StakingManager.sol` auf Ethereum aufruft, wird das neue Ereignis `Staked` ausgegeben.

Quelle: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

```jsx
/**
 * Staked event - emitted whenever new validator
 *
 * @param signer           Signer address for the validator
 * @param validatorId      Validator id
 * @param activationEpoch  Activation epoch for validator
 * @param amount           Staked amount
 * @param total            Total stake
 * @param signerPubKey     Signer public key (required by Heimdall/Tendermint)
 */
event Staked(
    address indexed signer,
    uint256 indexed validatorId,
    uint256 indexed activationEpoch,
    uint256 amount,
    uint256 total,
    bytes signerPubkey
);
```

`activationEpoch` ist die Anzahl der Checkpoints, ab denen ein Validator auf Heimdall aktiv wird.

Der Stake Call auf Smart Contract schlägt fehl, wenn keine Slots verfügbar sind. Validator-Slots sind die Möglichkeit, eine Anzahl von Validatoren im System einzuschränken. Slots werden auf Ethereum-Smart-Contracts verwaltet.

Hier ist die Nachricht `ValidatorJoin` für die Heimdall-Transaktion:

```go
type MsgValidatorJoin struct {
	From         hmTypes.HeimdallAddress `json:"from"`
	ID           hmTypes.ValidatorID     `json:"id"`
	SignerPubKey hmTypes.PubKey          `json:"pub_key"`
	TxHash       hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex     uint64                  `json:"log_index"`
}
```

### MsgStakeUpdate {#msgstakeupdate}

`MsgStakeUpdate` kümmert sich um die Aktualisierung des Stakes, wenn ein Prüfer den Stake neu festlegt oder eine neue Delegation eintritt. In jedem Fall wird das neue Ereignis `StakeUpdate` ausgegeben.

```jsx
/**
 * Stake update event - emitted whenever stake gets updated
 *
 * @param validatorId      Validator id
 * @param newAmount        New staked amount
 */
event StakeUpdate(
	uint256 indexed validatorId,
	uint256 indexed newAmount
);
```

Hier ist die Nachricht `MsgStakeUpdate` für die Heimdall-Transaktion:

```go
// MsgStakeUpdate represents stake update
type MsgStakeUpdate struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgValidatorExit {#msgvalidatorexit}

`MsgValidatorExit` wickelt den Validator-Exit-Prozess ab, nachdem ein Validator den Exit-Prozess auf Ethereum initiiert hat. Dies gibt das Ereignis `SignerUpdate` aus.

```jsx
/**
 * Unstake init event - emitted whenever validator initiates the exit
 *
 * @param user                Signer
 * @param validatorId         Validator id
 * @param deactivationEpoch   Deactivation epoch for validator
 * @param amount              Unstaked amount
 */
event UnstakeInit(
    address indexed user,
    uint256 indexed validatorId,
    uint256 deactivationEpoch,
    uint256 indexed amount
);
```

Hier ist die Nachricht `MsgValidatorExit` für die Heimdall-Transaktion:

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

`MsgSignerUpdate` kümmert sich um die Aktualisierung des Signers, wenn ein Validator den Signierschlüssels auf Ethereum aktualisiert. Dies gibt das Ereignis `SignerUpdate` aus.

```jsx
/**
 * Signer change event - emitted whenever signer key changes
 *
 * @param validatorId      Validator id
 * @param oldSigner        Current old signer
 * @param newSigner        New signer
 * @param signerPubkey     New signer public key
 */
event SignerChange(
    uint256 indexed validatorId,
    address indexed oldSigner,
    address indexed newSigner,
    bytes signerPubkey
);
```

Hier ist die Nachricht `MsgSignerUpdate` für die Heimdall-Transaktion:

```go
// MsgSignerUpdate signer update struct
type MsgSignerUpdate struct {
	From            hmTypes.HeimdallAddress `json:"from"`
	ID              hmTypes.ValidatorID     `json:"id"`
	NewSignerPubKey hmTypes.PubKey          `json:"pubKey"`
	TxHash          hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex        uint64                  `json:"log_index"`
}
```

## CLI Befehle {#cli-commands}

### Validatorenangaben {#validator-details}

**Durch die Signer-Adresse**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

Dieser Befehl sollte die folgende Ausgabe anzeigen:

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

**Durch die Validator-Adresse**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

Dieser Befehl sollte die folgende Ausgabe anzeigen:

```json
{
    "ID":1,
    "startEpoch":0,
    "endEpoch":0,
    "power":10,
    "pubKey":"0x04b12d8b2f6e3d45a7ace12c4b2158f79b95e4c28ebe5ad54c439be9431d7fc9dc1164210bf6a5c3b8523528b931e772c86a307e8cff4b725e6b4a77d21417bf19",
    "signer":"0x6c468cf8c9879006e22ec4029696e005c2319c9d",
    "last_updated":0,
    "accum":0
}
```

### Validatorbeitritt {#validator-join}

Dieser Befehl sendet den Validatorbeitrittsbefehl über CLI:

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

Der `tx-hash` Wert muss derselbe sein wie der Ethereum-TX-Hash, der das Ereignis `Staked` ausgelöst hat, und das Ereignis `log-index` muss derselbe Index sein, bei welchem das Ereignis ausgelöst wurde.

## REST APIs {#rest-apis}

| Name | Methode | Endpunkt |
|----------------------|------|------------------|
| Heimdall-Validatorsatz abrufen | HOLEN | /staking/validator-set |
| Validatorangaben abrufen | HOLEN | /staking/validator/validator-id |


Alle Abfrage-APIs werden in folgendem Format ausgeführt:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
