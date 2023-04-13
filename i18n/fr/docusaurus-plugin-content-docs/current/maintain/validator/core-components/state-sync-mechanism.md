---
id: state-sync-mechanism
title: Mécanisme de synchronisation de l'état
description: Mécanisme de synchronisation d'état pour lire nativement les données Ethereum
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Les validateurs de la couche [Heimdall ](/docs/maintain/glossary.md#heimdall)récupèrent l'événement [StateSynced](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) et le transmettent à la couche [Bor](/docs/maintain/glossary.md#bor). Voir aussi [architecture Polygon](/docs/pos/polygon-architecture).

Le **contrat de récepteur** hérite de [IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol), et la logique personnalisée se trouve à l'intérieur de la fonction [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5).

La dernière version, [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), contient quelques améliorations telles que:
1. Restreindre la taille des données dans synchronisation d'état txs à :
    * **30 kB** lorsqu'elles sont représentées en **octets**
    * **60 kB** lorsqu'elles sont représentées sous forme de **chaîne**.
2. Augmenter le **délai** entre les événements contractuels des différents validateurs pour s'assurer que le mempool ne se remplit pas très rapidement en cas d'arrivée d'événements pouvant entraver la progression de la chaîne.

L'exemple suivant montre comment la taille des données est restreinte :

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## Exigences pour les utilisateurs {#requirements-for-the-users}

Les exigences des applications/utilisateurs pour travailler avec state-sync sont les suivantes :

1. Lancer la fonction [syncState](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33).
2. La `syncState`fonction émet un événement appelé `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);`
3. Tous les validateurs de la chaîne Heimdall reçoivent l'événement `StateSynced`. Tout validateur qui souhaite obtenir les frais de transaction pour la synchronisation de l'état envoie la transaction à Heimdall.
4. Une fois que la transaction `state-sync` sur Heimdall est incluse dans un bloc, elle est ajoutée à la liste state-sync en attente.
5. Après chaque sprint sur Bor, le nœud Bor récupère les événements state-sync en attente à partir de Heimdall via un appel API.
6. Le contrat du récepteur hérite de l'interface `IStateReceiver`, et une logique personnalisée de décodage des octets de données et d'exécution de toute action se trouve à l'intérieur de la fonction [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol).
