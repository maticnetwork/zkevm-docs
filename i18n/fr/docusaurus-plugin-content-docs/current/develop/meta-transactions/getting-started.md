---
id: meta-transactions
title: Méta-Transactions
sidebar_label: Overview
description: Découvrez les méta-transactions et comment vous pouvez les utiliser.
keywords:
  - docs
  - polygon
  - matic
  - transactions
  - meta transactions
  - gasless
image: https://matic.network/banners/matic-network-16x9.png
slug: meta-transactions
---

Les appels quotidiens de contrats intelligents sont à leur plus haut niveau, atteignant environ 2,5 à 3 millions par jour. Les DApps numériques commencent à prendre conscience de leur utilité, mais elles sont victimes de leur succès ou de celui des autres. succès en raison des frais de gaz. Sans mentionner, les obstacles à l'intégration des utilisateurs et les défis actuels Les UX ne sont pas une solution facile.

## Servir les Contrats Intelligents {#servicing-smart-contracts}

De par leur conception, les contrats intelligents sont des machines à état déterministe qui s'exécutent lorsque les frais de transaction sont payés pour servir la logique du contrat en utilisant les ressources informatiques du réseau. Ceci est accompli par un modèle de mesure du gaz sur Ethereum (et Polygone).

## L'État Actuel des Transactions {#the-current-state-of-transacting}

Il existe des limites à ce modèle de transaction traditionnel sur Ethereum (et sur d'autres blockchains). Une limitation courante est le fait qu'un utilisateur n'a pas les moyens de payer le gaz. Par défaut, l'expéditeur du message fait office de payeur, car ces comportements sont couplés, de sorte que si un utilisateur tente de créer et d'envoyer une transaction, ils sont responsables des frais de gaz associés. De même, si un utilisateur construit, interagit avec, ou exécute une dApp, l'utilisateur est tenu de payer du gaz.

Ce n'est pas réaliste de s'attendre à ce que l'utilisateur moyen achète des crypto-monnaies et paye l'essence pour interagir avec une application. Ce qui peut être fait pour résoudre ce problème est de dissocier l'expéditeur d'une transaction de l'action en tant que payeur, ce qui permet d'augmenter l'exécution des transactions et de mettre en place un système d'expérience de transaction transparent.

Au lieu de l'exécution directe des transactions, il existerait un intergiciel (via une tierce partie) pour gérer le gaz. C'est là qu'interviennent les méta-transactions.

## Que sont les Méta Transactions? {#what-are-meta-transactions}

 Les méta-transactions permettent à quiconque d'interagir avec la blockchain. Ils n'exigent pas que les utilisateurs aient des jetons pour payer les services du réseau par le biais de frais de transaction. Cela se fait en découplant l'expéditeur d'une transaction et le payeur de gaz.

Une solution qui peut accueillir de nouveaux utilisateurs et aider les utilisateurs actuels.

L'exécuteur d'une transaction opère comme un expéditeur. Au lieu de dépenser de l'essence, ils créent seulement une demande de transaction en signant leur action prévue (les paramètres de la transaction) avec leur code privé. clé. La méta transaction est une transaction Ethereum ordinaire qui comprend des paramètres supplémentaires pour élaborer la méta transaction.

Les paramètres signés de la transaction sont transmis à un réseau secondaire, qui joue le rôle de relais. Bien qu'il existe différents schémas pour cela, les relais choisissent généralement les transactions qui en valent la peine d'être soumises en validant la transaction (par exemple, si elle est pertinente pour le dApp). Après validation, le relais transformera la demande (le message signé) en une transaction réelle (ce qui signifie payer le frais de gaz) et le diffuse sur le réseau, où le contrat déballe la transaction en validant la  signature originale et l'exécute au nom de l'utilisateur.

:::note Les mots "méta" et "lot" peuvent être analogues à certains mots

Pour clarifier: une méta transaction est différente d'une transaction par lot; une transaction par lot est une transaction qui peut envoyer plusieurs transactions en même temps et qui sont ensuite exécutées par un seul expéditeur (nonce unique spécifié) en séquence.

:::

En résumé, les méta transactions sont un modèle de conception où:

* Un utilisateur (expéditeur) signe une demande avec sa clé privée et l'envoie à un relais.
* Le relais enveloppe la demande dans un tx et l'envoie à un contrat
* Le contrat déballe le tx et l'exécute

Les transactions autochtones impliquent que "l'expéditeur" soit également le "payeur". Lorsque l'on retire le "payeur" de "l'expéditeur", "l'expéditeur" devient plus comme un "volontaire" - l'expéditeur montre l'intention de la transaction qu'ils souhaitent voir exécutée sur la blockchain en signant un message contenant des paramètres spécifiques relatifs à leur message, et non une transaction entièrement construite.

## Cas d'Utilisation {#use-cases}

On peut imaginer les capacités des méta transactions pour la réglementation des dApps et des interactions avec les smart contracts. Non seulement un utilisateur peut créer une transaction sans gaz, mais il peut également le faire plusieurs fois, et avec un outil d'automatisation, les méta-transactions peuvent influencer la prochaine vague d'applications pour des cas d'utilisation pratiques. Méta-transactions permettent une réelle utilité de la logique des contrats intelligents, qui est souvent limitée en raison des frais de gaz et des interactions nécessaires sur la chaîne.

### Exemple avec vote {#example-with-voting}

Un utilisateur souhaite participer à la gouvernance sur la chaîne, et il a l'intention de voter pour un résultat particulier par l'intermédiaire d'un contrat de vote. L'utilisateur présenterait un message indiquant sa décision lors d'un vote dans ce cas précis de contrat. Traditionnellement, ils devaient payer un droit d'utilisation du gaz pour interagir avec le contrat (et savoir comment interagir avec le contrat), mais au lieu de cela, ils peuvent signer une méta-transaction (hors chaîne) avec les les informations nécessaires relatives à leur vote et les transmettent à un relais qui exécute la transaction en leur nom.

Le message signé est envoyé à un relayeur (les paramètres tx signés concernent les informations de vote). Le relayeur valide que cette transaction est un vote prioritaire, transforme la demande de vote en une transaction réelle, paie les frais de gaz, et le diffuse au contrat de vote.  Tout est vérifié lors de l'envoi de la fin de contrat de vote, et le vote est exécuté au nom de l'utilisateur.

## Essayez-Les {#try-them-out}

En supposant que vous soyez familier avec les différentes approches que vous pouvez adopter pour intégrer les méta-transactions dans votre dApp, et selon que vous migrez vers les méta-transactions ou que vous construisez un nouveau dApp en l'utilisant.

Pour intégrer votre dApp avec Méta-Transactions sur Polygone, vous pouvez choisir l'un des relayeurs ou de mettre au point une solution personnalisée:

* [Biconomy](https://docs.biconomy.io/products/enable-gasless-transactions)
* [Réseau des Stations-Service (GSN)](https://docs.opengsn.org/#ethereum-gas-station-network-gsn)
* [Infura](https://infura.io/product/ethereum/transactions-itx)
* [Gelato](https://docs.gelato.network/developer-products/gelato-relay-sdk)
