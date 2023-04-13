---
id: nftstorage
title: Минтинг NFT
description: Минтинг с NFT.storage и Polygon.
keywords:
  - nft.storage
  - filecoin
  - matic
  - polygon
  - docs
  - mint nfts
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Это руководство рассказывает, как выполнять минтинг NFT с использованием блокчейна Polygon и хранилища IPFS/Filecoin через NFT.Storage. Разработчики часто выбирают Polygon, решение масштабирования уровня 2 для Ethereum, за его скорость и более низкую стоимость транзакций при сохранении полной совместимости с Ethereum EVM. Это руководство содержит пошаговое описание процессов создания и развертывания стандартизированного смарт-контракта, сохранения метаданных и активов в IPFS и Filecoin через NFT.Storage API и минтинга NFT в собственный кошелек в Polygon.

## Введение {#introduction}

В этом руководстве мы рассмотрим достижение трех характеристик процесса минтинга:

1. *Масштабируемость* процесса минтинга с точки зрения стоимости и пропускной способности. Если цель сценария заключается в быстром создании NFT, соответствующая технология должна обрабатывать все запросы минтинга, и минтинг должен быть дешевым.
2. *Долговечность* NFT, поскольку активы могут быть долгосрочными, и поэтому необходимо обеспечить возможность их использования в течение всего времени существования.
3. *Неизменяемость* NFT и представляемого им актива для предотвращения нежелательных изменений и действий злоумышленников по изменению цифрового актива, который представляет NFT.

[Polygon](https://polygon.technology) обеспечивает требуемые характеристики *масштабируемости* благодаря своему протоколу и инфраструктуре. Также он обладает совместимостью с Ethereum и его виртуальной машиной, что позволяет разработчикам свободно перемещать код между двумя блокчейнами. Аналогичным образом [NFT.Storage](https://nft.storage) гарантирует *долговечность* благодаря возможностям базовой сети [Filecoin](https://filecoin.io) и *неизменяемость* благодаря использованию [адресации контента IPFS](https://nftschool.dev/concepts/content-addressing/).

В этом руководстве вы найдете обзор процесса минтинга NFT и научитесь сохранять цифровые активы с NFT.Storage и использовать эти цифровые активы для минтинга ваших NFT в Polygon.

## Предварительные условия {#prerequisites}

Общие знания об NFT дадут вам базовую информацию и контекст. [Школа NFT охватывает основы NFT ](https://nftschool.dev/concepts/non-fungible-tokens/)и более сложные темы, а также содержит больше руководств.

Чтобы протестировать и запустить код из этого руководства, вам потребуется рабочая [установка Node.js](https://nodejs.org/en/download/package-manager/).

Также вам потребуется кошелек Polygon в тестовой сети Mumbai с небольшим количеством токена MATIC. Чтобы начать, следуйте инструкциям ниже:

1. **Загрузите и установите [Metamask](https://metamask.io/)**. Metamask — это криптокошелек и шлюз для приложений блокчейна. Его очень просто использовать, и он упрощает большинство шагов, таких как настройку кошелька Polygon.
2. **Подключите Metamask к [тестовой сети Polygon Mumbai](https://docs.polygon.technology/docs/develop/metamask/overview)** и выберите ее в выпадающем меню. Мы будем использовать для минтинга NFT тестовую сеть Polygon, потому что она бесплатная.
3. **Получите токен MATIC** в свой кошелек, используя [faucet](https://faucet.polygon.technology/). Выберите тестовую сеть Mumbai и вставьте в форму адрес кошелька Metamask. Для минтинга NFT нам нужно заплатить майнерам небольшое количество MATIC за операции по добавлению новых транзакций в блокчейн, таких как минтинг NFT или создание нового смарт-контракта.
4. **Скопируйте свой приватный ключ** из Metamask. Для этого нажмите на три точки в правом верхнем углу и выберите пункт «Реквизиты счета». Внизу вы увидите кнопку для экспорта вашего приватного ключа. Нажмите на нее и введите пароль, когда система запросит. Пока вы можете скопировать приватный ключ в текстовый файл. Мы используем его в руководстве позднее, когда будем осуществлять взаимодействие с блокчейном.

Наконец, вам потребуется текстовый редактор или редактор кода. Для дополнительного удобства лучше выбрать редактор с поддержкой языков JavaScript и Solidity. Хорошим выбором будет [Visual Studio Code](https://code.visualstudio.com) с включенным расширением [solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity).

## Подготовка {#preparation}

### Получение ключа API для NFT.storage {#get-an-api-key-for-nft-storage}

Для использования NFT.Storage требуется ключ API. Во-первых, [перейдите в NFT.Storage и войдите с помощью своего адреса электронной почты](https://nft.storage/login/). Вы получите электронное письмо с волшебной ссылкой для входа без пароля. После успешного входа перейдите в раздел ключей API через панель навигации. Вы найдете кнопку для создания **нового ключа**. Когда вам предложат ввести имя ключа API, вы можете выбрать произвольное имя или использовать имя «polygon + NFT.Storage». Вы можете скопировать содержимое столбца ключей сейчас или воспользоваться ссылкой на NFT.Storage на следующих страницах этого руководства.

### Настройте свое рабочее пространство {#set-up-your-workspace}

Создайте новую пустую папку, которую мы сможем использовать в качестве рабочего пространства для этого руководства. Вы можете свободно выбрать любое имя и расположение в файловой системе. Откройте терминал и перейдите в новую созданную папку.

Далее мы установим следующие зависимости Node.js:

- **Hardhat и Hardhat-Ethers**, среда разработки для Ethereum (и Ethereum-совместимых блокчейнов, таких как Polygon).
- **OpenZeppelin**, коллекция смарт-контрактов, включающая стандартизированные базовые контракты NFT.
- **NFT.Storage**, библиотека для подключения к NFT.Storage API.
- **Dotenv**, библиотека для работы с файлами среды для конфигурации (например, вставки приватных ключей в скрипт).

Используйте следующую команду, чтобы установить все зависимости одновременно:

```bash
npm install hardhat @openzeppelin/contracts nft.storage dotenv @nomiclabs/hardhat-ethers
```

Hardhat необходимо инициализировать в текущей папке. Для запуска инициализации запустите:

```bash
npx hardhat
```

При предложении выберите **Создать пустой hardhat.config.js**. Вывод консоли должен выглядеть следующим образом:

```bash
✔ What do you want to do? · Create an empty hardhat.config.js
✨ Config file created ✨
```

Мы внесем некоторые изменения в файл конфигурации hardhat `hardhat.config.js` для поддержки тестовой сети Polygon Mumbai. Откройте `hardhat.config.js`, созданный на последнем шаге. Обратите внимание, что мы загружаем приватный ключ вашего кошелька Polygon из файла среды, и этот файл среды следует хранить в безопасном месте. Вы даже можете использовать другую [ссылку](https://docs.polygon.technology/docs/develop/network-details/network) rpc в соответствии с требованиями.

```js
/**
* @type import('hardhat/config').HardhatUserConfig
*/
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "PolygonMumbai",
  networks: {
    hardhat: {
    },
    PolygonMumbai : {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
}
```

Создайте новый файл, `.env`который будет содержать ключ API для NFT.Storage и приватный ключ кошелька Polygon. Содержание `.env`файла должно выглядеть следующим образом:

```bash
PRIVATE_KEY="Your Private Key"
NFT_STORAGE_API_KEY="Your Api Key"
```

Замените подстановочные символы ключом API, который вы создали на этапе подготовки, и приватным ключом вашего кошелька Polygon.

Чтобы продолжить организацию нашего проекта, мы создадим три новых папки:

1. `contracts`, для контрактов Polygon, написанных на Solidity.
2. `assets`, содержащую цифровой актив, для которого мы будем выполнять минтинг как NFT.
3. `scripts`, обеспечивающую подготовку и процесс минтинга.

Выполните следующую команду:

```bash
mkdir contracts assets scripts
```

Наконец, мы добавим изображение в папку `assets`. Это изображение будет нашей художественной работой, которую мы выгрузим в NFT.Storage и используем для минта на Polygon. Пока мы назовем его `MyExampleNFT.png`. Если у вас нет красивого изображения, вы можете [загрузить простой узор](https://ipfs.io/ipfs/bafkreiawxb4aji744637trok275odl33ioiijsvvahnat2kw5va3at45mu).

## Минтинг вашего NFT {#minting-your-nft}

### Сохранение данных актива с NFT.Storage {#storing-asset-data-with-nft-storage}

Мы будем использовать NFT.Storage для хранения нашего цифрового актива и его метаданных. NFT.Storage гарантирует неизменяемость и долговечность, автоматически выгружая ваш цифровой актив в Filecoin и IPFS. IPFS и Filecoin используют идентификаторы (CID) для создания неизменяемых ссылок. IPFS обеспечивает быстрое извлечение благодаря кэшированию с георепликацией, а Filecoin гарантирует долговечность благодаря стимулированию поставщиков услуг хранения.

Создайте скрипт с именем `store-asset.mjs` ниже в каталоге `scripts`. Содержимое приведено ниже:

```js
import { NFTStorage, File } from "nft.storage"
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const { NFT_STORAGE_API_KEY } = process.env

async function storeAsset() {
   const client = new NFTStorage({ token: NFT_STORAGE_API_KEY })
   const metadata = await client.store({
       name: 'ExampleNFT',
       description: 'My ExampleNFT is an awesome artwork!',
       image: new File(
           [await fs.promises.readFile('assets/MyExampleNFT.png')],
           'MyExampleNFT.png',
           { type: 'image/png' }
       ),
   })
   console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url)
}

storeAsset()
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

Основная часть скрипта состоит из функции `storeAsset`. При этом создается новый клиент, использующий для подключения к NFT.Storage ранее созданный вами ключ API. Далее мы вводим метаданные, включающие имя, описание и изображение. Обратите внимание, что мы считываем актив NFT напрямую из файловой системы из каталога `assets`. В конце функции мы печатаем URL метаданных, поскольку мы будем использовать его позднее при создании NFT в Polygon.

После настройки скрипта вы сможете выполнить его, запустив следующую команду:

```bash
node scripts/store-asset.mjs
```

Вывод должен выглядеть, как показано ниже, где `HASH` — CID для сохраненного изображения.

```bash
Metadata stored on Filecoin/IPFS at URL: ipfs://HASH/metadata.json
```

### Создание вашего NFT в Polygon {#creating-your-nft-on-polygon}

#### Создание смарт-контракта для минтинга {#create-the-smart-contract-for-minting}

Вначале мы создадим смарт-контракт, который будет использоваться для минтинга NFT. Поскольку Polygon совместим с Ethereum, мы напишем смарт-контракт на [Solidity](https://soliditylang.org). Создайте новый файл для нашего смарт-контракта NFT с именем `ExampleNFT.sol` в каталоге `contracts`. Вы можете скопировать код, приведенный ниже:

```solidity
// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleNFT is ERC721URIStorage, Ownable {
   using Counters for Counters.Counter;
   Counters.Counter private _tokenIds;

   constructor() ERC721("NFT", "ENFT") {}

   function mintNFT(address recipient, string memory tokenURI)
       public onlyOwner
       returns (uint256)
   {
       _tokenIds.increment();

       uint256 newItemId = _tokenIds.current();
       _mint(recipient, newItemId);
       _setTokenURI(newItemId, tokenURI);

       return newItemId;
   }
}
```

Для действительности в качестве NFT ваш смарт-контракт должен реализовывать все методы [стандарта ERC-721](https://ethereum.org/en/developers/docs/standards/tokens/erc-721/). Мы будем использовать реализацию библиотеки [OpenZeppelin](https://openzeppelin.com), которая уже обеспечивает набор базовых функций и соответствует стандарту.

В верхней части нашего смарт-контракта мы импортируем три класса смарт-контрактов OpenZeppelin:

1. `\@openzeppelin/contracts/token/ERC721/ERC721.sol` содержит реализацию базовых методов стандарта ERC-721, которые будет наследовать наш смарт-контракт NFT. Мы будем использовать расширение `ERC721URIStorage,` для хранения не только активов, но и метаданных в файле JSON вне цепочки. Как и контракт, этот файл JSON должен соответствовать стандарту ERC-721.

2. `\@openzeppelin/contracts/utils/Counters.sol` предоставляет счетчики, поддерживающие увеличение или уменьшение отсчета на единицу. Наш смарт-контракт использует счетчик для отслеживания общего количества созданных посредством минтинга NFT и для установки уникального идентификатора для новых NFT.

3. `\@openzeppelin/contracts/access/Ownable.sol` настраивает контроль доступа к нашему смарт-контракту так, что минтинг NFT может выполнять только владелец смарт-контракта (вы).

После команд импорта идет наш пользовательский смарт-контракт NFT, который содержит счетчик, конструктор и метод для фактического минтинга NFT. Основная работа выполняется базовым контрактом, унаследованным от OpenZeppelin, который реализует большинство необходимых нам методов для создания NFT в соответствии со стандартом ERC-721.

Счетчик отслеживает общее количество созданных посредством минтинга NFT, используя его в методе минтинга в качестве уникального идентификатора NFT.

Мы передаем в конструкторе два аргумента строки для имени смарт-контракта и символ (представлен в кошельках). Вы можете изменить их любым желаемым образом.

Наконец, у нас имеется метод `mintNFT`, позволяющий фактически выполнять минтинг NFT. Этот метод установлен на `onlyOwner`, чтобы его мог выполнять только владелец смарт-контракта.

`address recipient`указывает адрес, который получит NFT вначале.

`string memory tokenURI` — это URL-адрес, который должен указывать на документ JSON, описывающий метаданные NFT. В нашем случае он уже хранится в NFT.Storage. Мы можем использовать возвращаемую ссылку IPFS на файл метаданных в формате JSON во время исполнения метода.

Внутри метода мы увеличиваем счетчик для получения нового уникального идентификатора для нашего NFT. Затем мы вызываем методы, предоставляемые базовым контрактом от OpenZeppelin, для минтинга NFT для получателя с новым созданным идентификатором и для установки URI метаданных. Этот метод возвращает уникальный идентификатор после исполнения.

#### Развертывание смарт-контракта в Polygon {#deploy-the-smart-contract-to-polygon}

Пришло время для развертывания нашего смарт-контракта в Polygon. Создайте новый файл с именем `deploy-contract.mjs` в каталоге `scripts`. Скопируйте содержимое приведенной ниже записи в этот файл и сохраните его.

```js
async function deployContract() {
 const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
 const exampleNFT = await ExampleNFT.deploy()
 await exampleNFT.deployed()
 // This solves the bug in Mumbai network where the contract address is not the real one
 const txHash = exampleNFT.deployTransaction.hash
 const txReceipt = await ethers.provider.waitForTransaction(txHash)
 const contractAddress = txReceipt.contractAddress
 console.log("Contract deployed to address:", contractAddress)
}

deployContract()
 .then(() => process.exit(0))
 .catch((error) => {
   console.error(error);
   process.exit(1);
 });
```

Развертывание контракта производится с использованием функций помощника, предоставляемых библиотекой hardhat. Вначале мы получим смарт-контракт, созданный на предыдущем шаге с помощью указанной фабрики. Затем мы выполним развертывание, вызвав соответствующий метод, и подождем завершения развертывания. Ниже приведено еще несколько строк кода для получения правильного адреса в среде тестовой сети. Сохранить `mjs`файл.

Выполните скрипт следующей командой:

```bash
npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
```

Если все правильно, вы увидите следующий выход:

```bash
Contract deployed to address: 0x{YOUR_CONTRACT_ADDRESS}
```

Обратите внимание, что на шаге минтинга вам потребуется напечатанный адрес контракта. Вы можете скопировать и вставить его в отдельный текстовый файл и сохранить для последующего использования. Это необходимо для того, чтобы скрипт минтинга мог вызывать метод минтинга этого конкретного контракта.

#### Минтинг NFT в Polygon {#minting-the-nft-on-polygon}

Минтинг NFT теперь заключается просто в вызове контракта, который мы только что развернули в Polygon. Создайте новый файл с именем `mint-nft.mjs` в каталоге `scripts` и скопируйте в него код, приведенный ниже:

```bash
const CONTRACT_ADDRESS = "0x00"
const META_DATA_URL = "ipfs://XX"

async function mintNFT(contractAddress, metaDataURL) {
   const ExampleNFT = await ethers.getContractFactory("ExampleNFT")
   const [owner] = await ethers.getSigners()
   await ExampleNFT.attach(contractAddress).mintNFT(owner.address, metaDataURL)
   console.log("NFT minted to: ", owner.address)
}

mintNFT(CONTRACT_ADDRESS, META_DATA_URL)
   .then(() => process.exit(0))
   .catch((error) => {
       console.error(error);
       process.exit(1);
   });
```

Отредактируйте первые две строки, чтобы вставить ваш **адрес контракта** из совершенного ранее развертывания и **URL-адрес метаданных**, который был возвращен при сохранении актива в NFT.Storage. Остальная часть скрипта настраивает вызов вашего смарт-контракта так, что вы остаетесь владельцем NFT и указателя на метаданные, сохраненные с IPFS.

Затем запустите скрипт:

```bash
npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
```

Вы можете ожидать следующий вывод:

```bash
NFT minted to: 0x<YOUR_WALLET_ADDRESS>
```

Ищете образец кода из этого руководства? Вы можете найти его по [ссылке](https://github.com/itsPiyushMaheshwari/Polygon-nft.storage-demo) polygon-nft.storage-demo в репозитории Github.

## Заключение {#conclusion}

В этом руководстве мы научились полностью выполнять процедуру минтинга NFT с помощью Polygon и NFT.Storage. Это сочетание технологий обеспечивает надлежащую децентрализацию и гарантирует *масштабируемость*, *долговечность* и *неизменяемость*.

Мы развернули пользовательский смарт-контракт для минтинга нашего NFT в соответствии с нашими потребностями. Для этого руководства мы использовали простой пример на базе стандарта ERC-721. Однако вы также можете определить сложную логику, которая регулирует ваш жизненный цикл NFT. Для более сложных сценариев стоит начать со стандарта-преемника [ERC-1155](https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/). Библиотека OpenZeppelin, которую мы используем в нашем руководстве, предлагает [мастер контрактов](https://docs.openzeppelin.com/contracts/4.x/wizard), помогающий создавать контракты NFT.

Успешный минтинг можно рассматривать как начало этапа полезного использования NFT. Затем NFT можно использовать для подтверждения владения и передавать другим пользователям. Причиной для трансфера NFT может быть успешная продажа на одном из маркетплейсов NFT, таких как [OpenSea](https://opensea.io), или другое событие, такое как приобретение предмета в игре на базе NFT. Изучение богатых возможностей NFT определенно является полезным следующим шагом.

Если вам нужна помощь в создании вашего проекта NFT с помощью NFT.storage, мы рекомендуем вам присоединиться к `#nft-storage`каналу в D[iscord ](https://discord.gg/Z4H6tdECb9)и S[lack.](https://filecoinproject.slack.com/archives/C021JJRH26B)
