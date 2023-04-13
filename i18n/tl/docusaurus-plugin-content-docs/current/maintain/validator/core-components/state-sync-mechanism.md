---
id: state-sync-mechanism
title: Mekanismo ng Pag-sync ng Estado
description: mekanismo ng pag-sync ng Estado para natively basahin ang data ng Ethereum
keywords:
  - docs
  - matic
  - polygon
  - state sync
  - mechanism
slug: state-sync-mechanism
image: https://wiki.polygon.technology/img/polygon-wiki.png
---

Kinukuha ng mga Validator na nasa [Heimdall](/docs/maintain/glossary.md#heimdall) layer ang [StateSynced](https://github.com/maticnetwork/contracts/blob/a4c26d59ca6e842af2b8d2265be1da15189e29a4/contracts/root/stateSyncer/StateSender.sol#L24) event at ipapasa ang event sa [Bor](/docs/maintain/glossary.md#bor) layer. Tingnan din ang [Polygon Architecture](/docs/pos/polygon-architecture).

Natatanggap ng **receiver na kontrata** ang [IStateReceiver](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol), at nasa loob ng [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/05556cfd91a6879a8190a6828428f50e4912ee1a/contracts/IStateReceiver.sol#L5) function ang custom logic.

Ang pinakabagong bersyon, ang [Heimdall v.0.3.0](https://github.com/maticnetwork/heimdall/releases/tag/v0.3.0), ay naglalaman ng ilang pagpapahusay tulad ng:
1. Paghihigpit sa laki ng data sa state sync txs sa:
    * **30Kb** kapag kinakatawan sa **bytes**
    * **60Kb** kapag kinakatawan sa **string**.
2. Pagpapahaba ng **tagal ng pagkaantala** sa pagitan ng mga contract event ng iba't ibang validator para matiyak na hindi napakabilis na mapupuno ang mempool kung sakaling magkaroon ng napakarming event na makakapigil sa pag-usad ng chain.

Ipinapakita ng sumusunod na halimbawa kung paano nililimitahan ang laki ng data:

```
Data - "abcd1234"
Length in string format - 8
Hex Byte representation - [171 205 18 52]
Length in byte format - 4
```

## Mga kakailanganin ng mga user {#requirements-for-the-users}

Mga bagay na kakailanganin mula sa mga dapp/user para makapagsagawa ng state sync:

1. Mag-call ng [syncState](https://github.com/maticnetwork/contracts/blob/19163ddecf91db17333859ae72dd73c91bee6191/contracts/root/stateSyncer/StateSender.sol#L33) function.
2. Nagdudulot ang `syncState` function ng isang event na tinatawag na `StateSynced(uint256 indexed id, address indexed contractAddress, bytes data);`
3. Nakakataggap ng `StateSynced` event ang lahat ng validator na nasa Heimdall chain. Ipinapadala ng sinumang validator, na gustong makakuha ng bayad sa transaksyon para sa state sync, ang transaksyon sa Heimdall.
4. Kapag `state-sync`naisama sa isang block ang transaksyon sa Heimdall, idinadagdag ito sa listahan ng nakabinbing state-sync.
5. Pagkatapos ng bawat sprint sa Bor, kinukuha ng Bor node ang mga nakabinbing state-sync event mula sa Heimdall sa pamamgitan ng isang API call.
6. Natatanggap ng receiver na kontrata ang `IStateReceiver` interface, at nananatili sa loob ng [onStateReceive](https://github.com/maticnetwork/genesis-contracts/blob/master/contracts/IStateReceiver.sol) function ang custom logic ng pag-decode ng data bytes at pag-perform ng anumang aksyon.
