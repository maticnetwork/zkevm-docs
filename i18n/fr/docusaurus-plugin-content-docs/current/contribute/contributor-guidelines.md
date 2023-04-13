---
id: contributor-guidelines
title: Comment contribuer ?
sidebar_label: Contributor guidelines
description: Préparez votre prochaine contribution
keywords:
  - docs
  - matic
  - polygon
  - contribute
  - contributor
  - contributing
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: orientation
---

:::tip
N'hésitez pas à [soulever un problème sur notre référentiel Wiki Polygon](https://github.com/maticnetwork/matic-docs/issues)
:::

## Identifiez un secteur dans lequel vous pouvez apporter votre contribution {#identify-an-area-to-contribute-to}

Il existe plusieurs façons d'identifier un domaine du Wiki dans lequel vous pouvez apporter votre contribution :

- Le plus simple est de contacter l'un des [mainteneurs du Wiki](/docs/contribute/community-maintainers)  en disant « Je veux contribuer au Polygon Wiki ». Ils trouveront avec vous un domaine auquel vous pourrez contribuer.
- Si vous avez une contribution spécifique en tête mais que vous n'êtes pas sûr, demandez si la contribution est appropriée en contactant directement l'un des [mainteneurs du Wiki](/docs/contribute/community-maintainers).
- Si vous n'avez pas de contribution spécifique à l'esprit, vous pouvez également parcourir les problèmes portant la mention `help wanted` figurant dans le [référentiel GitHub de Polygon](https://github.com/maticnetwork).
- Les problèmes portant la mention `good first issue` sont considérés comme idéaux pour les débutants.

## Ajouter à la documentation Polygon {#add-to-the-polygon-documentation}

  - Si vous avez besoin d'ajouter ou de modifier quoi que ce soit dans Polygon Wiki, veuillez créer une PR dans la branche `master` (veuillez vérifier l'échantillon de PR)
  - L'équipe chargée de la documentation examinera la PR ou prendra les mesures nécessaires.
  - Référentiel : https://github.com/maticnetwork/matic-docs
  - Échantillon de PR : https://github.com/maticnetwork/matic-docs/pull/360

:::tip
Si vous souhaitez exécuter notre Wiki localement sur votre machine, consultez la section [exécutant le](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally) Wiki localement. Si vous ajoutez un nouveau document, il est recommandé d'avoir simplement un résumé / introduction de base et un lien vers votre Github ou documentation pour plus de détails.
:::

## Règles Git {#git-rules}

Nous utilisons `gitchangelog` pour toutes nos archives pour les journaux des modifications. Pour cela, nous devons respecter la convention suivante pour le message de démarrage. La fusion ne sera pas possible si vous ne respectez pas cette convention.

### Convention de message de démarrage {#commit-message-convention}

Voici quelques suggestions utiles sur ce qu'il pourrait être utile de penser à ajouter dans vos messages de démarrage. Vous pouvez également diviser vos contributions en grandes sections :

- par intention (par exemple : nouveau, correction, modification...)
- par objet (par exemple : doc, packaging, code...)
- par audience (par exemple : développeur, testeur, utilisateurs…)

De plus, vous pouvez étiqueter certaines contributions :

- « Mineure » pour les contributions qui ne devraient pas être générées dans votre journal des modifications (modifications superficielles, petite erreur de frappe dans les commentaires...).
- « Refactor» si vous n'avez pas vraiment de changements significatifs. Ainsi, ceci ne devrait pas faire partie du journal des modifications affiché à l'utilisateur final, par exemple, mais pourrait être intéressant si vous avez un journal des modifications pour les développeurs.
- Vous pouvez également marquer avec « api » les changements d'API ou s'il s'agit d'une nouvelle API ou similaire.

Essayez d'écrire votre message de démarrage en ciblant la fonctionnalité utilisateur aussi souvent que possible.

:::note Exemple

Il s'agit d'un journal git standard `--oneline` qui montre la manière dont ces informations peuvent être stockées :

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

Pour plus d'informations, consultez [Comment bien gérer un journal des modifications à l'aide de Git ?](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890).

Pour plus de détails, voir [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/).
