---
id: bandchain
title: BandChain
sidebar_label: BandChain
description: BandChain est une chaîne de blocs haute performance conçue pour l'Oracle de données pour interroger les données des API Web traditionnelles
keywords:
  - wiki
  - polygon
  - oracles
  - bandchain
  - web apis
  - band protocol
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Le Protocole Band vous permet d'interroger des données à partir d'API web traditionnelles et de les utiliser dans la blockchain. Les développeurs peuvent effectuer des requêtes via **BandChain, une blockchain basée** sur cosmos, pour faciliter les demandes oracles et les paiements, puis utiliser les données sur dApp par la communication inter-chaîne. L'intégration des données oracle peut se faire en 3 étapes simples:

1. **Choisir les scripts d'oracle**

    Le scénario d'Oracle est un hachage qui identifie de manière unique le type de données à demander à Band-Chain. Ces scénarios peuvent être  [**ici**](https://guanyu-devnet.cosmoscan.io/oracle-scripts). Ces scénarios sont utilisés comme l'un des paramètres lors de la requête oracle.

2. **Demander des Données à BandChain**

Cela peut être fait de deux façons:

    - **Utiliser l'explorateur BandChain**

    Vous pouvez cliquer sur le script oracle de votre choix, puis à partir de l'onglet **Exécuter,** vous pouvez passer dans les paramètres et obtenir la réponse de BandChain. La réponse contiendra le résultat ainsi qu'une preuve d'evm. Cette preuve doit être copiée et sera utilisée dans l'étape finale. Les docs BandChain pour interroger l'oracle en utilisant l'explorateur sont disponibles [**ici**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-explorer).

    <img src={useBaseUrl("img/bandchain/executeoracle.png")} />

    Donné ci-dessus est un exemple de faire une requête oracle pour obtenir les valeurs de nombre aléatoires. La valeur 100 est passée au `max_range`paramètre de la requête oracle. Nous obtenons un dièse en réponse. En cliquant sur ce dièse, nous verrons les détails complets de la réponse.

    - **Utilisation de la bibliothèque JS BandChain-Devnet**

    Vous pouvez effectuer une requête BandChain directement à l'aide de la bibliothèque BandChain-Devnet. Lorsqu'il est interrogé, il donne une **preuve evm** dans la réponse. Cette preuve peut être utilisée pour l'étape finale de l'intégration de BandChain. Les docs BandChain pour interroger l'oracle à l'aide de la bibliothèque JS BandChain-Devnet sont disponibles [**ici**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library). La charge utile de la requête pour l'oracle des nombres aléatoires ressemblera à ceci. Assurez-vous que le corps de la requête est transmis au format application/json.

3. **Utilisation des données dans les contrats intelligents**

  L'étape finale consiste à déployer un contrat de validation et à stocker les réponses de la requête oracle dans les variables d'état du contrat de validation. Une fois que ces variables d'état sont définies, ils peuvent y accéder lorsque cela est exigé par la dapp. Ces variables d'état peuvent également être mises à jour avec de nouvelles valeurs en interrogeant à nouveau les scénarios oracle à partir de la dApp. Vous trouverez ci-dessous un contrat de validation qui stocke la valeur d'un nombre aléatoire en utilisant le scénario de l'oracle des nombres aléatoires.

  ```jsx
  pragma solidity 0.5.14;
  pragma experimental ABIEncoderV2;

  import "BandChainLib.sol";
  import "IBridge.sol";

  contract SimplePriceDatabase {
    using BandChainLib for bytes;

    bytes32 public codeHash;
    bytes public params;
    IBridge public bridge;

    uint256 public latestPrice;
    uint256 public lastUpdate;

    constructor(
      bytes32 _codeHash ,
      bytes memory _params,
      IBridge _bridge
    ) public {
      codeHash = _codeHash;
      params = _params;
      bridge = _bridge;
    }

    function update(bytes memory _reportPrice) public {
      IBridge.VerifyOracleDataResult memory result = bridge.relayAndVerify(_reportPrice);
      uint64[] memory decodedInfo = result.data.toUint64List();

      require(result.codeHash == codeHash, "INVALID_CODEHASH");
      require(keccak256(result.params) == keccak256(params), "INVALID_PARAMS");
      require(uint256(decodedInfo[1]) > lastUpdate, "TIMESTAMP_MUST_BE_OLDER_THAN_THE_LAST_UPDATE");

      latestPrice = uint256(decodedInfo[0]);
      lastUpdate = uint256(decodedInfo[1]);
    }
  }
  ```

Lors du déploiement, 3 paramètres doivent être passés. Le **premier paramètre** est `codeHash`le hasch de script oracle. Le **deuxième paramètre** est l'objet des paramètres de requête de script oracle. Cela doit être passé au format octets. BandChain fournit une API REST pour convertir l'objet JSON du paramètre en format octet. Les détails de l'API peuvent être trouvés [**ici**](https://docs.bandchain.org/references/encoding-params). Un 0x doit être ajouté à la réponse reçue de cette API. Le **troisième paramètre** est l'adresse du contrat BandChain déjà déployée sur le réseau Polygon. Le Protocole de Band Supporte le Polygone TestnetV3: 0x3ba819b03fb8d34995f68304946eefa6dcff7cbf.

Une autre chose à noter est que le contrat de validation devrait importer la bibliothèque et l'interface d'aide qui est appelées `BandChainLib.sol`et `IBridge.sol`respectivement. Ils peuvent être trouvés dans les liens suivants: [**Bandchain**](https://docs.bandchain.org/references/bandchainlib-library) Library et [**IBridge**](https://docs.bandchain.org/references/ibridge-interface) interface.

  Une fois que le contrat de validation est déployé, il est possible d'accéder aux variables d'état en les interrogeant à partir d'une dApp. De même, plusieurs contrats de validation peuvent être créés pour différents scripts oracle intégrés. L'interface IBridge a une méthode appelée `relayAndVerify()`qui vérifie les valeurs mises à jour à chaque fois dans le contrat de validation. La `update()`méthode du contrat de validation a la logique pour mettre à jour les variables d'état. La preuve EVM obtenue lors de l'interrogation du script oracle doit être passée à la `update()`méthode. Chaque fois qu'une valeur est mise à jour, le contrat BandChain déployé sur Polygon vérifie les données avant de les stocker dans la variable d'état du contrat.

Le BandChain fournit un réseau décentralisé d'oracles pouvant être utilisés par dApps pour améliorer leur logique de contrat intelligente. Les docs BandChain sur le déploiement du contrat, le stockage des valeurs et la mise à jour peuvent être trouvés [**ici**](https://docs.bandchain.org/dapp-developers/requesting-data-from-bandchain/requesting-data-via-js-library).