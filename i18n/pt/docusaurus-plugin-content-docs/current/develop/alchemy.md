---
id: alchemy
title: Implante um Contrato Inteligente Usando Alchemy
sidebar_label: Using Alchemy
description: Guia para implantar contratos inteligentes usando Alchemy
keywords:
  - docs
  - matic
  - polygon
  - alchemy
  - create smart contract
  - deploy on polygon
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

## Visão geral {#overview}

Este tutorial é para programadores que sejam principiantes no desenvolvimento da blockchain Ethereum ou que desejem entender os fundamentos de implantação e interação com contratos inteligentes. Ele irá orientá-lo através da criação e implantação de um contrato inteligente na rede de testes Polygon Mumbai usando uma carteira de criptomoedas ([Metamask](https://metamask.io)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) e [Alchemy](https://alchemy.com/?a=polygon-docs).

:::tip

Se tiver dúvidas ou preocupações, entre em contato com a equipe da Alchemy através do servidor [<ins>oficial do</ins>](https://discord.gg/gWuC7zB) Discord.

:::

## O que irá aprender {#what-you-will-learn}

Para criar um contrato inteligente neste tutorial, irá aprender a usar plataforma do Alchemy para:
- Criar um aplicativo de contratos inteligentes
- Verificar o saldo de uma carteira
- Verificar chamadas de contratos num explorador de blockchain

## O que irá fazer {#what-you-will-do}

Seguindo o tutorial, irá:
1. Começar a criar uma aplicação no Alchemy
2. Criar o endereço de uma carteira com MetaMask
3. Adicionar saldo à carteira (usando tokens de teste)
4. Usar o Hardhat e o Ethers.js para compilar e implantar o projeto
5. Verificar o status do contrato na plataforma da Alchemy

## Criar e implantar o seu Contrato Inteligente {#create-and-deploy-your-smart-contract}

### Conecte-se à rede Polygon {#connect-to-the-polygon-network}

Existem várias maneiras de fazer solicitações para a chain Polygon PoS. Em vez de executar o seu próprio nó, irá usar uma conta gratuita na plataforma de programador do Alchemy e interagir com a API Polygon PoS do Alchemy para comunicar com a chain Polygon PoS. A plataforma consiste em um conjunto completo de ferramentas de desenvolvedores - isto inclui a capacidade de monitorar pedidos, análise de dados que demonstre o que acontece sob o capô durante a implantação de contratos inteligentes, APIs aprimoradas (Transact, NFTs, etc) e um SDK do ethers.js.

Se ainda não tiver uma conta do Alchemy, comece por se inscrever para uma conta gratuita [aqui](https://www.alchemy.com/polygon/?a=polygon-docs). Depois de criar a sua conta, tem a opção de criar imediatamente a sua primeira aplicação antes de chegar ao painel.

![img](/img/alchemy/alchemy-dashboard.png)

### Criar o aplicativo (e chave da API) {#create-your-app-and-api-key}

Depois de criar uma conta do Alchemy, terá de gerar uma chave da API criando um aplicativo. Isso autentica as solicitações feitas no testnet do Polygon Mumbai. Se não estiver familiarizado com testnets, consulte [este guia para testnet](https://docs.alchemyapi.io/guides/choosing-a-network).

Para gerar uma nova chave de API, navegue até a guia **Aplicativos** na barra de navegação do painel do Alchemy e selecione a sub-tab. **Criar App**

![img](/img/alchemy/create-app.png)

Nome do novo aplicativo **Hello World**, oferecer uma descrição curta, selecionar **Polygon** para a chain e escolher **Polygon** para a sua rede.

Finalmente, clique no aplicativo **Criar e** o novo aplicativo deve aparecer na tabela abaixo.

### Criar um endereço de carteira {#create-a-wallet-address}

O Polygon PoS é uma solução de escalonamento da camada 2 para Ethereum. Portanto, precisamos de uma carteira Ethereum e adicionar um URL do Polygon personalizado para enviar e receber transações no testnet do Polygon Mumbai. Para este tutorial, iremos usar o MetaMask, uma carteira de criptomoeda compatível com o navegador usada para gerenciar o endereço da sua carteira. Se quiser saber mais sobre como funcionam as transações na Ethereum, consulte [este guia de transações](https://ethereum.org/en/developers/docs/transactions/) da Ethereum Foundation.

Para obter o URL do Polygon RPC personalizado da Alchemy, vá para o aplicativo **Hello World** no painel da Alchemy e clique em **Exibir a tecla** no canto superior direito. A seguir, copie a sua chave API HTTP do Alchemy.

![img](/img/alchemy/view-key.png)

Pode transferir e criar gratuitamente uma conta MetaMask [aqui](https://metamask.io/download.html). Depois de criar uma conta, siga estas etapas para configurar a rede Polygon PoS na sua carteira.

1. Selecione **Configurações** no menu suspenso no canto superior direito da carteira do MetaMask.
2. Selecione **Redes** no menu à esquerda.
3. Conecte a carteira ao Testnet de Mumbai usando os seguintes parâmetros:

**Nome da rede:** Polygon Mumbai Testnet

**Novo URL do RPC:** https://polygon-mumbai.g.alchemy.com/v2/your-api-key

**ChainID:** 80001

**Símbolo:** MATIC

**URL do Explorador de** blocos: https://mumbai.polygonscan.com/


### Adicionar teste do Polygon Mumbai {#add-polygon-mumbai-test-matic}

Irá precisar de alguns tokens do testnet para implantar o seu contrato inteligente na testnet de Mumbai. Para obter tokens de testnet, vá para o [Faucet Polygon](https://faucet.polygon.technology/) Mumbai, selecione **Mumbai**, selecione **Token MATIC** e insira o endereço da carteira Polygon e clique em **Enviar**. Devido ao tráfego de rede, pode levar algum tempo para receber os tokens do testnet.

Também pode usar [a faucet de Mumbai gratuita](https://mumbaifaucet.com/?a=polygon-docs) da Alchemy.

![img](/img/alchemy/faucet.png)

Irá ver os tokens testnet na sua conta MetaMask pouco depois.

### Verifique o saldo da carteira {#check-your-wallet-balance}

Para ter a certeza de que o seu saldo está lá, vamos fazer um pedido [eth\_getBalance](https://docs.alchemy.com/reference/eth-getbalance-polygon) usando a [ferramenta de composição do Alchemy](https://composer.alchemyapi.io/). Selecione **o** Polygon como chain, o **Polygon Mumbai** como rede, `eth_getBalance`como método e insira o seu endereço. Isto irá devolver o valor de MATIC na sua carteira. Veja [este vídeo](https://youtu.be/r6sjRxBZJuU) para as instruções sobre como utilizar a ferramenta de composição.

![img](/img/alchemy/get-balance.png)

Depois de inserir o endereço da conta do MetaMask e clicar em **Enviar Pedido**, deverá ver uma resposta que se parece com esta:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

:::info

Este resultado está em Wei, não ETH. Wei é a menor denominação de Éter. A conversão de Wei para Ether é: 1 Ether = 10^18 Wei. Assim, se convertermos "0xde0b6b3a7640000" para decimal, obtemos 1\*10^18, que é igual a 1 ETH. Isto pode ser mapeado para 1 MATIC com base no valor nominal.

:::

### Inicialize o projeto {#initialize-your-project}

Primeiro, precisamos de criar uma pasta para o nosso projeto. Navegue até à sua [linha de comandos](https://www.computerhope.com/jargon/c/commandi.htm) e digite:

```bash
mkdir hello-world
cd hello-world
```

Agora que estamos dentro da nossa pasta do projeto, vamos usar `npm init` para inicializar o projeto. Se não tiver npm já instalado, siga [estas instruções](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (também iremos precisar de Node.js por isso transfira-o também!).

```bash
npm init # (or npm init --yes)
```

Não importa realmente como responde às perguntas de instalação, aqui está como fizemos, para referência:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{   
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Aprove o package.json e estamos prontos para seguir!

### Baixar [Hardhat](https://hardhat.org/getting-started/#overview)

Hardhat é um ambiente de desenvolvimento para compilar, implantar, testar e depurar o seu software Ethereum. Ajuda os programadores a construir localmente contratos inteligentes e dApps antes de implantar na chain ao vivo.

Dentro do nosso `hello-world`projeto, execute:

```bash
npm install --save-dev hardhat
```

Veja esta página para mais detalhes sobre [as instruções de instalação](https://hardhat.org/getting-started/#overview).

### Criar projeto do Hardhat {#create-hardhat-project}

Dentro da pasta do nosso projeto `hello-world` execute:

```bash
npx hardhat
```

Deve ver uma mensagem de boas-vindas e uma opção para selecionar o que deseja fazer. Selecione **criar um hardhat.config.js vazio**:

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

Isto irá gerar um `hardhat.config.js`ficheiro para nós, que é onde iremos especificar toda a configuração do nosso projeto.

### Adicionar pastas do projeto {#add-project-folders}

Para manter o nosso projeto organizado, criaremos duas novas pastas. Navegue até ao diretório raiz do seu projeto `hello-world` e na linha de comandos digite:

```bash
mkdir contracts
mkdir scripts
```

* `contracts/` é onde iremos manter o ficheiro de código do nosso contrato inteligente hello world
* `scripts/` é onde iremos manter os scripts para implantar e interagir com o nosso contrato

### Escrever o contrato {#write-the-contract}

Abra o projeto do **hello-world** no seu editor favorito, como o [VSCode](https://code.visualstudio.com). Os contratos inteligentes são escritos numa língua chamada Solidity, que é o que usaremos para escrever o nosso contrato `HelloWorld.sol`inteligente.

1. Navegue até a `contracts`pasta e crie um novo ficheiro chamado`HelloWorld.sol`
2. Em baixo está uma amostra de um contrato inteligente Hello World da [Ethereum Foundation](https://ethereum.org/en/) que iremos usar para este tutorial. Copie e cole o conteúdo abaixo para o seu ficheiro `HelloWorld.sol` e não se esqueça de ler os comentários para perceber o que este contrato faz:

```solidity
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

Este é um contrato inteligente que guarda uma mensagem após a criação e pode ser atualizado chamando a função `update`.

### Conecte-se com MetaMask e Alchemy {#connect-with-metamask-alchemy}

Criámos uma carteira MetaMask e uma conta Alchemy e escrevemos o nosso contrato inteligente, agora está na altura de conectar os três.

Todas as transações enviadas da sua carteira virtual requerem uma assinatura usando a sua chave privada única. Para dar esta permissão ao nosso programa, podemos guardar em segurança a nossa chave privada (e a chave API do Alchemy) num ficheiro de ambiente.

Primeiro, instale o pacote dotenv no nosso diretório de projeto:

```bash
npm install dotenv --save
```

A seguir, crie um ficheiro `.env` no diretório raiz do nosso projeto e adicione a sua chave privada MetaMask e o URL da API HTTP do Alchemy.

:::warning Aviso

O ficheiro de ambiente deve ser nomeado `.env`ou não será reconhecido como ficheiro de ambiente. Não lhe dê o nome `process.env` ou `.env-custom` ou outro.

Além disso, se estiver a usar um sistema de controle de versão como o git para gerenciar o projeto, **não** rastreie o `.env`arquivo. Adicionar `.env`ao seu `.gitignore`ficheiro para evitar publicar dados secretos.

:::

* Siga [estas instruções](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) para exportar a sua chave privada
* Para obter a chave da API do Alchemy HTTP (URL do RPC), navegue até o aplicativo **Hello World** no painel da conta e clique em **Exibir a chave** no canto superior direito.

O seu `.env` devem ter este aspeto:

```
API_URL = "https://polygon-mumbai.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

Para conectar estas variáveis ao nosso código, iremos referenciar estas variáveis no nosso `hardhat.config.js`ficheiro mais tarde neste tutorial.

### Instalar Ethers.js {#install-ethers-js}

Ethers.js é uma biblioteca que facilita a interação e a criação de solicitações ao Ethereum através do envolvimento [de métodos JSON-RPC padrão](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) com métodos mais fáceis de usar.

O Hardhat facilita a integração de [plugins](https://hardhat.org/plugins/) para ferramentas adicionais e funcionalidade alargada. Iremos tirar partido do [plugin Ethers](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) para a implantação do contrato. [Ethers.js](https://github.com/ethers-io/ethers.js/) tem métodos de implantação de contratos úteis.

No diretório do projeto, digite:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

Também iremos necessitar de ethers no nosso `hardhat.config.js` na próxima etapa.

### Atualizar hardhat.config.js {#update-hardhat-config-js}

Adicionamos várias dependências e plugins até agora. Agora precisamos atualizar `hardhat.config.js`para que o nosso projeto reconheça essas dependências.

Atualize o seu `hardhat.config.js` para se parecer com isto:

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.8.9",
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### Compilar o nosso Contrato Inteligente {#compile-our-smart-contract}

Para garantir que tudo está a funcionar até ao momento, vamos compilar o nosso contrato. A tarefa `compile` é uma das tarefas hardhat integradas.

A partir da linha de comandos execute:

```bash
npx hardhat compile
```

Pode receber um aviso sobre `SPDX license identifier not provided in source file`, mas o aplicativo ainda pode estar funcionando bem. Caso contrário, pode sempre enviar uma mensagem no [discord do Alchemy](https://discord.gg/u72VCg3).

### Escreva nosso script de implantação {#write-our-deploy-script}

Agora que o nosso contrato está escrito e o nosso ficheiro de configuração está pronto, está na altura de escrever o script de implantação do nosso contrato.

Navegue até à pasta `scripts/` e crie um ficheiro novo chamado `deploy.js`, adicionando-lhe o seguinte conteúdo:

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");   
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Adotámos as explicações da equipa Hardhat para o que cada uma destas linhas de código faz a partir do [tutorial de Contratos](https://hardhat.org/tutorial/testing-contracts.html#writing-tests) aqui.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

Um `ContractFactory` no ethers.js é uma abstração usada para implantar novos contratos inteligentes, assim, `HelloWorld` aqui é uma [fábrica](https://en.wikipedia.org/wiki/Factory\_\(object-oriented\_programming\)) para instâncias do nosso contrato hello world. Ao usar o plugin `hardhat-ethers` `ContractFactory` e `Contract`, as instâncias são conectadas por defeito ao primeiro assinante (proprietário).

```javascript
const hello_world = await HelloWorld.deploy();
```

Chamar `deploy()` numa `ContractFactory` irá iniciar a implantação e devolver uma `Promise` que se resolve num objeto `Contract`. Este é o objeto que tem um método para cada uma das nossas funções de contrato inteligente.

### Implante nosso Contrato Inteligente {#deploy-our-smart-contract}

Navegue até a linha de comandos e execute:

```bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
```

Deve ver algo assim:

```bash
Contract deployed to address: 0x3d94af870ED272Cd5370e4135F9B2Bd0e311d65D
```

Se formos no [explorador do Polygon Mumbai](https://mumbai.polygonscan.com/) e procurar o endereço do nosso contrato, deveríamos ser capazes de verificar se ele foi implantado com sucesso.

`From`O endereço deve corresponder ao endereço da conta do MetaMask e `To`o endereço dirá **Criação de Contratos.** Mas se clicarmos na transação, veremos o endereço do nosso contrato no `To`campo.

![img](/img/alchemy/polygon-scan.png)

### Verificar o contrato {#verify-the-contract}

A Alchemy fornece um [explorador](https://dashboard.alchemyapi.io/explorer) onde pode encontrar informações sobre os métodos implantados junto com o contrato inteligente, como tempo de resposta, status HTTP, códigos de erro entre outros. É um bom ambiente para verificar o seu contrato e verificar se as transações foram realizadas.

![img](/img/alchemy/calls.png)

**Parabéns! Acabou de implantar um contrato inteligente na rede Polygon Mumbai.**

## Recursos adicionais {#additional-resources}

- [Como Desenvolver um Contrato Inteligente NFT](https://docs.alchemy.com/docs/how-to-develop-an-nft-smart-contract-erc721-with-alchemy) - A Alchemy tem um tutorial escrito com um vídeo do Youtube neste tópico. Esta é a semana 1 da sua série de dev gratuita de 10 semanas **Estrada para Web3**
- Quickstart da API [do Polygon](https://docs.alchemy.com/reference/polygon-api-quickstart) – guia de documentos do desenvolvedor da Alchemy para se levantar e executar com o Polygon
