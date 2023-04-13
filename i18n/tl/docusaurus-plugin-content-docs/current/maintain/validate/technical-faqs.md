---
id: technical-faqs
title: Mga Teknikal na FAQ
description: Madalas na itanong na may kinalaman sa pagpapatakbo ng Validator sa Polygon network.
keywords:
  - docs
  - polygon
  - polygon wiki
  - faqs
  - technical
slug: technical-faqs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### 1. Pareho ba ang mga pribadong key para sa Heimdall at Bor keystore? {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}

Oo, ang pribadong key na ginagamit para sa pagbuo ng mga Validator key at Bor Keystore ay pareho.
Ang private key na ginamit sa pagkakataong ito ay ang ETH address ng iyong Wallet kung saan ang iyong Polygon
testnet na mga token ay nakalagay.

### 2. Listahan ng mga Karaniwang Commands {#2-list-of-common-commands}

Kasalukuyan kaming may madaling i-dive-in na listahan para sa iyo para sa mga Linux package. Kami ay
patuloy na i-update ang listahang ito nang regular para sa higit na kaginhawahan.

**Para sa mga package na Linux**

#### A. Saan mahahanap ang heimdall genesis file {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### B. Saan mahahanap ang heimdall-config.toml {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### C. Saan mahahanap ang config.toml {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### D. Saan mahahanap ang mga heimdall-seeds.txt {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### E. I-start ang Heimdall {#e-start-heimdall}

`$ sudo service heimdalld start`

#### F. I-start ang rest-server ng Heimdall {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### G. I-start ang bridge server ng Heimdall {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### H. Mga log ng Heimdall {#h-heimdall-logs}

`/var/log/matic-logs/`

#### I. Saan mahahanap ang Bor genesis file {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### J. I-start ang Bor {#j-start-bor}

`sudo service bor start`

#### K. I-check ang mga log ng Heimdall {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### L. I-check ang rest-server ng Heimdall {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### M. I-check ang mga log ng Heimdall bridge {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### N. I-check ang mga log ng Bor {#n-check-bor-logs}

`tail -f bor.log`

#### O. I-kill ang proseso ng Bor {#o-kill-bor-process}

**Para sa linux**:

1. `ps -aux | grep bor`. Kunin ang PID para sa Bor at pagkatapos ay i-run ang sumusunod na command.
2. `sudo kill -9 PID`

**Para sa mga Binary**:

Pumunta sa `CS-2003/bor`at pagkatapos ay paandarin ang, `bash stop.sh`

### 3. Error: Nabigong ma-unlock ang account (0x...) Walang key para sa ibinigay na address o file {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

Ang error na ito ay nangyayari dahil ang path para sa password.txt file ay hindi tama. Maaari mong sundin ang mga hakbang sa ibaba upang maitama ito:

Ang error na ito ay nangyayari dahil ang path para sa password.txt at Keystore file ay hindi tama. Maaari mong sundin ang mga hakbang sa ibaba upang maitama ito:

1. Kopyahin ang keystore file ng bor sa

 /etc/bor/dataDir/keystore

2. At password.txt sa

/etc/bor/dataDir/

3. Tiyaking naidagdag mo ang tamang address sa `/etc/bor/metadata`

Para sa mga Binary:

1. Kopyahin ang file ng Bor keystore sa:

`/var/lib/bor/keystore/`

2. At password.txt sa

`/var/lib/bor/password.txt`


### 4. Error: Mali Block.Header.AppHash. Inaasahan xxxx {#4-error-wrong-block-header-apphash-expected-xxxx}

Ito ay karaniwang nagaganap dahil sa maling pag-install ng heimdall. Maaari mong sundin ang mga hakbang sa ibaba upang maitama ito:

i-run

    ```heimdalld unsafe-reset-all```

at i-start muli ang mga serbisyong Heimdall. Maaari mong i-refer ang gabay na ito - https://docs.polygon.technology/docs/validate/validate/run-validator

### 5. Mula saan ako lilikha ng API key? {#5-from-where-do-i-create-the-api-key}

Maaari mong i-access ang link na ito: [https://infura.io/register](https://infura.io/register). Tiyaking kapag na-setup mo na ang iyong account at proyekto, kopyahin mo ang API key para sa Ropsten at hindi sa Mainnet.

Ang mainnet ay pinili bilang default.

### 6. Ang heimdall ay hindi umaandar. Ako ay nagkakaroon ng isang error sa Panic {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**Aktwal na Error**: Ang aking heimdalld ay hindi umaandar. Sa log sa unang linya: panic: Hindi kilala db_backend leveldb, inaasahan alinman goleveldb or memdb or fsdb

Gawing `goleveldb` ang config sa `config.toml`.


### 7. Paano ko ide-delete ang mga labi ng Heimdall at Bor? {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

Kung gusto mong tanggalin ang mga labi ng Heimdall at Bor pagkatapos ay maaari mong patakbuhin ang mga sumusunod na command Bor:

Para sa Linux package:

```$ sudo dpkg -i matic-bor```

At i-delete ang directory ng Bor:

```$ sudo rm -rf /etc/bor```

Para sa mga Binary:

```$ sudo rm -rf /etc/bor```

At

```$ sudo rm /etc/heimdall```


### 8. Ilang validator ang maaaring maging aktibo nang sabay-sabay? {#8-how-many-validators-can-be-active-concurrently}

Magkakaroon ng hanggang 100 aktibong validator sa isang pagkakataon. Magdadala kami ng mas maraming kalahok kung maabot din ang limitasyon sa kalagitnaan ng kaganapan. Tandaan na ang mga aktibong validator ay kadalasang yaong mataas ang uptime. Ang mga kalahok na may mataas na downtime ay mapipilitang umalis.

### 9. Magkano ang dapat kong itaya? {#9-how-much-should-i-stake}

ang "halaga-ng-taya" at "heimdall-fee-amount" - magkano ba dapat ito?

Kinakailangan ang minimum na 10 Matic token para sa halaga ng stake samantalang ang bayad sa heimdall ay dapat na mas malaki kaysa sa 10. Halimbawa, ang halaga ng iyong stake ay 400 at ang bayad sa heimdall ay dapat na 20. Iminumungkahi naming panatilihing 20 ang bayad sa Heimdall.

Gayunpaman, pakitandaan na ang mga value na inilagay sa halaga ng taya at heimdal-fee-amount ay dapat ilagay sa 18 na decimal

Halimbawa,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. Napili ako bilang validator ngunit mali ang aking ETH address. Ano ang aking gagawin? {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

Kung mayroon kang access sa ETH address na isinumite mo nang mas maaga, maaari mong ilipat ang mga token ng Pagsubok mula sa account na iyon patungo sa kasalukuyang account. At pagkatapos ay maaari mong simulan ang iyong proseso ng pag-set up ng iyong mga node.

Kung wala kang access sa ETH address na iyon, hindi namin ililipat ang iyong mga token nang hiwalay. Maaari kang muling magparehistro sa form gamit ang tamang ETH address.

### 11. Nagkakaroon ako ng error sa pagsisimula ng bridge {#11-i-m-getting-an-error-starting-the-bridge}

**Error**: Object "start" ay hindi kilala, subukan ang "bridge help". Okay pa ba na huwag pansinin ito?

I-check ang "aling bridge" - kung ito ay `/usr/sbin/bridge`hindi ka nagpapaandar ng tamang "bridge program.

Subukan ang `~/go/bin/bridge`sa halip ang `(or $GOBIN/bridge)`


### 12. Nakakakuha ako ng dpkg na error {#12-i-m-getting-dpkg-error}

**Error**: "dpkg: error pinoproseso archive matic-heimdall_1.0.0_amd64.deb (--install): sinusubukang i-overwrite '/heimdalld-rest-server.service', na nasa package din ng matic-node 1.0.0"

Pangunahing nangyayari ito dahil sa isang dating pag-install ng Polygon sa iyong makina. Upang malutas maaari mong i-run ang:

`sudo dpkg -r matic-node`


### 13. Hindi malinaw sa akin kung aling Private Key ang dapat kong idagdag kapag nag-ge-generate ako ng validator key {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

Ang Private key na gagamitin ay ang ETH address ng iyong Wallet kung saan naka-store ang iyong Polygon testnet Token. Maaari mong kumpletuhin ang setup gamit ang isang public-private key pair na nakakonekta sa address na isinumite sa form.


### 14. May paraan ba upang malaman kung na-sync na ang Heimdall? {#14-is-there-a-way-to-know-if-heimdall-is-synced}

Maaari mong i-run ang sumusunod na command upang ma-check ito:

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

I-check ang value ng pag-catch_up. Kung ito ay mali, ang node ay naka-sync na.


### 15. Paano kung ang isang tao ay maging isang Top 10 na staker, paano niya matatanggap ang MATIC na reward sa pagtatapos? {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

Ang mga reward sa stage 1 ay hindi batay sa nakataya. Mangyaring sumangguni sa https://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/ para sa mga detalye ng reward. Ang mga kalahok na may mataas na naitaya ay hindi awtomatikong kwalipikado para sa isang reward sa yugtong ito.


### 16. Ano ang dapat na aking bersyon ng Heimdall? {#16-what-should-be-my-heimdall-version}

Upang ma-check ang iyong bersyon ng Heimdall maaari mo lamang i-run ang:

```heimdalld version```

Ang tumpak na bersyon ng Heimdall para sa yugto 1 ay dapat na `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`


### 17. Anong mga value ang dapat kong idagdag sa halaga at bayarin sa pagtaya? {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

Kinakailangan ang minimum na 10 Matic token para sa halaga ng stake samantalang ang bayad sa heimdall ay dapat na mas malaki kaysa sa 10. Halimbawa, ang halaga ng iyong stake ay 400 at ang bayad sa heimdall ay dapat na 20. Iminumungkahi naming panatilihing 20 ang bayad sa Heimdall.

Gayunpaman, pakitandaan na ang mga value na inilagay sa halaga ng taya at heimdal-fee-amount ay dapat ilagay sa 18 na decimal

Halimbawa,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. Ano ang pagkakaiba sa pagitan ng `/var/lib/heimdall`at `/etc/heimdall?`

Ang `/var/lib/heimdall`ay ang heimdall dir kapag ginamit mo ang binary installation method. Ang a`/etc/heimdall`y para sa paraan ng pag-install ng package ng Linux.


### 19. Kapag gumawa ako ng transaksyon sa pagtaya, nagkakaroon ako ng error na "Gas Exeeded." {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

Maaaring mangyari ang error na ito dahil sa format ng taya o halaga ng bayad. Ang mga value na inilagay sa panahon ng stake command ay kailangang may 18 na decimal.

Gayunpaman, pakitandaan na ang mga value na inilagay sa halaga ng taya at heimdal-fee-amount ay dapat ilagay sa 18 na decimal

Halimbawa,

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. Kailan ako magkakaroon ng pagkakataong maging isang Validator? {#20-when-will-i-get-a-chance-to-become-a-validator}

Unti-unti kaming nagdaragdag ng mga validator sa buong yugto ng Stage 1 na event. Maglalabas kami ng isang listahan ng mga bagong external na validator nang paunti-unti. Ang listahang ito ay iaanunsyo sa Discord channel.


### 21. Saan ko mahahanap ang lokasyon ng impormasyon ng Heimdall account? {#21-where-can-i-find-heimdall-account-info-location}

Para sa mga binary:

    /var/lib/heimdall/config folder

Para sa Linux package:

    /etc/heimdall/config


### 22. Aling file ang idaragdag ko sa API key? {#22-which-file-do-i-add-the-api-key-in}

Kapag nagawa mo na ang API key, kailangan mong idagdag ang API key sa `heimdall-config.toml`file.


### 23. Aling file ang idaragdag ko sa persistent_peers? {#23-which-file-do-i-add-the-persistent_peers}

Maaari mong idagdag ang persistent_peers sa sumusunod na file:

    /var/lib/heimdall/config/config.toml


### 24. “Na-reset mo ba ang Tendermint nang hindi ni-reset ang data ang iyong application?” {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

Sa ganoong pagkakataon maaari mong i-reset ang heimdall config data at subukang patakbuhin muli ang pag-install.

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. Error: Hindi ma-unmarshall ang config Error 1 (mga) error decoding {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

Error: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

Ito ay kadalasang nangyayari dahil kapag may mga typo, o ilang nawawalang bahagi o isang lumang config file na isang nalalabi pa rin. Kakailanganin mong i-clear ang lahat ng mga labi at pagkatapos ay subukang i-set up itong muli.

### 26. Upang ihinto ang mga serbisyo ng Heimdall at Bor {#26-to-stop-heimdall-and-bor-services}

**Para sa mga Linux package**:

Itigil ang Heimdall: `sudo service heimdalld stop`

Itigil ang Bor: `sudo service bor stop` o

1. `ps -aux | grep bor`. Kunin ang PID para sa Bor at pagkatapos ay i-run ang sumusunod na command.
2. `sudo kill -9 PID`

**Para sa mga Binary**:

Itigil ang Heimdall: `pkill heimdalld`

Itigil ang Bridge: `pkill heimdalld-bridge`

Itigil ang Bor: Pumunta sa CS-2001/bor at pagkatapos i-run ang, `bash stop.sh`

### 27. Upang alisin ang mga direktoryo ng Heimdall at Bor {#27-to-remove-heimdall-and-bor-directories}

**Para sa mga Linux package**: I-delete ang Heimdall: `sudo rm -rf /etc/heimdall/*`

I-delete ang Bor: `sudo rm -rf /etc/bor/*`

**Para sa mga Binary**:

I-delete ang Heimdall: `sudo rm -rf /var/lib/heimdall/`

I-delete ang Bor: `sudo rm -rf /var/lib/bor`

### 28. Ano ang gagawin kapag nakakuha ka ng "Wrong Block.Header.AppHash." error {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

Ang error na ito ay kadalasang nangyayari dahil sa mga kahilingan ng Infura na naubos na. Kapag nag-set up ka ng node sa Polygon, nagdadagdag ka ng Infura Key sa Config file (Heimdall). Bilang default, pinapayagan ka ng 100k na Kahilingan bawat araw, kung lalampas ang limitasyong ito, haharapin mo ang mga ganitong problema. Upang malutas ito maaari kang lumikha ng bagong API key at idagdag ito sa `config.toml` file.

:::tip Manatiling may alam

Manatiling nakasubaybay sa mga pinakabagong update sa node at validator mula sa team ng Polygon
at sa komunidad sa pamamagitan ng pag-subscribe sa
[mga notification group sa Polygon](https://polygon.technology/notifications/).

:::
