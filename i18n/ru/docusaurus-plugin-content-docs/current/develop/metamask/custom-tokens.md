---
id: custom-tokens
title: Настройка пользовательских токенов
description: Настройка пользовательских токенов в Metamask.
keywords:
  - wiki
  - polygon
  - custom token
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Эта страница демонстрирует процесс конфигурации/добавления пользовательских токенов в Metamask.

Можно использовать тот же процесс, чтобы добавить любые пользовательские токены в любую сеть в Metamask. Эту [таблицу](#tokens-and-contract-adresses) можно смело отображать некоторые примеры тестовых токенов с их соответствующими адресами контракта.

## Добавление пользовательского токена в аккаунт MetaMask {#adding-a-custom-token-to-your-metamask-account}

Во-первых, выберите соответствующую сеть для нового токена на главном экране вашего Metamask. Затем нажмите "Импорт токены".

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/add-test-token.png")} />
</div>

<br></br>

Затем он будет перемещаться на новый экран. На экране Import Tokens скопируйте адрес в поле Token Address.

:::info
Чтобы проиллюстрировать этот процесс, мы используем токен E**RC20-TESTV4 **в сети **Goerli.** Найти другие тестовые токены из других сетей [<ins>здесь</ins>](#tokens-and-contract-adresses).
:::

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/token-contract-address.png")} />
</div>

Другие поля заполняются автоматически. Нажмите на Add Custom Tokens и нажмите на Import Tokens. Теперь токен `TEST` должен отобразиться в вашем аккаунте в Metamask.

<div align="center">
<img width="300" src={useBaseUrl("img/metamask/develop/added-token.png")} />
</div>

**Добавление тестового токена ERC1155 в ваш аккаунт Metamask**

Хотя сеть Polygon поддерживает ERC1155, [Metamask еще не поддерживает этот стандарт](https://metamask.zendesk.com/hc/en-us/articles/360058488651-Does-MetaMask-support-ERC-1155-). Выпуск данного обновления ожидается в четвертом квартале 2021 г.

### Токены и адреса {#tokens-and-contract-adresses}

| token | Сеть | Адрес контракта |
|---------------|---------|----------------------------------------------|
| ERC20-TESTV4 | Goerli | `0x3f152B63Ec5CA5831061B2DccFb29a874C317502` |
| MATIC-TST | Mumbai | `0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e` |
| ERC721-TESTV4 | Goerli | `0xfA08B72137eF907dEB3F202a60EfBc610D2f224b` |
| ERC721-TESTV4 | Mumbai | `0x33FC58F12A56280503b04AC7911D1EceEBcE179c` |