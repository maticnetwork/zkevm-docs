---
id: did-implementation
title: Implémentation de Polygone DID
sidebar_label: Identity
description: En savoir plus sur l'implémentation de DID sur Polygone
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

Il s'agit d'un guide de démarrage pour les utilisateurs qui souhaitent utiliser les ensembles d'implémentation publiés par l'équipe de Polygon, pour générer et publier un DID de Polygon sur le registre de Polygon.

L'implémentation de la méthode Polygon DID comprend 3 packages, à savoir polygon-did-registrar, polygon-did-resolver et polygon-did-registry-contract. Un utilisateur qui souhaite intégrer la fonctionnalité pour soit enregistrer, soit lire un DID sur ou depuis le réseau Polygon peut utiliser le guide suivant.

Un DID est essentiellement un identifiant unique, qui a été créé sans la présence d'une autorité centrale. DID dans le contexte des informations d'identification vérifiables est utilisé pour signer des documents, permettant ainsi à l'utilisateur de prouver la propriété du document lorsque cela est nécessaire.

## La Méthode Polygone DID {#polygon-did-method}

La définition de la méthode DID de Polygon est conforme aux spécifications et normes DID-Core. Un DID URI est composé de trois composants séparés par des deux-points, le schéma, suivi du nom de la méthode et enfin d'un identifiant spécifique à la méthode. Pour Polygon l'URI ressemble à:

```
did:polygon:<Ethereum address>
```

Ici, le schéma est `did`, le nom de méthode est `polygon`et l'identifiant spécifique de méthode est une adresse ethereum.

## Implémentation de Polygone DID {#polygon-did-implementation}

Le Polygon DID peut être implémenté à l'aide de deux packages, l'utilisateur peut importer les bibliothèques respectives npm et les utiliser pour incorporer les méthodologies de Polygon DID dans leurs applications respectives. Les détails de l'implémentation sont fournis dans la section suivante.

Pour commencer, il faut d'abord créer un DID. La création dans le cas où Polygon DID est une encapsulation de deux étapes, d'abord où un utilisateur doit générer un DID URI pour lui-même et ensuite l'enregistrer sur le registre de Polygon.

### Créez un DID {#create-did}

Dans votre projet pour créer un polygon DID URI il faut d'abord installer:

```
npm i @ayanworks/polygon-did-registrar --save
```

Une fois l'installation terminée, l'utilisateur peut l'utiliser comme suit:

```
import { createDID } from "polygon-did-registrar";
```

La `createdDID`fonction aide l'utilisateur à générer un URI. Lors de la création d'un DID, il peut y avoir deux scénarios.

  1. L'utilisateur possède déjà un portefeuille et souhaite générer un DID correspondant au même portefeuille.

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. Si l'utilisateur n'a pas de portefeuille existant et veut en générer un, l'utilisateur peut utiliser:

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

Le paramètre réseau dans les deux cas se réfère à savoir si l'utilisateur veut créer le DID sur Polygon Mumbai Testnet ou Polygon Mainnet.

Entrée d'échantillon:

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

Après avoir créé DID, vous aurez une URI DID générée.

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### S'enregistrer DID {#register-did}

Pour enregistrer l'URI DID et le document DID correspondant sur le registre livre, l'utilisateur doit d'abord utiliser `polygon-did-registrar`comme suit:

```js
import { registerDID } from "polygon-did-registrar";
```

Pour être une condition préalable à l'enregistrement DID, l'utilisateur doit s'assurer que le corrsponding du portefeuille au DID dispose du solde jetons nécessaire. Une fois que l'utilisateur a un solde de jetons dans le portefeuille, un appel peut être effectué vers la fonctionnalité registerDID comme indiqué ci-dessous:

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

Les paramètres `did`et `privateKey`sont obligatoires, alors qu'il est facultatif d'entrer les `url`.`contractAddress` Si l'utilisateur ne donne pas les deux derniers paramètres, la bibliothèque récupère les configurations par défaut du réseau à partir du DID URI.

Si tous les paramètres correspondent aux spécifications et que tout est donné dans un bon ordre, la `registerDID`fonction renvoie un hachage de transaction, une erreur correspondante est retournée autrement.

Et avec cela, vous avez terminé avec succès votre tâche d'enregistrer un DID sur le réseau Polygon.

## Résoudre le DID {#resolve-did}

Pour commencer, installez les bibliothèques suivantes:

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

Pour lire un document DID enregistré sur le registre, tout utilisateur avec un URI de polygone DID peut d'abord dans l'importation de son projet,

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

Après avoir importé les paquets, le document DID peut être récupéré en utilisant :

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

où `didResolutionResult`l'objet est le suivant :

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

Il convient de noter qu'aucun coût de gaz ne sera encouru par l'utilisateur lors de la tentative de résolution d'un DID.

## Mettre À Jour Le Document DID {#update-did-document}

Pour encapsuler le projet avec la possibilité de mettre à jour le document DID, l'utilisateur doit d'abord utiliser `polygon-did-registrar`comme suit:

```js
import { updateDidDoc } from "polygon-did-registrar";
```

Ensuite, appelez la fonction:

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

Il convient de noter que pour mettre à jour le document DID, seul le propriétaire de DID peut envoyer la demande. La clé privée ici devrait également contenir des jetons Matic correspondants.

Si l'utilisateur ne fournit pas la configuration avec `url` et `contractAddress`, la bibliothèque récupère les configurations par défaut du réseau à partir du DID URI.

## Supprimer Le Document DID {#delete-did-document}

Avec l'implémentation Polygon DID, un utilisateur peut également révoquer son document DID du livre. L'utilisateur doit d'abord utiliser `polygon-did-registrar`comme suit:

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

Utilisez ensuite,

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

Parmi les paramètres, il convient de noter que, `url` et `contractAddress` sont des paramètres facultatifs qui, s'ils ne sont pas fournis par l'utilisateur, une configuration par défaut sera récupérée par la fonction en fonction du DID URI.

Il est important que la clé privée contienne les jetons Matic nécessaires, conformément à la configuration réseau de DID, sinon la transaction échouerait.

## Contribuer au Répertoire {#contributing-to-the-repository}

Utilisez le flux de travail standard fork, branche et de demande d'extraction pour proposer des modifications aux répertoires. Veuillez rendre les noms de branches instructifs en incluant le problème ou le numéro de bogue par exemple.

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
