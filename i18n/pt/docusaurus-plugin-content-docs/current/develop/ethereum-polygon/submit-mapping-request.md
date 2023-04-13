---
id: submit-mapping-request
title: Tokens de mapeamento
description:  Um guia sobre como mapear tokens entre Ethereum e Chains Polygon usando a Ponte PoS
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

É necessário mapear para transferir seus ativos de e para Ethereum e Polygon PoS. Oferecemos duas bridges para fazer o mesmo. Mais detalhes sobre a bridge podem ser aqui [compreendidos](/develop/ethereum-polygon/getting-started.md).

:::tip

A ponte Polygon PoS está disponível tanto para o Polygon Mainnet como para o Teste de Mumbai.

:::

## Etapas para enviar uma solicitação de mapeamento. {#steps-to-submit-a-mapping-request}

Para mapear tokens entre Ethereum e Polygon PoS, pode usar o [Mapper do Polygon Token](https://mapper.polygon.technology/). Abra o link e clique no botão **Mapa de Novo** Token no canto superior direito para iniciar uma nova solicitação de mapeamento.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**Etapa 1 →** Escolha a rede na qual deseja mapear o seu token. Pode escolher o **Goerli-Mumbai** para Testnet e o **Ethereum-Polygon PoS** para Mainnet.

**Etapa 2 →** Selecione o tipo de token que está mapeando - **ERC20**, **ERC721** ou **ERC1155**.

**Etapa 3 →** Insira o endereço de token **Ethereum/Goerli** no campo **Endereço de token Ethereum** Certifique-se de que o código do contrato de token foi verificado nos exploradores do blockchain **Ethereum/Goerli**.

**Etapa 4 →** Depois de adicionar o **Endereço de token Ethereum**, os campos correspondentes são visados. **Nome de token, Símbolo de token e Decimal** de token serão preenchidos automaticamente com os detalhes do contrato.

**Etapa 5 →** Agora, clique no botão **Iniciar** Mapeamento para iniciar o processo de mapeamento. Como isso envolve uma transação de Ethereum, terá de conectar a sua carteira para prosseguir.

**Etapa 6 →** Será mostrado um modal de revisão com as informações de token e as taxas de gás estimadas para concluir o mapeamento. Verificar os detalhes e iniciar a transação de mapeamento selecionando o botão **Taxa de Gás Pay para** Mapar.

Depois de confirmar a transação da sua carteira, é necessário aguardar a conclusão da transação no Ethereum. Assim que a transação for concluída, será mostrado o modal de sucesso com o endereço de token do seu filho na rede Polygon PoS. Pode continuar a verificar o mapeamento verificando o endereço de token filho gerado no [Polygonscan](https://polygonscan.com/).

Para um mapeamento do Mainnet bem-sucedido, pode fornecer os seus detalhes de token [aqui](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) para serem adicionados na Lista de [**tokens do Polygon**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json).

:::tip

No caso de [<ins>um mapeamento de token personalizado</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-), pode visitar a documentação do [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) e usar as informações fornecidas para construir a implementação de FX personalizada para mapear tokens.

:::

## Guia de vídeo {#video-guide}

Aqui está um tutorial em vídeo rápido sobre como mapear tokens entre **Ethereum Goerli ↔ Polygon Mumbai Testnet**:

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>Seu navegador não é compatível com o elemento de vídeo.</p>
</video>
