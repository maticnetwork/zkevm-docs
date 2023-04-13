---
id: adding-a-custom-token
title: Adição de um token personalizado
sidebar_label: Adding a Custom Token
description: Construa sua próxima aplicação de blockchain na Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

O recurso **Adicionar token personalizado** lhe permite adicionar qualquer token de modo explícito e usá-lo com a Polygon Wallet Suite. Só tem que procurar pelo token por seu endereço de contrato, tanto raiz como filho:

* A **raiz** é o contrato de token na Ethereum
* O **filho** é o contrato na Polygon

### Como encontro o contrato do token? {#how-do-i-find-the-token-contract}

Pode buscar pelo token por seu, nome tanto na [Coingecko](http://coingecko.com) quanto na [Coinmarketcap](https://coinmarketcap.com/), onde poderá ver seu endereço na chain Ethereum (para ERC, 20 tokens) e outras chains subsequentes suportadas, como a Polygon. O endereço de token em outras rede pode não estar atualizado, porém, certamente pode utilizar o endereço raiz para todos os propósitos.

Então, ao selecionar um token, será capaz de buscar pelo:
* Símbolo do token
* Nome do token
* Contrato

Aqui está como funciona:

1. Adicione facilmente qualquer token à sua lista, ao adicionar o endereço do contrato como um token personalizado (nós suportamos

endereços de contrato tanto na Polygon como na Ethereum):

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. Uma vez que a informação do token é obtida, verá um ecrã de confirmação com toda a informação do token. Então, o pode adicionar como um token personalizado, que será armazenado localmente em seu sistema. Sugerimos que verifique novamente os contratos de token duas vezes, já que existem vários tokens-clone ou tokens-fraude:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. Seu token adicionado é agora mostrado ao selecionar um token:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

Também pode adicionar um token diretamente na guia tokens da tela **Gerenciar:**

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>