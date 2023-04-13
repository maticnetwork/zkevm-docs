---
id: staking
title: Staking
description: Module qui gère les transactions liées aux validateurs et l'état
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

Le module de staking gestionne les transactions et l'état liés au validateur pour Heimdall. Notez qu'un validateur fait des stakes de leurs jetons sur la chaîne Ethereum et devient un validateur. Les validateurs respectifs envoient les transactions sur Heimdall en utilisant les paramètres nécessaires pour reconnaître la monnaie de change du stake Ethereum. Une fois que la majorité des validateurs s'accordent sur la monnaie de stake sur le stake, ce module sauvegarde les informations du validateur sur l'état de Heimdall.

## Gestion clé {#key-management}

Pour la gestion clé, veuillez vous référer à [la gestion clé du Validateur](/docs/pos/heimdall/validator-key-management)

## Délégation {#delegation}

Ce module gère uniquement le staking du validateur sur Heimdall. La délégation est uniquement disponible sur des contrats intelligents sur la chaîne Ethereum. Pour optimiser le calcul de récompenses de la délégation sur les contrats intelligents, nous utilisons des actions de validateur (ERC20 par validateur).

Plus de détails ici: [Délégation (actions de Validateur)](/docs/pos/contracts/delegation)

## Récompenses {#rewards}

Toutes les récompenses sont distribuées sur la chaîne d'Ethereum. Les validateurs et les délégateurs réclament leurs récompenses ou refait leur stake en envoyant simplement la transaction sur`StakeManager.sol`

Plus de détails ici: [Récompenses](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## Messages {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

`MsgValidatorJoin`gère le staking lorsqu'un nouveau validateur s'inscrit dans le système. Une fois que le validateur appelle `stake` ou `stakeFor` dans  `StakingManager.sol`sur Ethereum, et le nouveau      `Staked`événement est émis.

Source: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

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

`activationEpoch` est le comptage du point de contrôle d'où un validateur deviendra actif sur Heimdall.

L'appel de stake sur un contrat intelligent échoue si les emplacements ne sont pas disponibles. Les emplacements de validateur sont le moyen de restreindre une certaine quantité de validateurs dans le système. Les emplacements sont gérés sur les contrats intelligents d'Ethereum.

Voici le `ValidatorJoin`message pour la transaction de Heimdall:

```go
type MsgValidatorJoin struct {
	From         hmTypes.HeimdallAddress `json:"from"`
	ID           hmTypes.ValidatorID     `json:"id"`
	SignerPubKey hmTypes.PubKey          `json:"pub_key"`
	TxHash       hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex     uint64                  `json:"log_index"`
}
```

### MsqStakeUpdate {#msgstakeupdate}

`MsgStakeUpdate`gestionne la mise à jour du stake quand un validateur refait les stakes ou lorsqu'une nouvelle délégation entre en jeu. Dans les deux cas, le nouveau `StakeUpdate` événement est émis.

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

Voici le `MsgStakeUpdate`message pour la transaction de Heimdall:

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

`MsgValidatorExit`gestionne le processus de sortie du validateur après qu'un validateur initie le traitement de sortie sur Ethereum. Il émet `SignerUpdate` un événement.

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

Voici le `MsgValidatorExit`message pour la transaction de Heimdall:

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

`MsgSignerUpdate`gestionne la mise à jour du signataire lorsqu'un validateur met à jour la clé du signataire sur Ethereum. Il émet `SignerUpdate` un événement.

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

Voici le `MsgSignerUpdate`message pour la transaction de Heimdall:

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

## Les commandes de CLI {#cli-commands}

### Les détails du Validateur {#validator-details}

**Par l'adresse du signataire**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

Cette commande devrait afficher le résultat suivant:

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

**Par l'adresse du validateur**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

Cette commande devrait afficher le résultat suivant:

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

### Inscription du validateur {#validator-join}

Cette commande envoie la commande de l'inscription du validateur à travers CLI:

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

`tx-hash`la valeur doit être le même que l'identifiant de Ethereum TX qui a émis `Staked`l'événement et `log-index` doit être le même avec lequel l'événement d'index est émis.      

## API de REST {#rest-apis}

| Nom | Méthode | Point de terminaison |
|----------------------|------|------------------|
| Obtenez l'ensemble de validateur d'Heimdall | GET | /staking/validator-set |
| Obtenez les détails du validateur | GET | /staking/validator/validator-id |


Tous les API de requête présenteront dans le format suivant:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
