---
id: port-management
title: Teknikal na imprastraktura para sa mga node
sidebar_label: Technical Infrastructure For Nodes
description: Listahan ng mga default port na ginamit sa mga Polygon node
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

Narito ang isang listahan ng mga default na port na ginagamit sa mga Polygon node:

## Bor {#bor}

| ﻿Pangalan | Port | Mga tag | paglalarawan |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Network listening port | 30303 | pampubliko | Network listening port. Ginagamit ng Bor ang port na ito para kumonekta sa mga peer at mag-sync |
| RPC server | 8545 | puwedeng pampubliko, internal | RPC port para magpadala ng transaksyon at makakuha ng data mula sa Bor. Ginagamit ng Heimdall ang port na ito para makakuha ng mga header ng Bor para sa mga checkpoint |
| WS server | 8546 | puwedeng pampubliko, internal | Websocket port |
| Graphql server | 8547 | puwedeng pampubliko, internal | Graphql port |
| Prometheus server | 9091 | puwedeng pampubliko, monitoring | Prometheus server APIs bilang datasource sa Grafana. Puwede itong i-mapa sa 80/443 sa pamamagitan ng nginx reverse proxy |
| Grafana server | 3001 | puwedeng pampubliko, monitoring | Grafana web sever. Puwede itong i-mapa sa 80/443 sa pamamagitan ng nginx reverse proxy |
| Pprof server | 7071 | internal, monitoring | Pprof server para kumolekta ng mga metric mula sa Bor |
| UDP discovery | 30301 | puwedeng pampubliko, internal | Bootnode default port (para sa pagtuklas ng peer) |

## Heimdall {#heimdall}

| ﻿Pangalan | Port | Mga tag | paglalarawan |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Network listening port | 30303 | pampubliko | Network listening port. Ginagamit ng Bor ang port na ito para kumonekta sa mga peer at mag-sync |
| RPC server | 8545 | puwedeng pampubliko, internal | RPC port para magpadala ng transaksyon at makakuha ng data mula sa Bor. Ginagamit ng Heimdall ang port na ito para makakuha ng mga header ng Bor para sa mga checkpoint |
| WS server | 8546 | puwedeng pampubliko, internal | Websocket port |
| Graphql server | 8547 | puwedeng pampubliko, internal | Graphql port |
| Prometheus server | 9091 | puwedeng pampubliko, monitoring | Prometheus server APIs bilang datasource sa Grafana. Puwede itong i-mapa sa 80/443 sa pamamagitan ng nginx reverse proxy |
| Grafana server | 3001 | puwedeng pampubliko, monitoring | Grafana web sever. Puwede itong i-mapa sa 80/443 sa pamamagitan ng nginx reverse proxy |
| Pprof server | 7071 | internal, monitoring | Pprof server para kumolekta ng mga metric mula sa Bor |
| UDP discovery | 30301 | puwedeng pampubliko, internal | Bootnode default port (para sa pagtuklas ng peer) |