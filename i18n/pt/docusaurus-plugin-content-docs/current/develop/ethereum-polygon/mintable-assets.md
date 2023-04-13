---
id: mintable-assets
title: Ativos Mintable Polygon
description: Mint e criar ativos na rede Polygon com o Fx-Portal.
keywords:
  - docs
  - polygon wiki
  - polygon
  - mintable assets
  - mint
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Os ativos podem ser transferidos de e para a Ethereum e chain da Polygon, com o uso da PoS Bridge. Estes ativos incluem ERC-20, ERC-721, ERC1155 e muitos outros padrões de token. A maioria dos ativos são preexistentes na chain Ethereum Mas podem ser criados novos ativos na chain da Polygon e transferidos de volta para a chain Ethereum, como e quando necessário. Isso pode economizar muito gás e tempo que é gasto na mineração de token no Ethereum.

A criação de ativos na chain da Polygon é muito mais fácil, e é uma abordagem mais recomendada. **Estes ativos podem ser transferidos para a chain Ethereum quando necessário**. Esse tipo de ativos são chamados de **ativos mineráveis do Polygon**.

No caso de tokens do Polygon Mintable, os ativos são criados na rede do Polygon. Quando um ativo minted Polygon tem de ser movido para Ethereum, primeiro tem de ser feito o burn do ativo e, em seguida, uma prova desta transação de burn tem de ser enviada na chain Ethereum. A maneira recomendada de fazer uso dos recursos de token do Polygon Mintable é utilizando o [portal fx](/develop/l1-l2-communication/fx-portal.md).
