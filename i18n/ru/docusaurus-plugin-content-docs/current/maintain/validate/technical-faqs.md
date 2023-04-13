---
id: technical-faqs
title: Часто задаваемые технические вопросы
description: Часто задаваемые вопросы, связанные с запуском валидатора в сети Polygon.
keywords:
  - docs
  - polygon
  - polygon wiki
  - faqs
  - technical
slug: technical-faqs
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

### 1. Одинаковы ли закрытые ключи для хранилища ключей Heimdall и Bor? {#1-are-the-private-keys-same-for-heimdall-and-bor-keystore}

Да, для генерации ключей валидатора и хранилища ключей Bor используется одинаковый закрытый ключ.
Закрытый ключ, используемый в данном случае, — это адрес вашего кошелька ETH,
где хранятся токены тестовой сети Polygon.

### 2. Перечень часто используемых команд {#2-list-of-common-commands}

Мы подготовили для вас краткий перечень команд для пакетов Linux. Мы будем
регулярно обновлять этот список для вашего удобства.

**Для пакетов Linux**

#### А. Расположение генезис-файла Heimdall {#a-where-to-find-heimdall-genesis-file}

`$CONFIGPATH/heimdall/config/genesis.json`

#### Б. Расположение heimdall-config.toml {#b-where-to-find-heimdall-config-toml}

`/etc/heimdall/config/heimdall-config.toml`

#### В. Расположение config.tom {#c-where-to-find-config-toml}

`/etc/heimdall/config/config.toml`

#### Г. Расположение heimdall-seeds.txt {#d-where-to-find-heimdall-seeds-txt}

`$CONFIGPATH/heimdall/heimdall-seeds.txt`

#### Д. Запуск Heimdall {#e-start-heimdall}

`$ sudo service heimdalld start`

#### Е. Запуск сервера Rest Heimdall {#f-start-heimdall-rest-server}

`$ sudo service heimdalld-rest-server start`

#### Ж. Запуск сервера Bridge Heimdall {#g-start-heimdall-bridge-server}

`$ sudo service heimdalld-bridge start`

#### З. Журналы Heimdall {#h-heimdall-logs}

`/var/log/matic-logs/`

#### И. Расположение генезис-файла Bor {#i-where-to-find-bor-genesis-file}

`$CONFIGPATH/bor/genesis.json`

#### К. Запуск Bor {#j-start-bor}

`sudo service bor start`

#### Л. Проверка журналов Heimdall {#k-check-heimdall-logs}

`tail -f heimdalld.log`

#### М. Проверка сервера Rest Heimdall {#l-check-heimdall-rest-server}

`tail -f heimdalld-rest-server.log`

#### Н. Проверка журналов моста Heimdall {#m-check-heimdall-bridge-logs}

`tail -f heimdalld-bridge.log`

#### О. Проверка журналов Bor {#n-check-bor-logs}

`tail -f bor.log`

#### П. Прекращение процесса Bor {#o-kill-bor-process}

**Для linux**:

1. `ps -aux | grep bor`. Получите PID для Bor и выполните следующую команду.
2. `sudo kill -9 PID`

**Для двоичных файлов**:

Перейдите в `CS-2003/bor` и выполните команду `bash stop.sh`

### 3. Ошибка: не удалось разблокировать аккаунт (0x…) Нет ключа для заданного адреса или файла {#3-error-failed-to-unlock-account-0x-no-key-for-given-address-or-file}

Эта ошибка возникает из-за неправильного пути к файлу password.txt. Для устранения этой проблемы сделайте следующее:

Эта ошибка возникает из-за неправильного пути к файлу password.txt и файлу хранилища ключей. Для устранения этой проблемы сделайте следующее:

1. Скопируйте файл хранилища ключей Bor в следующий каталог:

    /etc/bor/dataDir/keystore

2. Скопируйте password.txt в следующий каталог:

    /etc/bor/dataDir/

3. Убедитесь, что вы добавили правильный адрес в `/etc/bor/metadata`

Для двоичных файлов:

1. Скопируйте файл хранилища ключей Bor в следующий каталог:

`/var/lib/bor/keystore/`

2. Скопируйте password.txt в следующий каталог:

`/var/lib/bor/password.txt`


### 4. Ошибка: неправильный Block.Header.AppHash. Expected xxxx {#4-error-wrong-block-header-apphash-expected-xxxx}

Обычно такая ошибка возникает из-за неправильной установки Heimdall. Для устранения этой проблемы сделайте следующее:

Выполните следующую команду:

    ```heimdalld unsafe-reset-all```

Затем снова запустите службу Heimdall. Вы можете обратиться к этому руководству - https://docs.polygon.technology/docs/validate/validate/run-validator

### 5. Как создать ключ API? {#5-from-where-do-i-create-the-api-key}

Это можно сделать по ссылке [https://infura.io/register](https://infura.io/register) . Убедитесь, что после настройки аккаунта и проекта вы скопировали ключ API для Ropsten, а не для основной сети.

По умолчанию выбрана основная сеть (Mainnet).

### 6. Heimdall не работает. Возникает ошибка паники {#6-heimdall-isn-t-working-i-m-getting-a-panic-error}

**Фактическая ошибка**: Heimdall не работает. Первая строка в журнале:
паника: неизвестный db_backend leveldb, ожидается либо goleveldb, либо memdb, либо fsdb

Измените конфигурацию на `goleveldb` в `config.toml`.


### 7. Как удалить оставшиеся фрагменты Heimdall и Bor? {#7-how-do-i-delete-remnants-of-heimdall-and-bor}

Чтобы удалить оставшиеся фрагменты Heimdall и Bor, выполните следующие команды:
Bor:

Для пакета Linux:

```$ sudo dpkg -i matic-bor```

Также удалите каталог Bor:

```$ sudo rm -rf /etc/bor```

Для двоичных файлов:

```$ sudo rm -rf /etc/bor```

И

```$ sudo rm /etc/heimdall```


### 8. Сколько валидаторов могут быть активными одновременно? {#8-how-many-validators-can-be-active-concurrently}

Одновременно активными могут быть до 100 валидаторов. Если лимит будет достигнут в середине события, мы будем привлекать дополнительных участников. Обращаем внимание, что активные валидаторы — это в основном те, у кого высокий показатель времени работы. Участники с высоким показателем времени простоя будут исключаться из проекта.

### 9. Сколько средств следует размещать в стейкинге? {#9-how-much-should-i-stake}

Какими должны быть параметры staked-amount и heimdall-fee-amount?

Для стейкинга требуется не менее 10 токенов MATIC. Комиссия Heimdall должна быть больше 10. Например, если сумма вашего стейка равняется 400, тогда комиссия Heimdall должна быть 20. Мы советуем оставить комиссию Heimdall равной 20.

Обращаем внимание, что значения, введенные в параметрах staked-amount и heimdal-fee-amount, должны быть введены с 18 знаками после основного значения.

Пример:

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 10. Меня выбрали в качестве валидатора, но мой адрес ETH был неправильным. Что мне делать? {#10-i-was-selected-to-become-a-validator-but-my-eth-address-was-incorrect-what-do-i-do}

Если у вас есть доступ к адресу ETH, который вы указали ранее, вы можете перевести тестовые токены с того аккаунта на ваш текущий аккаунт. После этого вы можете начать процесс настройки нод.

Если у вас не осталось доступа к адресу предыдущему ETH, мы не будем переводить вам токены отдельно. Вы можете повторно зарегистрироваться с помощью формы и указать правильный адрес ETH.

### 11. При запуске моста возникает ошибка {#11-i-m-getting-an-error-starting-the-bridge}

**Ошибка**: Объект «start» неизвестен, попробуйте «bridge help». Можно ли по-прежнему игнорировать это?

Проверьте «which bridge». Если это `/usr/sbin/bridge`, то вы запустили неправильную програму «bridge».

Попробуйте `~/go/bin/bridge` вместо `(or $GOBIN/bridge)`


### 12. Возникает ошибка dpkg. {#12-i-m-getting-dpkg-error}

**Ошибка**: dpkg: error processing archive matic-heimdall_1.0.0_amd64.deb (--install): trying to overwrite '/heimdalld-rest-server.service', which is also in package matic-node 1.0.0

Это происходит главным образом из-за предыдущей установки Polygon на вашем компьютере. Чтобы решить эту проблему, можно выполнить следующую команду:

`sudo dpkg -r matic-node`


### 13. Непонятно, на какой приватный ключ нужно добавить при генерации ключа валидатора. {#13-i-m-not-clear-on-which-private-key-should-i-add-when-i-generate-validator-key}

Приватный ключ, который следует использовать, — это адрес ETH вашего кошелька, в котором хранятся токены тестовой сети Polygon. Вы можете завершить настройку с помощью одной пары открытых и приватных ключей, которые привязаны к адресу, указанному в форме.


### 14. Как узнать, синхронизирован Heimdal или нет? {#14-is-there-a-way-to-know-if-heimdall-is-synced}

Чтобы проверить это, выполните следующую команду:

```$ curl [http://localhost:26657/status](http://localhost:26657/status)```

Проверьте значение catching_up. Если оно равно false, тогда нода полностью синхронизирована.


### 15. Предусмотрена ли награда в MATIC для стейкеров, входящих в рейтинг 10 лучших стейкеров? {#15-what-if-someone-become-a-top-10-staker-how-he-will-receive-his-matic-reward-at-the-end}

Награды на этапе 1 не зависят от стейка. Более подробную информацию о наградах можно узнать по ссылке https://blog.matic.network/counter-stake-stage-1-stake-on-the-beach-full-details-matic-network/. Участники с крупным стейком не имеют автоматического права на получение награды на этом этапе.


### 16. Какую версию Heimdall нужно использовать? {#16-what-should-be-my-heimdall-version}

Чтобы узнать версию Heimdall, выполните следующую команду:

```heimdalld version```

Для этапа 1 правильная версия Heimdall — это `heimdalld version is beta-1.1-rc1-213-g2bfd1ac`


### 17. Какие значения следует указать в параметрах staked-amount стейка и fee-amount? {#17-what-values-should-i-add-in-the-stake-amount-and-fee-amount}

Для стейкинга требуется не менее 10 токенов MATIC. Комиссия Heimdall должна быть больше 10. Например, если сумма вашего стейка равняется 400, тогда комиссия Heimdall должна быть 20. Мы советуем оставить комиссию Heimdall равной 20.

Обращаем внимание, что значения, введенные в параметрах staked-amount и heimdal-fee-amount, должны быть введены с 18 знаками после основного значения.

Пример:

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 18. В чем разница между `/var/lib/heimdall` и `/etc/heimdall?`

`/var/lib/heimdall` — это каталог Heimdall при установке с помощью двоичных файлов. `/etc/heimdall` — при установке с помощью пакета Linux.


### 19. При выполнении транзакции стейкинга возникает ошибка «Gas Exceeded». {#19-when-i-make-the-stake-transaction-i-m-getting-gas-exceeded-error}

Эта ошибка может возникнуть из-за неверного формата размера стейка или комиссии. Значения, введенные во время команды стейкинга, должны иметь 18 знаков после основного значения.

Обращаем внимание, что значения, введенные в параметрах staked-amount и heimdal-fee-amount, должны быть введены с 18 знаками после основного значения.

Пример:

    heimdallcli stake --staked-amount 400000000000000000000  --fee-amount 1000000000000000000 --validator 0xf8d1127780b89f167cb4578935e89b8ea1de774f


### 20. Как стать валидатором? {#20-when-will-i-get-a-chance-to-become-a-validator}

Мы постепенно добавляем валидаторов в течение всего этапа 1. Мы будем постепенно пополнять список новых внешних валидаторов. Его разместят на канале Discord.


### 21. Где можно найти информацию о расположении аккаунта Heimdall? {#21-where-can-i-find-heimdall-account-info-location}

Для двоичных файлов:

    /var/lib/heimdall/config folder

Для пакета Linux:

    /etc/heimdall/config


### 22. В какой файл нужно добавить ключ API? {#22-which-file-do-i-add-the-api-key-in}

После создания ключ API нужно добавить в файл `heimdall-config.toml`.


### 23. В какой файл нужно добавить persistent_peers? {#23-which-file-do-i-add-the-persistent_peers}

persistent_peers можно добавить в следующий файл:

    /var/lib/heimdall/config/config.toml


### 24. Что делать при переустановке Tendermint без сброса данных приложения? {#24-did-you-reset-tendermint-without-resetting-your-application-s-data}

В этом случае можно сбросить данные конфигурации Heimdall и попробовать повторно запустить установку.

    $ heimdalld unsafe-reset-all
    $ rm -rf $HEIMDALLDIR/bridge


### 25. Ошибка: не удалось распаковать конфигурацию. Ошибка 1 (ошибки) декодирования. {#25-error-unable-to-unmarshall-config-error-1-error-s-decoding}

Ошибка: `* '' has invalid keys: clerk_polling_interval, matic_token, span_polling_interval, stake_manager_contract, stakinginfo_contract`

Это происходит главным образом из-за наличия опечаток, недостающих фрагментов или оставшегося старого файла конфигурации. Нужно удалить все оставшиеся фрагменты, а затем повторить настройку.

### 26. Как остановить службы Heimdall и Bor? {#26-to-stop-heimdall-and-bor-services}

**Для пакетов Linux**:

Остановка Heimdall: `sudo service heimdalld stop`

Остановка Bor: `sudo service bor stop`. Также можно выполнить следующие команды:

1. `ps -aux | grep bor`. Получите PID для Bor и выполните следующую команду.
2. `sudo kill -9 PID`

**Для двоичных файлов**:

Остановка Heimdall: `pkill heimdalld`

Остановка моста: `pkill heimdalld-bridge`

Остановка Bor: перейдите в CS-2001/bor и выполните команду `bash stop.sh`

### 27. Как удалить каталоги Heimdall и Bor? {#27-to-remove-heimdall-and-bor-directories}

**Для пакетов Linux**: Удаление Heimdall: `sudo rm -rf /etc/heimdall/*`

Удаление каталогов Bor: `sudo rm -rf /etc/bor/*`

**Для двоичных файлов**:

Удаление Heimdall: `sudo rm -rf /var/lib/heimdall/`

Удаление каталогов Bor: `sudo rm -rf /var/lib/bor`

### 28. Что делать при возникновении ошибки «Wrong Block.Header.AppHash»? {#28-what-to-do-when-you-get-wrong-block-header-apphash-error}

Эта ошибка обычно возникает из-за того, что запросы Infura исчерпаны. При настройке ноды на Polygon вы добавляете ключ Infura в файл конфигурации (Heimdall). По умолчанию доступно 100 тысяч запросов в день. Такая ошибка возникает, если этот лимит превышен. Для решения этой проблемы вы можете создать новый ключ API и добавить его в файл `config.toml`.

:::tip СОВЕТ

Следите за последними обновлениями нодов и валидаторов от специалистов Polygon
и сообщества, подписавшись на
[группы уведомлений Polygon](https://polygon.technology/notifications/).

:::
