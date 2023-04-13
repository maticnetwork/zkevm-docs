---
id: contributor-guidelines
title: Como contribuir
sidebar_label: Contributor guidelines
description: Prepare-se para a sua contribuição futura
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
Sinta-se livre para [levantar um problema no nosso repositório do Polygon Wiki](https://github.com/maticnetwork/matic-docs/issues)
:::

## Identifique uma área para a qual contribuir {#identify-an-area-to-contribute-to}

Existem várias maneiras de identificar uma área do Wiki para a qual possa contribuir:

- O mais fácil é entrar em contacto com um dos [mantenedores de Wiki](/docs/contribute/community-maintainers) 
dizendo “Quero contribuir para o Wiki da Polygon". Eles vão trabalhar com você para encontrar
uma área para você contribuir.
- Se você tiver uma contribuição específica em mente, mas não souber ao certo se ela é apropriada, entre em contacto direto com um [mantenedores do Wiki](/docs/contribute/community-maintainers).
- Se não tiver uma contribuição específica em mente, também pode procurar os problemas
rotulados como `help wanted` nos [repositórios de Polygon no GitHub](https://github.com/maticnetwork).
- Questões que também têm o `good first issue` rótulo são consideradas ideais para
iniciantes.

## Adicionar à documentação da Polygon {#add-to-the-polygon-documentation}

  - Se precisar adicionar ou alterar qualquer coisa no Wiki da Polygon, abra uma solicitação PR
  referente ao `master`branch (favor verificar a amostra PR).
  - A equipa de documentação vai rever o PR ou entrar em contacto conforme apropriado.
  - Repositório: https://github.com/maticnetwork/matic-docs
  - PR de amostra: https://github.com/maticnetwork/matic-docs/pull/360

:::tip
Se quiser executar a nossa Wiki localmente na sua máquina, verifique a secção [que executa a Wiki localmente.](https://github.com/maticnetwork/matic-docs#run-the-wiki-locally) Se estiver adicionando um novo documento, é recomendável ter apenas um resumo/introdução básicos e um link para o seu Github ou documentação para mais detalhes.
:::

## Regras do Git {#git-rules}

Usamos `gitchangelog` para todos os nossos repositórios para registro de alterações. Para isso, precisamos
cumprir a seguinte convenção para mensagem de commit. Não haverá nenhuma fusão se a
convenção não for seguida.

### Convenção de mensagens de commit {#commit-message-convention}

A seguir estão sugestões para o que é aconselhável adicionar
nas sua mensagens de commit. Talvez você queira separar os seus commits aproximadamente em seções grandes:

- por intenção (por exemplo: novo, correção, alteração …)
- por objeto (por exemplo: doc, embalagem, código …)
- por público (por exemplo: programador, testador, utilizadores …)

Além disso, você pode querer marcar alguns commits:

- Como compromissos “menores” que não devem ser colocados no seu registro de alterações (alterações cosméticas,
pequenos erros de digitação nos comentários…).
- Como “refactorar” se você não tiver nenhuma alteração significativa de recursos. Mesmo assim, isso
não deve ser incluído no registro de alterações exibido para o utilizador final, mas
pode ser de algum interesse se tiver um registro de alterações para programador.
- Também pode utilizar a tag “api" para marcar as alterações de API ou se for uma API nova ou similar.

Tente escrever a sua mensagem de commit focando o máximo possível na funcionalidade de utilizador.

:::note Exemplo

Este é um registro de git padrão `--oneline`para mostrar como as informações podem ser armazenadas:

```
* 5a39f73 fix: encoding issues with non-ascii chars.
* a60d77a new: pkg: added ``.travis.yml`` for automated tests.
* 57129ba new: much greater performance on big repository by issuing only one shell command for all the commits. (fixes #7)
* 6b4b267 chg: dev: refactored out the formatting characters from GIT.
* 197b069 new: dev: reverse ``natural`` order to get reverse chronological order by default. !refactor
* 6b891bc new: add utf-8 encoding declaration !minor
```

:::

Para mais informações, consulte
[Quais são algumas boas maneiras de gerir um registro de alterações usando o Git?](https://stackoverflow.com/questions/3523534/good-ways-to-manage-a-changelog-using-git/23047890#23047890).

Para mais detalhes, consulte [https://chris.beams.io/posts/git-commit/](https://chris.beams.io/posts/git-commit/).
