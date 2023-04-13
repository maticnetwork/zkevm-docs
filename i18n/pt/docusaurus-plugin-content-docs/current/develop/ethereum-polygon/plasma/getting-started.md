---
id: getting-started
title: Plasma Bridge
sidebar_label: Introduction
description: Interagir com a Plasma Bridge e a rede da Polygon.
keywords:
  - docs
  - matic
image: https://matic.network/banners/matic-network-16x9.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Consulte a [documentação Matic.js sobre o Plasma](https://maticnetwork.github.io/matic.js/docs/plasma/) mais recente para obter uma introdução.

Uma bridge é basicamente um conjunto de contratos que ajudam na movimentação de ativos da chain ROOT para a chain filho. Existem principalmente duas bridges para mover ativos entre a Ethereum e a Polygon. A primeira é a Plasma Bridge e a segunda é conhecida como **PoS Bridge** ou **Proof of Stake bridge**. **A ponte de plasma** oferece maiores garantias de segurança devido ao mecanismo de saída de Plasma.

No entanto, existem certas restrições sobre o token filho, e há um período de retirada de 7 dias associado a todas as saídas/retiradas da Polygon para a Ethereum na Plasma Bridge. A [PoS Bridge](/docs/develop/ethereum-polygon/pos/getting-started) é mais flexível e permite retiradas mais rápidas.

Este tutorial irá atuar como guia passo a passo para entender e usar a bridge do Plasma usando o [Matic JS](https://github.com/maticnetwork/matic.js), que é a maneira mais fácil de interagir com a Ponte do Plasma na Rede Polygon.

## Fluxo de ativos na Plasma Bridge {#assets-flow-in-plasma-bridge}

Neste tutorial iremos mostrar o fluxo de transferências de ativos na Polygon e como pode fazer o mesmo usando Matic.js:

<img src={useBaseUrl("img/matic/Matic-Workflow-2.jpg")} />

1. O usuário deposita ativos de criptografia no contrato do Polygon na chain principal
2. Assim que os tokens depositados forem confirmados na chain principal, os tokens correspondentes serão refletidos na chain Polygon
   - O utilizador pode agora transferir tokens para qualquer pessoa que queira instantaneamente com taxas insignificantes. A blockchain da Polygon tem blocos mais rápidos (aproximadamente 1 segundo). Desta forma, a transferência será feita quase instantaneamente.
3. Assim que um usuário estiver pronto, ele pode retirar tokens restantes da chain principal. A retirada de fundos é iniciada na sidechain Plasma. É definido um intervalo de checkpoint de 5 minutos onde todos os blocos na camada de blocos da Polygon são validados desde o último checkpoint.
4. Assim que o ponto de verificação for submetido ao contrato da cadeia principal Ethereum, um token de Saída NFT (ERC721) é criado de valor equivalente.
5. Os fundos retirados podem ser recuperados ao seu account Ethereum do contrato da cadeia principal usando um procedimento de saída de processos.
   - O utilizador também pode obter uma saída rápida por meio de 0x ou Dharma (em breve!)

### Pré-requisitos: {#prerequisites}

```
npm i @maticnetwork/maticjs-plasma

import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: <network name>,  // 'testnet' or 'mainnet'
    version: <network version>, // 'mumbai' or 'v1'
    parent: {
      provider: <parent provider>,
      defaultConfig: {
            from: <from address>
      }
    },
    child: {
      provider: <child provider>,
      defaultConfig: {
            from: <from address>
      }
    }
});

```

### Faucet Görli {#görli-faucet}

Para fazer quaisquer transações, também precisará de algum Ether nas contas de teste que irá usar durante este tutorial. Caso não tenha nenhum ETH no Görli, pode usar os links de faucet aqui dados — https://goerli-faucet.slock.it/.

### Faucet da Polygon {#polygon-faucet}

Durante este tutorial iremos usar o token ERC-20 `TEST` na rede Görli como um exemplo. Este é um token de teste. Na sua DApp, pode substituí-lo por qualquer token ERC-20. Para obter tokens `TEST` de teste na rede da Polygon, pode aceder ao [faucet da Polygon](https://faucet.polygon.technology/).

:::note

Para usar os seus próprios tokens para depósitos e levantamentos, terá de obter o token 'mapeado', o que significa essencialmente fazer os contratos na chain principal e sidechain 'consciente' do seu token personalizado.

:::

### Configuração básica da carteira MetaMask (opcional) {#basic-setup-for-the-metamask-wallet-optional}

1. [Criar uma](/docs/develop/metamask/hello) carteira: se for novo nas carteiras e, em seguida, configurar uma Conta MetaMask.
2. [Configurar o Polygon testnet](/docs/develop/metamask/config-polygon-on-metamask): para visualizar facilmente o fluxo de fundos no Polygon, ele é instrutivo se configurar o Polygon testnet no Metamask. Note que estamos a usar MetaMask aqui exclusivamente para fins de visualização. Não é necessário usar MetaMask para usar a Polygon.
3. [Criar múltiplas contas](/docs/develop/metamask/multiple-accounts): antes de começar com o tutorial, prepare 3 contas Ethereum de teste.
4. [Configurar token na Polygon](/docs/develop/metamask/custom-tokens): para visualizar o fluxo de fundos facilmente na Polygon usando Matic.js, pode configurar tokens na MetaMask. O `TEST`token, tomado como exemplo deste tutorial, pode ser configurado no MetaMask para visualizar facilmente os balanceamentos de conta. Novamente note que este é **opcional**. Pode consultar facilmente os saldos de token e outras variáveis usando [web3.js](https://web3js.readthedocs.io/en/1.0/)
