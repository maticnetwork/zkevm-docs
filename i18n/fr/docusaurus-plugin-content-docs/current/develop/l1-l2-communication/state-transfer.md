---
id: state-transfer
title: Transfert d'état
description: Transférez facilement l'état ou les données d'Ethereum vers Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - state transfer
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Les validateurs Polygon surveillent en permanence un contrat sur la chaîne Ethereum appelé `StateSender`. Chaque fois qu'un contrat enregistré sur la chaîne Ethereum appelle ce contrat, il émet un événement. Grâce à cet événement, les validateurs de Polygon transmettent les données à un autre contrat de la chaîne Polygon. Ce mécanisme **de synchronisation d'état** est utilisé pour envoyer des données d'Ethereum vers Polygon.

De plus, les validateurs Polygon envoient un hash Ethereum de chaque transaction sur la chaîne Polygon sur une base régulière. Vous pouvez utiliser ce **point** de contrôle pour valider toute transaction qui a eu lieu sur Polygon. Une fois qu'une transaction a été vérifiée pour avoir eu lieu sur la chaîne Polygon, Ethereum peut être utilisé pour effectuer l'action appropriée.

Ces 2 mécanismes peuvent être utilisés ensemble pour activer le transfert de données bidirectionnelles (état) entre Ethereum et Polygon. Pour résumer toutes ces interactions, vous pouvez hériter directement de nos contrats (sur Ethereum) et `FxBaseRootTunnel``FxBaseChildTunnel`(sur Polygon).

## Contrat de tunnel root {#root-tunnel-contract}

Utilisez le contrat `FxBaseRootTunnel` à partir d'[ici](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseRootTunnel.sol). Ce contrat donne accès aux fonctions suivantes:

- `function _processMessageFromChild(bytes memory data)`: Il s'agit d'une fonction virtuelle qui doit être implémentée dans le contrat qui l'hérite pour gérer les données envoyées `ChildTunnel`.
- `_sendMessageToChild(bytes memory message)` : cette fonction peut être appelée en interne avec n'importe quels octets de données en tant que message. Ces données seront envoyées telles quelles au tunnel enfant.
- `receiveMessage(bytes memory inputData)`: Cette fonction doit être appelée pour recevoir le message émis par `ChildTunnel`. La preuve de transaction doit être fournie en tant que calldata. Un exemple de script pour générer une preuve à l'aide de **matic.js** est inclus ci-dessous.

## Contrat de tunnel enfant {#child-tunnel-contract}

Utilisez le contrat `FxBaseChildTunnel` à partir d'[ici](https://github.com/jdkanani/fx-portal/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). Ce contrat donne accès aux fonctions suivantes :

- `function _processMessageFromRoot(uint256 stateId, address sender, bytes memory data)`: Il s'agit d'une fonction virtuelle qui doit implémenter la logique pour gérer les messages envoyés à partir du `RootTunnel`.
- `function _sendMessageToRoot(bytes memory message)` : cette fonction peut être appelée en interne pour envoyer tout message d'octets au tunnel root.

## Prérequis {#prerequisites}

- Vous devez hériter de `FxBaseRootTunnel`contrat dans votre contrat root sur Ethereum. À titre d'exemple, vous pouvez suivre ce [contrat](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateRootTunnel.sol) . De même, héritez du `FxBaseChildTunnel`contrat dans votre enfant sur Polygon. Suivez ce [contrat](https://github.com/jdkanani/fx-portal/blob/main/contracts/examples/state-transfer/FxStateChildTunnel.sol) comme exemple.
- Lors de la déploiement de votre contrat root sur
  - **Goerli Testnet**, passez l'adresse de `_checkpointManager`0**x2890bA17EfE978480615e330ecB65333b880928e **et `_fxRoot`sous **0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA.**

  - **Ethereum Mainnet**, est 0**x86e4dc95c7fbdbf52e33d563bbdb00823894c287 **`_fxRoot`et `_checkpointManager`est **0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2.**
- Pour déployer le contrat enfant sur **le testnet Mumbai**, passez **0xCf73231F28B7331BBe3124B907840A94851f9f11** comme `_fxChild`dans le constructeur. Pour **le réseau principal Polygon,**`_fxChild` sera 0**x8397259c983751DAf40400790063935a11afa28a.**
- Appelez `setFxChildTunnel`le tunnel root déployé avec l'adresse du tunnel enfant. Exemple : [0x79cd30ace561a226258918b56ce098a08ce0c707a80bba91197f127a48b5c2](https://goerli.etherscan.io/tx/0x79cd30ace561a226258918b56ce098a08ce0c70707a80bba91197f127a48b5c2)
- Appelez `setFxRootTunnel`le tunnel enfant déployé avec l'adresse du tunnel radiculaire. Exemple : [0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8](https://mumbai.polygonscan.com/tx/0xffd0cda35a8c3fd6d8c1c04cd79a27b7e5e00cfc2ffc4b864d2b45a8bb7e98b8/internal-transactions)

## Exemples de contrats de pont de transfert d'état {#example-contracts-of-state-transfer-bridge}

- **Contrats**: [Fx-Portal Github Repository](https://github.com/jdkanani/fx-portal/tree/main/contracts/tunnel)
- **Goerli :** [0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af](https://goerli.etherscan.io/address/0xc4432e7dab6c1b43f4dc38ad2a594ca448aec9af)
- **Mumbai :** [0xa0060Cc969d760c3FA85844676fB654Bba693C22](https://mumbai.polygonscan.com/address/0xa0060Cc969d760c3FA85844676fB654Bba693C22/transactions)

## Transfert d'État depuis Ethereum → Polygon {#polygon}

- Vous devez appeler en `_sendMessageToChild()`interne dans votre contrat root et passer les données comme argument à envoyer à Polygon. Exemple : [0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1](https://goerli.etherscan.io/tx/0x28705fcae757a0c88694bd167cb94a2696a0bc9a645eb4ae20cff960537644c1)
- Dans votre contrat enfant, implémentez la fonction virtuelle `_processMessageFromRoot()` dans `FxBaseChildTunnel`pour récupérer les données d'Ethereum. Les données seront reçues automatiquement du récepteur d'état lorsque l'état sera synchronisé.

## Transfert d'État depuis Polygon → Ethereum {#ethereum}

1. Appelez `_sendMessageToRoot()` en interne dans votre contrat enfant avec des données comme paramètre à envoyer à Ethereum. Exemple : [0x3c9f7e675bb4f6af87ee9947bf24c38cbffa0b933d8c981644a2f2b550e66a](https://mumbai.polygonscan.com/tx/0x3cc9f7e675bb4f6af87ee99947bf24c38cbffa0b933d8c981644a2f2b550e66a/logs)

Notez le hachage de transaction car il sera utilisé pour générer des preuves après avoir été inclus comme point de contrôle.

2. **Génération de preuve pour terminer la sortie sur la chaîne racine**: Générer la preuve à l'aide du **hash tx** et **MESSAGE_SENT_EVENT_SIG**. Pour générer la preuve, vous pouvez utiliser l'API de génération de preuve hébergée par Polygon ou vous pouvez également faire tourner votre propre API de génération de preuve en suivant les instructions [ici](https://github.com/maticnetwork/proof-generation-api).

Le point de terminaison de génération de preuve hébergé par Polygon est disponible [ici.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

    - `burnTxHash` is the transaction hash of the `_sendMessageToRoot()` transaction you initiated on Polygon.
    - `eventSignature` is the event signature of the event emitted by the `_sendMessageToRoot()` function. The event signature for the MESSAGE_SENT_EVENT_SIG is `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Les exemples d'utilisation d'API de génération de preuves pour le Mainnet et Testnet sont les suivants :-

→ [Génération Mumbai Testnet Proof](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Génération Polygon Mainnet Proof](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

3. Implémentez `_processMessageFromChild()` dans votre contrat root.

4. Utilisez la preuve générée comme une entrée sur `receiveMessage()` pour récupérer les données envoyées par le tunnel enfant dans votre contrat. Exemple : [0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b66166ef75e3515](https://goerli.etherscan.io/tx/0x436dcd500659bea715a09d9257295ddc21290769daeea7f0b666166ef75e3515) )
