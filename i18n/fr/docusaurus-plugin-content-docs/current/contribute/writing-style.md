---
id: writing-style
title: Directives générales de rédaction
sidebar_label: General writing guidelines
description: Suivez les instructions suivantes en matière de rédaction.
keywords:
  - docs
  - matic
  - polygon
  - documentation
  - writing
  - contribute
  - style
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: writing-style
---

Ces directives exposent les meilleures pratiques en matière de rédaction de documentation technique ainsi que les conventions de style à utiliser lors de l'élaboration de la documentation pour le Polygon Wiki. L'objectif de ce guide est d'aider les contributeurs à rédiger un contenu clair, concis et cohérent. L'équipe Polygon utilise le Polygon Wiki comme un produit officiel de Docs.

## Directives principales {#primary-guidelines}

Nous pensons que la particularité de Polygon réside dans sa conception cohérente et nous cherchons à conserver cette caractéristique déterminante. L'équipe Polygon utilise le Polygon Wiki comme un produit officiel de Docs. Dès le départ, nous avons défini certaines lignes directrices pour nous assurer que les nouvelles contributions améliorent uniquement le projet dans son ensemble :

- **Qualité** : le code utilisé dans le projet Polygon doit répondre aux directives de style, avec suffisamment de cas de test, des messages de validation descriptifs, la preuve que la contribution ne brise aucun engagement de compatibilité ou ne provoque pas d'interactions de caractéristiques défavorables, et la preuve d'une évaluation par les pairs de haute qualité.
- **Taille** : la culture du projet Polygon repose sur de petites demandes de tirage, soumises régulièrement. Plus une demande de tirage est importante, plus il est probable que vous soyez invité à la soumettre à nouveau sous forme d'une série de PR plus petits, indépendants et consultables individuellement.
- **Maintenabilité** : si la fonctionnalité nécessite une maintenance continue (par exemple, de l'assistance pour une marque particulière de base de données), nous pouvons vous demander d'accepter la responsabilité de la maintenance de cette fonctionnalité.

Le guide de style s'inspire des manuels de style suivants :

> Si vous n'arrivez pas à trouver la réponse à une question de style, de voix ou de terminologie dans ce guide, veuillez consulter ces ressources.

- [Guide de style Google](https://github.com/google/styleguide/blob/gh-pages/docguide/style.md)
- [Le manuel de style Oxford](https://global.oup.com/academic/product/new-oxford-style-manual-9780198767251?cc=nl&lang=en&)
- [Le manuel de style Microsoft](https://docs.microsoft.com/en-us/style-guide/welcome/)

### Générateur de site statique {#static-site-generator}

Le Wiki est construit sur la base [Docusaurus](https://docusaurus.io/), un générateur de site statique pour construire des sites de documentation en balisage. Le Wiki suit le modèle de métadonnées suivant pour ses fichiers de balisage et doit être adapté pour chaque nouveau document :

```
---
id: wiki-maintainers
title: Wiki Maintainers
sidebar_label: Maintainers
description: A list of Polygon Wiki maintainers
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - docs
  - maintainers
  - contributors
image: https://matic.network/banners/matic-network-16x9.png
slug: community-maintainers
---
```

Certains aspects importants doivent être pris en compte lors de la rédaction des métadonnées d'un fichier de balisage :
- Nous demandons aux contributeurs d'utiliser un **identifiant unique** ; d'éviter d'utiliser **uniquement** des mots ou des phrases génériques comme « Introduction » ou « Aperçu ».
- Le **titre** est la phrase utilisée au début de l'article, « Directives générales de rédaction » pour cet article. Il n'est donc pas nécessaire d'ajouter un en-tête H1/H2 pour introduire chaque article. Utilisez plutôt ce **titre** à partir des métadonnées.
- La **description** ne peut pas être trop longue, car elle est utilisée sur les tuiles d'index qui ont une limitation du nombre de caractères. Par exemple, la description « la Blockchain est un registre immuable pour l'enregistrement des transactions » pour *basics-blockchain.md* apparaît sur une tuile d'index sous cette forme : ![img](/img/contribute/index-tile.png)

La **description** doit alors comporter **jusqu'à 60 caractères**, en tenant compte des espaces entre les caractères.
- Les mots-clés sont importants pour augmenter le référencement et décrire l'article. Essayez d'utiliser au moins cinq mots clés.

:::note

Veuillez consulter la [documentation officielle des métadonnées](https://docusaurus.io/docs/next/api/plugins/@docusaurus/plugin-content-docs#markdown-front-matter) pour plus de détails.

:::

### Partagez l'expérience avec le lecteur {#share-the-experience-with-the-reader}

- Usage de la première personne du singulier : ne pas utiliser les termes « je » ou « moi ». Ayez recours à l'usage de la première personne avec modération et à bon escient. Si l'usage de la première personne est trop fréquent, cela peut étouffer le sens d'une expérience partagée et obscurcir le parcours du lecteur.
- Deuxième personne du pluriel : dans la plupart des cas, adressez-vous directement au lecteur. Pour les tutoriels, utilisez d'abord la première personne du pluriel (nous, notre, nos), ou la deuxième personne du pluriel, selon les cas. Les tutoriels proposant une approche plus guidée d'un sujet, l'utilisation de la première personne du pluriel est une pratique plus naturelle et plus communément acceptée que dans d'autres types de documentation.
- Troisième personne du singulier : n'utilisez pas « nous » pour faire référence à Polygon ou à la technologie Polygon.
- Actif : utilisez le présent dans la mesure du possible. Dans certaines situations, le passif est approprié ; repassez au passif lorsque l'agent doit être le point de mire.
- Gardez à l'esprit la présence humaine : garder un ton dynamique lors de la description de concepts techniques aide vraiment un lecteur à se familiariser avec le contenu, plutôt que la simple description  d'un logiciel (ou d'un code).
- Pronoms : utilisez des pronoms neutres en matière de genre, dans la mesure du possible. En général, vous pouvez changer n'importe quel nom du singulier au pluriel pour avoir l'accord entre sujet, verbe et pronom et éviter l'utilisation de pronoms spécifiques au genre comme « lui », « elle », « son » ou « sa ».
  - Méfiez-vous des pronoms impersonnels et potentiellement ambigus. Si vous utilisez l'un des pronoms personnels suivants, n'oubliez pas de répondre « de quoi ? », « de qui ? », ou « comme quoi ? » dans la phrase.
    - tous, un autre, tout
    - chaque, soit
    - quelques, beaucoup, ni, aucun,
    - un, autre
    - même, plusieurs, certains, tel
    - que, eux, ceux-ci, ceux

### Soyez rapide et concis {#being-swift-and-concise}

- La documentation est solide et utile lorsque les bons mots et les phrases appropriés sont utilisés.
  - Utilisez des mots courants et connus dans la mesure du possible.
  - Évitez le langage fleuri et les phrases littéraires excessives.
  - Évitez le jargon, les mots familiers et les phrases idiomatiques.
  - Évitez les adverbes et les affirmations subjectives. Par exemple, n'utilisez pas de mots et de phrases qui incluent facilement, rapidement, simplement. Si nécessaire, il est également préférable d'éviter d'exagérer plutôt que d'en faire trop.
  - N'utilisez pas de phrases qui créent une ambiguïté. Par exemple, au lieu de dire « lorsque cette version sera active... », utilisez : « une fois que cette version sera active ».
  - Faites attention au choix des mots. Utilisez « puisque » (ce qui implique une période de temps) au lieu de « parce que » (cause et résultat implicites) et utilisez « une fois que » (événement unique) au lieu de « après que » (à chaque fois que).
  - Évitez les points d'exclamation.
- Évitez d'ajouter des mots ou des phrases inutiles. Quelques exemples :
  - Plutôt que de dire « et puis », utilisez « puis ».
  - Plutôt que de dire « afin de », utilisez « pour ».
  - Plutôt que de dire « de même que », utilisez « et ».
  - Plutôt que de dire « via », utilisez un mot approprié comme « en utilisant », « à travers » ou « par le biais de ».
- Utilisez un ton de conversation qui n'est pas trop formel, mais qui doit rester professionnel.
- Clarté : donnez vie au mot ou à la phrase dans la mesure du possible. Par exemple :
  - Plutôt que de dire « p. ex. », utilisez « par exemple ».
  - Plutôt que de dire « c.-à-d. », utilisez « c'est-à-dire » ou réécrivez la phrase pour clarifier le sens sans aucune qualification supplémentaire.
  - Plutôt que de dire « etc. », utilisez « et ainsi de suite » ou modifiez le contenu pour faire disparaître ce terme. Au lieu d'écrire « etc. » pour terminer une liste d'exemples, concentrez-vous sur un exemple ou deux et utilisez « comme ».
  - Au lieu d'écrire « mise en garde », utilisez un mot approprié tel que « avis », « avertissement » ou « attention ».
  -    

## Structure {#structure}

Les documents doivent être organisés en sections. Chaque section doit être responsable de présenter un thème ou un sujet. Dans chaque section, il y aura un ou plusieurs paragraphes. Chaque paragraphe ne devrait transmettre qu'une seule notion. Essayez d'éviter de répéter les mêmes notions dans différentes sections, et divisez les paragraphes qui ont plusieurs points de discussion. Le lecteur doit comprendre le sujet d'un paragraphe à partir de sa première phrase.

## Documentation produit {#product-documentation}

Si vous rédigez quelque chose sur un produit spécifique, assurez-vous que le document ressemble à ce produit. Auparavant, la documentation Polygon était généralisée, basée sur le PoS de Polygon. Aujourd'hui, il existe plusieurs produits basés sur Polygon, et les contributeurs doivent se méfier des ajouts.

Par exemple, « déployer un contrat intelligent sur Polygon en utilisant #### » est ambigu. Si le tutoriel fait référence au PoS de Polygon, il faut préciser, comme par exemple, « déployer un contrat intelligent sur le PoS de Polygon en utilisant #### ». Utilisez le même exemple avec un cumul Polygon, comme pour Polygon Hermez, « déployer un contrat intelligent sur Polygon Hermez en utilisant #### ».

Assurez-vous que la documentation du produit, qu'il s'agisse d'un guide général ou d'un tutoriel, est ajoutée au bon hub de documentation produit. Pour la plupart des documents, leur référence devrait se trouver dans l'un des hubs généraux (par exemple, « Développer » ou « Valider »), mais le document en question se trouvera dans la documentation produit. Vous devrez référencer le document dans le hub en l'ajoutant à `sidebars.js`. Toutefois, le document en question existera dans son hub de documentation produit respectif, et il redirigera l'utilisateur une fois qu'il aura cliqué dessus. La même directive s'applique à la plupart des documents. Leur référence doit exister dans l'un des hubs généraux, mais le document en question se trouvera dans la documentation produit.

La plupart des documents basés sur l'API de Polygon Wiki se présentent sous la forme de documents de référence, à l'exception des API mentionnées dans les tutoriels. Par exemple, la documentation de l'API sur Matic.js fournit des informations sur la structure, les paramètres et les valeurs de retour pour chaque fonction ou méthode de l'API.

## Documentation API {#api-documentation}

Tenez compte des éléments suivants pour la documentation d'une API :

* Une introduction solide qui fournit un point de départ.
* Une description claire de l'appel ou de la demande. Décrivez le rôle du point de terminaison.
* Une liste complète des paramètres :
  * Types de paramètres
  * Expressions syntaxiques avec espaces réservés affichant les paramètres disponibles
  * Formatage spécial
* Exemples de code pour plusieurs langues.
* Un exemple d'appel avec le résultat escompté.
* Codes d'erreur. Cas marginaux.
* Instructions sur la façon d'acquérir des clés API, si nécessaire.
* Il est toujours utile de noter les FAQ ou les scénarios courants.
* Liens vers des ressources supplémentaires telles que des publications sur les réseaux sociaux, des blogs ou du contenu vidéo.
