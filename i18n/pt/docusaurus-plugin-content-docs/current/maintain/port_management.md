---
id: port-management
title: Infraestrutura técnica para nós
sidebar_label: Technical Infrastructure For Nodes
description: Lista de portas padrão usadas nos nós do Polygon
keywords:
  - docs
  - polygon
  - matic
  - port
  - port management
  - infrastructure
  - default ports
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Aqui está uma lista de portas padrão usadas em nós da Polygon:

## BOR {#bor}

| ﻿Nome | Porta | Tags | descrição |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Porta de escuta de rede | 30303 | público | Porta de escuta de rede. BOR usa esta porta para se conectar a pares e sincronizar |
| Servidor RPC | 8545 | pode ser público, interno | Porta RPC para enviar transação e obter dados do BOR. Heimdall usa esta porta para obter títulos BOR para checkpoints |
| Servidor WS | 8546 | pode ser público, interno | Porta websocket |
| Servidor Graphql | 8547 | pode ser público, interno | Porta Graphql |
| Servidor Prometheus | 9091 | pode ser público, monitorização | APIs do servidor Prometheus como fonte de dados no Grafana. Pode ser mapeado para 80/443 através de proxy reverso nginx |
| Servidor Grafana | 3001 | pode ser público, monitorização | Servidor web Grafana. Pode ser mapeado para 80/443 através de proxy reverso nginx |
| Servidor Pprof | 7071 | interno, monitorização | Servidor Pprof para recolher métricas de BOR |
| UDP discovery | 30301 | pode ser público, interno | Porta padrão Bootnode (para descoberta por pares) |

## Heimdall {#heimdall}

| ﻿Nome | Porta | Tags | descrição |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Porta de escuta de rede | 30303 | público | Porta de escuta de rede. BOR usa esta porta para se conectar a pares e sincronizar |
| Servidor RPC | 8545 | pode ser público, interno | Porta RPC para enviar transação e obter dados do BOR. Heimdall usa esta porta para obter títulos BOR para checkpoints |
| Servidor WS | 8546 | pode ser público, interno | Porta websocket |
| Servidor Graphql | 8547 | pode ser público, interno | Porta Graphql |
| Servidor Prometheus | 9091 | pode ser público, monitorização | APIs do servidor Prometheus como fonte de dados no Grafana. Pode ser mapeado para 80/443 através de proxy reverso nginx |
| Servidor Grafana | 3001 | pode ser público, monitorização | Servidor web Grafana. Pode ser mapeado para 80/443 através de proxy reverso nginx |
| Servidor Pprof | 7071 | interno, monitorização | Servidor Pprof para recolher métricas de BOR |
| UDP discovery | 30301 | pode ser público, interno | Porta padrão Bootnode (para descoberta por pares) |