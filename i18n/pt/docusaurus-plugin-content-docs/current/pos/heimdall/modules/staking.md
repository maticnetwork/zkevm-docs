---
id: staking
title: Staking
description: Módulo que gerencia transações e estado relacionados com validadores
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

O módulo staking gere as transações e estado relacionados com o validador para Heimdall. Note que um validador faz stake dos seus tokens na chain Ethereum e torna-se um validador. Os respetivos validadores enviam as transações no Heimdall, utilizando os parâmetros necessários para reconhecer a variação no stake do Ethereum. Uma vez que maioria dos validadores concordam com a alteração na stake, este módulo  salva as informações do validador no estado de Heimdall.

## Gestão de chaves {#key-management}

Para gestão de chaves, consulte [Gestão de chaves do validador](/docs/pos/heimdall/validator-key-management)

## Delegação {#delegation}

Este módulo gere apenas o staking do validador no Heimdall. A delegação está disponível apenas em contratos inteligentes na chain Ethereum. Para otimizar o cálculo de recompensas nos contratos inteligentes, estamos a utilizar ações de validadores (ERC-20 por validador).

Mais detalhes aqui: [Delegação (Ações do validador)](/docs/pos/contracts/delegation)

## Recompensas {#rewards}

Todas as recompensas são distribuídas na chain Ethereum. Os validadores e os delegantes obtêm as suas recompensas ou re-stake enviando simplesmente a transação em `StakeManager.sol`

Mais detalhes aqui: [Recompensas](/docs/maintain/validator/rewards.md#what-is-the-incentive)

## Mensagens {#messages}

<img src={useBaseUrl('img/staking/stake-management-flow.svg')} />

### MsgValidatorJoin {#msgvalidatorjoin}

`MsgValidatorJoin` lida com o staking quando um novo validador entra no sistema. Assim que o validador faz CALL de `stake` ou `stakeFor` em `StakingManager.sol` no Ethereum, e o novo evento `Staked`é emitido.

Fonte: [https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34](https://github.com/maticnetwork/contracts/blob/develop/contracts/staking/StakingInfo.sol#L27-L34)

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

`activationEpoch` é a contagem de checkpoints de onde um validador se tornará ativo em Heimdall.

A CALL de stake em contratos inteligentes falha se os slots estiverem indisponíveis. Os slots de validadores são a maneira de restringir um número de validadores no sistema.  Os slots são geridos nos contratos inteligentes Ethereum.

Aqui está uma mensagem `ValidatorJoin` para a transação Heimdall:

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

`MsgStakeUpdate`l ida com a atualização do stake quando um validador faz re-stake ou entra uma nova delegação. Em ambos os casos é emitido o novo evento `StakeUpdate`.

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

Aqui está uma mensagem `MsgStakeUpdate` para a transação Heimdall:

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

`MsgValidatorExit` lida com o processo de saída do validador depois de um validador iniciar o processo de saída no Ethereum. Emite o evento `SignerUpdate`.

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

Aqui está uma mensagem `MsgValidatorExit` para a transação Heimdall:

```go
type MsgValidatorExit struct {
	From     hmTypes.HeimdallAddress `json:"from"`
	ID       hmTypes.ValidatorID     `json:"id"`
	TxHash   hmTypes.HeimdallHash    `json:"tx_hash"`
	LogIndex uint64                  `json:"log_index"`
}
```

### MsgSignerUpdate {#msgsignerupdate}

`MsgSignerUpdate` lida com a atualização do signatário quando um validador atualiza a chave do signatário no Ethereum. Emite o evento `SignerUpdate`.

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

Aqui está uma mensagem `MsgSignerUpdate` para a transação Heimdall:

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

## Comandos CLI {#cli-commands}

### Detalhes do validador {#validator-details}

**Por endereço do signatário**

```bash
heimdallcli query staking validator-info \
	--validator=<signer-address> \
	--chain-id <chain-id>
```

Este comando deve exibir o seguinte resultado:

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

**Por endereço do validador**

```bash
heimdallcli query staking validator-info \
	--id=<validator-id> \
	--chain-id=<chain-id>
```

Este comando deve exibir o seguinte resultado:

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

### Junção do validador {#validator-join}

Este comando envia o comando de junção do validador através da CLI:

```bash
heimdallcli tx staking validator-join \
	--signer-pubkey <signer-public-key> \
	--tx-hash <tx-hash>   \
	--log-index <log-index> \
	--chain-id <chain-id>
```

O valor `tx-hash` deve ser o mesmo do hash Ethereum TX que emitiu o evento `Staked`, e `log-index` deve ser o mesmo no qual o índice do evento é emitido.

## APIs REST {#rest-apis}

| Nome | Método | Endpoint |
|----------------------|------|------------------|
| Obter o conjunto de validadores Heimdall | GET | /staking/conjunto de validadores |
| Obter os detalhes do validador | GET | /staking/validator/validator-id |


Todas as consultas APIs resultarão no seguinte formato:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
