---
id: did-implementation
title: Реализация Polygon DID
sidebar_label: Identity
description: Узнайте о реализации DID на Polygon
keywords:
  - docs
  - polygon
  - matic
  - DID
  - identity
image: https://wiki.polygon.technology/img/polygon-wiki.png
slug: did-implementation/getting-started
---

Это руководство по начальным действиям для пользователей, которые хотят использовать пакеты реализаций, выпущенные командой Polygon, для генерации и публикации Polygon DID в реестре Polygon.

Реализация метода Polygon DID включает 3 пакета, а именно polygon-did-registrar, polygon-did-resolver и polygon-did-registry-contract. Пользователь, желающий включить эти функциональные возможности, чтобы либо регистрировать, либо считывать DID в сети Polygon или из нее, может использовать приведенное ниже руководство.

DID (децентрализованный идентификатор) — это, по сути, уникальный идентификатор, созданный без участия центрального органа.  DID в контексте проверяемых учетных данных используется для подписания документов, тем самым способствуя подтверждению принадлежности документа пользователю в случае необходимости.

## Метод Polygon DID {#polygon-did-method}

Определение метода Polygon DID соответствует спецификациям и стандартам DID-Core. DID URI состоит из трех компонентов, разделенных двоеточиями. Это схема, за которой следует имя метода, а в конце идет метод-специфический идентификатор. Для Polygon URI выглядит следующим образом:

```
did:polygon:<Ethereum address>
```

Здесь схема `did`, имя метода является `polygon`и конкретный идентификатор метода — это адрес ethereum.

## Реализация Polygon DID {#polygon-did-implementation}

Polygon DID можно реализовать с помощью двух пакетов. Пользователь может импортировать соответствующие библиотеки npm и использовать их для включения методологий Polygon DID в соответствующие приложения. Подробная информация о реализации представлена в следующем разделе.

Для начала необходимо создать DID. Создание в случае Polygon DID — это инкапсуляция двух шагов, когда пользователю сначала нужно сгенерировать DID uri для себя, а затем зарегистрировать его в реестре Polygon.

### Создание DID {#create-did}

В вашем проекте для создания полигона DID URI необходимо установить следующим образом:

```
npm i @ayanworks/polygon-did-registrar --save
```

После завершения установки пользователь может использовать его следующим образом:

```
import { createDID } from "polygon-did-registrar";
```

`createdDID`Функция помогает пользователю генерировать DID URI. При создании DID возможны два сценария.

  1. Пользователь уже владеет кошельком и хочет сгенерировать DID, соответствующий этому же кошельку.

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network, privateKey);
    ```

  2. Если пользователь не имеет существующего кошелька и хочет сгенерировать один, пользователь может использовать:

    ```
    const {address, publicKey58, privateKey, DID} = await createDID(network);
    ```

Параметр сети в обоих случаях ссылается на то, хочет ли пользователь создать DID в Polygon Mumbai Testnet или Polygon Mainnet.

Входной сигнал образца:

```
network :"testnet | mainnet"
privateKey? : "0x....."
```

После создания DID у вас будет сформирован DID URI.

```
DID mainnet: did:polygon:0x...
DID testnet: did:polygon:testnet:0x...
```

### Регистрация DID {#register-did}

Чтобы зарегистрировать DID URI и соответствующий документ DID в реестре реестра необходимо использовать `polygon-did-registrar`следующим образом:

```js
import { registerDID } from "polygon-did-registrar";
```

В качестве предварительного условия регистрации DID, пользователю необходимо убедиться, что кошелек, который будет corrsponding в DID, имеет необходимый баланс токенов. После того, как пользователь имеет баланс токена в кошельке, может быть вызван в функцию registerDID, как показано ниже:

```js
const txHash = await registerDID(did, privateKey, url?, contractAddress?);
```

Параметры `did`и `privateKey`являются обязательными, в то время как вводить `url`и .`contractAddress` Если пользователь не введет два последних параметра, библиотека возьмет из DID URI конфигурации сети со значениями параметров по умолчанию.

Если все параметры соответствуют спецификациям и все дано в правильном порядке, `registerDID`функция возвращает хэш транзакции, соответствующая ошибка возвращается в противном случае.

И с этим вы успешно выполнили задачу регистрации DID в сети Polygon.

## Решение DID {#resolve-did}

Чтобы запустить установку, необходимо установить следующие библиотеки:

```bash
npm i @ayanworks/polygon-did-resolver --save
npm i did-resolver --save
```

Чтобы прочитать документ DID, зарегистрированный в реестре, любой пользователь с DID polygon URI может сначала импортировать в свой проект

```js
import * as didResolvers from "did-resolver";
import * as didPolygon from '@ayanworks/polygon-did-resolver';
```

После импорта пакетов документ DID может быть извлечен с помощью использования:

```js
const myResolver = didPolygon.getResolver()
const resolver = new DIDResolver(myResolver)

const didResolutionResult = this.resolver.resolve(did)
```

где `didResolutionResult`объект выглядит следующим образом:

```js
didResolutionResult:
{
    didDocument,
    didDocumentMetadata,
    didResolutionMetadata
}
```

Следует отметить, что пользователь не будет нести расходы на газ, пытаясь решить DID.

## Обновление документа DID {#update-did-document}

Чтобы инкапсулировать проект с возможностью обновления документа DID, пользователь должен использовать `polygon-did-registrar`следующим образом:

```js
import { updateDidDoc } from "polygon-did-registrar";
```

Далее вызовите функцию:

```js
const txHash = await updateDidDoc(did, didDoc, privateKey, url?, contractAddress?);
```

Следует отметить, что для обновления документа DID может отправить запрос только владелец D. В данном случае приватный ключ должен также хранить некоторое количество соответствующих токенов Matic.

Если пользователь не предоставит конфигурацию с `url` и `contractAddress`, библиотека возьмет из DID URI конфигурации сети с параметрами по умолчанию.

## Удаление документа DID {#delete-did-document}

С помощью реализации Polygon DID пользователь может также отозвать свой документ DID из реестра. Пользователь сначала должен использовать `polygon-did-registrar`следующим образом:

```js
import { deleteDidDoc } from "polygon-did-registrar";
```

Затем использовать

```js
const txHash = await deleteDidDoc(did, privateKey, url?, contractAddress?);
```

Среди параметров интересно отметить, что `url` и `contractAddress` являются необязательными параметрами, при этом, если они не будут предоставлены пользователем, функцией будет выбрана конфигурация по умолчанию на основании DID URI.

Важно, чтобы приватный ключ хранил необходимые токены Matic в соответствии с конфигурацией сети в DID, иначе транзакция даст сбой.

## Внесение изменений в репозиторий {#contributing-to-the-repository}

Используйте стандартный рабочий процесс с заявками на создание параллельного ответвления (fork), создание собственной ветви (branch) и включение кода (pull), чтобы предложить изменения в репозиторий. Пожалуйста, сделайте имена ветви информативными, добавив к примеру, номер проблемы.

```
https://github.com/ayanworks/polygon-did-registrar
https://github.com/ayanworks/polygon-did-resolver
```
