---
id: run-validator-binaries
title: I-run ang Validator Node mula sa mga Binary
sidebar_label: Using Binaries
description: Gamitin ang mga binary para i-set up ang iyong validator node
keywords:
  - docs
  - matic
  - polygon
  - binary
  - node
  - validator
  - sentry
slug: run-validator-binaries
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip
Ang mga hakbang sa gabay na ito ay may kinalaman sa paghihintay sa mga serbisyo ng H**eimdall **at B**or **para ganap na mag-sync Bilang alternatibo, maaari kang gumamit ng pinanatiling snapshot, na magpapababa sa oras ng pag-sync sa ilang oras.
Para sa mga detalyadong tagubilin, tingnan ang [<ins>Mga Tagubilin sa Snapshot para sa Heimdall at Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Para sa mga download link ng snapshot, tingnan ang [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/).

:::

Ipapaliwanag ng gabay na ito ang bawat hakbang sa pagpapatakbo ng Polygon validator node mula sa mga binary.

Para sa mga kinakailangan ng system, sundin ang gabay ng [Validator Node System Mga Kinakailangan](validator-node-system-requirements.md)

Kung nais mong simulan at patakbuhin ang validator node sa pamamagitan ng Ansible, tingnan ang [Run ng Validator Node sa Ansible](run-validator-ansible.md).

:::caution

May limitadong espasyo para sa pagtanggap ng mga bagong validator. Maaari lamang sumali ang mga bagong validator sa aktibong set kapag nag-unbond ang isang aktibong validator.

:::

## Mga Prerequisite {#prerequisites}

* Dalawang machine — isang [sentry](/docs/maintain/glossary.md#sentry) at isang [validator](/docs/maintain/glossary.md#validator).
* `build-essential` na naka-install sa parehong machine ng sentry at ng validator.

  Para i-install:

  ```sh
  sudo apt-get install build-essential
  ```

* Go 1.18 na naka-install sa parehong machine ng sentry at ng validator.

  Para i-install:

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* Naka-install ang RabbitMQ sa parehong sentry at sa mga validator machine.

Narito ang mga command na i-install ang RabbitMQ:

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

I-check ang karagdagang impormasyon tungkol sa pag-download at pag-install ng RabbitMQ [<ins>dito.</ins>](https://www.rabbitmq.com/download.html)

:::


:::info
Please ang mga hakbang sa mga [<ins>tagubilin</ins>](/maintain/validate/bloxroute.md) ng bloXroute para ikonekta ang iyong mga node sa mga gatilyo ng bloXroute.
:::

## Pangkalahatang-ideya {#overview}

Para makapunta sa isang tumatakbong validator node, isagawa ang mga sumusunod sa **eksakstong pagkakasunod-sunod ng mga hakbang**:

:::caution

Magkakaroon ka ng mga isyu sa configuration kung isinasagawa ang mga hakbang na ito nang wala sa pagkakasunod-sunod.
Mahalagang tandaan na ang isang sentry node ay dapat na palaging i-set up bago ang validator node.

:::

1. Maghanda ng dalawang machine, isa para sa sentry node at isa para sa validator node.
2. I-install ang mga binary ng Heimdall at Bor sa mga sentry at validator machine.
3. I-set up ang mga file ng serbisyo ng Heimdall at Bor sa mga sentry at validator machine.
4. I-set up ang mga serbisyo ng Heimdall at Bor sa mga sentry at validator machine.
5. I-configure ang sentry node.
6. I-start ang sentry node.
7. I-configure ang validator node.
8. I-set ang key ng may-ari at key ng signer.
9. I-start ang validator node.
10. Suriin ang kalusugan ng node sa tulong ng komunidad.

## Pag-install sa mga Binary {#installing-the-binaries}

I-install ang mga binary para sa dalawa sa mga sentry at validator machine.

### Pag-install sa Heimdall {#installing-heimdall}

Ang [Heimdall](/docs/pos/heimdall/overview) ay ang verifier layer ng katibayan ng pag-stake
na responsable sa pag-checkpoint ng representasyon ng mga Plasma block sa Ethereum mainnet.

Ang pinakabagong bersyon, ang [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), ay naglalaman ng ilang pagpapahusay tulad ng:
1. Paghihigpit sa laki ng data sa state sync txs sa:
    * **30Kb** kapag kinakatawan sa **bytes**
    * **60Kb** kapag kinakatawan sa **string**.
2. Pagpapahaba ng **tagal ng pagkaantala** sa pagitan ng mga contract event ng iba't ibang validator para matiyak na hindi napakabilis na mapupuno ang mempool kung sakaling magkaroon ng napakarming event na makakapigil sa pag-usad ng chain.

Ipinapakita ng sumusunod na halimbawa kung paano pinaghihigpitan ang laki ng data:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

I-clone ang [repository ng Heimdall](https://github.com/maticnetwork/heimdall/):

```sh
git clone https://github.com/maticnetwork/heimdall
```

Mag-navigate sa tamang [bersyon ng release](https://github.com/maticnetwork/heimdall/releases):

```sh
git checkout RELEASE_TAG
```

kung saan ang `RELEASE_TAG` ay ang tag ng bersyon ng release na ini-install mo.

Halimbawa:

```sh
git checkout v0.3.0
```

Kapag nasa tamang release ka na, i-install ang Heimdall:

```sh
make install
source ~/.profile
```

Tingnan ang pag-install ng Heimdall:

```sh
heimdalld version --long
```

:::note

Bago magpatuloy, ang Heimdall ay dapat na naka-install sa parehong sentry at validator machine.

:::

### Pag-install sa Bor {#installing-bor}

Ang [Bor](/docs/pos/bor) ay ang sidechain operator na kumikilos bilang block production layer, na nag-sync sa Heimdall para piliin ang mga block producer at verifier para sa bawat [span](/docs/maintain/glossary.md#span) at [sprint](/docs/maintain/glossary.md#sprint).

I-clone ang [repository ng Bor](https://github.com/maticnetwork/bor):

```sh
git clone https://github.com/maticnetwork/bor
```

Mag-navigate sa tamang [bersyon ng release](https://github.com/maticnetwork/bor/releases):

```sh
git checkout RELEASE_TAG
```

kung saan ang `RELEASE_TAG` ay ang tag ng bersyon ng release na ini-install mo.

Halimbawa:

```sh
git checkout v0.3.3
```

I-install ang Bor:

```sh
make bor-all
```

Gumawa ng mga symlink:

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Tingnan ang pag-install ng Bor:

```sh
bor version
```

:::note

Bago magpatuloy, ang Bor ay dapat na naka-install sa parehong sentry at validator machine.

:::

## Pag-set Up ng mga Node File {#setting-up-node-files}

:::note

Kailangang i-set up ang mga node file sa parehong sentry at validator machine.

:::

### Pag-fetch sa launch repository {#fetching-the-launch-repository}

I-clone ang [launch repository](https://github.com/maticnetwork/launch):

```sh
git clone https://github.com/maticnetwork/launch
```

### Pag-set up sa launch directory {#setting-up-the-launch-directory}

#### Sa sentry machine {#on-the-sentry-machine}

Gumawa ng `node` directory:

```sh
mkdir -p node
```

Kopyahin ang mga file at script mula sa `launch` directory papunta sa `node` directory:

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### Sa validator machine {#on-the-validator-machine}

Gumawa ng `node` directory:

```sh
mkdir -p node
```

Kopyahin ang mga file at script mula sa `launch` directory papunta sa `node` directory:

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### Pag-set up sa mga network directory {#setting-up-the-network-directories}

:::note

Patakbuhin ang seksyong ito sa parehong sentry at validator machine.

:::

#### Pag-set up sa Heimdall {#setting-up-heimdall}

Lumipat sa `node` directory:

```sh
cd ~/node/heimdall
```

Patakbuhin ang setup script:

```sh
bash setup.sh
```

#### Pag-set up sa Bor {#setting-up-bor}

Lumipat sa `node` directory:

```sh
cd ~/node/bor
```

Patakbuhin ang setup script:

```sh
bash setup.sh
```

## Pag-set Up sa mga Serbisyo {#setting-up-the-services}

:::note

Patakbuhin ang seksyong ito sa parehong sentry at validator machine.

:::

Mag-navigate sa `node` directory:

```sh
cd ~/node
```

Patakbuhin ang setup script:

```sh
bash service.sh
```

Kopyahin ang file ng serbisyo papunta sa directory ng sistema:

```sh
sudo cp *.service /etc/systemd/system/
```

## Pag-configure sa Sentry Node {#configuring-the-sentry-node}

Magsimula sa pamamagitan ng pagla-log in sa remote sentry machine.

### Pag-configure sa mga serbisyo ng Heimdall {#configuring-the-heimdall-services}

Buksan ang configuration file ng Heimdall para sa pag-edit:

```sh
vi ~/.heimdalld/config/config.toml
```

Sa `config.toml`, baguhin ang mga sumusunod na parameter:

* `moniker` — anumang pangalan. Halimbawa: `moniker = "my-sentry-node"`.
* `seeds` — ang mga address ng seed node na naglalaman ng node ID, IP address, at port.

  Gamitin ang mga sumusunod na value:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` — i-set ang value sa `true` para i-enable ang peer exchange. Halimbawa: `pex = true`.
* `private_peer_ids` — ang node ID ng Heimdall na naka-set up sa validator machine.

  Para makuha ang node ID ng Heimdall sa validator machine:

  1. Mag-log in sa validator machine.
  2. Patakbuhin ang:
     ```sh
     heimdalld tendermint show-node-id
     ```

  Halimbawa: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` — i-set ang value sa `true` para i-enable ang Prometheus metrics. Halimbawa: `prometheus = true`.
* `max_open_connections` — i-set ang value sa `100`. Halimbawa: `max_open_connections = 100`.

I-save ang mga pagbabago sa `config.toml`.

### Pag-configure sa Serbisyo ng Bor {#configuring-the-bor-service}

Buksan ang configuration file ng Bor para sa pag-edit:

```sh
`vi ~/node/bor/start.sh`
```

Sa `start.sh`, idagdag ang mga address ng boot node na binubuo ng isang node ID, isang IP address, at isang port
sa pamamagitan ng pagdaragdag ng sumusunod na linya sa dulo ng file:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

I-save ang mga pagbabago sa `start.sh`.

### Pag-configure sa isang firewall {#configuring-a-firewall}

Ang sentry machine ay dapat na nakabukas ang mga sumusunod na port sa mundo `0.0.0.0/0`:

* `26656`- Ikokonekta ng iyong serbisyo ng Heimdall ang iyong node sa iba pang mga node gamit ang serbisyo ng Heimdall.

* `30303`- Ikokonekta ng iyong serbisyo ng Bor ang iyong node sa iba pang mga node gamit ang serbisyo ng Bor.

* `22`- Para makapag-ssh ang validator saanman sila naroon.

## Pagsisimula sa Sentry Node {#starting-the-sentry-node}

Sisimulan mo muna ang serbisyo ng Heimdall. Kapag nag-sync na ang serbisyo ng Heimdall, sisimulan mo ang serbisyo ng Bor.

:::note

Gaya ng nabanggit kanina, inaabot ang serbisyo ng Heimdall nang ilang araw upang ganap na mag-sync mula sa pinakasimula.

Bilang alternatibo, maaari kang gumamit ng pinanatiling snapshot, na magpapababa sa oras ng pag-sync sa ilang oras.
Para sa mga detalyadong tagubilin, tingnan ang [<ins>Mga Tagubilin sa Snapshot para sa Heimdall at Bor</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Para sa mga link sa pag-download ng snapshot, tingnan ang [Mga Snapshot ng mga Polygon Chain](https://snapshot.polygon.technology/).

:::

### Pagsisimula sa serbisyo ng Heimdall {#starting-the-heimdall-service}

Simulan ang serbisyo ng Heimdall:

```sh
sudo service heimdalld start
```

Simulan ang rest server ng Heimdall:

```sh
sudo service heimdalld-rest-server start
```

I-check ang mga service log ng Heimdall:

```sh
journalctl -u heimdalld.service -f
```

:::note

Sa mga log, maaari mong makita ang mga sumusunod na error:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

Ang ibig sabihin ng mga log na ito ay tinanggihan ng isa sa mga node sa network ang isang koneksyon sa iyong node.
Hintayin ang iyong node na mag-crawl ng mas maraming node sa network; wala kang kailangang gawin
upang matugunan ang mga error na ito.

:::

Tingnan ang mga log ng rest-server ng Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

I-check ang status ng pag-sync ng Heimdall:

```sh
curl localhost:26657/status
```

Sa output, ang value ng `catching_up` ay:

* `true` — nagsi-sync ang serbisyo ng Heimdall.
* `false` — ang serbisyo ng Heimdall ay ganap na naka-sync.

Hintaying ganap na mag-sync ang serbisyo ng Heimdall.

### Pagsisimula sa serbisyo ng Bor {#starting-the-bor-service}

Kapag nag-sync na ang serbisyo ng Heimdall, simulan ang serbisyo ng Bor.

Simulan ang serbisyo ng Bor:

```sh
sudo service bor start
```

Tingnan ang mga log ng serbisyo ng Bor:

```sh
journalctl -u bor.service -f
```

## Pag-configure sa Validator Node {#configuring-the-validator-node}

:::note

Para makumpleto ang seksyong ito, dapat na may nakahanda kang RPC endpoint ng iyong ganap na naka-sync na Ethereum mainnet
node.

:::

### Pag-configure sa serbisyo ng Heimdall {#configuring-the-heimdall-service}

Mag-log in sa remote validator machine.

Buksan ang `vi ~/.heimdalld/config/config.toml` para sa pag-edit.

Sa `config.toml`, baguhin ang mga sumusunod:

* `moniker` — anumang pangalan. Halimbawa:`moniker = "my-validator-node"`.
* `pex` — I-set ang value sa`false`upang ma-disable ang peer exchange. Halimbawa:`pex = false`.
* `private_peer_ids` — i-comment ang value upang ma-disable ito. Halimbawa:`# private_peer_ids = ""`.

  Para makuha ang node ID ng Heimdall sa sentry machine:

  1. Mag-log in sa sentry machine.
  1. Patakbuhin ang `heimdalld tendermint show-node-id`.

Halimbawa: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` — itakda ang value sa `true` para i-enable ang mga sukatan ng Prometheus. Halimbawa:`prometheus = true`.

I-save ang mga binago sa `config.toml`.

Buksan para sa i-edit ang `vi ~/.heimdalld/config/heimdall-config.toml`.

Sa `heimdall-config.toml`, baguhin ang mga sumusunod:

* `eth_rpc_url` — isang RPC endpoint para sa isang ganap na naka-sync na Ethereum mainnet node,
iyon ay Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Halimbawa: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

I-save ang mga pagbabago sa `heimdall-config.toml`.

### Pag-configure sa serbisyo ng Bor {#configuring-the-bor-service-1}

Buksan ang `vi ~/.bor/data/bor/static-nodes.json` para sa pag-edit.

Sa `static-nodes.json`, baguhin ang mga sumusunod:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` — ang node ID at
IP address ng Bor na naka-set up sa sentry machine.

  Para makuha ang node ID ng Bor sa sentry machine:

  1. Mag-log in sa sentry machine.
  2. Patakbuhin ang `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`.

  Halimbawa: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

I-save ang mga pagbabago sa `static-nodes.json`.

## Pagtatakda sa Owner at Signer Key {#setting-the-owner-and-signer-key}

Sa Polygon, inirerekomenda na panatilihin mong magkaiba ang mga owner at signer key.

* Signer — ang address na lumalagda sa
[mga transaksyon ng checkpoint](/docs/maintain/glossary.md#checkpoint-transaction). Ang rekomendasyon ay
magpanatili ng hindi bababa sa 1 ETH sa address ng signer.
* Owner — ang address na gumagawa sa mga transaksyon sa pag-stake. Ang rekomendasyon ay panatilihin ang mga MATIC
token sa address ng owner.

### Pag-generate ng isang pribadong key ng Heimdall {#generating-a-heimdall-private-key}

Dapat ka lang mag-generate ng pribadong key ng Heimdall sa validator machine. Huwag mag-generate ng
pribadong key ng Heimdall sa sentry machine.

Para ma-generate ang pribadong key, patakbuhin ang:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

kung saan

* ETHEREUM_PRIVATE_KEY — ang pribadong key ng iyong Ethereum wallet.

Ige-generate nito ang `priv_validator_key.json`. Ilipat ang na-generate na JSON file sa Heimdall configuration
directory:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Pag-generate ng Bor keystore file {#generating-a-bor-keystore-file}

Dapat ka lang mag-generate ng Bor keystore file sa validator machine. Huwag mag-generate ng Bor keystore file
sa sentry machine.

Para ma-generate ang pribadong key, patakbuhin ang:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

kung saan

* ETHEREUM_PRIVATE_KEY — ang pribadong key ng iyong Ethereum wallet.

Kapag na-prompt, mag-set up ng password sa keystore file.

Ito ay mag-ge-generate ng`UTC-<time>-<address>` keystore file.

Ilipat ang na-generate na keystore file sa Bor configuration directory:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Idagdag ang password.txt {#add-password-txt}

Siguraduhing gumawa ng `password.txt` file tapos idagdag ang password ng Bor keystore file sa mismong
`~/.bor/password.txt` file.

### Idagdag ang iyong Ethereum address {#add-your-ethereum-address}

Buksan para sa i-edit ang `vi /etc/matic/metadata`.

Sa `metadata`idagdag ang iyong Ethereum address. Halimbawa:`VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

I-save ang mga pagbabago sa `metadata`.

## Pagsisimula sa Validator Node {#starting-the-validator-node}

Sa puntong ito, dapat na:

* Nagsi-sync at tumatakbo ang serbisyo ng Heimdall sa sentry machine.
* Tumatakbo ang serbisyo ng Bor sa sentry machine.
* Ang serbisyong Heimdall at ang serbisyo ng Bor sa validator machine ay na-configure.
* Naka-configure ang iyong mga owner at signer key.

### Pagsisimula sa serbisyo ng Heimdall {#starting-the-heimdall-service-1}

Sisimulan mo na ngayon ang serbisyo ng Heimdall sa validator machine. Kapag nag-sync na ang serbisyo ng Heimdall,
sisimulan mo ang serbisyo ng Bor sa validator machine

I-start ang serbisyo ng Heimdall:

```sh
sudo service heimdalld start
```

I-start ang rest server na Heimdall:

```sh
sudo service heimdalld-rest-server start
```

I-start ang bridge ng Heimdall:

```sh
sudo service heimdalld-bridge start
```

I-check ang mga log ng serbisyo ng Heimdall:

```sh
journalctl -u heimdalld.service -f
```

I-check rest server log ng Heimdall:

```sh
journalctl -u heimdalld-rest-server.service -f
```

I-check ang mga log ng Heimdall bridge:

```sh
journalctl -u heimdalld-bridge.service -f
```

I-check ang estado ng pag-sync ng Heimdall:

```sh
curl localhost:26657/status
```

Sa output, ang value ng `catching_up` ay:

* `true` — ang serbisyo ng Heimdall ay nagsi-sync.
* `false` — ang serbisyo ng Heimdall ay naka-sync.

Hintaying ganap na mag-sync ang serbisyo ng Heimdall.

### Pagsisimula sa serbisyo ng Bor {#starting-the-bor-service-1}

Kapag nag-sync na ang serbisyo ng Heimdall sa validator machine, simulan ang serbisyo ng Bor sa
validator machine.

Simulan ang serbisyo ng Bor:

```sh
sudo service bor start
```

Tingnan ang mga log ng serbisyo ng Bor:

```sh
journalctl -u bor.service -f
```

## Mga Pagsusuri ng Kalusugan sa tulong ng Komunidad {#health-checks-with-the-community}

Ngayong naka-sync na at tumatakbo ang iyong mga sentry at validator node, magtungo sa
[Discord](https://discord.com/invite/0xPolygon) at hilingin sa komunidad na suriin ang kalusugan ng iyong mga node.

:::note

Bilang mga validator, ipinag-uutos na laging magkaroon ng check ng signer address. Kung umabot sa ibaba ang balanse ng ETH 0.5 ETH dapat itong i-refill. Pag-iwas nito ay itutulak ang mga node mula sa pagsusumite ng mga transaksyon ng checkpoint

:::

## Mga Susunod na Hakbang: Pag-stake {#next-steps-staking}

Ngayong naipasuri mo na ang kalusugan ng iyong mga sentry at validator node, magpatuloy sa
gabay sa [Pag-stake](/docs/maintain/validator/core-components/staking.md) upang simulan ang pag-alalay sa network.
