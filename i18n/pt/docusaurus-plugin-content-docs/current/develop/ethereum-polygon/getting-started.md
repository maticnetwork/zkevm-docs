---
id: getting-started
title: Bridge Ethereum↔Polygon
sidebar_label: Overview
description: Um canal de transação bidirecional entre a Polygon e a Ethereum
keywords:
  - docs
  - polygon
  - polygon wiki
  - crosschain bridge
  - polygon
  - ethereum
  - fx portal
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

A Polygon traz-lhe um canal de transação bidirecional sem confiança entre a Polygon e a Ethereum, introduzindo a bridge cross-chain com Plasma e segurança PoS. Com isto, os utilizadores podem transferir tokens entre a Polygon sem incorrer em riscos de terceiros e limites de liquidez do mercado. **A Ponte do Plasma e PoS está disponível tanto no Mumbai Testnet como no Polygon Mainnet**.

**A ponte Polygon fornece um mecanismo de pontes que é quase instantâneo, baixo custo e bastante flexível**. A Polygon usa uma arquitetura de consenso(plataforma Plasma + Proof-of-Stake (PoS))
para otimizar a velocidade e descentralização. Arquitetámos conscientemente o sistema para suportar transições de estado arbitrárias nas nossas sidechains, que são suportadas por EVM.

**Não há qualquer alteração na alimentação de circulação do seu token quando cruza a bridge**;

- Os tokens que deixam a rede Ethereum são bloqueados e o mesmo número de tokens são minerados no Polygon como token (1:1).
- Para voltar a mover os tokens para a Rede Ethereum, é efetuado o burn dos tokens na rede da Polygon e estes são desbloqueados na Rede Ethereum durante o processo.

## PoS vs Plasma {#pos-vs-plasma}

|                                      | PoS Bridge(Recomendado) | Plasma Bridge |
| ------------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Breve descrição** | Desenvolvedores do DApp que buscam flexibilidade e levantamentos mais rápidos com segurança do sistema POS. | Programadores DApp que procuram maiores garantias de segurança com o mecanismo de saída Plasma\. |
| **Estrutura** | Altamente flexível | Rigida, menos flexível |
| **Depositar\(Ethereum → Polygon\)** | 22-30 minutos | 22-30 minutos |
| **Retirada\(Polygon → Ethereum\)** | 1 ponto de verificação = ~ 30 minutos a 6 horas | Chamada para o procedimento de saída de processo no contrato do Ethereum |
| **Segurança** | Sistema de Proof\-of\-Stake, seguro por um conjunto robusto de validadores externos\. | Os contratos Plasma da Polygon apoiam-se na segurança da Ethereum. |
| **Padrões de suporte** | ETH, ERC-20, ERC-721, ERC-1155 e outros | Apenas ETH, ERC-20 e ERC-721 |

:::info

O [**FxPortal**](/develop/l1-l2-communication/fx-portal.md) é outro tipo de ponte que é muito semelhante à Ponte PoS. Eles compartilham as mesmas características mencionadas no PoS na tabela acima. A única diferença é que os tokens não precisam ser mapeados na Ponte FxPortal antes da conexão. O mapeamento ocorre durante a primeira transação de depósito que é iniciada para um dado token. Além disso, qualquer pessoa pode usar o FxPortal para construir seus próprios túneis/pontes personalizados no topo da ponte Polygon. Recomenda-se usar o FxPortal para qualquer caso de uso de pontes. Novos mapeamentos de token no PoS e no Plasma serão desanimados após 31 de janeiro de 2023, de modo que o processo de mapeamento seja totalmente descentralizado e flexível.

:::

## Recursos adicionais {#additional-resources}

- [Introdução às pontes de blockchain](https://ethereum.org/en/bridges/)
- [O que são pontes de cadeia cruzada](https://www.alchemy.com/overviews/cross-chain-bridges)
