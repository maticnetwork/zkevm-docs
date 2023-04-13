---
id: port-management
title: Infrastruktur teknis untuk node
sidebar_label: Technical Infrastructure For Nodes
description: Daftar pelabuhan default yang digunakan di node Polygon
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

Berikut ini adalah daftar port default yang digunakan di node Polygon:

## Bor {#bor}

| ﻿Nama | Port | Tag | deskripsi |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Port mendengarkan jaringan | 30303 | publik | Port mendengarkan jaringan. Bor menggunakan port ini untuk terhubung ke peer dan menyinkronkan |
| server RPC | 8545 | bisa-jadi-publik, internal | Port RPC untuk mengirim transaksi dan mendapatkan data dari Bor. Heimdall menggunakan port ini untuk mendapatkan header Bor untuk titik periksa |
| Server WS | 8546 | bisa-jadi-publik, internal | Port websocket |
| Server Graphql | 8547 | bisa-jadi-publik, internal | Port Graphql |
| Server Prometheus | 9091 | bisa-jadi-publik, pemantauan | API server Prometheus sebagai sumber data di Grafana. Ini dapat dipetakan ke 80/443 melalui proxy balik nginx |
| Server Grafana | 3001 | bisa-jadi-publik, pemantauan | Server web Grafana. Ini dapat dipetakan ke 80/443 melalui proxy balik nginx |
| Server Pprof | 7071 | internal, pemantauan | Server Pprof untuk mengumpulkan metrik dari Bor |
| Penemuan UDP | 30301 | bisa-jadi-publik, internal | Port default Bootnode (untuk penemuan peer) |

## Heimdall {#heimdall}

| ﻿Nama | Port | Tag | deskripsi |
|------------------------|-------|---------------------------|----------------------------------------------------------------------------------------------------------------|
| Port mendengarkan jaringan | 30303 | publik | Port mendengarkan jaringan. Bor menggunakan port ini untuk terhubung ke peer dan menyinkronkan |
| server RPC | 8545 | bisa-jadi-publik, internal | Port RPC untuk mengirim transaksi dan mendapatkan data dari Bor. Heimdall menggunakan port ini untuk mendapatkan header Bor untuk titik periksa |
| Server WS | 8546 | bisa-jadi-publik, internal | Port websocket |
| Server Graphql | 8547 | bisa-jadi-publik, internal | Port Graphql |
| Server Prometheus | 9091 | bisa-jadi-publik, pemantauan | API server Prometheus sebagai sumber data di Grafana. Ini dapat dipetakan ke 80/443 melalui proxy balik nginx |
| Server Grafana | 3001 | bisa-jadi-publik, pemantauan | Server web Grafana. Ini dapat dipetakan ke 80/443 melalui proxy balik nginx |
| Server Pprof | 7071 | internal, pemantauan | Server Pprof untuk mengumpulkan metrik dari Bor |
| Penemuan UDP | 30301 | bisa-jadi-publik, internal | Port default Bootnode (untuk penemuan peer) |