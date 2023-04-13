---
id: contributor-guidelines
title: Cómo Contribuir
sidebar_label: Contributor guidelines
description: Prepárate para tu próxima contribución
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
Siéntase libre de [plantear un problema en nuestro repositorio de la Wiki de Polygon](https://github.com/maticnetwork/matic-docs/issues)
:::

## Identificar un área para contribuir a {#identify-an-area-to-contribute-to}

Hay varias formas de identificar un área en Wiki donde puedes contribuir:

- Lo más fácil es ponerse en contacto con uno de los [mantenedores de Wiki](/docs/contribute/community-maintainers)  diciendo "Quiero ayudar a contribuir a Polygon Wiki". Trabajarán contigo para encontrar un área para que contribuyas.
- Si tienes una contribución específica en mente, pero no estás seguro de ello, confirma si la contribución es apropiada poniéndote en contacto directamente con uno de los [mantenedores](/docs/contribute/community-maintainers) de Wiki.
- Si no tienes una contribución específica en mente, también puedes navegar por los problemas etiquetados como `help wanted` en el [repositorio Polygon GitHub](https://github.com/maticnetwork).
- Los problemas que adicionalmente tiene la etiqueta `good first issue` son considerados ideales para
los primerizos.

## Agregarlos a la documentación de Polygon {#add-to-the-polygon-documentation}

  - Si necesitas agregar o cambiar algo en Polygon Wiki tramita una solicitud de extracción dirigida a la sucursal `master` (véase el ejemplo PR).
  - El equipo de documentación revisará el PR o se pondrá en contacto como corresponda.
  - Repositorio: https://github.com/maticnetwork/matic-docs
  - Muestra PR: https://github.com/maticnetwork/matic-docs/pull/360

:::tip
Si quieres ejecutar nuestro Wiki de forma local en tu máquina, revisa la sección [que ejecuta el](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally) Wiki de forma local. Si estás agregando un nuevo documento, se recomienda tener un resumen o introducción básica y un enlace a tu Github o la documentación para obtener más detalles.
:::

## Reglas de Git {#git-rules}

Usamos `gitchangelog` para todos nuestros repositorios para cambiar registros. Para eso, necesitamos cumplir con la siguiente convención para un mensaje de confirmación. No habrá fusión si no sigues esta convención.

### La convención de mensajes de confirmación  {#commit-message-convention}

A continuación encontrarás sugerencias de lo que podría ser útil para que te plantees agregar a tus mensajes de confirmación. Quizás quieras separar más o menos tus confirmaciones en grandes secciones:

- por intención (por ejemplo: nuevo, corregir, cambiar...)
- por objeto (por ejemplo: documento, embalaje, código...)
- por audiencia (por ejemplo: devolución, probador, usuarios...)

Además, podrías desear etiquetar algunas confirmaciones:

- Como confirmaciones "menores" que no deberían obtener salida a tu registro de cambios (cambios cosméticos, pequeños errores en las confirmaciones...).
- Como "refactor" si realmente no tienes ningún cambio significativo de características. Así esto no debería ser también parte del cambio de registros mostrado al usuario final, por ejemplo, pero podría ser de algún interés si tienes un cambio de registros de desarrollador.
- Puedes etiquetar también con "api" para marcar los cambios API o si se trata de una API nueva o similar.

Intenta escribir tu mensaje de confirmación centrándote en la funcionalidad del usuario tantas veces como puedas.

:::note Ejemplo

Esto es un registro estándar de git `--oneline` para mostrar cómo esta información puede guardarse:

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

Para obtener más información, consulta [¿Cuáles son algunas buenas formas de administrar un registro de cambios utilizando Git?](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890)

Para obtener más información, visita [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/).
