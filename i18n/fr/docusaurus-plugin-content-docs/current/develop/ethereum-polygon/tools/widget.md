---
id: widget
title: Widget Porte-monnaie
sidebar_label: Wallet Widget
description: "Des outils d'Interface Utilisateur pour exécuter des transactions de pont."
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Le widget Porte-monnaie est un outil d'Interface Utilisateur qui peut être intégré dans n'importe quelle application web pour exécuter des transactions de pont - Dépôt et Retrait.

Chaque widget est identifié par un nom unique que vous pouvez obtenir à partir du [tableau de bord Widget](https://wallet.polygon.technology/widget-dashboard).

### Tableau de bord du widget {#widget-dashboard}

Le widget peut être créé à partir de la page du tableau de bord du widgets dans l'application du porte-monnaie. Il permet à l'utilisateur de créer un nouveau widget avec quelques options personnalisables.

Une fois le widget créé, vous pouvez copier l'extrait de code et l'ajouter dans votre application ou utiliser le nom du widget et le configurer vous-même.

Voici le lien vers le tableau de bord des widgets -

* réseau principal - https://wallet.polygon.technology/widget-dashboard
* testnet - https://wallet-dev.polygon.technology/widget-dashboard

## Installer {#install}

Le widget est exporté en tant que bibliothèque javascript et disponible en tant que paquet npm.

```bash
npm i @maticnetwork/wallet-widget
```

## Exemples {#examples}

Nous avons créé des exemples pour différents cadres et outils afin de vous aider dans le développement. Tous les exemples sont présents sur - [https://github.com/maticnetwork/wallet-widget-example](https://github.com/maticnetwork/wallet-widget-example)

## Comment utiliser {#how-to-use}
### Avec la cible {#with-target}

Considérez que vous avez un bouton dans votre application et que vous voulez afficher un widget lorsqu'on clique sur ce bouton -

```html
<button id="btnMaticWidget"></btn>
```

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'mainnet' // network to be used - testnet or mainnet
});
```

Créez un widget dès que vous êtes prêt. Il est préférable d'appeler la fonction de création après le chargement du document.

```javascript
await widget.create();
```
Le widget est créé, cliquez maintenant sur votre bouton et le widget sera affiché.

### Sans cible {#without-target}

```javascript
import { Widget } from "@maticnetwork/wallet-widget";

var widget = new Widget({
    appName: "<widget name>", //widget name from dashboard
    network: 'mainnet' // network to be used - testnet or mainnet
});

await widget.create();
```

Le widget est maintenant créé, mais pour afficher le widget, vous devrez appeler`show`l'API.

```
widget.show();
```

De même, vous pouvez cacher le widget, en appelant `hide`l'API.

```
widget.hide();
```

### Remarque importante {#important-note}

1. En fonction du réseau "testnet" ou du "réseau principal", vous devez créer votre application sur le tableau de bord correspondant. Nous recommandons de créer une application avec le même nom sur testnet et réseau principal, afin d'éviter tout problème lorsque vous changez de réseau.

2. Le widget Porte-monnaie est une bibliothèque d'Interface Utilisateur et sur différents sites Web, il aura un aspect différent et pourrait présenter certains problèmes de couleurs, et d'adaptation, etc. Veuillez donc consacrer un peu de temps aux tests et à la personnalisation. Si vous avez besoin d'aide, veuillez contacter [l'équipe support](https://support.polygon.technology/).

3. Le widget de portefeuille est en plein écran sur les appareils mobiles, mais vous pouvez le personnaliser par `style`une configuration

## Configuration {#configuration}

La configuration peut être fournie dans le constructeur du Widget.

## Les configurations disponibles sont {#available-configuration-are}

- **cible** : chaîne de caractère - Sélecteur CSS pour afficher le widget en cas de clic sur un élément. Par exemple, "#btnMaticWidget" sera la cible dans le code ci-dessous.

```javascript
<button id="btnMaticWidget">Matic widget</button>
```

- **réseau** : Chaîne de caractère - réseau à utiliser. Deux options sont disponibles - "testnet" ou "réseau principal"
- **Largeur** : nombre - Largeur du widget
- **Hauteur:** nombre - Hauteur du widget
- **autoShowTime** : nombre - Affichez automatiquement le widget après le temps spécifié en millisecondes
- **appName** : chaîne de caractère - nom de votre application, il peut être récupéré sur le tableau de bord du widget.
- **position** : chaîne de caractères - Définit la position du widget. Les options disponibles sont -
    - centre
    - bas-droite
    - bas-gauche
- **montant** : chaîne de caractère - Pré-remplir le montant dans la zone de texte.
- **page** chaîne de caractères - sélectionnez la page. Les options disponibles sont - `withdraw`, `deposit`.
- **superposition** : booléen - affichez la superposition lorsque le widget est ouvert. Par défaut, c'est faux.
- **style** : objet - appliquez certains styles css sur le  widget.

```
var widget = new MaticWidget({
    appName: "<your app id>", //appName from dashboard
    target: '#btnMaticWidget', // element selector for showing widget on click
    network: 'testnet' // network to be used - testnet or mainnet,
    style:{
      color:'red'
    }
});
```

## Événements {#events}

Le widget émet certains événements qui peuvent être utilisés pour savoir ce qui se passe dans l'application.

### Abonnez-vous aux événements {#subscribe-to-events}

```javascript
widget.on('load',()=>{
  console.log('widget is loaded');
})
```

### Désabonnez-vous aux événements {#unsubscribe-to-events}

```javascript
widget.off('load',<callback>)
```

> Le retour d'appel doit être le même que celui utilisé pour s'abonner à l'événement. C'est donc préférable de stocker le rappel dans une variable. `

## Liste des événements: {#list-of-events}

- **charger** - Le widget est chargé
- **fermer** - Le widget est fermé
- **approveInit** - La transaction d'approbation est initialisée
- **approveComplete** - La transaction d'approbation est terminée
- **approveError** - La transaction d'approbation a échoué en raison d'une erreur, ou l'utilisateur a refusé la transaction sur Métamasque
- **depositInit** - La transaction de dépôt est initialisée
- **depositComplete** - La transaction de dépôt est terminée
- **depositError** - La transaction de dépôt a échoué en raison d'une erreur, ou l'utilisateur a refusé la transaction de dépôt complète sur Métamasque
- **burnInit** -  La transaction de brûlure de retrait est initialisée
- **burnComplete** - La transaction de retrait par brûlure est terminée
- **confirmWithdrawInit** - Le retrait est contrôlé et la transaction de confirmation est initialisée
- **confirmWithdrawComplete** - La transaction de confirmation de retrait est terminée
- **confirmWithdrawError** - La transaction de confirmation du retrait a échoué en raison d'une erreur, ou l'utilisateur a refusé la transaction de confirmation de retrait sur Métamasque
- **exitInit** - La transaction de sortie de retrait est initialisée
- **exitComplete** - La transaction de sortie du retrait est terminée
- **exitError** -  La transaction de retrait de sortie a échoué en raison d'une erreur, ou l'utilisateur a refusé la transaction de retrait sur Métamasque

## APIS {#apis}

- **afficher** - afficher le widget

```javascript
widget.show()
```

- **cacher** - cacher le widget

```javascript
widget.hide()
```

- **sur** - Abonnez-vous aux événements

```javascript
widget.on('<event name>', callback)
```

- **hors** - se désabonner aux événements

```javascript
widget.off('<event name>', callback)
```
