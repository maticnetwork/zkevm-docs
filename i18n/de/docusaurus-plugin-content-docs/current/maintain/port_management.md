---
id: port-management
title: Technische Infrastruktur für Knoten
sidebar_label: Technical Infrastructure For Nodes
description: Liste der Standard-Ports verwendet über Polygon Knoten
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

Hier ist eine Liste der Standardanschlüsse, die bei allen Polygon-Knoten verwendet werden:

## Bor {#bor}

| ﻿Name | Anschluss | Tags | Beschreibung |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Netzwerküberwachungsanschluss | 30303 | öffentlich | Netzwerküberwachungsanschluss. Bor verwendet diesen Anschluss, um sich mit Peers zu verbinden und zu synchronisieren |
| RPC-Server | 8545 | kann öffentlich sein, intern, | RPC-Anschluss zum Senden von Transaktionen und Abrufen von Daten aus Bor. Heimdall nutzt diesen Anschluss, um Bor-Header für Checkpoints zu beziehen |
| WS-Server | 8546 | kann öffentlich sein, intern, | Websocket-Anschluss |
| Grafql-Server | 8547 | kann öffentlich sein, intern, | Grafql-Anschluss |
| Prometheus-Server | 9091 | kann öffentlich sein, überwachen | Prometheus-Server APIs als Datenquelle in Grafana. Es kann über den Nginx Reverse Proxy auf 80/443 abgebildet werden |
| Grafana-Server | 3001 | kann öffentlich sein, überwachen | Grafana-Webserver. Es kann über den Nginx Reverse Proxy auf 80/443 abgebildet werden |
| Pprof-Server | 7071 | intern, überwachen | Pprof-Server zur Erfassung von Bor-Metriken |
| UDP-Erkennung | 30301 | kann öffentlich sein, intern, | Bootnode Standardanschluss (für Peer-Erkennung) |

## Heimdall {#heimdall}

| ﻿Name | Anschluss | Tags | Beschreibung |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Netzwerküberwachungsanschluss | 30303 | öffentlich | Netzwerküberwachungsanschluss. Bor verwendet diesen Anschluss, um sich mit Peers zu verbinden und zu synchronisieren |
| RPC-Server | 8545 | kann öffentlich sein, intern, | RPC-Anschluss zum Senden von Transaktionen und Abrufen von Daten aus Bor. Heimdall nutzt diesen Anschluss, um Bor-Header für Checkpoints zu beziehen |
| WS-Server | 8546 | kann öffentlich sein, intern, | Websocket-Anschluss |
| Grafql-Server | 8547 | kann öffentlich sein, intern, | Grafql-Anschluss |
| Prometheus-Server | 9091 | kann öffentlich sein, überwachen | Prometheus-Server APIs als Datenquelle in Grafana. Es kann über den Nginx Reverse Proxy auf 80/443 abgebildet werden |
| Grafana-Server | 3001 | kann öffentlich sein, überwachen | Grafana-Webserver. Es kann über den Nginx Reverse Proxy auf 80/443 abgebildet werden |
| Pprof-Server | 7071 | intern, überwachen | Pprof-Server zur Erfassung von Bor-Metriken |
| UDP-Erkennung | 30301 | kann öffentlich sein, intern, | Bootnode Standardanschluss (für Peer-Erkennung) |