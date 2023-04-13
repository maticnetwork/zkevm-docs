---
id: change-signer-address
title: Изменение адреса подписанта
description: Изменить адрес подписанта вашего валидатора
keywords:
  - docs
  - matic
  - polygon
  - signer address
  - change
  - validator
slug: change-signer-address
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Чтобы узнать, что такое [адрес подписанта](/docs/maintain/glossary.md#signer-address), см. статью
[Управление ключами](/docs/maintain/validator/core-components/key-management).

## Предварительные условия {#prerequisites}

Убедитесь, что ваш новый узел проверки полностью синхронизирован и работает с новым адресом подписанта.

## Изменение адреса подписанта {#change-the-signer-address}

В данном руководстве текущий узел проверки называется нодом 1, а новый узел проверки — нодом 2.

1. Войдите в [дашборд стейкинга](https://staking.polygon.technology/) при помощи адреса нода 1.
2. В профиле нажмите **Edit profile** (изменить профиль).
3. В поле **Signer's address** (адрес подписанта) укажите адрес нода 2.
4. В поле **Signer's public key** (открытый ключ подписанта) укажите открытый ключ нода 2.

   Чтобы получить открытый ключ, выполните следующую команду в узле проверки:

   ```sh
   heimdalld show-account
   ```

Нажмите **Save** (сохранить), чтобы сохранить новые данные для нода. По сути, это означает, что нод 1 будет вашим адресом, контролирующим стейк, куда будут отправляться награды, и т. д. Нод 2 теперь будет выполнять такие операции, как подписание блоков, подписание чекпоинтов и т. д.
