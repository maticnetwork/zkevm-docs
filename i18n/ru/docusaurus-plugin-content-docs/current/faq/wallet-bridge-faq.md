---
id: wallet-bridge-faq
title: <>Вопросы и ответы
description: Создайте свое следующее блокчейн-приложение на Polygon.
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Где я могу использовать Web Wallet? {#where-can-i-use-the-polygon-web-wallet}
Вот URL-адрес кошелька Polygon: https://wallet.polygon.technology/ Suite Polygon — это коллекция приложений Web3, предоставляемых Polygon. Он состоит из [кошелька Polygon](https://wallet.polygon.technology/polygon/assets) (децентрализованный кошелек), [Polygon Bridge](https://wallet.polygon.technology/polygon/bridge/deposit) (мост L1-L2), [Polygon Staking](https://staking.polygon.technology/) (среда для стейкинга и делегирования токенов MATIC) и [Polygon Safe Bridge](https://safe-bridge.polygon.technology/safe) (мост с несколькими сигами).

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## Какие кошельки поддерживаются в настоящее время? {#which-wallets-are-currently-supported}

Metamask, Coinbase, Bitski Wallet, Venly и WalletConnect являются поддерживаемыми в настоящее время.

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## Что я могу сделать со своим кошельком Polygon? {#what-can-i-do-with-my-polygon-wallet}

- Отправить средства на любой аккаунт в Polygon.
- Внести средства из Ethereum в Polygon (используя мост).
- Вывести средства обратно в Ethereum из Polygon (также с помощью моста).

## Мой кошелек MetaMask не подключается к кошельку Polygon {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

Есть много причин, почему это может происходить. Мы рекомендуем попробовать **другой раз**, **использовать другой браузер** или, если любой из них не поможет, **[свяжитесь с нашей службой поддержки](https://support.polygon.technology/support/home)**.

## Как я могу внести средства из Ethereum в Polygon с помощью пакета кошелька Polygon. {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
Пожалуйста, смотрите видео ниже или следуйте [этому учебнику](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>Ваш браузер не поддерживает этот видеоэлемент.</p>
</video>

## Как я могу вывести средства из Polygon в Ethereum через PoS Bridge с помощью Polygon Wallet? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
Пожалуйста, смотрите видео ниже или следуйте [этому учебнику](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>Ваш браузер не поддерживает этот видеоэлемент.</p>
</video>

## Как я могу вывести средства из Polygon в Ethereum через Plasma Bridge с помощью Polygon Wallet Suite? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
Пожалуйста, смотрите видео ниже или следуйте [этому учебнику](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>Ваш браузер не поддерживает этот видеоэлемент.</p>
</video>

## Как добавить новый или пользовательский токен в список токена кошелька Polygon? {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
Пожалуйста, следуйте [этому учебнику.](/docs/faq/adding-a-custom-token)

## Как найти контракт токена? {#how-do-i-find-the-token-contract}

Адрес контракта токена будет необходим, когда вы пытаетесь добавить новый или пользовательский токен. Поиск токена можно по его названию в Coingecko или CoinMarketCap где вы сможете увидеть его адрес в цепочке Ethereum (для токенов ERC20) и других поддерживаемых блокчейнах, таких как Polygon. Адрес токена в других цепях может не обновляться, но вы можете с уверенностью использовать корневой адрес контракта для всех целей.

## Я внес свои средства, но я не вижу его в Metamask. Что мне делать? {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

Вам необходимо вручную добавить пользовательский адрес токена в Metamask.

Откройте Metamask, прокрутите вниз и выберите **Импорт токенов**.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

Затем добавить соответствующий адрес контракта, символ и точность десяти. Адреса контрактов (в данном случае PoS-WETH) можно найти по этой ссылке: [https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/](https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/). Вам нужно будет добавить адрес дочернего токена для просмотра балансов в Polygon Mainnet. Десятичная точность 18 для WETH (для большинства токенов десятичная точность 18).

## Как я могу добавить Polygon Mainnet в Metamask? {#how-can-i-add-polygon-mainnet-on-metamask}

Проверьте [этот учебник](/docs/develop/metamask/config-polygon-on-metamask).

## Мой токен не отображается в списке. К кому мне обратиться? {#my-token-is-not-visible-in-the-list-who-should-i-contact}

Свяжитесь с командой Polygon в Discord или Telegram и добавьте свой токен в список. Перед этим убедитесь, что ваш токен сопоставлен. Если он не отображается, пожалуйста, поднимите запрос на [https://mapper.polygon.technology/](https://mapper.polygon.technology/)

## Могу ли я отменить транзакцию после того, как пришел checkpoint? {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
После того, как транзакция вывода будет инициирована в Polygon Mainnet, то, к сожалению, она не может быть отменена или возвращена. В транзакциях вывода токены сжигаются из Polygon Mainnet и заведены в Ethereum Mainnet. Поэтому токены, которые после того, как будут burned из цепочки Polygon, нельзя вернуть обратно в ваш кошелек.

## Комиссия за газ слишком высока, могу ли я отменить транзакцию? {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

К сожалению, мы не можем отменить транзакцию вывода после того, как токены будут сожжены из Polygon Mainnet. Другими словами, невозможно отменить транзакцию, как только она инициируется. Комиссия за газ не контролируется Polygon. Он полностью зависит от загруженности сети и количества транзакций в конкретном блоке в Ethereum Mainnet. Если вы думаете, что не можете позволить себе текущий гонорар газа, вы можете подождать и попытаться продолжить транзакцию позже, когда плата за газ находится в нижней стороне. Вы также можете контролировать плату за газ в Ethereum Mainnet отсюда: https://etherscan.io/gastracker


## Могу ли я отправить свои токены из Polygon на любой другой кошелек или биржу ? {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

Нельзя напрямую отправлять токены из Polygon UI на биржи/кошельки. Вы должны сначала вывести средства из Polygon в Ethereum, а затем отправить их на свой адрес биржи (если только ваша биржа или кошелек явно не поддерживает сеть).

## Я допустил ошибку отправки средств на биржу/кошелек. Вы можете помочь? {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

К сожалению, мы не можем помочь в таких случаях. Пожалуйста, не отправляйте средства напрямую на биржи, которые поддерживают только Ethereum, вы должны сначала вывести средства с Polygon на Ethereum, а затем отправить их на свой адрес биржи.

## Я сделал перевод не на тот адрес. Как вернуть средства? {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

К сожалению, сделать ничего нельзя. Только владелец приватных ключей на этот конкретный адрес может перенести эти активы. Всегда желательно подтвердить, правильный ли адрес вы отправляете токены.

## Моя транзакция слишком долго ожидается, что я могу сделать? {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
Операция может быть снята по следующим причинам:

1. Настройка низкой цены при отправке транзакции.
2. Резкий рост цены на газ из-за заторов в Ethereum Mainnet.
3. Транзакция отменяется вами с вашего кошелька или заменяется новой транзакцией.

Перейти к удаленным транзакциям можно следующим образом:

1. Если ваша транзакция застряла более часа, будет отображаться кнопка **Try Again**. Чтобы завершить ту же транзакцию, можно нажать на кнопку **Try Again**. Вы можете обратиться к этому видео для получения дополнительной информации о том, как использовать функцию **Try Again**.
2. Пожалуйста, проверьте ваш кошелек MetaMask, так как иногда транзакции могут быть сняты из-за транзакций в режиме очереди. В этом случае очистите транзакции в очереди или переустановите MetaMask в том же браузере.
3. Вы можете установить MetaMask в альтернативном браузере, а затем попытаться завершить транзакцию с помощью Polygon Wallet Suite.
4. Эту ссылку можно также использовать для завершения транзакции вывода. Вставьте хэш транзакции в параметре поиска и нажмите кнопку **Confirm Exit**, чтобы завершить транзакцию.

## Что делать, если депозит подтвержден, но баланс не обновляется? {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

Чтобы транзакция пополнения, требуется 22-30 минут. Пожалуйста, подождите некоторое время и нажмите на **Refresh Balance**.

## Что делать, если чекпоинт не проходит? {#what-should-i-do-if-the-checkpoint-is-not-happening}

Checkpoint иногда занимает более 45 минут до 1 часа в зависимости от заторов сети в Ethereum.

## Моя транзакция зависла. {#my-transaction-is-stuck}

Мы перечислили некоторые общие ошибки, с которыми могут столкнуться пользователи. См. решение под картинкой с ошибкой. Если у вас отображается другая ошибка, пожалуйста, [отправьте заявку в службу поддержки](https://support.polygon.technology/support/home), чтобы наша команда устранила неполадку.

  - ### Распространенные ошибки {#common-errors}
a. Процесс вывода средств завис на этапе инициализации.

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

  b. Ошибка RPC

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>   

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/develop/network-details/network#matic-mainnet) for more information.

  c.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

  Это периодически возникающая ошибка, которая устраняется автоматически. Если вы по-прежнему получаете ту же ошибку при повторном запуске шага, создайте [заявку в службу поддержки](https://support.polygon.technology/) со всей сопутствующей информацией для дальнейшего устранения этой проблемы.


## У меня отображается ошибка недостаточного баланса. {#i-m-shown-an-insufficient-balance-error}

Вывод и внесение средств в сети Polygon дешевы. Ошибка недостаточного баланса может быть устранена путем пополнения баланса ETH в ethereum mainnet. Это в целом устраняет проблему недостаточного баланса. Если это транзакция в Polygon Mainnet, мы потребуем, чтобы у вас было достаточное количество токенов MATIC.

## Мои транзакции не видны в обозревателе. Что мне делать? {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

Вероятно, это проблема индексации Polygonscan. Для получения дополнительных разъяснений свяжитесь с [Группой](https://support.polygon.technology/support/home) поддержки.

## Я инициировал депозит на Ethereum, но он все еще находится на рассмотрении. Что мне делать? {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

Возможно, вы установили слишком низкий уровень газа. Вы должны подождать некоторое время и повторить транзакцию, если она не будет обработана майнерами. Если вам нужна дополнительная помощь, обратитесь в [службу поддержки](https://support.polygon.technology/support/home), предоставив адрес своего кошелька, хэши транзакций (если есть) и соответствующие скриншоты.

## Я не получаю хэш транзакции и мои депозиты не проходят? Что происходит? {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

Вероятно, у вас уже есть незавершенные транзакции. Сначала отмените или ускорьте их. Транзакции в Ethereum могут совершаться только одна за другой.

## Это показывает, что Polygon не взимает никакой суммы за вывод средств, но мы должны платить во время транзакции. {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

Транзакция вывода средств с моста Plasma разделена на 3 этапа: первый выполняется в основной сети Polygon, а два последующих — в основной сети Ethereum. На мосту PoS транзакция снятия средств происходит в два этапа: сжигание токена в сети Polygon и отправка подтверждения в сеть Ethereum. В любом случае сжигание токенов в основной сети Polygon будет стоить очень мало. Остальные шаги, которые происходят в основной сети Ethereum, должны быть оплачены в ETH в зависимости от текущей цены газа, которую можно проверить [здесь](https://ethgasstation.info/).

## Я пытался внести депозит, но транзакция остановилась на этапе подтверждения. {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

Если транзакция находится на этапе **подтверждения**, она еще не завершена. Чтобы завершить ее, нужно оплатить стоимость газа и тогда она должна пройти.

## Кошелек Polygon показывает сообщение об ошибке «Пользователь отказался от подписи транзакции». {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

Обычно это происходит из-за того, что пользователь отменил или отказался подписывать транзакцию через MetaMask. Когда запрос был вызван кошельком MetaMask, перейдите к подписанию транзакции, нажав на **кнопку** Утвердить, а не на **Cancel**.

## Сделка успешна, но она показывает ожидание. {#the-transaction-is-successful-but-it-shows-pending}

Если транзакция завершена, и вы получили свои средства, но транзакция все еще отображается на интерфейсе, вы можете поднять билет поддержки, отправив соответствующие данные и скриншоты.

## Какой список поддерживаемых бирж в Polygon? {#what-is-the-list-of-supported-exchanges-on-polygon}

Монета MATIC может быть продана на многих биржах. Однако всегда важно проводить свои собственные исследования, когда вы выбираете один для торговли. Нередко некоторые биржи продолжают вносить изменения в свои текущие доступные токены, а также имеют периоды обслуживания.

Вы можете посетить [Coinmarketcap]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) для списка бирж, где вы можете найти MATIC.

## Поддерживает ли Polygon аппаратные кошельки? {#does-polygon-support-hardware-wallets}

Да, мы поддерживаем следующие аппаратные кошельки:
1. Trezor
2. Ledger

Пользователи могут подключить свой вариант кошелька в MetaMask и приступить к транзакции. Вот ссылка для подключения аппаратного кошелька в Metamask: https://metamask.zendesk.com/hc/en-us/articles/4408552261275

## Почему токен MATIC не поддерживается в PoS? {#why-isn-t-the-matic-token-supported-on-pos}

MATIC является нативным токеном Polygon и имеет адрес контракта 0x0000000000000000000000000000000000001010 в сети Polygon. Он также используется для оплаты газа. Сопоставление токена MATIC с мостом PoS приведет к тому, что у MATIC будет дополнительный адрес контракта в сети Polygon. Это будет конфликтовать с существующим адресом контракта, так как этот новый адрес токена не сможет использоваться для оплаты газа и будет существовать в качестве адреса обычного токена ERC20 в сети Polygon. Поэтому, чтобы избежать этой путаницы, мы решили сохранить MATIC только на Plasma.

## Как выполнить сопоставление токенов? {#how-do-i-map-tokens}

Пожалуйста, обратитесь к [этому учебнику] (/docs/develop/ethereum-polygon/submit-mapping-request) или вы можете перейти прямо в [Mapper Token](https://mapper.polygon.technology/).

## Что делать, если транзакция занимает слишком много времени или если цена на газ слишком высока? {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

Время транзакции и цена на газ варьируются в зависимости от заторов сети, а также определяется предложением и спросом между майнерами сети.

Что вы могли бы сделать:
- Будьте терпеливы.
- Увеличить плату за газ, если он слишком медленный.
- Проверьте комиссии перед отправкой транзакций. Вот ссылка для газового трекера Etherscan: https://etherscan.io/gastracker

Чего не следует делать:
- Пожалуйста, не устанавливайте лимит газа или ваша транзакция может выйти из строя.
- Не пытайтесь отменить транзакцию. Проверьте тарифы заранее.


## Могу ли я изменить лимит газа или цену за газ? {#can-i-change-the-gas-limit-or-the-gas-price}

Лимит оценивается и устанавливается заявкой в соответствии с некоторыми требованиями функции, вызываемой в контракте. Это нельзя изменить. Чтобы увеличить или уменьшить транзакционные комиссии можно изменить только цену.

## Как ускорить транзакции? {#how-to-speed-up-the-transactions}
Вы можете сделать это, увеличив плату за газ. Вот ссылка, объясняя, как это сделать в Metamask: https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-Speed-Up-or-Cancel-a-Pending-Transaction.

## Сколько токена MATIC достаточно для гонорара газа? {#how-much-matic-token-is-enough-for-the-gas-fee}
Пользователи должны иметь минимум 0,01 MATIC в сети Polygon.

## Где я могу создать заявку в службу поддержки? {#where-do-i-raise-a-support-ticket}
Если вам нужна помощь наших специалистов, отправьте нам сообщение по адресу https://support.polygon.technology/support/home.

## Как перемещать активы между сетями? {#how-do-i-bridge-assets-across-chains}

Polygon предлагает мост для перемещения активов из Ethereum в Polygon и наоборот. Подробнее об этом можно узнать в разделе [Bridges]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started)) этого wiki.

Однако, если вы используете любой внешний сервис, не принадлежащий Polygon, мы советуем вам обратиться в их службу клиентов, чтобы запросить уроки и инструкции. Важно также провести собственные исследования, когда вы используете услуги web3.

## У меня проблема с выводом токенов в OpenSea или в любое другое приложение, использующее мост Polygon. {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

Если у вас возникли проблемы с вашей транзакцией вывода, Polygon предлагает вывести мост с [stuck,](https://withdraw.polygon.technology) чтобы помочь вам вывести с земли, если у вас есть хэш на горе. С помощью этого инструмента вы быстро освоитесь, и проблема будет решена. Другие вопросы, касающиеся вашей транзакции с OpenSea и другими dApps, должны будут быть обработаны командой приложений.

## Меня обманули. Как вернуть токены? {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

К сожалению, нет возможности восстановить утерянные монеты. Мы просим вас перед тем, как совершить транзакцию, вы переходите на проверку и двойную проверку, прежде чем начать ее и завершить. Обратите внимание, что сеть Polygon и наши официальные ручки не участвуют в каких-либо постов в раздаче или удвоении токенов, и мы никогда не будем обращаться к вам от имени организации. Пожалуйста, не обращайте внимания на подобные попытки, так как они, скорее всего, мошеннические. Все наши сообщения проходят через наши официальные ручки.

## В моем кошельке есть несколько несанкционированных транзакций. Мой кошелек взломан? {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

К сожалению, в сети невозможно отменить нежелательные транзакции.
Важно всегда быть осторожным со своими приватными ключами и **никогда не сообщать их никому**.
Если у вас еще остались средства, немедленно переведите их на новый кошелек.

## Ethereum имеет Goerli в качестве своей тестовой сети. Имеет ли сеть Polygon тоже? {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

Поскольку сеть Ethereum имеет Goerli в качестве своей тестовой сети, в Polygon Mainnet есть Mumbai. Все транзакции в этой тестовой сети будут индексироваться в обозревателе Mumbai Explorer.

## Как я могу обменять мои токены для других токенов? {#how-can-i-swap-my-tokens-for-other-tokens}
Пожалуйста, смотрите видео ниже или следуйте [этому учебнику](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>Ваш браузер не поддерживает этот видеоэлемент.</p>
</video>

## Обмен токенов слишком медленный. {#the-token-swap-is-too-slow}

Если вы пытаетесь поменять токены и это занимает слишком много времени, вы можете попробовать ту же транзакцию в другом браузере. Если это не помогает и ошибка повторяется, отправьте снимок экрана в нашу службу поддержки.

## Какие токены взимаются в качестве платы за газ за обмен токена? {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
Только MATIC.

## Как я могу заменить мой токен для газа? {#how-can-i-swap-my-token-for-gas}
Пожалуйста, смотрите видео ниже или следуйте [этому учебнику](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>Ваш браузер не поддерживает этот видеоэлемент.</p>
</video>

## Какие токены можно использовать для замены газа? {#which-tokens-can-be-used-to-swap-for-gas}
Только эти токены поддерживаются для ‘Swap for Gas»: ETH, USDC, USDT, DAI, AAVE, LINK, WBTC, UNI, GHST, TEL, EMON и COMBO.

## Как получить токены ETH? {#how-to-get-eth-tokens}
Чтобы получить токены ETH, вы можете либо торговать им на другой токен или фиатные деньги на бирже, купить их в on-ramp (или на Metamask) или даже заменить другие токены для ETH с помощью [функции обмена токена Polygon](https://wallet.polygon.technology/polygon/token-swap).

## Как я могу получить токены MATIC для оплаты газа? {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

Мы предоставляем услугу [Gas Swap](https://wallet.polygon.technology/gas-swap/), которая поможет вам с этим. Вы выбираете количество токенов MATIC, необходимое для завершения транзакции, и можете обменять их на другие токены, такие, как Ether или USDT. Обратите внимание, что это **транзакция без газа**.

## Где я могу получить токены MATIC напрямую? {#where-can-i-get-matic-tokens-directly}

Таким образом, токены MATIC можно купить с любого централизованного ([Binance](https://www.binance.com/en), [Coinbase](https://www.coinbase.com/), et.al) или децентрализованного ([Uniswap](https://uniswap.org/), [QuickSwap](https://quickswap.exchange/#/swap)). Вы также можете исследовать и попробовать некоторые on-ramps такие как [Transak](https://transak.com/) и [Ramp](https://ramp.network/). Цель покупки монет MATIC также должна определять, где вы будете их покупать и в какой сети. Желательно иметь MATIC в Ethereum, если ваше намерение либо стейкинга, либо делегировать. Если ваш намерение является транзакцией в Polygon Mainnet, вы должны держать и выполнять транзакции с MATIC в Polygon Mainnet.





