---
id: nftstorage
title: Mint de NFTs
description: Mint com NFT.storage e Polygon.
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Este tutorial ensina a fazer Mint de um NFT usando a blockchain da Polygon e o armazenamento IPFS/Filecoin via NFT.Storage. Polygon, uma solução de dimensionamento de camada 2 da Ethereum, é frequentemente escolhida pelos programadores pela sua velocidade e baixos custos de transação, ao mesmo tempo que mantém uma compatibilidade total com o EVM da Ethereum. Este tutorial orienta a criação e implantação de um contrato inteligente, armazenando metadados e ativos no IPFS e Filecoin por meio da API NFT.Storage e fazendo ainda Mint do NFT na sua carteira da Polygon.

## Introdução {#introduction}

Neste tutorial vamos tentar cumprir três características com o nosso processo de mint:

1. *Escalabilidade* do processo de mint em termos de custos e taxas de transferência. Se a utilização se prende com a criação rápida de NFTs, a tecnologia subjacente tem de gerir todas as solicitações de mint e o processo de mint deve ser barato.
2. *Durabilidade* do NFT, uma vez que os ativos podem ser duradouros e, portanto, precisam de se manter utilizáveis durante toda a sua durabilidade.
3. *Imutabilidade* do NFT e do ativo que representa para impedir que alterações indesejadas e que indivíduos maliciosos consigam alterar o ativo digital que o NFT representa.

A [Polygon](https://polygon.technology) atende à característica da *escalabilidade* através do seu protocolo e framework. São também compatíveis com a Ethereum e a sua máquina virtual, permitindo aos programadores moverem o seu código livremente entre as duas blockchains. Da mesma forma, o [NFT.Storage](https://nft.storage) assegura *durabilidade* através do poder subjacente da rede [Filecoin](https://filecoin.io) e *imutabilidade* usando o [endereçamento de conteúdos](https://nftschool.dev/concepts/content-addressing/) do IPFS.

Neste tutorial tem uma visão geral do processo de Mint, aprende a armazenar um ativo digital com NFT.Storage e usa este ativo digital para fazer Mint do seu NFT na Polygon.

## Pré-requisitos {#prerequisites}

Um conhecimento geral sobre os NFTs dar-lhe-á mais informação e contexto. [A Escola NFT aborda os fundamentos dos NFTs](https://nftschool.dev/concepts/non-fungible-tokens/), tópicos avançados e outros tutoriais.

Para testar e fazer RUN do código que consta neste tutorial, necessita de uma [instalação Node.js](https://nodejs.org/en/download/package-manager/) funcional.

Também precisa de uma carteira da Polygon na testnet Mumbai com um pequeno valor do token MATIC. Siga as instruções abaixo para começar:

1. **Faça o download e instale a [MetaMask](https://metamask.io/)**. A MetaMask é uma carteira cripto e gateway para as aplicações da blockchain. É muito fácil de usar e simplifica muitos passos, por exemplo, a configuração da carteira da Polygon.
2. **Conecte a MetaMask à [testnet Mumbai](https://docs.polygon.technology/docs/develop/metamask/overview)** da Polygon e selecione-a no menu suspenso. Iremos usar a testnet da Polygon para fazer Mint do nosso NFT, uma vez que é gratuito.
3. **Receba o token MATIC** na sua carteira através do [faucet](https://faucet.polygon.technology/). Selecione a testnet Mumbai e cole o endereço da sua carteira da MetaMask no formulário. Para fazer Mint de um NFT, é necessário pagar um pequeno valor de MATIC, que é uma taxa cobrada pelos miners nas operações de adicionar novas transações à blockchain, por exemplo, fazer Mint de um NFT ou criar um novo contrato inteligente.
4. **Copie a sua chave privada** da MetaMask, clicando nos três pontos no canto superior direito e selecionando “Account details" (Detalhes da conta). Na zona inferior encontra um botão para exportar a sua chave privada. Clique nela e insira a sua senha quando solicitado. Por enquanto, pode copiar e colar a chave privada num ficheiro de texto. Iremos usá-la mais tarde no tutorial na interação com a blockchain.

Por último, deve ter um editor de texto ou código. Por uma questão prática, selecione um editor que suporte as linguagens JavaScript e Solidity. Uma boa opção é o [Código Visual Studio](https://code.visualstudio.com) com a extensão [solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity).

## Preparação {#preparation}

### Obtenha uma chave API para NFT.storage {#get-an-api-key-for-nft-storage}

Para usar o NFT.Storage, necessita de uma chave API. Primeiro, [vá a NFT.Storage para fazer login](https://nft.storage/login/) com o seu endereço de e-mail. Irá receber um e-mail com um link mágico que faz o login -- não necessita de senha. Depois de ter feito o login com sucesso, vá a "API Keys" (Chaves API) a partir da barra de navegação. Encontra um botão para criar uma **"New Key" (Chave Nova)**. Quando for solicitado o nome da chave API, pode optar por um à sua escolha ou usar “polygon + NFT.Storage”. Pode copiar o conteúdo da coluna da chave agora ou voltar ao NFT.Storage mais tarde no tutorial.

### Configure a sua área de trabalho {#set-up-your-workspace}

Crie uma nova pasta vazia para usarmos como espaço de trabalho para este tutorial. Escolha à vontade um nome e uma localização no seu sistema se ficheiros. Abra um terminal e navegue para a pasta recém-criada.

Em seguida, iremos instalar as seguintes dependências Node.js:

- **Hardhat e Hardhat-Ethers**, um ambiente de desenvolvimento para a Ethereum (e blockchains compatível com a Ethereum como a Polygon)
- **OpenZeppelin**, uma coleção de contratos inteligentes com contratos baseados em NFTs padronizados.
- **NFT.Storage**, uma biblioteca para se conectar à API NFT.Storage.
- **Dotenv**, uma biblioteca para gerir os ficheiros do ambiente de configuração (por exemplo, injetando chaves privadas no roteiro).

Use o comando a seguir para instalar todas as dependências de uma só vez:

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Hardhat precisa de ser inicializado na pasta atual. Para começar à inicialização, execute:

```bash
npx hardhat
```

Quando solicitado, escolha **Criar um hardhat.config.js vazio**. O resultado da sua consola deve estar parecido com o seguinte:

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

Faremos algumas modificações ao ficheiro `hardhat.config.js` de configuração da hardhat para suportar a rede de teste Mumbai da Polygon. Abra o `hardhat.config.js` que foi criado na etapa anterior. Note que estamos a carregar a sua chave privada da carteira da Polygon a partir de um ficheiro de ambiente e que este ficheiro deve ser mantido em segurança. Pode até usar outro [link](https://docs.polygon.technology/docs/operate/network) rpc, conforme exigido.

```js
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
    PolygonMumbai : {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

Crie um novo ficheiro chamado `.env`que irá manter a chave da API para NFT.Storage e a chave privada da carteira Polygon. O conteúdo do `.env`ficheiro deve parecer algo como:

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

Substitua os marcadores de posição com a chave API que criou durante a preparação e com a sua chave privada da carteira da Polygon.

Para manter o nosso projeto organizado, iremos criar três novas pastas:

1. `contracts`, para os contratos da Polygon escritos em Solidity.
2. `assets`, contendo o ativo digital ao qual fazermos Mint como um NFT.
3. `scripts`, como ajudantes para impulsionar a preparação do processo de mint.

Execute o seguinte comando:

```bash
mkdir contracts assets scripts
```

Por último, iremos adicionar uma imagem à pasta `assets` . Esta imagem será a nossa obra de arte, da qual será feito o upload no NFT.Storage e Mint na Polygon. Por agora iremos chamá-la `MyExampleNFT.png`. Se não tem uma boa arte já preparada, pode [fazer o download de um padrão simples](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu).

## Fazer Mint do seu NFT {#minting-your-nft}

### Armazenar dados do ativo com o NFT.Storage {#storing-asset-data-with-nft-storage}

Iremos usar o NFT.Storage para armazenar o nosso ativo digital e os seus metadados. O NFT.Storage garante a imutabilidade e a durabilidade ao fazer o upload do seu ativo digital para o Filecoin e IPFS, automaticamente. O IPFS e o Filecoin operam em identificadores de conteúdo (CID) para referenciamento imutável. O IPFS oferece uma rápida recuperação com a sua colocação em cache geo-replicada e o Filecoin garante a durabilidade com prestadores de armazenamento incentivados.

Crie um script chamado `store-asset.mjs` por baixo do diretório `scripts` . Os conteúdos estão indicados abaixo:

```js
import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env

async function storeAsset() {
   const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
   const metadata = await client.store({
       name: 'ExampleNFT',
       description: 'My ExampleNFT is an awesome artwork!',
       image: new File(
           [await fs.promises.readFile('assets/MyExampleNFT.png')],
           'MyExampleNFT.png',
           { type: 'image/png' }
       ),
   })
   console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

A parte principal do script é a função `storeAsset` . Cria um cliente novo que se conecta ao NFT.Storage através da chave API que criou anteriormente. De seguida, iremos apresentar os metadados que consistem de um nome, descrição e imagem. Note que estamos a ler o ativo NFT diretamente do sistema de ficheiros a partir do diretório `assets`. No final da função iremos imprimir a URL dos metadados, uma vez que a iremos usar mais tarde ao criar o NFT na Polygon.

Depois de configurar o script, pode executá-lo fazendo correr:

```bash
node scripts/store-asset.mjs
```

O seu resultado deve estar parecido com a listagem abaixo, onde `HASH` é o CID para a arte que acabou de armazenar.

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### Criar o seu NFT na Polygon {#creating-your-nft-on-polygon}

#### Criar o contrato inteligente para fazer Mint {#create-the-smart-contract-for-minting}

Primeiro, vamos criar um contrato inteligente que será usado para fazer Mint do NFT. Uma vez que a Polygon é compatível com a Ethereum, iremos escrever o contrato inteligente em [Solidity](https://soliditylang.org). Crie um ficheiro novo para o nosso contrato inteligente chamado `ExampleNFT.sol` dentro do diretório `contracts`. Pode copiar o código da listagem abaixo:

```solidity
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleNFT is ERC721URIStorage, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("NFT", "ENFT") {}

   function mintNFT(address recipient, string memory tokenURI)
       public onlyOwner
       returns (uint256)
   {
       _tokenIds.increment();

       uint256 newItemId = _tokenIds.current();
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);

       return newItemId;
   }
}
```

Para ser um NFT válido, o seu contrato inteligente deve implementar todos os métodos do [padrão ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/). Usamos a implementação da biblioteca [OpenZeppelin](https://openzeppelin.com) que já oferece um conjunto de funcionalidades básicas e segue o padrão.

No topo do seu contrato inteligente, importamos três classes de contrato inteligente OpenZeppelin:

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol` contém a implementação dos métodos básicos do padrão ERC-721, que o nosso contrato inteligente irá herdar. Usamos o `ERC721URIStorage,`, que é uma extensão para armazenar não apenas os ativos, mas também os metadados como um ficheiro JSON fora da chain. À semelhança do contrato, este ficheiro JSON precisa de aderir ao ERC-721.

2. `\@openzeppelin/contracts/utils/Counters.sol` fornece contadores que só podem ser incrementados ou decrescidos por um. O nosso contrato inteligente usa um contador para monitorizar o número total de NFTs aos quais foi feito Mint e para definir a identificação exclusiva do nosso novo NFT.

3. `\@openzeppelin/contracts/access/Ownable.sol` configura o controlo do acesso ao nosso contrato inteligente, para que apenas o proprietário do contrato inteligente (você) possa fazer Mint de NFTs.

Depois das nossas declarações importantes, temos o nosso contrato inteligente do NFT personalizado, que contém um contador, um construtor e um método para fazer Mint do NFT. A maioria do nosso trabalho árduo é feito pelo contrato de base herdado a partir do OpenZeppelin, que implementa a maioria dos métodos que precisamos para criar um NFT que adere ao padrão ERC-721.

O contador mantém o controlo do número total de NFTs ao qual foi feito Mint, que é usado no processo de Mint como um identificador exclusivo para o NFT.

No construtor, passamos dois argumentos string para o nome do contrato inteligente e o símbolo (representado nas carteiras). Pode alterá-los para o que quiser.

Finalmente, temos o nosso método `mintNFT`, que nos permite efetivamente fazer Mint do NFT. Este método está definido como `onlyOwner`, para garantir que só pode ser executado pelo proprietário do contrato inteligente.

`address recipient`especifica o endereço que receberá o NFT no início.

`string memory tokenURI` é um URL que deve direcionar para um documento JSON que descreve os metadados do NFT. No nosso caso, já está armazenado no NFT.Storage. Podemos usar o link IPFS para o ficheiro JSON dos metadados devolvido ao longo da execução do método.

Dentro do método, incrementamos o contador para receber um novo identificador exclusivo para o nosso NFT. Em seguida, podemos fazer CALL dos métodos fornecidos pelo contrato base do OpenZeppelin, para fazer Mint do NFT para o destinatário com o identificador recém-criado e definir o URI dos metadados. Este método devolve o identificador exclusivo após a execução.

#### Implantar o contrato inteligente na Polygon {#deploy-the-smart-contract-to-polygon}

Agora, chegou o momento de implantar o nosso contrato inteligente na Polygon. Crie um ficheiro novo chamado `deploy-contract.mjs` dentro do diretório `scripts`. Copie o conteúdo da listagem abaixo para esse ficheiro e guarde-o.

```js
async function deployContract() {
 const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
 const exampleNFT = await ExampleNFT.deploy()
 await exampleNFT.deployed()
 // This solves the bug in Mumbai network where the contract address is not the real one
 const txHash = exampleNFT.deployTransaction.hash
 const txReceipt = await ethers.provider.waitForTransaction(txHash)
 const contractAddress = txReceipt.contractAddress
 console.log("Contract deployed to address:", contractAddress)
}

deployContract()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });
```

A implantação do contrato é feita através das funções auxiliares fornecidas pela biblioteca hardhat. Primeiro, vamos buscar o contrato inteligente que criámos na etapa anterior com a fábrica fornecida. Em seguida, fazemos a sua implantação chamando o método respetivo e aguardamos pela conclusão da implantação. Para obter o endereço correto no ambiente testnet, pode encontrar mais algumas linhas abaixo do código descrito. Salvar o `mjs`arquivo.

Execute o script com o seguinte comando:

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

Se tudo estiver correto, terá o seguinte resultado:

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

Note que vai precisar do endereço do contrato impresso na etapa de mint. Pode copiar e colá-lo num ficheiro de texto em separado e guardá-lo para mais tarde. Isto é necessário para que o script de mint possa fazer CALL do método para esse contrato em específico.

#### Fazer Mint do NFT na Polygon {#minting-the-nft-on-polygon}

O processo de Mint do NFT está neste momento simplesmente a fazer Call do contrato que acabámos de implantar na Polygon. Crie um ficheiro novo chamado `mint-nft.mjs` dentro do diretório `scripts` e copie esse código a partir da listagem abaixo:

```bash
const CONTRACT_ADDRESS = "0x00"
const META_DATA_URL = "ipfs://XX"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

Edite as duas primeiras linhas para inserir o seu **endereço de contrato** da implantação anterior e o **URL dos metadados** que foi devolvido ao armazenar o ativo com NFT.Storage. O resto do script irá configurar a CALL do seu contrato inteligente consigo, enquanto proprietário do NFT, e o ponteiro para os metadados armazenados no IPFS.

Em seguida, faça RUN do script:

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

Pode esperar o seguinte resultado:

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

Procura o código de exemplo deste tutorial? Pode encontrá-lo no [link](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo) do repositório Github polygon-nft.storage-demo.

## Conclusão {#conclusion}

Neste tutorial aprendemos a fazer Mint de um NFT, do início ao fim, com a Polygon e o NFT.Storage. Esta combinação de tecnologia resulta numa descentralização adequada e garante *escalabilidade*, *durabilidade* e *imutabilidade*.

Implementámos um contrato inteligente personalizado para fazer Mint do nosso NFT de acordo com as nossas necessidades. Para este tutorial foi utilizado um exemplo simples com base no padrão ERC-721. No entanto, pode também definir uma lógica complexa que rege o ciclo de vida do seu NFT. Para casos de utilização mais complexos, o padrão sucessor [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/) é um bom sítio para começar. OpenZeppelin, a biblioteca que usamos no tutorial, oferece um [assistente de contratos](https://docs.openzeppelin.com/contracts/4.x/wizard) que ajuda a criar contratos NFT.

Um Mint bem-sucedido pode ser visto como o início de uma fase preciosa do NFT. O NFT pode assim ser usado para comprovar uma propriedade e pode também ser transferido para outros utilizadores. Os motivos para transferir um NFT podem incluir uma venda bem sucedida num dos mercados NFT como [OpenSea](https://opensea.io), ou um tipo de evento diferente, como a aquisição de um item num jogo baseado em NFT. Explorar as vastas possibilidades para os NFTs é sem dúvida uma próxima etapa emocionante.

Se quiser ajudar a construir o projeto NFT com o NFT.storage, recomendamos que se junte ao `#nft-storage`canal no D[iscord ](https://discord.gg/Z4H6tdECb9)e no S[lack.](https://filecoinproject.slack.com/archives/C021JJRH26B)
