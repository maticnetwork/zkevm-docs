---
id: port-management
title: Düğümler için teknik altyapı
sidebar_label: Technical Infrastructure For Nodes
description: Polygon düğümlerinde kullanılan varsayılan portların listesi
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

Polygon düğümlerinde kullanılan varsayılan portların listesi aşağıdadır:

## Bor {#bor}

| ﻿Adı | Bağlantı noktası | Etiketler | açıklama |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Ağı dinleyen port | 30303 | genel | Ağı dinleyen port. Bor bu portu eşlere bağlanmak ve senkronizasyon yapmak için kullanır |
| RPC sunucusu | 8545 | genel olabilir, dahili | İşlem göndermek ve Bor'dan veriler almak için RPC portu. Heimdall bu portu denetim noktaları için Bor header'larını getirmek için kullanır |
| WS sunucusu | 8546 | genel olabilir, dahili | Websocket portu |
| Graphql sunucusu | 8547 | genel olabilir, dahili | Graphql portu |
| Prometheus sunucusu | 9091 | genel olabilir, izleme | Grafana'da veri kaynağı olarak Prometheus sunucusu API'leri. Nginx ters proxy yoluyla 80/443'e eşlenebilir |
| Grafana sunucusu | 3001 | genel olabilir, izleme | Grafana web sunucusu. Nginx ters proxy yoluyla 80/443'e eşlenebilir |
| Pprof sunucusu | 7071 | dahili, izleme | Bor'dan metrikleri toplamak için Pprof sunucusu |
| UDP discovery | 30301 | genel olabilir, dahili | Bootnode varsayılan portu (eş bulmak için) |

## Heimdall {#heimdall}

| ﻿Adı | Bağlantı noktası | Etiketler | açıklama |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Ağı dinleyen port | 30303 | genel | Ağı dinleyen port. Bor bu portu eşlere bağlanmak ve senkronizasyon yapmak için kullanır |
| RPC sunucusu | 8545 | genel olabilir, dahili | İşlem göndermek ve Bor'dan veriler almak için RPC portu. Heimdall bu portu denetim noktaları için Bor header'larını getirmek için kullanır |
| WS sunucusu | 8546 | genel olabilir, dahili | Websocket portu |
| Graphql sunucusu | 8547 | genel olabilir, dahili | Graphql portu |
| Prometheus sunucusu | 9091 | genel olabilir, izleme | Grafana'da veri kaynağı olarak Prometheus sunucusu API'leri. Nginx ters proxy yoluyla 80/443'e eşlenebilir |
| Grafana sunucusu | 3001 | genel olabilir, izleme | Grafana web sunucusu. Nginx ters proxy yoluyla 80/443'e eşlenebilir |
| Pprof sunucusu | 7071 | dahili, izleme | Bor'dan metrikleri toplamak için Pprof sunucusu |
| UDP discovery | 30301 | genel olabilir, dahili | Bootnode varsayılan portu (eş bulmak için) |