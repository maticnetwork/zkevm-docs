---
id: overview
title: Visão geral
description: Heimdall é o coração da rede Polygon
keywords:
  - docs
  - matic
  - polygon
  - heimdall
  - cosmos
  - peppermint
image: https://matic.network/banners/matic-network-16x9.png
---

# Heimdall {#heimdall}

Heimdall é o coração da rede Polygon. Este gere os validadores, seleção de produtores de blocos, spans, o mecanismo de sincronização de estado entre a Ethereum e a MATIC e outros aspectos essenciais do sistema.

Ele usa o **Cosmos-SDK** e uma versão forked do Tendermint, chamada **Peppermint**. Aqui está a fonte do Peppermint: [https://github.com/maticnetwork/tendermint/tree/peppermint](https://github.com/maticnetwork/tendermint/tree/peppermint)

O Heimdall remove alguns módulos do Cosmos-SDK, mas usa principalmente uma versão personalizada dele enquanto segue o mesmo padrão.