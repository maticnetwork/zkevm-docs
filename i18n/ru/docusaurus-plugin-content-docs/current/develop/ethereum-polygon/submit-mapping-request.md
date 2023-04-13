---
id: submit-mapping-request
title: Токены для картографирования
description:  Руководство по тому, как сопоставить токены между Ethereum и Polygon цепочками с помощью PoS Bridge
keywords:
  - docs
  - polygon wiki
  - token mapping
  - pos bridge
  - polygon
  - goerli
  - ethereum
  - testnet
  - mainnet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

import useBaseUrl from '@docusaurus/useBaseUrl';

Картография необходима для перевода ваших активов в Ethereum и Polygon PoS. Мы предлагаем два моста для выполнения этой задачи. Более подробную информацию о мосту можно понять [здесь](/develop/ethereum-polygon/getting-started.md).

:::tip

Мост Polygon PoS доступен как для Polygon Mainnet, так и для Mumbai Testnet.

:::

## Шаги по отправке запроса на сопоставление {#steps-to-submit-a-mapping-request}

Чтобы сопоставить токены между Ethereum и Polygon PoS, можно использовать [Mapper](https://mapper.polygon.technology/). Откройте ссылку и нажмите на кнопку **«Создать** токена» в правом верхнем углу для запуска нового запроса на отображение.

<img src={useBaseUrl("img/token-mapping/mapping-tool.png")} />

**Шаг 1 →** Выберите сеть, на которой вы хотите сопоставить свой ток. Вы можете выбрать **Goerli-Mumbai** для Testnet, а **Ethereum-Polygon PoS** для Mainnet.

**Шаг 2 →** Выберите тип токена, который вы are **ERC20**, **ERC721** или **ERC1155**.

**Шаг 3 →** Введите адрес токена **Ethereum/Goerli** в поле **Address Token** Ethereum. Убедитесь, что код контракта токена был проверен в the **Ethereum/Goerli**.

**Шаг 4 →** После добавления **адреса токена Ethereum**, соответствующие поля viz. **Имя токена, символ токена и десятичный токен** будут автоматически заполняться с данными контракта.

**Шаг 5 →** Теперь нажмите на кнопку **Begin Mapping**, чтобы инициировать процесс отображения. Поскольку это предполагает транзакцию Ethereum, вам нужно подключить свой кошелек, чтобы продолжить.

**Шаг 6 →** Вам будет показан модальный обзор с информацией о токене и расчетными комиссиями за газ для завершения картирования. Проверьте данные и инициируйте транзакцию отображения, выбрав кнопку **«Комиссия за вознаграждение за газ** оплату».

После подтверждения транзакции с вашего кошелька, вам придется дождаться завершения транзакции в Ethereum. После завершения транзакции вам будет показан модальный код успеха с вашим адресом токена в сети Polygon PoS. Вы можете продолжить проверку отображения, проверяя адрес дочернего токена в [Polygonscan](https://polygonscan.com/).

Чтобы успешно отображать Mainnet, вы можете указать данные токена [здесь,](https://github.com/maticnetwork/polygon-token-list/issues/new/choose) которые будут добавлены в [**список токена Polygon**](https://api-polygon-tokens.polygon.technology/tokenlists/polygonTokens.tokenlist.json).

:::tip

В случае [<ins>пользовательского отображения токенов</ins>](/develop/l1-l2-communication/fx-portal.md#do-i-need-a-custom-fxtunnel-implementation-) вы можете посетить нашу документацию [**<ins>FxPortal</ins>**](/develop/l1-l2-communication/fx-portal.md) и использовать информацию, предоставленную для создания вашей пользовательской реализации FX для картографирования токенов.

:::

## Видео-гид {#video-guide}

Вот быстрый видеоурок о том, как сопоставить токены между **Ethereum Goerli ↔ Polygon Mumbai Testnet**:

<video autoplay width="100%" height="100%" controls="true" >
  <source type="video/mp4" src="/img/token-mapping/token-mapper.mp4"></source>
  <p>Ваш браузер не поддерживает этот видеоэлемент.</p>
</video>
