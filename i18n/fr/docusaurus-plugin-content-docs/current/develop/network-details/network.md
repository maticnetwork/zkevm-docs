---
id: network-rpc-endpoints
title: Points de Terminaison au Réseau
sidebar_label: Endpoints
description: Points endpoints réseau pour le réseau principal Polyon PoS et testnet
keywords:
  - docs
  - polygon
  - matic
  - remote procedure call
  - network endpoints
  - rpcs
  - http
  - websocket
  - wss
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: endpoints
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Ce guide d'index contient des détails sur le réseau pour le testnet Polygon Mumbai et Polygon PoS Mainnet et les listes des points de terminaison RPC et de nœuds qui leur sont associés.

<Tabs
defaultValue="mainnet"
values={[
{ label: 'PoS Mainnet', value: 'mainnet', },
{ label: 'PoS Testnet', value: 'mumbai', },
]
}>
<TabItem value="mumbai">

## Testnet PoS de Mumbai {#mumbai-pos-testnet}

Mumbai Testnet reproduit le Réseau Principal de Polygone et est utilisé pour les essais. Les utilisateurs peuvent obtenir des jetons testnet du [robinet](https://faucet.polygon.technology/). Les jetons Testnet sont sans valeur et sont différents des actifs porteurs de valeur comme le MATIC. Cela permet aux développeurs ou aux responsables du réseau de tester les configurations et d'expérimenter les mises en œuvre.

| Propriétés | Détails sur le Réseau |
| ---------------------------------- | ---------------------------------------------------------------- |
| NomduRéseau | **Mumbai** |
| ParentChain | **[Goërli](https://goerli.net/)** |
| chainId | `80001` |
| Jeton Gaz | [MATIC](gas-token) |
| Station de Gaz | [Station de Gaz à Mumbai](https://gasstation-mumbai.matic.today/v2) (en savoir plus [ici](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)) |
| Point de Terminaison RPC | [https://rpc-mumbai.matic.today](https://rpc-mumbai.matic.today) |
| Point de Terminaison de Nœud | [wss://rpc-mumbai.matic.today](wss://rpc-mumbai.matic.today) |
| API Heimdall | [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology) |
| Explorateur de blocs | [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com/) |

:::note Plus de Détails

Voir les [**données JSON**](https://static.matic.network/network/testnet/mumbai/index.json) suivantes qui contiennent détails du réseau.

:::

</TabItem>
<TabItem value="mainnet">

## Réseau Principal PoS de Polygone  {#polygon-pos-mainnet}

Le jeton natif du PoS de Polygone est le MATIC et est utilisé pour le gaz.

| Propriétés | Détails sur le Réseau |
| ---------------------------------- | ---------------------------------------------------------------- |
| NomduRéseau | **Polygone** |
| ParentChain | **Ethereum** |
| chainId | `137` |
| Jeton Gaz | [MATIC](gas-token) |
| Station de Gaz | [Le traqueur de Gaz PolygonScan (**recommandé**)](https://polygonscan.com/gastracker) ou [Station de Gaz du Réseau Matic](https://gasstation-mainnet.matic.network/v2) (en savoir plus [ici](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)) |
| Point de Terminaison RPC | [https://polygon-rpc.com/](https://polygon-rpc.com/) |
| Point de Terminaison de Nœud | [wss://rpc-mainnet.matic.network](wss://rpc-mainnet.matic.network) |
| API Heimdall | [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology) |
| Explorateur de blocs | [https://polygonscan.com/](https://polygonscan.com/) |

:::note Plus de Détails

Voir les [**données JSON**](https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json) suivantes contenant les détails du réseau.

:::

</TabItem>
</Tabs>

## Méthodes API RPC {#rpc-api-methods}

Les développeurs peuvent interagir avec les données de la chaîne et envoyer les différents types de transactions à la chaîne. le réseau en utilisant les points de terminaison du réseau. Les API suivent une norme JSON-RPC; JSON-RPC est un protocole d'appel de procédure à distance (RPC), léger et sans état, qui est communément utilisé lors de l'interaction avec un réseau de blockchain.

:::info Démarrer avec les appels RPC

Commencez par consulter l'ensemble complet de la documentation API pour la norme [**Appels JSON-RPC de Polygone**](https://edge-docs.polygon.technology/docs/get-started/json-rpc-commands/).

Si vous voulez commencer à utiliser des demandes d'API qui ne nécessitent aucune configuration, réparer les demandes qui échouent, ou, explorer de nouvelles méthodes sur le réseau Polygone, essayer l'[**Application Composer**](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D).

:::

Un utilisateur peut également lancer son propre nœud lorsqu'il interagit avec la chaîne de PoS de Polygone ou utiliser l'un des points de terminaison publics fournis par les fournisseurs de services d'infrastructure et d'API pour se connecter au réseau. Dagger est le meilleur moyen d'obtenir des mises à jour en temps réel de la chaîne, car il offre un moyen pour que vos dApps numériques et votre système dorsal reçoivent les événements de la blockchain en temps réel via un socket ou un websocket.

### Fournisseurs d'Infrastructures {#infrastructure-providers}

Les CPR Publics peuvent être soumis à des limites de trafic ou de taux en fonction de leur utilisation. Vous pouvez vous inscrire pour obtenir une URL RPC gratuite dédiée à l'adresse suivante:

* [Alchimie](https://www.alchemy.com/)
* [Ankr](https://www.ankr.com/)
* [Blast (Bware Labs)](https://blastapi.io/)
* [BlocPI](https://blockpi.io/)
* [nœuds de chaînes](https://www.chainnodes.org/)
* [Chainstack](https://chainstack.com/build-better-with-polygon/)
* [DataHub (Figment)](https://datahub.figment.io)
* [Getblock](https://getblock.io/en/)
* [Infura](https://infura.io)
* [MaticVigil](https://rpc.maticvigil.com/)
* [Moralis](https://moralis.io)
* [Réseau Pocket](https://www.portal.pokt.network/)
* [QuickNode](https://www.quicknode.com/chains/matic)
* [SettleMint](https://docs.settlemint.com/docs/polygon-connect-to-a-node)
* [WatchData](https://docs.watchdata.io/blockchain-apis/polygon-api)
* [NOWNodes](https://nownodes.io/nodes/polygon-matic)
