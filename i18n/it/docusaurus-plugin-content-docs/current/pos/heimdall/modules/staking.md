---
id: staking
title: Staking
description: Modulo che gestisce le transazioni e lo stato
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

Il modulo Staking gestisce le transazioni correlate al validatore e lo stato per Heimdall. Si noti che un validatore diventa tale puntando i propri token sulla catena di Ethereum. I singoli validatori inviano le transazioni su Heimdall utilizzando i parametri necessari per accettare il cambio stake di Ethereum. Una volta che la maggioranza dei validatori accetta il cambio sullo stake, questo modulo salva le informazioni dei validatori sullo stato di Heimdall.

## Gestione chiavi {#key-management}

Per la gestione delle chiavi, fare riferimento a [Gestione chiavi dei validatori](/docs/pos/heimdall/validator-key-management)

## Delega {#delegation}

Questo modulo si occupa solo della gestione dello staking dei validatori su Heimdall. La delega è disponibile solo su smart contract della catena di Ethereum. Per ottimizzare il calcolo delle ricompense di delega sugli smart contract, utilizziamo le quote dei validatori (ERC20 per ciascun validatore).

Maggiori informazioni sono disponibili qui: [Delega (quote dei validatori)](/docs/pos/contracts/delegation)

## Ricompense {#rewards}

Tutte le ricompense sono distribuite sulla catena di Ethereum. I validatori e i deleganti richiedono le proprie ricompense oppure eseguono un re-staking semplicemente inviando la transazione su `StakeManager.sol`

Maggiori informazioni sono disponibili qui: [Ricompense](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## Messaggi {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

`MsgValidatorJoin` gestisce lo staking quando un nuovo validatore entra a far parte del sistema. Non appena il validatore chiama `stake` o `stakeFor` in `StakingManager.sol` su Ethereum, viene emesso il nuovo evento `Staked`.

Fonte: [https://github.com/maticnetwork/contract/blob/develop/contract/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

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

`activationEpoch` è il numero di checkpoint a partire dal quale un validatore diventerà attivo su Heimdall.

Se gli slot non sono disponibili, la chiamata stake sullo smart contract non va a buon fine. Gli slot dei validatori servono a mantenere un certo limite di validatori nel sistema. cGli slot sono gestiti sui smart contract Ethereum.

Il messaggio `ValidatorJoin` per la transazione Heimdall si presenta come segue:

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

`MsgStakeUpdate` gestisce gli aggiornamenti degli stake quando un validatore esegue un re-staking o arriva una nuova delega. In entrambi i casi, viene emesso il nuovo evento `StakeUpdate`.

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

Il messaggio `MsgStakeUpdate` per la transazione Heimdall si presenta come segue:

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

`MsgValidatorExit` gestisce il processo di uscita dopo che un validatore avvia tale processo su Ethereum. Emette un evento `SignerUpdate`.

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

Il messaggio `MsgValidatorExit` per la transazione Heimdall si presenta come segue:

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

`MsgSignerUpdate` gestisce l'aggiornamento del firmatario quando un validatore aggiorna la chiave del firmatario su Ethereum. Emette un evento `SignerUpdate`.

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

Il messaggio `MsgSignerUpdate` per la transazione Heimdall si presenta come segue:

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

## Comandi CLI {#cli-commands}

### Dettagli dei validatori {#validator-details}

**Per indirizzo del firmatario**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

Questo comando deve produrre questo risultato:

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

**Per indirizzo del validatore**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

Questo comando deve produrre questo risultato:

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

### Ingresso validatore {#validator-join}

Questo comando invia il comando di ingresso del validatore tramite CLI:

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

Il valore `tx-hash` deve essere lo stesso del TX hash di Ethereum che ha emesso l'evento `Staked` e il `log-index` deve corrispondere all'indice al quale è emesso l'evento.

## API REST {#rest-apis}

| Nome | Metodo | Endpoint |
|----------------------|------|------------------|
| Ottieni set di validatori Heimdall | GET | /staking/validator-set |
| Ottieni dettagli dei validatori | GET | /staking/validator/validator-id |


Tutte le query API produrranno il seguente formato:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
