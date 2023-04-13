---
id: chainlink
title: Chainlink
sidebar_label: Chainlink
description: Chainlink est un réseau oracle blockchain décentralisé construit sur Ethereum.
keywords:
  - wiki
  - polygon
  - chainlink
  - oracle
  - decentralized
  - data
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

**Chainlink** permet à vos contrats d'accéder à **n'importe quelle source de données externes**, via un réseau oracle décentralisé. Que votre contrat nécessite des résultats sportifs, la dernière météo ou toute autre donnée disponible publiquement, Chainlink fournit les outils nécessaires pour que votre contrat puisse les consommer.

## Données décentralisées {#decentralized-data}

L'une des fonctionnalités les plus puissantes de Chainlink est déjà décentralisée, agrégée et prête à être digérée sur la chaîne des données sur la plupart des crypto-monnaies populaires. Ceux-ci sont connus sous le nom [**de Feeds de données Chainlink**](https://docs.chain.link/docs/using-chainlink-reference-contracts).

Voici un exemple fonctionnel d'un contrat qui tire vers le haut le prix le plus récent de MATIC en USD sur le testnet Mumbai.

Tout ce que vous avez à faire est de changer l'adresse [avec n'importe quelle adresse d'un flux de données](https://docs.chain.link/docs/matic-addresses#config) que vous souhaitez, et vous pouvez commencer à digérer les informations de prix.

```
pragma solidity ^0.6.7;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract PriceConsumerV3 {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Mumbai Testnet
     * Aggregator: MATIC/USD
     * Address: 0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada
     */
    constructor() public {
        priceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada);
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
}
```

## Cycle de demande et de réception {#request-and-receive-cycle}

Le cycle de demande et de réception de Chainlink permet à vos contrats intelligents de faire une demande à n'importe quelle API externe et de consommer la réponse. Pour le mettre en œuvre, votre contrat doit définir deux fonctions :

1. Un pour **demander les données**, et
2. Un autre pour **recevoir la réponse**.

Pour demander des données, votre contrat construit un `request`objet qu'il fournit à un oracle. Une fois que l'oracle a atteint l'API et analysé la réponse, il tentera de renvoyer les données à votre contrat à l'aide de la fonction de rappel définie dans votre contrat intelligent.

## Utilisations {#uses}

1. **Flux de données Chainlink**

Il s'agit de points de référence de données décentralisés déjà agrégés sur la chaîne, et de la façon la plus rapide, la plus simple et la moins chère pour obtenir des données du monde réel. Il prend actuellement en charge certaines des paires de crypto-monnaies et de devises les plus populaires.

Pour travailler avec des flux de données, utilisez les [**flux de données Polygon à partir de**](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=polygon) la documentation Chainlink.

2. **Chainlink Fonction aléatoire vérifiable**

Obtenez des numéros aléatoires provably où le nombre aléatoire est cryptographiquement garanti pour être aléatoire.

Pour travailler avec Chainlink VRF, utilisez les [**adresses Polygon**](https://docs.chain.link/vrf/v2/subscription/supported-networks) VRF à partir de la [documentation](https://docs.chain.link/vrf/v2/subscription/examples/get-a-random-number) Chainlink.

3. **Appels API Chainlink**

Comment configurer votre contrat intelligent pour fonctionner avec des API traditionnelles et personnaliser pour obtenir n'importe quelles données, envoyer toutes les demandes sur Internet et plus.

## Exemple de code {#code-example}

Pour interagir avec les API externes, votre contrat intelligent doit hériter de [`ChainlinkClient.sol`](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.6/ChainlinkClient.sol), qui est un contrat conçu pour faciliter le traitement des demandes. Il expose une structure appelée `Chainlink.Request`, que votre contrat doit utiliser pour construire la demande d'API.

La requête doit définir l'adresse oracle, l'ID de travail, les frais, les paramètres d'adaptateur et la signature de la fonction de rappels. Dans cet exemple, la demande est construite dans la fonction `requestEthereumPrice`.

`fulfill` est définie comme la fonction de rappel.

```
pragma solidity ^0.6.0;

import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";

contract APIConsumer is ChainlinkClient {

    uint256 public price;

    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    /**
     * Network: Polygon Mumbai Testnet
     * Oracle: 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9
     * Job ID: da20aae0e4c843f6949e5cb3f7cfe8c4
     * LINK address: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Fee: 0.01 LINK
     */
    constructor() public {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        oracle = 0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9;
        jobId = "da20aae0e4c843f6949e5cb3f7cfe8c4";
        fee = 10 ** 16; // 0.01 LINK
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target price
     * data, then multiply by 100 (to remove decimal places from price).
     */
    function requestBTCCNYPrice() public returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);

        // Set the URL to perform the GET request on
        // NOTE: If this oracle gets more than 5 requests from this job at a time, it will not return.
        request.add("get", "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=CNY&apikey=demo");

       // Set the path to find the desired data in the API response, where the response format is:
       // {
       //     "Realtime Currency Exchange Rate": {
       //       "1. From_Currency Code": "BTC",
       //       "2. From_Currency Name": "Bitcoin",
       //       "3. To_Currency Code": "CNY",
       //       "4. To_Currency Name": "Chinese Yuan",
       //       "5. Exchange Rate": "207838.88814500",
       //       "6. Last Refreshed": "2021-01-26 11:11:07",
       //       "7. Time Zone": "UTC",
       //      "8. Bid Price": "207838.82343000",
       //       "9. Ask Price": "207838.88814500"
       //     }
       //     }
        string[] memory path = new string[](2);
        path[0] = "Realtime Currency Exchange Rate";
        path[1] = "5. Exchange Rate";
        request.addStringArray("path", path);

        // Multiply the result by 10000000000 to remove decimals
        request.addInt("times", 10000000000);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId)
    {
        price = _price;
    }
}
```

## Jeton LINK du réseau principal de Polygon {#mainnet-polygon-link-token}

Pour obtenir le jeton principal Polygon LINK du Mainnet Ethereum, vous devez suivre un processus en 2 étapes.

1. Reliez votre LINK en utilisant le plasma ou le [pont PoS](https://wallet.polygon.technology/bridge).
2. Échangez le LINK pour la version ERC677 via le [Pegswap, déployé par le Chainlink](https://pegswap.chain.link/).

Le pont de Polygon apporte une version ERC20 de LINK, et LINK est un ERC677, donc nous devons juste le mettre à jour avec cet échange.

## Adresses {#addresses}

Il n'y a actuellement que quelques oracles Chainlink opérationnels sur le testnet Mumbai de Polygon. Vous pouvez toujours en créer un vous-même et le lister sur le marché de Chainlink.

* Oracle :[`0xb33D8A4e62236eA91F3a8fD7ab15A95B9B7eEc7D`](https://mumbai.polygonscan.com/address/0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9/transactions)
* LIEN :[`0x326C977E6efc84E512bB9C30f76E30c160eD06FB`](https://mumbai.polygonscan.com/address/0x70d1F773A9f81C852087B77F6Ae6d3032B02D2AB/transactions)

Pour obtenir un LINK sur Mumbai Testnet, rendez-vous au [robinet Polygon ici](https://faucet.polygon.technology/).

## API prises en charge {#supported-apis}

Le cycle de demande et de réception de Chainlink est suffisamment flexible pour appeler n'importe quelle API publique, tant que les paramètres de la demande sont corrects et que le format de la réponse est connu. Par exemple, si l'objet de réponse d'une URL que nous voulons récupérer est formaté comme ceci : `{"USD":243.33}`, le chemin est simple : `"USD"`.

Si une API répond avec un objet JSON complexe, le paramètre **du chemin** devra spécifier où récupérer les données désirées, en utilisant une chaîne délimitée par points pour les objets imbriqués. Par exemple, considérez la réponse suivante :

```json
{
   "Prices":{
        "USD":243.33
    }
}
```

Pour cela, il faut suivre le chemin suivant : `"Prices.USD"`. S'il y a des espaces dans les chaînes de caractères ou les chaînes sont assez longs, nous pouvons utiliser la syntaxe indiquée dans l'exemple ci-dessus, où nous les transmettons tous comme un tableau de chaînes.

```json
string[] memory path = new string[](2);
path[0] = "Prices";
path[1] = "USD";
request.addStringArray("path", path);
```

## À quoi servent les identifiants d'emploi ? {#what-are-job-ids-for}

Vous avez peut-être remarqué que notre [exemple](#code-example) utilise un `jobId`paramètre lors de la construction de la requête. Les tâches sont constituées d'une séquence d'instructions qu'un oracle est configuré pour exécuter. Dans l'[exemple de code](#code-example) ci-dessus, le contrat fait une demande à l'oracle avec l'identifiant de travail : `da20aae0e4c843f6949e5cb3f7cfe8c4`. Ce travail particulier est configuré pour faire ce qui suit :

* Faire une demande GET
* Analyser la réponse JSON
* Multiplier la valeur par *x*
* Convertir la valeur en `uint`
* Envoyer à la chaîne

C'est pourquoi notre contrat ajoute l'URL, le chemin de l'endroit où trouver les données souhaitées dans la réponse JSON, et le montant des temps de la requête ; en utilisant les affirmations `request.add`. Ces instructions sont facilitées par ce qu'on appelle des adaptateurs, dans l'oracle.

**Chaque demande à un oracle doit inclure un identifiant de travail spécifique.**

Voici la liste des travaux que l'oracle de Polygon est configuré pour exécuter.

| Nom | Type de retour | Identifiant | Adaptateurs |
|-----|--------|------|-------|
| HTTP GET | `uint256` | `da20aae0e4c843f6949e5cb3f7cfe8c4` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethuint256`<br/>`ethtx` |
| HTTP GET | `int256` | `e0c76e45462f4e429ba32c114bfbf5ac ` | `httpget`<br/>`jsonparse`<br/>`multiply`<br/>`ethint256`<br/>`ethtx` |
| HTTP GET | `bool` | `999539ec63414233bdc989d8a8ff10aa ` | `httpget`<br/>`jsonparse`<br/>`ethbool`<br/>`ethtx` |
| HTTP GET | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httpget`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |
| HTTP POST | `bytes32` | `a82495a8fd5b4cb492b17dc0cc31a4fe ` | `httppost`<br/>`jsonparse`<br/>`ethbytes32`<br/>`ethtx` |

La référence complète de l'API Chainlink peut être trouvée [ici](https://docs.chain.link/any-api/api-reference).
