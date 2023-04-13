---
id: port-management
title: Infrastructure technique pour les nœuds
sidebar_label: Technical Infrastructure For Nodes
description: Liste des ports par défaut utilisés dans les nœuds Polygon
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

Voici une liste des ports par défaut utilisés sur les nœuds Polygon :

## Bor {#bor}

| ﻿Nom | Port | Tags | description |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Port d'écoute réseau | 30303 | public | Port d'écoute réseau. Bor utilise ce port pour se connecter aux pairs et synchroniser |
| Serveur RPC | 8545 | can-be-public, internal | Port RPC pour envoyer une transaction et obtenir des données de Bor. Heimdall utilise ce port pour obtenir des en-têtes Bor pour les points de contrôle |
| Serveur WS | 8546 | can-be-public, internal | Port Websocket |
| Serveur Graphql | 8547 | can-be-public, internal | Port Graphql |
| Serveur Prometheus | 9091 | can-be-public, monitoring | API du serveur Prometheus comme source de données dans Grafana. Il peut être mappé à 80/443 via le proxy inverse nginx |
| Serveur Grafana | 3001 | can-be-public, monitoring | Serveur web Grafana. Il peut être mappé à 80/443 via le proxy inverse nginx |
| Serveur Pprof | 7071 | internal, monitoring | Serveur Pprof pour collecter les métriques de Bor |
| Découverte sur UDP | 30301 | can-be-public, internal | Port par défaut du nœud d'amorçage (pour la découverte des pairs) |

## Heimdall {#heimdall}

| ﻿Nom | Port | Tags | description |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Port d'écoute réseau | 30303 | public | Port d'écoute réseau. Bor utilise ce port pour se connecter aux pairs et synchroniser |
| Serveur RPC | 8545 | can-be-public, internal | Port RPC pour envoyer une transaction et obtenir des données de Bor. Heimdall utilise ce port pour obtenir des en-têtes Bor pour les points de contrôle |
| Serveur WS | 8546 | can-be-public, internal | Port Websocket |
| Serveur Graphql | 8547 | can-be-public, internal | Port Graphql |
| Serveur Prometheus | 9091 | can-be-public, monitoring | API du serveur Prometheus comme source de données dans Grafana. Il peut être mappé à 80/443 via le proxy inverse nginx |
| Serveur Grafana | 3001 | can-be-public, monitoring | Serveur web Grafana. Il peut être mappé à 80/443 via le proxy inverse nginx |
| Serveur Pprof | 7071 | internal, monitoring | Serveur Pprof pour collecter les métriques de Bor |
| Découverte sur UDP | 30301 | can-be-public, internal | Port par défaut du nœud d'amorçage (pour la découverte des pairs) |