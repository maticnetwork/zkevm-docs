---
id: fx-portal
title: FxPortal
description: Transférez l'état ou les données d'Ethereum vers Polygon sans cartographier avec FxPortal.
keywords:
  - docs
  - polygon wiki
  - polygon
  - FxPortal
  - ethereum to polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Le mécanisme habituel pour lire nativement les données Ethereum de Polygon utilise **State Sync**. Cela permet de transférer des données arbitraires d'Ethereum à Polygon. Cependant, cette approche nécessite également la cartographie des contrats root et des contrats enfants si l'interface par défaut ne peut être utilisée. FxPortal offre une alternative où les jetons standardisés ERC peuvent être déployés sans aucune cartographie, en utilisant simplement les contrats de base FxPortal déployés.

## Qu'est-ce que FxPortal? {#what-is-fxportal}

Il s'agit d'une implémentation puissante mais simple du mécanisme de [synchronisation](../../pos/state-sync/state-sync-mechanism.md) d'état Polygon. Le pont PoS de Polygon est construit sur la même architecture. Le code dans le dossier [exemples](https://github.com/fx-portal/contracts/tree/main/contracts/examples) sont quelques exemples d'utilisation. Vous pouvez facilement utiliser ces exemples pour construire vos propres implémentations ou votre propre pont personnalisé qui permet n'importe quel état sync sans mapper.

Vous pouvez consulter le [répertoire GitHub](https://github.com/fx-portal/contracts) pour les contrats et les exemples.

## Comment cela fonctionne-t-il ? {#how-does-it-work}

[FxChild](https://github.com/fx-portal/contracts/blob/main/contracts/FxChild.sol) et [FxRoot](https://github.com/fx-portal/contracts/blob/main/contracts/FxRoot.sol) sont les principaux contrats sur lesquels FxPortal fonctionne. Il appelle et transmet des données vers des méthodes définies par l'utilisateur sur l'autre chaîne sans aucune cartographie utilisant le mécanisme de synchronisation d'état. Pour utiliser les contrats principaux déployés, vous pouvez implémenter les contrats de base de FxPortal dans les contrats intelligents que vous déployez [FxBaseRootTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseRootTunnel.sol)  et [FxBaseChildTunnel](https://github.com/fx-portal/contracts/blob/main/contracts/tunnel/FxBaseChildTunnel.sol). En vous appuyant sur ces contrats, vos contrats déployés pourront communiquer entre eux grâce au mécanisme de tunnel de données.

Sinon, vous pouvez choisir de cartographier vos jetons avec les contrats tunnels déjà déployés. Les détails de déploiement FxTunnel par défaut pour Polygon Mainnet et Mumbai Testnet sont les suivants:

- [Réseau principal de Polygon](https://static.matic.network/network/mainnet/v1/index.json)
- [Mumbai Testnet](https://static.matic.network/network/testnet/mumbai/index.json)

Recherchez le mot-clé `FxPortalContracts`dans les liens ci-dessus pour trouver tous les contrats de tunnels par défaut et d'autres déploiements importants de contrats FxPortal.

## Ai-je besoin d'une implémentation FxTunnel personnalisée ? {#do-i-need-a-custom-fxtunnel-implementation}

Vous devez aller pour une **implémentation FxTunnel personnalisée** seulement si les implémentations tunnelles par défaut ne s'alignent pas avec votre cas d'utilisation. Lorsque vous utilisez les tunnels FxPortal par défaut, vous ne pouvez pas modifier le code du contrat enfant. Le bytecode pour le contrat de jeton enfant est toujours fixé et reste toujours le même pour les [déploiements FxTunnel par défaut](https://github.com/fx-portal/contracts/tree/main/contracts/examples). Si vous avez besoin d'un jeton enfant personnalisé, vous devez aller pour votre propre FxTunnel personnalisé, et la lecture de la partie suivante vous guidera davantage dans le déploiement de vos propres FxTunnels personnalisés.

Il est fortement recommandé de lire et de comprendre [le Transfert d'État FxPortal](state-transfer.md) avant de lire la prochaine section. Chacune de ces prochaines sections aura des liens contractuels tunnels associés à ceux-ci. Ces exemples peuvent être pris comme référence lors de la construction de vos propres tunnels custom

## Transfert ERC20 {#erc20-transfer}

Les [contrats de tunnels enfants et racines](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc20-transfer) permettent le dépôt de jetons sur la chaîne racine et le retrait sur la chaîne enfant.

#### `FxERC20RootTunnel`

- `mapToken(address rootToken)`: Vous pouvez appeler la fonction sur le contrat déployé pour cartographier votre jeton ERC20 et créer un jeton enfant correspondant sur la chaîne enfant.
- `deposit(address rootToken, address user, uint256 amount, bytes memory data)`: la `deposit()`méthode d'appel avec l'adresse du jeton mappé, l'adresse qui peut se retirer avec un montant correspondant (avec les données si nécessaire). Vous avez dû approuvé le contrat en utilisant la fonction `approve` ERC20 standard pour dépenser vos jetons en premier.

#### `FxERC20ChildTunnel`

- `withdraw(address childToken, uint256 amount)`: L'adresse assignée `deposit()`peut retirer toute la quantité de jetons enfant à l'aide de cette fonction. Ils recevront le jeton enfant créé lors de la première cartographie.
- `rootToChildToken`: Cette variable publique contient le jeton racine vers la cartographie de jetons enfant. Vous pouvez envoyer une requête pour la cartographie avec l'adresse du jeton root pour connaître l'adresse du jeton enfant déployé.

### Depuis Ethereum → Polygon {#polygon}

1. Déployez votre propre jeton ERC20 sur la chaîne root. Vous aurez besoin de cette adresse plus tard.
2. Approuvez les jetons pour le transfert en appelant la fonction `approve()` du jeton root avec l'adresse du tunnel root et le montant comme arguments.
3. Appelez `deposit()` avec l'adresse du récepteur et le montant sur la chaîne root pour recevoir le jeton enfant équivalent sur la chaîne enfant. Aussi, cela cartographiera automatiquement le jeton. Vous pouvez aussi appeler `mapToken()` avant de déposer.
4. Après avoir mappé, vous devriez maintenant pouvoir exécuter des transferts cross-chain à l'aide des fonctions et `deposit`des `withdraw`fonctions du tunnel.

:::note

Après avoir effectué `deposit()`sur la chaîne racine, cela prendra 22-30 minutes pour que la synchronisation d'état se produise. Une fois que la synchronisation d'état se produit, vous obtiendrez les jetons déposés à l'adresse donnée.

:::

### Depuis Polygon → Ethereum {#ethereum}

1. Appelez `withdraw()` avec l'adresse du jeton et le montant respectifs comme arguments sur le contrat enfant pour déplacer les jetons enfants vers le récepteur désigné sur la chaîne root. **Notez l'identifiant tx** car il sera utilisé pour générer la preuve de brûlure.

2. Vous pouvez trouver les étapes pour compléter le retrait [ici](#withdraw-tokens-on-the-root-chain).

## ERC721 Transfert {#erc721-transfer}

Si vous avez besoin d'un exemple, consultez ce guide [ERC721 Racine et Tunnels pour](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc721-transfer) enfants.

### Depuis Ethereum → Polygon {#polygon-1}

1. Déployez votre propre jeton ERC721 sur la chaîne root. Vous aurez besoin de cette adresse plus tard.
2. Approuvez les jetons pour le transfert en appelant la fonction `approve()` du jeton root avec l'adresse du tunnel root et l'identifiant du jeton comme arguments.
3. Appelez `deposit()` avec l'adresse du récepteur et l'identifiant du jeton sur la chaîne root pour recevoir le jeton enfant équivalent sur la chaîne enfant. Aussi, cela cartographiera automatiquement le jeton. Vous pouvez aussi appeler `mapToken()` avant de déposer.

:::note

Après avoir effectué `deposit()`sur la chaîne racine, cela prendra 22-30 minutes pour que la synchronisation d'état se produise. Une fois que la synchronisation d'état se produit, vous obtiendrez les jetons déposés à l'adresse donnée.

:::

### Depuis Polygon → Ethereum {#ethereum-1}

1. Appelez `withdraw()` avec l'adresse du jeton et l'identifiant du jeton respectifs comme arguments sur le contrat enfant pour déplacer les jetons enfants vers le récepteur désigné sur la chaîne root. **Notez que le hash tx** sera utilisé pour générer la preuve de gravure.

2. Vous pouvez trouver les étapes pour compléter le retrait [ici](#withdraw-tokens-on-the-root-chain).

## Transfert ERC1155 {#erc1155-transfer}

Si vous avez besoin d'un exemple, consultez ce guide [ERC1155 Racine et Tunnels pour](https://github.com/fx-portal/contracts/tree/main/contracts/examples/erc1155-transfer) enfants.

#### `FxERC1155RootTunnel`

- `mapToken(rootToken)` : utilisé pour cartographier votre jeton ERC1155 root à la chaîne enfant
- `deposit(rootToken, user, id, amount, data)` : fonction utilisée pour déposer les jetons root dans la chaîne enfant.
- `depositBatch(rootToken, user,  ids, amounts, bytes memory data)` : utilisé pour des Identifiants de jetons multiples et des montants correspondants
- `receiveMessage(inputData)` : pour être appelé après que la preuve de brûlure a été générée avec la charge utile en tant que `inputData`

#### `FxERC1155ChildTunnel`

- `withdraw(childToken, id, amount, data)` : utilisé pour retirer le jeton de Polygon vers Ethereum
- `withdrawBatch(childToken, ids, amounts, data)` : de même pour le retrait, mais pour le retrait d'identifiants de jetons multiples

### Depuis Ethereum → Polygon {#polygon-2}

1. Déployez votre jeton ERC1155 sur la chaîne root. Vous aurez besoin de cette adresse plus tard.
2. Appelez le `setApprovalForAll(operator, approved)`jeton déployé avec `FxERC1155RootTunnel`l'adresse pour `operator`permettre de `FxERC1155RootTunnel`transférer vos jetons vers `FxERC1155ChildTunnel`Polygon.
3. Appelez `FxERC1155RootTunnel`avec l'adresse de votre `mapToken()`jeton déployé comme .`rootToken` Cela enverra un message pour lui `FxERC1155ChildTunnel`demander de déployer et de cartographier le jeton ERC1155 sur Polygon. Pour interroger votre adresse jeton enfant, appelez `rootToChildToken`sur .`FxERC1155ChildTunnel`
4. Appelez `FxERC1155RootTunnel`avec l'adresse du jeton sur Ethereum comme , `rootToken``user`récepteur comme , ID de `deposit()`jeton comme , `id`et le montant comme .`amount` Vous pouvez également appeler `depositBatch()` pour plusieurs identifiants de jeton.

:::note

Après avoir effectué `deposit()`sur la chaîne racine, cela prendra 22-30 minutes pour que la synchronisation d'état se produise. Une fois que la synchronisation d'état se produit, vous obtiendrez les jetons déposés à l'adresse donnée.

:::

### Depuis Polygon → Ethereum {#ethereum-2}

1. Appelez `FxERC1155ChildTunnel`avec l'adresse du jeton enfant déployé sur Polygon comme identifiant `childToken`et identifiant de jeton comme `withdraw()``id`(l'adresse de jeton enfant peut être interrogée à partir de la `rootToChildToken`cartographie). Vous pouvez aussi appeler `withdrawBatch()` pour plusieurs identifiants de jetons et les montants correspondants. **Notez que le hash tx** sera utilisé pour générer la preuve de gravure.

2. Vous pouvez trouver les étapes pour compléter le retrait [ici](#withdraw-tokens-on-the-root-chain).

## Retirer des jetons sur la chaîne racine {#withdraw-tokens-on-the-root-chain}

:::info

Après avoir effectué `withdraw()`sur la chaîne enfant, il faudra 30 à 90 minutes pour qu'un point de contrôle se produise. Une fois que le prochain point de contrôle inclut la transaction de gravure, vous pouvez retirer les jetons sur la chaîne racine.

:::

1. Générez la preuve de gravure à l'aide du **hash tx** et **MESSAGE_SENT_EVENT_SIG**. Pour générer la preuve, vous pouvez utiliser l'API de génération de preuve hébergée par Polygon ou vous pouvez également faire tourner votre propre API de génération de preuve en suivant les instructions [ici](https://github.com/maticnetwork/proof-generation-api).

Le point de terminaison de génération de preuve hébergé par Polygon est disponible [ici.](https://apis.matic.network/api/v1/matic/exit-payload/{burnTxHash}?eventSignature={eventSignature})

  - `burnTxHash`est le hachage de la `withdraw()`transaction que vous avez initiée sur Polygon.
  - `eventSignature`est la signature d'événement de l'événement émis par la `withdraw()`fonction. La signature d'événement pour le MESSAGE_SENT_EVENT_SIG est `0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036`.

Les exemples d'utilisation d'API de génération de preuves pour le Mainnet et Testnet sont les suivants :-

→ [Génération Polygon Mainnet Proof](https://apis.matic.network/api/v1/matic/exit-payload/0x70bb6dbee84bd4ef1cd1891c666733d0803d81ac762ff7fdc4726e4525c1e23b?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

→ [Génération Mumbai Testnet Proof](https://apis.matic.network/api/v1/mumbai/exit-payload/0x4756b76a9611cffee3d2eb645819e988c34615621ea256f818ab788d81e1f838?eventSignature=0x8c5261668696ce22758910d05bab8f186d6eb247ceac2af2e82c7dc17669b036)

2. Feed la charge utile générée comme argument pour `receiveMessage()`dans le contrat de tunnel root respectif sur Goerli ou Ethereum.

## Transfert de l'ERC-20 qui peut être frappé {#mintable-erc-20-transfer}

Si vous avez besoin d'un exemple, veuillez consulter ce guide [pour racine et tunnels enfants ERC20](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc20-transfer) Mintable

:::info

Dans le cas de jeton intable FxTunnels, le jeton enfant est déployé d'abord et le jeton root n'est déployé que lorsque le premier processus de retrait/sortie est terminé. L'adresse du contrat de jeton root peut être prédéterminée juste après le déploiement du contrat enfant, mais la cartographie n'existe techniquement que lorsque le premier retrait/sortie est terminé.

:::

#### `FxMintableERC20RootTunnel`

- `deposit(address rootToken, address user, uint256 amount, bytes memory data)` : pour déposer des jetons d'Ethereum sur Polygon
- `receiveMessage(bytes memory inputData)` : preuve de brûlure à fournir comme le `inputData` pour recevoir des jetons sur la chaîne root.

#### `FxMintableERC20ChildTunnel`

- `deployChildToken(uint256 uniqueId, string memory name, string memory symbol, uint8 decimals)`: Pour déployer un jeton ERC20 sur le réseau Polygon
- `mintToken(address childToken, uint256 amount)` : frapper un montant particulier de jetons sur Polygon
- `withdraw(address childToken, uint256 amount)` : pour brûler des jetons sur la chaîne enfant afin de retirer sur la chaîne root

### Jetons de Minting sur Polygon {#minting-tokens-on-polygon}

1. Appelez le  `deployChildToken()` sur le `FxMintableERC20ChildTunnel` et passez les informations nécessaires au jeton comme paramètres. Celui-ci émet un  événement `TokenMapped` qui contient les adresses `rootToken` et `childToken`. Prenez note de ces adresses.
2. Appeler `mintToken()` sur `FxMintableERC20ChildTunnel` pour frapper des jetons sur la chaîne enfant.
3. Appelez `withdraw()` sur `FxMintableERC20ChildTunnel` pour retirer des jetons de Polygon. Notez le hasch de transaction car cela sera pratique pour générer la preuve de gravure.
4. Vous pouvez trouver les étapes pour compléter le retrait [ici](#withdraw-tokens-on-the-root-chain).

### Suppression de jetons sur Ethereum {#withdrawing-tokens-on-ethereum}

Introduire la preuve de brûlure générée comme argument à `receiveMessage()` dans `FxMintableERC20RootTunnel`. Après cela, le solde des jetons sera reflété sur la chaîne root.

### Jetons de dépôt retour à Polygon {#deposit-tokens-back-to-polygon}

1. Assurez-vous d'approuver `FxMintableERC20RootTunnel` pour transférer vos jetons.
2. Appelez `deposit()` dans `FxMintableERC20RootTunnel` avec `rootToken` comme adresse du jeton root et `user` comme destinataire.
3. Attendez l'événement de synchronisation d'état (22-30 minutes). Après cela, vous pouvez interroger le solde du destinataire cible sur la chaîne enfant.

Les exemples **ERC721** et **ERC1155** Mintable FxTunnel sont les suivants :-

- [FxMintableERC721Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc721-transfer)
- [FxMintableERC1155Tunnels](https://github.com/fx-portal/contracts/tree/main/contracts/examples/mintable-erc1155-transfer)

## Exemples de déploiements {#example-deployments}

### Goerli {#goerli}

- Gestionnaire de point de contrôle: [0x2890bA17EfE978480615e330ecB6533b880928e](https://goerli.etherscan.io/address/0x2890bA17EfE978480615e330ecB65333b880928e)
- Jeton ERC20 Dummy: [0xe9c7873f81c815d64c71c2233462cb175e4765b3](https://goerli.etherscan.io/address/0xe9c7873f81c815d64c71c2233462cb175e4765b3)
- FxERC20RootTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://goerli.etherscan.io/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxMintableERC20RootTunnel: [0xA200766a7D64E54611E2D232AA6c1f870aCb63c1](https://goerli.etherscan.io/address/0xA200766a7D64E54611E2D232AA6c1f870aCb63c1)
- Jeton ERC721 Dummy: [0x73594a053cb5ddDE558268d28a774375C4E23dA](https://goerli.etherscan.io/address/0x73594a053cb5ddDE5558268d28a774375C4E23dA)
- FxERC721RootTunnel: [0xF9bc4a80464E48369303196645e876c8C7D972de](https://goerli.etherscan.io/address/0xF9bc4a80464E48369303196645e876c8C7D972de)
- Dummy ERC1155 jeton: [0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E](https://goerli.etherscan.io/address/0x1906d395752FE0c930f8d061DFEb785eBE6f0B4E)
- FxERC1155RootTunnel : [0x48DE785970ca6eD289315036B6d187888cF9Df48](https://goerli.etherscan.io/address/0x48DE785970ca6eD289315036B6d187888cF9Df48)

### Mumbai {#mumbai}

- FxERC20: [0xDDE69724AeFBdb084413719fE745aB66e3b055C7](https://mumbai.polygonscan.com/address/0xDDE69724AeFBdb084413719fE745aB66e3b055C7)
- FxERC20ChildTunnel: [0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767](https://mumbai.polygonscan.com/address/0x9C37aEbdb7Dd337E0215BC40152d6689DaF9c767)
- FxMintableERC20ChildTunnel: [0xA2C7eBEf68B44056b4A39C2CEC23844275C56e9](https://mumbai.polygonscan.com/address/0xA2C7eBEf68B444056b4A39C2CEC23844275C56e9)
- Un modèle de jeton enfant ERC20 : 0x346d21bc2bD3dEE2d1168E1A632b10D1d7B9c0A
- FxERC721: [0xf2720927E048726267C0221ffA41A88528048726](https://mumbai.polygonscan.com/address/0xf2720927E048726267C0221ffA41A88528048726)
- FxERC721ChildTunnel: [0x3658ccFDE5e9629b0805EB06AaCFc42416850961](https://mumbai.polygonscan.com/address/0x3658ccFDE5e9629b0805EB06AaCFc42416850961)
- FxERC1155: [0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C](https://mumbai.polygonscan.com/address/0x80be8Cf927047A40d3f5791BF7436D8c95b3Ae5C)
- FxERC1155ChildTunnel: [0x3A0f90D3905601501652fe925e96d8B294243Efc](https://mumbai.polygonscan.com/address/0x3A0f90D3905601501652fe925e96d8B294243Efc)

Les déploiements Mainnet correspondants peuvent être trouvés [ici](https://static.matic.network/network/mainnet/v1/index.json). Recherchez le mot-clé `FxPortalContracts`pour trouver tous les contrats tunnels par défaut et d'autres déploiements importants de contrats FxPortal. Vous pouvez utiliser le [`maticnetwork/meta`](https://www.npmjs.com/package/@maticnetwork/meta)package pour accéder aux adresses du contrat et aux ABI.

## Les Adresses du Contrat {#contract-addresses}

### Mumbai Testnet {#mumbai-testnet}

| Contrat | Adresse déployée |
| :----- | :- |
| [FxRoot (Goerli)](https://goerli.etherscan.io/address/0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA#code) | `0x3d1d3E34f7fB6D26245E6640E1c50710eFFf15bA` |
| [FxChild (Mumbai)](https://mumbai.polygonscan.com/address/0xCf73231F28B7331BBe3124B907840A94851f9f11/contracts) | `0xCf73231F28B7331BBe3124B907840A94851f9f11`|


### Réseau principal de Polygon {#polygon-mainnet}


| Contrat | Adresse déployée |
| :----- | :- |
| [FxRoot (Réseau Principal d'Ethereum)](https://etherscan.io/address/0xfe5e5d361b2ad62c541bab87c45a0b9b018389a2#code) | `0xfe5e5D361b2ad62c541bAb87C45a0B9B018389a2`|
| [FxChild (Réseau principal de Polygon)](https://polygonscan.com/address/0x8397259c983751DAf40400790063935a11afa28a/contracts) | `0x8397259c983751DAf40400790063935a11afa28a`|
