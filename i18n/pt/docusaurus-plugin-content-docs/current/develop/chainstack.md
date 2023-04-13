---
id: chainstack
title: Implante um Contrato Inteligente Usando Chainstack e Fundição
sidebar_label: Using Chainstack
description:  Usar Chainstack e Fundição para desenvolver um Contrato Inteligente no Polygon
keywords:
  - docs
  - matic
  - polygon
  - build
  - deploy smart contract
  - chainstack
  - foundry
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Visão geral {#overview}

Esta seção orienta-o através da implantação de um contrato Hello World usando [Chainstack](https://chainstack.com/build-better-with-polygon/) e [Foundry](https://github.com/gakonst/foundry/) no testnet Polygon Mumbai.

O Chainstack fornece infraestrutura para aplicativos baseados no Ethereum e outros blockchains. Eles mantêm nós e garantem sua conexão com a rede e também oferecem uma interface para interagir com a rede e as redes de teste

Foundry é um conjunto de ferramentas para o desenvolvimento de aplicações Ethereum escrito em Rust. Ele fornece testes, interação com contratos inteligentes EVM, envio de transações e recuperação de dados do blockchain.

:::tip

Se tiver alguma dúvida, entre em contato com o servidor do [<ins>Chainstack Discord</ins>](https://discord.com/invite/Cymtg2f7pX).

:::

## O que irá aprender {#what-you-will-learn}

Criar um contrato Hello World, usando a Chainstack para implantar um nó da Polygon e o Foundry para implantar o contrato.

## O que irá fazer {#what-you-will-do}

1. Implantar um nó da Polygon usando a Chainstack
2. Configurar o Foundry
3. Criar o contrato inteligente
4. Implantar o contrato inteligente

## Implantar um nó Polygon Mumbai {#deploy-a-polygon-mumbai-node}

Precisa de um nó para implantar um contrato inteligente na rede de blockchain. Siga as etapas abaixo para colocar o seu nó em funcionamento e executar:

**Etapa 1 →** Inscrever-se no [Chainstack](https://console.chainstack.com/user/account/create)

![img](/img/chainstack/sign-up.png)

**Etapa 2 →** Siga as instruções sobre como [implantar um nó de Mumbai](https://docs.chainstack.com/platform/join-a-public-network#join-a-polygon-pos-network)

![img](/img/chainstack/join-network.png)

**Etapa 3 →** Obter [o endpoint HTTPS do nó implantado](https://docs.chainstack.com/platform/view-node-access-and-credentials)

## Instalar o Foundry {#install-foundry}

Foundry é um conjunto de ferramentas para trabalhar com contratos inteligentes. Para começar a trabalhar com ela, é necessário instalar primeiro a linguagem de código Rust.

1. [Instale a Rust](https://www.rust-lang.org/tools/install).
1. [Instale o Foundry](https://github.com/gakonst/foundry/).

## Inicializar com o Foundry {#initialize-with-foundry}

Para criar um projeto padrão, navegue até ao seu diretório de trabalho e execute:

```
forge init PROJECT_NAME
// PROJECT_NAME - name of project
```

## Financiar a sua conta {#fund-your-account}

Irá precisar de uma conta de carteira para implantar o contrato inteligente. Pode usar o [Metamask](https://metamask.io/) para isso. Também precisa de pagar gás na rede para implantar o contrato. Basta copiar o endereço da carteira e obter token Mumbai MATIC [através da faucet](https://faucet.polygon.technology/).

## Criar o contrato Hello World {#create-the-hello-world-contract}

No projeto Foundry inicializado em `src/`, crie `HelloWorld.sol`:

```
// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

## Implantar o contrato {#deploy-the-contract}

Neste ponto, está pronto para implantar o seu contrato:

* Tem o seu próprio nó na rede Polygon Mumbai através do qual irá implantar o contrato.
* Tem Foundry que irá usar para implantar o contrato.
* Tem uma conta financiada que irá implantar o contrato.

Para implantar o contrato execute:

```bash
forge create HelloWorld --constructor-args "Hello" --contracts CONTRACT_PATH --private-key PRIVATE_KEY --rpc-url HTTPS_ENDPOINT
```

Aqui,

* CONTRACT_PATH — caminho para o seu ficheiro `HelloWorld.sol`.
* PRIVATE_KEY — a chave privada da sua conta.
* HTTPS_ENDPOINT — [o endpoint do seu nó](https://docs.chainstack.com/platform/view-node-access-and-credentials).

Exemplo:

```sh
forge create HelloWorld --constructor-args "Hello" --contracts /root/foundry/src/HelloWorld.sol --private-key d8936f6eae35c73a14ea7c1aabb8d068e16889a7f516c8abc482ba4e1489f4cd --rpc-url https://nd-123-456-789.p2pify.com/3c6e0b8a9c15224a8228b9a98ca1531d
```

:::tip

Pode verificar sempre a implantação do contrato no [<ins>Mumbai Polygonscan</ins>](https://mumbai.polygonscan.com/) usando o hash recém-gerado na última etapa.

:::

## Testar o contrato {#test-the-contract}

Há um comando `forge test` no caso de necessitar de verificar se o contrato está a funcionar corretamente. Foundry fornece muitas [opções](https://book.getfoundry.sh/reference/forge/forge-test) (sinalizadores) para testes mais específicos. Saiba mais sobre como escrever testes, testagem avançada e outros recursos na [documentação do Foundry](https://book.getfoundry.sh/forge/tests).

**Parabéns! Você implantou seu contrato inteligente Hello World no Polygon.**

Consulte também os documentos Chainstack para mais [<ins>tutoriais</ins>](https://docs.chainstack.com/tutorials/polygon/) e [<ins>ferramentas</ins>](https://docs.chainstack.com/operations/polygon/tools) relacionados com a Polygon.
