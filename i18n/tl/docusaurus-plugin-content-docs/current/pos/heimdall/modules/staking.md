---
id: staking
title: Pag-stake
description: Module na namamahala sa mga transaksyon na may kaugnayan sa validator at state
keywords:
  - docs
  - matic
  - staking
  - heimdall
  - validator
image: https://matic.network/banners/matic-network-16x9.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Pag-stake {#staking}

Ang module ng staking ay namamahala sa mga transaksyong nauugnay sa validator at estado para sa Heimdall. Tandaan na inilalagay ng validator ang kanilang mga token sa Ethereum chain at nagiging validator. Ang kani-kanilang validator ay nagpapadala ng mga transaksyon sa Heimdall gamit ang mga kinakailangang parameter upang kilalanin ang pagbabago ng Ethereum stake. Kapag sumang-ayon ang karamihan sa mga validator sa pagbabago sa stake, ise-save ng module na ito ang impormasyon ng validator sa estado ng Heimdall.

## Pamamahala ng key {#key-management}

Para sa pamamahala ng susi, mangyaring sumangguni sa [Validator](/docs/pos/heimdall/validator-key-management) key pamamahala

## Pag-delegate {#delegation}

Ang module na ito ay namamahala lamang ng pag-stake ng validator sa Heimdall. Available lang ang pag-delegate sa mga smart na kontrata sa Ethereum chain. Para ma-optimize ang pagkalkula ng mga reward sa pag-delegate sa mga smart na kontrata, gumagamit kami ng mga share ng validator (ERC20 bawat validator).

Higit pang mga detalye dito: [Pag-delegate (Mga share ng validator)](/docs/pos/contracts/delegation)

## Mga Reward {#rewards}

Ang lahat ng mga reward ay ipinamamahagi sa Ethereum chain. Inaangkin ng mga validator at mga delegator ang kanilang mga reward o mag-restake sa pamamagitan lamang ng pagpapadala ng transaksyon sa `StakeManager.sol`

Higit pang mga detalye dito: [Mga Reward](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## Mga mensahe {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

Ang `MsgValidatorJoin` ay pinangangasiwaan ang pag-stake kapag may bagong validator na sumali sa system. Kapag nag-call ang validator sa `stake` o `stakeFor` sa `StakingManager.sol` Ethereum at ang bagong `Staked` na event ay inilalabas.

Pinagmulan: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

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

Ang `activationEpoch` ay ang count ng checkpoint kung saan magiging aktibo ang isang validator sa Heimdall.

Papalya ang pag-call ng pag-stake sa smart na kontrata kung hindi available ang mga slot. Ang mga validator slot ay ang paraan upang higpitan ang ilang validator sa system. Ang mga slot ay pinamamahalaan sa mga smart na kontrata ng Ethereum.

Narito ang `ValidatorJoin` na mensahe para sa Heimdall na transaksyon:

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

Ang `MsgStakeUpdate` ay pinangangasiwaan ang pag-update ng stake kapag pumasok ang isang validator ay mag-restake o papasok ang bagong pag-delegate. Sa alinmang kaso, ilalabas ang bagong `StakeUpdate` na event.

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

Narito ang `MsgStakeUpdate` na mensahe para sa Heimdall na transaksyon:

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

Ang `MsgValidatorExit` ay pinangangasiwaan ang proseso ng pag-exit ng validator pagkatapos simulan ng validator ang proseso ng pag-exit sa Ethereum. Ito ay naglalabas ng `SignerUpdate` na event.

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

Narito ang `MsgValidatorExit` na mensahe para sa Heimdall na transaksyon:

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

Ang `MsgSignerUpdate` ay pinangangasiwaan ang update ng signer kapag na-update ng validator ang signer key sa Ethereum. Ito ay naglalabas ng `SignerUpdate` na event.

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

Narito ang `MsgSignerUpdate`mensahe Heimdall transaksyon:

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

## Mga CLI Command {#cli-commands}

### Mga detalye ng Validator {#validator-details}

**Sa pamamagitan ng signer address**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

Dapat ipakita ng command na ito ang sumusunod na output:

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

**Sa pamamagitan ng validator address**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

Dapat ipakita ng command na ito ang sumusunod na output:

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

### Validator join {#validator-join}

Nagpapadala ang command na ito ng validator join na command sa pamamagitan ng CLI:

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

Ang `tx-hash` na value ay dapat na katulad ng Ethereum TX hash na ipinapalabas ng `Staked` na event at `log-index` ay dapat na pareho kung saang index lumabas ang event.

## Mga REST API {#rest-apis}

| Pangalan | Pamamaraan | Endpoint |
|----------------------|------|------------------|
| Kunin ang validator set ng Heimdall | GET | /staking/validator-set |
| Kunin ang mga detalye ng validator | GET | /staking/validator/validator-id |


Ang lahat ng mga query API ay magreresulta sa sumusunod na format:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
