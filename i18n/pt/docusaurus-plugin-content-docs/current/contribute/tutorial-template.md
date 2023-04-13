---
id: tutorial-template
title: Modelo tutorial geral
sidebar_label: Tutorial template
description: Siga o modelo de tutorial ao redigir um tutorial técnico.
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

Este modelo deve ser adotado para contribuir com um tutorial da Polygon
Wiki. Pode optar por contribuir para um tutorial num tópico da sua escolha.

## Orientações gerais {#general-guidelines}

* O escopo do tutorial deve ficar bem claro no título.
* O tutorial deve conseguir descrever com precisão os recursos
e as funcionalidades do(s) produto(s) ou serviço(s).
* Tente fazer com que o tutorial seja objetivo e conciso, mas detalhe conceitos mais importantes
quando apropriado. Dê informações básicas e contextualize melhor sempre que possível.
* Nas etapas de configuração e implementação, seja específico.
* Por favor, faça o possível para adicionar imagens de apoio, ícones ou capturas de tela que
complementem o conteúdo escrito.
  > A equipa de documentação também ficaria satisfeita em trabalhar com você na criação de diagramas.
* Lembre-se do público para o qual está a escrever. Se o material tiver um certo nível de dificuldade,
ele deve ser mencionado no tutorial.
  > Se houver etapas que um utilizador deve realizar antes de executar um tutorial, não esqueça de mencionar.
* A equipa de documentação ficaria satisfeita em trabalhar em conjunto na criação do tutorial.
* Lembre-se de considerar o **[Guia de Estilo](writing-style.md)**.

:::caution Como atualizar tutoriais

Se notar que os tutoriais atuais no Wiki da Polygon
não seguem este modelo, é porque a equipa de documentação
decidiu implementar um padrão, para que o fluxo do tutorial seja consistente em
todos os tutoriais. A equipa está a trabalhar na atualização destes tutoriais
para se assemelhar a este modelo. Se estiver interessado, também pode atualizar um
tutorial existente para reestruturá-lo.

:::

## Seções de tutorial {#tutorial-sections}

### Visão geral {#overview}

Explique o(s) produto(s) ou serviço(s) que estão a ser discutidos no tutorial.
Dê informações básicas para o propósito do tutorial e o que
tutorial pretende apresentar. O tutorial deve sempre ser baseado em usar um
produto da Polygon.

### O que aprenderá {#what-you-ll-learn}

Faça um resumo do que o utilizador aprenderá em todo o tutorial.

:::note Exemplo

Aprenderá a usar o Truffle Suite para construir dApps
Polygon.

:::

#### Resultados de aprendizagem {#learning-outcomes}

Esboça os resultados de aprendizagem.

:::note Exemplo

1. Aprenderá sobre Fauna.
2. Aprenderá como pode usar o ReactJS para a IU do seu DApp.
3. Aprenderá como proteger os dados de dApp.

:::

Mencione os pré-requisitos e com o que o utilizador já
deve estar familiarizado. Vincule a documentação necessária para áreas
sobre as quais o utilizador já deve ter conhecimento.

:::note Exemplo

Antes de iniciar este tutorial, deve entender os conceitos básicos
de desenvolvimento de dApp baseado em EVM. Consulte “estes documentos” para mais informações.

:::

### O que vai fazer {#what-you-ll-do}

Esboçar os passos no tutorial e as ferramentas que serão usadas.

:::note Exemplo

Usará o Solidity para criar um contrato inteligente num ambiente de ChainIDE.

1. Como configurar uma carteira
2. Escreva um contrato inteligente ERC-721
3. Compile um contrato inteligente ERC-721
4. Implemente um contrato inteligente ERC-721
5. Crie um ficheiro nivelado usando a Biblioteca Flattener.
6. Verifique um contrato inteligente
7. Cunhar NFT

:::

### O próprio tutorial {#the-tutorial-itself}

Em geral, o tutorial pode ser apresentado na melhor categorização que
o escritor considera adequado. Isso deve ser refletido no lugar [O que vai fazer](#what-youll-do)
da seção. No entanto, as seções de tutorial devem tocar nessas principais categorias:

> Leve em consideração as palavras-chave e pense no SEO ao
> criar as seções.

#### Crie a sua aplicação {#build-your-application}

O principal conteúdo do tutorial. Isso pode incluir seções como “instalação”, “configuração”,
e “implementação” para citar alguns.

#### Execute ou implemente a sua aplicação {#run-or-deploy-your-application}

Explique como o utilizador deve executar ou implantar a aplicação.

#### Teste a sua aplicação {#test-your-application}

Podem ser realizados testes para um contrato inteligente,
verificação, etc.

### Próximos passos {#next-steps}

Conclua o tutorial e reflita sobre os resultados de aprendizagem.
Esboce os próximos passos que o utilizador pode dar.

:::note Exemplo

Parabéns por implementar o seu contrato inteligente. Agora sabe como usar o ChainIDE
para criar e implantar contratos inteligentes. Considere usar “este tutorial”.

:::
