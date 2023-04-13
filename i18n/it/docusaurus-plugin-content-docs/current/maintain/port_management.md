---
id: port-management
title: Infrastruttura tecnica per i nodi
sidebar_label: Technical Infrastructure For Nodes
description: Elenco delle porte predefinite utilizzate nei nodi di Polygon
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

Il seguente è un elenco delle porte di default utilizzate nei nodi Polygon:

## Bor {#bor}

| Nome | Porta | Tag | descrizione |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Porta di ascolto della rete | 30303 | pubblica | Porta di ascolto della rete. Bor utilizza questa porta per connettersi ai peer ed effettuare la sincronizzazione |
| Server RPC | 8545 | can-be-public, interno | Porta RPC per inviare la transazione e ottenere dati da Bor. Heimdall utilizza questa porta per ottenere le intestazioni Bor per i checkpoint |
| Server WS | 8546 | can-be-public, interno | Porta websocket |
| Server Graphql | 8547 | can-be-public, interno | Porta Graphql |
| Server Prometheus | 9091 | can-be-public, monitoraggio | Gli API del server Prometheus come fonte di dati in Grafana. Può essere mappato a 80/443 tramite proxy inverso nginx |
| Server Grafana | 3001 | can-be-public, monitoraggio | Web server Grafana. Può essere mappato a 80/443 tramite proxy inverso nginx |
| Server Pprof | 7071 | interno, monitoraggio | Server Pprof per raccogliere le metriche da Bor |
| Ricerca UDP | 30301 | can-be-public, interno | Porta di default Bootnode (per la ricerca peer) |

## Heimdall {#heimdall}

| Nome | Porta | Tag | descrizione |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Porta di ascolto della rete | 30303 | pubblica | Porta di ascolto della rete. Bor utilizza questa porta per connettersi ai peer ed effettuare la sincronizzazione |
| Server RPC | 8545 | can-be-public, interno | Porta RPC per inviare la transazione e ottenere dati da Bor. Heimdall utilizza questa porta per ottenere le intestazioni Bor per i checkpoint |
| Server WS | 8546 | can-be-public, interno | Porta websocket |
| Server Graphql | 8547 | can-be-public, interno | Porta Graphql |
| Server Prometheus | 9091 | can-be-public, monitoraggio | Gli API del server Prometheus come fonte di dati in Grafana. Può essere mappato a 80/443 tramite proxy inverso nginx |
| Server Grafana | 3001 | can-be-public, monitoraggio | Web server Grafana. Può essere mappato a 80/443 tramite proxy inverso nginx |
| Server Pprof | 7071 | interno, monitoraggio | Server Pprof per raccogliere le metriche da Bor |
| Ricerca UDP | 30301 | can-be-public, interno | Porta di default Bootnode (per la ricerca peer) |