---
id: run-validator-ansible
title: Ansible ile Doğrulayıcı Düğümünü çalıştırın
sidebar_label: Using Ansible
description: Validatör düğümünüzü Polygon üzerinde ayarlamak için Ansible kullanın
keywords:
  - docs
  - matic
  - polygon
  - ansible
  - node
  - validator
  - sentry
slug: run-validator-ansible
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

:::tip

Bu kılavuzdaki adımlar **Heimdall** ve **Bor** servislerinin tam olarak senkronize olmalarını beklemeyi gerektirir.
Bu sürecin tamamlanması birkaç gün sürer. Alternatif olarak, elinizde mevcut bir anlık görüntüyü kullanabilirsiniz; bu, senkronizasyon süresini birkaç saate düşürecektir. Detaylı talimatlar için, bkz. [<ins>Heimdall ve Bor için Anlık Görüntü Talimatları</ins>](/docs/operate/snapshot-instructions-heimdall-bor).

Anlık görüntü indirme bağlantıları için [<ins>Polygon Chains Snapshots</ins>](https://snapshot.polygon.technology/). bakın.
:::

Bu bölüm doğrulayıcı düğümünü bir Ansible taktik kitabı aracılığıyla başlatma ve çalıştırma konusunda size rehberlik edecektir.

Sistem gereksinimleri için, bkz. [Doğrulayıcı Düğümü Sistem Gereksinimleri](validator-node-system-requirements.md).

Doğrulayıcı düğümünü ikili dosyalardan başlatmak ve çalıştırmak istiyorsanız, bkz. [Bir Doğrulayıcı Düğümünü İkili Dosyalardan Çalıştırma](run-validator-binaries.md).

:::caution

Yeni doğrulayıcıları kabul etmek için sınırlı bir yer vardır. Yeni doğrulayıcılar yalnızca aktif bir doğrulayıcı ile aktif kümeye katılabilir.

:::

## Ön Koşullar {#prerequisites}

* Üç makine - Ansible taktik kitabını çalıştıracağınız bir yerel makine; iki uzak makine - bir [sentry](/docs/maintain/glossary.md#sentry) ve bir [doğrulayıcı](/docs/maintain/glossary.md#validator).
* Yerel makinede [Ansible](https://www.ansible.com/) kurulmuş olmalıdır.
* Yerel makinede [Python 3.x](https://www.python.org/downloads/) kurulmuş olmalıdır.
* Uzak makinelerde Go'nun *kurulmamış* olduğundan emin olun.
* Ansible'ın uzak makinelere bağlanmasına olanak vermek için, yerel makinenizin SSH genel anahtarı uzak makinelerde bulunmalıdır.
* Bir röle ağı olarak Bloxroute'u kullanabiliriz. Güvenilir Eşiniz olarak eklenecek bir ağ geçidine ihtiyacınız varsa lütfen [Polygon Discord](https://discord.com/invite/0xPolygon) > POS VALIDATORS | TAM NOT SAĞLAYICILARI | ORTAKLAR > bloxroute için **your** iletişime geçin.

:::info

Lütfen düğümlerinizi [<ins>bloXroute</ins>](/maintain/validate/bloxroute.md) ağ geçitlerine bağlamak için bloXroute talimatlarındaki adımları izleyin.

:::

## Genel Bakış {#overview}

:::caution

Tam **olarak belirtilen eylem sırasını** izlemelisiniz, aksi takdirde sorunlarla karşılaşacaksınız. Örneğin, **bir nöbetçi düğümü her zaman doğrulayıcı düğümünden önce kurulmalıdır**.

:::

Çalışan bir doğrulayıcı düğümü elde etmek için şunları yapın:

1. Üç makineyi de hazır bulundurun.
1. Ansible üzerinden bir sentry düğüm kurun.
1. Ansible üzerinden bir doğrulayıcı düğümü kurun.
1. Sentry düğümü yapılandırın.
1. Sentry düğümünü başlatın.
1. Doğrulayıcı düğümünü yapılandırın.
1. Owner (sahip) ve signer (imzacı) anahtarlarını oluşturun.
1. Doğrulayıcı düğümünü başlatın.
1. Düğümün sağlığını toplulukla birlikte kontrol edin.

## Sentry düğümü kurun {#set-up-the-sentry-node}

Yerel makinenizde [node-ansible deposunu](https://github.com/maticnetwork/node-ansible) klonlayın:

```sh
git clone https://github.com/maticnetwork/node-ansible
```

Klonlanan depoya geçin:

```sh
cd node-ansible
```

Sentry düğüm ve doğrulayıcı düğümü olacak uzak makinelerin IP adreslerini `inventory.yml` dosyasına ekleyin.

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for sentry node
        xxx.xxx.xx.xx: # <----- Add IP for second sentry node (optional)
    validator:
      hosts:
        xxx.xxx.xx.xx: # <----- Add IP for validator node
```

Örnek:

```yml
all:
  hosts:
  children:
    sentry:
      hosts:
        188.166.216.25:
    validator:
      hosts:
        134.209.100.175:
```

Uzak sentry makinenin ulaşılabilirliğini kontrol edin. Yerel makinede şunu çalıştırın:

```sh
$ ansible sentry -m ping
```

Çıktı olarak şunu almanız gerekir:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Sentry düğüm kurulumunun bir test çalıştırmasını yapın:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --list-hosts
```

Çıktı şu olacaktır:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Sentry düğüm kurulumunu sudo ayrıcalıkları ile çalıştırın:

```sh
ansible-playbook -l sentry playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/sentry heimdall_network=mainnet" --ask-become-pass
```

Kurulum tamamlandıktan sonra, terminalde bir tamamlanma iletisi göreceksiniz.

:::note

Sorun yaşarsanız ve baştan başlamak isterseniz, şunu çalıştırın:

```sh
ansible-playbook -l sentry playbooks/clean.yml
```

:::

## Doğrulayıcı düğümünü kurun {#set-up-the-validator-node}

Bu noktada, sentry düğümünüz kurulmuş durumdadır.

Yerel makinenizde ise doğrulayıcı düğümü kurulumunu çalıştırmak için Ansible taktik kitabı da kurulmuş durumdadır.

Uzak doğrulayıcı makinesinin ulaşılabilirliğini kontrol edin. Yerel makinede `ansible validator -m ping`çalıştırın.

Çıktı olarak şunu almanız gerekir:

```sh
xxx.xxx.xx.xx | SUCCESS => {
    "ansible_facts": {
        "discovered_interpreter_python": "/usr/bin/python3"
    },
    "changed": false,
    "ping": "pong"
}
```

Doğrulayıcı düğümü kurulumunun bir test çalıştırmasını yapın:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0 network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --list-hosts
```

Çıktı olarak şunu almanız gerekir:

```sh
playbook: playbooks/network.yml
  pattern: ['all']
  host (1):
    xx.xxx.x.xxx
```

Doğrulayıcı düğümü kurulumunu sudo ayrıcalıkları ile çalıştırın:

```sh
ansible-playbook -l validator playbooks/network.yml --extra-var="bor_branch=v0.3.3 heimdall_branch=v0.3.0  network_version=mainnet-v1 node_type=sentry/validator heimdall_network=mainnet" --ask-become-pass
```

Kurulum tamamlandıktan sonra, terminalde bir tamamlanma iletisi göreceksiniz.

:::note

Sorun yaşarsanız ve baştan başlamak isterseniz, şunu çalıştırın:

```sh
ansible-playbook -l validator playbooks/clean.yml
```

:::

## Sentry düğümü yapılandırın {#configure-the-sentry-node}

Uzak sentry makinesinde oturum açın.

### Heimdall Hizmetini yapılandırın {#configure-the-heimdall-service}

`vi ~/.heimdalld/config/config.toml`'i düzenlemek için `config.toml`'i açın.

Şunları değiştirin:

* `moniker`- herhangi bir isim. Örnek: `moniker = "my-full-node"`.
* `seeds` - bir düğüm kimliğinden, bir IP adresinden ve bir porttan oluşan seed düğümü adresleri.

Aşağıdaki değerleri kullanın:

  ```toml
  seeds="f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656"
  ```

* `pex` - eş iletişimini etkinleştirmek için değeri `true` olarak ayarlayın. Örnek: `pex = true`.
* `private_peer_ids` - doğrulayıcı makinesinde kurulan Heimdall'ın düğüm kimliği.

  Doğrulayıcı makinesindeki Heimdall'ın düğüm kimliğini almak için:

  1. Doğrulayıcı makinesinde oturum açın..
  1. `heimdalld tendermint show-node-id`'i çalıştırın.

  Örnek: `private_peer_ids = "0ee1de0515f577700a6a4b6ad882eff1eb15f066"`.

* `prometheus` - Prometheus metriklerini etkinleştirmek için değeri `true` olarak ayarlayın. Örnek: `prometheus = true`.
* `max_open_connections` - değeri `100` olarak ayarlayın. Örnek: `max_open_connections = 100`.

`config.toml`'deki değişiklikleri kaydedin.

### Bor Hizmetini yapılandırın {#configure-the-bor-service}

`vi ~/node/bor/start.sh`'i düzenlemek için açın.

`start.sh` içinde, sonuna aşağıdaki satırı ekleyerek bir düğüm kimliği, bir IP adresi ve bir bağlantı noktasından oluşan boot düğümü adreslerini ekleyin:

```config
--bootnodes "enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303,enode://3178257cd1e1ab8f95eeb7cc45e28b6047a0432b2f9412cff1db9bb31426eac30edeb81fedc30b7cd3059f0902b5350f75d1b376d2c632e1b375af0553813e6f@35.221.13.28:30303,enode://16d9a28eadbd247a09ff53b7b1f22231f6deaf10b86d4b23924023aea49bfdd51465b36d79d29be46a5497a96151a1a1ea448f8a8666266284e004306b2afb6e@35.199.4.13:30303,enode://ef271e1c28382daa6ac2d1006dd1924356cfd843dbe88a7397d53396e0741ca1a8da0a113913dee52d9071f0ad8d39e3ce87aa81ebc190776432ee7ddc9d9470@35.230.116.151:30303"
```

`start.sh`'deki değişiklikleri kaydedin.

`vi ~/.bor/data/bor/static-nodes.json` dosyasını düzenlemek için açın.

`static-nodes.json` içinde, aşağıdakileri değiştirin:

* `"<replace with enode://validator_machine_enodeID@validator_machine_ip:30303>"` - doğrulayıcı makinesinde kurulan Bor'un düğüm kimliği ve IP adresi.

  Doğrulayıcı makinesindeki Bor'un düğüm kimliğini almak için:

  1. Doğrulayıcı makinesinde oturum açın..
  1. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`'i çalıştırın.

  Örnek: `"enode://410e359736bcd3a58181cf55d54d4e0bbd6db2939c5f548426be7d18b8fd755a0ceb730fe5cf7510c6fa6f0870e388277c5f4c717af66d53c440feedffb29b4b@134.209.100.175:30303"`.

`static-nodes.json`'deki değişiklikleri kaydedin.

### Güvenlik duvarını yapılandırın {#configure-firewall}

Sentry makinesindeki aşağıdaki bağlantı noktaları dünyaya açık olmalıdır `0.0.0.0/0`:

* 26656- Heimdall hizmetiniz, düğümünüzü diğer düğümlere Heimdall hizmetini kullanarak bağlayacaktır.

* 30303- Bor hizmetiniz, düğümünüzü diğer düğümlere Bor hizmetini kullanarak bağlayacaktır.

* 22- Nerede olursa olsun doğrulayıcının ssh edebilmesi için.

:::note

Bununla birlikte, eğer bir VPN bağlantısı kullanıyorsa, yalnızca VPN IP adresinden gelen ssh bağlantılarına izin verebilir.

:::

## Sentry düğümü başlatın {#start-the-sentry-node}

Önce Heimdall hizmetini başlatacaksınız. Heimdall hizmeti senkronize olduğunda, Bor hizmetini başlatacaksınız.

:::note

Heimdall hizmetini sıfırdan tamamen senkronize etmek birkaç gün sürer.

Alternatif olarak, senkronizasyon süresini birkaç saate düşürecek olan, alınıp saklanmış bir anlık görüntü kullanabilirsiniz. Detaylı talimatlar için, bkz. [<ins>Heimdall ve Bor için Anlık Görüntü Talimatları</ins>](https://forum.polygon.technology/t/snapshot-instructions-for-heimdall-and-bor/9233).

Anlık görüntü indirme bağlantıları için, bkz. [Polygon Zincirleri Anlık Görüntüleri](https://snapshot.polygon.technology/).

:::

### Heimdall Hizmetini başlatın {#start-the-heimdall-service}

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

Heimdall hizmetini başlatın:

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

Bunlar, ağ üzerindeki düğümlerden birinin düğümünüzle bir bağlantıyı reddettiği anlamına gelir. Bu hatalarla hiçbir şey yapmanıza gerek yoktur. Düğümünüzün ağ üzerinde daha fazla düğüm taramasını bekleyin.

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
* `false` - Heimdall hizmeti tamamen senkronize oldu.

Heimdall hizmetinin tamamen senkronize olmasını bekleyin.

### Bor Hizmetini başlatın {#start-the-bor-service}

Heimdall hizmeti tamamen senkronize olduktan sonra, Bor hizmetini başlatın.

Bor hizmetini başlatın:

```sh
sudo service bor start
```

Bor hizmet günlüklerini kontrol edin:

```sh
journalctl -u bor.service -f
```

## Doğrulayıcı düğümünü yapılandırın {#configure-the-validator-node}

:::note

Bu bölümü tamamlamak için, tamamen senkronize olmuş Ethereum mainnet düğümünüzün bir RPC uç noktasını hazır bulundurmanız gerekir.

:::

### Heimdall Hizmetini yapılandırın {#configure-the-heimdall-service-1}

Uzak doğrulayıcı makinesinde oturum açın.

`vi ~/.heimdalld/config/config.toml`'i düzenlemek için `config.toml`'i açın.

Şunları değiştirin:

* `moniker`- herhangi bir isim. Örnek: `moniker = "my-validator-node"`.
* `pex` - eş iletişimini devre dışı bırakmak için değeri `false` olarak ayarlayın. Örnek: `pex = false`.
* `private_peer_ids` - devre dışı bırakmak için değeri comment out yapın. Örnek: `# private_peer_ids = ""`.


  Sentry makinede Heimdall düğüm kimliğini almak için:

  1. Sentry makinede oturum açın.
  1. `heimdalld tendermint show-node-id`'i çalıştırın.

  Örnek: .`persistent_peers = "sentry_machineNodeID@sentry_instance_ip:26656"`

* `prometheus` - Prometheus ölçütlerini etkinleştirmek için değeri `true` olarak ayarlayın. Örnek: `prometheus = true`.

`config.toml`'deki değişiklikleri kaydedin.

`vi ~/.heimdalld/config/heimdall-config.toml` dosyasını düzenlemek için açın.

`heimdall-config.toml` içinde, aşağıdakileri değiştirin:

* `eth_rpc_url` - tamamen senkronize olmuş bir Ethereum mainnet düğüm için bir RPC uç noktası, yani Infura. `eth_rpc_url =<insert Infura or any full node RPC URL to Ethereum>`

Örnek: `eth_rpc_url = "https://nd-123-456-789.p2pify.com/60f2a23810ba11c827d3da642802412a"`


`heimdall-config.toml`'deki değişiklikleri kaydedin.

### Bor Hizmetini yapılandırın {#configure-the-bor-service-1}

`vi ~/.bor/data/bor/static-nodes.json`'i düzenlemek için açın.

`static-nodes.json` içinde, aşağıdakileri değiştirin:

* `"<replace with enode://sentry_machine_enodeID@sentry_machine_ip:30303>"` - sentry makinede kurulan Bor'un düğüm kimliği ve IP adresi.

  Sentry makinede Bor düğüm kimliğini almak için:

  1. Sentry makinede oturum açın.
  1. `bootnode -nodekey ~/.bor/data/bor/nodekey -writeaddress`'i çalıştırın.

  Örnek: `"enode://a8024075291c0dd3467f5af51a05d531f9e518d6cd229336156eb6545581859e8997a80bc679fdb7a3bd7473744c57eeb3411719b973b2d6c69eff9056c0578f@188.166.216.25:30303"`.

`static-nodes.json`'deki değişiklikleri kaydedin.

## Sahip ve imzacı anahtarını belirleyin {#set-the-owner-and-signer-key}

Polygon'da sahip ve imzacı anahtarlarını farklı tutmalısınız.

* İmzacı - [denetim noktası işlemlerini](../glossary#checkpoint-transaction) imzalayan adres. İmzacı adresinde en az 1 ETH bulundurmanız önerilir.
* Sahip - staking işlemlerini yapan adres. MATIC token'larını sahip adresinde bulundurmanız önerilir.

### Heimdall özel anahtarı oluşturun {#generate-a-heimdall-private-key}

Heimdall özel anahtarını yalnızca doğrulayıcı makinesinde oluşturmanız gerekir. **Sentry makinesinde Heimdall özel anahtarı oluşturmayın.**

Özel anahtarı üretmek çalıştırın:

```sh
heimdallcli generate-validatorkey ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY — Ethereum cüzdanınızın özel anahtarı

:::

Bu `priv_validator_key.json` dosyasını üretecektir. Oluşturulan JSON dosyasını Heimdall yapılandırma dizinine taşıyın:

```sh
mv ./priv_validator_key.json ~/.heimdalld/config
```

### Bir Bor keystore dosyası oluşturun {#generate-a-bor-keystore-file}

Bor keystore dosyasını yalnızca doğrulayıcı makinesinde oluşturmanız gerekir. **Sentry makinesinde Bor keystore dosyası oluşturmayın.**

Özel anahtarı üretmek çalıştırın:

```sh
heimdallcli generate-keystore ETHEREUM_PRIVATE_KEY
```

:::note

ETHEREUM_PRIVATE_KEY - Ethereum cüzdanınızın özel anahtarı.

:::

Mesaj kutusu açıldığında keystore dosyasına bir şifre verin.

Bunu yaptığınızda bir `UTC-<time>-<address>` keystore dosyası üretilecektir.

Üretilen keystore dosyasını Bor yapılandırma dizinine taşıyın:

```sh
mv ./UTC-<time>-<address> ~/.bor/keystore/
```

### Eklemek`password.txt`

Bir `password.txt` dosyası oluşturduğunuzdan emin olun ve ardından Bor keystore dosyasının şifresini `~/.bor/password.txt` dosyasının içine ekleyin.

### Ethereum adresinizi ekleyin {#add-your-ethereum-address}

`vi /etc/matic/metadata` dosyasını düzenlemek için açın.

`metadata` içinde, Ethereum adresinizi ekleyin. Örnek: `VALIDATOR_ADDRESS=0xca67a8D767e45056DC92384b488E9Af654d78DE2`.

`metadata`'deki değişiklikleri kaydedin.

## Doğrulayıcı düğümünü başlatın {#start-the-validator-node}

Bu noktada elinizde şunlar olmalıdır:

* Sentry makinesinde Heimdall hizmeti tamamen senkronize olmuş ve çalışıyor olmalıdır.
* Sentry makinesinde Bor hizmeti çalışıyor olmalıdır.
* Doğrulayıcı makinesinde Heimdall servisi ve Bor servisi yapılandırılmış.
* Sahip ve imzacı anahtarlarınız yapılandırılmış olmalıdır.

### Heimdall Hizmetini başlatın {#start-the-heimdall-service-1}

Şimdi, doğrulayıcı makinesinde Heimdall hizmetini başlatacaksınız. Heimdall hizmeti senkronize olduğunda, doğrulayıcı makinesinde Bor hizmetini başlatacaksınız.

Heimdall servisini başlatın:

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
* `false` - Heimdall hizmeti tamamen senkronize oldu.

Heimdall hizmetinin tamamen senkronize olmasını bekleyin.

### Bor Hizmetini başlatın {#start-the-bor-service-1}

Doğrulayıcı makinesinde Heimdall hizmeti tamamen senkronize olduğunda doğrulayıcı makinesinde Bor hizmetini başlatın.

Bor hizmetini başlatın:

```sh
sudo service bor start
```

Bor hizmet günlüklerini kontrol edin:

```sh
journalctl -u bor.service -f
```

## Topluluk ile düğüm sağlığını denetleyin {#check-node-health-with-the-community}

Artık sentry ve doğrulayıcı düğümleriniz senkronize olmuş ve çalışıyor olduğuna göre, [Discord](https://discord.com/invite/0xPolygon)'a gidin ve topluluktan düğümlerinizde health-check (sağlık denetimi) yapmalarını isteyin.

:::note

Doğrulayıcılar olarak, imzalayıcı adresinin her zaman bir kontrolüne sahip olmak zorunludur. ETH bakiyesi 0,5 ETH'nin altına ulaşırsa o zaman yeniden doldurulmalıdır. Bundan kaçınmak için düğümleri kontrol noktası işlemlerini göndermekten çıkaracaktır.

:::

## Staking'e geçin {#proceed-to-staking}

Artık sentry ve doğrulayıcı düğümlerinizde health-check (sağlık denetimi) yapıldığına göre, [Staking](/docs/maintain/validator/core-components/staking)'e geçin.
