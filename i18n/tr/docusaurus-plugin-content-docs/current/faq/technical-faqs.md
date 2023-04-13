---
id: technical-faqs
title: Teknik SSS
description: Bir sonraki blok zinciri uygulamanızı Polygon üzerinde oluşturun.
keywords:
  - docs
  - matic
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

:::tip Gelişmelerden haberdar olun

Polygon ekibinden ve topluluğundan gelen en son düğüm ve doğrulayıcı güncellemelerini Polygon [<ins>bildirimlerini</ins>](https://polygon.technology/notifications/) abone ederek takip edin.

:::

### 1. Özel anahtarlar Heimdall ve Bor keystore için aynı mı? {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}
Evet, Doğrulayıcı anahtarlarını üretmek ve Bor Keystore için kullanılan özel anahtar aynıdır. Bu örnekte kullanılan özel anahtar, Polygon test ağı token'larınızı sakladığınız Cüzdanınızın ETH adresidir.

### 2. Sık Kullanılan Komutların Listesi {#2-list-of-common-commands}

Şu anda Linux paketleri için, hızlı bir başlangıç yapmanızı sağlayacak bir listemiz var. Size daha fazla kolaylık sağlamak için bu listeyi düzenli olarak güncelleyeceğiz.

**Linux paketleri için**

#### A. Heimdall genesis dosyası nerede bulunur? {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### B. heimdall-config.toml nerede bulunur? {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. config.toml nerede bulunur? {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. heimdall-seeds.txt nerede bulunur? {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. Heimdall'ı başlatma {#e-start-heimdall}

`$ sudo service heimdalld start`

#### Heimdall rest-server'ı başlatma {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### Heimdall bridge-server'ı başlatma {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. Heimdall günlükleri {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. Bor genesis dosyası nerede bulunur? {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### Bor'u başlatma {#j-start-bor}

`sudo service bor start`

#### K Heimdall günlüklerini denetleme {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. Heimdall rest-server'ı denetleme {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. Heimdall köprüsü günlüklerini denetleme {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. Bor günlüklerini denetleme {#n-check-bor-logs}

`tail -f bor.log`

#### O. Kill Bor işlemi {#o-kill-bor-process}

**Linux için**:

1. `ps -aux | grep bor`. Bor için PID'yi alın ve ardından aşağıdaki komutu çalıştırın.
2. `sudo kill -9 PID`

**İkili dosyalar için**:

`CS-2003/bor`'e gidin ve `bash stop.sh`'i çalıştırın

### 3. Hata: Failed to unlock account (0x...) (hesabın kilidi açılamadı) Belirtilen adres veya dosya için anahtar yok {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

Bu hata, password.txt dosyasının yolu hatalı olduğu için oluşur. Bunu düzeltmek için aşağıdaki adımları takip edebilirsiniz:

Bu hata, password.txt ve Keystore dosyasının yolu hatalı olduğu için oluşur. Bunu düzeltmek için aşağıdaki adımları takip edebilirsiniz:

1. Bor keystore dosyasını şuraya kopyalayın:

    /etc/bor/dataDir/keystore

2. Ve password.txt dosyasını da şuraya kopyalayın:

    /etc/bor/dataDir/

3. `/etc/bor/metadata`'in içine doğru adresi eklediğinizden emin olun

İkili dosyalar için:

1. Bor keystore dosyasını şuraya kopyalayın:

`/var/lib/bor/keystore/`

2. Ve password.txt dosyasını da şuraya kopyalayın:

`/var/lib/bor/password.txt`


### 4. Hata: Wrong (yanlış) Block.Header.AppHash. Beklenen xxxx {#4-error-wrong-block-header-apphash-expected-xxxx}

Bu hata genellikle Heimdall hizmeti bir blokta takılı kaldığında ve Heimdall üzerinde herhangi bir geri alma yöntemi bulunmadığında oluşur.

Bunu çözmek için Heimdall'i tamamen sıfırlamanız gerekir:

```bash
    sudo service heimdalld stop

    heimdalld unsafe-reset-all
```

Bundan sonra, anlık görüntüden tekrar senkronizasyon yapmanız gerekir:

```bash
    wget -c <Snapshot URL>

    tar -xzvf <snapshot file> -C <HEIMDALL_DATA_DIRECTORY>

```

Ardından, Heimdall hizmetlerini tekrar başlatın.


### 5. API anahtarını nereden oluşturabilirim? {#5-from-where-do-i-create-the-api-key}

Şu bağlantıya erişebilirsiniz: [https://infura.io/register](https://infura.io/register) . Hesabınızı ve projenizi oluşturduktan sonra, API anahtarını Mainnet için değil de Ropsten için kopyaladığınızdan emin olun.

Varsayılan olarak Mainnet seçilidir.

### 6. Heimdall çalışmıyor. Bir Panic hatası alıyorum {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**Asıl Hata**: heimdalld çalışmıyor. Günlükteki ilk satır şu:
panic: Unknown db_backend leveldb, expected either goleveldb or memdb or fsdb

config.toml içinde config'i `goleveldb` ile değiştirin


### 7. Heimdall ve Bor kalıntılarını nasıl silebilirim? {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

Heimdall ve Bor kalıntılarını silmek istiyorsanız, aşağıdaki komutları çalıştırabilirsiniz
Bor:

Linux paketi için:

```$ sudo dpkg -i matic-bor```

Ve Bor Dizinini silin:

```$ sudo rm -rf /etc/bor```

İkili dosyalar için:

```$ sudo rm -rf /etc/bor```

Ve

```$ sudo rm /etc/heimdall```


### 8. Aynı anda kaç doğrulayıcı aktif olabilir? {#8-how-many-validators-can-be-active-concurrently}

Bir seferde 100 adede kadar aktif doğrulayıcı olacaktır. Olayın ortasında limite ulaşılırsa daha fazla katılımcı da getireceğiz. Aktif doğrulayıcıların çoğunlukla çalışma süresi (uptime) yüksek olanlar olduğunu unutmayın. Kapalı olma süresi (downtime) yüksek olan katılımcılar zorla çıkarılacaktır.

### 9. Ne kadar stake etmeliyim? {#9-how-much-should-i-stake}

"stake-amount" ve "heimdall-fee-amount" - ne kadar olmalıdır?

Stake miktarı için 10 Matic token gerekirken, heimdall ücreti ise 10'dan büyük olmalıdır. Örneğin stake miktarınız 400 ise, heimdall ücreti 20 olmalıdır. Heimdall ücretini 20 olarak tutmanızı öneririz.

Bununla birlikte, stake miktarı ve heimdal-fee-amount için girilen değerlerin 18 ondalık basamakla girilmesi gerektiğini lütfen unutmayın

Örneğin,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. Bir doğrulayıcı olmak üzere seçildim, ama ETH adresim yanlıştı. Ne yapmalıyım? {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

Daha önce gönderdiğiniz ETH adresine erişiminiz varsa, Test token'larını o hesaptan mevcut hesaba aktarabilirsiniz. Bunun ardından, düğümlerinizi kurma sürecini başlatabilirsiniz.

O ETH adresine erişiminiz yoksa, token'ları size ayrı olarak aktarmayacağız. Doğru ETH adresi ile formda yeniden kaydolabilirsiniz.

### 11. Köprüyü başlatırken bir hata alıyorum {#11-i-m-getting-an-error-starting-the-bridge}

**Hata**: Object "start" is unknown, try "bridge help". Bunu yok sayabilir miyim?

"which bridge"i denetleyin - eğer `/usr/sbin/bridge` ise, doğru "bridge" programını çalıştırmıyorsunuz.

`(or $GOBIN/bridge)`'in yerine `~/go/bin/bridge`'i deneyin


### 12. dpkg hatası alıyorum {#12-i-m-getting-dpkg-error}

**Hata**: "dpkg: error processing archive matic-heimdall_1.0.0_amd64.deb (--install): trying to overwrite '/heimdalld-rest-server.service', which is also in package matic-node 1.0.0"

Bu hata başlıca makinenizde daha önceki bir Matic kurulumu nedeniyle oluşur. Bu hatayı gidermek için şunu çalıştırabilirsiniz:

`sudo dpkg -r matic-node`


### 13. Doğrulayıcı anahtarını oluştururken hangi Özel Anahtarı eklemem gerektiğinden emin olamıyorum {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

Kullanılması gereken Özel anahtar, Cüzdanınızın Polygon test ağı Token'larınızı sakladığınız ETH adresidir. Kurulumu, formda gönderilen adrese bağlı bir genel-özel anahtar çifti ile tamamlayabilirsiniz.


### 14. Heimdall'ın eşitlenmiş olup olmadığını bilmenin bir yolu var mı? {#14-is-there-a-way-to-know-if-heimdall-is-synced}

Bunu denetlemek için aşağıdaki komutu çalıştırabilirsiniz:

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

catching_up değerini denetleyin. Eğer değer false ise düğüm tamamen eşitlenmiştir.


### 15. Birisi Top 10 stakeçi arasında olursa, sonunda MATIC ödülünü nasıl alacak? {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

Aşama 1 ödülleri stake'e dayalı değildir. Ödül detayları için lütfen https://blog.matic.network/counter-stake-stake-1-stake-on-the-beach-full-details-matic-network/ adresindeki yazıya bakın. Stake'i yüksek olan katılımcılar bu aşamada ödüle otomatik olarak hak kazanmaz.


### 16. Heimdall sürümüm ne olmalıdır? {#16-what-should-be-my-heimdall-version}

Heimdall sürümünüzü denetlemek için şunu çalıştırmanız yeterlidir:

```heimdalld version```

Aşama 1 için doğru Heimdall sürümü `heimdalld version is beta-1.1-rc1-213-g2bfd1ac` olmalıdır


### 17. Stake miktarı ve ücret miktarı için hangi değerleri eklemeliyim? {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

Stake miktarı için 10 Matic token gerekirken, heimdall ücreti ise 10'dan büyük olmalıdır. Örneğin stake miktarınız 400 ise, heimdall ücreti 20 olmalıdır. Heimdall ücretini 20 olarak tutmanızı öneririz.

Bununla birlikte, stake miktarı ve heimdal-fee-amount için girilen değerlerin 18 ondalık basamakla girilmesi gerektiğini lütfen unutmayın

Örneğin,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. `/var/lib/heimdall` ve `/etc/heimdall?` arasındaki fark nedir?

`/var/lib/heimdall`, ikili dosya kurulum yöntemini kullandığınızda heimdall dir olur. `/etc/heimdall` ise Linux paketinin kurulum yöntemi içindir.


### 19. Stake işlemini yaptığımda, "Gas Exceeded" hatasını alıyorum {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

Bu hata stake veya ücret miktarının biçimi nedeniyle oluşabilir. Stake komutu sırasında girilen değerlerde 18 ondalık basamak olması gerekir.

Bununla birlikte, stake miktarı ve heimdal-fee-amount için girilen değerlerin 18 ondalık basamakla girilmesi gerektiğini lütfen unutmayın

Örneğin,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. Doğrulayıcı olma imkânını ne zaman elde edeceğim? {#20-when-will-i-get-a-chance-to-become-a-validator}

Aşama 1 olayı boyunca kademeli olarak daha fazla doğrulayıcı ekliyoruz. Yeni harici doğrulayıcıların listesini kademeli olarak yayınlayacağız. Bu liste Discord kanalında duyurulacaktır.


### 21. Heimdall hesap bilgilerinin konumunu nerede bulabilirim? {#21-where-can-i-find-heimdall-account-info-location}

İkili dosyalar için:

    /var/lib/heimdalld/config folder

Linux paketi için:

    /etc/heimdall/config


### 22. API anahtarını hangi dosyanın içine ekleyeceğim? {#22-which-file-do-i-add-the-api-key-in}

API anahtarını oluşturduktan sonra, onu `heimdall-config.toml` dosyasının içine eklemeniz gerekir.


### 23. persistent_peers'i hangi dosyaya ekleyeceğim? {#23-which-file-do-i-add-the-persistent_peers}

persistent_peers'i aşağıdaki dosyanın içine ekleyebilirsiniz:

    /var/lib/heimdalld/config/config.toml


### 24. “Uygulamanızın verilerini sıfırlamadan Tendermint'i sıfırladınız mı?” {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

Bu durumda heimdall config verilerini sıfırlayıp kurulumu tekrar çalıştırmayı deneyebilirsiniz.

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. Hata: Unable to unmarshall config Error 1 error(s) decoding {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

Hata: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

Bu, çoğunlukla yazım hataları veya bazı eksik kısımlar veya bir kalıntı olan eski bir config dosyası bulunduğunda oluşur. Tüm kalıntıları temizlemeniz ve ardından onu tekrar kurmanız gerekecektir.

### 26. Heimdall ve Bor hizmetlerini durdurmak için {#26-to-stop-heimdall-and-bor-services}

**Linux paketleri için**:

Heimdall'ı Durdurma: `sudo service heimdalld stop`

Bor'u Durdurma: `sudo service bor stop` veya

1. `ps -aux | grep bor`. Bor için PID'yi alın ve ardından aşağıdaki komutu çalıştırın.
2. `sudo kill -9 PID`

**İkili dosyalar için**:

Heimdall'ı Durdurma: `pkill heimdalld`

Köprüyü Durdurma: `pkill heimdalld-bridge`

Bor'u Durdurma: CS-2001/bor konumuna gidin ve `bash stop.sh`'i çalıştırın

### 27. Heimdall ve Bor dizinlerini kaldırmak için {#27-to-remove-heimdall-and-bor-directories}

**Linux paketleri için**:
Heimdall'ı Silme: `sudo rm -rf /etc/heimdall/*`

Bor'u Silme: `sudo rm -rf /etc/bor/*`

**İkili dosyalar için**:

Heimdall'ı Silme: `sudo rm -rf /var/lib/heimdalld/`

Bor'u Silme: `sudo rm -rf /var/lib/bor`

### 28. "Wrong Block.Header.AppHash." hatasını aldığınızda ne yapmanız gerekir? {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

Bu hata genellikle Infura isteklerinin tükenmesi nedeniyle oluşur. Polygon üzerinde bir düğüm kurarken, Config dosyasına (Heimdall) bir Infura Anahtarı eklersiniz. Varsayılan olarak günde 100.000 İstek yapmanıza izin verilir; eğer bu limit aşılırsa, bu tür sorunlarla karşılaşırsınız. Bu hatayı gidermek için yeni bir API anahtarı oluşturabilir ve bu anahtarı `config.toml` dosyasına ekleyebilirsiniz.