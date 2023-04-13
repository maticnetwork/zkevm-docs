---
id: governance
title: Yönetişim
sidebar_label: Governance
description: 1 token ile sistem - 1 oy temeli
keywords:
  - docs
  - matic
  - one token
  - one vote
  - governance
  - heimdall
image: https://matic.network/banners/matic-network-16x9.png
---

# Governance {#governance}

Heimdall yönetimi [`x/gov`Cosmos-sdk modülü](https://docs.cosmos.network/master/modules/gov/) ile aynı şekilde çalışır.

Bu sistemde, zincirin yerel staking token’ının sahipleri tekliflere `1 token = 1 vote` temelinde oy kullanabilirler. İşte modül şu anda desteklediği özelliklerin bir listesi:

- **Teklif gönderimi:** Doğrulayıcılar fon yatırarak teklif gönderebilirler. Minimum fon yatırma miktarına ulaşıldığında teklif, oylama dönemine girer. Teklifler için fon yatıran doğrulayıcılar, teklif reddedildikten veya kabul edildikten sonra yatırdıkları fonları geri alabilirler.
- **Vote:** Doğrulayıcılar on ulaşan tekliflere oy verebilir.

`gov` modülünde parametreler olarak fon yatırma dönemi ve oylama dönemi vardır. Mevduat süresi bitmeden minimum depozito sağlanmalıdır, aksi takdirde teklif otomatik olarak reddedilecektir.

Fon yatırma dönemi içinde minimum fon yatırma miktarına ulaşıldığında oylama dönemi başlar. Oylama döneminde tüm doğrulayıcılar teklifle ilgili seçimleri için oy kullanmalıdır. `gov/Endblocker.go`, oylama dönemi bittikten sonra `tally` işlevini yürütür ve `tally_params` `quorum`, `threshold` ve `veto`’ya göre teklifi kabul eder ya da reddeder.

Kaynak: [https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go](https://github.com/maticnetwork/heimdall/blob/develop/gov/endblocker.go)

Heimdall'da uygulanabilecek farklı teklif türleri vardır. Şu andan itibaren sadece **Param değişikliği** önerisini desteklemektedir.

### Parametre değişiklik teklifi {#param-change-proposal}

Bu tür bir öneriyi kullanarak, doğrulayıcılar `module`Heimdall'dan herhangi birini `params`değiştirebilir.

Örneğin `auth` modülündeki işlem için minimum `tx_fees`’i değiştirmek. Teklif kabul edildiğinde Heimdall durumundaki `params`’ı otomatik olarak değiştirir. Ekstra TX gerekmez.

## CLI komutları {#cli-commands}

### Yönetişim parametrelerini sorgulama {#query-gov-params}

```go
heimdallcli query gov params --trust-node
```

Bu, yönetişim modülü için tüm parametreleri gösterir.

```go
voting_params:
  voting_period: 48h0m0s
tally_params:
  quorum: "334000000000000000"
  threshold: "500000000000000000"
  veto: "334000000000000000"
deposit_parmas:
  min_deposit:
  - denom: matic
    amount:
      i: "10000000000000000000"
  max_deposit_period: 48h0m0s
```

### Teklif gönderme {#submit-proposal}

```bash
heimdallcli tx gov submit-proposal \
	--validator-id 1 param-change proposal.json \
	--chain-id <heimdall-chain-id>
```

`proposal.json`, json formatındaki teklifi içeren bir dosyadır.

```json
{
  "title": "Auth Param Change",
  "description": "Update max tx gas",
  "changes": [
    {
      "subspace": "auth",
      "key": "MaxTxGas",
      "value": "2000000"
    }
  ],
  "deposit": [
    {
      "denom": "matic",
      "amount": "1000000000000000000"
    }
  ]
}
```

### Teklif sorgulama {#query-proposal}

Tüm önerileri sorgulamak için:

```go
heimdallcli query gov proposals --trust-node
```

Belirli bir teklifi sorgulamak için:

```go
heimdallcli query gov proposals 1 --trust-node
```

### Teklif için oy kullanma {#vote-on-proposal}

Belirli bir teklife oy vermek için:

```bash
heimdallcli tx gov vote 1 "Yes" --validator-id 1  --chain-id <heimdal-chain-id>
```

Oylama döneminden sonra teklif için otomatik olarak sayım yapılır.

## REST API’leri {#rest-apis}

| Ad | Yöntem | Bitiş noktası |
|----------------------|------|------------------|
| Tüm teklifleri alma | GET | /gov/proposals |
| Teklif ayrıntılarını alma | GET | /gov/proposals/`proposal-id` |
| Teklif için tüm oyları alma | GET | /gov/proposals/`proposal-id`/votes |
