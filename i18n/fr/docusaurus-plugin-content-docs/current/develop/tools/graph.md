---
id: graph
title: Mise en place d'un projet hébergé avec Le Graphique et Polygon
description: Apprenez à mettre en place un projet hébergé avec Le Graphique et Polygon.
keywords:
  - graph
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Le Graphique, un protocole décentralisé d'indexation et d'interrogation des données de la chaîne, prend en charge la chaîne de Polygon. Les données définies par les sous-graphes sont faciles à interroger et à explorer. Les sous-graphes peuvent être créés localement, ou utiliser un explorateur hébergé gratuitement pour l'indexation et l'affichage des données.

> Note: Voir https://thegraph.com/docs/quick-start pour plus de détails, l'installation locale et plus encore. La documentation comprend un exemple pour apprendre comment fonctionnent les sous-graphes et cette vidéo fournit une bonne introduction.

## Étapes {#steps}

1. Allez sur l'Explorateur Graphique (https://thegraph.com/explorer/) et créez un compte. Vous aurez besoin d'un compte GitHub pour l'authentification.

2. Allez dans votre tableau de bord et cliquez sur Ajouter un Sous-graphe. Définissez le sous-graphe Nom, Compte et Sous-titre et mettez à jour l'image et les autres informations (que vous pourrez mettre à jour plus tard) si vous le souhaitez.

<img src={useBaseUrl("img/graph/Graph-1.png")} width="100%" height="100%"/>


3. Installez Le Graphique CLI sur votre machine (en utilisant soit npm ou yarn)

```bash
$ npm install -g @graphprotocol/graph-cli
$ yarn global add @graphprotocol/graph-cli
```

4. La commande suivante crée un sous-graphe qui indexe tous les événements d'un contrat existant. Il tente de récupérer l'ABI du contrat auprès de BlockScout et revient à demander un chemin de fichier local. Si l'un des arguments facultatifs est manquant, il vous fait passer par un formulaire interactif.

```bash
graph init \
  --from-contract <CONTRACT_ADDRESS> \
  [--network Matic ] \
  [--abi <FILE>] \
  <GITHUB_USER>/<SUBGRAPH_NAME> [<DIRECTORY>]

--network: choose “Polygon” for Matic mainnet and “Mumbai” for Polygon Testnet.
--from-contract <CONTRACT_ADDRESS> is the address of your existing contract which you have deployed on Polygon: Testnet or Mainnet.
--abi <FILE> is a local path to a contract ABI file (optional, If verified in BlockScout, the graph will grab the ABI, otherwise you will need to manually add the ABI. You can save the abi from BlockScout or by running truffle compile or solc on a public project.)
The <GITHUB_USER> is your github user or organization name, <SUBGRAPH_NAME> is the name for your subgraph, and <DIRECTORY> is the optional name of the directory where graph init will put the example subgraph manifest.
```

> Note: Plus de détails sont ici: https://thegraph.com/docs/define-a-subgraph#create-a-subgraph-project

5. Authentification avec le service hébergé

```bash
graph auth https://api.thegraph.com/deploy/ <your-access-token>
```
Vous pouvez trouver le jeton d'accès en allant sur votre tableau de bord sur le site web du graphique.

6. Accédez au répertoire que vous avez créé et commencez à définir le sous-graphe. Des informations sur la création d'un sous-graphe sont disponibles dans les Documents Graphiques ici. https://thegraph.com/docs/define-a-subgraph

7. Lorsque vous êtes prêt, déployez votre sous-graphe. Vous pouvez toujours tester et redéployer si nécessaire.

> Si votre sous-graphe précédemment déployé est toujours en statut Syncing, il sera immédiatement remplacé par la nouvelle version déployée. Si le sous-graphe précédemment déployé est déjà entièrement synchronisé, le Noeud Graphique marquera la nouvelle version déployée comme étant la version en attente, la synchronisera en arrière-plan, et ne remplacera la version actuellement déployée par la nouvelle version qu'une fois la synchronisation de la nouvelle version terminée. Cela vous permet de disposer d'un sous-graphe sur lequel travailler pendant la synchronisation de la nouvelle version.

```bash
yarn deploy
```

Votre sous-graphe sera déployé et vous pourrez y accéder depuis votre tableau de bord.

Vous pouvez apprendre à interroger le sous-graphe ici: https://thegraph.com/docs/query-the-graph#using-the-graph-explorer

Si vous souhaitez rendre votre sous-graphe publique, vous pouvez le faire en accédant à votre sous-graphe depuis votre tableau de bord, puis en cliquant sur le bouton d'édition. Vous verrez le curseur au bas de la page d'édition.
