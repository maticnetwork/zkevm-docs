---
id: custom-tokens
title: Configurar tokens personalizados
description: Configurar tokens personalizados na MetaMask.
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Esta página demonstra o processo de configurar/adicionar tokens personalizados ao Metamask.

Pode usar o mesmo processo para adicionar qualquer tokens personalizados a qualquer rede no Metamask. Pode consultar [esta tabela](#tokens-and-contract-adresses) para visualizar alguns exemplos de tokens de teste com os respectivos endereços de contratos.

## Adicionar um token personalizado à conta do MetaMask {#adding-a-custom-token-to-your-metamask-account}

Primeiro, escolha a rede apropriada para o novo token na tela inicial do Metamask. Em seguida, clique em "Importar Tokens".

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

Em seguida, ele irá navegar para uma nova tela. Na tela Importar tokens, copie um endereço do campo Endereço de token.

:::info
Para ilustrar este processo, estamos usando um token E**RC20-TESTV4 **na **rede Goerli.** Encontre outros tokens de teste de outras redes [<ins>aqui</ins>](#tokens-and-contract-adresses).
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

Os outros campos irão preencher-se automaticamente. Clique em Adicionar tokens personalizados e clique em Importar tokens. O token `TEST` deve então ser exibido na sua conta MetaMask.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**Adicionar um token de teste ERC1155 à sua conta MetaMask**

Embora a rede da Polygon suporte o ERC1155, a [MetaMask ainda não suporta o padrão](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-). Esta atualização é esperada para o quarto trimestre de 2021.

### Tokens e Adereços de Contrato {#tokens-and-contract-adresses}

| token | Rede | Endereço de contrato |
|---------------|---------|----------------------------------------------|
| ERC20-TESTV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TESTV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TESTV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |