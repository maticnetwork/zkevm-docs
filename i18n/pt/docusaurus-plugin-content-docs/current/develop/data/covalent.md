---
id: covalent
title: Usar Covalent
sidebar_label: Covalent
description: Saiba como usar a API unificada da Covalent para dados
keywords:
  - docs
  - matic
  - polygon
  - covalent
  - data
  - analytics
  - index
  - indexing
  - query
image: https://matic.network/banners/matic-network-16x9.png
---

## Introdução {#introduction}

A Polygon traz uma escala maciça para a Ethereum usando uma versão adaptada de Plasma
com sidechains baseadas em PoS que fornece uma solução para transações
mais rápidas e de preço muito baixo com finalidade na chain principal. A rede da Polygon garante
vivacidade usando pontos de verificação PoS que são empurrados para a Mainchain Ethereum.
Isto permite  que uma única sidechain da Polygon atinja teoricamente `2^16` transações  
por bloco e possivelmente milhões de transações em várias chains no futuro.

### Factos rápidos {#quick-facts}

<TableWrap>

| Propriedade | Valor |
|---|---|
| ChainId da mainnet da Polygon | `137` |
| ChainId da testnet Mumbai da Polygon | `80001` |
| Explorador da blockchain da Polygon | https://polygonscan.com/ |
| Tempo do bloco | ~3 segundos |
| Latência da atualização de dados | ~6 segundos ou 2 blocos |

</TableWrap>

:::tip Início rápido

Veja **[<ins>este vídeo de introdução</ins>](https://www.youtube.com/watch?v=qhibXxKANWE)**
para começar.

:::

## Endpoints suportados {#supported-endpoints}

Todos os endpoints [__de classe A__](https://www.covalenthq.com/docs/api/#tag--Class-A) são suportados para a mainnet MATIC e a testnet Mumbai. Pode consultar qualquer rede através da API unificada alterando o `chainId`.

:::info Endpoints

Uma lista completa de todos as solicitações que pode fazer na rede da Polygon usando Covalent
estão disponíveis na [<ins>documentação da API Covalent</ins>](https://www.covalenthq.com/docs/api/).

:::

---

## Apêndice {#appendix}

### Token gás MATIC {#matic-gas-token}

Para interagir com a rede MATIC, são necessários tokens MATIC para pagar como taxas de gás. As respostas da Covalent
devolvem automaticamente campos `gas_*` nas unidades MATIC.

### Mapeamento de tokens {#token-mapping}

A Covalent mantém um mapeamento em tempo real na chain de endereços de tokens entre a Mainnet Ethereum e a chain MATIC. Estes endereços são usados para fazer a investigação inversa dos preços na MATIC e também devolver os URLs dos logótipos de token certos.

Alguns exemplos de tokens mapeados:

| Token | Mainnet Ethereum | Mainnet MATIC |
|---|---|---|
| USDT | 0xdac17f958d2ee523a2206206994597c13d831ec7 | 0xc2132d05d31c914a87c6611c10748aeb04b58e8f |
| Uniswap UNI | 0x1f9840a85d5af5bf1d1762f925bdaddc4201f984 | 0xb33eaad8d922b1083446dc23f610c2567fb5180f |

### Preços de tokens {#token-prices}

Para tokens que tenham um mapeamento de volta à Mainnet Ethereum, a Covalent pode devolver os preços mapeados.
