---
id: adding-a-custom-token
title: Добавление пользовательского токена
sidebar_label: Adding a Custom Token
description: Создайте свое следующее блокчейн-приложение на Polygon.
keywords:
  - docs
  - matic
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Функция **Добавить пользовательский токен** позволяет добавлять для отображения любой токен и использовать его с помощью кошелька Polygon. Вам стоит просто найти токен по адресу контракта, корневого или дочернего:

* **Корневым** является контракт токена на Ethereum
* **Дочерним** является контракт в сети Polygon

### Как найти контракт токена? {#how-do-i-find-the-token-contract}

Вы можете найти токен по его названию на сайте [Coingecko](http://coingecko.com) или [Coinmarketcap](https://coinmarketcap.com/). Здесь можно просмотреть его адрес в цепочке Ethereum (для токенов ERC 20) и других поддерживаемых последующих цепочках, таких как Polygon. Адрес токена в других цепях может не обновляться, но вы можете с уверенностью использовать корневой адрес контракта для всех целей.

Поэтому при выборе токена вы сможете выполнить поиск по следующим критериям:
* Символ токена
* Название токена
* контракт

Вот как это работает:

1. Легко включить в список любой токен, добавив адрес контракта для пользовательского токена (мы поддерживаем

адреса контрактов как в Polygon, так и на Ethereum):

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/001.png")} width="500" height="420px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/002.png")} width="500"  height="600px"/>
</div>

2. После получения информации о токене вы увидите экран подтверждения со всеми данными о нем. Затем вы можете добавить его в качестве пользовательского токена, который будет храниться локально в вашей системе. Мы рекомендуем повторно проверить контракты токена из-за большого количества клонов токенов и мошеннических схем:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/003.png")} width="500"  height="600px"/>
</div>

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/004.png")} width="500"  height="600px"/>
</div>

3. Ваш добавленный токен теперь отображается при выборе:

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/005.png")} width="500"  height="600px"/>
</div>

Можно также добавить токен непосредственно из вкладки токенов на экране **Управления:**

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/006.png")} width="500"  height="600px"/>
</div>