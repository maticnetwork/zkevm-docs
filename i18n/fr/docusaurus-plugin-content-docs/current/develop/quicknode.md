---
id: quicknode
title: Déployez un contrat intelligent à l'aide de QuickNode
sidebar_label: Using QuickNode
description:  Déployez des contrats intelligents sur Polygon à l'aide de Brownie et Quicknode.
keywords:
  - docs
  - matic
  - quicknode
  - polygon
  - python
  - web3.py
  - smart contract
  - brownie
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Aperçu {#overview}

Python est l'un des langages de programmation les plus polyvalents; des chercheurs exécutant leurs modèles de test aux développeurs l'utilisant dans des environnements de production lourds, il a utilisé des cas dans tous les domaines techniques possibles.

Dans ce tutoriel, vous apprendrez à utiliser le framework [Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) pour écrire et déployer un contrat intelligent en tirant parti des nœuds testnet [QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) pour Polygon.

:::tip

Pour contacter l'équipe Quicknode, envoyez-leur un message ou taguez-les sur Twitter [@QuickNode](https://twitter.com/QuickNode).

:::

## Prérequis {#prerequisites}

- Python3 installé
- Un nœud Polygon
- Editeur de codes
- Interface de ligne de commande

## Ce que vous allez faire {#what-you-will-do}

1. Configurez Brownie
2. Accédez aux nœuds de test Quicknode
3. Compiler et Déployer un contrat intelligent
4. Vérifiez les données du contrat déployé

## Qu'est-ce que Brownie? {#what-is-brownie}

Le développement de contrats intelligents est principalement dominé par des bibliothèques basées sur JavaScript comme [web3.js](https://web3js.readthedocs.io/) [ethers.js](https://docs.ethers.io/) [Truffe](https://www.trufflesuite.com/docs/truffle/) et [Hardhat](https://hardhat.org/). Python est un langage polyvalent hautement utilisé et peut également être utilisé pour les contrats intelligents / développement Web3 ; [web3.py](https://web3py.readthedocs.io/en/stable/) est une bibliothèque Python convaincante qui répond aux besoins Web3. Le cadre Brownie est construit sur le dessus `web3.py`.

[Brownie](https://eth-brownie.readthedocs.io/en/latest/index.html#brownie) est un cadre basé sur Python pour développer et tester des contrats intelligents. Brownie supporte les contrats Solidity et Vyper, et permet même de tester les contrats via [pytest](https://github.com/pytest-dev/pytest).

Pour démontrer le processus d'écriture et de déploiement d'un contrat intelligent avec Brownie, nous utiliserons [Brownie-mixes](https://github.com/brownie-mix) qui sont des projets de modèles. Plus précisément, nous utiliserons un [mélange de jetons](https://github.com/brownie-mix/token-mix), qui est un modèle de l'implémentation ERC-20.

## Installez des dépendances {#install-dependencies}

Brownie est construit sur le dessus de python3, nous avons donc besoin de l'installer pour fonctionner avec Brownie. Laissez-nous vérifier si nous avons python3 installé sur notre système. Pour cela, tapez les éléments suivants dans votre outil de ligne de commande:

```bash
python3 -V
```

Cela devrait renvoyer la version de python3 installée. S'il n'est pas installé, téléchargez-le et installez-le à partir du site officiel [de python](https://www.python.org/downloads/).

Créons un répertoire de projet avant d'installer Brownie, et faisons de ce répertoire de projet notre répertoire de travail actuel:

```bash
mkdir brownieDemo
cd brownieDemo
```

Maintenant que vous avez installé python3 sur votre système, installons brownie en utilisant pip, le gestionnaire de paquet de Python. Pip est similaire à ce que npm est pour JavaScript. Tapez les éléments suivants dans votre ligne de commande:

```bash
pip3 install eth-brownie
```

:::tip

Si l'installation échoue, vous pouvez utiliser la commande suivante à la place:`sudo pip3 install eth-brownie`

:::

Pour vérifier si Brownie a été correctement installé, tapez `brownie`votre ligne de commande et il devrait donner la sortie suivante:

![img](/img/quicknode/brownie-commands.png)

Pour obtenir le mixage de jetons, tapez simplement les éléments suivants dans votre ligne de commande:

```
brownie bake token
```

Cela créera un nouveau répertoire `token/`dans notre `brownieDemo`répertoire.

### Structure du fichier {#file-structure}

Tout d'abord, accédez au répertoire `token`:

```bash
cd token
```

Maintenant, ouvrez le `token`répertoire dans votre éditeur de texte. Sous le `contracts/`dossier vous trouverez , `Token.sol`qui est notre contrat principal. Vous pouvez écrire vos propres contrats ou modifier un `Token.sol`fichier.

Sous le `scripts/`dossier, vous trouverez le script `token.py`Python. Ce script sera utilisé pour déployer le contrat, et des modifications sont nécessaires en fonction des contrats.

![img](/img/quicknode/token-sol.png)

Le contrat est un contrat ERC-20. Vous pouvez en apprendre davantage sur les normes et les contrats ERC-20 dans ce [guide sur](https://www.quicknode.com/guides/solidity/how-to-create-and-deploy-an-erc20-token) les jetons ERC-20.

## Démarrez votre nœud Polygon {#booting-your-polygon-node}

QuickNode a un réseau mondial de nœuds testnet Polygon Mainnet et Mumbai. Ils exécutent également un [Polygon RPC public](https://docs.polygon.technology/docs/develop/network-details/network/#:~:text=https%3A//rpc%2Dmainnet.matic.quiknode.pro) gratuit, mais si vous obtenez un taux limité, vous pouvez vous inscrire à un [nœud d'essai gratuit à partir de QuickNode](https://www.quicknode.com/chains/matic?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide).

![img](/img/quicknode/http_URL.png)

Copiez **l'URL HTTP**, qui sera utile plus tard dans le tutoriel.

## Configuration du réseau et du compte {#network-and-account-setup}

Nous devons configurer notre point de terminaison QuickNode avec Brownie. Pour cela, tapez les éléments suivants dans votre ligne de commande:

```
brownie networks add Ethereum matic_mumbai host=YOUR_QUICKNODE_URL chainid=3
```

Remplacez par **l'URL HTTP Testnet Mumbai** que nous venons `YOUR_QUICKNODE_URL`de recevoir lors du démarrage de notre nœud Polygon.

Dans la commande ci-dessus, `Ethereum`est le nom de l'environnement, et `matic_mumbai`est le nom personnalisé du réseau; vous pouvez donner n'importe quel nom à votre réseau personnalisé.

La prochaine chose que nous devons faire ici est de créer un nouveau portefeuille en utilisant Brownie, pour le faire tapez les suivants dans votre ligne de commande:

```
brownie accounts generate testac
```

Vous serez invité à configurer un mot de passe pour votre compte! Après avoir terminé les étapes, cela générera un compte avec une phrase mnémonique, the hors ligne. Le nom est le nom de notre compte (vous pouvez choisir `testac`n'importe quel nom que vous aimez).

![img](/img/quicknode/new-account.png)

:::note

Les phrases Mnémoniques peuvent être utilisées pour récupérer un compte ou importer le compte vers d'autres [<ins>portefeuilles non dépositaires</ins>](https://www.quicknode.com/guides/web3-sdks/how-to-do-a-non-custodial-transaction-with-quicknode). Le compte que vous voyez dans l'image ci-dessus a été créé juste pour ce guide.

:::

Copiez l'adresse du compte afin que nous puissions obtenir un MATIC, qui sera nécessaire pour déployer notre contrat.

## Obtenir Testnet MATIC {#getting-testnet-matic}

Nous aurons besoin de quelques jetons MATIC pour tester pour payer les frais de gaz pour déployer notre contrat intelligent.

Copiez l'adresse de votre compte que nous avons généré dans ce tutoriel, collez-la dans le champ d'adresse du [robinet Polygon](https://faucet.polygon.technology/) et cliquez sur **Soumettre**. Le robinet vous enverra 0,2 test MATIC.

![img](/img/quicknode/faucet.png)

## Déployez votre contrat intelligent {#deploying-your-smart-contract}

Avant de déployer le contrat, vous devez le compiler en utilisant :

```
brownie compile
```

![img](/img/quicknode/brownie-compile.png)

Ouvrez maintenant l'éditeur de texte `scripts/token.py`dans votre éditeur de texte et effectuez les modifications suivantes:

```python
#!/usr/bin/python3
from brownie import Token, accounts

def main():
    acct = accounts.load('testac')
    return Token.deploy("Test Token", "TST", 18, 1e21, {'from': acct})
```

:::info Explication

En utilisant le code ci-dessus, nous avons importé un `testac`compte que nous avons créé plus tôt et stocké dans une `acct`variable. Aussi, dans la ligne suivante, nous avons modifié une `'from':`partie pour recevoir des données de `acct`variable.

:::

Enfin, nous déployerons notre contrat intelligent:

```
brownie run token.py --network matic_mumbai
```

`matic_mumbai`est le nom du réseau personnalisé que nous avons créé précédemment. L'invite vous demandera le **mot de passe** que nous définissons plus tôt lors de la création du compte.

Après avoir exécuté la commande ci-dessus, vous devez obtenir le hash de la transaction, et Brownie attendra que la transaction soit confirmée. Une fois la transaction confirmée, il renverra l'adresse à laquelle notre contrat est déployé sur le testnet de Polygone Mumbai.

![img](/img/quicknode/brownie-run.png)

Vous pouvez vérifier le contrat déployé en copiant-collant l'adresse du contrat à[Polygonscan Mumbai](https://mumbai.polygonscan.com/).

![img](/img/quicknode/polygonscan.png)

## Tester le Contrat {#testing-the-contract}

Brownie offre également la possibilité de tester les fonctionnalités des contrats intelligents. Il utilise le `pytest`cadre pour générer facilement des tests unitaires. Vous pouvez trouver plus d'informations sur l'écriture de tests sur Bronwnie  [sur leur documentation](https://eth-brownie.readthedocs.io/en/latest/tests-pytest-intro.html#).

**Voici comment les contrats sont déployés sur Polygone en utilisant Brownie et QuickNode.**

QuickNode, tout comme Polygon, a toujours eu une approche éducative d'abord fournissant des [guides](https://www.quicknode.com/guides?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide) de développeurs, des [docs](https://www.quicknode.com/docs/polygon?utm_source=polygon_docs&utm_campaign=ploygon_docs_contract_guide), [des vidéos tutorielles](https://www.youtube.com/channel/UC3lhedwc0EISreYiYtQ-Gjg/videos) et une [communauté de développeurs Web3](https://discord.gg/DkdgEqE) qui sont impatients de s'entraider.
