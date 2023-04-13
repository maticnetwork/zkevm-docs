---
id: network-rpc-endpoints
title: Titik Akhir Jaringan
sidebar_label: Endpoints
description: Titik akhir jaringan untuk mainnet PoS dan testnet
keywords:
  - docs
  - polygon
  - matic
  - remote procedure call
  - network endpoints
  - rpcs
  - http
  - websocket
  - wss
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: endpoints
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Panduan indeks ini berisi rincian jaringan untuk testnet Mumbai Polygon dan Polygon PoS Mainnet dan daftar RPC dan titik akhir node terkait.

<Tabs
defaultValue="mainnet"
values={[
{ label: 'PoS Mainnet', value: 'mainnet', },
{ label: 'PoS Testnet', value: 'mumbai', },
]
}>
<TabItem value="mumbai">

## Testnet PoS Mumbai {#mumbai-pos-testnet}

Testnet Mumbai mereplikasi Mainnet Polygon dan digunakan untuk pengujian. Pengguna dapat memperoleh
token testnet dari [faucet](https://faucet.polygon.technology/).
Token testnet tidak berharga dan berbeda dari aset bernilai seperti MATIC.
Ini memungkinkan pengembang atau pemelihara jaringan untuk menguji konfigurasi dan mencoba implementasi.

| Properti | Detail Jaringan |
| ---------------------------------- | ---------------------------------------------------------------- |
| NetworkName | **Mumbai** |
| ParentChain | **[Goërli](https://goerli.net/)** |
| chainId | `80001` |
| Token Gas | [MATIC](gas-token) |
| Stasiun Gas | [Stasiun Gas Mumbai](https://gasstation-mumbai.matic.today/v2) (pelajari selengkapnya [di sini](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)) |
| Titik Akhir RPC | [https://rpc-mumbai.matic.today](https://rpc-mumbai.matic.today) |
| Titik Akhir Node | [wss://rpc-mumbai.matic.today](wss://rpc-mumbai.matic.today) |
| API Heimdall | [https://heimdall-api-testnet.polygon.technology](https://heimdall-api-testnet.polygon.technology) |
| Penjelajah Blok | [https://mumbai.polygonscan.com/](https://mumbai.polygonscan.com/) |

:::note Detail selengkapnya

Lihat [**data JSON**](https://static.matic.network/network/testnet/mumbai/index.json) berikut yang berisi
detail jaringan.

:::

</TabItem>
<TabItem value="mainnet">

## Mainnet PoS Polygon {#polygon-pos-mainnet}

Token asli PoS Polygon adalah MATIC dan digunakan untuk gas.

| Properti | Detail Jaringan |
| ---------------------------------- | ---------------------------------------------------------------- |
| NetworkName | **Polygon** |
| ParentChain | **Ethereum** |
| chainId | `137` |
| Token Gas | [MATIC](gas-token) |
| Stasiun Gas | [Pelacak Gas PolygonScan (**direkomendasikan**)](https://polygonscan.com/gastracker) atau [Stasiun Gas Jaringan Matic](https://gasstation-mainnet.matic.network/v2) (pelajari lebih lanjut [di sini](https://docs.polygon.technology/docs/develop/tools/polygon-gas-station/)) |
| Titik Akhir RPC | [https://polygon-rpc.com/](https://polygon-rpc.com/) |
| Titik Akhir Node | [wss://rpc-mainnet.matic.network](wss://rpc-mainnet.matic.network) |
| API Heimdall | [https://heimdall-api.polygon.technology](https://heimdall-api.polygon.technology) |
| Penjelajah Blok | [https://polygonscan.com/](https://polygonscan.com/) |

:::note Detail selengkapnya

Lihat [**data JSON**](https://github.com/maticnetwork/static/blob/master/network/mainnet/v1/index.json) berikut
yang berisi detail jaringan.

:::

</TabItem>
</Tabs>

## Metode API RPC {#rpc-api-methods}

Pengembang dapat berinteraksi dengan data on-chain dan mengirimkan jenis transaksi yang berbeda ke
jaringan dengan menggunakan titik akhir jaringan. API mengikuti standar JSON-RPC:
JSON-RPC adalah protokol panggilan prosedur jarak jauh (RPC) yang stateless, ringan, dan
umum digunakan ketika berinteraksi dengan jaringan blockchain.

:::info Mulai RPC dengan memanggil

Mulai dengan mengunjungi dokumentasi API lengkap untuk standar
[**panggilan Polygon JSON-RPC**](https://edge-docs.polygon.technology/docs/get-started/json-rpc-commands/).

Jika Anda ingin memulai permintaan API yang tidak memerlukan pengaturan apa pun, memperbaiki permintaan yang gagal, atau
menjelajahi metode baru pada jaringan Polygon, coba [**Composser App**](https://composer.alchemyapi.io?composer_state=%7B%22chain%22%3A2%2C%22network%22%3A401%2C%22methodName%22%3A%22eth_getBlockByNumber%22%2C%22paramValues%22%3A%5B%22latest%22%2Cfalse%5D%7D).

:::

Pengguna juga dapat menjalankan node sendiri ketika berinteraksi dengan rantai PoS Polygon atau menggunakan
salah satu titik akhir publik yang disediakan oleh penyedia infrastruktur dan layanan API untuk terhubung ke
jaringan. Dagger adalah cara terbaik untuk mendapatkan pemutakhiran waktu nyata dari rantai karena memberikan cara
agar sistem dApp dan backend bisa mendapatkan peristiwa blockchain secara waktu nyata melalui socket atau websocket.

### Penyedia Infrastruktur {#infrastructure-providers}

RPC publik mungkin memiliki lalu lintas atau batas-tarif tergantung penggunaan.
Anda dapat mendaftar untuk URL RPC khusus yang gratis di berikut ini:

* [Alchemy](https://www.alchemy.com/)
* [Ankr](https://www.ankr.com/)
* [Blast (Bware Labs)](https://blastapi.io/)
* [BlockPI](https://blockpi.io/)
* [BlockSpaces](https://www.blockspaces.com/web3-infrastructure)
* [Chainnodes](https://www.chainnodes.org/)
* [Chainstack](https://chainstack.com/build-better-with-polygon/)
* [DataHub (Figment)](https://datahub.figment.io)
* [Getblock](https://getblock.io/en/)
* [Infura](https://infura.io)
* [MaticVigil](https://rpc.maticvigil.com/)
* [Moralis](https://moralis.io)
* [Pocket Network](https://www.portal.pokt.network/)
* [QuickNode](https://www.quicknode.com/chains/matic)
* [SettleMint](https://docs.settlemint.com/docs/polygon-connect-to-a-node)
* [WatchData](https://docs.watchdata.io/blockchain-apis/polygon-api)
* [NOWNodes](https://nownodes.io/nodes/polygon-matic)
