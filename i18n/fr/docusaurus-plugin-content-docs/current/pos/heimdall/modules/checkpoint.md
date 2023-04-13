---
id: checkpoint
title: Point de Contrôle
description: Module qui gère les fonctionnalités liées aux points de contrôle
keywords:
  - docs
  - matic
  - checkpoint
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

# Point de Contrôle {#checkpoint}

`checkpoint` module gère les fonctionnalités liées au point de contrôle pour Heimdall. Il a besoin de la chaîne de Bor quand un nouveau point de contrôle est proposé sur Heimdall pour vérifier l'identifiant de root du point de contrôle.

Toutes les données liées aux points de contrôle sont expliquées dans les détails [ici](/docs/pos/heimdall/checkpoint).

## Le cycle de vie du Point de Contrôle {#checkpoint-life-cycle}

Heimdall utilise le même algorithme de sélection de leader que Tendermint pour sélectionner le prochain proposant. Tout en soumettant des points de contrôle sur la chaîne Ethereum, cela peut échouer pour plusieurs raisons telles que la limite de gaz, le trafic sur Ethereum et les frais de gaz élevés. C'est pourquoi le processus du point de contrôle de plusieurs étapes est requis.

Chaque point de contrôle a validateur comme proposant. Si le point de contrôle sur la chaîne Ethereum échoue ou réussit, et `ack`que la `no-ack`transaction modifierait le proposant sur Heimdall pour le prochain point de contrôle. Le diagramme de flux suivant représente le cycle de vie du point de contrôle:

<img src={useBaseUrl("img/checkpoint/checkpoint-flowchart.svg")} />

## Messages {#messages}

<img src={useBaseUrl("img/checkpoint/checkpoint-module-flow.svg")} />

### MsgCheckpoint {#msgcheckpoint}

`MsgCheckpoint` gère la vérification du point de contrôle sur Heimdall. Seul ce message utilise l'encodage RLP car il doit être vérifié sur la chaîne Ethereum.

```go
// MsgCheckpoint represents checkpoint transaction
type MsgCheckpoint struct {
	Proposer        types.HeimdallAddress `json:"proposer"`
	StartBlock      uint64                `json:"startBlock"`
	EndBlock        uint64                `json:"endBlock"`
	RootHash        types.HeimdallHash    `json:"rootHash"`
	AccountRootHash types.HeimdallHash    `json:"accountRootHash"`
}
```

Une fois que la transaction est traitée sur Heimdall, le `proposer` prend `votes` et `sigs` de Tendermint pour cette transaction et envoie le point de contrôle sur la chaîne Ethereum.

Puisque le bloc contient plusieurs transactions et vérifie cette transaction particulière sur la chaîne Ethereum, une preuve de Merkle est nécessaire. Pour éviter la vérification de preuve de Merkle supplémentaire sur Ethereum, Heimdall ne permet qu'une transaction dans le bloc si le type de transaction est  `MsgCheckpoint`

Pour permettre ce mécanisme, Heimdall définit `MsgCheckpoint` la transaction comme une transaction à consommation de gaz élevé. Vérifiez [https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106](https://github.com/maticnetwork/heimdall/blob/develop/auth/ante.go#L104-L106)

```go
// fee wanted for checkpoint transaction
gasWantedPerCheckpoinTx sdk.Gas = 10000000

// checkpoint gas limit
if stdTx.Msg.Type() == "checkpoint" && stdTx.Msg.Route() == "checkpoint" {
	gasForTx = gasWantedPerCheckpoinTx
}
```

Cette transaction stockera le point de contrôle proposé sur `checkpointBuffer` l'état au lieu de l'état de la liste du point de contrôle actuel.

### MsgCheckpointAck {#msgcheckpointack}

`MsgCheckpointAck` gère une soumission du point de contrôle réussi. `HeaderBlock`Voici un compteur de points de contrôle ;

```go
// MsgCheckpointAck represents checkpoint ack transaction if checkpoint is successful
type MsgCheckpointAck struct {
	From        types.HeimdallAddress `json:"from"`
	HeaderBlock uint64                `json:"headerBlock"`
	TxHash      types.HeimdallHash    `json:"tx_hash"`
	LogIndex    uint64                `json:"log_index"`
}
```

Pour ce qui est validé `TxHash` et `LogIndex` pour le point de contrôle soumis, cette transaction vérifie l'événement suivant et valide le point de contrôle dans `checkpointBuffer` l'état: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/RootChainStorage.sol#L7-L14)

```jsx
event NewHeaderBlock(
    address indexed proposer,
    uint256 indexed headerBlockId,
    uint256 indexed reward,
    uint256 start,
    uint256 end,
    bytes32 root
);
```

Lors de la vérification réussie d'événements, il met à jour le nombre réel de checkpoint, également connu sous le nom `ackCount`de .`checkpointBuffer`

### MsgCheckpointNoAck {#msgcheckpointnoack}

`MsgCheckpointNoAck` gère des points de contrôle infructueux ou des proposants hors ligne. Cette transaction est valide seulement après que `CheckpointBufferTime` a passé des événements suivants:

- La dernière `ack` transaction réussie
- La dernière `no-ack` transaction réussie

```go
// MsgCheckpointNoAck represents checkpoint no-ack transaction
type MsgCheckpointNoAck struct {
	From types.HeimdallAddress `json:"from"`
}
```

Cette transaction fournit la période de délai pour que le proposant actuel envoie le point de contrôle/ack avant que Heimdall choisit un nouveau `proposer` pour le prochain point de contrôle.

## Paramètres {#parameters}

Le point de contrôle du module contient les paramètres suivants:

| Clé | Type | Valeur par défaut |
|----------------------|------|------------------|
| CheckpointBufferTime | uint64 | 1000 * temps.Seconde |


## Les commandes de CLI {#cli-commands}

### Params {#params}

Pour imprimer tous les params:

```go
heimdallcli query checkpoint params --trust-node
```

Résultat Attendu:

```yaml
checkpoint_buffer_time: 16m40s
```

### Envoyez le point de contrôle {#send-checkpoint}

La commande suivante envoie la transaction du point de contrôle sur Heimdall:

```yaml
heimdallcli tx checkpoint send-checkpoint \
	--start-block=<start-block> \
	--end-block=<end-block> \
	--root-hash=<root-hash> \
	--account-root-hash=<account-root-hash> \
	--chain-id=<chain-id>
```

### Envoyer`ack`

La commande suivante envoie la transaction de ack sur Heimdall si le point de contrôle est réussi sur Ethereum:

```yaml
heimdallcli tx checkpoint send-ack \
	--tx-hash=<checkpoint-tx-hash>
	--log-index=<checkpoint-event-log-index>
	--header=<checkpoint-index> \
  --chain-id=<chain-id>
```

### Envoyer`no-ack`

La commande suivante envoie la transaction de no-ack sur Heimdall:

```yaml
heimdallcli tx checkpoint send-noack --chain-id <chain-id>
```

## API de REST {#rest-apis}

| Nom | Méthode | Point de terminaison |
|----------------------|------|------------------|
| Obtenez un état de protection du point de contrôle actuel | GET | /checkpoint/buffer |
| Obtenez les comptages du point de contrôle | GET | /checkpoint/count |
| Obtenez des détails du point de contrôle par une indice de bloc | GET | /checkpoint/headers/<header-block-index\> |
| Obtenez le dernier point de contrôle | GET | /checkpoint/latest-checkpoint |
| Obtenez les derniers détails de no-ack | GET | /checkpoint/last-no-ack |
| Les détails du point de contrôle pour le démarrage et la clôture d'un bloc | GET | /pointdecontrôle/<start\>/<end\> |
| Le point de contrôle par nombre | GET | /pointdecontrôle/<checkpoint-number\> |
| Tous les points de contrôle | GET | /pointdecontrôle/liste |
| Obtenez le nombre de ack, de protection, de l'ensemble de validateur, le nombre de validateur et les détails du dernier-no-ack | GET | /aperçu |


Toutes les API de requête fourniront des résultats dans le format suivant:

```json
{
	"height": "1",
	"result": {
		...	  
	}
}
```
