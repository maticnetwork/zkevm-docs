---
id: wallet-bridge-faq
title: Wallet <>Bridge FAQ
description: Erstelle deine nächste Blockchain-App auf Polygon.
keywords:
  - docs
  - matic
  - polygon
  - wiki
  - wallet
image: https://wiki.polygon.technology/img/polygon-wiki.png
---
import useBaseUrl from '@docusaurus/useBaseUrl';

## Wo kann ich das Polygon Web Wallet verwenden? {#where-can-i-use-the-polygon-web-wallet}
Hier ist die Polygon Wallet Suite URL: https://wallet.polygon.technology/ Die Polygon Wallet Suite ist eine Sammlung von Web3-Anwendungen, die von Polygon zur Verfügung gestellt werden. Es besteht aus [Polygon Wallet](https://wallet.polygon.technology/polygon/assets) (eine dezentrale Wallet), [Polygon Bridge](https://wallet.polygon.technology/polygon/bridge/deposit) (eine L1-L2-Brücke), [Polygon Staking](https://staking.polygon.technology/) (eine Umgebung zum Staking und Delegieren von MATIC Token) und [Polygon Safe Bridge](https://safe-bridge.polygon.technology/safe) (eine wallet),

<div align= "center">
  <img src={useBaseUrl("img/faq/wallet/wallet-hp.png")} />
</div>

## Welche Wallets werden derzeit unterstützt? {#which-wallets-are-currently-supported}

Metamask, Coinbase, Bitski Wallet, Venly und WalletConnect sind die derzeit unterstützten Wallets.

<div align="center">
  <img src={useBaseUrl("img/faq/wallet/supported-wallets.png")} width="400" />
</div>

## Was kann ich mit meiner Polygon-Wallet tun? {#what-can-i-do-with-my-polygon-wallet}

- Überweise Geldmittel auf ein beliebiges Polygon-Konto.
- Zahle Geld von Ethereum in Polygon ein (über die Bridge).
- Zahle Geldmittel von Polygon zurück nach Ethereum aus (auch über die Bridge).

## Meine MetaMask-Wallet verbindet sich nicht mit der Polygon-Wallet. {#my-metamask-wallet-is-not-connecting-with-polygon-wallet}

Dafür kann es viele Gründe geben. Wir empfehlen, dass du **ein anderes Mal testen**, **einen anderen Browser** verwende oder, wenn einer von diesen nicht hilft, **[unser Support-Team kontaktieren](https://support.polygon.technology/support/home)**.

## Wie kann ich Fonds von Ethereum an Polygon mit der Polygon Wallet Suite einzahlen. {#how-can-i-deposit-funds-from-ethereum-to-polygon-using-polygon-wallet-suite}
Bitte schau dir das Video an oder folge [diesem Tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#depositing-funds-from-ethereum-to-polygon).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/deposit/deposit-polygon-wallet.mp4"></source>
  <p>Ihr Browser unterstützt das Video-Element nicht.</p>
</video>

## Wie kann ich Geld von Polygon an Ethereum über PoS Bridge mit der Polygon Wallet Suite abheben? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-pos-bridge-using-polygon-wallet-suite}
Bitte schau dir das Video an oder folge [diesem Tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-pos-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/pos/withdraw-polygon-wallet.mp4"></source>
  <p>Ihr Browser unterstützt das Video-Element nicht.</p>
</video>

## Wie kann ich Geld von Polygon an Ethereum über Plasma Bridge über die Polygon Wallet Suite abheben? {#how-can-i-withdraw-funds-from-polygon-to-ethereum-via-plasma-bridge-using-polygon-wallet-suite}
Bitte schau dir das Video an oder folge [diesem Tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#withdrawing-funds-from-polygon-back-to-ethereum-on-plasma-bridge).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/plasma/withdraw-plasma-v3.mov"></source>
  <p>Ihr Browser unterstützt das Video-Element nicht.</p>
</video>

## Wie füge ich einen neuen oder benutzerdefinierten Token zur Polygon Wallet Token-Liste hinzu? {#how-to-add-a-new-or-custom-token-to-polygon-wallet-token-list}
Bitte folge [diesem Tutorial.](/docs/faq/adding-a-custom-token)

## Wie finde ich den Token-Contract? {#how-do-i-find-the-token-contract}

Die Vertragsadresse wird benötigt, wenn du einen neuen oder benutzerdefinierten Token hinzuzufügen. Du kannst den Token nach seinem Namen auf Coingecko oder CoinMarketCap suchen, wo du seine Adresse auf der Ethereum-Chain (für ERC20-Token) und anderen unterstützten Blockchains wie Polygon sehen kannst. Die Token-Adresse auf anderen Chains wurde möglicherweise nicht aktualisiert, doch kannst du die Root für alle Zwecke verwenden.

## Ich habe meine Mittel hinterlegt, aber ich sehe es nicht auf Metamask. Was kann ich tun? {#i-have-deposited-my-funds-but-i-don-t-see-it-on-metamask-what-do-i-do}

Du musst die benutzerdefinierte Token-Adresse manuell zu add

Öffne Metamask, scrolle nach unten und klicke auf **Token importieren**.

<div align="center">
<img src={useBaseUrl("img/wallet-bridge/wallet-faq-3.png")} width="400" />
</div>

Füge dann die relevante Vertragsadresse, das Symbol und die decimal hinzu. Contract-Adressen (in diesem Fall PoS-WETH) findest du unter folgendem Link: [https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/](https://docs.polygon.technology/docs/develop/network-details/mapped-tokens/). Du musst die Adresse des untergeordneten Tokens hinzufügen, um die Saldos auf Polygon Mainnet anzuzeigen. Das Dezimal der Präzision ist 18 für WETH (für die meisten Token ist das Dezimal der Präzision 18).

## Wie füge ich Polygon Mainnet auf Metamask? {#how-can-i-add-polygon-mainnet-on-metamask}

Überprüfe [dieses Tutorial](/docs/develop/metamask/config-polygon-on-metamask).

## Mein Token wird in der Liste nicht angezeigt. An wen soll ich mich wenden? {#my-token-is-not-visible-in-the-list-who-should-i-contact}

Melde dich beim Polygon-Team auf Discord oder Telegram und bitte um die Auflistung deines Tokens. Stelle vorher sicher, dass dein Token zugeordnet ist. Wenn es nicht zugewiesen wird, raise bitte eine Anfrage unter [https://mapper.polygon.technology/](https://mapper.polygon.technology/) an.

## Kann ich meine Transaktion kündigen, nachdem der Checkpoint eingetroffen ist? {#can-i-cancel-my-transaction-after-the-checkpoint-arrived}
Sobald die Auszahlungstransaktion auf dem Polygon Mainnet initiiert ist, kann sie leider nicht storniert oder canceled werden. Bei withdrawal werden Token aus dem Polygon Mainnet verbrannt und auf dem Ethereum Mainnet angezeigt. Daher können Token, die einmal von der Polygon Chain verbrannt wurden, nicht auf deine Brieftasche zurückgeschickt werden.

## Die Gasgebühr ist zu hoch, kann ich meine Transaktion stornieren? {#the-gas-fee-is-too-high-can-i-cancel-my-transaction}

Leider können wir die Auszahlungstransaktion nicht stornieren, sobald Token aus dem Polygon Mainnet verbrannt werden. Mit anderen Worten, es ist unmöglich, eine Transaktion zu stornieren, sobald sie gestartet wird. Die Gasgebühr wird nicht von dem Polygon kontrolliert. Es ist völlig abhängig von der Netzwerküberlastung und der Anzahl der Transaktionen in einem bestimmten Block auf dem Ethereum Mainnet. Wenn du denkst, du kannst dir die aktuelle Gasgebühr nicht leisten, kannst du warten, und versuchen, deine Transaktion später fortzufahren, wenn die Gasgebühr auf der unteren Seite ist. Du kannst die Gasgebühr auf dem Ethereum Mainnet auch von hier überwachen: https://etherscan.io/gastracker


## Kann ich meine Token von Polygon an eine andere Wallet/Börse senden? {#can-i-send-my-tokens-from-polygon-to-any-other-wallet-exchange}

Du kannst Token von Polygon UI nicht direkt an Exchange / Wallets senden. Du musst die Geldmittel zuerst von Polygon nach Ethereum auszahlen und sie dann an deine Börsenadresse senden (es sei denn, deine Börse/Wallet unterstützt das Netzwerk ausdrücklich).

## Ich habe den Fehler gemacht, Geld direkt an eine Börse/Wallet zu senden. Können Sie mir helfen? {#i-made-the-mistake-of-sending-funds-to-an-exchange-wallet-directly-can-you-help}

Leider können wir in solchen Fällen nicht helfen. Bitte sende keine Geldmittel direkt an Börsen, die nur Ethereum unterstützen. Du musst die Geldmittel zuerst von Polygon nach Ethereum auszahlen und sie dann an deine Börsenadresse senden.

## Ich habe eine Überweisung an die falsche Adresse getätigt. Wie bekomme ich die Geldmittel zurück? {#i-made-a-transfer-to-the-wrong-address-how-do-i-retrieve-the-funds}

Leider kann nichts getan werden. Nur der Inhaber der privaten Schlüssel an diese bestimmte Adresse kann diese Assets verschieben. Es ist immer ratsam, zu bestätigen, ob die Adresse, an die du Token sendest, die richtige ist.

## Meine Transaktion hat sich zu lange anhängig gemacht, was kann ich tun? {#my-transaction-has-been-pending-for-too-long-what-can-i-do}
Die Transaktion kann aus den folgenden Gründen abgesetzt werden:

1. Richte einen niedrigen Gaspreis ein, während du die Transaktion einsendest.
2. Ein plötzlicher Anstieg des Gaspreises aufgrund von Staus auf dem Ethereum Mainnet.
3. Die Transaktion wird von dir von deiner Wallet abgesagt oder durch eine neue Transaktion ersetzt.

Du kannst mit den abgelegten Transaktionen auf folgende Weise fortfahren:

1. Wenn deine Transaktion länger als eine Stunde lang stecken bleibt, wird eine **Schaltfläche Versuchen** angezeigt. Du kannst auf den **Button „Erneut** versuchen“ klicken, um die gleiche Transaktion abzuschließen. Du kannst in diesem Video verweisen, um weitere Informationen darüber zu erhalten, wie du die Funktion **Try Again** verwenden kannst.
2. Bitte überprüfe deine MetaMask Wallet auch, da Transaktionen aufgrund von queued-up in der Metamask. fallen gelassen werden können. In diesem Fall die queued-up löschen oder die MetaMask im selben Browser erneut installieren.
3. Du kannst die MetaMask in einem anderen Browser installieren und dann versuchen, die Transaktion mit der Polygon Wallet Suite abzuschließen.
4. Du kannst diesen Link auch verwenden, um die ausstehende Auszahlungstransaktion abzuschließen. Füge den transaction in der Suchoption ein und klicke auf den **Button Beenden** bestätigen, um die Transaktion abzuschließen.

## Was kann ich tun, wenn die Einzahlung bestätigt wurde, aber der Saldo nicht aktualisiert wird? {#what-do-i-do-if-the-deposit-is-confirmed-but-the-balance-is-not-getting-updated}

Es dauert 22-30 Minuten, bis die Einzahlungstransaktion abgeschlossen ist. Bitte warte eine Zeit und klicke auf **"Balance aktualisieren"**.

## Was soll ich tun, wenn der Checkpoint nicht stattfindet? {#what-should-i-do-if-the-checkpoint-is-not-happening}

Checkpoints dauern manchmal mehr als 45 Minuten bis 1 Stunde basierend auf der Netzwerküberlastung auf Ethereum, wir empfehlen, eine Weile zu warten, bevor du ein Ticket erhälst.

## Meine Transaktion ist hängen geblieben. {#my-transaction-is-stuck}

Wir haben einige häufige Fehler aufgeführt, die Benutzer konfrontiert sind. Die Lösung findest du unter dem Bild des Fehlers. Falls du eine andere Fehlermeldung erhältst, [erstelle bitte ein Support-Ticket](https://support.polygon.technology/support/home), damit unser Team die Fehlerbehebung durchführen kann.

  - ### Häufige Fehler {#common-errors}
a. Die Abhebung ist in der Phase „Initialisiert“ hängen geblieben.

    <img src={useBaseUrl("img/wallet-bridge/plasma-progress-stuck.png")} width="357" height="800"/>

    This normally occurs when the transaction gets replaced and the wallet web application is not able to detect the replaced transaction hash. Please follow the instructions on [https://withdraw.polygon.technology/](https://withdraw.polygon.technology/) and complete your withdrawal.

  b. RPC-Fehler

    <img src={useBaseUrl("img/wallet-bridge/checkpoint-rpc-error.png")} width="357" height="600"/>   

    The current RPC error you're facing might be due to an RPC overload.

    Please try changing your RPC and proceed with the transaction. You may follow this link [here](https://docs.polygon.technology/docs/develop/network-details/network#matic-mainnet) for more information.

  c.

  <img src={useBaseUrl("img/wallet-bridge/checkpoint-stumbled-error.png")} width="357" height="600"/>

  Dies ist normalerweise ein Ein-/Ausschaltfehler, der automatisch behoben wird. Falls du beim erneuten Einleiten des Schritts immer noch die gleiche Fehlermeldung erhältst, [erstelle ein Support-Ticket](https://support.polygon.technology/) mit allen relevanten Informationen für die weitere Fehlerbehebung.


## Mir wird die Fehlermeldung angezeigt, dass der Saldo unzureichend ist. {#i-m-shown-an-insufficient-balance-error}

Abhebungen und Einzahlungen im Polygon-Netzwerk sind günstig. Die Fehlermeldung, dass der Saldo unzureichend ist, kann durch die Beschaffung von ETH-Guthaben im Ethereum Mainnet behoben werden. Das löst das Problem einer unzureichenden Balance aus. Wenn dies eine Transaktion auf dem Polygon Mainnet ist, werden wir verlangen, dass du über eine ausreichende Menge an MATIC-Token verfügst.

## Meine Transaktionen sind im Explorer nicht sichtbar. Was soll ich tun? {#my-transactions-are-not-visible-on-the-explorer-what-should-i-do}

Dies ist wahrscheinlich ein Indexierungsproblem bei Polygonscan. Bitte kontaktiere das [Support-Team](https://support.polygon.technology/support/home) für weitere Klarstellungen.

## Ich habe eine Einzahlung auf Ethereum getätigt, aber sie wird immer noch als ausstehend angezeigt. Was soll ich tun? {#i-initiated-a-deposit-on-ethereum-but-it-still-shows-as-pending-what-should-i-do}

Dein Gasvorrat ist wahrscheinlich zu gering. Du solltest eine Weile warten und die Transaktion wiederholen, wenn sie nicht gemint wird. Falls du weitere Hilfe benötigst, wende dich bitte mit deiner Wallet-Adresse, den Transaktions-Hashes (falls vorhanden) und relevanten Screenshots an das [Support-Team](https://support.polygon.technology/support/home).

## Ich erhalte keinen Transaktions-Hash und meine Einzahlungen werden nicht ausgeführt? Was ist passiert? {#i-m-not-getting-a-transaction-hash-and-my-deposits-aren-t-going-through-what-is-happening}

Wahrscheinlich hast du frühere ausstehende Transaktionen. Bitte storniere oder beschleunige sie zuerst. Transaktionen in Ethereum können nur nacheinander stattfinden.

## Es zeigt, dass Polygon keinen Betrag für eine Abhebung berechnet, aber wir sollen während der Transaktion bezahlen. {#it-shows-polygon-does-not-charge-any-amount-for-a-withdrawal-but-we-are-to-pay-during-the-transaction}

Eine Abhebungstransaktion mit der Plasma-Bridge wird in 3 Schritte aufgeteilt: Ein Schritt findet im Polygon Mainnet statt und zwei Schritte müssen im Ethereum Mainnet abgeschlossen werden. Auf der PoS-Bridge erfolgt die Abhebungstransaktion in zwei Schritten: das Verbrennen von Token im Polygon-Netzwerk und die Einreichung des Nachweises im Ethereum-Netzwerk. In jedem Fall verursacht das Verbrennen von Token im Polygon Mainnet nur sehr geringe Kosten. Die restlichen Schritte, die im Ethereum Mainnet stattfinden, müssen in ETH bezahlt werden, abhängig vom aktuellen Gaspreis, der [hier](https://ethgasstation.info/) überprüft werden kann.

## Ich habe versucht, eine Einzahlung zu tätigen, aber die Transaktion ist beim Schritt „Genehmigen“ stehen geblieben. {#i-was-trying-to-make-a-deposit-but-the-transaction-stopped-at-the-approve-step}

Wenn sich die Transaktion noch im Schritt **Genehmigen** befindet, ist sie noch nicht abgeschlossen. Um sie abzuschließen, musst du die Gasgebühr bezahlen. Dann sollte es klappen.

## Die Polygon-Wallet zeigt die Fehlermeldung „Benutzer verweigert Transaktionssignierung“ an. {#polygon-wallet-shows-user-denied-transaction-signature-error-message}

Das passiert in der Regel, weil der Benutzer eine Transaktion über MetaMask abgebrochen oder sich geweigert hat, sie zu unterschreiben. Wenn du von der MetaMask Wallet aufgefordert wird, gehe mit der Signierung der Transaktion fort, indem du auf **Genehmigen** klickst und nicht auf **Abbrechen**.

## Die Transaktion ist erfolgreich, aber sie zeigt ausstehend. {#the-transaction-is-successful-but-it-shows-pending}

Wenn deine Transaktion abgeschlossen ist und du dein Geld erhalten hast, aber die Transaktion noch bis auf der UI angezeigt, kannst du ein Support-Ticket errichten, indem du relevante Details und Screenshots sendest.

## Was ist die Liste der Supported Exchanges auf Polygon? {#what-is-the-list-of-supported-exchanges-on-polygon}

Die MATIC Münze kann in vielen Börsen gehandelt werden. Es ist jedoch immer wichtig, deine eigene Forschung zu tun, wenn du dich für einen Trade entscheidest. Es ist nicht ungewöhnlich, dass einige Börsen weiterhin Änderungen an ihren aktuellen verfügbaren Token vornehmen und auch Wartungszeiten haben.

Du kannst [Coinmarketcap]([https://coinmarketcap.com/currencies/polygon/markets/](https://coinmarketcap.com/currencies/polygon/markets/)) besuchen, um eine Liste der Börsen zu finden, in der du MATIC findest.

## Unterstützt Polygon Hardware-Wallets? {#does-polygon-support-hardware-wallets}

Ja, wir unterstützen die folgenden Hardware-Wallets:
1. Trezor
2. Ledger

Benutzer können ihre Hardware auf MetaMask verbinden und mit der Transaktion fortfahren. Hier ist der Link zum Verbinden der Hardware-Wallet auf Metamask: https://metamask.zendesk.com/hc/en-us/articles/4408552261275

## Warum wird der MATIC Token nicht auf PoS unterstützt? {#why-isn-t-the-matic-token-supported-on-pos}

MATIC ist der native Token von Polygon und hat eine Contract-Adresse – 0x0000000000000000000000000000000000001010 – auf der Polygon-Chain. Es wird auch verwendet, um für Gas zu bezahlen. Das Mapping des MATIC-Tokens auf der PoS-Bridge führt dazu, dass MATIC eine zusätzliche Contract-Adresse auf der Polygon-Chain hat. Dies wird mit der bestehenden Contract-Adresse kollidieren, da diese neue Token-Adresse nicht zur Bezahlung von Gas verwendet werden kann und als normaler ERC20-Token in der Polygon-Chain verbleiben muss. Um diese Verwirrung zu vermeiden, haben wir beschlossen, MATIC nur auf Plasma zu behalten.

## Wie ordne ich Token zu? {#how-do-i-map-tokens}

Bitte lies [dir dieses Tutorial] (/docs/develop/ethereum-polygon/submit-mapping-request) oder du kannst direkt an den [Token Mapper](https://mapper.polygon.technology/) gehen.

## Was kann ich tun, wenn die Transaktion zu lange dauert oder wenn der Gaspreis zu hoch ist? {#what-do-i-do-if-the-transaction-is-taking-too-long-or-if-the-gas-price-is-too-high}

Transaktionszeit und Gaspreis variiert je nach Netzwerküberlastung und wird auch durch Angebot und Nachfrage zwischen den Minern des Netzwerks bestimmt.

Was du tun könntest:
- Sei geduldig.
- Erhöhe die Gasgebühr, wenn sie zu langsam ist.
- Überprüfe die Gebühren vor dem Senden von Transaktionen. Hier ist ein Link für den gas von Etherscan: https://etherscan.io/gastracker

Was du nicht tun solltest:
- Bitte stelle nicht die gas niedrig fest, oder deine Transaktion kann fehlschlagen.
- Versuche nicht, die Transaktion zu stornieren. Überprüfe die Gebühren vorher.


## Kann ich das Gaslimit oder den Gaspreis ändern? {#can-i-change-the-gas-limit-or-the-gas-price}

Das Gaslimit wird von der Anwendung gemäß bestimmten Anforderungen der Funktion geschätzt und gesetzt, die im Vertrag aufgerufen wird. Dies sollte nicht bearbeitet werden. Nur der Gaspreis kann geändert werden, um die Transaktionsgebühren zu erhöhen oder zu senken.

## Wie beschleunige ich die Transaktionen? {#how-to-speed-up-the-transactions}
Du kannst dies tun, indem du die Gasgebühren erhöht. Hier ist ein Link, der erklärt, wie du es auf Metamask: machst: https://metamask.zendesk.com/hc/en-us/articles/360015489251-How-to-Speed-Up-or-Cancel-a-Pending-Transaktion.

## Wie viel MATIC Token ist für die Gasgebühr ausreichend? {#how-much-matic-token-is-enough-for-the-gas-fee}
Benutzer müssen mindestens 0,01 MATIC im Polygon mainnet haben.

## Wo kann ich ein Support-Ticket erstellen? {#where-do-i-raise-a-support-ticket}
Wenn du Hilfe von unseren Spezialisten brauchst, sende uns eine Nachricht an https://support.polygon.technology/support/home.

## Wie überbrücke ich Assets über Chains hinweg? {#how-do-i-bridge-assets-across-chains}

Polygon bietet eine Brücke zum Verschieben von Assets von Ethereum nach Polygon und umgekehrt. Mehr darüber kannst du im [Abschnitt Bridges]([https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started](https://wiki.polygon.technology/docs/develop/ethereum-polygon/getting-started)) in diesem Wiki erfahren.

Wenn du jedoch einen externen Service nutzst, der nicht im Besitz von Polygon ist, empfehlen wir dir, dich an ihren Kundendienst zu wenden, um Tutorials und Anweisungen anzufordern. Es ist auch wichtig, deine eigene Forschung zu tun, wenn du Web3-Services nutzst.

## Ich habe ein Problem mit der Tokenabhebung bei OpenSea oder einer anderen Anwendung, die eine Polygon-Bridge verwendet. {#i-have-a-token-withdrawal-issue-with-opensea-or-any-other-application-which-uses-polygon-bridge}

Wenn du ein Problem mit der Auszahlungstransaktion hast, bietet Polygon die withdraw mit [https://withdraw.polygon.technology](https://withdraw.polygon.technology) an, um dir zu helfen, dich von der Erde zu befreien, wenn du deinen https://withdraw.polygon.technology hast. Mit diesem Tool wirst du schnell an Bord geholt und das Problem wird gelöst. Andere Fragen bezüglich deiner Transaktion mit OpenSea und anderen dApps müssen vom Anwendungsteam behandelt werden.

## Ich wurde gescammt. Wie bekomme ich meine Token zurück? {#i-have-been-scammed-how-will-i-retrieve-my-tokens}

Leider gibt es für verlorene Coins keinen Wiederherstellungsprozess. Wir bitten Sie, bevor du eine Transaktion durchführst, um dich zu überprüfen und zu überprüfen, bevor du sie ausmachst. Bitte beachte, dass das Polygon Netzwerk und unsere offiziellen Handles keine Giveaway-Beiträge oder transaction, engage und wir dich niemals im Namen der Organisation annähern. Bitte ignoriere alle Versuche, da es sich höchstwahrscheinlich um Betrug handelt. Alle unsere Kommunikation erfolgt über unsere offiziellen Handles.

## Es gibt einige nicht autorisierte Transaktionen in meiner Wallet. Wurde meine Wallet gehackt? {#there-are-some-unauthorized-transactions-in-my-wallet-is-my-wallet-hacked}

Leider kann das Netzwerk unerwünschte Transaktionen nicht rückgängig machen.
Es ist immer wichtig, dass du mit deinen Private Keys vorsichtig umgehst und diese **niemals mit anderen teilst**.
Wenn du noch einige Geldmittel übrig hast, überweise sie sofort an eine neue Wallet.

## Ethereum hat Goerli als Testnetzwerk. Hat Polygon Network auch ein Testnetzwerk? {#ethereum-has-goerli-as-its-test-network-does-polygon-network-have-a-test-network-too}

Da das Ethereum Network Goerli als Testnetz hat, hat Polygon Mainnet Mumbai. Alle Transaktionen in diesem Testnetzwerk werden im Mumbai Explorer indexiert.

## Wie kann ich meine Token für andere Token tauschen? {#how-can-i-swap-my-tokens-for-other-tokens}
Bitte schau dir das Video an oder folge [diesem Tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#token-swap).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-token.mp4"></source>
  <p>Ihr Browser unterstützt das Video-Element nicht.</p>
</video>

## Der Token Swap ist zu langsam. {#the-token-swap-is-too-slow}

Wenn du versuchst, Token zu tauschen, und es zu lange dauert, kannst du dieselbe Transaktion mit einem anderen Browser versuchen. Wenn das nicht funktioniert und du eine Fehlermeldung erhältst, sende bitte einen Screenshot an unser Support-Team.

## Welche Token werden als Gasgebühren für Token-Swap berechnet? {#which-tokens-are-charged-as-the-gas-fees-for-token-swap}
Nur MATIC.

## Wie kann ich meinen Token gegen Gas tauschen? {#how-can-i-swap-my-token-for-gas}
Bitte schau dir das Video an oder folge [diesem Tutorial](/docs/develop/wallets/polygon-web-wallet/web-wallet-v3-guide.md#swap-for-gas).

<video loop autoplay width="70%" height="70%" controls="true" >
  <source type="video/mp4" src="/img/wallet/v3/swap-gas.mp4"></source>
  <p>Ihr Browser unterstützt das Video-Element nicht.</p>
</video>

## Welche Token können verwendet werden, um für Gas zu tauschen? {#which-tokens-can-be-used-to-swap-for-gas}
Nur diese Token werden für 'Swap for Gas' unterstützt: ETH, USDC, USDT, DAI, AAVE, LINK, WBTC, UNI, GHST, TEL, EMON und COMBO.

## Wie erhalte ich ETH-Token? {#how-to-get-eth-tokens}
Um ETH-Token zu erwerben, kannst du sie entweder für einen anderen Token oder Fiat-Geld an einer Börse handeln, sie auf einer on-ramp kaufen (oder auf Metamask) oder andere Token für ETH tauschen, indem du [die on-ramp von Polygon](https://wallet.polygon.technology/polygon/token-swap) verwendest.

## Wie kann ich MATIC-Token kaufen, um die Gasgebühren zu bezahlen? {#how-can-i-get-matic-tokens-to-pay-for-gas-fees}

Wir bieten einen [Gas-Swap](https://wallet.polygon.technology/gas-swap/)-Service an, der dir dabei hilft. Du wählst einen MATIC-Betrag, den du für deine Transaktion brauchst, und kannst ihn gegen andere Token wie Ether oder USDT eintauschen. Es ist erwähnenswert, dass es sich um eine **gaslose Transaktion** handelt.

## Wo kann ich MATIC-Token direkt kaufen? {#where-can-i-get-matic-tokens-directly}

MATIC-Token können also von jedem zentralisierten ([Binance](https://www.binance.com/en), [Coinbase](https://www.coinbase.com/), et.al) oder Dezentralisierten ([Uniswap](https://uniswap.org/), [QuickSwap](https://quickswap.exchange/#/swap)) Austausch gekauft werden. Du kannst auch recherchieren und versuchen, einige On-Ramps wie [Transak](https://transak.com/) und [Ramp](https://ramp.network/). Der Zweck deines Kaufs von MATIC-Coins sollte auch zu dem Ort ihres Kaufs und dem Netzwerk passen. Es ist ratsam, MATIC auf dem Ethereum Mainnet zu haben, wenn deine Absicht entweder staking oder Delegation ist. Wenn deine Absicht eine Transaktion auf dem Polygon Mainnet ist, solltest du mit MATIC auf dem Polygon Mainnet halten und transagieren.





