---
id: replit
title: Implante um Contrato Inteligente Usando Replit
sidebar_label: Using Replit
description: Implante contratos inteligentes usando o ReplitIDE no Polygon
keywords:
  - docs
  - matic
  - replit
  - deploy
  - smart contract
  - polygon
  - IDE
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

## Visão geral {#overview}

[Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide) é uma plataforma de codificação que permite escrever código e aplicações de anfitrião. A Replit suporta [a linguagem de programação Solidity](https://replit.com/@replit/Solidity-starter-beta?v=1) e, como tal, disponibiliza todas as características e funcionalidades para os programadores web3 para criar e implantar contratos inteligentes.

Este artigo orienta-o para construir e implantar um contrato inteligente de solidez no Polygon usando o Modelo de Desenvolvimento [de IDE de Replit](https://replit.com/signup) e [de solidity (Iniciador de solidity do Solidity beta)](https://replit.com/@replit/Solidity-starter-beta?v=1).

## O que irá fazer {#what-you-will-do}

- Criar uma conta Replit
- Criar um ambiente Repl
- Implementar um projeto de amostra na rede Polygon Mumbai
- Verificar o contrato
- Publicar o seu projeto num perfil Replit pessoal.

:::tip

Para obter exemplos adicionais sobre o Solidity com Replit, pode ler o artigo <ins>**[Começar com Replit](https://blog.replit.com/solidity)**</ins> ou verificar <ins>**[a documentação do Replit e o tutorial do contrato de Escrow da Replit](https://docs.replit.com/tutorials/33-escrow-contract-with-solidity)**</ins>
:::

## Pré-requisitos {#prerequisites}

Não é necessário configurar ambiente local para implantar o seu contrato inteligente de solidez no Polygon usando a Replit.

Necessita de uma carteira web3 baseada no navegador para interagir com a Testnet Mumbai da Polygon e os contratos implantados. Se já está a usar a MetaMask, recomenda-se que crie uma conta nova para testar com a Replit. Pode fazer isto a partir do menu da conta, que aparece ao clicar no avatar da conta no canto superior direito da interface MetaMask.

Deve configurar todos os seguintes pré-requisitos para poder implantar o seu contrato inteligente solidity na Polygon:

1. [Criar uma conta Replit](https://replit.com/signup)
2. [Fazer download da carteira MetaMask](/docs/develop/metamask/hello)
3. [Configure a Polygon na MetaMask](/docs/develop/metamask/config-polygon-on-metamask)
4. [Obter tokens da testnet](https://faucet.polygon.technology)

## Trabalhar com uma Repl {#working-with-a-repl}

Cada Repl que cria é um ambiente de desenvolvimento e produção totalmente funcional. Siga estas etapas para criar um solidity starter Replit:

1. [Iniciar sessão](https://replit.com/login) ou [criar uma conta](https://replit.com/signup). Depois de criar a [conta de Replit](https://docs.replit.com/tutorials/01-introduction-to-the-repl-it-ide), a tela inicial incluirá um painel onde pode visualizar, criar projetos e gerenciar a conta.

![img](/img/replit/dashboard.png)

2. Depois de iniciar sessão, crie uma resposta de iniciação do Solidity, selecione **+ Criar Repl** no painel esquerdo ou **+** no canto superior direito da tela.

![img](/img/replit/solidity.png)

3. Selecione o modelo [**de Iniciação de Solidity (beta)**](https://replit.com/@replit/Solidity-starter-beta?v=1) e dê um título ao seu projeto.

4. Clique em **+ Criar Repl** para criar o seu projeto.

:::note

O repl de iniciação do Solidity vem com uma interface amigável ao navegador, construída usando a <ins>**[API do Web3 Ethereum](https://web3js.readthedocs.io/en/v1.5.2/)**</ins> JavaScript, que pode usar para implantar e interagir com nossos contratos. Vamos implantar no testnet do Replit, uma versão personalizada do blockchain do Ethereum gerenciado pelo Replit e otimizado para testes.

:::

## Implantar na Polygon {#deploy-on-polygon}

Certifique-se de que seguiu a lista de **Pré-requisitos** acima para que esteja pronto para implantar e interagir com o seu contrato inteligente.

1. Clique em **Executar** (na Parte Superior) para instalar todos os pacotes relevantes e iniciar a IU da implantação do contrato.

2. Conecte a carteira do MetaMask à interface da web e mude para o [Testnet de Mumbai](docs/develop/metamask/config-polygon-on-metamask).

![img](/img/replit/connect.png)

3. Clique na **carteira** **de** conexão, selecione a conta e selecione Conectar.

![img](/img/replit/deploy-list.png)

4. Na lista de suspensões, selecione o contrato que deseja implantar. Clique em **implantar**.

5. Irá receber uma janela de pop-up do MetaMask pedindo a sua confirmação. Aprovar a transação da sua carteira para implantar o seu contrato.

## Verificar e testar o seu contrato {#verifying-and-testing-your-contract}

Quando o contrato for implantado, [navegue para Polyganscan](https://mumbai.polygonscan.com/) para procurar a sua conta, visualize o seu contrato implantado e copie o endereço da sua conta.

Assim que o contrato for implantado, ele será exibido como caixas expansíveis abaixo da caixa de dropdown. Abra-o e observe todas as funções disponíveis. Já pode interagir com o seu contrato, através da interface do utilizador fornecida ou do URL partilhável apresentado na interface.

## Publicar na Replit​ {#publish-to-replit}

A Replit permite que publique os seus projetos num perfil pessoal. Após a publicação, os projetos serão apresentados na sua página de destaque para que outros possam explorar, interagir, clonar e colaborar.

Siga as etapas abaixo para publicar seus projetos na Replit:

1. Selecione o título do projeto na parte superior do ecrã.
2. Concluir o nome do projeto e a descrição e clique em **Publicar**.
