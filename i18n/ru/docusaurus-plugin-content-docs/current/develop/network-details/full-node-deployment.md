---
id: full-node-deployment
title: Запуск полного нода с помощью Ansible
description: Развернуть полный узел с помощью Ansible
keywords:
  - docs
  - polygon
  - matic
  - node
  - full node setup
  - ansible
  - deploy
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Этот учебник позволяет вам запустить и запустить полный узел с помощью Ansible.

[Ansible playbook](https://docs.ansible.com/ansible/latest/user_guide/playbooks_intro.html) используется Настройка и управление полным нодом. См. руководство [по минимальным техническим](technical-requirements.md) требованиям, предъявляемым к системе.

:::tip

Шаги, которые в этом руководстве, предполагают ожидание полной синхронизации сервисов Heimdall и Bor. Этот процесс занимает несколько дней.

Кроме того, можно использовать поддерживаемый снимок, что позволяет сократить время синхронизации до нескольких часов. Подробнее: [<ins>Инструкции по использованию моментальных снимков для Heimdall и Bor</ins>](/docs/develop/network-details/snapshot-instructions-heimdall-bor).

Ссылки для загрузки снимков см. на странице [<ins>Snapshots Polygon</ins>](https://snapshot.polygon.technology/) Chains.

:::

## Предварительные условия {#prerequisites}

- Установите Ansible на свой локальный компьютер с помощью Python3.x. Настройка не будет работать, если вы используете Python2.x.
    - Чтобы установить Ansible с Python 3.x, можно использовать pip. Если у вас нет пункта на вашем компьютере, Следуйте шагам, указанным [здесь](https://pip.pypa.io/en/stable/). Запустить `pip3 install ansible`для установки Ansible.
- Проверьте [хранилище Polygon PoS Ansible](https://github.com/maticnetwork/node-ansible#requirements) для требования.
- Вам также необходимо убедиться, что Go **не установлен** в вашем окружении. Если вы попытаетесь настроить полный нод через Ansible при установленном Go, у вас возникнут проблемы, потому что для Ansible должны быть установлены определенные пакеты Go.
- Также вам необходимо будет убедиться, что в вашей ВМ/на вашем компьютере ранее не устанавливались Polygon Validator, Heimdall или Bor. Чтобы избежать проблем при установке, их потребуется удалить.

:::info Heimdall

Последняя версия Heimdall **[v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0)** содержит несколько улучшений. Время задержки между событиями контракта разных валидаторов **увеличено,** чтобы убедиться, что mempool не заполняется быстро в случае взрыва событий, которые могут помешать прогрессу цепочки.

Кроме того, размер данных **был ограничен в txs синхронизации состояния на 30Kb (при представлении в батах) и 60Kb (при определении как строка)**. Например:

```bash
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```
:::

## Полная настройка нода {#full-node-setup}

- Убедитесь, что у вас есть доступ к удаленному компьютеру или VM, на котором устанавливается полный узел.
  > См. [https://github.com/maticnetwork/node-ansible#setup](https://github.com/maticnetwork/node-ansible#setup)
- Клонируйте репозиторий [https://github.com/maticnetwork/node-ansible](https://github.com/maticnetwork/node-ansible).
- Перейдите в папку с node-ansible`cd node-ansible`
- Редактируйте `inventory.yml`файл и вставьте свои IP(s) в `sentry->hosts`раздел.
  > См. в разделе [https://github.com/maticnetwork/node-ansible#inventory](https://github.com/maticnetwork/node-ansible#inventory)
- Проверьте, доступен ли удаленный аппарат при беге:`ansible sentry -m ping`
- Чтобы протестировать конфигурацию правильной машины, выполните следующую команду:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry" --list-hosts

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry" --list-hosts
  ```

  <img src={useBaseUrl("img/network/full-node-mumbai.png")} />

- Затем настройте полный узел с этой командой:

  ```bash
  # Mainnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mainnet node_type=sentry"

  # Testnet:
  ansible-playbook playbooks/network.yml --extra-var="bor_version=v0.3.3 heimdall_version=v0.3.0 network=mumbai node_type=sentry"
  ```

- Если вы столкнулись с любыми проблемами, удалите и очистите весь настройка, используя:
  ```
  ansible-playbook playbooks/clean.yml
  ```

- После запуска the Ansible войдите в систему на удаленном компьютере.

- Узлы семян Heimdall:

  ```bash
  moniker=<enter unique identifier>

  # Mainnet:
  seeds="d3a8990f61bb3657da1664fe437d4993c4599a7e@3.211.248.31:26656,d3d7d397339c9126235dfab11bf925e269776f4f@3.212.183.151:26656,68254d33685fad151e45bfe1ed33d538ba6ec8cb@3.93.224.197:26656,d26c54ebbf274896f12977bb13d83ac1237a8226@184.73.124.158:26656,f4f605d60b8ffaaf15240564e58a81103510631c@159.203.9.164:26656,4fb1bc820088764a564d4f66bba1963d47d82329@44.232.55.71:26656,2eadba4be3ce47ac8db0a3538cb923b57b41c927@35.199.4.13:26656,25f5f65a09c56e9f1d2d90618aa70cd358aa68da@35.230.116.151:26656,3b23b20017a6f348d329c102ddc0088f0a10a444@35.221.13.28:26656"

  # Testnet:
  seeds="b18bbe1f3d8576f4b73d9b18976e71c65e839149@34.226.134.117:26656,4cd60c1d76e44b05f7dfd8bab3f447b119e87042@54.147.31.250:26656,7a6c7b5d25b13ce3448b047dbebeb1a19cc2e092@18.213.200.99:26656"
  ```
- Bootnodes: узлы:

  ```bash
  # Mainnet:
  bootnode ["enode://0cb82b395094ee4a2915e9714894627de9ed8498fb881cec6db7c65e8b9a5bd7f2f25cc84e71e89d0947e51c76e85d0847de848c7782b13c0255247a6758178c@44.232.55.71:30303,enode://88116f4295f5a31538ae409e4d44ad40d22e44ee9342869e7d68bdec55b0f83c1530355ce8b41fbec0928a7d75a5745d528450d30aec92066ab6ba1ee351d710@159.203.9.164:30303","enode://4be7248c3a12c5f95d4ef5fff37f7c44ad1072fdb59701b2e5987c5f3846ef448ce7eabc941c5575b13db0fb016552c1fa5cca0dda1a8008cf6d63874c0f3eb7@3.93.224.197:30303","enode://32dd20eaf75513cf84ffc9940972ab17a62e88ea753b0780ea5eca9f40f9254064dacb99508337043d944c2a41b561a17deaad45c53ea0be02663e55e6a302b2@3.212.183.151:30303"]

  # Testnet:
  bootnodes ["enode://320553cda00dfc003f499a3ce9598029f364fbb3ed1222fdc20a94d97dcc4d8ba0cd0bfa996579dcc6d17a534741fb0a5da303a90579431259150de66b597251@54.147.31.250:30303","enode://f0f48a8781629f95ff02606081e6e43e4aebd503f3d07fc931fad7dd5ca1ba52bd849a6f6c3be0e375cf13c9ae04d859c4a9ae3546dc8ed4f10aa5dbb47d4998@34.226.134.117:30303"]
  ```

- Проверка синхронизации Heimdall
    - Запустите на удаленной машине/ВМ команду `curl localhost:26657/status`
    - В выводе значение `catching_up` должно равняться `false`

- Как только Heimdall будет синхронизирован, запустите
    - `sudo service bor start`

Вы успешно настроили полный узел с Ansible.

:::note

Если Bor представляет ошибку разрешения на данные, запустите эту команду, чтобы пользователь Bor стал владельцем файлов Bor:

```bash
sudo chown bor /var/lib/bor
```

:::
## Logs {#logs}

Журналы могут быть управляются инструментом `journalctl`linux. Вот учебник для расширенного использования: [Как использовать Journalctl для просмотра и записи Systemd](https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs).

**Проверьте журналы нода Heimdall**

```bash
journalctl -u heimdalld.service -f
```

**Проверить журналы Rest-server Bor**

```bash
journalctl -u bor.service -f
```

## Настройка портов и брандмауэра {#ports-and-firewall-setup}

Откройте порты 22, 26656 и 30303 для world (0.0.0.0/0) на брандмауэре сторожевого нода.

Вы можете использовать VPN для ограничения доступа к порту 22 в соответствии с требованиями и правилами безопасности.