---
id: how-state-sync-works
title: Durum Eşitleme nasıl çalışır?
description: "Ethereum zincirinden Bor zincirine durum gönderme."
keywords:
  - docs
  - matic
  - state sync
  - working
image: https://matic.network/banners/matic-network-16x9.png
---

# Durum Eşitleme nasıl çalışır? {#how-does-state-sync-work}

Durum yönetimi, durumu Ethereum zincirinden Bor zincirine gönderir. Buna **state-sync** denir.

Ethereum'dan Bor için devlet transferi sistem çağrısı ile gerçekleşir. Varsayalım ki bir kullanıcı USDC Ethereum üzerindeki mevduat yöneticisine yatırır. Doğrulayıcılar bu olayları dinler, doğrular ve bunları Heimdall durumunda saklarlar. Bor en güncel durum eşitleme kayıtlarını alır ve Bor durumunu bir sistem çağrısı kullanarak günceller (Bor üzerinde eşit miktarda USDC mint eder).

## Durum göndericisi {#state-sender}

Kaynak: [https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol](https://github.com/maticnetwork/contracts/blob/develop/contracts/root/stateSyncer/StateSender.sol)

Durum eşitlemek için sözleşme, Ethereum zinciri üzerindeki **durum gönderici sözleşmesinde** aşağıdaki yöntemi çağırır.

```jsx
contract StateSender {
	/**
	 * Emits `stateSynced` events to start sync process on Ethereum chain
	 * @param receiver    Target contract on Bor chain
	 * @param data        Data to send
	 */
	function syncState (
		address receiver,
		bytes calldata data
	) external;
}
```

Süreç tamamlandığında durum `data`'sını alan `receiver` sözleşmesi alt zincir üzerinde mevcut olmalıdır. `syncState`, Ethereum üzerinde `StateSynced` olayını yayınlar ve bu da aşağıdaki şekildedir:

```jsx
/**
 * Emits `stateSynced` events to start sync process on Ethereum chain
 * @param id                  State id
 * @param contractAddress     Target contract address on Bor
 * @param data                Data to send to Bor chain for Target contract address
 */
event StateSynced (
	uint256 indexed id,
	address indexed contractAddress,
	bytes data
);
```

`StateSynced` olayı Ethereum zincirindeki `stateSender` sözleşmesinde yayınladığında, Heimdall bu olayları dinler ve 2/3+ doğrulayıcı mutabık olduğunda Heimdall durumuna ekler.

Her sprint (şu anda Bor'da 64 bloğa denk gelir) sonrasında, Bor yeni durum eşitleme kaydını alır ve durumu bir `system` çağrısı kullanarak günceller. Aynı işe yarayan kod şurada bulunabilir: [https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51](https://github.com/maticnetwork/bor/blob/6f0f08daecaebbff44cf18bee558fc3796d41832/consensus/bor/genesis_contracts_client.go#L51)

`commitState` sırasında, Bor, argüman olarak `stateId` ve `data` ile hedef sözleşme üzerinde `onStateReceive` işlevini yürütür.

## Bor üzerinde durum alıcı arabirimi {#state-receiver-interface-on-bor}

Bor zinciri üzerindeki `receiver` sözleşmesi, aşağıdaki arabirimi uygulamalıdır.

```jsx
// IStateReceiver represents interface to receive state
interface IStateReceiver {
  function onStateReceive(uint256 stateId, bytes calldata data) external;
}
```

Yalnızca `0x0000000000000000000000000000000000001001` - `StateReceiver.sol`'e, hedef sözleşme üzerindeki `onStateReceive` işlevini çağırma izni verilmelidir.

## Sistem çağrısı {#system-call}

Yalnızca sistem adresi olan `2^160-2`, bir sistem çağrısı yapılmasına izin verir. Bor bunu sistem adresi ile dâhili olarak `msg.sender` şeklinde çağırır. Sözleşme durumunu değiştirir ve belirli bir blok için durum kökünü günceller. Şunlardan ilham alınmıştır: [https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-210.md) ve [https://wiki.parity.io/Validator-Set#contracts](https://wiki.parity.io/Validator-Set#contracts)

Sistem çağrısı, hiçbir işlem yapmadan sözleşme durumunu değiştirmeye yarar.

## Durum eşitleme günlükleri ve Bor Blok Alındısı {#state-sync-logs-and-bor-block-receipt}

Sistem çağrıları tarafından yayınlanan olaylar, normal günlüklerden farklı bir şekilde işlenir. İşte kod: [https://github.com/maticnetwork/bor/pull/90](https://github.com/maticnetwork/bor/pull/90).

Bor sadece state-sync için tüm günlükleri içeren istemci için yeni bir tx / makbuz üretir. Tx hash, blok numarası ve blok hash'inden (bu sprint üzerindeki son blok):

```jsx
keccak256("matic-bor-receipt-" + block number + block hash)
```

Bu durum herhangi bir konsensüs mantığını değiştirmez, yalnızca istemci `eth_getBlockByNumber``eth_getTransactionReceipt`değişikliklerini yapar. , ve ayrıca elde edilen durumla senkronize eden günlükleri `eth_getLogs`içerir. Blok üzerindeki bloom filter'ın durum eşitleme günlükleri eklenmesini içermediğine dikkat edin. Ayrıca türetilmiş tx in `transactionRoot`veya dahil değildir.`receiptRoot`