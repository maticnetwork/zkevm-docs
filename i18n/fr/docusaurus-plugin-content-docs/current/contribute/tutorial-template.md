---
id: tutorial-template
title: Modèle de tutoriel général
sidebar_label: Tutorial template
description: Suivre le modèle de tutoriel pour la rédaction d'un tutoriel technique.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - tutorial
  - contribute
  - template
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: tutorial-template
---

Ce modèle doit être utilisé pour la contribution à travers un tutoriel au Polygon Wiki. Vous pouvez choisir de contribuer à un tutoriel à partir d'un sujet de votre choix.

## Directives générales {#general-guidelines}

* La portée du tutoriel devrait être claire à partir du titre.
* Le tutoriel doit pouvoir décrire avec précision les caractéristiques et fonctionnalités des produits ou services.
* Essayez de créer un tutoriel rapide et concis, mais développez les concepts clés
le cas échéant. Donnez des informations générales et davantage de contexte lorsque cela est possible.
* Pour les étapes de configuration et d'implémentation, soyez précis.
* Veuillez faire de votre mieux pour ajouter des images, des icônes ou des captures d'écran qui complètent le contenu écrit.
  > L'équipe de documentation sera également ravie de travailler avec vous sur la création de diagrammes.
* Ayez à l'esprit le public pour lequel vous écrivez. Si le contenu a un certain niveau de difficulté, vous devez le mentionner dans le tutoriel.
  > S'il y a des étapes à suivre avant qu'un utilisateur puisse exécuter un tutoriel, veuillez le mentionner.
* L'équipe de documentation sera heureuse de travailler avec vous à la création d'un tutoriel.
* N'oubliez pas de consulter le **[Guide stylistique](writing-style.md)**.

:::caution Mise à jour des tutoriels actuels

Si vous remarquez que les tutoriels actuels sur le Polygon Wiki ne suivent pas ce modèle, c'est parce que l'équipe de documentation a décidé de mettre en œuvre une norme pour que le flux de tutoriels soit cohérent parmi tous les tutoriels. L'équipe travaille à la mise à jour de ces tutoriels pour s'adapter à ce modèle. Si vous avez envie, vous pouvez également mettre à jour un tutoriel existant pour le restructurer.

:::

## Sections de tutoriel {#tutorial-sections}

### Aperçu {#overview}

Expliquez les produits ou services exposés dans le tutoriel. Donnez des informations générales concernant la finalité du tutoriel et ce que le le tutoriel a pour objectif de présenter. Le tutoriel doit toujours être basé sur l'utilisation d'un produit Polygon.

### Ce que vous allez apprendre {#what-you-ll-learn}

Résumez ce que l'utilisateur apprendra dans la totalité de ce tutoriel.

:::note Exemple

Vous découvrirez comment utiliser la Truffle Suite pour créer des applications Polygon.

:::

#### Ce que le lecteur va apprendre {#learning-outcomes}

Décrivez ce que le lecteur va apprendre.

:::note Exemple

1. Vous en apprendrez davantage sur Fauna.
2. Vous apprendrez comment utiliser ReactJS pour l'interface utilisateur de votre dApp.
3. Vous apprendrez à protéger les données dApp.

:::

Mentionnez les prérequis et ce que l'utilisateur doit déjà connaître. Reliez la documentation nécessaire pour les domaines que l'utilisateur doit déjà connaître.

:::note Exemple

Avant de commencer ce tutoriel, vous devez comprendre les bases du développement dApp basé sur EVM. Consulter « ces documents » pour plus d'informations.

:::

### Ce que vous allez faire {#what-you-ll-do}

Décrivez les étapes du tutoriel et les outils qui seront utilisés.

:::note Exemple

Vous utiliserez Solidity pour créer un contrat intelligent dans un environnement ChainIDE.

1. Configuration d'un portefeuille
2. Rédiger un contrat intelligent ERC-721
3. Compiler un contrat intelligent ERC-721
4. Déployer un contrat intelligent ERC-721
5. Créer un fichier Flattened à l'aide de la bibliothèque Flattener
6. Vérifier un contrat intelligent
7. Frappe NFT

:::

### Le tutoriel lui-même {#the-tutorial-itself}

Généralement, le tutoriel peut être présenté selon la meilleure catégorisation que que le rédacteur juge appropriée. Cela doit se refléter dans la section [Ce que vous allez faire](#what-youll-do) . Cependant, les sections du tutoriel devraient aborder les trois catégories principales suivantes :

> Assurez-vous de tenir compte des mots-clés et de garder le référencement à l'esprit lorsque vous concevez des sections.

#### Créez votre application {#build-your-application}

Le contenu principal du tutoriel. Cela peut inclure des sections comme « installation », « configuration », et « mise en œuvre », pour n'en citer que quelques-unes.

#### Exécutez ou déployez votre application {#run-or-deploy-your-application}

Expliquez comment l'utilisateur doit exécuter ou déployer son application.

#### Testez votre application {#test-your-application}

Il peut s'agir d'écrire des tests pour un contrat intelligent, de vérifier un contrat intelligent, etc.

### Étapes suivantes {#next-steps}

Concluez le tutoriel en rappelant ce que le lecteur a appris. Décrivez les prochaines étapes à suivre pour l'utilisateur.

:::note Exemple

Félicitations pour le déploiement de votre contrat intelligent. Vous savez maintenant comment utiliser ChainIDE pour créer et déployer des contrats intelligents. Pensez à essayer « ce tutoriel ».

:::
