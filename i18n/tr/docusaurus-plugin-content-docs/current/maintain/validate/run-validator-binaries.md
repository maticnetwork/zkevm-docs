---
id: run-validator-binaries
title: Binaries üzerinden Doğrulayıcı Düğümünü çalıştırın
sidebar_label: Using Binaries
description: Doğrulayıcı düğümünüzü ayarlamak için ikili seçenekleri kullanın
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
Bu kılavuzdaki adımlar, H**eimdall **ve B**or **hizmetlerinin tam olarak senkronize edilmesini beklemeyi içerir. Alternatif olarak, elinizde bulunan bir anlık görüntüyü kullanarak senkronizasyon süresini birkaç saate düşürebilirsiniz.
Detaylı talimatlar için, bkz. [<ins>Heimdall ve Bor için Anlık Görüntü Talimatları</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Anlık görüntü indirme bağlantıları için [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/). bakın.

:::

Bu kılavuzda ikili dosyalardan bir Polygon doğrulayıcı düğümü çalıştırılması anlatılmaktadır.

Sistem gereksinimleri için [Validator Düğüm Sistemi Gereksinimleri](validator-node-system-requirements.md) kılavuzunu takip edin.

Doğrulayıcı düğümünü Ansible üzerinden başlatmak ve çalıştırmak istiyorsanız, [Ansible ile Bir Doğrulayıcı Düğümü](run-validator-ansible.md) Çalıştırın bölümüne bakın.

:::caution

Yeni doğrulayıcıları kabul etmek için sınırlı bir yer vardır. Yeni doğrulayıcılar yalnızca aktif bir doğrulayıcı ile aktif kümeye katılabilir.

:::

## Ön Koşullar {#prerequisites}

* İki makine - biri [sentry](/docs/maintain/glossary.md#sentry) makine, diğeri [doğrulayıcı](/docs/maintain/glossary.md#validator) makine
* Hem sentry makinede hem doğrulayıcı makinede `build-essential` kurulu olması.

Kurmak için:

  ```sh
  sudo apt-get install build-essential
  ```

* Hem sentry makinede hem doğrulayıcı makinede Go 1.18 kurulu olması.

Kurmak için:

  ```sh
  wget https://raw.githubusercontent.com/maticnetwork/node-ansible/master/go-install.sh
  bash go-install.sh
  sudo ln -nfs ~/.go/bin/go /usr/bin/go
  ```

* RabbitMQ hem nöbetçi hem de doğrulayıcı makinelerine monte edilmiştir.

to yüklemek için komutlar şunlardır:

  ```sh
  sudo apt-get update
  sudo apt install build-essential
  sudo apt install erlang
  wget https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.8/rabbitmq-server_3.10.8-1_all.deb
  sudo dpkg -i rabbitmq-server_3.10.8-1_all.deb

  ```
:::tip

RabbitMQ indirip yüklemeye ilişkin daha fazla bilgiyi [<ins>buradan</ins>](https://www.rabbitmq.com/download.html) kontrol edin.

:::


:::info
Lütfen düğümlerinizi [<ins>bloXroute</ins>](/maintain/validate/bloxroute.md) ağ geçitlerine bağlamak için bloXroute talimatlarındaki adımları izleyin.
:::

## Genel Bakış {#overview}

Çalışan bir doğrulayıcı düğümü elde etmek için aşağıdaki adımları **tam olarak aynı sırayla uygulayın**:

:::caution

Bu adımları farklı bir sırayla uygularsanız yapılandırma sorunlarıyla karşılaşırsınız. Bir sentry düğümünün mutlaka doğrulayıcı düğümünden önce kurulması gerektiğini akılda tutmak önemli.

:::

1. Biri sentry düğümü, diğeri doğrulayıcı düğümü için olmak üzere iki makine hazırlayın.
2. Heimdall ve Bor ikili dosyalarını sentry ve doğrulayıcı makinelerine yükleyin.
3. Heimdall ve Bor servisi dosyalarını sentry ve doğrulayıcı makinelerine yükleyin.
4. Heimdall ve Bor servislerini sentry ve doğrulayıcı makinelerinde kurun.
5. Sentry düğümünü yapılandırın.
6. Sentry düğümünü başlatın.
7. Doğrulayıcı düğümünü yapılandırın.
8. Owner (sahip) ve signer (imzacı) anahtarlarını oluşturun.
9. Doğrulayıcı düğümünü başlatın.
10. Düğümün sağlığını toplulukla birlikte kontrol edin.

## İkili Dosyaların kurulması {#installing-the-binaries}

İkili dosyaları hem sentry hem doğrulayıcı makinelerinde kurun.

### Heimdall'ın kurulması {#installing-heimdall}

[Heimdall](/docs/pos/heimdall/overview) proof of stake (hisse kanıtı) doğrulayıcı katmanıdır
Plasma bloklarının temsilinin Ethereum mainnet'e denetim noktası olarak işlenmesinden sorumludur.

En son sürüm olan [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0) aşağıdaki gibi birkaç geliştirmeyi içerir:
1. Durum senkronizasyon işlemlerinde veri boyutunu aşağıdakilerle kısıtlama:
    * **Bayt** cinsinden ifade edildiğinde **30 Kb**
    * **Dize** cinsinden ifade edildiğinde **60 Kb**.
2. Zincirin ilerlemesini engelleyebilecek bir olaylar patlaması olduğunda mempool'un çok hızlı dolmaması için farklı doğrulayıcıların sözleşme olayları arasındaki **gecikme süresinin** artırılması.

Aşağıdaki örnekte veri boyutunun nasıl kısıtlandığı gösterilmektedir:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

[Heimdall deposunu](https://github.com/maticnetwork/heimdall/) klonlayın:

```sh
git clone https://github.com/maticnetwork/heimdall
```

Doğru [release version](https://github.com/maticnetwork/heimdall/releases)'a (sürüm versiyonu) gidin:

```sh
git checkout RELEASE_TAG
```

burada `RELEASE_TAG`, kurduğunuz sürüm versiyonunun etiketidir.

Örneğin:

```sh
git checkout v0.3.0
```

Doğru release'deyseniz (sürüm), Heimdall'ı kurun:

```sh
make install
source ~/.profile
```

Heimdall kurulumunu kontrol edin:

```sh
heimdalld version --long
```

:::note

Devam etmeden önce, Heimdall hem sentry hem doğrulayıcı makinelerinde kurulmuş olmalıdır.

:::

### Bor'un kurulması {#installing-bor}

[Bor](/docs/pos/bor) blok üretim katmanı olarak işlev gören yan zincir operatörüdür ve bu işlem her bir [span](/docs/maintain/glossary.md#span) ve [sprint](/docs/maintain/glossary.md#sprint) için blok üreticilerini ve doğrulayıcıları seçmek için Heimdall ile senkronize edilir.

[Bor deposunu](https://github.com/maticnetwork/bor) klonlayın:

```sh
git clone https://github.com/maticnetwork/bor
```

Doğru [release version](https://github.com/maticnetwork/bor/releases)'a (sürüm versiyonu) gidin:

```sh
git checkout RELEASE_TAG
```

burada `RELEASE_TAG`, kurduğunuz sürüm versiyonunun etiketidir.

Örneğin:

```sh
git checkout v0.3.3
```

Bor'u kurun:

```sh
make bor-all
```

Symlinkleri oluşturun:

```sh
sudo ln -nfs ~/bor/build/bin/bor /usr/bin/bor
sudo ln -nfs ~/bor/build/bin/bootnode /usr/bin/bootnode
```

Bor kurulumunu kontrol edin:

```sh
bor version
```

:::note

Devam etmeden önce, Bor hem sentry hem doğrulayıcı makinelerinde kurulmuş olmalıdır.

:::

## Düğüm Dosyalarının Kurulması (Set-up) {#setting-up-node-files}

:::note

Düğüm dosyaları hem sentry hem doğrulayıcı makinelerinde kurulmalıdır.

:::

### Launch repository'nin (başlatma deposu) getirilmesi {#fetching-the-launch-repository}

[Launch repository](https://github.com/maticnetwork/launch)'yi klonlayın:

```sh
git clone https://github.com/maticnetwork/launch
```

### Launch directory'nin (başlatma dizini) kurulması (set-up) {#setting-up-the-launch-directory}

#### Sentry makinesinde {#on-the-sentry-machine}

Bir `node` dizini oluşturun:

```sh
mkdir -p node
```

Dosyaları ve belgeleri `launch` dizininden `node` dizinine kopyalayın:

```sh
cp -rf launch/mainnet-v1/sentry/sentry ~/node
cp launch/mainnet-v1/service.sh ~/node
```

#### Doğrulayıcı makinesinde {#on-the-validator-machine}

Bir `node` dizini oluşturun:

```sh
mkdir -p node
```

Dosyaları ve belgeleri `launch` dizininden `node` dizinine kopyalayın:

```sh
cp -rf launch/mainnet-v1/sentry/validator ~/node
cp launch/mainnet-v1/service.sh ~/node
```

### Network directory'lerin (ağ dizinleri) kurulması {#setting-up-the-network-directories}

:::note

Bu bölümü hem sentry hem doğrulayıcı makinelerinde çalıştırın.

:::

#### Heimdall'ın kurulması (set-up) {#setting-up-heimdall}

`node` dizini olarak değiştirin:

```sh
cd ~/node/heimdall
```

Setup betiğini çalıştırın:

```sh
bash setup.sh
```

#### Bor'un kurulması {#setting-up-bor}

`node` dizini olarak değiştirin:

```sh
cd ~/node/bor
```

Setup betiğini çalıştırın:

```sh
bash setup.sh
```

## Servislerin kurulması {#setting-up-the-services}

:::note

Bu bölümü hem sentry hem doğrulayıcı makinelerinde çalıştırın.

:::

`node` dizinine gidin:

```sh
cd ~/node
```

Setup betiğini çalıştırın:

```sh
bash service.sh
```

Servis dosyasını sistem dizinine kopyalayın:

```sh
sudo cp *.service /etc/systemd/system/
```

## Sentry Node'un (sentry düğümü) yapılandırılması {#configuring-the-sentry-node}

Uzak sentry makinesine giriş yaparak başlayın.

### Heimdall servislerinin yapılandırılması {#configuring-the-heimdall-services}

Heimdall yapılandırma dosyasını düzenlemek için açın:

```sh
vi ~/.heimdalld/config/config.toml
```

`config.toml` içinde aşağıdaki parametreleri değiştirin:

* `moniker`- herhangi bir isim. Örnek: `moniker = "my-sentry-node"`.
* `seeds` - bir düğüm kimliğinden, bir IP adresinden ve bir porttan oluşan seed düğümü adresleri.

Aşağıdaki değerleri kullanın:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` - eş iletişimini etkinleştirmek için değeri `true` olarak ayarlayın. Örnek: `pex = true`.
* `private_peer_ids` - doğrulayıcı makinesinde kurulan Heimdall'ın düğüm kimliği.

  Doğrulayıcı makinesindeki Heimdall'ın düğüm kimliğini almak için:

  1. Doğrulayıcı makinesine giriş yapın.
  2. Çalıştırın:
     ```sh
     heimdalld tendermint show-node-id
     ```

  Örnek: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` - Prometheus metriklerini etkinleştirmek için değeri `true` olarak ayarlayın. Örnek: `prometheus = true`.
* `max_open_connections` - değeri `100` olarak ayarlayın. Örnek: `max_open_connections = 100`.

`config.toml`'deki değişiklikleri kaydedin.

### Bor Servisinin yapılandırılması {#configuring-the-bor-service}

Bor yapılandırma dosyasını düzenlemek için açın:

```sh
`vi ~/node/bor/start.sh`
```

`start.sh` dosyasında, bir düğüm kimliğinden, bir IP adresinden ve bir porttan oluşan boot node adreslerini aşağıdaki satırı dosya sonuna eklemek suretiyle ekleyin:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

`start.sh`'deki değişiklikleri kaydedin.

### Bir güvenlik duvarının yapılandırılması {#configuring-a-firewall}

Sentry makinesinde aşağıdaki portlar dünyaya açık olmalıdır `0.0.0.0/0`:

* `26656`- Heimdall servisiniz düğümünüzü diğer düğümlerin Heimdall servisine bağlayacaktır.

* `30303`- Bor servisiniz düğümünüzü diğer düğümlerin Bor servisine bağlayacaktır.

* `22`- Doğrulayıcının bulunduğu her yerden ssh (güvenli kabuk) ile bağlanabilmesi için.

## Sentry Düğümünün başlatılması {#starting-the-sentry-node}

Önce Heimdall servisini başlatacaksınız. Heimdall servisi senkronize olduktan sonra Bor servisini başlatacaksınız.

:::note

Daha önce belirtildiği gibi, Heimdall servisinin tamamen senkronize olması birkaç gün sürer.

Alternatif olarak, elinizde bulunan bir anlık görüntüyü kullanarak senkronizasyon süresini birkaç saate düşürebilirsiniz.
Detaylı talimatlar için, bkz. [<ins>Heimdall ve Bor için Anlık Görüntü Talimatları</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Anlık görüntü indirme bağlantıları için, bkz. [Polygon Zincirleri Anlık Görüntüleri](https://snapshot.polygon.technology/).

:::

### Heimdall servisinin başlatılması {#starting-the-heimdall-service}

Heimdall servisini başlatın:

```sh
sudo service heimdalld start
```

Heimdall rest-server'ı başlatın:

```sh
sudo service heimdalld-rest-server start
```

Heimdall servisi günlüklerini kontrol edin:

```sh
journalctl -u heimdalld.service -f
```

:::note

Günlüklerde aşağıdaki hataları görebilirsiniz:

* `Stopping peer for error`
* `MConnection flush failed`
* `use of closed network connection`

Bu günlükler ağdaki düğümlerden birinin düğümünüze bağlanmayı reddettiği anlamına gelir.
 Düğümünüzün ağda daha fazla düğümü yoklamasını bekleyin; bu hataları ele almak için
bir şey yapmanız gerekmez.

:::

Heimdall rest-server günlüklerini kontrol edin:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Heimdall'ın senkronizasyon durumunu kontrol edin:

```sh
curl localhost:26657/status
```

Çıktıda `catching_up` değeri şudur:

* `true` - Heimdall servisi senkronize oluyor.
* `false` - Heimdall servisi tamamen senkronize oldu.

Heimdall servisinin tamamen senkronize olmasını bekleyin

### Bor servisinin başlatılması {#starting-the-bor-service}

Heimdall servisi senkronize olduktan sonra Bor servisini başlatın

Bor servisini başlatın:

```sh
sudo service bor start
```

Bor servisinin günlüklerini kontrol edin:

```sh
journalctl -u bor.service -f
```

## Doğrulayıcı düğümünün yapılandırılması {#configuring-the-validator-node}

:::note

Bu bölümü tamamlamak için, tamamen senkronize olmuş Ethereum mainnet düğümünüzün bir RPC uç noktanızın hazır
olması gerekir.

:::

### Heimdall servisinin yapılandırılması {#configuring-the-heimdall-service}

Uzak doğrulayıcı makinesine giriş yapın.

`vi ~/.heimdalld/config/config.toml` dosyasını düzenlemek için açın.

`config.toml` içinde aşağıdakileri değiştirin:

* `moniker`- herhangi bir isim. Örnek: `moniker = "my-validator-node"`.
* `pex` - eş iletişimini devre dışı bırakmak için değeri `false` olarak ayarlayın. Örnek: `pex = false`.
* `private_peer_ids` - devre dışı bırakmak için değeri comment out yapın. Örnek: `# private_peer_ids = ""`.

  Sentry makinesinde Heimdall düğüm kimliğini almak için:

  1. Sentry makinesine giriş yapın.
  1. `heimdalld tendermint show-node-id`'i çalıştırın.

Örnek: `persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` - Prometheus metriklerini etkinleştirmek için değeri `true` olarak ayarlayın. Örnek: `prometheus = true`.

`config.toml`'deki değişiklikleri kaydedin.

`vi ~/.heimdalld/config/heimdall-config.toml` dosyasını düzenlemek için açın.

`heimdall-config.toml` içinde aşağıdakileri değiştirin:

* `eth_rpc_url` - tamamen senkronize olmuş bir Ethereum mainnet düğümü için bir RPC uç noktası,
yani Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Örnek: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`

`heimdall-config.toml`'deki değişiklikleri kaydedin.

### Bor servisinin yapılandırılması {#configuring-the-bor-service-1}

`vi ~/.bor/data/bor/static-nodes.json` dosyasını düzenlemek için açın.

`static-nodes.json` içinde aşağıdakileri değiştirin:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` - sentry makinesinde Bor kurulumunun düğüm kimliği ve
IP adresi.

  Sentry makinesinde Bor düğüm kimliğini almak için:

  1. Sentry makinesine giriş yapın.
  2. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`'i çalıştırın.

  Örnek: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

`static-nodes.json`'deki değişiklikleri kaydedin.

## Owner ve Signer Anahtarını oluşturma {#setting-the-owner-and-signer-key}

Polygon'da owner (sahip) ve signer (imzacı) anahtarlarını farklı tutmanız önerilir.

* Signer -
[denetim noktası işlemlerini](/docs/maintain/glossary.md#checkpoint-transaction) imzalayan adres. İmzacı adresinde
en az 1 ETH bulundurmanız tavsiye edilir.
* Owner - staking işlemlerini yapan adres. MATIC token'larını
owner adresinde tutmanız tavsiye edilir.

### Bir Heimdall özel anahtarının oluşturulması {#generating-a-heimdall-private-key}

Bir Heimdall özel anahtarını yalnızca doğrulayıcı makinesinde üretmeniz gerekir. Sentry makinesinde bir Heimdall özel anahtarı
üretmeyin.

Özel anahtarı üretmek çalıştırın:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

burada

* ETHEREUM_PRIVATE_KEY - Ethereum cüzdanınızın özel anahtarı.

Bu `priv_validator_key.json` dosyasını üretecektir. Üretilen JSON dosyasını Heimdall yapılandırma
dizinine taşıyın:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Bir Bor keystore dosyasının üretilmesi {#generating-a-bor-keystore-file}

Bir Bor keystore dosyasını yalnızca doğrulayıcı makinesinde üretmelisiniz. Sentry makinesinde bir Bor keystore dosyası
üretmeyin.

Özel anahtarı üretmek çalıştırın:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

burada

* ETHEREUM_PRIVATE_KEY - Ethereum cüzdanınızın özel anahtarı.

Mesaj kutusu açıldığında keystore dosyasına bir şifre verin.

Bunu yaptığınızda bir `UTC-<time>-<address>` keystore dosyası üretilecektir.

Üretilen keystore dosyasını Bor yapılandırma dizinine taşıyın:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### password.txt'i ekleyin {#add-password-txt}

Bir `password.txt` dosyası oluşturduğunuzdan emin olun, sonra Bor keystore dosyasının şifresini
`~/.bor/password.txt` dosyasına ekleyin.

### Ethereum adresinizi ekleyin {#add-your-ethereum-address}

`vi /etc/matic/metadata` dosyasını düzenlemek için açın.

`metadata` içinde, Ethereum adresinizi ekleyin. Örnek: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

`metadata`'deki değişiklikleri kaydedin.

## Doğrulayıcı düğümünün başlatılması {#starting-the-validator-node}

Bu noktada elinizde şunlar olmalıdır:

* Sentry makinesinde Heimdall servisi senkronize oluyor ve çalışıyor.
* Sentry makinesinde Bor servisi çalışıyor.
* Doğrulayıcı makinesinde Heimdall servisi ve Bor servisi yapılandırılmış.
* Owner ve signer anahtarlarınız yapılandırılmış.

### Heimdall servisinin başlatılması {#starting-the-heimdall-service-1}

Şimdi doğrulayıcı makinesinde Heimdall servisini başlatacaksınız. Heimdall servisi senkronize olduğunda
doğrulayıcı makinesinde Bor servisini başlatacaksanız.

Heimdall hizmetini başlatın:

```sh
sudo service heimdalld start
```

Heimdall rest-server'ı başlatın:

```sh
sudo service heimdalld-rest-server start
```

Heimdall bridge'i başlatın:

```sh
sudo service heimdalld-bridge start
```

Heimdall servisi günlüklerini kontrol edin:

```sh
journalctl -u heimdalld.service -f
```

Heimdall rest-server günlüklerini kontrol edin:

```sh
journalctl -u heimdalld-rest-server.service -f
```

Heimdall bridge'in günlüklerini kontrol edin:

```sh
journalctl -u heimdalld-bridge.service -f
```

Heimdall'ın senkronizasyon durumunu kontrol edin:

```sh
curl localhost:26657/status
```

Çıktıda `catching_up` değeri şudur:

* `true` - Heimdall servisi senkronize oluyor.
* `false` - Heimdal servisi senkronize oluyor.

Heimdall servisinin tamamen senkronize olmasını bekleyin.

### Bor servisinin başlatılması {#starting-the-bor-service-1}

Heimdall servisi doğrulayıcı makinesinde senkronize olduğunda doğrulayıcı makinesinde
Bor servisini başlatın.

Bor servisini başlatın:

```sh
sudo service bor start
```

Bor servisinin günlüklerini kontrol edin:

```sh
journalctl -u bor.service -f
```

## Topluluk ile birlikte Sağlık Denetimleri {#health-checks-with-the-community}

Sentry ve doğrulayıcı düğümleriniz artık senkronize olmuş ve çalışıyor olduğuna göre,
[Discord](https://discord.com/invite/0xPolygon)'a gidip topluluktan düğümlerinizin sağlık kontrolünü yapmasını isteyin.

:::note

Doğrulayıcılar olarak, imzalayıcı adresinin her zaman bir kontrolüne sahip olmak zorunludur. ETH bakiyesi 0,5 ETH'nin altına ulaşırsa o zaman yeniden doldurulmalıdır. Bundan kaçınmak için düğümleri kontrol noktası işlemlerini göndermekten çıkaracaktır.

:::

## Sonraki Adımlar: Staking {#next-steps-staking}

Sentry ve doğrulayıcı düğümleriniz sağlık kontrolünden geçtiğine göre,
ağı desteklemeye başlamak için [Staking](/docs/maintain/validator/core-components/staking.md) kılavuzuna gidin.
