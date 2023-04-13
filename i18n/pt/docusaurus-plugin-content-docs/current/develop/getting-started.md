---
id: getting-started
title: Introdução à Polygon PoS
sidebar_label: Quick Start
description: Construa a sua próxima aplicação de blockchain na Polygon.
keywords:
  - docs
  - matic
  - polygon
  - build on polygon
  - blockchain
  - introduction
  - how to launch dapp
  - dapps
  - ethereum
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::caution Atualização dos documentos de desenvolvimento

Os documentos estão a ser atualizados, melhorados e aperfeiçoados. Estão sujeitos a alterações.
Esteja à vontade para levantar questões ou retirar uma submissão caso tenha alguma dúvida ou sugestão.

:::

Bem-vindo à **Polygon (anterior Rede Matic)**! A plataforma mais inovadora e emocionante para desenvolver a sua aplicação blockchain. A tecnologia blockchain está preparada para revolucionar a forma como o mundo digital gere os dados e conduz os negócios. Pode juntar-se a esta revolução com uma vantagem inicial sobre o desenvolvimento de aplicações descentralizadas (DApp) da Polygon.

Este guia fará uma apresentação do ecossistema da Polygon. Poderá consultar links para recursos e sites úteis que servirão de guia para a construção não só na Polygon mas também para desenvolvimento da aplicação blockchain em geral.

:::tip Mantenha-se informado

Esteja a par das últimas atualizações por parte da
equipa e comunidade da Polygon subscrevendo os
[<ins>Grupos de notificação do Polygon</ins>](https://polygon.technology/notifications/).

:::

## Principais características da Polygon {#key-features-of-polygon}

- **Velocidade**: a Rede Polygon usa um blockchain de alto rendimento com consenso fornecido por um grupo de Produtores de Blocos selecionados por partes interessadas em cada ponto de verificação. Uma camada Proof of Stake é usada para validar blocos e publica periodicamente provas de Produtores de Blocos na Mainnet Ethereum. Isto permite uma confirmação rápida de um bloco em cerca de 2 segundos, preservando um elevado valor de descentralização, resultando num excelente tráfego da rede.
- **Escalabilidade**: a Polygon Network consegue uma velocidade de transação hipotética de menos de 2 segundos em um único sidechain. O uso de múltiplas sidechains ajuda a rede a gerir milhões de transações por segundo. Este mecanismo (já demonstrado na primeira sidechain MATIC) facilita o redimensionamento por parte da rede da Polygon.
- **Segurança**: os contratos inteligentes do Polygon dependem da segurança do Ethereum. Para segurança da rede, são utilizados três modelos de segurança fundamentais. São usados os **contratos de gestão de staking** da Ethereum e um grupo de validadores incentivados que correm os nós **Heimdall** e **BOR**. Os programadores podem também implementar os dois modelos (Híbrido) na sua DApp.

## Construir na Polygon {#building-on-polygon}

Se é um programador Ethereum, então já é um programador Polygon. Basta mudar para a [Polygon RPC](https://polygon-rpc.com/) e pode começar. Todas as ferramentas com as quais está familiarizado na blockchain Ethereum são suportadas na Polygon, por defeito, como a Truffle, Remix e Web3js.

Pode implantar aplicações descentralizadas tanto na Testnet Mumbai da Polygon como na Mainnet. A Testnet Mumbai da Polygon conecta-se à Testnet Goërli da Ethereum que atua como a sua ParentChain. Pode consultar todos os detalhes relacionados com redes na [documentação da rede](https://github.com/maticnetwork/matic-docs/blob/master/docs/operate/network.md).

### Carteiras {#wallets}

Para interagir com a rede da Polygon é necessário ter uma carteira baseada na Ethereum porque a rede da Polygon corre na Máquina Virtual da Ethereum (EVM). Pode optar por configurar uma Carteira [Metamask](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/metamask/overview.md) ou [Arkane](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/wallets/arkane/intro_arkane.md) . Mais informações sobre informações relacionadas com a carteira e por que precisa de um pode ser encontrado na documentação da [carteira](https://docs.polygon.technology/docs/develop/wallets/getting-started).

### Contratos Inteligentes {#smart-contracts}

A Polygon suporta muitos serviços que podem ser usados para testar, compilar, depurar e implantar as aplicações descentralizadas na rede da Polygon. Estes incluem a implantação usando [Alchemy](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/alchemy.md), [Chainstack](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/chainstack.md), [QuickNode](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/quicknode.md), [Remix](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/remix.md), [Truffle](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/truffle.md), [Hardhat](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/hardhat.md) e [Replit](https://github.com/maticnetwork/matic-docs/blob/master/docs/develop/replit.md).

### Conexão à Polygon {#connecting-to-polygon}

Pode adicionar a Polygon à MetaMask ou usar diretamente a Arkane, o que permite conectar-se à Polygon usando [RPC](https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/).

Para se conectar à rede Polygon para ler as informações do blockchain, recomendamos usar o SDK da Alchemy.

```js
// Javascript
// Setup: npm install alchemy-sdk
const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: "demo", // Can replace with your API Key from https://www.alchemy.com
  network: Network.MATIC_MAINNET, // Can replace with MATIC_MUMBAI
};

const alchemy = new Alchemy(settings);

async function main() {
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log("The latest block number is", latestBlock);
}

main();
```

### Construir uma DApp nova na Polygon? {#building-a-new-dapp-on-polygon}

As aplicações descentralizadas (DApps) atuam como bridge entre os utilizadores e a privacidade dos seus dados na blockchain. O número crescente de DApps valida a sua utilidade dentro do ecossistema da blockchain, resolvendo desafios como a execução de transações entre dois participantes por meio dos contratos inteligentes e sem recurso a uma autoridade central.

Suponha que não tem qualquer experiência prévia na construção de aplicações descentralizadas (DApps). Nesse caso, os recursos abaixo mencionados dão-lhe uma vantagem inicial com as ferramentas necessárias para construir, depurar e implantar DApps na rede da Polygon.

- [DApp Stack Total: Série Tutorial](https://kauri.io/full-stack-dapp-tutorial-series/5b8e401ee727370001c942e3/c)
- [Web3.js](https://www.dappuniversity.com/articles/web3-js-intro)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Remix](https://docs.polygon.technology/docs/develop/remix/)
- [Truffle](https://docs.polygon.technology/docs/develop/truffle)
- [Metamask](https://docs.polygon.technology/docs/develop/metamask/overview)
- [Arkane](https://docs.polygon.technology/docs/develop/wallets/arkane/intro)
- [Desenvolver uma DApp usando Fauna, Polygon e React](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react)

### Já tem uma DApp? {#already-have-a-dapp}

Se já tem uma aplicação descentralizada (DApp) e procura uma plataforma que ajude a escalá-la eficientemente, então está no sítio certo porque a Polygon permite:

1. **Migrar facilmente de uma chain baseada na Máquina Virtual da Ethereum (EVM)**: a Polygon orgulha-se por ser a derradeira solução de redimensionamento Layer-2 para a Ethereum. Não tem de se preocupar com a arquitetura subjacente ao mover ou implantar as suas DApps na rede da Polygon, desde que seja compatível com EVM.
2. **Usar a Polygon como uma camada de transação mais rápida**: Implantar a sua DApp na Mainnet da Polygon permite-lhe potenciar a Polygon como uma camada de transação mais rápida para a sua DApp. Além disso, fazemos o mapeamento dos seus tokens. Junte-se ao nosso [grupo de discussões técnicas](http://bit.ly/matic-technical-group) no Telegram para saber mais.

## Nota interessante {#side-note}

Se isto for impressionante, entendemos perfeitamente! Pode entrar já em ação e começar a fazer hacking. Aqui ficam algumas notas antes de mergulhar nos recursos, repositórios e documentos:

1. **Atenção aos custos de estar na vanguarda da tecnologia**: assim como a programação típica em nicho, as DApps e o desenvolvimento blockchain evoluem muito depressa. Enquanto pesquisa, pode encontrar repositórios de código complexos, 404s num site de documentação ou mesmo uma ausência de documentação. Aproveite essa oportunidade para entrar em contacto connosco através de qualquer rede social.
2. **A curva de aprendizagem pode ser intimidante, mas a barreira de entrada está baixa**: A comunidade é muito acessível e acolhedora! Os projetos acolhem os pedidos pull de pessoas externas e resolvem ativamente qualquer bloqueador. Estamos a trabalhar na criação de um mundo melhor e qualquer contribuição é bem-vinda. Estamos muito agradecidos por podermos integrá-lo neste incrível ecossistema Web3.

:::info Mantenha-se atualizado

O desenvolvimento de aplicações descentralizadas incentiva a descentralização da rede. Siga as nossas redes sociais para obter mais informações e atualizações sobre o ecossistema da Polygon. Pode consultar os links para todas as comunidades da Polygon [aqui](https://polygon.technology/community/).

:::
